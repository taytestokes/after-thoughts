import { marked } from 'marked'
import { gql } from "@apollo/client";

import { Layout } from '../../components/Layout'

import { client } from '..'

export default function PostPage({ post }) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold">{post.attributes.title}</h1>
      <h2 className="mt-4">{post.attributes.publishedAt}</h2>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(post.attributes.content) }} />
    </Layout>
  )
}


/**
 * Generate each static blog post page for each
 * slug.
 */
export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query GetPostSlugs {
        posts {
          data {
            attributes {
              slug
            }
          }
        }
      }   
    `
  })

  const paths = data?.posts?.data.map(post => {
    return {
      params: {
        slug: post.attributes.slug
      }
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
  const { data } = await client.query({
    query: gql`
      query GetPostBySlug($filters: PostFiltersInput) {
        posts(filters: $filters) {
          data {
            attributes {
              title
              date
              content
              views
              author
              publishedAt
            }
          }
        }
      }
    `,
    variables: {
      filters: {
        slug: {
          eq: slug
        }
      }
    }
  })

  return {
    props: {
      post: data?.posts?.data[0]
    },
  }
}
