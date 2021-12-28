import React from 'react'
import Link from 'next/link'
import format from 'date-fns/format'
import { BiSearch } from 'react-icons/bi'

import { getPostSlugs, getPosts } from '../utils/blog'

import { Layout } from '../components/Layout'

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="w-full flex flex-col items-start">
        <h1 className="text-4xl font-black">After Thoughts</h1>
        <p className="text-gray-400">
          Welcome! This is a software development blog for all things web related.
        </p>
        <div className="relative w-full mt-8">
          <BiSearch className="absolute left-2 top-3 h-5 w-5 pointer-events-none text-gray-400" />
          <input
            className="w-full block px-4 py-2 pl-8 border border-gray-700 bg-gray-900 text-gray-400 rounded-md"
            id="search"
            placeholder="Search posts"
          />
        </div>
      </div>

      <div className="w-full mt-8 space-y-8">
        {posts?.map((post, index) => {
          const publishedDate = format(new Date(post.data.publishedAt), 'MMMM dd, yyyy')

          return (
            <Link href={`/blog/${post.slug}`} key={`${post} - ${index}`}>
              <div className="cursor-pointer">
                <h2 className="text-2xl font-bold">{post.data.title}</h2>
                <span className="text-sm">{publishedDate}</span>
                <p className="text-gray-400">{post.data.excerpt}</p>
              </div>
            </Link>
          )
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
