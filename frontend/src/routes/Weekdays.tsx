import { Link, useLoaderData } from 'react-router-dom';

import { getTextColors } from '../shared';
import type { WeekdaysType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import Multiselect from '../components/Input/Multiselect';
import { set } from '../slices/weekdaysSlice';
import { useDispatch } from 'react-redux';
import { setEdit } from '../slices/actionsSlice';
import Input from '../components/Input/Input';

const Weekdays = () => {
  const edit = useSelector((state: RootState) => state.actions.edit);

  const weekdays = useSelector((state: RootState) => state.weekdays);
  const [initialWeekdays] = useState(weekdays);

  const textColors = getTextColors(Object.keys(weekdays).length);
  const today = (new Date().getDay() + 6) % 7;

  const dispatch = useDispatch();

  const options = Object.keys(weekdays).map((day) => ({
    value: day,
    label: day,
    checked: weekdays[day].active,
  }));

  const setOptions = (options: string[]) => {
    const newWeekdays: WeekdaysType = {};
    Object.keys(weekdays).forEach((day) => {
      newWeekdays[day] = {
        ...weekdays[day],
        active: options.includes(day),
      };
    });
    dispatch(set({ value: newWeekdays }));
  };

  useEffect(() => {
    if (edit.value && edit.result) {
      dispatch(setEdit({ value: false, result: null }));
    } else if (edit.value && edit.result === false) {
      dispatch(set({ value: initialWeekdays }));
      dispatch(setEdit({ value: false, result: null }));
    }
  }, [edit]);

  return (
    <div className='grid gap-1'>
      {Object.keys(weekdays).length === 0 && <div className=''>...</div>}
      {edit.value === false ? (
        Object.keys(weekdays).map(
          (day, index) =>
            weekdays[day].active === true && (
              <div
                className={`${today === index ? 'today' : 'coloredBtn'} ${
                  textColors[index]
                }`}
                key={index}
              >
                <Link to={`/d/${day.toLowerCase()}`}>{day}</Link>
              </div>
            )
        )
      ) : (
        <Input name='workout days' type={false}>
          <Multiselect options={options} setOptions={setOptions} />
        </Input>
      )}
    </div>
  );
};

export default Weekdays;
