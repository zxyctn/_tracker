import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable } from '@hello-pangea/dnd';

import DraggableComponent from '../components/DND/DraggableComponent';
import Button from '../components/Layout/Button';
import DeleteZone from '../components/DND/DeleteZone';
import { getTextColors } from '../shared';
import { setAdd, setConfirm, setEdit } from '../slices/actionsSlice';
import { setWeekday } from '../slices/weekdaysSlice';
import type { RootState } from '../store';
import type { RouteLoaderType } from '../types';

const Weekday = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const add = useSelector((state: RootState) => state.actions.add);
  const edit = useSelector((state: RootState) => state.actions.edit);
  const confirm = useSelector((state: RootState) => state.actions.confirm);
  const groups = useSelector((state: RootState) => state.groups);
  const weekday = useSelector((state: RootState) => state.weekdays[id]);

  const textColors = getTextColors(groups.length);

  const [initialWeekday, setInitalWeekday] = useState(weekday);
  const [weekdayGroups, setWeekdayGroups] = useState(
    weekday.groups.map((g) => groups.find((group) => group.id === g)!)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setWeekdayGroups(
      weekday.groups.map((g) => groups.find((group) => group.id === g)!)
    );
  }, [weekday]);

  useEffect(() => {
    if (edit.value && edit.result) {
      dispatch(setEdit({ ...edit, value: false, result: null }));
      setInitalWeekday(weekday);
    } else if (edit.value && edit.result === false) {
      dispatch(setWeekday(initialWeekday));
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
          exercises: [],
        },
        pages: 1,
        page: 0,
        id: weekday.day,
        type: 'GROUP',
      })
    );

    dispatch(
      setConfirm({
        ...confirm,
        parent: id as string,
        type: 'GROUP',
      })
    );
  }, []);

  return (
    <>
      <Droppable droppableId={weekday.day} type='WEEKDAY'>
        {(provided) => (
          <div
            className='grid gap-1 overflow-x-auto scrollbar-hide'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {weekdayGroups.length > 0 ? (
              weekdayGroups.map((g, index) => (
                <DraggableComponent
                  id={`group-${g.id}`}
                  index={index}
                  key={`group-${g.id}`}
                  isDragDisabled={!edit.value}
                >
                  <Button key={g.id} text={textColors[index]} edit={edit.value}>
                    <Link
                      to={edit.value ? `g/${g.id}` : `g/${g.id}/e`}
                      className='text-center w-full'
                    >
                      {g.name}
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

      <DeleteZone droppableId='weekday-delete' type='WEEKDAY' />
    </>
  );
};

export default Weekday;
