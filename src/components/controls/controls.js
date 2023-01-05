import ControlSprite from "./controlSprite.js";

// a class for controllin the player - either with mobile or desktop controls
// creted with the help of this example: https://phaser.io/examples/v3/view/input/multitouch/multi-touch-test
export default class Controls {
    constructor(scene, player, forMobile) {
        this.scene = scene;
        this.player = player;

        this.forMobile = forMobile;

        // these need to be arrow functions so that 'this' is related to this controls object when these are called from the ControlSprite objects :
        
        this.onLeftPress = () => {
            this.leftPressed = true;
        }
    
        this.onRightPress = () => {
            this.rightPressed = true;
        }
    
        this.onUpPress = () => {
            this.upPressed = true;
        }

        this.onDownPress =() => {
            this.downPressed = true;
        }

        this.onShootPress = () => {
            this.shootPressed = true;
        }
    
        this.onshootFlamePress = () => {
            this.shootFlamePressed = true;
        }

        this.setPressBooleans = () => {
            this.leftPressed = false;
            this.rightPressed = false;
            this.upPressed = false;
            this.downPressed = false;
            this.shootPressed = false;
            this.shootFlamePressed = false;
        }

        this.setPressBooleans();

        // if we're dealing with a mobile device, create buttons for each action:
        if (forMobile) {
            scene.input.addPointer(4);
            this.leftControlSprite = new ControlSprite(this.scene, 100, 200, 'leftControl', this.onLeftPress, this.setPressBooleans);
            this.rightControlSprite = new ControlSprite(this.scene, 200, 200, 'rightControl', this.onRightPress, this.setPressBooleans);
            this.upControlSprite = new ControlSprite(this.scene, 300, 200, 'upControl', this.onUpPress, this.setPressBooleans);
            this.downControlSprite = new ControlSprite(this.scene, 400, 200, 'downControl', this.onDownPress, this.setPressBooleans);
            this.shootControlSprite = new ControlSprite(this.scene, 500, 200, 'shootControl', this.onShootPress, this.setPressBooleans);
            this.shootFlameControlSprite = new ControlSprite(this.scene, 600, 200, 'shootFlameControl', this.onshootFlamePress, this.setPressBooleans);
        } else {
            // otherwise this will do:
            scene.input.mouse.disableContextMenu();
            scene.cursors = scene.input.keyboard.createCursorKeys();
            this.cursors = scene.cursors;
        } 
    }

    setButtonPositions(width, height) {
        this.leftControlSprite.x = 50;
        this.leftControlSprite.y = height - 100;

        this.rightControlSprite.x = this.leftControlSprite.x + 80;
        this.rightControlSprite.y = this.leftControlSprite.y;

        this.upControlSprite.x = this.rightControlSprite.x - 40;
        this.upControlSprite.y = this.rightControlSprite.y - 40;

        this.downControlSprite.x = this.upControlSprite.x;
        this.downControlSprite.y = this.rightControlSprite.y + 40;

        this.shootControlSprite.x = width - 50;
        this.shootControlSprite.y = height - 100;

        this.shootFlameControlSprite.x = this.shootControlSprite.x - 60;
        this.shootFlameControlSprite.y = this.shootControlSprite.y;
    }

    // handle player actions
    update(scene) {

        // if the device is not a touch screen, use the cursors object to set the correct booleans
        if (!this.forMobile) {
            if (this.cursors.left.isDown) {
                this.leftPressed = true;
            } else if (this.cursors.right.isDown) {
                this.rightPressed = true;
            } else if (this.cursors.down.isDown) {
                this.downPressed = true;
            }
            
            if (this.cursors.up.isDown) {
                this.upPressed = true;
            }

            if (scene.input.activePointer.leftButtonDown()) {
                this.shootPressed = true;
            }
            else if (scene.input.activePointer.rightButtonDown()) {
                this.shootFlamePressed = true;
            }
        }

        // perform action
        if (this.leftPressed) {
            this.player.run(true, -1);
        } else if (this.rightPressed) {
            this.player.run(false, 1);
        } else if (this.downPressed) {
            this.player.crouch();
        } else {
            this.player.idle();
        }
        
        if (this.upPressed) {
            this.player.jump();
        }

        if (this.shootPressed) {
            this.player.shoot();
        } else if (this.shootFlamePressed) {
            this.player.shootFlame();
        }


        if (!this.forMobile) {
            // the booleans have to be reset explicitly for a non-touch environment
            this.setPressBooleans();
        }

    }
}