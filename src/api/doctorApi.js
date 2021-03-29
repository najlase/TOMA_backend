const doctorsService = require('../services/doctorsService')
const connectionService = require('../services/connectionService')

class DoctorsApi {

  async getAll(req, res) {
    res.send((await doctorsService.getAll()))
  }

  async getInvitations(req, res) {
    res.send((await doctorsService.getInvitations(req.user.profile._id)))
  }

  async getPatients(req, res) {
    res.send((await doctorsService.getPatients(req.user.profile._id)))
  }

  async getArchievedPatients(req, res) {
    res.send((await doctorsService.getArchievedPatients(req.user.profile._id)))
  }
  
  async acceptInvitation(req, res) {

    res.send(await connectionService.acceptConnectionRequest(req.user.profile._id, req.params.patientId))
  }

  async rejectInvitation(req, res) {

    res.send(await connectionService.rejectConnectionRequest(req.user.profile._id, req.params.patientId))
  }

  async filter(req, res) {
    let filterData = {};
    if(req.body.specialty)
      filterData['specialty'] = { $regex : new RegExp(req.body.specialty, "i") }

    if(req.body.name) {
      let split = req.body.name.split(' ')
      filterData['firstName'] = { $regex : new RegExp(split[0], "i") }
      if(split.length > 1)
        filterData['lastName'] = { $regex : new RegExp(split[1], "i") }
    }
    res.send((await doctorsService.filter(filterData)))
  }
}

module.exports = new DoctorsApi()
