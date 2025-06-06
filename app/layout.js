import Link from 'next/link'
import { BrainIcon } from './_components/BrainIcon'

// Tailwind Styles
import './globals.css'

// Generate Base Metadata For Entire Application
export const metadata = {
  metaDatabase: new URL('https://afterthoughts.dev'),
  title: {
    default: 'After Thoughts',
    template: 'After Thoughts | %s',
  },
  description: 'A software development blog created by Tayte Stokes',
  icons: {
    icon: '/after-thoughts-block-logo.jpg',
    shortcut: '/after-thoughts-block-logo.jpg',
  },
  keywords: ['JavaScript', 'React', 'Elixir', 'Phoenix', 'Software Development', 'Web Development'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: 'After Thoughts',
    description: 'A software development blog created by Tayte Stokes',
    defaultUrl: 'https://afterthoughts.dev',
    siteName: 'After Thoughts',
    locale: 'en-US',
    type: 'website',
    image: '/after-thoughts-block-logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary',
    title: 'After Thoughts',
    description: 'A software development blog created by Tayte Stokes',
    creator: '@taytestokes',
    images: ['/after-thoughts-block-logo.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-neutral-900 text-neutral-50">
      <body className="flex flex-col w-screen min-h-screen max-w-[600px] mx-auto px-4">
        <header className="flex items-center sm:justify-center pt-24 pb-16">
          <Link className="transition-colors duration-100 ease-in hover:text-neutral-400" href="/">
            <BrainIcon size={50} />
          </Link>
        </header>

        <main className="flex flex-col grow pb-16">{children}</main>

        <footer className="flex items-center justify-between pb-8 text-xs text-neutral-200">
          <p>&copy; After Thoughts {new Date().getFullYear()}</p>
          <a
            href="https://github.com/taytestokes/after-thoughts"
            rel="noopener noreferrer"
            target="_blank"
          >
            View Source
          </a>
        </footer>
      </body>
    </html>
  )
}
