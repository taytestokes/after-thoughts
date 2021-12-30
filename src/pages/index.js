import React from 'react'

import { Layout } from '../components/Layout'
import { PostCard } from '../components/PostCard'
import { FeaturedPostCard } from '../components/FeaturedPostCard'

import { getPostSlugs, getPosts } from '../utils/blog'

export default function Home({ posts }) {
  const [featuredPost] = posts.filter((post) => post.data.featured)

  return (
    <Layout>
      <FeaturedPostCard featuredPost={featuredPost} />
      <div className="mt-8">
        <h2 className="text-2xl font-extrabold">Recent Posts</h2>
      </div>
      <div className="w-full mt-4 space-y-8">
        {posts?.map((post, index) => {
          return <PostCard key={`${post.slug} - ${index}}`} post={post} />
        })}
      </div>
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
