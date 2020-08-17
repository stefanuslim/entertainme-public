const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const movieSchema = require("./schemas/movieSchema")
const tvSchema = require("./schemas/tvSchema")

const typeDefs = gql `
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, tvSchema.typeDefs],
  resolvers: [movieSchema.resolvers, tvSchema.resolvers],
})


const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
