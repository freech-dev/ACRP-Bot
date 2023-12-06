import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bans {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    BanID: string

    @Column()
    BanDate: number

    @Column()
    BanLength: string
}