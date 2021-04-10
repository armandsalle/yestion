import Layout from '@/components/hoc/layout'
import { Provider } from 'next-auth/client'
import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Yestion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider session={pageProps.session}>
        <Layout Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
