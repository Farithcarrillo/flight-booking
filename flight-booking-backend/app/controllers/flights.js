const { httpError } = require("../helpers/handleError");
const pool = require("../../config/db");

/**
 * Retrieve items from the database based on specific criteria.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const getItems = async (req, res, next) => {
  try {
    // Retrieve query parameters from the request object
    const from = req.query.param1;
    const to = req.query.param2;
    const date = req.query.param3;
    const peopleQty = req.query.param4;

    // Perform a database query using the specified criteria
    const result = await pool.query(
      "SELECT * FROM flights WHERE origin = $1 AND destination = $2 AND departure_date >= $3 AND available_seats > $4",
      [from, to, date, peopleQty]
    );
    
    // Send the retrieved items as a JSON response
    res.json(result.rows);
    next();
  } catch (e) {
    // Handle any errors that occur during the execution
    httpError(res, e);
  }
};

/**
 * Retrieve a specific item from the database by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const getItem = async (req, res, next) => {
  try {
    // Retrieve the ID from the request parameters
    const { id } = req.query;

    // Perform a database query to retrieve the item by its ID
    const result = await pool.query("SELECT * FROM flights WHERE id = $1", [id]);

    // Send the retrieved item as a JSON response
    res.json(result.rows);
    next();
  } catch (e) {
    // Handle any errors that occur during the execution
    httpError(res, e);
  }
};

module.exports = { getItems, getItem };
