const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const { getItems, getItem, createItem } = require('../controllers/flights');

/**
 * Route: GET /
 * Description: Get all items
 */
router.get('/', getItems);

/**
 * Route: GET /:id
 * Description: Get item by ID
 */
router.get('/:id', getItem);

module.exports = router;
