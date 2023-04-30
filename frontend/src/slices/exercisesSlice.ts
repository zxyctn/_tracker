import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExerciseType } from '../types';
import setsSlice, { deactivate } from './setsSlice';

const localStorageData = window?.localStorage?.getItem('exercises');
const initialState = localStorageData
  ? (JSON.parse(localStorageData) as ExerciseType[])
  : <ExerciseType[]>[
      {
        id: 1,
        name: 'Bench press',
        description: 'Bench press description',
        sets: [1, 4, 5, 6],
        history: [1],
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
    ];
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
          const set = exercise.sets.find((set) => set === action.payload.set);
          if (!set) {
            deactivate({ id: action.payload.set });
          }
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
