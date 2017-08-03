/**
 * Initialization
 */

/* eslint-disable global-require */
require('babel-polyfill');
require('./init/catch');
require('./init/mongo');
require('./init/express');
require('./lib/logger').log.info('API running...');
/* eslint-enable global-require */
