import { TextFieldProps } from '../types';

const TextField = ({ type = 'text' }: TextFieldProps) => {
  return (
    <input
      type={type}
      className='bg-primary/20 rounded-md p-2 text-black dark:text-white outline-primary font-medium w-72'
      placeholder='...'
      required
    />
  );
};

export default TextField;
