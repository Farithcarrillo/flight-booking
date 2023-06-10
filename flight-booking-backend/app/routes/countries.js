const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const { getItems, getItem, createItem } = require('../controllers/countries');

/**
 * Route: GET /
 * Description: Get items
 */
router.get('/', getItems);

module.exports = router;
