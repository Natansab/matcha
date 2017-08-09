/**
 * Dependencies
 */

import moment from 'moment';

/**
 * Models
 */

import UserModel from '../schemas/user';

/**
 * Public
 */

async function filtered({
  minAge, maxAge, minScore, maxScore,
  interests,
}) {
  const minDob = moment().subtract(maxAge, 'year');
  const maxDob = moment().subtract(minAge, 'year');

  const userDocs = await UserModel.find({
    dob: { $gte: new Date(minDob), $lte: new Date(maxDob) },
    score: { $gte: minScore, $lte: maxScore },
    interest: { $in: interests },
  }, '-password -token -email');

  return userDocs;
}

/**
 * Interface
 */

export default {
  filtered,
};
