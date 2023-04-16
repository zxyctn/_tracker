import { MultiselectProps } from '../types';
import MultiselectOption from './MultiselectOption';

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
