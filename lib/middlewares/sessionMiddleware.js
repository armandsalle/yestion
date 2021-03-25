import { UserController } from '../controllers/UserController'

export const sessionMiddleware = async (req, res, next) => {
  const session = await UserController.getSession(req, res)

  if (!session) {
    res.status(403).json({
      message: 'You must be sign in to view the protected content on this page.',
    })

    return
  }

  next()
}
