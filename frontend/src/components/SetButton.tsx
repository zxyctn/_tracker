import { Link } from 'react-router-dom';
import { SetType } from '../types';
import { useState } from 'react';

const SetButton = ({
  set,
  bg,
  text,
}: {
  set: SetType;
  bg: string;
  text: string;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`h-min w-full btn btn-ghost hover:bg-primary hover:text-white dark:hover:text-black text-3xl ${text}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`s/${set.id}`}>
        <div className='flex justify-between gap-16'>
          {set.fields.map((field) => (
            <div key={field.value} className='flex items-center gap-1'>
              <span>{field.value}</span>
              <div
                className={`${
                  hover
                    ? 'bg-white dark:bg-black text-primary'
                    : `text-white dark:text-black ${bg}`
                }  p-1 rounded-sm text-xs transition-colors duration-100 font-bold`}
              >
                {field.unit}
              </div>
            </div>
          ))}

          <div className='flex items-center gap-1'>
            <span>{set.goal}</span>
            {set.unit && (
              <div
                className={`${
                  hover
                    ? 'bg-white dark:bg-black text-primary'
                    : `text-white dark:text-black ${bg}`
                }  p-1 rounded-sm text-xs transition-colors duration-100 font-bold`}
              >
                {set.unit}
              </div>
            )}
          </div>
        </div>
      </Link>
    </button>
  );
};

export default SetButton;
