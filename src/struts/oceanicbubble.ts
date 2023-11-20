import { Client, ClientOptions, Collection, CommandInteraction } from "oceanic.js";

import * as winston from 'winston';
import { Logger, createLogger } from "winston";

import { Config } from "./types";
import { Command } from "./command";
import { Handler } from "./handler";

import { Vulkava, Player } from "vulkava";
import { Queue } from "./queue";

export class OceanBubble extends Client {
    public logger: Logger;
    public handler: Handler;
    public commands: Collection<string, Command>;
    public alias: Collection<string, string>;
    public config: Config;
    public vulkava: Vulkava;
    public player: Player;
    
    firstReady = false;
    interactionRun: any;

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

        this.vulkava = new Vulkava({
            nodes: [
                {
                    id: `OceanBubble`, 
                    hostname: process.env.LAVALINK || `OceanBubble`, 
                    port: 25558, 
                    password: process.env.LAVALINKPASS
                }
            ],
            sendWS: (guildId, payload) => {
                this.rest.client.guilds.get(guildId)?.shard.send(payload.op, payload.d)
            },
        })

        this.vulkava.on('trackStart', (player, track) => {
            this.logger.info(`[Vulkava] Now playing: ${track.title}`)
            this.channelGuildMap
        });
        
        this.vulkava.on('queueEnd', (player) => {
            player.destroy();
        });
        
        this.vulkava.on('error', (node, err) => {
            this.logger.error(`[Vulkava] Error on node ${node.identifier}`, err.message)
        });
    }

    createPlayer(interaction: CommandInteraction) {
        this.player = this.vulkava.createPlayer({
            guildId: interaction.guild?.id!,
            voiceChannelId: interaction.member?.voiceState?.channelID ?? '',
            textChannelId: interaction.channel?.id,
            selfDeaf: true,
            queue: new Queue()
        });
    }
}