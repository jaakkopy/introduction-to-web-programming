import Flame from "./flame.js";
import SpriteWithHealth from "../../sprite_with_health/spriteWithHealth.js";
import Explosion from "../../explosion/explosion.js";

export default class FlameGun {
    constructor(scene, x, y, scale, cooldown) {
        this.flame = new Flame(scene, x, y, scale);
        this.cooldown = cooldown;
        this.canShoot = true;
    }

    shoot(x, y, direction) {
        if (!this.canShoot) return;
        this.canShoot = false;
        this.flame.shootFlame(x, y, direction);
        setTimeout(() => {this.canShoot = true}, this.cooldown);
    }

    // when the flame hits enemies
    registerForFlameHit(scene, spriteObject) {
        scene.physics.add.overlap(spriteObject, this.flame, (sprite, flame) => {
            if (!flame.alreadyHitSomething) {
                flame.alreadyHitSomething = true;
                if (sprite instanceof SpriteWithHealth) sprite.removeHealthPoints(10);
                 // add an explosion
                new Explosion(scene, sprite.x, sprite.y, 2);
                flame.setVisible(false);
                flame.setActive(false);
            }
        }, null, scene);
    }
}