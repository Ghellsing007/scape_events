const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Scape Events funcionando correctamente' });
});

// Ruta para obtener todos los eventos
app.get('/api/events', async (req, res) => {
  try {
    // Verificar conexión con la base de datos
    await prisma.$connect();
    
    const events = await prisma.event.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!events || events.length === 0) {
      return res.status(404).json({ 
        error: 'No se encontraron eventos',
        message: 'La base de datos está vacía o no hay eventos registrados'
      });
    }

    res.json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ 
      error: 'Error al obtener los eventos',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      code: error.code
    });
  } finally {
    await prisma.$disconnect();
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log('Modo:', process.env.NODE_ENV || 'development');
}); 