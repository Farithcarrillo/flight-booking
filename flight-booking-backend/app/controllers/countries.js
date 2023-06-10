const { httpError } = require("../helpers/handleError");
const pool = require("../../config/db");

/**
 * Retrieve a list of items from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getItems = async (req, res) => {
  try {
    // Retrieve distinct airline, origin, and destination from the flights table
    const result = await pool.query("SELECT DISTINCT airline, origin, destination FROM flights");
    // Send the retrieved items as a JSON response
    res.json(result.rows);
  } catch (e) {
    // Handle any errors that occur during the execution
    httpError(res, e);
  }
};

module.exports = { getItems };
