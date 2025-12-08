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
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.literal('¥'),
  }).optional(),
});

export const restaurantContactsSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
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
}).nullable().optional();

export const hourEntrySchema = z.union([
  z.object({
    isOpen: z.literal(false),
  }),
  z.object({
    isOpen: z.literal(true),
    open: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
    close: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
    breakStart: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format').optional().or(z.literal('')),
    breakEnd: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format').optional().or(z.literal('')),
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
  logo: z.string().url().optional().or(z.literal('')),
  cover: z.string().url().optional().or(z.literal('')),
  gallery: z.array(z.string().url()).optional(),
}).optional();

export const restaurantSocialsSchema = z.object({
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
}).optional();

export const menuItemSchema = z.object({
  id: z.string().min(1, 'Menu item ID is required'),
  name: z.string().min(1, 'Menu item name is required'),
  description: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  category: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export const featuredDishSchema = z.object({
  menuItemId: z.string().optional(),
  name: z.string().min(1, 'Featured dish name is required'),
  description: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  imageUrl: z.string().url().optional().or(z.literal('')),
}).optional();

export const restaurantFormSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required'),
  description: z.string().max(750, 'Description must be less than 750 characters').optional(),
  category: z.string().optional(),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.literal('¥'),
  }).optional().refine((val) => {
    if (!val) return true;
    // Allow NaN (will be treated as empty/undefined in submit handler)
    if (isNaN(val.min) || isNaN(val.max)) return true; 
    return val.min >= 0 && val.max >= 0;
  }, {
    message: "Price must be 0 or greater",
    path: ["min"] // Attach error to min field if general failure, though refine attaches to root of object usually
  }),
  contacts: restaurantContactsSchema.optional(),
  address: restaurantAddressSchema.optional(),
  location: restaurantLocationSchema,
  hours: restaurantHoursSchema,
  attributes: restaurantAttributesSchema,
  media: restaurantMediaSchema,
  socials: restaurantSocialsSchema,
  menuItems: z.array(menuItemSchema).optional(),
  featuredDish: featuredDishSchema,
  isPublished: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RestaurantFormData = z.infer<typeof restaurantFormSchema>;
export type HourEntry = z.infer<typeof hourEntrySchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type FeaturedDish = z.infer<typeof featuredDishSchema>;
