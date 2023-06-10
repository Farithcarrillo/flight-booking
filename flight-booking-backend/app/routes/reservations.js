const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const { getItems, getItem, createItem } = require('../controllers/reservations');

/**
 * Route: GET /:id
 * Description: Get a specific reservation by ID
 */
router.get('/:id', getItem);

/**
 * Route: POST /
 * Description: Create a new reservation
 */
router.post('/', createItem);

module.exports = router;
