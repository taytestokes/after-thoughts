import { useRouter } from 'next/router'

import '../styles/main.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return <Component {...pageProps} />
}

export default MyApp
