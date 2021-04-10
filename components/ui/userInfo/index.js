import { signOut } from 'next-auth/client'
import Button from '../button'

const UserInfo = ({ session }) => {
  return (
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
      <Button onClick={() => signOut()}>Sign Out</Button>
    </>
  )
}

export default UserInfo
