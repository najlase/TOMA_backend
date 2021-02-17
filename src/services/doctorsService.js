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
}

module.exports = new DoctorService()
