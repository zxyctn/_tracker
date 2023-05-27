import type { InputProps } from '../../types';

const Input = ({ name, type, children }: InputProps) => {
  return (
    <div className='grid gap-1 w-full'>
      <label
        htmlFor={name}
        className={`badge badge-sm lowercase ${
          type ? 'badge-primary' : 'badge-secondary'
        } font-bold rounded-[0.25rem]`}
      >
        {name}
      </label>
      {children}
    </div>
  );
};

export default Input;
