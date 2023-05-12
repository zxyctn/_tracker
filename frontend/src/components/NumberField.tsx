import { ChangeEvent, useState } from 'react';
import { Dash, Plus } from 'react-bootstrap-icons';
import { NumberFieldProps } from '../types';
import RadioGroup from './RadioGroup';
import { units } from '../shared';

const NumberField = ({ step, edit, field, onChange }: NumberFieldProps) => {
  const [value, setValue] = useState(field.value);
  const [updatedField, setUpdatedField] = useState(field);

  const increment = () => {
    edit && setValue((current) => current + step);
    setUpdatedField(() => {
      const updated = { ...field, value: value + step };
      onChange(updated);
      return updated;
    });
  };

  const decrement = () => {
    edit && setValue((current) => current - step);
    setUpdatedField(() => {
      const updated = { ...field, value: value - step };
      onChange(updated);
      return updated;
    });
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
        layout='flex'
        initial={field.unit}
        edit={edit}
      />
    </div>
  );
};

export default NumberField;
