import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d'
    });

    // redirigimos a Angular con token
    res.redirect(`http://localhost:4200/auth/callback?token=${token}`);
  }
);

export default router;