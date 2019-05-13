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

    for (var i = 0, len = imageGeometry.faces.length; i < len; i++) {
      var face = imageGeometry.faces[i].clone()
      face.materialIndex = 1
      imageGeometry.faces.push(face)
      imageGeometry.faceVertexUvs[0].push(
        imageGeometry.faceVertexUvs[0][i].slice(0)
      )
    }

    const uniforms = THREE.UniformsUtils.merge([
      THREE.ShaderLib.standard.uniforms,
      {
        rollupProgress: { value: 0 },
        roughness: { value: 1 },
        metalness: { value: 0 },
        diffuse: { value: new THREE.Color(0xffffff) }
      }
    ])

    const frontMaterial = new THREE.ShaderMaterial({
      ...THREE.ShaderLib.standard,
      vertexShader,
      uniforms,
      side: THREE.FrontSide,
      lights: true
    })

    const backMaterial = new THREE.ShaderMaterial({
      ...THREE.ShaderLib.standard,
      vertexShader,
      uniforms: {
        ...uniforms,
        roughness: { value: 1 },
        metalness: { value: 0 }
      },
      side: THREE.BackSide,
      lights: true
    })

    frontMaterial.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <rollup_vertex>',
        rollupVertexChunk
      )
    }

    backMaterial.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <rollup_vertex>',
        rollupVertexChunk
      )
    }

    this.image = new THREE.Mesh(imageGeometry, [frontMaterial, backMaterial])

    this.scene.add(this.image)

    const light = new THREE.DirectionalLight(0xffffff, 0.25)
    light.position.set(0, 0, 30)
    light.lookAt(0, 0, 0)

    this.scene.add(light)

    const ambient = new THREE.AmbientLight(0xbfbfbf)
    this.scene.add(ambient)

    this.setSrc(src)
    this.render()

    window.addEventListener('resize', this.onResize)
  }

  setSrc(src) {
    if (this.src === src) return
    this.src = src

    new THREE.TextureLoader().load(src, texture => {
      this.image.material[0].uniforms.map.value = texture
      this.image.material[0].map = texture
      this.image.material[0].needsUpdate = true
      this.updateDimensions()
    })
  }

  setProgress(progress) {
    this.image.material[0].uniforms.rollupProgress.value = progress
    this.image.material[1].uniforms.rollupProgress.value = progress

    this.image.rotation.set(
      0,
      0.25 * progress * Math.PI,
      degToRad(progress * -10)
    )

    this.render()
  }

  updateDimensions = () => {
    const texture = this.image.material[0].map
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
    this.image.material[0].needsUpdate = true

    this.render()
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
    this.frame && cancelAnimationFrame(this.frame)
    this.frame = requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
    })
  }

  unload() {
    window.removeEventListener('resize', this.onResize)

    if (this.frame) {
      cancelAnimationFrame(this.frame)
    }
  }
}
