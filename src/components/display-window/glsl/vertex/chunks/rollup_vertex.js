export default `

float TAU = 2.0 * 3.14;

float f = max(0.0, -1.0 + rollupProgress +.5 + transformed.x);
float revolutions = 1.5;
float radius = 1.0 / revolutions / TAU;
float angle = -revolutions * (f * TAU) + .25 * TAU;

// float f = transformed.x + .5;
// float radius = 2.0 / TAU - mix(0.0, -.05, f);
// float angle = TAU / 4.0 + f * TAU;

transformed.x = (f > 0.0 ? (radius - mix(.0, .01, f)) * cos(angle) + .5 : transformed.x + rollupProgress) - .5 * rollupProgress;
transformed.z = -(f > 0.0 ? (radius - mix(.0, .01, f)) * sin(angle) - radius : transformed.z);
`
