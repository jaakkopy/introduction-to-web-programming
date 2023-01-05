import SpriteWithHealth from "../sprite_with_health/spriteWithHealth.js";
import Gun from "../guns/gun/gun.js";

// a class meant for the player- and enemy gunners.
export default class Gunner extends SpriteWithHealth {
    constructor(scene, coords, healthPoints, velocities, scale) {
        super(scene, coords, healthPoints);

        this.speedX = velocities.x;
        this.speedY = velocities.y;
        
        this.gun = new Gun(scene, scale, 200);

        this.setScale(scale);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);
    } 

    registerForDamage(scene, spriteObject) {
        this.gun.registerForBulletHit(scene, spriteObject);
    }

    getHorizontalVelocity() {
        return this.speedX;
    }

    setHorizontalVelocity(value) {
        this.speedX = value;
    }

    getVerticalVelocity() {
        return this.speedY;
    }

    setVerticalVelocity(value) {
        this.speedY = value;
    }

    idle() {
        this.setVelocityX(0);
        this.anims.play(this.idleAnim, true);
    }

    run(shouldFlipX, directionMultiplier) {
        shouldFlipX == true ? this.flipX = true : this.flipX = false;
        this.setVelocityX(directionMultiplier * this.speedX);
        this.anims.play(this.runAnim, true);
    }

    jump() {
        if (this.body.touching.down) {
            this.setVelocityY(-this.speedY);
            this.anims.play(this.jumpAnim, true);
        }
    }

    crouch() {
        this.setVelocityX(0);
        this.anims.play(this.crouchAnim, true);
    }

    shoot() {
        // shoot left or right deppending on the direction
        this.gun.shoot(this.x, this.y, this.flipX == true ? -1 : 1);
    }
}