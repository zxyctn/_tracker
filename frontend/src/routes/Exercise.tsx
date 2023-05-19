import { useEffect, useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { DropResult } from '@hello-pangea/dnd';

import SetButton from '../components/SetButton';
import DroppableComponent from '../components/DroppableComponent';
import DraggableComponent from '../components/DraggableComponent';
import store from '../store';
import { getTextColors, getBgColors, reorder } from '../shared';
import { ExerciseLoaderType, SetType } from '../types';
import { setExercise } from '../slices/exercisesSlice';

const Exercise = () => {
  const { data } = useLoaderData() as ExerciseLoaderType;
  const [edit] = useOutletContext() as [boolean, boolean];
  const [exerciseSets, setExerciseSets] = useState<number[]>([...data!.sets]);
  const [sets, setSets] = useState<SetType[]>([]);
  const textColors = getTextColors(data!.sets.length);
  const bgColors = getBgColors(data!.sets.length);

  useEffect(() => {
    setSets(
      exerciseSets.map((set) => {
        const found = store.getState().sets.find((s) => s.id === set);
        if (!found) throw new Error('set not found');
        return found;
      })
    );
  }, [exerciseSets]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) return;
      const orderedSets = reorder(
        exerciseSets,
        source.index,
        destination.index
      );

      store.dispatch(
        setExercise({
          exercise: data!.id,
          value: {
            ...data!,
            sets: orderedSets,
          },
        })
      );
      setExerciseSets(orderedSets);
    }
  };

  return (
    <DroppableComponent
      id={`exercise-${data?.id}`}
      type='EXERCISE'
      onDragEnd={onDragEnd}
    >
      <div className='grid gap-1'>
        {sets.length > 0 ? (
          sets.map((set, i) => (
            <DraggableComponent
              id={`set-${set.id}`}
              index={i}
              key={`set-${set.id}`}
            >
              <SetButton
                bg={bgColors[i]}
                text={textColors[i]}
                set={set}
                edit={edit}
              />
            </DraggableComponent>
          ))
        ) : (
          <h1>...</h1>
        )}
      </div>
    </DroppableComponent>
  );
};

export default Exercise;
