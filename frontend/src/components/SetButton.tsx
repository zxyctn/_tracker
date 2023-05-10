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
      className={`h-min w-full btn btn-ghost font-bold hover:bg-primary hover:text-white dark:hover:text-black text-3xl justify-start overflow-auto ${text}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`s/${set.id}`} className='w-full h-full'>
        <div className={`flex justify-between gap-5`}>
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
                {field.unit ? field.unit : field.type}
              </div>
            </div>
          ))}
          <div className='flex items-center gap-5 w-full'>
            {set.fields.length && <span className=''>×</span>}
            <span className='flex gap-1 items-center'>
              {set.goal}
              {(set.unit || set.type !== 'REP') && (
                <div
                  className={`${
                    hover
                      ? 'bg-white dark:bg-black text-primary'
                      : `text-white dark:text-black ${bg}`
                  }  p-1 rounded-sm text-xs transition-colors duration-100 font-bold h-min`}
                >
                  {set.unit ? set.unit : set.type !== 'REP' ? set.type : ''}
                </div>
              )}
            </span>
          </div>
        </div>
      </Link>
    </button>
  );
};

export default SetButton;
