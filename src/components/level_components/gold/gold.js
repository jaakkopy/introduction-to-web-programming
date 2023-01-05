export default class Gold extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(scale);

        this.anims.play('uncollectedGold');
    }

    collect(player, gold) {
        if (this.collecting) return;
        this.collecting = true;
        player.addScore(50);
        this.anims.play('collectedGold').once('animationcomplete', () => this.destroy());
    }
}