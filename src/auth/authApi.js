const UserModel = require('../models/User')
const jwt = require("jsonwebtoken")
const TOKEN = require('./consts').TOKEN

const patientModel = require('../models/patientModel')
const doctorModel = require('../models/doctorModel')

class AuthApi {

    async login(req, res) {
        const {email, password} = req.body
        const user = (await UserModel.findOne({email, password})).toObject()
        delete user.password

        console.log('logginIn', user)

        if (user.role == 'Patient') {
            user.profile = await patientModel.findOne({User: user._id})
        } else if (user.role == 'Doctor') {
            user.profile = await doctorModel.findOne({User: user._id})
        }
        const token = jwt.sign(JSON.stringify(user), TOKEN);
        res.json({token, user})
    }


    async register(req, res) {
        const {email, password, firstName, lastName, birthday} = req.body
        const user = (await UserModel.create({email, password, role: "Patient"})).toObject()
        delete user.password
        if (user.role == 'Patient') {
            user.profile = await patientModel.create({User: user._id, firstName, lastName, birthday})
        } else if (user.role == 'Doctor') {
            user.profile = await doctorModel.create({User: user._id, firstName, lastName, birthday})
        }
        console.log(user.profile)
        const token = jwt.sign(JSON.stringify(user), TOKEN);
        res.json({token, user})
    }
}

module.exports = new AuthApi();
