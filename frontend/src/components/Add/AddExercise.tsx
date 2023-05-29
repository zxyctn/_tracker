import { useSelector, useDispatch } from 'react-redux';

import Input from '../Input/Input';
import TextField from '../Input/TextField';
import { setAddObject } from '../../slices/actionsSlice';
import type { RootState } from '../../store';
import type { ExerciseType } from '../../types';

const AddExercise = () => {
  const add = useSelector((state: RootState) => state.actions.add);

  const dispatch = useDispatch();

  const changeHandler = (newValue: string) => {
    dispatch(
      setAddObject({
        ...add.object,
        name: newValue,
      } as ExerciseType)
    );
  };

  return (
    <Input type={false} name='name'>
      <TextField
        type='text'
        initial=''
        changeHandler={changeHandler}
        edit={true}
      />
    </Input>
  );
};

export default AddExercise;
