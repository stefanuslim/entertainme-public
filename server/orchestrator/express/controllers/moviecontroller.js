const MovieModel = require("../models/Movie")

class MovieController {
  static findAll(req,res) {
    MovieModel.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
  }

  static addMovie(req,res) {
     MovieModel.addNewMovie(req.body)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
    }

  static showById(req, res) {
    MovieModel.findOne(req.params.id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
      })
  }

    static updateMovie(req, res) {
      MovieModel.updateNewMovie(req.params.id,req.body)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
    }

    static deleteMovie(req, res) {
      MovieModel.deleteOneMovie(req.params.id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
    }
}

module.exports = MovieController
