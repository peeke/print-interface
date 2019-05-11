export default function sequenceOf(n) {
  return new Array(n).fill().map((_, i) => i)
}
