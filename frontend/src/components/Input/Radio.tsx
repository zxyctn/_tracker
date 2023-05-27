import RadioCircle from './RadioCircle';
import type { RadioProps } from '../../types';

const Radio = ({ option, checked, changeHandler, edit }: RadioProps) => {
  return (
    <button
      className={`flex gap-4 btn grow font-bold justify-start text-xl ${
        checked
          ? edit
            ? 'btn-secondary'
            : 'btn-primary'
          : `btn-ghost ${edit ? 'text-secondary' : 'text-primary'}`
      }`}
      onClick={() => edit && changeHandler(option.value)}
      key={option.label}
    >
      <RadioCircle checked={checked} />
      {option.label}
    </button>
  );
};

export default Radio;
