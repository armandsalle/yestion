import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useEffect, useState, useCallback } from 'react'
import TextTemplate from '@/components/templates/text'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Mongoose from 'mongoose'

export default function Todo() {
  const router = useRouter()

  const [session, loading] = useSession()
  const [todo, setTodo] = useState()
  const [hasError, setError] = useState()

  const getTodo = useCallback(async () => {
    console.log('inital')
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

  const dragEnd = async (result) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const newBody = [...todo.body]

    const move = (arr, from, to) => {
      arr.splice(to, 0, arr.splice(from, 1)[0])
    }

    move(newBody, source.index, destination.index)

    const newTodo = { ...todo, body: newBody }
    setTodo(newTodo)
    updateTodo(newTodo)
  }

  const updateTodo = useCallback(
    async (newTodo) => {
      try {
        const res = await fetch('/api/todo/' + todo._id, {
          method: 'PUT',
          body: JSON.stringify(newTodo),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()

        if (!res.ok || res.status !== 200) {
          throw Error(data)
        }

        return data
      } catch (error) {
        console.error(error)
      }
    },
    [todo]
  )

  const handleDelete = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/todo/' + todo._id, {
      method: 'DELETE',
    })

    const data = await res.json()

    if (data.todo) {
      router.push('/')
    } else {
      console.log(data)
    }
  }

  const createNewText = async (as) => {
    const newText = {
      as,
      order: 1,
      content: 'hello world',
      _id: new Mongoose.Types.ObjectId().toString(),
    }

    const newTodo = { ...todo, body: [...todo.body, newText] }

    setTodo(newTodo)
    updateTodo(newTodo)
  }

  const deleteTemplate = (index) => {
    const newBody = todo.body.filter((_, i) => !(i === index))
    const newTodo = { ...todo, body: newBody }

    setTodo(newTodo)
    updateTodo(newTodo)
  }

  return (
    <section>
      {hasError && <p>{hasError}</p>}
      {loading && <p>loading</p>}

      {!loading && todo && (
        <>
          <div className="w-full flex justify-between">
            <h2 className="text-4xl font-medium">{todo.title}</h2>
            <button
              className="ml-3 px-3 py-2 rounded-md bg-red-600 text-white cursor-pointer hover:bg-red-700 transition duration-100 ease-in-out outline-none border-none focus:outline-none"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <div className="mt-8">
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
            <div className="flex flex-col justify-start items-start">
              <button
                onClick={() => createNewText('Text')}
                className="mt-5 px-3 py-2 rounded-md bg-black text-white outline-none border-none focus:outline-none"
              >
                Create new text
              </button>
              <button
                onClick={() => createNewText('Title')}
                className="mt-1 px-3 py-2 rounded-md bg-black text-white outline-none border-none focus:outline-none"
              >
                Create new title
              </button>
              <button
                onClick={() => createNewText('List')}
                className="mt-1 px-3 py-2 rounded-md bg-black text-white outline-none border-none focus:outline-none"
              >
                Create new list item
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
