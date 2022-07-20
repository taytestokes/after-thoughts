import React from 'react'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { MetaData } from '../components/MetaData'

import { getPostSlugs, getPosts } from '../utils/blog'

export default function Home({ posts }) {
  return (
    <Layout>
      <MetaData>
        <Posts posts={posts} />
      </MetaData>
    </Layout>
  )
}

// Get Static Props
export async function getStaticProps() {
  const postSlugs = getPostSlugs()
  const posts = getPosts(postSlugs)

  // Sorts the posts by publish date going from latest to oldest
  const sortedPostsByAscDate = posts.sort((a, b) => {
    return Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
  })

  return {
    props: {
      posts: sortedPostsByAscDate,
    },
  }
}
