import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SetType } from '../types';

const localStorageData = window?.localStorage?.getItem('sets');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as SetType[])
  : <SetType[]>[
      {
        id: 1,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 10,
            goal: false,
          },
          {
            goal: true,
            type: 'REP',
            unit: '',
            value: 12,
          },
        ],
      },
      {
        id: 2,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 12,
            goal: false,
          },
          { goal: true, type: 'REP', unit: '', value: 12 },
        ],
      },
      {
        id: 3,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 8,
            goal: false,
          },
          { goal: true, type: 'REP', unit: '', value: 12 },
        ],
      },
      {
        id: 4,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 12,
            goal: false,
          },
          { goal: true, type: 'REP', unit: '', value: 10 },
        ],
      },
      {
        id: 5,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            goal: false,
            value: 14,
          },
          { goal: true, type: 'REP', unit: '', value: 10 },
        ],
      },
      {
        id: 6,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            goal: false,
            value: 16,
          },
          { goal: true, type: 'REP', unit: '', value: 8 },
        ],
      },
      {
        id: 7,
        fields: [
          {
            type: 'S',
            unit: 'KPH',
            value: 10.0,
            goal: false,
          },
          {
            type: 'E',
            unit: '',
            value: 11.0,
            goal: false,
          },
          { goal: true, type: 'CAL', unit: '', value: 150 },
        ],
      },
    ];
window.localStorage.setItem('sets', JSON.stringify(initialState));

export const setsSlice = createSlice({
  name: 'sets',
  initialState: initialState,
  reducers: {
    setSet: (state, action: PayloadAction<SetType>) => {
      state = state.map((set) => {
        if (set.id === action.payload.id) {
          set = action.payload;
        }
        return set;
      });
      window.localStorage.setItem('sets', JSON.stringify(state));
      return state;
    },
    removeSet: (state, action: PayloadAction<number>) => {
      state = state.filter((set) => set.id !== action.payload);
      window.localStorage.setItem('sets', JSON.stringify(state));
      return state;
    },
    addSet: (state, action: PayloadAction<SetType>) => {
      state = [...state, action.payload];
      window.localStorage.setItem('sets', JSON.stringify(state));
      return state;
    },
  },
});

export const { setSet, removeSet, addSet } = setsSlice.actions;

export default setsSlice.reducer;
