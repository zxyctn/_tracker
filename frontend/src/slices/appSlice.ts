import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AppSliceType, BreadcumbType, UserType } from '../types';

const localStorageData = window?.localStorage?.getItem('app');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as AppSliceType)
  : {
      filterBy: 'weekdays',
      user: null,
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
      return state;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      window.localStorage.setItem('app', JSON.stringify(state));
      return state;
    },
    setBreadcrumbs: (state, action: PayloadAction<BreadcumbType[]>) => {
      state.breadcrumbs = action.payload;
      window.localStorage.setItem('app', JSON.stringify(state));
      return state;
    },
  },
});

export const { setFilterBy, setUser, setBreadcrumbs } = appSlice.actions;

export default appSlice.reducer;
