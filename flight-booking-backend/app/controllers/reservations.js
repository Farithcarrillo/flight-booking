const { httpError } = require("../helpers/handleError");
const pool = require("../../config/db");

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
    const result = await pool.query(
      "SELECT * FROM reservations JOIN flights ON reservations.flight_id = flights.id WHERE reservations.id = $1",
      [id]
    );

    // Send the retrieved item as a JSON response
    res.json(result.rows);
    next();
  } catch (e) {
    // Handle any errors that occur during the execution
    httpError(res, e);
  }
};

/**
 * Create a new item in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createItem = async (req, res) => {
  try {
    // Extract the necessary fields from the request body
    const {
      flight_id,
      passenger_identification,
      passenger_name,
      passenger_email,
      passenger_phone,
      passenger_qty_reservation,
    } = req.body;

    // Perform a database query to insert the new item and return its ID
    const result = await pool.query(
      "INSERT INTO reservations (flight_id, passenger_identification, passenger_name, passenger_email, passenger_phone, passenger_qty_reservation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        flight_id,
        passenger_identification,
        passenger_name,
        passenger_email,
        passenger_phone,
        passenger_qty_reservation,
      ]
    );

    console.log(result);
    // Send the newly created item's ID as a JSON response
    res.json(result.rows[0]);
  } catch (e) {
    // Handle any errors that occur during the execution
    httpError(res, e);
  }
};

module.exports = { getItem, createItem };
