import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useEffect, useState, useCallback } from 'react'
import Mongoose from 'mongoose'

const useTodo = () => {
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

  return {
    deleteTemplate,
    createNewText,
    handleDelete,
    updateTodo,
    dragEnd,
    hasError,
    loading,
    todo,
  }
}

export default useTodo
