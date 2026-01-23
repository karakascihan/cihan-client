import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { BoardDto } from '@/api/apiDtos';
import { URL } from '@/api';

// State'imizin tipini tanımlıyoruz
interface BoardState {
    items: BoardDto[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedBoardId: number | null;
}

// Başlangıç state'ini bu tiple oluşturuyoruz
const initialState: BoardState = {
    items: [],
    status: 'idle',
    error: null,
    selectedBoardId: 7,  
};

// YENİ ASENKRON ACTION: Bir panoyu güncellemek için
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
            if (!response.ok) {
                throw new Error('Failed to update board');
            }
            return { id: boardId, ...boardData } as BoardDto;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Board update failed');
        }
    }
);

// YENİ ASENKRON ACTION: Bir panoyu silmek için
interface DeleteBoardArgs {
    boardId: number;
}
export const deleteBoard = createAsyncThunk<number, DeleteBoardArgs>(
    'boards/deleteBoard',
    async ({ boardId },{getState}) => {
        const state = getState() as RootState;
        await fetch(`${URL}/board/${boardId}`, { 
            method: 'DELETE',
            headers: { authorization: `Bearer ${state.login.accessToken}` }
        });
        return boardId; // Reducer'a silinen panonun ID'sini döndür
    }
);
// createAsyncThunk'ı tiplemek:
// 1. Dönecek verinin tipi (Board[]), 2. argüman tipi (void), 3. thunk'ın ekstra tipleri
export const fetchBoards = createAsyncThunk<BoardDto[]>(
    'boards/fetchBoards', 
    async (_, { getState }) => {
        const state = getState() as RootState;
        const response = await fetch(`${URL}/Board/getall`,{headers: {authorization: `Bearer ${state.login.accessToken}`}});
        // fetch'in de tip-güvenli olması için kontrol ekleyebiliriz
        if (!response.ok) {
            throw new Error('Server responded with an error!');
        }
        const data: BoardDto[] = await response.json();
        return data;
    }
);
export const createBoard = createAsyncThunk<BoardDto, { name: string; description?: string }>(
    'boards/createBoard',
    async (newBoardData, { getState }) => {
         const state = getState() as RootState;
        const response = await fetch(`${URL}/board`, { // DİKKAT: Controller adınız "BoardController" ise burası "board" olmalı
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',authorization: `Bearer ${state.login.accessToken}`
            },
            body: JSON.stringify(newBoardData),
            
        });
        if (!response.ok) {
            throw new Error('Server responded with an error!');
        }
        const createdBoard: BoardDto = await response.json();
        return createdBoard;
    }
);

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: { 
        setSelectedBoard: (state, action: PayloadAction<number | null>) => {
            state.selectedBoardId = action.payload;
        }
     },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardDto[]>) => {
                state.status = 'succeeded';
                state.items = action.payload; // Payload'ın artık bir Board dizisi olduğu biliniyor!
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            // Pano başarıyla oluşturulduğunda
            .addCase(createBoard.fulfilled, (state, action: PayloadAction<BoardDto>) => {
                // Yeni panoyu mevcut pano listesine ekle.
                // Bu sayede sayfa yenilemeden arayüz anında güncellenir!
                state.items.push(action.payload);
            })// Pano başarıyla güncellendiğinde
            .addCase(updateBoard.fulfilled, (state, action: PayloadAction<BoardDto>) => {
                const updatedBoard = action.payload;
                const index = state.items.findIndex(b => b.id === updatedBoard.id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...updatedBoard };
                }
            })
            // Pano başarıyla silindiğinde
            .addCase(deleteBoard.fulfilled, (state, action: PayloadAction<number>) => {
                const deletedBoardId = action.payload;
                // Panoyu listeden kaldır
                state.items = state.items.filter(b => b.id !== deletedBoardId);
                // Eğer silinen pano o an seçili olan pano ise, seçimi temizle
                if (state.selectedBoardId === deletedBoardId) {
                    state.selectedBoardId = null;
                }
            });
        },
});
// const boardSlice = createSlice({
//     name: 'boards',
//     initialState,
    
//     reducers: {
//         setSelectedBoard: (state, action: PayloadAction<number | null>) => {
//             state.selectedBoardId = action.payload;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchBoards.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
//                 state.status = 'succeeded';
//                 state.items = action.payload; // Payload'ın artık bir Board dizisi olduğu biliniyor!
//             })
//             .addCase(fetchBoards.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || 'Something went wrong';
//             });
//     },
// });

export const { setSelectedBoard } = boardSlice.actions;

// 1. Girdi Selector'ları: State'ten ham veriyi çeken basit fonksiyonlar.
const selectBoardItems = (state: RootState) => state.boards.items;
const selectSelectedBoardId = (state: RootState) => state.boards.selectedBoardId;

// 2. Çıktı Selector'ı (Memoized):
// Bu selector, sadece girdi selector'larının sonuçları değiştiğinde yeniden çalışır.
export const selectSelectedBoard = createSelector(
  [selectBoardItems, selectSelectedBoardId], // Girdiler
  (boards, selectedId) => {
    // Bu fonksiyon sadece 'boards' veya 'selectedId' değiştiğinde tetiklenir.
    if (!selectedId) return null;
    return boards.find(board => board.id === selectedId) || null;
  }
);

export default boardSlice.reducer;