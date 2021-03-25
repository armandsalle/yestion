import { TodoController } from "../../../lib/controllers/TodoController"
import { sessionMiddleware } from "../../../lib/middlewares/sessionMiddleware"
import { dbConnectMiddleware } from "../../../lib/middlewares/dbConnectMiddleware"
import { allowHeadersMiddleware } from "../../../lib/middlewares/allowHeadersMiddleware"
import nc from "next-connect"

const handler = nc({ onNoMatch: (req, res) => allowHeadersMiddleware(req, res, ["GET", "POST"]) })

handler.use(sessionMiddleware)
handler.use(dbConnectMiddleware)

handler.get(async (req, res) => {
  await TodoController.getTodos(req, res)
})

handler.post(async (req, res) => {
  await TodoController.postTodo(req, res)
})

export default handler
