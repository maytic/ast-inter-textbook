/* =============================================================================
   Astronomy 2e — Chapter 3: Orbits and Gravity
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 3), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[3].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 3,
    chapterTitle: "Orbits and Gravity",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/3-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 67–92"
  };

  CH.tools = ["mul", "exponents", "mathlab", "kepler1", "kepler2", "kepler3", "newton1", "newton2", "newton3", "gravitation", "physicists"];

  /* ---------------------------------- ONE STUDY TOOL PER LAW: match data */
  /* Kepler's 1st law — the words of an ellipse. */
  CH.law1match = [
    { a: "Ellipse", b: "a squashed circle — the shape of a planet’s orbit" },
    { a: "Focus", b: "one of two inside points; the Sun sits on one of them" },
    { a: "Semimajor axis", b: "half the long way across — the orbit’s “size”" },
    { a: "Eccentricity", b: "how squished it is: 0 = circle, near 1 = very flat" },
    { a: "Perihelion", b: "the point in the orbit closest to the Sun" },
    { a: "Aphelion", b: "the point in the orbit farthest from the Sun" }
  ];
  /* Kepler's 2nd law — where a planet is fast or slow. */
  CH.law2match = [
    { a: "Planet closest to the Sun", b: "moving fastest" },
    { a: "Planet farthest from the Sun", b: "moving slowest" },
    { a: "A perfectly circular orbit", b: "same speed the whole way around" },
    { a: "Sun–planet line, equal times", b: "sweeps out equal areas" },
    { a: "A comet far out past the planets", b: "creeping along slowly for years" },
    { a: "Kepler’s 2nd law is really", b: "conservation of angular momentum" }
  ];
  /* Newton's 1st law — does it need a force? */
  CH.n1match = [
    { a: "Coast at a steady speed in deep space", b: "no force needed" },
    { a: "Speed a wagon up", b: "needs a force" },
    { a: "Slow a bike down", b: "needs a force" },
    { a: "Turn a corner", b: "needs a force" },
    { a: "A parked car stays parked", b: "no force needed" },
    { a: "What stops a ball rolling on grass", b: "friction — a force" }
  ];
  /* Newton's 2nd law — force, mass, acceleration. */
  CH.n2match = [
    { a: "Push twice as hard", b: "speeds up twice as fast" },
    { a: "Make the object twice as heavy", b: "speeds up half as fast" },
    { a: "Same push: a pen vs a textbook", b: "the pen speeds up more" },
    { a: "No push at all", b: "no speeding up (a = 0)" },
    { a: "Acceleration equals", b: "force divided by mass" },
    { a: "Burn more fuel, push harder", b: "more acceleration" }
  ];
  /* Newton's 3rd law — action paired with reaction. */
  CH.n3match = [
    { a: "You push on a wall", b: "the wall pushes back on you" },
    { a: "A rocket pushes gas out the back", b: "the gas pushes the rocket forward" },
    { a: "A swimmer pushes water backward", b: "the water pushes the swimmer forward" },
    { a: "Your foot pushes the ground back", b: "the ground pushes you forward" },
    { a: "Earth pulls you down", b: "you pull Earth up, just as hard" },
    { a: "A gun pushes the bullet forward", b: "the bullet pushes the gun back" }
  ];
  /* Universal gravitation — how mass and distance change the pull. */
  CH.gravmatch = [
    { a: "Move 2× farther apart", b: "pull becomes 1/4" },
    { a: "Move 3× farther apart", b: "pull becomes 1/9" },
    { a: "Move 10× farther apart", b: "pull becomes 1/100" },
    { a: "Double one of the masses", b: "pull doubles" },
    { a: "Both masses ×3", b: "pull ×9" },
    { a: "Very, very far apart", b: "pull is tiny, but never zero" }
  ];
  /* Newton's 3rd law — scenarios for the Show-me picker. */
  CH.actionReaction = [
    { name: "🚀 Rocket", action: "The engine pushes hot gas out the back.", reaction: "The gas pushes the rocket forward — no air needed." },
    { name: "🏊 Swimmer", action: "Your hands push the water backward.", reaction: "The water pushes you forward." },
    { name: "🛹 Throw a ball on a skateboard", action: "You throw a heavy ball forward.", reaction: "The ball pushes you and the board backward." },
    { name: "🔫 Recoil", action: "The gun pushes the bullet forward.", reaction: "The bullet pushes the gun back into your shoulder." },
    { name: "🚶 Walking", action: "Your foot pushes the ground backward.", reaction: "The ground pushes you forward." },
    { name: "🪐 Standing on Earth", action: "Earth pulls you down.", reaction: "You pull Earth up just as hard — but Earth barely budges." }
  ];

  /* ---------------------------------------- MATCH: WHO FIGURED OUT WHAT */
  CH.physicists = [
    { name: "Tycho Brahe",
      did: "Measured the planets’ positions for 20 years, more precisely than anyone before the telescope",
      more: "1546–1601. A Danish nobleman who built a grand observatory on the island of Hven under King Frederick II. His exact record of Mars was what let Kepler crack the shape of its orbit." },
    { name: "Johannes Kepler",
      did: "Found the three laws that describe how the planets move",
      more: "1571–1630. German mathematician who worked through the turmoil of the Thirty Years’ War. He inherited Brahe’s data and, after 20+ years, showed orbits are ellipses (laws 1 and 2 in 1609, law 3 in 1619)." },
    { name: "Isaac Newton",
      did: "Explained every orbit with three laws of motion plus one universal law of gravity",
      more: "1643–1727. In the Principia (1687, printed at Halley’s expense) he set out inertia, force, and action–reaction, plus F = G·M₁M₂/R² — and invented calculus to do the math." },
    { name: "Edmund Halley",
      did: "Talked Newton into publishing the Principia — and paid the printing bill",
      more: "Newton’s friend (the comet is named for him). Without his push and his money, Newton’s laws of motion and gravity might never have gone to print." },
    { name: "William Herschel",
      did: "Discovered Uranus in 1781 — the first planet ever found with a telescope",
      more: "A musician and amateur astronomer. Uranus had been written down as a star a century earlier; Herschel was the first to notice it moving like a planet." },
    { name: "John Couch Adams",
      did: "Predicted Neptune’s place in the sky from the wobble in Uranus’s orbit",
      more: "1819–1892. A fresh Cambridge graduate; in 1845 he handed George Airy a position correct to within 2°, but the search was not followed up in time." },
    { name: "Urbain Le Verrier",
      did: "Also predicted Neptune — and his prediction is the one that led to the find",
      more: "1811–1877. French mathematician; published his solution in June 1846 and wrote to Johann Galle in Berlin, who found the planet that very night." },
    { name: "Johann Galle",
      did: "Was first to actually spot Neptune, on 23 September 1846",
      more: "Astronomer at the Berlin Observatory. With fresh charts of the Aquarius region and Le Verrier’s letter in hand, he found Neptune less than 1° from the predicted spot on his first night looking." }
  ];

  /* -------------------------------------------------- KEPLER-TOOL DATA
     Orbital data from Table 3.2 (semimajor axis a in AU, period P in years).
     Pluto and Halley's Comet added so the P² = a³ tool reaches past Neptune. */
  CH.keplerBodies = [
    { name: "Mercury", a: 0.39, P: 0.24 },
    { name: "Venus", a: 0.72, P: 0.62 },
    { name: "Earth", a: 1.00, P: 1.00 },
    { name: "Mars", a: 1.52, P: 1.88 },
    { name: "Ceres", a: 2.77, P: 4.60 },
    { name: "Jupiter", a: 5.20, P: 11.86 },
    { name: "Saturn", a: 9.54, P: 29.46 },
    { name: "Uranus", a: 19.19, P: 84.01 },
    { name: "Neptune", a: 30.06, P: 164.82 },
    { name: "Pluto", a: 39.5, P: 248.0 },
    { name: "Halley’s Comet", a: 17.8, P: 75.3 }
  ];

  /* ------------------------------------------------------------------ FIGURES
     Images from OpenStax Astronomy 2e (CC BY 4.0), placed in the matching
     sections via <div data-figure="N.N"></div>. Captions are the book's own,
     with credit lines intact. Files in img/ (downscaled for web). */
  CH.figures = {
    "3.2": {
      file: "fig-3-2.jpg",
      title: "Tycho Brahe (1546–1601) and Johannes Kepler (1571–1630)",
      alt: "Left: a stylized engraving of Tycho Brahe seated at a huge curved wall-mounted angle-measuring instrument in his observatory. Right: a painted portrait of Johannes Kepler with a ruffed collar, one hand resting on a globe.",
      caption: "(a) A stylized engraving shows Tycho Brahe using his instruments to measure the altitude of celestial objects above the horizon. The large curved instrument in the foreground allowed him to measure precise angles in the sky. Note that the scene includes hints of the grandeur of Brahe’s observatory at Hven. (b) Kepler was a German mathematician and astronomer. His discovery of the basic laws that describe planetary motion placed the heliocentric cosmology of Copernicus on a firm mathematical basis."
    },
    "3.3": {
      file: "fig-3-3.jpg",
      title: "Conic Sections",
      alt: "A cone sliced by planes at four angles, producing (from top) a circle, an ellipse, a parabola, and a hyperbola.",
      caption: "The circle, ellipse, parabola, and hyperbola are all formed by the intersection of a plane with a cone. This is why such curves are called conic sections."
    },
    "3.4": {
      file: "fig-3-4.jpg",
      title: "Drawing an Ellipse",
      alt: "A pencil pulls a loop of string taut around two tacks pushed into paper on a drawing board, tracing an ellipse. A second panel marks the half-widths from the center to each end as a.",
      caption: "(a) We can construct an ellipse by pushing two tacks (the white objects) into a piece of paper on a drawing board, and then looping a string around the tacks. Each tack represents a focus of the ellipse, with one of the tacks being the Sun. Stretch the string tight using a pencil, and then move the pencil around the tacks. The length of the string remains the same, so that the sum of the distances from any point on the ellipse to the foci is always constant. (b) In this illustration, each semimajor axis is denoted by a. The distance 2a is called the major axis of the ellipse."
    },
    "3.5": {
      file: "fig-3-5.jpg",
      title: "Kepler’s Second Law: The Law of Equal Areas",
      alt: "An exaggerated elliptical orbit with the Sun at one focus. A thin wedge swept out far from the Sun (A) and a fat wedge swept out near the Sun (B) are shaded to show they have equal area.",
      caption: "The orbital speed of a planet traveling around the Sun (the circular object inside the ellipse) varies in such a way that in equal intervals of time (t), a line between the Sun and a planet sweeps out equal areas (A and B). Note that the eccentricities of the planets’ orbits in our solar system are substantially less than shown here."
    },
    "3.6": {
      file: "fig-3-6.jpg",
      title: "Isaac Newton (1643–1727)",
      alt: "A painted 1689 portrait of Isaac Newton with long grey hair, by Sir Godfrey Kneller.",
      caption: "1689 Portrait by Sir Godfrey Kneller. Isaac Newton’s work on the laws of motion, gravity, optics, and mathematics laid the foundations for much of physical science."
    },
    "3.7": {
      file: "fig-3-7.jpg",
      title: "Demonstrating Newton’s Third Law",
      alt: "A Space Shuttle lifting off on a bright column of flame and billowing exhaust clouds.",
      caption: "The U.S. Space Shuttle (here launching Discovery), powered by three fuel engines burning liquid oxygen and liquid hydrogen, with two solid fuel boosters, demonstrates Newton’s third law. (credit: modification of work by NASA)"
    },
    "3.8": {
      file: "fig-3-8.jpg",
      title: "Conservation of Angular Momentum",
      alt: "A figure skater drawn twice: arms and one leg stretched out and spinning slowly, then pulled in tight against the body and spinning fast.",
      caption: "When a spinning figure skater brings in her arms, their distance from her spin center is smaller, so her speed increases. When her arms are out, their distance from the spin center is greater, so she slows down."
    },
    "3.9": {
      file: "fig-3-9.jpg",
      title: "Astronauts in Free Fall",
      alt: "Four astronauts float at playful angles inside a rounded module of the International Space Station, Earth visible through a window behind them.",
      caption: "While in space, astronauts are falling freely, so they experience “weightlessness.” Clockwise from top left: Tracy Caldwell Dyson (NASA), Naoko Yamazaki (JAXA), Dorothy Metcalf-Lindenburger (NASA), and Stephanie Wilson (NASA). (credit: NASA)"
    },
    "3.10": {
      file: "fig-3-10.jpg",
      title: "Solar System Orbits",
      alt: "A top-down plot of the inner solar system: near-circular black planet orbits from Mercury to Jupiter, four blue asteroid orbits, and three long red comet orbits that cross the plane at steep angles.",
      caption: "We see the orbits of typical comets and asteroids compared with those of the planets Mercury, Venus, Earth, Mars, and Jupiter (black circles). Shown in red are three comets: Halley, Kopff, and Encke. In blue are the four largest asteroids: Ceres, Pallas, Vesta, and Hygeia."
    },
    "3.11": {
      file: "fig-3-11.jpg",
      title: "Firing a Bullet into Orbit",
      alt: "Left: a figure on a mountaintop fires horizontally; slower shots (a, b) arc back to the ground, a faster shot (c) curves all the way around Earth. Right: Newton’s own 1731 woodcut of the same idea.",
      caption: "(a) For paths a and b, the velocity is not enough to prevent gravity from pulling the bullet back to Earth; in case c, the velocity allows the bullet to fall completely around Earth. (b) This diagram by Newton in his De Mundi Systemate, 1731 edition, illustrates the same concept shown in (a)."
    },
    "3.14": {
      file: "fig-3-14.jpg",
      title: "Mathematicians Who Discovered a Planet",
      alt: "Portraits side by side: (a) a bearded, balding John Couch Adams in a dark painted portrait; (b) a lithograph of Urbain Le Verrier in a frock coat.",
      caption: "(a) John Couch Adams (1819–1892) and (b) Urbain J. J. Le Verrier (1811–1877) share the credit for discovering the planet Neptune."
    }
  };

  /* --------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "3.1",
      title: "The Laws of Planetary Motion",
      minutes: 12,
      pages: "pp. 68–73",
      html:
        '<p>Chapter 2 ended with Copernicus and Galileo arguing that the Sun, not Earth, sits in the middle. ' +
        'That was an <em>idea</em>. Turning it into exact, checkable math took two more people working around ' +
        '1600: a sharp-eyed observer, <span class="term">Tycho Brahe</span>, and a patient mathematician, ' +
        '<span class="term">Johannes Kepler</span>. Together they set the stage for Isaac Newton.</p>' +
        '<h4>Tycho Brahe: 20 years of careful watching</h4>' +
        '<p>Brahe was born to Danish nobility in <strong>1546</strong>, three years after Copernicus&rsquo; book ' +
        'came out. As a young man he made a careful study of what we now know was an <strong>exploding ' +
        'star</strong> that flared up in the night sky. His reputation won him the support of the Danish king ' +
        'Frederick II, and at age <strong>30</strong> he built a fine observatory on the North Sea island of ' +
        '<strong>Hven</strong>. Brahe was the <strong>last and greatest observer before the telescope</strong> ' +
        '&mdash; he measured angles in the sky by eye, with big metal instruments, more precisely than anyone ever had.</p>' +
        '<div data-figure="3.2"></div>' +
        '<p>For almost <strong>20 years</strong> he kept a running record of where the Sun, Moon, and planets ' +
        'were. He noticed the planets did not sit where the old Ptolemaic tables said they should. But Brahe ' +
        'was not the person to build a better model from his own data &mdash; and he was a difficult, quarrelsome ' +
        'man who made enemies. When Frederick II died in <strong>1597</strong>, Brahe lost his backing and moved ' +
        'to <strong>Prague</strong> as court astronomer to Emperor Rudolf of Bohemia. In the year before he ' +
        'died he hired a young mathematician to help crunch the numbers: Kepler.</p>' +
        '<h4>Johannes Kepler inherits the data</h4>' +
        '<p>Kepler was born poor in the German province of W&uuml;rttemberg in <strong>1571</strong> and lived ' +
        'through the Thirty Years&rsquo; War. He trained for the priesthood at the university of T&uuml;bingen, ' +
        'learned the Copernican system there, and became a firm believer in the Sun-centered picture. Brahe set ' +
        'him to work finding a theory of planetary motion that fit the Hven observations &mdash; but fed him ' +
        'data only a little at a time, afraid Kepler would solve it all and take the credit. Only after ' +
        'Brahe&rsquo;s death in <strong>1601</strong> did Kepler get the full set of records. Working through ' +
        'them took most of his time for <strong>more than 20 years</strong>.</p>' +
        '<h4>The first two laws (published 1609)</h4>' +
        '<p>The path an object takes through space is its <span class="term">orbit</span>. Kepler started by ' +
        'assuming the planets moved in <strong>circles</strong> &mdash; and could not make circles fit ' +
        'Brahe&rsquo;s numbers for <strong>Mars</strong>. Eventually he found the orbit of Mars is a slightly ' +
        'squashed circle: an <span class="term">ellipse</span>. An ellipse is one of the ' +
        '<span class="term">conic sections</span> &mdash; the shapes (circle, ellipse, parabola, hyperbola) you ' +
        'get by slicing through a cone.</p>' +
        '<div data-figure="3.3"></div>' +
        '<p>An ellipse has <strong>two special points inside it</strong>. Add up the distance from one of them ' +
        'to any point on the curve and the distance from the other to that same point, and you always get the ' +
        '<strong>same total</strong>, wherever you are on the ellipse. Those two points are the ' +
        '<span class="term">foci</span> (one focus, two foci &mdash; a word Kepler coined). That constant-total ' +
        'rule gives you a way to draw one: loop a string around two tacks, pull it taut with a pencil, and run ' +
        'the pencil around. The string length never changes, so the pencil traces an ellipse; the tacks are the ' +
        'two foci.</p>' +
        '<div data-figure="3.4"></div>' +
        '<p>The <strong>longest diameter</strong> of an ellipse is its <span class="term">major axis</span>. ' +
        'Half of that &mdash; center to one end &mdash; is the <span class="term">semimajor axis</span>, and ' +
        'that is the number normally used to give an orbit&rsquo;s size. For Mars, the semimajor axis (also its ' +
        '<strong>average distance from the Sun</strong>) is <strong>228 million km</strong>.</p>' +
        '<p>How round or how stretched an ellipse is comes from how far apart the two foci are compared with the ' +
        'major axis. That ratio is the <span class="term">eccentricity</span>. Slide the foci together and the ' +
        'eccentricity is <strong>0</strong> &mdash; the ellipse is just a circle (and the semimajor axis is the ' +
        'radius). Pull them apart and the eccentricity climbs toward <strong>1</strong>, where the ellipse is ' +
        'squashed flat. Semimajor axis plus eccentricity fully describe an ellipse. Mars&rsquo; orbit has an ' +
        'eccentricity of only about <strong>0.09</strong> &mdash; drawn to scale you could barely tell it from ' +
        'a circle &mdash; yet that small difference is what let Kepler crack the problem.</p>' +
        '<div data-diagram="ellipse"></div>' +
        '<p><strong>Kepler&rsquo;s first law:</strong> every planet&rsquo;s orbit is an ellipse, with the ' +
        '<strong>Sun at one focus</strong> (the other focus is empty). This was a turning point in human ' +
        'thought &mdash; the cosmos did not have to be built only from perfect circles after all.</p>' +
        '<p><strong>Kepler&rsquo;s second law</strong> is about <strong>speed</strong>. A planet moves ' +
        '<strong>faster when it is closer to the Sun</strong> and slower when it is farther away. Picture an ' +
        'elastic line joining the Sun to the planet. As the planet moves, that line sweeps across the inside of ' +
        'the ellipse. Kepler found that in <strong>equal amounts of time the line sweeps equal areas</strong>: ' +
        'a short, fat wedge near the Sun has the same area as a long, thin wedge out at the far end.</p>' +
        '<div data-diagram="kepler-2nd"></div>' +
        '<div data-figure="3.5"></div>' +
        '<h4>The third law (1619): distance and year go together</h4>' +
        '<p>Kepler wanted to know <em>why</em> the planets are spaced the way they are &mdash; a &ldquo;harmony ' +
        'of the spheres.&rdquo; In <strong>1619</strong> he found the link. Call the time a planet takes to go ' +
        'once around the Sun its <span class="term">orbital period</span>, <em>P</em>, and remember its ' +
        'semimajor axis <em>a</em> is its average distance from the Sun. Then:</p>' +
        '<p class="callout-inline"><strong>P² is proportional to a³.</strong> And if you measure <em>P</em> in ' +
        '<strong>years</strong> and <em>a</em> in <span class="term">astronomical units</span> (AU) &mdash; ' +
        'one AU is Earth&rsquo;s average distance from the Sun, about 1.5&nbsp;&times;&nbsp;10<sup>8</sup> km ' +
        '&mdash; the two sides are not just proportional, they are <strong>equal</strong>: ' +
        '<strong>P² = a³</strong>.</p>' +
        '<p>This works for anything orbiting the Sun. Say you time Mars: it takes <strong>1.88 years</strong>. ' +
        'Square that and you get <strong>3.53</strong>. That equals <em>a</em>³, so <em>a</em> is the number ' +
        'whose cube is 3.53 &mdash; about <strong>1.52</strong>. Mars&rsquo; average distance is 1.52 AU, half ' +
        'again as far from the Sun as Earth. It cuts both ways: a period gives you a distance, and a distance ' +
        'gives you a period.</p>' +
        '<div data-diagram="kepler-3rd"></div>' +
        '<p class="callout-inline"><strong>Worked example.</strong> An object with a semimajor axis of ' +
        '<strong>50 AU</strong>: cube 50 (125,000) and take the square root &mdash; the period is about ' +
        '<strong>350 years</strong>, out beyond Pluto. An asteroid at <strong>3 AU</strong>: cube it (27), ' +
        'square-root that &mdash; about <strong>5.2 years</strong> to go once around.</p>' +
        '<p>Kepler&rsquo;s three laws, together:</p>' +
        '<ul>' +
        '<li><strong>First law:</strong> each planet moves on an ellipse with the Sun at one focus.</li>' +
        '<li><strong>Second law:</strong> the Sun&ndash;planet line sweeps out equal areas in equal times.</li>' +
        '<li><strong>Third law:</strong> the square of the period equals the cube of the semimajor axis ' +
        '(P² = a³, in years and AU).</li>' +
        '</ul>' +
        '<p>These laws <strong>describe</strong> the motion beautifully, but they do not say <em>what force</em> ' +
        'makes the planets follow them. That was Newton&rsquo;s job.</p>',
      keyIdeas: [
        "Tycho Brahe (1546–1601) spent ~20 years on the island of Hven making the most precise pre-telescope measurements of planet positions. Kepler inherited that data after Brahe died in 1601.",
        "An ellipse is a squashed circle with two inside points called foci; the distances from the two foci to any point on the curve always add to the same total. Its size is given by the semimajor axis a (half the long diameter).",
        "Eccentricity says how stretched an ellipse is: 0 = a circle, near 1 = nearly flat. The planets' orbits have low eccentricity (Mars ≈ 0.09).",
        "Kepler's first law: every orbit is an ellipse with the Sun at one focus.",
        "Kepler's second law: a planet sweeps out equal areas in equal times, so it moves faster near the Sun and slower far away.",
        "Kepler's third law (1619): P² = a³ when P is in years and a is in AU. A period gives you a distance and vice versa. The laws describe motion but don't explain its cause."
      ],
      selfCheck: [
        { q: "What are the foci of an ellipse, and where is the Sun in a planet's orbit?",
          a: "The two fixed points inside the ellipse for which the distances to any point on the curve add to a constant. The Sun sits at one focus; the other focus is empty." },
        { q: "State Kepler's second law and what it implies about a planet's speed.",
          a: "The line from the Sun to a planet sweeps out equal areas in equal times. So the planet must move faster when it is nearer the Sun and slower when it is farther away." },
        { q: "Mars takes 1.88 years to orbit the Sun. Roughly how far from the Sun is it, in AU?",
          a: "P² = a³, so a³ = 1.88² ≈ 3.53, and a ≈ 1.52 AU (the cube root of 3.53) — about half again Earth's distance." },
        { q: "Why did Kepler's laws leave a job for Newton?",
          a: "They describe exactly how the planets move but say nothing about what force holds them to those paths." }
      ]
    },
    {
      id: "3.2",
      title: "Newton’s Great Synthesis",
      minutes: 12,
      pages: "pp. 73–78",
      html:
        '<p>Isaac Newton pulled the work of Galileo, Brahe, Kepler, and others into one framework that ' +
        'explained all of it. He was born in Lincolnshire, England, in <strong>1643</strong>, the year after ' +
        'Galileo died (he lived to <strong>1727</strong>). His mother wanted him to run the family farm; ' +
        'instead he went to Trinity College, Cambridge, in <strong>1661</strong>, and eight years later became ' +
        'a professor of mathematics. Among his contemporaries in England were the architect Christopher Wren, ' +
        'the writers Aphra Behn and Daniel Defoe, and the composer G.&nbsp;F. Handel.</p>' +
        '<div data-figure="3.6"></div>' +
        '<p>Newton worked out his first ideas on motion and optics during the plague years of ' +
        '<strong>1665&ndash;1666</strong>, when students were sent home. He was a moody, private man, and he ' +
        'invented new math &mdash; what we now call <strong>calculus</strong> &mdash; to handle the problems he ' +
        'was chewing on. His friend <strong>Edmund Halley</strong> finally talked him into publishing, and paid ' +
        'the printing bill himself. The book, <em>Philosophiae Naturalis Principia Mathematica</em> ' +
        '(&ldquo;the <strong>Principia</strong>&rdquo;), came out in <strong>1687</strong>.</p>' +
        '<h4>The three laws of motion</h4>' +
        '<p>In the original Latin the three laws take only <strong>59 words</strong>:</p>' +
        '<ul>' +
        '<li><strong>Newton&rsquo;s first law:</strong> an object stays at rest, or keeps moving at a steady ' +
        'speed in a straight line, unless an outside <span class="term">force</span> makes it change.</li>' +
        '<li><strong>Newton&rsquo;s second law:</strong> the change in an object&rsquo;s motion is ' +
        'proportional to the force, and in the same direction as the force.</li>' +
        '<li><strong>Newton&rsquo;s third law:</strong> for every action there is an equal and opposite ' +
        'reaction &mdash; the two bodies push on each other equally, in opposite directions.</li>' +
        '</ul>' +
        '<h4>What the laws mean</h4>' +
        '<p>The first law restates something Galileo found: the <span class="term">conservation of ' +
        'momentum</span>. With no outside influence, a certain measure of an object&rsquo;s motion &mdash; its ' +
        '<span class="term">momentum</span> &mdash; does not change. This is also called the ' +
        '<strong>law of inertia</strong>: things keep doing what they are already doing. Momentum depends on ' +
        'three things: <strong>speed</strong>, <strong>direction of motion</strong>, and <strong>mass</strong> ' +
        '(how much matter is in the body). Speed plus direction together is called ' +
        '<span class="term">velocity</span> &mdash; &ldquo;20 km/h due south&rdquo; is a velocity; ' +
        '&ldquo;20 km/h&rdquo; alone is just speed. Momentum is <strong>mass &times; velocity</strong>. We ' +
        'rarely see this cleanly on Earth because of <strong>friction</strong>, which drags moving things to a ' +
        'stop &mdash; but out between the stars, where there is almost nothing to rub against, objects coast ' +
        'along forever.</p>' +
        '<p>The second law says a force is what <strong>changes</strong> momentum over time. A force has a size ' +
        'and a direction, and you need one to start something moving, speed it up, slow it down, stop it, or ' +
        'turn it. The rate at which velocity changes is <span class="term">acceleration</span>. The ' +
        'acceleration is proportional to the force &mdash; push a book across a smooth table twice as hard and ' +
        'it speeds up twice as fast &mdash; and it also depends on mass: the same push given to a low-mass pen ' +
        'instead of a heavy textbook sends the pen off much faster.</p>' +
        '<p>The third law is the deepest. In a group of objects left to themselves, total momentum stays ' +
        'constant, so any change in one object&rsquo;s momentum has to be balanced by an equal and opposite ' +
        'change somewhere else. <strong>Forces always come in pairs.</strong> If you push on something, it ' +
        'pushes back on you just as hard. A student who jumps toward a skateboard and Earth pull on each other ' +
        'equally &mdash; but Earth has so much more mass that its matching motion is far too small to notice. ' +
        'You feel the same thing as recoil when a bat hits a ball or a rifle fires. It is also how rockets ' +
        'work: the engine throws exhaust out the back, and the equal, opposite force pushes the rocket forward ' +
        '&mdash; no air or ground to push against needed, so a rocket actually works best in a vacuum.</p>' +
        '<div data-figure="3.7"></div>' +
        '<h4>Mass, volume, and density</h4>' +
        '<p>Three words worth keeping straight:</p>' +
        '<ul>' +
        '<li><span class="term">Mass</span> &mdash; how much material is in an object.</li>' +
        '<li><span class="term">Volume</span> &mdash; how much space it takes up (cubic centimeters, liters). ' +
        'A penny and a blown-up balloon can have the same mass but wildly different volumes.</li>' +
        '<li><span class="term">Density</span> &mdash; mass divided by volume; how tightly the matter is ' +
        'packed. When we call iron &ldquo;heavy&rdquo; and whipped cream &ldquo;light,&rdquo; we usually mean ' +
        'density.</li>' +
        '</ul>' +
        '<p>This book measures density in <strong>grams per cubic centimeter (g/cm³)</strong>, handy because ' +
        'water is exactly 1 g/cm³. A 300-gram block that fills 100 cm³ has a density of <strong>3 g/cm³</strong>. ' +
        'Everyday materials run from insulating foam (under 0.1 g/cm³) to gold (<strong>19.3 g/cm³</strong>). In ' +
        'space the range is far wider &mdash; from a comet&rsquo;s tail (about 10<sup>&minus;16</sup> g/cm³) to ' +
        'a collapsed &ldquo;star corpse&rdquo; called a neutron star (about 10<sup>15</sup> g/cm³).</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Material</th><th>Density (g/cm³)</th></tr>' +
        '<tr><td>Gold</td><td>19.3</td></tr>' +
        '<tr><td>Lead</td><td>11.3</td></tr>' +
        '<tr><td>Iron</td><td>7.9</td></tr>' +
        '<tr><td>Earth (bulk)</td><td>5.5</td></tr>' +
        '<tr><td>Rock (typical)</td><td>2.5</td></tr>' +
        '<tr><td>Water</td><td>1</td></tr>' +
        '<tr><td>Wood (typical)</td><td>0.8</td></tr>' +
        '<tr><td>Insulating foam</td><td>0.1</td></tr>' +
        '<tr><td>Silica gel</td><td>0.02</td></tr>' +
        '</tbody></table></div>' +
        '<p style="margin:0"><strong>Mass is how much, volume is how big, density is how tightly packed.</strong></p>' +
        '<h4>Angular momentum</h4>' +
        '<p><span class="term">Angular momentum</span> measures the motion of something turning around a fixed ' +
        'point &mdash; a planet around the Sun, say. It is the object&rsquo;s <strong>mass &times; velocity ' +
        '&times; distance from the point</strong> it circles. If nothing outside interferes, angular momentum ' +
        'is <strong>conserved</strong>. Kepler&rsquo;s second law is really this rule in disguise: as a planet ' +
        'swings in closer to the Sun, its distance shrinks, so it must <strong>speed up</strong> to keep the ' +
        'product the same; farther out, it slows down. A spinning <strong>figure skater</strong> shows it too ' +
        '&mdash; pull your arms in and you whirl faster; fling them out and you slow. A shrinking cloud of ' +
        'gas, or a collapsing star, spins faster for the same reason.</p>' +
        '<div data-figure="3.8"></div>',
      keyIdeas: [
        "Newton (1643–1727) collected his work in the Principia (1687, published at Halley's expense), and invented calculus along the way.",
        "First law / inertia: with no outside force, an object keeps its momentum — stays still or moves straight at constant speed. Momentum = mass × velocity (velocity = speed + direction).",
        "Second law: a force changes momentum; it is needed to start, stop, speed up, slow down, or turn something. Acceleration is proportional to the force and smaller for larger mass.",
        "Third law: forces come in equal, opposite pairs. This is how rockets work — throw exhaust back, get pushed forward (best in a vacuum).",
        "Mass = how much matter; volume = how much space; density = mass ÷ volume (measured in g/cm³; water = 1).",
        "Angular momentum = mass × velocity × distance from the center of motion, and it's conserved. That's why a planet speeds up near the Sun (Kepler's 2nd law) and a skater speeds up pulling her arms in."
      ],
      selfCheck: [
        { q: "According to Newton's first law, what does a moving object do if no force acts on it?",
          a: "It keeps moving in a straight line at a constant speed forever — its momentum doesn't change. On Earth, friction is the outside force that usually stops things." },
        { q: "You push a pen and a heavy textbook with the same force. Which speeds up more, and why?",
          a: "The pen. Acceleration for a given force is larger when the mass is smaller (second law)." },
        { q: "How does a rocket engine move a rocket, in terms of Newton's third law?",
          a: "The engine pushes exhaust gas out the back; the equal and opposite reaction pushes the rocket forward. It needs nothing to push against, so it works best in a vacuum." },
        { q: "Two objects have the same mass but different volumes. Which has the higher density, and what is density?",
          a: "The one with the smaller volume. Density is mass divided by volume — how tightly the matter is packed." },
        { q: "Why does a planet speed up as it approaches the Sun?",
          a: "Angular momentum (mass × velocity × distance) is conserved. As the Sun–planet distance shrinks, the planet's speed must rise to keep the product constant — which is exactly Kepler's second law." }
      ]
    },
    {
      id: "3.3",
      title: "Newton’s Universal Law of Gravitation",
      minutes: 11,
      pages: "pp. 78–82",
      html:
        '<p>Newton&rsquo;s laws of motion say the natural thing for an object to do is move in a ' +
        '<strong>straight line</strong>. But the planets move in ellipses, not straight lines &mdash; so some ' +
        'force must be constantly bending their paths. Newton&rsquo;s answer was <span class="term">gravity</span>.</p>' +
        '<h4>One force, everywhere</h4>' +
        '<p>In Newton&rsquo;s day, gravity was thought of as an Earth thing: drop something and it falls to the ' +
        'ground. Newton&rsquo;s leap was to suppose that Earth&rsquo;s gravity reaches <strong>all the way to ' +
        'the Moon</strong>, supplying the force that curves the Moon&rsquo;s path into an orbit &mdash; and, ' +
        'further, that <strong>every mass in the universe attracts every other mass</strong>. The same pull ' +
        'that drops an apple could hold the planets to the Sun.</p>' +
        '<p>To test that, the exact form of the force had to reproduce <strong>Kepler&rsquo;s three laws</strong> ' +
        'for the planets <em>and</em> the behavior of <strong>falling bodies on Earth</strong> that Galileo had ' +
        'measured. Newton worked out that gravity must weaken with distance as the ' +
        '<strong>inverse square</strong>: put a planet twice as far away and the force drops to ' +
        '<strong>one-quarter</strong>; three times as far, <strong>one-ninth</strong>.</p>' +
        '<div data-diagram="inverse-square"></div>' +
        '<p>He also found the force is proportional to <strong>both masses</strong>. Put together, this is one ' +
        'of the most famous equations in science:</p>' +
        '<p class="callout-inline"><strong>F<sub>gravity</sub> = G &times; M<sub>1</sub> &times; M<sub>2</sub> ' +
        '&divide; R²</strong> &mdash; where M<sub>1</sub> and M<sub>2</sub> are the two masses, R is the ' +
        'distance between them, and <strong>G</strong> is a fixed number called the universal gravitational ' +
        'constant.</p>' +
        '<p>With this force plus the laws of motion, Newton could <strong>prove mathematically</strong> that ' +
        'the only orbits allowed are exactly the ellipses Kepler had described.</p>' +
        '<h4>The Moon test</h4>' +
        '<p>Is the law really <em>universal</em>? It should predict the Moon&rsquo;s motion as well as an ' +
        'apple&rsquo;s. An apple at Earth&rsquo;s surface &mdash; one Earth-radius from the center &mdash; ' +
        'falls with an acceleration of <strong>9.8 meters per second per second</strong>. The Moon is ' +
        '<strong>60 Earth-radii</strong> from the center. If gravity falls off as distance squared, the ' +
        'Moon&rsquo;s acceleration should be smaller by 60² = <strong>3,600 times</strong> &mdash; and that is ' +
        '<strong>exactly</strong> the acceleration the Moon needs for its orbit. (The Moon does not fall ' +
        '<em>to</em> Earth; it falls <em>around</em> it.)</p>' +
        '<p>This force of gravity at Earth&rsquo;s surface is what gives you your sense of ' +
        '<strong>weight</strong>. Your <strong>mass</strong> is the same everywhere, but your weight depends ' +
        'on the local gravity, so you would weigh less on the Moon or Mars without any change in your mass.</p>' +
        '<p class="callout-inline"><strong>Worked example.</strong> If Earth kept its mass but had ' +
        '<strong>8&times; the volume</strong>, its radius would double, surface gravity would fall by 2² = 4, ' +
        'and you would weigh <strong>one-quarter</strong> as much. If Earth kept its size but had ' +
        '<strong>one-third its mass</strong>, you would weigh <strong>one-third</strong> as much.</p>' +
        '<p>Gravity is a <strong>built-in property of mass</strong> and it <strong>never quite reaches ' +
        'zero</strong> &mdash; it fades fast with distance but keeps acting. The Sun&rsquo;s pull is felt far ' +
        'beyond Pluto, where it swings huge numbers of icy bodies around enormous orbits; and the combined ' +
        'gravity of billions of stars makes up the pull of the whole Milky Way Galaxy, which in turn holds ' +
        'smaller galaxies in orbit around it.</p>' +
        '<h4>Why astronauts float</h4>' +
        '<p>Astronauts a few hundred kilometers up are barely farther from Earth&rsquo;s center than we are, ' +
        'so gravity there is nearly full strength. They look weightless for the same reason people in an ' +
        'elevator with a snapped cable would feel weightless: <strong>they are falling</strong>. In ' +
        '<span class="term">free fall</span>, the astronauts, their spacecraft, and their cameras all ' +
        'accelerate together, so they feel no push from the seat or floor. The difference from the doomed ' +
        'elevator is that they are moving sideways fast enough to fall <strong>around</strong> Earth rather ' +
        'than into it &mdash; that is what being &ldquo;in orbit&rdquo; means. (In the film <em>Apollo 13</em>, ' +
        'the weightless scenes were shot in an airplane diving toward the ground.)</p>' +
        '<div data-figure="3.9"></div>' +
        '<h4>Newton fixes Kepler&rsquo;s third law</h4>' +
        '<p>Knowing gravity is the cause, Newton could sharpen Kepler&rsquo;s third law. Kepler had linked a ' +
        'planet&rsquo;s period to its distance; Newton showed the <strong>masses matter too</strong>. In units ' +
        'of the Sun&rsquo;s mass, the sharper version is:</p>' +
        '<p class="callout-inline"><strong>a³ = (M<sub>1</sub> + M<sub>2</sub>) &times; P²</strong></p>' +
        '<p>Kepler missed the mass term because a planet&rsquo;s mass is tiny next to the Sun&rsquo;s, so ' +
        'M<sub>1</sub>&nbsp;+&nbsp;M<sub>2</sub> is almost exactly 1 and his simpler <strong>P² = a³</strong> ' +
        'still worked. But when <strong>two stars</strong> or <strong>two galaxies</strong> orbit each other, ' +
        'both masses count. Turned around, this equation lets astronomers <strong>weigh things by watching ' +
        'them move</strong>: the Sun&rsquo;s mass from the planets&rsquo; orbits, Jupiter&rsquo;s mass from its ' +
        'moons, and so on out to whole galaxies. It is one of the most powerful tools in astronomy.</p>' +
        '<p class="callout-inline"><strong>Worked example.</strong> An Earth-like planet orbits a star at ' +
        '<strong>1 AU</strong> and takes about <strong>0.71 year</strong> (that is &radic;&frac12;) to go ' +
        'around. Its mass is negligible, so M<sub>star</sub> &asymp; a³ &divide; P² = 1 &divide; 0.5 = ' +
        '<strong>2</strong> &mdash; the star is twice the Sun&rsquo;s mass. Flip it: a star twice the ' +
        'Sun&rsquo;s mass with an Earth-like planet taking <strong>4 years</strong> to orbit &mdash; ' +
        'a³ = 2 &times; 16 = 32, so a = &#8731;32 &asymp; <strong>3.2 AU</strong>.</p>',
      keyIdeas: [
        "Planets move on curves, not straight lines, so a force must bend their paths — gravity. Newton proposed it acts between every pair of masses, everywhere.",
        "Newton's universal law of gravitation: F = G·M₁M₂/R². The pull grows with both masses and falls off as the inverse square of the distance (2× farther → ¼ the force).",
        "The Moon check: the Moon is 60 Earth-radii out, so its acceleration is 60² = 3600 times weaker than an apple's 9.8 m/s² — exactly what its orbit needs.",
        "Weight is the local force of gravity on you and changes from world to world; mass does not. Gravity weakens with distance but never reaches zero.",
        "Orbiting astronauts float because they are in free fall — falling around Earth, with everything around them accelerating together.",
        "Newton's version of Kepler's third law adds the masses: a³ = (M₁ + M₂)·P². Running it backwards lets us weigh the Sun, planets, stars, and galaxies from how things orbit them."
      ],
      selfCheck: [
        { q: "In Newton's law of gravitation, what happens to the force if you move two objects three times farther apart?",
          a: "It drops to one-ninth (1/3²). Gravity follows an inverse-square law." },
        { q: "The Moon is about 60 Earth-radii from Earth's center. How does its acceleration compare with an apple's at the surface, and why does that matter?",
          a: "About 3,600 times smaller (60²), because gravity falls off as distance squared. That predicted value matches the Moon's actual orbital acceleration — strong evidence the law is universal." },
        { q: "Why do astronauts on the Space Station appear weightless, even though gravity there is almost as strong as on the ground?",
          a: "They are in free fall — falling around Earth along with their spacecraft. Everything accelerates together, so they feel no supporting force." },
        { q: "How can astronomers use Newton's form of Kepler's third law to find the mass of the Sun or Jupiter?",
          a: "a³ = (M₁ + M₂)·P². Measure the distance and period of something orbiting the body (a planet, or one of Jupiter's moons) and solve for the mass." }
      ]
    },
    {
      id: "3.4",
      title: "Orbits in the Solar System",
      minutes: 6,
      pages: "pp. 83–85",
      html:
        '<p>An <span class="term">orbit</span> is the path anything &mdash; planet, moon, comet, spacecraft, ' +
        'star &mdash; takes under gravity. Once you know an orbit, you can calculate where the object will be ' +
        'at any future time.</p>' +
        '<h4>Two named points</h4>' +
        '<p>Every orbit around the Sun has a near point and a far point. The closest point to the Sun, where ' +
        'the object moves <strong>fastest</strong>, is the <span class="term">perihelion</span> (from Greek ' +
        '<em>helios</em>, Sun). The farthest point, where it moves <strong>slowest</strong>, is the ' +
        '<span class="term">aphelion</span>. For something orbiting <strong>Earth</strong> (Greek <em>gee</em>) ' +
        'the matching words are <span class="term">perigee</span> and <span class="term">apogee</span>. This ' +
        'book uses <strong>moon</strong> for a natural object circling a planet and ' +
        '<span class="term">satellite</span> for a human-made one.</p>' +
        '<h4>The planets&rsquo; orbits</h4>' +
        '<p>There are <strong>eight planets</strong>, from Mercury nearest the Sun out to Neptune. By ' +
        'Kepler&rsquo;s third law, Mercury has the shortest year &mdash; <strong>88 Earth-days</strong> &mdash; ' +
        'and so the fastest average speed, about <strong>48 km/s</strong>. Neptune takes <strong>165 ' +
        'years</strong> and creeps along at about <strong>5 km/s</strong>.</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Planet</th><th>Semimajor axis (AU)</th><th>Period (yr)</th><th>Eccentricity</th></tr>' +
        '<tr><td>Mercury</td><td>0.39</td><td>0.24</td><td>0.21</td></tr>' +
        '<tr><td>Venus</td><td>0.72</td><td>0.6</td><td>0.01</td></tr>' +
        '<tr><td>Earth</td><td>1</td><td>1.00</td><td>0.02</td></tr>' +
        '<tr><td>Mars</td><td>1.52</td><td>1.88</td><td>0.09</td></tr>' +
        '<tr><td>(Ceres)</td><td>2.77</td><td>4.6</td><td>0.08</td></tr>' +
        '<tr><td>Jupiter</td><td>5.20</td><td>11.86</td><td>0.05</td></tr>' +
        '<tr><td>Saturn</td><td>9.54</td><td>29.46</td><td>0.06</td></tr>' +
        '<tr><td>Uranus</td><td>19.19</td><td>84.01</td><td>0.05</td></tr>' +
        '<tr><td>Neptune</td><td>30.06</td><td>164.82</td><td>0.01</td></tr>' +
        '</tbody></table></div>' +
        '<p><em>(Ceres is the largest asteroid, now counted as a dwarf planet.)</em></p>' +
        '<p>All the planet orbits have <strong>low eccentricity</strong> &mdash; the most stretched is ' +
        'Mercury&rsquo;s at <strong>0.21</strong>; every other is below <strong>0.1</strong>. It was lucky ' +
        'that <strong>Mars</strong>, at <strong>0.09</strong>, is more eccentric than most of the rest &mdash; ' +
        'otherwise Brahe&rsquo;s naked-eye data would not have been good enough for Kepler to tell its orbit ' +
        'from a circle.</p>' +
        '<p>The planets also orbit <strong>close to one flat plane</strong>, near the plane of Earth&rsquo;s ' +
        'orbit (the <strong>ecliptic</strong>). The dwarf planet Pluto&rsquo;s orbit is tilted about ' +
        '<strong>17&deg;</strong> to that plane, and the dwarf planet Eris&rsquo;s about <strong>44&deg;</strong>, ' +
        'but every major planet stays within <strong>10&deg;</strong> of it.</p>' +
        '<div data-figure="3.10"></div>' +
        '<h4>Asteroids and comets</h4>' +
        '<p>Besides the eight planets and their moons, two kinds of smaller bodies orbit the Sun, both ' +
        'believed to be <strong>leftover chunks from the solar system&rsquo;s formation</strong>:</p>' +
        '<ul>' +
        '<li><strong>Asteroids</strong> have smaller orbits, mostly between <strong>2.2 and 3.3 AU</strong> ' +
        '&mdash; the <span class="term">asteroid belt</span>, sitting in the wide gap between Mars and ' +
        'Jupiter. Stable orbits can survive there precisely because those two planets are so far apart.</li>' +
        '<li><strong>Comets</strong> have bigger, much more stretched orbits, with eccentricities typically ' +
        '<strong>0.8 or higher</strong>. By Kepler&rsquo;s second law they spend most of their time far from ' +
        'the Sun moving slowly, then whip through perihelion fast.</li>' +
        '</ul>',
      keyIdeas: [
        "Perihelion / aphelion = the nearest / farthest points of an orbit around the Sun (fastest / slowest). Around Earth they're called perigee / apogee. Moon = natural; satellite = human-made.",
        "The eight planets run Mercury (88-day year, ~48 km/s) to Neptune (165-year year, ~5 km/s) — closer means shorter period and faster motion.",
        "All planet orbits have low eccentricity (Mercury 0.21 is the most; the rest under 0.1) and lie within about 10° of one common plane, near the ecliptic.",
        "Asteroids sit mostly in the belt between 2.2 and 3.3 AU, in the gap between Mars and Jupiter.",
        "Comets have large, highly eccentric orbits (e ≳ 0.8), spending most of their time far out and moving slowly."
      ],
      selfCheck: [
        { q: "What are perihelion and aphelion, and where does an object move fastest?",
          a: "Perihelion is the point in an orbit closest to the Sun; aphelion is the farthest. The object moves fastest at perihelion." },
        { q: "Why does Mercury have both the shortest year and the fastest orbital speed?",
          a: "It is closest to the Sun. Kepler's third law makes the closest planet's period shortest, and covering a small orbit in a short time means a high speed." },
        { q: "Where is the asteroid belt, and why can stable orbits exist there?",
          a: "Between about 2.2 and 3.3 AU, in the gap between Mars and Jupiter. The two planets are far enough apart that small bodies between them can hold stable orbits." },
        { q: "How do comet orbits differ from planet orbits?",
          a: "Comets have much larger and far more eccentric orbits (e ≈ 0.8+), so they spend most of their time far from the Sun moving slowly and speed up sharply near perihelion." }
      ]
    },
    {
      id: "3.5",
      title: "Motions of Satellites and Spacecraft",
      minutes: 7,
      pages: "pp. 85–87",
      html:
        '<p>The same rules &mdash; Newton&rsquo;s gravitation plus Kepler&rsquo;s laws &mdash; govern ' +
        'human-made <span class="term">satellites</span> and interplanetary probes just as they govern the ' +
        'planets. The first artificial satellite, <strong>Sputnik</strong>, was launched by the Soviet Union ' +
        'on <strong>October 4, 1957</strong>. Since then thousands of satellites have circled Earth, and ' +
        'spacecraft have orbited the Moon, Venus, Mars, Jupiter, Saturn, and several asteroids and comets.</p>' +
        '<p>Once a satellite is up high enough to be clear of air friction, keeping it in orbit takes ' +
        '<strong>no effort at all</strong> &mdash; it behaves exactly like a natural moon and stays there ' +
        'indefinitely. The hard part is the <strong>energy</strong> needed to lift it off the ground and get ' +
        'it up to orbital speed.</p>' +
        '<h4>Newton&rsquo;s cannon</h4>' +
        '<p>Newton pictured firing a bullet horizontally from a mountaintop, with no air in the way. Fire it ' +
        'slowly and gravity pulls it down to the ground nearby. Fire it faster and it lands farther off. Fire ' +
        'it fast enough and <strong>the ground curves away beneath it just as fast as it falls</strong> &mdash; ' +
        'so it never lands, and falls all the way around Earth in a circle. That speed is the ' +
        '<span class="term">circular satellite velocity</span>, about <strong>8 km/s</strong> (roughly 17,500 ' +
        'miles per hour).</p>' +
        '<div data-diagram="newton-cannon"></div>' +
        '<div data-figure="3.11"></div>' +
        '<p>More than <strong>50 new satellites</strong> go up each year, launched by Russia, the United ' +
        'States, China, Japan, India, Israel, and the European Space Agency. They handle weather, ecology, ' +
        'GPS, communications, and military tasks. Most go into <strong>low Earth orbit</strong> because it ' +
        'takes the least launch energy; at 8 km/s they lap the planet in about <strong>90 minutes</strong>. ' +
        'The very lowest orbits are not permanent: when Earth&rsquo;s atmosphere puffs up, it drags on these ' +
        'satellites, they lose energy, and the orbit &ldquo;decays.&rdquo;</p>' +
        '<h4>Leaving Earth</h4>' +
        '<p>To get away from Earth for good, a spacecraft has to reach <span class="term">escape speed</span>, ' +
        'about <strong>11 km/s</strong> (around 25,000 mph). After that it coasts to its target, nudged only ' +
        'by small thrusters, following an orbit around the <strong>Sun</strong> that bends only when it passes ' +
        'near a planet.</p>' +
        '<p>Controllers can use a planet&rsquo;s gravity on purpose &mdash; a <strong>gravity assist</strong> ' +
        '&mdash; to swing a spacecraft toward its next target, gaining or losing energy in the process. ' +
        '<strong>Voyager 2</strong> used a chain of them to fly past Jupiter (<strong>1979</strong>), Saturn ' +
        '(<strong>1980</strong>), Uranus (<strong>1986</strong>), and Neptune (<strong>1989</strong>). The ' +
        '<strong>Galileo</strong> spacecraft, launched in <strong>1989</strong>, flew past Venus once and ' +
        'Earth twice to build up the speed it needed to reach Jupiter.</p>' +
        '<p>To go into orbit around another planet, a spacecraft has to <strong>fire a rocket to slow ' +
        'down</strong> as it arrives, so the planet can capture it into an ellipse. Landing takes still more ' +
        'thrust, and a return trip means carrying enough fuel to do the whole thing again in reverse.</p>',
      keyIdeas: [
        "Sputnik, the first artificial satellite, launched October 4, 1957. Once above atmospheric friction, a satellite stays in orbit indefinitely with no effort — the cost is all in getting there.",
        "Newton's cannon: fire fast enough horizontally and Earth's surface curves away as fast as the object falls, so it orbits. That circular satellite velocity is about 8 km/s (~17,500 mph); low orbits take ~90 minutes.",
        "Escape speed — the speed to leave Earth for good — is about 11 km/s (~25,000 mph).",
        "A gravity assist uses a planet's gravity to redirect a spacecraft and change its energy; Voyager 2 chained flybys of Jupiter (1979), Saturn (1980), Uranus (1986), and Neptune (1989).",
        "To orbit or land on another world, a spacecraft must fire rockets to slow down; a return trip needs fuel to repeat the process in reverse."
      ],
      selfCheck: [
        { q: "In Newton's cannon thought experiment, what makes the bullet go into orbit instead of falling to the ground?",
          a: "Enough horizontal speed (about 8 km/s) that Earth's surface curves away beneath it just as fast as gravity pulls it down, so it keeps falling around Earth without ever reaching the ground." },
        { q: "What is the difference between circular satellite velocity and escape speed for Earth?",
          a: "Circular satellite velocity (~8 km/s) keeps an object in a low circular orbit; escape speed (~11 km/s) lets it leave Earth's gravity for good." },
        { q: "What is a gravity assist, and give an example.",
          a: "Using a planet's gravity to bend a spacecraft's path and change its energy, redirecting it to a new target. Voyager 2 used a series of them to reach Jupiter, Saturn, Uranus, and Neptune." },
        { q: "Why do the lowest Earth orbits eventually decay?",
          a: "When the atmosphere swells, it creates drag on satellites there; they lose energy and gradually spiral down." }
      ]
    },
    {
      id: "3.6",
      title: "Gravity with More Than Two Bodies",
      minutes: 8,
      pages: "pp. 88–91",
      html:
        '<p>So far we have treated the Sun and one planet as a lonely pair. In truth <strong>every planet ' +
        'pulls on every other planet</strong>. Those extra tugs make each orbit drift slightly from the tidy ' +
        'two-body path. Working out the motion of a body pulled by two or more others is genuinely hard &mdash; ' +
        'it can only be done properly with <strong>large computers</strong>.</p>' +
        '<h4>Many bodies at once</h4>' +
        '<p>Imagine a cluster of a thousand stars orbiting a common center. If you know where each star is ' +
        'right now, you can add up the pull of all the others on any one star, find how it accelerates, and ' +
        'work out where it goes in the next instant. The catch is that <strong>all the other stars are moving ' +
        'too</strong>, changing their pull moment by moment, so you have to track every star at once. Modern ' +
        'computers have followed model clusters with up to <strong>a million</strong> members.</p>' +
        '<h4>Small nudges: perturbations</h4>' +
        '<p>Inside the solar system it is easier, because the <strong>Sun&rsquo;s pull dwarfs everything ' +
        'else</strong>. Kepler&rsquo;s laws, which ignore the other planets entirely, already work very well. ' +
        'The leftover effects of the other planets can be handled as small ' +
        '<span class="term">perturbations</span> &mdash; little disturbances added on top. During the 1700s ' +
        'and 1800s, mathematicians built elegant methods for computing these, and could predict planet ' +
        'positions with great precision. That effort led, in <strong>1846</strong>, to the ' +
        '<strong>discovery of a new planet by math</strong>.</p>' +
        '<h4>The discovery of Neptune</h4>' +
        '<p>In <strong>1781</strong>, <strong>William Herschel</strong>, a musician and amateur astronomer, ' +
        'stumbled on the seventh planet, <strong>Uranus</strong>. (It had been recorded as a star in earlier ' +
        'sightings, never recognized as a planet.) Herschel&rsquo;s find showed there could be planets too ' +
        'faint for the naked eye, waiting to be caught with a telescope.</p>' +
        '<p>By <strong>1790</strong> astronomers had an orbit for Uranus. But even after allowing for the ' +
        'pulls of Jupiter and Saturn, Uranus <strong>would not stay on its predicted track</strong> &mdash; ' +
        'it did not match sightings going back to 1690. By <strong>1840</strong> the gap between prediction ' +
        'and observation had grown to about <strong>0.03&deg;</strong>: tiny, but too big to blame on ' +
        'calculation errors.</p>' +
        '<p>In <strong>1843</strong>, <strong>John Couch Adams</strong>, newly finished at Cambridge, worked ' +
        'backward from the wobble to a hidden planet farther out than Uranus, and calculated the mass and ' +
        'orbit it would need. In October <strong>1845</strong> he gave his answer &mdash; a place to look ' +
        '&mdash; to <strong>George Airy</strong>, the Astronomer Royal. We now know Adams was right to within ' +
        '<strong>2&deg;</strong>, but Airy did not follow up promptly.</p>' +
        '<p>Meanwhile the French mathematician <strong>Urbain Jean Joseph Le Verrier</strong>, not knowing ' +
        'about Adams, solved the same problem and published in <strong>June 1846</strong>. Airy saw that Le ' +
        'Verrier&rsquo;s predicted spot agreed with Adams&rsquo; to within <strong>1&deg;</strong> and asked ' +
        '<strong>James Challis</strong> at Cambridge to search. Challis, lacking good charts of the Aquarius ' +
        'region, plotted every faint star he could, meaning to re-check days later for one that had moved. He ' +
        'was slow going through his records: he <strong>had actually recorded the planet</strong> but did not ' +
        'notice.</p>' +
        '<p>About a month later, Le Verrier wrote to <strong>Johann Galle</strong> at the Berlin Observatory. ' +
        'Galle got the letter on <strong>September 23, 1846</strong>, had fresh charts of the region, and ' +
        'found the planet <strong>that same night</strong> &mdash; less than <strong>1&deg;</strong> from the ' +
        'predicted position. The eighth planet was named <strong>Neptune</strong>, for the Roman god of the ' +
        'sea. It was a dramatic win for Newton&rsquo;s gravity, and the credit is shared by ' +
        '<strong>Adams and Le Verrier</strong>.</p>' +
        '<div data-figure="3.14"></div>' +
        '<p>Astronomers were not entirely surprised &mdash; they had suspected a planet from Uranus&rsquo; ' +
        '&ldquo;disobedient&rdquo; motion for years. Two weeks before the find, John Herschel (son of ' +
        'Uranus&rsquo; discoverer) told a meeting: &ldquo;We see [the new planet] as Columbus saw America from ' +
        'the shores of Spain. Its movements have been felt trembling along the far-reaching line of our ' +
        'analysis with a certainty hardly inferior to ocular demonstration.&rdquo; The same kind of work ' +
        '&mdash; painstaking observation plus Newtonian theory &mdash; goes on today in the hunt for planets ' +
        'around other stars.</p>',
      keyIdeas: [
        "Every planet pulls on every other, so real orbits drift from the simple two-body path. The motion of three or more bodies under mutual gravity can only be solved with large computers.",
        "In the solar system the Sun's pull dominates, so the other planets' effects can be treated as small perturbations added to a Kepler orbit.",
        "William Herschel discovered Uranus in 1781 — the first planet found with a telescope (it had earlier been mistaken for a star).",
        "Uranus wouldn't stay on its predicted orbit even after accounting for Jupiter and Saturn; by 1840 the discrepancy was about 0.03°.",
        "John Couch Adams (1845) and Urbain Le Verrier (June 1846) independently predicted an unseen planet's position from that wobble. Johann Galle in Berlin found Neptune on September 23, 1846, within 1° of Le Verrier's prediction."
      ],
      selfCheck: [
        { q: "Why can't the motion of many bodies under mutual gravity be worked out with a simple formula?",
          a: "Each body is pulled by all the others, and all of them are moving and changing their pull at the same time, so every body's motion has to be tracked simultaneously — a job for large computers." },
        { q: "What is a perturbation, and why does treating the planets this way work in the solar system?",
          a: "A small disturbance to an orbit caused by a third body. It works because the Sun's gravity is so dominant that the other planets' pulls are only minor corrections to a Kepler orbit." },
        { q: "How was Neptune discovered?",
          a: "Adams and Le Verrier separately used the unexplained wobble in Uranus's orbit to predict the mass and sky position of an unseen planet beyond it. Johann Galle in Berlin pointed a telescope there on September 23, 1846, and found Neptune within 1° of the prediction." },
        { q: "Why was the discovery of Neptune considered a triumph for Newton's theory of gravity?",
          a: "A planet no one had ever seen was predicted purely from gravitational calculations on another planet's motion, then found almost exactly where the math said it would be." }
      ]
    }
  ];

  /* --------------------------------------------------------------- GLOSSARY */
  CH.glossary = [
    { term: "Orbit", section: "3.1", def: "The path of an object as it revolves around another object or point under the influence of gravity." },
    { term: "Ellipse", section: "3.1", def: "A closed curve for which the sum of the distances from any point on the curve to two fixed points inside (the foci) is always the same." },
    { term: "Conic section", section: "3.1", def: "Any of the curves — circle, ellipse, parabola, hyperbola — formed by the intersection of a plane with a cone." },
    { term: "Focus", section: "3.1", def: "One of two fixed points inside an ellipse from which the summed distance to any point on the ellipse is constant; the Sun sits at one focus of a planet's orbit. (Plural: foci.)" },
    { term: "Major axis", section: "3.1", def: "The longest (maximum) diameter of an ellipse." },
    { term: "Semimajor axis", section: "3.1", def: "Half the major axis of an ellipse; for a planet's orbit it equals the planet's average distance from the Sun, and is used to state the orbit's size." },
    { term: "Eccentricity", section: "3.1", def: "In an ellipse, the ratio of the distance between the foci to the length of the major axis; 0 for a circle, approaching 1 for a very stretched-out ellipse." },
    { term: "Astronomical unit (AU)", section: "3.1", def: "The average distance between Earth and the Sun, about 1.5 × 10^8 kilometers." },
    { term: "Orbital period (P)", section: "3.1", def: "The time an object takes to travel once around the Sun (or around whatever body it orbits)." },
    { term: "Orbital speed", section: "3.1", def: "The speed at which an object moves along its orbit; for a planet on an ellipse it varies, fastest near the Sun and slowest far from it." },
    { term: "Kepler’s first law", section: "3.1", def: "Each planet moves around the Sun in an orbit that is an ellipse, with the Sun at one focus of the ellipse." },
    { term: "Kepler’s second law", section: "3.1", def: "The straight line joining a planet and the Sun sweeps out equal areas in space in equal intervals of time." },
    { term: "Kepler’s third law", section: "3.1", def: "The square of a planet's orbital period is proportional to the cube of the semimajor axis of its orbit — and equal to it when P is in years and a is in AU (P² = a³)." },
    { term: "Newton’s first law", section: "3.2", def: "Every object continues at rest or moves at a constant speed in a straight line unless an outside force compels it to change." },
    { term: "Newton’s second law", section: "3.2", def: "The change of motion (momentum) of a body is proportional to, and in the direction of, the force acting on it." },
    { term: "Newton’s third law", section: "3.2", def: "For every action there is an equal and opposite reaction; two bodies always push on each other equally, in opposite directions." },
    { term: "Force", section: "3.2", def: "A push or pull, with size and direction, that changes an object's motion — starting, stopping, speeding up, slowing down, or turning it." },
    { term: "Momentum", section: "3.2", def: "A measure of a body's motion, equal to its mass times its velocity; with no unbalanced outside force, momentum is conserved." },
    { term: "Velocity", section: "3.2", def: "The speed and the direction of a body's motion together (for example, 44 kilometers per second toward the north)." },
    { term: "Mass", section: "3.2", def: "A measure of the amount of material in an object; unlike weight, it does not change from world to world." },
    { term: "Volume", section: "3.2", def: "The amount of physical space an object occupies, measured in cubic units such as cubic centimeters or liters." },
    { term: "Density", section: "3.2", def: "The ratio of an object's mass to its volume — how tightly its matter is packed; often given in grams per cubic centimeter (water = 1)." },
    { term: "Angular momentum", section: "3.2", def: "A measure of the motion of a rotating or revolving body, equal to its mass times its velocity times its distance from the point it circles; it is conserved." },
    { term: "Gravity", section: "3.3", def: "The mutual attraction between all bodies or particles that have mass." },
    { term: "Newton’s universal law of gravitation", section: "3.3", def: "Every two masses attract along the line joining them with a force F = G·M₁M₂/R² — proportional to both masses and to the inverse square of the distance between them." },
    { term: "Inverse-square law", section: "3.3", def: "A relationship in which a quantity (such as the force of gravity) falls off as the square of the distance: twice as far means one-quarter as strong." },
    { term: "Weight", section: "3.3", def: "The force of gravity on an object; it depends on the local strength of gravity, so it changes from planet to planet even though the object's mass does not." },
    { term: "Free fall", section: "3.3", def: "Motion under gravity alone, with no support force; everything nearby accelerates together, which is why orbiting astronauts feel weightless." },
    { term: "Perihelion", section: "3.4", def: "The point in an orbit where a planet or other object is nearest the Sun (and moving fastest)." },
    { term: "Aphelion", section: "3.4", def: "The point in an orbit where a planet or other object is farthest from the Sun (and moving slowest)." },
    { term: "Perigee", section: "3.4", def: "The point in its orbit where an Earth satellite (or the Moon) is closest to Earth." },
    { term: "Apogee", section: "3.4", def: "The point in its orbit where an Earth satellite (or the Moon) is farthest from Earth." },
    { term: "Satellite", section: "3.4", def: "An object that revolves around a planet; in this book, a human-made one (a natural one is called a moon)." },
    { term: "Asteroid belt", section: "3.4", def: "The region between the orbits of Mars and Jupiter, from about 2.2 to 3.3 AU, where most asteroids are found." },
    { term: "Circular satellite velocity", section: "3.5", def: "The horizontal speed at which an object falls around Earth in a circle instead of hitting the ground — about 8 kilometers per second near the surface." },
    { term: "Escape speed", section: "3.5", def: "The speed a body must reach to break free of another body's gravity for good — about 11 kilometers per second from Earth." },
    { term: "Gravity assist", section: "3.5", def: "Using a planet's gravitational pull during a flyby to redirect a spacecraft and change its speed or energy." },
    { term: "Perturbation", section: "3.6", def: "A small disturbing effect on the orbit or motion of a body produced by the gravity of a third body." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "3.1", q: "Whose precise, decades-long naked-eye observations gave Kepler the data he needed?",
      choices: ["Tycho Brahe", "Nicolaus Copernicus", "Galileo Galilei", "Claudius Ptolemy"],
      answer: 0,
      whyWrong: [null,
        "Copernicus proposed the Sun-centered model but made few new measurements of his own.",
        "Galileo's contribution was the telescope and the study of motion, not a long positional record — and Kepler used pre-telescope data.",
        "Ptolemy lived ~1,400 years earlier; his tables were the ones Brahe's data showed to be off."],
      explain: "Brahe spent about 20 years on the island of Hven measuring planet positions; Kepler inherited that record after Brahe died in 1601." },
    { section: "3.1", q: "In an ellipse, what is always the same for every point on the curve?",
      choices: ["The sum of the distances to the two foci", "The distance to the center", "The distance to the nearer focus", "The angle to the major axis"],
      answer: 0,
      whyWrong: [null,
        "That's true of a circle, not an ellipse — an ellipse has no single center point at a fixed distance from the curve.",
        "The distance to one focus changes as you move around the ellipse; only the sum of both stays fixed.",
        "The angle to the major axis changes continuously around the curve."],
      explain: "The two-foci rule is the defining property of an ellipse, and it's what makes the string-and-tacks drawing method work." },
    { section: "3.1", q: "The semimajor axis of a planet's orbit is:",
      choices: ["Half the longest diameter of the ellipse — and the planet's average distance from the Sun", "The distance between the two foci", "The full width of the ellipse at its narrowest", "The planet's closest approach to the Sun"],
      answer: 0,
      whyWrong: [null,
        "The distance between the foci relative to the major axis is the eccentricity, not the semimajor axis.",
        "The narrowest width is the minor axis; the semimajor axis is half the *longest* diameter.",
        "The closest approach is the perihelion distance, which is less than the semimajor axis."],
      explain: "The semimajor axis, usually written a, is the standard measure of an orbit's size and equals the average Sun–planet distance." },
    { section: "3.1", q: "An ellipse with an eccentricity of 0 is:",
      choices: ["A circle", "A parabola", "A straight line", "A very stretched-out ellipse"],
      answer: 0,
      whyWrong: [null,
        "A parabola is the open curve you get at the boundary case, not eccentricity 0.",
        "A straight line is the other extreme, as eccentricity approaches 1.",
        "A stretched ellipse has an eccentricity close to 1, not 0."],
      explain: "When the two foci sit on top of each other the eccentricity is 0 and the ellipse is a circle, with the semimajor axis playing the role of the radius." },
    { section: "3.1", q: "Kepler's second law says the Sun–planet line sweeps out equal areas in equal times. This means a planet:",
      choices: ["Moves faster when it is closer to the Sun and slower when farther away", "Moves at a constant speed all the way around its orbit", "Moves fastest when it is farthest from the Sun", "Always keeps the same distance from the Sun"],
      answer: 0,
      whyWrong: [null,
        "Constant speed happens only for a circular orbit; on an ellipse the speed varies.",
        "It's the reverse — a planet is slowest at aphelion, its farthest point.",
        "The distance changes continuously on an elliptical orbit; that's the whole point."],
      explain: "To sweep the same area in the same time from close in, where the line is short, the planet must move through a wider arc — i.e., faster." },
    { section: "3.1", q: "Kepler's third law, in units of years and AU, is:",
      choices: ["P² = a³", "P = a²", "P³ = a²", "P = a"],
      answer: 0,
      whyWrong: [null,
        "The period is not simply the square of the distance; the correct powers are 2 and 3.",
        "The powers are swapped — it's the period that's squared and the distance that's cubed.",
        "That would only hold for Earth (1 = 1); it fails for every other planet."],
      explain: "Square the period in years and it equals the cube of the semimajor axis in AU. For Earth, 1² = 1³." },
    { section: "3.1", q: "A small body orbits the Sun with a semimajor axis of 4 AU. Roughly what is its orbital period?",
      choices: ["About 8 years", "About 4 years", "About 16 years", "About 2 years"],
      answer: 0,
      whyWrong: [null,
        "That would be true only if P = a, which isn't Kepler's law.",
        "16 years would be a³, not the period; you still need the square root.",
        "2 years is roughly √4, but you must cube first: √(4³) = √64 = 8."],
      explain: "P² = a³ = 4³ = 64, so P = √64 = 8 years." },
    { section: "3.1", q: "Kepler's three laws are best described as:",
      choices: ["A precise description of how the planets move, without explaining what causes the motion", "A full explanation of why gravity makes planets orbit", "Rough approximations that only work for Earth and Mars", "A restatement of Ptolemy's epicycle model"],
      answer: 0,
      whyWrong: [null,
        "Kepler's laws don't mention forces at all; explaining the cause was Newton's achievement.",
        "They work for every planet, not just two, and to high precision.",
        "They replaced the epicycle model — no circles-on-circles required."],
      explain: "The laws describe the motion exactly but say nothing about its cause. Newton later showed gravity produces exactly these orbits." },
    { section: "3.2", q: "Newton's first law of motion states that an object with no outside force acting on it will:",
      choices: ["Stay at rest, or keep moving in a straight line at constant speed", "Gradually slow down and stop", "Move in a circle", "Speed up on its own"],
      answer: 0,
      whyWrong: [null,
        "Slowing down requires a force — usually friction. With no force, motion continues unchanged.",
        "Moving in a circle is a change of direction, which needs a force pulling toward the center.",
        "Speeding up also requires a force; nothing accelerates itself."],
      explain: "This is the law of inertia: motion (momentum) continues unchanged unless a force acts. It restates Galileo's finding." },
    { section: "3.2", q: "Momentum depends on an object's mass and its:",
      choices: ["Velocity (speed and direction)", "Speed only", "Volume", "Density"],
      answer: 0,
      whyWrong: [null,
        "Direction matters too — momentum is a directed quantity, so it's mass times velocity, not mass times speed.",
        "Volume is how much space an object takes up; it isn't part of momentum.",
        "Density is mass per volume; it isn't part of momentum either."],
      explain: "Momentum = mass × velocity. Velocity includes direction, so two objects with equal speeds but opposite directions have opposite momenta." },
    { section: "3.2", q: "According to Newton's second law, if you apply the same force to a pen and to a heavy textbook, the pen will:",
      choices: ["Accelerate more, because it has less mass", "Accelerate less, because it has less mass", "Accelerate the same amount as the textbook", "Not accelerate at all"],
      answer: 0,
      whyWrong: [null,
        "Less mass means *more* acceleration for the same force, not less.",
        "Acceleration depends on mass, so equal forces on unequal masses give unequal accelerations.",
        "Any unbalanced force produces some acceleration."],
      explain: "For a given force, acceleration is larger when mass is smaller. The low-mass pen speeds up faster." },
    { section: "3.2", q: "A rocket engine works by Newton's third law: it pushes exhaust gas out the back, and in return:",
      choices: ["An equal and opposite force pushes the rocket forward", "The air behind the rocket pushes it forward", "The exhaust pulls the rocket backward", "Gravity is temporarily cancelled"],
      answer: 0,
      whyWrong: [null,
        "No air is needed — a rocket actually works best in a vacuum.",
        "The reaction force pushes the rocket *forward*, opposite to the exhaust.",
        "Rockets don't cancel gravity; they produce thrust by throwing mass backward."],
      explain: "Every force comes in a pair. The engine's push on the exhaust is matched by the exhaust's push on the rocket." },
    { section: "3.2", q: "Which statement correctly matches the terms?",
      choices: ["Mass is how much matter; volume is how much space; density is mass ÷ volume", "Mass is how much space; volume is how tightly packed; density is weight", "Mass and weight are the same everywhere; volume is mass ÷ density", "Density is how much matter; mass is mass ÷ volume"],
      answer: 0,
      whyWrong: [null,
        "Mass isn't a measure of space, and density isn't weight.",
        "Mass and weight are not the same — weight depends on local gravity.",
        "Density is not 'how much matter' (that's mass), and mass isn't mass ÷ volume."],
      explain: "Mass = how much, volume = how big, density = how tightly packed = mass divided by volume (g/cm³, with water = 1)." },
    { section: "3.2", q: "The conservation of angular momentum explains why a spinning figure skater speeds up when she:",
      choices: ["Pulls her arms in toward her body", "Stretches her arms out wide", "Bends her knees", "Looks toward the ceiling"],
      answer: 0,
      whyWrong: [null,
        "Arms out increases the distance term, so she slows down.",
        "Bending the knees doesn't change how the mass is spread around the spin axis much.",
        "Head position has almost no effect on the spin."],
      explain: "Angular momentum ≈ mass × velocity × distance from the axis. Pulling mass inward shrinks the distance, so the speed must rise to keep the product constant — the same reason a planet speeds up near the Sun." },
    { section: "3.3", q: "In Newton's law of gravitation, the force between two masses is proportional to:",
      choices: ["Each mass, and the inverse square of the distance between them", "Each mass, and the distance between them", "The difference of the masses, and the distance", "Only the larger of the two masses"],
      answer: 0,
      whyWrong: [null,
        "The force gets *weaker* with distance, not stronger, and it falls as the square of distance.",
        "It depends on the product of the masses, not their difference.",
        "Both masses enter the formula symmetrically; the smaller one matters just as much."],
      explain: "F = G·M₁M₂/R²: multiply by each mass, divide by distance squared." },
    { section: "3.3", q: "If you move two objects three times farther apart, the gravitational force between them becomes:",
      choices: ["One-ninth as strong", "One-third as strong", "Three times as strong", "Nine times as strong"],
      answer: 0,
      whyWrong: [null,
        "Gravity falls as distance *squared*, so it's 1/3², not 1/3.",
        "The force decreases with distance, it doesn't increase.",
        "Nine times stronger would be the case if force grew as distance squared — it's the opposite."],
      explain: "Inverse-square law: 3× the distance → 1/3² = 1/9 the force." },
    { section: "3.3", q: "The Moon is about 60 Earth-radii from Earth's center. Compared with an apple's acceleration at Earth's surface, the Moon's acceleration toward Earth is about:",
      choices: ["3,600 times smaller", "60 times smaller", "3,600 times larger", "The same"],
      answer: 0,
      whyWrong: [null,
        "You have to square the distance ratio: 60² = 3,600, not 60.",
        "Gravity weakens with distance, so the Moon's acceleration is smaller, not larger.",
        "It can't be the same — the Moon is 60 times farther out."],
      explain: "Gravity falls as distance squared, so at 60 Earth-radii the acceleration is 1/60² = 1/3,600 of the surface value — matching the Moon's actual orbital acceleration." },
    { section: "3.3", q: "Your weight and your mass differ in that:",
      choices: ["Mass is the same everywhere, but weight depends on the local force of gravity", "Weight is the same everywhere, but mass depends on gravity", "They are identical and interchangeable", "Mass changes with altitude but weight does not"],
      answer: 0,
      whyWrong: [null,
        "It's the reverse: mass is intrinsic, weight varies with gravity.",
        "They measure different things and can differ greatly (e.g., on the Moon).",
        "Mass doesn't change with altitude; weight changes slightly because gravity does."],
      explain: "Take the same person to the Moon and their mass is unchanged, but they weigh about one-sixth as much." },
    { section: "3.3", q: "Astronauts orbiting Earth appear weightless because they are:",
      choices: ["In free fall, falling around Earth along with their spacecraft", "Beyond the reach of Earth's gravity", "In a region where gravity is naturally zero", "Held up by air pressure inside the cabin"],
      answer: 0,
      whyWrong: [null,
        "Just a few hundred km up, Earth's gravity is nearly as strong as at the surface.",
        "There's no such region near Earth; gravity never becomes exactly zero.",
        "Air pressure doesn't counteract gravity, and the effect happens equally in a vacuum."],
      explain: "In free fall the astronauts, cabin, and every object accelerate together, so nothing presses on anything — the same feeling as an elevator whose cable has snapped, except they're moving sideways fast enough to fall around Earth." },
    { section: "3.3", q: "Newton's version of Kepler's third law, a³ = (M₁ + M₂) × P², is especially useful because it lets astronomers:",
      choices: ["Calculate the masses of astronomical bodies from the orbits of things going around them", "Prove that the planets move in perfect circles", "Show that gravity does not act between galaxies", "Replace the need for the gravitational constant G"],
      answer: 0,
      whyWrong: [null,
        "The law is built on elliptical orbits, not circular ones.",
        "Gravity acts between galaxies too — and this law is used to weigh them.",
        "It doesn't remove G; it adds the mass terms Kepler's version left out."],
      explain: "Measure a distance and a period for something in orbit — a planet, a moon, a companion star — and solve for the mass. That's how we weigh the Sun, Jupiter, stars, and galaxies." },
    { section: "3.3", q: "Why did Kepler's original third law (P² = a³) work even though it left out the masses?",
      choices: ["A planet's mass is tiny compared with the Sun's, so M₁ + M₂ is almost exactly 1", "The masses cancel out exactly in every case", "Kepler secretly included the masses without saying so", "Mass has no effect on gravity at all"],
      answer: 0,
      whyWrong: [null,
        "They don't cancel in general — for two stars of comparable mass the term matters a lot.",
        "Kepler had no concept of the gravitational mass term; Newton added it.",
        "Mass is central to gravity; it's just that the planet's share is negligible here."],
      explain: "In units of the Sun's mass, M_Sun = 1 and a planet's mass is a tiny fraction, so the sum rounds to 1 and Newton's formula collapses to Kepler's." },
    { section: "3.4", q: "The point in a planet's orbit closest to the Sun is called the:",
      choices: ["Perihelion", "Aphelion", "Perigee", "Apogee"],
      answer: 0,
      whyWrong: [null,
        "Aphelion is the *farthest* point from the Sun.",
        "Perigee is the closest point to *Earth*, used for satellites and the Moon.",
        "Apogee is the farthest point from Earth."],
      explain: "Peri- means near, and helios means Sun. A planet moves fastest at perihelion." },
    { section: "3.4", q: "Which planet has the shortest orbital period and the highest average orbital speed?",
      choices: ["Mercury", "Neptune", "Jupiter", "Earth"],
      answer: 0,
      whyWrong: [null,
        "Neptune has the longest period (about 165 years) and the slowest speed (~5 km/s).",
        "Jupiter is far out, with an 11.86-year period and a modest speed.",
        "Earth's one-year period is longer than Mercury's 88 days."],
      explain: "Mercury, closest to the Sun, orbits in 88 Earth-days at about 48 km/s — the fastest of the planets." },
    { section: "3.4", q: "The orbits of the eight planets are:",
      choices: ["Nearly circular and confined close to one common plane", "Highly elongated and randomly tilted", "Perfect circles all in exactly the same plane", "Ellipses with the Sun at the center"],
      answer: 0,
      whyWrong: [null,
        "Only comets have highly elongated, steeply tilted orbits; the planets don't.",
        "The orbits are ellipses (not perfect circles), and they're tilted by up to about 10°, not exactly aligned.",
        "The Sun is at a focus of each ellipse, not the center."],
      explain: "All eight planets have low-eccentricity orbits within about 10° of the ecliptic. Pluto (17°) and Eris (44°) are dwarf planets and lie well outside that." },
    { section: "3.4", q: "Most asteroids orbit the Sun:",
      choices: ["In the belt between Mars and Jupiter, from about 2.2 to 3.3 AU", "Just outside Neptune's orbit", "Between Mercury and Venus", "In highly eccentric orbits like comets"],
      answer: 0,
      whyWrong: [null,
        "Objects beyond Neptune are Kuiper Belt bodies, not main-belt asteroids.",
        "There is no stable belt that close to the Sun.",
        "Most asteroid orbits have low eccentricity; the highly eccentric orbits belong to comets."],
      explain: "The gap between Mars and Jupiter is wide enough for small bodies to hold stable orbits, and that's where the asteroid belt sits." },
    { section: "3.4", q: "Comet orbits, compared with planet orbits, are typically:",
      choices: ["Larger and much more eccentric (e ≈ 0.8 or more)", "Smaller and nearly circular", "The same size but tilted 90°", "Perfectly circular but very large"],
      answer: 0,
      whyWrong: [null,
        "Comets have large orbits, not small ones, and they are far from circular.",
        "Their defining feature is high eccentricity, not a 90° tilt.",
        "Highly eccentric means distinctly non-circular."],
      explain: "With eccentricities around 0.8+, comets spend most of their time far from the Sun moving slowly, then whip through perihelion." },
    { section: "3.5", q: "In Newton's cannon thought experiment, an object goes into orbit when it is fired horizontally fast enough that:",
      choices: ["Earth's surface curves away beneath it as fast as gravity pulls it down", "Gravity stops acting on it", "It reaches the top of the atmosphere", "Air resistance balances its weight"],
      answer: 0,
      whyWrong: [null,
        "Gravity keeps acting the whole time — that's what keeps it curving around Earth.",
        "Altitude alone doesn't create an orbit; horizontal speed does.",
        "The experiment assumes no air at all."],
      explain: "At about 8 km/s the object falls continuously but never gets closer to the ground, because Earth curves away under it just as fast. That's an orbit." },
    { section: "3.5", q: "The circular satellite velocity near Earth's surface is about 8 km/s. The escape speed from Earth is about:",
      choices: ["11 km/s", "8 km/s", "5 km/s", "25 km/s"],
      answer: 0,
      whyWrong: [null,
        "8 km/s keeps you in a circular orbit; leaving Earth for good needs more.",
        "5 km/s is Neptune's orbital speed around the Sun, not Earth's escape speed.",
        "25 km/s is roughly the escape speed in miles per hour (~25,000 mph), not km/s."],
      explain: "About 11 km/s (~25,000 mph) is enough to break free of Earth's gravity entirely." },
    { section: "3.5", q: "A “gravity assist” is when a spacecraft:",
      choices: ["Uses a planet's gravity during a flyby to change its speed and direction", "Fires its main engine to escape the Sun", "Is pulled back to Earth by the Moon", "Uses solar panels to gain energy from sunlight"],
      answer: 0,
      whyWrong: [null,
        "The point of a gravity assist is to avoid spending fuel — the planet does the work.",
        "That describes a lunar return, not a gravity assist.",
        "Solar panels power instruments; they don't provide a gravity assist."],
      explain: "Voyager 2 chained gravity assists past Jupiter (1979), Saturn (1980), Uranus (1986), and Neptune (1989)." },
    { section: "3.5", q: "Once a satellite is in a high-enough orbit (free of atmospheric drag), keeping it there requires:",
      choices: ["Essentially no effort — it stays in orbit indefinitely", "A constant forward thrust from its engines", "Regular pushes from the ground", "A tether connecting it to Earth"],
      answer: 0,
      whyWrong: [null,
        "No continuous thrust is needed; that's Newton's first law — it coasts.",
        "Nothing from the ground touches it once it's up.",
        "Satellites are not tethered; gravity alone holds them in orbit."],
      explain: "The hard part is the energy to reach orbit. After that, with no friction, the satellite coasts around Earth on its own." },
    { section: "3.6", q: "Why does calculating the motion of three or more bodies under mutual gravity require large computers?",
      choices: ["Every body pulls on every other, and all of them are moving and changing their pull at once", "Gravity behaves differently when three bodies are involved", "Newton's laws don't apply to more than two bodies", "The gravitational constant changes with the number of bodies"],
      answer: 0,
      whyWrong: [null,
        "Gravity is the same law; it's the bookkeeping of many simultaneous pulls that's hard.",
        "Newton's laws apply to any number of bodies — there's just no simple closed formula.",
        "G is a fixed constant of nature."],
      explain: "You must track the changing force on, and motion of, every body simultaneously, step by tiny step — a job for computers." },
    { section: "3.6", q: "Within the solar system, the effects of the other planets on a given planet's orbit can be treated as small perturbations because:",
      choices: ["The Sun's gravitational pull is far stronger than any planet's", "The other planets are all much farther away than the Sun", "Planets don't actually attract one another", "The perturbations always cancel out exactly"],
      answer: 0,
      whyWrong: [null,
        "Some planets can come fairly close; it's the Sun's dominance, not distance, that makes their pull minor.",
        "They do attract one another — that's what a perturbation is.",
        "Perturbations don't cancel; they accumulate, which is how Neptune was found."],
      explain: "Because the Sun dominates, a Kepler orbit is a very good first approximation and the planets add only small corrections." },
    { section: "3.6", q: "Who discovered Uranus, and how?",
      choices: ["William Herschel, in 1781, spotting it with a telescope as a moving object", "Galileo, in 1610, with his first telescope", "Le Verrier, by mathematical prediction", "Ancient Greek astronomers, with the naked eye"],
      answer: 0,
      whyWrong: [null,
        "Galileo never saw Uranus; his telescope work was on Jupiter's moons, Venus, and the Moon.",
        "Le Verrier's mathematical prediction was for Neptune, not Uranus.",
        "Uranus is at the very edge of naked-eye visibility and had been recorded as a star, never recognized as a planet."],
      explain: "Herschel, a musician and amateur astronomer, noticed in 1781 that this 'star' moved like a planet." },
    { section: "3.6", q: "Neptune was discovered in 1846 after:",
      choices: ["Adams and Le Verrier predicted its position from unexplained wobbles in Uranus's orbit", "A comet was seen colliding with it", "Herschel's telescope was pointed at Uranus again", "Kepler calculated a missing planet from his third law"],
      answer: 0,
      whyWrong: [null,
        "No collision was involved; the clue was Uranus straying from its predicted path.",
        "Herschel discovered Uranus decades earlier; that's a separate event.",
        "Kepler died in 1630, long before Uranus or Neptune were known as planets."],
      explain: "Both mathematicians used the ~0.03° discrepancy in Uranus's orbit to compute where an unseen planet must be. Johann Galle in Berlin found Neptune within 1° of Le Verrier's prediction on September 23, 1846." },
    { section: "3.6", q: "The discovery of Neptune is considered a major triumph for Newton's theory of gravity because:",
      choices: ["A completely unseen planet was predicted by calculation and then found almost exactly where the math said", "It proved the planets move in circles", "It showed gravity is stronger between larger planets", "It was the first planet ever seen through a telescope"],
      answer: 0,
      whyWrong: [null,
        "Neptune's orbit is an ellipse like the others; circles weren't the point.",
        "The discovery was about predicting position, not re-measuring the strength of gravity.",
        "That was Uranus, found by Herschel in 1781."],
      explain: "Predicting an unknown world from its gravitational tug on another planet, then finding it on the first night of looking, was a stunning confirmation of Newtonian theory." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[3] = CH;
})();
