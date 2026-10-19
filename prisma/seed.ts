import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[Prisma Seed] Seeding database...');

  // 1. Clear existing data
  await prisma.activityLog.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.seat.deleteMany();
  await prisma.userProfile.deleteMany();

  // 2. Seed Seats
  const seats = [
    { id: 'Q1', name: 'Q1', zone: 'quiet', status: 'available', hourlyRate: 99, coordX: 15, coordY: 20, amenities: JSON.stringify(['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp']), description: 'Corner quiet desk with optimal acoustic dampening.' },
    { id: 'Q2', name: 'Q2', zone: 'quiet', status: 'occupied', hourlyRate: 99, coordX: 15, coordY: 40, amenities: JSON.stringify(['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp']), description: 'Central quiet desk with high partition screens.' },
    { id: 'Q3', name: 'Q3', zone: 'quiet', status: 'available', hourlyRate: 99, coordX: 15, coordY: 60, amenities: JSON.stringify(['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp']), description: 'Quiet desk positioned near library bookshelves.' },
    { id: 'Q4', name: 'Q4', zone: 'quiet', status: 'available', hourlyRate: 99, coordX: 15, coordY: 80, amenities: JSON.stringify(['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp']), description: 'Quiet desk with extra wide surface area.' },
    { id: 'C1', name: 'C1', zone: 'collaboration', status: 'available', hourlyRate: 129, coordX: 42, coordY: 25, amenities: JSON.stringify(['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly']), description: 'North-facing collaboration seat with whiteboard line of sight.' },
    { id: 'C2', name: 'C2', zone: 'collaboration', status: 'available', hourlyRate: 129, coordX: 52, coordY: 25, amenities: JSON.stringify(['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly']), description: 'Collaboration bench seat beside digital presentation screen.' },
    { id: 'C3', name: 'C3', zone: 'collaboration', status: 'occupied', hourlyRate: 129, coordX: 42, coordY: 42, amenities: JSON.stringify(['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly']), description: 'South-facing shared desk for pair programming.' },
    { id: 'C4', name: 'C4', zone: 'collaboration', status: 'available', hourlyRate: 129, coordX: 52, coordY: 42, amenities: JSON.stringify(['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly']), description: 'Collaboration table end seat with dual power plugs.' },
    { id: 'W1', name: 'W1', zone: 'window', status: 'available', hourlyRate: 149, coordX: 80, coordY: 18, amenities: JSON.stringify(['Natural light', 'City view', 'Power socket', 'Cozy corner']), description: 'Top window bay seat overlooking the tree-lined boulevard.' },
    { id: 'W2', name: 'W2', zone: 'window', status: 'reserved', hourlyRate: 149, coordX: 80, coordY: 38, amenities: JSON.stringify(['Natural light', 'City view', 'Power socket', 'Cozy corner']), description: 'Panoramic window seat, perfect for sketching & reading.' },
    { id: 'W3', name: 'W3', zone: 'window', status: 'available', hourlyRate: 149, coordX: 80, coordY: 58, amenities: JSON.stringify(['Natural light', 'City view', 'Power socket', 'Cozy corner']), description: 'Sunlit desk with premium cushioned armrest.' },
    { id: 'W4', name: 'W4', zone: 'window', status: 'available', hourlyRate: 149, coordX: 80, coordY: 78, amenities: JSON.stringify(['Natural light', 'City view', 'Power socket', 'Cozy corner']), description: 'Lower window lounge desk beside indoor botanical plants.' },
    { id: 'P1', name: 'P1', zone: 'premium', status: 'available', hourlyRate: 199, coordX: 38, coordY: 72, amenities: JSON.stringify(['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair']), description: 'Electric motorized standing desk with Herman Miller chair.' },
    { id: 'P2', name: 'P2', zone: 'premium', status: 'occupied', hourlyRate: 199, coordX: 50, coordY: 72, amenities: JSON.stringify(['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair']), description: 'Executive motorized desk with 4K external display & Qi charging.' },
    { id: 'P3', name: 'P3', zone: 'premium', status: 'available', hourlyRate: 199, coordX: 62, coordY: 72, amenities: JSON.stringify(['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair']), description: 'Spacious ergonomic standing desk with acoustic privacy shields.' }
  ];

  for (const s of seats) {
    await prisma.seat.create({ data: s });
  }

  // 3. Seed Menu Items
  const menu = [
    { id: 'cappuccino', name: 'Cappuccino', category: 'coffee', price: 120, description: 'Espresso with steamed milk and froth', isPopular: true, icon: 'coffee' },
    { id: 'cold-brew', name: 'Cold Brew', category: 'coffee', price: 150, description: '24-hour steeped, smooth and bold', isPopular: true, icon: 'cup-soda' },
    { id: 'flat-white', name: 'Flat White', category: 'coffee', price: 130, description: 'Double ristretto with microfoam', isPopular: false, icon: 'coffee' },
    { id: 'matcha-latte', name: 'Matcha Latte', category: 'tea', price: 160, description: 'Ceremonial grade matcha with oat milk', isPopular: false, icon: 'leaf' },
    { id: 'masala-chai', name: 'Masala Chai', category: 'tea', price: 90, description: 'Spiced Indian tea with milk', isPopular: false, icon: 'coffee' },
    { id: 'avocado-toast', name: 'Avocado Toast', category: 'snacks', price: 180, description: 'Smashed avocado, chili flakes, sourdough', isPopular: true, icon: 'sandwich' },
    { id: 'blueberry-muffin', name: 'Blueberry Muffin', category: 'snacks', price: 90, description: 'Fresh-baked with wild blueberries', isPopular: false, icon: 'cookie' },
    { id: 'energy-bar', name: 'Energy Bar', category: 'snacks', price: 70, description: 'Oats, dates, almonds — no added sugar', isPopular: false, icon: 'candy' },
    { id: 'quinoa-bowl', name: 'Quinoa Buddha Bowl', category: 'meals', price: 280, description: 'Quinoa, roasted veggies, tahini dressing', isPopular: true, icon: 'salad' },
    { id: 'chicken-wrap', name: 'Grilled Chicken Wrap', category: 'meals', price: 240, description: 'Chicken, hummus, greens in a whole-wheat wrap', isPopular: false, icon: 'sandwich' },
    { id: 'lava-cake', name: 'Chocolate Lava Cake', category: 'desserts', price: 160, description: 'Warm molten center with vanilla ice cream', isPopular: false, icon: 'cake' },
    { id: 'tiramisu', name: 'Tiramisu', category: 'desserts', price: 180, description: 'Classic Italian coffee-flavored dessert', isPopular: false, icon: 'ice-cream' }
  ];

  for (const m of menu) {
    await prisma.menuItem.create({ data: m });
  }

  // 4. Seed User Profile
  await prisma.userProfile.create({
    data: {
      id: 'user_1',
      credits: 320,
      hoursBooked: 47,
      totalSaved: 1200,
      freeCoffeesReady: 2,
      currentTier: 'Gold',
      lifetimePoints: 820,
      nextTierPoints: 1000
    }
  });

  // 5. Seed Activity Logs
  const activities = [
    { type: 'earned', title: 'Earned credits', credits: 40, description: '3h at Window Seat W3', date: 'Aug 20' },
    { type: 'redeemed', title: 'Redeemed reward', credits: -50, description: 'Free Cappuccino', date: 'Aug 18' },
    { type: 'earned', title: 'Earned credits', credits: 60, description: '4h at Premium Desk P1', date: 'Aug 15' },
    { type: 'bonus', title: 'Bonus credits', credits: 30, description: 'Gold tier bonus', date: 'Aug 12' },
    { type: 'earned', title: 'Earned credits', credits: 24, description: '2h at Quiet Zone Q1', date: 'Aug 10' }
  ];

  for (const a of activities) {
    await prisma.activityLog.create({ data: a });
  }

  console.log('[Prisma Seed] Completed seeding SQLite database successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
