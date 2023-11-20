import { OceanBubble } from "../../struts/oceanicbubble";
import { Command } from "../../struts/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes, ButtonStyles, ComponentTypes, MessageActionRow } from "oceanic.js";
import { Queue } from "../../struts/queue";

export default class PlayCommand extends Command {
    constructor(client: OceanBubble) {
        super(client, {
            name: "play",
            description: "plays a song",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
                options: [
                    {
                        name: "url",
                        description: "song url or playlist url",
                        type: ApplicationCommandOptionTypes.STRING,
                        required: true
                    }
                ]
            }
        });
    }

    public async interactionRun(interaction: CommandInteraction) { 
        const url = interaction.data.options.getString('url')!;
        const res = await this.client.vulkava.search(url);
        let message;

        //Player
        const player = this.client.vulkava.createPlayer({
            guildId: interaction.guild?.id!,
            voiceChannelId: interaction.member?.voiceState?.channelID!,
            textChannelId: interaction.channel?.id,
            selfDeaf: true,
            queue: new Queue()
        });
        player.connect();

        if (res.loadType === "LOAD_FAILED") {
            message = {
                content: `:x: Load failed. Error: ${res.exception?.message}`
            };
        } else if (res.loadType === "NO_MATCHES") {
            message = {
                content: ':x: No matches!'
            };
        } else if(res.loadType === 'PLAYLIST_LOADED'){
            await res.tracks.forEach(track => {
                player.queue.add(track);
                track.setRequester(interaction.user.id);
            });

            const queueDetails = (player.queue as Queue).getQueueDetails();

            if(await queueDetails) {
                const songPages = [];
                for (let i = 0; i < queueDetails.length; i += 10) {
                    const songs = queueDetails.slice(i, i + 10);
                    songPages.push(songs);
                }

                const embed = {
                    title: 'Song List',
                    description: songPages[0].join('\n'),
                    color: 0x0099ff,
                };

                let components: MessageActionRow[] = [
                    {
                        type: ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: ComponentTypes.BUTTON,
                                style: ButtonStyles.PRIMARY,
                                label: "Next",
                                customID: ``,
                                disabled: false
                            },
                            {
                                type: ComponentTypes.BUTTON,
                                style: ButtonStyles.SECONDARY,
                                label: "Previous",
                                customID: '',
                                disabled: false
                            }
                        ]
                    }
                ];

                interaction.createMessage({
                    embeds: [embed],
                    components: components
                })
            }
        } else {

        }
    
        if (message) {
            interaction.createMessage(message);
        }

        if (!player.playing) player.play();
    }
}