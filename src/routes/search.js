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
      userId, minAge, maxAge, minScore,
      maxScore, interests,
    } = validate({ ...req.params, ...req.body }, [
      { param: 'id', name: 'user_id', required: true },
      { param: 'minage', name: 'minAge' },
      { param: 'maxage', name: 'maxAge' },
      { param: 'minscore', name: 'minScore' },
      { param: 'maxscore', name: 'maxScore' },
      { param: 'interests' },
      // { param: 'location' },
    ]);

    const userDocs = await searchController.filtered({
      userId, minAge, maxAge, minScore, maxScore,
      interests,
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
