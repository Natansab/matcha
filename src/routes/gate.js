/**
 * Dependencies
 */

import lo from 'lodash';
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
      { param: 'email', required: true, transform: str => str.toLowerCase() },
      { param: 'password', required: true },
    ]);

    const userDoc = await userController.register({
      username, firstname, lastname,
      email, password });

    const user = userDoc.toObject();
    delete user.password;

    return sendOK(res, user);
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
      bio, interests, coordinates,
      dob,
    } = validate({ ...req.params, ...req.body }, [
      { param: 'id', name: 'user_id', required: true },
      { param: 'gender', required: true },
      { param: 'orientation', required: true },
      { param: 'bio', required: true },
      { param: 'interests', required: true },
      { param: 'coordinates', required: true },
      { param: 'dob', required: true },
    ]);

    if (!lo.get(req, 'auth.logged') || lo.get(req, 'auth.userId') !== userId) throw new Error('Wrong credentials');

    const userDoc = await userController.complete({
      userId, gender, orientation, bio,
      interests, coordinates,
      dob,
    });

    return sendOK(res, userDoc);
  } catch (e) {
    return next(e);
  }
}

async function uploadPic(req, res, next) {
  try {
    const { userId, picPath, profilPic } = validate({ ...req.params, ...req.file, ...req.body }, [
      { param: 'id', name: 'user_id', required: true },
      { param: 'path', name: 'pic_path', required: true },
      { param: 'profil', name: 'profil_pic', required: true },
    ]);

    if (!lo.get(req, 'auth.logged') || lo.get(req, 'auth.userId') !== userId) throw new Error('Wrong credentials');


    const userDoc = await userController.uploadPic(userId, picPath, profilPic);

    return sendOK(res, userDoc);
  } catch (e) {
    return next(e);
  }
}

async function like(req, res, next) {
  try {
    const { userId, relationId } = validate({ ...req.params, ...req.query }, [
      { param: 'id', name: 'user_id', required: true },
      { param: 'relation', name: 'relation_id', required: true },
    ]);

    if (!lo.get(req, 'auth.logged') || lo.get(req, 'auth.userId') !== userId) throw new Error('Wrong credentials');


    const userDoc = await userController.like(userId, relationId);

    return sendOK(res, userDoc);
  } catch (e) {
    return next(e);
  }
}

async function unlike(req, res, next) {
  try {
    const { userId, relationId } = validate({ ...req.params, ...req.query }, [
      { param: 'id', name: 'user_id', required: true },
      { param: 'relation', name: 'relation_id', required: true },
    ]);

    if (!lo.get(req, 'auth.logged') || lo.get(req, 'auth.userId') !== userId) throw new Error('Wrong credentials');

    const userDoc = await userController.unlike(userId, relationId);

    return sendOK(res, userDoc);
  } catch (e) {
    return next(e);
  }
}

async function report(req, res, next) {
  try {
    const { userId, reportedId } = validate({ ...req.params, ...req.query }, [
      { param: 'id', name: 'user_id', required: true },
      { param: 'reported', name: 'reported_id', required: true },
    ]);

    if (!lo.get(req, 'auth.logged') || lo.get(req, 'auth.userId') !== userId) throw new Error('Wrong credentials');

    await userController.report(userId, reportedId);

    return sendOK(res, 'OK');
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
  uploadPic,
  like,
  unlike,
  report,
};
