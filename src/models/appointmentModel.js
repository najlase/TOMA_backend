const mongoose = require("mongoose")

const AppointmentSchema = new mongoose.Schema({    
doctor: {
    type: mongoose.Types.ObjectId,
    ref: 'Doctor',
    required: true
},
patient: {
    type: mongoose.Types.ObjectId,
    ref: 'Patient',
    required: true
},
date: {
    type: Date,
    required: true
},
note: String,
status: {
    type: String,
    enum: ["pending", "confirmed", "rejected"],
    default: "pending",
}
});

let model =  mongoose.model("Appointment", AppointmentSchema)
module.exports = model