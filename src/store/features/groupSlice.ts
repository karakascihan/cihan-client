import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { URL } from '@/api';
export interface Group {
    id: number;
    title: string;
    color: string;
    boardId: number;
    order: number;
}

// --- Selectors ---
/** Returns groups for a specific board (use this in board-scoped components) */
export const selectGroupsForBoard = (boardId: number) => (state: RootState): Group[] =>
    state.groups.itemsByBoard[boardId] ?? [];

/** Flattened compat shim — returns groups across all boards */
export const selectAllGroups = (state: RootState): Group[] =>
    Object.values(state.groups.itemsByBoard).flat();

// --- Async Thunks ---

export const fetchGroupsForBoard = createAsyncThunk<Group[], number, { rejectValue: string }>(
    'groups/fetchGroupsForBoard',
    async (boardId, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        try {
            const response = await fetch(`${URL}/boards/${boardId}/groups`, {
                headers: { authorization: `Bearer ${state.login.accessToken}` }
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Sunucu bir hatayla yanıt verdi!');
            }
            const data: Group[] = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Gruplar getirilemedi');
        }
    }
);

interface CreateGroupArgs {
    boardId: number;
    groupData: { title: string; color: string };
    position?: 'top' | 'bottom';
}
export const createGroup = createAsyncThunk<Group, CreateGroupArgs, { rejectValue: string }>(
    'groups/createGroup',
    async ({ boardId, groupData, position }, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        try {
            const payload = { ...groupData, position };
            const response = await fetch(`${URL}/boards/${boardId}/groups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Grup oluşturulamadı');
            }
            return (await response.json()) as Group;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Grup oluşturulamadı');
        }
    }
);

interface UpdateGroupArgs {
    boardId: number;
    groupId: number;
    groupData: { title: string; color: string; };
}
export const updateGroup = createAsyncThunk<Group, UpdateGroupArgs, { rejectValue: string }>(
    'groups/updateGroup',
    async ({ boardId, groupId, groupData }, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        try {
            const response = await fetch(`${URL}/boards/${boardId}/groups/${groupId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
                body: JSON.stringify(groupData),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Grup güncellenemedi');
            }
            return { id: groupId, boardId, ...groupData } as Group;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Grup güncellenemedi');
        }
    }
);

interface DeleteGroupArgs {
    boardId: number;
    groupId: number;
}
export const deleteGroup = createAsyncThunk<number, DeleteGroupArgs, { rejectValue: string }>(
    'groups/deleteGroup',
    async ({ boardId, groupId }, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        try {
            const response = await fetch(`${URL}/boards/${boardId}/groups/${groupId}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${state.login.accessToken}` }
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Grup silinemedi');
            }
            return groupId;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Grup silinemedi');
        }
    }
);

interface ReorderGroupsArgs {
    boardId: number;
    orderedGroupIds: number[];
}
export const updateGroupOrder = createAsyncThunk<void, ReorderGroupsArgs, { rejectValue: string }>(
    'groups/updateOrder',
    async ({ boardId, orderedGroupIds }, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        try {
            const response = await fetch(`${URL}/boards/${boardId}/groups/reorder`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
                body: JSON.stringify({ orderedGroupIds }),
            });
            if (!response.ok) {
                const errorData = await response.text();
                return rejectWithValue(errorData || `Sunucuda grup sırası güncellenemedi (HTTP ${response.status})`);
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Grup sırası güncellenirken bir ağ hatası oluştu');
        }
    }
);

// --- State ---

interface GroupState {
    itemsByBoard: Record<number, Group[]>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isUpdatingOrder?: boolean;
}

const initialState: GroupState = {
    itemsByBoard: {},
    status: 'idle',
    error: null,
    isUpdatingOrder: false,
};

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        clearGroups: (state, action: PayloadAction<number>) => {
            delete state.itemsByBoard[action.payload];
        },
        reorderGroupsLocally: (state, action: PayloadAction<{ boardId: number; orderedGroups: Group[] }>) => {
            state.itemsByBoard[action.payload.boardId] = action.payload.orderedGroups;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroupsForBoard.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchGroupsForBoard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const boardId = action.meta.arg;
                state.itemsByBoard[boardId] = action.payload.sort((a, b) => a.order - b.order);
            })
            .addCase(fetchGroupsForBoard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message || 'Grupları getirirken bir hata oluştu';
            })

            .addCase(createGroup.fulfilled, (state, action) => {
                const { boardId, position } = action.meta.arg as CreateGroupArgs;
                if (!state.itemsByBoard[boardId]) state.itemsByBoard[boardId] = [];
                if (position === 'top') {
                    state.itemsByBoard[boardId].unshift(action.payload);
                } else {
                    state.itemsByBoard[boardId].push(action.payload);
                }
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.error = action.payload || action.error.message || 'Grup oluşturulamadı';
            })

            .addCase(updateGroup.fulfilled, (state, action) => {
                const { id, boardId } = action.payload;
                const list = state.itemsByBoard[boardId];
                if (!list) return;
                const index = list.findIndex(g => g.id === id);
                if (index !== -1) {
                    list[index] = { ...list[index], ...action.payload };
                }
            })
            .addCase(updateGroup.rejected, (state, action) => {
                state.error = (action.payload as string) || action.error.message || 'Grup güncellenemedi';
            })

            .addCase(deleteGroup.fulfilled, (state, action) => {
                const groupId = action.payload;
                const boardId = (action.meta.arg as DeleteGroupArgs).boardId;
                if (state.itemsByBoard[boardId]) {
                    state.itemsByBoard[boardId] = state.itemsByBoard[boardId].filter(g => g.id !== groupId);
                }
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.error = (action.payload as string) || action.error.message || 'Grup silinemedi';
            })

            .addCase(updateGroupOrder.pending, (state) => {
                state.isUpdatingOrder = true;
                state.error = null;
            })
            .addCase(updateGroupOrder.fulfilled, (state) => {
                state.isUpdatingOrder = false;
            })
            .addCase(updateGroupOrder.rejected, (state, action) => {
                state.isUpdatingOrder = false;
                state.error = action.payload || action.error.message || 'Grup sırası güncellenemedi';
            });
    },
});

export const { clearGroups, reorderGroupsLocally } = groupSlice.actions;
export default groupSlice.reducer;
