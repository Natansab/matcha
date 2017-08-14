/**
 * Dependencies
 */

import mongoose from 'mongoose';

/**
 * Models
 */

import UserModel from '../schemas/user';

/**
 * Public
 */

async function score() {
  /**
   * Score is out of 100.
   * How the score is built?
   * Number of photos: 0 photos = 0 pts, 5 photos = 30pts
   *
   *
   *
   */  // // Score = 0 to 100.
  // picsScore / 40
  const userDoc = await UserModel.findById(mongoose.Type.ObjectId('5985ea9f872dbe0319ddacc7'));

  const picsScore = Math.max(30, userDoc.pictures.length * 0.2 * 30);


  return 'OK';
}


/**
 * Interface
 */

export default {
  score,
};
