import { TextFieldProps } from '../types';

const TextField = ({ type = 'text' }: TextFieldProps) => {
  return (
    <input
      type={type}
      className='border-2 border-primary-500 bg-transparent rounded-md p-2 text-primary-500 outline-primary-500 font-medium w-72'
      placeholder='...'
      required
    />
  );
};

export default TextField;
