/**
 * Dependencies
 */

import crypto from 'crypto';
// import error from '../../lib/error';

/**
 * Models
 */

import UserModel from '../../schemas/user';

/**
 * Private
 */

function generateToken(salt) {
  return crypto.createHash('sha256').update(`${salt}${Date.now()}`).digest('hex');
}

/**
 * Public
 */

function encryptPassword(password) {
  return crypto.createHash('sha256').update(`${password}matcha`).digest('hex');
}

function login({ email, password }) {
  const hash = encryptPassword(password);
  const userDoc = UserModel.findOne({ email, password: hash });

  if (!userDoc) throw new Error('Email or password incorrect');

  userDoc.token = generateToken(userDoc.email);

  const user = userDoc;
  delete user.password;

  return user;
}

/**
 * Interface
 */

export default {
  encryptPassword,
  login,
};
