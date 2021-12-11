import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import { Post } from '../components/Post'
import { Layout } from '../components/Layout'

export const client = new ApolloClient({
  uri: 'https://after-thoughts.herokuapp.com/graphql',
  cache: new InMemoryCache(),
})

export default function Home({ posts }) {
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
  const { data } = await client.query({
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
