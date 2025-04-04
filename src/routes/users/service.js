import User from './model.js';
import {  NotFoundError, ConflictError } from "../../utils/error-handler.js"

export async function createUser(userData) {

  if (await User.exists({ email: userData.email })) {
    throw new ConflictError('already User with this email');
  };

  const user = new User(userData);
  return await user.save();
}

export async function getUser(id) {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');
  return user;
}