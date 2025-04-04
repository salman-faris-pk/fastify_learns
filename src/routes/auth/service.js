import bcrypt from 'bcryptjs';
import User from '../users/model.js';
import { NotFoundError,AuthError } from "../../utils/error-handler.js"


export async function loginUser(email, password) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new NotFoundError('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AuthError('Invalid credentials');

  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}