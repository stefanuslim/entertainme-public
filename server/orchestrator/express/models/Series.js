const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios')


class SeriesModel {
  static async findAll() {
    let dataSeries = await redis.get('series')
    if(dataSeries){
      return JSON.parse(dataSeries)
    }
    else{
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3002/tv')
        .then( async (resp) => {
          await redis.set('series',JSON.stringify(resp.data))
          resolve(resp.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }

  static async findOne(seriesId) {
    let dataSeries = await redis.get(`series-${seriesId}`)
    if(dataSeries) {
      return JSON.parse(dataSeries)
    }
    else{
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3002/tv/${seriesId}`)
        .then( async (resp) => {
          await redis.set(`series-${seriesId}`,JSON.stringify(resp.data))
          resolve(resp.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }

  static addNewSeries(newSeries) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://localhost:3002/tv',
        data: newSeries
      })
      .then( async (resp) => {
        await redis.del('series')
        resolve(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static updateNewSeries(idSeries, newUpdatedSeries) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `http://localhost:3002/series/${idSeries}`,
        data: newUpdatedSeries
      })
      .then( async (resp) => {
        await redis.del('series')
        resolve(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static deleteOneSeries(idSeries) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `http://localhost:3002/series/${idSeries}`,
      })
      .then( async (resp) => {
        await redis.del('series')
        resolve(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = SeriesModel
