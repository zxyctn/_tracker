import RadioCircle from './RadioCircle';
import type { RadioProps } from '../../types';

const Radio = ({
  option,
  checked,
  changeHandler,
  edit,
  theme = true,
}: RadioProps) => {
  return (
    <button
      className={`flex gap-4 btn grow font-bold justify-start text-xl ${
        checked
          ? theme
            ? 'btn-secondary'
            : 'btn-primary'
          : `btn-ghost ${theme ? 'text-secondary' : 'text-primary'}`
      }`}
      onClick={() => edit && changeHandler(option.value)}
      key={option.label}
    >
      <div className='flex w-full justify-between items-center gap-10'>
        <div className='flex gap-2 items-center'>
          <RadioCircle checked={checked} />
          {option.label}
        </div>
        {option.component ?? null}
      </div>
    </button>
  );
};

export default Radio;
