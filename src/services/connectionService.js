const doctorModel = require('../models/doctorModel')
const patientModel = require('../models/patientModel')
const mongoose = require('mongoose')

class ConnectionService {
    async createConnectionRequest(patientId, doctorId) {
        let doctor = await doctorModel.findById(doctorId)
        let patient = await patientModel.findById(patientId)
        let date = Date.now()

        if (!doctor.connectionRequests)
            doctor.connectionRequests = [];

        if (!patient.connectionRequests)
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

        console.log(patient)
        console.log(doctor)

        let doctorIndex = doctor.connectionRequests.findIndex(request => request.patient == patientId)
        let patientIndex = patient.connectionRequests.findIndex(request => request.doctor == doctorId)

        console.log(patientIndex)

        doctor.connectionRequests.splice(doctorIndex, 1);
        patient.connectionRequests.splice(patientIndex, 1);


        await doctor.save()
        await patient.save()
    }

    async acceptConnectionRequest(doctorId, patientId) {
        let doctor = await doctorModel.findById(doctorId)
        let patient = await patientModel.findById(patientId)

        doctor.patients.push(patient._id)
        patient.doctors.push(doctor._id)

        let indexDoctor = doctor.connectionRequests.findIndex(request => request.patient == patientId)
        let indexPatient = patient.connectionRequests.findIndex(request => request.doctor == doctorId)

        doctor.connectionRequests.splice(indexDoctor,1)
        patient.connectionRequests[indexPatient].state = 'Accepted'
        patient.connectionRequests[indexPatient].date = Date.now()

        if(doctor.archievedPatients) {   
        let archivedIndexPatient = doctor.archievedPatients.findIndex(p => p.patient == patientId)
        doctor.archievedPatients.splice(archivedIndexPatient,1)
        }

        await doctor.save()
        await patient.save()
    }

    async rejectConnectionRequest(doctorId, patientId) {
        let doctor = await doctorModel.findById(doctorId)
        let patient = await patientModel.findById(patientId)

        let indexDoctor = doctor.connectionRequests.findIndex(request => request.patient == patientId)
        let indexPatient = patient.connectionRequests.findIndex(request => request.doctor == doctorId)

        doctor.connectionRequests.splice(indexDoctor,1)
        patient.connectionRequests[indexPatient].state = 'Rejected'
        patient.connectionRequests[indexPatient].date = Date.now()

        await doctor.save()
        await patient.save()
    }

    async removeConnection(doctorId, patientId) {
        let doctor = await doctorModel.findById(doctorId)
        let patient = await patientModel.findById(patientId)

        let patientIndex = doctor.patients.findIndex(p => p == patientId)
        let doctorIndex = patient.doctors.findIndex(d => d == doctorId)

        doctor.patients.splice(patientIndex,1)
        patient.doctors.splice(doctorIndex,1)
        
        if(!doctor.archievedPatients)
            doctor.archievedPatients = []

        doctor.archievedPatients.push({patient: patient._id, date: Date.now()})

        let requestIndexPatient = patient.connectionRequests.findIndex(request => request.doctor == doctorId)
        patient.connectionRequests.splice(requestIndexPatient,1)

        await doctor.save()
        await patient.save()
    }
}

module.exports = new ConnectionService()
