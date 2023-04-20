import { Link } from 'react-router-dom';

const Weekdays = () => {
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const textColors = [
    'text-light-200 dark:text-dark-200',
    'text-light-300 dark:text-dark-300',
    'text-light-400 dark:text-dark-400',
    'text-light-500 dark:text-dark-500',
    'text-light-600 dark:text-dark-600',
    'text-light-700 dark:text-dark-700',
    'text-light-800 dark:text-dark-800',
  ];

  return (
    <div className='grid gap-1 w-full'>
      {weekdays.map((weekday, index) => (
        <button
          className={`h-min w-full btn btn-ghost hover:bg-primary hover:text-white dark:hover:text-black text-3xl ${textColors[index]}`}
          key={index}
        >
          <Link to={`/weekdays/${weekday.toLowerCase()}`}>{weekday}</Link>
        </button>
      ))}
    </div>
  );
};

export default Weekdays;
