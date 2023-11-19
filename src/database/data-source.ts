import "reflect-metadata";
import { DataSource } from "typeorm";
import { Member } from "./entity/member";

export const AppDataSource = new DataSource({
    database: "OceanBubble",
    type: "mysql",
    url: `${process.env.MARINADB}`,
    synchronize: true,
    logging: false,
    entities: [Member],
    migrations: [],
    subscribers: [],
});