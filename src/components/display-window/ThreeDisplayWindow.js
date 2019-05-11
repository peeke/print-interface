import * as THREE from 'three'

import calculateViewportHeight from 'utils/calculateViewportHeight'
import fitBoundingBox from 'utils/fitBoundingBox'
import vmin from 'utils/vmin'
import degToRad from 'utils/degToRad'

import vertexShader from './glsl/vertex/template.js'
import rollupVertexChunk from './glsl/vertex/chunks/rollup_vertex.js'

const PERSPECTIVE = 50

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

    const imageGeometry = new THREE.PlaneGeometry(1, 1, 100)
    const uniforms = THREE.UniformsUtils.merge([
      THREE.ShaderLib.basic.uniforms,
      { rollupProgress: { value: 0 } },
      { diffuse: { value: new THREE.Color('white') } },
      { map: { value: new THREE.Texture() } }
    ])

    const material = new THREE.ShaderMaterial({
      ...THREE.ShaderLib.basic,
      vertexShader,
      uniforms,
      side: THREE.DoubleSide
    })

    material.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <rollup_vertex>',
        rollupVertexChunk
      )
    }

    this.image = new THREE.Mesh(imageGeometry, material)
    this.scene.add(this.image)

    window.progress = value => {
      this.image.material.uniforms.rollupProgress.value = value
    }

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(20, 10, 30)
    light.lookAt(0, 0, 0)

    this.scene.add(light)

    this.setSrc(src)
    this.render()

    window.addEventListener('resize', this.onResize)
  }

  setSrc(src) {
    if (this.src === src) return
    this.src = src

    new THREE.TextureLoader().load(src, texture => {
      this.image.material.uniforms.map.value = texture
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
    this.image.scale.set(width, height, width)
    this.image.material.needsUpdate = true
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
    const progress = (1 + Math.sin(performance.now() / 400)) / 2
    this.image.material.uniforms.rollupProgress.value = progress
    this.image.rotation.set(0, 0, degToRad(progress * -10))
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
