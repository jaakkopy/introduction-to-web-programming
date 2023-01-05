import potionVariants from "./potionVariants.js";

export default class Potion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureFrame, potionVariant, scale) {
        super(scene, x, y, 'potions', textureFrame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(scale);

        this.potionVariant = potionVariant;
    }

    applyVelocityPotion(player) {
        const originalVelocity = player.getHorizontalVelocity();
        player.setHorizontalVelocity(originalVelocity * 2);
        setTimeout(() => player.setHorizontalVelocity(originalVelocity), 4000);
    }

    applyHealthPotion(player) {
        player.addHealthPoints(player.getMaximumHealthPoints());
    }

    applyJumpPotion(player) {
        const originalVelocity = player.getVerticalVelocity();
        player.setVerticalVelocity(originalVelocity * 2);
        setTimeout(() => player.setVerticalVelocity(originalVelocity), 4000);
    }

    collect(player, potion) {
        if (this.collecting) return;
        this.collecting = true;

        switch (this.potionVariant) {
            case potionVariants.SPEED:
                this.applyVelocityPotion(player);
                break;
            case potionVariants.HEALTH:
                this.applyHealthPotion(player);
                break;
            case potionVariants.JUMP:
                this.applyJumpPotion(player);
                break;
        }

        this.destroy();
    }
}