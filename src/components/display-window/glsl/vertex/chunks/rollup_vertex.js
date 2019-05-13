export default `

float TAU = 2.0 * 3.14;

float f = max(0.0, -1.0 + rollupProgress +.5 + transformed.x);
float revolutions = 1.5;
float radius = 1.0 / revolutions / TAU;
float angle = -revolutions * (f * TAU) + .25 * TAU;

transformed.x = (f > 0.0 ? (radius - mix(.0, .01, f)) * cos(angle) + .5 : transformed.x + rollupProgress) - .5 * rollupProgress;
transformed.z = -(f > 0.0 ? (radius - mix(.0, .01, f)) * sin(angle) - radius : transformed.z);

vNormal = f > 0.0 ? normalize(vec3(cos(angle), 1.0, sin(angle))) : vec3(0.0, 0.0, 1.0);

#ifdef FLIP_SIDED
vNormal = -vNormal;
#endif
`
