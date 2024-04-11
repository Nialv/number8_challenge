import * as UserModel from '../models/auth.model';
import { AuthResponse } from '../types/express';
import { generateToken } from '../utils/jwt.utils';
import bcrypt from 'bcryptjs';

export const authenticateUser = async (
  username: string,
  password: string
): Promise<AuthResponse | null> => {
  const users = await UserModel.getAllUsers(username);

  if (users && users.length > 0) {
    const user = users.find(
      (user: { username: string }) => user.username === username
    );
    if (user && (await bcrypt.compare(password, user.password))) {
      return { token: generateToken(user.id), userId: user.id };
    }
  }
  return null;
};
