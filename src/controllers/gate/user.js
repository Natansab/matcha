/**
 * Models
 */

import crypto from 'crypto';
import lo from 'lodash';
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

  if (lo.get(userDoc, 'email') === email) throw new Error('E-mail already linked to account');
  if (lo.get(userDoc, 'username') === username) throw new Error('Username not available');

  const hash = encryptPassword(password);

  userDoc = new UserModel({ username, firstname, lastname, email, password: hash });

  const token = crypto.createHash('sha256').update(`${userDoc.email}${Date.now()}`).digest('hex');
  Object.assign(userDoc, { token });

  userDoc.save();

  const user = userDoc;
  delete user.password;

  return user;
}

/**
  * Interface
  */

export default {
  register,
};
