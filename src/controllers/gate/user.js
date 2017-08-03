/**
 * Models
 */

import crypto from 'crypto';
import UserModel from '../../schemas/user';
import { encryptPassword } from './auth';

/**
 * Public
 */

async function register({ username, firstname, lastname, email, password }) {
  let userDoc = await UserModel.findOne({
    $or: [
     { email },
     { username },
    ],
  });

  if (userDoc && userDoc.email && email === userDoc.email) throw new Error('E-mail already linked to account');
  if (userDoc && userDoc.username && username === userDoc.username) throw new Error('Username not available');

  const hash = encryptPassword(password);

  userDoc = new UserModel({ username, firstname, lastname, email, password: hash });

  const token = crypto.createHash('sha256').update(`${userDoc.email}${Date.now()}`).digest('hex');
  Object.assign(userDoc, { token });

  return userDoc.save();
}

/**
  * Interface
  */

export default {
  register,
};
