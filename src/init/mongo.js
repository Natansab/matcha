/**
 * Dependencies
 */

import fs from 'fs';
import path from 'path';
import config from './config';
import mongoose from '../lib/mongoose';
import { log } from '../lib/logger';

/**
 * Initialize mongoose
 */

// Create mongo database connection
mongoose.connect(config.mongodb.url, {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
});

// Events
mongoose.connection.on('connected', () => log.info('MongoDb connected'));
mongoose.connection.on('disconnected', () => log.info('MongoDb disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log.fatal('MongoDb disconnected through app termination');
    process.exit(1);
  });
});

/**
 * Initialize models
 */

const files = fs.readdirSync(path.join(__dirname, '../schemas'));
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
files.forEach(file => require(`../schemas/${file}`));
/* eslint-enable global-require */
/* eslint-enable import/no-dynamic-require */
