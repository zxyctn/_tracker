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

const App = () => {
  const state = useLoaderData() as AppSliceType;
  const [isEdit, setIsEdit] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (state.user === null && location.pathname !== '/register') {
      navigate('/login');
    } else if (location.pathname === '/') {
      if (state.filterBy === 'weekdays') {
        navigate('/weekdays');
      } else {
        navigate('/groups');
      }
    }
  }, [state, navigate]);

  return (
    <div className='w-screen h-screen'>
      <Breadcrumbs />
      <div className='w-full h-full grid items-center justify-center'>
        <Logo isEdit={isEdit} closeMenu={() => setIsMenuOpen(false)} />

        <div className='flex justify-center h-min w-screen sm:w-full p-5'>
          <div className='grid gap-1'>
            <Outlet />
          </div>
        </div>
        <ActionButton clickHandler={menuToggler} theme={isMenuOpen} />
        {isMenuOpen && <Menu closeMenu={() => setIsMenuOpen(false)} />}
      </div>
    </div>
  );
};

export default App;
