import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const PostCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a>
        <div>
          <div className="relative w-full h-48">
            <Image
              alt="it eeeez what it ezzzz"
              className="rounded-md"
              layout="fill"
              objectFit="cover"
              src={post.data.image}
            />
          </div>
          <h3 className="text-xl text-zinc-900 font-bold mt-2">{post.data.title}</h3>
          <p className="text-zinc-700">{post.data.excerpt}</p>
        </div>
      </a>
    </Link>
  )
}
