// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose"
import { Todo } from "../../lib/schemas/TodoSchema"

const handleGet = async (req, res) => {
  try {
    const result = await Todo.find()
    res.status(200).json({ todo: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: "fail finding all the todos" })
  }
}

const handlePost = async (req, res) => {
  if (!req.body) {
    res.status(500).json({ status: "fail. Need a todo" })
  }

  try {
    const newTodo = await new Todo(req.body)
    const result = await newTodo.save()
    res.status(200).json({ todo: result })
  } catch (error) {
    res.status(500).json(error)
  }
}

export default async (req, res) => {
  const { method } = req

  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

    switch (method) {
      case "GET":
        await handleGet(req, res)
        break
      case "POST":
        await handlePost(req, res)
        break
      default:
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).json({
          status: 405,
          message: `Method ${method} Not Allowed`,
        })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: "fail" })
  }
}
