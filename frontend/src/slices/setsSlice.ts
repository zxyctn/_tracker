import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldType, SetType } from '../types';

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
          },
        ],
        goal: {
          type: 'REP',
          unit: '',
          value: 12,
        },
        active: true,
      },
      {
        id: 2,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 12,
          },
        ],
        goal: {
          type: 'REP',
          unit: '',
          value: 12,
        },
        active: true,
      },
      {
        id: 3,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 8,
          },
        ],
        goal: {
          type: 'REP',
          unit: '',
          value: 12,
        },
        active: true,
      },
      {
        id: 4,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 12,
          },
        ],
        goal: {
          type: 'REP',
          unit: '',
          value: 10,
        },
        active: true,
      },
      {
        id: 5,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 14,
          },
        ],
        goal: {
          type: 'REP',
          unit: '',
          value: 10,
        },
        active: true,
      },
      {
        id: 6,
        fields: [
          {
            type: 'W',
            unit: 'KG',
            value: 16,
          },
        ],
        goal: {
          type: 'REP',
          unit: '',
          value: 8,
        },
        active: true,
      },
      {
        id: 7,
        fields: [
          {
            type: 'S',
            unit: 'KPH',
            value: 10.0,
          },
          {
            type: 'E',
            unit: null,
            value: 11.0,
          },
        ],
        goal: {
          type: 'CAL',
          unit: '',
          value: 150,
        },
        active: true,
      },
    ];
window.localStorage.setItem('sets', JSON.stringify(initialState));

export const setsSlice = createSlice({
  name: 'sets',
  initialState: initialState,
  reducers: {
    activate: (state, action: PayloadAction<{ id: number }>) => {
      state = state.map((set) => {
        if (set.id === action.payload.id) {
          set.active = true;
        }
        return set;
      });
      window.localStorage.setItem('sets', JSON.stringify(state));
      return state;
    },
    deactivate: (state, action: PayloadAction<{ id: number }>) => {
      state = state.map((set) => {
        if (set.id === action.payload.id) {
          set.active = false;
        }
        return set;
      });
      window.localStorage.setItem('sets', JSON.stringify(state));
      return state;
    },
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
  },
});

export const { activate, deactivate, setSet } = setsSlice.actions;

export default setsSlice.reducer;
