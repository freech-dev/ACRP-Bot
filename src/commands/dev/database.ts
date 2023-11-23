import { OceanBubble } from "../../structs/oceanicbubble";
import { Command } from "../../structs/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes } from "oceanic.js";

import { Equal } from 'typeorm';
import { Member } from "../../database/entity/member";
import Database from "../../database/database";

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
                options: [
                    {
                        name: "database",
                        description: "shows the current data in a database",
                        type: ApplicationCommandOptionTypes.STRING,
                        required: true
                    },
                    {
                        name: "mention",
                        description: "mention of a user",
                        type: ApplicationCommandOptionTypes.MENTIONABLE,
                        required: false
                    },
                    {
                        name: "var",
                        description: "xp or lvl",
                        type: ApplicationCommandOptionTypes.STRING,
                        required: false
                    },
                    {
                        name: "number",
                        description: "number",
                        type: ApplicationCommandOptionTypes.NUMBER,
                        required: false
                    }
                ]
            },
        });
    }

    public async interactionRun(interaction: CommandInteraction) {
        const arg = interaction.data.options.getString('database');
        const mention = interaction.data.options.getMentionable('mention');
        const varr = interaction.data.options.getString('var');
        const number = interaction.data.options.getNumber('number');

        const manager = await Database.getInstance().getManager()

        if(!manager) return;
        if(!arg) return;

        if(arg === 'member'){
            if(await manager.findOne(Member, {
                where: {
                    MemberID: interaction.member?.id
                }
            }) === null) {
                interaction.createMessage({
                    content: `Database: Member: Returned Null`
                });
            } else {
                if(!mention){
                    let members = await manager.find(Member);

                    let memberList = "";
    
                    for (let member of members) {
                        memberList += `id: ${member.id}, Member: <@${member.MemberID}>, xp: ${member.xp}, lvl: ${member.lvl} `;
                    }
                    
                    interaction.createMessage({
                        content: `Members:\n${memberList}`
                    });
                } else {
                    if(mention.id === undefined) return;
                    let member = await manager.findOne(Member, {
                        where: {
                            MemberID: mention.id
                        }
                    });

                    if(!member) return;
                    if(!varr) return;
                    if(!number) return;

                    if(varr === 'xp'){
                        member.xp = member.xp + number;
                        await manager.save(member);

                        interaction.createMessage({
                            content: `${mention.mention}, was set to xp: ${member.xp}`
                        })
                    }

                    if(varr === 'lvl'){

                    }
                }
            }
        }
    }
}