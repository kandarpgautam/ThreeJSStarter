import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js' 
import gsap from 'gsap' //npm i gsap for timeline animation
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import { PointLightHelper } from 'three'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//gsap 
let tl = gsap.timeline()

// helmet object

// gltfLoader.load('DamagedHelmet.gltf', (gltf)=>{
//     gltf.scene.scale.set(0.3,0.3,0.3)
//     gltf.scene.rotation.set(0,0,0)
//     scene.add(gltf.scene)
//     gui.add(gltf.scene.rotation,'x').min(0).max(9)
//     gui.add(gltf.scene.rotation,'y').min(0).max(9)
//     gui.add(gltf.scene.rotation,'z').min(0).max(9)
//     tl.to(gltf.scene.rotation,{ y: 0.67, duration: 2})
//     tl.to(gltf.scene.scale,{ x: .6, y: .6, z: .6 , duration: 2},'-=2') //-=2 is offset for start time
// })


//LOAD GLB
//const dracoLoader = new DRACOLoader();
//dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
//dracoLoader.setDRACOLoader( dracoLoader );

//GLTFLOADER
const gltfLoader = new GLTFLoader()
// sort controls in folder
const objectControl = gui.addFolder('room')
const objectPosition = objectControl.addFolder('position')
const objectRotation = objectControl.addFolder('rotation')

gltfLoader.load( 'room.glb', function ( gltf ) {
    gltf.scene.rotation.set(0,0,0)
    //gltf.scene.position.set()
	scene.add( gltf.scene );
    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
    //object rotation controls
    objectRotation.add(gltf.scene.rotation,'x').min(0).max(9)
    objectRotation.add(gltf.scene.rotation,'y').min(0).max(9)
    objectRotation.add(gltf.scene.rotation,'z').min(0).max(9)
    //object position controls
    objectPosition.add(gltf.scene.position,'x').min(-3).max(3).step(0.01).setValue(-0.58)
    objectPosition.add(gltf.scene.position,'y').min(-3).max(3).step(0.01).setValue(-2.12)
    objectPosition.add(gltf.scene.position,'z').min(-3).max(3).step(0.01).setValue(-2.53)
    tl.to(gltf.scene.rotation,{ y: 0.67, duration: 2})
    tl.to(gltf.scene.scale,{ x: .5, y: .5, z: .5 , duration: 2},'-=2') //-=2 is offset for start time
}, undefined, function ( error ) {

	console.error( error );

} );

// //LOAD FBX

// sort controls in folder
const objectControl2 = gui.addFolder('window')
const objectPosition2 = objectControl2.addFolder('position')
const fbxLoader = new FBXLoader()
fbxLoader.load('Window_Living.FBX', object=>{
    //initialize position
    object.position.set(-2,1.59,-3);
    scene.add(object)
    //object position controls
    objectPosition2.add(object.position,'x').min(-3).max(3).step(0.01)
    objectPosition2.add(object.position,'y').min(-3).max(3).step(0.01)
    objectPosition2.add(object.position,'z').min(-3).max(3).step(0.01)
})

//Load ceiling Fan
const fanObject = gui.addFolder('fan')
const fanObjectPosition = fanObject.addFolder('position')
const fanObjectRotation = fanObject.addFolder('rotation')
fbxLoader.load('Celing_Fan_Updated_white.FBX',object=>{
    object.rotation.set(0.5,0,0.03);
    object.position.set(0.8,1.1,-1.1);
    scene.add(object)
    //object position controls
    fanObjectPosition.add(object.position,'x').min(-3).max(3).step(0.01)
    fanObjectPosition.add(object.position,'y').min(-3).max(3).step(0.01)
    fanObjectPosition.add(object.position,'z').min(-3).max(3).step(0.01)
    //object rotation controls
    fanObjectRotation.add(object.rotation,'x').min(-3).max(3).step(0.01)
    fanObjectRotation.add(object.rotation,'y').min(-3).max(3).step(0.01)
    fanObjectRotation.add(object.rotation,'z').min(-3).max(3).step(0.01)
})


// Lights

const pointLight = new THREE.AmbientLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
// lighting position controls 
const ambientlight =gui.addFolder('Ambient light')

const lightFolder = ambientlight.addFolder('color and intensity')
// lightFolder.addColor(data, 'color').onChange(() => {
//     ambientlight.color.setHex(Number(data.color.toString().replace('#', '0x')))
// })
lightFolder.add(pointLight, 'intensity', 0, 2, 0.01)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()