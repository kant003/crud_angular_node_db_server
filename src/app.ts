import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/student.routes';
import authRoutes from './routes/auth.routes';
import './auth/google.strategy';
import passport from 'passport';

const app = express();

app.use(passport.initialize());
app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);
app.use('/auth', authRoutes); // Added auth routes
app.get("/hola", (_req, res) => {
  res.json({
    ok: true,
    message: "Hola mundo 👋 Backend funcionando"
  });
});

app.get('/env-check', (req, res) => {
  res.json({
    DB_HOST: !!process.env.DB_HOST,
    DB_USER: !!process.env.DB_USER,
    DB_NAME: !!process.env.DB_NAME,
    JWT_SECRET: !!process.env.JWT_SECRET,
    DB_HOST2:process.env.DB_HOST,
    DB_USER2: process.env.DB_USER,
    DB_NAME2: process.env.DB_NAME,
    JWT_SECRET2: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  });
});

export default app;
