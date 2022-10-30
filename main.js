import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/GLTFLoader.js'


var scene = new THREE.Scene();
scene.background = new THREE.Color('white');
let i = 1

const fov = 18; // AKA Field of View
const aspect = window.innerWidth/window.innerHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;


document.querySelector('#scene-container').append(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();
loader.load( 'asset.glb', function (gltf)
{
    const model = gltf.scene; // sword 3D object is loaded
    //model.castShadow = true;
    scene.add(model);

},	function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

}, {function ( error ) {

        console.log( 'An error happened' );

    }} );

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
ambientLight.intensity = 1.7;
scene.add( ambientLight );

const light_front = new THREE.DirectionalLight(0xFFFFFF, 0.5);
light_front.position.z = 10
light_front.position.y = 2
light_front.position.x = 4
scene.add(light_front);


// change background color with button click
const btn = document.getElementById('btn-bg');
btn.addEventListener('click', function onClick(event) {
    console.log(scene.background)
    if (scene.background == "white" || i == 1)  {
        scene.background = "black";
        renderer.setClearColor( 0x0000 );
        btn.firstChild.data = "white mode"
        btn.style.backgroundColor = 'white';
        btn.style.color = 'black';
        i += 1;
    } else {
        scene.background = "white";
        renderer.setClearColor( 0xffffff );
        btn.firstChild.data = "black mode"
        btn.style.backgroundColor = 'black';
        btn.style.color = 'white';
    }
});

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render(scene, camera);
}


animate();