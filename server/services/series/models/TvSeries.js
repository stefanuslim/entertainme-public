const db = require("../config/mongo")
const TvSeries = db.collection("TV Series")
const { ObjectID } = require("mongodb")

class TvSeriesModel {
  static findAll() {
    return TvSeries.find().toArray()
  }

  static insertOne(newData) {
    return TvSeries.insertOne(newData)
  }

  static findOneAndUpdate(id, updatedData) {
    return TvSeries.findOneAndUpdate({_id: ObjectID(id)},{$set: updatedData})
  }

  static findOne(seriesId) {
    return TvSeries.findOne({_id: ObjectID(seriesId)})
  }

  static findOneAndDelete(id) {
    return TvSeries.findOneAndDelete({_id: ObjectID(id)})
  }
}


module.exports = TvSeriesModel
