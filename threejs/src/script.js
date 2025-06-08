import * as THREE from 'three'

//Scene
const scene = new THREE.Scene()

//Object

const group = new THREE.Group()

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
)
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
)
cube2.position.x = 0
group.add(cube2)

scene.add(group)


const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
const axesHelper = new THREE.AxesHelper(2);


mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1

mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5

mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25



scene.add(mesh)
scene.add(axesHelper)

//Sizes
const sizes = {
  width: 800,
  height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 3
camera.lookAt(new THREE.Vector3(0, -1, 0))

scene.add(camera)

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)