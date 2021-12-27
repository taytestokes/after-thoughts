import Head from 'next/head'
import Image from 'next/image'
import format from 'date-fns/format'
import { marked } from 'marked'

import { getPostSlugs, getPostBySlug } from '../../utils/blog'

import { Layout } from '../../components/Layout'

import profilePicture from '../../public/profile.jpeg'

export default function PostPage({ postContent, postData }) {
  return (
    <Layout>
      <Head>
        <title>After Thoughts - {postData.title}</title>
      </Head>
      <div className="w-full flex flex-col items-start">
        <h1 className="text-4xl font-bold">{postData.title}</h1>
        <div className="w-full flex items-center text-sm text-gray-400 mt-4">
          <span className="flex items-center border border-gray-700 rounded-full">
            <Image
              alt="Tayte Stokes"
              className="rounded-full"
              height={30}
              src={profilePicture}
              width={30}
            />
          </span>
          <span className="ml-2">Tayte Stokes</span>
          <span className="ml-auto">{format(new Date(postData.publishedAt), 'MMMM dd, yyyy')}</span>
        </div>
      </div>
      <div className="markdown mt-4" dangerouslySetInnerHTML={{ __html: marked(postContent) }} />
    </Layout>
  )
}

/**
 * Generate each static blog post page for each
 * slug
 */
export async function getStaticPaths() {
  const postSlugs = getPostSlugs()
  const paths = postSlugs.map((slug) => {
    return {
      params: {
        slug: slug.replace('.md', ''),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

/**
 * Get the blog post from the database for the current static blog post page
 * using it's slug value.
 */
export async function getStaticProps({ params: { slug } }) {
  const post = getPostBySlug(slug)

  return {
    props: {
      postContent: post.content,
      postData: post.data,
    },
  }
}
