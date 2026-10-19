import { Router } from 'express';

const router = Router();

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const CELPIN_KNOWLEDGE_BASE = [
  {
    keywords: ['price', 'cost', 'rate', 'how much', 'pricing', 'daily cap', 'charges'],
    reply: `Celpin offers flexible, complimentary workspace access passes:
• Quiet Focus Pods
• Collaborative Hubs
• Sunlit Window Desks
• Executive Cabins

All spaces include high-speed 300+ Mbps fiber Wi-Fi, individual power sockets, and instant digital QR entry with zero lock-in!`
  },
  {
    keywords: ['zone', 'workspace', 'seat', 'types', 'quiet', 'collaboration', 'window', 'premium'],
    reply: `We have 4 specialized workspace zones:
1. **Quiet Zone**: Noise-dampening acoustic dividers, ergonomic seating, reading lamps.
2. **Collaboration Table**: Shared tables, whiteboard access, perfect for team syncs.
3. **Window Seat**: Bright natural lighting, street views, cozy ambiance.
4. **Premium Desk**: Motorized standing desks, Herman Miller chairs, dual-monitor mounts.`
  },
  {
    keywords: ['coffee', 'menu', 'food', 'snack', 'drink', 'order', 'cappuccino', 'tea'],
    reply: `You can pre-order café items during booking or from your desk! Popular options:
• Cappuccino & Cold Brew
• Matcha Latte & Masala Chai
• Avocado Toast & Quinoa Buddha Bowl
• Chocolate Lava Cake & Tiramisu
All food and beverages are delivered straight to your seat with zero disruption.`
  },
  {
    keywords: ['check in', 'checkin', 'qr', 'code', 'pin', 'entrance', 'arrival'],
    reply: `Digital QR Check-In is super simple!
1. Complete your booking online to receive an instant QR code and 4-digit PIN.
2. When you arrive at Celpin, scan your QR code at the turnstile or entrance scanner.
3. Your desk power unlocks immediately and our baristas start preparing your pre-orders. Total check-in time: under 5 seconds!`
  },
  {
    keywords: ['reward', 'loyalty', 'credit', 'tier', 'points', 'membership'],
    reply: `With Celpin Rewards, you earn credits on every booking session!
• **Bronze**: 1 credit per booking session
• **Silver (500 pts)**: 1.5 credits per session + complimentary café upgrades
• **Gold (1,000 pts)**: 2 credits per session + priority café perks + free beverage every 10 visits
• **Platinum (2,500 pts)**: 3 credits per session + priority access + unlimited pod reservations
Credits can be redeemed for session passes, complimentary beverages, and priority upgrades!`
  },
  {
    keywords: ['wifi', 'internet', 'power', 'socket', 'plug', 'amenities', 'speed'],
    reply: `Every seat at Celpin includes:
• High-speed fiber Wi-Fi (300+ Mbps synchronous)
• Individual AC power sockets and USB-C fast charging
• Ergonomic chairs and dedicated task lighting
• Access to telephone call booths and sanitized restrooms.`
  },
  {
    keywords: ['hours', 'timing', 'open', 'location', 'address', 'where'],
    reply: `Celpin is open 7 days a week:
• Monday – Friday: 7:30 AM – 11:00 PM
• Saturday – Sunday: 8:00 AM – 10:00 PM
We are located in the heart of the creative tech district with ample parking and bike racks.`
  }
];

// POST /api/chat
router.post('/', (req, res) => {
  const { message = '', history = [] } = req.body;
  const lowerMsg = message.toLowerCase().trim();

  if (!lowerMsg) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Look for match in knowledge base
  let responseText = '';
  for (const item of CELPIN_KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => lowerMsg.includes(kw))) {
      responseText = item.reply;
      break;
    }
  }

  if (!responseText) {
    if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
      responseText = "Hello! I'm your Celpin AI Concierge. I can help you check real-time seat availability, book a workspace zone, explore our fresh café menu, or guide your QR check-in. How can I assist your workday today?";
    } else if (lowerMsg.includes('help')) {
      responseText = "I can guide you with:\n1. Booking workspace zones & amenities\n2. The visual floor map\n3. Pre-ordering coffee & snacks to your desk\n4. QR check-in instructions\n5. Celpin loyalty reward points.";
    } else {
      responseText = `Thanks for asking! At Celpin, you can reserve flexible workspaces with high-speed fiber Wi-Fi, pre-order coffee to your desk, and check in instantly with a dynamic QR code. Check out the **Book a Seat** tab or **Floor Map** above, or let me know if you have questions about specific zones or menu items!`;
    }
  }

  res.json({
    reply: responseText,
    timestamp: new Date().toISOString()
  });
});

export default router;

