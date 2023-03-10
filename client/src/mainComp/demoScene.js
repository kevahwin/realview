import {
  HighlightLayer,
  // AbstractMesh,
  /*ShadowGenerator,*/
  GizmoManager,
  LightGizmo,
  // TransformNode,
  /*VertexData,*/
  /*VertexBuffer,*/ /*Mesh,*/
  Scene,
  Engine,
    /*Color3,*/ Vector3,
    /*MeshBuilder,*/ HemisphericLight,
  EnvironmentHelper,
  WebXRDefaultExperience,
  ArcRotateCamera,
    /*StandardMaterial,*/ CubeTexture,
  Ray,
  //RayHelper,
  SceneLoader,
  PBRMaterial,
  Texture,
  SpotLight,
  DirectionalLight,
  Color3,
} from "@babylonjs/core";
import {
  // Button3D,
  NearMenu,
  HolographicButton,
  // TouchHolographicButton,
  /*ColorPicker, TextBlock, StackPanel, AdvancedDynamicTexture, Control,*/ /*HolographicButton,*/
  // CylinderPanel,
  GUI3DManager /*panel, anchor MeshButton3D */,
} from "@babylonjs/gui";

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

import "@babylonjs/core/Materials/Textures/Loaders";
import "@babylonjs/core/Materials/Node/Blocks";
import "@babylonjs/loaders";

export class demoScene {
  scene;
  engine;

  constructor(canvas) {
    this.canvas = canvas;
    this.engine = new Engine(this.canvas, true, { stencil: true });
    this.scene = this.CreateScene();

    //const manager = new GUI.GUI3DManager(this.scene);

    // panel.blockLayout = true;
    // for (let index = 0; index < 30; index++) {
    //   const button = new GUI.Button3D("click me");
    //   manager.addControl(panel);
    //   panel.addControl(button);
    // }
    // panel.blockLayout = false;

    // var manager = new GUI.GUI3DManager(this.scene);

    // var panel = new GUI.CylinderPanel();
    // panel.margin = 0.2;

    // manager.addControl(panel);
    // panel.linkToTransformNode(anchor);
    // panel.position.z = 0;

    const camera = new ArcRotateCamera(
      "Camera",
      0, 0, 5,
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
    const envHelper = new EnvironmentHelper(
      {
        groundColor: new Color3(178, 190, 181),
        groundSize: 15,
        groundOpacity: 0.7,
      },
      this.scene
    );

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    hemiLight.intensity = 0;

    const studioTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/studio.env",
      this.scene
    );
    this.scene.environmentTexture = studioTex;
    this.scene.createDefaultSkybox(studioTex, true);

    const skyTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      this.scene
    );
    this.scene.environmentTexture = skyTex;
    this.scene.createDefaultSkybox(skyTex, true);

    this.scene.environmentIntensity = 0.05;

    SceneLoader.ImportMeshAsync("", "./models/", "cafe.glb").then(
      (result2) => {
        result2.meshes.forEach((mesh) => {
          // mesh.position.y = -0.7;
          mesh.isPickable = true;
        });
      }
    );

    // // Import radial GUI from Dropbox.
    // var radialGuiImportResult = await SceneLoader.ImportMeshAsync("", "https://dl.dropbox.com/s/5gw2ibz1k6p6r17/radialGuiWithIcons.glb", "radialGuiWithIcons.glb", this.scene);
    // // Create radial GUI transform node.
    // var radialGui = new TransformNode("radialGui")
    // radialGuiImportResult.meshes.forEach((mesh, index) => {
    //   if (index > 0) mesh.setParent(radialGui)
    // })
    // // dispose "__root__" after handling/
    // radialGuiImportResult.meshes[0].dispose();

    var manager = new GUI3DManager(this.scene);

    // var anchor = new AbstractMesh("anchor", this.scene);

    // // Let's add a button
    // var button = new Button3D("reset");
    // manager.addControl(button);
    // button.linkToTransformNode(anchor);
    // button.position.z = -1.5;

    // button.onPointerUpObservable.add(function () {
    //   this.scene.environmentTexture = studioTex;
    //   // this.scene.createDefaultSkybox(studioTex, true);
    // });


    // Transform meshes into buttons.

    manager.useRealisticScaling = false;

    const spotLight = new SpotLight(
      "spotLight",
      new Vector3(-4, 0.5, 0),
      new Vector3(4, 0, 0),
      Math.PI / 2,
      10,
      this.scene
    );
    spotLight.intensity = 1000;
    spotLight.shadowEnabled = true;
    // const shadowGen = new ShadowGenerator(2048, spotLight);

    const lightGizmo = new LightGizmo();
    lightGizmo.scaleRatio = 3;
    lightGizmo.light = spotLight;

