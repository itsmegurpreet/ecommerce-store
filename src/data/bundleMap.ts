/**
 * Maps a product ID to the bundle product ID that contains it.
 * Built from bundle descriptions. One bundle per product — the one with the highest savings.
 */
export const productBundleMap: Record<string, string> = {
    // Work From Anywhere Kit (id 32) — saves ₹3,499
    "1": "32",  // executive-tech-pouch
    "3": "32",  // metro-backpack-39l
    "10": "32", // 3-port-travel-charger

    // Minimal Desk Bundle (id 33) — saves ₹4,298
    "2": "33",  // madera-desk-mat
    "16": "33", // aluminium-laptop-stand
    "17": "33", // ergonomic-wrist-rest

    // The Traveller's Set (id 34) — saves ₹1,198
    // Note: product 1 (executive-tech-pouch) prefers bundle 32 (bigger savings)
    "23": "34", // passport-card-holder
    "14": "34", // a5-travel-notebook
    "27": "34", // leather-luggage-tag

    // Focus Audio Bundle (id 35) — saves ₹2,989
    "5": "35",  // wireless-headphones
    "9": "35",  // true-wireless-earbuds

    // Cable Zero Bundle (id 36) — saves ₹598
    "25": "36", // cable-organizer-roll
    "28": "36", // cable-clips-8-pack
    "30": "36", // microfiber-screen-cloth-3-pack
};
