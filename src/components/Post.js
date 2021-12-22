import React from 'react'
import { useRouter } from 'next/router'
import format from 'date-fns/format'
import { FiCalendar } from 'react-icons/fi'

export const Post = ({ post }) => {
  const router = useRouter()
  const publishedDate = format(new Date(post.attributes.publishedAt), 'MMMM dd, yyyy')
  return (
    <button
      className="w-full text-left rounded-md"
      onClick={() => router.push(`/blog/${post.attributes.slug}`)}
    >
      <p className="text-gray-900 dark:text-white text-2xl font-bold">{post.attributes.title}</p>

      <p className="mt-2 text-gray-600 dark:text-gray-400">{post.attributes.excerpt}</p>
    </button>
  )
}
