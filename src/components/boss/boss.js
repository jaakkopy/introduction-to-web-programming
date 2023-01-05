import HealthPointIcon from "../health_point_icon/healthPointIcon.js";
import { createAnimWithFrameNums } from "../../utility/registerAnimation.js";
import SpriteWithHealth from "../sprite_with_health/spriteWithHealth.js";
import LaserGun from "../guns/laserGun/laserGun.js";
import BossGun from "../guns/bossGun/bossGun.js";

export default class Boss extends SpriteWithHealth {
    constructor(scene, coords, healthPoints, velocity, scale) {
        super(scene, coords, healthPoints);
        this.setSize(scale * 100, scale * 100).setOffset(0, 0);
        this.setScale(scale);
        this.body.allowGravity = false;

        this.speedX = velocity.x;
        this.speedY = velocity.y;

        this.shootingRange = scene.cameras.main.width/4;

        this.healthPointIcon = new HealthPointIcon('health', scale, 'right');
        this.healthPointIcon.addToCorner(scene, this.maxHealthPoints);
        
        this.laserGun = new LaserGun(scene, coords, scale, 5000);
        this.gun = new BossGun(scene, coords, scale, 1000);

        this.idleAnim = 'bossIdle';
        this.blockAnim = 'bossBlock';
        this.shootAnim = 'bossShoot';
        this.dieAnim = 'bossDie';

        this.registerDeathAnimation(this.dieAnim);

        createAnimWithFrameNums(scene, this.idleAnim, 'boss', 0, 3, 10, -1);
        createAnimWithFrameNums(scene, this.shootAnim, 'boss', 20, 28, 10, 0);
        createAnimWithFrameNums(scene, this.blockAnim, 'boss', 35, 37, 10, -1);
        createAnimWithFrameNums(scene, this.dieAnim, 'boss', 70, 83, 10, 0);
    }

    idle() {
        this.setVelocityX(0);
        this.anims.play(this.idleAnim, true);
    }

    run(directionMultiplier) {
        this.setVelocityX(directionMultiplier * this.speedX);
        this.anims.play(this.blockAnim, true);
    }
    
    removeHealthPoints(amount) {
        super.removeHealthPoints(amount);
        this.healthPointIcon.hide(amount);
    }

    registerForDamage(scene, spriteObject) {
        this.laserGun.registerForLaserHit(scene, spriteObject);
        this.gun.registerForBulletHit(scene, spriteObject);
    }

    shootLaser() {
        this.laserGun.shoot(this.x, this.y, this.flipX == true ? -1 : 1);
    }

    shootBullet() {
        if (this.gun.ready()) {
            this.anims.play(this.shootAnim, true).once('animationcomplete', () => {
                this.gun.shoot(this.x, this.y, this.flipX == true ? -1 : 1);
            });
        }
    }

    update(playerPos) {
        if (this.shootingLaser) return;
        if (this.shooting) return;

        if (playerPos.x > this.x) {
            this.flipX = false;
        } else {
            this.flipX = true;
        }

        if (Math.abs(playerPos.x - this.x) > this.shootingRange) {
            this.run(this.flipX == true ? -1 : 1);
        } else {
            this.setVelocityX(0);
        }

        let inShootingRange = Math.abs(playerPos.x - this.x) <= this.shootingRange && Math.abs(playerPos.y - this.y) <= 200;

        if (inShootingRange) {
            this.shootLaser();
            this.shootBullet();
        }
    }
}