const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  especialidad: String,
  experiencia: Number,
});

// Especifica el nombre exacto de la colección
module.exports = mongoose.model('Nurse', nurseSchema, 'Colección Enfermeros');
