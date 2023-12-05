import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bans {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    BanID: Number

    @Column()
    BanDate: string

    @Column()
    BanLength: string
}