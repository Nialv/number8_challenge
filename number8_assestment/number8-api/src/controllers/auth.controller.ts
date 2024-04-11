import { Request, Response } from 'express';
import { authenticateUser } from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const authResponse = await authenticateUser(username, password);

    if (authResponse) {
      res.json({ token: authResponse?.token, userId: authResponse?.userId });
    } else {
      res.status(401).json({ msg: 'Authentication failed.' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Login error: ${error?.message}`);
    }
    res.status(500).json({ msg: 'Internal Server Error. here' });
  }
};
