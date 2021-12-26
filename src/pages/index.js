import Link from 'next/link'
import format from 'date-fns/format'

import { getPostSlugs, getPosts } from '../utils/blog'

import { Layout } from '../components/Layout'

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="w-full">
        {posts?.map((post, index) => {
          const publishedDate = format(new Date(post.data.publishedAt), 'MMMM dd, yyyy')
          return (
            <Link href={`/blog/${post.slug}`} key={`${post} - ${index}`}>
              <div className="w-full cursor-pointer">
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
