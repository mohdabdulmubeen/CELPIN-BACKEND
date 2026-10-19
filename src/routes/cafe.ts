import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

// GET /api/cafe/menu
router.get('/menu', async (req, res) => {
  const { category } = req.query;

  try {
    const whereClause = category && typeof category === 'string' && category !== 'all'
      ? { category }
      : {};

    const items = await prisma.menuItem.findMany({
      where: whereClause
    });

    const popular = items.filter(i => i.isPopular);

    res.json({
      items,
      popular,
      categories: ['coffee', 'tea', 'snacks', 'meals', 'desserts']
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu from DB' });
  }
});

export default router;
