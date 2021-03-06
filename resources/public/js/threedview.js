var camera;
var scene;
var renderer;
var mesh;
var flNegativ = true;
var flRightLeft = true;
var shapeColor = 0xffeedd;
var light;
var controls;


 // View3D();
 // animate();

 function View3D (domElement) {
   init(domElement);
   animate();
 }


function init (domElement) {
console.log("3DVIEW JS");
var container = domElement;
//document.getElementById('Container_3d');
var positionInfo = container.getBoundingClientRect();
var width = positionInfo.width;
var height = positionInfo.height;
var imgRender = document.getElementById('imgRender');

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(14, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(3.5, -1, 10);

light = new THREE.DirectionalLight(shapeColor);
console.log(light.color)
light.position.set( 0.5, 0.8, 1.8 ).normalize();
scene.add(light);

//=========== materials =================
var frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("crp3.jpg"),
  side: THREE.FrontSide});
frontMaterial.opacity =1; //opaque color ???

var backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("fabric_1.jpg"),
  side: THREE.FrontSide});

var materials = [frontMaterial, backMaterial];
var material = new THREE.MeshFaceMaterial(materials);

//============geometry=================
var geometry = new THREE.Geometry();
var shirtObj = new ShirtObj();


for (var i = 0; i <= shirtObj.v.length - 1; i++)
    geometry.vertices.push(
                      new THREE.Vector3(shirtObj.v[i].x, shirtObj.v[i].y, shirtObj.v[i].z));

var normal = new THREE.Vector3(0, 0, 1);
var color = new THREE.Color(0x0000f0);

for (var i = 0; i <= shirtObj.f_tri.length - 1; i++) {

    geometry.faces.push(new THREE.Face3(shirtObj.f_tri[i].f0, shirtObj.f_tri[i].f2,
                shirtObj.f_tri[i].f1, normal));

  }


for (var i = 0; i <= shirtObj.f_quad.length - 1; i++) {
    geometry.faces.push(new THREE.Face3(shirtObj.f_quad[i].f0, shirtObj.f_quad[i].f1,
                shirtObj.f_quad[i].f2, normal, color, 0));


    geometry.faces.push(new THREE.Face3(shirtObj.f_quad[i].f0, shirtObj.f_quad[i].f2,
                shirtObj.f_quad[i].f3, normal, color, 0));

}

geometry.computeBoundingBox();

var max = geometry.boundingBox.max,
min = geometry.boundingBox.min;
var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
var range = new THREE.Vector2((max.x - min.x), (max.y - min.y));
var faces = geometry.faces;

geometry.faceVertexUvs[0] = [];

for (var i = 0; i < faces.length; i++) {
    var v1 = geometry.vertices[faces[i].a];
    v2 = geometry.vertices[faces[i].b];
    v3 = geometry.vertices[faces[i].c];
    var face = geometry.faces[i];
    if ((v1.z > 0) || (v2.z > 0) || (v3.z > 0))
      face.materialIndex = 0; // It used first material for now.
    else face.materialIndex = 1; // It used first material for now.

    geometry.faceVertexUvs[0].push([
        new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
        new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
        new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
])

}
    geometry.uvsNeedUpdate = true;
    var textureMap = THREE.ImageUtils.loadTexture(imgRender.src);


  //===========================texture==========================

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 0;
    scene.add( mesh );

    // Here add custom object
    //drawSphericalSkybox();
    mesh2();
    //drawSimpleSkybox();



    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xfefefe, 1);
  //  renderer.setClearColor(0x0033ff);
    renderer.setSize(width, height);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false );

    render();
}



function drawSphericalSkybox() {
  var imgSky = document.getElementById('imgSky');

  var skyMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, map: THREE.ImageUtils.loadTexture(imgSky.src),
    side: THREE.DoubleSide});

  // create Mesh with sphere geometry and add to the scene

  var skyBoxMesh = new THREE.Mesh(new THREE.SphereGeometry(100, 32, 32), skyMaterial);

  //skyBoxMesh.scale.set(1, 1, 1);
'media/imageSix.jpg'
  skyBoxMesh.position.set(0, 0, -10);

  //skyBoxMesh.eulerOrder = 'XZY';

  //skyBox.renderDepth = 500.0;
  this.scene.add(skyBoxMesh);
}


