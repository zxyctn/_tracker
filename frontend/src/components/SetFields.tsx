import { setBtnClass } from '../shared';
import type { SetComponentProps } from '../types';

const SetFields = (props: SetComponentProps) => {
  const { set } = props;
  return (
    <>
      {set.fields
        .filter((f) => !f.goal)
        .map((field) => (
          <div
            key={`${field.type}-${field.value}`}
            className='flex items-center justify-end gap-1'
          >
            <span className=''>{field.value}</span>
            <div className={setBtnClass(props)}>
              {field.unit ? field.unit : field.type}
            </div>
          </div>
        ))}
    </>
  );
};

export default SetFields;
