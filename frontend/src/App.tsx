import Input from './components/Input';
import Multiselect from './components/Multiselect';
import PasswordField from './components/PasswordField';
import RadioGroup from './components/RadioGroup';
import TextField from './components/TextField';

const App = () => {
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

  return (
    <div className='w-screen h-screen flex justify-center items-center p-5 gap-10'>
      <div className='grid gap-10'>
        <Input type={false} name='fields'>
          <Multiselect options={field_options} />
        </Input>
        <Input type={false} name='goal type'>
          <RadioGroup options={goal_options} />
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
    </div>
  );
};

export default App;
