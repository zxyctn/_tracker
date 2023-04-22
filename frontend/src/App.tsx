import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Logo from './components/Logo';
import ActionButton from './components/ActionButton';

const App = () => {
  const state = useLoaderData();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full grid items-center justify-center'>
        <Logo isEdit={isEdit} />
        <div className='flex justify-center h-min w-screen sm:w-full p-5'>
          <Outlet />
        </div>
        <ActionButton />
      </div>
    </div>
  );
};

export default App;
