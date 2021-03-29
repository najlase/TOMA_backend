const router = require('express').Router()
const authMiddleware = require('../auth/authMiddleware')

const appointmentsApi = require('./appointmentsApi')
const patientApi = require('./patientApi')
const doctorsApi = require('./doctorApi')
const doctorApi = require('./doctorApi')

router.get('/patient/:id/appointments', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), appointmentsApi.getPatientAppointments)
router.post('/patient/:id/appointments/filter', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), appointmentsApi.filterPatientAppointments)
router.get('/doctor/:id/appointments', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.getDoctorAppointments)
router.get('/doctor/requests', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), doctorsApi.getInvitations)
router.get('/doctor/requests/accept/:patientId', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), doctorsApi.acceptInvitation)
router.get('/doctor/requests/reject/:patientId', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), doctorsApi.rejectInvitation)
router.post('/appointments/make', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), appointmentsApi.createPatientAppointment)
router.get('/doctor/patients/archieved', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), doctorsApi.getArchievedPatients)
router.get('/doctor/my-patients', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), doctorsApi.getPatients)


router.post('/appointments/:id/confirm', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.confirmAppointment)
router.post('/appointments/:id/reject', (req, res, next) => authMiddleware.authorize(req, res, next, 'Doctor'), appointmentsApi.rejectAppointment)

router.get('/doctors', (req, res, next) => authMiddleware.authorize(req, res, next, ['Doctor', 'Patient']), doctorsApi.getAll)
router.post('/doctors/filter', (req, res, next) => authMiddleware.authorize(req, res, next, ['Doctor', 'Patient']), doctorsApi.filter)


router.get('/patient/:id/my-doctors', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.getDoctors)
router.get('/patient/requests', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.getInvitations)
router.post('/patient/:id/my-doctors/filter', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.filterDoctors)
router.patch('/patient/:id/profile', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.updateProfile)
router.post('/patient/:id/connect/doctor/:doctorId', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.connect)
router.delete('/patient/:id/connect/doctor/:doctorId', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.removeConnectionRequest)
router.delete('/patient/connections/doctor/:doctorId', (req, res, next) => authMiddleware.authorize(req, res, next, 'Patient'), patientApi.removeConnection)

module.exports = router
