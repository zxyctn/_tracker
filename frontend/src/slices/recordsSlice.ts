import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecordType } from '../types';

const localStorageData = window?.localStorage?.getItem('records');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as RecordType[])
  : <RecordType[]>[];
window.localStorage.setItem('records', JSON.stringify(initialState));

export const recordsSlice = createSlice({
  name: 'records',
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<{ record: RecordType }>) => {
      state.push(action.payload.record);
      window.localStorage.setItem('records', JSON.stringify(state));
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((record) => record.id !== action.payload.id);
      window.localStorage.setItem('records', JSON.stringify(state));
    },
  },
});

export const { add, remove } = recordsSlice.actions;

export default recordsSlice.reducer;
