import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { ZONES } from '../data/seatsData.js';

const router = Router();

// GET /api/seats
router.get('/', async (req, res) => {
  try {
    const rawSeats = await prisma.seat.findMany();
    const seats = rawSeats.map(s => ({
      id: s.id,
      name: s.name,
      zone: s.zone,
      status: s.status,
      hourlyRate: s.hourlyRate,
      coordinates: { x: s.coordX, y: s.coordY },
      amenities: JSON.parse(s.amenities || '[]'),
      description: s.description
    }));

    const availableCount = seats.filter(s => s.status === 'available').length;
    const occupiedCount = seats.filter(s => s.status === 'occupied').length;
    const reservedCount = seats.filter(s => s.status === 'reserved').length;

    res.json({
      zones: ZONES,
      seats,
      stats: {
        total: seats.length,
        available: availableCount,
        occupied: occupiedCount,
        reserved: reservedCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seats from database' });
  }
});

// GET /api/seats/:id
router.get('/:id', async (req, res) => {
  try {
    const seat = await prisma.seat.findUnique({
      where: { id: req.params.id.toUpperCase() }
    });
    if (!seat) return res.status(404).json({ error: 'Seat not found' });

    res.json({
      seat: {
        ...seat,
        coordinates: { x: seat.coordX, y: seat.coordY },
        amenities: JSON.parse(seat.amenities || '[]')
      },
      zoneInfo: ZONES[seat.zone]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seat' });
  }
});

// PATCH /api/seats/:id/status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['available', 'occupied', 'reserved'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const updated = await prisma.seat.update({
      where: { id: req.params.id.toUpperCase() },
      data: { status }
    });
    res.json({ message: 'Seat status updated in SQLite DB', seat: updated });
  } catch (error) {
    res.status(404).json({ error: 'Seat not found' });
  }
});

export default router;
