const Doutor = require('../models/Doutores')

module.exports = {
  // Lista os Doctors do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { nome: { $regex: '.*' + termo + '.*' } },
        { especialidade: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const doutor = await Doutor.paginate(search, { sort: `-${sort}`});
    return res.json(doutor)
  },
  
  // Retoma Doutor requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const doutor = await Doutor.findById(id);
    return res.status(200).json(doutor)
  },

  // gravar os doutores
  async store(req, res) {
    try {
      let doutor = await Doutor.create(req.body)
      const id = doutor._id
      delete doutor._id

      await Doutor.findByIdAndUpdate( { _id: id }, doutor )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o doutor
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Doutor.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o doutor
  async update(req, res) {
    const { id } = req.params
    const doutor = await Doutor.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(doutor)
  },
}
