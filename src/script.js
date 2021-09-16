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

//.add(object, property )
gui.add(pointLight2.position, 'y').min(-3).max(3).step(.01)
gui.add(pointLight2.position, 'x').min(-6).max(6).step(.01)
gui.add(pointLight2.position, 'z').min(-3).max(3).step(.01)
gui.add(pointLight2, 'intensity').min(0).max(10).step(.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLightHelper);

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

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()