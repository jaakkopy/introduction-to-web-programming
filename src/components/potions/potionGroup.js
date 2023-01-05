import Potion from "./potion.js";

export default class PotionGroup extends Phaser.GameObjects.Group {
    constructor(scene, potionConfig) {
        super(scene);
        potionConfig.forEach(p => this.add(new Potion(scene, p.x, p.y, p.frame, p.variant, p.scale)));
    }
} 