function drawSimpleSkybox() {
  var path = 'skyboxes/Sorsele3/';
  var sides = [ path + 'posx.jpg', path + 'negx.jpg', path + 'posy.jpg', path + 'negy.jpg', path + 'posz.jpg', path + 'negz.jpg' ];
//
//   // load images
//   //var imgSky = document.getElementById('imgSky');
//
//   var scCube = THREE.ImageUtils.loadTextureCube(sides);
//   scCube.format = THREE.RGBFormat;
//
//   // prepare skybox material (shader)
//
//   var skyShader = THREE.ShaderLib["cube"];
//   skyShader.uniforms["tCube"].value = scCube;
//
//   var skyMaterial = new THREE.ShaderMaterial( {
//     fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
//     uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
//   });
//
//
//   var skyBox = new THREE.Mesh(new THREE.CubeGeometry(500, 500, 500), skyMaterial);
//
//   scene.add(skyBox);
//
//   // creates cubes geometry in front of camera (assuming your camera position and rotation has not changed)
//
// =====================================================================================
// var path = 'skyboxes/my/';
// var sides = [ path + 'posx.jpg', path + 'negy.jpg', path + 'negx.jpg', path + 'posy.jpg', path + 'posz.jpg', path + 'negz.jpg' ];

var geometry = new THREE.BoxGeometry(20,20,-20);
// Adding the image as material to wrap

var materialArray = [];
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( sides[0] ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( sides[1] ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( sides[2] ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( sides[3] ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( sides[4] ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( sides[5] ) }));
var material = new THREE.MeshFaceMaterial(materialArray);

var cube = new THREE.Mesh(geometry, material);

scene.add(cube);
}




function animate() {
console.log("THREE ANIMATE")
requestAnimationFrame(animate);

// required if controls.enableDamping or controls.autoRotate are set to true
controls.minDistance = 10;
controls.maxDistance = 10;
controls.update();

renderer.render(scene, camera);

}


function render() {
renderer.render( scene, camera );
}

function onWindowResize() {
var container = document.getElementById('Container_3d');
var positionInfo = container.getBoundingClientRect();
var width = positionInfo.width;
var height = positionInfo.height;

console.log(width);

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(width, height );
render();
}


//==========================================
function mesh2(){
  //=========== materials =================
  var frontMaterial = new THREE.MeshBasicMaterial({ color: 0xf0e0e0, side: THREE.BackSide, map: THREE.ImageUtils.loadTexture("crp3.jpg")});
  frontMaterial.opacity =1; //opaque color ???

  var backMaterial = new THREE.MeshBasicMaterial({color: 0xf0e0e0, side: THREE.BackSide, map: THREE.ImageUtils.loadTexture("fabric_1.jpg")});

  var materials = [frontMaterial, backMaterial];
  var material = new THREE.MeshFaceMaterial(materials);

  //============geometry=================
  var geometry = new THREE.Geometry();
  var shirtObj = new ShirtObj();


  for (var i = 0; i <= shirtObj.v.length - 1; i++)
      geometry.vertices.push(
                        new THREE.Vector3(shirtObj.v[i].x, shirtObj.v[i].y, shirtObj.v[i].z));

  var normal = new THREE.Vector3(0, 0, 1);
  var color = new THREE.Color(0x0000f0);

  for (var i = 0; i <= shirtObj.f_tri.length - 1; i++) {

      geometry.faces.push(new THREE.Face3(shirtObj.f_tri[i].f0, shirtObj.f_tri[i].f2,
                  shirtObj.f_tri[i].f1, normal));

    }


  for (var i = 0; i <= shirtObj.f_quad.length - 1; i++) {
      geometry.faces.push(new THREE.Face3(shirtObj.f_quad[i].f0, shirtObj.f_quad[i].f1,
                  shirtObj.f_quad[i].f2, normal, color, 0));


      geometry.faces.push(new THREE.Face3(shirtObj.f_quad[i].f0, shirtObj.f_quad[i].f2,
                  shirtObj.f_quad[i].f3, normal, color, 0));

  }

  geometry.computeBoundingBox();

  var max = geometry.boundingBox.max,
  min = geometry.boundingBox.min;
  var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
  var range = new THREE.Vector2((max.x - min.x), (max.y - min.y));
  var faces = geometry.faces;

  geometry.faceVertexUvs[0] = [];

  for (var i = 0; i < faces.length; i++) {
      var v1 = geometry.vertices[faces[i].a];
      v2 = geometry.vertices[faces[i].b];
      v3 = geometry.vertices[faces[i].c];
      var face = geometry.faces[i];
      if ((v1.z > 0) || (v2.z > 0) || (v3.z > 0))
        face.materialIndex = 0; // It used first material for now.
      else face.materialIndex = 1; // It used first material for now.

      geometry.faceVertexUvs[0].push([
          new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
          new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
          new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
  ])

  }
      geometry.uvsNeedUpdate = true;
      var textureMap = THREE.ImageUtils.loadTexture(imgRender.src);


    //===========================texture==========================

      mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = 0;
      scene.add( mesh );

}
