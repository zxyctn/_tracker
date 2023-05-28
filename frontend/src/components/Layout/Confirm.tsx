import { useSelector } from 'react-redux';

import { getSetInfo } from '../../shared';
import type { RootState } from '../../store';

const Confirm = () => {
  const config = useSelector((state: RootState) => state.actions.confirm);
  const exercises = useSelector((state: RootState) => state.exercises);
  const { id, type, value } = config;
  let msg = '';

  switch (type) {
    case 'SET':
      msg = getSetInfo(id);
      break;
    case 'EXERCISE':
      msg = exercises.find((e) => e.id === id)!.name;
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
