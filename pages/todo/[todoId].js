import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useEffect, useState, useCallback } from 'react'

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

  return (
    <section>
      {hasError && <p>{hasError}</p>}
      {loading && <p>loading</p>}
      {!loading && todo && <h1>{todo.title}</h1>}
    </section>
  )
}
