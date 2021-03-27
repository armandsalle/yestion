import { Todo } from '../../lib/schemas/TodoSchema'
import { UserController } from './UserController'

export class TodoController {
  static getTodo = async (req, res) => {
    const { user, error } = await UserController.getUser(req)

    if (error) {
      res.status(500).json({ status: 'fail finding the todo. No user found.', error })
    }

    try {
      const { id } = req.query

      const result = await Todo.findOne({ _id: id, userId: user.userId })
      const resultById = await Todo.findById(id, 'title')

      if (!result && resultById) {
        res.status(403).json({ status: 'You are not the owner of the todo' })
        return
      }

      res.status(200).json({ todo: result })
    } catch (error) {
      res.status(500).json({ status: 'fail fetching a todo', error })
    }
  }

  static getTodos = async (req, res) => {
    const { user, error } = await UserController.getUser(req)

    if (error) {
      res.status(500).json({ status: 'fail finding all the todos. No user found.', error })
    }

    try {
      const result = await Todo.find({ userId: user.userId })

      res.status(200).json({ todos: result })
    } catch (error) {
      res.status(500).json({ status: 'fail finding all the todos.', error })
    }
  }

  static postTodo = async (req, res) => {
    const { user, error } = await UserController.getUser(req)

    if (error) {
      res.status(500).json({ status: 'fail posting a new todo. No user found.', error })
    }

    if (!req.body) {
      res.status(500).json({ status: 'fail. No todo to post.' })
    }

    try {
      const newTodoContent = req.body
      newTodoContent.userId = user.userId

      const newTodo = await new Todo(newTodoContent)
      const result = await newTodo.save()

      res.status(200).json({ todo: result })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static updateTodo = async (req, res) => {
    const { user, error } = await UserController.getUser(req)

    if (error) {
      res.status(500).json({ status: 'fail finding the todo. No user found.', error })
    }

    if (!req.body) {
      res.status(500).json({ status: 'fail. No body passed' })
    }

    try {
      const { id } = req.query

      const result = await Todo.findOne({ _id: id, userId: user.userId })
      const resultById = await Todo.findById(id, 'title')

      if (!result && resultById) {
        res.status(403).json({ status: 'You are not the owner of the todo' })
        return
      }

      const updatedTodo = await Todo.findOneAndUpdate({ _id: id, userId: user.userId }, req.body, {
        new: true,
      })

      res.status(200).json({ todo: updatedTodo })
    } catch (error) {
      res.status(500).json({ status: 'fail fetching a todo', error })
    }
  }

  static deleteTodo = async (req, res) => {
    const { user, error } = await UserController.getUser(req)

    if (error) {
      res.status(500).json({ status: 'fail finding the todo. No user found.', error })
    }

    try {
      const { id } = req.query

      const result = await Todo.findOne({ _id: id, userId: user.userId })
      const resultById = await Todo.findById(id, 'title')

      if (!result && resultById) {
        res.status(403).json({ status: 'You are not the owner of the todo' })
        return
      }

      const deletedTodo = await Todo.deleteOne({ _id: id, userId: user.userId })
      res.status(200).json({ todo: deletedTodo })
    } catch (error) {
      res.status(500).json({ status: 'fail fetching a todo', error })
    }
  }
}
