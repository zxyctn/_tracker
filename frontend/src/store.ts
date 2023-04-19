import { configureStore } from '@reduxjs/toolkit';
import weekdaysSlice from './slices/weekdaysSlice';
import groupsSlice from './slices/groupsSlice';
import recordsSlice from './slices/recordsSlice';
import setsSlice from './slices/setsSlice';
import exercisesSlice from './slices/exercisesSlice';

export default configureStore({
  reducer: {
    weekdays: weekdaysSlice,
    groups: groupsSlice,
    exercises: exercisesSlice,
    records: recordsSlice,
    sets: setsSlice,
  },
});
