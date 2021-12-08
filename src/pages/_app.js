// Tailwind Styles and Custom Classes
import '../styles/main.css'

// Theme Provider
import { ThemeProvider } from '../context/Theme'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
