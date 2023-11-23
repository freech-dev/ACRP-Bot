import { OceanBubble } from "../../structs/oceanicbubble";
import { Command } from "../../structs/command";
import { CommandInteraction, AnyInteractionChannel, Uncached, ApplicationCommandTypes } from "oceanic.js";

export default class StopCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "stop",
            description: "stop the queue and music playing",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
            },
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