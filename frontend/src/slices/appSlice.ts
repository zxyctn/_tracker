import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppSliceType, BreadcumbType, UserType } from '../types';
import { Params } from 'react-router-dom';
import store from '../store';

const localStorageData = window?.localStorage?.getItem('app');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as AppSliceType)
  : {
      filterBy: 'weekdays',
      user: null,
      edit: false,
      breadcrumbs: <BreadcumbType[]>[],
    };
window.localStorage.setItem('app', JSON.stringify(initialState));

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy = action.payload;
      window.localStorage.setItem('app', JSON.stringify(state));
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      window.localStorage.setItem('app', JSON.stringify(state));
    },
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
      window.localStorage.setItem('app', JSON.stringify(state));
    },
    setBreadcrumbs: (state, action: PayloadAction<BreadcumbType[]>) => {
      state.breadcrumbs = action.payload;
      window.localStorage.setItem('app', JSON.stringify(state));
    },
  },
});

export const { setFilterBy, setUser, setEdit, setBreadcrumbs } =
  appSlice.actions;

export default appSlice.reducer;
