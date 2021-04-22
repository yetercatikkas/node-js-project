const request = require('supertest')
const app = require('../app')
const assert = require('assert');



describe('Post Endpoints', () => {
  it('should return success case results', async () => {
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


describe('Post Endpoints', () => {
    it('should return 400 if the start date is not valid', async () => {
      const res = await request(app)
        .post('/api/results')
        .send({
              startDate: "2016-04-",
              endDate: "2021/04/29",
              minCount: 100,
              maxCount: 100
          
        })
      expect(res.statusCode).toEqual(400)
    })
  })


  describe('Post Endpoints', () => {
    it('should return 400 if the min count is not passed through the body', async () => {
      const res = await request(app)
        .post('/api/results')
        .send({
              startDate: "2016-04-29",
              endDate: "2021/04/29",
              maxCount: 100
          
        })
        assert.ok(res.text.includes('Bad Request'));
        assert.strictEqual(res.statusCode, 400)
      })
  })