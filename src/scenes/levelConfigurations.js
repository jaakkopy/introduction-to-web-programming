import potionVariants from "../components/potions/potionVariants.js";

const createTileConfigObject = (x, y, frame, scale) => {
    return {
        x: x,
        y: y,
        frame: frame,
        scale: scale
    }
}

const createMovingPlatformObject = (coords, frame, velocities, scale) => {
    return {
        coords: coords,
        frame: frame,
        velocities: velocities,
        scale: scale
    }
}

const createXYObject = (x, y) => {
    return {
        x: x,
        y: y
    }
}

const createGoldObject = (x, y, scale) => {
    return {
        x: x,
        y: y,
        scale: scale
    }
} 

const createGunnerObject = (health, coords, velocities, scale) => {
    return {
        health: health,
        coords: coords,
        velocity: velocities,
        scale: scale
    }
}

const createPotionObject = (x, y, frame, variant, scale) => {
    return {
        x: x,
        y: y,
        frame: frame,
        variant: variant,
        scale: scale
    }
}

const createPropObject = (x, y, frame, scale) => {
    return {
        x: x,
        y: y,
        frame: frame,
        scale: scale
    }
}


const createBaseLeveObject = (backgroundFrames, levelWidth, levelHeight, player, exitPortal) => {
    return {
        backgrounds: backgroundFrames,
        levelWidth: levelWidth, 
        levelHeight: levelHeight, 
        tiles: [],          
        movingPlatforms: [],
        player: player,
        enemies: [],
        exitPortal: exitPortal,
        gold: [],
        potions: [],
        spike: [],
        props: [],
        boss: null
    }
}


const tileSize = 16;
const SCALE = 2;
const BLOCK_UNIT = tileSize * SCALE;

const h = 100 * BLOCK_UNIT;
const w = 200 * BLOCK_UNIT;

const PLAYER_HEALTH = 5;
const ENEMY_HEALTH = 2;

////////// Level 1


/*

Level 1 design:
          
              health potion,   health potion,
              jump potion &    jump potion &                         
              enemy            enemy        moving platforms (up)
              /----            -----         ---    enemy
start        /    |            |   |      ---       ---         enemy     portal to next level
------------/     | spikes     |   |  spikes                    ----------------------


*/


const lvl1 = createBaseLeveObject(
    [1], 
    w, 
    h, 
    createGunnerObject(PLAYER_HEALTH, createXYObject(BLOCK_UNIT * 3, 3/4 * h - 150), createXYObject(500, 400), SCALE),
    createXYObject(165 * BLOCK_UNIT, 3/4*h - 150)
);

// player
lvl1.potions.push(createPotionObject(BLOCK_UNIT * 5, 3/4 * h - 150, 4, potionVariants.JUMP, 2));

// first horizontal ledge
for (let i = BLOCK_UNIT; i < 20 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.tiles.push(createTileConfigObject(i, 3/4*h, 0, SCALE));
}

lvl1.gold.push(createGoldObject(10 * BLOCK_UNIT, 3/2 * h - 150, SCALE));
lvl1.gold.push(createGoldObject(13 * BLOCK_UNIT, 3/2 * h - 150, SCALE));
lvl1.gold.push(createGoldObject(16 * BLOCK_UNIT, 3/2 * h - 150, SCALE));

// slope
for (let i = 20 * BLOCK_UNIT; i < 40 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.tiles.push(createTileConfigObject(i, 3/4*h - tileSize * SCALE - (i - 20 * tileSize * SCALE), 4, SCALE));
}

// ledge after slope
for (let i = 40 * BLOCK_UNIT; i < 60 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.tiles.push(createTileConfigObject(i, 3/4*h - (20 * BLOCK_UNIT), 0, SCALE));
}

lvl1.props.push(createPropObject(45 * BLOCK_UNIT, 3/4*h - (23 * BLOCK_UNIT), 'house1', SCALE));

lvl1.gold.push(createGoldObject(45 * BLOCK_UNIT, 3/4*h - (20 * BLOCK_UNIT) - 150, SCALE));
lvl1.gold.push(createGoldObject(50 * BLOCK_UNIT, 3/4*h - (20 * BLOCK_UNIT) - 150, SCALE));

// jump potion and enemy on the ledge
lvl1.potions.push(createPotionObject(55 * BLOCK_UNIT, 0, 4, potionVariants.JUMP, 2));
lvl1.potions.push(createPotionObject(56 * BLOCK_UNIT, 0, 0, potionVariants.HEALTH, 2));
lvl1.enemies.push(createGunnerObject(ENEMY_HEALTH, createXYObject(55 * BLOCK_UNIT, 0), createXYObject(w/4, h/4), SCALE));

// spikes
for (let i = 60 * BLOCK_UNIT; i < 80 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.tiles.push(createTileConfigObject(i, 3/4*h, 0, SCALE));
    const spike = createXYObject(i, 0);
    spike.scale = 2;
    lvl1.spike.push(spike);
}

// ledge after spikes
for (let i = 80 * BLOCK_UNIT; i < 100 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.tiles.push(createTileConfigObject(i, 3/4*h - (20 * BLOCK_UNIT), 0, SCALE));
}

lvl1.props.push(createPropObject(85 * BLOCK_UNIT, 3/4*h - (22.6 * BLOCK_UNIT), 'house2', SCALE));

