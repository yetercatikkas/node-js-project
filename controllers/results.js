const createHttpError = require("http-errors");
const recordsService = require("../services/records");
const { validationResult } = require('express-validator');

exports.listResults = async (req, res, next) => {
    let errors = validationResult(req)

    try {
        if (!errors.isEmpty()) {
            throw createHttpError(400, errors.errors[0].msg)
        }
        recordsService.getResults(req.body.startDate, req.body.endDate, req.body.minCount, req.body.maxCount, res)
                  
    } catch (e) {
        next(e);
    }

}