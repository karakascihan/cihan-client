// src/store/features/boardViewSlice.ts

import { createSlice, createAsyncThunk, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { URL } from '@/api';

export interface BoardViewData {
    id: number;
    name: string;
    type: string;
    order: number;
    settingsJson?: string | null;
}

export interface CreateBoardViewPayload {
    name: string;
    type: string;
}

export interface UpdateBoardViewPayload {
    name: string;
}

export interface UpdateBoardViewSettingsPayload {
    settingsJson: string;
}

interface BoardViewState {
    viewsByBoard: Record<number, BoardViewData[]>;
    activeViewIdByBoard: Record<number, number | null>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    showOnlyCompleted: boolean;
}

const initialState: BoardViewState = {
    viewsByBoard: {},
    activeViewIdByBoard: {},
    status: 'idle',
    error: null,
    showOnlyCompleted: false,
};

// --- Async Thunks ---

export const fetchViewsForBoard = createAsyncThunk<
    BoardViewData[],
    number,
    { rejectValue: string }
>('boardViews/fetchViewsForBoard', async (boardId, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const aut = `Bearer ${state.login.accessToken}`;
        const response = await fetch(`${URL}/boards/${boardId}/views`, { headers: { authorization: aut } });
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        return (await response.json()) as BoardViewData[];
    } catch (error: any) {
        return rejectWithValue(error.message || 'Görünümler getirilemedi');
    }
});

export const createBoardView = createAsyncThunk<
    BoardViewData,
    { boardId: number; payload: CreateBoardViewPayload },
    { rejectValue: string }
>('boardViews/createBoardView', async ({ boardId, payload }, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const aut = `Bearer ${state.login.accessToken}`;
        const response = await fetch(`${URL}/boards/${boardId}/views`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: aut },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Server Error: ${response.status}`);
        }
        return (await response.json()) as BoardViewData;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Görünüm oluşturulamadı');
    }
});

export const deleteBoardView = createAsyncThunk<
    number,
    { boardId: number; viewId: number },
    { rejectValue: string }
>('boardViews/deleteBoardView', async ({ boardId, viewId }, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const aut = `Bearer ${state.login.accessToken}`;
        const response = await fetch(`${URL}/boards/${boardId}/views/${viewId}`, {
            method: 'DELETE',
            headers: { authorization: aut }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Server Error: ${response.status}`);
        }
        return viewId;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Görünüm silinemedi');
    }
});

export const updateBoardView = createAsyncThunk<
    BoardViewData,
    { boardId: number; viewId: number; payload: UpdateBoardViewPayload },
    { rejectValue: string; state: RootState }
>(
    'boardViews/updateBoardView',
    async ({ boardId, viewId, payload }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const currentView = (state.boardViews.viewsByBoard[boardId] ?? []).find(v => v.id === viewId);
            if (!currentView) throw new Error("Güncellenecek görünüm mevcut state'de bulunamadı.");

            const combinedPayload = { ...payload, settingsJson: currentView.settingsJson };

            const response = await fetch(`${URL}/boards/${boardId}/views/${viewId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
                body: JSON.stringify(combinedPayload),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Server Error: ${response.status}`);
            }
            return (await response.json()) as BoardViewData;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Görünüm yeniden adlandırılamadı');
        }
    }
);

export const reorderBoardViews = createAsyncThunk<
    void,
    { boardId: number; orderedViewIds: number[] },
    { rejectValue: string }
