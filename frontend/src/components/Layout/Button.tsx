import { useState } from 'react';
import { GripVertical } from 'react-bootstrap-icons';

const Button = ({
  text,
  edit,
  children,
}: {
  text: string;
  edit: boolean;
  children: React.ReactNode;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`coloredBtn ${
        edit ? 'text-secondary hover:bg-secondary' : text
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='w-full h-full'>
        <div className='flex w-full justify-between gap-5 items-center relative hover:!text-base-100'>
          {edit && (
            <span
              className={`absolute -left-6 bottom-0.5 ${hover ? 'hidden' : ''}`}
            >
              <GripVertical width={24} />
            </span>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Button;
