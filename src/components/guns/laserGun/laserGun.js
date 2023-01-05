import Laser from "./laser.js"
import SpriteWithHealth from "../../sprite_with_health/spriteWithHealth.js";
import Explosion from "../../explosion/explosion.js";

export default class LaserGun {
    constructor(scene, coords, scale, cooldown) {
        this.laser = new Laser(scene, coords.x, coords.y, scale);
        this.cooldown = cooldown;
        this.canShoot = true;
    }

    shoot(x, y, direction) {
        if (!this.canShoot) return;
        this.canShoot = false;
        this.laser.shoot(x, y, direction);
        setTimeout(() => {this.canShoot = true}, this.cooldown);
    }

    registerForLaserHit(scene, spriteObject) {
        scene.physics.add.overlap(spriteObject, this.laser, (sprite, laser) => {
            if (!laser.alreadyHitSomething) {
                laser.alreadyHitSomething = true;
                if (sprite instanceof SpriteWithHealth) sprite.removeHealthPoints(10);
                new Explosion(scene, sprite.x, sprite.y, 2);
            }
        }, null, scene);
    }
}