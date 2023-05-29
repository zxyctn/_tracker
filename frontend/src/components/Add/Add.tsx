import { useSelector } from 'react-redux';

import AddSet from './AddSet';
import AddExercise from './AddExercise';
import AddGroup from './AddGroup';
import type { RootState } from '../../store';

const Add = () => {
  const add = useSelector((state: RootState) => state.actions.add);

  return (
    <>
      {add.type === 'SET' && <AddSet />}
      {add.type === 'EXERCISE' && <AddExercise />}
      {add.type === 'GROUP' && <AddGroup />}
    </>
  );
};

export default Add;
