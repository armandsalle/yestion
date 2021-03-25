import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'

const Header = () => {
  const [session] = useSession()

  return (
    <header className="pt-5 flex justify-between">
      <Link href="/" passHref>
        <a href="home">
          <h1 className="text-5xl font-medium">Yestion</h1>
        </a>
      </Link>
      <div className="flex justify-between items-center">
        {session && (
          <>
            {session.user.image && (
              <img
                className="ml-3 border-blue-600 border-2"
                src={session.user.image}
                style={{ width: 40, height: 40, borderRadius: '50%' }}
                alt="user profil"
              />
            )}
            <p className="mx-3">{session.user.name}</p>
            <button
              className="ml-3 px-3 py-2 rounded-md bg-black text-white"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
