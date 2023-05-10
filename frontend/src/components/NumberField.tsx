import { ChangeEvent, useState } from 'react';
import { Dash, Plus } from 'react-bootstrap-icons';
import { NumberFieldProps } from '../types';
import RadioGroup from './RadioGroup';

const NumberField = ({ step, units }: NumberFieldProps) => {
  const [value, setValue] = useState(0.0);

  const increment = () => {
    setValue((current) => current + step);
  };

  const decrement = () => {
    setValue((current) => current - step);
  };

  return (
    <div className='grid gap-1'>
      <div className='flex gap-1'>
        <button
          className='btn btn-primary aspect-square p-0'
          onClick={decrement}
        >
          <Dash width={24} height={24} className='stroke-black' />
        </button>
        <input
          type='number'
          step={0.5}
          min={0}
          value={value}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(parseFloat(e.target.value))
          }
          className='min-w-min w-11/12 bg-primary-content rounded-md text-primary outline-primary text-center text-3xl font-medium'
        />
        <button
          className='btn btn-primary aspect-square p-0'
          onClick={increment}
        >
          <Plus width={24} height={24} className='stroke-current stroke-1' />
        </button>
      </div>

      <RadioGroup options={units ?? []} layout='flex' initial='kph' />
    </div>
  );
};

export default NumberField;
