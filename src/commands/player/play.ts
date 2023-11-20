import { OceanBubble } from "../../struts/oceanicbubble";
import { Command } from "../../struts/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes, ButtonStyles, ComponentTypes, MessageActionRow, ComponentInteraction, EmbedOptions } from "oceanic.js";
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

        if (res.loadType === "LOAD_FAILED" || res.loadType === "NO_MATCHES") {
            message = {
                content: res.loadType === "LOAD_FAILED" ? `:x: Load failed. Error: ${res.exception?.message}` : ':x: No matches!'
            };
        } else {
            const tracks = res.loadType === 'PLAYLIST_LOADED' ? res.tracks : [res.tracks[0]];
            tracks.forEach(track => {
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


                const thumbnailUrl = (player.queue as Queue).getThumbnail();
                const embed: EmbedOptions = {
                    author: {
                        name: 'Queue',
                        iconURL: interaction.user.avatarURL('jpeg')
                    },
                    description: songPages[0].join('\n'),
                    color: 0x0099ff,
                };
                
                if (thumbnailUrl) {
                    embed.thumbnail = {
                        url: thumbnailUrl
                    };
                }

                let components: MessageActionRow[] = [
                    {
                        type: ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: ComponentTypes.BUTTON,
                                style: ButtonStyles.PRIMARY,
                                label: "Next",
                                customID: `play_next`,
                                disabled: false
                            },
                            {
                                type: ComponentTypes.BUTTON,
                                style: ButtonStyles.SECONDARY,
                                label: "Previous",
                                customID: 'play_previous',
                                disabled: false
                            }
                        ]
                    }
                ];

                interaction.createMessage({
                    embeds: [embed],
                    components: components
                });
            }
        }

        if (message) {
            interaction.createMessage(message);
        }

        if (!player.playing) player.play();
    }

    public async buttonInteraction(interaction: ComponentInteraction) {
        if (interaction.data.customID.startsWith('play_next')) {
            interaction.createMessage({
                content: `this is a work in progress come back later. **if you belive this is an error please contact *mythicxgn***`
            });
        } else if (interaction.data.customID.startsWith('play_previous')) {
            interaction.createMessage({
                content: `this is a work in progress come back later. **if you belive this is an error please contact *mythicxgn***`
            });
        }
    }
}