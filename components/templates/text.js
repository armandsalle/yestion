import classNames from 'classnames'
import { useState, useCallback, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'

const TextTemplate = ({ value, as, dId, index, onChange, currentTodo, onDelete }) => {
  const asTitle = 'text-2xl'
  const asListItem = 'transform translate-x-4'
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
            <div
              style={{
                width: 10,
                height: 10,
                cursor: 'grab',
              }}
              className="mr-4 bg-gray-400 handle"
              {...provided.dragHandleProps}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                cursor: 'pointer',
              }}
              className="mr-4 bg-red-700"
              onClick={() => onDelete(index)}
            ></div>
            <div
              style={{
                width: '6px',
                height: '6px',
                display: as === 'List' ? 'block' : 'none',
                flex: '0 0 auto',
              }}
              className="bg-gray-800 rounded-full "
            ></div>
            <div
              onMouseEnter={() => setEditing(true)}
              onMouseLeave={() => setEditing(false)}
              className={classNames(
                `template-text border-none outline-none w-full`,
                as === 'Title' && asTitle,
                as === 'List' && asListItem
              )}
              onClick={!editing ? () => setEditing(true) : undefined}
              contentEditable={true}
              ref={inputRef}
              onBlur={save}
              suppressContentEditableWarning={true}
              placeholder="Type something"
            >
              {content}
            </div>
          </div>
        )
      }}
    </Draggable>
  )
}

export default TextTemplate
