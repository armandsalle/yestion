import Loader from '@/components/ui/loader'
import TodoTitle from '@/components/ui/todo/todoTitle'
import Button from '@/components/ui/button'
import TodoDrag from '@/components/hoc/todo/todoDrag'
import useTodo from '@/hooks/useTodo'

export default function Todo() {
  const {
    deleteTemplate,
    createNewText,
    handleDelete,
    updateTodo,
    dragEnd,
    hasError,
    loading,
    todo,
  } = useTodo()

  return (
    <section>
      {hasError && <p>{hasError}</p>}
      {loading && <Loader />}

      {!loading && todo && (
        <>
          <div className="w-full flex justify-between">
            <TodoTitle>{todo.title}</TodoTitle>
            <Button red onClick={handleDelete}>
              Delete
            </Button>
          </div>

          <div className="mt-8">
            <TodoDrag
              todo={todo}
              dragEnd={dragEnd}
              deleteTemplate={deleteTemplate}
              updateTodo={updateTodo}
            />
            <div className="flex justify-start items-start mt-5 flex-row">
              <Button onClick={() => createNewText('Text')}>New text</Button>
              <Button onClick={() => createNewText('Title')}>New title</Button>
              <Button onClick={() => createNewText('List')}>New list item</Button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
