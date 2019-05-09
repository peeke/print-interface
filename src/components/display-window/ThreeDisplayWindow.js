import * as THREE from 'three'

import calculateViewportHeight from 'utils/calculateViewportHeight'
import vmin from 'utils/vmin'

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
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.camera.position.z = 30

    this.viewportHeight = calculateViewportHeight(75, 30)

    this.geometry = new THREE.PlaneGeometry(1, 1, 32)

    this.plane = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial())
    this.scene.add(this.plane)

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(20, 10, 30)
    this.scene.add(light)

    this.setSrc(src)
    this.render()

    window.addEventListener('resize', this.onResize)
  }

  setSrc(src) {
    if (this.src === src) return
    this.src = src

    new THREE.TextureLoader().load(src, texture => {
      console.log(texture)

      this.plane.material.map = texture
      this.plane.material.needsUpdate = true

      this.updateDimensions()
    })
  }

  updateDimensions = () => {
    const texture = this.plane.material.map
    if (!texture) return

    const ratio = this.viewportHeight / this.size.height

    const boundingBox = {
      width: (this.size.width - vmin(15)) * ratio,
      height: (this.size.height - vmin(15)) * ratio
    }

    const boundingRatio = boundingBox.width / boundingBox.height
    const imageRatio = texture.image.width / texture.image.height
    const scale =
      boundingRatio > imageRatio
        ? boundingBox.height / texture.image.height
        : boundingBox.width / texture.image.width

    this.plane.scale.set(
      texture.image.width * scale,
      texture.image.height * scale,
      1
    )
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
    if (this.frame) {
      cancelAnimationFrame(this.frame)
    }
  }
}
