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

    return res.json({ code: 200, userDoc });
  } catch (e) {
    return next(e);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const connected = await authController.login({ email, password });

    return res.json({ code: 200, connected });
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
