import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {Event} from './Event'

export type SellingOption = 'normal' | 'even' | 'avoid_one' | 'all_together'

export type TicketStatus = 'free' | 'sold'

@Entity()
export class Ticket {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
    default: 'normal',
  })
  sellingOption: string

  @Column({
    type: 'text',
    default: 'free',
  })
  status: string

  @Column("bigint")
  reservedTo: number

  @Column('text')
  reservationId: string

  @ManyToOne(type => Event, event => event.tickets)
  event: Event
}
