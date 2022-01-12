import React from 'react'
import Image from 'next/image'
import format from 'date-fns/format'
import { marked } from 'marked'

import { getPostSlugs, getPostBySlug } from '../../utils/blog'

import { Layout } from '../../components/Layout'
import { NewsLetterCard } from '../../components/NewsletterSubscriptionForm'

{
  /* <div className="flex items-start mt-4 space-x-2 ">
          <div className="border-2 border-zinc-800 rounded-full flex flex-col items-start">
            <Image
              alt="Tayte Stokes"
              className="rounded-full"
              height={30}
              src="/profile.jpeg"
              width={30}
            />
          </div>
          <div className="flex flex-col text-sm">
            <p className="font-bold">Tayte Stokes</p>
            <p className="text-xs">{publishedDate}</p>
          </div>
        </div> */
}

export default function PostPage({ postContent, postData, slug }) {
  return (
    <Layout>
      <div className="w-full flex flex-col items-start">
        <h1 className="text-4xl text-zinc-900 font-extrabold">{postData.title}</h1>
        <div className="w-full flex items-center justify-between text-sm text-zinc-700 mt-2">
          <span>Published {format(new Date(postData.publishedAt), 'MMMM dd, yyyy')}</span>
        </div>
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
