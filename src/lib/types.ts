// API Response Types
export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: {
    message: string;
  };
}

// User Types
export interface User {
  id: string;
  uniqueID: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Restaurant Types
export type PriceRange = string; // Changed to string to allow custom formats like "2000-3000¥"

export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface HourEntry {
  isOpen: boolean;
  open?: string;
  close?: string;
}

export interface RestaurantHours {
  monday: HourEntry;
  tuesday: HourEntry;
  wednesday: HourEntry;
  thursday: HourEntry;
  friday: HourEntry;
  saturday: HourEntry;
  sunday: HourEntry;
}

export interface RestaurantContacts {
  phone?: string;
  email?: string;
  website?: string;
}

export interface RestaurantAddress {
  street?: string;
  city?: string;
  zip?: string;
  country?: string;
}

export interface RestaurantLocation {
  lat: number;
  lng: number;
}

export interface RestaurantAttributes {
  hasWifi?: boolean;
  hasParking?: boolean;
  wheelchairAccessible?: boolean;
  outdoorSeating?: boolean;
  acceptsCreditCards?: boolean;
  [key: string]: boolean | undefined;
}

export interface RestaurantMedia {
  logo?: string;
  cover?: string;
  gallery?: string[];
}

export interface RestaurantSocials {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  description?: string;
  category?: string;
  contacts?: RestaurantContacts;
  address?: RestaurantAddress;
  location?: RestaurantLocation | null;
  hours?: RestaurantHours;
  priceRange?: PriceRange;
  attributes?: RestaurantAttributes;
  media?: RestaurantMedia;
  socials?: RestaurantSocials;
  isPublished: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
}

export interface RestaurantFormData {
  name: string;
  description?: string;
  category?: string;
  contacts?: RestaurantContacts;
  address?: RestaurantAddress;
  location?: RestaurantLocation | null;
  hours?: RestaurantHours;
  priceRange?: PriceRange;
  attributes?: RestaurantAttributes;
  media?: RestaurantMedia;
  socials?: RestaurantSocials;
  isPublished?: boolean;
}
