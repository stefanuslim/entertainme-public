import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
export const favoriteItems = makeVar([])


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies:{
      Query: {
        fields: {
          favorites: {
            read() {
              return favoriteItems()
            }
          }
        }
      }
    }
  })
});

export default client
