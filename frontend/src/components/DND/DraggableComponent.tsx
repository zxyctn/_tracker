import { Draggable } from '@hello-pangea/dnd';

const DraggableComponent = ({
  id,
  index,
  children,
  isDragDisabled,
}: {
  id: string;
  index: number;
  children: React.ReactNode;
  isDragDisabled?: boolean;
}) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
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
