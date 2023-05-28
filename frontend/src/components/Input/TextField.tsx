import { useState } from 'react';
import type { TextFieldProps } from '../../types';

const TextField = ({
  type = 'text',
  initial = '',
  changeHandler,
  disabled = false,
  edit = false,
}: TextFieldProps) => {
  const [value, setValue] = useState<string>(initial);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (changeHandler) changeHandler(e.target.value);
  };

  return (
    <input
      type={type}
      className={`rounded-md p-2 font-medium w-max border-0
        ${
          edit
            ? 'text-secondary bg-secondary/20 outline-secondary'
            : 'text-primary bg-primary/20 outline-primary'
        }
      `}
      placeholder='...'
      value={value}
      onChange={(e) => onChangeHandler(e)}
      disabled={disabled}
      required
    />
  );
};

export default TextField;
