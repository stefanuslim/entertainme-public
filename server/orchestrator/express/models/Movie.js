const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios')


class MovieModel {
  static async findAll() {
    let dataMovies = await redis.get('movies')
    if(dataMovies){
      return JSON.parse(dataMovies)
    }
    else{
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/movies')
        .then( async (resp) => {
          await redis.set('movies',JSON.stringify(resp.data))
          resolve(resp.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }

  static async findOne(movieId) {
    let dataMovie = await redis.get(`movie-${movieId}`)
    if(dataMovie) {
      return JSON.parse(dataMovie)
    }
    else{
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3001/movies/${movieId}`)
        .then( async (resp) => {
          await redis.set(`movie-${movieId}`,JSON.stringify(resp.data))
          resolve(resp.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }

  static addNewMovie(newMovie) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://localhost:3001/movies',
        data: newMovie
      })
      .then( async (resp) => {
        await redis.del('movies')
        resolve(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static updateNewMovie(idMovie, newUpdatedMovie) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `http://localhost:3001/movies/${idMovie}`,
        data: newUpdatedMovie
      })
      .then( async (resp) => {
        await redis.del('movies')
        resolve(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static deleteOneMovie(idMovie) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `http://localhost:3001/movies/${idMovie}`,
      })
      .then( async (resp) => {
        await redis.del('movies')
        resolve(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = MovieModel
