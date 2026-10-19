import { Router, Request, Response } from 'express';

const router = Router();

export interface StartupItem {
  id: string;
  name: string;
  tagline: string;
  category: 'AgriTech' | 'AI & DeepTech' | 'HealthTech' | 'Hardware' | 'EdTech' | 'CleanTech';
  stage: 'Idea' | 'Early MVP' | 'Funded / Scaling';
  founder: string;
  collegeOrCity: string;
  instagram?: string;
  website?: string;
  metrics: string;
}

export interface EventItem {
  id: string;
  title: string;
  theme: string;
  date: string;
  location: string;
  badge: 'Past Summit' | 'Upcoming' | 'Recurring';
  description: string;
  attendees: string;
  rsvpOpen: boolean;
}

const startups: StartupItem[] = [
  {
    id: 'st-1',
    name: 'AgriSens AI',
    tagline: 'IoT soil health probes and AI pest warning systems for Telangana farmers.',
    category: 'AgriTech',
    stage: 'Early MVP',
    founder: 'Srinivas Goud & Team',
    collegeOrCity: 'NIT Warangal Incubation',
    instagram: '@agrisens_ai',
    metrics: '120+ Farmers Pilot in Warangal Rural'
  },
  {
    id: 'st-2',
    name: 'Kakatiya MedVision',
    tagline: 'Portable retinal screening device bringing ophthalmic diagnostic AI to tier-2 clinics.',
    category: 'HealthTech',
    stage: 'Funded / Scaling',
    founder: 'Dr. Divya Reddy & Sandeep M.',
    collegeOrCity: 'Kakatiya Medical College / W-Hub',
    instagram: '@medvision_warangal',
    metrics: '₹25L Seed Grant Winner'
  },
  {
    id: 'st-3',
    name: 'OorjaGrid',
    tagline: 'Decentralized solar-battery smart charging stations for 2-wheelers and auto-rickshaws.',
    category: 'CleanTech',
    stage: 'Early MVP',
    founder: 'Venkatesh Rao',
    collegeOrCity: 'SR University Innovation Cell',
    metrics: '8 Hubs Deployed in Tri-City'
  },
  {
    id: 'st-4',
    name: 'Nirvaan DroneTech',
    tagline: 'Heavy-lift autonomous agricultural spray drones with thermal crop analytics.',
    category: 'Hardware',
    stage: 'Early MVP',
    founder: 'Rohit K. & Abhishek P.',
    collegeOrCity: 'NIT Warangal Alum',
    instagram: '@nirvaandrones',
    metrics: 'DGCA Compliant Prototype'
  },
  {
    id: 'st-5',
    name: 'VidyaBridge Telugu',
    tagline: 'Hyperlocal vernacular coding & AI mentorship platform for students across Telangana.',
    category: 'EdTech',
    stage: 'Funded / Scaling',
    founder: 'Pooja Vangala',
    collegeOrCity: 'Kakatiya University',
    metrics: '15,000+ Learners Trained'
  },
  {
    id: 'st-6',
    name: 'GraminPay Micro',
    tagline: 'Voice-first UPI soundboxes and inventory tally for Kirana stores across Warangal district.',
    category: 'AI & DeepTech',
    stage: 'Idea',
    founder: 'Sai Charan Teja',
    collegeOrCity: 'Hanamkonda',
    metrics: 'Top 10 Open Mic Pitch'
  }
];

const events: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Warangal Start-ups & Innovation Summit 2026',
    theme: 'From Ideas to Impact — Innovate · Collaborate · Build',
    date: '16-08-2026',
    location: 'Warangal Innovation Auditorium',
    badge: 'Past Summit',
    description: 'The premier gathering of 250+ Warangal founders, student teams, academic leaders, and investors with keynote talks, open mic pitches, and ecosystem awards.',
    attendees: '250+ Attendees & 30+ Pitches',
    rsvpOpen: false
  },
  {
    id: 'ev-2',
    title: 'Warangal Open Mic #2 — Founder Pitch Fest',
    theme: 'Got an idea? 3 minutes, 1 slide, raw founder feedback',
    date: 'Next Saturday, 5:00 PM',
    location: 'W-Hub Co-Working Space, Hanamkonda',
    badge: 'Upcoming',
    description: 'Weekly grassroots open mic where students, techies, and operators present early startup concepts to active mentors and angels.',
    attendees: 'Limited to 40 participants',
    rsvpOpen: true
  },
  {
    id: 'ev-3',
    title: 'NIT Warangal x W-Hub DeepTech Mixer',
    theme: 'Commercializing research into venture-backed spinouts',
    date: 'Upcoming Month',
    location: 'NITW Innovation & Incubation Center',
    badge: 'Upcoming',
    description: 'Structured panel bridging professors, PhD researchers, student innovators, and industry venture partners.',
    attendees: 'Open Registration',
    rsvpOpen: true
  }
];

router.get('/startups', (_req: Request, res: Response) => {
  res.json(startups);
});

router.get('/events', (_req: Request, res: Response) => {
  res.json(events);
});

router.get('/stats', (_req: Request, res: Response) => {
  res.json({
    activeStartups: '45+',
    mentorsAndAdvisors: '28+',
    studentsCatalyzed: '1,200+',
    totalEventsHosted: '14+',
    grantsAndCapitalFacilitated: '₹1.8 Cr+'
  });
});

export default router;

