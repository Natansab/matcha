/**
 * Dependencies
 */

import crypto from 'crypto';
import error from '../../lib/error';

/**
 * Models
 */

import UserModel from '../../schemas/user';

/**
 * Errors
 */

const LoginError = error.build('LoginError');

/**
 * Public
 */

function encryptPassword(password) {
  return crypto.createHash('sha256').update(`${password}bodega`).digest('hex');
}

async function login(email, password) {
  const hash = encryptPassword(password);

  const userDoc = await UserModel.findOne({ email }, 'email phone name supplier address password')
  .populate('address');

  if (!userDoc || userDoc.password !== hash) {
    throw new LoginError({ message: 'Email or password incorrect', context: { email } });
  }

  if (!userDoc.token) {
    const token = crypto.createHash('sha256').update(`${userDoc.email}${Date.now()}`).digest('hex');
    Object.assign(userDoc, { token });
    await userDoc.save();
  }

  return userDoc;
}

async function check(token) {
  const userDoc = await UserModel.findOne({ token }, '_id token supplier');
  if (!userDoc || userDoc.token !== token) {
    throw new LoginError({ message: 'Could not authenticate this token', context: { token } });
  }

  return {
    userId: userDoc._id.toString(),
    supplierId: !!userDoc.supplier ? userDoc.supplier.toString() : null,
    scope: !!userDoc.supplier ? 'supplier' : 'user',
  };
}

/**
 * Interface
 */

export default {
  encryptPassword,
  login,
  check,
};
