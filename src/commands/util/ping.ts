import { OceanBubble } from "../../struts/oceanicbubble";
import { Command } from "../../struts/command";
import { ApplicationCommandTypes, ApplicationCommandOptionTypes, AnyInteractionChannel, CommandInteraction, Uncached } from "oceanic.js";

export default class PlayCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "play",
            description: "plays a song",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
                options: [
                    {
                        name: "url",
                        description: "song url or playlist url",
                        type: ApplicationCommandOptionTypes.STRING,
                        required: true
                    }
                ]
            }
        });
        this.interactionRun = this.interactionRun.bind(this)
    }

    public interactionRun(interaction: CommandInteraction<AnyInteractionChannel | Uncached>): void | Promise<void> {
        
    }
}