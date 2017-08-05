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

async function login({ email, password }) {
  const hash = encryptPassword(password);
  const userDoc = UserModel.findOne({ email, password: hash });

  if (!userDoc) throw new Error('Email or password incorrect');

  if (!userDoc.token) {
    const token = generateToken(userDoc.email);
    Object.assign(userDoc, { token });
    await userDoc.save();
  }

  return userDoc;
}

/**
 * Interface
 */

export default {
  encryptPassword,
  login,
};
