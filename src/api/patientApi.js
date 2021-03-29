const patientsService = require('../services/patientsService')
const connectionService = require('../services/connectionService')

class PatientsApi {

  async getDoctors(req, res) {

    res.send((await patientsService.getPatientDoctors(req.params.id)).doctors)
  }
  async getInvitations(req, res) {
    res.send(await patientsService.getInvitations(req.user.profile._id))
  }

  async removeConnection(req, res) {

    res.send(await connectionService.removeConnection(req.params.doctorId, req.user.profile._id))
  }

  async filterDoctors(req, res) {

    let filterData = {};
    if(req.body.specialty)
      filterData['specialty'] = { $regex : new RegExp(req.body.specialty, "i") }

    if(req.body.name) {
      let split = req.body.name.split(' ')
      filterData['firstName'] = { $regex : new RegExp(split[0], "i") }
      if(split.length > 1)
        filterData['lastName'] = { $regex : new RegExp(split[1], "i") }
    }

    res.send((await patientsService.filterPatientDoctors(req.params.id, filterData)).doctors)
  }

  async updateProfile(req, res){
    console.log(req.body)
    res.send(await  patientsService.updateProfile(req.params.id, req.body))
  }

  async connect(req, res) {
    await connectionService.createConnectionRequest(req.params.id, req.params.doctorId)
    res.send({});
  }

  async removeConnectionRequest(req, res) {
    await connectionService.removeConnectionRequest(req.params.id, req.params.doctorId)
    res.send({});
  }
}

module.exports = new PatientsApi()
