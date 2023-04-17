import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from './components/Logo';

const App = () => {
  const [isEdit, setIsEdit] = useState(false);

  const field_options = [
    { label: 'Weights', value: 'W' },
    { label: 'Speed', value: 'S' },
    { label: 'Elevation', value: 'E' },
    { label: 'Difficulty', value: 'D' },
  ];

  const goal_options = [
    { label: 'Reps', value: 'REP' },
    { label: 'Duration', value: 'DUR' },
    { label: 'Distance', value: 'DIS' },
    { label: 'Calories', value: 'CAL' },
  ];

  const speed_units = [
    { label: 'KM/H', value: 'kph' },
    { label: 'MPH', value: 'mph' },
  ];

  return (
    <div className='p-5 w-screen h-screen'>
      <div className='w-full h-full grid'>
        <Logo isEdit={isEdit} />
        <div className='grid justify-center h-min place-content-stretch'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
/*

<div className='grid gap-10'>
        <Input type={false} name='fields'>
          <Multiselect options={field_options} />
        </Input>
        <Input type={false} name='goal type'>
          <RadioGroup initial='REP' options={goal_options} />
        </Input>
      </div>

      <div className='grid gap-3'>
        <Input type={true} name='username'>
          <TextField />
        </Input>
        <Input type={true} name='email'>
          <TextField type='email' />
        </Input>
        <Input type={true} name='password'>
          <PasswordField />
        </Input>

        <button className='btn btn-primary text-xl'>LOGIN</button>
      </div>

      <div className='grid gap-3'>
        <Input type={false} name='speed'>
          <NumberField step={0.5} units={speed_units} />
        </Input>

        <Logo isEdit={false} />
      </div>

*/
