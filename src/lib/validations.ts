import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be exactly 6 digits').max(6, 'Password must be exactly 6 digits'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be exactly 6 digits').max(6, 'Password must be exactly 6 digits'),
});

// Restaurant Schemas
export const restaurantBasicSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required'),
  description: z.string().max(750, 'Description must be less than 750 characters').optional(),
  category: z.string().optional(),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
});

export const restaurantContactsSchema = z.object({
  phone: z.string().optional().transform(v => v === '' ? undefined : v),
  email: z.string().email('Invalid email').optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
  website: z.string().url('Invalid URL').optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
});

export const restaurantAddressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

export const restaurantLocationSchema = z.object({
  lat: z.number().or(z.nan()).nullable().optional(),
  lng: z.number().or(z.nan()).nullable().optional(),
})
.optional()
.nullable()
.transform((data) => {
  if (!data) return null;
  const lat = data.lat;
  const lng = data.lng;
  
  // Check if we have valid numbers
  const hasLat = typeof lat === 'number' && !isNaN(lat);
  const hasLng = typeof lng === 'number' && !isNaN(lng);
  
  if (hasLat && hasLng) {
    return { lat, lng };
  }
  // If partial or invalid, return null (treat as no location)
  return null;
});

export const hourEntrySchema = z.union([
  z.object({
    isOpen: z.literal(false),
  }),
  z.object({
    isOpen: z.literal(true),
    open: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
    close: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
  }),
]);

export const restaurantHoursSchema = z.object({
  monday: hourEntrySchema,
  tuesday: hourEntrySchema,
  wednesday: hourEntrySchema,
  thursday: hourEntrySchema,
  friday: hourEntrySchema,
  saturday: hourEntrySchema,
  sunday: hourEntrySchema,
}).optional();

export const restaurantAttributesSchema = z.record(z.string(), z.boolean()).optional();

export const restaurantMediaSchema = z.object({
  logo: z.string().url().optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
  cover: z.string().url().optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
  gallery: z.array(z.string().url()).optional(),
}).optional();

export const restaurantSocialsSchema = z.object({
  instagram: z.string().url().optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
  facebook: z.string().url().optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
  tiktok: z.string().url().optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
  youtube: z.string().url().optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
}).optional();

export const restaurantFormSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required'),
  description: z.string().max(750, 'Description must be less than 750 characters').optional(),
  category: z.string().optional(),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
  contacts: restaurantContactsSchema.optional(),
  address: restaurantAddressSchema.optional(),
  location: restaurantLocationSchema,
  hours: restaurantHoursSchema,
  attributes: restaurantAttributesSchema,
  media: restaurantMediaSchema,
  socials: restaurantSocialsSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RestaurantFormData = z.infer<typeof restaurantFormSchema>;
export type HourEntry = z.infer<typeof hourEntrySchema>;
