/**
 * Models
 */

import UserModel from '../../schemas/user';

/**
 * Public
 */

async function register({ firstname, lastname, email, password }) {
  let userDoc = await UserModel.findOne({ email });
  if (userDoc) throw new Error('User already exists');

  userDoc = new UserModel({ firstname, lastname, email, password });

  return userDoc.save();
}

/**
  * Interface
  */

export default {
  register,
};
