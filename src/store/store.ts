import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import notificationReducer from './slices/notificationSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage kullanır
import selectedRowsReducer from './slices/selectedRowsSlice'
import staffLeaveReducer from './slices/staffLeaveSlice'
import overtimeReducer from './slices/overtimeSlice'
import { createGenericSlice } from './genericSliceFactory';
import {  ProjectReport, Projects } from '@/types/commonType';
import opportunitySliceReducer from './slices/opportunitySlice';
import  customerReducer from  './slices/customerSlice';
import  activityReducer from  './slices/activitySlice';
import  userReducer from  './slices/userSlice';
import  priceOfferReducer from  './slices/priceOfferSlice';
import personelReducer from './slices/personalSlice';
import systemLogReducer from './slices/systemLogSlice'
import { ContractsDto, ContractsDtoForInsertion, ContractsDtoForUpdate, PersonelWithEducationDto, Products } from '@/api/apiDtos';
import enterpriseReducer from './slices/enterpriseSlice';
import fileRecordReducer from './slices/fileRecordSlice';
import { sliceBuilder } from './sliceBuilder';
import { URL } from '@/api';
import boardReducer from './features/boardSlice';
import boardViewReducer from './features/boardViewSlice';
import columnReducer from './features/columnSlice';
import groupReducer from './features/groupSlice';
import itemReducer from './features/itemSlice';
export const projectsSlice = createGenericSlice<Projects>('project', '/projects');
export const productsSlice = createGenericSlice<Products>('product', '/products');
export const projectReportSlice = createGenericSlice<ProjectReport>('projectReport', '/projectreport');
export const personelWithEducationSlice = createGenericSlice<PersonelWithEducationDto>('personel', '/personel');
export const contractSlice = sliceBuilder<ContractsDtoForInsertion,ContractsDtoForUpdate,ContractsDto>({ name:"contract", url:URL+"/contracts"});

const rootReducer = combineReducers({
  notification:notificationReducer,
  login: loginReducer,
  selectedRows:selectedRowsReducer,
  staffLeave:staffLeaveReducer,
  overtime:overtimeReducer,
  projects:projectsSlice.reducer,
  products:productsSlice.reducer,
  projectReport:projectReportSlice.reducer,
  personelWithEducation:personelWithEducationSlice.reducer,
  // contract:contractSlice.reducer,
  opportunity: opportunitySliceReducer,
  customer: customerReducer,
  activity: activityReducer,
    user: userReducer,
  priceOffer : priceOfferReducer,
  personel : personelReducer,
  systemLog : systemLogReducer,
  enterprise: enterpriseReducer,
  fileRecord:fileRecordReducer,
  boards :boardReducer,
  boardViews :boardViewReducer,
  columns:columnReducer,
  groups:groupReducer,
  items:itemReducer
})
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'], // hangi slicelar kaydedilecek
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Store
export const store = configureStore({
  reducer: persistedReducer,
});

// 5️⃣ Persistor
export const persistor = persistStore(store);
// 2️⃣ Persist config
store.subscribe(() => {
  // console.log('State değişti:', store.getState());
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Memoized selector to select offers by status
// export const selectOffersByStatus = createSelector(
//   [(state: RootState) => state.offers.offers, (_, status: string) => status],
//   (offers, status) => offers.filter((offer) => offer.status === status)
// );
// TODO : need to remove this customSelector if possible

export default store;