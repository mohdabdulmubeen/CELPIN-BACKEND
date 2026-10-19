import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { REWARD_ITEMS, MEMBERSHIP_TIERS } from '../data/rewardsData.js';

const router = Router();

// GET /api/rewards
router.get('/', async (req, res) => {
  try {
    let profile = await prisma.userProfile.findUnique({
      where: { id: 'user_1' }
    });

    if (!profile) {
      profile = await prisma.userProfile.create({
        data: { id: 'user_1' }
      });
    }

    const activity = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      profile,
      rewards: REWARD_ITEMS,
      tiers: MEMBERSHIP_TIERS,
      activity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rewards from database' });
  }
});

// POST /api/rewards/redeem
router.post('/redeem', async (req, res) => {
  const { rewardId } = req.body;
  const reward = REWARD_ITEMS.find(r => r.id === rewardId);

  if (!reward) {
    return res.status(404).json({ error: 'Reward not found' });
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { id: 'user_1' }
    });

    if (!profile || profile.credits < reward.creditCost) {
      return res.status(400).json({
        error: `Insufficient credits. You need ${reward.creditCost} credits.`
      });
    }

    const updatedProfile = await prisma.userProfile.update({
      where: { id: 'user_1' },
      data: {
        credits: profile.credits - reward.creditCost,
        totalSaved: profile.totalSaved + (reward.creditCost * 1.5)
      }
    });

    const newActivity = await prisma.activityLog.create({
      data: {
        type: 'redeemed',
        title: 'Redeemed reward',
        credits: -reward.creditCost,
        description: reward.name,
        date: 'Just now'
      }
    });

    const allActivities = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      message: `Successfully redeemed "${reward.name}"!`,
      profile: updatedProfile,
      activity: allActivities
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process redemption' });
  }
});

export default router;
