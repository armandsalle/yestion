// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose"
import { Todo } from "../../lib/schemas/TodoSchema"
import { getSession } from "next-auth/client"
import { Session } from "../../lib/schemas/UserSchema"

const handleGet = async (req, res) => {
  const session = await getSession({ req })

  const token = session.accessToken

  try {
    const user = await Session.findOne({ accessToken: token })

    const rawUserId = JSON.stringify(user)
    const parseUserId = JSON.parse(rawUserId)

    const result = await Todo.find({ userId: parseUserId.userId })
    res.status(200).json({ todo: result })
  } catch (error) {
    res.status(500).json({ status: "fail finding all the todos" })
  }
}

const handlePost = async (req, res) => {
  const session = await getSession({ req })

  const token = session.accessToken

  if (!req.body) {
    res.status(500).json({ status: "fail. Need a todo" })
  }

  try {
    const user = await Session.findOne({ accessToken: token })

    const rawUserId = JSON.stringify(user)
    const parseUserId = JSON.parse(rawUserId)

    const theNewTodo = req.body
    theNewTodo["userId"] = parseUserId.userId
    console.log(theNewTodo)

    const newTodo = await new Todo(theNewTodo)
    const result = await newTodo.save()

    res.status(200).json({ todo: result })
  } catch (error) {
    res.status(500).json(error)
  }
}

export default async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    res.status(403).json({
      message: "You must be sign in to view the protected content on this page.",
    })

    return
  }

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
