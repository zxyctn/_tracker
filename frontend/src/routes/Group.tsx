import { useSelector } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';

import { getTextColors } from '../shared';
import type { RootState } from '../store';
import type { RouteLoaderType } from '../types';
import Button from '../components/Layout/Button';
import { Droppable } from '@hello-pangea/dnd';
import DraggableComponent from '../components/DND/DraggableComponent';
import DeleteZone from '../components/DND/DeleteZone';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAdd, setEdit } from '../slices/actionsSlice';
import { setGroup } from '../slices/groupsSlice';

const Group = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const edit = useSelector((state: RootState) => state.actions.edit);
  const add = useSelector((state: RootState) => state.actions.add);
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
      dispatch(setEdit({ value: false, result: null }));
      setInitalGroup(group);
    } else if (edit.value && edit.result === false) {
      dispatch(setGroup({ value: initialGroup }));
      dispatch(setEdit({ value: false, result: null }));
    }
  }, [edit]);

  // useEffect(() => {
  //   if (!confirm.value && confirm.result) {
  //     dispatch(removeExerciseSet({ exercise: exercise.id, set: confirm.id }));
  //     dispatch(setConfirm({ value: false, result: null, id: -1, type: '' }));
  //   } else if (confirm.result === false) {
  //     dispatch(setConfirm({ value: false, result: null, id: -1, type: '' }));
  //   }
  // }, [confirm]);

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
                      to={`e/${exercise.id}`}
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

export default Group;
