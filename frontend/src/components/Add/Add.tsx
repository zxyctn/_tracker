import { useSelector } from 'react-redux';

import AddSet from './AddSet';
import type { RootState } from '../../store';

const Add = () => {
  const add = useSelector((state: RootState) => state.actions.add);

  return <>{add.type === 'SET' && <AddSet />}</>;
};

export default Add;
