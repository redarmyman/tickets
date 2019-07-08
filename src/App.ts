import * as express from 'express'
import * as bodyParser from 'body-parser'

import { PaymentGateway } from './payment/PaymentGateway'

import "reflect-metadata"

import * as events from './repository/Event'
import * as tickets from './repository/Ticket'

class App {
  public express

  constructor () {
    this.express = express()

    this.express.use(bodyParser.urlencoded());
    this.express.use(bodyParser.json())

    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()

    router.get('/', (req, res) => {
      res.json({
        message: 'OK!'
      })
    })

    router.get('/events/:id', async (req, res) => {
      const event = await events.getEvent(req.params.id)

      if (!event) {
        return res.status(404).end()
      }

      res.status(200).send({
        ...event,
        datetime: new Date(+event.datetime)
      })
    })

    router.get('/events/:id/tickets', async (req, res) => {
      const data = await tickets.getAvailableTickets(req.params.id)

      res.status(200).send(data)
    })

    router.post('/events/:id/tickets', async (req, res) => {
      const available =  await tickets.getAvailableTickets(req.params.id)
      const reservation = await tickets.reserveTickets(available, req.body.quantity, req.params.id)

      if (!reservation) {
        return res.status(400).end()
      }

      return res.status(200).send({ reservationId: reservation })
    })

    router.get('/reservations/:rid', async(req, res) => {
      const event = await events.getReservation(req.params.rid)

      if (!event) {
        return res.status(404).end()
      }

      return res.status(200).send({
        ...event,
        datetime: new Date(+event.datetime),
        tickets: event.tickets.length
      })
    })

    router.post('/reservations/:rid', async (req, res) => {
      const event = await events.getReservation(req.params.rid)

      if (!event) {
        return res.status(404).end()
      }

      const payment = new PaymentGateway()
      try {
        await payment.charge(100, req.body.token)
      } catch (e) {
        return res.status(400).send({
          message: e.message
        })
      }

      tickets.sellTickets(req.params.rid)

      res.status(204).end()    
    })

    this.express.use('/', router)
  }
}

export default new App().express
