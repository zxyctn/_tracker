import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ActionsSliceType } from '../types';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState: <ActionsSliceType>{
    edit: false,
    add: false,
    update: false,
  },
  reducers: {
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
    setAdd: (state, action: PayloadAction<boolean>) => {
      state.add = action.payload;
    },
    setUpdate: (state, action: PayloadAction<boolean>) => {
      state.update = action.payload;
    },
  },
});

export const { setEdit, setAdd, setUpdate } = actionsSlice.actions;

export default actionsSlice.reducer;
