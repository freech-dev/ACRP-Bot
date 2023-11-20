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
        this.interactionRun = this.interactionRun.bind(this)
    }

    readonly components: MessageActionRow[] = [
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

    public async interactionRun(interaction: CommandInteraction) {
        const url = interaction.data.options.getString('url')!;
        const res = await this.client.vulkava.search(url);
        let message;

        this.client.createPlayer(interaction);
        this.client.player.connect()

        if (res.loadType !== "LOAD_FAILED" && res.loadType !== "NO_MATCHES") {
            const tracks = res.loadType === 'PLAYLIST_LOADED' ? res.tracks : [res.tracks[0]];
            tracks.forEach(track => this.client.player.queue.add(track));

            const queueDetails = (this.client.player.queue as Queue).getQueueDetails();
            if(await queueDetails) {
                const songPages = [];
                for (let i = 0; i < queueDetails.length; i += 10) {
                    const songs = queueDetails.slice(i, i + 10);
                    songPages.push(songs);
                }

                const thumbnailUrl = (this.client.player.queue as Queue).getThumbnail();
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

                interaction.createMessage({
                    embeds: [embed],
                    components: this.components
                });
            }
        }

        if (message) {
            interaction.createMessage(message);
        }

        if (!this.client.player.playing) this.client.player.play();
    }

    public async buttonInteraction(interaction: ComponentInteraction) {
        if (interaction.data.customID.startsWith('play_next')) {
            
        } else if (interaction.data.customID.startsWith('play_previous')) {
            
        }
    }
}