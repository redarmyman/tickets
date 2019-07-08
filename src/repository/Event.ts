import { getRepository } from 'typeorm'

import { Event } from '../entity/Event'

export const getEvent = async (eventId: number) => {
  return getRepository(Event)
    .createQueryBuilder("event")
    .where("event.id = :id", { id: eventId })
    .getOne()
}

export const getReservation = async (reservationId: number) => {
  return getRepository(Event)
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.tickets", "ticket")
    .andWhere(`ticket.reservationId = :rid`, { rid: reservationId })
    .getOne()
}
