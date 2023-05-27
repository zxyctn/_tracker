import { useSelector } from 'react-redux';
import Input from '../components/Input/Input';
import RadioGroup from '../components/Input/RadioGroup';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { setTheme } from '../slices/appSlice';

const ThemeColors = ({ theme }: { theme: string }) => {
  return (
    <span
      className='bg-primary-focus rounded-md flex gap-1 w-max p-2'
      data-theme={theme}
    >
      <div className='bg-primary w-4 h-4'></div>
      <div className='bg-secondary w-4 h-4'></div>
      <div className='bg-accent w-4 h-4'></div>
      <div className='bg-neutral w-4 h-4'></div>
    </span>
  );
};

const Preferences = () => {
  const theme = useSelector((state: RootState) => state.app.theme);
  const filterBy = useSelector((state: RootState) => state.app.filterBy);

  const themes = [
    {
      label: 'Light',
      value: 'light',
      component: <ThemeColors theme='light' />,
    },
    {
      label: 'Dark',
      value: 'dark',
      component: <ThemeColors theme='dark' />,
    },
  ];

  const dispatch = useDispatch();

  const themeChange = (theme: string) => {
    dispatch(setTheme(theme));
  };

  return (
    <div className='grid gap-5'>
      <Input name='theme' type={true}>
        <RadioGroup
          edit={true}
          onChange={themeChange}
          initial={theme}
          options={themes}
          theme={false}
        />
      </Input>
    </div>
  );
};

export default Preferences;
