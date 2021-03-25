import Layout from '@/components/layout'
import { Provider } from 'next-auth/client'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout Component={Component} pageProps={pageProps} />
    </Provider>
  )
}

export default MyApp
