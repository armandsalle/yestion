import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useEffect, useState, useCallback } from 'react'
import TextTemplate from '@/components/templates/text'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export default function Todo() {
  const router = useRouter()

  const [session, loading] = useSession()
  const [todo, setTodo] = useState()
  const [hasError, setError] = useState()

  const getTodo = useCallback(async () => {
    try {
      const t = await fetch('/api/todo/' + router.query.todoId)
      const data = await t.json()

      setTodo(data.todo)
    } catch (error) {
      setError(error)
    }
  }, [router.query.todoId])

  useEffect(() => {
    if (session) {
      getTodo()
    }
  }, [session, getTodo])

  const dragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    console.log({ destination, source, draggableId })

    const newTodos = Array.from(todo.body)

    const move = (arr, from, to) => {
      arr.splice(to, 0, arr.splice(from, 1)[0])
    }

    move(newTodos, source.index, destination.index)

    console.log('new todos', newTodos)

    setTodo({ ...todo, body: newTodos })
  }

  return (
    <section>
      {hasError && <p>{hasError}</p>}
      {loading && <p>loading</p>}

      {!loading && todo && (
        <>
          <h2 className="text-4xl font-medium">{todo.title}</h2>
          <div className="mt-8">
            <DragDropContext onDragEnd={dragEnd}>
              <Droppable droppableId="01">
                {(provided) => {
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {todo.body.map((el, i) => {
                        if (el.as === 'Text') {
                          return <TextTemplate value={el.content} dId={el._id} index={i} key={i} />
                        }
                        if (el.as === 'Title') {
                          return (
                            <TextTemplate
                              value={el.content}
                              as={el.as}
                              dId={el._id}
                              index={i}
                              key={i}
                            />
                          )
                        }

                        return null
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </DragDropContext>
          </div>
        </>
      )}
    </section>
  )
}

/**
 *                       {el.as === 'List' &&
                        el.contentList.map((li, index) => (
                          <TextTemplate value={li.content} key={index} as="ListItem" />
                        ))}
 */
