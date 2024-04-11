import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);

router.get('/status', (req, res) => res.json({ msg: 'ok' }));

export default router;