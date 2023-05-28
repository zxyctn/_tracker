import React, { useEffect, useState } from 'react';
import Input from '../components/Input/Input';
import TextField from '../components/Input/TextField';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { RouteLoaderType } from '../types';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setExercise } from '../slices/exercisesSlice';
import { setEdit } from '../slices/actionsSlice';

const Exercise = () => {
  const { id } = useLoaderData() as RouteLoaderType;

  const edit = useSelector((state: RootState) => state.actions.edit);
  const exercise = useSelector(
    (state: RootState) => state.exercises.find((e) => e.id === id)!
  );

  const [initialExercise] = useState(exercise);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (newValue: string) => {
    dispatch(
      setExercise({
        exercise: id as number,
        value: {
          ...exercise,
          name: newValue,
        },
      })
    );
  };

  useEffect(() => {
    if (edit.value && edit.result) {
      dispatch(setEdit({ value: false, result: null }));
      navigate(-1);
    } else if (edit.value && edit.result === false) {
      dispatch(setExercise({ exercise: id as number, value: initialExercise }));
      dispatch(setEdit({ value: false, result: null }));
      navigate(-1);
    }
  }, [edit]);

  return (
    <Input type={!edit.value} name='name'>
      <TextField
        type='text'
        initial={exercise.name}
        changeHandler={changeHandler}
        disabled={!edit.value}
        edit={edit.value}
      />
    </Input>
  );
};

export default Exercise;
