const appointmentModel = require('../models/appointmentModel')
const mongoose = require('mongoose')

class AppointmentService {

    async getPatientAppointments(id) {
        return appointmentModel.find({patient: mongoose.Types.ObjectId(id)}).populate('doctor')
    }

    async filterPatientAppointments(id, filterData, appointmentFilterData) {
        appointmentFilterData.patient = mongoose.Types.ObjectId(id)
        return appointmentModel.find(appointmentFilterData).populate(
            {
                path: 'doctor',
                match: filterData
            }
        )
    }

    async getDoctorAppointments(id) {
        return appointmentModel.find({doctor: mongoose.Types.ObjectId(id)}).populate('patient')
    }

    async createPatientAppointment(patientId, doctorId, date, note) {
        return appointmentModel.create({
            patient: mongoose.Types.ObjectId(patientId),
            doctor: mongoose.Types.ObjectId(doctorId),
            date,
            note
        })
    }

    async confirmPatientAppointment(id) {
        const appointment = await appointmentModel.findOne({_id: mongoose.Types.ObjectId(id)})
        appointment.status = 'confirmed'
        return appointment.save()
    }

    async rejectPatientAppointment(id) {
        const appointment = await appointmentModel.findOne({_id: mongoose.Types.ObjectId(id)})
        appointment.status = 'rejected'
        return appointment.save()
    }
}

module.exports = new AppointmentService()
