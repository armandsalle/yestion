import { useSession } from 'next-auth/client'
import { useState, useEffect, useCallback } from 'react'

export const useTodos = () => {
  const [session, loading] = useSession()
  const [todos, setTodos] = useState()

  const getTodos = useCallback(async () => {
    const t = await fetch('/api/todo')
    const data = await t.json()

    setTodos(data.todos?.reverse() || [])
  }, [])

  useEffect(() => {
    if (session) {
      getTodos()
    }
  }, [session, getTodos])

  return { loading, session, todos }
}
