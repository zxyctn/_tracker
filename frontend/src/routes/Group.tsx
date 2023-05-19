import { Link, useLoaderData } from 'react-router-dom';
import { GroupLoaderType } from '../types';
import { getTextColors } from '../shared';

const Group = () => {
  const { exercises } = useLoaderData() as GroupLoaderType;
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