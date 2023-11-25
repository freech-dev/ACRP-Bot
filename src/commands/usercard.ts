import axios from "axios";
import { ApplicationCommandTypes, CommandInteraction } from "oceanic.js";
import { Command } from "../structs/command";
import { OceanBubble } from "../structs/oceanicbubble";

export default class UserCardCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "usercard",
            description: "shows the user's xp, lvl, and more",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
            },
        });
    }

    public async interactionRun(interaction: CommandInteraction) {
        interaction.defer(1 << 7)
        const response = await axios.post(`${process.env.APISERVER}/v1/imageProcessing/usercard`, {
            url: "https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg"
        }, {
            responseType: "arraybuffer",
        });

        let embedImageIdentification = `usercard__${interaction.user.id}.png`
        const embedImageAfterGeneration = response.data
        console.log(embedImageAfterGeneration)
        await interaction.createFollowup({
            embeds: [
                {
                    image: {
                        url: `attachment://${embedImageIdentification}`  
                    }
                }
            ],
            files: [
                {
                    name: embedImageIdentification,
                    contents: embedImageAfterGeneration
                }
            ]
        });
    }
}