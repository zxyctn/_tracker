import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from './components/Logo';
import ActionButton from './components/ActionButton';

const App = () => {
  const [isEdit, setIsEdit] = useState(false);

  // const field_options = [
  //   { label: 'Weights', value: 'W' },
  //   { label: 'Speed', value: 'S' },
  //   { label: 'Elevation', value: 'E' },
  //   { label: 'Difficulty', value: 'D' },
  // ];

  // const goal_options = [
  //   { label: 'Reps', value: 'REP' },
  //   { label: 'Duration', value: 'DUR' },
  //   { label: 'Distance', value: 'DIS' },
  //   { label: 'Calories', value: 'CAL' },
  // ];

  // const speed_units = [
  //   { label: 'KM/H', value: 'kph' },
  //   { label: 'MPH', value: 'mph' },
  // ];

  return (
    <div className='p-5 w-screen h-screen'>
      <div className='w-full h-full grid'>
        <Logo isEdit={isEdit} />
        <div className='grid justify-center h-min w-full'>
          <Outlet />
        </div>
        <ActionButton />
      </div>
    </div>
  );
};

export default App;
