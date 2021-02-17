const mongoose = require("mongoose")

const DoctorSchema = new mongoose.Schema({    
firstName: {
    type: String,
    required: true
},
lastName: {
    type: String,
    required: true
},
patients: [{
    type: mongoose.Types.ObjectId,
    ref: 'Patient',
}],
birthday: {
    type: Date,
    required: true
},
specialty: {
    type: String,
    required: true
},
img: String
});

let model =  mongoose.model("Doctor", DoctorSchema)
module.exports = model