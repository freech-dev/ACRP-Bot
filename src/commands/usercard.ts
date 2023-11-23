import { CommandInteraction, ApplicationCommandTypes } from "oceanic.js";
import MemberCanvas from "../structs/canvas";
import { OceanBubble } from "../structs/oceanicbubble";
import { Command } from "../structs/command";

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
        let canvas = new MemberCanvas();
        await canvas.drawImage('https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg');
        const dataUrl = canvas.getCanvas();
        const base64Image = dataUrl.split(",")[1];
        const buffer = Buffer.from(base64Image, 'base64');

        await interaction.createMessage({
            embeds: [
                {
                    image: {
                        url: `${buffer}`
                    }
                }
            ]
        });
    }
}