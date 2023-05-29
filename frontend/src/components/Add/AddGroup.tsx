import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GroupType } from '../../types';
import Input from '../Input/Input';
import TextField from '../Input/TextField';
import { useDispatch } from 'react-redux';
import { setAddObject } from '../../slices/actionsSlice';

const AddGroup = () => {
  const add = useSelector((state: RootState) => state.actions.add);

  const dispatch = useDispatch();

  const changeHandler = (newValue: string) => {
    dispatch(
      setAddObject({
        ...add.object,
        name: newValue,
      } as GroupType)
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

export default AddGroup;
