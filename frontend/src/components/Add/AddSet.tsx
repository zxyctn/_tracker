import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../Input/Input';
import Fields from '../Set/Fields';
import RadioGroup from '../Input/RadioGroup';
import Multiselect from '../Input/Multiselect';
import { setAddObject } from '../../slices/actionsSlice';
import { labels, units } from '../../shared';
import type { RootState } from '../../store';
import type { FieldType, SetType } from '../../types';

const AddSet = () => {
  const add = useSelector((state: RootState) => state.actions.add);
  const [object, setObject] = useState(add.object as SetType);
  const goalType = object.fields.find((f) => f.goal === true)?.type || 'REP';

  const dispatch = useDispatch();

  let fieldTypes = ['W', 'S', 'E', 'D'].map((field) => {
    return {
      value: field,
      label: labels[field],
      checked: object.fields.find((f) => f.type === field) ? true : false,
    };
  });

  const updateValue = (newValue: FieldType) => {
    const newObject = {
      ...object,
      fields: object.fields.map((f) =>
        f.type === newValue.type ? newValue : f
      ),
    };
    setObject(newObject);
    dispatch(setAddObject(newObject));
  };

  const goalTypes = ['REP', 'DUR', 'DIS', 'CAL'].map((field) => {
    return {
      value: field,
      label: labels[field],
    };
  });

  const setFields = (fields: string[]) => {
    dispatch(
      setAddObject({
        ...object,
        fields: [
          ...fields.map((field) => {
            return {
              type: field,
              value: 0,
              unit: units[field].length > 0 ? units[field][0].value : '',
            };
          })!,
          object.fields.find((f) => f.goal === true)!,
        ],
      })
    );
  };

  const setGoal = (goal: string) => {
    dispatch(
      setAddObject({
        ...object,
        fields: object.fields.map((f) =>
          f.goal
            ? {
                goal: true,
                type: goal,
                value: 0,
                unit: units[goal].length > 0 ? units[goal][0].value : '',
              }
            : f
        ),
      })
    );
  };

  useEffect(() => {
    fieldTypes = ['W', 'S', 'E', 'D'].map((field) => {
      return {
        value: field,
        label: labels[field],
        checked: object.fields.find((f) => f.type === field) ? true : false,
      };
    });
  }, [object.fields]);

  useEffect(() => {
    console.log(add.object);
    setObject(add.object as SetType);
  }, [add.object]);

  return (
    <>
      {add.page === 0 && (
        <div>
          <Input name='fields' type={false}>
            <Multiselect options={fieldTypes} setOptions={setFields} />
          </Input>
        </div>
      )}
      {add.page === 1 && (
        <Input name='unit' type={false}>
          <RadioGroup
            edit={true}
            initial={goalType}
            options={goalTypes}
            onChange={setGoal}
          />
        </Input>
      )}
      {add.page === 2 && (
        <Fields edit={true} set={object} updateValue={updateValue} />
      )}
    </>
  );
};

export default AddSet;
