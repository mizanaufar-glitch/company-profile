// Catalog & garage data (pure JS, no build tools)

const CARS = [
  {
    id: "r34",
    name: "Nissan Skyline GT-R R34",
    short: "R34 GT-R",
    basePrice: 85000,
    emoji: "🏎️",
  },
  {
    id: "supra",
    name: "Toyota Supra MK4",
    short: "Supra MK4",
    basePrice: 72000,
    emoji: "🚗",
  },
  {
    id: "rx7",
    name: "Mazda RX-7 FD",
    short: "RX-7 FD",
    basePrice: 58000,
    emoji: "🏁",
  },
];

const PAINTS = [
  { id: "white", name: "Pearl White", color: "#f5f5f5" },
  { id: "bayside", name: "Bayside Blue", color: "#1e6bb8" },
  { id: "black", name: "Jet Black", color: "#1a1a1a" },
  { id: "red", name: "Victory Red", color: "#c41e3a" },
  { id: "silver", name: "Silver", color: "#c0c0c0" },
  { id: "green", name: "Midnight Green", color: "#0d4f3c" },
  { id: "orange", name: "Sunset Orange", color: "#e85d04" },
  { id: "purple", name: "Midnight Purple", color: "#4a1c6b" },
];

const WHEELS = [
  { id: "stock", name: "Stock", price: 0, rimColor: "#555" },
  { id: "te37", name: "Volk TE37", price: 2800, rimColor: "#c9a84c" },
  { id: "rpf1", name: "Enkei RPF1", price: 1600, rimColor: "#888" },
  { id: "bbs", name: "BBS LM", price: 3200, rimColor: "#ddd" },
  { id: "work", name: "Work Meister S1", price: 2400, rimColor: "#b87333" },
];

const BODYKITS = [
  { id: "stock", name: "Stock Body", price: 0 },
  { id: "nismo", name: "Nismo Aero", price: 4500 },
  { id: "cwest", name: "C-West Kit", price: 3800 },
  { id: "rocket", name: "Rocket Bunny", price: 5200 },
];

const WINGS = [
  { id: "none", name: "No Wing", price: 0 },
  { id: "gt", name: "GT Wing", price: 1200 },
  { id: "voltex", name: "Voltex Type 5", price: 1800 },
];

const PARTS = [
  // Wheels
  { id: "p-te37", name: "Volk Racing TE37", brand: "Rays", category: "wheels", price: 2800, emoji: "⚙️" },
  { id: "p-rpf1", name: "Enkei RPF1", brand: "Enkei", category: "wheels", price: 1600, emoji: "⚙️" },
  { id: "p-bbs", name: "BBS LM", brand: "BBS", category: "wheels", price: 3200, emoji: "⚙️" },
  { id: "p-work", name: "Work Meister S1", brand: "Work", category: "wheels", price: 2400, emoji: "⚙️" },
  // Aero
  { id: "p-voltex", name: "Voltex GT Wing", brand: "Voltex", category: "aero", price: 1800, emoji: "✈️" },
  { id: "p-apr", name: "APR Front Splitter", brand: "APR", category: "aero", price: 890, emoji: "✈️" },
  { id: "p-seibon", name: "Seibon Carbon Hood", brand: "Seibon", category: "aero", price: 1450, emoji: "✈️" },
  { id: "p-nismo-bumper", name: "Nismo Front Bumper", brand: "Nismo", category: "aero", price: 2200, emoji: "✈️" },
  // Performance
  { id: "p-hks", name: "HKS Exhaust System", brand: "HKS", category: "performance", price: 2100, emoji: "🔧" },
  { id: "p-tein", name: "TEIN Coilover Kit", brand: "TEIN", category: "performance", price: 1750, emoji: "🔧" },
  { id: "p-blitz", name: "Blitz Air Filter", brand: "Blitz", category: "performance", price: 320, emoji: "🔧" },
  { id: "p-brembo", name: "Brembo Big Brake Kit", brand: "Brembo", category: "performance", price: 3800, emoji: "🔧" },
  // Interior
  { id: "p-recaro", name: "Recaro Sportster Seat", brand: "Recaro", category: "interior", price: 1450, emoji: "💺" },
  { id: "p-momo", name: "MOMO Steering Wheel", brand: "MOMO", category: "interior", price: 380, emoji: "💺" },
  { id: "p-defi", name: "Defi Gauge Set", brand: "Defi", category: "interior", price: 620, emoji: "💺" },
  { id: "p-takata", name: "Takata Racing Harness", brand: "Takata", category: "interior", price: 490, emoji: "💺" },
];

function formatPrice(n) {
  return "$" + n.toLocaleString("en-US");
}
