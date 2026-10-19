export interface UserRewardsProfile {
  credits: number;
  hoursBooked: number;
  totalSaved: number;
  freeCoffeesReady: number;
  currentTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  lifetimePoints: number;
  nextTierPoints: number;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  icon: string;
}

export interface ActivityLog {
  id: string;
  type: 'earned' | 'redeemed' | 'bonus';
  title: string;
  credits: number;
  description: string;
  date: string;
}

export interface MembershipTier {
  name: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  pointsRequired: number;
  icon: string;
  perks: string[];
}

export const INITIAL_USER_PROFILE: UserRewardsProfile = {
  credits: 320,
  hoursBooked: 47,
  totalSaved: 1200,
  freeCoffeesReady: 2,
  currentTier: 'Gold',
  lifetimePoints: 820,
  nextTierPoints: 1000
};

export const REWARD_ITEMS: RewardItem[] = [
  {
    id: 'free-hour',
    name: 'Dedicated Focus Session',
    description: 'Redeem for an extended workspace session',
    creditCost: 150,
    icon: 'clock'
  },
  {
    id: 'free-cappuccino',
    name: 'Free Cappuccino',
    description: 'A fresh cappuccino, on the house',
    creditCost: 50,
    icon: 'coffee'
  },
  {
    id: 'discount-100',
    name: 'Priority Pass Upgrade',
    description: 'Instant upgrade to executive cabin',
    creditCost: 200,
    icon: 'gift'
  },
  {
    id: 'free-premium-hour',
    name: 'Executive Suite Access',
    description: 'Access to our premium ergonomic suite',
    creditCost: 250,
    icon: 'crown'
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    name: 'Bronze',
    pointsRequired: 0,
    icon: 'star',
    perks: ['1 credit per booking session', 'Access to all zones']
  },
  {
    name: 'Silver',
    pointsRequired: 500,
    icon: 'zap',
    perks: ['1.5 credits per session', 'Complimentary café upgrades', 'Priority seat notifications']
  },
  {
    name: 'Gold',
    pointsRequired: 1000,
    icon: 'crown',
    perks: ['2 credits per session', 'Priority café perks', 'Complimentary beverage every 10 visits', 'Early access to premium seats']
  },
  {
    name: 'Platinum',
    pointsRequired: 2500,
    icon: 'award',
    perks: ['3 credits per session', 'Priority access across all zones', 'Guaranteed seat reservation', 'Unlimited quiet pod reservations']
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    type: 'earned',
    title: 'Earned credits',
    credits: 40,
    description: '3h at Window Seat W3',
    date: 'Aug 20'
  },
  {
    id: 'act-2',
    type: 'redeemed',
    title: 'Redeemed reward',
    credits: -50,
    description: 'Free Cappuccino',
    date: 'Aug 18'
  },
  {
    id: 'act-3',
    type: 'earned',
    title: 'Earned credits',
    credits: 60,
    description: '4h at Premium Desk P1',
    date: 'Aug 15'
  },
  {
    id: 'act-4',
    type: 'bonus',
    title: 'Bonus credits',
    credits: 30,
    description: 'Gold tier bonus',
    date: 'Aug 12'
  },
  {
    id: 'act-5',
    type: 'earned',
    title: 'Earned credits',
    credits: 24,
    description: '2h at Quiet Zone Q1',
    date: 'Aug 10'
  }
];

