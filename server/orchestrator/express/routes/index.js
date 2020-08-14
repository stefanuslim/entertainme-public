const routes = require('express').Router()
const EntertainController = require("../controllers/entertaincontroller")
const movieRoutes = require("./movieroutes")
const seriesRoutes = require("./seriesroutes")


routes.get('/entertainme',EntertainController.findAll)

routes.use(movieRoutes)

routes.use(seriesRoutes)


module.exports = routes
