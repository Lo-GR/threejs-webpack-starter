import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//debug (where controls are) vvvv
import * as dat from 'dat.gui'
//Loading

// The code below is a loader that loads the textures, especially important to add with a lot of assets


const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas, get access to the canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects, geometry
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials, "clothing"
//Standard material is powerful in that it can emulate real world material.
const material = new THREE.MeshStandardMaterial()
material.metalness = .7;
material.roughness = .2;
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929)

// Mesh, ties them together. pass in geometry, then material onto geometry
const sphere = new THREE.Mesh(geometry,material)
//add to scene,
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.1, -1.8, -1.8)
pointLight2.intensity = 10
scene.add(pointLight2);

// const light1GUI = gui.addFolder('Light 1');

// //.add(object, property )
// light1GUI.add(pointLight2.position, 'y').min(-3).max(3).step(.01)
// light1GUI.add(pointLight2.position, 'x').min(-6).max(6).step(.01)
// light1GUI.add(pointLight2.position, 'z').min(-3).max(3).step(.01)
// light1GUI.add(pointLight2, 'intensity').min(0).max(10).step(.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);



const pointLight3 = new THREE.PointLight(0x77ff, 2)
pointLight3.position.set(1.73, 1.13, .14)
pointLight3.intensity = 10
scene.add(pointLight3);


// const light2GUI = gui.addFolder('Light 2');
// //.add(object, property )
// light2GUI.add(pointLight3.position, 'y').min(-3).max(3).step(.01)
// light2GUI.add(pointLight3.position, 'x').min(-6).max(6).step(.01)
// light2GUI.add(pointLight3.position, 'z').min(-3).max(3).step(.01)
// light2GUI.add(pointLight3, 'intensity').min(0).max(10).step(.01)

// const light2Color = {
//     color: 0xff0000
// }

// light2GUI.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light2Color.color)
//     })
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper2);
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
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    //alpha true will make background transparent
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth /2;
const windowHalfY = window.innerWidth /2;
const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)

}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);
document.addEventListener('mousemove', onDocumentMouseMove)

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()