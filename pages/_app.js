import { useEffect } from 'react'
import { useRouter } from 'next/router'
import nprogress from 'nprogress'

import '../styles/main.css'
import '../styles/nprogress.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', nprogress.start)
    router.events.on('routeChangeComplete', nprogress.done)
    router.events.on('routeChangeError', nprogress.done)
  }, [router])

  return <Component {...pageProps} />
}

export default MyApp
