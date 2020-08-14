const routes = require('express').Router()
const movieRoutes = require('./movieroute.js')
const tvSeriesRoutes = require("./tvseriesroute.js")


routes.use(movieRoutes)
routes.use(tvSeriesRoutes)


module.exports = routes
