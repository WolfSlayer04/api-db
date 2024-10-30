const express = require('express');
const connectDB = require('./db'); // Conexión a la base de datos
const User = require('./models/User'); // Modelo de Usuarios2
const Nurse = require('./models/Nurse'); // Modelo de Enfermeros
const Patient = require('./models/Patient'); // Modelo de Pacientes
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
      title: 'API de Usuarios, Enfermeros y Pacientes en MongoDB',
      version: '1.0.0',
      description: 'API para manejar los usuarios, enfermeros y pacientes en MongoDB',
    },
    servers: [
      {
        url: `https://api-db-gag2.onrender.com`,
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
 *               name:
 *                 type: string
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *               foto:
 *                 type: string
 *               verificado:
 *                 type: string
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
 *               name:
 *                 type: string
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *               foto:
 *                 type: string
 *               verificado:
 *                 type: string
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
 *               name:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *               genero:
 *                 type: string
 *               movilidad:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               usuario_id:
 *                 type: string
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
 *               name:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *               genero:
 *                 type: string
 *               movilidad:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               usuario_id:
 *                 type: string
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

/* --------------------- CRUD Pacientes --------------------- */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Obtiene todos los pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pacientes' });
  }
});

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Crea un nuevo paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *               genero:
 *                 type: string
 *               movilidad:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               usuario_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente creado
 */
app.post('/patients', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el paciente' });
  }
});

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Actualiza un paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *               genero:
 *                 type: string
 *               movilidad:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               usuario_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente actualizado
 */
app.put('/patients/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el paciente' });
  }
});

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Elimina un paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
 *     responses:
 *       204:
 *         description: Paciente eliminado
 */
app.delete('/patients/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paciente' });
  }
});
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *               foto:
 *                 type: string
 *               verificado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
app.post('/register', async (req, res) => {
    try {
      const { name, user_name, password, foto, verificado } = req.body;
  
      // Aquí puedes agregar lógica para encriptar la contraseña si es necesario
      const newUser = new User({ name, user_name, password, foto, verificado });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Error al registrar el usuario' });
    }
  });

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */
app.post('/login', async (req, res) => {
    const { user_name, password } = req.body;

    try {
        // Busca el usuario por nombre de usuario y contraseña
        const user = await User.findOne({ user_name, password });

        // Si no se encuentra el usuario, responder con 401
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Si se encuentra el usuario, responde con 200
        res.status(200).json({ message: 'Usuario autenticado' });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

/**
 * @swagger
 * /nurses:
 *   get:
 *     summary: Busca enfermeros por especialidad
 *     parameters:
 *       - in: query
 *         name: specialty
 *         schema:
 *           type: string
 *         required: true
 *         description: Especialidad del enfermero
 *     responses:
 *       200:
 *         description: Lista de enfermeros encontrados
 *       404:
 *         description: No se encontraron enfermeros
 *       500:
 *         description: Error en el servidor
 */
app.get('/nurses', async (req, res) => {
    const { specialty } = req.query;

    try {
        // Busca enfermeros por especialidad
        const nurses = await Nurse.find({ specialty });

        // Si no se encuentran enfermeros, responde con 404
        if (nurses.length === 0) {
            return res.status(404).json({ message: 'No se encontraron enfermeros' });
        }

        // Responde con la lista de enfermeros encontrados
        res.status(200).json(nurses);
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

/**
 * @swagger
 * /nurses/all:
 *   get:
 *     summary: Obtiene la lista de todos los enfermeros
 *     responses:
 *       200:
 *         description: Lista de todos los enfermeros
 *       500:
 *         description: Error en el servidor
 */
app.get('/nurses/all', async (req, res) => {
    try {
        // Obtiene todos los enfermeros
        const nurses = await Nurse.find();

        // Responde con la lista de enfermeros
        res.status(200).json(nurses);
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({ message: 'Error en el servidor' });
    }
});




// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}/api-docs`);
});
