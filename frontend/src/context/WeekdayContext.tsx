import { ReactNode, createContext, useReducer } from 'react';
import { GroupType, WeekdayType } from '../types';

export const WeekdayContext = createContext(
  {} as WeekdayType & {
    dispatch: React.Dispatch<{ type: string; payload: GroupType }>;
  }
);

const initialWeekday = { day: 'Monday', groups: [], active: true };

export const WeekdayProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(weekdayReducer, initialWeekday);

  return (
    <WeekdayContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WeekdayContext.Provider>
  );
};

const weekdayReducer = (
  state: WeekdayType,
  action: { type: string; payload: GroupType }
) => {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    }
    case 'remove': {
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload.id),
      };
    }
    case 'activate': {
      return {
        ...state,
        active: true,
      };
    }
    case 'deactivate': {
      return {
        ...state,
        active: false,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
