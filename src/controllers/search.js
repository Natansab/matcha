/**
 * Dependencies
 */

import moment from 'moment';

/**
 * Models
 */

import UserModel from '../schemas/user';

/**
 * Private
 */

async function matchingGender(gender, orientation) {
  if (orientation === 'bisexual') return ['male', 'female'];
  if ((gender === 'male' && orientation === 'straigh')
      || (gender === 'female' && orientation === 'homosexual')) {
    return ['male'];
  }
  return ['female'];
}

/**
 * Public
 */

async function filtered({
  userId, minAge, maxAge,
  minScore, maxScore, interests,
}) {
  const userDoc = await UserModel.findById(userId, '_id gender orientation');
  const query = {};

  query._id = { $ne: userDoc._id };
  if (minAge && maxAge) {
    const minDob = moment().subtract(maxAge, 'year');
    const maxDob = moment().subtract(minAge, 'year');
    query.dob = { $gte: new Date(minDob), $lte: new Date(maxDob) };
  }
  if (minScore && maxScore) query.score = { $gte: minScore, $lte: maxScore };
  if (interests) query.interest = { $in: interests };
  query.gender = { $in: await matchingGender(userDoc.gender, userDoc.orientation) };

  const userDocs = await UserModel.find(query, '-password -token -email');

  return userDocs;
}

/**
 * Interface
 */

export default {
  filtered,
};
