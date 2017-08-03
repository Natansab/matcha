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
 * Errors
 */

// const LoginError = error.build('LoginError');

/**
 * Public
 */

function encryptPassword(password) {
  return crypto.createHash('sha256').update(`${password}matcha`).digest('hex');
}

function login({ email, password }) {
  const hash = encryptPassword(password);
  const userDoc = UserModel.findOne({ email, password: hash });

  if (!!userDoc) throw new Error('Email or password incorrect');

  return ('Ok');
}

/**
 * Interface
 */

export default {
  encryptPassword,
  login,
};
