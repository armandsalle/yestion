import TodoTitle from '@/components/ui/todo/todoTitle'
import Link from 'next/link'

const TodoLink = ({ todo }) => {
  return (
    <Link href={`/todo/${todo._id}`} passHref>
      <a href="dummy">
        <div className="my-5">
          <TodoTitle>{todo.title}</TodoTitle>
        </div>
      </a>
    </Link>
  )
}

export default TodoLink
