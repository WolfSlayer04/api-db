const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Generar un token
function generateToken(userId, role) {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Middleware para autenticar el token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token no válido' });

    // Validación opcional: Si `userId` es String, no hace falta validarlo como ObjectId
    if (!user.userId) {
      return res.status(400).json({ message: 'No se encontró el userId en el token' });
    }

    // Si todo está bien, almacenamos `userId` y `role` en `req.user_id`
    req.user_id = { userId: user.userId, role: user.role };
    next();
  });
}

module.exports = { generateToken, authenticateToken };
