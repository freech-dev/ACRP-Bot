import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    MemberID: string

    @Column()
    xp: number

    @Column()
    lvl: number
}