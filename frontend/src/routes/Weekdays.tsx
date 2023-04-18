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
    'text-primary-200',
    'text-primary-300',
    'text-primary-400',
    'text-primary-500',
    'text-primary-600',
    'text-primary-700',
    'text-primary-800',
  ];

  const bgColors = [
    'bg-primary-200',
    'bg-primary-300',
    'bg-primary-400',
    'bg-primary-500',
    'bg-primary-600',
    'bg-primary-700',
    'bg-primary-800',
  ];

  return (
    <div className='grid gap-1 w-full'>
      {weekdays.map((weekday, index) => (
        <button
          className={`h-min w-full btn btn-ghost hover:bg-primary-500 hover:text-black text-3xl ${textColors[index]}`}
          key={index}
        >
          <Link to={`/weekdays/${weekday.toLowerCase()}`}>{weekday}</Link>
        </button>
      ))}
    </div>
  );
};

export default Weekdays;
