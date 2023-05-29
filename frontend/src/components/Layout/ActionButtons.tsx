import { useState } from 'react';
import {
  XLg,
  PlusLg,
  Check,
  List,
  PencilFill,
  ArrowLeft,
  ArrowRight,
} from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';

import {
  nextPage,
  prevPage,
  setAdd,
  setConfirm,
  setEdit,
} from '../../slices/actionsSlice';
import { addSet, removeSet } from '../../slices/setsSlice';
import {
  addExercise,
  addExerciseSet,
  removeExercise,
  removeExerciseSet,
} from '../../slices/exercisesSlice';
import type { RootState } from '../../store';
import type {
  ActionButtonProps,
  ExerciseType,
  GroupType,
  SetType,
} from '../../types';
import {
  addExerciseGroup,
  addGroup,
  removeExerciseGroup,
  removeGroup,
} from '../../slices/groupsSlice';
import {
  addGroupWeekday,
  removeGroupWeekday,
} from '../../slices/weekdaysSlice';

const ActionButtons = ({ menuClickHandler, theme }: ActionButtonProps) => {
  const [expanded, setExpanded] = useState(false);

  const groups = useSelector((state: RootState) => state.groups);
  const exercises = useSelector((state: RootState) => state.exercises);
  const sets = useSelector((state: RootState) => state.sets);

  const edit = useSelector((state: RootState) => state.actions.edit);
  const add = useSelector((state: RootState) => state.actions.add);
  const confirm = useSelector((state: RootState) => state.actions.confirm);
  const dispatch = useDispatch();

  const addFn = () => {
    dispatch(setAdd({ ...add, value: true, result: null }));
  };

  const cancelFn = () => {
    if (add.value && add.object != null) {
      dispatch(setAdd({ ...add, value: false, result: false }));
    } else if (confirm.value) {
      dispatch(setConfirm({ ...confirm, value: false, result: false }));
    } else {
      dispatch(setEdit({ ...edit, value: true, result: false }));
    }
  };

  const doneFn = () => {
    if (add.value && add.object != null) {
      switch (add.type) {
        case 'SET':
          dispatch(addSet(add.object as SetType));
          dispatch(
            addExerciseSet({ exercise: add.id as number, set: add.object.id })
          );
          break;
        case 'EXERCISE':
          dispatch(addExercise(add.object as ExerciseType));
          dispatch(
            addExerciseGroup({
              group: add.id as number,
              exercise: add.object.id as number,
            })
          );
          break;
        case 'GROUP':
          dispatch(addGroup({ group: add.object as GroupType }));
          dispatch(
            addGroupWeekday({ day: add.id as string, group: add.object.id })
          );
          break;
      }
      dispatch(setAdd({ ...add, object: null, value: false, result: true }));
      dispatch(setEdit({ ...edit, value: false, result: null }));
    } else if (confirm.value) {
      switch (confirm.type) {
        case 'SET':
          dispatch(removeSet(confirm.id));
          dispatch(
            removeExerciseSet({
              exercise: confirm.parent as number,
              set: confirm.id,
            })
          );
          break;

        case 'EXERCISE':
          const exercise = exercises.find((e) => e.id === confirm.id)!;
          exercise.sets.forEach((set) => {
            dispatch(removeSet(set));
          });
          dispatch(removeExercise({ id: confirm.id }));
          dispatch(
            removeExerciseGroup({
              group: confirm.parent as number,
              exercise: confirm.id,
            })
          );
          break;

        case 'GROUP':
          const group = groups.find((g) => g.id === confirm.id)!;
          group.exercises.forEach((exercise) => {
            const ex = exercises.find((e) => e.id === exercise)!;
            ex.sets.forEach((set) => {
              dispatch(removeSet(set));
            });
            dispatch(removeExercise({ id: ex.id }));
          });
          dispatch(removeGroup({ id: confirm.id }));
          dispatch(
            removeGroupWeekday({
              day: confirm.parent as string,
              id: confirm.id,
            })
          );
          break;
      }

      dispatch(setConfirm({ ...confirm, value: false, result: null }));
      dispatch(setEdit({ ...edit, value: false, result: null }));
    } else {
      dispatch(setEdit({ ...edit, value: true, result: null }));
    }
  };

  const editFn = () => {
    dispatch(setEdit({ ...edit, value: true, result: null }));
  };

  return (
    <div className='w-full h-full items-end justify-end align-bottom'>
      {edit.value ? (
        <div className='grid grid-cols-1 overflow-auto'>
          <div className='flex gap-1.5 w-min overflow-auto p-5'>
            {add.value && (
              <button
                className={`${
                  add.value ? '' : 'hidden'
                } btn btn-secondary actionBtn`}
                onClick={() => dispatch(prevPage())}
                disabled={add.page === 0}
              >
                <ArrowLeft className='stroke-current stroke-1 p-0.5' />
              </button>
            )}
            {add.value && (
              <button
                className={`${
                  add.value ? '' : 'hidden'
                } btn btn-secondary actionBtn`}
                onClick={() => dispatch(nextPage())}
                disabled={add.page === add.pages - 1}
              >
                <ArrowRight className='stroke-current stroke-1 p-0.5' />
              </button>
            )}
            {add.possible && (
              <button
                className={`btn btn-secondary actionBtn`}
                onClick={addFn}
                disabled={add.value}
              >
                <PlusLg className='stroke-current stroke-1 p-0.5' />
              </button>
            )}
            <button className='btn btn-accent actionBtn' onClick={cancelFn}>
              <XLg className='stroke-current stroke-1 p-1' />
            </button>

            <button className='btn btn-primary actionBtn' onClick={doneFn}>
              <Check
                width={36}
                height={36}
                className='stroke-current stroke-0 p-0.5'
              />
            </button>
          </div>
        </div>
      ) : (
        <div className='flex gap-1.5 w-min overflow-auto p-5'>
          {expanded && (
            <>
              {!theme && edit.possible && (
                <button
                  className={`btn btn-primary actionBtn`}
                  onClick={() => {
                    editFn();
                    setExpanded((current) => !current);
                  }}
                >
                  <PencilFill
                    width={36}
                    height={36}
                    className='stroke-current stroke-1 p-2'
                  />
                </button>
              )}

              <button
                className={`btn btn-primary actionBtn ${
                  theme && 'text-primary-focus border-0 bg-primary-content'
                }`}
                onClick={() => {
                  menuClickHandler();
                  theme && setExpanded((current) => !current);
                }}
              >
                <List
                  width={36}
                  height={36}
                  className='stroke-current stroke-1 p-2'
                />
              </button>
            </>
          )}
          {!theme && (
            <button
              className={`btn transition-all ease-linear duration-100 ${
                theme
                  ? 'text-primary-focus border-0 bg-primary-content'
                  : 'btn-primary'
              } aspect-square rounded-xl font-extrabold text-2xl z-50`}
              onClick={() => setExpanded((current) => !current)}
            >
              #
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
