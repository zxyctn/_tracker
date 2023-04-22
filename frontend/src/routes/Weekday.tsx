import { useLoaderData } from 'react-router-dom';
import { WeekdayType } from '../types';

const Weekday = () => {
  const weekday = useLoaderData() as WeekdayType;

  return <div>{weekday.day}</div>;
};

export default Weekday;
