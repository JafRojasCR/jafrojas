const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const { apiLimiter } = require('./src/middleware/rateLimiter');
const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const socialMediaRoutes = require('./src/routes/socialMediaRoutes');
const bioRoutes = require('./src/routes/bioRoutes');
const certificateRoutes = require('./src/routes/certificateRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

const envLocalPath = path.resolve(__dirname, '../.env.local');
const envFallbackPath = path.resolve(__dirname, '.env');

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envFallbackPath)) {
  dotenv.config({ path: envFallbackPath });
} else {
  dotenv.config();
}

// Connect to MongoDB only once (re-used in serverless environments)
connectDB().catch(() => {
  // Errors are already logged inside connectDB; this prevents unhandled rejections.
});

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://jafrojas.vercel.app',
  'https://jafrojas.com',
  'https://www.jafrojas.com'
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith('.pages.dev')) {
      return true;
    }
  } catch (error) {
    // Ignore invalid origins; fall through to disallow
  }

  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/social-media', socialMediaRoutes);
app.use('/api/bio', bioRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve static frontend when available (local production build)
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.get(/^\/(?!api\b).*/, (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
