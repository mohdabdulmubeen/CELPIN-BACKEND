export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'tea' | 'snacks' | 'meals' | 'desserts';
  price: number;
  description: string;
  isPopular?: boolean;
  icon: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // Coffee
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    price: 120,
    description: 'Espresso with steamed milk and froth',
    isPopular: true,
    icon: 'coffee'
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    category: 'coffee',
    price: 150,
    description: '24-hour steeped, smooth and bold',
    isPopular: true,
    icon: 'cup-soda'
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'coffee',
    price: 130,
    description: 'Double ristretto with microfoam',
    icon: 'coffee'
  },

  // Tea
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'tea',
    price: 160,
    description: 'Ceremonial grade matcha with oat milk',
    icon: 'leaf'
  },
  {
    id: 'masala-chai',
    name: 'Masala Chai',
    category: 'tea',
    price: 90,
    description: 'Spiced Indian tea with milk',
    icon: 'coffee'
  },

  // Snacks
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'snacks',
    price: 180,
    description: 'Smashed avocado, chili flakes, sourdough',
    isPopular: true,
    icon: 'sandwich'
  },
  {
    id: 'blueberry-muffin',
    name: 'Blueberry Muffin',
    category: 'snacks',
    price: 90,
    description: 'Fresh-baked with wild blueberries',
    icon: 'cookie'
  },
  {
    id: 'energy-bar',
    name: 'Energy Bar',
    category: 'snacks',
    price: 70,
    description: 'Oats, dates, almonds — no added sugar',
    icon: 'candy'
  },

  // Meals
  {
    id: 'quinoa-bowl',
    name: 'Quinoa Buddha Bowl',
    category: 'meals',
    price: 280,
    description: 'Quinoa, roasted veggies, tahini dressing',
    isPopular: true,
    icon: 'salad'
  },
  {
    id: 'chicken-wrap',
    name: 'Grilled Chicken Wrap',
    category: 'meals',
    price: 240,
    description: 'Chicken, hummus, greens in a whole-wheat wrap',
    icon: 'sandwich'
  },

  // Desserts
  {
    id: 'lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    price: 160,
    description: 'Warm molten center with vanilla ice cream',
    icon: 'cake'
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    category: 'desserts',
    price: 180,
    description: 'Classic Italian coffee-flavored dessert',
    icon: 'ice-cream'
  }
];

