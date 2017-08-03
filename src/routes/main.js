/**
 * Dependencies
 */

import express from 'express';
import bodyParser from 'body-parser';
import gate from './gate';

/**
 * Private
 */

const router = express.Router();
const app = express();

/**
 * Middlewares
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes
 */

//  User
router.post('/v1/user', gate.register);

/**
 * Interface
 */

export default router;
