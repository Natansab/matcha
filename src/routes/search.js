/**
 * Dependencies
 */

import { sendOK } from '../lib/response';
import { validate } from '../lib/params';
import searchController from '../controllers/search';

/**
 * Public
 */

async function filteredSearch(req, res, next) {
  try {
    const {
      minAge, maxAge, minScore, maxScore,
      // interests, location,
    } = validate(req.query, [
      { param: 'minage', name: 'minAge' },
      { param: 'maxage', name: 'maxAge' },
      { param: 'minscore', name: 'minScore' },
      { param: 'maxscore', name: 'maxScore' },
      // { param: 'interests' },
      // { param: 'location' },
    ]);

    const userDocs = await searchController.filtered({
      minAge, maxAge, minScore, maxScore,
      // interests, location,
    });

    return sendOK(res, userDocs);
  } catch (e) {
    return next(e);
  }
}

/**
 * Interface
 */

export default {
  filteredSearch,
};
