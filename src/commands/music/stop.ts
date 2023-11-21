import { OceanBubble } from "../../struts/oceanicbubble";
import { Command } from "../../struts/command";
import { CommandInteraction, AnyInteractionChannel, Uncached } from "oceanic.js";
import { Queue } from "../../struts/queue";

export default class StopCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "stop",
            description: "stop the queue and music playing",
        });
        this.interactionRun = this.interactionRun.bind(this)
    }

    public interactionRun(interaction: CommandInteraction<AnyInteractionChannel | Uncached>): void | Promise<void> {
        this.client.player.destroy()
        
        interaction.createMessage({
            content: `I have left and stopped playing music!`
        });
    }
}