import { CommandInteraction, ApplicationCommandTypes } from "oceanic.js";
import MemberCanvas from "../struts/canvas";
import { OceanBubble } from "../struts/oceanicbubble";
import { Command } from "../struts/command";

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
        const buffer = canvas.getCanvas().toBuffer();
        const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;
        await interaction.createMessage({
            embeds: [
                {
                    image: {
                        url: base64Image
                    }
                }
            ]
        });
    }
}