/**
 * Dependencies
 */

import userController from '../controllers/gate/user';
import authController from '../controllers/gate/auth';
import { sendOK } from '../lib/response';

/**
 * Public
 */

async function register(req, res, next) {
  try {
    const { username, firstname, lastname, email, password } = req.body;
    const userDoc = await userController.register({ username, firstname, lastname, email, password });

    const user = userDoc.toObject();
    delete user.password;
    return sendOK(res, userDoc);
  } catch (e) {
    return next(e);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userDoc = await authController.login({ email, password });

    const user = userDoc.toObject();
    delete user.password;
    return sendOK(res, user);
  } catch (e) {
    return next(e);
  }
}

async function checkpoint(req, res, next) {
  try {
    const token = req.headers.token;

    const userId = await authController.check(token);
    Object.assign(req, {
      auth: { userId, logged: true },
    });

    return next();
  } catch (e) {
    return next(e);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.params.id;

    const userDoc = await userController.get(userId);
    return sendOK(res, userDoc);
  } catch (e) {
    return next(e);
  }
}
/**
 * Interface
 */

export default {
  register,
  login,
  checkpoint,
  getUser,
};
