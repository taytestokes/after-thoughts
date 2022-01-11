import React from 'react'
import { PostCard } from './PostCard'

export const Posts = ({ posts }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4 py-8">
      {posts?.map((post, index) => {
        return <PostCard key={`${post.slug} - ${index}}`} post={post} />
      })}
    </div>
  )
}
