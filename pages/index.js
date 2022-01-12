import React from 'react'

import { Layout } from '../components/Layout'

import { Posts } from '../components/Posts'

import { getPostSlugs, getPosts } from '../utils/blog'

export default function Home({ posts }) {
  return (
    <Layout>
      <Posts posts={posts} />
    </Layout>
  )
}

// Get Static Props
export async function getStaticProps() {
  const postSlugs = getPostSlugs()
  const posts = getPosts(postSlugs)

  return {
    props: {
      posts,
    },
  }
}
