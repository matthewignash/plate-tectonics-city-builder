/**
 * SPRITES — Tectonic City Builder v2 (Phase B)
 *
 * Flat-isometric ("cabinet projection") SVG sprites for 5 buildings,
 * 8 composable tech overlays, and 9 hover-demo animations.
 *
 * Coordinate system (72×64 viewBox):
 *   - Front face of building: x=20..48 (28 wide), drawn as a rectangle
 *   - Iso depth offset: +12 x, -6 y (back corners shifted to the right and up)
 *   - Ground line: y≈44
 *   - Vertical building height varies (short market → tall hospital)
 *
 * Colors live in styles.css via CSS classes — SVG stays semantic.
 *
 * Layer ordering (back → front, for z-order):
 *   1. Behind tech (deep_foundation piles, lahar_diversion trench)
 *   2. Tsunami wall (between tile and building)
 *   3. Building base (front face, side face)
 *   4. Building roof (default flat OR steep pitched if ash_roof installed)
 *   5. Base isolation pads, shear wall X-brace (on building face)
 *   6. Pyroclastic shelter, lava berm (foreground next to building)
 */

// ════════════════════════════════════════════════════════════════════
// BUILDING SPRITES (without roofs — roof rendered separately)
// ════════════════════════════════════════════════════════════════════

const BUILDING_SPRITES = {
  // ─── Housing — 2-story, narrow, door + 2 windows ───
  housing: `
    <g class="sprite-building sprite-housing">
      <!-- side face -->
      <polygon class="iso-side" points="48,44 48,20 60,14 60,38"/>
      <!-- front face -->
      <rect class="iso-front" x="20" y="20" width="28" height="24"/>
      <!-- door -->
      <rect class="iso-door" x="30" y="32" width="8" height="12"/>
      <!-- windows (front face) -->
      <rect class="iso-window" x="24" y="24" width="4" height="4"/>
      <rect class="iso-window" x="40" y="24" width="4" height="4"/>
      <!-- small chimney on roof -->
      <rect class="iso-trim" x="50" y="10" width="3" height="6"/>
    </g>`,

  // ─── Hospital — 3-story block + red cross + windows ───
  hospital: `
    <g class="sprite-building sprite-hospital">
      <!-- side face -->
      <polygon class="iso-side" points="48,44 48,14 60,8 60,38"/>
      <!-- front face -->
      <rect class="iso-front" x="20" y="14" width="28" height="30"/>
      <!-- red cross marker -->
      <rect class="iso-cross" x="32" y="18" width="4" height="12"/>
      <rect class="iso-cross" x="28" y="22" width="12" height="4"/>
      <!-- small windows row 1 -->
      <rect class="iso-window" x="22" y="34" width="3" height="3"/>
      <rect class="iso-window" x="27" y="34" width="3" height="3"/>
      <rect class="iso-window" x="38" y="34" width="3" height="3"/>
      <rect class="iso-window" x="43" y="34" width="3" height="3"/>
      <!-- entrance -->
      <rect class="iso-door" x="32" y="38" width="6" height="6"/>
    </g>`,

  // ─── School — wide 2-story + bell tower + window row ───
  school: `
    <g class="sprite-building sprite-school">
      <!-- side face -->
      <polygon class="iso-side" points="52,44 52,20 64,14 64,38"/>
      <!-- front face -->
      <rect class="iso-front" x="16" y="20" width="36" height="24"/>
      <!-- bell tower (rises above roof on left) -->
      <rect class="iso-tower" x="22" y="8" width="6" height="12"/>
      <polygon class="iso-tower-roof" points="22,8 28,8 25,4"/>
      <!-- window row across front -->
      <rect class="iso-window" x="20" y="28" width="3" height="4"/>
      <rect class="iso-window" x="26" y="28" width="3" height="4"/>
      <rect class="iso-window" x="32" y="28" width="3" height="4"/>
      <rect class="iso-window" x="38" y="28" width="3" height="4"/>
      <rect class="iso-window" x="44" y="28" width="3" height="4"/>
      <!-- entrance -->
      <rect class="iso-door" x="30" y="36" width="8" height="8"/>
    </g>`,

  // ─── Power plant — industrial + smokestack ───
  power: `
    <g class="sprite-building sprite-power">
      <!-- side face -->
      <polygon class="iso-side" points="46,44 46,24 58,18 58,38"/>
      <!-- front face -->
      <rect class="iso-front" x="22" y="24" width="24" height="20"/>
      <!-- smokestack -->
      <rect class="iso-stack" x="38" y="6" width="5" height="18"/>
      <!-- stack rim -->
      <rect class="iso-stack-rim" x="37" y="4" width="7" height="3"/>
      <!-- garage-door entry -->
      <rect class="iso-door" x="28" y="32" width="12" height="12"/>
      <!-- vent on side -->
      <rect class="iso-window" x="50" y="28" width="3" height="6"/>
    </g>`,

  // ─── Market — single-story + awning ───
  market: `
    <g class="sprite-building sprite-market">
      <!-- side face -->
      <polygon class="iso-side" points="46,44 46,30 58,24 58,38"/>
      <!-- front face -->
      <rect class="iso-front" x="22" y="30" width="24" height="14"/>
      <!-- awning extending forward and down -->
      <polygon class="iso-awning" points="18,30 50,30 56,36 12,36"/>
      <!-- awning supports -->
      <line class="iso-trim-line" x1="14" y1="36" x2="14" y2="44"/>
      <line class="iso-trim-line" x1="54" y1="36" x2="54" y2="44"/>
      <!-- open archway -->
      <path class="iso-arch" d="M 26 44 L 26 36 Q 34 32 42 36 L 42 44 Z"/>
    </g>`,
};

