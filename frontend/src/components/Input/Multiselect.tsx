import MultiselectOption from './MultiselectOption';
import type { MultiselectProps } from '../../types';

const Multiselect = ({ options, setOptions }: MultiselectProps) => {
  let selected: string[] = options
    .filter((option) => option.checked)
    .map((option) => option.value);

  const setOption = (option: string) => {
    if (selected.includes(option)) {
      selected = selected.filter((item) => item !== option);
    } else {
      selected.push(option);
    }
    setOptions(selected);
  };

  return (
    <div className='grid gap-1'>
      {options.map((option) => (
        <MultiselectOption
          option={option}
          key={option.value}
          setOption={setOption}
        />
      ))}
    </div>
  );
};

export default Multiselect;
