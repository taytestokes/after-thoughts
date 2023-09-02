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
  keywords: ['JavaScript', 'React', 'Elixir', 'Phoenix'],
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
    <html lang="en">
      <body className="bg-white text-zinc-900">
        <div className="w-screen min-h-screen flex flex-col">
          <header className="container flex items-center mx-auto py-8 px-4">
            <Link href="/">
              <BrainIcon size={45} />
            </Link>
          </header>

          <main className="flex flex-col grow">
            {typeof children === 'function' ? children() : children}
          </main>
        </div>
      </body>
    </html>
  )
}