// ════════════════════════════════════════════════════════════════════
// BUILDING ROOFS — default flat (rendered if NO ash_roof) +
// steep pitched (rendered IF ash_roof installed)
// ════════════════════════════════════════════════════════════════════

const BUILDING_ROOFS = {
  // Default flat roofs (one per building — match each building's top edge)
  housing_flat:  `<polygon class="iso-roof" points="20,20 48,20 60,14 32,14"/>`,
  hospital_flat: `<polygon class="iso-roof" points="20,14 48,14 60,8 32,8"/>`,
  school_flat:   `<polygon class="iso-roof" points="16,20 52,20 64,14 28,14"/>`,
  power_flat:    `<polygon class="iso-roof" points="22,24 46,24 58,18 34,18"/>`,
  market_flat:   `<polygon class="iso-roof" points="22,30 46,30 58,24 34,24"/>`,

  // Steep pitched roof variants (when ash_roof installed) — gable on front,
  // sloped quad on the iso side
  housing_steep: `
    <g class="iso-roof-steep">
      <polygon points="20,20 48,20 34,10"/>
      <polygon points="48,20 34,10 46,4 60,14"/>
    </g>`,
  hospital_steep: `
    <g class="iso-roof-steep">
      <polygon points="20,14 48,14 34,6"/>
      <polygon points="48,14 34,6 46,0 60,8"/>
    </g>`,
  school_steep: `
    <g class="iso-roof-steep">
      <polygon points="16,20 52,20 34,10"/>
      <polygon points="52,20 34,10 46,4 64,14"/>
    </g>`,
  power_steep: `
    <g class="iso-roof-steep">
      <polygon points="22,24 46,24 34,16"/>
      <polygon points="46,24 34,16 46,10 58,18"/>
    </g>`,
  market_steep: `
    <g class="iso-roof-steep">
      <polygon points="22,30 46,30 34,22"/>
      <polygon points="46,30 34,22 46,16 58,24"/>
    </g>`,
};

// ════════════════════════════════════════════════════════════════════
// TECH OVERLAYS — composable on top of buildings.
// `layer` controls z-order: "behind" rendered before the building,
// "front" rendered after.
// ════════════════════════════════════════════════════════════════════

