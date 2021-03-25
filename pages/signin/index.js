import React from 'react'
import { signIn, getSession } from 'next-auth/client'
import { GithubLoginButton } from 'react-social-login-buttons'

const Signin = () => {
  return (
    <div className="mx-auto rounded-md bg-gray-200 p-6 flex justify-center flex-col mt-12">
      <h2 className="text-4xl pb-8 text-center">Sign in</h2>
      <GithubLoginButton onClick={() => signIn('github')} style={{ maxWidth: 220 }} />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { req, res } = context
  const session = await getSession({ req })

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
  }

  return {
    props: {
      session: null,
    },
  }
}

export default Signin
