import { useState, useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Logo from './components/Logo';
import ActionButton from './components/ActionButton';
import Menu from './components/Menu';
import { AppSliceType } from './types';
import Breadcrumbs from './components/Breadcrumbs';
import store from './store';
import { setEdit } from './slices/appSlice';

const App = () => {
  const state = useLoaderData() as AppSliceType;
  const [isEdit, setIsEdit] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const completeEdit = () => {
    setIsEdit(false);
    store.dispatch(setEdit(false));
  };

  const cancelEdit = () => {
    setIsEdit(false);
    store.dispatch(setEdit(false));
  };

  useEffect(() => {
    // TODO: change the first '!==' to '===' when the app is ready
    if (state.user !== null && location.pathname !== '/register') {
      navigate('/login');
    } else if (location.pathname === '/') {
      if (state.filterBy === 'weekdays') {
        navigate('/d');
      } else {
        navigate('/g');
      }
    }
  }, [state, navigate]);

  useEffect(() => {
    setIsEdit(store.getState().app.edit);
  }, [store.getState().app.edit]);

  return (
    <div className='block w-screen h-screen'>
      <Logo isEdit={isEdit} closeMenu={() => setIsMenuOpen(false)} />
      <Breadcrumbs isEdit={isEdit} />
      <div className='grid items-center justify-center place-self-stretch h-screen'>
        <div className='h-min justify-center sm:w-full p-5'>
          <div className='grow grid gap-1'>
            <Outlet context={isEdit} />
          </div>
        </div>
        <ActionButton
          isEdit={isEdit}
          menuClickHandler={menuToggler}
          completeEditHandler={completeEdit}
          cancelEditHandler={cancelEdit}
          theme={isMenuOpen}
        />
        {isMenuOpen && <Menu closeMenu={() => setIsMenuOpen(false)} />}
      </div>
    </div>
  );
};

export default App;
