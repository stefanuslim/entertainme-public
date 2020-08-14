const EntertainMe = require("../models/EntertainMe")

class EntertainController {

  static findAll(req,res) {
    EntertainMe.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message:"Internal Server Error"})
      })
  }
}





module.exports = EntertainController
