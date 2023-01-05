// a class for sprites with health points. Provides methods to remove health, add health, and optionally play a death animation upon dying
export default class SpriteWithHealth extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, coords, health) {
        super(scene, coords.x, coords.y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.maxHealthPoints = health;
        this.currentHealthPoints = health;
        this.dying = false;
        this.dead = false;

        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', () => {
            if (this.body.world.bounds.bottom - this.y <= 200) {
                this.removeHealthPoints(1000);
            }
        });
    }

    isDying() {
        return this.dying;
    }

    setDying(boolean) {
        this.dying = boolean;
    }

    setDead(boolean) {
        this.dead = boolean;
    }

    isDead() {
        return this.dead;
    }

    getMaximumHealthPoints() {
        return this.maxHealthPoints;
    }

    getHealthPoints() {
        return this.currentHealthPoints;
    }

    registerDeathAnimation(animationKey) {
        this.dieAnim = animationKey;
    }

    removeHealthPoints(amount) {
        this.currentHealthPoints -= amount;
        if (this.currentHealthPoints <= 0) {
            this.dying = true;
        }
        if (this.isDying() && !this.isDead()) {
            this.setDying(true);
            this.setDead(true);
            if (this.dieAnim != null) {
                this.anims.play(this.dieAnim).once('animationcomplete', () => {
                    this.setDying(false);
                    this.disableBody(true, true);
                });
            }
        }
    }

    addHealthPoints(amount) {
        this.currentHealthPoints = Math.min(this.currentHealthPoints + amount, this.maxHealthPoints);
    }
} 