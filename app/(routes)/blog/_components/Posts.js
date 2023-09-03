import React from 'react'
import { PostCard } from './PostCard'

export const Posts = ({ posts = [] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {posts.map((post, index) => {
        return <PostCard key={`${post.slug} - ${index}}`} post={post} />
      })}
    </div>
  )
}
