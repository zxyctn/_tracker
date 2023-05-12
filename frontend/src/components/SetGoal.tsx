import { setBtnClass } from '../shared';
import { SetComponentProps } from '../types';

const SetGoal = (props: SetComponentProps) => {
  const { set } = props;
  const { goal } = set;
  return (
    <>
      <div className='flex items-center gap-5 w-full'>
        {set.fields.length && <span className=''>×</span>}
        <span className='flex gap-1 items-center'>
          {goal.value}
          {(goal.unit || goal.type !== 'REP') && (
            <div className={setBtnClass(props)}>
              {goal.unit ? goal.unit : goal.type !== 'REP' ? goal.type : ''}
            </div>
          )}
        </span>
      </div>
    </>
  );
};

export default SetGoal;
