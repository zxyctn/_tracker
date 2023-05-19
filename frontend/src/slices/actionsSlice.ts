import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ActionsSliceType } from '../types';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState: <ActionsSliceType>{
    edit: false,
    add: false,
    update: false,
    move: false,
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
    setUpdate: (state, action: PayloadAction<boolean>) => {
      state.update = action.payload;
      return state;
    },
    setMove: (state, action: PayloadAction<boolean>) => {
      state.move = action.payload;
      return state;
    },
  },
});

export const { setEdit, setAdd, setUpdate, setMove } = actionsSlice.actions;

export default actionsSlice.reducer;
