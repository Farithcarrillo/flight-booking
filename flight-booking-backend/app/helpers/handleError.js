/**
 * Send an HTTP error response.
 * @param {Object} res - The response object.
 * @param {Error} err - The error object.
 * @returns {void}
 */
const httpError = (res, err) => {
    res.status(500);
    res.send({ error: 'Something went wrong', err });
  };
  
  module.exports = { httpError };
  