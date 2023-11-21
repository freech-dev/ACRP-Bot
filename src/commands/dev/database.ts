import { OceanBubble } from "../../struts/oceanicbubble";
import { Command } from "../../struts/command";
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
                        name: "dataset",
                        description: "deleats the selected id of a dataset",
                        type: ApplicationCommandOptionTypes.NUMBER,
                        required: false
                    }
                ]
            },
        });
    }

    public async interactionRun(interaction: CommandInteraction) {
        const arg = interaction.data.options.getString('database');
        const dataset = interaction.data.options.getNumber('dataset');
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
                if(!dataset){
                    let members = await manager.find(Member);

                    let memberList = "";
    
                    for (let member of members) {
                        memberList += `id: ${member.id}, Member: <@${member.MemberID}>, xp: ${member.xp}, lvl: ${member.lvl} `;
                    }
                    
                    interaction.createMessage({
                        content: `Members:\n${memberList}`
                    });
                } else {
                    let member = await manager.findOne(Member, {
                        where: {
                            id: Equal(dataset)
                        }
                    });

                    if(!member){
                        interaction.createMessage({
                            content: `That Dataset could not be found in Database: Member: ID: returned null`
                        });
                    } else {
                        await manager.remove(member);

                        interaction.createMessage({
                            content: `Dataset Removed!`
                        });
                    }
                }
            }
        }
    }
}