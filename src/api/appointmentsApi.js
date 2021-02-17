const appointmentService = require('../services/appointmentService')

class AppointmentsApi {

  async getPatientAppointments(req, res) {
    res.send(await appointmentService.getPatientAppointments(req.params.id))
  }

  async filterPatientAppointments(req, res) {
    const doctorFilterData = {};
    if(req.body.specialty)
      doctorFilterData['specialty'] = { $regex : new RegExp(req.body.specialty, "i") }

    if(req.body.name) {
      let split = req.body.name.split(' ')
      doctorFilterData['firstName'] = { $regex : new RegExp(split[0], "i") }
      if(split.length > 1)
        doctorFilterData['lastName'] = { $regex : new RegExp(split[1], "i") }
    }

    let appointmentFilterData = {}


    if(req.body.dateAfter && req.body.dateBefore)
      appointmentFilterData = {$and: [{'date': { $gte: req.body.dateAfter }}, {'date': { $lte: req.body.dateBefore }}]}

    else if(req.body.dateAfter)
      appointmentFilterData['date'] = { $gte: req.body.dateAfter }

    else if(req.body.dateBefore)
      appointmentFilterData['date'] = { $lte: req.body.dateBefore }


    let filteredAppointments = await appointmentService.filterPatientAppointments(req.params.id, doctorFilterData, appointmentFilterData);
    filteredAppointments = filteredAppointments.filter(app => app.doctor != null)
    res.send(filteredAppointments)
  }

  async getDoctorAppointments(req, res) {
    res.send(await appointmentService.getDoctorAppointments(req.params.id))
  }

  async createPatientAppointment(req, res) {   
    res.send(await appointmentService.createPatientAppointment(req.user.profile._id, req.body.doctor, req.body.date))
  }

  async confirmAppointment(req, res) {   
    res.send(await appointmentService.confirmPatientAppointment(req.params.id))
  }

  async rejectAppointment(req, res) {   
    res.send(await appointmentService.rejectPatientAppointment(req.params.id))
  }
}

module.exports = new AppointmentsApi()
