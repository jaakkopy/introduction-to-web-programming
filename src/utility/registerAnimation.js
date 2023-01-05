
// register an animation the the scene. The key is the same as the name the spritesheet was loaded with.
export const createAnimWithFrameNums = (scene, name, key, startIndex, endIndex, frameRate, repeat) => {
    scene.anims.create({
        key: name,
        frames: scene.anims.generateFrameNumbers(key, { start: startIndex, end: endIndex }),
        frameRate: frameRate,
        repeat: repeat
    });
}

export const createAnimWithFrames = (scene, name, frames, frameRate, repeat) => {
    scene.anims.create({
        key: name,
        frames: frames,
        frameRate: 30,
        repeat: -1
    });
}