const assert = require('assert');

const connectionStr = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir- case-study?retryWrites=true";

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

exports.queryRecords = (startDate, endDate, minCount, maxCount, res) => {

    MongoClient.connect(connectionStr, function (err, client) {

        assert.strictEqual(null, err);

        const db = client.db('getir-case-study');

        let myPromise = () => {
            return new Promise((resolve, reject) => {

                db.collection('records').aggregate([
                    {
                        // First aggregation stage
                        $project: {
                            _id: 1,
                            key: 1,
                            createdAt: 1,
                            totalCount: { $sum: "$counts" },
                        }
                    },
                    // Second aggregation stage
                    {
                        $match: {
                            "totalCount": { $gte: minCount, $lte: maxCount, },
                            "createdAt": {
                                $gte: new Date(startDate),
                                $lte: new Date(endDate)
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
            return result;

        };

        callMyPromise().then(function (result) {
            let records = []
            client.close();

            result.forEach(item => {
                records.push(
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
                    'records': records
                });

        });
    })
}
