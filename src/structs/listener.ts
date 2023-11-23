import { ClientEvents } from "oceanic.js";
import { OceanBubble } from "./oceanicbubble";

export default class Listener<K extends keyof ClientEvents = keyof ClientEvents> {
    name: K;
    once?: boolean | undefined;
    listener: (this: OceanBubble, ...args: ClientEvents[K]) => void;
    constructor(name: K, once: boolean | undefined = undefined, listener: (this: OceanBubble, ...args: ClientEvents[K]) => void) {
        this.name = name,
        this.once = once,
        this.listener = listener;
    }
}