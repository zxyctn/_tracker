import { useState } from 'react';
import { Square, CheckSquareFill } from 'react-bootstrap-icons';

import type { MultiselectOptionProps } from '../../types';

const MultiselectOption = ({ option, setOption }: MultiselectOptionProps) => {
  const [checked, setChecked] = useState(option.checked);

  const updateOption = () => {
    checked ? setChecked(false) : setChecked(true);
    setOption(option.value);
  };

  return (
    <button
      className={`flex gap-4 btn w-full font-bold justify-start text-xl ${
        checked ? 'btn-secondary' : 'btn-ghost text-secondary'
      }`}
      onClick={updateOption}
      key={option.label}
    >
      {checked ? <CheckSquareFill /> : <Square />}
      {option.label}
    </button>
  );
};

export default MultiselectOption;