    const gizmoManager = new GizmoManager(this.scene);
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.usePointerToAttachGizmos = false;
    gizmoManager.attachToMesh(lightGizmo.attachedMesh);
    // gizmoManager.boundingBoxGizmoEnabled = true;

    const near = new NearMenu("near");
    manager.addControl(near);
    near.scaling = new Vector3(0.20, 0.20, 0.20);
    // near.position = new Vector3(0, 0, 3);
    near.margin = 0.1;
    near.backPlateMargin = 0.25;
    // near.columns = 1;
    let follower = near.defaultBehavior.followBehavior; //returns the followbehavior created by the
    follower.defaultDistance = 1.5;
    follower.minimumDistance = 1;
    follower.maximumDistance = 2;

    const button1 = new HolographicButton("spotlightPlus");
    // button1.imageUrl = "./textures/IconClose.png";
    button1.text = "Spotlight Intensity +";
    near.addButton(button1);
    button1.onPointerUpObservable.add(function () {
      spotLight.intensity *= 1.1;
      console.log(spotLight.intensity);
    });

    const button0 = new HolographicButton("spotlightMinus");
    // button0.imageUrl = "./textures/IconFollowMe.png";
    button0.text = "Spotlight Intensity -";
    near.addButton(button0);
    button0.onPointerUpObservable.add(function () {
      // this.scene.environmentTexture = skyTex;
      // this.scene.createDefaultSkybox(skyTex, true);
      spotLight.intensity *= 0.9;
      console.log(spotLight.intensity);
    });



    const button2 = new HolographicButton("spotlightAnglePlus");
    // button2.imageUrl = "./textures/IconFollowMe.png";
    button2.text = "Spotlight Angle +";
    near.addButton(button2);
    button2.onPointerUpObservable.add(function () {
      spotLight.angle *= 1.1;
      console.log(spotLight.angle);
    });

    const button3 = new HolographicButton("spotlightAngleMinus");
    // button2.imageUrl = "./textures/IconFollowMe.png";
    button3.text = "Spotlight Angle -";
    near.addButton(button3);
    button3.onPointerUpObservable.add(function () {
      spotLight.angle *= 0.9;
      console.log(spotLight.angle);
    });

    // const button4 = new TouchHolographicButton("environmentIntensityPlus");
    // // button2.imageUrl = "./textures/IconFollowMe.png";
    // button4.text = "Environment Intensity Plus";
    // near.addButton(button4);
    // button4.onPointerUpObservable.add(function () {
    //   this.scene.environmentIntensity *= 1.1;
    // });

    // const button5 = new TouchHolographicButton("environmentIntensityMinus");
    // // button2.imageUrl = "./textures/IconFollowMe.png";
    // button5.text = "Environment Intensity Minus";
    // near.addButton(button5);
    // button5.onPointerUpObservable.add(function () {
    //   this.scene.environmentIntensity *= 0.9;
    // });

    near.isPinned = false;

    // // Handle buttons.
    // radialGuiImportResult.meshes.forEach((slice) => {
    //   // Apply button material only to buttons.
    //   if (!slice.name.includes("button")) return
    //   // Default colour/material.
    //   var highlightMaterial = new StandardMaterial("highlight", this.scene);
    //   highlightMaterial.diffuseColor = new Color3(0.42, 0.4, 0.38);
    //   highlightMaterial.backFaceCulling = false
    //   highlightMaterial.useLightmapAsShadowmap = true;
    //   slice.material = highlightMaterial;
    //   // Create push button.
    //   var pushButton = new MeshButton3D(slice, "pushButton");
    //   // Add button animations.
    //   pushButton.pointerEnterAnimation = () => {
    //     slice.material.diffuseColor = new Color3(0, 0.02, 1);
    //   };
    //   pushButton.pointerOutAnimation = () => {
    //     slice.material.diffuseColor = new Color3(0.42, 0.4, 0.38);
    //   };
    //   // Add button to manager.
    //   manager.addControl(pushButton)
    // })

    // var anchor = new TransformNode("");

    // var panel = new CylinderPanel();
    // panel.margin = 0.2;

    // manager.addControl(panel);
    // panel.linkToTransformNode(anchor);
    // panel.position.z = -0.5;
    // panel.position.y = 1.75;

    // // Let's add some buttons!
    // var addButton = function () {
    //   var button = new HolographicButton("orientation");
    //   panel.addControl(button);

    //   button.text = "Button #" + panel.children.length;
    // };

    // panel.blockLayout = true;
    // for (var index = 0; index < 30; index++) {
    //   addButton();
    // }
    // panel.blockLayout = false;



