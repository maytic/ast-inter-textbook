/* =============================================================================
   Astronomy 2e — Unit review (Chapters 5, 7, 15, 16)
   A list of learning objectives, each expanded into the points to know.
   Every fact is taken from this guide's own chapter files (data-ch5/7/15/16.js),
   which are adapted from OpenStax "Astronomy 2e", CC BY 4.0.
   Registers window.ASTRO_REVIEW. The practice test and matching game reuse the
   four chapters' own quiz + glossary data (see renderReview in app.js).
   ============================================================================= */
(function () {
  "use strict";

  var REVIEW = {};

  REVIEW.meta = {
    title: "Unit Review",
    chapters: [5, 7, 15, 16],
    format: "Matching and multiple choice practice"
  };

  /* modules -> objectives.  sec = where to reread it; tools = study-tool keys
     (TOOL_INFO in app.js); points = what you should be able to say. */
  REVIEW.modules = [
    {
      id: "m4", title: "Module 4 — Radiation and Spectra", chapters: [5],
      objectives: [
        {
          text: "Describe the evidence for the dual wave- and particle-nature of light.",
          sec: "5.1", tools: ["lightwaves"],
          points: [
            "<b>Wave side:</b> Maxwell’s theory — oscillating electric charges radiate waves of changing electric and magnetic fields that travel at the speed of light. Light has a <b>wavelength</b> and a <b>frequency</b>, like any wave.",
            "Unlike sound or water waves, light needs <b>no medium</b> — there is no “aether”; it crosses empty space.",
            "<b>Particle side:</b> twentieth-century experiments showed light also behaves like a self-contained packet of energy — a <b>photon</b>.",
            "Light does <b>both</b>; the puzzle is resolved only by quantum mechanics. Astronomers switch freely between the wave and photon pictures."
          ]
        },
        {
          text: "Discuss the particle model of light and the definition of the photon.",
          sec: "5.1", tools: ["lightwaves", "atomstructure"],
          points: [
            "A <b>photon</b> is a discrete packet (particle) of electromagnetic energy.",
            "A photon’s energy is set by its frequency: <b>E = hf</b> (h = Planck’s constant, 6.626 × 10⁻³⁴ J·s).",
            "Higher frequency → more energy: violet photons carry more than red; X-ray photons carry more than radio photons."
          ]
        },
        {
          text: "Describe the relationship between wavelength, frequency, energy, and speed of photons.",
          sec: "5.1", tools: ["lightwaves", "emspectrum"],
          points: [
            "<b>All</b> electromagnetic waves travel at the same speed, c ≈ 300,000 km/s.",
            "<b>c = λf</b>: wavelength and frequency trade off — longer wavelength means lower frequency.",
            "<b>E = hf</b>: higher frequency (shorter wavelength) means higher energy.",
            "Spectrum, shortest → longest wavelength (highest → lowest energy): gamma rays, X-rays, ultraviolet, visible (400–700 nm), infrared, microwave, radio.",
            "Visible colors, longest → shortest wavelength: <b>ROY G BIV</b> (red is longest, violet shortest)."
          ]
        },
        {
          text: "Discuss how and why the amount of light we see from an object depends on its distance.",
          sec: "5.1", tools: ["lightwaves"],
          points: [
            "Light spreads out in an ever-widening shell, so the same energy covers more area the farther it goes — the area grows with the <b>square</b> of the distance.",
            "<b>Inverse square law:</b> apparent brightness ∝ 1 / distance².",
            "Twice as far → <b>4×</b> fainter; 3× as far → 9× fainter; 10× as far → <b>100×</b> fainter."
          ]
        },
        {
          text: "Discuss how continuous, emission and absorption spectra are formed.",
          sec: "5.3", alsoSec: ["5.5"], tools: ["spectroscopy", "spectrallines", "emspectrum"],
          points: [
            "<b>Continuous spectrum</b> — all wavelengths, from a hot solid or dense gas (a blackbody).",
            "<b>Absorption (dark-line) spectrum</b> — a continuous spectrum seen <i>through</i> a cooler, thin gas. Atoms absorb photons of exactly the energy needed to lift an electron to a higher level, leaving dark lines.",
            "<b>Emission (bright-line) spectrum</b> — a hot, thin glowing gas alone gives off only certain wavelengths, as electrons drop to lower levels and emit photons of exactly the energy difference.",
            "Each element’s set of energy levels is unique, so its line pattern is a <b>fingerprint</b> (helium was found in the Sun’s spectrum before Earth).",
            "Hydrogen: jumps to/from level 1 = <b>Lyman</b> series (ultraviolet); to/from level 2 = <b>Balmer</b> series (visible).",
            "<b>Ionization</b> removes an electron entirely; how much a gas is ionized depends on its temperature and density.",
            "Related laws: <b>Wien’s law</b> — hotter objects peak at shorter (bluer) wavelengths; <b>Stefan-Boltzmann</b> — power ∝ T⁴ (double T → 16× the energy)."
          ]
        },
        {
          text: "Describe the Doppler Effect.",
          sec: "5.6", tools: ["doppler"],
          points: [
            "A source moving <b>toward</b> you compresses its waves → shorter wavelength → <b>blueshift</b>.",
            "A source moving <b>away</b> stretches its waves → longer wavelength → <b>redshift</b>.",
            "Only <b>radial velocity</b> (straight toward/away) counts — sideways motion gives no shift.",
            "<b>v = c × (Δλ / λ)</b>: the size of the shift gives the speed.",
            "The whole line pattern shifts by the same proportion, so we can still identify the element."
          ]
        }
      ]
    },
    {
      id: "m5", title: "Module 5 — The Solar System", chapters: [7],
      objectives: [
        {
          text: "Describe how the objects in our solar system are identified, explored, and characterized.",
          sec: "7.1", tools: ["solarsystem"],
          points: [
            "Five planets were known in ancient times (Mercury, Venus, Mars, Jupiter, Saturn); Uranus and Neptune were found after the telescope was invented.",
            "Spacecraft (Voyager, Pioneer, Curiosity, Pathfinder…) have flown past, orbited, or landed on every planet; probes have plunged into Jupiter and landed on Venus, Mars, the Moon, Titan, asteroids, and Comet 67P. New Horizons explored the TNO Arrokoth.",
            "Masses are measured from orbits — today very precisely by tracking how bodies tug on passing spacecraft.",
            "Spectroscopy tells us which elements are present; <b>density</b> (mass ÷ volume) tells us what a body is made of inside."
          ]
        },
        {
          text: "Describe the types of bodies in our solar system, their locations, and how they formed.",
          sec: "7.1", alsoSec: ["7.4"], tools: ["solarsystem", "smallbodies", "scalemodel"],
          points: [
            "<b>Sun</b> — 99.80% of all the mass.",
            "<b>Terrestrial planets</b> (inner): Mercury, Venus, Earth, Mars — small, rock and metal, solid surfaces.",
            "<b>Giant (jovian) planets</b> (outer): Jupiter, Saturn, Uranus, Neptune — huge, mostly gases, liquids, ices; all have rings.",
            "<b>Asteroids</b> — rocky, mostly between Mars and Jupiter. <b>Comets</b> — icy, orbit far out. <b>Trans-Neptunian objects</b> beyond Neptune; largest (Pluto, Eris) are <b>dwarf planets</b>, as is Ceres.",
            "<b>Meteor</b> = dust burning up in our air; <b>meteorite</b> = a piece that reaches the ground.",
            "All formed together about <b>4.5 billion years ago</b> from the spinning <b>solar nebula</b>."
          ]
        },
        {
          text: "Apply the concept of density to the composition of solar system bodies.",
          sec: "7.1", alsoSec: ["7.2"], tools: ["solarsystem", "planetmakeup"],
          points: [
            "<b>Density = mass ÷ volume</b>; a sphere’s volume is (4/3)πR³. Water = 1 g/cm³.",
            "Terrestrial planets are dense (Mercury 5.4, Venus 5.2, <b>Earth 5.5</b>, Mars 3.9 g/cm³) → rock + metal.",
            "Giant planets have low density (Jupiter 1.3, <b>Saturn 0.7</b> — less than water, Uranus 1.3, Neptune 1.6) → mostly light gases and ices.",
            "A low-density moon (like Mimas, ~1.2 g/cm³) must be largely ice."
          ]
        },
        {
          text: "Describe the characteristics of the giant planets, terrestrial planets, and small bodies in the solar system.",
          sec: "7.2", tools: ["planetmakeup", "smallbodies"],
          points: [
            "<b>Jupiter &amp; Saturn</b>: 75% hydrogen, 25% helium by mass (like the Sun); hydrogen squeezed to liquid → “liquid planets” with hidden cores of rock, metal, ice.",
            "<b>Uranus &amp; Neptune</b>: smaller, with relatively smaller atmospheres around their cores. Giant-planet chemistry is hydrogen-rich (<b>reduced</b>).",
            "<b>Terrestrial</b>: rock (silicates) + metal (mostly iron) — about ⅓ iron, ⅔ silicates; chemistry is <b>oxidized</b>. Mercury has the most metal, the Moon the least.",
            "Big icy moons (Ganymede, Callisto, Titan) are half ice, half rock/metal; some may hide liquid-water oceans.",
            "Most asteroids and comets were never melted — <b>chemical fossils</b> of the early solar system."
          ]
        },
        {
          text: "Explain what influences the temperature of a planet’s surface.",
          sec: "7.2", tools: ["planetmakeup"],
          points: [
            "<b>Distance from the Sun</b>: temperature falls roughly as 1/√distance (Mercury ~500 K → Pluto ~50 K).",
            "<b>Atmosphere</b>: the greenhouse effect keeps Earth’s oceans liquid and makes <b>Venus hotter than Mercury</b> even though it is farther out."
          ]
        },
        {
          text: "Explain why there is geological activity on some planets and not on others.",
          sec: "7.2", tools: ["planetmakeup"],
          points: [
            "Geological activity is driven by <b>internal heat</b> (from formation and radioactive decay — about half of Earth’s heat today).",
            "<b>Bigger worlds keep their heat longer</b>: the Moon is geologically dead, Mars is in between, Earth and Venus are still molten inside.",
            "Tides can supply heat too: on Io, tidal heating powers volcanoes.",
            "Surfaces are also changed from <i>outside</i> by impacts (e.g., Comet Shoemaker–Levy 9 hitting Jupiter in 1994)."
          ]
        },
        {
          text: "Describe different methods for dating planets.",
          sec: "7.3", tools: ["datingsurfaces"],
          points: [
            "<b>Crater counting</b> (relative age): impacts occur at a roughly steady rate, so more craters = older surface. It measures only the time since the surface was last “swept clean” (resurfaced).",
            "<b>Radioactive dating</b> (absolute age): in one <b>half-life</b>, half the parent atoms decay into daughter atoms (½, ¼, ⅛…). Compare parent left vs daughter built up.",
            "Examples: uranium-238 → lead-206 (4.47 billion yr); potassium-40 → argon-40 (1.31 billion yr).",
            "Apollo samples showed the Moon is ancient and geologically dead; Earth and Moon each formed about <b>4.5 billion years ago</b>."
          ]
        },
        {
          text: "Describe the characteristics of planets that are used to create formation models of the solar system.",
          sec: "7.4", tools: ["solarorigin"],
          points: [
            "<b>Motion regularities</b>: planets orbit in nearly one plane, all in the same direction, and the Sun spins that way too → they formed together from a spinning cloud.",
            "<b>Composition</b>: the Sun, Jupiter, and Saturn share a hydrogen-dominated makeup; the terrestrial planets are mostly heavy elements (iron, silicon) and lack light gases and ices.",
            "<b>Inner rocky / outer icy</b>: the inner disk was hotter (moving faster → more friction), too warm for water ice to condense."
          ]
        },
        {
          text: "Describe how the characteristics of extrasolar systems help us to model our own solar system.",
          sec: "7.4", tools: ["solarorigin"],
          points: [
            "We can’t look back at our own system’s birth, but younger stars show <b>circumstellar disks</b> (e.g., in the Orion Nebula) — flattened, spinning gas-and-dust disks like our early solar nebula.",
            "Disks are common around very young stars, suggesting disks and stars form together.",
            "Many exoplanet systems are <b>different</b> from ours — <b>superearths</b> (between terrestrial and giant size) and giant planets close to their star — so models must allow for variety."
          ]
        },
        {
          text: "Describe the physical, chemical, and age constraints that must be met by any theory of solar system formation.",
          sec: "7.4", alsoSec: ["7.3"], tools: ["solarorigin", "datingsurfaces"],
          points: [
            "<b>Physical (motion)</b>: same plane, same direction of orbit, Sun spinning the same way.",
            "<b>Chemical</b>: inner planets rocky/metallic and short on light elements; outer planets and Sun hydrogen-rich; ices only far out.",
            "<b>Age</b>: radioactive dating says the Sun, Earth, and Moon formed together about 4.5 billion years ago; primitive asteroids and comets preserve the original material."
          ]
        },
        {
          text: "Describe the importance of collisions in the formation of the solar system.",
          sec: "7.4", tools: ["solarorigin"],
          points: [
            "Solids clumped into <b>planetesimals</b> (probably ≤ 100 km), which <b>collided</b> violently to build the planets.",
            "Impact heat (plus radioactivity) melted the young planets so they <b>differentiated</b> (heavy metal sank to a core, light rock floated to a crust).",
            "Random giant collisions explain the <b>exceptions</b>: Uranus and Pluto tipped on their sides, Venus’s slow backward spin, and the Moon’s differences from Earth."
          ]
        }
      ]
    },
    {
      id: "m6", title: "Module 6 — The Sun", chapters: [15, 16],
      objectives: [
        {
          text: "Describe the various layers of the Sun in terms of heat generation and heat transport.",
          sec: "15.1", alsoSec: ["16.3"], tools: ["sunlayers", "energyflow"],
          points: [
            "<b>Core</b> (out to ~¼ of the radius, ~15 million K): the source of <b>all</b> the Sun’s energy — nuclear fusion happens here.",
            "<b>Radiative zone</b> (~25% to 70% out): energy moves by <b>radiation</b> — photons absorbed and re-emitted in random directions.",
            "<b>Convective zone</b> (outer ~200,000 km): energy carried by <b>convection</b> — hot gas rises, cool gas sinks, “like boiling oatmeal.”",
            "<b>Photosphere</b> (~5800 K, just over 400 km thick): the visible surface where light finally escapes; <b>granulation</b> = tops of convection cells."
          ]
        },
        {
          text: "Describe the composition of the Sun.",
          sec: "15.1", tools: ["sunlayers"],
          points: [
            "By mass: about <b>73% hydrogen, 25% helium, 2% everything else</b> — typical of stars, very unlike Earth’s crust.",
            "Shown by <b>Cecilia Payne-Gaposchkin</b> in 1925 from the Sun’s spectrum.",
            "The Sun is hot, mostly ionized gas — <b>plasma</b>."
          ]
        },
        {
          text: "Explain what happens in the different parts of the Sun’s atmosphere.",
          sec: "15.1", tools: ["solaratmosphere"],
          points: [
            "<b>Photosphere</b> (~5800 K): visible surface, granulation.",
            "<b>Chromosphere</b> (~10,000 K): reddish (hydrogen); helium was discovered here in 1868.",
            "<b>Transition region</b>: thin layer where temperature shoots up.",
            "<b>Corona</b> (a million K or more): very thin, faint (half the full Moon); seen in total eclipses or with a coronagraph.",
            "Temperature <b>rises</b> going outward above the photosphere.",
            "<b>Solar wind</b>: protons and electrons streaming out at ~400 km/s, mostly from <b>coronal holes</b>; near Earth’s magnetic poles it makes <b>auroras</b>."
          ]
        },
        {
          text: "Explain how magnetism is the source of solar activity including the solar cycle.",
          sec: "15.2", tools: ["sunspots", "solarcycle"],
          points: [
            "<b>Sunspots</b> (~3800 K vs 5800 K) are cooler because strong magnetic fields <b>block convection</b> from bringing up heat. Dark umbra, lighter penumbra.",
            "The <b>Zeeman effect</b> (spectral lines split by a magnetic field) proves sunspots are strongly magnetic.",
            "<b>Differential rotation</b> (about 25 days at the equator, 28 at 40° latitude, 36 at 80°) winds magnetic field lines into loops; where a loop breaks the surface you get a pair of opposite-polarity spots.",
            "The <b>solar dynamo</b> — churning ionized gas in/at the base of the convection zone — makes the field.",
            "<b>Sunspot cycle ≈ 11 years</b> (Schwabe); polarity flips each cycle, so the full <b>magnetic cycle ≈ 22 years</b>."
          ]
        },
        {
          text: "Describe the various ways in which the solar activity cycle manifests itself, including flares, coronal mass ejections, prominences, and plages.",
          sec: "15.3", tools: ["solaractivity"],
          points: [
            "<b>Plages</b>: bright, hotter, denser regions in the chromosphere around sunspots.",
            "<b>Prominences</b>: gas rising into the corona near sunspots — quiescent (stable loops, hours–days), eruptive (over 1 million km high), surge (up to 1300 km/s).",
            "<b>Flares</b>: the most violent events — 5–10 minutes, ~10 million K, X-rays and UV; opposite magnetic fields destroy each other (like a snapping rubber band).",
            "<b>Coronal mass ejections (CMEs)</b>: coronal material (protons, electrons) blasted out at 500–1000 km/s.",
            "All occur together in <b>active regions</b> and all rise and fall with the sunspot cycle."
          ]
        },
        {
          text: "Explain how space weather affects Earth.",
          sec: "15.4", tools: ["spaceweather"],
          points: [
            "<b>Space weather</b> = effects of solar activity on Earth’s magnetosphere and surface; first noticed in the <b>1859 Carrington Event</b>.",
            "CMEs are most disruptive: they heat the ionosphere, dragging satellites lower; create “killer electrons”; disrupt communications/GPS; surge power grids (<b>Quebec blackout, 1989</b>); raise radiation doses.",
            "Flares shower the upper atmosphere with X-rays, UV, and particles; coronal holes usually cause milder disturbances.",
            "Warning: a CME takes a few days to arrive (T = D/v, ~3.5 days at 500 km/s).",
            "<b>Maunder Minimum</b> (1645–1715): almost no sunspots, coincided with the Little Ice Age. The Sun’s output varies only ~0.1% — <b>not</b> the cause of recent global warming."
          ]
        },
        {
          text: "Describe the law of conservation of energy.",
          sec: "16.1", tools: ["sunenergy"],
          points: [
            "Energy <b>cannot be created or destroyed</b> — only changed from one form to another.",
            "So the Sun’s output (~4 × 10²⁶ W for ~4.5 billion years) must come from some stored source being converted."
          ]
        },
        {
          text: "Explain ways that energy can be transformed.",
          sec: "16.1", tools: ["sunenergy"],
          points: [
            "Heat → motion (steam engine); motion → heat (brakes).",
            "<b>Chemical</b> (burning): fails for the Sun — a coal Sun would last only a few thousand years.",
            "<b>Gravitational → heat</b> (Kelvin–Helmholtz contraction): shrinking ~40 m/yr would work for now, but only lasts ~100 million years — too short.",
            "<b>Mass → energy</b> (nuclear fusion, E = mc²): the real answer."
          ]
        },
        {
          text: "Explain how matter can be converted into energy.",
          sec: "16.2", tools: ["massenergy"],
          points: [
            "<b>E = mc²</b>: mass is a form of energy; c² is huge, so a tiny mass gives enormous energy (1 g ≈ 15,000 barrels of oil).",
            "A new nucleus weighs slightly <b>less</b> than its parts; the missing mass is released as <b>binding energy</b>.",
            "<b>Fusion</b> (light nuclei joining, up to iron) and <b>fission</b> (heavy nuclei splitting) both release energy; iron is the most stable. Stars run on fusion.",
            "Particle + antiparticle <b>annihilate</b> completely into photons."
          ]
        },
        {
          text: "Describe the particles that make up atoms.",
          sec: "16.2", alsoSec: ["5.4"], tools: ["massenergy", "atomstructure"],
          points: [
            "<b>Protons</b> (+1, in the nucleus; their number defines the element), <b>neutrons</b> (0, in the nucleus; different numbers = isotopes), <b>electrons</b> (−1, outside the nucleus, far lighter than a proton).",
            "The <b>strong nuclear force</b> holds the nucleus together against the protons’ electric repulsion.",
            "Other particles: <b>positron</b> (antielectron, +), <b>neutrino</b> (no charge, tiny mass, almost never interacts; three types)."
          ]
        },
        {
          text: "Trace the nuclear reactions in the solar interior.",
          sec: "16.2", tools: ["ppchain"],
          points: [
            "Fusion needs &gt; ~12 million K to overcome proton repulsion; the core is 15 million K.",
            "<b>Proton-proton chain</b>: ① ¹H + ¹H → ²H + e⁺ + ν  ② ²H + ¹H → ³He + γ  ③ ³He + ³He → ⁴He + 2 ¹H.",
            "Net: <b>4 hydrogen → 1 helium</b>, losing 0.71% of the mass as energy.",
            "The Sun fuses ~600 million tons of H per second; ~4 million tons become energy.",
            "Hotter, more massive stars use the <b>CNO cycle</b> instead."
          ]
        },
        {
          text: "Explain how energy moves outward through the Sun.",
          sec: "16.3", tools: ["energyflow"],
          points: [
            "Three ways: conduction, convection, radiation — in stars, <b>radiation and convection</b> matter.",
            "<b>Radiation</b>: a photon travels only ~0.01 m before being absorbed and re-emitted in a random direction (“random walk”) → <b>100,000 to 1,000,000 years</b> to reach the surface.",
            "<b>Convection</b> carries it the rest of the way (outer 30%).",
            "<b>Neutrinos</b> escape in just over <b>2 seconds</b>."
          ]
        },
        {
          text: "Describe the structure of the solar interior.",
          sec: "16.3", tools: ["hydrostatic", "sunlayers"],
          points: [
            "<b>Hydrostatic equilibrium</b>: at every point, outward gas pressure balances gravity’s inward pull — this requires the center to be ~15 million K.",
            "Core: out to ¼ of the radius but holds ⅓ of the mass; center ~150× water’s density.",
            "Radiation carries energy out to ~70% of the radius, then convection to the surface.",
            "Models are computer calculations from physics plus surface observations, since we can’t see inside."
          ]
        },
        {
          text: "Explain what helioseismology is and what it can tell us about the solar interior.",
          sec: "16.4", tools: ["sunobs"],
          points: [
            "<b>Helioseismology</b> = studying the Sun’s surface vibrations (patches pulsing with ~5-minute periods) caused by sound waves from deep inside — like earthquake waves reveal Earth’s interior.",
            "It shows: convection reaches 30% of the way in; differential rotation continues through the convection zone, but below it the Sun rotates as a solid body; helium inside matches the surface except in the core.",
            "It can detect active regions on the <b>far side</b> of the Sun a week or more ahead.",
            "<b>Neutrinos</b> are the other probe: Davis’s chlorine detector found only ⅓ of predicted neutrinos — solved by <b>neutrino oscillation</b> (they change type, so they have mass); Sudbury confirmed it."
          ]
        }
      ]
    }
  ];

  window.ASTRO_REVIEW = REVIEW;
})();
