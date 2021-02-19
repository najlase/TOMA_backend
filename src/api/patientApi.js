const patientsService = require('../services/patientsService')

class PatientsApi {

  async getDoctors(req, res) {

    res.send((await patientsService.getPatientDoctors(req.params.id)).doctors)
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
}

module.exports = new PatientsApi()
