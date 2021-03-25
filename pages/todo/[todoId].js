import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useEffect, useState, useCallback } from 'react'
import TextTemplate from '@/components/templates/text'

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

      {!loading && todo && (
        <>
          <h2 className="text-4xl font-medium">{todo.title}</h2>
          <div className="mt-8">
            {todo.body.map((el, i) => (
              <div key={i}>
                {el.as === 'Text' && <TextTemplate value={el.content} />}
                {el.as === 'Title' && <TextTemplate value={el.content} as={el.as} />}
                {el.as === 'List' &&
                  el.contentList.map((li, index) => (
                    <TextTemplate value={li.content} key={index} as="ListItem" />
                  ))}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
