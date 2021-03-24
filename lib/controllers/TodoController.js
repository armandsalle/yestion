import { Todo } from "../../lib/schemas/TodoSchema"
import { UserController } from "./UserController"

export class TodoController {
  static getTodos = async (req, res) => {
    const { user, error } = await UserController.getUser(req)

    if (error) {
      res.status(500).json({ status: "fail finding all the todos. No user found.", error })
    }

    try {
      const result = await Todo.find({ userId: user.userId })

      res.status(200).json({ todos: result })
    } catch (error) {
      res.status(500).json({ status: "fail finding all the todos.", error })
    }
  }

  static postTodo = async (req, res) => {
    const { user, error } = await UserController.getUser(req)

    if (error) {
      res.status(500).json({ status: "fail posting a new todo. No user found.", error })
    }

    if (!req.body) {
      res.status(500).json({ status: "fail. No todo to post." })
    }

    try {
      const newTodoContent = req.body
      newTodoContent["userId"] = user.userId

      const newTodo = await new Todo(newTodoContent)
      const result = await newTodo.save()

      res.status(200).json({ todo: result })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
