var camera;
var scene;
var renderer;
var mesh;
var flNegativ = true;
var flRightLeft = true;
var shapeColor = 0xffeeff;
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
var imgBackRender = document.getElementById('imgBackRender');

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, -1, 10);

light = new THREE.DirectionalLight(shapeColor);
console.log(light.color)
light.position.set( 0.5, 0.8, 1.8 ).normalize();
scene.add(light);

//=========== materials =================
var frontMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture(imgRender.src),
  side: THREE.DoubleSide, emissive: 0x00003a});
frontMaterial.opacity = 1; //opaque color ???

var backMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff,
  side: THREE.DoubleSide, emissive: 0x00003a });

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
    mesh.position.z = 0; //-2
    scene.add( mesh );


    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xaaaaaa, 1);
  //  renderer.setClearColor(0x0033ff);
    renderer.setSize(width, height);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false );

    render();
}


function animate() {
console.log("THREE ANIMATE")
requestAnimationFrame(animate);

// required if controls.enableDamping or controls.autoRotate are set to true
controls.update();

renderer.render(scene, camera);

}


/*function animate() {
var flAnim = document.getElementById("animCBID").checked;


//mesh.rotation.x += .005;
if (mesh.rotation.y > 0.7) {
    flRightLeft = false;
}
if (mesh.rotation.y < -0.7) {
    flRightLeft = true;
}
if (flRightLeft){
    mesh.rotation.y += .005;
    mesh.rotation.x += .002;
}
else {
    mesh.rotation.y -= .005;
    mesh.rotation.x -= .002;
}

    if (mesh.position.z < -3)
        flNegativ = false
    if (mesh.position.z > -1.8)
        flNegativ = true



    if (flAnim) {
        if (flNegativ)
        mesh.position.z += -0.01;
        else
        mesh.position.z += 0.01

    }
    render();
    //requestAnimationFrame(animate);

}*/

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
