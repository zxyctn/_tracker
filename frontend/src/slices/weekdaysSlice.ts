import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupType, WeekdaysType } from '../types';

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const weekdaysSlice = createSlice({
  name: 'weekdays',
  initialState: weekdays.reduce((acc: WeekdaysType, day: string) => {
    acc[day] = {
      groups: [],
      active: true,
    };
    return acc;
  }, {}),
  reducers: {
    activate: (state, action: PayloadAction<{ day: string }>) => {
      state[action.payload.day].active = true;
    },
    deactivate: (state, action: PayloadAction<{ day: string }>) => {
      state[action.payload.day].active = false;
    },
    add: (state, action: PayloadAction<{ day: string; group: number }>) => {
      state[action.payload.day].groups.push(action.payload.group);
    },
    remove: (state, action: PayloadAction<{ day: string; id: number }>) => {
      state[action.payload.day].groups = state[
        action.payload.day
      ].groups.filter((group) => group !== action.payload.id);
    },
  },
});

export const { activate, deactivate, add, remove } = weekdaysSlice.actions;

export default weekdaysSlice.reducer;
