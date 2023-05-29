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
      prototype: null,
      possible: false,
      pages: 0,
      page: 0,
      id: -1,
    },
    confirm: {
      value: false,
      result: null,
      type: '',
      id: -1,
      parent: -1,
    },
  },
  reducers: {
    setEdit: (state, action: PayloadAction<EditType>) => {
      state.edit = action.payload;
    },
    setAdd: (state, action: PayloadAction<AddType>) => {
      state.add = action.payload;
    },
    setAddObject: (state, action: PayloadAction<AddType['object']>) => {
      state.add.object = action.payload;
    },
    addNotPossible: (state) => {
      state.add = {
        value: false,
        possible: false,
        object: null,
        result: null,
        prototype: null,
        type: '',
        pages: 0,
        page: 0,
        id: -1,
      };
    },
    nextPage: (state) => {
      state.add.page += 1;
    },
    prevPage: (state) => {
      state.add.page -= 1;
    },
    setConfirm: (state, action: PayloadAction<ConfirmType>) => {
      state.confirm = action.payload;
    },
  },
});

export const {
  setEdit,
  setAdd,
  setAddObject,
  prevPage,
  nextPage,
  addNotPossible,
  setConfirm,
} = actionsSlice.actions;

export default actionsSlice.reducer;
