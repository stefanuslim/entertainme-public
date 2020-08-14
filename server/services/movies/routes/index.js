const routes = require('express').Router()
const MovieController = require("../controllers/MovieController")

routes.get("/movies",MovieController.findAll)


routes.post("/movies",MovieController.addMovie)

routes.get("/movies/:id", MovieController.showById)

routes.put("/movies/:id",MovieController.updateMovie)


routes.delete("/movies/:id", MovieController.deleteMovie)


module.exports = routes
