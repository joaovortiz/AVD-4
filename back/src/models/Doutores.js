const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const DoctorSchema = new mongoose.Schema({
  nome: String,
  especialidade: String,
}, {
  timestamps: true
})
DoctorSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Doctors', DoctorSchema)
