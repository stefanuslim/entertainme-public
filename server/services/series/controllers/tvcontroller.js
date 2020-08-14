const TvSeriesModel = require("../models/TvSeries")

class TvController {
  static findAll(req,res) {
    TvSeriesModel.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message: "Internal Server Error"})
      })
  }

  static addTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body
    let errors = []
    if(!title) errors.push('Title is required')
    if(!overview) errors.push('Overview is required')
    if(!poster_path) errors.push('Poster is required')
    if(!popularity) {
      errors.push('Popularity is required')
      if(isNaN(+popularity) === true){
        errors.push('Popularity in wrong format')
      }
    }
    if(!tags) errors.push('Tags is required')
    if(errors.length > 0) {
      res.status(400).json(errors)
    }
    else{
      TvSeriesModel.insertOne({ title, overview, poster_path, popularity: +popularity, tags: tags.split(",")})
        .then((data) => {
          res.status(201).json(data.ops[0])
        })
        .catch((err) => {
          res.status(500).json({message: "Internal Server Error"})
        })

    }
  }
  
  static updateTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body
    let errors = []
    if(!title) errors.push('Title is required')
    if(!overview) errors.push('Overview is required')
    if(!poster_path) errors.push('Poster is required')
    if(!popularity) {
      errors.push('Popularity is required')
      if(isNaN(+popularity) === true){
        errors.push('Popularity in wrong format')
      }
    }
    if(!tags) errors.push('Tags is required')
    if(errors.length > 0) {
      res.status(400).json(errors)
    }
    else{
      TvSeriesModel.findOneAndUpdate(req.params.id, { title, overview, poster_path, popularity: +popularity, tags: tags.split(",")})
        .then((data) => {
          res.status(200).json(data.value)
        })
        .catch((err) => {
          res.status(500).json({message: "Internal Server Error"})
        })
    }
  }

  static showById(req, res) {
    TvSeriesModel.findOne(req.params.id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message: "Internal Server Error"})
      })
  }

  static deleteTvSeries(req, res) {
    TvSeriesModel.findOneAndDelete(req.params.id)
      .then((data) => {
        res.status(200).json(data.value)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
  }
}


module.exports = TvController
