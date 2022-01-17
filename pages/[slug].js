import React from 'react'
import { marked } from 'marked'

import { getPostSlugs, getPostBySlug } from '../utils/blog'

import { Layout } from '../components/Layout'
import { MetaData } from '../components/MetaData'

export default function PostPage({ postContent, postData, slug }) {
  return (
    <Layout>
      <MetaData
        metaData={{
          title: `After Thoughts | ${postData.title}`,
          description: postData.excerpt,
        }}
      >
        <article className="container flex flex-col items-center mx-auto px-4 py-8">
          <h1 className="text-4xl font-extrabold">{postData.title}</h1>
          <div
            className="prose prose-invert mt-16 max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(postContent) }}
          />
        </article>
      </MetaData>
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
