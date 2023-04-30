import { Link, useLoaderData, useMatches } from 'react-router-dom';
import { GroupType, WeekdayType } from '../types';
import { getTextColors } from '../shared';

const Weekday = () => {
  const { data, groups } = useLoaderData() as {
    data: WeekdayType;
    groups: GroupType[];
  };

  const textColors = getTextColors(groups.length);

  return (
    <>
      {data.groups.length > 0 ? (
        groups.map((group, index) => (
          <button
            className={`h-min w-full btn btn-ghost hover:bg-primary hover:text-white dark:hover:text-black text-3xl min-w-full ${textColors[index]}`}
            key={index}
          >
            <Link to={`g/${group.id}`}>{group.name}</Link>
          </button>
        ))
      ) : (
        <h1>...</h1>
      )}
    </>
  );
};

export default Weekday;
