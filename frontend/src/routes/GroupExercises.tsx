import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';
import { Droppable } from '@hello-pangea/dnd';

import DraggableComponent from '../components/DND/DraggableComponent';
import DeleteZone from '../components/DND/DeleteZone';
import Button from '../components/Layout/Button';
import { getTextColors } from '../shared';
import { setAdd, setConfirm, setEdit } from '../slices/actionsSlice';
import { setGroup } from '../slices/groupsSlice';
import type { RootState } from '../store';
import type { RouteLoaderType } from '../types';

const GroupExercises = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const edit = useSelector((state: RootState) => state.actions.edit);
  const add = useSelector((state: RootState) => state.actions.add);
  const confirm = useSelector((state: RootState) => state.actions.confirm);
  const group = useSelector(
    (state: RootState) => state.groups.find((g) => g.id === id)!
  );
  const exercises = useSelector((state: RootState) =>
    group.exercises.map((e) => state.exercises.find((ex) => ex.id === e)! || {})
  );
  const [initialGroup, setInitalGroup] = useState(group);
  const textColors = getTextColors(exercises.length);

  const dispatch = useDispatch();

  useEffect(() => {
    if (edit.value && edit.result) {
      dispatch(setEdit({ ...edit, value: false, result: null }));
      setInitalGroup(group);
    } else if (edit.value && edit.result === false) {
      dispatch(setGroup({ value: initialGroup }));
      dispatch(setEdit({ ...edit, value: false, result: null }));
    }
  }, [edit]);

  useEffect(() => {
    dispatch(
      setAdd({
        ...add,
        prototype: null,
        object: {
          id: +new Date(),
          name: '',
          description: '',
          sets: [],
          history: [],
        },
        pages: 1,
        page: 0,
        id: group.id,
        type: 'EXERCISE',
      })
    );

    dispatch(
      setConfirm({
        ...confirm,
        parent: id as number,
        type: 'EXERCISE',
      })
    );
  }, []);

  return (
    <>
      <Droppable droppableId={`group-${id}`} type='GROUP'>
        {(provided) => (
          <div
            className='grid gap-1 overflow-x-auto scrollbar-hide'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {exercises.length > 0 ? (
              exercises.map((exercise, index) => (
                <DraggableComponent
                  id={`exercise-${exercise.id}`}
                  index={index}
                  key={`exercise-${exercise.id}`}
                  isDragDisabled={!edit.value}
                >
                  <Button
                    key={exercise.id}
                    text={textColors[index]}
                    edit={edit.value}
                  >
                    <Link
                      to={edit.value ? `${exercise.id}` : `${exercise.id}/s`}
                      className='text-center w-full'
                    >
                      {exercise.name}
                    </Link>
                  </Button>
                </DraggableComponent>
              ))
            ) : (
              <h1>...</h1>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <DeleteZone droppableId='group-delete' type='GROUP' />
    </>
  );
};

export default GroupExercises;
