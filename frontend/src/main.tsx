import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import Error from './routes/Error';
import Login from './routes/Login';
import Register from './routes/Register';
import Weekdays from './routes/Weekdays';
import Weekday from './routes/Weekday';
import Groups from './routes/Groups';
import Group from './routes/Group';
import Exercise from './routes/Exercise';
import Set from './routes/Set';
import store from './store';
import { getBreadcrumbs } from './shared';
import { setBreadcrumbs } from './slices/appSlice';
import { setAdd } from './slices/actionsSlice';
import type { ExerciseType, SetType } from './types';

export function rootLoader() {
  const { app } = store.getState();
  store.dispatch(setBreadcrumbs([]));
  store.dispatch(setAdd(false));
  return app;
}

export function weekdaysLoader() {
  const { weekdays } = store.getState();

  store.dispatch(setBreadcrumbs([]));
  store.dispatch(setAdd(false));
  return weekdays;
}

export function groupsLoader() {
  const { groups } = store.getState();

  store.dispatch(setBreadcrumbs([]));
  store.dispatch(setAdd(true));
  return groups;
}

export function setLoader({ params }: LoaderFunctionArgs) {
  const { exercises, sets } = store.getState();
  const set = parseInt(params.set as string);
  const exercise = parseInt(params.exercise as string);

  if (!exercises.find((e) => e.id === exercise)?.sets.includes(set)) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  const setData = sets.find((s) => s.id === set) as SetType;

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));
  store.dispatch(setAdd(false));

  return {
    data: setData,
  };
}

export function exerciseLoader({ params }: LoaderFunctionArgs) {
  const { exercises, sets, groups } = store.getState();
  const group = parseInt(params.group as string);
  const exercise = parseInt(params.exercise as string);

  if (!groups.find((g) => g.id === group)?.exercises.includes(exercise)) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  const exerciseData = exercises.find((e) => e.id === exercise) as ExerciseType;
  const exerciseSets = exerciseData.sets.map((set) =>
    sets.find((s) => s.id === set)
  );

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));
  store.dispatch(setAdd(true));

  return {
    data: exerciseData,
    sets: exerciseSets,
  };
}

export function groupLoader({ params }: LoaderFunctionArgs) {
  const { weekday } = params;
  const { groups, exercises, weekdays } = store.getState();
  const group = parseInt(params.group as string);

  if (weekday && !weekdays[weekday].groups.includes(group)) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  const groupData = groups.find((g) => g.id === group);
  const groupExercises = exercises.filter((exercise) =>
    groupData?.exercises.includes(exercise.id)
  );

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));
  store.dispatch(setAdd(true));

  return {
    data: groupData,
    exercises: groupExercises,
  };
}

export function weekdayLoader({ params }: LoaderFunctionArgs) {
  const { weekday } = params;
  const { weekdays, groups } = store.getState();
  const weekdayData = weekdays[weekday as string];

  const weekdayGroups = groups.filter((group) =>
    weekdayData.groups.includes(group.id)
  );

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));
  store.dispatch(setAdd(true));

  return {
    data: weekdayData,
    groups: weekdayGroups,
  };
}

export function loginLoader() {
  store.dispatch(setBreadcrumbs([]));
  return {};
}

export function logoutLoader() {
  store.dispatch(setBreadcrumbs([]));
  return {};
}

export function registerLoader() {
  store.dispatch(setBreadcrumbs([]));
  return {};
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
        path: 'd/:weekday/g/:group/e/:exercise/s/:set',
        loader: setLoader,
        element: <Set />,
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
        path: 'g/:group/e/:exercise/s/:set',
        loader: setLoader,
        element: <Set />,
      },
      {
        path: 'login',
        loader: loginLoader,
        element: <Login />,
      },
      {
        path: 'register',
        loader: registerLoader,
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
