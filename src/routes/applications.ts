import { Router, Request, Response } from 'express';

const router = Router();

// In-memory application storage
interface Application {
  id: string;
  type: 'startup' | 'mentor' | 'student';
  name: string;
  email: string;
  instagram?: string;
  phone?: string;
  organizationOrCollege?: string;
  stageOrRole?: string;
  pitchOrBio?: string;
  submittedAt: string;
}

const applications: Application[] = [
  {
    id: 'app-sample-1',
    type: 'startup',
    name: 'Karthik Rao',
    email: 'karthik@kakatiyatech.in',
    instagram: '@kakatiyatech',
    phone: '+91 98490 12345',
    organizationOrCollege: 'AgriSens AI',
    stageOrRole: 'Early MVP',
    pitchOrBio: 'IoT-based soil moisture and pest detection sensors for turmeric & cotton farmers in Warangal district.',
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

// POST /api/applications/submit
router.post('/submit', (req: Request, res: Response) => {
  const { type, name, email, instagram, phone, organizationOrCollege, stageOrRole, pitchOrBio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required fields.' });
  }

  const newApp: Application = {
    id: `app-${Date.now()}`,
    type: type || 'startup',
    name,
    email,
    instagram: instagram || '',
    phone: phone || '',
    organizationOrCollege: organizationOrCollege || '',
    stageOrRole: stageOrRole || '',
    pitchOrBio: pitchOrBio || '',
    submittedAt: new Date().toISOString()
  };

  applications.unshift(newApp);

  console.log(`[W-Hub Applications] Received new ${newApp.type} application from ${newApp.name} (${newApp.email})`);

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully! Our team at contact.w.hub@gmail.com will review and contact you shortly.',
    applicationId: newApp.id,
    data: newApp
  });
});

// GET /api/applications (admin / list)
router.get('/', (_req: Request, res: Response) => {
  res.json({
    count: applications.length,
    applications
  });
});

export default router;

