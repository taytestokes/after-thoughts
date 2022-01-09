import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import format from 'date-fns/format'

import { fetcher } from '../lib/swr'

export const FeaturedPostCard = ({ featuredPost }) => {
  const { data, loading } = useSWR(`/api/posts/views/${featuredPost.slug}`, fetcher)
  const publishedDate = format(new Date(featuredPost.data.publishedAt), 'MMMM dd, yyyy')
  const postViews = data?.views

  return (
    <Link href={`/blog/${featuredPost.slug}`}>
      <a>
        <div className="w-full p-4 bg-zinc-100 rounded-md">
          <h3 className="text-2xl text-zinc-900 font-extrabold">{featuredPost.data.title}</h3>
          <p className="text-zinc-700 mt-2">{featuredPost.data.excerpt}</p>
          <div className="flex items-center justify-between mt-4 text-sm text-zinc-700">
            <span>Posted {publishedDate}</span>
            <span>{loading ? '-' : postViews} Views</span>
          </div>
        </div>
      </a>
    </Link>
  )
}
