const router = require('express').Router()
const authMiddleware = require('../auth/authMiddleware')

const appointmentsApi = require('./appointmentsApi')
const patientApi = require('./patientApi')

router.get('/patient/:id/appointments', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), appointmentsApi.getPatientAppointments)
router.get('/doctor/:id/appointments', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.getDoctorAppointments)
router.post('/appointments/make', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), appointmentsApi.createPatientAppointment)
router.post('/appointments/confirm', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.confirmAppointment)
router.post('/appointments/reject', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.rejectAppointment)



router.get('/patient/:id/my-doctors', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.getDoctors)
module.exports = router