const userModel = require('../models/User')
const patientModel = require('../models/patientModel')
const mongoose = require('mongoose')

class PatientService {
    async getPatientDoctors(id) {
        return patientModel.findOne({ _id: id }).populate('doctors')
    }

    async getInvitations(id){
        let patient = await patientModel.findOne({_id: id}).populate("connectionRequests.doctor")
        return patient.connectionRequests
    }

    async filterPatientDoctors(id, filterData) {
        return patientModel.findOne({ _id: id }).populate({
            path: 'doctors',
            match: filterData
        })
    }

    async updateProfile(id, profileData) {
        let user = await userModel.findById(id)
        if (profileData.password != "") {
            user.password = profileData.password
        }
        user.email = profileData.email
        await user.save()

        let patient = await patientModel.findOne({User: id})
        patient.firstName = profileData.firstName
        patient.lastName = profileData.lastName
        if (profileData.profilePicture != ""){
            patient.img = profileData.profilePicture
        }
        await patient.save()

        user = user.toObject()
        delete user.password
        user.profile = patient.toObject()
        
        return user
    }
}

module.exports = new PatientService()
