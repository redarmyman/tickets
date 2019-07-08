import { getConnection } from 'typeorm'

import * as utils from '../utils/db'
import { Event } from '../../src/entity/Event'
import { Ticket } from '../../src/entity/Ticket' 
import * as tickets from '../../src/repository/Ticket'

describe('Tickets Repository', () => {
  beforeAll(async () => {
    await utils.initializeDb()
  })

  afterEach(async () => {
    await utils.cleanDb()
  })

  describe('getAvailableTickets', () => {
    test('it should return correct number of available tickets 1/2', async () => {
      const available = await tickets.getAvailableTickets(1)

      expect(available).toStrictEqual({
        sum: '0',
        normal: null,
        even: null,
        all_together: null,
        avoid_one: null
      })
    })

    test('it should return correct number of available tickets 2/2', async () => {
      const event = new Event()
      event.name = "LaoChe Concert"
      event.datetime = Date.now()
      await getConnection().manager.save(event)

      const ticket1 = new Ticket()
      ticket1.sellingOption = 'even'
      ticket1.event = event
      await getConnection().manager.save(ticket1)

      const ticket2 = new Ticket()
      ticket2.sellingOption = 'even'
      ticket2.event = event
      await getConnection().manager.save(ticket2)

      const ticket3 = new Ticket()
      ticket3.sellingOption = 'avoid_one'
      ticket3.event = event
      await getConnection().manager.save(ticket3)

      const event2 = new Event()
      event2.name = "Berlingomania"
      event2.datetime = Date.now()
      await getConnection().manager.save(event2)

      const ticket4 = new Ticket()
      ticket4.sellingOption = 'avoid_one'
      ticket4.event = event
      await getConnection().manager.save(ticket4)

      const available = await tickets.getAvailableTickets(1)
      expect(available).toStrictEqual({
        sum: '3',
        normal: '0',
        even: '2',
        all_together: '0',
        avoid_one: '1'
      })
    }) 
  })
})
