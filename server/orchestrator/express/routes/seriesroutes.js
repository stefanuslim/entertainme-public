const seriesRoutes = require('express').Router()
const SeriesController = require("../controllers/seriescontroller.js")

seriesRoutes.get("/series", SeriesController.findAll)

seriesRoutes.post("/series", SeriesController.addSeries)

seriesRoutes.get("/series/:id", SeriesController.showById)

seriesRoutes.put("/series/:id", SeriesController.updateSeries)

seriesRoutes.delete("/series/:id", SeriesController.deleteSeries)



module.exports = seriesRoutes
