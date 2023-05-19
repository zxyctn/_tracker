import { ChangeEvent, useState } from 'react';
import { Dash, Plus } from 'react-bootstrap-icons';
import { NumberFieldProps } from '../types';
import RadioGroup from './RadioGroup';
import { units } from '../shared';

const NumberField = ({ step, edit, field, onChange }: NumberFieldProps) => {
  const [value, setValue] = useState(field.value);

  const increment = () => {
    onChange({ ...field, value: value + step });
  };

  const decrement = () => {
    onChange({ ...field, value: value - step });
  };

  const unitChange = (unit: string) => {
    onChange({ ...field, unit });
  };

  return (
    <div className='grid gap-1'>
      <div className='flex gap-1 w-full'>
        <button
          className={`btn aspect-square p-0 ${
            edit ? 'btn-secondary' : 'btn-primary'
          }`}
          onClick={decrement}
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
            setValue(parseFloat(e.target.value))
          }
          className={edit ? 'editNumberField gorw' : 'viewNumberField grow'}
          disabled={!edit}
        />
        <button
          className={`btn aspect-square p-0 ${
            edit ? 'btn-secondary' : 'btn-primary'
          }`}
          onClick={increment}
        >
          <Plus width={24} height={24} className='stroke-current' />
        </button>
      </div>

      <RadioGroup
        options={units[field.type] ?? []}
        onChange={unitChange}
        layout='flex'
        initial={field.unit}
        edit={edit}
      />
    </div>
  );
};

export default NumberField;