const TECH_OVERLAYS = {
  base_isolation: {
    layer: "front",
    svg: `
      <g class="overlay-base-isolation">
        <!-- three spring pads at building's ground line -->
        <path d="M 22 44 Q 23 42 24 44 Q 25 42 26 44"/>
        <path d="M 32 44 Q 33 42 34 44 Q 35 42 36 44"/>
        <path d="M 42 44 Q 43 42 44 44 Q 45 42 46 44"/>
      </g>`,
  },
  shear_walls: {
    layer: "front",
    svg: `
      <g class="overlay-shear-walls">
        <!-- diagonal X-brace across front face (mid-rectangle area) -->
        <line x1="22" y1="42" x2="46" y2="22"/>
        <line x1="22" y1="22" x2="46" y2="42"/>
      </g>`,
  },
  tsunami_wall: {
    layer: "front-tile",
    svg: `
      <g class="overlay-tsunami-wall">
        <!-- low masonry wall in front of the tile, ground level -->
        <rect x="10" y="46" width="52" height="6"/>
        <!-- masonry hash marks -->
        <line x1="18" y1="46" x2="18" y2="52"/>
        <line x1="28" y1="46" x2="28" y2="52"/>
        <line x1="38" y1="46" x2="38" y2="52"/>
        <line x1="48" y1="46" x2="48" y2="52"/>
        <line x1="10" y1="49" x2="62" y2="49"/>
      </g>`,
  },
  deep_foundation: {
    layer: "behind",
    svg: `
      <g class="overlay-deep-foundation">
        <!-- three dotted vertical piles extending below the building's ground -->
        <line x1="24" y1="44" x2="24" y2="58" stroke-dasharray="2 2"/>
        <line x1="34" y1="44" x2="34" y2="60" stroke-dasharray="2 2"/>
        <line x1="44" y1="44" x2="44" y2="58" stroke-dasharray="2 2"/>
      </g>`,
  },
  lava_berm: {
    layer: "front",
    svg: `
      <g class="overlay-lava-berm">
        <!-- earth berm V-shape on right (volcano-facing) side of tile -->
        <polygon points="54,48 62,42 70,48 70,52 54,52"/>
      </g>`,
  },
  lahar_diversion: {
    layer: "behind",
    svg: `
      <g class="overlay-lahar-diversion">
        <!-- slanted trench/channel running diagonally behind the tile -->
        <polygon points="2,52 14,46 70,46 58,52"/>
        <polygon points="6,50 14,46 70,46 62,50" class="lahar-water"/>
      </g>`,
  },
  pyroclastic_shelter: {
    layer: "front",
    svg: `
      <g class="overlay-pyroclastic-shelter">
        <!-- small concrete bunker next to building, ground level -->
        <rect x="2" y="38" width="12" height="6"/>
        <polygon points="2,38 14,38 12,34 4,34"/>
        <rect x="5" y="40" width="2" height="3" class="bunker-door"/>
      </g>`,
  },
};

// ════════════════════════════════════════════════════════════════════
// LAYER ORDERING HELPERS
// ════════════════════════════════════════════════════════════════════

const BEHIND_ORDER = ["deep_foundation", "lahar_diversion"];
const FRONT_TILE_ORDER = ["tsunami_wall"];
const FRONT_ORDER = ["base_isolation", "shear_walls", "pyroclastic_shelter", "lava_berm"];

function behindLayerOrder(techSet) {
  return BEHIND_ORDER.filter((k) => techSet.has(k));
}
function frontTileLayerOrder(techSet) {
  return FRONT_TILE_ORDER.filter((k) => techSet.has(k));
}
function frontLayerOrder(techSet) {
  return FRONT_ORDER.filter((k) => techSet.has(k));
}

// ════════════════════════════════════════════════════════════════════
// TECH DEMOS — small animated SVGs shown in palette hover popover.
// 80×60 viewBox. Animations driven by CSS keyframes in styles.css
// (look for .anim-* class targets).
// ════════════════════════════════════════════════════════════════════

