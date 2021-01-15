const patientModel = require('../models/patientModel')
const mongoose = require('mongoose')

class PatientService {
    async getPatientDoctors(id) {
        return patientModel.findOne({_id: id}).populate('doctors')
    }
}

module.exports = new PatientService()