import { useLoaderData, useOutletContext } from 'react-router-dom';
import { ExerciseLoaderType } from '../types';
import { getTextColors, getBgColors } from '../shared';
import SetButton from '../components/SetButton';

const Exercise = () => {
  const [edit, update] = useOutletContext() as [boolean, boolean];
  const { data, sets } = useLoaderData() as ExerciseLoaderType;
  const textColors = getTextColors(sets.length);
  const bgColors = getBgColors(sets.length);

  return (
    <div className='grid gap-1'>
      {sets.length > 0 ? (
        sets.map((set, i) => (
          <SetButton
            key={i}
            bg={bgColors[i]}
            text={textColors[i]}
            set={set}
            edit={edit}
          />
        ))
      ) : (
        <h1>...</h1>
      )}
    </div>
  );
};

export default Exercise;
