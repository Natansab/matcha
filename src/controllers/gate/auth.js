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

async function login({ username, password }) {
  const hash = encryptPassword(password);
  const userDoc = await UserModel.findOne({ username, password: hash });

  if (!userDoc) throw new Error('Email or password incorrect');

  if (!userDoc.token) {
    const token = generateToken(userDoc.username);
    Object.assign(userDoc, { token });
    await userDoc.save();
  }

  return userDoc;
}

async function check(token) {
  const userDoc = await UserModel.findOne({ token }, '_id');

  if (!userDoc) throw new Error(`Incorrect token ${token}`);

  return userDoc._id;
}
/**
 * Interface
 */

export default {
  encryptPassword,
  login,
  check,
};
