import { useState } from 'react';

import Radio from './Radio';
import type { RadioGroupProps } from '../../types';

const RadioGroup = ({
  options,
  initial,
  edit,
  onChange,
  layout = 'grid',
}: RadioGroupProps) => {
  const [checked, setChecked] = useState(initial);

  const handleChange = (option: string) => {
    setChecked(option);
    onChange(option);
  };

  return (
    <div className={`${layout} gap-1 w-full`}>
      {options.map((option) => (
        <Radio
          option={option}
          key={option.value}
          checked={checked === option.value}
          changeHandler={handleChange}
          edit={edit}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
