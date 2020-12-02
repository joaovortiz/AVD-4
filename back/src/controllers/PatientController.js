const Paciente = require('../models/Pacientes')

module.exports = {
  // Lista os Patients do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { nome: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const paciente = await Paciente.paginate(search, { sort: `-${sort}`});
    return res.json(paciente)
  },
  
  // Retoma Paciente requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const paciente = await Paciente.findById(id);
    return res.status(200).json(paciente)
  },

  // gravar os pacientes
  async store(req, res) {
    try {
      let paciente = await Paciente.create(req.body)
      const id = paciente._id
      delete paciente._id

      await Paciente.findByIdAndUpdate( { _id: id }, paciente )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o paciente
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Paciente.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o paciente
  async update(req, res) {
    const { id } = req.params
    const paciente = await Paciente.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(paciente)
  },
}
