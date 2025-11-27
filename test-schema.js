const { z } = require('zod');

const restaurantLocationSchema = z.object({
  lat: z.number().or(z.nan()).nullable().optional(),
  lng: z.number().or(z.nan()).nullable().optional(),
})
.optional()
.nullable()
.transform((data) => {
  if (!data) return null;
  const lat = data.lat;
  const lng = data.lng;
  
  const hasLat = typeof lat === 'number' && !isNaN(lat);
  const hasLng = typeof lng === 'number' && !isNaN(lng);
  
  if (hasLat && hasLng) {
    return { lat, lng };
  }
  return null;
});

const testCases = [
  { name: 'null', data: null, expected: true },
  { name: 'undefined', data: undefined, expected: true },
  { name: 'empty object', data: {}, expected: true },
  { name: 'lat null', data: { lat: null, lng: null }, expected: true },
  { name: 'lat NaN', data: { lat: NaN, lng: NaN }, expected: true },
  { name: 'valid', data: { lat: 35.6, lng: 139.6 }, expected: true },
  { name: 'partial', data: { lat: 35.6 }, expected: true }, // Should return null
];

testCases.forEach(({ name, data, expected }) => {
  const result = restaurantLocationSchema.safeParse(data);
  console.log(`${name}: ${result.success ? 'PASS' : 'FAIL'}`);
  if (!result.success) {
    console.log(JSON.stringify(result.error.format(), null, 2));
  } else {
      console.log('Output:', result.data);
  }
});
