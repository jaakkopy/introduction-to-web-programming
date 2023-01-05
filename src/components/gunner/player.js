import FlameGun from "../guns/flameGun/flameGun.js";
import HealthPointIcon from "../health_point_icon/healthPointIcon.js";
import ScoreText from "../level_components/score/score.js";
import Gunner from "./gunner.js";
import { createAnimWithFrameNums } from "../../utility/registerAnimation.js";

export default class Player extends Gunner {
    constructor(scene, coords, healthPoints, velocities, score, scale) {
        super(scene, coords, healthPoints, velocities, scale);

        this.crouchAnim = 'crouch';
        this.dieAnim = 'die';
        this.idleAnim = 'idle';
        this.jumpAnim = 'jump';
        this.runAnim = 'run';

        this.registerDeathAnimation(this.dieAnim);

        createAnimWithFrameNums(scene, this.crouchAnim, 'playerCrouch' , 2, 2, 10, -1);
        createAnimWithFrameNums(scene, this.dieAnim, 'playerDie' , 0, 7, 10, 0);
        createAnimWithFrameNums(scene, this.idleAnim, 'playerIdle', 0, 4, 10, -1);
        createAnimWithFrameNums(scene, this.jumpAnim, 'playerJump', 0, 1, 10, -1);
        createAnimWithFrameNums(scene, this.runAnim, 'playerRun', 0, 5, 10, -1);

        // add health point icons to upper left corner of screen
        this.healthPointIcon = new HealthPointIcon('health', scale, 'left');
        this.healthPointIcon.addToCorner(scene, healthPoints);

        // score text
        this.score = new ScoreText(scene, 10, 20*scale);
        this.score.addScore(score);

        this.flameGun = new FlameGun(scene, 2000, 2000, scale, 6000);

        this.addScore = (amount) => this.score.addScore(amount);
        this.getScore = () => {return this.score.getScore();}
    }

    registerForDamage(scene, spriteObject) {
        super.registerForDamage(scene, spriteObject);
        this.flameGun.registerForFlameHit(scene, spriteObject);
    }

    // overide to add heart icon removal
    removeHealthPoints(amount) {
        super.removeHealthPoints(amount);
        this.healthPointIcon.hide(amount);
    }

    addHealthPoints(amount) {
        super.addHealthPoints(amount);
        this.healthPointIcon.makeVisible(amount);
    }

    shootFlame() {
       this.flameGun.shoot(this.x, this.y, this.flipX == true ? -1 : 1);
    }
}