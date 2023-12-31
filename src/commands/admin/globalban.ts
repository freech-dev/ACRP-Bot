import { OceanBubble } from "../../structs/oceanicbubble";
import { Command } from "../../structs/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes, ComponentInteraction } from "oceanic.js";

import Database from "../../database/database";
import { db } from "../../index"
import { Bans } from "../../database/entity/bans";

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
                    },
                    {
                        name: "length",
                        description: "length of the ban",
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
            const manager = await Database.getInstance().getManager()
            const member = interaction.data.options.getMentionable("user");
            const reason = interaction.data.options.getString("reason");
            const length = interaction.data.options.getString("length");

            if(!member) return;

            const user = this.client.rest.users.get(member?.id);

            if(!reason) return;
            if(!length)return;

            const dmChannel = await this.client.rest.users.createDM(member.id)
            const msg = this.client.rest.channels.createMessage(dmChannel.id, {
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

            if(await msg){
                if(await this.client.rest.users.get(member.id)){
                    this.client.guilds.forEach(g => {
                        g.createBan(member.id, {
                            reason: reason
                        });
                    });

                    if(await manager.findOne(Bans, {
                        where: {
                            BanID: member.id
                        }
                    }) === null) {
                        manager.save(Bans, {
                            BanID: member.id,
                            BanDate: Date.now(),
                            BanReason: reason,
                            BanLength: length
                        });
                        db.query('INSERT INTO bans (user_id, reason) VALUES (?, ?)', [member.id, reason])
                    }
    
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