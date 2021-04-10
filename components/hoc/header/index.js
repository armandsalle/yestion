import { useSession, signIn } from 'next-auth/client'
import Button from '@/components/ui/button'
import UserInfo from '@/components/ui/userInfo'
import Logo from '@/components/ui/logo'

const Header = () => {
  const [session, loading] = useSession()

  return (
    <header className="pt-5 flex justify-between">
      <Logo />
      <div className="flex justify-between items-center">
        {session && <UserInfo session={session} />}
        {!loading && !session && <Button onClick={() => signIn()}>Sign In</Button>}
      </div>
    </header>
  )
}

export default Header
