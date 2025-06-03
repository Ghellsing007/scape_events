const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createEvent = async (req, res) => {
  const { title, description, category, date, location } = req.body;
  const userId = req.user.id;

  if (!title || !category || !date || !location)
    return res.status(400).json({ error: 'Faltan campos obligatorios' });

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        category,
        date: new Date(date),
        location,
        creatorId: userId,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error creando evento' });
  }
};

exports.listEvents = async (req, res) => {
  const { category, fromDate, toDate, sortBy } = req.query;

  let filters = {};
  if (category) filters.category = category;
  if (fromDate || toDate) filters.date = {};
  if (fromDate) filters.date.gte = new Date(fromDate);
  if (toDate) filters.date.lte = new Date(toDate);

  let order = {};
  if (sortBy === 'popular') order.likes = 'desc';
  else if (sortBy === 'date') order.date = 'asc';

  try {
    const events = await prisma.event.findMany({
      where: filters,
      orderBy: order,
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo eventos' });
  }
};

exports.getEventDetails = async (req, res) => {
  const eventId = parseInt(req.params.id);

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        attendees: { include: { user: true } },
      },
    });

    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo detalles del evento' });
  }
};

exports.updateEvent = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const userId = req.user.id;
  const data = req.body;

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
    if (event.creatorId !== userId)
      return res.status(403).json({ error: 'No autorizado' });

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data,
    });

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando evento' });
  }
};

exports.deleteEvent = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
    if (event.creatorId !== userId)
      return res.status(403).json({ error: 'No autorizado' });

    await prisma.event.delete({ where: { id: eventId } });
    res.json({ message: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando evento' });
  }
};

exports.getEventInsights = async (req, res) => {
  const eventId = parseInt(req.params.id);

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        attendees: true,
      },
    });

    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });

    const stats = {
      views: event.views,
      attendeesCount: event.attendees.length,
      likes: event.likes,
      interactionLevel: event.likes + event.attendees.length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo estadísticas' });
  }
};
