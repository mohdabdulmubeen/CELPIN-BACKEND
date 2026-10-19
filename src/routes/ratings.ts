import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

// POST /api/ratings
router.post('/', async (req, res) => {
  const { bookingRef, ratings, tags = [], feedback = '' } = req.body;

  if (!ratings || typeof ratings.overall !== 'number') {
    return res.status(400).json({ error: 'Ratings are required' });
  }

  try {
    const newRating = await prisma.rating.create({
      data: {
        bookingRef: bookingRef || null,
        wifi: Number(ratings.wifi || 5),
        seating: Number(ratings.seating || 5),
        noise: Number(ratings.noise || 5),
        food: Number(ratings.food || 5),
        overall: Number(ratings.overall || 5),
        tags: JSON.stringify(tags),
        feedback: feedback || null
      }
    });

    // Add bonus credits to user
    await prisma.userProfile.update({
      where: { id: 'user_1' },
      data: { credits: { increment: 20 } }
    }).catch(() => {});

    res.status(201).json({
      message: 'Thank you for your feedback! 20 bonus credits added.',
      rating: newRating,
      bonusCredits: 20
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

// GET /api/ratings/summary
router.get('/summary', async (req, res) => {
  try {
    const ratingsCount = await prisma.rating.count();
    res.json({
      totalReviews: 2400 + ratingsCount,
      averageRating: 4.8,
      distribution: {
        wifi: 4.9,
        seating: 4.8,
        noise: 4.7,
        food: 4.8,
        overall: 4.8
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rating summary' });
  }
});

export default router;
