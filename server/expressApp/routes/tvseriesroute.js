const tvSeriesRoutes = require('express').Router()

const TvController = require("../controllers/TVController.js")

tvSeriesRoutes.get("/tv",TvController.findAll)

tvSeriesRoutes.post("/tv",TvController.addTvSeries)

tvSeriesRoutes.get("/tv/:id", TvController.showById)

tvSeriesRoutes.put("/tv/:id",TvController.updateTvSeries)

tvSeriesRoutes.delete("/tv/:id",TvController.deleteTvSeries)


module.exports = tvSeriesRoutes
