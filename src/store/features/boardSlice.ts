import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { BoardDto } from '@/api/apiDtos';
import { URL } from '@/api';

interface BoardState {
    items: BoardDto[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BoardState = {
    items: [],
    status: 'idle',
    error: null,
};

interface UpdateBoardArgs {
    boardId: number;
    boardData: { name: string; description?: string };
}
export const updateBoard = createAsyncThunk<BoardDto, UpdateBoardArgs>(
    'boards/updateBoard',
    async ({ boardId, boardData }, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        try {
            const response = await fetch(`${URL}/board/${boardId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
                body: JSON.stringify(boardData),
            });
            if (!response.ok) throw new Error('Failed to update board');
            return { id: boardId, ...boardData } as BoardDto;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Board update failed');
        }
    }
);

interface DeleteBoardArgs {
    boardId: number;
}
export const deleteBoard = createAsyncThunk<number, DeleteBoardArgs>(
    'boards/deleteBoard',
    async ({ boardId }, { getState }) => {
        const state = getState() as RootState;
        await fetch(`${URL}/board/${boardId}`, {
            method: 'DELETE',
            headers: { authorization: `Bearer ${state.login.accessToken}` }
        });
        return boardId;
    }
);

export const fetchBoards = createAsyncThunk<BoardDto[]>(
    'boards/fetchBoards',
    async (_, { getState }) => {
        const state = getState() as RootState;
        const response = await fetch(`${URL}/Board/getall`, { headers: { authorization: `Bearer ${state.login.accessToken}` } });
        if (!response.ok) throw new Error('Server responded with an error!');
        return (await response.json()) as BoardDto[];
    }
);

export const createBoard = createAsyncThunk<BoardDto, { name: string; description?: string }>(
    'boards/createBoard',
    async (newBoardData, { getState }) => {
        const state = getState() as RootState;
        const response = await fetch(`${URL}/board`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${state.login.accessToken}` },
            body: JSON.stringify(newBoardData),
        });
        if (!response.ok) throw new Error('Server responded with an error!');
        return (await response.json()) as BoardDto;
    }
);

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardDto[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createBoard.fulfilled, (state, action: PayloadAction<BoardDto>) => {
                state.items.push(action.payload);
            })
            .addCase(updateBoard.fulfilled, (state, action: PayloadAction<BoardDto>) => {
                const updatedBoard = action.payload;
                const index = state.items.findIndex(b => b.id === updatedBoard.id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...updatedBoard };
                }
            })
            .addCase(deleteBoard.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(b => b.id !== action.payload);
            });
    },
});

export default boardSlice.reducer;
