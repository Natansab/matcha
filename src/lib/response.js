/**
 * Public
 */

function sendOK(res, data) {
  return res.json({
    code: 200,
    data,
  });
}

function sendError(res, error) {
  return res.json({
    code: 500,
    name: error.name,
    message: error.message,
  });
}

/**
 * Interface
 */

export default {
  sendOK,
  sendError,
};
