import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import format from 'date-fns/format'

import { IoSparklesSharp } from 'react-icons/io5'

import { fetcher } from '../lib/swr'

export const FeaturedPostCard = ({ featuredPost }) => {
  const { data, loading } = useSWR(`/api/posts/views/${featuredPost.slug}`, fetcher)
  const publishedDate = format(new Date(featuredPost.data.publishedAt), 'MMMM dd, yyyy')
  const postViews = data?.views

  return (
    <Link href={`/blog/${featuredPost.slug}`}>
      <a>
        <div className="relative w-full p-4 bg-gray-900 border border-gray-700 rounded-md">
          <div className="absolute right-2 -top-3 flex items-center text-xs rounded-md p-1 bg-black border border-gray-700">
            <IoSparklesSharp />
            <span className="font-bold uppercase ml-1">Featured</span>
          </div>

          <h3 className="text-2xl font-extrabold">{featuredPost.data.title}</h3>

          <p className="text-gray-400">{featuredPost.data.excerpt}</p>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <span>Posted {publishedDate}</span>
            <span>{loading ? '-' : postViews} Views</span>
          </div>
        </div>
      </a>
    </Link>
  )
}
