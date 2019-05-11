import { Vector2 } from 'three'

export default function calculateUvs(geometry) {
  geometry.computeBoundingBox()
  geometry.faceVertexUvs[0] = []

  const max = geometry.boundingBox.max
  const min = geometry.boundingBox.min
  const offset = new Vector2(0 - min.x, 0 - min.y)
  const range = new Vector2(max.x - min.x, max.y - min.y)

  geometry.faces.forEach(face => {
    const v1 = geometry.vertices[face.a]
    const v2 = geometry.vertices[face.b]
    const v3 = geometry.vertices[face.c]

    geometry.faceVertexUvs[0].push([
      new Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
      new Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
      new Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
    ])
  })

  geometry.uvsNeedUpdate = true
}
