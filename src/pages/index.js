import React from 'react'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { FeaturedPostCard } from '../components/FeaturedPostCard'
import { NewsLettersCard } from '../components/NewsLetterCard'

import { getPostSlugs, getPosts } from '../utils/blog'

export default function Home({ posts }) {
  const [featuredPost] = posts.filter((post) => post.data.featured)

  return (
    <Layout>
      <FeaturedPostCard featuredPost={featuredPost} />
      {/* <div className="py-8">
        <h2 className="text-2xl text-zinc-900 font-extrabold">Recent Posts</h2>
      </div> */}
      <Posts posts={posts} />
      <NewsLettersCard />
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
