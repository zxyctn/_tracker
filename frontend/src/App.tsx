import { useState, useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useSelector } from 'react-redux';

import Add from './components/Add/Add';
import Logo from './components/Layout/Logo';
import Menu from './components/Layout/Menu';
import Confirm from './components/Layout/Confirm';
import ActionButton from './components/Layout/ActionButton';
import Breadcrumbs from './components/Layout/Breadcrumbs';
import { onDragEndExercise, onDragEndGroup, onDragEndSet } from './shared';
import type { RootState } from './store';
import type { AppSliceType } from './types';

const App = () => {
  const app = useSelector((state: RootState) => state.app);
  const { theme, filterBy, user } = app as AppSliceType;
  const confirm = useSelector(
    (state: RootState) => state.actions.confirm.value
  );
  const add = useSelector((state: RootState) => state.actions.add.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onDragEnd = (result: DropResult) => {
    const { type, source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    switch (type) {
      case 'EXERCISE':
        onDragEndSet(result);
        break;
      case 'GROUP':
        onDragEndExercise(result);
        break;
      case 'WEEKDAY':
        onDragEndGroup(result);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (user !== null && location.pathname !== '/register') {
      navigate('/login');
    } else if (location.pathname === '/') {
      if (filterBy === 'weekdays') {
        navigate('/d');
      } else {
        navigate('/g');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0] as HTMLElement;
    html.className = theme;
    html.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <div className='grid place-content-stretch place-items-stretch w-screen h-screen relative'>
        <div className='row-span-1'>
          <div className='grid grid-flow-row gap-3 p-5'>
            <Logo closeMenu={() => setIsMenuOpen(false)} />
            <Breadcrumbs />
          </div>
        </div>

        <div className='grid items-center justify-center row-span-auto'>
          <div className='justify-center sm:w-full p-5'>
            <div className='grow grid gap-'>
              {confirm ? (
                <Confirm />
              ) : add ? (
                <Add />
              ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Outlet />
                </DragDropContext>
              )}
            </div>
          </div>
        </div>
        {isMenuOpen && <Menu closeMenu={() => setIsMenuOpen(false)} />}
        <div className='row-span-1 place-self-end z-30'>
          <ActionButton menuClickHandler={menuToggler} theme={isMenuOpen} />
        </div>
      </div>
    </>
  );
};

export default App;
