import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from '@hello-pangea/dnd';
import { useLoaderData } from 'react-router-dom';
import { Trash2Fill } from 'react-bootstrap-icons';

import SetButton from '../components/SetButton';
import DraggableComponent from '../components/DraggableComponent';
import store from '../store';
import { getTextColors, getBgColors } from '../shared';
import { setExercise } from '../slices/exercisesSlice';
import { setCancel, setComplete, setEdit } from '../slices/actionsSlice';
import type { RootState } from '../store';
import type { RouteLoaderType, SetType } from '../types';

const Exercise = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const edit = useSelector((state: RootState) => state.actions.edit);
  const complete = useSelector((state: RootState) => state.actions.complete);
  const cancel = useSelector((state: RootState) => state.actions.cancel);
  const exercise = useSelector(
    (state: RootState) => state.exercises.find((e) => e.id === id)!
  );

  const [initialExercise] = useState(exercise);
  const [sets, setSets] = useState<SetType[]>([]);
  const textColors = getTextColors(exercise.sets.length);
  const bgColors = getBgColors(exercise.sets.length);

  useEffect(() => {
    setSets(
      exercise.sets.map((set) => {
        const found = store.getState().sets.find((s) => s.id === set);
        if (!found) throw new Error('set not found');
        return found;
      })
    );
  }, [exercise]);

  useEffect(() => {
    if (edit) {
      if (cancel) {
        store.dispatch(
          setExercise({ exercise: id as number, value: initialExercise })
        );
      }
      if (cancel || complete) {
        store.dispatch(setEdit(false));
        store.dispatch(setCancel(false));
        store.dispatch(setComplete(false));
      }
    }
  }, [edit, cancel, complete]);

  return (
    <>
      <Droppable droppableId={`exercise-${id}`} type='EXERCISE'>
        {(provided, snapshot) => (
          <div
            className='grid gap-1 overflow-auto'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sets.length > 0 ? (
              sets.map((set, i) => (
                <DraggableComponent
                  id={`set-${set.id}`}
                  index={i}
                  key={`set-${set.id}`}
                  isDragDisabled={!edit}
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* DELETE ZONE */}
      <Droppable droppableId={`delete`} type='EXERCISE' isDropDisabled={!edit}>
        {(provided, snapshot) => (
          <div
            className='fixed bottom-0 left-0 w-screen max-w-fit flex justify-left items-baseline p-5 z-50'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div
              className={` transition-all ease-in-out duration-500 btn btn-error p-0 aspect-square rounded-xl font-bold text-2xl z-50 
                ${edit ? '' : 'hidden'}
                ${
                  snapshot.isDraggingOver
                    ? 'w-full aspect-square h-full max-h-64'
                    : 'w-min'
                }
              `}
            >
              <div className=''>
                <Trash2Fill size={24} />
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Exercise;
