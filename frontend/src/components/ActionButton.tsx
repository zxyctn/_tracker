import { useState } from 'react';
import {
  XLg,
  PlusLg,
  Check,
  DashLg,
  List,
  PencilFill,
} from 'react-bootstrap-icons';

import { ActionButtonProps } from '../types';

const ActionButton = ({
  menuClickHandler,
  completeEditHandler,
  cancelEditHandler,
  enableEditHandler,
  disableEditHandler,
  theme,
  isEdit,
  canAdd,
}: ActionButtonProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='w-full h-full items-end justify-end align-bottom'>
      {isEdit ? (
        <div className='grid grid-cols-1 overflow-auto'>
          <div className='flex gap-1.5 w-min overflow-auto p-5'>
            <button
              className={`${
                canAdd ? '' : 'hidden'
              } btn btn-secondary actionBtn`}
              onClick={completeEditHandler}
              disabled={!canAdd}
            >
              <DashLg className='stroke-current stroke-1 p-0.5' />
            </button>
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
          </div>
        </div>
      ) : (
        <div className='flex gap-1.5 w-min overflow-auto p-5'>
          {expanded && (
            <>
              {!theme && (
                <button
                  className={`btn btn-primary actionBtn`}
                  onClick={() => {
                    enableEditHandler();
                    setExpanded((current) => !current);
                  }}
                >
                  <PencilFill
                    width={36}
                    height={36}
                    className='stroke-current stroke-1 p-2'
                  />
                </button>
              )}

              <button
                className={`btn btn-primary actionBtn ${
                  theme && 'text-primary-focus border-0 bg-primary-content'
                }`}
                onClick={() => {
                  menuClickHandler();
                  theme && setExpanded((current) => !current);
                }}
              >
                <List
                  width={36}
                  height={36}
                  className='stroke-current stroke-1 p-2'
                />
              </button>
            </>
          )}
          {!theme && (
            <button
              className={`btn transition-all ease-linear duration-100 ${
                theme
                  ? 'text-primary-focus border-0 bg-primary-content'
                  : 'btn-primary'
              } aspect-square rounded-xl font-extrabold text-2xl z-50`}
              onClick={() => setExpanded((current) => !current)}
            >
              #
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionButton;
