import { useState } from 'react';
import { RadioGroupProps } from '../types';
import Radio from './Radio';

const RadioGroup = ({ options, layout = 'grid' }: RadioGroupProps) => {
  const [checked, setChecked] = useState('REP');

  const handleChange = (option: string) => {
    setChecked(option);
  };

  return (
    <div className={`${layout} gap-1`}>
      {options.map((option) => (
        <Radio
          option={option}
          key={option.value}
          checked={checked === option.value}
          changeHandler={handleChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
