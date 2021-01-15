const patientsService = require('../services/patientsService')

class PatientsApi {

  async getDoctors(req, res) {
    if(req.user.role == 'Patient' && req.params.id !== req.user.profile._id)
      return res.sendStatus(403)

    res.send((await patientsService.getPatientDoctors(req.params.id)).doctors)
  }
}

module.exports = new PatientsApi()
