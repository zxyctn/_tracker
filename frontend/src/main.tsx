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
import { pushBreadcrumb, setBreadcrumbs } from './slices/appSlice';
import Exercise from './routes/Exercise';
import { ExerciseType } from './types';

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

export function exerciseLoader({ params, request }: LoaderFunctionArgs) {
  const exercise = parseInt(params.exercise as string);
  const exerciseData = store
    .getState()
    .exercises.find((e) => e.id === exercise) as ExerciseType;

  const { sets } = store.getState();
  const exerciseSets = exerciseData.sets.map((set) =>
    sets.find((s) => s.id === set)
  );

  store.dispatch(
    pushBreadcrumb({
      name: exerciseData.name,
      path: request.url,
    })
  );

  return {
    data: exerciseData,
    exercises: exerciseSets,
  };
}

export function groupLoader({ params, request }: LoaderFunctionArgs) {
  const group = parseInt(params.group as string);
  const groupData = store.getState().groups.find((g) => g.id === group);

  const { exercises } = store.getState();
  const groupExercises = exercises.filter((exercise) =>
    groupData?.exercises.includes(exercise.id)
  );

  store.dispatch(
    pushBreadcrumb({ name: groupData?.name as string, path: request.url })
  );

  return {
    data: groupData,
    exercises: groupExercises,
  };
}

export function weekdayLoader({ params, request }: LoaderFunctionArgs) {
  const { weekday } = params;
  const weekdayData = store.getState().weekdays[weekday as string];

  const { groups } = store.getState();
  const weekdayGroups = groups.filter((group) =>
    weekdayData.groups.includes(group.id)
  );

  store.dispatch(
    pushBreadcrumb({ name: weekday as string, path: request.url })
  );

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
        path: 'weekdays',
        element: <Weekdays />,
        loader: weekdaysLoader,
      },
      {
        path: 'weekdays/:weekday',
        loader: weekdayLoader,
        element: <Weekday />,
      },
      {
        path: 'weekdays/:weekday/groups/:group',
        loader: groupLoader,
        element: <Group />,
      },
      {
        path: 'weekdays/:weekday/groups/:group/exercises/:exercise',
        loader: exerciseLoader,
        element: <Exercise />,
      },
      {
        path: 'groups',
        element: <Groups />,
        loader: groupsLoader,
      },
      {
        path: 'groups/:group',
        loader: groupLoader,
        element: <Group />,
      },
      {
        path: 'groups/:group/exercises/:exercise',
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
