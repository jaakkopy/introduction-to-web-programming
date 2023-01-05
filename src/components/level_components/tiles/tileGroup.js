import Tile from "./tile.js";

export default class TileGroup extends Phaser.GameObjects.Group {
    constructor(scene, tileConfigurations) {
        super(scene);
        tileConfigurations.forEach(t => this.add(new Tile(scene, t.x, t.y, t.frame, t.scale)));
    }
} 