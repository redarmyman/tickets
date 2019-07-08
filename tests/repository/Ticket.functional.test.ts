import app from '../../src/App'
import * as request from 'supertest'

import { Event } from '../../src/entity/Event'

import * as utils from '../utils/db'

import { getConnection } from 'typeorm'

describe('Tickets Repository', () => {
  beforeAll(async () => {
    await utils.initializeDb()
  })

  afterEach(async () => {
    await utils.cleanDb()
  })

  describe('GET event/:id', () => {
    test('it should return data aboutn event', async () => {
      const event = new Event()
      event.name = "LaoChe Concert"
      event.datetime = 1532436721432
      await getConnection().manager.save(event)

      const result = await request(app).get("/events/1")

      expect(result.text).toEqual(
        '{"id":1,"name":"LaoChe Concert","datetime":"2019-07-06T16:17:12.514Z"}'
      )
      expect(result.statusCode).toEqual(200)
    })
  })
})
