import { XLg, PlusLg, Check } from 'react-bootstrap-icons';

import { ActionButtonProps } from '../types';
import store from '../store';

const ActionButton = ({
  menuClickHandler,
  completeEditHandler,
  cancelEditHandler,
  theme,
  isEdit,
  canAdd,
}: ActionButtonProps) => {
  return (
    <div className='w-full h-full items-end justify-end align-bottom p-5'>
      <div className='flex gap-2 h-max'>
        {isEdit ? (
          <>
            <button
              className={`${
                canAdd ? '' : 'hidden'
              } btn btn-secondary actionBtn`}
              onClick={completeEditHandler}
              disabled={!canAdd}
            >
              <PlusLg className='stroke-current stroke-1 p-0.5' />
            </button>
            <button
              className='btn btn-accent actionBtn'
              onClick={cancelEditHandler}
            >
              <XLg className='stroke-current stroke-1 p-1' />
            </button>

            <button
              className='btn btn-primary actionBtn'
              onClick={completeEditHandler}
            >
              <Check
                width={36}
                height={36}
                className='stroke-current stroke-0 p-0.5'
              />
            </button>
          </>
        ) : (
          <button
            className={`btn transition-all ease-linear duration-300 ${
              theme
                ? 'text-primary-focus border-0 bg-primary-content'
                : 'btn-primary'
            } aspect-square rounded-xl font-extrabold text-2xl z-50`}
            onClick={menuClickHandler}
          >
            #
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionButton;
