import { OceanBubble } from "../../structs/oceanicbubble";
import { Command } from "../../structs/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes, ComponentInteraction, EmbedOptions } from "oceanic.js";

export default class GlobalBanCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "globalnick",
            description: "global nicks the user in all servers",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
                options: [
                    {
                        name: "user",
                        description: "user to ban",
                        type: ApplicationCommandOptionTypes.MENTIONABLE,
                        required: true
                    },
                    {
                        name: "nickname",
                        description: "nickname to set",
                        type: ApplicationCommandOptionTypes.STRING,
                        required: true
                    }
                ]
            }
        });
        this.interactionRun = this.interactionRun.bind(this)
    }

    public async interactionRun(interaction: CommandInteraction) {
        if(interaction.member?.permissions.has("CHANGE_NICKNAME")){
            const member = interaction.data.options.getMentionable("user");
            const nick = interaction.data.options.getString("nickname");
    
            if(!nick) return;
            if(!member) return;

            if(await this.client.users.get(member.id)){
                const user = this.client.rest.users.get(member?.id);

                this.client.guilds.forEach(g => {
                    g.editMember(member.id, {
                        nick: nick
                    });
                });

                interaction.createMessage({
                    embeds: [
                        {
                            author: {
                                name: `ACRP | GlobalNick`
                            },

                            fields: [
                                {
                                    name: `${(await user).username} had they're username globally changed to`,
                                    value: `${nick}`
                                }
                            ],

                            color: 0xa23bff
                        }
                    ]
                });
            }
        } else {
            interaction.createMessage({
                embeds: [
                    {
                        author: {
                            name: `ACRP | No Perms`
                        },

                        fields: [
                            {
                                name: `Insufficient Perms`,
                                value: `Please contact a server administrator if you beleive this was an issue`
                            }
                        ],

                        color: 0xa23bff
                    }
                ]
            });
        }
    }

    public async buttonInteraction(interaction: ComponentInteraction) {
        return;
    }
}