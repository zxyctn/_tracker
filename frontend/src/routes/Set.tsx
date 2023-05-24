import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';

import Input from '../components/Input';
import NumberField from '../components/NumberField';
import store from '../store';
import { labels } from '../shared';
import { setSet } from '../slices/setsSlice';
import { setEdit } from '../slices/actionsSlice';
import type { RootState } from '../store';
import type { RouteLoaderType } from '../types';

const Set = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const edit = useSelector((state: RootState) => state.actions.edit);
  const set = useSelector(
    (state: RootState) => state.sets.find((s) => s.id === id)!
  );
  const [initialSet] = useState(set);
  const [updatedSet, setUpdatedSet] = useState(set);

  const navigate = useNavigate();

  const editFn = () => {
    store.dispatch(setEdit({ value: false, result: null }));
    navigate(-1);
  };

  useEffect(() => {
    if (edit.value && edit.result != null) {
      if (edit.result === false) store.dispatch(setSet(initialSet));
      editFn();
    }
  }, [edit]);

  useEffect(() => {
    setUpdatedSet(set);
  }, [set]);

  return (
    <div className='grid gap-5'>
      {set.fields
        .filter((f) => !f.goal)
        .map((f) => (
          <Input key={f.type} name={labels[f.type]} type={!edit.value}>
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
            edit.value ? 'text-secondary' : 'text-primary'
          }`}
        >
          ×
        </span>
      )}
      {set.fields
        .filter((f) => f.goal)
        .map((f) => (
          <Input key={f.type} name={labels[f.type]} type={!edit.value}>
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
