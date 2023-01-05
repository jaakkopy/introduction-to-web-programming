
// a scene class which is responsible for loading the assets the levels require.
export default class InitialPreload extends Phaser.Scene {
    constructor() {
        super({key: 'initialPreload'});
        this.colors = ['Black', 'Blue', 'Green', 'Red', 'Yellow']; // possible colors for the gunner character
    }

    // used to choose a random color for the enemy, which is not the same as the main character's color
    chooseRandomColorForEnemy() {
        const num = Math.round(Math.random() * 4);
        return this.colors[num] == this.playerColor ? this.chooseRandomColorForEnemy() : this.colors[num];
    }

    loadCharacterAssetsByColor(color, prefix) {
        this.load.spritesheet(`${prefix}Crouch`, `src/assets/gunner/CHARACTER_SPRITES/${color}/Gunner_${color}_Crouch.png`, { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet(`${prefix}Die`, `src/assets/gunner/CHARACTER_SPRITES/${color}/Gunner_${color}_Death.png`, { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet(`${prefix}Idle`, `src/assets/gunner/CHARACTER_SPRITES/${color}/Gunner_${color}_Idle.png`, { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet(`${prefix}Jump`, `src/assets/gunner/CHARACTER_SPRITES/${color}/Gunner_${color}_Jump.png`, { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet(`${prefix}Run`, `src/assets/gunner/CHARACTER_SPRITES/${color}/Gunner_${color}_Run.png`, { frameWidth: 48, frameHeight: 48});
    }

    preload() {
        // get the color the user selected for their character
        this.playerColor = this.colors[1];
        if (this.game.config.playerColor != undefined) {
            this.playerColor = this.game.config.playerColor;
        }

        // load player and enemy assets
        this.loadCharacterAssetsByColor(this.playerColor, 'player');
        this.loadCharacterAssetsByColor(this.chooseRandomColorForEnemy(), 'enemy');
        
        // background sprite
        this.load.spritesheet('background', 'src/assets/platforms/Backgrounds/backgrounds.png', {frameWidth: 320, frameHeight: 224});
        
        // tiles
        this.load.spritesheet('tile', 'src/assets/platforms/Tilesets/Tiles.png', {frameWidth: 16, frameHeight: 16});

        // portal
        this.load.spritesheet('portal', 'src/assets/portal/instanceportal_385x385.png', {frameWidth: 385, frameHeight: 385});

        // gold
        this.load.spritesheet('gold', 'src/assets/platforms/Animations/CoinAnim.png', {frameWidth: 16, frameHeight: 16});

        // fireball (separate images)
        for (let i = 0; i <= 60; i++) this.load.image(`fire${i}`, `src/assets/fire_effect/1_${i}.png`);

        // explosions
        this.load.spritesheet('explosion', 'src/assets/explosion/spritesheet.png', {frameWidth: 100, frameHeight: 100});

        // potions
        this.load.spritesheet('potions', 'src/assets/potions/potions_gradient.png', {frameWidth: 16, frameHeight: 24});

        // spikes
        this.load.spritesheet('spike', 'src/assets/platforms/Animations/SpikeUpAnim.png', {frameWidth: 16, frameHeight: 16});

        // props
        this.load.atlas('props', 'src/assets/platforms/Props/props_json.png', 'src/assets/platforms/Props/props_json.json');

        // load button images if the device is a touch device
        if (!this.sys.game.device.os.desktop) {
            this.load.image('leftControl', 'src/assets/controls/Sprites/flatDark/flatDark23.png');
            this.load.image('rightControl', 'src/assets/controls/Sprites/flatDark/flatDark24.png');
            this.load.image('upControl', 'src/assets/controls/Sprites/flatDark/flatDark25.png');
            this.load.image('downControl', 'src/assets/controls/Sprites/flatDark/flatDark26.png');
            this.load.image('shootControl', 'src/assets/controls/Sprites/flatDark/flatDark47.png');
            this.load.image('shootFlameControl', 'src/assets/controls/Sprites/flatDark/flatDark48.png');
        }

        // boss assets
        this.load.spritesheet('boss', 'src/assets/boss/character/Character_sheet.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('bossLaser', 'src/assets/boss/weapons/Laser_sheet.png', {frameWidth: 300, frameHeight: 100});
        this.load.spritesheet('bossBullet', 'src/assets/boss/weapons/arm_projectile_glowing.png', {frameWidth: 100, frameHeight: 100});

        // other assets
        this.load.image('muzzleFlash', 'src/assets/gunner/EXTRAS/MuzzleFlash.png');
        this.load.image('bullet', 'src/assets/gunner/EXTRAS/SpongeBullet.png');
        this.load.image('health', 'src/assets/health/heart-icon.png');
    }

    // move on to the first level
    create() {
        this.scene.start('level1');
    }
}