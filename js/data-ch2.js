/* =============================================================================
   Astronomy 2e — Chapter 2: Observing the Sky: The Birth of Astronomy
   Study content. Text adapted from OpenStax "Astronomy 2e" (Chapter 2),
   licensed CC BY 4.0.  https://openstax.org/books/astronomy-2e
   Registers into window.ASTRO_CHAPTERS[2].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 2,
    chapterTitle: "Observing the Sky: The Birth of Astronomy",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/2-introduction"
  };

  // no chapter-specific interactive tools yet
  CH.tools = [];

  /* --------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "2.1",
      title: "The Sky Above",
      minutes: 8,
      html:
        '<p>Our senses suggest that Earth sits at the center of the universe, with the heavens turning ' +
        'around it. This <span class="term">geocentric</span> (Earth-centered) view seemed simple and ' +
        'self-evident, and almost everyone believed it until the European Renaissance. It is also wrong. ' +
        'Overthrowing it is one of the great themes of our intellectual history.</p>' +
        '<h4>The celestial sphere</h4>' +
        '<p>On a clear night far from city lights, the sky looks like a great hollow dome with you at the ' +
        'center and every star the same distance away on its surface. The point straight overhead is your ' +
        '<span class="term">zenith</span>; where the dome meets the ground is your ' +
        '<span class="term">horizon</span>. Stars rise in the east, arc across the dome, and set in the ' +
        'west. Watching night after night, you might conclude that the sky is a giant ' +
        '<span class="term">celestial sphere</span> turning around you &mdash; which is exactly what the ' +
        'early Greeks thought (some imagined a real crystal sphere with the stars set into it like jewels).</p>' +
        '<p>Today we know it is <strong>Earth that turns</strong>, once every 24 hours, on an ' +
        '<strong>axis</strong> through its North and South Poles. The stars are not on a dome at all but at ' +
        'wildly different distances. Still, the celestial sphere is a handy bookkeeping device. As it ' +
        '&ldquo;turns,&rdquo; star patterns keep their shapes (the Big Dipper looks the same all night), and ' +
        'even the planets seem fixed against the stars over a single night. Only ' +
        '<strong>meteors</strong> &mdash; brief &ldquo;shooting stars,&rdquo; actually bits of cosmic dust ' +
        'burning up in the atmosphere &mdash; move noticeably.</p>' +
        '<h4>Celestial poles and celestial equator</h4>' +
        '<p>Extend Earth&rsquo;s axis outward and the points where it pierces the sky are the ' +
        '<span class="term">north celestial pole</span> and <span class="term">south celestial pole</span>; ' +
        'the sky appears to pivot around them. Throw Earth&rsquo;s equator onto the sky and you get the ' +
        '<span class="term">celestial equator</span>, halfway between the poles.</p>' +
        '<p>What you see depends on your <strong>latitude</strong>:</p>' +
        '<ul>' +
        '<li><strong>At the North Pole:</strong> the north celestial pole is at your zenith, the celestial ' +
        'equator lies on your horizon, and every star simply circles the pole &mdash; nothing rises or sets. ' +
        'You only ever see the northern half of the sky.</li>' +
        '<li><strong>At the equator:</strong> the celestial equator passes through your zenith, the celestial ' +
        'poles sit on your north and south horizon, and all stars rise straight up in the east and set ' +
        'straight down in the west, each spending half its time above the horizon.</li>' +
        '<li><strong>In between (the US or Europe):</strong> the north celestial pole stands above the ' +
        'northern horizon at an <strong>altitude equal to your latitude</strong>. In San Francisco (38&deg; N) ' +
        'it is 38&deg; up.</li>' +
        '</ul>' +
        '<div data-diagram="sky-latitude"></div>' +
        '<p>For that 38&deg; observer, stars within 38&deg; of the north celestial pole never set &mdash; the ' +
        '<span class="term">north circumpolar zone</span> (the Big and Little Dippers, Cassiopeia). Stars ' +
        'within 38&deg; of the south celestial pole never rise (the south circumpolar zone). Right now a ' +
        'star called <span class="term">Polaris</span> sits very close to the north celestial pole, so it ' +
        'barely moves as the sky turns.</p>' +
        '<p class="callout-inline"><strong>Angles in the sky.</strong> A full circle is 360&deg;; the dome ' +
        'of the sky spans 180&deg; from horizon to opposite horizon. The full Moon is about 0.5&deg; ' +
        'across &mdash; roughly the width of your pinkie at arm&rsquo;s length.</p>' +
        '<h4>The Sun and the ecliptic</h4>' +
        '<p>The stars are still up there in daytime, hidden by scattered sunlight. The Sun also sits at ' +
        'some point on the celestial sphere &mdash; and it drifts about <strong>1&deg; east per day</strong> ' +
        'relative to the stars, taking one year to circle all the way around. (Really Earth orbits the Sun, ' +
        'but the effect is the same.) That yearly path is the <span class="term">ecliptic</span>. Because of ' +
        'this drift, the Sun rises about 4 minutes later each day with respect to the stars.</p>' +
        '<p>The ecliptic is tilted about <strong>23.5&deg;</strong> to the celestial equator, because ' +
        'Earth&rsquo;s rotation axis is tilted about 23.5&deg; from straight up out of its orbit. That tilt ' +
        'is why the Sun climbs high in summer and stays low in winter &mdash; the cause of the seasons.</p>' +
        '<div data-diagram="seasons"></div>' +
        '<h4>Fixed stars and wandering stars</h4>' +
        '<p>The Moon and the naked-eye planets (Mercury, Venus, Mars, Jupiter, Saturn, and barely Uranus) ' +
        'also drift among the stars, on top of the daily turning of the sky. The Greeks split the sky into ' +
        'the <strong>fixed stars</strong>, which hold their patterns for generations, and the ' +
        '<strong>wandering stars</strong>, or <span class="term">planets</span> &mdash; &ldquo;planet&rdquo; ' +
        'is Greek for &ldquo;wanderer.&rdquo; The ancients counted seven wanderers (Sun, Moon, five planets) ' +
        'and gave us the seven-day week. The Moon is fastest, lapping the sky in about a month, moving ' +
        'roughly 12&deg; per day.</p>' +
        '<p>All of these bodies stay near the ecliptic, because their orbits share nearly one plane. They ' +
        'are always found within an 18&deg;-wide belt centered on the ecliptic called the ' +
        '<span class="term">zodiac</span> (&ldquo;zodiac&rdquo; shares a root with &ldquo;zoo&rdquo; &mdash; ' +
        'a circle of animals).</p>' +
        '<h4>Constellations</h4>' +
        '<p>Under an ideal dark sky you can see about 3000 stars. Every culture grouped them into patterns; ' +
        'you probably know the Big Dipper and Orion. In the early 20th century astronomers made it formal. ' +
        'Today a <span class="term">constellation</span> is one of <strong>88 sectors</strong> that divide ' +
        'up the whole sky, with imaginary north&ndash;south and east&ndash;west boundaries, so every point ' +
        'of sky falls in exactly one (like US states &mdash; and, like states, not all the same size). A ' +
        'noticeable star pattern within or across constellations is an <span class="term">asterism</span> ' +
        '(the Big Dipper is an asterism in Ursa Major). The figures rarely look like their namesakes; the ' +
        'Greeks named sky regions after mythological characters and fit the stars to them as best they could.</p>',
      keyIdeas: [
        "The sky looks like a rotating celestial sphere; really Earth turns on its axis once every 24 hours. Zenith = overhead; horizon = where sky meets ground.",
        "Extending Earth's poles and equator into the sky gives the celestial poles and celestial equator; the sky appears to pivot around the celestial poles.",
        "What you see depends on latitude: the north celestial pole sits above the northern horizon at an altitude equal to your latitude, and nearby stars are circumpolar (never set).",
        "The Sun drifts ~1° east per day against the stars, tracing the ecliptic over a year; the ecliptic is tilted 23.5° to the celestial equator (Earth's axial tilt), which drives the seasons.",
        "The Moon and planets (\"wanderers\") also drift among the fixed stars, staying within the ~18°-wide zodiac band around the ecliptic.",
        "A modern constellation is one of 88 sectors that tile the entire sky — not just a picture made of stars."
      ],
      selfCheck: [
        { q: "At latitude 40° N, how high is the north celestial pole, and what does “circumpolar” mean?",
          a: "About 40° above the northern horizon. Circumpolar stars lie within 40° of that pole and never set — they circle it all night, every night." },
        { q: "What is the ecliptic, and why is it tilted relative to the celestial equator?",
          a: "The Sun's apparent yearly path around the celestial sphere. It is tilted about 23.5° because Earth's rotation axis is tilted about 23.5° from perpendicular to its orbit." },
        { q: "In modern usage, what is a constellation?",
          a: "One of the 88 sectors that completely divide up the sky (every point of sky is in exactly one) — not merely a star picture." },
        { q: "Why did the ancient Greeks call the planets “wanderers”?",
          a: "Unlike the fixed stars, the planets slowly change position among the star patterns from night to night." }
      ]
    },
    {
      id: "2.2",
      title: "Ancient Astronomy",
      minutes: 9,
      html:
        '<h4>Astronomy around the world</h4>' +
        '<p>Long before the Greeks, many cultures watched the sky for calendars and navigation. Babylonian, ' +
        'Assyrian, and Egyptian astronomers knew the year&rsquo;s length; the Egyptians of 3000 years ago ' +
        'used a 365-day calendar and tracked the predawn rising of the star <strong>Sirius</strong>, which ' +
        'signaled the Nile flood. Chinese astronomers kept a calendar and recorded comets, meteors, ' +
        'sunspots, and &ldquo;guest stars&rdquo; (exploding stars) &mdash; records still used today. The Maya ' +
        'built a calendar around the planet Venus. Polynesian navigators crossed open ocean by the stars. ' +
        'In Britain, stone circles such as Stonehenge (from about 2800 BCE) tracked the Sun and Moon.</p>' +
        '<h4>Greek cosmology and a spherical Earth</h4>' +
        '<p>Our picture of the structure and origin of the universe is called <span class="term">cosmology' +
        '</span>. At least 2000 years before Columbus, educated people around the eastern Mediterranean ' +
        'knew Earth is round &mdash; an idea perhaps going back to <strong>Pythagoras</strong>, who prized ' +
        'the sphere as a &ldquo;perfect&rdquo; form.</p>' +
        '<p><strong>Aristotle</strong> (384&ndash;322 BCE) gave two solid arguments that Earth is a sphere: ' +
        '(1) during a <span class="term">lunar eclipse</span>, Earth&rsquo;s shadow on the Moon is always a ' +
        'round arc, and only a sphere always casts a round shadow; (2) travelers heading south see new ' +
        'stars, and the North Star sinks toward the horizon &mdash; impossible on a flat Earth. Aristotle ' +
        'also knew the Sun is farther than the Moon, because the Moon can pass in front of the Sun in a ' +
        '<span class="term">solar eclipse</span>.</p>' +
        '<p><strong>Aristarchus of Samos</strong> (310&ndash;230 BCE) proposed that Earth moves around the ' +
        'Sun, but the Greeks rejected it. Their main objection was <span class="term">parallax</span>: if ' +
        'Earth orbited the Sun, nearby stars should shift against distant ones over the year, the way ' +
        'trackside trees shift against far hills as your train moves. This yearly shift is ' +
        '<span class="term">stellar parallax</span>. The Greeks searched hard and saw none &mdash; so either ' +
        'Earth stands still, or the stars are unimaginably far away. They chose a motionless Earth, and that ' +
        'view ruled Western thought for nearly two millennia.</p>' +
        '<h4>Eratosthenes measures the Earth</h4>' +
        '<p>Around 200 BCE, <span class="term">Eratosthenes</span> (276&ndash;194 BCE), working in ' +
        'Alexandria, measured Earth&rsquo;s size with sunlight and geometry. The Sun is so far that its rays ' +
        'arrive essentially <strong>parallel</strong>. On the first day of summer, sunlight reached the ' +
        'bottom of a vertical well at <strong>Syene</strong> &mdash; the Sun was straight overhead. At the ' +
        'same moment in <strong>Alexandria</strong>, the Sun was about <strong>7&deg;</strong> (1/50 of a ' +
        'circle) from vertical. Since the rays are parallel, that 7&deg; comes entirely from Earth&rsquo;s ' +
        'curvature, so Alexandria is 1/50 of the way around the planet from Syene. The two cities are about ' +
        '5000 stadia apart, giving a circumference of 250,000 stadia &mdash; within roughly 1&ndash;20% of ' +
        'the true 40,000 km, depending on which &ldquo;stadium&rdquo; he used. A stunning result from ' +
        'shadows, sunlight, and thought alone.</p>' +
        '<div data-diagram="eratosthenes"></div>' +
        '<h4>Hipparchus and precession</h4>' +
        '<p><span class="term">Hipparchus</span> (observatory on Rhodes, about 150 BCE) was the greatest ' +
        'astronomer of antiquity. He compiled a star catalog of about 850 stars with celestial coordinates, ' +
        'and ranked stars by <span class="term">apparent magnitude</span> &mdash; brightest = &ldquo;first ' +
        'magnitude,&rdquo; fainter = larger numbers &mdash; a scheme still used in modified form. Comparing ' +
        'his measurements with older ones, he discovered <span class="term">precession</span>: the north ' +
        'celestial pole slowly and steadily shifts, which means <strong>Earth&rsquo;s axis itself wobbles</strong>, ' +
        'like a spinning top. The Sun and Moon tug on Earth&rsquo;s equatorial bulge, and one full wobble ' +
        'takes about <strong>26,000 years</strong>. Polaris is the pole star now; about 5000 years ago it ' +
        'was Thuban, and in about 14,000 years it will be Vega.</p>' +
        '<h4>Ptolemy&rsquo;s model</h4>' +
        '<p><span class="term">Ptolemy</span> (about 140 CE, Alexandria) wrote the <em>Almagest</em> ' +
        '(&ldquo;The Greatest&rdquo;), our chief source on Greek astronomy. His achievement was a geometric ' +
        'model that predicted planet positions for any date.</p>' +
        '<p>The hard part is that a planet&rsquo;s wandering in the sky combines its own motion with ' +
        'Earth&rsquo;s orbital motion &mdash; like watching a race while driving in it. ' +
        '<span class="term">Retrograde motion</span> is the temporary apparent <strong>westward</strong> ' +
        'drift of a planet (planets normally drift east) when the faster Earth passes it. Simple for us, who ' +
        'know Earth moves; very hard for Ptolemy, who assumed a fixed Earth and, like all Greeks, insisted ' +
        'on <strong>circles only</strong>.</p>' +
        '<div data-diagram="retrograde"></div>' +
        '<p>His solution: each planet rides a small circle, the <span class="term">epicycle</span>, whose ' +
        'center rides a big circle, the <span class="term">deferent</span>, around Earth. Tuning the sizes ' +
        'and speeds reproduces retrograde motion. He also had to offset the deferent centers from Earth and ' +
        'add motion about another point, the <span class="term">equant</span> &mdash; dozens of circles in ' +
        'all. It was a mathematical triumph that stood for more than a thousand years.</p>' +
        '<div data-diagram="epicycle"></div>',
      keyIdeas: [
        "Many cultures (Babylonian, Egyptian, Chinese, Maya, Polynesian, Britain's stone circles) tracked the sky for calendars and navigation long before the Greeks.",
        "The Greeks knew Earth is a sphere: its shadow on the Moon is always round, and the visible stars change with latitude.",
        "Eratosthenes measured Earth's circumference from the different angles of the noon Sun at Syene and Alexandria.",
        "The Greeks rejected a moving Earth because they could not detect stellar parallax — the stars were simply too far away for the shift to be seen.",
        "Hipparchus built a star catalog, defined the magnitude scale, and discovered precession — Earth's axis wobbles over ~26,000 years, so the pole star changes.",
        "Ptolemy's geocentric model used epicycles on deferents to reproduce retrograde motion; it predicted planet positions well and was authoritative for over a thousand years."
      ],
      selfCheck: [
        { q: "What single eclipse observation shows that Earth is a sphere?",
          a: "During a lunar eclipse, Earth's shadow on the Moon is always a circular arc — and only a sphere always casts a round shadow." },
        { q: "What did Eratosthenes measure, and what did he calculate from it?",
          a: "He measured the angle of the noon Sun from vertical at Alexandria (about 7°) while it was straight overhead at Syene. Because sunlight arrives parallel, that 7° is 1/50 of a circle, so the Syene–Alexandria distance is 1/50 of Earth's circumference." },
        { q: "Why did the failure to see stellar parallax convince the Greeks that Earth stands still?",
          a: "If Earth orbited the Sun, nearby stars should shift against distant ones over the year. They saw no shift and would not accept that the stars were far enough away to hide it, so they concluded Earth does not move." },
        { q: "What is retrograde motion, and how did Ptolemy reproduce it with a motionless Earth?",
          a: "The temporary apparent westward drift of a planet against the stars. Ptolemy put each planet on a small circle (epicycle) whose center rode a larger circle (deferent) around Earth." }
      ]
    },
    {
      id: "2.3",
      title: "Astrology and Astronomy",
      minutes: 6,
      html:
        '<p>Many ancient cultures saw the planets and stars as gods or supernatural forces that steered ' +
        'human life, so reading the sky meant reading the gods&rsquo; intentions. The seven ' +
        '&ldquo;wanderers&rdquo; seemed especially important, and most cultures named the planets after gods ' +
        'and credited them with those gods&rsquo; powers. From this grew <span class="term">astrology</span>: ' +
        'the belief that the positions of the Sun, Moon, and planets among the ' +
        '<span class="term">zodiac</span> stars hold the key to life.</p>' +
        '<h4>Where astrology came from</h4>' +
        '<p>Astrology began in <strong>Babylonia</strong> about 2500 years ago, where the planets were ' +
        'thought to sway the fortunes of kings and nations. Through the Greeks it spread across the Western ' +
        'world and into Asia. By the 2nd century BCE the Greeks made it <strong>personal</strong>: the ' +
        'arrangement of the sky at the <strong>moment of birth</strong> was said to shape a ' +
        'person&rsquo;s character and fate &mdash; <span class="term">natal astrology</span>. It peaked with ' +
        '<strong>Ptolemy</strong>, whose <em>Tetrabiblos</em> is still the &ldquo;bible&rdquo; of the ' +
        'subject. Modern astrology is essentially this ancient religion.</p>' +
        '<h4>The horoscope</h4>' +
        '<p>A <span class="term">horoscope</span> is a chart of where the Sun, Moon, and planets were in ' +
        'the sky at someone&rsquo;s birth (the word means &ldquo;marker of the hour&rdquo;). Astrology ' +
        'divides the zodiac into <strong>12 signs of 30&deg; each</strong>, named after the constellation ' +
        'each one contained when the system was set up. Your &ldquo;sign&rdquo; is your ' +
        '<strong>sun sign</strong> &mdash; the sign the Sun was in when you were born.</p>' +
        '<p>But more than 2000 years of <span class="term">precession</span> have slid the constellations ' +
        'about <strong>one whole sign westward</strong> along the ecliptic. So the astrological signs and ' +
        'the real constellations are now out of step: the sign Aries currently sits over the constellation ' +
        'Pisces. The &ldquo;sun sign&rdquo; in a newspaper is no longer the constellation the Sun was ' +
        'actually in on your birthday.</p>' +
        '<div data-diagram="precession"></div>' +
        '<h4>Why astrology is not science</h4>' +
        '<p>There is <strong>no known force</strong> &mdash; gravity or anything else &mdash; by which the ' +
        'sky&rsquo;s arrangement at your birth could shape your personality or future. (The delivering ' +
        'doctor&rsquo;s gravitational pull on a newborn is larger than that of Mars.) Astrologers must ' +
        'appeal to unknown forces that depend on configuration rather than distance, for which there is no ' +
        'evidence. It is also odd that astrology fixes on birth rather than conception or genetics.</p>' +
        '<p>Astrology has been <strong>tested</strong> hundreds of times &mdash; comparing birth signs with ' +
        'Olympic medals, corporate salaries, elected office, military rank, even U.S. Marine reenlistment. ' +
        'Every test finds birth signs distributed <strong>randomly</strong>, with no predictive power, even ' +
        'statistically. Studies using full horoscopes are also negative.</p>' +
        '<p>So why do readings feel accurate? Because vague statements phrased as if written personally feel ' +
        'true to almost anyone. In one study, a mass murderer&rsquo;s horoscope was sent to 150 people as a ' +
        'personal reading and 94% recognized themselves; in another, subjects accepted ' +
        '<strong>reversed</strong> readings just as often (95%). Astrology has no basis in scientific ' +
        'fact &mdash; at best it is a <span class="term">pseudoscience</span>. Its lasting gift was ' +
        'motivating people to learn the cycles of the sky, and from it grew the science of astronomy.</p>',
      keyIdeas: [
        "Astrology — the belief that the positions of the Sun, Moon, and planets in the zodiac govern human affairs — began in Babylonia and peaked with Ptolemy's Tetrabiblos.",
        "Natal astrology claims the sky at your birth sets your personality and fate; a horoscope charts those positions. The zodiac is split into 12 signs of 30° each.",
        "Because of precession, the signs no longer line up with the constellations they were named for — your newspaper \"sun sign\" isn't the constellation the Sun was really in.",
        "Astrology fails as science: there is no plausible force, and hundreds of statistical tests show birth signs are distributed randomly with no predictive power.",
        "Vague, \"personalized\" readings feel accurate no matter what they say — people even accept reversed readings — which makes astrology a pseudoscience."
      ],
      selfCheck: [
        { q: "What does a horoscope chart, and what is natal astrology's core claim?",
          a: "The positions of the Sun, Moon, and planets in the zodiac at the moment (and place) of a person's birth. Natal astrology claims those positions determine personality and fortune." },
        { q: "How does precession undercut newspaper “sun signs”?",
          a: "Over ~2000 years the constellations have slid about one sign west along the ecliptic, so the sign named for your birthday is no longer the constellation the Sun actually occupied then." },
        { q: "Give one scientific reason astrology does not hold up.",
          a: "There is no known force by which the sky's configuration at birth could affect a person (the delivering doctor's gravity outweighs Mars's), and statistical tests find birth signs randomly distributed among successful people." },
        { q: "Why do people say a vague reading “really fit” them?",
          a: "Vague statements presented as if written personally feel accurate to almost anyone — subjects even accept readings that have been reversed." }
      ]
    },
    {
      id: "2.4",
      title: "The Birth of Modern Astronomy",
      minutes: 9,
      html:
        '<p>Medieval Europe made little astronomical progress. Islamic and Jewish scholars preserved, ' +
        'translated, and extended Greek astronomy (many star names, and the word &ldquo;zenith,&rdquo; are ' +
        'Arabic). As trade reopened, texts like the <em>Almagest</em> returned to Europe, and the ' +
        'astronomical rebirth &mdash; the &ldquo;renaissance&rdquo; &mdash; began with Copernicus.</p>' +
        '<h4>Copernicus</h4>' +
        '<p><span class="term">Copernicus</span> (Nicolaus Copernicus, 1473&ndash;1543), a Polish cleric ' +
        'trained in law and medicine, reappraised planetary theory and built a Sun-centered, or ' +
        '<span class="term">heliocentric</span>, model: <strong>Earth is a planet</strong>, all the planets ' +
        'circle the Sun, and only the Moon orbits Earth. He published it in <em>De Revolutionibus Orbium ' +
        'Coelestium</em> in 1543, the year he died.</p>' +
        '<p>He kept some old assumptions (motions built from uniform circular motions) but dropped Earth ' +
        'from the center. To the objection that we would <em>feel</em> a moving Earth, he answered that a ' +
        'moving observer need not sense the motion &mdash; like seeing an adjacent train appear to move. ' +
        'The Sun&rsquo;s yearly path is equally well explained by Earth orbiting the Sun; the daily turning ' +
        'of the sky by Earth rotating. And if spinning would tear Earth apart, the far faster spin the ' +
        'geocentric view demands of the huge celestial sphere would be worse.</p>' +
        '<h4>The heliocentric model</h4>' +
        '<p>Copernicus put the six then-known planets in the correct order out from the Sun &mdash; Mercury, ' +
        'Venus, Earth, Mars, Jupiter, Saturn &mdash; with nearer planets moving faster. This explained ' +
        '<strong>retrograde motion with no epicycles</strong> (Earth simply overtakes a slower outer ' +
        'planet) and gave a roughly correct scale for the solar system.</p>' +
        '<p>He could not <em>prove</em> it &mdash; an adjusted Ptolemaic model could also fit the data &mdash; ' +
        'but his system was simpler and more symmetric. In his day, few thought experiments could settle ' +
        'such questions: the tradition held that pure thought plus revelation, not the senses, revealed ' +
        'truth. So heliocentrism was debated for over 50 years with no tests applied.</p>' +
        '<p>Deciding between two models needs a prediction on which they <strong>disagree</strong>. One ' +
        'example: if <strong>Venus circles the Sun</strong>, it must run through the full cycle of phases ' +
        'like the Moon; if it circles Earth, it cannot. Before the telescope, no one could check.</p>' +
        '<h4>Galileo and experimental science</h4>' +
        '<p><span class="term">Galileo</span> (Galileo Galilei, 1564&ndash;1642) pioneered observation, ' +
        'experiment, and quantitative measurement. In <strong>mechanics</strong> he overturned the old idea ' +
        'that rest is matter&rsquo;s natural state: a sliding object stops only because of friction, and on ' +
        'ever-smoother surfaces it travels farther. With no resistance it would move steadily forever. A ' +
        '<span class="term">force</span> is needed to <strong>start, stop, speed up, slow down, or turn</strong> ' +
        'an object &mdash; not to keep it moving. He also showed that falling and rolling objects ' +
        '<span class="term">accelerate</span> uniformly (equal speed gains in equal times), and wrote it in ' +
        'precise mathematics. (In 1971, Apollo 15 dropped a hammer and a feather on the airless Moon; they ' +
        'landed together.)</p>' +
        '<h4>Galileo&rsquo;s telescope</h4>' +
        '<p>The first noticed &ldquo;spyglasses&rdquo; were made by <strong>Hans Lippershey</strong> in ' +
        '1608. Galileo built his own (3&times;), then 8&ndash;9&times; (which won him a doubled salary and ' +
        'tenure in Venice), and eventually 30&times;. Turning it on the sky from late 1609, he found:</p>' +
        '<ul>' +
        '<li>The <strong>Milky Way</strong> and hazy patches resolve into countless individual stars too ' +
        'faint for the eye.</li>' +
        '<li><strong>Four moons orbiting Jupiter</strong> &mdash; proof that not everything circles Earth, ' +
        'and that a moving body can carry its moons along (answering a standard objection to a moving Earth).</li>' +
        '<li>The <strong>phases of Venus</strong> &mdash; Venus shows the full cycle of phases, so it must ' +
        'orbit the Sun. Ptolemy&rsquo;s model predicts the wrong phases in the wrong order.</li>' +
        '<li>The <strong>Moon</strong> has craters, mountains, and dark plains &mdash; a world somewhat ' +
        'like Earth.</li>' +
        '</ul>' +
        '<div data-diagram="venus-phases"></div>' +
        '<p>Galileo&rsquo;s evidence tipped the balance to the Copernican view. The Church made an example ' +
        'of him: tried by the <strong>Inquisition</strong> in 1633 and condemned to house arrest, with his ' +
        'books banned until 1836. Only in 1992 did the Catholic Church publicly admit it had erred. The ' +
        'Copernican&ndash;Galilean revolution left us with a vast universe in which Earth &mdash; and ' +
        'humanity &mdash; is not the center.</p>',
      keyIdeas: [
        "Copernicus revived the heliocentric model in De Revolutionibus (1543): Earth is a planet and the planets circle the Sun (only the Moon orbits Earth). It explained retrograde motion without epicycles but could not be proven at the time.",
        "Choosing between two models needs a prediction they disagree on — e.g. if Venus orbits the Sun it must show the full cycle of phases.",
        "Galileo founded experimental physics: rest is not more natural than motion, a force changes motion rather than maintaining it, and falling objects accelerate uniformly.",
        "With the telescope (from 1609) Galileo found the Milky Way is countless stars, four moons of Jupiter (not everything orbits Earth), the phases of Venus (it orbits the Sun), and a cratered, mountainous Moon.",
        "Galileo's evidence tipped the balance to the Copernican view; the Church tried him and banned his books, admitting its error only in 1992."
      ],
      selfCheck: [
        { q: "What was Copernicus's central idea, and what did it explain more simply than Ptolemy?",
          a: "That the Sun, not Earth, is the center — Earth is just another planet orbiting it. This produced retrograde motion naturally, with no epicycles, and gave a roughly correct scale for the solar system." },
        { q: "Why are the phases of Venus decisive between the two models?",
          a: "If Venus orbits the Sun it must run through the full set of phases (including nearly \"full\" on the far side); if it orbits Earth between us and the Sun, it cannot. Galileo saw the full cycle." },
        { q: "State Galileo's key result about motion.",
          a: "Rest is not the natural state of matter. A moving object keeps moving on its own; a force is required to start, stop, speed up, slow down, or turn it." },
        { q: "Name two things Galileo discovered with his telescope and why each mattered.",
          a: "Four moons of Jupiter (not everything orbits Earth) and the phases of Venus (Venus orbits the Sun). He also found the Milky Way is countless stars and the Moon is a cratered world." }
      ]
    }
  ];

  /* --------------------------------------------------------------- GLOSSARY */
  CH.glossary = [
    { term: "Geocentric", section: "2.1", def: "Centered on Earth; the model in which the Sun, Moon, planets, and stars all revolve around a stationary Earth." },
    { term: "Celestial sphere", section: "2.1", def: "The apparent sphere of the sky — a sphere of large radius centered on the observer — on which the positions of objects can be marked." },
    { term: "Zenith", section: "2.1", def: "The point on the celestial sphere directly above the observer (opposite the direction of gravity)." },
    { term: "Horizon", section: "2.1", def: "The great circle on the celestial sphere 90° from the zenith; popularly, the circle where the dome of the sky meets the ground." },
    { term: "Celestial poles", section: "2.1", def: "The two points where Earth's rotation axis, extended, meets the celestial sphere; the sky appears to rotate around them." },
    { term: "Celestial equator", section: "2.1", def: "A great circle on the celestial sphere, halfway between the celestial poles, where the plane of Earth's equator meets the sky." },
    { term: "Circumpolar zone", section: "2.1", def: "The region of sky near a celestial pole whose stars are always above (or always below) the horizon for a given observer, so they never rise or set." },
    { term: "Polaris", section: "2.1", def: "The pole star — the star that currently lies very close to the north celestial pole and so barely moves as the sky turns." },
    { term: "Ecliptic", section: "2.1", def: "The Sun's apparent path around the celestial sphere over one year; it is tilted about 23.5° to the celestial equator." },
    { term: "Zodiac", section: "2.1", def: "A belt around the sky about 18° wide, centered on the ecliptic, within which the Moon and planets are always found." },
    { term: "Planet", section: "2.1", def: "Today, a large body orbiting the Sun (or a similar body orbiting another star); to the ancients, any of the seven objects that moved among the fixed stars. The word is Greek for “wanderer.”" },
    { term: "Constellation", section: "2.1", def: "In modern astronomy, one of the 88 sectors into which the whole sky is divided, so that every point of sky lies in exactly one." },
    { term: "Asterism", section: "2.1", def: "A noticeable star pattern within a constellation, or spanning several (for example, the Big Dipper within Ursa Major)." },
    { term: "Cosmology", section: "2.2", def: "The study of the organization, origin, and evolution of the universe." },
    { term: "Lunar eclipse", section: "2.2", def: "An event in which the Moon passes into Earth's shadow; the shadow's edge on the Moon is always a round arc — evidence that Earth is a sphere." },
    { term: "Solar eclipse", section: "2.2", def: "An event in which the Moon passes between Earth and the Sun, briefly hiding the Sun; shows the Moon is nearer than the Sun." },
    { term: "Parallax", section: "2.2", def: "The apparent shift in the direction of an object caused by a change in the observer's position." },
    { term: "Stellar parallax", section: "2.2", def: "The tiny yearly back-and-forth shift of a nearby star against distant stars, caused by Earth's orbital motion; the Greeks could not detect it." },
    { term: "Eratosthenes", section: "2.2", def: "Greek scholar in Alexandria (276–194 BCE) who measured Earth's circumference from the different angles of the noon Sun at Syene and Alexandria." },
    { term: "Apparent magnitude", section: "2.2", def: "A measure of how bright a star looks from Earth; smaller numbers mean brighter stars. The scale traces back to Hipparchus." },
    { term: "Hipparchus", section: "2.2", def: "Greatest astronomer of antiquity (about 150 BCE); built a star catalog, defined the magnitude scale, and discovered precession." },
    { term: "Precession", section: "2.2", def: "The slow, cone-shaped wobble of Earth's rotation axis, caused mainly by the Sun's and Moon's pull on Earth's equatorial bulge; one cycle takes about 26,000 years." },
    { term: "Retrograde motion", section: "2.2", def: "The temporary apparent westward drift of a planet against the background stars, seen when the faster-moving Earth passes it." },
    { term: "Almagest", section: "2.2", def: "Ptolemy's great compendium of Greek astronomy (about 140 CE); our main surviving source on Hipparchus and earlier Greek work." },
    { term: "Epicycle", section: "2.2", def: "In Ptolemy's system, the small circle on which a planet moves; the center of the epicycle itself moves around a larger circle." },
    { term: "Deferent", section: "2.2", def: "In Ptolemy's system, the large circle around Earth on which the center of a planet's epicycle travels." },
    { term: "Equant", section: "2.2", def: "An offset point, not at Earth, about which Ptolemy required uniform circular motion in order to match the observed planet motions." },
    { term: "Astrology", section: "2.3", def: "The pseudoscience that the positions of the Sun, Moon, and planets among the zodiac stars influence human character and destiny." },
    { term: "Horoscope", section: "2.3", def: "A chart showing where the Sun, Moon, and planets were in the zodiac at a given moment and place — usually a person's birth." },
    { term: "Natal astrology", section: "2.3", def: "The branch of astrology holding that the sky's configuration at the moment of birth shapes a person's personality and fortune." },
    { term: "Pseudoscience", section: "2.3", def: "A belief system that presents itself as science but lacks testable, evidence-based support — astrology is the classic example." },
    { term: "Heliocentric", section: "2.4", def: "Centered on the Sun; the model in which Earth is a planet and all the planets orbit the Sun." },
    { term: "Copernicus", section: "2.4", def: "Nicolaus Copernicus (1473–1543), who revived the heliocentric model in De Revolutionibus (1543)." },
    { term: "Galileo", section: "2.4", def: "Galileo Galilei (1564–1642), founder of experimental physics and telescopic astronomy; his observations tipped the balance toward the Copernican model." },
    { term: "Force", section: "2.4", def: "An influence that changes an object's motion — starting it, stopping it, speeding it up, slowing it down, or turning it. Motion itself needs no force to continue." },
    { term: "Accelerate", section: "2.4", def: "To change velocity — to speed up, slow down, or change direction." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "2.1", q: "The zenith is:",
      choices: ["The point on the sky directly above the observer", "The point due north on the horizon", "The place on the horizon where the Sun rises", "The north celestial pole"],
      answer: 0, explain: "“Zenith” always means straight up from wherever you are standing." },
    { section: "2.1", q: "The celestial poles are:",
      choices: ["The points where Earth's rotation axis, extended, meets the celestial sphere", "Earth's north and south magnetic poles", "The two points where the ecliptic crosses the celestial equator", "The brightest stars in the northern and southern sky"],
      answer: 0, explain: "The sky appears to pivot around these two points because they mark Earth's spin axis." },
    { section: "2.1", q: "At latitude 40° N, the north celestial pole appears:",
      choices: ["About 40° above the northern horizon", "Directly overhead", "Right on the northern horizon", "About 50° above the horizon"],
      answer: 0, explain: "The altitude of the north celestial pole always equals your latitude." },
    { section: "2.1", q: "“Circumpolar” stars are those that:",
      choices: ["Never rise or set — they circle a celestial pole and stay above the horizon all night", "Are visible only in summer", "Lie exactly on the celestial equator", "Are actually the planets"],
      answer: 0, explain: "For a 40° N observer, stars within 40° of the north celestial pole are circumpolar." },
    { section: "2.1", q: "The ecliptic is:",
      choices: ["The Sun's apparent path around the celestial sphere over one year", "The Moon's monthly path around the sky", "The same thing as the celestial equator", "The outer edge of the zodiac"],
      answer: 0, explain: "The Sun drifts about 1° eastward per day along the ecliptic, completing a circuit in a year." },
    { section: "2.1", q: "The ecliptic is tilted about 23.5° to the celestial equator because:",
      choices: ["Earth's rotation axis is tilted about 23.5° from perpendicular to its orbit", "The Sun wobbles as it moves", "The Moon pulls the Sun off its path", "The celestial sphere is lopsided"],
      answer: 0, explain: "That axial tilt is also what gives Earth its seasons." },
    { section: "2.1", q: "In modern astronomy, a constellation is:",
      choices: ["One of 88 sectors that together cover the entire sky", "Any star pattern that looks like an animal", "A group of stars that are physically close together in space", "One of the 12 signs of the zodiac"],
      answer: 0, explain: "Like US states, the 88 constellations tile the whole sky and aren't all the same size." },
    { section: "2.1", q: "The ancient Greeks called the planets “wanderers” because:",
      choices: ["Unlike the fixed stars, they slowly change position among the star patterns", "They were believed to be lost gods", "They twinkle more than stars", "They move across the sky each night as Earth rotates"],
      answer: 0, explain: "Everything rises and sets from Earth's spin; only the planets, Sun, and Moon also drift among the stars." },
    { section: "2.1", q: "The zodiac is:",
      choices: ["An ~18°-wide band around the ecliptic within which the Moon and planets are always found", "The full set of 88 constellations", "The circle of the celestial equator", "The path of the Moon alone"],
      answer: 0, explain: "The Moon's and planets' orbits share nearly one plane, so they stay in this narrow belt." },
    { section: "2.2", q: "During a lunar eclipse, Earth's shadow on the Moon is always round. This shows that:",
      choices: ["Earth is a sphere — only a sphere always casts a round shadow", "The Moon is a sphere", "The Sun is very far away", "The eclipse is total rather than partial"],
      answer: 0, explain: "A disk seen edge-on would cast a line-shaped shadow; Earth never does." },
    { section: "2.2", q: "Eratosthenes measured Earth's size using:",
      choices: ["The different angles of the noon Sun at two cities a known distance apart", "The time a ship takes to sink below the horizon", "The duration of a lunar eclipse", "The parallax of a nearby star"],
      answer: 0, explain: "The Sun was overhead at Syene but 7° from vertical at Alexandria — 1/50 of a circle." },
    { section: "2.2", q: "The Greeks concluded that Earth does not move because:",
      choices: ["They could not detect stellar parallax and would not accept that the stars were far enough to hide it", "They proved it with careful experiments", "Aristotle measured Earth's speed and found it to be zero", "Religious authorities forbade the idea"],
      answer: 0, explain: "A moving Earth should make nearby stars shift against distant ones over the year; they saw no shift." },
    { section: "2.2", q: "Precession, discovered by Hipparchus, is:",
      choices: ["The slow (~26,000-year) conical wobble of Earth's rotation axis", "Earth's daily rotation", "Earth's yearly orbit around the Sun", "The Moon's monthly motion around Earth"],
      answer: 0, explain: "Because the axis wobbles, the “pole star” changes over the millennia — Thuban, then Polaris, later Vega." },
    { section: "2.2", q: "In Ptolemy's model, retrograde motion was produced by:",
      choices: ["Each planet moving on a small circle (epicycle) whose center rides a larger circle (deferent) around Earth", "The planets actually stopping and reversing direction", "The Sun pulling the planets backward", "Earth passing between the planet and the Sun"],
      answer: 0, explain: "The last option is the real (heliocentric) explanation; Ptolemy had to fake it with circles on circles." },
    { section: "2.2", q: "Retrograde motion is:",
      choices: ["The temporary apparent westward drift of a planet against the background stars", "A planet's normal eastward drift among the stars", "A planet setting in the west each night", "The backward spin of a planet on its axis"],
      answer: 0, explain: "Planets normally move east against the stars; retrograde is the brief westward exception." },
    { section: "2.3", q: "Because of precession, newspaper “sun signs”:",
      choices: ["No longer match the constellation the Sun was actually in on your birthday — the signs have slipped about one constellation west", "Are more accurate than they used to be", "Match the real constellations exactly", "Change from year to year"],
      answer: 0, explain: "The sign “Aries” now sits over the constellation Pisces, for example." },
    { section: "2.3", q: "The strongest scientific objection to astrology is that:",
      choices: ["There is no known force by which birth-time sky positions could affect a person, and tests find birth signs randomly distributed", "The planets are too small to matter", "Horoscopes are hard to calculate accurately", "Astrologers disagree with one another"],
      answer: 0, explain: "The delivering doctor's gravitational pull on a newborn exceeds that of Mars." },
    { section: "2.3", q: "When people say a vague horoscope “really fit” them, it usually shows:",
      choices: ["That vague, personalized-sounding statements feel accurate to almost anyone — subjects even accept reversed readings", "That the astrologer had real predictive skill", "That the sun sign was calculated correctly", "That the planets truly aligned that day"],
      answer: 0, explain: "94% of people recognized themselves in a mass murderer's horoscope presented as a personal reading." },
    { section: "2.4", q: "Copernicus's key claim in De Revolutionibus was that:",
      choices: ["Earth is a planet and all the planets orbit the Sun", "The Sun orbits Earth in an ellipse", "The planets move on epicycles around the Sun", "Earth is motionless at the center of the universe"],
      answer: 0, explain: "Only the Moon orbits Earth in his model; everything else circles the Sun." },
    { section: "2.4", q: "Heliocentrism explained retrograde motion:",
      choices: ["As an effect of Earth overtaking a slower outer planet — no epicycles needed", "By adding even more epicycles than Ptolemy used", "By the planets truly reversing direction", "It could not explain retrograde motion at all"],
      answer: 0, explain: "From the faster-moving Earth, a slower planet appears to fall behind for a while." },
    { section: "2.4", q: "Galileo's core result about motion was that:",
      choices: ["A moving object keeps moving on its own; a force is needed to start, stop, speed up, slow down, or turn it", "Rest is the natural state of matter", "Heavier objects fall faster than lighter ones", "Continuous motion requires a continuous push"],
      answer: 0, explain: "Friction, not a lack of pushing, is what brings a sliding object to rest." },
    { section: "2.4", q: "The phases of Venus, seen by Galileo, showed that:",
      choices: ["Venus orbits the Sun, not Earth", "Venus has a thick atmosphere", "Venus is closer to us than the Moon", "Venus spins backward on its axis"],
      answer: 0, explain: "Only a Sun-orbiting Venus can show the full cycle of phases in the order Galileo observed." },
    { section: "2.4", q: "Galileo's discovery of four moons orbiting Jupiter mattered because:",
      choices: ["It proved not everything orbits Earth, and that a moving body can keep its moons", "It proved Jupiter is a star", "It disproved the heliocentric model", "It showed Jupiter is the center of the solar system"],
      answer: 0, explain: "Defenders of geocentrism had argued a moving Earth would leave the Moon behind; Jupiter's moons kept up fine." },
    { section: "2.4", q: "With his telescope Galileo found that the Milky Way is:",
      choices: ["Made of countless individual stars too faint to see with the unaided eye", "A cloud of glowing gas", "The edge of the celestial sphere", "Sunlight scattered by dust in space"],
      answer: 0, explain: "Hazy patches that looked like clouds resolved into swarms of stars." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[2] = CH;
})();
