const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const eventController = require('../controllers/eventController');
const attendeeController = require('../controllers/attendeeController');

// Eventos
router.post('/', authenticateToken, eventController.createEvent);
router.get('/', eventController.listEvents);
router.get('/:id', eventController.getEventDetails);
router.put('/:id', authenticateToken, eventController.updateEvent);
router.delete('/:id', authenticateToken, eventController.deleteEvent);

// Asistentes
router.get('/:id/attendees', attendeeController.listAttendees);
router.post('/:id/attendees', authenticateToken, attendeeController.confirmAttendance);

// Estadísticas
router.get('/:id/insights', eventController.getEventInsights);

module.exports = router;
