import { OceanBubble } from "../../structs/oceanicbubble";
import { Command } from "../../structs/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes, ComponentInteraction } from "oceanic.js";

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
            if(!reason) return;

            if(await this.client.rest.users.get(member.id)){
                this.client.guilds.forEach(g => {
                    g.createBan(member.id);
                });

                interaction.createMessage({
                    content: `${member.mention}, was banned for ${reason}`
                })
            }
        } else {
            interaction.createMessage({
                content: `You dont have access to this comamnd`
            });
        }
    }

    public async buttonInteraction(interaction: ComponentInteraction) {
        return;
    }
}