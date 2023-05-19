import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';

import Input from '../components/Input';
import NumberField from '../components/NumberField';
import store from '../store';
import { labels } from '../shared';
import { setSet } from '../slices/setsSlice';
import { setEdit, setUpdate } from '../slices/actionsSlice';
import { FieldType, SetLoaderType, SetType } from '../types';

const Set = () => {
  const [edit, update] = useOutletContext() as [boolean, boolean];

  const { data } = useLoaderData() as SetLoaderType;
  const { fields, goal } = data as SetType;

  const [updatedSet, setUpdatedSet] = useState<SetType>(data as SetType);
  const navigate = useNavigate();

  const updateSet = (field: FieldType) => {
    const currentField = fields.find((f) => f.type === field.type);
    if (currentField) {
      setUpdatedSet((current) => ({
        ...current,
        fields: fields.map((f) => (f.type === field.type ? field : f)),
      }));
    } else if (goal.type === field.type) {
      setUpdatedSet((current) => ({
        ...current,
        goal: field,
      }));
    }
  };

  const editFn = () => {
    store.dispatch(setSet(updatedSet));
    store.dispatch(setEdit(false));
    store.dispatch(setUpdate(false));
    navigate(-1);
  };

  useEffect(() => {
    edit && update && editFn();
  }, [update, edit]);

  return (
    <div className='grid gap-5'>
      {fields.map((field) => (
        <Input key={field.type} name={labels[field.type]} type={!edit}>
          <NumberField
            step={0.5}
            field={field}
            edit={edit}
            onChange={updateSet}
          />
        </Input>
      ))}
      {fields.length && (
        <span
          className={`w-full text-center font-bold text-2xl ${
            edit ? 'text-secondary' : 'text-primary'
          }`}
        >
          ×
        </span>
      )}
      <Input name={labels[goal.type]} type={!edit}>
        <NumberField
          step={goal.type === 'REP' || goal.type === 'CAL' ? 1 : 0.5}
          edit={edit}
          field={goal}
          onChange={updateSet}
        />
      </Input>
    </div>
  );
};

export default Set;