# node-js-project

Heroku URL: https://shielded-island-02861.herokuapp.com/


For getting results hit the below URL with the fit HTTP method and JSON body. For example;

Request:

URL: https://shielded-island-02861.herokuapp.com/api/results/

Method: POST

Json body: 
```
{
    "startDate": "2016-04-29",
    "endDate": "2021-04-29",
    "minCount": 100,
    "maxCount": 100
}
```

Excepted Result (Success Case):
```
{
    "msg": "Success",
    "code": 0,
    "records": [
        {
            "key": "jAbkYSEl",
            "createdAt": "2016-09-22T13:24:00.399Z",
            "totalCount": 100
        },
        {
            "key": "pPlvoNiR",
            "createdAt": "2016-09-12T17:56:16.500Z",
            "totalCount": 100
        },
        {
            "key": "dlTqsNKs",
            "createdAt": "2016-08-27T16:27:42.671Z",
            "totalCount": 100
        }
    ]
}
```


URLs other than this URL returns <b>Not Found</b> message.

Test files are under the tests directory and it includes validation error tests and success case test.



