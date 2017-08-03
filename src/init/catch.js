/**
 * Dependencies
 */

import { log } from '../lib/logger';

/**
 * Catch uncaught errors and rethrow them
 */

process.on('uncaughtException', error => {
  log.fatal(error, 'Uncaught exception');
  process.exit(1);
});
