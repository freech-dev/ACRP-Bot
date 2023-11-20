import { AbstractQueue, Track } from "vulkava";

export class Queue extends AbstractQueue {
    tracks: Track[];

    constructor() {
        super();
        this.tracks = [];
    }

    get duration() {
        return this.tracks.reduce((total, track) => total + track.duration, 0);
    }

    get size() {
        return this.tracks.length;
    }

    add(track: Track) {
        this.tracks.push(track);
    }

    poll() {
        return this.tracks.shift() || null;
    }

    skipNTracks(n: number) {
        this.tracks.splice(0, n);
    }

    clear() {
        this.tracks = [];
    }

    getQueueDetails() {
        const data = [];
        for (let pos = 0; pos < this.tracks.length; pos++) {
            data.push(`${pos + 1}º - \`${this.tracks[pos].title}\``);
        }
        return data;
    }

    getThumbnail() {
        if (this.tracks.length > 0) {
            return this.tracks[0].thumbnail;
        }
        return null;
    }

    addTracksAndSetRequester(tracks: Track[], requesterId: string) {
        tracks.forEach(track => {
            this.add(track);
            track.setRequester(requesterId);
        });
    }
}