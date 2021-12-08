import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { Post } from '../components/Post'
import { Layout } from '../components/Layout'

export default function Home({ blogPosts }) {
  return (
    <Layout>
      <div className="w-full flex flex-col flex-grow">
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
