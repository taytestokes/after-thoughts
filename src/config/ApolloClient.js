import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://after-thoughts.herokuapp.com/graphql',
  cache: new InMemoryCache(),
})
