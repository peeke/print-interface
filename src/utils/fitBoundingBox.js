export default function fitBoundingBox(boundingBox, image) {
  const boundingAspect = boundingBox.width / boundingBox.height
  const imageAspect = image.width / image.height
  const scale =
    boundingAspect > imageAspect
      ? boundingBox.height / image.height
      : boundingBox.width / image.width

  return {
    width: image.width * scale,
    height: image.height * scale
  }
}
