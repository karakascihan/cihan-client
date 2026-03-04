import { createSlice, createAsyncThunk, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {URL as API_BASE_URL } from '@/api';
import { calculateStatusChangeEffects } from '../../utils/automationLogic';

// --- STATE ---
export interface ItemValue {
    id: number;
    value: string;
    itemId: number;
    columnId: number;
}

// Item nesnesinin tip tanımı
export interface Item {
    id: number;
    name: string;
    groupId: number;
    itemValue: ItemValue[]; 
    order: number;
    parentItemId: number | null;
}
export interface ItemTree extends Item {
    inverseParentItem: ItemTree[];
}
interface ItemState {
    itemsByGroup: Record<number, Item[]>;
    itemTreeByGroup: Record<number, ItemTree[]>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ItemState = {
    itemsByGroup: {},
    itemTreeByGroup: {},
    status: 'idle',
    error: null,
};

export interface BulkUpdateItemValueArgs {
    updates: { itemId: number; columnId: number; value: string }[];
}

// --- SELECTORS ---

const selectItemsByGroup = (state: RootState) => state.items.itemsByGroup;

export const makeSelectItemsByGroup = () =>
    createSelector(
        [selectItemsByGroup, (_: RootState, groupId: number) => groupId],
        (itemsByGroup, groupId) => itemsByGroup[groupId] || []
    );

export const selectAllItemsFlat = createSelector(
    [selectItemsByGroup],
    (itemsByGroup) => Object.values(itemsByGroup).flat()
);

/** Returns all items belonging to a specific board, derived through its groups */
export const selectItemsForBoard = (boardId: number) => (state: RootState): Item[] => {
    const groups = state.groups.itemsByBoard[boardId] ?? [];
    return groups.flatMap(g => state.items.itemsByGroup[g.id] ?? []);
};

// --- KÜÇÜK YARDIMCI: TREE İÇİNDE HÜCRE GÜNCELLEME ---

function updateItemValueInTreeMap(
    treeMap: Record<number, ItemTree[]>,
    value: ItemValue
) {
    const { itemId, columnId } = value;

    for (const groupId in treeMap) {
        const roots = treeMap[groupId];
        const stack: ItemTree[] = [...roots];

        while (stack.length > 0) {
            const node = stack.pop()!;

            if (node.id === itemId) {
                if (!node.itemValue) node.itemValue = [];

                const idx = node.itemValue.findIndex(iv => iv.columnId === columnId);
                if (idx > -1) {
                    node.itemValue[idx] = value;
                } else {
                    node.itemValue.push(value);
                }
                stack.length = 0;
                break;
            }

            if (node.inverseParentItem && node.inverseParentItem.length > 0) {
                stack.push(...node.inverseParentItem);
            }
        }
    }
}

function updateItemValueInTreeMapShallow(
    treeMap: Record<number, ItemTree[]>,
    update: { itemId: number; columnId: number; value: string }
) {
    const synthetic: ItemValue = {
        id: 0,
        itemId: update.itemId,
        columnId: update.columnId,
        value: update.value
    };
    updateItemValueInTreeMap(treeMap, synthetic);
}

// --- ASYNC THUNKS ---

// 1. Toplu Değer Güncelleme (Otomasyon için kritik)
export const updateMultipleItemValues = createAsyncThunk<
    { itemId: number; columnId: number; value: string }[],
    BulkUpdateItemValueArgs,
    { rejectValue: string }
>('items/updateMultipleItemValues', async ({ updates }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
        const promises = updates.map(u =>
            fetch(`${API_BASE_URL}/items/${u.itemId}/values`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
                body: JSON.stringify({ columnId: u.columnId, value: u.value }),
            }).then(async res => {
                if (!res.ok) throw new Error(`Update failed (HTTP ${res.status})`);
                const data = await res.json();
                if (data && data.isSuccess === false) throw new Error(data.message || 'Update failed');
                return u;
            })
        );

        const results = await Promise.all(promises);
        return results;

    } catch (err: any) {
        return rejectWithValue(err.message || 'Toplu güncelleme başarısız');
    }
});

// 2. Tüm panonun item'larını getir
export const fetchItemsForBoard = createAsyncThunk<
    Item[],
    number,
    { rejectValue: string }
>('items/fetchItemsForBoard', async (boardId, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
        const res = await fetch(`${API_BASE_URL}/boards/${boardId}/items`, {
            headers: { authorization: `Bearer ${state.login.accessToken}` }
        });
        if (!res.ok) throw new Error(await res.text());
        return (await res.json()) as Item[];
    } catch (err: any) {
        return rejectWithValue(err.message || 'Panodaki item\'lar getirilemedi');
    }
});

