/**
 * Dependencies
 */

import userController from '../controllers/gate/user';
import authController from '../controllers/gate/auth';
import { sendOK } from '../lib/response';
import { validate } from '../lib/params';

/**
 * Public
 */

async function register(req, res, next) {
  try {
    const {
      username, firstname, lastname,
      email, password,
    } = validate(req.body, [
      { param: 'username', required: true },
      { param: 'firstname', required: true },
      { param: 'lastname', required: true },
      { param: 'email', required: true },
      { param: 'password', required: true },
    ]);

    const userDoc = await userController.register({
      username, firstname, lastname,
      email, password });

    const user = userDoc.toObject();
    delete user.password;
    return sendOK(res, userDoc);
  } catch (e) {
    return next(e);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = validate(req.body, [
      { param: 'username', required: true },
      { param: 'password', required: true },
    ]);
    const userDoc = await authController.login({ username, password });

    const user = userDoc.toObject();
    delete user.password;
    return sendOK(res, user);
  } catch (e) {
    return next(e);
  }
}

async function checkpoint(req, res, next) {
  try {
    const { token } = validate(req.headers, [
      { param: 'token', required: true },
    ]);

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
    const { userId } = validate(req.params, [
      { param: 'id', name: 'user_id', required: true },
    ]);

    const userDoc = await userController.get(userId);
    return sendOK(res, userDoc);
  } catch (e) {
    return next(e);
  }
}

async function completeProfile(req, res, next) {
  try {
    const {
      userId, gender, orientation,
      bio, interests, pictures,
    } = validate({ ...req.params, ...req.body }, [
      { param: 'id', name: 'user_id', requires: true },
      { param: 'gender', requires: true },
      { param: 'orientation', requires: true },
      { param: 'bio', requires: true },
      { param: 'interests', requires: true },
      { param: 'pictures', requires: true },
    ]);

    const userDoc = await userController.complete({
      userId, gender, orientation, bio,
      interests, pictures,
    });

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
  completeProfile,
};
