const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios')


class MovieModel {
  static async findAll() {
    let dataMovies = await redis.get('movies')
    if(dataMovies) return JSON.parse(dataMovies)
    try {
      const movies = await axios.get('http://localhost:3001/movies')
      await redis.set('movies',JSON.stringify(movies.data))
      return movies.data
    } catch (err) {
      return err
    }
  }

  static async findOne(movieId) {
    let dataMovie = await redis.get(`movie-${movieId}`)
    if(dataMovie) return JSON.parse(dataMovie)
    try {
      const movie = await axios.get(`http://localhost:3001/movies/${movieId}`)
      await redis.set(`movie-${movieId}`,JSON.stringify(movie.data))
      return movie.data
    }
    catch(err) {
      return err
    }
  }

  static async addNewMovie(newMovie) {
    try {
      const newMovie = await axios({
        method: 'post',
        url: 'http://localhost:3001/movies',
        data: newMovie
      })
      await redis.del('movies')
      return newMovie.data
    }
    catch(err) {
      return err
    }
  }

  static async updateNewMovie(idMovie, newUpdatedMovie) {
    try {
      const updatedMovie = await axios({
        method: 'put',
        url: `http://localhost:3001/movies/${idMovie}`,
        data: newUpdatedMovie
      })
      await redis.del('movies')
      return updatedMovie.data
    } catch (err) {
      return err
    }
  }

  static async deleteOneMovie(idMovie) {
    try {
      const deletedMovie = await axios({
        method: 'delete',
        url: `http://localhost:3001/movies/${idMovie}`,
      })
      await redis.del('movies')
      return deletedMovie
    } catch (err) {
      return err
    }
  }
}

module.exports = MovieModel
