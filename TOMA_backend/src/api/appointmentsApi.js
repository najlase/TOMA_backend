const appointmentService = require('../services/appointmentService')

class AppointmentsApi {

  async getPatientAppointments(req, res) {
    if(req.user.role == 'Patient' && req.params.id !== req.user.profile._id)
      return res.sendStatus(403)

    res.send(await appointmentService.getPatientAppointments(req.params.id))
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
