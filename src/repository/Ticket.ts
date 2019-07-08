import * as uuid from 'uuid/v4'

import { getRepository } from 'typeorm'

import { Ticket } from '../entity/Ticket'

interface AvailableTicketsQuantity {
  sum: number
  normal: number
  even: number
  all_together: number
  avoid_one: number
}

export const getAvailableTickets = async (id): Promise<AvailableTicketsQuantity> => {
  const { sum, normal, even, all_together, avoid_one } = await getRepository(Ticket)
    .createQueryBuilder("ticket")
    .select("COUNT(*)", "sum")
    .addSelect(`SUM(CASE WHEN "sellingOption"='normal' THEN 1 ELSE 0 END)`, "normal") 
    .addSelect(`SUM(CASE WHEN "sellingOption"='even' THEN 1 ELSE 0 END)`, "even")
    .addSelect(`SUM(CASE WHEN "sellingOption"='all_together' THEN 1 ELSE 0 END)`, "all_together")
    .addSelect(`SUM(CASE WHEN "sellingOption"='avoid_one' THEN 1 ELSE 0 END)`, "avoid_one")
    .where(`ticket."eventId" = :id`, { id })
    .andWhere(`(ticket."reservedTo" IS NULL OR ticket."reservedTo" < :ts)`, { ts: Date.now() })
    .andWhere(`ticket.status != :status`, { status: 'sold' })
    .getRawOne();

  return { sum, normal, even, all_together, avoid_one }
}

export const reserveTickets =
  async (availableTickets: AvailableTicketsQuantity, quantity: number, eventId: number) => {
    if (availableTickets.sum == 0 || availableTickets.sum < quantity) {
      return false
    }

    if (
      availableTickets.avoid_one == availableTickets.sum
      && availableTickets.sum - quantity == 1
    ) {
      return false
    }

    if (availableTickets.even == availableTickets.sum && quantity%2 != 0) {
      return false
    }

    if (
      availableTickets.all_together == availableTickets.sum
      && quantity != availableTickets.all_together
    ) {
      return false
    }

    const reservationId = uuid()

    const tickets = await getRepository(Ticket)
      .createQueryBuilder("ticket")
      .where(`ticket."eventId" = :id`, { id: eventId })
      .andWhere(`(ticket."reservedTo" IS NULL OR ticket."reservedTo" < :ts)`, { ts: Date.now() })
      .andWhere(`ticket.status != :status`, { status: 'sold' })
      .limit(quantity)
      .getMany()

    for (let ticket of tickets) {
      await getRepository(Ticket)
        .createQueryBuilder()
        .update(Ticket)
        .set({ reservationId: reservationId, reservedTo: Date.now() + 900000 })
        .where(`id = :id`, { id: (ticket as Ticket).id })
        .execute()
    }

    return reservationId
  }

export const sellTickets = async (reservationId: number) => {
  await getRepository(Ticket)
    .createQueryBuilder()
    .update(Ticket)
    .set({ reservedTo: null, status: 'sold' })
    .where(`reservationId = :id`, { id: reservationId })
    .execute()
}
