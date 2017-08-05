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
router.get('/v1/user/:id', gate.checkpoint, gate.getUser);
router.post('/v1/user/:id/complete', gate.checkpoint, gate.completeProfile);

/**
 * Interface
 */

export default router;
