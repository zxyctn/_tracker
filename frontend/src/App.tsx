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
import { setEdit, setUpdate } from './slices/actionsSlice';

const App = () => {
  const state = useLoaderData() as AppSliceType;
  const [isEdit, setIsEdit] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const completeEdit = () => {
    setCanUpdate(true);
    store.dispatch(setUpdate(true));
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
    setIsEdit(store.getState().actions.edit);
    setCanAdd(store.getState().actions.add);
    setCanUpdate(store.getState().actions.update);
  }, [store.getState().actions]);

  return (
    <div className='grid place-content-stretch place-items-stretch w-screen h-screen'>
      <div className='row-span-1'>
        <div className='grid grid-flow-row gap-3 p-5'>
          <Logo isEdit={isEdit} closeMenu={() => setIsMenuOpen(false)} />
          <Breadcrumbs isEdit={isEdit} />
        </div>
      </div>

      <div className='grid items-center justify-center row-span-auto'>
        <div className='justify-center sm:w-full p-5'>
          <div className='grow grid gap-1'>
            <Outlet context={[isEdit, canUpdate]} />
          </div>
        </div>
      </div>
      {isMenuOpen && <Menu closeMenu={() => setIsMenuOpen(false)} />}
      <div className='row-span-1 place-self-end'>
        <ActionButton
          isEdit={isEdit}
          canAdd={canAdd}
          menuClickHandler={menuToggler}
          completeEditHandler={completeEdit}
          cancelEditHandler={cancelEdit}
          theme={isMenuOpen}
        />
      </div>
    </div>
  );
};

export default App;
