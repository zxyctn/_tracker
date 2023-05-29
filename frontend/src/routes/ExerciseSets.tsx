import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable } from '@hello-pangea/dnd';
import { useLoaderData } from 'react-router-dom';

import SetButton from '../components/Set/SetButton';
import DraggableComponent from '../components/DND/DraggableComponent';
import DeleteZone from '../components/DND/DeleteZone';
import { getTextColors, getBgColors } from '../shared';
import { setExercise } from '../slices/exercisesSlice';
import { setAdd, setConfirm, setEdit } from '../slices/actionsSlice';
import type { RootState } from '../store';
import type { RouteLoaderType, SetType } from '../types';

const ExerciseSets = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const edit = useSelector((state: RootState) => state.actions.edit);
  const confirm = useSelector((state: RootState) => state.actions.confirm);
  const add = useSelector((state: RootState) => state.actions.add);
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
      dispatch(setEdit({ ...edit, value: false, result: null }));
    } else if (edit.value && edit.result === false) {
      dispatch(setExercise({ exercise: id as number, value: initialExercise }));
      dispatch(setEdit({ ...edit, value: false, result: null }));
    }
  }, [edit]);

  useEffect(() => {
    const prototype =
      exerciseSets.length > 0 ? exerciseSets[exerciseSets.length - 1] : null;

    let object: SetType = {
      id: +new Date(),
      fields: prototype
        ? [...prototype.fields]
        : [
            {
              goal: true,
              value: 0,
              type: 'REP',
              unit: '',
            },
          ],
    };

    dispatch(
      setAdd({
        ...add,
        prototype,
        object,
        pages: 2,
        page: prototype ? 1 : 0,
        id: exercise.id,
        type: 'SET',
      })
    );

    dispatch(
      setConfirm({
        ...confirm,
        parent: id as number,
        type: 'SET',
      })
    );
  }, []);

  return (
    <>
      <Droppable droppableId={`exercise-${id}`} type='EXERCISE'>
        {(provided) => (
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

      <DeleteZone droppableId='exercise-delete' type='EXERCISE' />
    </>
  );
};

export default ExerciseSets;
