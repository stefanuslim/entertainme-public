const SeriesModel = require("../models/Series")

class SeriesController {
  static findAll(req,res) {
    SeriesModel.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
  }

  static addSeries(req,res) {
     SeriesModel.addNewSeries(req.body)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
    }

  static showById(req, res) {
    SeriesModel.findOne(req.params.id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
    })
  }

    static updateSeries(req, res) {
      SeriesModel.updateNewSeries(req.params.id,req.body)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
    }

    static deleteSeries(req, res) {
      SeriesModel.deleteOneSeries(req.params.id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
    }
}

module.exports = SeriesController
