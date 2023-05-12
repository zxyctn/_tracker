import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import weekdaysSlice from './slices/weekdaysSlice';
import groupsSlice from './slices/groupsSlice';
import recordsSlice from './slices/recordsSlice';
import setsSlice from './slices/setsSlice';
import exercisesSlice from './slices/exercisesSlice';
import actionsSlice from './slices/actionsSlice';

export default configureStore({
  reducer: {
    app: appSlice,
    actions: actionsSlice,
    weekdays: weekdaysSlice,
    groups: groupsSlice,
    exercises: exercisesSlice,
    records: recordsSlice,
    sets: setsSlice,
  },
});
