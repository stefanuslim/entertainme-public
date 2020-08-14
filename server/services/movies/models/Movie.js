const db = require("../config/mongo")
const Movie = db.collection("Movie")
const { ObjectID } = require("mongodb")

class MovieModel {
  static findAll() {
    return Movie.find().toArray()
  }

  static insertOne(newData) {
    return Movie.insertOne(newData)
  }

  static findOneAndUpdate(id, updatedData) {
    return Movie.findOneAndUpdate({_id: ObjectID(id)},{$set: updatedData})
  }

  static findOne(id) {
    return Movie.findOne({_id: ObjectID(id)})
  }

  static findOneAndDelete(id) {
    return Movie.findOneAndDelete({_id: ObjectID(id)})
  }
}


module.exports = MovieModel
