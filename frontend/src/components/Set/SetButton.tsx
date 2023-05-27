import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GripVertical } from 'react-bootstrap-icons';

import SetFields from './SetFields';
import SetGoal from './SetGoal';
import type { SetButtonProps } from '../../types';

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
    <div
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
        <div className='flex w-full justify-between gap-5 items-center relative'>
          {edit && (
            <span
              className={`absolute -left-6 bottom-0.5 ${hover ? 'hidden' : ''}`}
            >
              <GripVertical width={24} />
            </span>
          )}
          <SetFields {...config} />
          <SetGoal {...config} />
        </div>
      </div>
    </div>
  );
};

export default SetButton;
