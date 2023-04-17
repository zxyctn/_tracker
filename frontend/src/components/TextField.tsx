import { TextFieldProps } from '../types';

const TextField = ({ type = 'text' }: TextFieldProps) => {
  return (
    <input
      type={type}
      className='border-2 border-primary bg-transparent rounded-md p-2 text-primary outline-primary font-medium'
      placeholder='...'
      required
    />
  );
};

export default TextField;
