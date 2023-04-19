import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecordType } from '../types';

export const recordsSlice = createSlice({
  name: 'records',
  initialState: <RecordType[]>[],
  reducers: {
    add: (state, action: PayloadAction<{ record: RecordType }>) => {
      state.push(action.payload.record);
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((record) => record.id !== action.payload.id);
    },
  },
});

export const { add, remove } = recordsSlice.actions;

export default recordsSlice.reducer;
