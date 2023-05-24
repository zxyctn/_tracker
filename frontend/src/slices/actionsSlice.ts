import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type {
  ActionsSliceType,
  AddType,
  ConfirmType,
  EditType,
} from '../types';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState: <ActionsSliceType>{
    edit: {
      value: false,
      result: null,
    },
    add: {
      value: false,
      result: null,
      type: '',
      object: null,
    },
    confirm: {
      value: false,
      result: null,
      type: '',
      id: -1,
    },
  },
  reducers: {
    setEdit: (state, action: PayloadAction<EditType>) => {
      state.edit = action.payload;
    },
    setAdd: (state, action: PayloadAction<AddType>) => {
      state.add = action.payload;
    },
    setConfirm: (state, action: PayloadAction<ConfirmType>) => {
      state.confirm = action.payload;
    },
  },
});

export const { setEdit, setAdd, setConfirm } = actionsSlice.actions;

export default actionsSlice.reducer;