>('boardViews/reorderBoardViews', async ({ boardId, orderedViewIds }, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const aut = `Bearer ${state.login.accessToken}`;
        const response = await fetch(`${URL}/boards/${boardId}/views/reorder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', authorization: aut },
            body: JSON.stringify(orderedViewIds),
        });
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
    } catch (error: any) {
        return rejectWithValue(error.message || 'Görünüm sırası güncellenemedi');
    }
});

export const updateBoardViewSettings = createAsyncThunk<
    BoardViewData,
    { boardId: number; viewId: number; payload: UpdateBoardViewSettingsPayload },
    { rejectValue: string; state: RootState }
>(
    'boardViews/updateBoardViewSettings',
    async ({ boardId, viewId, payload }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const currentView = (state.boardViews.viewsByBoard[boardId] ?? []).find(v => v.id === viewId);
            if (!currentView) throw new Error("Güncellenecek görünüm mevcut state'de bulunamadı.");

            const combinedPayload = { name: currentView.name, ...payload };

            const response = await fetch(`${URL}/boards/${boardId}/views/${viewId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
                body: JSON.stringify(combinedPayload),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Server Error: ${response.status}`);
            }
            return (await response.json()) as BoardViewData;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Görünüm ayarları güncellenemedi');
        }
    }
);

// --- Slice ---

const boardViewSlice = createSlice({
    name: 'boardViews',
    initialState,
    reducers: {
        setActiveViewId: (state, action: PayloadAction<{ boardId: number; viewId: number | null }>) => {
            state.activeViewIdByBoard[action.payload.boardId] = action.payload.viewId;
        },
        clearBoardViews: (state, action: PayloadAction<number>) => {
            delete state.viewsByBoard[action.payload];
            delete state.activeViewIdByBoard[action.payload];
        },
        toggleShowOnlyCompleted: (state) => {
            state.showOnlyCompleted = !state.showOnlyCompleted;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchViewsForBoard.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchViewsForBoard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const boardId = action.meta.arg;
                state.viewsByBoard[boardId] = action.payload;
                const currentActive = state.activeViewIdByBoard[boardId];
                if (!currentActive || !action.payload.some(v => v.id === currentActive)) {
                    state.activeViewIdByBoard[boardId] = action.payload.length > 0 ? action.payload[0].id : null;
                }
            })
            .addCase(fetchViewsForBoard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Bilinmeyen bir hata oluştu.';
            })
            .addCase(createBoardView.fulfilled, (state, action) => {
                const boardId = action.meta.arg.boardId;
                if (!state.viewsByBoard[boardId]) state.viewsByBoard[boardId] = [];
                state.viewsByBoard[boardId].push(action.payload);
                state.activeViewIdByBoard[boardId] = action.payload.id;
                state.error = null;
            })
            .addCase(createBoardView.rejected, (state, action) => {
                state.error = action.payload ?? 'Görünüm oluşturulamadı.';
            })
            .addCase(deleteBoardView.fulfilled, (state, action) => {
                const boardId = action.meta.arg.boardId;
                const deletedId = action.payload;
                const views = state.viewsByBoard[boardId] ?? [];
                const deletedIndex = views.findIndex(v => v.id === deletedId);
                if (deletedIndex === -1) return;

                views.splice(deletedIndex, 1);
                state.error = null;

                if (state.activeViewIdByBoard[boardId] === deletedId) {
                    const nextIndex = deletedIndex < views.length ? deletedIndex : deletedIndex - 1;
                    state.activeViewIdByBoard[boardId] = views.length > 0 ? views[Math.max(0, nextIndex)].id : null;
                }
            })
            .addCase(deleteBoardView.rejected, (state, action) => {
                state.error = action.payload ?? 'Görünüm silinemedi.';
            })
            .addCase(updateBoardView.fulfilled, (state, action) => {
                const boardId = action.meta.arg.boardId;
                const updatedViewData = action.payload;
                const views = state.viewsByBoard[boardId] ?? [];
                const index = views.findIndex(v => v.id === updatedViewData.id);
                if (index !== -1) views[index] = updatedViewData;
                state.error = null;
            })
            .addCase(updateBoardView.rejected, (state, action) => {
                state.error = action.payload ?? 'Görünüm yeniden adlandırılamadı.';
            })
            .addCase(reorderBoardViews.pending, (state, action) => {
                const boardId = action.meta.arg.boardId;
                const orderedIds = action.meta.arg.orderedViewIds;
                const views = state.viewsByBoard[boardId] ?? [];
                const viewMap = new Map(views.map(v => [v.id, v]));
                state.viewsByBoard[boardId] = orderedIds
                    .map(id => viewMap.get(id)!)
                    .filter(Boolean)
                    .map((view, index) => ({ ...view, order: index }));
            })
            .addCase(reorderBoardViews.rejected, (state, action) => {
                state.error = action.payload ?? 'Sıralama güncellenemedi.';
            })
            .addCase(updateBoardViewSettings.fulfilled, (state, action) => {
                const boardId = action.meta.arg.boardId;
                const updatedView = action.payload;
                const views = state.viewsByBoard[boardId] ?? [];
                const index = views.findIndex(v => v.id === updatedView.id);
                if (index !== -1) views[index] = updatedView;
            })
            .addCase(updateBoardViewSettings.rejected, (state, action) => {
                state.error = action.payload ?? 'Ayar güncellenemedi';
            });
    },
});

// --- Actions ---
export const { setActiveViewId, clearBoardViews, toggleShowOnlyCompleted } = boardViewSlice.actions;

// --- Selectors (per-board) ---
export const selectViewsForBoard = (boardId: number) => (state: RootState): BoardViewData[] =>
    state.boardViews.viewsByBoard[boardId] ?? [];

export const selectActiveViewIdForBoard = (boardId: number) => (state: RootState): number | null =>
    state.boardViews.activeViewIdByBoard[boardId] ?? null;

export const selectBoardViewStatus = (state: RootState) => state.boardViews.status;
export const selectShowOnlyCompleted = (state: RootState) => state.boardViews.showOnlyCompleted;

export const makeSelectActiveView = (boardId: number) =>
    createSelector(
        [(state: RootState) => state.boardViews.viewsByBoard[boardId] ?? [],
         (state: RootState) => state.boardViews.activeViewIdByBoard[boardId] ?? null],
        (views, activeId) => views.find(v => v.id === activeId) ?? null
    );

// --- Reducer ---
export default boardViewSlice.reducer;
