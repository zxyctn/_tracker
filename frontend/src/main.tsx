import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

import App from './App';
import Error from './routes/Error';
import Login from './routes/Login';
import Register from './routes/Register';
import Weekdays from './routes/Weekdays';
import Weekday from './routes/Weekday';
import Groups from './routes/Groups';
import Group from './routes/Group';
import { setBreadcrumbs } from './slices/appSlice';
import Exercise from './routes/Exercise';
import { ExerciseType } from './types';
import { getBreadcrumbs } from './shared';

export function rootLoader() {
  const { app } = store.getState();
  return app;
}

export function weekdaysLoader() {
  const { weekdays } = store.getState();

  store.dispatch(setBreadcrumbs([]));
  return weekdays;
}

export function groupsLoader() {
  const { groups } = store.getState();

  store.dispatch(setBreadcrumbs([]));
  return groups;
}

export function exerciseLoader({ params }: LoaderFunctionArgs) {
  const exercise = parseInt(params.exercise as string);
  const { exercises, sets } = store.getState();
  const exerciseData = exercises.find((e) => e.id === exercise) as ExerciseType;
  const exerciseSets = exerciseData.sets.map((set) =>
    sets.find((s) => s.id === set)
  );

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));

  return {
    data: exerciseData,
    sets: exerciseSets,
  };
}

export function groupLoader({ params }: LoaderFunctionArgs) {
  const group = parseInt(params.group as string);
  const groupData = store.getState().groups.find((g) => g.id === group);
  const groupExercises = store
    .getState()
    .exercises.filter((exercise) => groupData?.exercises.includes(exercise.id));

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));

  return {
    data: groupData,
    exercises: groupExercises,
  };
}

export function weekdayLoader({ params }: LoaderFunctionArgs) {
  const { weekday } = params;
  const weekdayData = store.getState().weekdays[weekday as string];

  const weekdayGroups = store
    .getState()
    .groups.filter((group) => weekdayData.groups.includes(group.id));

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));

  return {
    data: weekdayData,
    groups: weekdayGroups,
  };
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    loader: rootLoader,
    children: [
      {
        path: 'd',
        element: <Weekdays />,
        loader: weekdaysLoader,
      },
      {
        path: 'd/:weekday',
        loader: weekdayLoader,
        element: <Weekday />,
      },
      {
        path: 'd/:weekday/g/:group',
        loader: groupLoader,
        element: <Group />,
      },
      {
        path: 'd/:weekday/g/:group/e/:exercise',
        loader: exerciseLoader,
        element: <Exercise />,
      },
      {
        path: 'g',
        element: <Groups />,
        loader: groupsLoader,
      },
      {
        path: 'g/:group',
        loader: groupLoader,
        element: <Group />,
      },
      {
        path: 'g/:group/e/:exercise',
        loader: exerciseLoader,
        element: <Exercise />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
