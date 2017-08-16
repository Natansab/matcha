/**
 * Models
 */

import UserModel from '../schemas/user';

/**
 * Public
 */

/**
* Score is out of 100.
* How the score is built?
* # of pictures: 30pts
* # of likes: 30pts
* # of interests: 20pts
* # of chats: 20pts
* # of blocked: -100pts
*/

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["userDoc"] }] */

async function score() {
  const userDocs = await UserModel.find();

  userDocs.forEach(async userDoc => {
    const numOfLikes = await UserModel.count({ likes: { $in: [userDoc._id] } });
    const numOfBlocked = await UserModel.count({ blocked: { $in: [userDoc._id] } });

    const picsScore = Math.min(30, userDoc.pictures.length * 0.2 * 30);
    const likesScore = Math.min(30, (numOfLikes / Math.max(1, userDoc.likes.length)) * 15);
    const interestsScore = Math.min(20, userDoc.interest.length * 4);
    const chatsScore = 20;
    const blockedScore = -(numOfBlocked * 10);
    userDoc.score = Math.max(0, picsScore + likesScore + interestsScore + chatsScore + blockedScore);
    return userDoc.save();
  });
}


/**
 * Interface
 */

export default {
  score,
};
