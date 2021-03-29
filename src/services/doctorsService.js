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
}

module.exports = new DoctorService()
