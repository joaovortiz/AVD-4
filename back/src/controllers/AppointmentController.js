const Exame = require('../models/Exames')
const Doutor = require('../models/Doutores')
const Paciente = require('../models/Pacientes')

module.exports = {
  // Lista os Appointments do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { doutor_id: { $regex: '.*' + termo + '.*' } },
        { paciente_id: { $regex: '.*' + termo + '.*' } },
        { data: { $regex: '.*' + termo + '.*' } },
        { hora: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const exame = await Exame.paginate(search, { sort: `-${sort}`});
    let array = []

    const someFunction = (myArray) => {
      const promises = myArray.map(async (o) => {
        const doutor = await Doutor.paginate({_id: o.doutor_id});
        const paciente = await Paciente.paginate({_id: o.paciente_id});
        return {
          _id: o._id,
          doutor_id: o.doutor_id,
          doutor: doutor.docs[0],
          paciente_id: o.paciente_id,
          paciente: paciente.docs[0],
          data: o.data,
          hora: o.hora,
          createdAt: o.createdAt,
          updatedAt: o.updatedAt,
          __v: o.__v
        }
      });
      return Promise.all(promises);
  }

    array = await someFunction(exame.docs)
    exame.docs = array
    return res.json(exame)
  },
  
  // Retoma Exame requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const o = await Exame.findById(id);
    const doutor = await Doutor.paginate({_id: o.doutor_id});
    const paciente = await Paciente.paginate({_id: o.paciente_id});
    exame = {
      _id: o._id,
      doutor_id: o.doutor_id,
      doutor: doutor.docs[0],
      paciente_id: o.paciente_id,
      paciente: paciente.docs[0],
      data: o.data,
      hora: o.hora,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
      __v: o.__v
    }
    return res.status(200).json(exame)
  },

  // gravar os exames
  async store(req, res) {
    try {
      let exame = await Exame.create(req.body)
      const id = exame._id
      delete exame._id

      await Exame.findByIdAndUpdate( { _id: id }, exame )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o exame
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Exame.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o exame
  async update(req, res) {
    const { id } = req.params
    const exame = await Exame.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(exame)
  },
}
