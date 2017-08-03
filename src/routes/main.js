/**
 * Dependencies
 */

import express from 'express';
import gate from './gate';

/**
 * Private
 */

const router = express.Router();

/**
 * Routes
 */

//  User
router.post('/v1/user', gate.register);
router.post('/v1/user/login', gate.login);

/**
 * Interface
 */

export default router;
