import { TodoController } from '@/controllers/TodoController'
import { allowHeadersMiddleware } from '@/middlewares/allowHeadersMiddleware'
import { dbConnectMiddleware } from '@/middlewares/dbConnectMiddleware'
import { sessionMiddleware } from '@/middlewares/sessionMiddleware'
import nc from 'next-connect'

const handler = nc({ onNoMatch: (req, res) => allowHeadersMiddleware(req, res, ['GET']) })

handler.use(sessionMiddleware)
handler.use(dbConnectMiddleware)

handler.get(async (req, res) => {
  await TodoController.getTodo(req, res)
})

handler.delete(async (req, res) => {
  await TodoController.deleteTodo(req, res)
})

handler.put(async (req, res) => {
  await TodoController.updateTodo(req, res)
})

export default handler
