import EnemyGunner from "./enemyGunner.js";

export default class EnemyGunnerGroup extends Phaser.GameObjects.Group {
    constructor(scene, enemyConfig) {
        super(scene);
        this.enemyConfig = enemyConfig;

        // create the enemies according to the rules in the configuration object
        let enemies = [];
        enemyConfig.forEach((e) => {
            enemies.push(new EnemyGunner(scene, e.coords, e.health, e.velocity, e.scale));
        });

        // add them to the group
        this.addMultiple(enemies);
    }

    registerForBullerHits(scene, sprite) {
        this.children.iterate((e) => {
            e.registerForDamage(scene, sprite);
        });
    }

    // update all children of this group
    update(playerPos) {
        this.children.iterate((enemy) => {
            if (!enemy.isDead() && !enemy.isDying()) enemy.update(playerPos);
        }); 
    }
}