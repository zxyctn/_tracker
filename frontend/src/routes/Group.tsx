import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { popBreadcrumb, pushBreadcrumb } from '../slices/appSlice';
import { GroupLoaderType } from '../types';
import { getTextColors } from '../shared';

const Group = () => {
  const { data, exercises } = useLoaderData() as GroupLoaderType;
  const textColors = getTextColors(exercises.length);

  return (
    <div className='grid gap-1'>
      {exercises.length > 0 ? (
        exercises.map((exercise, index) => (
          <button
            className={`h-min w-full btn btn-ghost hover:bg-primary hover:text-white dark:hover:text-black text-3xl ${textColors[index]}`}
            key={index}
          >
            <Link to={`exercises/${exercise.id}`}>{exercise.name}</Link>
          </button>
        ))
      ) : (
        <h1>...</h1>
      )}
    </div>
  );
};

export default Group;
