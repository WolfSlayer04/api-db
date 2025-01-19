const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./db');
const usersRoutes = require('./routes/users');
const patientsRoutes = require('./routes/patients');
const nursesRoutes = require('./routes/nurses');
const serviceRequestRoutes = require('./routes/serviceRequests');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

// Configuración de Swagger con Autorización JWT
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'Documentación de la API con autenticación JWT',
        },
        servers: [
            {
                url: `https://api-soonwe-blue.onrender.com/`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: "Agrega aquí tu token JWT para autenticación",
                },
            },
            schemas: {
                User: { // Define el esquema User aquí
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                        },
                        user_name: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                        },
                        foto: {
                            type: 'string',
                        },
                        verificado: {
                            type: 'string',
                        },
                        comidaFavorita: {
                            type: 'string',
                        },
                        descuentoNavideño: {
                            type: 'number',
                        },
                    },
                    required: ['name', 'user_name', 'password'], // Campos requeridos
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/users', usersRoutes);
app.use('/patients', patientsRoutes);
app.use('/nurses', nursesRoutes);
app.use('/service-requests', serviceRequestRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/api-docs`);
});
