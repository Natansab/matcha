/**
 * Dependencies
 */

import userController from '../controllers/gate/user';
import authController from '../controllers/gate/auth';

/**
 * Public
 */

async function register(req, res, next) {
  try {
    const { username, firstname, lastname, email, password } = req.body;
    const userDoc = await userController.register({ username, firstname, lastname, email, password });

    const user = userDoc.toObject();
    delete user.password;
    return res.json({ code: 200, userDoc });
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
    return res.json({ code: 200, user });
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
};
