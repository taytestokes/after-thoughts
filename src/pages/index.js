import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { Post } from '../components/Post'
import { Layout } from '../components/Layout'

export default function Home({ blogPosts }) {
  return (
    <Layout>
      <div className="container mt-8 px-2 mx-auto">
        <h1 className="text-4xl font-bold">After Thoughts</h1>
        <p className="mt-4 text-gray-400">
          A personal software engineering blog that is used to document my explorations and
          learnings in this digital world.
        </p>
      </div>

      <div className="container flex flex-col flex-grow mt-8 px-2 mx-auto">
        {blogPosts.map((post) => (
          <Post key={post?.data?.date} post={post} />
        ))}
      </div>
    </Layout>
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
