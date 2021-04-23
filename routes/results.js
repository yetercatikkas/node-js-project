const express = require("express");
const router = express.Router();

const { validateDates, validateCounts } = require('../validations/validator')
const resultsController = require('../controllers/results');

router.post('/', [validateDates, validateCounts], resultsController.listResults)

module.exports = router;