const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const AppointmentSchema = new mongoose.Schema({
  doutor_id: String,
  paciente_id: String,
  data: String,
  hora: String,
}, {
  timestamps: true
})
AppointmentSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Appointments', AppointmentSchema)
