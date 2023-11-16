import { Client, ClientOptions, Collection } from "oceanic.js";

import * as winston from 'winston';
import { Logger, createLogger } from "winston";

import { Config } from "./types";
import { Command } from "./command";
import { Handler } from "./handler";

export class OceanBubble extends Client {
    public logger: Logger;
    public handler: Handler;
    public commands: Collection<string, Command>;
    public alias: Collection<string, string>;
    public config: Config;
    firstReady = false;

    public constructor (options?: ClientOptions){
        super(options);

        this.commands = new Collection<string, Command>();
        this.alias = new Collection<string, string>();
        this.handler = new Handler(this);

        this.logger = createLogger({
            level: process.env.NODE_ENV === "production" ? "info" : "debug",
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            ]
        });
    }
}