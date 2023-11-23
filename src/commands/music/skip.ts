import { OceanBubble } from "../../structs/oceanicbubble";
import { Command } from "../../structs/command";
import { CommandInteraction, AnyInteractionChannel, Uncached, ApplicationCommandTypes } from "oceanic.js";

export default class SkipCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "skip",
            description: "skip the current song in queue",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
            },
        });
        this.interactionRun = this.interactionRun.bind(this)
    }

    public interactionRun(interaction: CommandInteraction<AnyInteractionChannel | Uncached>): void | Promise<void> {
        this.client.player.skip(1)

        interaction.createMessage({
            content: `Skipped the current song playing`
        });
    }
}