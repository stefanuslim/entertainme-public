const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios')

class EntertainMe {
  static async findAll() {
    let dataMovies = null
    let dataSeries = null
    let allData = null
    const dataEntertainMe = await redis.get('entertainme')
    if(dataEntertainMe){
      return JSON.parse(dataEntertainMe)
    }
    else{
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/movies')
        .then((resp) =>  {
          dataMovies = resp.data
          return axios.get('http://localhost:3002/tv')
        })
        .then(async (resp) => {
          dataSeries = await resp.data
          allData = {movies: dataMovies, tvSeries: dataSeries}
          await redis.set('entertainme',JSON.stringify(allData))
          resolve(allData)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }
}


module.exports = EntertainMe
