import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getTextColors } from '../shared';
import { setEdit } from '../slices/actionsSlice';
import type { RootState } from '../store';

const Groups = () => {
  const edit = useSelector((state: RootState) => state.actions.edit);
  const groups = useSelector((state: RootState) => state.groups);
  const textColors = getTextColors(groups.length);

  const dispatch = useDispatch();

  useEffect(() => {
    if (edit.value && edit.result) {
      dispatch(setEdit({ ...edit, value: false, result: null }));
    } else if (edit.value && edit.result === false) {
      dispatch(setEdit({ ...edit, value: false, result: null }));
    }
  }, [edit]);

  return (
    <>
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <button className={`coloredBtn ${textColors[index]}`} key={index}>
            <Link to={`${group.id}/e`}>{group.name}</Link>
          </button>
        ))
      ) : (
        <h1>...</h1>
      )}
    </>
  );
};

export default Groups;
