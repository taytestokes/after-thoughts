import React from 'react'
import { PostCard } from './PostCard'

export const Posts = ({ posts = [] }) => {
  // Sorts the posts to put the featured post first at position 0
  // Maybe move this funactionality to server when getting posts?
  posts.sort((firstPost, secondPost) =>
    firstPost.data.featured === secondPost.data.featured ? 0 : firstPost.data.featured ? -1 : 1,
  )

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 grid-rows-1 gap-8 pb-4">
      {posts.map((post, index) => {
        return <PostCard key={`${post.slug} - ${index}}`} post={post} />
      })}
    </div>
  )
}
