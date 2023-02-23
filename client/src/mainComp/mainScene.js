var Scene = require("@babylonjs/core").Scene;
var Engine = require("@babylonjs/core").Engine;
var Vector3 = require("@babylonjs/core").Vector3;
var HemisphericLight = require("@babylonjs/core").HemisphericLight;
var ArcRotateCamera = require("@babylonjs/core").ArcRotateCamera;
// var StandardMaterial = require("@babylonjs/core").StandardMaterial;
var CubeTexture = require("@babylonjs/core").CubeTexture;
var Ray = require("@babylonjs/core").Ray;
//var RayHelper = require("@babylonjs/core").RayHelper;
var WebXRDefaultExperience = require("@babylonjs/core").WebXRDefaultExperience;
var EnvironmentHelper = require("@babylonjs/core").EnvironmentHelper;
// var MeshBuilder = require("@babylonjs/core").MeshBuilder;
// var Color3 = require("@babylonjs/core").Color3;
var SceneLoader = require("@babylonjs/core").SceneLoader;
var fileInput = document.getElementById("loadFile");
if (!fileInput) {
  fileInput = document.createElement("INPUT");
  fileInput.setAttribute("id", "loadFile");
  fileInput.setAttribute("type", "file");
  fileInput.style.position = "absolute";
  fileInput.style.top = "80px";
  fileInput.style.width = "200px";
  fileInput.style.height = "100px";
  fileInput.style.right = "40px";
  document.body.children[0].appendChild(fileInput);
}

require("@babylonjs/core/Materials/Textures/Loaders");
require("@babylonjs/core/Materials/Node/Blocks");
require("@babylonjs/loaders");

export class mainScene {
  scene;
  engine;

  constructor(canvas) {
    this.engine = new Engine(canvas, true);
    this.scene = this.CreateScene();

    /* SceneLoader.ImportMesh(
      "",
      "./models/",
      "item.glb",
      this.scene,
      function (meshes) {
        console.log("meshes", meshes);
      }
    );*/
    /*
    SceneLoader.ImportMesh(
      "",
      "https://realviewtest1.s3.eu-west-2.amazonaws.com/models/",
      "item.glb",
      this.scene,
      function (newMeshes) {
        var importedMesh = newMeshes[0];
        console.log(importedMesh);
        // do something with the imported mesh
      }
    );*/

    const result = SceneLoader.ImportMesh("", "./models/", "item.glb");
    const meshes = result.meshes;

    console.log("meshes", meshes);

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 0.5;

    const camera = new ArcRotateCamera(
      "Camera",
      -(Math.PI / 4) * 3,
      Math.PI / 4,
      10,
      new Vector3(0, 0, 0),
      this.scene
    );
    camera.attachControl(true);

    this.initXR();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene() {
    const scene = new Scene(this.engine);

    return scene;
  }

  async initXR() {
    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/environment.env",
      this.scene
    );
    const envHelper = new EnvironmentHelper(
      {
        groundOpacity: 0.75,
      },
      this.scene
    );

    envHelper.skybox?.dispose();
    envHelper.ground.scaling = new Vector3(5, 5, 5);
    envHelper.ground.position.y = -1.1;
    envHelper.ground.isPickable = false;

    // const sphereD = 1.0;
    // const sphere = MeshBuilder.CreateSphere(
    //   "Sphere",
    //   { segments: 16, diameter: sphereD },
    //   this.scene
    // );
    // sphere.position.x = 0;
    // sphere.position.y = sphereD * 2;
    // sphere.position.z = 0;
    // sphere.isPickable = true;

    // const rMat = new StandardMaterial("matR", this.scene);
    // rMat.diffuseColor = new Color3(1.0, 0, 0);
    // sphere.material = rMat;

    this.scene.createDefaultSkybox(envTex, true);

    //this.scene.environmentIntensity = 0.5;

    const xr = await WebXRDefaultExperience.CreateAsync(this.scene, {
      floorMeshes: [envHelper.ground],
      optionalFeatures: true,
    });

    const tmpRay = new Ray(new Vector3(), new Vector3(), 3);
    const tmpRay2 = new Vector3(new Vector3(), new Vector3(), 3);
    const tmpRay3 = new Vector3(new Vector3(), new Vector3(), 3);

    // const rayHelper = new RayHelper(tmpRay);
    // rayHelper.show(this.scene);
    // const rayHelper2 = new RayHelper(tmpRay2);
    // rayHelper2.show(this.scene);
    // const rayHelper3 = new RayHelper(tmpRay3);
    // rayHelper3.show(this.scene);

    let hit;
    let tmpMesh;

    xr.input.onControllerAddedObservable.add((controller) => {
      controller.onMotionControllerInitObservable.add((motionController) => {
        if (motionController.handness === "right") {
          const xr_ids = motionController.getComponentIds();
          const triggerComponent = motionController.getComponent(xr_ids[0]);
          triggerComponent.onButtonStateChangedObservable.add(() => {
            if (triggerComponent.value > 0.5) {
              controller.getWorldPointerRayToRef(tmpRay, false);

              hit = this.scene.pickWithRay(tmpRay);

              if (hit) {
                if (hit.pickedMesh !== undefined) {
                  if (hit.pickedMesh) {
                    tmpMesh = hit.pickedMesh;
                    console.log("name:" + hit.pickedMesh.name);
                    tmpMesh.setParent(motionController.rootMesh);
                  }
                }
              }
            } else if (triggerComponent.value < 0.5) {
              if (tmpMesh != undefined) {
                tmpMesh.setParent(null);
              }
            }
          });

          const abuttonComponent = motionController.getComponent(xr_ids[3]);
          abuttonComponent.onButtonStateChangedObservable.add(() => {
            if (abuttonComponent.pressed) {
              controller.getWorldPointerRayToRef(tmpRay2, false);

              hit = this.scene.pickWithRay(tmpRay2);

              if (hit && hit.pickedMesh) {
                if (hit.pickedMesh) {
                  hit.pickedMesh.scaling.x *= 0.9;
                  hit.pickedMesh.scaling.y *= 0.9;
                  hit.pickedMesh.scaling.z *= 0.9;
                }
              }
            }
          });

          const bbuttonComponent = motionController.getComponent(xr_ids[4]);
          bbuttonComponent.onButtonStateChangedObservable.add(() => {
            if (bbuttonComponent.pressed) {
              controller.getWorldPointerRayToRef(tmpRay3, false);

              hit = this.scene.pickWithRay(tmpRay3);

              if (hit && hit.pickedMesh) {
                if (hit.pickedMesh) {
                  hit.pickedMesh.scaling.x *= 1.1;
                  hit.pickedMesh.scaling.y *= 1.1;
                  hit.pickedMesh.scaling.z *= 1.1;
                }
              }
            }
          });
        }
      });
    });
  }
}
