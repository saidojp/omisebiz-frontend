
const cleanData = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(cleanData);
  }
  if (obj !== null && typeof obj === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = cleanData(value);
      if (cleanedValue !== undefined && cleanedValue !== '' && cleanedValue !== null) {
        cleaned[key] = cleanedValue;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }
  return obj === '' ? undefined : obj;
};

const testCases = [
    { hasWifi: true },
    { hasWifi: false },
    { hasWifi: true, hasParking: false },
    { hasWifi: undefined },
    { hasWifi: null },
    {},
    { nested: { a: true, b: false } }
];

testCases.forEach((tc, i) => {
    console.log(`Test ${i}:`, JSON.stringify(tc), '->', JSON.stringify(cleanData(tc)));
});
