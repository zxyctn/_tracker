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
import GroupExercises from './routes/GroupExercises';
import ExerciseSets from './routes/ExerciseSets';
import Set from './routes/Set';
import store from './store';
import { getBreadcrumbs } from './shared';
import { setBreadcrumbs } from './slices/appSlice';
import { setAdd, addNotPossible } from './slices/actionsSlice';
import Preferences from './routes/Preferences';
import Exercise from './routes/Exercise';

export function rootLoader() {
  const { app } = store.getState();
  store.dispatch(setBreadcrumbs([]));
  store.dispatch(addNotPossible());
  return app;
}

export function preferencesLoader() {
  store.dispatch(
    setBreadcrumbs([
      {
        name: 'Preferences',
        path: '/preferences',
      },
    ])
  );
  store.dispatch(addNotPossible());
  return {};
}

export function weekdaysLoader() {
  const { weekdays } = store.getState();

  store.dispatch(setBreadcrumbs([]));
  store.dispatch(addNotPossible());
  return weekdays;
}

export function groupsLoader() {
  const { groups } = store.getState();

  store.dispatch(setBreadcrumbs([]));
  store.dispatch(addNotPossible());
  return groups;
}

export function setLoader({ params }: LoaderFunctionArgs) {
  const { exercises } = store.getState();
  const set = parseInt(params.set as string);
  const exercise = parseInt(params.exercise as string);

  if (!exercises.find((e) => e.id === exercise)?.sets.includes(set)) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));
  store.dispatch(addNotPossible());

  return {
    id: set,
  };
}
export function exerciseLoader({ params }: LoaderFunctionArgs) {
  const { groups } = store.getState();
  const group = parseInt(params.group as string);
  const exercise = parseInt(params.exercise as string);

  if (!groups.find((g) => g.id === group)?.exercises.includes(exercise)) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));
  store.dispatch(
    setAdd({
      value: false,
      possible: false,
      object: null,
      result: null,
      prototype: null,
      type: 'SET',
      pages: 2,
      page: 0,
      id: exercise,
    })
  );

  return {
    id: exercise,
  };
}
export function exerciseSetsLoader({ params }: LoaderFunctionArgs) {
  const { groups } = store.getState();
  const group = parseInt(params.group as string);
  const exercise = parseInt(params.exercise as string);

  if (!groups.find((g) => g.id === group)?.exercises.includes(exercise)) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));
  store.dispatch(
    setAdd({
      value: false,
      possible: true,
      object: null,
      result: null,
      prototype: null,
      type: 'SET',
      pages: 2,
      page: 0,
      id: exercise,
    })
  );

  return {
    id: exercise,
  };
}

export function groupLoader({ params }: LoaderFunctionArgs) {
  const { weekday } = params;
  const { weekdays } = store.getState();
  const group = parseInt(params.group as string);

  if (weekday && !weekdays[weekday].groups.includes(group)) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));

  store.dispatch(
    setAdd({
      value: false,
      possible: false,
      object: null,
      result: null,
      prototype: null,
      type: 'EXERCISE',
      pages: 2,
      page: 0,
      id: group,
    })
  );

  return {
    id: group,
  };
}

export function groupExercisesLoader({ params }: LoaderFunctionArgs) {
  const { weekday } = params;
  const { weekdays } = store.getState();
  const group = parseInt(params.group as string);

  if (weekday && !weekdays[weekday].groups.includes(group)) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));

  store.dispatch(
    setAdd({
      value: false,
      possible: true,
      object: null,
      result: null,
      prototype: null,
      type: 'EXERCISE',
      pages: 2,
      page: 0,
      id: group,
    })
  );

  return {
    id: group,
  };
}

export function weekdayLoader({ params }: LoaderFunctionArgs) {
  const { weekday } = params;

  store.dispatch(setBreadcrumbs(getBreadcrumbs(params)));
  store.dispatch(
    setAdd({
      value: false,
      possible: true,
      object: null,
      result: null,
      prototype: null,
      type: 'GROUP',
      pages: 2,
      page: 0,
      id: weekday as string,
    })
  );

  return {
    id: weekday,
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

const router = createBrowserRouter(
  [
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
          path: 'd/:weekday/g/:group/e',
          loader: groupExercisesLoader,
          element: <GroupExercises />,
        },
        {
          path: 'd/:weekday/g/:group/e/:exercise',
          loader: exerciseLoader,
          element: <Exercise />,
        },
        {
          path: 'd/:weekday/g/:group/e/:exercise/s',
          loader: exerciseSetsLoader,
          element: <ExerciseSets />,
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
          path: 'g/:group/e',
          loader: groupExercisesLoader,
          element: <GroupExercises />,
        },
        {
          path: 'g/:group/e/:exercise',
          loader: exerciseLoader,
          element: <Exercise />,
        },
        {
          path: 'g/:group/e/:exercise/s',
          loader: exerciseSetsLoader,
          element: <ExerciseSets />,
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
        {
          path: 'preferences',
          loader: preferencesLoader,
          element: <Preferences />,
        },
      ],
    },
  ],
  { basename: '/_tracker' }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
