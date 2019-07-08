import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from 'typeorm'
import { Ticket } from './Ticket'

@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column("bigint")
    datetime: number

    @OneToMany(type => Ticket, ticket => ticket.event)
    tickets: Ticket[];
}

