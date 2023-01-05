export default class HealthPointIcon {
    constructor(texture, scale, whichCorner) {
        this.texture = texture;
        this.points = [];
        this.scale = scale;
        this.corner = whichCorner;
    }

    addToCorner(scene, howMany) {
        this.maxAmount = howMany;
        this.currentAmout = howMany;
        if (this.corner == 'left') {
            for (let i = 0; i < howMany; i++) {
                this.points.push(scene.add.image(20 + 10 * this.scale * i, 20, this.texture).setScale(this.scale).setScrollFactor(0, 0));
            }
        } else {
            const width = scene.scale.gameSize._width;
            for (let i = 0; i < howMany; i++) {
                this.points.push(scene.add.image(width - 10 * this.scale * (i + 1), 20, this.texture).setScale(this.scale).setScrollFactor(0, 0));
            }
        }
    }

    hide(howMany) {
        for (let i = this.currentAmout - 1; i >= Math.max(this.currentAmout - howMany, 0); i--) {
            this.points[i].visible = false;
        }
        this.currentAmout = Math.max(this.currentAmout - howMany, 0);
    }

    makeVisible(howMany) {
        if (this.currentAmout <= 0) return;
        for (let i = this.currentAmout - 1; i < Math.min(this.maxAmount, this.currentAmout + howMany); i++) {
            this.points[i].visible = true;
        }
        this.currentAmout = Math.min(this.maxAmount, this.currentAmout + howMany);
    }
}