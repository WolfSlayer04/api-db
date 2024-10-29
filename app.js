const express = require('express');
const connectDB = require('./db'); // Conexión a la base de datos
const User = require('./models/User'); // Modelo de Usuarios2
const Nurse = require('./models/Nurse'); // Modelo de Enfermeros
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); // Middleware CORS

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Habilita el manejo de JSON

// Conectar a MongoDB
connectDB();

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios y Enfermeros MongoDB',
      version: '1.0.0',
      description: 'API para manejar los usuarios y enfermeros en MongoDB',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./app.js'], // Ruta al archivo con las anotaciones Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* --------------------- CRUD Usuarios --------------------- */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               edad:
 *                 type: number
 *     responses:
 *       201:
 *         description: Usuario creado
 */
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el usuario' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               edad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el usuario' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado
 */
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

/* --------------------- CRUD Enfermeros --------------------- */

/**
 * @swagger
 * /nurses:
 *   get:
 *     summary: Obtiene todos los enfermeros
 *     responses:
 *       200:
 *         description: Lista de enfermeros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/nurses', async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.json(nurses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los enfermeros' });
  }
});

/**
 * @swagger
 * /nurses/{id}:
 *   get:
 *     summary: Obtiene un enfermero por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del enfermero
 *     responses:
 *       200:
 *         description: Un enfermero
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get('/nurses/:id', async (req, res) => {
  try {
    const nurse = await Nurse.findById(req.params.id);
    nurse ? res.json(nurse) : res.status(404).json({ message: 'Enfermero no encontrado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el enfermero' });
  }
});

/**
 * @swagger
 * /nurses:
 *   post:
 *     summary: Crea un nuevo enfermero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               experiencia:
 *                 type: number
 *     responses:
 *       201:
 *         description: Enfermero creado
 */
app.post('/nurses', async (req, res) => {
  try {
    const newNurse = new Nurse(req.body);
    await newNurse.save();
    res.status(201).json(newNurse);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el enfermero' });
  }
});

/**
 * @swagger
 * /nurses/{id}:
 *   put:
 *     summary: Actualiza un enfermero por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del enfermero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               experiencia:
 *                 type: number
 *     responses:
 *       200:
 *         description: Enfermero actualizado
 */
app.put('/nurses/:id', async (req, res) => {
  try {
    const updatedNurse = await Nurse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNurse);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el enfermero' });
  }
});

/**
 * @swagger
 * /nurses/{id}:
 *   delete:
 *     summary: Elimina un enfermero por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del enfermero
 *     responses:
 *       204:
 *         description: Enfermero eliminado
 */
app.delete('/nurses/:id', async (req, res) => {
  try {
    await Nurse.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el enfermero' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
