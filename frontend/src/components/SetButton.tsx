import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SetFields from './SetFields';
import SetGoal from './SetGoal';
import { SetButtonProps } from '../types';

const SetButton = ({ set, bg, text, edit }: SetButtonProps) => {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);

  const navigate = useNavigate();

  const config = {
    set,
    bg,
    edit,
    hover,
    selected,
  };

  const clickHandler = () => {
    if (edit) {
      navigate(`s/${set.id}`);
      setSelected(false);
    } else {
      setSelected((prev) => !prev);
    }
  };

  return (
    <button
      className={`coloredBtn ${
        selected && !edit
          ? `selectedBtn`
          : edit
          ? 'text-secondary hover:bg-secondary'
          : text
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={clickHandler}
    >
      <div className='w-full h-full'>
        <div className='flex w-full justify-between gap-5'>
          <SetFields {...config} />
          <SetGoal {...config} />
        </div>
      </div>
    </button>
  );
};

export default SetButton;
