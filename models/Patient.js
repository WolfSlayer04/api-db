const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha_nacimiento: { type: String, required: true },
  genero: { type: String, required: true },
  movilidad: { type: String, required: true },
  descripcion: { type: String, required: true },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Patient = mongoose.model('Patient', patientSchema, 'Colección Pacientes');

module.exports = Patient;
