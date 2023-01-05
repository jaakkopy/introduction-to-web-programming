export default class MuzzleFlash extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y, 'muzzleFlash');
        scene.add.existing(this);
        this.setVisible(false);
        this.scale = scale;
        this.setScale(scale);
    }

    show(x, y, direction) {
        direction == -1 ? this.flipX = true : this.flipX = false;
        this.x = x + direction * 20 * this.scale;
        this.y = y - 2.5;
        this.setActive(true);
        this.setVisible(true);

        // hide the sprite after a while
        setTimeout(() => {
            this.setActive(false);
            this.setVisible(false);
        }, 100);
    }
}