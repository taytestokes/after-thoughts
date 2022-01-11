import React from 'react'
import Image from 'next/image'
import format from 'date-fns/format'
import { marked } from 'marked'

import { getPostSlugs, getPostBySlug } from '../../utils/blog'

import { Layout } from '../../components/Layout'
import { NewsLetterCard } from '../../components/NewsLetterCard'

export default function PostPage({ postContent, postData, slug }) {
  return (
    <Layout>
      <div className="w-full flex flex-col items-start">
        <h1 className="text-4xl text-zinc-900 font-extrabold">{postData.title}</h1>
        <div className="w-full flex items-center justify-between text-sm text-zinc-700 mt-2">
          <span>Published {format(new Date(postData.publishedAt), 'MMMM dd, yyyy')}</span>
        </div>
      </div>

      <div className="relative w-full bg-black h-64 border border-zinc-700 rounded-md mt-8">
        <Image
          alt={`Banner image for ${postData.title}`}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          src={postData.image}
        />
      </div>

      <div className="markdown mt-8" dangerouslySetInnerHTML={{ __html: marked(postContent) }} />

      {/* <NewsLetterCard /> */}
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
