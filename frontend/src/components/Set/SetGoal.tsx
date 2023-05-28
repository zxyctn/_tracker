import { setBtnClass } from '../../shared';
import type { SetComponentProps } from '../../types';

const SetGoal = (props: SetComponentProps) => {
  const { set } = props;
  const goal = set.fields.find((f) => f.goal)!;
  return (
    <>
      <div className='flex items-center gap-5 w-full'>
        {set.fields.filter((f) => !f.goal).length > 0 && (
          <span className=''>×</span>
        )}
        <span className='flex gap-1 items-center'>
          {goal.value}
          {(goal.unit.length || goal.type !== 'REP') && (
            <div className={setBtnClass(props)}>
              {goal.unit.length
                ? goal.unit
                : goal.type !== 'REP'
                ? goal.type
                : ''}
            </div>
          )}
        </span>
      </div>
    </>
  );
};

export default SetGoal;
