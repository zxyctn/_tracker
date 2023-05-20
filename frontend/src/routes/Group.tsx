import { useSelector } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';

import { getTextColors } from '../shared';
import type { RootState } from '../store';
import type { RouteLoaderType } from '../types';

const Group = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const group = useSelector(
    (state: RootState) => state.groups.find((g) => g.id === id)!
  );
  const exercises = useSelector((state: RootState) =>
    state.exercises.filter((e) => group.exercises.includes(e.id))
  );
  const textColors = getTextColors(exercises.length);

  return (
    <div className='grid gap-1'>
      {exercises.length > 0 ? (
        exercises.map((exercise, index) => (
          <button className={`coloredBtn ${textColors[index]}`} key={index}>
            <Link to={`e/${exercise.id}`}>{exercise.name}</Link>
          </button>
        ))
      ) : (
        <h1>...</h1>
      )}
    </div>
  );
};

export default Group;
