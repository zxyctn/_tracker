import { useLoaderData, useOutletContext } from 'react-router-dom';

import Input from '../components/Input';
import NumberField from '../components/NumberField';
import { labels, units } from '../shared';
import { SetLoaderType, SetType } from '../types';
import { useEffect } from 'react';

const Set = () => {
  const edit = useOutletContext();
  const { data } = useLoaderData() as SetLoaderType;
  const { fields, goal, type, unit } = data as SetType;

  return (
    <div className='grid gap-5 px-5'>
      {fields.map((field) => (
        <Input key={field.type} name={labels[field.type]} type={true}>
          <NumberField step={0.5} units={units[field.type]} />
        </Input>
      ))}
      {fields.length && (
        <span className='w-full text-center font-bold text-primary text-2xl'>
          ×
        </span>
      )}
      <Input name={labels[type]} type={true}>
        <NumberField step={0.5} units={units[type]} />
      </Input>
    </div>
  );
};

export default Set;
