import React from 'react'
import { Posts } from './(routes)/blog/_components/Posts'
import { getPostSlugs, getPosts } from './_utils/blog'

async function getPostData() {
  const postSlugs = getPostSlugs()
  const posts = await getPosts(postSlugs)

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
