/* =============================================================================
   Astronomy 2e — Chapter 1: Science and the Universe: A Brief Tour
   Study content + interactive-tool data.

   Text is adapted from OpenStax, "Astronomy 2e" (Chapter 1), which is licensed
   under Creative Commons Attribution 4.0 International (CC BY 4.0).
   Original: https://openstax.org/books/astronomy-2e
   This file assigns one global object: window.ASTRO
   ============================================================================= */
(function () {
  "use strict";

  var ASTRO = {};

  ASTRO.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 1,
    chapterTitle: "Science and the Universe: A Brief Tour",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/1-introduction"
  };

  // interactive study tools available for this chapter
  ASTRO.tools = ["sci", "round", "light", "calendar", "scale", "elements"];

  /* ---------------------------------------------------------------------------
     SECTIONS
     Each: id, title, minutes (approx read time), html (study text),
           keyIdeas [strings], selfCheck [{q,a}]
     --------------------------------------------------------------------------- */
  ASTRO.sections = [
    {
      id: "1.1",
      title: "The Nature of Astronomy",
      minutes: 3,
      html:
        '<p><span class="term">Astronomy</span> is the study of the objects that lie beyond our planet ' +
        'Earth and the processes by which these objects interact with one another. But it is more than a ' +
        'catalog of objects. It is also humanity&rsquo;s attempt to organize what we learn into a clear ' +
        'history of the universe, from the instant of its birth in the <span class="term">Big Bang</span> ' +
        'to the present moment.</p>' +
        '<p>Throughout this course, science is treated as a <strong>progress report</strong> &mdash; one ' +
        'that changes constantly as new techniques and instruments let us probe the universe more deeply. ' +
        'Conclusions are provisional, not final.</p>' +
        '<p>The cosmos <strong>evolves</strong>: it changes in profound ways over long periods of time. ' +
        'The universe manufactured the carbon, calcium, and oxygen needed to build something as ' +
        'complicated as you. Tracing those evolutionary processes is one of the central tasks of modern ' +
        'astronomy.</p>' +
        '<p>We learn about the cosmos almost entirely from the &ldquo;messages&rdquo; it sends us &mdash; ' +
        'chiefly <strong>starlight</strong>. Decoding the message of starlight has been a central ' +
        'challenge and triumph of the field.</p>',
      keyIdeas: [
        "Astronomy studies objects beyond Earth, how they interact, and the history of the universe from the Big Bang to now.",
        "Science is a progress report: it is revised constantly as instruments and techniques improve.",
        "The universe evolves — the atoms in your body were made by earlier generations of stars.",
        "Nearly everything we know about the cosmos comes from analyzing light."
      ],
      selfCheck: [
        { q: "Why do astronomers describe science as “a progress report”?",
          a: "Because our understanding keeps changing as better instruments and methods let us probe deeper; current conclusions are provisional and open to revision." },
        { q: "In what literal sense are you connected to the history of the universe?",
          a: "The carbon, oxygen, calcium and other atoms in your body were forged inside earlier generations of stars." }
      ]
    },
    {
      id: "1.2",
      title: "The Nature of Science",
      minutes: 5,
      html:
        '<p>The ultimate judge in science is always what nature itself reveals through observations, ' +
        'experiments, models, and testing. Science is <strong>not merely a body of knowledge</strong> but ' +
        'a <strong>method</strong>: make many observations over time, find trends, build a ' +
        '<span class="term">model</span> of the phenomenon, then keep testing it. Models are always ' +
        'approximations of nature.</p>' +
        '<p><strong>Historical example.</strong> Ancient astronomers modeled Earth as the center of the ' +
        'universe with everything moving in circles. Early data fit; but as instruments improved, more and ' +
        'more circles had to be added, and eventually the model failed. A <strong>Sun-centered</strong> ' +
        'model fit the evidence better and, after a period of philosophical struggle, was accepted.</p>' +
        '<p>New ideas are called <span class="term">hypotheses</span>. Astronomy still has many open and ' +
        'even controversial ones (for example, the exact role of cosmic impacts for life on Earth, or the ' +
        'nature of &ldquo;dark energy&rdquo;). The crucial requirement: <strong>a hypothesis must be ' +
        'testable</strong>. If an experiment truly contradicts it, the hypothesis is discarded. If results ' +
        'agree, that never fully <em>proves</em> it &mdash; but the more independent tests it survives, the ' +
        'more we accept it.</p>' +
        '<p><strong>The black-sheep island.</strong> A scientist who only ever sees black sheep may ' +
        'hypothesize &ldquo;all sheep are black.&rdquo; Every black sheep adds confidence, but a single ' +
        'white sheep on the mainland disproves it.</p>' +
        '<p>Astronomy&rsquo;s laboratory is the universe &mdash; you cannot put stars in a test tube. So ' +
        'astronomy is an <span class="term">observational science</span>: we test ideas by observing many ' +
        'samples of a kind of object and noting how they vary. It is also a ' +
        '<span class="term">historical science</span>: what we observe has already happened and cannot be ' +
        'changed, much like geology or paleontology.</p>' +
        '<p>An astronomer is like a <strong>detective</strong> reconstructing a crime that happened before ' +
        'they arrived: sift the evidence, test hypotheses, and prove the case &ldquo;beyond a reasonable ' +
        'doubt&rdquo; to colleagues, journal editors, and the wider community. New evidence can force a ' +
        'revision.</p>' +
        '<p>Science is <strong>self-correcting</strong>. Scientists constantly question one another, which ' +
        'is why funding proposals and journal papers go through <span class="term">peer review</span> &mdash; ' +
        'careful examination by other experts in the same field. Finding and fixing a weakness in current ' +
        'understanding is one of the best ways to advance a scientific career. This is why science ' +
        'progresses so fast: an undergraduate today knows more science and math than Isaac Newton did.</p>',
      keyIdeas: [
        "Science is a method judged by nature: observe → model → test → revise.",
        "A hypothesis must be testable; contradicting evidence kills it, and agreement never fully proves it.",
        "Astronomy is observational (compare many samples) and historical (studies events already past).",
        "Peer review and constant mutual challenge make science self-correcting."
      ],
      selfCheck: [
        { q: "What single observation would disprove “all sheep are black”?",
          a: "Finding one sheep that is not black." },
        { q: "How is testing a hypothesis in astronomy different from a chemistry experiment?",
          a: "Astronomers usually cannot manipulate the objects. They test by observing many examples, seeing how they vary, and observing with new instruments — then judge the hypothesis as they would a lab result." },
        { q: "What is peer review?",
          a: "Careful examination of a scientist’s work — grant proposals and journal submissions — by other experts in the same field." }
      ]
    },
    {
      id: "1.3",
      title: "The Laws of Nature",
      minutes: 3,
      html:
        '<p>Over centuries, scientists have extracted <span class="term">scientific laws</span> from ' +
        'countless observations, hypotheses, and experiments &mdash; the &ldquo;rules&rdquo; of the game ' +
        'nature plays. A remarkable discovery underlies everything in this book: <strong>the same laws ' +
        'apply everywhere in the universe</strong>. The rules governing a distant star&rsquo;s motion are ' +
        'the same rules governing a batted baseball.</p>' +
        '<p>Without universal laws, astronomy would be nearly impossible &mdash; each &ldquo;pocket&rdquo; ' +
        'of the universe would need to be studied separately. Their consistency gives us the power to ' +
        'understand objects we can never visit.</p>' +
        '<p>This does not mean our current laws and models are frozen. New experiments and observations can ' +
        'lead to <strong>more sophisticated models</strong> &mdash; models that still explain everything the ' +
        'older one did, but <em>also</em> account for new phenomena and add new laws about how they behave. ' +
        'Einstein&rsquo;s <span class="term">general theory of relativity</span> is a classic example: it ' +
        'replaced the earlier picture of gravity with a richer one, and in doing so it led scientists to ' +
        'predict &mdash; and later observe &mdash; a strange new class of objects, <strong>black ' +
        'holes</strong>. Only patient, ever more careful observation can show that such a new model is ' +
        'valid.</p>' +
        '<p>Language has limits. Everyday words are often inadequate for complex phenomena &mdash; an atom ' +
        'is <em>not</em> really a miniature solar system, even if some features rhyme. That is why ' +
        'scientists often prefer <strong>equations</strong> to words. This book mostly uses words and ' +
        'avoids heavy math, but going further in science means using the precise language of mathematics.</p>',
      keyIdeas: [
        "The same physical laws hold everywhere — that is what makes astronomy possible.",
        "Laws are provisional: better data can yield more sophisticated models that explain the old results plus new phenomena (general relativity → black holes).",
        "Everyday language is imprecise for complex nature, so scientists rely on equations."
      ],
      selfCheck: [
        { q: "Why is the universality of physical law essential to astronomy?",
          a: "It lets us apply laws learned on Earth to objects we can never reach; otherwise distant regions would be uninterpretable." },
        { q: "Give an example of a more sophisticated model replacing an older picture and predicting something new.",
          a: "General relativity replaced the earlier picture of gravity with a richer one and predicted black holes, which were later observed." }
      ]
    },
    {
      id: "1.4",
      title: "Numbers in Astronomy",
      minutes: 4,
      html:
        '<p>Astronomy deals with numbers larger than most people ever meet. Two tools make them ' +
        'manageable.</p>' +
        '<p><strong>1. Scientific notation</strong> (powers-of-ten notation). Write ' +
        '500,000,000 as 5&nbsp;&times;&nbsp;10<sup>8</sup>. The raised <span class="term">exponent</span> ' +
        'counts how many places the decimal point moved &mdash; to the <em>left</em> for large numbers ' +
        '(positive exponent), to the <em>right</em> for small numbers (negative exponent). It removes ' +
        'strings of zeros.</p>' +
        '<p><strong>2. A consistent unit system:</strong> the metric ' +
        '<span class="term">International System of Units (SI)</span>, from the French ' +
        '<em>Syst&egrave;me International d&rsquo;Unit&eacute;s</em>.</p>' +
        '<p>A common astronomical distance unit is the <span class="term">light-year</span> &mdash; the ' +
        'distance light travels in one year. Light&rsquo;s speed is constant and is the fastest possible ' +
        'speed, so it makes a good standard. Despite the name, a light-year measures <strong>distance, not ' +
        'time</strong> (like saying a theater is &ldquo;20 minutes from downtown&rdquo;).</p>' +
        '<p>Light travels about 3&nbsp;&times;&nbsp;10<sup>5</sup> km/s (roughly 300,000 km/s), which ' +
        'makes a light-year about 9.5&nbsp;&times;&nbsp;10<sup>12</sup> km &mdash; nearly 10 trillion ' +
        'kilometers. Even the nearest star beyond the Sun, Proxima Centauri, is 4.25 light-years away ' +
        '(more than 40 trillion km). Naked-eye stars are hundreds to thousands of light-years away; the ' +
        'Orion Nebula is about 1400 light-years away.</p>' +
        '<p class="callout-inline"><strong>Worked example.</strong> A net worth of $79.2 billion = ' +
        '$79,200,000,000 = <strong>$7.92&nbsp;&times;&nbsp;10<sup>10</sup></strong>. And a light-year ' +
        '&asymp; 9.46&nbsp;&times;&nbsp;10<sup>12</sup> km &mdash; a string that long could wrap ' +
        'Earth&rsquo;s circumference about 236 million times.</p>',
      keyIdeas: [
        "Scientific notation: coefficient × 10^exponent; the exponent counts decimal-point moves (positive = large, negative = small).",
        "Astronomers use SI / metric units for consistency.",
        "A light-year is a distance (≈ 9.5 × 10^12 km), not a time.",
        "The speed of light ≈ 300,000 km/s ≈ 3 × 10^5 km/s and is the universe’s speed limit."
      ],
      selfCheck: [
        { q: "Write 384,000 in scientific notation.", a: "3.84 × 10^5" },
        { q: "Write 0.0000012 in scientific notation.", a: "1.2 × 10^-6" },
        { q: "Is a light-year a unit of time?", a: "No — it is a distance, about 9.5 trillion kilometers." }
      ]
    },
    {
      id: "1.5",
      title: "Consequences of Light Travel Time",
      minutes: 3,
      html:
        '<p>Information about the universe reaches us almost only through light, and all light travels at ' +
        'the same speed &mdash; one light-year every year. This sets a limit on how quickly we can learn ' +
        'about cosmic events.</p>' +
        '<p>If a star is 100 light-years away, the light you see tonight <strong>left it 100 years ' +
        'ago</strong>. The soonest we could learn of any change there is 100 years after it happened. A ' +
        'star 500 light-years away is delivering 500-year-old news.</p>' +
        '<p>For astronomers, <strong>&ldquo;now&rdquo; is when the light arrives</strong>. There is no ' +
        'earlier way to know anything about a distant object.</p>' +
        '<p>What sounds like a frustration is actually a gift. To reconstruct cosmic history we need ' +
        'evidence from every past epoch &mdash; and <strong>looking farther out in space means looking ' +
        'farther back in time</strong> (&ldquo;look-back time&rdquo;). Looking billions of light-years ' +
        'away, we literally see billions of years into the past, and can trace how the universe evolved.</p>' +
        '<p>This is why astronomers build ever-larger telescopes: collecting more faint light lets us see ' +
        'fainter objects, which are on average farther away and therefore deeper in the past. Instruments ' +
        'like the Hubble Space Telescope and the Very Large Telescope in Chile give us views of deep space ' +
        'and deep time better than any before.</p>',
      keyIdeas: [
        "Finite light speed means we always see an object as it was when its light left it.",
        "Distance in space equals distance back in time (look-back time).",
        "Bigger telescopes gather more light → fainter, more distant, older objects → deeper cosmic history."
      ],
      selfCheck: [
        { q: "A star is 500 light-years away and (in its own frame) exploded 300 years ago. When do we see it?",
          a: "Not for another 200 years — that light has not reached us yet." },
        { q: "Why does looking deep into space let us study the early universe?",
          a: "Light from very distant objects left long ago, so we see them — and their era — as they were billions of years in the past." }
      ]
    },
    {
      id: "1.6",
      title: "A Tour of the Universe",
      minutes: 8,
      html:
        '<p>A brief tour, from home outward.</p>' +
        '<h4>Earth</h4>' +
        '<p>A nearly spherical planet about 13,000 km in diameter, distinguished from its neighbors by ' +
        'abundant liquid water covering roughly two-thirds of its crust. Radio and TV signals, and city ' +
        'lights at night, would reveal sentient life to a passing traveler.</p>' +
        '<h4>The Moon</h4>' +
        '<p>Earth&rsquo;s satellite and nearest neighbor. Distance about 384,000 km &mdash; roughly 30 ' +
        'Earth diameters &mdash; and it takes about a month to orbit. Its diameter is 3476 km, about ' +
        'one-fourth of Earth&rsquo;s. Light or radio takes 1.3 seconds each way (the ~3-second round-trip ' +
        'delay heard in Apollo transmissions).</p>' +
        '<h4>The Sun</h4>' +
        '<p>Our star, about 150 million km away &mdash; roughly 400 times the Moon&rsquo;s distance. That ' +
        'average Earth&ndash;Sun distance is one <span class="term">astronomical unit (AU)</span>. Light ' +
        'takes just over <strong>8 minutes</strong> to cross 1 AU, so the Sun&rsquo;s news is always about ' +
        '8 minutes old. The Sun&rsquo;s diameter is about 1.5 million km &mdash; Earth could fit inside one ' +
        'of its minor eruptions. If the Sun were a basketball, Earth would be an apple seed about 30 m ' +
        'away.</p>' +
        '<h4>Earth&rsquo;s orbit</h4>' +
        '<p>One trip around the Sun takes 1 year (about 3&nbsp;&times;&nbsp;10<sup>7</sup> seconds), ' +
        'moving at roughly 110,000 km/h (~66,000 mph; to convert km to miles, multiply by 0.6). We do not ' +
        'feel it: gravity holds us down and the vacuum of space offers no resistance.</p>' +
        '<h4>The solar system</h4>' +
        '<p>Eight planets plus their moons and swarms of smaller bodies such as dwarf planets. A ' +
        '<span class="term">planet</span> is a body of significant size that orbits a star and does not ' +
        'produce its own light. A body that consistently produces its own light is a ' +
        '<span class="term">star</span>. We see the planets only by reflected sunlight. Planets around ' +
        'other stars are usually detected by their gravitational tug on the star or the starlight they ' +
        'block when passing in front &mdash; only a few have been imaged directly.</p>' +
        '<h4>Stars and the Galaxy</h4>' +
        '<p>Stars are enormous balls of glowing gas generating energy by nuclear reactions deep in their ' +
        'cores; other stars look faint only because of distance. If the Sun were a basketball, Proxima ' +
        'Centauri (4.25 light-years away) would be about 7000 km from it.</p>' +
        '<p>Every star visible to the unaided eye belongs to one collection: the ' +
        '<span class="term">Milky Way Galaxy</span> (capital &ldquo;Galaxy&rdquo; for ours; lowercase for ' +
        'others). The Sun is one of <strong>hundreds of billions</strong> of its stars. Star counts by ' +
        'radius from the Sun: ~10 stars within 10 light-years; ~10,000 within 100 light-years; ~10 million ' +
        'within 1000 light-years; the whole Galaxy within 100,000 light-years.</p>' +
        '<p>The Galaxy is a giant disk with a central bulge; from outside it would look like a spiral, its ' +
        'arms traced by blue light from hot young stars. The Sun sits somewhat less than 30,000 ' +
        'light-years from the center, in an undistinguished spot. We cannot see across the Galaxy in ' +
        'ordinary light because interstellar space holds sparse gas (mostly hydrogen) and ' +
        '<span class="term">interstellar dust</span>; built up over thousands of light-years, the dust ' +
        'blocks distant starlight like smog. These gas-and-dust clouds are the raw material for future ' +
        'stars.</p>' +
        '<h4>Dark matter</h4>' +
        '<p>Much of the Galaxy is <span class="term">dark matter</span> &mdash; material we cannot ' +
        'observe directly. We know it is there from the gravitational pull it exerts on visible stars and ' +
        'gas; its composition and total amount remain a mystery, and it is part of other star groupings ' +
        'too.</p>' +
        '<h4>Multiple stars, clusters, and star death</h4>' +
        '<p>Many stars are born in double or triple systems orbiting each other, which lets us measure ' +
        'properties single stars cannot reveal. Where many stars form together we see ' +
        '<span class="term">star clusters</span> &mdash; the largest hold hundreds of thousands of stars ' +
        'across hundreds of light-years. No star lasts forever: making energy consumes fuel, and every ' +
        'star eventually runs out. The Sun has at least 5&ndash;6 billion years left. In their death ' +
        'throes, stars reveal key cosmic processes: many atoms in your body were once inside stars that ' +
        'exploded and recycled their material back into the Galaxy. We are, literally, recycled ' +
        '&ldquo;star dust.&rdquo;</p>',
      keyIdeas: [
        "Scale ladder: Earth (13,000 km) → Moon (384,000 km, 1.3 light-sec) → Sun (1 AU ≈ 150M km, 8 light-min) → solar system → Proxima Centauri (4.25 ly) → Milky Way (~100,000 ly).",
        "1 AU = the average Earth–Sun distance; light crosses it in about 8 minutes.",
        "Planet: orbits a star, no light of its own. Star: makes its own light by core nuclear reactions.",
        "The Galaxy contains gas + dust (future stars) and far more dark matter, detected only by gravity.",
        "Stars die; exploded stars seeded the atoms in your body."
      ],
      selfCheck: [
        { q: "How long does sunlight take to reach Earth, and what does that imply?",
          a: "About 8 minutes — we always see the Sun as it was ~8 minutes ago." },
        { q: "What is the difference between a planet and a star?",
          a: "A star consistently produces its own light via nuclear reactions in its core; a planet orbits a star and shines only by reflected light." },
        { q: "How do we know dark matter exists if we cannot see it?",
          a: "From the gravitational pull it exerts on the visible stars and gas we can observe." },
        { q: "Roughly how many stars does the Milky Way hold, and how wide is it?",
          a: "Hundreds of billions of stars; about 100,000 light-years across." }
      ]
    },
    {
      id: "1.7",
      title: "The Universe on the Large Scale",
      minutes: 5,
      html:
        '<p>Think of the solar system as your house and the Galaxy as your town. Just as the world holds ' +
        'many towns, the universe holds enormous numbers of <span class="term">galaxies</span>. We define ' +
        'the <span class="term">universe</span> as everything that exists that is accessible to our ' +
        'observations. Galaxies stretch as far as our telescopes can see &mdash; many billions within ' +
        'reach. Early astronomers called them &ldquo;island universes.&rdquo;</p>' +
        '<p>The <strong>nearest galaxy</strong> (found in 1993) is a small one about 70,000 light-years ' +
        'from the Sun toward the constellation Sagittarius, hard to see through our own Galaxy&rsquo;s ' +
        '&ldquo;smog.&rdquo; Beyond it lie two small galaxies about 160,000 light-years away, first ' +
        'recorded by Magellan&rsquo;s crew &mdash; the <span class="term">Magellanic Clouds</span>. All ' +
        'three are gravitationally bound satellites of the Milky Way and may eventually be swallowed by ' +
        'it. (A <span class="term">constellation</span> is one of the 88 sections into which astronomers ' +
        'divide the sky, each named for a star pattern.)</p>' +
        '<p>The <strong>nearest large galaxy</strong> is the <span class="term">Andromeda galaxy ' +
        '(M31)</span>, a spiral like ours, a little more than 2 million light-years away. With the Milky ' +
        'Way it belongs to the <span class="term">Local Group</span> &mdash; a cluster of more than 50 ' +
        'galaxies.</p>' +
        '<p>Farther out: small galaxy groups at 10&ndash;15 million light-years; at about 50 million ' +
        'light-years, systems with thousands of members. Galaxies occur mostly in ' +
        '<span class="term">clusters</span>. Some clusters gather into ' +
        '<span class="term">superclusters</span>; the Local Group belongs to the ' +
        '<strong>Virgo Supercluster</strong>, about 110 million light-years across.</p>' +
        '<p>At still greater distances, ordinary galaxies fade and we find <span class="term">quasars ' +
        '</span> &mdash; brilliant galaxy centers powered by gas heated to millions of degrees as it falls ' +
        'toward a massive <strong>black hole</strong>. Quasars are the most distant beacons we can see, ' +
        'probing 10 billion or more light-years away, and thus 10 billion or more years into the past.</p>' +
        '<p>With quasars we see back near the Big Bang. Beyond them we have detected the feeble glow of ' +
        'the explosion itself &mdash; the <strong>&ldquo;afterglow of creation&rdquo;</strong> (the cosmic ' +
        'background) &mdash; filling the universe and arriving from every direction. Its discovery is ' +
        'considered one of the most significant events in twentieth-century science.</p>',
      keyIdeas: [
        "Hierarchy of structure: stars → galaxies → groups / clusters → superclusters (Virgo Supercluster ≈ 110 million ly).",
        "The Local Group has 50+ galaxies, including the Milky Way and Andromeda (M31, ~2 million ly).",
        "A quasar is a hyper-energetic galaxy center powered by matter falling toward a massive black hole.",
        "The “afterglow of creation” fills all of space and comes from every direction — it is light from the Big Bang itself."
      ],
      selfCheck: [
        { q: "Order by increasing size: supercluster, star, galaxy, galaxy cluster.",
          a: "star, galaxy, galaxy cluster, supercluster." },
        { q: "What powers a quasar?",
          a: "Gas heated to millions of degrees as it spirals toward a massive black hole at a galaxy’s center." },
        { q: "Why does the “afterglow of creation” arrive from every direction?",
          a: "It is light from the Big Bang, which happened everywhere and fills the entire universe." }
      ]
    },
    {
      id: "1.8",
      title: "The Universe of the Very Small",
      minutes: 5,
      html:
        '<p>The universe is extraordinarily large and extraordinarily <strong>empty</strong> &mdash; on ' +
        'average about 10,000 times emptier than our Galaxy, and the Galaxy itself is mostly empty. Air ' +
        'holds about 10<sup>19</sup> atoms per cubic centimeter; interstellar gas holds about 1 atom per ' +
        'cubic centimeter; intergalactic space, about 1 atom per cubic meter. Dense places &mdash; like a ' +
        'human body &mdash; are rare.</p>' +
        '<p>Divide matter down and you reach <span class="term">molecules</span>: the smallest particle ' +
        'into which matter can be divided while still keeping its chemical properties. A water molecule ' +
        '(H<sub>2</sub>O) is two hydrogen atoms and one oxygen atom bonded together.</p>' +
        '<p>Molecules are built of <span class="term">atoms</span> &mdash; the smallest particle of an ' +
        'element still identifiable as that element. About 100 kinds of atoms ' +
        '(<span class="term">elements</span>) occur in nature; a handful make up more than 99% of what we ' +
        'encounter. The four most common elements in life on Earth &mdash; hydrogen, carbon, nitrogen, ' +
        'oxygen &mdash; are all among the cosmically abundant ones.</p>' +
        '<p>An atom has a central, positively charged <span class="term">nucleus</span> (protons plus ' +
        'neutral neutrons, holding most of the mass) surrounded by negative <strong>electrons</strong>. ' +
        'Each element is defined by its number of protons, the <span class="term">atomic number</span>: ' +
        '6 protons = carbon, 50 = tin, 70 = ytterbium.</p>' +
        '<p>The distance from the nucleus to the electrons is about 100,000 times the size of the nucleus ' +
        'itself &mdash; so <strong>even solid matter is mostly space</strong>. A typical atom is emptier ' +
        'than the solar system out to Neptune, which is one reason atoms are <em>not</em> miniature solar ' +
        'systems.</p>' +
        '<p>Everything that happens in the universe, from atomic nuclei to superclusters, can be ' +
        'explained through just <strong>four forces</strong>: gravity, electromagnetism (which combines ' +
        'electricity and magnetism), and two forces that act at the nuclear level. Why there are exactly ' +
        'four &mdash; not one, and not a million &mdash; has driven a long quest for a unified picture of ' +
        'nature. <span class="aside">(Beyond this chapter, physicists name the two nuclear ones the ' +
        '<em>strong</em> and <em>weak</em> nuclear forces.)</span></p>',
      keyIdeas: [
        "Matter divides: object → molecules → atoms → nucleus (protons + neutrons) + electrons.",
        "An element is defined by its proton count (atomic number).",
        "Cosmic composition is dominated by hydrogen and helium.",
        "Atoms are mostly empty space — the nucleus is ~100,000× smaller than the whole atom.",
        "Four forces run everything: gravity, electromagnetism, and two forces that act at the nuclear level."
      ],
      selfCheck: [
        { q: "What defines which element an atom is?",
          a: "The number of protons in its nucleus (its atomic number)." },
        { q: "What are the two most abundant elements in the universe?",
          a: "Hydrogen and helium." },
        { q: "How many forces account for everything that happens in the universe, and what are they?",
          a: "Four: gravity, electromagnetism, and two forces that act at the nuclear level." },
        { q: "Why isn’t an atom like a miniature solar system?",
          a: "It is far emptier: the nucleus is about 100,000 times smaller than the whole atom, so a typical atom is emptier than the solar system out to Neptune (where the Earth–Sun distance is only about 100 times the Sun’s size)." }
      ]
    },
    {
      id: "1.9",
      title: "A Conclusion and a Beginning",
      minutes: 3,
      html:
        '<p>Newcomers often finish this tour with mixed feelings &mdash; fascination, plus a little ' +
        'overload from all the new words and ideas. Learning astronomy is like learning a language: ' +
        'overwhelming at first, then fluent with practice.</p>' +
        '<p>You may also feel small against the cosmic scales of distance and time. Here is another view. ' +
        'Compress the entire history of the universe &mdash; Big Bang to today &mdash; into a single year ' +
        '(an idea from Carl Sagan&rsquo;s 1977 book <em>The Dragons of Eden</em>). On that ' +
        '<span class="term">cosmic calendar</span>:</p>' +
        '<ul>' +
        '<li>The <strong>Big Bang</strong> is the first moment of <strong>January 1</strong>.</li>' +
        '<li>Our <strong>solar system</strong> forms around <strong>September 10</strong>; the oldest ' +
        'datable Earth rocks go back to the <strong>third week of September</strong>.</li>' +
        '<li><strong>Humans</strong> appear on the <strong>evening of December 31</strong>.</li>' +
        '<li>The <strong>alphabet</strong> is invented at the 50th second of 11:59 p.m., December 31.</li>' +
        '<li><strong>Modern astronomy</strong> begins a mere fraction of a second before the New Year.</li>' +
        '<li>Reading this chapter is the <strong>last second of December 31</strong>.</li>' +
        '</ul>' +
        '<p>The time we have had to study the stars is minuscule, and how much of the story we have ' +
        'assembled is remarkable. The picture is not complete &mdash; new technology and ideas will keep ' +
        'changing it &mdash; so as you read this progress report, pause once in a while to savor how much ' +
        'you already know.</p>',
      keyIdeas: [
        "On a one-year cosmic calendar, all of recorded human history is the final few seconds of December 31.",
        "The solar system formed only about two-thirds of the way through cosmic time.",
        "Astronomy is a progress report — expect the picture to keep changing."
      ],
      selfCheck: [
        { q: "On the cosmic calendar, when does the solar system form?",
          a: "Around September 10 — roughly two-thirds of the way through the year." },
        { q: "What does the cosmic-calendar exercise illustrate?",
          a: "How recent humans, and human knowledge, are compared with the age of the universe." }
      ]
    }
  ];

  /* ---------------------------------------------------------------------------
     GLOSSARY  (term, def, section)
     --------------------------------------------------------------------------- */
  ASTRO.glossary = [
    { term: "Astronomy", section: "1.1",
      def: "The study of objects beyond Earth and the processes by which they interact with one another; also the attempt to organize what we learn into a history of the universe." },
    { term: "Big Bang", section: "1.1",
      def: "The event that marks the beginning of time and of the universe, about 13.8 billion years ago." },
    { term: "Science", section: "1.2",
      def: "Not merely a body of knowledge but a method for understanding nature: observe, model, test, and revise, with nature as the ultimate judge." },
    { term: "Model", section: "1.2",
      def: "An approximation of nature built from observations and always subject to further testing." },
    { term: "Hypothesis", section: "1.2",
      def: "A newly proposed explanation that must be testable; one contradicted by evidence is discarded." },
    { term: "Observational science", section: "1.2",
      def: "A science (like astronomy) that tests ideas by observing many samples of an object and noting how they vary, rather than by manipulating them in a lab." },
    { term: "Historical science", section: "1.2",
      def: "A science that studies events that have already happened and cannot be changed (also true of geology and paleontology)." },
    { term: "Peer review", section: "1.2",
      def: "Careful examination of a scientist’s work — grant proposals, journal papers — by other experts in the same field." },
    { term: "Scientific law", section: "1.3",
      def: "A rule extracted from countless observations, hypotheses, and experiments; the same laws apply everywhere in the universe." },
    { term: "General theory of relativity", section: "1.3",
      def: "Einstein’s theory of gravity that led scientists to predict, and later observe, black holes." },
    { term: "Black hole", section: "1.3",
      def: "An object whose gravity is so strong that not even light escapes; predicted by general relativity." },
    { term: "Scientific notation", section: "1.4",
      def: "Powers-of-ten notation: a number written as a coefficient times 10 raised to an exponent, which counts decimal-point moves." },
    { term: "Exponent", section: "1.4",
      def: "The small raised number after the 10 in scientific notation; it tracks how many places the decimal point moved." },
    { term: "SI (International System of Units)", section: "1.4",
      def: "The consistent metric unit system used throughout science and astronomy." },
    { term: "Light-year", section: "1.4",
      def: "The distance light travels in one year, about 9.5 × 10^12 km. A measure of distance, not time." },
    { term: "Speed of light", section: "1.4",
      def: "About 3 × 10^5 km/s (≈ 300,000 km/s); the fastest possible speed in the universe." },
    { term: "Light travel time", section: "1.5",
      def: "The delay between when light leaves an object and when it reaches us; looking farther away means seeing farther into the past." },
    { term: "Astronomical unit (AU)", section: "1.6",
      def: "The average distance between Earth and the Sun, about 150 million km; light crosses it in about 8 minutes." },
    { term: "Planet", section: "1.6",
      def: "A body of significant size that orbits a star and does not produce its own light." },
    { term: "Star", section: "1.6",
      def: "An enormous ball of glowing gas that consistently produces its own light by nuclear reactions in its core." },
    { term: "Solar system", section: "1.6",
      def: "The Sun together with its eight planets, their moons, and swarms of smaller bodies such as dwarf planets." },
    { term: "Milky Way Galaxy", section: "1.6",
      def: "The single collection of hundreds of billions of stars that includes the Sun and every star visible to the unaided eye; about 100,000 light-years across." },
    { term: "Interstellar dust", section: "1.6",
      def: "Tiny solid particles between the stars that, built up over thousands of light-years, block the light of more distant stars." },
    { term: "Dark matter", section: "1.6",
      def: "Material that cannot be observed directly but is detected through its gravitational pull; it makes up much of the Galaxy and other star groupings." },
    { term: "Star cluster", section: "1.6",
      def: "A group of stars that formed together; the largest contain hundreds of thousands of stars." },
    { term: "Galaxy", section: "1.7",
      def: "An “island universe” of stars, gas, and dark matter in intergalactic space; the universe contains many billions of them." },
    { term: "Universe", section: "1.7",
      def: "Everything that exists that is accessible to our observations." },
    { term: "Constellation", section: "1.7",
      def: "One of the 88 sections into which astronomers divide the sky, each named for a prominent star pattern." },
    { term: "Magellanic Clouds", section: "1.7",
      def: "Two small satellite galaxies of the Milky Way, about 160,000 light-years away, first recorded by Magellan’s crew." },
    { term: "Andromeda galaxy (M31)", section: "1.7",
      def: "The nearest large galaxy, a spiral like the Milky Way, a little more than 2 million light-years away." },
    { term: "Local Group", section: "1.7",
      def: "The cluster of more than 50 galaxies that includes the Milky Way and Andromeda." },
    { term: "Cluster of galaxies", section: "1.7",
      def: "A grouping of galaxies bound by gravity; large clusters can contain thousands of members." },
    { term: "Supercluster", section: "1.7",
      def: "A grouping of galaxy clusters; the Virgo Supercluster, which contains the Local Group, spans about 110 million light-years." },
    { term: "Quasar", section: "1.7",
      def: "A brilliant, extraordinarily energetic galaxy center powered by gas heated to millions of degrees as it falls toward a massive black hole; the most distant beacon we can see." },
    { term: "Afterglow of creation", section: "1.7",
      def: "The faint glow of the Big Bang itself (the cosmic background), detected coming from all directions in space." },
    { term: "Molecule", section: "1.8",
      def: "The smallest particle into which matter can be divided while still retaining its chemical properties (e.g., H2O)." },
    { term: "Atom", section: "1.8",
      def: "The smallest particle of an element that can still be identified as that element." },
    { term: "Element", section: "1.8",
      def: "One of about 100 kinds of atoms found in nature, each defined by the number of protons in its nucleus." },
    { term: "Nucleus", section: "1.8",
      def: "The central, positively charged core of an atom, containing protons and neutrons and holding most of the mass." },
    { term: "Atomic number", section: "1.8",
      def: "The number of protons in an atom’s nucleus; it defines which element the atom is." },
    { term: "Four fundamental forces", section: "1.8",
      def: "Gravity, electromagnetism, and two forces that act at the nuclear level — together they account for everything that happens in the universe, from atomic nuclei to superclusters. (Beyond Chapter 1, the nuclear pair are named the strong and weak nuclear forces.)" },
    { term: "Cosmic calendar", section: "1.9",
      def: "The history of the universe from the Big Bang to today compressed into a single year, popularized by Carl Sagan." }
  ];

  /* ---------------------------------------------------------------------------
     QUIZ  (q, choices, answer index, explain, section)
     --------------------------------------------------------------------------- */
  ASTRO.quiz = [
    { section: "1.1",
      q: "Astronomy is best defined as:",
      choices: [
        "The study of objects beyond Earth and how they interact with one another",
        "The study of Earth’s weather and atmosphere",
        "Predicting human affairs from the positions of the stars",
        "The engineering of rockets and spacecraft"
      ], answer: 0,
      whyWrong: [null,
        "That's meteorology — the study of Earth's own atmosphere, not the objects beyond Earth.",
        "That's astrology, a pseudoscience; astronomy is the science of what lies beyond Earth.",
        "That's aerospace engineering; astronomy studies the objects themselves, not the spacecraft."],
      explain: "Predicting human affairs is astrology, not astronomy. Weather is meteorology. Astronomy studies objects beyond Earth, their interactions, and the history of the universe." },
    { section: "1.1",
      q: "Saying “science is a progress report” means:",
      choices: [
        "Our understanding keeps changing as better instruments and methods let us probe deeper",
        "Scientific conclusions are never correct",
        "Scientists must file reports every quarter",
        "Only astronomy ever revises its conclusions"
      ], answer: 0,
      whyWrong: [null,
        "Too strong — most scientific conclusions are very well supported; they're just open to revision.",
        "It's a figure of speech about knowledge changing, not literal paperwork.",
        "Every science revises its conclusions as evidence improves, not only astronomy."],
      explain: "Science is provisional. New techniques and data continually refine or replace earlier models." },
    { section: "1.1",
      q: "The carbon, oxygen, and calcium in your body were:",
      choices: [
        "Produced by the universe — mostly in earlier generations of stars — over billions of years",
        "Present since the Big Bang, unchanged",
        "Created on Earth by living organisms",
        "Manufactured by the Sun today"
      ], answer: 0,
      whyWrong: [null,
        "The Big Bang made almost only hydrogen and helium; the heavier elements came later.",
        "Living things rearrange atoms but cannot build new elements — those were made in stars.",
        "The Sun fuses hydrogen into helium; it is not making the carbon, oxygen, and calcium in you."],
      explain: "These elements were forged inside stars that later exploded and recycled their material; you are made of “star dust.”" },
    { section: "1.2",
      q: "Above all, a scientific hypothesis must be:",
      choices: ["Testable", "Proposed by a famous scientist", "Written as an equation", "Impossible to disprove"],
      answer: 0,
      whyWrong: [null,
        "Who proposes an idea doesn't matter; whether nature can test it does.",
        "Many good hypotheses are stated in words — math helps but isn't required.",
        "That's the opposite of science: an idea that can't possibly be disproved isn't testable."],
      explain: "A hypothesis that cannot be tested against nature is not scientific. If evidence contradicts it, it is discarded." },
    { section: "1.2",
      q: "On an island of only black sheep, what would disprove “all sheep are black”?",
      choices: [
        "Observing a single non-black sheep",
        "Counting a thousand more black sheep",
        "A vote among scientists",
        "Nothing could disprove it"
      ], answer: 0,
      whyWrong: [null,
        "Confirming cases can never prove a universal claim — no matter how many, one exception still breaks it.",
        "Science isn't settled by voting; it's settled by evidence.",
        "A single white sheep would do it — universal claims are fragile to one counterexample."],
      explain: "One contrary observation is enough to falsify a universal claim; confirming cases only add confidence." },
    { section: "1.2",
      q: "Astronomy is called an “observational science” because astronomers usually:",
      choices: [
        "Test ideas by observing many samples and comparing them, rather than manipulating the objects",
        "Never use instruments of any kind",
        "Look only with the unaided eye",
        "Refuse to do experiments on principle"
      ], answer: 0,
      whyWrong: [null,
        "Astronomers depend on instruments — telescopes, detectors, spacecraft.",
        "Most astronomy is done with instruments far more sensitive than the eye.",
        "They still test ideas — by comparing many samples and observing in new ways, which is a kind of experiment."],
      explain: "You cannot put a star in a test tube, so astronomers compare many examples and observe with new instruments to test hypotheses." },
    { section: "1.2",
      q: "Peer review is:",
      choices: [
        "Careful examination of a scientist’s work by other experts in the same field",
        "A scientist checking their own results",
        "A public vote on scientific questions",
        "Review by elected government officials"
      ], answer: 0,
      whyWrong: [null,
        "Peer review is by *other* experts, precisely so it isn't just checking your own work.",
        "It's expert evaluation, not a popular vote.",
        "It's done by scientists in the same field, not by politicians."],
      explain: "Peer review is part of what makes science self-correcting." },
    { section: "1.3",
      q: "A key reason astronomy is possible at all is that:",
      choices: [
        "The same physical laws apply everywhere in the universe",
        "Every galaxy has its own separate laws",
        "The laws of nature can never change under any circumstances",
        "Astronomers can travel to distant stars to check"
      ], answer: 0,
      whyWrong: [null,
        "If every region had its own laws, we couldn't interpret anything far away — the opposite of what makes astronomy work.",
        "Laws and models *can* be refined by better data; the key point is that they're the same everywhere.",
        "We can't travel to other stars — universal laws are exactly what let us study them from here."],
      explain: "Universal laws let us apply what we learn on Earth to objects we can never visit." },
    { section: "1.3",
      q: "Einstein’s general theory of relativity is used in the chapter as an example of:",
      choices: [
        "A more sophisticated model that replaced an older picture and predicted something new (black holes)",
        "A hypothesis that was completely disproved",
        "A law that, once found, can never be revised",
        "A purely mathematical idea with no observable consequences"
      ], answer: 0,
      whyWrong: [null,
        "It wasn't disproved — it succeeded, and predicted black holes, which were later observed.",
        "The chapter uses it to show that laws *can* be replaced by deeper ones.",
        "It has many observable consequences, including black holes and the bending of starlight."],
      explain: "It shows that a model can be replaced by a more sophisticated one that explains the old results and predicts new phenomena — here, black holes." },
    { section: "1.4",
      q: "Written in scientific notation, 500,000,000 is:",
      choices: ["5 × 10⁸", "5 × 10⁷", "50 × 10⁸", "5 × 10⁻⁸"],
      answer: 0,
      whyWrong: [null,
        "That's 50,000,000 — one zero short. There are 8 zeros after the 5.",
        "The coefficient has to be between 1 and 10, so write 5 × 10⁸, not 50 × 10⁸.",
        "A negative exponent means a tiny number (0.00000005), not a huge one."],
      explain: "Move the decimal 8 places left: 5 followed by 8 zeros = 5 × 10⁸." },
    { section: "1.4",
      q: "A light-year is a unit of:",
      choices: ["Distance (about 9.5 trillion km)", "Time (one year)", "Speed", "Brightness"],
      answer: 0,
      whyWrong: [null,
        "The name fools people — a light-year measures how *far* light goes in a year, not an amount of time.",
        "Speed is distance ÷ time (like km/s); a light-year is only the distance part.",
        "Brightness isn't measured in light-years at all."],
      explain: "Despite the name, a light-year measures how far light travels in a year — a distance." },
    { section: "1.4",
      q: "The speed of light is approximately:",
      choices: ["3 × 10⁵ km/s", "3 × 10⁵ km/h", "3 × 10⁸ km/s", "1,100 km/h"],
      answer: 0,
      whyWrong: [null,
        "Right number, wrong unit — it's 3 × 10⁵ km per *second*, not per hour.",
        "That's the value in metres per second; converted to km/s the exponent drops to 5.",
        "That's roughly the speed of sound, not light."],
      explain: "About 300,000 km/s = 3 × 10⁵ km/s. (It is 3 × 10⁸ m/s, but in km/s the exponent is 5.)" },
    { section: "1.5",
      q: "If a star is 500 light-years away, the light you see from it tonight:",
      choices: [
        "Left the star about 500 years ago",
        "Left the star tonight",
        "Left the star about 500 days ago",
        "Will arrive at the star in 500 years"
      ], answer: 0,
      whyWrong: [null,
        "Light isn't instant — it needed 500 years to cross 500 light-years.",
        "500 light-years is a *distance*; the travel time is 500 *years*, not days.",
        "The light is arriving now; it left the star 500 years ago."],
      explain: "Light takes 500 years to cross 500 light-years, so you see 500-year-old news." },
    { section: "1.5",
      q: "Looking at objects billions of light-years away lets astronomers:",
      choices: [
        "See the universe as it was billions of years in the past",
        "See the future of those objects",
        "See them exactly as they are right now",
        "Measure only their brightness, nothing else"
      ], answer: 0,
      whyWrong: [null,
        "We can only see light that has already reached us — never an object's future.",
        "The light left billions of years ago, so we see the object as it *was*, not as it is now.",
        "We measure far more than brightness — colour, motion, composition, structure."],
      explain: "Distance in space equals look-back time, so deep observations reveal the early universe." },
    { section: "1.6",
      q: "One astronomical unit (AU) is:",
      choices: [
        "The average distance between Earth and the Sun (~150 million km)",
        "The distance to the nearest star",
        "The diameter of the entire solar system",
        "The same thing as one light-year"
      ], answer: 0,
      whyWrong: [null,
        "The nearest star is about 270,000 AU away — an AU is far smaller than that.",
        "An AU is just the Earth–Sun gap; the solar system is thousands of AU across.",
        "One light-year is about 63,000 AU — completely different scales."],
      explain: "Light crosses 1 AU in a little over 8 minutes." },
    { section: "1.6",
      q: "Sunlight takes about ___ to reach Earth:",
      choices: ["8 minutes", "1.3 seconds", "8 seconds", "8 hours"],
      answer: 0,
      whyWrong: [null,
        "1.3 seconds is the one-way light time to the *Moon*, not the Sun.",
        "Far too short — light takes about 8 *minutes* to cross the 1-AU gap.",
        "Far too long — 8 light-hours reaches out past Pluto."],
      explain: "So we always see the Sun as it was about 8 minutes ago. (1.3 seconds is the one-way light time to the Moon.)" },
    { section: "1.6",
      q: "As defined in this chapter, the difference between a star and a planet is that:",
      choices: [
        "A star consistently produces its own light; a planet does not",
        "A star is always bigger than any planet",
        "A planet is hotter than a star",
        "A star orbits a planet"
      ], answer: 0,
      whyWrong: [null,
        "Some giant planets are bigger than the smallest stars; the real difference is making your own light.",
        "A star's core is millions of degrees; a planet doesn't produce its own light or heat.",
        "It's the other way around — planets orbit stars."],
      explain: "Planets shine only by reflected light; stars generate their own light through core nuclear reactions." },
    { section: "1.6",
      q: "We know dark matter exists because:",
      choices: [
        "Of the gravitational pull it exerts on visible stars and gas",
        "It glows faintly in radio light",
        "Astronauts have brought back samples of it",
        "It blocks light the way interstellar dust does"
      ], answer: 0,
      whyWrong: [null,
        "Dark matter gives off no light we can detect — radio, visible, or any other kind.",
        "No one has ever collected dark matter; it is known only from its gravity.",
        "That's interstellar dust; dark matter doesn't absorb or block light."],
      explain: "Dark matter is not seen directly; its presence is inferred from gravity. (Blocking light is what dust does.)" },
    { section: "1.6",
      q: "The Milky Way Galaxy contains roughly:",
      choices: ["Hundreds of billions of stars", "A few thousand stars", "About a million stars", "Exactly 100 billion galaxies"],
      answer: 0,
      whyWrong: [null,
        "You can see more stars than that with your naked eye — the Galaxy holds hundreds of billions.",
        "Off by a factor of about a hundred thousand.",
        "The Milky Way is one galaxy *of* stars, not a group of 100 billion galaxies."],
      explain: "The Sun is one of hundreds of billions of stars in a disk about 100,000 light-years across." },
    { section: "1.7",
      q: "Ordered from smallest to largest, the correct sequence is:",
      choices: [
        "Star, galaxy, galaxy cluster, supercluster",
        "Galaxy, star, supercluster, galaxy cluster",
        "Galaxy cluster, supercluster, galaxy, star",
        "Star, galaxy cluster, galaxy, supercluster"
      ], answer: 0,
      whyWrong: [null,
        "A galaxy is bigger than a star, and a supercluster is bigger than a cluster — this order is scrambled.",
        "That runs largest-to-smallest and also swaps cluster and supercluster.",
        "A galaxy cluster holds many galaxies, so it can't come before a single galaxy."],
      explain: "Stars group into galaxies, galaxies into clusters, and clusters into superclusters." },
    { section: "1.7",
      q: "A quasar is powered by:",
      choices: [
        "Gas heated to millions of degrees as it falls toward a massive black hole at a galaxy’s center",
        "Ordinary hydrogen fusion, like a normal star",
        "The collision of two planets",
        "Reflected light from nearby galaxies"
      ], answer: 0,
      whyWrong: [null,
        "Fusion powers ordinary stars, but it is far too feeble to explain a quasar's enormous output.",
        "Planets are far too small to release that much energy; it is a galaxy-scale process.",
        "Quasars are among the brightest objects known — they generate their own light, not reflect it."],
      explain: "That energetic infall makes quasars the most distant beacons we can detect." },
    { section: "1.7",
      q: "The Andromeda galaxy (M31) and the Milky Way both belong to:",
      choices: ["The Local Group", "The Magellanic Clouds", "The same single galaxy", "Nothing — they are unrelated"],
      answer: 0,
      whyWrong: [null,
        "The Magellanic Clouds are small satellite galaxies of the Milky Way, not the group both belong to.",
        "They are two separate galaxies, about 2.5 million light-years apart.",
        "They are gravitationally bound together in the same small cluster, the Local Group."],
      explain: "The Local Group is a cluster of more than 50 galaxies dominated by the Milky Way and Andromeda." },
    { section: "1.8",
      q: "An element is defined by:",
      choices: [
        "The number of protons in its atomic nucleus",
        "The number of electrons around it",
        "The number of neutrons in its nucleus",
        "Its color"
      ], answer: 0,
      whyWrong: [null,
        "An atom can gain or lose electrons (becoming an ion) and still be the same element.",
        "Changing the neutron count gives an *isotope* of the same element, not a new element.",
        "Colour isn't a defining property of an element."],
      explain: "6 protons is always carbon, 50 is always tin, and so on — that count is the atomic number." },
    { section: "1.8",
      q: "The two most abundant elements in the universe are:",
      choices: ["Hydrogen and helium", "Carbon and oxygen", "Iron and silicon", "Oxygen and nitrogen"],
      answer: 0,
      whyWrong: [null,
        "Carbon and oxygen are vital for life but rare in the cosmos — only a few hundred atoms per million hydrogen.",
        "Iron and silicon are only trace elements in the universe as a whole.",
        "Oxygen and nitrogen dominate *air*, not the universe."],
      explain: "For every million hydrogen atoms there are about 80,000 helium atoms and only a few hundred of anything else." },
    { section: "1.8",
      q: "“Even solid matter is mostly empty space” because:",
      choices: [
        "The nucleus is about 100,000 times smaller than the whole atom",
        "Solids are full of tiny air bubbles",
        "Atoms are constantly drifting apart",
        "Electrons have no mass"
      ], answer: 0,
      whyWrong: [null,
        "There are no air pockets at the atomic scale — the emptiness is *inside* each atom.",
        "The atoms in a solid are locked in place, not drifting apart.",
        "Electrons do have mass; the point is the nucleus is about 100,000 times smaller than the atom."],
      explain: "The electrons sit about 100,000 nuclear diameters out, leaving the atom emptier than the solar system out to Neptune." },
    { section: "1.8",
      q: "Everything that happens in the universe can be explained through how many fundamental forces?",
      choices: ["Four", "One", "Two", "Hundreds"],
      answer: 0,
      whyWrong: [null,
        "Physicists hope to unify them into one someday, but as far as we know there are four.",
        "Two of the four act at the nuclear level, plus gravity and electromagnetism — that's four.",
        "Just four are enough to explain everything from atomic nuclei to superclusters."],
      explain: "Gravity, electromagnetism, and two forces that act at the nuclear level. Why there are exactly four — not one, not a million — drives the search for a unified theory." },
    { section: "1.9",
      q: "On the cosmic calendar (all of cosmic history compressed into one year), recorded human history occupies:",
      choices: ["The final few seconds of December 31", "All of December", "The last week of December", "Everything from July onward"],
      answer: 0,
      whyWrong: [null,
        "All of December is over a billion years on this scale; humans appear only in the last hours of Dec 31.",
        "One week here is about 250 million years — recorded history is only a few seconds.",
        "July on this calendar is billions of years ago, before Earth even existed."],
      explain: "Humans appear only on the evening of Dec 31; the alphabet arrives in the last minute; modern astronomy in the last fraction of a second." },
    { section: "1.9",
      q: "On the cosmic calendar, the solar system forms around:",
      choices: ["September 10 — about two-thirds of the way through the year", "January 2", "Late December", "Mid-March"],
      answer: 0,
      whyWrong: [null,
        "January 2 would make the solar system almost as old as the universe; it actually formed billions of years later.",
        "Late December is only thousands to millions of years ago — the solar system is 4.6 billion years old.",
        "Mid-March would make it far too old; on this scale it forms in early-to-mid September."],
      explain: "Section 1.9 places the solar system’s formation around September 10; the oldest datable Earth rocks come in the third week of September." }
  ];

  /* ---------------------------------------------------------------------------
     TOOL DATA
     --------------------------------------------------------------------------- */

  // Cosmically abundant elements: atoms per million hydrogen atoms (Table 1.1)
  ASTRO.elements = [
    { name: "Hydrogen",  symbol: "H",  z: 1,  perMillionH: 1000000 },
    { name: "Helium",    symbol: "He", z: 2,  perMillionH: 80000 },
    { name: "Oxygen",    symbol: "O",  z: 8,  perMillionH: 740 },
    { name: "Carbon",    symbol: "C",  z: 6,  perMillionH: 450 },
    { name: "Neon",      symbol: "Ne", z: 10, perMillionH: 130 },
    { name: "Nitrogen",  symbol: "N",  z: 7,  perMillionH: 92 },
    { name: "Magnesium", symbol: "Mg", z: 12, perMillionH: 40 },
    { name: "Silicon",   symbol: "Si", z: 14, perMillionH: 37 },
    { name: "Iron",      symbol: "Fe", z: 26, perMillionH: 32 },
    { name: "Sulfur",    symbol: "S",  z: 16, perMillionH: 19 }
  ];

  // Speed of light, kilometers per second
  ASTRO.C_KM_S = 299792.458;
  // Kilometers in one light-year (Julian year)
  ASTRO.KM_PER_LY = 299792.458 * 365.25 * 24 * 3600; // ~9.4607e12

  // Light-travel-time presets. distanceKm = one-way distance from Earth.
  ASTRO.lightPresets = [
    { label: "The Moon", distanceKm: 384000,
      note: "Radio round-trip ≈ 2.6 s — the delay you hear in Apollo transmissions." },
    { label: "The Sun (1 AU)", distanceKm: 149597871,
      note: "The Sun’s news is always about 8 minutes old." },
    { label: "Proxima Centauri", distanceKm: 4.25 * 299792.458 * 365.25 * 24 * 3600,
      note: "The nearest star beyond the Sun — 4.25 light-years away." },
    { label: "Orion Nebula", distanceKm: 1400 * 299792.458 * 365.25 * 24 * 3600,
      note: "A star-forming cloud about 1400 light-years away." },
    { label: "Center of the Milky Way", distanceKm: 27000 * 299792.458 * 365.25 * 24 * 3600,
      note: "The Sun sits somewhat less than 30,000 light-years from the center." },
    { label: "Sagittarius Dwarf Galaxy", distanceKm: 70000 * 299792.458 * 365.25 * 24 * 3600,
      note: "The nearest galaxy, ~70,000 light-years away (found in 1993)." },
    { label: "Magellanic Clouds", distanceKm: 160000 * 299792.458 * 365.25 * 24 * 3600,
      note: "Two satellite galaxies of the Milky Way, ~160,000 light-years away." },
    { label: "Andromeda Galaxy (M31)", distanceKm: 2500000 * 299792.458 * 365.25 * 24 * 3600,
      note: "The nearest large galaxy — about 2.5 million light-years away (Chapter 1 rounds this to “a little more than 2 million”)." },
    { label: "Pandora’s Cluster", distanceKm: 4.0e9 * 299792.458 * 365.25 * 24 * 3600,
      note: "A rich cluster of galaxies about 4 billion light-years away." },
    { label: "A distant quasar", distanceKm: 1.0e10 * 299792.458 * 365.25 * 24 * 3600,
      note: "Seen as it was about 10 billion years ago — near the era of the Big Bang." }
  ];

  // Cosmic-scale ladder. sizeM = characteristic size in meters (diameter or distance).
  ASTRO.scaleLadder = [
    { label: "Earth", kind: "diameter", sizeM: 1.28e7,
      detail: "About 13,000 km across — a watery planet with sentient life." },
    { label: "Earth to the Moon", kind: "distance", sizeM: 3.84e8,
      detail: "~384,000 km, about 30 Earth diameters. Light: 1.3 seconds." },
    { label: "Earth to the Sun (1 AU)", kind: "distance", sizeM: 1.496e11,
      detail: "~150 million km, ~400× the Moon’s distance. Light: ~8 minutes." },
    { label: "The solar system (to Neptune’s orbit)", kind: "diameter", sizeM: 9.0e12,
      detail: "About 60 AU across. Light crosses it in roughly 8 hours." },
    { label: "To Proxima Centauri", kind: "distance", sizeM: 4.02e16,
      detail: "The nearest star beyond the Sun — 4.25 light-years." },
    { label: "A 100-light-year sphere around the Sun", kind: "diameter", sizeM: 1.9e18,
      detail: "Contains roughly 10,000 stars — still a tiny part of the Galaxy." },
    { label: "The Milky Way Galaxy", kind: "diameter", sizeM: 9.5e20,
      detail: "~100,000 light-years across; hundreds of billions of stars, plus gas, dust, and dark matter." },
    { label: "To the Magellanic Clouds", kind: "distance", sizeM: 1.5e21,
      detail: "Satellite galaxies of the Milky Way, ~160,000 light-years away." },
    { label: "To the Andromeda Galaxy (M31)", kind: "distance", sizeM: 2.37e22,
      detail: "The nearest large galaxy — about 2.5 million light-years away (Chapter 1 says “a little more than 2 million”)." },
    { label: "The Local Group", kind: "diameter", sizeM: 1.0e23,
      detail: "More than 50 galaxies, dominated by the Milky Way and Andromeda." },
    { label: "The Virgo Supercluster", kind: "diameter", sizeM: 1.04e24,
      detail: "Contains the Local Group; about 110 million light-years across." },
    { label: "To the most distant quasars", kind: "distance", sizeM: 9.5e25,
      detail: "10 billion or more light-years — and 10 billion or more years into the past." }
  ];

  // Cosmic calendar: the history of the universe compressed into one year.
  // `when` is the calendar position exactly as Chapter 1 (section 1.9) states it.
  // Events not mentioned in Chapter 1 are marked inChapter:false and use the
  // standard cosmic-calendar placement, shown only for context.
  ASTRO.cosmicCalendar = {
    ageYears: 13.8e9,
    events: [
      { label: "The Big Bang", when: "January 1", monthIndex: 0, inChapter: true,
        detail: "The universe — and time itself — begins." },
      { label: "First galaxies begin to form", when: "≈ late January", monthIndex: 0, inChapter: false,
        detail: "Not part of Chapter 1 — shown for context." },
      { label: "The solar system forms", when: "≈ September 10", monthIndex: 8, inChapter: true,
        detail: "The Sun and planets condense from a cloud of gas and dust (about 4.6 billion years ago)." },
      { label: "Oldest datable rocks on Earth", when: "third week of September", monthIndex: 8, inChapter: true,
        detail: "The oldest Earth rocks we can date formed around now." },
      { label: "Earliest known life on Earth", when: "≈ late September", monthIndex: 8, inChapter: false,
        detail: "Not part of Chapter 1 — shown for context." },
      { label: "Cambrian explosion of animal life", when: "≈ mid-December", monthIndex: 11, inChapter: false,
        detail: "Not part of Chapter 1 — shown for context." },
      { label: "Non-avian dinosaurs go extinct", when: "≈ December 30", monthIndex: 11, inChapter: false,
        detail: "Not part of Chapter 1 — shown for context." },
      { label: "First humans appear", when: "evening of December 31", monthIndex: 11, inChapter: true,
        detail: "Creatures we would call human emerge." },
      { label: "Invention of the alphabet", when: "Dec 31, 11:59:50 p.m.", monthIndex: 11, inChapter: true,
        detail: "The 50th second of 11:59 p.m. on December 31." },
      { label: "Beginnings of modern astronomy", when: "Dec 31, a fraction of a second to midnight", monthIndex: 11, inChapter: true,
        detail: "Roughly 400 years ago — a sliver of a second before the New Year." },
      { label: "Right now — you, reading this", when: "Dec 31, midnight", monthIndex: 11, inChapter: true,
        detail: "The last instant of December 31." }
    ]
  };

  // Scientific-notation practice tasks are generated at runtime in app.js.
  // This curated pool feeds the matching game (all plain and scientific forms are
  // distinct, so every card has exactly one partner).
  ASTRO.sciMatchPool = [
    { coeff: "3",    exp: 5,   plain: "300000",         note: "speed of light (km/s)" },
    { coeff: "9.46", exp: 12,  plain: "9460000000000",  note: "kilometres in a light-year" },
    { coeff: "1.5",  exp: 8,   plain: "150000000",      note: "Earth–Sun distance (km)" },
    { coeff: "3.84", exp: 5,   plain: "384000",         note: "Earth–Moon distance (km)" },
    { coeff: "1.38", exp: 10,  plain: "13800000000",    note: "age of the universe (years)" },
    { coeff: "1",    exp: -8,  plain: "0.00000001",     note: "about the size of an atom (cm)" },
    { coeff: "1.4",  exp: 3,   plain: "1400",           note: "light-years to the Orion Nebula" },
    { coeff: "2.5",  exp: 5,   plain: "250000",         note: "stars in the cluster M9" },
    { coeff: "6.6",  exp: 4,   plain: "66000",          note: "Earth's orbital speed (mph)" },
    { coeff: "7.92", exp: 10,  plain: "79200000000",    note: "net worth in Example 1.1 ($)" }
  ];

  // Rounding tool — worked examples for "Show me how".
  // place: an integer step (10, 100, 1000, 1e6) OR "tenth" / "whole" for decimals.
  ASTRO.roundExamples = [
    { n: 47,         place: 10,   note: "a warm-up" },
    { n: 12742,      place: 1000, note: "Earth's real width in km (the book rounds it to 13,000)" },
    { n: 384400,     place: 1000, note: "the Moon's distance in km (the book says 384,000)" },
    { n: 1372,       place: 100,  note: "a nebula's distance in light-years" },
    { n: 149597871,  place: 1e6,  note: "the Sun's distance in km (the book says 150 million)" },
    { n: 4.246,      place: "tenth", note: "Proxima Centauri's distance in light-years" }
  ];

  // Rounding tool — matching game. Every number rounds to a DIFFERENT nearest ten.
  ASTRO.roundMatchPool = [
    { n: 47, rounded: 50 },
    { n: 83, rounded: 80 },
    { n: 24, rounded: 20 },
    { n: 68, rounded: 70 },
    { n: 95, rounded: 100 },
    { n: 36, rounded: 40 },
    { n: 12, rounded: 10 },
    { n: 61, rounded: 60 },
    { n: 89, rounded: 90 },
    { n: 33, rounded: 30 }
  ];

  window.ASTRO = ASTRO;                         // back-compat
  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[1] = ASTRO;
})();
