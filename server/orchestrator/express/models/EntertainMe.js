const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios')

class EntertainMe {
  static async findAll() {
    const dataEntertainMe = await redis.get('entertainme')
    if(dataEntertainMe) return JSON.parse(dataEntertainMe)
    try {
      const moviesData = await axios.get('http://localhost:3001/movies')
      const seriesData = await axios.get('http://localhost:3002/tv')
      const allData = {movies: moviesData.data, tvSeries: seriesData.data}
      await redis.set('entertainme',JSON.stringify(allData))
      return allData
    } catch (err) {
      return err
    }
  }
}


module.exports = EntertainMe