const TECH_DEMOS = {
  base_isolation: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <rect x="20" y="14" width="40" height="32" class="demo-building"/>
      <rect x="22" y="16" width="6" height="6" class="demo-window"/>
      <rect x="34" y="16" width="6" height="6" class="demo-window"/>
      <rect x="46" y="16" width="6" height="6" class="demo-window"/>
      <g class="anim-shake-ground">
        <rect x="0" y="46" width="80" height="14" class="demo-ground"/>
        <line x1="0" y1="46" x2="80" y2="46" class="demo-ground-line"/>
      </g>
      <text x="40" y="58" text-anchor="middle" class="demo-label">building stays still while ground shakes</text>
    </svg>`,
  shear_walls: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <rect x="0" y="46" width="80" height="14" class="demo-ground"/>
      <g class="anim-tilt-snap" style="transform-origin: 40px 46px">
        <rect x="20" y="14" width="40" height="32" class="demo-building"/>
        <line x1="20" y1="46" x2="60" y2="14" class="demo-brace"/>
        <line x1="20" y1="14" x2="60" y2="46" class="demo-brace"/>
      </g>
      <text x="40" y="58" text-anchor="middle" class="demo-label">cross-bracing resists side forces</text>
    </svg>`,
  tsunami_wall: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <rect x="34" y="20" width="32" height="26" class="demo-building"/>
      <rect x="22" y="32" width="6" height="14" class="demo-wall"/>
      <g class="anim-wave-sweep">
        <path d="M 0 38 Q 8 30 16 38 Q 24 46 8 46 L 0 46 Z" class="demo-wave"/>
      </g>
      <rect x="0" y="46" width="80" height="14" class="demo-ground"/>
      <text x="40" y="58" text-anchor="middle" class="demo-label">wall stops wave (until overtopped)</text>
    </svg>`,
  deep_foundation: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <rect x="22" y="14" width="36" height="32" class="demo-building"/>
      <g class="anim-liquefy">
        <rect x="0" y="46" width="80" height="14" class="demo-ground-liquid"/>
      </g>
      <line x1="28" y1="46" x2="28" y2="58" class="demo-pile"/>
      <line x1="40" y1="46" x2="40" y2="60" class="demo-pile"/>
      <line x1="52" y1="46" x2="52" y2="58" class="demo-pile"/>
      <text x="40" y="58" text-anchor="middle" class="demo-label">piles anchor in bedrock below</text>
    </svg>`,
  early_warning: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <line x1="40" y1="46" x2="40" y2="20" class="demo-mast"/>
      <circle cx="40" cy="18" r="3" class="demo-antenna"/>
      <g class="anim-pulse">
        <circle cx="40" cy="18" r="10" class="demo-ring"/>
        <circle cx="40" cy="18" r="18" class="demo-ring"/>
        <circle cx="40" cy="18" r="26" class="demo-ring"/>
      </g>
      <rect x="0" y="46" width="80" height="14" class="demo-ground"/>
      <g class="anim-people-flee">
        <circle cx="20" cy="42" r="2" class="demo-person"/>
        <circle cx="58" cy="42" r="2" class="demo-person"/>
      </g>
      <text x="40" y="58" text-anchor="middle" class="demo-label">alert pulses; people evacuate in time</text>
    </svg>`,
  lava_berm: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <rect x="32" y="20" width="24" height="26" class="demo-building"/>
      <polygon points="56,46 62,40 70,46" class="demo-berm"/>
      <g class="anim-lava-divert">
        <path d="M 80 30 L 64 36 L 70 46 L 80 46 Z" class="demo-lava"/>
      </g>
      <rect x="0" y="46" width="80" height="14" class="demo-ground"/>
      <text x="40" y="58" text-anchor="middle" class="demo-label">berm deflects small lava flows</text>
    </svg>`,
  ash_roof: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <polygon points="22,30 58,30 40,16" class="demo-pitched-roof"/>
      <rect x="22" y="30" width="36" height="16" class="demo-building"/>
      <g class="anim-ashfall">
        <circle cx="20" cy="10" r="1.2" class="demo-ash"/>
        <circle cx="34" cy="6"  r="1.2" class="demo-ash"/>
        <circle cx="48" cy="12" r="1.2" class="demo-ash"/>
        <circle cx="62" cy="8"  r="1.2" class="demo-ash"/>
      </g>
      <rect x="0" y="46" width="80" height="14" class="demo-ground"/>
      <text x="40" y="58" text-anchor="middle" class="demo-label">steep roof sheds heavy ash</text>
    </svg>`,
  lahar_diversion: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <rect x="30" y="20" width="22" height="26" class="demo-building"/>
      <polygon points="0,46 80,46 80,52 0,52" class="demo-trench"/>
      <g class="anim-lahar-flow">
        <path d="M 0 49 L 80 49" class="demo-mud" stroke-width="3"/>
      </g>
      <text x="40" y="58" text-anchor="middle" class="demo-label">trench routes mudflow around</text>
    </svg>`,
  pyroclastic_shelter: `
    <svg viewBox="0 0 80 60" class="demo-svg">
      <g class="anim-building-destroy">
        <rect x="32" y="20" width="22" height="26" class="demo-building"/>
      </g>
      <rect x="58" y="38" width="14" height="8" class="demo-bunker"/>
      <polygon points="58,38 72,38 70,34 60,34" class="demo-bunker-roof"/>
      <g class="anim-pyroclastic-sweep">
        <polygon points="0,12 24,20 24,34 0,28" class="demo-pyroclastic"/>
      </g>
      <rect x="0" y="46" width="80" height="14" class="demo-ground"/>
      <text x="40" y="58" text-anchor="middle" class="demo-label">bunker saves people; building lost</text>
    </svg>`,
};
