/**
 * Dependencies
 */

import lo from 'lodash';
// import mongoose from '../lib/mongoose';

/**
 * Models
 */

import UserModel from '../schemas/user';

/**
 * Errors
 */

const UserError = error.build('UserError');

/**
 * Private
 */

const ObjectId = mongoose.Types.ObjectId;

/**
 * Public
 */

async function newUser({ first_name, last_name, bio, gender }) {
  userDoc = new UserModel({ first_name, last_name, bio, gender });

  return userDoc.save();
}

/**
  * Interface
  */

export default {
  newUser,
};
