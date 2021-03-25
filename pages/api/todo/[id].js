import { TodoController } from "../../../lib/controllers/TodoController"
import { allowHeadersMiddleware } from "../../../lib/middlewares/allowHeadersMiddleware"
import { dbConnectMiddleware } from "../../../lib/middlewares/dbConnectMiddleware"
import { sessionMiddleware } from "../../../lib/middlewares/sessionMiddleware"
import nc from "next-connect"

const handler = nc({ onNoMatch: (req, res) => allowHeadersMiddleware(req, res, ["GET"]) })

handler.use(sessionMiddleware)
handler.use(dbConnectMiddleware)

handler.get(async (req, res) => {
  await TodoController.getTodo(req, res)
})

export default handler
