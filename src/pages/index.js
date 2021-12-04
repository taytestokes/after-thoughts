import Head from 'next/head'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { Post } from '../components/Post'

export default function Home({ blogPosts }) {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="h-2 bg-gradient-to-r from-violet-500  to-pink-500" />

      <div className="container mt-8 px-2 mx-auto">
        <h1 className="text-4xl font-bold">After Thoughts</h1>
        <p className="mt-4 text-gray-400">
          A personal software engineering blog that is used to document my explorations and
          learnings in this digital world.
        </p>
      </div>

      {/* Content */}
      <div className="container flex flex-col flex-grow mt-8 px-2 mx-auto">
        {blogPosts.map((post) => (
          <Post key={post?.data?.date} post={post} />
        ))}
      </div>

      {/* Footer */}
      <div className="container mt-auto mx-auto flex justify-center items-center border-t border-gray-700 p-8">
        <p className="text-gray-400">Made with questionable choices by Tayte Stokes</p>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const blogFolders = fs.readdirSync(path.join('blog'))
  const blogPosts = blogFolders.map((folderName) => {
    const { data } = matter(fs.readFileSync(path.join('blog', folderName, 'index.md'), 'utf-8'))

    return {
      slug: folderName,
      data,
    }
  })

  return {
    props: {
      blogPosts,
    },
  }
}
