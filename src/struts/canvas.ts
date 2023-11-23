import axios from 'axios';
import { Image, createCanvas } from '@napi-rs/canvas';

export default class MemberCanvas {
    private canvas: any;
    private context: any;

    constructor() {
        this.canvas = createCanvas(800, 600);
        this.context = this.canvas.getContext('2d');
    }

    async drawImage(imageUrl: string) {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const image = new Image();
        image.src = Buffer.from(response.data, 'binary');
        this.context.drawImage(image, 0, 0, 800, 600);
    }

    addText(x: number, y: number, text: string) {
        this.context.font = '30px Arial';
        this.context.fillStyle = 'white';
        this.context.fillText(text, x, y);
    }

    getCanvas() {
        return this.canvas.toDataURL();
    }
}