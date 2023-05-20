import { useState, useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import Logo from './components/Logo';
import Menu from './components/Menu';
import ActionButton from './components/ActionButton';
import Breadcrumbs from './components/Breadcrumbs';
import store from './store';
import { onDragEndSet } from './shared';
import { setCancel, setComplete, setEdit } from './slices/actionsSlice';
import type { AppSliceType } from './types';

const App = () => {
  const state = useLoaderData() as AppSliceType;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const completeEdit = () => {
    store.dispatch(setComplete(true));
  };

  const cancelEdit = () => {
    store.dispatch(setCancel(true));
  };

  const enableEdit = () => {
    store.dispatch(setEdit(true));
  };

  const disableEdit = () => {
    store.dispatch(setEdit(false));
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

      default:
        break;
    }
  };

  useEffect(() => {
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
              <DragDropContext onDragEnd={onDragEnd}>
                <Outlet />
              </DragDropContext>
            </div>
          </div>
        </div>
        {isMenuOpen && <Menu closeMenu={() => setIsMenuOpen(false)} />}
        <div className='row-span-1 place-self-end z-30'>
          <ActionButton
            menuClickHandler={menuToggler}
            completeEditHandler={completeEdit}
            cancelEditHandler={cancelEdit}
            enableEditHandler={enableEdit}
            disableEditHandler={disableEdit}
            theme={isMenuOpen}
          />
        </div>
      </div>
    </>
  );
};

export default App;
