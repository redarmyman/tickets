import {MigrationInterface, QueryRunner} from 'typeorm'
import { Event } from '../entity/Event'
import { Ticket, SellingOption } from '../entity/Ticket'

export class InitialData1562239731642 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      const event = new Event()
      event.name = "LaoChe Concert"
      event.datetime = Date.now()
      await queryRunner.connection.manager.save(event)

      const ticket1 = new Ticket()
      ticket1.event = event
      await queryRunner.connection.manager.save(ticket1)

      const ticket2 = new Ticket()
      ticket2.event = event
      await queryRunner.connection.manager.save(ticket2)

      const ticket3 = new Ticket()
      ticket3.event = event
      await queryRunner.connection.manager.save(ticket3)

      const event2 = new Event()
      event2.name = "Berlingomania"
      event2.datetime = Date.now()
      await queryRunner.connection.manager.save(event2)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`TRUNCATE TABLE "ticket" CASCADE`)
      await queryRunner.query(`TRUNCATE TABLE "event" CASCADE`) 
    }
}
