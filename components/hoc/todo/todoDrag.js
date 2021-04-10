import TextTemplate from '@/components/templates/text'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const TodoDrag = ({ todo, dragEnd, updateTodo, deleteTemplate }) => {
  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId="01">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todo.body &&
                todo.body.map((el, i) => (
                  <TextTemplate
                    value={el.content}
                    as={el.as}
                    dId={el._id}
                    index={i}
                    key={el._id}
                    onChange={updateTodo}
                    currentTodo={todo}
                    currentEl={el}
                    onDelete={deleteTemplate}
                  />
                ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}

export default TodoDrag
