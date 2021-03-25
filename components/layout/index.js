import Header from 'components/header'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'

const Layout = ({ Component, pageProps }) => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.replace('/')
    }
  }, [session, router])

  return (
    <div className="container">
      <Header session={session} />
      <Component {...pageProps} />
    </div>
  )
}

export default Layout
