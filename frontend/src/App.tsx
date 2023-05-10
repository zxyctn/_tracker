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

  return (
    <div className='block w-screen h-screen'>
      <Logo isEdit={isEdit} closeMenu={() => setIsMenuOpen(false)} />
      <Breadcrumbs />
      <div className='grid items-center justify-center place-self-stretch h-screen'>
        <div className='h-min justify-center sm:w-full p-5'>
          <div className='grow grid gap-1'>
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
