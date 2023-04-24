import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Logo from './components/Logo';
import ActionButton from './components/ActionButton';
import Menu from './components/Menu';

const App = () => {
  const state = useLoaderData();
  const [isEdit, setIsEdit] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full grid items-center justify-center'>
        <Logo isEdit={isEdit} />
        <div className='flex justify-center h-min w-screen sm:w-full p-5'>
          <Outlet />
        </div>
        <ActionButton clickHandler={menuToggler} theme={isMenuOpen} />
        <Menu show={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
      </div>
    </div>
  );
};

export default App;
