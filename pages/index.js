import Head from "next/head"
import { signIn, signOut, useSession } from "next-auth/client"
import { GithubLoginButton } from "react-social-login-buttons"
import { useState, useEffect } from "react"

export default function Home() {
  const [session, loading] = useSession()
  const [todos, setTodos] = useState()

  const getTodos = async () => {
    const t = await fetch("/api/todo")
    const data = await t.json()

    setTodos(data.todo.reverse())
  }

  useEffect(() => {
    if (session) {
      getTodos()
    }
  }, [session])

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <Head>
        <title>Yestion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session ? (
        <GithubLoginButton onClick={() => signIn("github")} />
      ) : (
        <button onClick={() => signOut()}>Sign Out</button>
      )}

      {session && <p>Hello {session.user.name}</p>}
      {session && session.user.image && <img src={session.user.image} style={{ width: 50, borderRadius: "50%" }} />}
      {session && !todos && <p>loading</p>}
      {session && todos && (
        <>
          <h1>Todos</h1>
          <hr />
          {todos.map((e, i) => (
            <div key={i}>
              <h1>{e.title}</h1>
              <p>
                <span>complete: {e.complete ? "Yes" : "No"}</span>
              </p>
              {e.body.map((el, i) => (
                <div key={i}>
                  {el.as === "Text" && <p>{el.content}</p>}
                  {el.as === "Title" && <h3>{el.content}</h3>}
                  {el.as === "List" && (
                    <ul>
                      {el.contentList.map((li, index) => (
                        <li key={index}>{li.content}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  )
}
