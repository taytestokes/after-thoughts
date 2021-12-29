import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { BiSearch } from 'react-icons/bi'

import { getPostSlugs, getPosts } from '../utils/blog'

import { Layout } from '../components/Layout'
import { PostCard } from '../components/PostCard'

import logo from '../public/after-thoughts-logo.svg'

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="w-full flex items-center py-8">
        <Image alt="After Thoughts Logo" height={65} width={65} src={logo} />
        <div className="ml-4">
          <h1 className="text-2xl font-extrabold">After Thoughts</h1>
          <p className="text-sm text-gray-400">A software development blog by Tayte Stokes</p>
        </div>
      </div>

      {/* <div className="relative w-full mt-8">
        <BiSearch className="absolute left-2 top-3 h-5 w-5 pointer-events-none text-gray-400" />
        <input
          className="w-full block px-4 py-2 pl-8 border border-gray-700 bg-gray-900 text-gray-400 rounded-md"
          id="search"
          placeholder="Search posts"
        />
      </div> */}

      <div className="w-full mt-8 space-y-8">
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
