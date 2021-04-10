import TodoLink from './todoLink'

const TodoList = ({ todos }) => {
  return (
    <section className="mt-3">
      {todos.map((todo, i) => (
        <TodoLink todo={todo} key={i} />
      ))}
    </section>
  )
}

export default TodoList
