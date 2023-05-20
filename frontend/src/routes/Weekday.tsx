import { Link, useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getTextColors } from '../shared';
import type { RootState } from '../store';
import type { RouteLoaderType } from '../types';

const Weekday = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const weekday = useSelector((state: RootState) => state.weekdays[id]);
  const groups = useSelector((state: RootState) =>
    state.groups.filter((g) => weekday.groups.includes(g.id))
  );
  const textColors = getTextColors(groups.length);

  return (
    <>
      {groups.length > 0 ? (
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
