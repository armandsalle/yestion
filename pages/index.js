import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { useState, useEffect, useCallback } from 'react'

export default function Home() {
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
    } else {
      console.log('non log')
    }
  }, [session, getTodos])

  return (
    <div>
      <Head>
        <title>Yestion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && <p>loading</p>}
      {session && !todos && <p>loading todos</p>}

      {session && todos && (
        <>
          <h2 className="text-4xl">
            Todos <span className="text-base">{todos.length}</span>
          </h2>

          <section className="mt-3">
            {todos.map((e, i) => (
              <Link href={`/todo/${e._id}`} key={i} passHref>
                <a href="dummy">
                  <div className="ml-3 my-5">
                    <h3 className={`inline text-2xl relative ${e.complete && 'text-gray-300'}`}>
                      {e.title}
                      {e.complete && (
                        <div
                          className="w-full absolute top-1/2 translate-y-1/2 bg-gray-400"
                          style={{ height: 2 }}
                        ></div>
                      )}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
