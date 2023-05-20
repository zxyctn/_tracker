import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { ActionsSliceType } from '../types';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState: <ActionsSliceType>{
    edit: false,
    add: false,
    complete: false,
    cancel: false,
  },
  reducers: {
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
      return state;
    },
    setAdd: (state, action: PayloadAction<boolean>) => {
      state.add = action.payload;
      return state;
    },
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.complete = action.payload;
      return state;
    },
    setCancel: (state, action: PayloadAction<boolean>) => {
      state.cancel = action.payload;
      return state;
    },
  },
});

export const { setEdit, setAdd, setComplete, setCancel } = actionsSlice.actions;

export default actionsSlice.reducer;
