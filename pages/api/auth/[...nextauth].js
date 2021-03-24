import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  database: process.env.DB_URI,
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}

export default (req, res) => NextAuth(req, res, options)