// jump potion, health potion and enemy on the ledge
lvl1.potions.push(createPotionObject(95 * BLOCK_UNIT, 0, 4, potionVariants.JUMP, 2));
lvl1.potions.push(createPotionObject(96 * BLOCK_UNIT, 0, 0, potionVariants.HEALTH, 2));
lvl1.enemies.push(createGunnerObject(ENEMY_HEALTH, createXYObject(95 * BLOCK_UNIT, 0), createXYObject(w/4, h/4), SCALE));

// more spikes
for (let i = 100 * BLOCK_UNIT; i < 120 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.tiles.push(createTileConfigObject(i, 3/2*h, 0, SCALE));
    const spike = createXYObject(i, 0);
    spike.scale = SCALE;
    lvl1.spike.push(spike);
}

// moving platform 1
for (let i = 115 * BLOCK_UNIT; i < 120 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.movingPlatforms.push(createMovingPlatformObject(createXYObject(i, h), 0, createXYObject(0, -w/8), SCALE));
}

// moving platform 2
for (let i = 125 * BLOCK_UNIT; i < 130 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.movingPlatforms.push(createMovingPlatformObject(createXYObject(i, h), 0, createXYObject(0, -w/4), SCALE));
}

// moving platform 3
for (let i = 135 * BLOCK_UNIT; i < 140 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.movingPlatforms.push(createMovingPlatformObject(createXYObject(i, h), 0, createXYObject(0, -w/12), SCALE));
}

// last ledge
for (let i = 150 * BLOCK_UNIT; i < 170 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl1.tiles.push(createTileConfigObject(i, 3/4*h, 0, SCALE));
}


lvl1.enemies.push(createGunnerObject(ENEMY_HEALTH, createXYObject(160 * BLOCK_UNIT, 0), createXYObject(w/4, h/4), SCALE));

////////// Level 2


/*

Level 2 Design:
 
                                  health &              health &            
      start               wall    enemies        wall   enemies     
---------------------------|---------------------|------------------|-------------------- portal


*/

const lvl2 = createBaseLeveObject(
    [7], 
    10*w, 
    h, 
    createGunnerObject(PLAYER_HEALTH, createXYObject(tileSize * 5, 3/4 * h - 150), createXYObject(500, 400), SCALE),
    createXYObject(3 * 40 * BLOCK_UNIT, 3/4*h - 150)
);

// first ledge and wall
for (let i = BLOCK_UNIT; i <= 25 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl2.tiles.push(createTileConfigObject(i, 3/4*h, 9, SCALE));
    lvl2.gold.push(createGoldObject(i, 3/4*h - 150, SCALE));
}
for (let i = 3/4*h; i >= 3/4*h - BLOCK_UNIT * 2; i -= BLOCK_UNIT) {
    lvl2.tiles.push(createTileConfigObject(25 * BLOCK_UNIT, i, 9, SCALE));
}

// more ledges and walls
for (let j = 1; j < 3; j++) {
    for (let i = j * 26 * BLOCK_UNIT; i <= j * 50 * BLOCK_UNIT; i += BLOCK_UNIT) {
        lvl2.tiles.push(createTileConfigObject(i, 3/4*h, 9, SCALE));
    }
    for (let i = j * 29 * BLOCK_UNIT; i <= j * 50 * BLOCK_UNIT; i += 10 * BLOCK_UNIT) {
        lvl2.enemies.push(createGunnerObject(ENEMY_HEALTH, createXYObject(i, 0), createXYObject(w/4, h/4), SCALE));
    }

    lvl2.props.push(createPropObject( (2 * j - 1)/2 * 26 * BLOCK_UNIT, 3/4*h - 2*BLOCK_UNIT, 'statue', SCALE));
    lvl2.potions.push(createPotionObject( (2 * j - 1)/2 * 26 * BLOCK_UNIT, 0, 0, potionVariants.HEALTH, SCALE));

    for (let i = 3/4*h; i >= 3/4*h - BLOCK_UNIT * 2; i -= BLOCK_UNIT) {
        lvl2.tiles.push(createTileConfigObject(j * 51 * BLOCK_UNIT, i, 9, SCALE));
    }
}

for (let i = 3 * 26 * BLOCK_UNIT; i <= 3 * 40 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl2.tiles.push(createTileConfigObject(i, 3/4*h, 9, SCALE));
}
lvl2.props.push(createPropObject( (2 * 3 - 1)/2 * 26 * BLOCK_UNIT, 3/4*h - 2*BLOCK_UNIT, 'statue', SCALE));
lvl2.potions.push(createPotionObject( (2 * 3 - 1)/2 * 26 * BLOCK_UNIT, 0, 0, potionVariants.HEALTH, SCALE));


////////// Level 3

const lvl3 = createBaseLeveObject(
    [0, 3, 6], 
    w, 
    h, 
    createGunnerObject(PLAYER_HEALTH, createXYObject(tileSize * 5, 3/4 * h - 150), 
    createXYObject(500, 400), SCALE),
    createXYObject(3 * 40 * BLOCK_UNIT, 3/4*h - 150)
);

for (let i = BLOCK_UNIT; i < 50 * BLOCK_UNIT; i += BLOCK_UNIT) {
    lvl3.tiles.push(createTileConfigObject(i, 3/4*h, 0, SCALE));
}


lvl3.boss = {
    coords: createXYObject(BLOCK_UNIT * 40, 3/4*h - 25),
    healthPoints: 25, 
    velocity: createXYObject(w/12, h/6), 
    scale: SCALE
};


////////// export

const levels = [lvl1, lvl2, lvl3];

export default levels;