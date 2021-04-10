import { useState, useCallback, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Bullet from '../ui/todo/bullet'
import Delete from '../ui/todo/delete'
import EditableContent from '../ui/todo/editableContent'
import Handle from '../ui/todo/handle'

const TextTemplate = ({ value, as, dId, index, onChange, currentTodo, onDelete }) => {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(value)
  const inputRef = useRef(null)

  const save = useCallback(() => {
    setContent(inputRef.current.innerText)
    setEditing(false)

    const newTodo = currentTodo
    newTodo.body[index].content = inputRef.current.innerText

    onChange(newTodo)
  }, [onChange, index, currentTodo])

  return (
    <Draggable key={dId} draggableId={dId} index={index}>
      {(provided) => {
        return (
          <div
            className="mt-3 relative flex items-center item-template"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Handle handleProps={{ ...provided.dragHandleProps }} />
            <Delete onClick={() => onDelete(index)} />
            <Bullet as={as} />
            <EditableContent
              setEditing={setEditing}
              onMouseLeave={() => setEditing(false)}
              as={as}
              editing={editing}
              inputRef={inputRef}
              save={save}
            >
              {content}
            </EditableContent>
          </div>
        )
      }}
    </Draggable>
  )
}

export default TextTemplate
