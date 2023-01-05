import Spike from "./spike.js";
import { createAnimWithFrameNums } from "../../../utility/registerAnimation.js";

export default class SpikeGroup extends Phaser.GameObjects.Group {
    constructor(scene, spikeConfig) {
        super(scene);
        createAnimWithFrameNums(scene, 'spikeEffect', 'spike', 0, 2, 10, -1);
        spikeConfig.forEach(s => this.add(new Spike(scene, s.x, s.y, s.scale)));
    }
}