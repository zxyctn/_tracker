import { Droppable } from '@hello-pangea/dnd';
import { Trash2Fill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

import type { RootState } from '../../store';
import type { DeleteZoneProps } from '../../types';

const DeleteZone = ({ droppableId, type }: DeleteZoneProps) => {
  const edit = useSelector((state: RootState) => state.actions.edit.value);

  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided, snapshot) => (
        <div
          className='fixed bottom-0 left-0 w-screen max-w-fit flex justify-left items-baseline p-5 z-50'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div
            className={` transition-all ease-in-out duration-500 btn btn-error p-0 aspect-square rounded-xl font-bold text-2xl z-50 
                ${edit ? '' : 'hidden'}
                ${
                  snapshot.isDraggingOver
                    ? 'w-full aspect-square h-full max-h-64'
                    : 'w-min'
                }
              `}
          >
            <div className=''>
              <Trash2Fill size={24} />
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DeleteZone;
