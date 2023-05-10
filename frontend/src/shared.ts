import { Params } from 'react-router-dom';

import store from './store';
import { BreadcumbType, SetType, UnitsType } from './types';

const textColors = [
  'text-light-50 dark:text-dark-50',
  'text-light-100 dark:text-dark-100',
  'text-light-200 dark:text-dark-200',
  'text-light-300 dark:text-dark-300',
  'text-light-400 dark:text-dark-400',
  'text-light-500 dark:text-dark-500',
  'text-light-600 dark:text-dark-600',
  'text-light-700 dark:text-dark-700',
  'text-light-800 dark:text-dark-800',
  'text-light-900 dark:text-dark-900',
];

const bgColors = [
  'bg-light-50 dark:bg-dark-50',
  'bg-light-100 dark:bg-dark-100',
  'bg-light-200 dark:bg-dark-200',
  'bg-light-300 dark:bg-dark-300',
  'bg-light-400 dark:bg-dark-400',
  'bg-light-500 dark:bg-dark-500',
  'bg-light-600 dark:bg-dark-600',
  'bg-light-700 dark:bg-dark-700',
  'bg-light-800 dark:bg-dark-800',
  'bg-light-900 dark:bg-dark-900',
];

export const units: UnitsType = {
  W: [
    { label: 'KG', value: 'kg' },
    { label: 'LBS', value: 'lb' },
  ],
  S: [
    { label: 'KPH', value: 'kph' },
    { label: 'MPH', value: 'mph' },
  ],
  E: [],
  D: [],
};

export const labels: { [key: string]: string } = {
  W: 'Weight',
  S: 'Speed',
  E: 'Elevation',
  D: 'Difficulty',
  REP: 'Reps',
  DUR: 'Duration',
  DIS: 'Distance',
  CAL: 'Calories',
};

export const getTextColors = (length: number) => {
  const mid = textColors.length / 2;
  const begin = mid - length / 2;
  const end = mid + length / 2 + ((length + 1) % 2);

  return textColors.slice(begin, end);
};

export const getBgColors = (length: number) => {
  const mid = bgColors.length / 2;
  const begin = mid - length / 2;
  const end = mid + length / 2 + ((length + 1) % 2);

  return bgColors.slice(begin, end);
};

export const getSetInfo = (set: number) => {
  const { sets } = store.getState();
  const { unit, goal, fields, type } = sets.find(
    (s) => s.id === set
  ) as SetType;

  const goalStr = `${goal}${unit || (type === 'REP' ? '' : 'CAL')}`;
  const fieldsRep = fields.map(
    (field) => `${field.value}${field.unit ?? field.type}`
  );
  let fieldsStr = fieldsRep.join(', ');
  fieldsStr = fieldsRep.length > 1 ? `[${fieldsStr}]` : fieldsStr;

  return fieldsStr.length ? `${fieldsStr} × ${goalStr}` : goalStr;
};

export const getBreadcrumbs = (params: Params) => {
  const { weekday, group, exercise, set } = params;
  const { groups, exercises } = store.getState();

  const prefix = weekday ? `/d/${weekday}` : '';

  const breadcrumbs = <BreadcumbType[]>[
    weekday && {
      name: weekday,
      path: `/d/${weekday}`,
    },
  ];

  group &&
    breadcrumbs.push({
      name: groups.find((g) => g.id === parseInt(group))?.name || '',
      path: `${prefix}/g/${group}`,
    });

  exercise &&
    breadcrumbs.push({
      name: exercises.find((e) => e.id === parseInt(exercise))?.name || '',
      path: `${prefix}/g/${group}/e/${exercise}`,
    });

  set &&
    breadcrumbs.push({
      name: getSetInfo(parseInt(set)) || '',
      path: `${prefix}/g/${group}/e/${exercise}/s/${set}`,
    });

  return breadcrumbs;
};
