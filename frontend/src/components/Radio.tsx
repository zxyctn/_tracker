import { RadioProps } from '../types';
import RadioCircle from './RadioCircle';

const Radio = ({ option, checked, changeHandler }: RadioProps) => {
  return (
    <button
      className={`flex gap-4 btn w-full font-bold justify-start text-xl ${
        checked ? 'btn-secondary' : 'btn-ghost text-secondary'
      }`}
      onClick={() => changeHandler(option.value)}
      key={option.label}
    >
      <RadioCircle checked={checked} />
      {option.label}
    </button>
  );
};

export default Radio;
