import { Link, useLoaderData } from 'react-router-dom';
import { ExerciseLoaderType } from '../types';
import { getTextColors, getBgColors } from '../shared';
import SetButton from '../components/SetButton';

const Exercise = () => {
  const { data, sets } = useLoaderData() as ExerciseLoaderType;
  const textColors = getTextColors(sets.length);
  const bgColors = getBgColors(sets.length);

  return (
    <div className='grid gap-1'>
      {sets.length > 0 ? (
        sets.map((set, i) => (
          <SetButton key={i} bg={bgColors[i]} text={textColors[i]} set={set} />
        ))
      ) : (
        <h1>...</h1>
      )}
    </div>
  );
};

export default Exercise;
