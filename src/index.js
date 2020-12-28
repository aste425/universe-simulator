
const startApp = () => {
    const canvas = document.getElementById('canvas');

    const engine = new BABYLON.Engine(canvas, true);

    const createScene = () => {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.Black();

        // create the camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 12, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // create the lighting
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(100, 100, 100), scene);

        // create a mesh ground
    	const ref = BABYLON.Mesh.CreateGround("gnd", 100, 100, 100, scene);
	    ref.material = new BABYLON.StandardMaterial("gmat", scene);
        ref.material.wireframe = true;
        ref.material.alpha = 0.1;

        // create the planets
        const sun = BABYLON.Mesh.CreateSphere("sphere", 32, 2, scene);
        const earth = BABYLON.Mesh.CreateSphere("sphere", 32, 0.5, scene);
        const earthMoon = BABYLON.Mesh.CreateSphere("sphere", 32, 0.1, scene);
        const mercury = BABYLON.Mesh.CreateSphere("sphere", 32, 0.3, scene);
        const venus = BABYLON.Mesh.CreateSphere("sphere", 32, 0.4, scene);
        const mars = BABYLON.Mesh.CreateSphere("sphere", 32, 0.4, scene);
        const jupiter = BABYLON.Mesh.CreateSphere("sphere", 32, 1.2, scene);
        const saturn = BABYLON.Mesh.CreateSphere("sphere", 32, 0.9, scene);

        let earthAlpha = Math.PI;
        let mercuryAlpha = Math.PI;
        let venusAlpha = Math.PI;
        let marsAlpha = Math.PI;
        let JupiterAlpha = Math.PI;
        let saturnAlpha = Math.PI;

        scene.beforeRender = () => {
            // calculate the orbits of the planets
            mercury.position = new BABYLON.Vector3(6 * Math.sin(mercuryAlpha), sun.position.y, 6 * Math.cos(mercuryAlpha));
            venus.position = new BABYLON.Vector3(10 * Math.sin(venusAlpha), sun.position.y, 10 * Math.cos(venusAlpha));
            earth.position = new BABYLON.Vector3(15 * Math.sin(earthAlpha), sun.position.y, 15 * Math.cos(earthAlpha));
            mars.position = new BABYLON.Vector3(20 * Math.sin(marsAlpha), sun.position.y, 20 * Math.cos(marsAlpha));
            jupiter.position = new BABYLON.Vector3(30 * Math.sin(JupiterAlpha), sun.position.y, 30 * Math.cos(JupiterAlpha));
            saturn.position = new BABYLON.Vector3(40 * Math.sin(saturnAlpha), sun.position.y, 40 * Math.cos(saturnAlpha));
            

            //rotate the planets
            earth.rotation.y += 1;
            earthMoon.rotation.y += 5;

            // increment the alpha
            mercuryAlpha += 0.005;
            venusAlpha += 0.004;
            earthAlpha += 0.003;
            marsAlpha += 0.002;
            JupiterAlpha += 0.0009;
            saturnAlpha += 0.0005;

        }

        return scene;
    }

    const scene = createScene();

    engine.runRenderLoop(() => {
        scene.render();
    });

}

window.addEventListener('DOMContentLoaded', startApp);