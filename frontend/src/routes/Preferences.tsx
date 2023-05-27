import { useSelector } from 'react-redux';
import Input from '../components/Input/Input';
import RadioGroup from '../components/Input/RadioGroup';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { setFilterBy, setTheme } from '../slices/appSlice';

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

  const filterByOptions = [
    {
      label: 'Weekdays',
      value: 'weekdays',
    },
    {
      label: 'Groups',
      value: 'groups',
    },
  ];

  const dispatch = useDispatch();

  const themeChange = (theme: string) => {
    dispatch(setTheme(theme));
  };

  const filterByChange = (filter: string) => {
    dispatch(setFilterBy(filter));
  };

  return (
    <div className='grid gap-10'>
      <Input name='theme' type={true} key='theme'>
        <RadioGroup
          edit={true}
          onChange={themeChange}
          initial={theme}
          options={themes}
          theme={false}
        />
      </Input>

      <Input name='filter by' type={true} key='filters'>
        <RadioGroup
          edit={true}
          onChange={filterByChange}
          initial={filterBy}
          options={filterByOptions}
          theme={false}
        />
      </Input>
    </div>
  );
};

export default Preferences;
