// rollupProgress is a float between 0 and 1 and is defined in template.js
// rollupProgress is animated through React
// transformed holds the vertices
// vNormal holds the normal

export default `

float TAU = 2.0 * 3.14;

// Coordinates are normalized, transformed.x is a value between -.5 and .5 (width equals 1)
float f = max(0.0, -.5 + rollupProgress + transformed.x);
float revolutions = 1.5; 

// The radius decreases by the amount of revolutions we make
float radius = 1.0 / revolutions / TAU;

// The angle starts at 3 o'clock, but we need it to start at 6 o'clock so we add a quarter circle rotation
float angle = -revolutions * (f * TAU) + .25 * TAU;

// Whether this part of the print is being rollup up or is still flat
bool shouldRollup = f > 0.0;

if (shouldRollup) {
  // The radius decreases a bit, depending how far rollup up the print is
  radius -= mix(.0, .01, f);

  // When rolling up, we calculate a new x and z position based on the angle and rollupProgress
  // The roll is absolutely positioned at x = .5 and gradually moved to x = 0.0
  float translateX = .5 - .5 * rollupProgress;
  transformed.x = radius * cos(angle) + translateX;
  transformed.z = radius * (1.0 - sin(angle));

  vNormal = normalize(vec3(cos(angle), 1.0, sin(angle)));
} else {
  // When not rolling up, we just translate the print to the right
  transformed.x += .5 * rollupProgress;

  vNormal = vec3(0.0, 0.0, 1.0);
}

#ifdef FLIP_SIDED
vNormal = -vNormal;
#endif
`
