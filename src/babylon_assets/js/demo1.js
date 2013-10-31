!function(){
	if (!BABYLON.Engine.isSupported()) {
		document.body.innerHTML='<div class="no3d">Your browser does not support 3D.</div>';
		throw "Babylon engine not supported!";
	}

	// basic setup
	var canvas = document.getElementsByTagName('canvas')[0];
	var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    window.addEventListener("resize", function () { engine.resize(); });
    engine.runRenderLoop(function () { scene.render(); });
    
    var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

    var camera = new BABYLON.FreeCamera("Camera",  new BABYLON.Vector3(14,45,33), scene);
    camera.attachControl(canvas);
    camera.checkCollisions = true;
    camera.keysUp.push(90); // Z
    camera.keysUp.push(87); // W
    camera.keysDown.push(83); // S
    camera.keysLeft.push(65); // A
    camera.keysLeft.push(81); // Q
    camera.keysRight.push(69); // E
    camera.keysRight.push(68); // D
    

    // Skybox
	var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("babylon_assets/img/skybox/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;

	// Grounds
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "babylon_assets/img/heightMap.png", 100, 100, 100, 0, 12, scene, true);
    var groundMaterial = new GroundMaterial("ground", scene, sun, "babylon_assets/shaders/ground");
    ground.material = groundMaterial;
    ground.position.y = -2.0;

    var extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
    var extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
    extraGroundMaterial.diffuseTexture = new BABYLON.Texture("babylon_assets/shaders/ground/sand.jpg", scene);
    extraGroundMaterial.diffuseTexture.uScale = 60;
    extraGroundMaterial.diffuseTexture.vScale = 60;
    extraGround.position.y = -2.05;
    extraGround.material = extraGroundMaterial;

    var elevationControl = new ElevationControl(ground, "./babylon_assets/shaders/ground");
	

	// Water
	BABYLON.Engine.ShadersRepository = "";
	var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
	var waterMaterial = new WaterMaterial("water", scene, sun, "./babylon_assets/shaders/water");
	waterMaterial.refractionTexture.renderList.push(extraGround);
	waterMaterial.refractionTexture.renderList.push(ground);

	waterMaterial.reflectionTexture.renderList.push(ground);
	waterMaterial.reflectionTexture.renderList.push(skybox);

	water.material = waterMaterial;
}();