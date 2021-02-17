const patientModel = require('../models/patientModel')
const mongoose = require('mongoose')

class PatientService {
    async getPatientDoctors(id) {
        return patientModel.findOne({_id: id}).populate('doctors')
    }

    async filterPatientDoctors(id, filterData) {
        return patientModel.findOne({_id: id}).populate({
            path: 'doctors',
            match: filterData
        })
    }
}

module.exports = new PatientService()
