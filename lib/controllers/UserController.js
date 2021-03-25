import { getSession } from 'next-auth/client'
import { Session } from '../../lib/schemas/UserSchema'

export class UserController {
  static getSession = async (req) => {
    const session = await getSession({ req })

    return session
  }

  static getUser = async (req, res) => {
    const session = await this.getSession(req, res)
    const userToken = session.accessToken

    try {
      const user = await Session.findOne({ accessToken: userToken })
      const rawUserId = JSON.stringify(user)
      const parseUserId = JSON.parse(rawUserId)

      return { user: parseUserId, error: null }
    } catch (error) {
      return { user: null, error }
    }
  }
}
