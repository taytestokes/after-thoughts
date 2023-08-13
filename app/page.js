import React from 'react'
import { Posts } from '../components/Posts'
import { getPostSlugs, getPosts } from '../utils/blog'

async function getPostData() {
  const postSlugs = getPostSlugs()
  const posts = getPosts(postSlugs)

  // Sorts the posts by publish date going from latest to oldest
  const sortedPostsByAscDate = posts.sort((a, b) => {
    return Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
  })

  return {
    posts: sortedPostsByAscDate,
  }
}

export default async function Page() {
  const { posts } = await getPostData()

  return <Posts posts={posts} />
}
