export interface Seat {
  id: string;
  name: string;
  zone: 'quiet' | 'collaboration' | 'window' | 'premium';
  status: 'available' | 'occupied' | 'reserved';
  hourlyRate: number;
  coordinates: { x: number; y: number }; // Percentage on floor map
  amenities: string[];
  description: string;
}

export interface ZoneInfo {
  id: 'quiet' | 'collaboration' | 'window' | 'premium';
  name: string;
  hourlyRate: number;
  description: string;
  icon: string;
  colorClass: string;
  features: string[];
}

export const ZONES: Record<string, ZoneInfo> = {
  quiet: {
    id: 'quiet',
    name: 'Quiet Zone',
    hourlyRate: 99,
    description: 'Silent, focused work with noise-dampening panels and ergonomic seating.',
    icon: 'headphones',
    colorClass: 'chart-2',
    features: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp']
  },
  collaboration: {
    id: 'collaboration',
    name: 'Collaboration Table',
    hourlyRate: 129,
    description: 'Open shared table ideal for team brainstorming and pair work.',
    icon: 'users',
    colorClass: 'chart-4',
    features: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly']
  },
  window: {
    id: 'window',
    name: 'Window Seat',
    hourlyRate: 149,
    description: 'Bright natural light with a view — perfect for creative flow.',
    icon: 'sun',
    colorClass: 'chart-3',
    features: ['Natural light', 'City view', 'Power socket', 'Cozy corner']
  },
  premium: {
    id: 'premium',
    name: 'Premium Desk',
    hourlyRate: 199,
    description: 'Private desk with adjustable standing option and premium amenities.',
    icon: 'crown',
    colorClass: 'chart-1',
    features: ['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair']
  }
};

export const INITIAL_SEATS: Seat[] = [
  // Quiet Zone (4 seats)
  {
    id: 'Q1',
    name: 'Q1',
    zone: 'quiet',
    status: 'available',
    hourlyRate: 99,
    coordinates: { x: 15, y: 20 },
    amenities: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'],
    description: 'Corner quiet desk with optimal acoustic dampening.'
  },
  {
    id: 'Q2',
    name: 'Q2',
    zone: 'quiet',
    status: 'occupied',
    hourlyRate: 99,
    coordinates: { x: 15, y: 40 },
    amenities: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'],
    description: 'Central quiet desk with high partition screens.'
  },
  {
    id: 'Q3',
    name: 'Q3',
    zone: 'quiet',
    status: 'available',
    hourlyRate: 99,
    coordinates: { x: 15, y: 60 },
    amenities: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'],
    description: 'Quiet desk positioned near library bookshelves.'
  },
  {
    id: 'Q4',
    name: 'Q4',
    zone: 'quiet',
    status: 'available',
    hourlyRate: 99,
    coordinates: { x: 15, y: 80 },
    amenities: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'],
    description: 'Quiet desk with extra wide surface area.'
  },

  // Collaboration Table (4 seats)
  {
    id: 'C1',
    name: 'C1',
    zone: 'collaboration',
    status: 'available',
    hourlyRate: 129,
    coordinates: { x: 42, y: 25 },
    amenities: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'],
    description: 'North-facing collaboration seat with direct whiteboard line of sight.'
  },
  {
    id: 'C2',
    name: 'C2',
    zone: 'collaboration',
    status: 'available',
    hourlyRate: 129,
    coordinates: { x: 52, y: 25 },
    amenities: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'],
    description: 'Collaboration bench seat beside digital presentation screen.'
  },
  {
    id: 'C3',
    name: 'C3',
    zone: 'collaboration',
    status: 'occupied',
    hourlyRate: 129,
    coordinates: { x: 42, y: 42 },
    amenities: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'],
    description: 'South-facing shared desk for pair programming.'
  },
  {
    id: 'C4',
    name: 'C4',
    zone: 'collaboration',
    status: 'available',
    hourlyRate: 129,
    coordinates: { x: 52, y: 42 },
    amenities: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'],
    description: 'Collaboration table end seat with dual power plugs.'
  },

  // Window Seats (4 seats)
  {
    id: 'W1',
    name: 'W1',
    zone: 'window',
    status: 'available',
    hourlyRate: 149,
    coordinates: { x: 80, y: 18 },
    amenities: ['Natural light', 'City view', 'Power socket', 'Cozy corner'],
    description: 'Top window bay seat overlooking the tree-lined boulevard.'
  },
  {
    id: 'W2',
    name: 'W2',
    zone: 'window',
    status: 'reserved',
    hourlyRate: 149,
    coordinates: { x: 80, y: 38 },
    amenities: ['Natural light', 'City view', 'Power socket', 'Cozy corner'],
    description: 'Panoramic window seat, perfect for sketching & reading.'
  },
  {
    id: 'W3',
    name: 'W3',
    zone: 'window',
    status: 'available',
    hourlyRate: 149,
    coordinates: { x: 80, y: 58 },
    amenities: ['Natural light', 'City view', 'Power socket', 'Cozy corner'],
    description: 'Sunlit desk with premium cushioned armrest.'
  },
  {
    id: 'W4',
    name: 'W4',
    zone: 'window',
    status: 'available',
    hourlyRate: 149,
    coordinates: { x: 80, y: 78 },
    amenities: ['Natural light', 'City view', 'Power socket', 'Cozy corner'],
    description: 'Lower window lounge desk beside indoor botanical plants.'
  },

  // Premium Desks (3 seats)
  {
    id: 'P1',
    name: 'P1',
    zone: 'premium',
    status: 'available',
    hourlyRate: 199,
    coordinates: { x: 38, y: 72 },
    amenities: ['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair'],
    description: 'Electric motorized standing desk with Herman Miller chair.'
  },
  {
    id: 'P2',
    name: 'P2',
    zone: 'premium',
    status: 'occupied',
    hourlyRate: 199,
    coordinates: { x: 50, y: 72 },
    amenities: ['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair'],
    description: 'Executive motorized desk with 4K external display & Qi charging.'
  },
  {
    id: 'P3',
    name: 'P3',
    zone: 'premium',
    status: 'available',
    hourlyRate: 199,
    coordinates: { x: 62, y: 72 },
    amenities: ['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair'],
    description: 'Spacious ergonomic standing desk with acoustic privacy shields.'
  }
];

