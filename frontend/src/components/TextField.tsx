import { TextFieldProps } from '../types';

const TextField = ({ type = 'text' }: TextFieldProps) => {
  return (
    <input
      type={type}
      className='bg-primary/20 rounded-md p-2 text-primary outline-primary font-medium w-max border-0'
      placeholder='...'
      required
    />
  );
};

export default TextField;
