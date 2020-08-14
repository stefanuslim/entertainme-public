const routes = require('express').Router()
const TvController = require('../controllers/tvcontroller')


routes.get("/tv",TvController.findAll)

routes.post("/tv",TvController.addTvSeries)

routes.get("/tv/:id", TvController.showById)

routes.put("/tv/:id",TvController.updateTvSeries)

routes.delete("/tv/:id",TvController.deleteTvSeries)


module.exports = routes
