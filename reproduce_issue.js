
const { z } = require('zod');

// Schema from validates.ts (UPDATED)
const restaurantAttributesSchema = z.record(z.string(), z.boolean().optional()).optional();

// Data that mimics what React Hook Form likely produces when Controllers are registered but not touched/defaulted
const dataUndefined = {
    attributes: {
        "wifi": undefined,
        "parking": true,
        "wheelchairAccessible": undefined
    }
};

try {
    console.log("Testing data with undefined values...");
    restaurantAttributesSchema.parse(dataUndefined.attributes);
    console.log("Attributes schema PASSED data with undefined values");
} catch (e) {
    console.error("Attributes schema FAILED data with undefined values:");
    const rendered = e.format();
    console.log(JSON.stringify(rendered, null, 2));
}
