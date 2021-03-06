export default function calculateViewportHeight(perspectiveAngle, distance) {
  return Math.tan((perspectiveAngle / 2 / 180) * Math.PI) * distance * 2
}
