import React from 'react'
import { gql } from '@apollo/client'

import { Layout } from '../../components/Layout'
import { Post } from '../../components/Post'

import { apolloClient } from '../../config/apolloClient'

export default function Blog({ posts }) {
  return (
    <Layout>
      <div className="w-full flex flex-col flex-grow mt-8">
        {posts?.data?.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query GetPosts {
        posts {
          data {
            attributes {
              title
              content
              views
              author
              excerpt
              publishedAt
              slug
            }
          }
        }
      }
    `,
  })

  return {
    props: {
      posts: data.posts,
    },
  }
}