// 3. Tek bir grubun item'larını getir
export interface FetchItemsArgs {
    boardId: number;
    groupId: number;
}
export const fetchItemsForGroup = createAsyncThunk<
    Item[],
    FetchItemsArgs,
    { rejectValue: string }
>('items/fetchItemsForGroup', async ({ boardId, groupId }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
        const res = await fetch(`${API_BASE_URL}/boards/${boardId}/items?groupId=${groupId}`, {
            headers: { authorization: `Bearer ${state.login.accessToken}` }
        });
        if (!res.ok) throw new Error(await res.text());
        return (await res.json()) as Item[];
    } catch (err: any) {
        return rejectWithValue(err.message || 'Gruba ait item\'lar getirilemedi');
    }
});

// 4. Yeni item oluştur
export interface CreateItemArgs {
    boardId: number;
    groupId: number;
    itemData: { name: string, parentItemId?: number | null; };
}
export const createItem = createAsyncThunk<
    Item,
    CreateItemArgs,
    { rejectValue: string }
>('items/createItem', async ({ boardId, groupId, itemData }, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
        const res = await fetch(`${API_BASE_URL}/boards/${boardId}/items?groupId=${groupId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
            body: JSON.stringify(itemData),
        });

        if (!res.ok) throw new Error(await res.text());

        const item = (await res.json()) as Item;

        // 🎯 Ağaç güncellensin
        dispatch(fetchItemTree({ boardId, groupId }));

        return item;

    } catch (err: any) {
        return rejectWithValue(err.message || 'Item oluşturulamadı');
    }
});


// 5. Görev Adını Güncelle
export interface UpdateItemArgs {
    boardId: number;
    itemId: number;
    groupId: number;
    itemData: {
        name: string;
    };
}
export const updateItem = createAsyncThunk<
    { itemId: number, groupId: number, newName: string },
    UpdateItemArgs,
    { rejectValue: string }
>('items/updateItem', async ({ boardId, itemId, groupId, itemData }, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
        const response = await fetch(`${API_BASE_URL}/boards/${boardId}/items/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Sunucu hatası');
        }

        // İsim değişince de ağaç güncellensin
        dispatch(fetchItemTree({ boardId, groupId }));

        return { itemId: itemId, groupId: groupId, newName: itemData.name };

    } catch (err: any) {
        return rejectWithValue(err.message || 'Item güncellenemedi');
    }
});

// 6. Item sil
export interface DeleteItemArgs {
    boardId: number;
    itemId: number;
    groupId: number;
}
export const deleteItem = createAsyncThunk<
    number,
    DeleteItemArgs,
    { rejectValue: string }
>('items/deleteItem', async ({ boardId, itemId, groupId }, { dispatch, rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const res = await fetch(`${API_BASE_URL}/boards/${boardId}/items/${itemId}`, {
            method: 'DELETE',
            headers: { authorization: `Bearer ${state.login.accessToken}` }
        });
        if (!res.ok) throw new Error(await res.text());

        // 🎯 silince ağaç da yenilensin
        dispatch(fetchItemTree({ boardId, groupId }));

        return itemId;

    } catch (err: any) {
        return rejectWithValue(err.message || 'Item silinemedi');
    }
});


export const fetchItemTree = createAsyncThunk<
    ItemTree[],
    { boardId: number; groupId: number }
>(
    "items/fetchItemTree",
    async ({ boardId, groupId },{getState}) => {
        const state = getState() as RootState;
        const response = await fetch(
            `${API_BASE_URL}/boards/${boardId}/items/tree?groupId=${groupId}`, { headers: { authorization: `Bearer ${state.login.accessToken}` } }
        );
        if (!response.ok) throw new Error("Item tree alınamadı");

        return (await response.json()) as ItemTree[];
    }
);

// 7. Item taşı (API Çağrısı)
export interface MoveItemArgs {
    boardId: number;
    itemId: number;
    destinationGroupId: number;
    destinationIndex: number;
    sourceGroupId: number;
    sourceIndex: number;
    parentItemId?: number | null; 
}

export const moveItem = createAsyncThunk<void, MoveItemArgs, { rejectValue: string }>(
    'items/moveItem',
    async (
        { boardId, itemId, destinationGroupId, destinationIndex, parentItemId },
        { rejectWithValue, getState }
    ) => {
        const state = getState() as RootState;
        try {
            const res = await fetch(`${API_BASE_URL}/boards/${boardId}/items/move`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
                body: JSON.stringify({
                    itemId,
                    destinationGroupId,
                    destinationIndex,
                    parentItemId: parentItemId ?? null
                }),
            });

            if (!res.ok) throw new Error(await res.text());
        } catch (err: any) {
            return rejectWithValue(err.message || 'Item taşınamadı');
        }
    }
);





