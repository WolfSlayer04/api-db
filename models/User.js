const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  edad: Number,
});

// Asegúrate de especificar el nombre exacto de la colección aquí
module.exports = mongoose.model('User', userSchema, 'Colección Usuarios2');
