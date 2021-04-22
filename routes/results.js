const express = require("express");
const createError = require('http-errors');
const router = express.Router();
const assert = require('assert');
const mongodb = require("mongodb");

const { check, validationResult } = require('express-validator');
const createHttpError = require("http-errors");


// Variables for database connection
const MongoClient = mongodb.MongoClient;
const connectionStr = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir- case-study?retryWrites=true";

// Using POST http method for getting results 
router.post('/', [
  check('startDate').isDate(delimiters = ['-']),
  check('endDate').isDate(delimiters = ['-']),
  check('minCount').isNumeric(),
  check('maxCount').isNumeric(),
], function (req, res, next) {

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw createHttpError(400)
  }

  try {
    MongoClient.connect(connectionStr, function (err, client) {

      assert.strictEqual(null, err);

      const db = client.db('getir-case-study');

      // Async call
      let myPromise = () => {

        return new Promise((resolve, reject) => {

          db.collection('records').aggregate([ 
            {
              // First aggregation stage
              $project: {
                _id :1,
                key :1,
                createdAt: 1,
                totalCount: { $sum: "$counts"},
              }
            },
            // Second aggregation stage
            {
              $match: {
                "totalCount": { $gte: req.body.minCount, $lte: req.body.maxCount, },
                "createdAt": {
                  $gte: new Date(req.body.startDate),
                  $lte: new Date(req.body.endDate)
                },
              }
            }
          ]).toArray(function (err, data) {
            err
              ? reject(err)
              : resolve(data);
          });
        });
      };

      let callMyPromise = async () => {

        let result = await (myPromise());
        let results = []

        result.forEach(item => {
          results.push(
            {
              'key': item.key,
              'createdAt': item.createdAt,
              'totalCount': item.totalCount
            });

        });

        res.status(200).json(
          {
            'msg': 'Success',
            'code': 0,
            'records': results
          });

      };
      callMyPromise();
    });

  } catch (e) {
    next(e);
  }

});

module.exports = router;