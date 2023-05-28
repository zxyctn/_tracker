import { Link, useLoaderData } from 'react-router-dom';

import { getTextColors } from '../shared';
import type { WeekdaysType } from '../types';

const Weekdays = () => {
  const weekdays: WeekdaysType = useLoaderData() as WeekdaysType;
  const textColors = getTextColors(Object.keys(weekdays).length);

  const today = (new Date().getDay() + 6) % 7;

  return (
    <div className='grid gap-1'>
      {Object.keys(weekdays).length > 0 ? (
        Object.keys(weekdays).map((weekday, index) => (
          <button
            className={`${today === index ? 'today' : 'coloredBtn'} ${
              textColors[index]
            }`}
            key={index}
          >
            <Link to={`/d/${weekday.toLowerCase()}`}>{weekday}</Link>
          </button>
        ))
      ) : (
        <h1>...</h1>
      )}
    </div>
  );
};

export default Weekdays;
