import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Loader from '../loader'

const NewTodo = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTodoTitle,
        body: [
          {
            as: 'Title',
            content: 'New todo',
            order: 1,
          },
        ],
        order: 1,
      }),
    })

    const data = await res.json()

    if (data.todo) {
      router.push('/todo/' + data.todo._id)
      setNewTodoTitle('')
    }
  }

  if (loading) {
    return <Loader />
  }

  if (!session) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        className="border-black border-2 rounded-lg  px-3 py-2 outline-none"
        placeholder="New todo"
      />
      <input
        type="submit"
        value="New"
        className="ml-3 px-3 py-2 rounded-md bg-black text-white cursor-pointer outline-none"
      />
    </form>
  )
}

export default NewTodo
