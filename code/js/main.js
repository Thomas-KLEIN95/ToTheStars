let canvas;
let engine;
let scene;
// vars for handling inputs
let inputStates = {};


window.onload = startGame;

function startGame() {
    canvas = document.querySelector("#myCanvas");
    engine = new BABYLON.Engine(canvas, true);
    scene = createScene();    

    modifySettings();

    let sphere = scene.getMeshByName("mySphere");

    // main animation loop 60 times/s
    engine.runRenderLoop(() => {
        let deltaTime = engine.getDeltaTime();

        sphere.move();

        scene.render();
    });

}

function createScene() {
    let scene = new BABYLON.Scene(engine);

    // enable physics
    scene.enablePhysics();

    // background
    scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

    let ground = createGround(scene);
    let sphere = createSphere(scene);
    let platforms = createPlatforms(scene, sphere);
    let followCamera = createFollowCamera(scene, sphere);
    createLights(scene);

    return scene;
}

function createGround(scene){
        let ground = BABYLON.MeshBuilder.CreateGround("myGround", {width: 120, height: 15 }, scene);
        ground.position.x = 50;
        let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 1, 0);
        groundMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0);
        ground.material = groundMaterial;
        return ground;
}

function createPlatforms(scene, sphere){
    let box = new BABYLON.MeshBuilder.CreateBox("platform1", {height: 2, width:6, depth:2}, scene);
    let boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0, 0);
    box.material = boxMaterial;
    box.position.y = 3.5;
    box.position.x = 15;

    box = new BABYLON.MeshBuilder.CreateBox("platform2", {height: 2, width:6, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0, 0);
    box.material = boxMaterial;
    box.position.y = 7;
    box.position.x = 30;


    box = new BABYLON.MeshBuilder.CreateBox("wall1", {height: 11, width: 4, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(0.2, 1, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0);
    box.material = boxMaterial;
    box.position.y = 5.5;
    box.position.x = 45;


    box = new BABYLON.MeshBuilder.CreateBox("platform3", {height: 2, width:6, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0, 0);
    box.material = boxMaterial;
    box.position.y = 7;
    box.position.x = 55;


    box = new BABYLON.MeshBuilder.CreateBox("platform4", {height: 2, width:6, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0, 0);
    box.material = boxMaterial;
    box.position.y = 3.5;
    box.position.x = 65;


    box = new BABYLON.MeshBuilder.CreateBox("platform5", {height: 2, width:6, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0, 0);
    box.material = boxMaterial;
    box.position.y = 14.5;
    box.position.x = 60;


    box = new BABYLON.MeshBuilder.CreateBox("platform6", {height: 2, width:6, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0, 0);
    box.material = boxMaterial;
    box.position.y = 10;
    box.position.x = 75;


    box = new BABYLON.MeshBuilder.CreateBox("bounce1", {height: 0.5, width:2, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0, 0.7);
    box.material = boxMaterial;
    box.position.y = 11.25;
    box.position.x = 75;

    box = new BABYLON.MeshBuilder.CreateBox("platform7", {height: 2, width:6, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0, 0);
    box.material = boxMaterial;
    box.position.y = 20;
    box.position.x = 91;


    box = new BABYLON.MeshBuilder.CreateBox("wall2", {height: 23, width: 8, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(0.2, 1, 0);
    boxMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0);
    box.material = boxMaterial;
    box.position.y = 11.5;
    box.position.x = 105;

    box = new BABYLON.MeshBuilder.CreateBox("arrival", {height: 2, width: 8, depth:2}, scene);
    boxMaterial = new BABYLON.StandardMaterial("arrivalMaterial", scene);
    boxMaterial.diffuseTexture = new BABYLON.Texture("images/arrival.jpg", scene);
    boxMaterial.emissiveColor = new BABYLON.Color3.White;
    box.material = boxMaterial;
    box.position.y = 24;
    box.position.x = 105;
    box.particleSystem = createParticleSystem(scene);
    setParticleSystemDefaultValues(box);
    /*
    QUAND LA SPHERE TOUCHE L'ARRIVEE {
        box.particleSystem.start();
        setTimeout(() => {
        box.particleSystem.stop();
        }, 1500);
    }  */


}

function createSphere(scene){
    let sphere = BABYLON.MeshBuilder.CreateSphere("mySphere", { diameter: 2, segments: 32 }, scene);
    let sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
    sphereMaterial.emissiveColor = new BABYLON.Color3(0,0.2,1);
    sphere.material = sphereMaterial;
    sphere.position.y = 1;
    sphere.isPickable= false;
    sphere.moveSpeed = 0.25;
    sphere.jumpSpeed = 0.2;
    sphere.jumpTop = 0;
    sphere.jumping = false;
    sphere.falling = false;
    

    sphere.move = () => {
        if(inputStates.up && !sphere.jumping && !sphere.falling) {
            if(checkIfCanJump(sphere)){
                sphere.jumpTop = sphere.position.y + 6;
                sphere.jumping = true;
            }
        }/*    
        if(inputStates.down) {

        }    */
        if(inputStates.left) {
            if(checkIfCanMove(sphere, new BABYLON.Vector3(-1, 0, 0))){
                sphere.position.x -= sphere.moveSpeed;
                if(!sphere.jumping && !sphere.falling){
                    if(checkIfCanMove(sphere, new BABYLON.Vector3(0, -1, 0))){
                        sphere.falling = true;
                    }
                }
            }
        }
        if(inputStates.right) {
            if(checkIfCanMove(sphere, new BABYLON.Vector3(1, 0, 0))){
                sphere.position.x += sphere.moveSpeed;
                if(!sphere.jumping && !sphere.falling){
                    if(checkIfCanMove(sphere, new BABYLON.Vector3(0, -1, 0))){
                        sphere.falling = true;
                    }
                }
            }
        }
        if(sphere.jumping){
            if(checkIfCanMove(sphere, new BABYLON.Vector3(0, 1, 0))){
                sphere.position.y += sphere.jumpSpeed;
                if(sphere.position.y >= sphere.jumpTop){
                    sphere.jumping = false;
                    sphere.falling = true;
                }
            }
            else{
                sphere.jumping = false;
                sphere.falling = true;
            }
            
        }
        if(sphere.falling){
            if(checkIfCanMove(sphere, new BABYLON.Vector3(0, -1, 0))){
                sphere.position.y -= sphere.jumpSpeed;
            }
            else{
                sphere.falling = false;
            }
        }
    }
    return sphere;
}

function createFollowCamera(scene, target){
    let camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 1, -20), scene);
    // This targets the camera to scene origin
    camera.radius = 25;
    camera.lockedTarget = target;
    camera.heightOffset = 1;
    camera.rotationOffset = 180;
    camera.cameraAcceleration = 0.1;

    camera.inputs.clear();

    camera.attachControl(canvas);

    return camera;
}

function createLights(scene){
    let light = new BABYLON.HemisphericLight("myLight", new BABYLON.Vector3(5, 1, 0), scene);
    light.intensity = 0.3;
    // color of the light
    light.diffuse = new BABYLON.Color3(1, 1, 1);
}

function createParticleSystem(scene) {
    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem(
      "particles",
      2000,
      scene
    );

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture(
      "images/flare.png",
      scene
    );
    return particleSystem;
}

function setParticleSystemDefaultValues(target) {
    let particleSystem = target.particleSystem;

    // Where the particles come from. Will be changed dynacally to the hit point.
    particleSystem.emitter = new BABYLON.Vector3(target.position.x,target.position.y+2,target.position.z); // the starting object, the emitter

    // Colors of all particles RGBA
    particleSystem.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0, 0, 1, 1.0);

    particleSystem.emitRate = 100;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -15, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-4, 5, 0);
    particleSystem.direction2 = new BABYLON.Vector3(4, 5, 0);

    particleSystem.minEmitPower = 2;
    particleSystem.maxEmitPower = 4;

    // Size of each particle (random between...
    particleSystem.minSize = 0.4;
    particleSystem.maxSize = 0.8;
  }

window.addEventListener("resize", () => {
    engine.resize()
});

function checkIfCanJump(sphere){
    let origin = sphere.position;
    let direction = new BABYLON.Vector3(0, -1, 0);
    let length = 1.01;
    let ray = new BABYLON.Ray(origin, direction, length);
    /*
    let rayHelper = new BABYLON.RayHelper(ray);
    rayHelper.show(scene, new BABYLON.Color3.Red);
    setTimeout(() => {
        rayHelper.hide(ray);
    }, 200);*/
    let pickInfo =  scene.pickWithRay(ray);
    return pickInfo.hit;
}

function checkIfCanMove(sphere, direction){
    let origin = sphere.position;
    let length = 1.01;
    let ray = new BABYLON.Ray(origin, direction, length);
    /*
    let rayHelper = new BABYLON.RayHelper(ray);
    rayHelper.show(scene, new BABYLON.Color3.Red);
    setTimeout(() => {
        rayHelper.hide(ray);
    }, 200);*/
    let pickInfo =  scene.pickWithRay(ray);
    return !pickInfo.hit;
}

function modifySettings() {
    // key listeners for the sphere
    inputStates.left = false;
    inputStates.right = false;
    inputStates.up = false;
    inputStates.down = false;
    inputStates.space = false;

    window.addEventListener('keydown', (event) => {
        if ((event.key === "ArrowLeft") || (event.key === "q") || (event.key === "Q")) {
            inputStates.left = true;
        } else if ((event.key === "ArrowUp") || (event.key === "z") || (event.key === "Z")) {
            inputStates.up = true;
        } else if ((event.key === "ArrowRight") || (event.key === "d") || (event.key === "D")) {
            inputStates.right = true;
        }/* else if ((event.key === "ArrowDown") || (event.key === "s") || (event.key === "S")) {
            inputStates.down = true;
        } else if (event.key === " ") {
            inputStates.space = true;
        }*/
    }, false);

    //if the key will be released, change the states object 
    window.addEventListener('keyup', (event) => {
        if ((event.key === "ArrowLeft") || (event.key === "q") || (event.key === "Q")) {
            inputStates.left = false;
        } else if ((event.key === "ArrowUp") || (event.key === "z") || (event.key === "Z")) {
            inputStates.up = false;
        } else if ((event.key === "ArrowRight") || (event.key === "d") || (event.key === "D")) {
            inputStates.right = false;
        }/* else if ((event.key === "ArrowDown") || (event.key === "s") || (event.key === "S")) {
            inputStates.down = false;
        } else if (event.key === " ") {
            inputStates.space = false;
        }*/
    }, false);
}
