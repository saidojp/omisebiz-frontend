import { CATEGORIES, PRICE_RANGES, DAYS_OF_WEEK, ATTRIBUTE_GROUPS } from './constants';

// Update categories
export const RESTAURANT_CATEGORIES = [
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

// Default hours template
export const defaultHours = {
  monday: { isOpen: true, open: '09:00', close: '22:00' },
  tuesday: { isOpen: true, open: '09:00', close: '22:00' },
  wednesday: { isOpen: true, open: '09:00', close: '22:00' },
  thursday: { isOpen: true, open: '09:00', close: '22:00' },
  friday: { isOpen: true, open: '09:00', close: '23:00' },
  saturday: { isOpen: true, open: '10:00', close: '23:00' },
  sunday: { isOpen: false },
};

export { PRICE_RANGES, DAYS_OF_WEEK, ATTRIBUTE_GROUPS };
