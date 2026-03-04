import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ColumnDto, ColumnType } from '@/api/apiDtos';
import { URL } from '@/api';

interface ColumnState {
    itemsByBoard: Record<number, ColumnDto[]>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// --- Selectors ---
/** Returns columns for a specific board */
export const selectColumnsForBoard = (boardId: number) => (state: RootState): ColumnDto[] =>
    state.columns.itemsByBoard[boardId] ?? [];

/** Flattened compat shim — returns columns across all boards */
export const selectAllColumns = (state: RootState): ColumnDto[] =>
    Object.values(state.columns.itemsByBoard).flat();

// --- Async Thunks ---

interface UpdateColumnOrderArgs {
    boardId: number;
    orderedColumnIds: number[];
}
export const updateColumnOrder = createAsyncThunk<void, UpdateColumnOrderArgs>(
    'columns/updateColumnOrder',
    async ({ boardId, orderedColumnIds }, { getState }) => {
        const state = getState() as RootState;
        const response = await fetch(`${URL}/boards/${boardId}/columns/reorder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
            body: JSON.stringify({ orderedColumnIds }),
        });
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Backend Hatası:', errorData);
            throw new Error('Sütun sırası güncellenemedi');
        }
    }
);

interface CreateColumnArgs {
    boardId: number;
    columnData: { title: string; type: ColumnType; };
}
export const createColumn = createAsyncThunk<ColumnDto, CreateColumnArgs>(
    'columns/createColumn',
    async ({ boardId, columnData }, { getState }) => {
        const state = getState() as RootState;
        const response = await fetch(`${URL}/boards/${boardId}/columns`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
            body: JSON.stringify(columnData),
        });
        if (!response.ok) throw new Error('Failed to create column');
        return (await response.json()) as ColumnDto;
    }
);

interface UpdateColumnArgs {
    boardId: number;
    columnId: number;
    columnData: { title: string };
}
export const updateColumn = createAsyncThunk<ColumnDto, UpdateColumnArgs>(
    'columns/updateColumn',
    async ({ boardId, columnId, columnData }, { getState }) => {
        const state = getState() as RootState;
        await fetch(`${URL}/boards/${boardId}/columns/${columnId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
            body: JSON.stringify(columnData),
        });
        return { id: columnId, boardId, ...columnData } as ColumnDto;
    }
);

interface DeleteColumnArgs {
    boardId: number;
    columnId: number;
}
export const deleteColumn = createAsyncThunk<number, DeleteColumnArgs>(
    'columns/deleteColumn',
    async ({ boardId, columnId }, { getState }) => {
        const state = getState() as RootState;
        await fetch(`${URL}/boards/${boardId}/columns/${columnId}`, {
            method: 'DELETE',
            headers: { authorization: `Bearer ${state.login.accessToken}` }
        });
        return columnId;
    }
);

export const fetchColumnsForBoard = createAsyncThunk<ColumnDto[], number>(
    'columns/fetchColumnsForBoard',
    async (boardId, { getState }) => {
        const state = getState() as RootState;
        const response = await fetch(`${URL}/boards/${boardId}/columns`, {
            headers: { authorization: `Bearer ${state.login.accessToken}` }
        });
        if (!response.ok) throw new Error('Failed to fetch columns');
        return (await response.json()) as ColumnDto[];
    }
);

// --- Slice ---

const initialState: ColumnState = { itemsByBoard: {}, status: 'idle', error: null };

const columnSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        reorderColumnsLocally: (state, action: PayloadAction<{ boardId: number; orderedColumns: ColumnDto[] }>) => {
            state.itemsByBoard[action.payload.boardId] = action.payload.orderedColumns;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchColumnsForBoard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchColumnsForBoard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const boardId = action.meta.arg;
                state.itemsByBoard[boardId] = action.payload;
            })
            .addCase(fetchColumnsForBoard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error';
            })
            .addCase(createColumn.fulfilled, (state, action) => {
                const boardId = (action.meta.arg as CreateColumnArgs).boardId;
                if (!state.itemsByBoard[boardId]) state.itemsByBoard[boardId] = [];
                state.itemsByBoard[boardId].push(action.payload);
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                const updatedColumn = action.payload;
                const boardId = updatedColumn.boardId;
                const list = state.itemsByBoard[boardId];
                if (!list) return;
                const index = list.findIndex(c => c.id === updatedColumn.id);
                if (index !== -1) {
                    list[index].title = updatedColumn.title;
                    if (updatedColumn.settings) {
                        list[index].settings = updatedColumn.settings;
                    }
                }
            })
            .addCase(deleteColumn.fulfilled, (state, action) => {
                const columnId = action.payload;
                const boardId = (action.meta.arg as DeleteColumnArgs).boardId;
                if (state.itemsByBoard[boardId]) {
                    state.itemsByBoard[boardId] = state.itemsByBoard[boardId].filter(c => c.id !== columnId);
                }
            })
            .addCase(updateColumnOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateColumnOrder.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateColumnOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error';
            });
    },
});

export const { reorderColumnsLocally } = columnSlice.actions;
export default columnSlice.reducer;
