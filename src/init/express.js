/**
 * Dependencies
 */

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { log } from '../lib/logger';
import { sendError } from '../lib/response';

/**
 * Private
 */

const app = express();


/**
 * Middlewares
 */

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes
 */

app.use('/', require('../routes/main'));

/**
 * Errors
 */

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  log.error(`Handled: ${error.name}`, error);
  return sendError(res, error);
});

/**
 * Initialize
 */

app.listen(5000, () => log.info('Express listening on 5000'));
