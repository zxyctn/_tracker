import { useSelector } from 'react-redux';

import AddSet from './AddSet';
import type { RootState } from '../../store';
import AddExercise from './AddExercise';

const Add = () => {
  const add = useSelector((state: RootState) => state.actions.add);

  return (
    <>
      {add.type === 'SET' && <AddSet />}
      {add.type === 'EXERCISE' && <AddExercise />}
    </>
  );
};

export default Add;
