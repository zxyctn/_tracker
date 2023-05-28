import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ExerciseType } from '../../types';
import Input from '../Input/Input';
import TextField from '../Input/TextField';
import { useDispatch } from 'react-redux';
import { setAddObject } from '../../slices/actionsSlice';

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
