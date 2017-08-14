/**
 * Dependencies
 */

import { sendOK } from '../lib/response';
import extraController from '../controllers/extra';

/**
 * Public
 */

async function refreshScore(req, res, next) {
  try {
    await extraController.score();

    return sendOK(res, 'OK');
  } catch (e) {
    return next(e);
  }
}

/**
 * Interface
 */

export default {
  refreshScore,
};
