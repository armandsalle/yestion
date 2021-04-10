import Loader from '@/components/ui/loader'
import Title from '@/components/ui/title'
import TodoList from '@/components/hoc/todo/todoList'
import { useTodos } from '@/hooks/useTodos'

export default function Home() {
  const { loading, session, todos } = useTodos()

  return (
    <div>
      {loading && <Loader />}
      {session && !todos && <Loader />}

      {session && todos && (
        <>
          <Title>
            Todos <span className="text-base">{todos.length}</span>
          </Title>

          <TodoList todos={todos} />
        </>
      )}
    </div>
  )
}
