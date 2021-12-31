import React from 'react'
import Image from 'next/image'
import format from 'date-fns/format'
import { marked } from 'marked'
import useSWR from 'swr'

import { getPostSlugs, getPostBySlug } from '../../utils/blog'
import { fetcher } from '../../lib/swr'

import { Layout } from '../../components/Layout'

export default function PostPage({ postContent, postData, slug }) {
  const { data, loading } = useSWR(`/api/posts/views/${slug}`, fetcher)
  const postViews = data?.views

  React.useEffect(() => {
    fetch(`/api/posts/views/${slug}`, {
      method: 'POST',
    })
  }, [])

  return (
    <Layout>
      <div className="w-full flex flex-col items-start">
        <h1 className="text-4xl font-extrabold">{postData.title}</h1>
        <div className="w-full flex items-center justify-between text-sm text-gray-400 mt-2">
          <span>Published {format(new Date(postData.publishedAt), 'MMMM dd, yyyy')}</span>
          <span>{loading ? '-' : postViews} Views</span>
        </div>
        <div className="w-full flex items-center text-sm text-gray-400 mt-4">
          <span className="flex items-center border border-gray-700 rounded-full">
            <Image
              alt="Tayte Stokes"
              className="rounded-full"
              height={30}
              src="/profile.jpeg"
              width={30}
            />
          </span>
          <span className="ml-2">Tayte Stokes</span>
        </div>
      </div>

      <div className="relative w-full h-64 border border-gray-700 rounded-md mt-8">
        <Image
          alt={`Banner image for ${postData.title}`}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          src={postData.image}
        />
      </div>

      <div className="markdown mt-8" dangerouslySetInnerHTML={{ __html: marked(postContent) }} />
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
      slug,
    },
  }
}
