import express from 'express';
import cors from 'cors';
import seatsRouter from './routes/seats.js';
import bookingsRouter from './routes/bookings.js';
import cafeRouter from './routes/cafe.js';
import rewardsRouter from './routes/rewards.js';
import chatRouter from './routes/chat.js';
import ratingsRouter from './routes/ratings.js';

import applicationsRouter from './routes/applications.js';
import ecosystemRouter from './routes/ecosystem.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// W-Hub Ecosystem Routes
app.use('/api/applications', applicationsRouter);
app.use('/api/ecosystem', ecosystemRouter);

// Legacy/Auxiliary Routes
app.use('/api/seats', seatsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/cafe', cafeRouter);
app.use('/api/rewards', rewardsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/ratings', ratingsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'w-hub-backend',
    brand: 'W-Hub | Warangal Startup & Innovation Ecosystem',
    email: 'contact.w.hub@gmail.com',
    instagram: '@Whubwgl',
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[W-Hub Backend] Server running on http://localhost:${PORT}`);
});