    const directionalLight = new DirectionalLight(
      "directionalLight",
      new Vector3(-10, -5, -8.5),
      this.scene
    );
    directionalLight.shadowEnabled = true;
    directionalLight.position = new Vector3(100, 50, 85);
    // const shadowGen2 = new ShadowGenerator(2048, directionalLight);

    // const lightGizmo2 = new LightGizmo();
    // lightGizmo2.scaleRatio = 2;
    // lightGizmo2.light = directionalLight;

    // gizmoManager.attachToMesh(lightGizmo2.attachedMesh);

    // const sphereD = 1.0;
    // const sphere = MeshBuilder.CreateSphere('Sphere', { segments: 16, diameter: sphereD }, this.scene);
    // sphere.position.x = 0;
    // sphere.position.y = sphereD * 2;
    // sphere.position.z = 0;
    // sphere.isPickable = true;

    // const rMat = new StandardMaterial("matR", this.scene);
    // rMat.diffuseColor = new Color3(1.0, 0, 0);
    // sphere.material = rMat;

    // shadowGen.getShadowMap().renderList.push(sphere);
    // shadowGen.addShadowCaster(sphere);

    // var plane = MeshBuilder.CreatePlane("plane");
    // plane.position = new Vector3(1.4, 1.5, 0.4)
    // var advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane);
    // var panel2 = new StackPanel();
    // advancedTexture.addControl(panel2);
    // var header = new TextBlock();
    // header.text = "Color GUI";
    // header.height = "100px";
    // header.color = "white";
    // header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    // header.fontSize = "120"
    // panel2.addControl(header);
    // var picker = new ColorPicker();
    // picker.value = sphere.material.diffuseColor;
    // picker.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    // picker.height = "350px";
    // picker.width = "350px";
    // picker.onValueChangedObservable.add(function (value) {
    //   sphere.material.diffuseColor.copyFrom(value);
    // });
    // panel2.addControl(picker);

    envHelper.skybox?.dispose();
    envHelper.setMainColor = new Color3(0.92, 0.92, 0.92);
    envHelper.ground.position.y = -0.2;
    envHelper.ground.isPickable = false;
    envHelper.ground.visibility = true;
    envHelper.ground.scaling = new Vector3(1, 1, 1);
    //envHelper.ground.scaling = new Vector3(, 2.1, 2.1);

    const pbr = new PBRMaterial("pbr", this.scene);
    pbr.albedoTexture = new Texture(
      "./textures/concrete/concrete_diffuse.jpeg",
      this.scene
    );
    pbr.bumpTexture = new Texture(
      "./textures/concrete/concrete_normal.jpeg",
      this.scene
    );
    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;

    pbr.useRoughnessFromMetallicTextureGreen = true;

    pbr.useMetallnessFromMetallicTextureBlue = true;

    pbr.roughness = 0.9;
    envHelper.ground.material = pbr;

    //const skybox = (this.scene).createDefaultSkybox(envTex, true);


    envHelper.ground.receiveShadows = true;

    const xr = await WebXRDefaultExperience.CreateAsync(this.scene, {
      floorMeshes: [envHelper.ground],
      optionalFeatures: true,
    });

    // let parentMesh;
    // SceneLoader.ImportMeshAsync("", "./models/", "Barrel_01.glb").then(
    //   (result) => {
    //     console.log("result.meshes", result.meshes);
    //     // result.meshes[0].position.x = 5;
    //     // result.meshes[1].isPickable = true;

    //     //Create a parent mesh and set imported meshes as children
    //     // parentMesh = new Mesh("parentMesh", this.scene);
    //     // for (let i = 1; i < result.meshes.length; i++) {
    //     //   result.meshes[i].position.x = 5;
    //     //   result.meshes[i].isPickable = true;
    //     //   result.meshes[i].setParent(parentMesh);
    //     // }

    //     var overrideMaterialSideOrientation = false;
    //     for (var i = 0; i < result.meshes.length; i++) {
    //       result.meshes[i].overrideMaterialSideOrientation =
    //         overrideMaterialSideOrientation;
    //     }

    //     for (i = 1; i < result.meshes.length; i++) {
    //       result.meshes[i].overrideMaterialSideOrientation =
    //         overrideMaterialSideOrientation;
    //       var vertexData = VertexData.ExtractFromMesh(result.meshes[i]);
    //       var positions = vertexData.positions;

    //       if (!positions) {
    //         console.log("Mesh ", i, " is missing position data");
    //       }

    //       console.log(
    //         "Positions for ",
    //         i,
    //         "which is ",
    //         result.meshes[i].name,
    //         "are: ",
    //         positions
    //       );
    //     }

