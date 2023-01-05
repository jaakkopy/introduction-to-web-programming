import Gunner from "./gunner.js";
import { createAnimWithFrameNums } from "../../utility/registerAnimation.js";

export default class EnemyGunner extends Gunner {
    constructor(scene, coords, healthPoints, velocities, scale) {
        super(scene, coords, healthPoints, velocities, scale);

        this.crouchAnim = 'crouch1';
        this.dieAnim = 'die1';
        this.idleAnim = 'idle1';
        this.jumpAnim = 'jump1';
        this.runAnim = 'run1';

        this.registerDeathAnimation(this.dieAnim);

        createAnimWithFrameNums(scene, this.crouchAnim, 'enemyCrouch' , 2, 2, 10, -1);
        createAnimWithFrameNums(scene, this.dieAnim, 'enemyDie' , 0, 7, 10, 0);
        createAnimWithFrameNums(scene, this.idleAnim, 'enemyIdle', 0, 4, 10, -1);
        createAnimWithFrameNums(scene, this.jumpAnim, 'enemyJump', 0, 1, 10, -1);
        createAnimWithFrameNums(scene, this.runAnim, 'enemyRun', 0, 5, 10, -1);


        this.flipX = true;
        this.shootingRange = scene.cameras.main.width/2;
        this.gun.fireRate = 500;
    }
    
    update(playerPos) {
        this.idle();
        if (playerPos.x > this.x) {
            this.flipX = false;
        } else {
            this.flipX = true;
        }
        if (Math.abs(this.x - playerPos.x) <= this.shootingRange && Math.abs(this.y - playerPos.y) <= 20) {
            this.shoot();
        }
    }
}