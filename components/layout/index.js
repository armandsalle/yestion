import Header from '@/components/header'

const Layout = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <Header />
      <main className="flex flex-col mt-12">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default Layout
