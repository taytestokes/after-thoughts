import Link from 'next/link'

import { getPostSlugs, getPosts } from '../utils/blog'

import { Layout } from '../components/Layout'

export default function Home({ posts }) {
  return (
    <Layout>
      {posts?.map((post, index) => {
        return (
          <div keuy={`${post} - ${index}`}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.data.title}</a>
            </Link>
          </div>
        )
      })}
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
