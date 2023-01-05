export default class MovingPlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, coords, whichFrame, scale, velocity) {
        super(scene, coords.x, coords.y, 'tile', whichFrame);

        this.maxY = scene.config.levelHeight;
        this.maxX = scene.config.levelWidth;

        this.setScale(scale);
    
        scene.add.existing(this);
        scene.physics.add.existing(this, false); // false -> not static
        this.body.allowGravity = false;
        this.body.immovable = true;

        this.speedY = velocity.y;
        this.speedX = velocity.x;
        this.setVelocityY(this.speedY);
        this.setVelocityX(this.speedX);
    }

    
    update() {
        // if the moving platform crosses one of the borders, move it to the other end
        if (this.y >= this.maxY) {
            this.y = 0;
        } else if (this.y <= 0) {
            this.y = this.maxY;
        }

        if (this.x >= this.maxX) {
            this.x = 0;
        } else if (this.x <= 0)  {
            this.x = this.maxX;
        }

        // if the velocity has changed for some reason, restore it
        if (this.body.velocity.y != this.speedY) this.setVelocityY(this.speedY);
        if (this.body.velocity.x != this.speedX) this.setVelocityX(this.speedX);
    }
}