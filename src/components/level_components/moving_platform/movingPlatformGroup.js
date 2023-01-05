import MovingPlatform from "./movingPlatform.js";

export default class MovingPlatformGroup extends Phaser.GameObjects.Group {
    constructor(scene, movingPlatformConfig) {
        super(scene);

        // create the paltforms according to the rules in the configuration object
        let platforms = [];
        movingPlatformConfig.forEach((p) => {
            platforms.push(new MovingPlatform(scene, p.coords, p.frame, p.scale, p.velocities));
        });

        this.addMultiple(platforms);
    } 

    update(scene) {
        this.children.iterate((p) => {
            p.update(scene);
        }); 
    }
}