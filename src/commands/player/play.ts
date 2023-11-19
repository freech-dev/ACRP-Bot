import { OceanBubble } from "../../struts/oceanicbubble";
import { Command } from "../../struts/command";
import { CommandInteraction, ApplicationCommandTypes, ApplicationCommandOptionTypes } from "oceanic.js";

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
            // Embeding
            let author = interaction.user.username;
            let iconURL = interaction.user.avatarURL("jpeg");
            let footer = "If more then 25 was added please use /queue"
            let fields = res.tracks.map((track, index) => {

                // Set Queue
                player.queue.add(track);
                track.setRequester(interaction.user);

                // Timing
                let ms = track.duration;
                let min = Math.floor((ms/1000/60) << 0);
                let sec = Math.floor((ms/1000) % 60);
                return { name: ``, value: `${index + 1}: ${track.title}, Duration: ${min}:${sec}` };
            });
            message = { embeds: [{ fields, author: {name: `${author} added ${res.playlistInfo.name} to queue`, iconURL: iconURL}, footer: { text: footer }}]};
        } else {
            let track = res.tracks[0];

            // Set Queue
            player.queue.add(track)
            track.setRequester(interaction.user);

            // Timing
            let ms = track.duration;
            let min = Math.floor((ms/1000/60) << 0);
            let sec = Math.floor((ms/1000) % 60);

            // Embeding
            let author = interaction.user.username;
            let iconURL = interaction.user.avatarURL("jpeg");


            message = { embeds: [{ author: {name: `${author} added a song to queue`, iconURL: iconURL}, fields: [{ name: `${track.title}`, value: `${min}:${sec}` }] }]};
        }
    
        if (message) {
            interaction.createMessage(message);
        }

        if (!player.playing) player.play();
    }
}