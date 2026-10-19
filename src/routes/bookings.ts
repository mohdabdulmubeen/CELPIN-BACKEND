import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { calculatePricing } from './pricingHelper.js';

const router = Router();

// POST /api/bookings
router.post('/', async (req, res) => {
  const {
    seatId,
    zone = 'quiet',
    duration = 1,
    preferences = [],
    orderItems = [],
    discount = 0,
    customerName = 'Guest Member',
    customerEmail = 'member@celpin.cafe'
  } = req.body;

  if (!seatId) {
    return res.status(400).json({ error: 'Seat ID is required' });
  }

  const durationHours = Math.min(6, Math.max(1, Number(duration)));
  const pricing = calculatePricing(zone, durationHours, orderItems, Number(discount));

  const bookingRef = `CEL-${Math.floor(100000 + Math.random() * 900000)}`;
  const pin = `${Math.floor(1000 + Math.random() * 9000)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`CELPIN-PASS:${bookingRef}:${seatId}:${pin}`)}`;

  try {
    const newBooking = await prisma.booking.create({
      data: {
        bookingRef,
        seatId: seatId.toUpperCase(),
        zone,
        durationHours,
        preferences: JSON.stringify(preferences),
        seatCost: pricing.seatCost,
        foodCost: pricing.foodCost,
        discount: pricing.discount,
        totalCost: pricing.totalCost,
        dailyCapApplied: pricing.dailyCapApplied,
        pin,
        qrCodeUrl,
        status: 'confirmed',
        customerName,
        customerEmail,
        orderItems: JSON.stringify(orderItems)
      }
    });

    res.status(201).json({
      message: 'Booking saved to SQLite database successfully',
      booking: {
        ...newBooking,
        preferences: JSON.parse(newBooking.preferences),
        orderItems: JSON.parse(newBooking.orderItems)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking in database' });
  }
});

// GET /api/bookings
router.get('/', async (req, res) => {
  try {
    const list = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({
      bookings: list.map(b => ({
        ...b,
        preferences: JSON.parse(b.preferences || '[]'),
        orderItems: JSON.parse(b.orderItems || '[]')
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  try {
    const param = req.params.id;
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id: param }, { bookingRef: param }]
      }
    });

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    res.json({
      booking: {
        ...booking,
        preferences: JSON.parse(booking.preferences || '[]'),
        orderItems: JSON.parse(booking.orderItems || '[]')
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// POST /api/bookings/:id/check-in
router.post('/:id/check-in', async (req, res) => {
  try {
    const param = req.params.id;
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id: param }, { bookingRef: param }]
      }
    });

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'checked-in' }
    });

    res.json({
      message: 'Check-in successful! Welcome to Celpin.',
      booking: updated
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process check-in' });
  }
});

export default router;
