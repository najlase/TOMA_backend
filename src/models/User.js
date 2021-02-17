const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Doctor', 'Patient', 'Admin'],
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);