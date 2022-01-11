import React from 'react'
import { PostCard } from './PostCard'
import { FeaturedPostCard } from './FeaturedPostCard'

export const Posts = ({ posts = [] }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4 pb-4">
      {posts.reverse().map((post, index) => {
        if (post.data.featured) {
          return <FeaturedPostCard featuredPost={post} />
        }

        return <PostCard key={`${post.slug} - ${index}}`} post={post} />
      })}
    </div>
  )
}
