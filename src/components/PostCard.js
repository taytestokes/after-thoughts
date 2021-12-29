import React from 'react'
import Link from 'next/link'
import format from 'date-fns/format'
import useSWR from 'swr'

import { fetcher } from '../lib/swr'

export const PostCard = ({ post }) => {
  const { data } = useSWR(`/api/posts/views/${post.slug}`, fetcher)

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="cursor-pointer">
        <h2 className="text-2xl font-bold">{post.data.title}</h2>
        <p className="text-gray-400">{post.data.excerpt}</p>
      </div>
    </Link>
  )
}
