export default class Spike extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y, 'spike');

        scene.add.existing(this);
        scene.physics.add.existing(this, false);
        this.setScale(scale);

        this.anims.play('spikeEffect');
    }

    // hit spike -> instant death
    hit(player, spike) {
        player.setVelocityX(0);
        player.removeHealthPoints(1000);
    }
}