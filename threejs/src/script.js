import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
gui.add(ambientLight, 'intensity').min(0).max(10).step(0.01).name('Ambient Light Intensity')
ambientLight.color = new THREE.Color(0xFFFFFF)
//scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xfffff, 1)
directionalLight.position.set(1, 0.25, 0)
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.01).name('Directional Light Intensity')
//scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0x00ff00, 0x0000ff, 1)
scene.add(hemisphereLight)
 
const pointLight = new THREE.PointLight(0xff0000, 1, 10)
pointLight.position.set(1, 0, 1)
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x00ff00, 1, 1, 2)
rectAreaLight.position.set(0, 1, 0)
rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0))
gui.add(rectAreaLight, 'intensity').min(0).max(10).step(0.01).name('Rect Area Light Intensity')
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x0000ff, 1, 10, Math.PI * 0.2, 0.25, 1)
scene.add(spotLight)

// Helpers

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
hemisphereLightHelper.visible = true // Set to true to see the helper
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = true // Set to true to see the helper
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
pointLightHelper.visible = true // Set to true to see the helper
scene.add(pointLightHelper)


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
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
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
