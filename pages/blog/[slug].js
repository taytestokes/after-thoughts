import React from 'react'
import { marked } from 'marked'

import { getPostSlugs, getPostBySlug } from '../../utils/blog'

import { Layout } from '../../components/Layout'

export default function PostPage({ postContent, postData, slug }) {
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <h1 className="text-4xl font-extrabold">{postData.title}</h1>
      </div>

      <article
        className="prose prose-invert mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: marked(postContent) }}
      />
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
