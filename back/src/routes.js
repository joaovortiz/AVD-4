const { Router } = require('express')
const multer = require('multer')
const DoctorController = require('./controllers/DoctorController')
const PatientController = require('./controllers/PatientController')
const AppointmentController = require('./controllers/AppointmentController')
const uploadConfig = require('./config/upload')
const routes = new Router();

const upload = multer(uploadConfig)

routes.get('/doutores', DoctorController.index)
routes.post('/doutores', DoctorController.store)
routes.put('/doutores/:id', DoctorController.update)
routes.delete('/doutores/:id', DoctorController.destroy)
routes.get('/doutores/:id', DoctorController.show)

routes.get('/pacientes', PatientController.index)
routes.post('/pacientes', PatientController.store)
routes.put('/pacientes/:id', PatientController.update)
routes.delete('/pacientes/:id', PatientController.destroy)
routes.get('/pacientes/:id', PatientController.show)

routes.get('/exames', AppointmentController.index)
routes.post('/exames', AppointmentController.store)
routes.put('/exames/:id', AppointmentController.update)
routes.delete('/exames/:id', AppointmentController.destroy)
routes.get('/exames/:id', AppointmentController.show)

module.exports = routes