import EnemyGunnerGroup from "../components/gunner/enemyGunnerGroup.js";
import Player from "../components/gunner/player.js";
import Background from "../components/level_components/background/background.js";
import TileGroup from "../components/level_components/tiles/tileGroup.js";
import levels from "./levelConfigurations.js";
import PortalSprite from "../components/portal/portalSprite.js";
import GoldGroup from "../components/level_components/gold/goldGroup.js";
import PotionGroup from "../components/potions/potionGroup.js";
import MovingPlatformGroup from "../components/level_components/moving_platform/movingPlatformGroup.js";
import SpikeGroup from "../components/level_components/spikes/spikeGroup.js";
import Controls from "../components/controls/controls.js";
import Prop from "../components/level_components/props/props.js";
import Boss from "../components/boss/boss.js";

// a scene class resposible for creating the level based on configuration objects
export default class Level extends Phaser.Scene {
    constructor(levelKey, levelNumber) {
        super({key: levelKey});
        
        this.levelNumber = levelNumber;
        // get corresponding level configuration object
        this.config = levels[this.levelNumber];
        this.nextLevelCode = 'level' + ((this.levelNumber + 1) % levels.length + 1);

        this.setScore = (score) => {this.score = score;}
    }

    // get the score of the previous level. If it isn't set, set the score to 0
    init(props) {
        if (props.score) {
            this.setScore(props.score);
        } else {
            this.setScore(0);
        }
    }

    create() {
        console.log("level" + (this.levelNumber + 1));

        // set correct bounds
        this.cameras.main.setBounds(0, 0, this.config.levelWidth, this.config.levelHeight);
        this.physics.world.setBounds(0, 0, this.config.levelWidth, this.config.levelHeight);

        // add backgrounds
        this.backgrounds = [];
        this.config.backgrounds.forEach(b => this.backgrounds.push(new Background(this, b)));
        
        // add props
        this.config.props.forEach((p) => {new Prop(this, p.x, p.y, p.frame, p.scale)});

        // add the player
        this.player = new Player(this, this.config.player.coords, this.config.player.health, this.config.player.velocity, this.score, this.config.player.scale);
        
        // add platform tiles
        this.platforms = new TileGroup(this, this.config.tiles);

        // add the enemies
        this.enemyGroup = new EnemyGunnerGroup(this, this.config.enemies);
        this.enemyGroup.registerForBullerHits(this, this.player);
        this.enemyGroup.registerForBullerHits(this, this.platforms);

        this.player.registerForDamage(this, this.enemyGroup);
        this.player.registerForDamage(this, this.platforms);

        // add moving platform tiles
        this.movingPlatformsGroup = new MovingPlatformGroup(this, this.config.movingPlatforms);

        // add the portal and make it trigger the transition to the next level on overlap. Pass on the current level's score
        this.portal = new PortalSprite(this, this.config.exitPortal);
        this.physics.add.overlap(this.player, this.portal, () => this.scene.start(this.nextLevelCode, {score: this.player.getScore()})); 

        // add gold and make player able to collect them
        this.goldGroup = new GoldGroup(this, this.config.gold);
        this.physics.add.overlap(this.player, this.goldGroup, (player, gold) => gold.collect(player, gold));

        // add spikes
        this.spikeGroup = new SpikeGroup(this, this.config.spike);
        this.physics.add.overlap(this.player, this.spikeGroup, (player, spike) => spike.hit(player, spike));

        // add potions and make player able to collect them
        this.potionsGroup = new PotionGroup(this, this.config.potions);
        this.physics.add.overlap(this.player, this.potionsGroup, (player, potion) => potion.collect(player, potion));

        // add colliders
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemyGroup, this.platforms);
        this.physics.add.collider(this.goldGroup, this.platforms);
        this.physics.add.collider(this.potionsGroup, this.platforms);
        this.physics.add.collider(this.spikeGroup, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatformsGroup);

        // add boss if it's present
        if (this.config.boss != null) {
            this.boss = new Boss(this, this.config.boss.coords, this.config.boss.healthPoints, this.config.boss.velocity, this.config.boss.scale);
            this.boss.registerForDamage(this, this.player);
            this.player.registerForDamage(this, this.boss);
        }

        // controls for the player determined by device type
        if (this.sys.game.device.os.desktop) {
            this.controls = new Controls(this, this.player, false); // desktop
        } else {
            this.controls = new Controls(this, this.player, true);  // touch device
            this.controls.setButtonPositions(this.game.scale.width, this.game.scale.height);
        }

        // this is copied from an example here: https://phaser.io/examples/v3/view/scalemanager/resize
        const resize = (gameSize, baseSize, displaySize, resolution) => {
            const width = gameSize.width;
            const height = gameSize.height;
            this.cameras.resize(width, height);
            if (!this.sys.game.device.os.desktop) this.controls.setButtonPositions(width, height);
        }

        this.scale.on('resize', resize);
        
        // follow the player with the camera
        this.cameras.main.startFollow(this.player);
    }


    update() {
        if (this.player.isDying()) return;
        if (this.player.isDead()) {
            this.scene.start('gameOver', {score: 0});
        }
        const playerPos = {x: this.player.x, y: this.player.y};
        this.controls.update(this);
        this.enemyGroup.update(playerPos);
        this.movingPlatformsGroup.update();
        this.backgrounds.forEach(b => b.parallax());
        
        if (this.boss != null && !this.player.isDead()) {
            if (!this.boss.isDead()) {
                this.boss.update(playerPos);
            } else if (!this.victoryScenePlaying) {
                this.victoryScenePlaying = true;
                this.scene.start('victoryScene', {score: this.player.getScore()})
            }
        }
    }
}