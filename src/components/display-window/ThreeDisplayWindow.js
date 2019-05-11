import * as THREE from 'three'

import calculateViewportHeight from 'utils/calculateViewportHeight'
import fitBoundingBox from 'utils/fitBoundingBox'
import calculateUvs from 'utils/calculateUvs'
import vmin from 'utils/vmin'
import sequenceOf from 'utils/sequenceOf'

const PERSPECTIVE = 75

export default class ThreeDisplayWindow {
  canvas = null
  renderer = null
  scene = null
  camera = null
  geometry = null
  plane = null
  frame = null
  ratio = 0

  constructor(canvas, src) {
    this.canvas = canvas

    const { offsetWidth: width, offsetHeight: height } = canvas
    this.size = { width, height }

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    this.renderer.setPixelRatio(1)
    this.renderer.setSize(width, height)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      PERSPECTIVE,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 30

    const imageGeometry = this.createGeometry(100)
    this.image = new THREE.Mesh(imageGeometry, new THREE.MeshBasicMaterial())
    this.scene.add(this.image)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(20, 10, 30)
    light.lookAt(0, 0, 0)

    this.scene.add(light)

    this.setSrc(src)
    this.render()

    window.addEventListener('resize', this.onResize)
  }

  createGeometry(segments, width = 1, height = 1) {
    const geometry = new THREE.Geometry()

    geometry.vertices = sequenceOf(segments * 2).map(i => {
      return new THREE.Vector3(
        (i % 2) - width / 2,
        Math.floor(i / 2) / segments - height / 2,
        0
      )
    })

    geometry.faces = sequenceOf(segments * 2 - 2).map(i => {
      return i % 2 === 0
        ? new THREE.Face3(i, i + 1, i + 2)
        : new THREE.Face3(i, i + 2, i + 1) // Make sure we define our face with clockwise vertices
    })

    calculateUvs(geometry)

    return geometry
  }

  setSrc(src) {
    if (this.src === src) return
    this.src = src

    new THREE.TextureLoader().load(src, texture => {
      this.image.material.map = texture
      this.image.material.needsUpdate = true
      this.updateDimensions()
    })
  }

  updateDimensions = () => {
    const texture = this.image.material.map
    if (!texture) return

    const viewportHeight = calculateViewportHeight(
      PERSPECTIVE,
      this.camera.position.z
    )
    const unitRatio = viewportHeight / this.size.height

    const boundingBox = {
      width: (this.size.width - vmin(15)) * unitRatio,
      height: (this.size.height - vmin(15)) * unitRatio
    }

    const { width, height } = fitBoundingBox(boundingBox, texture.image)
    this.image.scale.set(width, height, 1)
  }

  onResize = () => {
    this.canvas.removeAttribute('style')

    const { offsetWidth: width, offsetHeight: height } = this.canvas
    this.size = { width, height }

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)

    this.updateDimensions()
  }

  render = () => {
    this.frame = requestAnimationFrame(this.render)
    this.renderer.render(this.scene, this.camera)
  }

  unload() {
    window.removeEventListener('resize', this.onResize)

    if (this.frame) {
      cancelAnimationFrame(this.frame)
    }
  }
}
