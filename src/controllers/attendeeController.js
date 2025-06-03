const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listAttendees = async (req, res) => {
  const eventId = parseInt(req.params.id);

  try {
    const attendees = await prisma.attendee.findMany({
      where: { eventId },
      include: { user: true },
    });
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo asistentes' });
  }
};

exports.confirmAttendance = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    const attendee = await prisma.attendee.upsert({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
      update: { confirmed: true },
      create: {
        userId,
        eventId,
        confirmed: true,
      },
    });
    res.json(attendee);
  } catch (error) {
    res.status(500).json({ error: 'Error confirmando asistencia' });
  }
};
