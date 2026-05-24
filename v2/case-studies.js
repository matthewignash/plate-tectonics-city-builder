/**
 * CASE_STUDIES — 9 historical events, source-of-truth narratives lifted from
 * /CLAUDE.md §7. Surfaced in three places by game.js:
 *   1. Briefing screen — "Real events this scenario is based on"
 *   2. Debrief screen — "Compare to history" panel using HAZARD_TO_CASE_STUDY
 *      to pick case studies that match the failure modes the student
 *      actually experienced this run.
 *   3. Standalone Case Study Library — accessible from the title screen.
 *
 * Image src is intentionally null on every entry — per /CLAUDE.md §13,
 * Matthew picks the specific Wikimedia images (copyright sensitivity).
 * Each entry includes a Wikimedia category link in `sources` for browsing.
 */

const CASE_STUDIES = {
  "tohoku-2011": {
    id: "tohoku-2011",
    title: "Tōhoku, Japan",
    date: "11 March 2011",
    scale: "M9.1 megathrust",
    death_toll: "~19,500 dead, ~2,500 still missing (figures vary slightly across reporting agencies)",
    summary:
      "A megathrust earthquake off the Sanriku coast triggered a tsunami with run-up heights exceeding 40 metres in some bays. " +
      "Nearly 20,000 people died or remain missing. The Fukushima Daiichi nuclear plant suffered triple meltdown after its 10 m " +
      "seawall was overtopped by 14 m waves.",
    lesson:
      "Japan had world-class earthquake engineering — most buildings shaking-survived the M9. The killer was water. " +
      "Tsunami walls sized for the 'expected' event were undersized for the actual. Recovery has involved either dramatically " +
      "raising seawalls or relocating coastal villages to higher ground.",
    scenarios: ["tohoku", "cascadia"],
    sources: [
      { label: "USGS event page", url: "https://earthquake.usgs.gov/earthquakes/eventpage/official20110311054624120_30/executive", opvl: "Authoritative for magnitude, mechanism, location data; limited on human-impact narrative." },
      { label: "BBC News archive", url: "https://www.bbc.co.uk/news/world-asia-pacific-12709598", opvl: "Same-day reporting; useful for how the event was framed at the time; some early figures later revised." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:2011_Sendai_earthquake_and_tsunami", opvl: "Browse for CC-licensed images of the inundation, recovery, and seawall comparisons." },
    ],
    image: { src: null, caption: "TBD — pick a Wikimedia image (aerial of Sendai post-tsunami, or seawall comparison)." },
    ngss: ["HS-ESS3-1", "HS-ESS2-1", "HS-ETS1-3"],
    failure_modes: ["tsunami", "liquefaction"],
  },

  "kobe-1995": {
    id: "kobe-1995",
    title: "Kobe (Great Hanshin), Japan",
    date: "17 January 1995",
    scale: "M6.9 strike-slip",
    death_toll: "~6,400 dead",
    summary:
      "Strike-slip rupture directly beneath Kobe. The Hanshin Expressway — a 'modern' elevated highway — collapsed onto its side. " +
      "Many 'earthquake-resistant' buildings failed because their codes accounted for vertical loads but underestimated horizontal " +
      "forces. Old wooden homes burned in post-quake fires.",
    lesson:
      "Earthquake engineering is only as good as the assumptions in the code. Kobe rewrote Japan's seismic code; later quakes " +
      "(including Tōhoku) saw far better building performance because of what Kobe taught.",
    scenarios: ["anatolian"],
    sources: [
      { label: "USGS event page", url: "https://earthquake.usgs.gov/earthquakes/eventpage/official19950116204619690_18/executive", opvl: "Authoritative seismic data; minimal cultural/policy context." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:Great_Hanshin_earthquake", opvl: "Includes images of the Hanshin Expressway collapse." },
    ],
    image: { src: null, caption: "TBD — Hanshin Expressway collapse is the iconic image; check Wikimedia licensing." },
    ngss: ["HS-ESS3-1", "HS-ETS1-3"],
    failure_modes: ["rupture", "shaking", "fire"],
  },

  "bhuj-2001": {
    id: "bhuj-2001",
    title: "Bhuj / Gujarat, India",
    date: "26 January 2001",
    scale: "M7.7 intraplate",
    death_toll: "~20,000+ dead across Gujarat",
    summary:
      "Intraplate quake — not on a plate boundary; a reactivated ancient fault. Building collapse was widespread: poorly " +
      "reinforced concrete-frame apartments with 'soft story' ground floors (open parking) pancaked. The economic loss was " +
      "estimated in billions of US dollars.",
    lesson:
      "Hazard isn't only at plate boundaries — and building codes that aren't enforced don't protect anyone. Post-Bhuj, " +
      "India strengthened building code enforcement, though unevenly.",
    scenarios: ["anatolian"],
    sources: [
      { label: "USGS event page", url: "https://earthquake.usgs.gov/earthquakes/eventpage/usp000a4lq/executive", opvl: "Authoritative seismic data; minimal narrative on enforcement context." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:2001_Gujarat_earthquake", opvl: "Images of the soft-story building collapses." },
    ],
    image: { src: null, caption: "TBD — soft-story pancake collapse photos available on Wikimedia." },
    ngss: ["HS-ESS3-1", "HS-ETS1-3"],
    failure_modes: ["shaking"],
  },

  "sumatra-2004": {
    id: "sumatra-2004",
    title: "Sumatra–Andaman, Indonesia",
    date: "26 December 2004",
    scale: "M9.1 megathrust",
    death_toll: "~230,000 dead across 14 countries",
    summary:
      "Megathrust earthquake along the Sunda Trench triggered an Indian Ocean tsunami that killed roughly a quarter-million " +
      "people across 14 countries. Aceh province (Indonesia) and Sri Lanka were devastated. Notably, there was no Indian " +
      "Ocean tsunami warning system at the time — the Pacific had one, but the Indian Ocean was considered low-risk.",
    lesson:
      "Early warning systems matter — and they have to exist BEFORE the disaster, not after. The Indian Ocean Tsunami " +
      "Warning System was built in the years following.",
    scenarios: ["tohoku", "cascadia"],
    sources: [
      { label: "USGS event page", url: "https://earthquake.usgs.gov/earthquakes/eventpage/official20041226005853450_30/executive", opvl: "Authoritative magnitude (M9.1) and rupture-length data." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:2004_Indian_Ocean_earthquake_and_tsunami", opvl: "Photos of inundation across multiple countries; aerial and ground-level." },
    ],
    image: { src: null, caption: "TBD — Aceh inundation or Sri Lanka coastal images, check Wikimedia licensing." },
    ngss: ["HS-ESS3-1", "HS-ESS2-1", "HS-ETS1-3"],
    failure_modes: ["tsunami", "warning_absent"],
  },

  "tangshan-1976": {
    id: "tangshan-1976",
    title: "Tangshan, China",
    date: "28 July 1976",
    scale: "M7.6 intraplate strike-slip",
    death_toll: "~240,000 (official); some estimates higher",
    summary:
      "Intraplate quake destroyed the industrial city of Tangshan. The city had almost no earthquake-resistant construction; " +
      "most buildings were unreinforced masonry that collapsed within seconds. Recovery took decades.",
    lesson:
      "Unprepared cities pay catastrophic prices. Modern China's much stronger seismic codes were partially driven by the " +
      "lessons of Tangshan.",
    scenarios: ["anatolian"],
    sources: [
      { label: "USGS event page", url: "https://earthquake.usgs.gov/earthquakes/eventpage/iscgem711935/executive", opvl: "Authoritative seismic record; Tangshan's death toll has political-history context the USGS page doesn't cover." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:1976_Tangshan_earthquake", opvl: "Limited photo coverage compared to more recent events; some archival images." },
    ],
    image: { src: null, caption: "TBD — historical archival image, fewer Wikimedia options than more recent events." },
    ngss: ["HS-ESS3-1"],
    failure_modes: ["shaking"],
  },

  "pinatubo-1991": {
    id: "pinatubo-1991",
    title: "Pinatubo, Philippines",
    date: "15 June 1991",
    scale: "VEI 6 explosive eruption",
    death_toll: "~800 dead (but tens of thousands SAVED by effective evacuation)",
    summary:
      "The second-largest volcanic eruption of the 20th century. Roughly 800 deaths — but tens of thousands of lives were " +
      "saved by an effective evacuation ordered days in advance based on USGS + PHIVOLCS monitoring. Clark Air Base and " +
      "Subic Bay Naval Base were destroyed by ashfall and lahars.",
    lesson:
      "Volcanology + early warning + acting on warnings = lives saved. Pyroclastic flows are unsurvivable up close — " +
      "distance plus advance evacuation is the only defense.",
    scenarios: ["merapi"],
    sources: [
      { label: "Smithsonian GVP — Pinatubo", url: "https://volcano.si.edu/volcano.cfm?vn=273083", opvl: "Authoritative for VEI rating, eruption chronology, and eruption-style data." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:1991_eruption_of_Pinatubo", opvl: "Eruption column photos, lahar damage, evacuation imagery." },
    ],
    image: { src: null, caption: "TBD — iconic eruption column or post-event ashfall on Clark AFB." },
    ngss: ["HS-ESS3-1", "HS-ESS2-1"],
    failure_modes: ["pyroclastic", "ashfall", "lahar"],
  },

  "merapi-2010": {
    id: "merapi-2010",
    title: "Merapi, Indonesia",
    date: "October–November 2010",
    scale: "VEI 4 eruption sequence",
    death_toll: "~350 dead",
    summary:
      "A series of explosive eruptions on Java killed ~350 people, including the volcano's spiritual guardian who refused " +
      "to evacuate. Pyroclastic flows reached 17 km from the summit. Lahars contaminated water supplies and destroyed " +
      "villages downstream for years afterward.",
    lesson:
      "Even with sophisticated monitoring, the closest 'danger zone' residents face an unsurvivable hazard. The hard " +
      "question isn't engineering — it's how authorities convince people to leave.",
    scenarios: ["merapi"],
    sources: [
      { label: "Smithsonian GVP — Merapi", url: "https://volcano.si.edu/volcano.cfm?vn=263250", opvl: "Eruption history, magma-chamber data, ongoing monitoring summary." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:2010_eruptions_of_Mount_Merapi", opvl: "Pyroclastic flow paths, lahar damage, displacement-camp images." },
    ],
    image: { src: null, caption: "TBD — pyroclastic flow path images or lahar valley aftermath." },
    ngss: ["HS-ESS3-1"],
    failure_modes: ["pyroclastic", "lahar", "ashfall"],
  },

  "pompeii-79ce": {
    id: "pompeii-79ce",
    title: "Pompeii & Herculaneum, Italy",
    date: "24 August 79 CE",
    scale: "VEI 5 (Vesuvius)",
    death_toll: "2,000–16,000+ (estimates range widely; ~1,150 bodies recovered at Pompeii alone)",
    summary:
      "Vesuvius erupted explosively, burying both cities. Pompeii covered in ~6 m of ash and pumice; Herculaneum hit by " +
      "pyroclastic flows that vaporised organic material instantly. The cities had no concept of 'active volcano' — Vesuvius " +
      "had been quiet for ~700 years and was widely thought to be a normal mountain.",
    lesson:
      "Without the science of volcanology, communities can't even classify their hazards. Modern volcanology — Volcanic " +
      "Explosivity Index, magma chamber monitoring — exists in part because of careful study of Vesuvius's deposits.",
    scenarios: ["merapi"],
    sources: [
      { label: "Smithsonian GVP — Vesuvius", url: "https://volcano.si.edu/volcano.cfm?vn=211020", opvl: "Vesuvius eruption history including the 79 CE event characterisation." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:Pompeii", opvl: "Archaeological photos of preserved-in-ash buildings and casts." },
    ],
    image: { src: null, caption: "TBD — body casts or street view from Pompeii excavations." },
    ngss: ["HS-ESS3-1"],
    failure_modes: ["pyroclastic", "ashfall"],
  },

  "anchorage-1964": {
    id: "anchorage-1964",
    title: "Seward & Anchorage, Alaska, USA",
    date: "27 March 1964",
    scale: "M9.2 megathrust",
    death_toll: "~131 dead (~9 from the shaking; ~122 from the tsunami)",
    summary:
      "The second-largest earthquake ever recorded. The Pacific-North American convergent boundary slipped along ~800 km. " +
      "Tsunamis devastated Seward, Valdez, and Kodiak. In Anchorage, the Turnagain Heights neighborhood — built on saturated " +
      "marine clay — flowed downhill in massive landslides; entire blocks of homes simply slid into Cook Inlet.",
    lesson:
      "Liquefaction and lateral spreading on soft soils are as dangerous as the shaking itself. Don't build on saturated " +
      "clay or fill in subduction-zone country.",
    scenarios: ["cascadia", "tohoku"],
    sources: [
      { label: "USGS event page", url: "https://earthquake.usgs.gov/earthquakes/eventpage/iscgem869809/executive", opvl: "Authoritative magnitude and rupture-zone data." },
      { label: "USGS Turnagain Heights retrospective", url: "https://pubs.usgs.gov/of/2014/1086/", opvl: "Detailed geologic post-mortem on the Turnagain Heights landslide." },
      { label: "Wikimedia Commons category", url: "https://commons.wikimedia.org/wiki/Category:1964_Alaska_earthquake", opvl: "Turnagain Heights aerial images and Seward tsunami damage." },
    ],
    image: { src: null, caption: "TBD — Turnagain Heights landslide aerial is the iconic liquefaction image." },
    ngss: ["HS-ESS3-1", "HS-ESS2-1"],
    failure_modes: ["tsunami", "liquefaction", "rupture"],
  },
};

// ════════════════════════════════════════════════════════════════════
// HAZARD_TO_CASE_STUDY — failure-mode → case study mapping used by the
// debrief "Compare to history" panel. Each item has a takeaway tailored
// to that failure mode (not the case study's generic lesson).
// ════════════════════════════════════════════════════════════════════

const HAZARD_TO_CASE_STUDY = {
  tsunami: [
    { case: "tohoku-2011", takeaway: "Japan's tsunami walls were sized for the expected event. Tōhoku showed the actual was an order of magnitude larger." },
    { case: "sumatra-2004", takeaway: "No Indian Ocean warning system existed before 2004. Early warning has to exist BEFORE the disaster, not after." },
  ],
  rupture: [
    { case: "kobe-1995", takeaway: "Earthquake engineering is only as good as the code's assumptions. Kobe rewrote Japan's seismic code after on-fault structures failed." },
  ],
  pyroclastic: [
    { case: "pompeii-79ce", takeaway: "Without the science of volcanology, communities can't even classify their hazards. Pompeii had no concept of 'active volcano.'" },
    { case: "pinatubo-1991", takeaway: "Distance plus evacuation — acted on in time — saved tens of thousands at Pinatubo. The defense is leaving, not building." },
  ],
  lava: [
    { case: "pompeii-79ce", takeaway: "Lava flows can be slow but un-divertible at scale. The defense for shield volcanoes is geographic siting, not engineering." },
  ],
  liquefaction: [
    { case: "anchorage-1964", takeaway: "Turnagain Heights — entire blocks of homes slid into Cook Inlet on liquefied marine clay. The ground itself failed." },
  ],
  shaking: [
    { case: "bhuj-2001", takeaway: "Building codes that aren't enforced don't protect anyone. Bhuj's soft-story apartments pancaked." },
    { case: "tangshan-1976", takeaway: "Cities without earthquake-resistant construction pay catastrophic prices. Tangshan's official toll was 240,000." },
  ],
  lahar: [
    { case: "merapi-2010", takeaway: "Even with sophisticated monitoring, lahar valleys destroy villages for years after the eruption." },
  ],
  ashfall: [
    { case: "pinatubo-1991", takeaway: "Pinatubo's ashfall destroyed Clark Air Base; reinforced roofs and early evacuation saved lives elsewhere." },
  ],
};
