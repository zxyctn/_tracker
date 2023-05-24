import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { GroupType } from '../types';

const localStorageData = window?.localStorage?.getItem('groups');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as GroupType[])
  : <GroupType[]>[
      {
        id: 1,
        name: 'Chest',
        exercises: [1, 2, 3],
      },
      {
        id: 2,
        name: 'Cardio',
        exercises: [4],
      },
    ];
window.localStorage.setItem('groups', JSON.stringify(initialState));

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialState,
  reducers: {
    getGroups: (state) => {},
    add: (state, action: PayloadAction<{ group: GroupType }>) => {
      state.push(action.payload.group);
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((group) => group.id !== action.payload.id);
      window.localStorage.setItem('groups', JSON.stringify(state));
    },
    edit: (state, action: PayloadAction<{ id: number; value: GroupType }>) => {
      state = state.map((group) => {
        if (group.id === action.payload.id) {
          group = action.payload.value;
        }
        return group;
      });
      window.localStorage.setItem('groups', JSON.stringify(state));
    },
    addExercise: (
      state,
      action: PayloadAction<{ id: number; exercise: number }>
    ) => {
      state = state.map((group) => {
        if (group.id === action.payload.id) {
          group.exercises.push(action.payload.exercise);
        }
        return group;
      });
      window.localStorage.setItem('groups', JSON.stringify(state));
    },
    removeExercise: (
      state,
      action: PayloadAction<{ groupId: number; exercise: number }>
    ) => {
      state = state.map((group) => {
        if (group.id === action.payload.groupId) {
          group.exercises = group.exercises.filter(
            (exercise) => exercise !== action.payload.exercise
          );
        }
        return group;
      });
      window.localStorage.setItem('groups', JSON.stringify(state));
    },
  },
});

export const { getGroups, add, remove, addExercise, removeExercise } =
  groupsSlice.actions;

export default groupsSlice.reducer;
