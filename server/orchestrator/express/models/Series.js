const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios')


class SeriesModel {
  static async findAll() {
    let dataSeries = await redis.get('series')
    if(dataSeries) return JSON.parse(dataSeries)
    try {
      const series = await axios.get('http://localhost:3002/tv')
      await redis.set('series',JSON.stringify(series.data))
      return series.data
    } catch (err) {
      return err
    }
  }

  static async findOne(seriesId) {
    let dataSeries = await redis.get(`series-${seriesId}`)
    if(dataSeries) return JSON.parse(dataSeries)
    try {
      const serie = await axios.get(`http://localhost:3002/tv/${seriesId}`)
      await redis.set(`series-${seriesId}`,JSON.stringify(serie.data))
      return serie.data
    } catch (err) {
      return err
    }
  }

  static async addNewSeries(newSeries) {
    try {
      const addedSerie = await axios({
        method: 'post',
        url: 'http://localhost:3002/tv',
        data: newSeries
      })
      await redis.del('series')
      return addedSerie.data
    } catch (err) {
      return err
    }
  }

  static async updateNewSeries(idSeries, newUpdatedSeries) {
    try {
      const updatedSerie = await axios({
        method: 'put',
        url: `http://localhost:3002/series/${idSeries}`,
        data: newUpdatedSeries
      })
      await redis.del('series')
      return updatedSerie.data
    } catch (err) {
      return err
    }
  }

  static async deleteOneSeries(idSeries) {
    try {
      const deletedSerie = await axios({
        method: 'delete',
        url: `http://localhost:3002/series/${idSeries}`,
      })
      await redis.del('series')
      return deleteSerie.data
    } catch (err) {
      return err
    }
  }
}

module.exports = SeriesModel
