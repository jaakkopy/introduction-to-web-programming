import Gold from "./gold.js";

export default class GoldGroup extends Phaser.GameObjects.Group {
    constructor(scene, goldConfig) {
        super(scene);

        scene.anims.create({
            key: 'uncollectedGold',
            frames: scene.anims.generateFrameNumbers('gold', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'collectedGold',
            frames: scene.anims.generateFrameNumbers('gold', { start: 3, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        goldConfig.forEach(g => this.add(new Gold(scene, g.x, g.y, g.scale)));
    }
}