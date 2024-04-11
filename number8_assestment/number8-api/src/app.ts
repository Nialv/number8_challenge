import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';

import 'dotenv/config';
import multer from 'multer';

const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-type',
    'Authorization',
    'cross-origin-resource-policy'
  ]
};

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(cors(corsOptions));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(upload.single('avatar'));
app.use(
  '/avatars',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.join(__dirname, '..', 'src', 'avatars'))
);

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

export default app;