// 8. Tek Hücre Değeri Güncelle
export interface UpdateItemValueArgs {
    itemId: number;
    columnId: number;
    value: string;
}
export const updateItemValue = createAsyncThunk<
    ItemValue,
    UpdateItemValueArgs,
    { rejectValue: string }
>('items/updateItemValue', async ({ itemId, columnId, value }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
        const res = await fetch(`${API_BASE_URL}/items/${itemId}/values`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
            body: JSON.stringify({ columnId, value }),
        });
        if (!res.ok) throw new Error(await res.text());
        return (await res.json()) as ItemValue;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Hücre değeri güncellenemedi');
    }
});

// 9. YENİ: Akıllı Statü Değişikliği (Orkestratör)
export const changeItemStatus = createAsyncThunk<
    void,
    { itemId: number, columnId: number, newStatus: string },
    { state: RootState }
>('items/changeItemStatus', async ({ itemId, columnId, newStatus }, { dispatch, getState }) => {

    const state = getState();

    // Verileri Topla
    const allItems = Object.values(state.items.itemsByGroup).flat();
    const allGroupsFlat = Object.values(state.groups.itemsByBoard).flat();
    const allColumnsFlat = Object.values(state.columns.itemsByBoard).flat();

    // Otomasyonu Çalıştır
    const result = calculateStatusChangeEffects(
        itemId,
        newStatus,
        allItems,
        allColumnsFlat,
        allGroupsFlat
    );

    // A. Hücre Güncellemelerini Uygula
    if (result.updates.length > 0) {
        await dispatch(updateMultipleItemValues({ updates: result.updates }));
    }

    // B. Taşıma İşlemini Uygula
    if (result.moveAction) {
        const currentItem = allItems.find(i => i.id === itemId);
        if (currentItem) {
            const boardId = allGroupsFlat.find(g => g.id === currentItem.groupId)?.boardId ?? 0;
            const moveArgs: MoveItemArgs = {
                boardId,
                itemId: itemId,
                sourceGroupId: currentItem.groupId,
                sourceIndex: currentItem.order,
                destinationGroupId: result.moveAction.targetGroupId,
                destinationIndex: 0
            };

            dispatch(itemSlice.actions.reorderItemsLocally(moveArgs));
            await dispatch(moveItem(moveArgs));
        }
    }

    if (result.notification) {
        console.log("🔔 BİLDİRİM:", result.notification);
    }
});

