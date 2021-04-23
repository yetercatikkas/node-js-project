const app = require('../app')
const assert = require('assert');
const request = require('supertest');


describe('Post Endpoint Success Check', () => {
  it('Should return success case results', async () => {
    const res = await request(app)
      .post('/api/results')
      .send({
        startDate: "2016-04-29",
        endDate: "2021/04/29",
        minCount: 100,
        maxCount: 100
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('code')
    expect(res.body).toHaveProperty('msg')
    expect(res.body.msg).toEqual('Success')
    expect(res.body).toHaveProperty('records')

  })
})


describe('Post Endpoint Required Fields Check', () => {
  it('should return that maxCount is required text with 400 status code if maxCount not assigned to request body', async () => {
    const res = await request(app)
      .post('/api/results')
      .send({
        startDate: "2016-04-20",
        endDate: "2021-04-29",
        minCount: 100,
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body.msg).toEqual('maxCount is required')
  })
})


describe('Post Endpoint Date Format Not Valid Check', () => {
  it('should return that valid date format text with 400 status code if the start date format is not valid', async () => {
    const res = await request(app)
      .post('/api/results')
      .send({
        startDate: "2016.04.20",
        endDate: "2021-04-29",
        minCount: 100,
        maxCount: 100
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body.msg).toEqual('startDate format is invalid. Valid date format is that: YYYY-MM-DD')
  })
})


describe('Post Endpoints Start Date Greater Than End Date', () => {
  it('should return not valid message with 400 status code if the start date is greater than end date', async () => {
    const res = await request(app)
      .post('/api/results')
      .send({
        startDate: "2016-04-29",
        endDate: "2015-04-29",
        maxCount: 100,
        minCount: 100
      })
    assert.ok(res.text.includes('startDate must be less than or equal endDate'));
    assert.strictEqual(res.statusCode, 400)
  })
})