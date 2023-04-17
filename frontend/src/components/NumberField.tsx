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
          className='btn btn-secondary aspect-square p-0'
          onClick={decrement}
        >
          <Dash width={24} height={24} />
        </button>
        <input
          type='number'
          step={0.5}
          min={0}
          value={value}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(parseFloat(e.target.value))
          }
          className='w-min border-2 border-secondary bg-transparent rounded-md p-2 text-secondary outline-secondary text-center text-xl font-medium'
        />
        <button
          className='btn btn-secondary aspect-square p-0'
          onClick={increment}
        >
          <Plus width={24} height={24} />
        </button>
      </div>

      <RadioGroup options={units ?? []} layout='flex' initial='kph' />
    </div>
  );
};

export default NumberField;