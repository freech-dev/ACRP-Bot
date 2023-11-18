import "reflect-metadata";
import { DataSource } from "typeorm";
import { Member } from "./entity/member";

export const AppDataSource = new DataSource({
    type: "mariadb",
    url: `${process.env.MARINADB}`,
    database: "OceanBubble",
    synchronize: true,
    logging: false,
    entities: [Member],
    migrations: [],
    subscribers: [],
});