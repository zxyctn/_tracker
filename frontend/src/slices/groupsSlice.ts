import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupType } from '../types';

const localStorageData = window?.localStorage?.getItem('groups');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as GroupType[])
  : <GroupType[]>[];
window.localStorage.setItem('groups', JSON.stringify(initialState));

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialState,
  reducers: {
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

export const { add, remove, addExercise, removeExercise } = groupsSlice.actions;

export default groupsSlice.reducer;