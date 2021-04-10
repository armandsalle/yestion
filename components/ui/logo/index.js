import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" passHref>
      <a href="home">
        <h1 className="text-5xl font-medium">Yestion</h1>
      </a>
    </Link>
  )
}

export default Logo
