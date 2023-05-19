import { Draggable } from '@hello-pangea/dnd';

const DraggableComponent = ({
  id,
  index,
  children,
}: {
  id: string;
  index: number;
  children: React.ReactNode;
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableComponent;
