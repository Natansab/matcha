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
  // 2 = male & female, 1 = male, 0 = female
  if (orientation === 'bisexual') return 2;
  if ((gender === 'male' && orientation === 'straigh') || (gender === 'female' && orientation === 'homosexual')) return 1;
  return 0;
}

/**
 * Public
 */

async function filtered({
  userId, minAge, maxAge,
  minScore, maxScore, interests,
}) {
  const genderArray = [['male'], ['female'], ['male', 'female']];
  const userDoc = await UserModel.findById(userId, 'gender orientation');

  const query = {};
  if (minAge && maxAge) {
    const minDob = moment().subtract(maxAge, 'year');
    const maxDob = moment().subtract(minAge, 'year');
    query.dob = { $gte: new Date(minDob), $lte: new Date(maxDob) };
  }
  if (minScore && maxScore) query.score = { $gte: minScore, $lte: maxScore };
  if (interests) query.interest = { $in: interests };
  query.gender = { $in: genderArray[await matchingGender(userDoc.gender, userDoc.orientation)] };

  const userDocs = await UserModel.find(query, '-password -token -email');

  return userDocs;
}

/**
 * Interface
 */

export default {
  filtered,
};
