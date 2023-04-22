import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExerciseType } from '../types';

const localStorageData = window?.localStorage?.getItem('exercises');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as ExerciseType[])
  : <ExerciseType[]>[];
window.localStorage.setItem('exercises', JSON.stringify(initialState));

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{ exercise: number; set: number; record: number }>
    ) => {
      state = state.map((exercise) => {
        if (exercise.id === action.payload.exercise) {
          exercise.sets.push(action.payload.set);
          exercise.history.push(action.payload.record);
        }
        return exercise;
      });
      window.localStorage.setItem('exercises', JSON.stringify(state));
    },
    remove: (
      state,
      action: PayloadAction<{ exercise: number; set: number }>
    ) => {
      state = state.map((exercise) => {
        if (exercise.id === action.payload.exercise) {
          exercise.sets = exercise.sets.filter(
            (set) => set !== action.payload.set
          );
        }
        return exercise;
      });
      window.localStorage.setItem('exercises', JSON.stringify(state));
    },
    edit: (
      state,
      action: PayloadAction<{ exercise: number; value: ExerciseType }>
    ) => {
      state = state.map((exercise) => {
        if (exercise.id === action.payload.exercise) {
          exercise = action.payload.value;
        }
        return exercise;
      });
      window.localStorage.setItem('exercises', JSON.stringify(state));
    },
  },
});

export const { add, remove, edit } = exercisesSlice.actions;

export default exercisesSlice.reducer;
