import { OceanBubble } from "../../struts/oceanicbubble";
import { Command } from "../../struts/command";
import { CommandInteraction, ApplicationCommandTypes } from "oceanic.js";

export default class ServerCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "database",
            description: "manages oceanbubbles database (dev only)",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
                precondition: (client, interaction) => {
                    return client.config.owners.includes(interaction.member!.id)
                },
            },
        });
    }

    public async interactionRun(interaction: CommandInteraction) {
        interaction.createMessage({
            content: `e`
        });
    }
}