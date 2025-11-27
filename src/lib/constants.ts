// Categories
export const CATEGORIES = [
  'Japanese',
  'Italian',
  'French',
  'Chinese',
  'Korean',
  'Thai',
  'Indian',
  'Mexican',
  'American',
  'Mediterranean',
  'Vietnamese',
  'Spanish',
  'Turkish',
  'Greek',
  'Cafe',
  'Bar',
  'Fast Food',
  'Bakery',
  'Other',
] as const;

export const RESTAURANT_CATEGORIES = CATEGORIES;

// Price Ranges
export const PRICE_RANGES = [
  { value: '$', label: '$' },
  { value: '$$', label: '$$' },
  { value: '$$$', label: '$$$' },
  { value: '$$$$', label: '$$$$' },
] as const;

// Days of Week
export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

// Attribute Groups
export const ATTRIBUTE_GROUPS = {
  accessibility: {
    label: 'Accessibility',
    items: [
      { key: 'wheelchairAccessible', label: 'Wheelchair Accessible' },
    ],
  },
  amenities: {
    label: 'Amenities',
    items: [
      { key: 'freeWifi', label: 'Free WiFi' },
      { key: 'parking', label: 'Parking Available' },
      { key: 'outdoorSeating', label: 'Outdoor Seating' },
      { key: 'bar', label: 'Bar' },
      { key: 'liveMusic', label: 'Live Music' },
    ],
  },
  payment: {
    label: 'Payment Methods',
    items: [
      { key: 'creditCards', label: 'Credit Cards Accepted' },
      { key: 'cashOnly', label: 'Cash Only' },
    ],
  },
  atmosphere: {
    label: 'Atmosphere',
    items: [
      { key: 'familyFriendly', label: 'Family Friendly' },
      { key: 'romantic', label: 'Romantic' },
      { key: 'casual', label: 'Casual' },
      { key: 'upscale', label: 'Upscale' },
    ],
  },
  services: {
    label: 'Services',
    items: [
      { key: 'dineIn', label: 'Dine-In' },
      { key: 'takeout', label: 'Takeout' },
      { key: 'delivery', label: 'Delivery' },
      { key: 'reservations', label: 'Reservations' },
    ],
  },
} as const;

// Default Hours
export const defaultHours = {
  monday: { isOpen: true, open: '09:00', close: '22:00' },
  tuesday: { isOpen: true, open: '09:00', close: '22:00' },
  wednesday: { isOpen: true, open: '09:00', close: '22:00' },
  thursday: { isOpen: true, open: '09:00', close: '22:00' },
  friday: { isOpen: true, open: '09:00', close: '23:00' },
  saturday: { isOpen: true, open: '10:00', close: '23:00' },
  sunday: { isOpen: false },
} as const;
