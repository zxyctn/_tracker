import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldType, SetType } from '../types';

export const setsSlice = createSlice({
  name: 'sets',
  initialState: <SetType[]>[],
  reducers: {
    addField: (
      state,
      action: PayloadAction<{ set: number; field: FieldType }>
    ) => {
      state = state.map((set) => {
        if (set.id === action.payload.set) {
          set.fields.push(action.payload.field);
        }
        return set;
      });
    },
    removeField: (
      state,
      action: PayloadAction<{ set: number; type: string }>
    ) => {
      state = state.map((set) => {
        if (set.id === action.payload.set) {
          set.fields = set.fields.filter(
            (field) => field.type !== action.payload.type
          );
        }
        return set;
      });
    },
    editField: (
      state,
      action: PayloadAction<{ set: number; type: string; value: FieldType }>
    ) => {
      state = state.map((set) => {
        if (set.id === action.payload.set) {
          set.fields = set.fields.map((field) => {
            if (field.type === action.payload.type) {
              field = action.payload.value;
            }
            return field;
          });
        }
        return set;
      });
    },
    setType: (state, action: PayloadAction<{ set: number; type: string }>) => {
      state = state.map((set) => {
        if (set.id === action.payload.set) {
          set.type = action.payload.type;
        }
        return set;
      });
    },
    setUnit: (state, action: PayloadAction<{ set: number; unit: string }>) => {
      state = state.map((set) => {
        if (set.id === action.payload.set) {
          set.unit = action.payload.unit;
        }
        return set;
      });
    },
    setGoal: (state, action: PayloadAction<{ set: number; goal: number }>) => {
      state = state.map((set) => {
        if (set.id === action.payload.set) {
          set.goal = action.payload.goal;
        }
        return set;
      });
    },
  },
});

export const { addField, removeField, editField, setType, setUnit, setGoal } =
  setsSlice.actions;

export default setsSlice.reducer;
