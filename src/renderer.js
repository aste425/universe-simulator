export const renderPlanets = (planets) => {
    // loop over the planets in the array
    for(let i in planets){
        const p = planets[i];
        p.position = new BABYLON.Vector3(p.orbit * Math.sin(p.alpha), 0, p.orbit * Math.cos(p.alpha));
        p.alpha += p.alphaIncrement;
        p.rotation.y += p.rotationIncrement;
        if(i == 9){
            // print earth moon
            p.position = planets[3].position;
        }else if(i == 6){ 
            // print saturn
            p.rotation.y = 0;
        }else if(i == 10){
            // print saturn rings
            p.position = planets[6].position;
        }
    }
} 

let lastMeshHighlighted = null;

export const renderCamera = (planets, id, camera) => {
    const p = planets[id];
    let alphaChange = 0;
    let distanceChange = 0;

    if(id == 0 || id == 5){    
        distanceChange = 3;
    }else if( id == 1 || id == 2 || id == 3 || id == 4 ){
        distanceChange = 1;
    }else if(id == 6){
        distanceChange = 4;       
    }else if(id == 7 || id == 8){
        distanceChange = 2;       
    }

    camera.position = new BABYLON.Vector3((p.orbit + p.radius + distanceChange) * Math.sin(p.alpha + alphaChange), 0, (p.orbit + p.radius +distanceChange) * Math.cos(p.alpha + alphaChange))
}

export const highlightLayerLogic = (scene, highlightLayer, planets) => {
    // this section here is determining whether a planet needs to be highlighted or not
    const pick = scene.pick(scene.pointerX, scene.pointerY);
    if(pick.pickedMesh != null) {
        if(pick.pickedMesh.name == 'sphere'){
            const currentMesh = planets[pick.pickedMesh.idNumber];
            if(lastMeshHighlighted != currentMesh){
                highlightLayer.addMesh(currentMesh, BABYLON.Color3.White());
                highlightLayer.innerGlow = false;
                lastMeshHighlighted = currentMesh;
            }
        }
    }else{
        if(lastMeshHighlighted != null){
            highlightLayer.removeAllMeshes();
            lastMeshHighlighted = null;
        }
    }
}