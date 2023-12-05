import { OceanBubble } from "../../structs/oceanicbubble";
import { Command } from "../../structs/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes, ComponentInteraction, EmbedOptions } from "oceanic.js";

export default class GlobalBanCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "globalban",
            description: "global bans the user given",
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
                        name: "reason",
                        description: "reason for the ban",
                        type: ApplicationCommandOptionTypes.STRING,
                        required: true
                    }
                ]
            }
        });
        this.interactionRun = this.interactionRun.bind(this)
    }

    public async interactionRun(interaction: CommandInteraction) {
        if(interaction.member?.permissions.has("BAN_MEMBERS")){
            const member = interaction.data.options.getMentionable("user");
            const reason = interaction.data.options.getString("reason");

            if(!member) return;

            const user = this.client.rest.users.get(member?.id);

            if(!reason) return;

            this.client.rest.channels.createMessage(member.id, {
                embeds: [
                    {
                        author: {
                            name: `ACRP | Global Ban`
                        },
                        
                        fields: [
                            {
                                name: `${(await user).username} was globally banned for`,
                                value: `${reason}`
                            }
                        ],

                        color: 0xa23bff
                    }
                ]
            });

            if(await this.client.rest.users.get(member.id)){
                this.client.guilds.forEach(g => {
                    g.createBan(member.id);
                });

                interaction.createMessage({
                    embeds: [
                        {
                            author: {
                                name: `ACRP | Global Ban`
                            },
                            
                            fields: [
                                {
                                    name: `${(await user).username} was globally banned for`,
                                    value: `${reason}`
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