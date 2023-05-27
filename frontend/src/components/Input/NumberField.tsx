import { ChangeEvent, useEffect, useState } from 'react';
import { Dash, Plus } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

import RadioGroup from './RadioGroup';
import { units } from '../../shared';
import type { RootState } from '../../store';
import type { NumberFieldProps } from '../../types';

const NumberField = ({ step, field, setId, updateValue }: NumberFieldProps) => {
  const edit = useSelector((state: RootState) => state.actions.edit.value);
  const set = useSelector((state: RootState) =>
    state.sets.find((s) => s.id === setId)
  );
  const [value, setValue] = useState(field.value);

  useEffect(() => {
    edit && setValue(field.value);
  }, [edit, set, field]);

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
        theme={edit}
      />
    </div>
  );
};

export default NumberField;
