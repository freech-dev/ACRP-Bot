import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    ServerID: Number
}