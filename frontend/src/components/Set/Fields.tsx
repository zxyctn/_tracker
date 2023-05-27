import Input from '../Input/Input';
import NumberField from '../Input/NumberField';
import { labels } from '../../shared';
import type { FieldType, SetType } from '../../types';

const Fields = ({
  set,
  edit,
  updateValue,
}: {
  set: SetType;
  edit: boolean;
  updateValue: (newValue: FieldType) => void;
}) => {
  return (
    <div className='grid gap-5'>
      {set.fields
        .filter((f) => !f.goal)
        .map((f) => (
          <Input key={f.type} name={labels[f.type]} type={!edit}>
            <NumberField
              step={0.5}
              field={f}
              goal={f.goal || false}
              setId={set.id}
              updateValue={updateValue}
            />
          </Input>
        ))}
      {set.fields.filter((f) => !f.goal).length > 0 && (
        <span
          className={`w-full text-center font-bold text-2xl ${
            edit ? 'text-secondary' : 'text-primary'
          }`}
        >
          ×
        </span>
      )}
      {set.fields
        .filter((f) => f.goal)
        .map((f) => (
          <Input key={f.type} name={labels[f.type]} type={!edit}>
            <NumberField
              step={['REP', 'CAL'].includes(f.type) ? 1 : 0.5}
              field={f}
              goal={true}
              setId={set.id}
              updateValue={updateValue}
            />
          </Input>
        ))}
    </div>
  );
};

export default Fields;
