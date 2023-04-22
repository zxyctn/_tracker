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

export function storeLoader() {
  const state = store.getState();
  return state;
}

export function weekdaysLoader() {
  const { weekdays } = store.getState();
  return weekdays;
}

export function weekdayLoader({ params }: LoaderFunctionArgs) {
  const { weekday } = params;
  const weekdayData = store.getState().weekdays[weekday as string];
  return weekdayData;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    loader: storeLoader,
    children: [
      {
        path: '/',
        element: <Weekdays />,
        loader: weekdaysLoader,
      },
      {
        path: 'weekdays/:weekday',
        loader: weekdayLoader,
        element: <Weekday />,
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
