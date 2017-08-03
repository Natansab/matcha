/**
 * Dependencies
 */

// import { sendOK } from '../lib/response';
import userController from '../controllers/gate/user';

/**
 * Public
 */

async function register(req, res, next) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const userDoc = await userController.register({ firstname, lastname, email, password });

    return res.json({ code: 200, userDoc });
  } catch (e) {
    return next(e);
  }
}

/**
 * Interface
 */

export default {
  register,
};
