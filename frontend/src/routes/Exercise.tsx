import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable } from '@hello-pangea/dnd';
import { useLoaderData } from 'react-router-dom';
import { Trash2Fill } from 'react-bootstrap-icons';

import SetButton from '../components/SetButton';
import DraggableComponent from '../components/DraggableComponent';
import { getTextColors, getBgColors } from '../shared';
import { setExercise } from '../slices/exercisesSlice';
import { setEdit } from '../slices/actionsSlice';
import { removeSet } from '../slices/setsSlice';
import { removeSet as exerciseRemoveSet } from '../slices/exercisesSlice';
import type { RootState } from '../store';
import type { RouteLoaderType } from '../types';

const Exercise = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const edit = useSelector((state: RootState) => state.actions.edit);
  const confirm = useSelector((state: RootState) => state.actions.confirm);
  const exercise = useSelector(
    (state: RootState) => state.exercises.find((e) => e.id === id)!
  );
  const exerciseSets = useSelector((state: RootState) =>
    state.exercises
      .find((e) => e.id === id)!
      .sets.map((set) => state.sets.find((s) => s.id === set)!)
  );

  const dispatch = useDispatch();

  const [initialExercise] = useState(exercise);
  const textColors = getTextColors(exercise.sets.length);
  const bgColors = getBgColors(exercise.sets.length);

  useEffect(() => {
    if (edit.value && edit.result) {
      dispatch(setEdit({ value: false, result: null }));
    } else if (edit.value && edit.result === false) {
      dispatch(setExercise({ exercise: id as number, value: initialExercise }));
      dispatch(setEdit({ value: false, result: null }));
    }
  }, [edit]);

  useEffect(() => {
    if (!confirm.value && confirm.result) {
      dispatch(removeSet(confirm.id));
      dispatch(exerciseRemoveSet({ exercise: exercise.id, set: confirm.id }));
    } else if (edit.value && edit.result === false) {
      dispatch(setExercise({ exercise: id as number, value: initialExercise }));
      dispatch(setEdit({ value: false, result: null }));
    }
  }, [edit]);

  return (
    <>
      <Droppable droppableId={`exercise-${id}`} type='EXERCISE'>
        {(provided, snapshot) => (
          <div
            className='grid gap-1 overflow-x-auto scrollbar-hide'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {exerciseSets.length > 0 ? (
              exerciseSets.map((set, i) => (
                <DraggableComponent
                  id={`set-${set.id}`}
                  index={i}
                  key={`set-${set.id}`}
                  isDragDisabled={!edit.value}
                >
                  <SetButton
                    bg={bgColors[i]}
                    text={textColors[i]}
                    set={set}
                    edit={edit.value}
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

      <Droppable droppableId={`exercise-delete`} type='EXERCISE'>
        {(provided, snapshot) => (
          <div
            className='fixed bottom-0 left-0 w-screen max-w-fit flex justify-left items-baseline p-5 z-50'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div
              className={` transition-all ease-in-out duration-500 btn btn-error p-0 aspect-square rounded-xl font-bold text-2xl z-50 
                ${edit.value ? '' : 'hidden'}
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