// --- SLICE ---

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        reorderItemsLocally: (state, action: PayloadAction<MoveItemArgs>) => {
            const {
                sourceGroupId,
                destinationGroupId,
                destinationIndex, 
                itemId,
                parentItemId
            } = action.payload;

            // 1. Kaynak ve Hedef Listeleri Bul
            const sourceList = state.itemsByGroup[sourceGroupId];
            if (!sourceList) return;

            // Farklı gruba taşınıyorsa hedef listeyi hazırla
            if (!state.itemsByGroup[destinationGroupId]) {
                state.itemsByGroup[destinationGroupId] = [];
            }
            const destinationList = state.itemsByGroup[destinationGroupId];

            // 2. Öğeyi Bul ve Çıkar (Gerçek indeksi kullan)
            const itemIndex = sourceList.findIndex(i => i.id === itemId);
            if (itemIndex === -1) {
                console.warn(`reorderItemsLocally: Item (ID: ${itemId}) kaynak grupta bulunamadı.`);
                return;
            }
            const [movedItem] = sourceList.splice(itemIndex, 1);

            // 3. Özellikleri Güncelle
            if (movedItem) {
                movedItem.groupId = destinationGroupId;
                // Parent ID güncellemesi
                if (parentItemId !== undefined) {
                    (movedItem as any).parentItemId = parentItemId ?? null;
                }
            } else {
                return;
            }

            // 4. Hedef Listeye Ekle
            destinationList.splice(destinationIndex, 0, movedItem);

            // 5. Sıralama (Order) Değerlerini Yeniden Ata
            sourceList.forEach((item, index) => { item.order = index; });
            if (sourceGroupId !== destinationGroupId) {
                destinationList.forEach((item, index) => { item.order = index; });
            }
        },
        clearItems: (state) => {
            state.itemsByGroup = {};
            state.itemTreeByGroup = {};
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // --- GRUP ITEMLARI ---
            .addCase(fetchItemsForGroup.pending, (s) => { s.status = 'loading'; })
            .addCase(fetchItemsForGroup.fulfilled, (s, a) => {
                s.itemsByGroup[a.meta.arg.groupId] = a.payload;
                s.status = 'succeeded';
            })
            .addCase(fetchItemsForGroup.rejected, (s, a) => {
                s.status = 'failed';
                s.error = a.payload || 'Itemlar getirilemedi';
            })

            // --- PANO ITEMLARI ---
            .addCase(fetchItemsForBoard.pending, (s) => { s.status = 'loading'; })
            .addCase(fetchItemsForBoard.fulfilled, (s, a) => {
                const newMap: Record<number, Item[]> = {};
                a.payload.forEach((i) => {
                    if (!newMap[i.groupId]) newMap[i.groupId] = [];
                    newMap[i.groupId].push(i);
                });
                Object.values(newMap).forEach((list) => list.sort((a, b) => a.order - b.order));
                s.itemsByGroup = newMap;
                s.status = 'succeeded';
            })
            .addCase(fetchItemsForBoard.rejected, (s, a) => {
                s.status = 'failed';
                s.error = a.payload || 'Panodaki itemlar getirilemedi';
            })

            // --- CREATE ---
            .addCase(createItem.fulfilled, (s, a) => {
                const groupId = (a.meta.arg as CreateItemArgs).groupId;
                if (!s.itemsByGroup[groupId]) s.itemsByGroup[groupId] = [];
                s.itemsByGroup[groupId].push(a.payload);
            })
            .addCase(createItem.rejected, (s, a) => {
                s.error = a.payload || 'Item oluşturulamadı';
            })

            // --- UPDATE (NAME) ---
            .addCase(updateItem.fulfilled, (state, action) => {
                const { itemId, groupId, newName } = action.payload;
                if (state.itemsByGroup[groupId]) {
                    const originalItems = state.itemsByGroup[groupId];
                    state.itemsByGroup[groupId] = originalItems.map(item =>
                        item.id === itemId ? { ...item, name: newName } : item
                    );
                }
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // --- DELETE ---
            .addCase(deleteItem.fulfilled, (state, action) => {
                const idToDelete = action.payload;
                for (const groupId in state.itemsByGroup) {
                    const itemsInGroup = state.itemsByGroup[groupId];
                    const initialLength = itemsInGroup.length;
                    state.itemsByGroup[groupId] = itemsInGroup.filter((i) => i.id !== idToDelete);
                    if (state.itemsByGroup[groupId].length < initialLength) {
                        state.itemsByGroup[groupId].forEach((i, idx) => (i.order = idx));
                        break;
                    }
                }
            })
            .addCase(deleteItem.rejected, (s, a) => {
                s.error = a.payload || 'Item silinemedi';
            })

            // --- UPDATE VALUE (SINGLE) ---
            .addCase(updateItemValue.fulfilled, (s, a) => {
                const v = a.payload;

                // flat liste güncelle
                for (const g in s.itemsByGroup) {
                    const item = s.itemsByGroup[g].find((i) => i.id === v.itemId);
                    if (item) {
                        const idx = item.itemValue.findIndex((iv) => iv.columnId === v.columnId);
                        if (idx > -1) item.itemValue[idx] = v;
                        else item.itemValue.push(v);
                        break;
                    }
                }

                // 🎯 tree yapısını da güncelle
                updateItemValueInTreeMap(s.itemTreeByGroup, v);
            })
            .addCase(updateItemValue.rejected, (s, a) => {
                s.error = a.payload || 'Hücre değeri güncellenemedi';
            })

            // --- UPDATE VALUE (MULTIPLE / AUTOMATION) ---
            .addCase(updateMultipleItemValues.fulfilled, (state, action) => {
                const updates = action.payload;

                updates.forEach(u => {
                    // flat state
                    for (const groupId in state.itemsByGroup) {
                        const item = state.itemsByGroup[groupId].find(i => i.id === u.itemId);
                        if (item) {
                            const idx = item.itemValue.findIndex(iv => iv.columnId === u.columnId);
                            if (idx > -1) item.itemValue[idx].value = u.value;
                            else item.itemValue.push({ id: 0, itemId: u.itemId, columnId: u.columnId, value: u.value });
                            break;
                        }
                    }

                    // 🎯 tree state
                    updateItemValueInTreeMapShallow(state.itemTreeByGroup, u);
                });
            })

            // --- MOVE ITEM ---
            .addCase(moveItem.rejected, (s, a) => {
                s.error = a.payload || 'Item taşınamadı';
                console.error("Item taşıma hatası (backend):", a.payload);
            })

            .addCase(fetchItemTree.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemTree.fulfilled, (state, action) => {
                const groupId = action.meta.arg.groupId;
                state.itemTreeByGroup[groupId] = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchItemTree.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Item tree getirilemedi';
            });

    },
});

export const { clearItems, reorderItemsLocally } = itemSlice.actions; 
export const reorderItems = reorderItemsLocally; // <- YENİ: Bu ek satır, modülün 'reorderItems' export'unu sağlamasını garanti eder.

export default itemSlice.reducer;