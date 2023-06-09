import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '../components/Input/TextField';
import Input from '../components/Input/Input';
import { setGroup } from '../slices/groupsSlice';
import { setEdit } from '../slices/actionsSlice';
import type { RootState } from '../store';
import type { RouteLoaderType } from '../types';

const Group = () => {
  const { id } = useLoaderData() as RouteLoaderType;

  const edit = useSelector((state: RootState) => state.actions.edit);
  const group = useSelector(
    (state: RootState) => state.groups.find((g) => g.id === id)!
  );

  const [initialGroup] = useState(group);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (newValue: string) => {
    dispatch(
      setGroup({
        value: {
          ...group,
          name: newValue,
        },
      })
    );
  };

  useEffect(() => {
    if (edit.value && edit.result) {
      dispatch(setEdit({ ...edit, value: false, result: null }));
      navigate(-1);
    } else if (edit.value && edit.result === false) {
      dispatch(setGroup({ value: initialGroup }));
      dispatch(setEdit({ ...edit, value: false, result: null }));
      navigate(-1);
    }
  }, [edit]);

  return (
    <Input type={!edit.value} name='name'>
      <TextField
        type='text'
        initial={group.name}
        changeHandler={changeHandler}
        disabled={!edit.value}
        edit={edit.value}
      />
    </Input>
  );
};

export default Group;
