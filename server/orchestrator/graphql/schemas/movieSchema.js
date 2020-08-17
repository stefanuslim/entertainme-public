const { gql } = require('apollo-server');
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql `
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  extend type Query {
      movies: [Movie],
      movie(_id: ID): Movie
  }

  input MovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: String!
  }

  extend type Mutation {
    addMovie(movie: MovieInput) : Movie
    updateMovie(_id: ID, movie: MovieInput) : Movie
    deleteMovie(_id: ID) : Movie
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      const moviesCache = await redis.get("moviesGraphql")
      if(moviesCache) return JSON.parse(moviesCache)
      try {
        const movies = await axios.get('http://localhost:3001/movies');
        await redis.set("moviesGraphql", JSON.stringify(movies.data))
        return movies.data;
      } catch (error) {
        return error
      }
    },
    movie: async (_,args) => {
      const movieCache = await redis.get(`movieGraphql-${args._id}`)
      if(movieCache) return JSON.parse(movieCache)
      try {
        const id = args._id
        const movie = await axios.get(`http://localhost:3001/movies/${id}`);
        await redis.set(`movieGraphql-${id}`, JSON.stringify(movie.data))
        return movie.data;
      } catch (error) {
        return error
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
       const newMovie = args.movie;
       await redis.del("moviesGraphql")
       const movie = await axios.post(`http://localhost:3001/movies`, newMovie)
       return movie.data;
     } catch (error) {
       return error
     }
   },
   updateMovie: async (_, args) => {
     try {
      const id = args._id
      const updatedMovie = args.movie;
      await redis.del("moviesGraphql")
      await redis.del(`movieGraphql-${id}`)
      const movie = await axios.put(`http://localhost:3001/movies/${id}`, updatedMovie);
      return updatedMovie;
    } catch (error) {
      return error
    }
   },
   deleteMovie: async (_, args) => {
     console.log(args)
     try {
      const id = args._id
      await redis.del("moviesGraphql")
      await redis.del(`movieGraphql-${id}`)
      const movie = await axios.delete(`http://localhost:3001/movies/${id}`);
      return movie.data;
    } catch (error) {
      return error
    }
   },
  }
}

module.exports = {
  typeDefs,
  resolvers,
}
