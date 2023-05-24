import { ChangeEvent, useEffect, useState } from 'react';
import { Dash, Plus } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

import RadioGroup from './RadioGroup';
import store from '../store';
import { units } from '../shared';
import { setSet } from '../slices/setsSlice';
import type { RootState } from '../store';
import type { FieldType, NumberFieldProps } from '../types';

const NumberField = ({ step, field, setId }: NumberFieldProps) => {
  const edit = useSelector((state: RootState) => state.actions.edit);
  const cancel = useSelector((state: RootState) => state.actions.cancel);
  const set = useSelector(
    (state: RootState) => state.sets.find((s) => s.id === setId)!
  );
  const [initialField] = useState(field);
  const [value, setValue] = useState(field.value);

  const updateValue = (newValue: FieldType) => {
    store.dispatch(
      setSet({
        ...set,
        fields: set.fields.map((f) =>
          f.type === newValue.type ? newValue : f
        ),
      })
    );
  };

  useEffect(() => {
    edit && setValue(field.value);
  }, [edit, set]);

  return (
    <div className='grid gap-1'>
      <div className='flex gap-1 w-full'>
        <button
          className={`btn aspect-square p-0 ${
            edit ? 'btn-secondary' : 'btn-primary'
          }`}
          onClick={() => updateValue({ ...field, value: value - step })}
        >
          <Dash width={24} height={24} className='stroke-current' />
        </button>
        <input
          type='number'
          step={0.5}
          min={0}
          max={9999}
          value={value}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            updateValue({ ...field, value: parseFloat(e.target.value) })
          }
          className={edit ? 'editNumberField gorw' : 'viewNumberField grow'}
          disabled={!edit}
        />
        <button
          className={`btn aspect-square p-0 ${
            edit ? 'btn-secondary' : 'btn-primary'
          }`}
          onClick={() => updateValue({ ...field, value: value + step })}
        >
          <Plus width={24} height={24} className='stroke-current' />
        </button>
      </div>

      <RadioGroup
        options={units[field.type] ?? []}
        onChange={(option: string) => updateValue({ ...field, unit: option })}
        layout='flex'
        initial={field.unit}
        edit={edit}
      />
    </div>
  );
};

export default NumberField;
