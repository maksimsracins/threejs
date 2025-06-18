import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const gui = new GUI({ width: 400 });

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const geometries = {
    sphere: new THREE.SphereGeometry(0.5, 64, 64),
    torus: new THREE.TorusGeometry(0.3, 0.2, 16, 100),
    plane: new THREE.PlaneGeometry(1, 1),
    circle: new THREE.CircleGeometry(0.5, 32)
}

// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color(0xff0000);
// material.wireframe = true;
// material.transparent = true
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;


// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100;
// material.specular = new THREE.Color(0x00ff00);

// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);

// material.side = THREE.DoubleSide;

// gui.add(material, 'metalness').min(0).max(1).step(0.001).name('Metalness');
// gui.add(material, 'roughness').min(0).max(1).step(0.001).name('Roughness');

const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalMap = doorNormalTexture;
// material.transparent = true
// material.alphaMap = doorAlphaTexture;
// material.normalScale.set(0.5, 0.5);

material.side = THREE.DoubleSide;

gui.add(material, 'metalness').min(0).max(1).step(0.001).name('Metalness');
gui.add(material, 'roughness').min(0).max(1).step(0.001).name('Roughness');
// gui.add(material, 'clearcoat').min(0).max(1).step(0.001).name('Clearcoat');
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.001).name('Clearcoat Roughness');

//Clearcoat

// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// Sheen

// material.sheen = 1
// material.sheenColor.set(1,1,1);
// material.sheenRoughness = 0.5;

// gui.add(material, 'sheen').min(0).max(1).step(0.001).name('Sheen');
// gui.addColor(material, 'sheenColor').name('Sheen Color');

// Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 400];

// gui.add(material, 'iridescence').min(0).max(1).step(0.001).name('Iridescence');
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.001).name('Iridescence IOR');
// gui.add(material.iridescenceThicknessRange, 0).min(1).max(1000).name('Iridescence TR');

// Transmission
material.transmission = 1;
material.ior = 1.5
material.thickness = 0.5;

gui.add(material, 'transmission').min(0).max(1).step(0.001).name('Transmission');
gui.add(material, 'ior').min(1).max(2.5).step(0.001).name('IOR');
gui.add(material, 'thickness').min(0).max(5).step(0.001).name('Thickness');


const meshes = {
    sphere: new THREE.Mesh(geometries.sphere, material),
    torus: new THREE.Mesh(geometries.torus, material),
    plane: new THREE.Mesh(geometries.plane, material),
    circle: new THREE.Mesh(geometries.circle, material)
}

// Positioning meshes
meshes.sphere.position.x = -1.5
meshes.torus.position.x = 1.5
meshes.plane.position.y = -1
meshes.circle.position.y = 1

const arrayMeshes = Array.from(Object.values(meshes));

// Scene
const scene = new THREE.Scene()

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;


const rgbeLoader = new RGBELoader();
rgbeLoader.load('/textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap;
    scene.environment = environmentMap;
})


// scene.add(pointLight);
scene.add(...arrayMeshes)
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

    arrayMeshes.forEach(mesh => {
        mesh.rotation.y = elapsedTime * 0.5;
        mesh.rotation.x = elapsedTime * 0.2;
    })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()