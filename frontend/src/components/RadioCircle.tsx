import { Circle, CircleFill } from 'react-bootstrap-icons';

import type { RadioCircleProps } from '../types';

const RadioCircle = ({ checked }: RadioCircleProps) => {
  return (
    <div className='relative'>
      {checked && (
        <div className='absolute top-1 right-1'>
          <CircleFill size={12} />
        </div>
      )}

      <Circle size={20} />
    </div>
  );
};

export default RadioCircle;
