import { OceanBubble } from "../struts/oceanicbubble";
import { Command } from "../struts/command";
import { CommandInteraction, ApplicationCommandTypes } from "oceanic.js";

export default class ServerCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "lavender",
            description: "lavender is love, lavender is life",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
            },
        });
    }

    public async interactionRun(interaction: CommandInteraction) {
        interaction.createMessage({
            content: `Lavender is love, Lavender is life`,
            embeds: [
                {
                    author: {
                        name: `hunnylav3nder`
                    },

                    fields: [
                        {
                            name: 'Twitch',
                            value: 'https://www.twitch.tv/weapingwillowvr'
                        },
                        {
                            name: `Tiktok`,
                            value: `https://www.tiktok.com/@localquestie?_t=8hKfLXiWvWd&_r=1`,
                        },
                        {
                            name: `Instagram`,
                            value: `https://instagram.com/lavender_artzy?igshid=NzZlODBkYWE4Ng==`
                        },
                        {
                            name: `Twiter`,
                            value: `https://x.com/WeapOfWill?s=09`
                        }
                    ],

                    image: {
                        url: 'https://cdn.discordapp.com/attachments/1173343116221231106/1173679154777038868/VRChat_2023-10-31_21-59-49.png?ex=6564d4e4&is=65525fe4&hm=95ab09e5121bd7182517bf0776ae9e574c8b3c358dc70cd19bde5f416196bef6&'
                    },

                    footer: {
                        text: `Lavender is one of Mythic's Best friends <3`
                    }
                }
            ]
        })
    }
}