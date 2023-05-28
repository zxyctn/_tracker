import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { removeSet } from './setsSlice';
import type { ExerciseType } from '../types';

const localStorageData = window?.localStorage?.getItem('exercises');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as ExerciseType[])
  : <ExerciseType[]>[
      {
        id: 1,
        name: 'Bench press',
        description: 'Bench press description',
        sets: [1, 4, 5, 6],
        history: [1, 4, 5, 6],
      },
      {
        id: 2,
        name: 'Dumbbell incline bench press',
        description: 'Dumbbell incline bench press description',
        sets: [2],
        history: [2],
      },
      {
        id: 3,
        name: 'Incline dumbbell flyes',
        description: 'Incline dumbbell flyes description',
        sets: [3],
        history: [3],
      },
      {
        id: 4,
        name: 'Running',
        description: 'Running description',
        sets: [7],
        history: [7],
      },
    ];
window.localStorage.setItem('exercises', JSON.stringify(initialState));

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: initialState,
  reducers: {
    addExerciseSet: (
      state,
      action: PayloadAction<{ exercise: number; set: number }>
    ) => {
      state = state.map((exercise) => {
        if (exercise.id === action.payload.exercise) {
          exercise.sets.push(action.payload.set);
          // exercise.history.push(action.payload.record);
        }
        return exercise;
      });
      window.localStorage.setItem('exercises', JSON.stringify(state));
    },
    removeExerciseSet: (
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
      return state;
    },
    setExercise: (
      state,
      action: PayloadAction<{ exercise: number; value: ExerciseType }>
    ) => {
      state = state.map((exercise) => {
        if (exercise.id === action.payload.exercise) {
          return action.payload.value;
        }
        return exercise;
      });
      window.localStorage.setItem('exercises', JSON.stringify(state));
      return state;
    },
    removeExercise: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((e) => e.id !== action.payload.id);
      window.localStorage.setItem('exercises', JSON.stringify(state));
      return state;
    },
  },
});

export const {
  addExerciseSet,
  removeExerciseSet,
  setExercise,
  removeExercise,
} = exercisesSlice.actions;

export default exercisesSlice.reducer;
