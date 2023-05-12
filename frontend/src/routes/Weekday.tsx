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
          <button className={`coloredBtn ${textColors[index]}`} key={index}>
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
