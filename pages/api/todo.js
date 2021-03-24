// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose"
import { TodoController } from "../../lib/controllers/TodoController"
import { UserController } from "../../lib/controllers/UserController"

export default async (req, res) => {
  /* MIDDLEWARE */
  const isLoggedIn = UserController.getSession(req, res)

  if (!isLoggedIn) {
    res.status(403).json({
      message: "You must be sign in to view the protected content on this page.",
    })

    return
  }

  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (error) {
    res.status(500).json({ status: "fail with database connection", error })

    return
  }
  /* END MIDDLEWARE */

  const { method } = req

  switch (method) {
    case "GET":
      await TodoController.getTodos(req, res)
      break
    case "POST":
      await TodoController.postTodo(req, res)
      break
    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).json({
        status: 405,
        message: `Method ${method} Not Allowed`,
      })
  }
}
