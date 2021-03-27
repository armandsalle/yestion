import Header from '@/components/header'
import NewTodo from '../newTodo'

const Layout = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <Header />
      <NewTodo />
      <main className="flex flex-col mt-12">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default Layout
