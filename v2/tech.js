/**
 * BUILDINGS — population + criticality per type.
 * Population is "people present during disaster" (used in casualty calc).
 * Criticality weights how much losing this building hurts the city's
 * post-disaster recovery score.
 */
const BUILDINGS = {
  housing:  { name: "Housing",     icon: "🏠", cost: 80000,  population: 200, critical: false },
  hospital: { name: "Hospital",    icon: "🏥", cost: 250000, population: 80,  critical: true  },
  school:   { name: "School",      icon: "🏫", cost: 180000, population: 300, critical: true  },
  power:    { name: "Power plant", icon: "⚡", cost: 200000, population: 20,  critical: true  },
  market:   { name: "Market",      icon: "🏪", cost: 60000,  population: 50,  critical: false },
};

/**
 * TECH — engineering upgrades applied to a single tile (modifies the building
 * on that tile). Each entry specifies which hazards it reduces and by how much
 * (0–100 protection). Damage logic in game.js subtracts the matched
 * protections from the tile's hazard intensities before computing damage.
 *
 * `casualty_multiplier` (optional) multiplies casualties even when the
 * structure is destroyed — for evacuation/early-warning effects.
 */
const TECH = {
  base_isolation: {
    name: "Base isolation",
    icon: "⚙️",
    cost: 120000,
    desc: "Spring-pad bearings decouple the building from ground motion. Big shaking → smaller building motion.",
    protects: { shaking: 60 },
  },
  shear_walls: {
    name: "Shear walls",
    icon: "🧱",
    cost: 60000,
    desc: "Diagonal cross-bracing on building faces resists horizontal forces. Cheaper than base isolation, less effective.",
    protects: { shaking: 35 },
  },
  tsunami_wall: {
    name: "Tsunami wall",
    icon: "🌊",
    cost: 180000,
    desc: "Masonry wall sized for an expected event. Overtopped by waves taller than designed — Tōhoku is the cautionary tale.",
    protects: { tsunami: 70 },
  },
  deep_foundation: {
    name: "Deep foundations",
    icon: "🪨",
    cost: 80000,
    desc: "Concrete piles driven through liquefiable layers to bedrock. Keeps the building's feet on solid ground when sediment turns to slurry.",
    protects: { liquefaction: 75 },
  },
  early_warning: {
    name: "Early warning system",
    icon: "📡",
    cost: 150000,
    desc: "City-wide sensors + alerts. People evacuate before impact. Reduces casualties; does not save structures.",
    protects: {},
    casualty_multiplier: 0.4, // applied city-wide when active
    citywide: true,
  },
  lava_berm: {
    name: "Lava berm",
    icon: "⛏️",
    cost: 40000,
    desc: "Earth berm on the volcano-facing side. Diverts small effusive lava flows. Useless against major eruptions or pyroclastic flows.",
    protects: { lava: 50 },
  },
  ash_roof: {
    name: "Reinforced ash roof",
    icon: "🏚️",
    cost: 30000,
    desc: "Steep-pitched, reinforced roof prevents collapse under heavy volcanic ash loading.",
    protects: { ashfall: 70 },
  },
  lahar_diversion: {
    name: "Lahar diversion channel",
    icon: "🌊",
    cost: 60000,
    desc: "Engineered trench routes volcanic mudflows around the tile. Helpful in valley settings; useless if the flow overtops.",
    protects: { lahar: 70 },
  },
  pyroclastic_shelter: {
    name: "Pyroclastic shelter",
    icon: "🚪",
    cost: 100000,
    desc:
      "Reinforced underground bunker. Protects PEOPLE only — the building above is still destroyed. " +
      "Buys you a casualty-reduction option in pyroclastic zones where nothing else works.",
    protects: {},
    casualty_multiplier_in: "pyroclastic_zone",
    casualty_multiplier_value: 0.5,
  },
};
