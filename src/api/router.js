const router = require('express').Router()
const authMiddleware = require('../auth/authMiddleware')

const appointmentsApi = require('./appointmentsApi')
const patientApi = require('./patientApi')
const doctorsApi = require('./doctorApi')

router.get('/patient/:id/appointments', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), appointmentsApi.getPatientAppointments)
router.post('/patient/:id/appointments/filter', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), appointmentsApi.filterPatientAppointments)
router.get('/doctor/:id/appointments', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.getDoctorAppointments)
router.post('/appointments/make', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), appointmentsApi.createPatientAppointment)
router.post('/appointments/:id/confirm', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.confirmAppointment)
router.post('/appointments/:id/reject', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.rejectAppointment)

router.get('/doctors', (req, res, next) => authMiddleware.authorize(req, res, next, ['Doctor', 'Patient']), doctorsApi.getAll)
router.post('/doctors/filter', (req, res, next) => authMiddleware.authorize(req, res, next, ['Doctor', 'Patient']), doctorsApi.filter)


router.get('/patient/:id/my-doctors', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.getDoctors)
router.post('/patient/:id/my-doctors/filter', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.filterDoctors)
module.exports = router
