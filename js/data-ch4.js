/* =============================================================================
   Astronomy 2e — Chapter 4: Earth, Moon, and Sky
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 4), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[4].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 4,
    chapterTitle: "Earth, Moon, and Sky",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/4-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 99–129"
  };

  CH.tools = ["skycoords", "seasons", "keepingtime", "calendar4", "moonphases", "tides", "eclipses"];

  /* ---------------------------------- ONE STUDY TOOL PER TOPIC: match data */
  /* Earth & sky coordinates — terrestrial vs. celestial systems. */
  CH.coordsmatch = [
    { a: "Great circle", b: "a circle on a sphere centered on the sphere’s own center" },
    { a: "Meridian", b: "a great circle through both poles, giving a place its longitude" },
    { a: "Longitude 0°", b: "the Prime Meridian, through Greenwich, England" },
    { a: "Latitude", b: "degrees north or south of the equator (0° to 90°)" },
    { a: "Declination", b: "the sky’s version of latitude, measured from the celestial equator" },
    { a: "Right ascension", b: "the sky’s version of longitude, zeroed at the vernal equinox" }
  ];
  /* The seasons — cause and effect. */
  CH.seasonsmatch = [
    { a: "Why Earth has seasons at all", b: "the 23.5° tilt of Earth’s axis, not its distance from the Sun" },
    { a: "Earth–Sun distance varies by", b: "only about 3% all year — too small to cause the seasons" },
    { a: "Earth is closest to the Sun in", b: "January — the middle of Northern winter" },
    { a: "Summer solstice, Northern Hemisphere", b: "the Sun is highest, and up longest, in the north" },
    { a: "Equinox (around March 21 & September 21)", b: "Sun on the celestial equator, ~12 hours of day and night everywhere" },
    { a: "Land of the midnight Sun", b: "north of the Arctic Circle, Sun stays up all 24 hours in summer" }
  ];
  /* Keeping time — solar/sidereal day, zones, the date line. */
  CH.timematch = [
    { a: "Solar day", b: "Earth’s rotation with respect to the Sun — the ordinary 24-hour day" },
    { a: "Sidereal day", b: "Earth’s rotation with respect to the stars — about 4 minutes shorter" },
    { a: "Why the solar day is longer", b: "Earth also moves along its orbit, so it must turn a bit extra to catch the Sun" },
    { a: "Mean solar time", b: "the average solar day, exactly 24 hours, used for ordinary clocks" },
    { a: "Standard time zones", b: "one agreed clock time across each ~15°-wide band of longitude" },
    { a: "International Date Line", b: "near 180° longitude, where the calendar date jumps by one day" }
  ];
  /* The calendar — Julian and Gregorian reform. */
  CH.calendarmatch = [
    { a: "The calendar’s basic problem", b: "the day, month, and year don’t divide evenly into one another" },
    { a: "Julian calendar (46 BCE, Julius Caesar)", b: "365 days, plus a leap day every 4th year — average 365.25 days" },
    { a: "The Julian year’s error", b: "about 11 minutes too long, adding up over centuries" },
    { a: "Gregorian reform of 1582", b: "dropped 10 days, and changed the leap-year rule" },
    { a: "Gregorian leap-year rule", b: "a century year is a leap year only if divisible by 400" },
    { a: "Why 1900 wasn’t a leap year (but 2000 was)", b: "1900 ÷ 400 doesn’t work out evenly; 2000 ÷ 400 = 5" }
  ];
  /* Moon phases and motions. */
  CH.moonmatch = [
    { a: "New moon", b: "near the Sun in the sky, dark side toward us; rises and sets with the Sun" },
    { a: "First quarter", b: "half lit; rises around noon, sets around midnight" },
    { a: "Full moon", b: "opposite the Sun; rises at sunset, up all night, sets at sunrise" },
    { a: "Third quarter", b: "half lit again; rises around midnight, sets around noon" },
    { a: "Synchronous rotation", b: "the Moon spins once for every trip around Earth, so we see one face" },
    { a: "Sidereal month vs. solar month", b: "27.3 days by the stars, but 29.5 days from full moon to full moon" }
  ];
  /* Ocean tides. */
  CH.tidesmatch = [
    { a: "Why the Moon raises tides", b: "its pull is stronger on Earth’s near side than on its far side or center" },
    { a: "Tidal bulges form on", b: "both the side facing the Moon and the side facing away" },
    { a: "In one day, a coastal spot passes through", b: "two tidal bulges — two high tides and two low tides" },
    { a: "Spring tide", b: "Sun and Moon lined up (new or full moon) — extra-large tides" },
    { a: "Neap tide", b: "Sun and Moon at right angles (quarter moons) — smaller tides" },
    { a: "Tidal friction, over eons", b: "slows Earth’s spin and pushes the Moon slowly outward" }
  ];
  /* Eclipses. */
  CH.eclipsematch = [
    { a: "Solar eclipse", b: "the Moon’s shadow falls on Earth — can only happen at new moon" },
    { a: "Lunar eclipse", b: "the Moon moves into Earth’s shadow — can only happen at full moon" },
    { a: "Umbra", b: "the dark, central part of a shadow where light is fully blocked" },
    { a: "Penumbra", b: "the lighter, partial part of a shadow, seen as a partial eclipse" },
    { a: "Annular eclipse", b: "the Moon looks a little too small to cover the Sun — a bright ring remains" },
    { a: "Why eclipses don’t happen every month", b: "the Moon’s orbit is tilted about 5° from Earth’s orbital plane" }
  ];

  /* ------------------------------------------------------------------ FIGURES
     Images from OpenStax Astronomy 2e (CC BY 4.0), placed in the matching
     sections via <div data-figure="N.N"></div>. Captions are the book's own,
     with credit lines intact. Files in img/ (downscaled for web). */
  CH.figures = {
    "4.1": {
      file: "fig-4-1.jpg",
      title: "Southern Summer",
      alt: "A fish-eye photo from the Space Shuttle looking down over an astronaut working on the Hubble Space Telescope, with the curved limb of Earth filling the background.",
      caption: "As captured with a fish-eye lens aboard the Atlantis Space Shuttle on December 9, 1993, Earth hangs above the Hubble Space Telescope as it is repaired. The reddish continent is Australia, its size and shape distorted by the special lens. Because the seasons in the Southern Hemisphere are opposite those in the Northern Hemisphere, it is summer in Australia on this December day. (credit: modification of work by NASA)"
    },
    "4.2": {
      file: "fig-4-2.jpg",
      title: "Latitude and Longitude of Washington, DC",
      alt: "A globe with a white grid of latitude and longitude lines, arrows tracing Washington, DC's position from the equator and the Prime Meridian.",
      caption: "We use latitude and longitude to find cities like Washington, DC, on a globe. Latitude is the number of degrees north or south of the equator, and longitude is the number of degrees east or west of the Prime Meridian. Washington, DC’s coordinates are 38° N and 77° W."
    },
    "4.3": {
      file: "fig-4-3.jpg",
      title: "Royal Observatory in Greenwich, England",
      alt: "Two photos: tourists straddling a metal strip set into a stone walkway at the Royal Observatory, and a close-up of the same brass meridian line running through the cobblestones.",
      caption: "At the internationally agreed-upon zero point of longitude at the Royal Observatory Greenwich, tourists can stand and straddle the exact line where longitude “begins.” (credit left: modification of work by “pdbreen”/Flickr; credit right: modification of work by Ben Sutherland)"
    },
    "4.4": {
      file: "fig-4-4.jpg",
      title: "Foucault’s Pendulum",
      alt: "A large pendulum hanging from a ceiling, swinging above a circular wooden platform ringed with small pegs, with onlookers watching.",
      caption: "As Earth turns, the plane of oscillation of the Foucault pendulum shifts gradually so that as time passes, more and more of the targets in the circle at the edge of the wooden platform are knocked over in sequence. (credit: Manuel M. Vicente)"
    },
    "4.5": {
      file: "fig-4-5.jpg",
      title: "Seasons",
      alt: "A diagram of Earth's orbit around the Sun, showing Earth tilted at 23.5° at the summer solstice, autumnal equinox, winter solstice, and vernal equinox positions.",
      caption: "We see Earth at different seasons as it circles the Sun. In June, the Northern Hemisphere “leans into” the Sun, and those in the North experience summer and have longer days. In December, during winter in the Northern Hemisphere, the Southern Hemisphere “leans into” the Sun and is illuminated more directly. In spring and autumn, the two hemispheres receive more equal shares of sunlight."
    },
    "4.6": {
      file: "fig-4-6.jpg",
      title: "The Sun’s Rays in Summer and Winter",
      alt: "Two panels comparing sunlight striking the ground steeply (spreading over a small area) versus at a shallow angle (spreading over a much wider area).",
      caption: "(a) In summer, the Sun appears high in the sky and its rays hit Earth more directly, spreading out less. (b) In winter, the Sun is low in the sky and its rays spread out over a much wider area, becoming less effective at heating the ground."
    },
    "4.7": {
      file: "fig-4-7.jpg",
      title: "The Sun’s Path in the Sky for Different Seasons",
      alt: "Three transparent celestial spheres showing the Sun's daily path relative to the celestial equator on June 21, March/September 21, and December 21.",
      caption: "On June 21, the Sun rises north of east and sets north of west. For observers in the Northern Hemisphere of Earth, the Sun spends about 15 hours above the horizon in the United States, meaning more hours of daylight. On December 21, the Sun rises south of east and sets south of west. It spends 9 hours above the horizon in the United States, which means fewer hours of daylight and more hours of night in northern lands. On March 21 and September 21, the Sun spends equal amounts of time above and below the horizon in both hemispheres."
    },
    "4.8": {
      file: "fig-4-8.jpg",
      title: "Earth on June 21",
      alt: "Earth lit by sunlight from the left, with lines marking the Arctic Circle, Tropic of Cancer, equator, Tropic of Capricorn, and Antarctic Circle; the north polar region is fully lit.",
      caption: "This is the date of the summer solstice in the Northern Hemisphere. Note that as Earth turns on its axis (the line connecting the North and South Poles), the North Pole is in constant sunlight while the South Pole is veiled in 24 hours of darkness. The Sun is at the zenith for observers on the Tropic of Cancer."
    },
    "4.9": {
      file: "fig-4-9.jpg",
      title: "Earth on December 21",
      alt: "The same lit Earth diagram as Figure 4.8, but now the north polar region is shaded in darkness.",
      caption: "This is the date of the winter solstice in the Northern Hemisphere. Now the North Pole is in darkness for 24 hours and the South Pole is illuminated. The Sun is at the zenith for observers on the Tropic of Capricorn and thus is low in the sky for the residents of the Northern Hemisphere."
    },
    "4.10": {
      file: "fig-4-10.jpg",
      title: "Difference Between a Sidereal Day and a Solar Day",
      alt: "A top-down diagram of Earth orbiting the Sun, showing Earth on two successive days and the extra 1° of rotation needed to bring the Sun back overhead.",
      caption: "This is a top view, looking down as Earth orbits the Sun. Because Earth moves around the Sun (roughly 1° per day), after one complete rotation of Earth relative to the stars, we do not see the Sun in the same position."
    },
    "4.11": {
      file: "fig-4-11.jpg",
      title: "Where the Date Changes",
      alt: "A world map with a jagged red line running roughly along the 180° meridian through the Pacific Ocean, marking the International Date Line.",
      caption: "The International Date Line is an arbitrarily drawn line on Earth where the date changes. So that neighbors do not have different days, the line is located where Earth’s surface is mostly water."
    },
    "4.12": {
      file: "fig-4-12.jpg",
      title: "Stonehenge",
      alt: "Large upright stone slabs, some topped with horizontal lintels, arranged in circles on a grassy field under a cloudy sky.",
      caption: "The ancient monument known as Stonehenge was used to keep track of the motions of the Sun and Moon. (credit: modification of work by Adriano Aurelio Araujo)"
    },
    "4.13": {
      file: "fig-4-13.jpg",
      title: "El Caracol",
      alt: "A round stone tower observatory atop a stepped stone platform, with a wide staircase leading up to it.",
      caption: "This Mayan observatory at Chichen Itza in the Yucatan, Mexico, dates from around the year 1000. (credit: “wiredtourist.com”/Flickr)"
    },
    "4.14": {
      file: "fig-4-14.jpg",
      title: "Phases of the Moon",
      alt: "A diagram of the Moon's orbit around Earth with the Sun off to one side, showing eight labeled positions (A–H) with the Moon's phase as seen from space and as it appears in the sky from Earth.",
      caption: "The appearance of the Moon changes over the course of a complete monthly cycle. The pictures of the Moon on the blue circle show the perspective from space, with the Sun off to the right in a fixed position. The outer images show how the Moon appears to you in the sky from each point in the orbit. Imagine yourself standing on Earth, facing the Moon at each stage. In the position “New,” for example, you are facing the Moon from the right side of Earth in the middle of the day. (Note that the distance of the Moon from Earth is not to scale in this diagram: the Moon is roughly 30 Earth-diameters away from us.) (credit: modification of work by NASA)"
    },
    "4.15": {
      file: "fig-4-15.jpg",
      title: "The Moon without and with Rotation",
      alt: "Two panels showing the Moon orbiting Earth with an arrow marking a fixed point on its surface: in (a) the arrow always points the same direction in space, in (b) it always points back at Earth.",
      caption: "In this figure, we stuck a white arrow into a fixed point on the Moon to keep track of its sides. (a) If the Moon did not rotate as it orbited Earth, it would present all of its sides to our view; hence the white arrow would point directly toward Earth only in the bottom position on the diagram. (b) Actually, the Moon rotates in the same period that it revolves, so we always see the same side (the white arrow keeps pointing to Earth)."
    },
    "4.16": {
      file: "fig-4-16.jpg",
      title: "Pull of the Moon",
      alt: "Earth with red arrows of different lengths pointing toward a small Moon off to the right, showing the pull is strongest on the near side and weakest on the far side.",
      caption: "The Moon’s differential attraction is shown on different parts of Earth. (Note that the differences have been exaggerated for educational purposes.)"
    },
    "4.17": {
      file: "fig-4-17.jpg",
      title: "Tidal Bulges in an “Ideal” Ocean",
      alt: "A dark blue sphere (Earth) surrounded by a pale oval-shaped water layer bulging out on the side facing the Moon and the side facing away, with an arrow labeled 'To Moon.'",
      caption: "Differences in gravity cause tidal forces that push water in the direction of tidal bulges on Earth."
    },
    "4.18": {
      file: "fig-4-18.jpg",
      title: "High and Low Tides",
      alt: "Two photos of the same harbor in the Bay of Fundy: boats floating in deep water at high tide, and the same boats resting on exposed mud at low tide.",
      caption: "This is a side-by-side comparison of the Bay of Fundy in Canada at high and low tides. (credit a, b: modification of work by Dylan Kereluk)"
    },
    "4.19": {
      file: "fig-4-19.jpg",
      title: "Tides Caused by Different Alignments of the Sun and Moon",
      alt: "Two diagrams: (a) an elongated water bulge around Earth with the Sun and Moon pulling from opposite sides, labeled spring tide; (b) a rounder bulge with the Sun and Moon pulling at right angles, labeled neap tide.",
      caption: "(a) In spring tides, the Sun’s and Moon’s pulls reinforce each other. (b) In neap tides, the Sun and the Moon pull at right angles to each other and the resulting tides are lower than usual."
    },
    "4.20": {
      file: "fig-4-20.jpg",
      title: "George Darwin (1845–1912)",
      alt: "A black-and-white portrait photograph of an older bearded man in a tweed suit and tie.",
      caption: "George Darwin is best known for studying Earth’s spin in relation to angular momentum."
    },
    "4.21": {
      file: "fig-4-21.jpg",
      title: "Solar Eclipse",
      alt: "A diagram of the Sun and Moon casting a dark umbra and lighter penumbra toward Earth, with four numbered viewpoints, plus a row of four small images showing how the Sun and Moon look from each of those points.",
      caption: "(a) The shadow cast by a spherical body (the Moon, for example) is shown. Notice the dark umbra and the lighter penumbra. Four points in the shadow are labeled with numbers. (b) You see what the Sun and Moon would look like in the sky at the four labeled points. At position 1, you see a total eclipse. At positions 2 and 3, the eclipse is partial. At position 4, the Moon is farther away and thus cannot cover the Sun completely; a ring of light thus shows around the Sun, creating what is called an “annular” eclipse."
    },
    "4.22": {
      file: "fig-4-22.jpg",
      title: "Geometry of a Total Solar Eclipse",
      alt: "A diagram showing the Moon between the Sun and Earth, casting a narrow shadow cone that touches a small area on Earth's surface, with the Moon's orbit path drawn around Earth.",
      caption: "Note that our diagram is not to scale. The Moon blocks the Sun during new moon phase as seen from some parts of Earth and casts a shadow on our planet."
    },
    "4.23": {
      file: "fig-4-23.jpg",
      title: "The Sun’s Corona",
      alt: "A totally eclipsed Sun: a black disk (the Moon) surrounded by a glowing white halo of thin, wispy light.",
      caption: "The corona (thin outer atmosphere) of the Sun is visible during a total solar eclipse. (It looks more extensive in photographs than it would to the unaided eye.) (credit: modification of work by Lutfar Rahman Nirjhar)"
    },
    "4.24": {
      file: "fig-4-24.jpg",
      title: "Geometry of a Lunar Eclipse",
      alt: "A diagram showing the Moon's orbit passing through the long cone of Earth's shadow, with the Sun off to one side.",
      caption: "The Moon is shown moving through the different parts of Earth’s shadow during a total lunar eclipse. Note that the distance the Moon moves in its orbit during the eclipse has been exaggerated here for clarity."
    },
    "4.25": {
      file: "fig-4-25.jpg",
      title: "2017 Total Solar and Lunar Eclipse",
      alt: "Two photos side by side: a black Moon ringed by the Sun's bright corona during a total solar eclipse, and a coppery-red eclipsed full moon flanked by two ordinary crescent moons.",
      caption: "(a) The eclipsed Sun August 21, 2017, showing remarkable detail in the Sun’s outer atmosphere. This is a composite of short, medium, and long exposures, as no single exposure can capture the huge range of brightness the Sun exhibits. (b) A total eclipse of the Moon seen over California on January 31, 2018. The Moon moves slowly into the Earth’s shadow, looks red when the eclipse is total and red sunlight refracts through the Earth’s atmosphere, and then slowly moves out of the shadow. (credit a: modification of work by Rick Fienberg, American Astronomical Society/TravelQuest International; credit b: modification of work by Brian Day.)"
    }
  };

  /* ---------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "4.1",
      title: "Earth and Sky",
      minutes: 10,
      pages: "pp. 100–102",
      html:
        '<p>A mapmaker needs a simple way to pin down where every city and landmark sits. Astronomers face the ' +
        'same problem for the sky: how do you write down exactly where a star is? The answer, in both cases, ' +
        'is a grid of coordinates &mdash; and the sky&rsquo;s grid turns out to be a close cousin of the one ' +
        'already wrapped around Earth.</p>' +
        '<h4>Locating places on Earth</h4>' +
        '<p>Earth&rsquo;s spin defines its <strong>North and South Poles</strong> and, halfway between them, its ' +
        '<strong>equator</strong>. Spin also defines <strong>east</strong> (the direction Earth turns toward) ' +
        'and <strong>west</strong> (the opposite) &mdash; well defined everywhere except exactly at the poles, ' +
        'where a point isn&rsquo;t really turning at all.</p>' +
        '<p>A <span class="term">great circle</span> is any circle drawn on a sphere whose center is the ' +
        'sphere&rsquo;s own center &mdash; Earth&rsquo;s equator is one example. A whole family of great circles ' +
        'passes through both poles at once; each of these is called a <span class="term">meridian</span>, and ' +
        'every meridian crosses the equator at a right angle. The meridian through a place fixes its ' +
        '<strong>longitude</strong> &mdash; by international agreement (after many meetings, since every country ' +
        'wanted 0&deg; to run through its own capital), longitude is counted from the meridian through ' +
        '<strong>Greenwich, England</strong>, the <span class="term">Prime Meridian</span>, defined as ' +
        '<strong>0&deg;</strong>. Greenwich won out partly because it sits between Europe and the United States, ' +
        'and partly because it was where much of the method for finding longitude at sea was worked out. ' +
        'Longitudes run <strong>0&deg; to 180&deg;</strong> east or west of Greenwich.</p>' +
        '<div data-figure="4.2"></div>' +
        '<div data-figure="4.3"></div>' +
        '<p>Your <strong>latitude</strong> is how many degrees of arc you sit from the equator along your own ' +
        'meridian, from <strong>0&deg;</strong> at the equator to <strong>90&deg;</strong> at either pole. ' +
        'Washington, DC sits at about 38&deg; N, 77&deg; W; the U.S. Naval Observatory&rsquo;s benchmark there ' +
        'is, more precisely, 38.921&deg; N, 77.066&deg; W.</p>' +
        '<h4>Locating places in the sky</h4>' +
        '<p>Astronomers map the sky the same way, using the <span class="term">celestial sphere</span> &mdash; ' +
        'an imaginary shell around Earth that the sky seems to be painted on. Directly above Earth&rsquo;s poles ' +
        'sit the <span class="term">north celestial pole</span> and <span class="term">south celestial ' +
        'pole</span>; halfway between them, 90&deg; from each, runs the <span class="term">celestial ' +
        'equator</span>, a great circle in the same plane as Earth&rsquo;s own equator.</p>' +
        '<p><span class="term">Declination</span> is the sky&rsquo;s latitude: degrees north (positive) or south ' +
        '(negative) of the celestial equator. Polaris, parked near the north celestial pole, has a declination ' +
        'of almost <strong>+90&deg;</strong>. <span class="term">Right ascension</span> (RA) is the sky&rsquo;s ' +
        'longitude &mdash; except its zero point isn&rsquo;t a city, but the <span class="term">vernal ' +
        'equinox</span>, the spot where the Sun&rsquo;s yearly path (the <span class="term">ecliptic</span>) ' +
        'crosses the celestial equator. Because the whole celestial sphere appears to swing around once a day as ' +
        'Earth turns, the 360&deg; of right ascension can just as well be split into <strong>24 hours</strong>, ' +
        'with each <strong>15&deg; of arc equal to 1 hour of time</strong> &mdash; so RA is given either way, in ' +
        'degrees or in hours, minutes, and seconds.</p>' +
        '<p>One way to picture it: imagine Earth as a transparent globe with its latitude and longitude lines ' +
        'painted on in dark ink, sitting at the center of a giant white-painted celestial sphere with a bright ' +
        'bulb at Earth&rsquo;s core. The terrestrial poles, equator, and meridians would throw their shadows ' +
        'outward onto the sphere &mdash; giving exactly the celestial poles, celestial equator, and hour circles ' +
        'used to pin down every star.</p>' +
        '<h4>The turning Earth</h4>' +
        '<p>Why does the whole sky seem to wheel around every night? Either the sky truly spins around a still ' +
        'Earth, or Earth itself is turning. Astronomers have known it&rsquo;s Earth since the seventeenth ' +
        'century, but the first unambiguous <em>proof</em> came only in <strong>1851</strong>, from the French ' +
        'physicist <strong>Jean Foucault</strong>. He hung a <strong>60-meter pendulum</strong> with a ' +
        '<strong>25-kilogram</strong> weight from the dome of the Panth&eacute;on in Paris and set it swinging ' +
        'evenly. If Earth held still, the pendulum&rsquo;s swing would keep tracing the same straight line ' +
        'forever. Instead, within minutes, the plane of the swing was visibly drifting &mdash; not because the ' +
        'pendulum was turning, Foucault explained, but because <strong>Earth was turning beneath it</strong>. ' +
        'Foucault pendulums like this one are now popular fixtures of science museums and planetariums ' +
        'worldwide.</p>' +
        '<div data-figure="4.4"></div>' +
        '<div data-diagram="sky-latitude"></div>',
      keyIdeas: [
        "A great circle is any circle on a sphere centered on the sphere's center; a meridian is a great circle through both poles.",
        "Longitude is measured east or west (0°–180°) from the Prime Meridian at Greenwich, England (0°). Latitude is measured north or south (0°–90°) from the equator.",
        "The celestial sphere carries an analogous grid: declination (like latitude) is measured from the celestial equator; right ascension (like longitude) is measured from the vernal equinox, in degrees or in hours (15° = 1 hour).",
        "The north and south celestial poles sit directly above Earth's poles; the celestial equator lies in the same plane as Earth's equator.",
        "Jean Foucault's 1851 pendulum, swung from the dome of the Panthéon in Paris, gave the first direct proof that Earth itself turns, rather than the sky spinning around a stationary Earth."
      ],
      selfCheck: [
        { q: "What is a meridian, and what coordinate does it fix?",
          a: "A great circle on Earth passing through both the North and South Poles. The meridian through a place fixes its longitude." },
        { q: "Why was Greenwich, England chosen as the Prime Meridian?",
          a: "It sits between continental Europe and the United States, and it was where much of the method for finding longitude at sea had been developed — though the choice took many international meetings, since every country wanted 0° through its own capital." },
        { q: "How is right ascension like longitude, and where is its zero point?",
          a: "Both measure an east–west position. Right ascension is zeroed at the vernal equinox — the point where the ecliptic crosses the celestial equator — rather than at a city on Earth." },
        { q: "What did Foucault's pendulum experiment prove, and how?",
          a: "That Earth itself rotates. A freely swinging pendulum keeps its plane of motion fixed in space; as the minutes passed, Earth turned beneath the swinging pendulum, so its plane appeared to drift relative to the ground." }
      ]
    },
    {
      id: "4.2",
      title: "The Seasons",
      minutes: 13,
      pages: "pp. 103–108",
      html:
        '<p>Earth&rsquo;s orbit is very nearly circular, so why is it hot in summer and cold in winter? A tempting ' +
        'guess is that Earth must be closer to the Sun in summer. But Earth&rsquo;s Sun distance varies by only ' +
        'about <strong>3%</strong> all year &mdash; nowhere near enough to explain real seasonal swings. Worse ' +
        'for that idea: Earth is actually <strong>closest</strong> to the Sun in <strong>January</strong>, right ' +
        'in the middle of Northern Hemisphere winter. And distance alone could never explain why the ' +
        'hemispheres have <em>opposite</em> seasons at the same time. The real cause is the ' +
        '<strong>23.5&deg; tilt</strong> of Earth&rsquo;s spin axis.</p>' +
        '<div data-figure="4.1"></div>' +
        '<h4>The seasons and sunshine</h4>' +
        '<p>Earth&rsquo;s axis keeps pointing the <strong>same direction in space</strong> all year as it orbits ' +
        'the Sun. In June that fixed tilt makes the Northern Hemisphere &ldquo;lean into&rdquo; the Sun; in ' +
        'December the lean reverses and the Southern Hemisphere leans in instead; around September and March ' +
        'Earth leans <strong>sideways</strong>, favoring neither hemisphere.</p>' +
        '<div data-figure="4.5"></div>' +
        '<p>Leaning toward the Sun warms a hemisphere in <strong>two</strong> separate ways. First, sunlight ' +
        'lands at a <strong>more direct angle</strong> and is more concentrated &mdash; the same trick as ' +
        'shining a flashlight straight at a wall (a tight, intense spot) versus at a shallow angle (a big, faint ' +
        'smear). Second, the Sun stays above the horizon <strong>longer</strong> each day, so it has more time ' +
        'to heat things.</p>' +
        '<div data-figure="4.6"></div>' +
        '<div data-figure="4.7"></div>' +
        '<div data-diagram="seasons"></div>' +
        '<h4>The solstices</h4>' +
        '<p>Because Earth&rsquo;s axis is tilted, the Sun&rsquo;s yearly path (the ecliptic) is tilted about ' +
        '23.5&deg; from the celestial equator, so the Sun&rsquo;s position in our sky drifts north and south ' +
        'over the year. On or about <strong>June 21</strong> &mdash; the ' +
        '<span class="term">summer solstice</span> in the north &mdash; the Sun sits about 23&deg; north of the ' +
        'celestial equator, passing directly overhead at noon for anyone at 23&deg; N, a latitude called the ' +
        '<span class="term">Tropic of Cancer</span>. On that date every place within 23&deg; of the North Pole ' +
        'gets sunlight for a full 24 hours, and 90&deg; &minus; 23&deg; = <strong>67&deg; N</strong> is the ' +
        'southernmost latitude with a full day of &ldquo;midnight Sun&rdquo; &mdash; that boundary is the ' +
        '<span class="term">Arctic Circle</span>. On the same day, everywhere within 23&deg; of the South Pole ' +
        'gets no sunlight at all.</p>' +
        '<div data-figure="4.8"></div>' +
        '<p class="callout-inline"><strong>Worked example.</strong> The Tropic of Cancer sits at a latitude ' +
        'equal to Earth&rsquo;s tilt, and the Arctic Circle sits at 90&deg; minus the tilt. If Earth were tilted ' +
        'only <strong>5&deg;</strong> instead of 23.5&deg;, the Tropic of Cancer would move to 5&deg; N and the ' +
        'Arctic Circle to 85&deg; N &mdash; and the seasons would be far milder. At a tilt of ' +
        '<strong>16&deg;</strong>, the Tropic of Cancer would sit at 16&deg; N and the Arctic Circle at ' +
        '74&deg; N, a 58&deg; gap between them, with gentler seasons than Earth actually has.</p>' +
        '<p>Six months later, around <strong>December 21</strong> &mdash; the ' +
        '<span class="term">winter solstice</span> in the north &mdash; everything flips: the Arctic Circle gets ' +
        '24-hour night, the Antarctic Circle gets 24-hour Sun, and the Sun stands overhead at noon on the ' +
        '<span class="term">Tropic of Capricorn</span>, 23&deg; S.</p>' +
        '<div data-figure="4.9"></div>' +
        '<p class="callout-inline"><strong>Worked example.</strong> On Earth&rsquo;s equator, the celestial ' +
        'equator passes straight through the zenith. So on March 21 the noon Sun sits at the zenith, ' +
        '<strong>90&deg;</strong> up. On June 21 the Sun is 23&deg; N of the celestial equator, so from the ' +
        'equator it stands 90&deg; &minus; 23&deg; = <strong>67&deg;</strong> above the horizon at noon. From ' +
        'the Tropic of Cancer (23&deg; N) on December 21, the Sun (23&deg; S) is 46&deg; from that latitude&rsquo;s ' +
        'zenith, so its noon altitude there is 90&deg; &minus; 46&deg; = <strong>44&deg;</strong>.</p>' +
        '<h4>The equinoxes</h4>' +
        '<p>Halfway between the solstices, around <strong>March 21</strong> and <strong>September 21</strong>, ' +
        'the Sun crosses the celestial equator at the <span class="term">vernal</span> and ' +
        '<span class="term">autumnal equinoxes</span>. Every place on Earth then gets roughly ' +
        '<strong>12 hours</strong> of sunshine and 12 hours of night, with neither hemisphere favored.</p>' +
        '<h4>The seasons at different latitudes</h4>' +
        '<p>Near the equator, every day of the year runs close to 12 hours of Sun and 12 of night, so people ' +
        'there mark the year by rainfall (wet season, dry season) rather than by sunlight. Move toward the poles ' +
        'and the swing gets more extreme, until, at the North Pole itself, the Sun stays up for a continuous ' +
        '<strong>six months</strong> (roughly vernal to autumnal equinox) and then sets for six months of dark.</p>' +
        '<h4>Real-world wrinkles</h4>' +
        '<p>Earth&rsquo;s atmosphere bends light a little &mdash; a bending called <span class="term">refraction</span> ' +
        '&mdash; which lets us glimpse the Sun slightly before it truly rises and after it truly sets. Because of ' +
        'that, plus the fact that the Sun is a disk and not a point, the equinoxes actually run a few minutes ' +
        'longer than 12 hours of daylight, an effect that grows dramatic near the poles, where the Sun can appear ' +
        'more than a week before it reaches the celestial equator. Astronomers mark morning and evening ' +
        '<span class="term">twilight</span> as beginning or ending when the Sun is 18&deg; below the horizon.</p>' +
        '<p>And although June 21 is the <em>longest</em> day, it is not usually the <em>hottest</em>: air and ' +
        'water soak up heat slowly, the way a pond keeps warming into the afternoon long after sunrise. That lag ' +
        'is why <strong>July and August</strong> run hottest in the Northern Hemisphere, and why the coldest ' +
        'stretch of winter lands a month or more after the December solstice.</p>',
      keyIdeas: [
        "Earth's distance from the Sun varies only about 3% over the year — far too little to cause the seasons, and Earth is actually closest to the Sun in January (Northern winter). The real cause is the 23.5° tilt of Earth's axis, which stays pointed the same way in space all year.",
        "Leaning toward the Sun warms a hemisphere two ways: sunlight strikes at a more direct angle (more concentrated, like a straight-on flashlight beam), and the Sun is up longer each day.",
        "Summer solstice (~June 21): Sun ~23° N of the celestial equator, overhead at noon on the Tropic of Cancer (23° N); everywhere within 23° of the North Pole has 24-hour Sun, and the Arctic Circle (67° N = 90° − 23°) is the southernmost latitude with a full 24-hour day.",
        "Winter solstice (~December 21) reverses everything: the Tropic of Capricorn (23° S) gets the overhead noon Sun, the Antarctic Circle gets 24-hour Sun, and the Arctic Circle gets 24-hour night.",
        "Equinoxes (~March 21 and September 21): the Sun sits on the celestial equator and every place gets roughly 12 hours of day and 12 of night, favoring neither hemisphere.",
        "Near the equator, day length stays close to 12 hours all year (seasons there are marked by rainfall instead); at the poles, the Sun stays up for about 6 continuous months and sets for about 6 months of darkness.",
        "The hottest part of summer lags the June solstice by a month or more because oceans and land absorb heat slowly, the way a pond keeps warming into the afternoon."
      ],
      selfCheck: [
        { q: "Give two facts that rule out changing Earth–Sun distance as the cause of the seasons.",
          a: "The distance varies by only about 3% all year — too small an effect — and Earth is actually closest to the Sun in January, during Northern Hemisphere winter. Distance also can't explain why the two hemispheres have opposite seasons at the same time." },
        { q: "Name the two separate ways that leaning toward the Sun heats a hemisphere.",
          a: "Sunlight arrives at a more direct angle and is more concentrated (like a flashlight aimed straight at a wall), and the Sun stays above the horizon longer each day, giving it more time to heat the ground." },
        { q: "What and where are the Tropic of Cancer and the Arctic Circle, and how are they related to Earth's tilt?",
          a: "The Tropic of Cancer (23° N) is the latitude where the Sun stands at the zenith at noon on the summer solstice; the Arctic Circle (67° N = 90° − tilt) is the southernmost latitude with a full 24-hour day on that date. Both latitudes are set directly by the size of Earth's 23.5° tilt." },
        { q: "Why is late July or August usually hotter than the day of the summer solstice itself?",
          a: "Air and water absorb and release heat slowly, so Earth keeps warming for weeks after the solstice's peak sunlight — the same reason a pond is warmest in the late afternoon rather than at sunrise." }
      ]
    },
    {
      id: "4.3",
      title: "Keeping Time",
      minutes: 11,
      pages: "pp. 109–111",
      html:
        '<p>Clocks are recent; for most of human history, time was read straight off the positions of the Sun and ' +
        'stars. Astronomy still supplies the basic unit &mdash; the day &mdash; but there is more than one way ' +
        'to define it.</p>' +
        '<h4>Solar day vs. sidereal day</h4>' +
        '<p>The <span class="term">solar day</span> is Earth&rsquo;s rotation measured against the ' +
        '<strong>Sun</strong> &mdash; the ordinary day people set their clocks by. Astronomers also use the ' +
        '<span class="term">sidereal day</span>, Earth&rsquo;s rotation measured against the ' +
        '<strong>stars</strong>. The sidereal day is <strong>about 4 minutes shorter</strong>: as Earth rotates, ' +
        'it is also sliding along its orbit, so after one full spin relative to a distant star, it must turn a ' +
        'little <em>extra</em> &mdash; about 1/365 of a full turn &mdash; before the Sun lines up overhead ' +
        'again.</p>' +
        '<div data-figure="4.10"></div>' +
        '<p class="callout-inline"><strong>Worked example.</strong> Because clocks track the solar day, stars ' +
        'rise about <strong>4 minutes earlier</strong> every night &mdash; roughly <strong>2 hours a month</strong>. ' +
        'If Sirius rises at 7:00 p.m. tonight, three months from now it will rise about 3 &times; 2 = 6 hours ' +
        'earlier, or about <strong>1:00 p.m.</strong> If a star rises at 8:30 p.m. tonight, two months from now ' +
        'it will rise about 4 hours earlier &mdash; around <strong>4:30 p.m.</strong> That is why the ' +
        'constellations on view after dark slowly cycle through the year.</p>' +
        '<h4>Apparent, mean, and standard time</h4>' +
        '<p><span class="term">Apparent solar time</span> is time read straight from the Sun&rsquo;s actual ' +
        'position &mdash; sundial time, and probably the oldest kind of timekeeping there is. Hours before the ' +
        'Sun crosses your local meridian are <em>ante meridiem</em> (a.m.); hours after are ' +
        '<em>post meridiem</em> (p.m.). The trouble is that an apparent solar day is not perfectly steady: ' +
        'Earth&rsquo;s elliptical orbit speeds up and slows down over the year, and the axis tilt adds its own ' +
        'wobble, so sundial time doesn&rsquo;t march forward at an even rate &mdash; awkward once mechanical ' +
        'clocks, which <em>do</em> run evenly, came along.</p>' +
        '<p>The fix is <span class="term">mean solar time</span>: the <strong>average</strong> solar day, ' +
        'exactly <strong>24 hours</strong>, ticking at a constant rate. It is still tied to your longitude, ' +
        'though &mdash; noon happens at a different instant every time you move east or west, so strictly kept ' +
        'mean time would force travelers to reset their watches continuously. The solution, in place across most ' +
        'of the world by <strong>1900</strong>, is <strong>24 standard time zones</strong>, each keeping one ' +
        'shared clock time (based on the mean solar time along a standard meridian near its middle). The United ' +
        'States adopted <strong>four zones in 1883</strong> (now six, with Hawaii and Alaska); Pacific time runs ' +
        '<strong>3 hours</strong> behind Eastern time. Most countries use a whole-hour zone, though India runs a ' +
        'half-zone (5.5 hours from Greenwich) and China keeps a single time zone nationwide, even though it spans ' +
        'a huge range of longitude. <span class="term">Daylight saving time</span> is just standard time plus 1 ' +
        'hour &mdash; it shifts sunlight into the evening but does not create any extra daylight.</p>' +
        '<h4>The International Date Line</h4>' +
        '<p>Because clock time keeps advancing as you travel east, circling the entire globe eastward and ' +
        'resetting your watch by an hour at every zone would leave you a full day ahead of the people back home. ' +
        'The fix is the <span class="term">International Date Line</span>, running near ' +
        '<strong>180&deg; longitude</strong> (jogging here and there to avoid splitting island groups and ' +
        'Alaska) mostly down the middle of the Pacific Ocean, where it inconveniences the fewest people. Crossing ' +
        'it <strong>eastward</strong> (further advancing your time) means <strong>subtracting</strong> a day; ' +
        'crossing it <strong>westward</strong> means <strong>adding</strong> one. The Imperial Japanese Navy&rsquo;s ' +
        'attack on Pearl Harbor is remembered in the United States as <strong>Sunday, December 7, 1941</strong>, ' +
        'but Japanese students learn it as <strong>Monday, December 8</strong> &mdash; both are the same moment, ' +
        'on opposite sides of the line.</p>' +
        '<div data-figure="4.11"></div>',
      keyIdeas: [
        "The solar day (measured against the Sun) is what ordinary clocks track; the sidereal day (measured against the stars) is about 4 minutes shorter, because Earth's own orbital motion means it must turn a little extra to bring the Sun back overhead.",
        "Because clocks run on solar time, stars rise about 4 minutes earlier each night — roughly 2 hours earlier per month.",
        "Apparent solar time (sundial time) doesn't tick at a constant rate, because Earth's elliptical orbit and axis tilt make the Sun's apparent motion uneven; mean solar time averages this out to a steady 24-hour day.",
        "Standard time zones (24 of them worldwide by 1900; 4 adopted in the U.S. in 1883, now 6) let a whole region share one clock time instead of continuously resetting watches by longitude. Daylight saving time is just standard time plus one hour — it shifts sunlight, but adds none.",
        "The International Date Line, near 180° longitude, is where the calendar date jumps by a day — subtracted crossing eastward, added crossing westward — so that clock time can keep advancing eastward around the whole globe without contradiction."
      ],
      selfCheck: [
        { q: "Why is a solar day about 4 minutes longer than a sidereal day?",
          a: "Earth doesn't just spin — it also moves along its orbit each day (about 1° of the 360° trip). After one full rotation relative to the distant stars, Earth must turn a bit further, about 1/365 of a turn, before the Sun lines up overhead again." },
        { q: "What problem does mean solar time solve that apparent solar time can't, and what problem does it still leave?",
          a: "Mean solar time ticks at a constant 24-hour rate, fixing apparent solar time's uneven pace (caused by Earth's elliptical orbit and axial tilt). But it's still tied to exact longitude, so without time zones, travelers moving east or west would have to keep resetting their watches." },
        { q: "Crossing the International Date Line eastward, do you add or subtract a day? What about westward?",
          a: "Crossing eastward (further advancing your clock time) you subtract a day; crossing westward you add one." },
        { q: "Does daylight saving time create extra sunlight? Explain.",
          a: "No — it is simply standard time plus one hour. It shifts the clock time of sunset later into the evening, but the total amount of daylight in a day is set by Earth's rotation and tilt, not by what clocks say." }
      ]
    },
    {
      id: "4.4",
      title: "The Calendar",
      minutes: 11,
      pages: "pp. 112–114",
      html:
        '<p>A calendar has to do two jobs: track long stretches of time so people can anticipate the seasons and ' +
        'mark anniversaries, and do it using natural units everyone can agree on &mdash; the ' +
        '<strong>day</strong> (Earth&rsquo;s rotation, exactly <strong>1.0000</strong> day by definition), the ' +
        '<strong>month</strong> (the Moon&rsquo;s cycle of phases, <strong>29.5306 days</strong>), and the ' +
        '<strong>tropical year</strong> (Earth&rsquo;s trip around the Sun, <strong>365.2422 days</strong>). The ' +
        'trouble &mdash; the whole history of the calendar, really &mdash; is that none of these numbers divides ' +
        'evenly into any of the others.</p>' +
        '<h4>Early calendars</h4>' +
        '<p><strong>Stonehenge</strong>, about 13 km from Salisbury in southwest England, is the best-preserved ' +
        'of several Bronze Age monuments in northwestern Europe built (in three phases, roughly ' +
        '<strong>2800 to 1500 BCE</strong>) with stones aligned to the Sun and Moon&rsquo;s rising and setting at ' +
        'the solstices &mdash; almost certainly, in part, a calendar.</p>' +
        '<div data-figure="4.12"></div>' +
        '<p>Over a thousand years ago, the <strong>Maya</strong> of Central America ran a calendar arguably more ' +
        'sophisticated than Europe&rsquo;s contemporaries &mdash; though rather than tracking the year or lunar ' +
        'month exactly, it was built to count days across vast stretches of past and future, including ' +
        'predicting events like the position of Venus. Their observatory <strong>El Caracol</strong>, at ' +
        'Chichen Itza in the Yucat&aacute;n, dates from around the year <strong>1000</strong>.</p>' +
        '<div data-figure="4.13"></div>' +
        '<p>Ancient <strong>China</strong> built an especially intricate calendar, tended by a small hereditary ' +
        'class of court astronomer-astrologers, that folded in Jupiter&rsquo;s roughly 12-year cycle alongside ' +
        'the Sun and Moon &mdash; the source of the still-familiar 12-year cycle of zodiac years (Year of the ' +
        'Dragon, Year of the Pig, and so on).</p>' +
        '<h4>From Julius Caesar to Pope Gregory</h4>' +
        '<p>Our own calendar traces back through the <strong>Sumerians</strong> (from at least the second ' +
        'millennium BCE) and the <strong>Egyptians and Greeks</strong> (around the eighth century BCE) to the ' +
        '<span class="term">Julian calendar</span>, introduced by <strong>Julius Caesar</strong>. It gave up on ' +
        'tracking the Moon (though our roughly 30-day months are a leftover of that older lunar habit &mdash; ' +
        'Islamic calendars, by contrast, are still primarily lunar) and set the year at <strong>365 days</strong>, ' +
        'with a <strong>leap year</strong> of 366 days every fourth year, averaging <strong>365.25 days</strong> ' +
        '&mdash; close to, but not exactly, the true 365.2422.</p>' +
        '<p>That small mismatch &mdash; about <strong>11 minutes a year</strong> too long &mdash; quietly piled ' +
        'up. By <strong>1582</strong> it had dragged the first day of spring from March 21 back to ' +
        '<strong>March 11</strong>, threatening to eventually shift the Christian celebration of Easter into ' +
        'early winter. <strong>Pope Gregory XIII</strong>, a contemporary of Galileo, ordered a fix in two parts. ' +
        'First, <strong>10 days were dropped</strong> outright: by proclamation, the day after ' +
        '<strong>October 4, 1582</strong> became <strong>October 15, 1582</strong>. Second, the leap-year rule ' +
        'was sharpened: a century year (1700, 1800, 1900, 2000, &hellip;) is a leap year only if it is ' +
        '<strong>divisible by 400</strong>. So <strong>1700, 1800, and 1900</strong> &mdash; all divisible by 4 ' +
        'but not by 400 &mdash; were <em>not</em> leap years, while <strong>1600 and 2000</strong>, divisible by ' +
        '400, were. The resulting <span class="term">Gregorian calendar</span> averages ' +
        '<strong>365.2425 days</strong>, accurate to about <strong>1 day in 3,300 years</strong>.</p>' +
        '<p>Catholic countries adopted the reform immediately, but others lagged for generations: England and its ' +
        'American colonies switched only in <strong>1752</strong> (September 2 was followed by ' +
        '<strong>September 14</strong>, and some people, feeling robbed of 12 days, rioted), and ' +
        '<strong>Russia</strong> held onto the Julian calendar until the Bolshevik revolution, by which point it ' +
        'had to drop <strong>13</strong> days to catch up &mdash; which is why the &ldquo;October Revolution&rdquo; ' +
        'of 1917 is now marked in <strong>November</strong>.</p>',
      keyIdeas: [
        "A calendar must track long time spans using natural units — but the day (1.0000 day), month (29.5306 days), and tropical year (365.2422 days) don't divide evenly into one another, which is the whole historic challenge of the calendar.",
        "Stonehenge (built ~2800–1500 BCE) aligns with solstice sunrise/sunset; the Maya built a sophisticated day-count calendar (observatory: El Caracol, ~year 1000); ancient China's calendar wove in Jupiter's ~12-year cycle, the source of today's 12-year zodiac cycle.",
        "The Julian calendar (Julius Caesar) set the year at 365 days plus a leap day every 4th year, averaging 365.25 days — about 11 minutes per year longer than the true 365.2422-day tropical year.",
        "By 1582 that 11-minutes-a-year error had pushed the spring equinox to March 11. Pope Gregory XIII's reform dropped 10 days (October 4, 1582 was followed by October 15) and changed the leap-year rule.",
        "Gregorian rule: a century year is a leap year only if divisible by 400 — so 1700, 1800, 1900 were not leap years, but 1600 and 2000 were. The Gregorian year averages 365.2425 days, accurate to about 1 day in 3,300 years.",
        "Adoption was slow and uneven: England/its colonies switched in 1752 (dropping 12 days), and Russia not until the 1917 revolution (dropping 13 days) — which is why the 'October Revolution' is now dated in November."
      ],
      selfCheck: [
        { q: "What three natural time units does a calendar try to reconcile, and why is that hard?",
          a: "The day (1.0000 day), the month (29.5306 days, the Moon's cycle of phases), and the tropical year (365.2422 days). None of these numbers divides evenly into either of the others, so no simple calendar can track all three exactly." },
        { q: "What was wrong with the Julian calendar's average year length, and how much did it drift by 1582?",
          a: "Its average year (365.25 days) ran about 11 minutes longer than the true tropical year (365.2422 days). Accumulated over centuries, that drift had pushed the spring equinox back to March 11 by 1582, instead of March 21." },
        { q: "State the Gregorian rule for century leap years, and explain why 1900 was not a leap year but 2000 was.",
          a: "A century year is a leap year only if it is divisible by 400. 1900 ÷ 400 is not a whole number, so 1900 was not a leap year; 2000 ÷ 400 = 5 exactly, so 2000 was a leap year." },
        { q: "How did Pope Gregory XIII fix the calendar's accumulated error in 1582?",
          a: "He dropped 10 days from the calendar at once (the day after October 4, 1582 became October 15, 1582) to put the equinox back near March 21, and changed the leap-year rule so the average year length would more closely match the true tropical year going forward." }
      ]
    },
    {
      id: "4.5",
      title: "Phases and Motions of the Moon",
      minutes: 13,
      pages: "pp. 115–119",
      html:
        '<p>After the Sun, the Moon is the brightest thing in the sky &mdash; but it makes no light of its own; it ' +
        'only reflects sunlight. Watch it for a month and you will see a full cycle of ' +
        '<span class="term">phases</span>: starting dark, growing brighter over about two weeks to a fully lit ' +
        'disk, then fading back to dark over the following two weeks. A common misconception is that phases come ' +
        'from Earth&rsquo;s shadow falling on the Moon &mdash; they don&rsquo;t. They come purely from the ' +
        'changing <strong>angle</strong> between the Moon, Earth, and the Sun.</p>' +
        '<p>Try this: stand about 6 feet from a bright light in a dark room, holding a small ball (your head is ' +
        'Earth, the light is the Sun, the ball is the Moon). Move the ball around your head, and it goes through ' +
        'the Moon&rsquo;s exact sequence of phases &mdash; because at every position the ball is still half lit ' +
        'and half dark, but which half faces you keeps changing.</p>' +
        '<div data-figure="4.14"></div>' +
        '<div data-diagram="moon-phase-wheel"></div>' +
        '<h4>Around the cycle</h4>' +
        '<p>At <span class="term">new moon</span> the Moon sits in nearly the same part of the sky as the Sun, ' +
        'its bright side turned away from us &mdash; it is invisible, and it rises and sets right along with the ' +
        'Sun. The Moon moves eastward against the stars roughly <strong>12&deg; a day</strong> (a full ' +
        '360&deg; orbit in about 30 days), or about 24 times its own width, so within a day or two a thin ' +
        '<strong>crescent</strong> appears, growing night by night as the Moon pulls away from the Sun&rsquo;s ' +
        'direction &mdash; and because it is drifting eastward, away from the Sun, it rises later and later each ' +
        'day. About a week in, at <span class="term">first quarter</span>, half the visible disk is lit; lagging ' +
        'a quarter-day behind the Sun, it now rises near noon and sets near midnight. The week after that is ' +
        '<strong>waxing gibbous</strong> (more than half lit, growing). At <span class="term">full moon</span>, ' +
        'the Moon sits opposite the Sun in the sky &mdash; it rises at sunset, is up the <strong>entire ' +
        'night</strong>, is highest at midnight, and sets at sunrise. (Persistent folklore links the full moon to ' +
        'strange behavior &mdash; the word &ldquo;lunacy&rdquo; comes from exactly that idea &mdash; but studies ' +
        'of hospital and police records find no such link; a bright Moon up all night just makes any odd ' +
        'behavior easier to notice.)</p>' +
        '<p>The same sequence then runs in reverse: <strong>waning gibbous</strong>, then, about a week after ' +
        'full, <span class="term">third quarter</span> (again half-lit, rising near midnight and setting near ' +
        'noon), then <strong>waning crescent</strong>, back to new after about <strong>29.5 days</strong> in ' +
        'total.</p>' +
        '<p>Because the Moon&rsquo;s orbit is tilted relative to the Sun&rsquo;s path in the sky, Earth&rsquo;s ' +
        'shadow usually misses the Moon entirely even at full phase &mdash; which is exactly why we get a full ' +
        'moon most months instead of a monthly eclipse (eclipses are covered later in this chapter).</p>' +
        '<div class="callout-inline"><strong>Astronomy and the days of the week.</strong> The seven-day week may ' +
        'trace back to the roughly week-long gap between the Moon&rsquo;s quarter phases. Its days are named for ' +
        'the seven &ldquo;wanderers&rdquo; the ancients tracked: the Sun, the Moon, and the five naked-eye ' +
        'planets. Sun-day, Moon-day, and Saturn-day survive plainly in English; the rest carry Norse stand-ins ' +
        'for the Roman gods &mdash; clearer in Romance languages, where Wednesday (Mercury&rsquo;s day) is ' +
        '<em>mercoledi</em> in Italian and <em>miércoles</em> in Spanish, Tuesday (Mars) is <em>martes</em>, ' +
        'Thursday (Jupiter) is <em>giovedi</em>, and Friday (Venus) is <em>vendredi</em> in French.</div>' +
        '<h4>Revolution and rotation</h4>' +
        '<p>The Moon&rsquo;s <span class="term">sidereal month</span> &mdash; one trip around Earth measured ' +
        'against the stars &mdash; is <strong>27.3217 days</strong>. Its <span class="term">solar month</span> ' +
        '(also called the synodic month) &mdash; the time from one full moon to the next &mdash; runs longer, ' +
        '<strong>29.5306 days</strong>, because Earth itself is moving around the Sun, so the Moon has to travel ' +
        'a bit past a full lap to line up with the Sun again the same way. Each evening the Moon creeps visibly ' +
        'eastward among the stars &mdash; its own width in under an hour &mdash; so it rises, on average, about ' +
        '<strong>50 minutes</strong> later each day.</p>' +
        '<div data-figure="4.15"></div>' +
        '<p>The Moon rotates on its axis in <strong>exactly</strong> the time it takes to orbit Earth, a match ' +
        'called <span class="term">synchronous rotation</span> &mdash; the reason it always shows us the same ' +
        'face. (You can feel why by facing a friend and turning to always keep facing them while you circle them: ' +
        'you end up spinning once per lap too.) There is no permanent &ldquo;dark side of the Moon&rdquo; &mdash; ' +
        'the far side gets just as much sunlight over a month as the near side; it is simply a side we never see ' +
        'from Earth.</p>',
      keyIdeas: [
        "Moon phases come purely from the changing angle between the Moon, Earth, and the Sun — not from Earth's shadow (that's a common misconception; Earth's shadow causes a separate, rarer event, a lunar eclipse).",
        "New moon (near the Sun, invisible, rises/sets with the Sun) → waxing crescent → first quarter (half-lit, rises ~noon, sets ~midnight) → waxing gibbous → full moon (opposite the Sun, up all night, rises at sunset/sets at sunrise) → waning gibbous → third quarter (rises ~midnight, sets ~noon) → waning crescent → back to new, in about 29.5 days.",
        "The Moon moves eastward against the stars about 12° a day (a full orbit in ~30 days); studies find no real link between full moons and stranger behavior, despite the folklore behind the word 'lunacy.'",
        "The sidereal month (27.3217 days, measured against the stars) is shorter than the solar/synodic month (29.5306 days, full moon to full moon) because Earth's own motion around the Sun means the Moon must travel a bit extra to realign with the Sun.",
        "Synchronous rotation: the Moon rotates once on its axis in exactly the time it takes to orbit Earth once, so it always shows the same face — there is no permanently 'dark side,' just a far side we never see from Earth."
      ],
      selfCheck: [
        { q: "Correct this misconception: 'The Moon's phases happen because Earth's shadow covers part of it.'",
          a: "That's not how phases work — they come from the changing angle between the Moon, Earth, and the Sun as the Moon orbits Earth, so we see different amounts of its permanently half-lit surface. Earth's shadow falling on the Moon is a separate, much rarer event: a lunar eclipse." },
        { q: "At first quarter, when does the Moon rise and set, and how much of its visible face is lit?",
          a: "Half the visible face is lit. It rises around noon and sets around midnight, since it lags about a quarter-day behind the Sun." },
        { q: "Why is the solar (synodic) month longer than the sidereal month?",
          a: "The sidereal month (27.3217 days) is the Moon's orbital period measured against the distant stars. But Earth is also moving around the Sun, so after one sidereal orbit the Moon hasn't quite caught back up to the same position relative to the Sun — it needs a bit more time, making the full-moon-to-full-moon solar month 29.5306 days." },
        { q: "What is synchronous rotation, and what everyday effect does it cause for the Moon?",
          a: "Rotating on its axis in exactly the same time it takes to complete one orbit. For the Moon, this means it always keeps the same face turned toward Earth." }
      ]
    },
    {
      id: "4.6",
      title: "Ocean Tides and the Moon",
      minutes: 11,
      pages: "pp. 120–122",
      html:
        '<p>Anyone who lives near the sea knows the tides rise and fall roughly twice a day. Long before Newton, ' +
        'people had already guessed tides were tied to the Moon, since the daily delay in high tide matches the ' +
        'daily delay in moonrise &mdash; but only Newton&rsquo;s theory of gravity explained <em>why</em>.</p>' +
        '<h4>The pull of the Moon on Earth</h4>' +
        '<p>Earth is not a single point &mdash; it has real size, so different parts of it sit at slightly ' +
        'different distances and directions from the Moon. Earth is also not perfectly rigid. The result is a ' +
        '<span class="term">differential force</span>: the side of Earth nearest the Moon is pulled harder than ' +
        'Earth&rsquo;s center, which in turn is pulled harder than the far side &mdash; stretching Earth very ' +
        'slightly into a football-like shape pointed toward the Moon.</p>' +
        '<div data-figure="4.16"></div>' +
        '<p>An all-water Earth would distort by almost <strong>1 meter</strong> before its own gravity balanced ' +
        'the Moon&rsquo;s differential pull. The real, largely solid Earth is stiffer and distorts only about a ' +
        'third as much &mdash; up to roughly <strong>20 centimeters</strong> at most &mdash; not enough to fully ' +
        'cancel the Moon&rsquo;s tug. The leftover, unbalanced pull gives small horizontal tugs at the surface: ' +
        'too weak to budge rock or a person, but more than enough to set the ocean moving.</p>' +
        '<h4>How the tides form</h4>' +
        '<p>Over hours, those tugs pile ocean water into two <span class="term">tidal bulges</span> &mdash; one ' +
        'on the side facing the Moon, and, just as large, one on the side facing away. (The bulges are not the ' +
        'Moon compressing or &ldquo;lifting&rdquo; the water &mdash; they are water actually flowing across ' +
        'Earth&rsquo;s surface to pile up deeper in those two places.) As Earth spins beneath these two fixed ' +
        'bulges, a given coastline is carried through both of them each day, giving ' +
        '<strong>two high tides and two low tides</strong> roughly every 24 hours.</p>' +
        '<div data-figure="4.17"></div>' +
        '<div data-figure="4.18"></div>' +
        '<div data-diagram="tide-bulge"></div>' +
        '<p>The Sun raises tides too, though at under half the Moon&rsquo;s strength. When Sun and Moon line up ' +
        '&mdash; at new moon or full moon &mdash; their pulls add together for extra-large ' +
        '<span class="term">spring tides</span> (named for how the water &ldquo;springs up,&rdquo; nothing to do ' +
        'with the season). When the Moon sits at first or third quarter, at right angles to the Sun, the ' +
        'Sun&rsquo;s pull partly cancels the Moon&rsquo;s, giving smaller <span class="term">neap tides</span>.</p>' +
        '<div data-figure="4.19"></div>' +
        '<p>This simple picture would be the whole story on a planet with a deep, uninterrupted global ocean. In ' +
        'reality, continents blocking the flow, friction between water and seafloor, wind, and uneven ocean depth ' +
        'all complicate things, which is exactly why real tide heights vary enormously from place to place and ' +
        'why every coastal location needs its own separately computed tide table.</p>' +
        '<div class="callout-inline"><strong>Voyagers in astronomy: George Darwin and the slowing of ' +
        'Earth.</strong> All that tidal water dragging over Earth&rsquo;s surface involves a huge amount of ' +
        'friction, and it is very slowly braking Earth&rsquo;s spin &mdash; lengthening the day by about ' +
        '<strong>0.002 second per century</strong>. But total angular momentum in the Earth&ndash;Moon system ' +
        'cannot change, so as Earth&rsquo;s spin loses angular momentum, the Moon&rsquo;s orbit must gain it: the ' +
        'Moon slowly spirals <strong>outward</strong> (confirmed, at about <strong>3.8 centimeters a ' +
        'year</strong>, by mirrors Apollo 11 astronauts left on the Moon) while its month slowly lengthens. This ' +
        'was worked out over a century ago by <strong>George Darwin (1845&ndash;1912)</strong>, son of the ' +
        'naturalist Charles Darwin, who trained and was admitted to the bar as a lawyer before returning to ' +
        'science and becoming a Cambridge professor and protégé of the physicist Lord Kelvin. Darwin calculated ' +
        'that, billions of years from now, Earth&rsquo;s day and the month will both stretch to match &mdash; ' +
        'about <strong>47 of today&rsquo;s days</strong> &mdash; at which point the Moon will hang motionless ' +
        'over one fixed spot on Earth, visible from some places and never from others, exactly as Pluto&rsquo;s ' +
        'moon Charon already does today.</div>' +
        '<div data-figure="4.20"></div>',
      keyIdeas: [
        "Tides come from a differential force: the Moon pulls Earth's near side more strongly than its center, and its center more strongly than the far side, stretching Earth very slightly toward the Moon.",
        "A water-covered Earth would distort by nearly 1 meter; the real, largely rigid Earth distorts only about a third as much (up to ~20 cm) — not enough to balance the pull, so ocean water flows into two tidal bulges, one facing the Moon and one facing away.",
        "As Earth rotates through the two fixed bulges, most coastlines see two high tides and two low tides roughly every 24 hours.",
        "The Sun also raises tides (under half as strong as the Moon's). Spring tides (extra large) happen when Sun and Moon line up at new or full moon; neap tides (smaller) happen at first/third quarter, when the Sun's pull partly cancels the Moon's.",
        "Real tide heights vary by location because of continents, seafloor friction, wind, and ocean depth — which is why tide tables must be computed separately for each place.",
        "Tidal friction is slowing Earth's rotation (~0.002 second per century) while conservation of angular momentum pushes the Moon slowly outward (~3.8 cm/year, confirmed by Apollo 11 mirror reflectors) — worked out by George Darwin, son of Charles Darwin."
      ],
      selfCheck: [
        { q: "What is the 'differential force' that raises ocean tides?",
          a: "Because Earth has real size, the Moon pulls its near side more strongly than its center, and its center more strongly than its far side. That difference in pull across Earth is the differential (tide-raising) force." },
        { q: "Why are there tidal bulges on both the side of Earth facing the Moon AND the side facing away?",
          a: "The near side is pulled toward the Moon more strongly than Earth's center is, so it bulges toward the Moon; the far side is pulled less strongly than the center, so it effectively lags behind and bulges away from the Moon. Both bulges form because of the difference in pull, not because water is only attracted on one side." },
        { q: "What's the difference between a spring tide and a neap tide, and when does each occur?",
          a: "Spring tides are extra-large tides that happen at new or full moon, when the Sun and Moon line up and their tide-raising pulls add together. Neap tides are smaller tides that happen at first or third quarter, when the Sun and Moon pull at right angles and partly cancel each other." },
        { q: "According to George Darwin's calculations, what is happening to Earth's day and to the Moon's orbit over very long timescales, and why?",
          a: "Tidal friction is slowly slowing Earth's rotation, lengthening the day. Because the total angular momentum of the Earth–Moon system must stay constant, the Moon gains that lost angular momentum and slowly spirals outward, which also lengthens the month." }
      ]
    },
    {
      id: "4.7",
      title: "Eclipses of the Sun and Moon",
      minutes: 13,
      pages: "pp. 123–129",
      html:
        '<p>By a remarkable coincidence of our particular moment in history, the Sun and Moon appear almost ' +
        'exactly the same size in our sky: the Sun&rsquo;s diameter is about <strong>400 times</strong> the ' +
        'Moon&rsquo;s, but it is also about <strong>400 times farther away</strong>, so both work out to the ' +
        'same <strong>angular size</strong>, about <strong>&frac12;&deg;</strong>. That near-perfect match is ' +
        'what lets the Moon appear to cover the Sun exactly in a total solar eclipse.</p>' +
        '<p>Any solid body lit by the Sun casts a shadow with two parts: a dark inner cone, the ' +
        '<span class="term">umbra</span>, where sunlight is completely blocked, and a lighter, more diffuse outer ' +
        'region, the <span class="term">penumbra</span>, where it is only partly blocked. A ' +
        '<span class="term">solar eclipse</span> happens when the Moon&rsquo;s shadow falls on Earth; a ' +
        '<span class="term">lunar eclipse</span> happens when the Moon passes into Earth&rsquo;s shadow.</p>' +
        '<div data-figure="4.21"></div>' +
        '<p>Eclipses are not monthly events, even though new and full moons happen every month, because the ' +
        'Moon&rsquo;s orbit is tilted about <strong>5&deg;</strong> from the plane of Earth&rsquo;s orbit &mdash; ' +
        'like two hula hoops sharing a center but tipped relative to each other. Most months the Moon passes ' +
        'above or below the Sun&rsquo;s path, missing an eclipse. Only when the two paths actually cross, about ' +
        'twice a year, does &ldquo;eclipse season&rdquo; make an eclipse possible.</p>' +
        '<h4>Eclipses of the Sun</h4>' +
        '<p>Because the Moon&rsquo;s and Sun&rsquo;s exact angular sizes shift slightly as their distances vary, ' +
        'a perfectly aligned eclipse is sometimes an <span class="term">annular eclipse</span>: the Moon looks a ' +
        'touch smaller than the Sun and cannot fully cover it, leaving a bright ring of sunlight showing around ' +
        'the Moon&rsquo;s dark disk. When the Moon is instead a little nearer than average, its umbra can reach ' +
        'all the way to Earth&rsquo;s surface, producing a <strong>total</strong> solar eclipse for anyone ' +
        'standing in that narrow footprint, and a <strong>partial</strong> solar eclipse for the much wider ' +
        'surrounding region still inside the penumbra.</p>' +
        '<div data-figure="4.22"></div>' +
        '<p>Earth&rsquo;s rotation and the Moon&rsquo;s own orbital motion together sweep the tip of the ' +
        'Moon&rsquo;s shadow eastward across the ground at roughly <strong>1,500 km/h</strong>, tracing a narrow ' +
        '<span class="term">eclipse path</span>; a partial eclipse is visible within about ' +
        '<strong>3,000 km</strong> on either side of it. Totality itself never lasts more than about ' +
        '<strong>7 minutes</strong> at any one spot.</p>' +
        '<p>In the minutes before totality the sky visibly darkens; once the Sun&rsquo;s blinding disk is fully ' +
        'covered, the Sun&rsquo;s <span class="term">corona</span> &mdash; its thin, sprawling outer atmosphere, ' +
        'ordinarily lost in the glare &mdash; suddenly flashes into view, along with planets and bright stars in ' +
        'the darkened sky.</p>' +
        '<div data-figure="4.23"></div>' +
        '<p class="callout-inline"><strong>Seeing for yourself: how to observe a solar eclipse.</strong> Looking ' +
        'directly at any uncovered sliver of the Sun is dangerous at any point in a partial eclipse &mdash; only ' +
        'the fully covered Sun during totality is safe to view directly. Safe methods include proper ' +
        '<strong>eclipse glasses</strong> or welders&rsquo; goggles, or projecting the Sun&rsquo;s image rather ' +
        'than looking at it &mdash; a pinhole punched in cardboard, the gaps between tree leaves, or even a ' +
        'kitchen colander all work as simple pinhole projectors. Smoked glass, exposed color film, ordinary ' +
        'sunglasses, and neutral-density photographic filters (which pass damaging infrared) are all ' +
        '<strong>unsafe</strong>. Total solar eclipses crossed the continental United States on ' +
        '<strong>August 21, 2017</strong> and <strong>April 8, 2024</strong>, drawing huge public interest each ' +
        'time.</p>' +
        '<h4>Eclipses of the Moon</h4>' +
        '<p>Earth&rsquo;s shadow stretches roughly <strong>1.4 million kilometers</strong> out into space ' +
        '&mdash; at the Moon&rsquo;s average distance of <strong>384,000 km</strong>, it is wide enough to cover ' +
        'about four full moons side by side. A lunar eclipse only happens at <strong>full moon</strong>, when ' +
        'Sun, Earth, and Moon line up, and unlike a solar eclipse, it is visible &mdash; weather permitting ' +
        '&mdash; from the <strong>entire night side</strong> of Earth at once, which makes lunar eclipses far ' +
        'more commonly witnessed from any one place than solar eclipses.</p>' +
        '<div data-figure="4.24"></div>' +
        '<p>If the Moon passes fully into Earth&rsquo;s umbra, the eclipse is total; otherwise it is partial. ' +
        'Because Earth is larger than the Moon, its umbra is correspondingly larger, so lunar eclipses run ' +
        'longer than solar ones: each partial phase takes at least an hour, and a central totality can last up ' +
        'to <strong>1 hour 40 minutes</strong>. Even totally eclipsed, the Moon usually stays faintly visible, ' +
        'glowing a dull <strong>coppery red</strong> &mdash; sunlight bent into Earth&rsquo;s shadow by passing ' +
        'through Earth&rsquo;s atmosphere. Total lunar eclipses happen, on average, roughly once every ' +
        '<strong>2 to 3 years</strong>, and &mdash; because a full moon is perfectly safe to look at &mdash; ' +
        'need no special eye protection at all.</p>' +
        '<div data-figure="4.25"></div>',
      keyIdeas: [
        "The Sun and Moon happen to share almost the same angular size (~½°) because the Sun is about 400 times larger in diameter than the Moon, but also about 400 times farther away.",
        "A shadow has a dark inner umbra (light fully blocked) and a lighter outer penumbra (light partly blocked). A solar eclipse is the Moon's shadow falling on Earth; a lunar eclipse is the Moon entering Earth's shadow.",
        "Eclipses don't happen every month because the Moon's orbit is tilted about 5° from Earth's orbital plane — an eclipse is only possible when the two paths cross, roughly twice a year.",
        "A total solar eclipse happens when the Moon's umbra reaches Earth's surface (visible only along a narrow eclipse path, sweeping east at ~1,500 km/h, totality never exceeding ~7 minutes); an annular eclipse happens when the Moon looks slightly too small to fully cover the Sun, leaving a bright ring.",
        "During totality the Sun's corona becomes visible; safe solar-eclipse viewing requires eclipse glasses, welders' glass, or pinhole projection — never the naked eye during any partial phase.",
        "A lunar eclipse only occurs at full moon and, unlike a solar eclipse, is visible from the entire night side of Earth at once; a totally eclipsed Moon usually still glows dull coppery-red from sunlight bent through Earth's atmosphere, and needs no eye protection to view."
      ],
      selfCheck: [
        { q: "Why do the Sun and Moon appear to be almost the same size in Earth's sky?",
          a: "It's a coincidence of scale: the Sun's diameter is about 400 times the Moon's, but the Sun is also about 400 times farther from Earth than the Moon is, so their angular sizes in the sky work out to nearly the same value, about ½°." },
        { q: "Why doesn't a solar or lunar eclipse happen at every new moon and full moon?",
          a: "The Moon's orbit is tilted about 5° relative to the plane of Earth's orbit around the Sun, so most months the Moon passes above or below the Sun's path in the sky and no eclipse occurs. Eclipses are only possible when the two paths cross, which happens roughly twice a year." },
        { q: "What makes a total solar eclipse different from an annular solar eclipse?",
          a: "In a total eclipse, the Moon is close enough that its umbra reaches Earth's surface and it can completely cover the Sun's disk. In an annular eclipse, the Moon is a bit farther away and looks slightly too small to fully cover the Sun, so a bright ring of sunlight remains visible around it." },
        { q: "Why are lunar eclipses seen more often from any given location than solar eclipses?",
          a: "A lunar eclipse is visible from the entire night side of Earth at once, since it depends only on the Moon entering Earth's broad shadow. A total solar eclipse is visible only within the Moon's much narrower shadow path across Earth's surface, so far fewer places see any one eclipse." }
      ]
    }
  ];

  /* ------------------------------------------------------------------ GLOSSARY */
  CH.glossary = [
    { term: "Great circle", section: "4.1", def: "A circle on the surface of a sphere whose center is the sphere's own center — for example, Earth's equator or any meridian." },
    { term: "Meridian", section: "4.1", def: "A great circle on Earth or the celestial sphere that passes through both poles; the meridian through a place fixes its longitude." },
    { term: "Declination", section: "4.1", def: "The angular distance of an object north or south of the celestial equator — the sky's equivalent of latitude." },
    { term: "Right ascension", section: "4.1", def: "The angular distance of an object measured eastward along the celestial equator from the vernal equinox — the sky's equivalent of longitude, given in degrees or hours." },
    { term: "Vernal equinox", section: "4.1", def: "The point where the ecliptic crosses the celestial equator, moving north; the zero point for right ascension, and also the moment (around March 21) the Sun reaches that point." },
    { term: "Solar day", section: "4.3", def: "Earth's rotation period defined by the Sun's position in the sky — the time between successive passages of the Sun across the meridian." },
    { term: "Sidereal day", section: "4.3", def: "Earth's rotation period defined by the stars' positions — the time between successive passages of the same star across the meridian; about 4 minutes shorter than a solar day." },
    { term: "Apparent solar time", section: "4.3", def: "Time as measured by the actual position of the Sun in the sky — the time a sundial shows." },
    { term: "Mean solar time", section: "4.3", def: "Time based on the average length of the solar day over the year; unlike apparent solar time, it passes at a constant rate." },
    { term: "International Date Line", section: "4.3", def: "An arbitrary line near longitude 180° across which the calendar date changes by one day." },
    { term: "Leap year", section: "4.4", def: "A calendar year with one extra day added to keep the calendar in step with the true tropical year; every 4th year in the Julian calendar, with the century-year exception (divisible by 400) added by the Gregorian reform." },
    { term: "Phases of the Moon", section: "4.5", def: "The changing pattern of light and dark on the Moon as seen from Earth over its roughly monthly cycle, from new moon to full moon and back to new moon." },
    { term: "Sidereal month", section: "4.5", def: "The Moon's period of revolution around Earth measured with respect to the stars: 27.3217 days." },
    { term: "Solar month", section: "4.5", def: "The time interval over which the Moon's phases repeat, such as from one full moon to the next: 29.5306 days." },
    { term: "Synchronous rotation", section: "4.5", def: "The situation in which a body (such as the Moon) rotates on its axis in exactly the same time it takes to revolve around another body, so it always shows the same face." },
    { term: "Tides", section: "4.6", def: "The alternating rise and fall of sea level, caused by the difference in strength of the Moon's (and Sun's) gravitational pull on different parts of Earth." },
    { term: "Solar eclipse", section: "4.7", def: "An eclipse of the Sun by the Moon, caused by the Moon passing in front of the Sun; can occur only at new moon." },
    { term: "Lunar eclipse", section: "4.7", def: "An eclipse of the Moon, in which the Moon moves into Earth's shadow; can occur only at full moon." },
    { term: "Umbra", section: "4.7", def: "The dark, central part of a shadow, where light from the source is completely blocked." },
    { term: "Penumbra", section: "4.7", def: "The lighter, partial part of a shadow, where light from the source is only partly blocked." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "4.1", q: "A meridian on Earth is a great circle that passes through:",
      choices: ["Both the North and South Poles", "Only the equator", "Only the Prime Meridian", "The center of the celestial sphere"],
      answer: 0,
      whyWrong: [null, "The equator is itself a single great circle, not something every meridian passes through.", "There is only one Prime Meridian (Greenwich); every place has its own meridian.", "That describes the celestial sphere's setup, not what defines a terrestrial meridian."],
      explain: "Every meridian is a great circle running through both poles; the meridian through a place fixes its longitude." },
    { section: "4.1", q: "Right ascension on the celestial sphere is most like which terrestrial coordinate?",
      choices: ["Longitude", "Latitude", "Altitude", "Elevation"],
      answer: 0,
      whyWrong: [null, "Latitude corresponds to declination, not right ascension.", "Altitude describes height above the local horizon, an unrelated coordinate system.", "Elevation isn't a celestial coordinate at all."],
      explain: "Right ascension measures east–west position on the celestial sphere, just as longitude measures east–west position on Earth — except it is zeroed at the vernal equinox rather than at Greenwich." },
    { section: "4.1", q: "What did Foucault's 1851 pendulum experiment demonstrate?",
      choices: ["That Earth itself rotates", "That the Moon orbits Earth", "That the Sun is the center of the solar system", "That gravity weakens with distance"],
      answer: 0,
      whyWrong: [null, "The pendulum has nothing to do with the Moon's orbit.", "That question had already been settled by Copernicus and Galileo, long before 1851.", "The pendulum's swing has nothing to do with the strength of gravity over distance."],
      explain: "As Earth turned beneath the freely swinging pendulum, its plane of motion appeared to drift — direct, visible proof that Earth rotates." },
    { section: "4.2", q: "What actually causes Earth's seasons?",
      choices: ["The 23.5° tilt of Earth's rotation axis", "Earth's changing distance from the Sun", "The Moon's gravitational pull", "Sunspot activity"],
      answer: 0,
      whyWrong: [null, "Earth's Sun-distance varies only about 3% all year, and Earth is actually closest to the Sun during Northern Hemisphere winter — the opposite of what this idea predicts.", "The Moon's gravity raises tides, not seasons.", "Sunspot cycles run on an ~11-year timescale and don't drive the yearly cycle of seasons."],
      explain: "Earth's axis stays pointed the same direction in space all year, so each hemisphere alternates between leaning toward and away from the Sun — that lean, not distance, drives the seasons." },
    { section: "4.2", q: "In which month is Earth actually closest to the Sun?",
      choices: ["January", "June", "September", "It never changes"],
      answer: 0,
      whyWrong: [null, "June is close to the Northern Hemisphere's summer solstice, not perihelion.", "September is near an equinox, not Earth's closest approach.", "Earth's orbit is an ellipse, so the distance does change somewhat over the year."],
      explain: "Earth reaches its closest point to the Sun (perihelion) in January, during the middle of Northern Hemisphere winter — clear evidence distance isn't what drives the seasons." },
    { section: "4.2", q: "On the June solstice, what is true of the Arctic Circle (67° N)?",
      choices: ["It gets 24 hours of continuous sunlight", "It gets 24 hours of darkness", "It has exactly 12 hours of day and night", "The Sun passes through the zenith there"],
      answer: 0,
      whyWrong: [null, "24-hour darkness at the Arctic Circle happens on the December solstice, not the June solstice.", "12-hour day/night everywhere happens at the equinoxes.", "The Sun is at the zenith over the Tropic of Cancer (23° N) on this date, not the Arctic Circle."],
      explain: "The Arctic Circle, at 90° minus Earth's 23.5° tilt, is the southernmost latitude where the Sun stays above the horizon for a full 24 hours on the summer solstice." },
    { section: "4.2", q: "Why is late July or August usually hotter in the U.S. than the June solstice itself, even though the solstice has the most daylight?",
      choices: ["Land and water absorb and release heat slowly, so warming lags behind peak sunlight", "The Sun is actually closer to Earth in August", "Earth's tilt increases during the summer", "Cloud cover is always lowest in August"],
      answer: 0,
      whyWrong: [null, "Earth's distance from the Sun doesn't change enough, or in the right direction, to explain this.", "Earth's axial tilt is essentially fixed and does not change over the course of a year.", "Cloud cover isn't the reason for this seasonal lag."],
      explain: "Oceans and land soak up and release heat slowly, so the warmest weather trails the longest day by a month or more — the same reason a pond is warmest in late afternoon, not at sunrise." },
    { section: "4.3", q: "Why is a solar day about 4 minutes longer than a sidereal day?",
      choices: ["Earth's own orbital motion means it must rotate a bit extra to bring the Sun back overhead", "Earth's rotation is gradually slowing down", "The Moon's gravity distorts Earth's rotation", "Sidereal time is simply defined as 4 minutes shorter by convention"],
      answer: 0,
      whyWrong: [null, "Tidal slowing of Earth's rotation is real but far too tiny (0.002 second per century) to explain the 4-minute gap.", "The Moon's tidal pull is unrelated to this particular effect.", "It isn't an arbitrary convention — it follows directly from Earth's motion around the Sun."],
      explain: "Because Earth moves along its orbit each day, one full rotation relative to the stars doesn't quite bring the Sun back overhead — Earth needs to turn about 1/365 of a circle further, which takes about 4 extra minutes." },
    { section: "4.3", q: "What is the key difference between apparent solar time and mean solar time?",
      choices: ["Mean solar time advances at a constant rate; apparent solar time (sundial time) does not", "Apparent solar time uses a 25-hour day", "Mean solar time is based on the stars, not the Sun", "There is no real difference"],
      answer: 0,
      whyWrong: [null, "Both apparent and mean solar time use a day close to 24 hours, not 25.", "Mean solar time is still based on the Sun — its average behavior over the year — not on the stars.", "They do differ: apparent solar time varies through the year due to Earth's elliptical orbit and axial tilt."],
      explain: "Earth's elliptical orbit and tilted axis make the apparent (sundial) solar day vary slightly through the year; mean solar time averages this out into a steady 24-hour day, which ordinary clocks use." },
    { section: "4.3", q: "Crossing the International Date Line while traveling eastward, you should:",
      choices: ["Subtract a day from the calendar", "Add a day to the calendar", "Set your clock back 12 hours only", "Do nothing — the date line only matters for pilots"],
      answer: 0,
      whyWrong: [null, "Adding a day is what you do crossing westward, not eastward.", "The date line involves changing the date, not just adjusting the clock by a fixed number of hours.", "The date line matters for anyone crossing it, not just pilots."],
      explain: "Traveling east continually advances your local time; crossing the date line, you compensate by moving the calendar date back one day." },
    { section: "4.4", q: "Which three natural time units does a calendar try to reconcile?",
      choices: ["The day, the month, and the year", "The hour, the day, and the week", "The season, the month, and the decade", "The minute, the hour, and the day"],
      answer: 0,
      whyWrong: [null, "The hour and the week are useful units, but they aren't the natural astronomical periods (rotation, lunar cycle, revolution) that create the calendar's core difficulty.", "The season and decade aren't the fundamental units a calendar is built from.", "The minute isn't one of the calendar's fundamental natural units."],
      explain: "The day (Earth's rotation), the month (the Moon's cycle of phases), and the year (Earth's revolution around the Sun) are the three natural units — and none divides evenly into the others." },
    { section: "4.4", q: "Under the Julian calendar's rule, a leap year occurs:",
      choices: ["Every 4th year, adding one extra day", "Every 5th year, adding two extra days", "Only in century years", "Never — the Julian calendar had no leap years"],
      answer: 0,
      whyWrong: [null, "The Julian rule is a leap day every 4 years, not every 5.", "Century years get special treatment only under the later Gregorian reform, not the original Julian rule.", "The Julian calendar did include leap years — that was its whole method for approximating the true year length."],
      explain: "The Julian calendar added one extra day every fourth year, making the average year 365.25 days — close to, but not exactly, the true 365.2422-day tropical year." },
    { section: "4.4", q: "Why was the year 1900 NOT a leap year under the Gregorian calendar, even though it's divisible by 4?",
      choices: ["Century years are leap years only if divisible by 400, and 1900 isn't", "1900 was a typo that stuck", "The Gregorian calendar eliminated leap years entirely after 1582", "Leap years only happen in years divisible by 40"],
      answer: 0,
      whyWrong: [null, "It's a deliberate rule, not an error.", "The Gregorian calendar still uses leap years — it just refined the rule for century years.", "The actual rule for century years is divisibility by 400, not 40."],
      explain: "The Gregorian reform added a special exception: a century year is a leap year only if it's divisible by 400. Since 1900 ÷ 400 isn't a whole number, 1900 was not a leap year (but 2000 was)." },
    { section: "4.4", q: "What two changes made up the Gregorian calendar reform of 1582?",
      choices: ["Dropping 10 days from the calendar, and changing the century leap-year rule", "Adding a 13th month, and shortening the week to 5 days", "Switching to a purely lunar calendar", "Renaming all the months"],
      answer: 0,
      whyWrong: [null, "Neither of these changes was part of the Gregorian reform.", "The reform moved further from a lunar basis, not toward one.", "Renaming months wasn't part of Pope Gregory XIII's 1582 reform."],
      explain: "Pope Gregory XIII's reform dropped 10 days at once (October 4, 1582 was followed by October 15) to reset the date of the equinox, and revised the leap-year rule so century years are leap years only if divisible by 400." },
    { section: "4.5", q: "What actually causes the Moon's monthly cycle of phases?",
      choices: ["The changing angle between the Moon, Earth, and the Sun as the Moon orbits", "Earth's shadow periodically covering part of the Moon", "The Moon's own rotation exposing different hemispheres", "Clouds passing in front of the Moon"],
      answer: 0,
      whyWrong: [null, "Earth's shadow on the Moon causes a lunar eclipse, a separate and much rarer event.", "The Moon's synchronous rotation means we always see the same hemisphere — rotation isn't what produces the phases.", "Clouds are a local weather effect on Earth, unrelated to the Moon's actual phase."],
      explain: "The Moon is always half lit by the Sun; as its position relative to Earth and the Sun changes over the month, we see different amounts of that lit half." },
    { section: "4.5", q: "At full moon, when does the Moon rise and set?",
      choices: ["Rises at sunset, sets at sunrise", "Rises at sunrise, sets at sunset", "Rises at noon, sets at midnight", "It doesn't rise or set — it stays fixed overhead"],
      answer: 0,
      whyWrong: [null, "That description matches the Sun's own daily behavior, not the full moon's.", "That describes first quarter, not full moon.", "The Moon rises and sets every day just like the Sun, regardless of phase."],
      explain: "A full moon sits opposite the Sun in the sky, so it rises just as the Sun sets, stays up the entire night, and sets as the Sun rises." },
    { section: "4.5", q: "Why is the solar (synodic) month, 29.5306 days, longer than the sidereal month, 27.3217 days?",
      choices: ["Earth's own motion around the Sun means the Moon must travel a bit farther to realign with the Sun", "The Moon's orbit is slowing down over time", "Sidereal months are simply measured with a different unit of time", "The Moon's rotation period is longer than its orbital period"],
      answer: 0,
      whyWrong: [null, "The Moon's orbit isn't meaningfully slowing on human timescales in a way that would explain this fixed 2.2-day difference.", "Both months are measured in ordinary days — it's not a unit conversion issue.", "The Moon's rotation and orbital periods are equal — that's exactly what synchronous rotation means."],
      explain: "The sidereal month measures the Moon's orbit relative to the fixed stars. But because Earth is also orbiting the Sun, the Moon needs extra time beyond one sidereal orbit to catch back up to the same alignment with the Sun, stretching the full-moon-to-full-moon cycle to 29.5306 days." },
    { section: "4.5", q: "What is synchronous rotation, as shown by the Moon?",
      choices: ["Rotating on its axis in exactly the same time it takes to complete one orbit", "Rotating once per Earth day", "Not rotating at all", "Rotating in the opposite direction from its orbit"],
      answer: 0,
      whyWrong: [null, "The Moon's rotation period matches its ~27.3-day orbital period, not Earth's 24-hour day.", "The Moon does rotate — just at the same rate it orbits, which is why we always see the same face.", "Its rotation and orbit are in the same direction, not opposite."],
      explain: "The Moon spins once on its axis in exactly the time it takes to revolve once around Earth, which is why it always shows Earth the same face." },
    { section: "4.6", q: "What produces Earth's ocean tides?",
      choices: ["The Moon's (and Sun's) differential gravitational pull across Earth's size", "Wind blowing across the ocean surface", "The rotation of Earth alone, with no outside influence", "Ocean currents circulating heat from the equator"],
      answer: 0,
      whyWrong: [null, "Wind affects local wave conditions but is not the underlying cause of the twice-daily tidal cycle.", "Earth's rotation carries a location through the tidal bulges but does not by itself create them.", "Heat-driven ocean currents are a separate phenomenon from gravity-driven tides."],
      explain: "Because the Moon pulls harder on Earth's near side than its center, and harder on the center than the far side, this differential force stretches the oceans into two tidal bulges." },
    { section: "4.6", q: "Why does a coastal location typically experience two high tides and two low tides each day?",
      choices: ["Earth's rotation carries the location through two tidal bulges (near side and far side) every day", "The Moon orbits Earth twice per day", "The Sun and Moon switch positions twice daily", "Ocean water evaporates and refills twice a day"],
      answer: 0,
      whyWrong: [null, "The Moon takes about a month, not a day, to orbit Earth once.", "The Sun and Moon don't swap positions — Earth's rotation is what carries an observer through the fixed bulges.", "Evaporation and rainfall happen on much longer, unrelated timescales and don't drive the tidal cycle."],
      explain: "There are two tidal bulges at any moment — one facing the Moon, one facing away — and as Earth spins, a given coastline passes through both roughly every 24 hours, producing two highs and two lows." },
    { section: "4.6", q: "When do spring tides occur?",
      choices: ["At new moon and full moon, when the Sun and Moon are aligned", "Only during the spring season", "At first and third quarter moon", "Only during a lunar eclipse"],
      answer: 0,
      whyWrong: [null, "Despite the name, spring tides have nothing to do with the season — they can occur in any month.", "First and third quarter, when the Sun and Moon pull at right angles, produce smaller neap tides instead.", "Spring tides occur monthly, at new and full moon — a lunar eclipse is a separate, much rarer event that also only happens at full moon."],
      explain: "At new moon or full moon, the Sun and Moon line up and their tide-raising pulls reinforce each other, producing extra-large spring tides." },
    { section: "4.6", q: "According to George Darwin's work, what is happening to the Moon's distance from Earth over very long timescales?",
      choices: ["It is slowly increasing, confirmed at about 3.8 cm per year", "It is slowly decreasing", "It stays exactly constant", "It changes randomly with no clear pattern"],
      answer: 0,
      whyWrong: [null, "The Moon is moving away from Earth, not toward it.", "The distance is measurably changing, not constant — confirmed by reflectors left by Apollo 11 astronauts.", "The change is a small, steady, predictable outward drift, not a random one."],
      explain: "As tidal friction slows Earth's spin, conservation of angular momentum in the Earth–Moon system pushes the Moon into a slowly widening orbit — measured at about 3.8 centimeters per year using laser reflectors left on the Moon by Apollo 11." },
    { section: "4.7", q: "Why do the Sun and Moon appear almost the same size in Earth's sky?",
      choices: ["The Sun is about 400 times larger in diameter but also about 400 times farther away", "They are actually the same physical size", "The Moon is slowly growing to match the Sun's apparent size", "It's an optical illusion caused by Earth's atmosphere"],
      answer: 0,
      whyWrong: [null, "The Sun is vastly larger in actual diameter than the Moon — they only match in apparent, angular size.", "The Moon's apparent size does change slightly as its distance varies, but not because it's physically growing.", "This is a real coincidence of scale and distance, not an atmospheric illusion."],
      explain: "The Sun's roughly 400-times-larger diameter is offset by it being roughly 400 times farther away, so both bodies work out to almost the same angular size in our sky, about ½°." },
    { section: "4.7", q: "A solar eclipse can only happen at which phase of the Moon?",
      choices: ["New moon", "Full moon", "First quarter", "Third quarter"],
      answer: 0,
      whyWrong: [null, "Full moon is when a lunar eclipse can occur, not a solar eclipse.", "First quarter moon isn't aligned with the Sun and Earth in the way an eclipse requires.", "Third quarter moon also isn't aligned for an eclipse."],
      explain: "A solar eclipse requires the Moon to pass directly between Earth and the Sun, which only happens at new moon." },
    { section: "4.7", q: "Why doesn't an eclipse happen every single new moon and full moon?",
      choices: ["The Moon's orbit is tilted about 5° relative to Earth's orbital plane", "The Moon is usually too far away for its shadow to reach Earth", "Earth's atmosphere blocks most eclipses from occurring", "Eclipses actually do happen every month, but are rarely noticed"],
      answer: 0,
      whyWrong: [null, "Distance changes affect whether an eclipse is total or annular, but it's the orbital tilt that mostly prevents eclipses from happening at all.", "Earth's atmosphere doesn't prevent eclipse geometry from occurring.", "Eclipses genuinely don't occur most months — they're limited to specific alignment windows roughly twice a year."],
      explain: "Because the Moon's orbit is tilted about 5° from the plane of Earth's orbit, the Moon is usually above or below the Sun's path at new and full moon, missing an eclipse. Only when the orbital paths cross, near two 'eclipse seasons' a year, can an eclipse occur." },
    { section: "4.7", q: "What is the difference between the umbra and the penumbra of a shadow?",
      choices: ["The umbra fully blocks light; the penumbra only partly blocks it", "The umbra is the shadow's edge; the penumbra is its center", "The umbra only occurs during lunar eclipses; the penumbra only during solar eclipses", "There is no real difference — the terms are interchangeable"],
      answer: 0,
      whyWrong: [null, "It's the reverse: the umbra is the shadow's dark central cone, and the penumbra surrounds it.", "Both umbra and penumbra occur in both solar and lunar eclipse geometry.", "They describe genuinely different regions of a shadow, with different amounts of blocked light."],
      explain: "The umbra is the dark inner region of a shadow where the light source is completely hidden; the penumbra is the lighter surrounding region where the light source is only partly hidden." },
    { section: "4.7", q: "Why can a total lunar eclipse be safely viewed with the naked eye, while a partial solar eclipse cannot?",
      choices: ["A full moon's light is faint and safe to view; the uncovered Sun is always intensely bright and damaging", "Lunar eclipses only happen at night, so eye damage isn't possible after dark", "Solar eclipses emit dangerous radiation not present during lunar eclipses", "It's actually just as dangerous to view either kind of eclipse directly"],
      answer: 0,
      whyWrong: [null, "It's the intensity of the light source, not the time of day, that makes solar viewing dangerous.", "The danger from an uncovered Sun is ordinary intense sunlight, not some special added radiation.", "Only the Sun poses eye-damage risk when uncovered; the full moon itself is always safe to look at."],
      explain: "The full moon reflects only faint sunlight and is always safe to view. Any uncovered sliver of the Sun's disk during a partial solar eclipse remains intensely bright and can damage the eyes, exactly as looking at the ordinary uneclipsed Sun would." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[4] = CH;
})();
