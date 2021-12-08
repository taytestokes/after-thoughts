import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { Post } from '../components/Post'
import { Layout } from '../components/Layout'
import { Timeline } from '../components/Timeline'

export default function Home({ blogPosts, timelineEvents }) {
  return (
    <Layout>
      <Timeline data={timelineEvents} />

      <div className="w-full flex flex-col flex-grow mt-8">
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

  const timelineEvents = JSON.parse(fs.readFileSync(path.join('data', 'timeline.json'), 'utf-8'))

  return {
    props: {
      blogPosts,
      timelineEvents,
    },
  }
}
