import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeekdaysType } from '../types';

const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const localStorageData = window?.localStorage?.getItem('weekdays');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as WeekdaysType)
  : weekdays.reduce((acc: WeekdaysType, day: string) => {
      acc[day] = {
        groups: [],
        active: true,
        day: day,
      };
      return acc;
    }, {});

window.localStorage.setItem('weekdays', JSON.stringify(initialState));

export const weekdaysSlice = createSlice({
  name: 'weekdays',
  initialState: initialState,
  reducers: {
    activate: (state, action: PayloadAction<{ day: string }>) => {
      state[action.payload.day].active = true;
      window.localStorage.setItem('weekdays', JSON.stringify(state));
    },
    deactivate: (state, action: PayloadAction<{ day: string }>) => {
      state[action.payload.day].active = false;
      window.localStorage.setItem('weekdays', JSON.stringify(state));
    },
    add: (state, action: PayloadAction<{ day: string; group: number }>) => {
      state[action.payload.day].groups.push(action.payload.group);
      window.localStorage.setItem('weekdays', JSON.stringify(state));
    },
    remove: (state, action: PayloadAction<{ day: string; id: number }>) => {
      state[action.payload.day].groups = state[
        action.payload.day
      ].groups.filter((group) => group !== action.payload.id);
      window.localStorage.setItem('weekdays', JSON.stringify(state));
    },
  },
});

export const { activate, deactivate, add, remove } = weekdaysSlice.actions;

export default weekdaysSlice.reducer;