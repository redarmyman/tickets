import {MigrationInterface, QueryRunner} from 'typeorm'
import { Event } from '../entity/Event'
import { Ticket, SellingOption } from '../entity/Ticket'

export class InitialData1562239731642 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`INSERT INTO "event"("name", "datetime") VALUES ('Concert #1',` +  Date.now() + ')');
      await queryRunner.query(`INSERT INTO "ticket"("eventId") VALUES (1)`);
      await queryRunner.query(`INSERT INTO "ticket"("eventId") VALUES (1)`);
      await queryRunner.query(`INSERT INTO "ticket"("eventId") VALUES (1)`);

      await queryRunner.query(`INSERT INTO "event"("name", "datetime") VALUES ('Concert #2',` +  Date.now() + ')');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`TRUNCATE TABLE "ticket" CASCADE`)
      await queryRunner.query(`TRUNCATE TABLE "event" CASCADE`) 
    }
}
