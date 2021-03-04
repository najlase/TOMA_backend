const doctorModel = require('../models/doctorModel')
const patientModel = require('../models/patientModel')
const mongoose = require('mongoose')

class ConnectionService {
    async createConnectionRequest(patientId, doctorId) {
        let doctor = await doctorModel.findById(doctorId)
        let patient = await patientModel.findById(patientId)
        let date = Date.now()

        if(!doctor.connectionRequests)
            doctor.connectionRequests = [];

        if(!patient.connectionRequests)
            patient.connectionRequests = [];


        doctor.connectionRequests.push({
            patient: mongoose.Types.ObjectId(patientId),
            date: date
        })

        patient.connectionRequests.push({
            doctor: mongoose.Types.ObjectId(doctorId),
            date: date
        })

        await doctor.save()
        await patient.save()
    }

    async removeConnectionRequest(patientId, doctorId) {
        let doctor = await doctorModel.findById(doctorId)
        let patient = await patientModel.findById(patientId)


        let doctorIndex = doctor.connectionRequests.indexOf(mongoose.Types.ObjectId(patientId));
        let patientIndex = patient.connectionRequests.indexOf(mongoose.Types.ObjectId(doctorId));

        doctor.connectionRequests.splice(doctorIndex, 1);
        patient.connectionRequests.splice(patientIndex, 1);


        await doctor.save()
        await patient.save()
    }
}

module.exports = new ConnectionService()
