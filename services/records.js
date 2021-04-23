const dbRecords = require("../db/records");

exports.getResults = (startDate, endDate, minCount, maxCount, res) => {
  dbRecords.queryRecords(
    startDate, endDate, minCount, maxCount, res
  )
}