/**
 * Dependencies
 */

import error from '../lib/error';

/**
 * Errors
 */

const ForbiddenError = error.build('ForbiddenError');

/**
 * Public
 */

function permit(req, message, assertions = []) {
  if (req.auth.scope === 'root') return;

  const pass = assertions.reduce((acc, assertion) => acc || assertion, false);
  if (!pass) throw new ForbiddenError({ message });
}

/**
 * Interface
 */

export default {
  permit,
};
