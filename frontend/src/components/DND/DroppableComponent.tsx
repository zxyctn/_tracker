import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';

const DroppableComponent = ({
  id,
  type,
  children,
  onDragEnd,
  onDragStart,
}: {
  id: string;
  type: string;
  children: React.ReactNode;
  onDragEnd: OnDragEndResponder;
  onDragStart?: OnDragEndResponder;
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={id} type={type}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DroppableComponent;
