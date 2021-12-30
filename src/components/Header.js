import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="w-full flex items-center py-8">
      <Link href="/">
        <a>
          <Image alt="After Thoughts Logo" height={50} width={50} src="/after-thoughts-logo.svg" />
        </a>
      </Link>
    </header>
  )
}
