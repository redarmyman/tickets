import app from '../src/App'
import * as request from 'supertest'

describe('Tickets Repository', () => {
  describe('GET event/:id', () => {
    test('it should return data aboutn event', async () => {
      const result = await request(app).get("/")

      expect(result.text).toEqual('{"message":"OK!"}')
      expect(result.statusCode).toEqual(200)
    })
  })
})
