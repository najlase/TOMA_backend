const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    User: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    doctors: [{
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
    }],
    birthday: {
        type: Date,
        required: true
    },
    connectionRequests: [{
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: 'Doctor',
        },
        date: {
            type: Date
        }
    }],
    img: String
});
 
module.exports = mongoose.model("Patient", PatientSchema)
