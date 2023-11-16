import { CommandInteraction, Constants, Message } from "oceanic.js";
import { CommandOptions } from "./types";
import { OceanBubble } from "./oceanicbubble";

export abstract class Command {
    protected client: OceanBubble;
    public options: CommandOptions;

    constructor(client: OceanBubble, options: CommandOptions) {
        this.client = client;
        this.options = options;
    }

    public interactionRun (interaction: CommandInteraction): void | Promise<void> {}
    public messageContext (interaction: CommandInteraction): void | Promise<void> {}
    public userContext (interaction: CommandInteraction): void | Promise<void> {}
}