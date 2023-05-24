import React from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { getSetInfo } from '../shared';

const Confirm = () => {
  const config = useSelector((state: RootState) => state.actions.confirm);
  const { id, result, type, value } = config;
  let msg = '';

  switch (type) {
    case 'SET':
      msg = getSetInfo(id);
      break;
    case 'EXERCISE':
      msg = '....';
      break;
    default:
      break;
  }

  return (
    <div
      className={`${
        !value ? 'hidden' : ''
      } text-2xl uppercase font-bold text-secondary justify-center w-full text-center`}
    >
      Are you sure about deleting <span className='text-accent'>{msg}</span> ?
    </div>
  );
};

export default Confirm;
