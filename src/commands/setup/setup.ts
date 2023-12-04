import { OceanBubble } from "../../structs/oceanicbubble";
import { Command } from "../../structs/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes, ButtonStyles, ComponentTypes, MessageActionRow, ComponentInteraction, EmbedOptions, Message } from "oceanic.js";

export default class SetupCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "Setup",
            description: "setup the bots features",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
            }
        });
        this.interactionRun = this.interactionRun.bind(this)
    }

    public async interactionRun(interaction: CommandInteraction) {

    }

    public async buttonInteraction(interaction: ComponentInteraction) {

    }
}