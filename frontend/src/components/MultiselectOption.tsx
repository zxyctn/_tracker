import { useState } from 'react';
import { Square, CheckSquareFill } from 'react-bootstrap-icons';

import type { MultiselectOptionProps } from '../types';

const MultiselectOption = ({ option }: MultiselectOptionProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <button
      className={`flex gap-4 btn w-full font-bold justify-start text-xl ${
        checked ? 'btn-secondary' : 'btn-ghost text-secondary'
      }`}
      onClick={() => (checked ? setChecked(false) : setChecked(true))}
      key={option.label}
    >
      {checked ? <CheckSquareFill /> : <Square />}
      {option.label}
    </button>
  );
};

export default MultiselectOption;
