import { Link, useLoaderData } from 'react-router-dom';
import { WeekdaysType } from '../types';
import { getTextColors } from '../shared';

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
