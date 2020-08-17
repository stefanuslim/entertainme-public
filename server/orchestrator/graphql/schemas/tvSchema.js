const { gql } = require('apollo-server');
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql `
  type Serie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  extend type Query {
      series: [Serie],
      serie(_id: ID): Serie
  }

  input SerieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: String!
  }

  extend type Mutation {
    addSerie(serie: SerieInput) : Serie
    updateSerie(_id: ID, serie: SerieInput) : Serie
    deleteSerie(_id: ID) : Serie
  }
`

const resolvers = {
  Query: {
    series: async () => {
      const seriesCache = await redis.get("seriesGraphql")
      if(seriesCache) return JSON.parse(seriesCache)
      try {
        const series = await axios.get('http://localhost:3002/tv');
        await redis.set("seriesGraphql", JSON.stringify(series.data))
        return series.data;
      } catch (error) {
        return error
      }
    },
    serie: async (_,args) => {
      const seriesCache = await redis.get(`seriesGraphql-${args._id}`)
      if(seriesCache) return JSON.parse(seriesCache)
      try {
        const id = args._id
        const serie = await axios.get(`http://localhost:3002/tv/${id}`);
        await redis.set(`seriesGraphql-${id}`, JSON.stringify(serie.data))
        return serie.data;
      } catch (error) {
        return error
      }
    },
  },
  Mutation: {
    addSerie: async (_, args) => {
      try {
       const newSerie = args.serie;
       await redis.del("seriesGraphql")
       const serie = await axios.post(`http://localhost:3002/tv`, newSerie)
       return serie.data;
     } catch (error) {
       return error
     }
   },
   updateSerie: async (_, args) => {
     try {
      const id = args._id
      const updatedSerie = args.serie;
      await redis.del("seriesGraphql")
      await redis.del(`seriesGraphql-${id}`)
      const serie = await axios.put(`http://localhost:3002/tv/${id}`, updatedSerie);
      return updatedSerie;
    } catch (error) {
      return error
    }
   },
   deleteSerie: async (_, args) => {
     try {
      const id = args._id
      await redis.del("seriesGraphql")
      await redis.del(`seriesGraphql-${id}`)
      const serie = await axios.delete(`http://localhost:3002/tv/${id}`);
      return serie.data;
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
