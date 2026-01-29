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


export default app;
