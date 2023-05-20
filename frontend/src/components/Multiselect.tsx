import MultiselectOption from './MultiselectOption';
import type { MultiselectProps } from '../types';

const Multiselect = ({ options }: MultiselectProps) => {
  return (
    <div className='grid gap-1'>
      {options.map((option) => (
        <MultiselectOption option={option} key={option.value} />
      ))}
    </div>
  );
};

export default Multiselect;
