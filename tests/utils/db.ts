import {createConnection, getConnection} from 'typeorm'

import { Event } from '../../src/entity/Event'
import { Ticket } from '../../src/entity/Ticket'

export const initializeDb = async () => {
  await createConnection()
}

export const cleanDb = async () => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Ticket)
    .execute()
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Event)
    .execute()
}
