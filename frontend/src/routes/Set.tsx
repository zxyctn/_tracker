import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import NumberField from '../components/NumberField';
import store from '../store';
import { labels } from '../shared';
import { setSet } from '../slices/setsSlice';
import { setCancel, setComplete, setEdit } from '../slices/actionsSlice';
import type { RootState } from '../store';
import type { RouteLoaderType, SetType } from '../types';

const Set = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const edit = useSelector((state: RootState) => state.actions.edit);
  const complete = useSelector((state: RootState) => state.actions.complete);
  const cancel = useSelector((state: RootState) => state.actions.cancel);
  const set = useSelector(
    (state: RootState) => state.sets.find((s) => s.id === id)!
  );
  const [initialSet] = useState(set);
  const [updatedSet, setUpdatedSet] = useState(set);

  const navigate = useNavigate();

  const editFn = (newSet: SetType) => {
    store.dispatch(setSet(newSet));
    store.dispatch(setEdit(false));
    store.dispatch(setCancel(false));
    store.dispatch(setComplete(false));
    navigate(-1);
  };

  useEffect(() => {
    edit && cancel && editFn(initialSet);
    edit && complete && editFn(updatedSet);
  }, [edit, cancel, complete]);

  useEffect(() => {
    setUpdatedSet(set);
  }, [set]);

  return (
    <div className='grid gap-5'>
      {set.fields
        .filter((f) => !f.goal)
        .map((f) => (
          <Input key={f.type} name={labels[f.type]} type={!edit}>
            <NumberField
              step={0.5}
              field={f}
              goal={f.goal || false}
              setId={set.id}
            />
          </Input>
        ))}
      {set.fields.filter((f) => !f.goal).length && (
        <span
          className={`w-full text-center font-bold text-2xl ${
            edit ? 'text-secondary' : 'text-primary'
          }`}
        >
          ×
        </span>
      )}
      {set.fields
        .filter((f) => f.goal)
        .map((f) => (
          <Input key={f.type} name={labels[f.type]} type={!edit}>
            <NumberField
              step={['REP', 'CAL'].includes(f.type) ? 1 : 0.5}
              field={f}
              goal={true}
              setId={set.id}
            />
          </Input>
        ))}
    </div>
  );
};

export default Set;
