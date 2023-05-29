import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

import Fields from '../components/Set/Fields';
import { setSet } from '../slices/setsSlice';
import { setEdit } from '../slices/actionsSlice';
import type { RootState } from '../store';
import type { FieldType, RouteLoaderType } from '../types';

const Set = () => {
  const { id } = useLoaderData() as RouteLoaderType;
  const edit = useSelector((state: RootState) => state.actions.edit);
  const set = useSelector(
    (state: RootState) => state.sets.find((s) => s.id === id)!
  );
  const [initialSet] = useState(set);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editFn = () => {
    dispatch(setEdit({ ...edit, value: false, result: null }));
    navigate(-1);
  };

  useEffect(() => {
    if (edit.value && edit.result != null) {
      if (edit.result === false) dispatch(setSet(initialSet));
      editFn();
    }
  }, [edit]);

  const updateValue = (newValue: FieldType) => {
    dispatch(
      setSet({
        ...set,
        fields: set.fields.map((f) =>
          f.type === newValue.type ? newValue : f
        ),
      })
    );
  };

  return <Fields set={set} edit={edit.value} updateValue={updateValue} />;
};

export default Set;
