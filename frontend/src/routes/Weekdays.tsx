import { Link, useLoaderData } from 'react-router-dom';

import { getTextColors } from '../shared';
import type { WeekdaysType } from '../types';

const Weekdays = () => {
  const weekdays: WeekdaysType = useLoaderData() as WeekdaysType;
  const textColors = getTextColors(Object.keys(weekdays).length);

  return (
    <>
      {Object.keys(weekdays).length > 0 ? (
        Object.keys(weekdays).map((weekday, index) => (
          <button className={`coloredBtn ${textColors[index]}`} key={index}>
            <Link to={`/d/${weekday.toLowerCase()}`}>{weekday}</Link>
          </button>
        ))
      ) : (
        <h1>...</h1>
      )}
    </>
  );
};

export default Weekdays;
