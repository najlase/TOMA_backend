const doctorModel = require('../models/doctorModel')

class DoctorService {
    async getDoctorById(id) {
        return doctorModel.findOne({_id: id})
    }

    async getAll() {
        return doctorModel.find({})
    }

    async filter(filterData) {
        return doctorModel.find(filterData)
    }

    async getInvitations(id){
        let doctor = await doctorModel.findOne({_id: id}).populate("connectionRequests.patient")
        return doctor.connectionRequests
    }

    async getArchievedPatients(id) {
        let doctor = await doctorModel.findOne({_id: id}).populate("archievedPatients.patient")
        return doctor.archievedPatients
    }

    async getPatients(id) {
        let doctor = await doctorModel.findOne({_id: id}).populate("patients")
        return doctor.patients
    }
}

module.exports = new DoctorService()
