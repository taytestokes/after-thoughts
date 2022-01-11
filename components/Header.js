import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="sticky top-0 w-full flex items-center py-8">
      <Link href="/">
        <a>
          <Image
            alt="After Thoughts Logo"
            className="rounded-md"
            height={45}
            width={45}
            src="/after-thoughts-logo.png"
          />
        </a>
      </Link>
    </header>
  )
}
