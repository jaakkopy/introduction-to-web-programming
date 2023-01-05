import BulletGroup from "./bulletGroup.js";
import MuzzleFlash from "./muzzleFlash.js";
import SpriteWithHealth from "../../sprite_with_health/spriteWithHealth.js";

export default class Gun {
    constructor(scene, scale, fireRate) {
        this.fireRate = fireRate;
        this.bullets = new BulletGroup(scene, scale);
        this.muzzleFlash = new MuzzleFlash(scene, 0, 0, scale);
    }

    shoot(x, y, direction, offset) {
        if (this.cooldown) return;
        this.cooldown = true;
        this.muzzleFlash.show(x, y, direction, offset);
        this.bullets.shootBullet(x, y, direction, offset);
        setTimeout(() => {this.cooldown = false}, this.fireRate);
    }

    registerForBulletHit(scene, spriteObject) {
        scene.physics.add.overlap(spriteObject, this.bullets, (sprite, bullet) => {
            bullet.setVisible(false);
            bullet.setActive(false);
            if ( sprite instanceof SpriteWithHealth && !bullet.alreadyHitSomething ) {
                sprite.removeHealthPoints(1);
            }
            bullet.alreadyHitSomething = true;
        }, null, scene);
    }
} 