    //     const mergedMesh = Mesh.MergeMeshes(
    //       result.meshes.slice(1),
    //       true,
    //       true,
    //       null,
    //       false,
    //       true
    //     );
    //     mergedMesh.isPickable = true;
    //     mergedMesh.position = new Vector3(0, 0.3, 0);
    //     mergedMesh.receiveShadows = true;

    //     shadowGen.getShadowMap().renderList.push(mergedMesh);
    //     shadowGen.addShadowCaster(mergedMesh);

    //     shadowGen2.getShadowMap().renderList.push(mergedMesh);
    //     shadowGen2.addShadowCaster(mergedMesh);



    //     //shadowGen.addShadowCaster(mergedMesh);

    //     // console.log("mergedMesh", mergedMesh.metadata);

    //     // var positionsDefined = false;
    //     // for (var i = 0; i < result.meshes.length; i++) {
    //     //   if (result.meshes[i].geometry && result.meshes[i].getVerticesData(VertexBuffer.PositionKind)) {
    //     //     positionsDefined = true;
    //     //     break;
    //     //   }
    //     // }
    //     // if (positionsDefined) {
    //     //   var mergedMesh = Mesh.MergeMeshes(result.meshes, true);
    //     //   mergedMesh.position.x = 10;
    //     // } else {
    //     //   console.log("Positions are not defined for one or more meshes");
    //     // }

    //     // console.log("meshes length", result.meshes.length);

    //     // const mergedMesh = Mesh.MergeMeshes(result.meshes);
    //     // console.log("merged.meshes", mergedMesh);
    //     // console.log("mergedMesh", mergedMesh);
    //   }
    // );

    const tmpRay = new Ray(new Vector3(), new Vector3(), 3);
    const tmpRay2 = new Ray(new Vector3(), new Vector3(), 3);
    const tmpRay3 = new Ray(new Vector3(), new Vector3(), 3);

    // const rayHelper = new RayHelper(tmpRay);
    // rayHelper.show(this.scene);
    // const rayHelper2 = new RayHelper(tmpRay2);
    // rayHelper2.show(this.scene);
    // const rayHelper3 = new RayHelper(tmpRay3);
    // rayHelper3.show(this.scene);

    let tmpMesh;
    const hl = new HighlightLayer("hl1", this.scene);

    xr.input.onControllerAddedObservable.add((controller) => {
      controller.onMotionControllerInitObservable.add((motionController) => {
        if (motionController.handness === "right") {
          const xr_ids = motionController.getComponentIds();
          const triggerComponent = motionController.getComponent(xr_ids[0]);
          triggerComponent.onButtonStateChangedObservable.add(() => {
            if (triggerComponent.value > 0.5) {
              controller.getWorldPointerRayToRef(tmpRay, false);

              const hit = this.scene.pickWithRay(tmpRay);

              if (hit) {
                if (hit.pickedMesh !== undefined) {
                  if (hit.pickedMesh) {
                    tmpMesh = hit.pickedMesh;
                    console.log("name:" + hit.pickedMesh.name);
                    hl.addMesh(tmpMesh, Color3.Green());
                    tmpMesh.setParent(motionController.rootMesh);



                    // tmpMesh = hit.pickedMesh;
                    // console.log("name:" + hit.pickedMesh.name);
                    // parentMesh.setParent(motionController.rootMesh);
                  }
                }
              }
            } else if (triggerComponent.value < 0.5) {
              // if (parentMesh.parent !== null) {
              //   parentMesh.setParent(null);
              // }
              if (tmpMesh != undefined) {
                hl.removeMesh(tmpMesh);
                tmpMesh.setParent(null);

              }
            }
          });

          const abuttonComponent = motionController.getComponent(xr_ids[3]);
          abuttonComponent.onButtonStateChangedObservable.add(() => {
            if (abuttonComponent.pressed) {
              controller.getWorldPointerRayToRef(tmpRay2, false);

              const hit = this.scene.pickWithRay(tmpRay2);

              if (hit && hit.pickedMesh) {
                hit.pickedMesh.scaling.multiplyInPlace(
                  new Vector3(0.9, 0.9, 0.9)
                );
              }
            }
          });

          const bbuttonComponent = motionController.getComponent(xr_ids[4]);
          bbuttonComponent.onButtonStateChangedObservable.add(() => {
            if (bbuttonComponent.pressed) {
              controller.getWorldPointerRayToRef(tmpRay3, false);

              const hit = this.scene.pickWithRay(tmpRay3);

              if (hit && hit.pickedMesh) {
                hit.pickedMesh.scaling.multiplyInPlace(
                  new Vector3(1.1, 1.1, 1.1)
                );
              }
            }
          });
        }
      });
    });
  }
}
