import Header from '@/components/header'

const Layout = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default Layout
