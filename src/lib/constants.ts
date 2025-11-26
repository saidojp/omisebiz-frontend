export const CATEGORIES = [
  "Japanese",
  "Italian",
  "French",
  "Chinese",
  "Korean",
  "Thai",
  "Indian",
  "Mexican",
  "American",
  "Mediterranean",
  "Cafe",
  "Bar",
  "Fast Food",
  "Other"
] as const;

export const PRICE_RANGES = [
  { value: "$", label: "$ - Cheap" },
  { value: "$$", label: "$$ - Moderate" },
  { value: "$$$", label: "$$$ - Expensive" },
  { value: "$$$$", label: "$$$$ - Very Expensive" },
] as const;

export const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const ATTRIBUTE_GROUPS = {
  accessibility: {
    label: "Accessibility",
    items: [
      { key: "wheelchairAccessibleEntrance", label: "Wheelchair accessible entrance" },
      { key: "wheelchairAccessibleParking", label: "Wheelchair accessible parking" },
      { key: "wheelchairAccessibleRestroom", label: "Wheelchair accessible restroom" },
    ],
  },
  amenities: {
    label: "Amenities",
    items: [
      { key: "hasWifi", label: "Wi-Fi" },
      { key: "hasParking", label: "Parking" },
      { key: "hasTerrace", label: "Terrace" },
      { key: "hasKidsZone", label: "Kids zone" },
      { key: "hasLiveMusic", label: "Live music" },
      { key: "hasHookah", label: "Hookah" },
    ],
  },
  payment: {
    label: "Payment Methods",
    items: [
      { key: "acceptsCash", label: "Cash" },
      { key: "acceptsCreditCards", label: "Credit cards" },
      { key: "acceptsApplePay", label: "Apple Pay" },
      { key: "acceptsGooglePay", label: "Google Pay" },
    ],
  },
  atmosphere: {
    label: "Atmosphere",
    items: [
      { key: "isCasual", label: "Casual" },
      { key: "isCozy", label: "Cozy" },
      { key: "isRomantic", label: "Romantic" },
      { key: "isFamilyFriendly", label: "Family-friendly" },
    ],
  },
  services: {
    label: "Services",
    items: [
      { key: "offersDineIn", label: "Dine-in" },
      { key: "offersTakeout", label: "Takeout" },
      { key: "offersDelivery", label: "Delivery" },
      { key: "offersReservations", label: "Reservations" },
      { key: "outdoorSeating", label: "Outdoor seating" },
    ],
  },
} as const;
