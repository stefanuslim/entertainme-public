const movieRoutes = require('express').Router()
const MovieController = require("../controllers/moviecontroller.js")

movieRoutes.get("/movies", MovieController.findAll)

movieRoutes.post("/movies", MovieController.addMovie)

movieRoutes.get("/movies/:id", MovieController.showById)

movieRoutes.put("/movies/:id", MovieController.updateMovie)

movieRoutes.delete("/movies/:id", MovieController.deleteMovie)


module.exports = movieRoutes
