/* =============================================================================
   Astronomy 2e — Chapter 2: Observing the Sky: The Birth of Astronomy
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 2), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[2].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 2,
    chapterTitle: "Observing the Sky: The Birth of Astronomy",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/2-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 32–58"
  };

  CH.tools = ["astronomers"];

  /* ------------------------------------------ MATCH: WHO DID WHAT */
  /* The figures of Chapter 2 and the one thing each is best known for
     here. "did" is short so it fits a matching-game tile; "more" adds
     the dates and detail for the Learn tab. */
  CH.astronomers = [
    { name: "Pythagoras",
      did: "Suggested Earth should be a sphere",
      more: "Greek thinker of about 2,500 years ago who prized circles and spheres as the “perfect” forms and said Earth should have that shape; belief in a round Earth may trace back to him." },
    { name: "Aristarchus of Samos",
      did: "Suggested that Earth moves around the Sun",
      more: "310–230 BCE. Centuries before Copernicus he argued for a Sun-centered cosmos, but almost no one followed him." },
    { name: "Aristotle",
      did: "Showed Earth is round from its curved shadow on the Moon",
      more: "384–322 BCE. Also noted that travelers see new stars as they head south, and reasoned the Sun is farther away than the Moon." },
    { name: "Eratosthenes",
      did: "Measured the size of the whole Earth from two noon shadows",
      more: "276–194 BCE, in Alexandria. The 7° gap between the noon Sun at Syene and at Alexandria is 1/50 of a circle — enough to size the planet." },
    { name: "Hipparchus",
      did: "Made a star catalog and discovered precession",
      more: "About 150 BCE, on Rhodes. Catalogued ~850 stars, invented the brightness (magnitude) scale, and found that Earth's axis slowly wobbles." },
    { name: "Ptolemy",
      did: "Explained planet motion with circles-on-circles (epicycles)",
      more: "About 140 CE, in Alexandria. His book the Almagest put each planet on an epicycle riding a deferent around a still Earth; it lasted over 1,000 years." },
    { name: "Copernicus",
      did: "Revived the Sun-centered model of the solar system",
      more: "1473–1543. De Revolutionibus (1543) put the Sun in the middle, made Earth just another planet, and explained retrograde motion with no epicycles." },
    { name: "Galileo",
      did: "Turned a telescope on the sky — Jupiter's moons, the phases of Venus",
      more: "1564–1642. Founder of experimental science; his telescope evidence tipped the balance to the Sun-centered model and got him tried by the Inquisition." },
    { name: "Hans Lippershey",
      did: "Made the 1608 “spyglass” that first drew notice",
      more: "Dutch spectacle-maker (1570–1619). His spyglass was the first to attract wide attention; Galileo heard of it, rebuilt one far stronger, and pointed it upward." }
  ];

  /* --------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "2.1",
      title: "The Sky Above",
      minutes: 8,
      pages: "pp. 32–41",
      html:
        '<p>Look up on a clear night and it really seems like Earth is sitting still in the middle of ' +
        'everything, with the whole sky turning around us. That idea is called the ' +
        '<span class="term">geocentric</span> model &mdash; &ldquo;geocentric&rdquo; just means ' +
        '&ldquo;Earth in the center.&rdquo; It felt obvious, and almost everyone believed it until about ' +
        '500 years ago (the period in Europe called the Renaissance). But it is <strong>wrong</strong>, and ' +
        'working out why is one of the great stories in science. Let&rsquo;s build the sky up the way the ' +
        'ancients saw it.</p>' +
        '<h4>The sky looks like a giant dome</h4>' +
        '<p>Far from city lights, the stars look like they are stuck to the inside of a huge dark dome, with ' +
        'you standing right in the middle. The spot <strong>straight above your head</strong> is your ' +
        '<span class="term">zenith</span>. The circle all around you <strong>where the sky meets the ' +
        'ground</strong> is your <span class="term">horizon</span>.</p>' +
        '<p>Watch for a while and the stars rise in the east, slide across the dome, and set in the west &mdash; ' +
        'all together, keeping their patterns. Night after night it looks like the whole dome is one big ' +
        'turning ball. The early Greeks called it the <span class="term">celestial sphere</span> &mdash; a ' +
        'giant imaginary ball with the stars fixed on it. (Some of them thought it was a real ball of crystal ' +
        'with the stars set in like tiny jewels.)</p>' +
        '<p>We now know the sky is not really turning &mdash; <strong>Earth is</strong>. Earth spins all the ' +
        'way around once every <strong>24 hours</strong>, like a top, around a line through the North and ' +
        'South Poles called its <strong>axis</strong>. That spin is what makes the Sun, Moon, and stars rise ' +
        'and set. The stars are not on a dome either; they sit at wildly different distances. But the ' +
        '&ldquo;sphere&rdquo; is still a handy way to talk about where things are in the sky. As it ' +
        '&ldquo;turns,&rdquo; the star patterns hold their shape (the Big Dipper looks the same all night, ' +
        'it just rotates), and even the planets barely move against the stars over one night. The only ' +
        'things that really streak across the sky are <strong>meteors</strong> &mdash; quick ' +
        '&ldquo;shooting stars.&rdquo; They are not stars at all; they are tiny specks of space dust burning ' +
        'up in our air.</p>' +
        '<h4>The spin points and the middle line</h4>' +
        '<p>Stretch Earth&rsquo;s axis out into space. The two spots where it pokes through the sky are the ' +
        '<span class="term">north celestial pole</span> and <span class="term">south celestial pole</span> ' +
        '&mdash; the two points the whole sky seems to spin around. Now take Earth&rsquo;s equator and blow ' +
        'it up onto the sky too: that circle is the <span class="term">celestial equator</span>, sitting ' +
        'exactly halfway between the two poles.</p>' +
        '<p>What you see in the sky depends on <strong>where you stand on Earth</strong> &mdash; how far you ' +
        'are from the equator (your <strong>latitude</strong>):</p>' +
        '<ul>' +
        '<li><strong>Standing at the North Pole:</strong> the north celestial pole is straight overhead, at ' +
        'your zenith. The celestial equator runs right along your horizon. Every star just circles around ' +
        'and around &mdash; <strong>nothing rises or sets</strong>. You can only ever see the northern half ' +
        'of the whole sky.</li>' +
        '<li><strong>Standing on the equator:</strong> the celestial equator passes straight over your head. ' +
        'The two celestial poles sit on your horizon, due north and due south. Every star rises straight up ' +
        'in the east and drops straight down in the west, and each one is above the horizon for exactly half ' +
        'the day.</li>' +
        '<li><strong>Standing in between</strong> (like most of the US or Europe): the north celestial pole ' +
        'is partway up &mdash; and <strong>its height above the northern horizon is exactly equal to your ' +
        'latitude</strong>. In San Francisco, which is 38&deg; from the equator, the pole sits 38&deg; up.</li>' +
        '</ul>' +
        '<div data-diagram="sky-latitude"></div>' +
        '<p>For that person in San Francisco, any star closer than 38&deg; to the north celestial pole ' +
        '<strong>never sets</strong> &mdash; it just goes in circles up there, night after night. That ring ' +
        'of always-visible sky is the <span class="term">north circumpolar zone</span> (it holds the Big ' +
        'Dipper, the Little Dipper, and Cassiopeia). In the same way, stars within 38&deg; of the ' +
        '<em>south</em> celestial pole never come up at all. Right now there happens to be a star, ' +
        '<span class="term">Polaris</span>, sitting almost exactly on the north celestial pole, so it barely ' +
        'moves while everything else wheels around it.</p>' +
        '<p class="callout-inline"><strong>Measuring the sky with angles.</strong> A full circle is ' +
        '360&deg;. The dome of the sky, from one horizon up over your head to the opposite horizon, is half ' +
        'of that: 180&deg;. The full Moon is about <strong>half a degree</strong> wide &mdash; roughly the ' +
        'width of your little finger held out at arm&rsquo;s length.</p>' +
        '<h4>The Sun&rsquo;s slow walk: the ecliptic</h4>' +
        '<p>The stars are still up there in the daytime; you just cannot see them, because sunlight ' +
        'scattering in our air makes the sky too bright. The Sun sits at some spot on the celestial sphere ' +
        'too &mdash; and here is the key thing: <strong>the Sun creeps about 1&deg; eastward against the ' +
        'stars every day</strong>. After a whole year it has gone all the way around and back. (Really it is ' +
        'Earth going around the Sun, but from here it looks like the Sun moving.) That yearly loop the Sun ' +
        'traces is called the <span class="term">ecliptic</span>. Because the Sun drifts a little each day, ' +
        'it comes up about <strong>4 minutes later</strong> each day compared with the stars.</p>' +
        '<p>The ecliptic does not line up with the celestial equator &mdash; it is tilted by about ' +
        '<strong>23.5&deg;</strong>. That is because Earth&rsquo;s spin axis is tipped about 23.5&deg; from ' +
        'straight up-and-down compared with its path around the Sun. This tilt is why the Sun climbs high in ' +
        'the sky in summer and stays low in winter &mdash; <strong>it is what gives us the seasons</strong>.</p>' +
        '<div data-diagram="seasons"></div>' +
        '<h4>Stars that stay put, and stars that wander</h4>' +
        '<p>The Sun is not the only thing that drifts against the stars. The Moon does, and so do the ' +
        'planets you can see without a telescope: Mercury, Venus, Mars, Jupiter, and Saturn (plus Uranus, if ' +
        'your eyes are very sharp). Each night they rise and set with everything else, but over days and ' +
        'weeks they slowly slide among the star patterns. The Greeks split the sky into the ' +
        '<strong>fixed stars</strong>, which keep their patterns for lifetimes, and the ' +
        '<strong>wandering stars</strong>, which move &mdash; and their word for &ldquo;wanderer&rdquo; is ' +
        'where we get <span class="term">planet</span>.</p>' +
        '<p>The ancients counted <strong>seven</strong> wanderers in all: the Sun, the Moon, and five ' +
        'planets. That is why a week has seven days &mdash; one for each. The Moon is the fastest of them, ' +
        'going all the way around the sky in about a month and shifting roughly 12&deg; per day (about 24 ' +
        'Moon-widths).</p>' +
        '<p>All these wanderers stay close to the ecliptic, because their orbits are all nearly in the same ' +
        'flat plane. You will always find the Moon and planets inside a band about <strong>18&deg; ' +
        'wide</strong> centered on the ecliptic, called the <span class="term">zodiac</span>. ' +
        '(&ldquo;Zodiac&rdquo; comes from the same root as &ldquo;zoo&rdquo; &mdash; a circle of animals ' +
        '&mdash; because a lot of the star patterns in that band looked like animals to the ancients.)</p>' +
        '<h4>Constellations: dividing up the whole sky</h4>' +
        '<p>Under a really dark sky you can see about <strong>3,000 stars</strong>. To find their way ' +
        'around, people in every culture connected the dots into pictures &mdash; you probably know the Big ' +
        'Dipper and Orion the hunter with his three-star belt. Different cultures saw different pictures.</p>' +
        '<p>In the early 1900s, astronomers made it official. Today a <span class="term">constellation</span> ' +
        'is not really a picture at all &mdash; it is <strong>one of 88 boxes that carve up the entire ' +
        'sky</strong>, with straight borders running north&ndash;south and east&ndash;west, so that every ' +
        'single point in the sky belongs to exactly one constellation. It is like the way the 50 US states ' +
        'cover the whole map (and, like states, the constellations are not all the same size). Each one is ' +
        'mostly named after the old Greek star picture inside it.</p>' +
        '<p>A smaller, eye-catching star pattern &mdash; one that is not a whole constellation, or that ' +
        'spills across a few of them &mdash; is called an <span class="term">asterism</span>. The Big Dipper ' +
        'is an asterism inside the constellation Ursa Major, the Great Bear. And do not worry that the ' +
        'constellations do not look like their names: the Greeks named regions of sky after their myths ' +
        'first, then fit the stars to the stories as best they could.</p>',
      keyIdeas: [
        "The sky looks like a giant ball of stars turning around you, but it's really Earth spinning once every 24 hours. Straight up = your zenith; where sky meets ground = your horizon.",
        "Stretch Earth's poles and equator into space and you get the celestial poles and the celestial equator. The sky seems to spin around the celestial poles.",
        "What you can see depends on your latitude: the north celestial pole sits as high above your northern horizon as your latitude number, and stars close to it never set (they're \"circumpolar\").",
        "The Sun slides about 1° east against the stars each day, tracing a yearly path called the ecliptic. The ecliptic is tilted 23.5° — that's Earth's tilt — and that tilt makes the seasons.",
        "The Moon and planets (\"wanderers\") also drift against the stars, always staying inside the ~18°-wide zodiac band around the ecliptic.",
        "A modern constellation is one of 88 boxes that cover the whole sky — not just a star picture."
      ],
      selfCheck: [
        { q: "At latitude 40° N, how high is the north celestial pole, and what does “circumpolar” mean?",
          a: "About 40° above the northern horizon. Circumpolar stars lie within 40° of that pole and never set — they circle it all night, every night." },
        { q: "What is the ecliptic, and why is it tilted relative to the celestial equator?",
          a: "The Sun's apparent yearly path around the celestial sphere. It is tilted about 23.5° because Earth's spin axis is tilted about 23.5° from straight up out of its orbit." },
        { q: "In modern usage, what is a constellation?",
          a: "One of the 88 boxes that completely divide up the sky (every point of sky is in exactly one) — not merely a star picture." },
        { q: "Why did the ancient Greeks call the planets “wanderers”?",
          a: "Unlike the fixed stars, the planets slowly change position among the star patterns from night to night." }
      ]
    },
    {
      id: "2.2",
      title: "Ancient Astronomy",
      minutes: 10,
      pages: "pp. 41–48",
      html:
        '<h4>Sky-watchers all over the world</h4>' +
        '<p>Long before the Greeks, people everywhere were watching the sky to keep a calendar and to find ' +
        'their way. Astronomers in Babylon, Assyria, and Egypt knew roughly how long a year is. The ' +
        'Egyptians 3,000 years ago used a <strong>365-day calendar</strong>, and they watched for the ' +
        'morning when the bright star <strong>Sirius</strong> first popped up before dawn &mdash; that was ' +
        'their signal that the Nile River was about to flood. Chinese astronomers kept a calendar too, and ' +
        'wrote down comets, bright meteors, spots on the Sun, and &ldquo;guest stars&rdquo; (stars that ' +
        'suddenly flared up bright for a few weeks &mdash; we now know those were <em>exploding</em> stars, ' +
        'and their records still help us today). The Maya in Central America built a calendar around the ' +
        'planet Venus. Polynesian sailors crossed huge stretches of open ocean steering by the stars. And in ' +
        'Britain, people stacked giant stones &mdash; like Stonehenge, from about <strong>2800 BCE</strong> ' +
        '&mdash; to track the Sun and Moon.</p>' +
        '<h4>How the Greeks knew Earth is a ball</h4>' +
        '<p>How the universe is put together and where it came from is called ' +
        '<span class="term">cosmology</span>. Educated people around the eastern Mediterranean knew Earth ' +
        'was round <strong>more than 2,000 years before Columbus</strong>. The idea may go back to ' +
        '<strong>Pythagoras</strong> about 2,500 years ago, who loved the sphere as a &ldquo;perfect&rdquo; ' +
        'shape.</p>' +
        '<p><strong>Aristotle</strong> (who lived 384&ndash;322 BCE) gave two very good reasons Earth must be ' +
        'a ball:</p>' +
        '<ul>' +
        '<li>During a <span class="term">lunar eclipse</span>, Earth&rsquo;s shadow falls on the Moon &mdash; ' +
        'and the edge of that shadow is <strong>always a curve</strong>. Only a ball casts a round shadow no ' +
        'matter which way it is turned; a flat disk would sometimes cast a straight-line shadow.</li>' +
        '<li>When you travel a long way south, you start seeing <strong>new stars</strong> that were hidden ' +
        'before, and the North Star sinks closer to the horizon. On a flat Earth everyone would see the same ' +
        'stars overhead. This only works if the ground curves.</li>' +
        '</ul>' +
        '<p>Aristotle also worked out that the Sun is farther away than the Moon, because now and then the ' +
        'Moon slides right in front of the Sun and blocks it &mdash; a <span class="term">solar ' +
        'eclipse</span>.</p>' +
        '<p>One Greek, <strong>Aristarchus of Samos</strong> (310&ndash;230 BCE), even said Earth goes ' +
        'around the Sun. But Aristotle and most Greeks said no. Their big reason was something called ' +
        '<span class="term">parallax</span>: if Earth were really swinging around the Sun, then over the ' +
        'year the <strong>nearby stars should appear to shift</strong> back and forth against the farther ' +
        'stars &mdash; the same way trees by the train track seem to slide past the distant hills as your ' +
        'train rolls along. That yearly star-shift is called <span class="term">stellar parallax</span>. The ' +
        'Greeks looked hard for it (they even used soldiers with the sharpest eyes) and <strong>saw ' +
        'nothing</strong>. So either Earth was not moving, or the stars were unbelievably far away. They were ' +
        'not ready to believe the universe was that huge, so they stuck with an Earth-in-the-center picture ' +
        '&mdash; and it ruled Western thinking for almost 2,000 years.</p>' +
        '<h4>Eratosthenes measures the whole planet with a shadow</h4>' +
        '<p>Around 200 BCE, a Greek named <span class="term">Eratosthenes</span> (276&ndash;194 BCE), ' +
        'working in Alexandria in Egypt, figured out how <em>big</em> Earth is &mdash; using only sunlight ' +
        'and geometry.</p>' +
        '<p>The Sun is so far away that its rays reach Earth almost perfectly <strong>parallel</strong>, ' +
        'like they are all coming straight down together. Eratosthenes knew that on the first day of summer, ' +
        'at noon in the town of <strong>Syene</strong>, sunlight shone all the way down to the bottom of a ' +
        'deep well. That meant the Sun was <em>exactly</em> straight overhead there &mdash; a stick would ' +
        'cast no shadow. At that same moment up in <strong>Alexandria</strong>, the Sun was about ' +
        '<strong>7&deg;</strong> away from straight up, so a stick <em>did</em> cast a shadow.</p>' +
        '<p>Here is the clever part. The Sun&rsquo;s rays are parallel, so that 7&deg; difference has to come ' +
        'from the <strong>ground curving</strong> between the two towns. And 7&deg; is about ' +
        '<strong>one-fiftieth</strong> of a full 360&deg; circle. So the distance from Syene to Alexandria ' +
        'must be one-fiftieth of the way around the whole Earth. That distance was about <strong>5,000 ' +
        '<em>stadia</em></strong> (a Greek unit of length), which made the whole Earth about ' +
        '<strong>250,000 stadia</strong> around. Depending on exactly how long his &ldquo;stadium&rdquo; ' +
        'was, his answer was somewhere between spot-on and about 20% too big &mdash; the real number is ' +
        '40,000 km. Measuring the size of the planet with nothing but shadows, sunlight, and thinking is one ' +
        'of the great feats in the history of science.</p>' +
        '<div data-diagram="eratosthenes"></div>' +
        '<h4>Hipparchus, and Earth&rsquo;s slow wobble</h4>' +
        '<p><span class="term">Hipparchus</span>, working from an observatory on the island of Rhodes around ' +
        '150 BCE, was probably the best astronomer of the ancient world. He made a catalog of about ' +
        '<strong>850 stars</strong>, writing down the position of each one (like giving every star a ' +
        'latitude and longitude). He also sorted stars by how bright they look, calling the brightest ones ' +
        '&ldquo;first <span class="term">magnitude</span>,&rdquo; the next batch &ldquo;second ' +
        'magnitude,&rdquo; and so on &mdash; a system we still use in a tweaked form today (smaller number = ' +
        'brighter).</p>' +
        '<p>Then he compared his measurements with much older ones and noticed something strange: the spot ' +
        'in the sky that the stars turn around &mdash; the north celestial pole &mdash; had <strong>slowly ' +
        'moved</strong>. He realized it is always moving. And if the pole in the sky is drifting, then ' +
        '<strong>Earth&rsquo;s axis itself must be slowly wobbling</strong>. We call this wobble ' +
        '<span class="term">precession</span>. It is just like a spinning top: while it spins fast, its axis ' +
        'also traces a slow, lazy circle. Earth wobbles because it is not a perfect ball &mdash; it bulges a ' +
        'little at the equator, and the Sun&rsquo;s and Moon&rsquo;s gravity tug on that bulge. One full ' +
        'wobble takes about <strong>26,000 years</strong>. So the &ldquo;North Star&rdquo; changes over ' +
        'time: it is Polaris now, it was a star called <strong>Thuban</strong> about 5,000 years ago, and ' +
        'in about 14,000 years it will be the star <strong>Vega</strong>.</p>' +
        '<h4>Ptolemy&rsquo;s clockwork universe</h4>' +
        '<p>The last great astronomer of the Roman era was <span class="term">Ptolemy</span>, working in ' +
        'Alexandria around the year 140. He wrote a huge summary of everything astronomers knew, a book we ' +
        'now call the <em>Almagest</em> (&ldquo;The Greatest&rdquo;). It is our main source for the work of ' +
        'Hipparchus and the other Greeks. Ptolemy&rsquo;s big achievement was a <strong>geometry machine ' +
        'that could predict where each planet would be</strong> on any date.</p>' +
        '<p>The hard part he had to explain is this: as the months go by, a planet usually drifts ' +
        '<strong>eastward</strong> against the stars &mdash; but every so often it <strong>slows down, ' +
        'stops, and drifts backward (westward)</strong> for a few weeks, then goes forward again. This ' +
        'backward loop is called <span class="term">retrograde motion</span>. We now know it is an illusion: ' +
        'it happens when the faster-moving Earth passes a slower outer planet, the way a car you are ' +
        'overtaking seems to slide backward. But Ptolemy believed Earth stood <em>still</em>, so he had to ' +
        'build the loop some other way &mdash; and the Greeks were sure all sky motion had to be made of ' +
        'perfect <strong>circles</strong>.</p>' +
        '<div data-diagram="retrograde"></div>' +
        '<p>His solution: put each planet on a small circle, called an <span class="term">epicycle</span>, ' +
        'and then have the <em>center</em> of that small circle ride around on a big circle, called the ' +
        '<span class="term">deferent</span>, going around Earth. Spin the small circle at just the right ' +
        'speed and the planet traces little backward loops &mdash; retrograde motion, faked with wheels on ' +
        'wheels. To make the predictions really match, he also had to shift the big circles a bit ' +
        'off-center from Earth and add motion around yet another point, the <span class="term">equant</span>. ' +
        'It ended up being dozens of circles. It was a brilliant piece of math, and it stayed the official ' +
        'picture of the heavens for more than <strong>a thousand years</strong>.</p>' +
        '<div data-diagram="epicycle"></div>',
      keyIdeas: [
        "Lots of cultures — Babylonian, Egyptian, Chinese, Maya, Polynesian, and the stone-circle builders of Britain — watched the sky for calendars and navigation long before the Greeks.",
        "The Greeks knew Earth is a ball: its shadow on the Moon is always curved, and you see different stars as you travel north or south.",
        "Eratosthenes measured how big Earth is from the different noon-Sun angles at two towns a known distance apart (a 7° shadow means the towns are 1/50 of the way around the planet).",
        "The Greeks rejected a moving Earth because they couldn't see stellar parallax — and they wouldn't believe the stars were far enough away to hide it.",
        "Hipparchus made a star catalog, invented the brightness (magnitude) scale, and discovered precession — Earth's axis wobbles once every 26,000 years, so the North Star slowly changes.",
        "Ptolemy explained the planets, including retrograde loops, with circles-on-circles (epicycles riding deferents) around a still Earth. It predicted positions well and lasted over 1,000 years."
      ],
      selfCheck: [
        { q: "What single eclipse observation shows that Earth is a ball?",
          a: "During a lunar eclipse, Earth's shadow on the Moon is always a curved arc — and only a ball casts a round shadow no matter how it's turned." },
        { q: "What did Eratosthenes measure, and what did he work out from it?",
          a: "He measured how far the noon Sun was from straight up at Alexandria (about 7°) while it was exactly overhead at Syene. Because sunlight arrives parallel, that 7° is 1/50 of a circle, so the Syene–Alexandria distance is 1/50 of the way around Earth." },
        { q: "Why did seeing no stellar parallax convince the Greeks that Earth stands still?",
          a: "If Earth circled the Sun, nearby stars should shift against distant ones over the year. They saw no shift and wouldn't accept that the stars were far enough away to hide it, so they concluded Earth doesn't move." },
        { q: "What is retrograde motion, and how did Ptolemy fake it with a still Earth?",
          a: "The temporary backward (westward) drift of a planet against the stars. Ptolemy put each planet on a small circle (epicycle) whose center rode a larger circle (deferent) around Earth." }
      ]
    },
    {
      id: "2.3",
      title: "Astrology and Astronomy",
      minutes: 6,
      pages: "pp. 48–52",
      html:
        '<p>Lots of ancient people believed the planets and stars were gods, or stood for gods &mdash; ' +
        'powerful beings who decided what happened in your life. So watching the sky was not just curiosity; ' +
        'it was about reading what the gods were up to. The seven &ldquo;wanderers&rdquo; (the Sun, the ' +
        'Moon, and five planets) seemed the most important of all, and most cultures named the planets after ' +
        'gods and figured they had those gods&rsquo; powers. Out of this grew ' +
        '<span class="term">astrology</span>: the belief that <strong>where the Sun, Moon, and planets sit ' +
        'among the <span class="term">zodiac</span> stars tells you about your life</strong>.</p>' +
        '<h4>Where astrology came from</h4>' +
        '<p>Astrology started in <strong>Babylon</strong> about 2,500 years ago. Back then it was about ' +
        'whole kingdoms &mdash; the planets were thought to steer the fortunes of kings and nations. The ' +
        'Greeks picked it up and spread it across the Western world and into Asia. By the ' +
        '<strong>2nd century BCE</strong>, the Greeks made it <strong>personal</strong>: the exact ' +
        'arrangement of the sky <strong>at the moment you were born</strong> was supposed to shape your ' +
        'personality and your future. That is called <span class="term">natal astrology</span> ' +
        '(&ldquo;natal&rdquo; means &ldquo;birth&rdquo;). It hit its peak with <strong>Ptolemy</strong> ' +
        '&mdash; the same Ptolemy &mdash; who wrote the <em>Tetrabiblos</em>, still the main rulebook of ' +
        'astrology today. Modern astrology is basically this same ancient religion.</p>' +
        '<h4>What a horoscope is</h4>' +
        '<p>A <span class="term">horoscope</span> is a chart showing where the Sun, Moon, and planets were ' +
        'in the sky at the moment (and place) someone was born. The word means &ldquo;marker of the ' +
        'hour.&rdquo; Astrology chops the zodiac band into <strong>12 slices called signs</strong>, each ' +
        '30&deg; wide, and each named after the constellation that used to sit in that slice. When someone ' +
        'asks &ldquo;what&rsquo;s your sign?&rdquo;, they mean your <strong>sun sign</strong> &mdash; the ' +
        'slice the Sun was in on your birthday.</p>' +
        '<p>But there is a problem. It has been more than <strong>2,000 years</strong> since those slices ' +
        'got their names, and in that time <span class="term">precession</span> &mdash; Earth&rsquo;s slow ' +
        'wobble &mdash; has dragged the real star pictures <strong>almost a whole slice to the west</strong>. ' +
        'So the signs and the actual constellations no longer match up. The slice called &ldquo;Aries&rdquo; ' +
        'now sits in front of the constellation Pisces, for example. The sun sign in your newspaper is ' +
        '<strong>not</strong> the constellation the Sun was really in when you were born.</p>' +
        '<div data-diagram="precession"></div>' +
        '<p>A full horoscope also places the Moon and every planet in its sign, plus a &ldquo;house&rdquo; ' +
        '(a position in the sky that shifts through the day as Earth turns). There are rulebooks &mdash; ' +
        'mostly from Ptolemy&rsquo;s <em>Tetrabiblos</em> &mdash; that tie each sign, house, and planet to ' +
        'parts of your life. But reading it all is complicated and full of judgment calls, which is why it ' +
        'is hard to pin astrology down to a clear prediction, and why two astrologers will often tell you ' +
        'different things. Newspaper &ldquo;sun sign&rdquo; astrology is a recent, stripped-down version ' +
        'that tries to sort everyone into just 12 groups &mdash; and even professional astrologers do not ' +
        'put much trust in it.</p>' +
        '<h4>Why astrology is not science</h4>' +
        '<p>There is <strong>no known force</strong> &mdash; not gravity, not anything &mdash; that could ' +
        'let the arrangement of the sky at your birth reach out and shape who you are. (Fun fact: the doctor ' +
        'standing next to you when you are born pulls on you with more gravity than the planet Mars does.) ' +
        'Astrologers have to imagine mystery forces that somehow depend on the <em>pattern</em> the planets ' +
        'make but <em>not</em> on how far away they are &mdash; and there is zero evidence for any such ' +
        'thing. It is also odd that astrology cares about the moment of <em>birth</em> rather than ' +
        'conception, when your genes were actually set.</p>' +
        '<p>Astrology has been <strong>tested</strong> hundreds of times. Scientists have checked whether ' +
        'certain birth signs show up more often among Olympic medal winners, top executives, elected ' +
        'officials, high-ranking military officers &mdash; even people who re-sign up for the U.S. Marines. ' +
        'Every time, the birth signs come out <strong>evenly spread</strong>, with no pattern and no power ' +
        'to predict anything, even a little. Studies using full horoscopes for thousands of people come out ' +
        'just as blank.</p>' +
        '<p>So why do readings so often feel spot-on? Because <strong>a vague statement that sounds personal ' +
        'feels true to almost anyone</strong>. In one test, a researcher sent out the horoscope of one of ' +
        'history&rsquo;s worst mass murderers to <strong>150 people</strong>, telling each person it was ' +
        'written just for them &mdash; and <strong>94%</strong> said &ldquo;yes, that&rsquo;s me.&rdquo; In ' +
        'another, a researcher <strong>flipped 22 readings around</strong> so they said the opposite of the ' +
        'real thing, and people said those fit them just as well (95%). Astrology has no basis in fact ' +
        '&mdash; at best it is a <span class="term">pseudoscience</span> (something dressed up like science ' +
        'that is not). Its real gift to the world was getting people to learn the patterns of the sky in the ' +
        'first place. Out of that grew the actual science: astronomy.</p>',
      keyIdeas: [
        "Astrology — the belief that the sky's arrangement rules your life — started in Babylon and peaked with Ptolemy's Tetrabiblos.",
        "Natal astrology says the sky at the moment of your birth sets your personality and fate. A horoscope is the chart of that sky. The zodiac is split into 12 signs, 30° each.",
        "Because Earth wobbles (precession), the signs have drifted almost a whole slot away from the constellations they were named for — your newspaper sun sign isn't the constellation the Sun was really in.",
        "Astrology fails as science: there's no force that could make it work, and hundreds of tests show birth signs spread evenly, with no power to predict anything.",
        "Vague, \"made-just-for-you\" readings feel true to nearly everyone — people even accept readings that have been reversed. That makes astrology a pseudoscience."
      ],
      selfCheck: [
        { q: "What does a horoscope chart, and what is natal astrology's main claim?",
          a: "Where the Sun, Moon, and planets were in the zodiac at the moment (and place) a person was born. Natal astrology claims those positions set the person's personality and fortune." },
        { q: "How does precession make newspaper “sun signs” wrong?",
          a: "Over ~2,000 years the constellations have slid almost one whole sign west along the ecliptic, so the sign named for your birthday is no longer the constellation the Sun was actually in then." },
        { q: "Give one scientific reason astrology doesn't hold up.",
          a: "There's no known force by which the sky's arrangement at birth could affect a person (the delivering doctor's gravity outweighs Mars's), and statistical tests find birth signs spread evenly among successful people." },
        { q: "Why do people say a vague reading “really fit” them?",
          a: "A vague statement that sounds personal feels true to almost anyone — subjects even accept readings that have been reversed to say the opposite." }
      ]
    },
    {
      id: "2.4",
      title: "The Birth of Modern Astronomy",
      minutes: 10,
      pages: "pp. 52–58",
      html:
        '<p>Not much new happened in astronomy in Europe during the Middle Ages. But scholars in the Islamic ' +
        'world, and Jewish scholars too, kept the old Greek astronomy alive &mdash; copying it, translating ' +
        'it, and adding to it. (That is why lots of bright stars have Arabic names, and why the word ' +
        '&ldquo;zenith&rdquo; is Arabic.) When Europe started trading with Arab countries again, books like ' +
        'the <em>Almagest</em> came back, and people got curious about the sky again. This &ldquo;rebirth' +
        '&rdquo; of astronomy &mdash; <em>renaissance</em> is French for &ldquo;rebirth&rdquo; &mdash; ' +
        'really begins with Copernicus.</p>' +
        '<h4>Copernicus moves Earth out of the center</h4>' +
        '<p><span class="term">Copernicus</span> (full name Nicolaus Copernicus, 1473&ndash;1543) was a ' +
        'churchman in Poland, trained in law and medicine, but his real love was astronomy and math. He took ' +
        'a hard look at the old planet theories and built a new one with the <strong>Sun in the ' +
        'middle</strong> instead of Earth. This is called the <span class="term">heliocentric</span> model ' +
        '(&ldquo;helio&rdquo; means Sun). In it, <strong>Earth is just another planet</strong>, all the ' +
        'planets circle the Sun, and only the Moon circles Earth. He laid it all out in a book, ' +
        '<em>De Revolutionibus Orbium Coelestium</em> (&ldquo;On the Revolutions of the Heavenly ' +
        'Spheres&rdquo;), published in <strong>1543</strong> &mdash; the year he died.</p>' +
        '<p>He kept one old idea &mdash; that everything moves in perfect circles &mdash; but he threw out ' +
        'the idea that Earth had to be the center. People argued: <em>if Earth were moving, wouldn&rsquo;t ' +
        'we feel it? Wouldn&rsquo;t things fly off, and a dropped ball land off to the side?</em> Copernicus ' +
        'answered that <strong>you do not feel smooth motion</strong> &mdash; like when the train next to ' +
        'yours starts moving and for a second you cannot tell which one is going. The Sun&rsquo;s yearly ' +
        'trip across our sky, he said, is just as easily explained by Earth going around the Sun. The sky ' +
        'turning every day is just Earth spinning. And if spinning would tear Earth apart, then the ' +
        'Earth-centered idea is worse &mdash; it needs the <em>giant</em> sphere of stars to whip around us ' +
        'once a day, which would be far more violent.</p>' +
        '<h4>The Sun-centered model</h4>' +
        '<p>Copernicus put the six planets known then in the <strong>right order out from the Sun</strong> ' +
        '&mdash; Mercury, Venus, Earth, Mars, Jupiter, Saturn &mdash; and worked out that <strong>closer ' +
        'planets move faster</strong>. With the Sun in the middle, the weird backward loops of the planets ' +
        '(retrograde motion) fall out naturally, <strong>with no epicycles needed</strong> &mdash; they are ' +
        'just Earth passing the slower outer planets. He also got a roughly right sense of the ' +
        '<strong>size</strong> of the solar system.</p>' +
        '<p>He could not <em>prove</em> it, though. A patched-up version of Ptolemy&rsquo;s old system could ' +
        'still match the observations. Copernicus&rsquo;s main argument was that his version was simpler and ' +
        'more beautiful. And in his day, hardly anyone thought you could settle a question like this by ' +
        '<strong>testing</strong> &mdash; the tradition, backed by the Church, was that truth comes from ' +
        'careful thinking and religious teaching, not from poking at nature. (Aristotle had ' +
        '&ldquo;reasoned&rdquo; that heavier things fall faster &mdash; which is just wrong, as anyone can ' +
        'see by dropping two rocks &mdash; but his reasoning was trusted anyway.) So the Sun-centered idea ' +
        'got argued about for more than <strong>50 years</strong> with nobody running a test. (Harvard was ' +
        'still teaching the Earth-centered version in its first years after opening in 1636.) Compare that ' +
        'with science today, where a new claim gets tested right away: when two researchers announced ' +
        '&ldquo;cold fusion&rdquo; in 1989, more than 25 labs around the country tried to repeat it within ' +
        'weeks &mdash; and it fell apart.</p>' +
        '<p>To decide between two ideas, you need a spot where they <strong>disagree</strong>. Here is one: ' +
        'if Venus goes around the <em>Sun</em>, then from Earth we should see it run through the ' +
        '<strong>whole range of shapes</strong> &mdash; like the Moon&rsquo;s phases, from thin sliver to ' +
        'full circle. If Venus goes around <em>Earth</em>, staying between us and the Sun, we could never ' +
        'see it &ldquo;full.&rdquo; Before the telescope, nobody could check.</p>' +
        '<div data-diagram="venus-phases"></div>' +
        '<h4>Galileo starts modern science</h4>' +
        '<p><span class="term">Galileo</span> Galilei (1564&ndash;1642) was born in Pisa, started studying ' +
        'medicine, got bored, and switched to math. (He was alive at the same time as Shakespeare.) He ' +
        'taught at the universities of Pisa and Padua, then became mathematician to the Grand Duke of ' +
        'Tuscany in Florence. He was one of the first people to really <strong>do experiments and careful ' +
        'measurements</strong> instead of just reasoning things out.</p>' +
        '<p>His biggest work was about <strong>motion</strong>. Everyone assumed that sitting still was the ' +
        '&ldquo;natural&rdquo; state of things, and that anything moving would naturally stop. Galileo ' +
        'showed that is backwards. Slide a block across a rough floor and it stops &mdash; but that is ' +
        '<strong>friction</strong> slowing it down. Make the floor and block smoother and it slides farther. ' +
        'Smoother still (like ice) and it goes farther yet. Take away <em>all</em> the rubbing and ' +
        'resistance, he said, and the block would <strong>keep going forever</strong>. You need a ' +
        '<span class="term">force</span> to <strong>start</strong> something moving, to <strong>speed it ' +
        'up</strong>, to <strong>slow it down</strong>, to <strong>stop</strong> it, or to <strong>turn' +
        '</strong> it &mdash; but not to <em>keep</em> it moving. He also showed that falling objects ' +
        '<span class="term">accelerate</span> smoothly &mdash; they pick up the same amount of speed in ' +
        'each equal chunk of time &mdash; and he wrote the rules down as math. (Centuries later, in ' +
        '<strong>1971</strong>, an Apollo 15 astronaut on the airless Moon dropped a hammer and a feather ' +
        'at the same time, and they hit the ground together &mdash; exactly as Galileo said.)</p>' +
        '<p>Galileo came around to the Sun-centered idea in the 1590s. He backed it openly &mdash; he even ' +
        'wrote in everyday Italian instead of scholarly Latin, and gave public lectures. In ' +
        '<strong>1616</strong> the Church formally declared the Sun-centered idea &ldquo;false and ' +
        'absurd&rdquo; and not to be taught or defended.</p>' +
        '<h4>Galileo points a telescope at the sky</h4>' +
        '<p>Nobody is sure who first thought of putting two pieces of glass together to make far things look ' +
        'near. The first &ldquo;spyglasses&rdquo; people noticed were made in <strong>1608</strong> by a ' +
        'Dutch eyeglass-maker, <strong>Hans Lippershey</strong>. Galileo heard about it and &mdash; without ' +
        'ever seeing one &mdash; built his own that made things look 3 times closer, then 8 or 9 times (that ' +
        'version got him a doubled salary and a job for life in Venice), and finally <strong>30 times' +
        '</strong> closer. Then, in a move that changed everything, he pointed it <strong>up</strong>. ' +
        'Starting in late 1609, he found:</p>' +
        '<ul>' +
        '<li>The <strong>Milky Way</strong> &mdash; that faint band across the night sky &mdash; and other ' +
        'hazy smudges broke apart into <strong>countless separate stars</strong>, too faint for the eye ' +
        'alone.</li>' +
        '<li><strong>Four little moons going around Jupiter</strong> (with trips taking from under 2 days to ' +
        'about 17 days). This was huge: it proved that <strong>not everything circles Earth</strong>, and ' +
        'that a moving object (Jupiter) can carry its moons along with it &mdash; which knocked down a ' +
        'favorite argument against a moving Earth (&ldquo;the Moon would get left behind&rdquo;).</li>' +
        '<li>The <strong>phases of Venus</strong>. Venus runs through the full set of shapes, just like the ' +
        'Moon &mdash; so it <strong>must go around the Sun</strong>. Ptolemy&rsquo;s Earth-centered model ' +
        'predicts the wrong shapes in the wrong order.</li>' +
        '<li>The <strong>Moon</strong> has craters, mountains, and flat dark plains &mdash; it is a ' +
        '<strong>world</strong>, kind of like Earth. So maybe Earth belongs out there among the other ' +
        'worlds.</li>' +
        '</ul>' +
        '<p>After Galileo&rsquo;s evidence, it got very hard to keep denying that the Sun is in the middle. ' +
        'But the Catholic Church &mdash; under pressure from the Protestant Reformation and eager to show ' +
        'its authority &mdash; decided to make an example of him. He was put on trial by the ' +
        '<strong>Inquisition</strong> and sentenced to spend the rest of his life under house arrest. His ' +
        'books stayed on the Church&rsquo;s banned list until <strong>1836</strong>. Not until ' +
        '<strong>1992</strong> did the Church publicly admit it had been wrong about Galileo. The revolution ' +
        'Copernicus and Galileo started left us with a universe that is huge, and with an Earth &mdash; and ' +
        'a human race &mdash; that is <strong>not</strong> at the center of it all.</p>',
      keyIdeas: [
        "Copernicus (1543) put the Sun in the middle: Earth is a planet, the planets orbit the Sun, only the Moon orbits Earth. It explained the backward loops with no epicycles — but he couldn't prove it.",
        "To choose between two models you need a prediction where they disagree — like: does Venus show the full set of phases, or only a sliver?",
        "Galileo founded experimental science. His rule of motion: things keep moving on their own; a force is what starts, stops, speeds up, slows down, or turns them. Falling objects speed up smoothly.",
        "With a telescope (from 1609) Galileo found the Milky Way is countless stars, four moons circling Jupiter (so not everything circles Earth), the phases of Venus (so Venus circles the Sun), and a cratered Moon that looks like a world.",
        "Galileo's evidence tipped the scales toward the Sun-centered universe. The Church tried him and banned his books, and only admitted its mistake in 1992."
      ],
      selfCheck: [
        { q: "What was Copernicus's central idea, and what did it explain more simply than Ptolemy?",
          a: "That the Sun, not Earth, is in the middle — Earth is just another planet going around it. This made the planets' backward loops (retrograde motion) fall out naturally, with no epicycles, and gave a roughly right size for the solar system." },
        { q: "Why are the phases of Venus the deciding test between the two models?",
          a: "If Venus goes around the Sun, we should see it run through the full set of phases (including nearly \"full\" on the far side of the Sun). If it goes around Earth between us and the Sun, we never could. Galileo saw the full set." },
        { q: "State Galileo's key result about motion.",
          a: "Sitting still is not the natural state of things. A moving object keeps moving on its own; a force is needed to start it, stop it, speed it up, slow it down, or turn it." },
        { q: "Name two things Galileo saw through his telescope and why each mattered.",
          a: "Four moons circling Jupiter (shows not everything circles Earth) and the phases of Venus (shows Venus circles the Sun). He also found the Milky Way is countless faint stars and the Moon is a cratered world." }
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
      answer: 0,
      whyWrong: [null,
        "That's a point on your horizon, not overhead — the zenith is straight up.",
        "The Sun rises on the horizon (in the east), not overhead.",
        "The north celestial pole is only overhead if you stand at the North Pole; the zenith is always straight up from you."],
      explain: "“Zenith” always means straight up from wherever you are standing." },
    { section: "2.1", q: "The celestial poles are:",
      choices: ["The points where Earth's rotation axis, extended, meets the celestial sphere", "Earth's north and south magnetic poles", "The two points where the ecliptic crosses the celestial equator", "The brightest stars in the northern and southern sky"],
      answer: 0,
      whyWrong: [null,
        "Earth's magnetic poles are a different thing and don't line up with the celestial poles.",
        "Those crossing points are the equinoxes, not the poles.",
        "The celestial poles are directions in the sky, not stars — though Polaris happens to sit near one now."],
      explain: "The sky appears to pivot around these two points because they mark Earth's spin axis." },
    { section: "2.1", q: "At latitude 40° N, the north celestial pole appears:",
      choices: ["About 40° above the northern horizon", "Directly overhead", "Right on the northern horizon", "About 50° above the horizon"],
      answer: 0,
      whyWrong: [null,
        "It's only overhead at the North Pole (latitude 90°).",
        "It's on the horizon only at the equator (latitude 0°).",
        "The pole's height above the horizon equals your latitude exactly — 40°, not 50°."],
      explain: "The altitude of the north celestial pole always equals your latitude." },
    { section: "2.1", q: "“Circumpolar” stars are those that:",
      choices: ["Never rise or set — they circle a celestial pole and stay above the horizon all night", "Are visible only in summer", "Lie exactly on the celestial equator", "Are actually the planets"],
      answer: 0,
      whyWrong: [null,
        "Circumpolar stars are up every night, all year — not just one season.",
        "Stars on the celestial equator rise and set; circumpolar stars sit near a *pole*.",
        "The planets aren't circumpolar — they travel along the zodiac, near the celestial equator."],
      explain: "For a 40° N observer, stars within 40° of the north celestial pole are circumpolar." },
    { section: "2.1", q: "The ecliptic is:",
      choices: ["The Sun's apparent path around the celestial sphere over one year", "The Moon's monthly path around the sky", "The same thing as the celestial equator", "The outer edge of the zodiac"],
      answer: 0,
      whyWrong: [null,
        "The Moon's monthly path is close to the ecliptic but tilted a few degrees off it.",
        "The ecliptic is tilted 23.5° to the celestial equator — they're different circles.",
        "The zodiac is an 18°-wide band *centred on* the ecliptic; the ecliptic is the centreline, not the edge."],
      explain: "The Sun drifts about 1° eastward per day along the ecliptic, completing a circuit in a year." },
    { section: "2.1", q: "The ecliptic is tilted about 23.5° to the celestial equator because:",
      choices: ["Earth's rotation axis is tilted about 23.5° from perpendicular to its orbit", "The Sun wobbles as it moves", "The Moon pulls the Sun off its path", "The celestial sphere is lopsided"],
      answer: 0,
      whyWrong: [null,
        "The Sun doesn't wobble; the tilt comes from Earth's spin axis being tipped over.",
        "The Moon's gravity doesn't push the Sun around — Earth's own tilt sets the angle.",
        "The celestial sphere is just an imaginary aid; the 23.5° tilt is real, caused by Earth's axis."],
      explain: "That axial tilt is also what gives Earth its seasons." },
    { section: "2.1", q: "In modern astronomy, a constellation is:",
      choices: ["One of 88 sectors that together cover the entire sky", "Any star pattern that looks like an animal", "A group of stars that are physically close together in space", "One of the 12 signs of the zodiac"],
      answer: 0,
      whyWrong: [null,
        "Many constellations don't look like anything; the modern definition is a region of sky, not a picture.",
        "Stars in a constellation are usually at wildly different distances — they only *look* close from Earth.",
        "The 12 zodiac signs are an astrology idea; there are 88 constellations."],
      explain: "Like US states, the 88 constellations tile the whole sky and aren't all the same size." },
    { section: "2.1", q: "The ancient Greeks called the planets “wanderers” because:",
      choices: ["Unlike the fixed stars, they slowly change position among the star patterns", "They were believed to be lost gods", "They twinkle more than stars", "They move across the sky each night as Earth rotates"],
      answer: 0,
      whyWrong: [null,
        "They were *named* after gods, but 'wanderer' refers to their motion, not to being lost.",
        "Planets actually twinkle *less* than stars — and that's not why they're called wanderers.",
        "Everything crosses the sky each night from Earth's spin; only the planets also drift among the stars over weeks."],
      explain: "Everything rises and sets from Earth's spin; only the planets, Sun, and Moon also drift among the stars." },
    { section: "2.1", q: "The zodiac is:",
      choices: ["An ~18°-wide band around the ecliptic within which the Moon and planets are always found", "The full set of 88 constellations", "The circle of the celestial equator", "The path of the Moon alone"],
      answer: 0,
      whyWrong: [null,
        "The 88 constellations cover the whole sky; the zodiac is only the narrow band the Moon and planets keep to.",
        "The celestial equator is a different circle, tilted 23.5° from the zodiac's centreline.",
        "The zodiac holds the Moon *and* every naked-eye planet, not just the Moon."],
      explain: "The Moon's and planets' orbits share nearly one plane, so they stay in this narrow belt." },
    { section: "2.2", q: "During a lunar eclipse, Earth's shadow on the Moon is always round. This shows that:",
      choices: ["Earth is a sphere — only a sphere always casts a round shadow", "The Moon is a sphere", "The Sun is very far away", "The eclipse is total rather than partial"],
      answer: 0,
      whyWrong: [null,
        "The shadow lands on the Moon, but its *shape* tells us about the thing casting it — Earth.",
        "The Sun's distance matters for eclipses, but the always-round shadow is what shows Earth is a ball.",
        "The shadow's edge is curved during partial eclipses too; whether it's total isn't the point."],
      explain: "A disk seen edge-on would cast a line-shaped shadow; Earth never does." },
    { section: "2.2", q: "Eratosthenes measured Earth's size using:",
      choices: ["The different angles of the noon Sun at two cities a known distance apart", "The time a ship takes to sink below the horizon", "The duration of a lunar eclipse", "The parallax of a nearby star"],
      answer: 0,
      whyWrong: [null,
        "A sinking ship shows Earth is *round*; Eratosthenes measured its *size* from the Sun's angle.",
        "Eclipse timing gives the Moon's size and distance, not Earth's circumference by his method.",
        "Stellar parallax measures star distances, and the Greeks couldn't detect it anyway."],
      explain: "The Sun was overhead at Syene but 7° from vertical at Alexandria — 1/50 of a circle." },
    { section: "2.2", q: "The Greeks concluded that Earth does not move because:",
      choices: ["They could not detect stellar parallax and would not accept that the stars were far enough to hide it", "They proved it with careful experiments", "Aristotle measured Earth's speed and found it to be zero", "Religious authorities forbade the idea"],
      answer: 0,
      whyWrong: [null,
        "They ran no such experiment — they *looked* for a yearly star shift and saw none.",
        "Nobody measured Earth's speed; the argument was the missing parallax shift.",
        "It was a judgement of the science and philosophy of the day, not a ban, that settled it."],
      explain: "A moving Earth should make nearby stars shift against distant ones over the year; they saw no shift." },
    { section: "2.2", q: "Precession, discovered by Hipparchus, is:",
      choices: ["The slow (~26,000-year) conical wobble of Earth's rotation axis", "Earth's daily rotation", "Earth's yearly orbit around the Sun", "The Moon's monthly motion around Earth"],
      answer: 0,
      whyWrong: [null,
        "The daily spin is what makes stars rise and set; precession is a far slower wobble of that spin axis.",
        "The yearly orbit around the Sun is a separate motion; precession is the axis slowly tracing a cone.",
        "The Moon's monthly motion is its orbit around Earth, not a wobble of Earth's axis."],
      explain: "Because the axis wobbles, the “pole star” changes over the millennia — Thuban, then Polaris, later Vega." },
    { section: "2.2", q: "In Ptolemy's model, retrograde motion was produced by:",
      choices: ["Each planet moving on a small circle (epicycle) whose center rides a larger circle (deferent) around Earth", "The planets actually stopping and reversing direction", "The Sun pulling the planets backward", "Earth passing between the planet and the Sun"],
      answer: 0,
      whyWrong: [null,
        "Planets don't really stop and reverse — Ptolemy had to *fake* the backward loop with circles.",
        "Ptolemy had no idea of the Sun pulling planets; he used pure geometry, not gravity.",
        "That IS the real reason, but Ptolemy assumed Earth stood still, so he couldn't use it."],
      explain: "The last option is the real (heliocentric) explanation; Ptolemy had to fake it with circles on circles." },
    { section: "2.2", q: "Retrograde motion is:",
      choices: ["The temporary apparent westward drift of a planet against the background stars", "A planet's normal eastward drift among the stars", "A planet setting in the west each night", "The backward spin of a planet on its axis"],
      answer: 0,
      whyWrong: [null,
        "Eastward drift is a planet's *normal* motion; retrograde is the brief exception.",
        "Everything sets in the west each night from Earth's spin; retrograde is a slow drift against the stars.",
        "That would be the planet's own rotation; retrograde is about apparent motion across the sky."],
      explain: "Planets normally move east against the stars; retrograde is the brief westward exception." },
    { section: "2.3", q: "Because of precession, newspaper “sun signs”:",
      choices: ["No longer match the constellation the Sun was actually in on your birthday — the signs have slipped about one constellation west", "Are more accurate than they used to be", "Match the real constellations exactly", "Change from year to year"],
      answer: 0,
      whyWrong: [null,
        "Precession made the signs and constellations *drift apart*, not line up better.",
        "The signs were locked to the calendar ~2,000 years ago and the sky has moved since — they no longer match.",
        "The mismatch builds up slowly over centuries, not from one year to the next."],
      explain: "The sign “Aries” now sits over the constellation Pisces, for example." },
    { section: "2.3", q: "The strongest scientific objection to astrology is that:",
      choices: ["There is no known force by which birth-time sky positions could affect a person, and tests find birth signs randomly distributed", "The planets are too small to matter", "Horoscopes are hard to calculate accurately", "Astrologers disagree with one another"],
      answer: 0,
      whyWrong: [null,
        "Size isn't really the issue — even the doctor beside you out-pulls Mars gravitationally.",
        "Horoscopes are easy to calculate with software; the problem is they predict nothing.",
        "Astrologers do disagree, but the deeper problem is there's no mechanism and the tests come up empty."],
      explain: "The delivering doctor's gravitational pull on a newborn exceeds that of Mars." },
    { section: "2.3", q: "When people say a vague horoscope “really fit” them, it usually shows:",
      choices: ["That vague, personalized-sounding statements feel accurate to almost anyone — subjects even accept reversed readings", "That the astrologer had real predictive skill", "That the sun sign was calculated correctly", "That the planets truly aligned that day"],
      answer: 0,
      whyWrong: [null,
        "The tests show the opposite — people accepted a mass murderer's chart, and even *reversed* readings.",
        "Getting the sun sign right doesn't make the personality description accurate.",
        "The sense of accuracy comes from vague, personal-sounding wording, not from any real alignment."],
      explain: "94% of people recognized themselves in a mass murderer's horoscope presented as a personal reading." },
    { section: "2.3", q: "Natal astrology — the kind that reads your personal birth chart — took its familiar form with:",
      choices: ["The Greeks by the 2nd century BCE, reaching its peak with Ptolemy's Tetrabiblos", "Copernicus, in De Revolutionibus", "The Maya, who based it on the planet Venus", "Hipparchus, who cast the first horoscope"],
      answer: 0,
      whyWrong: [null,
        "Copernicus was an astronomer working on the Sun-centered model — his book has nothing to do with astrology.",
        "The Maya did track Venus closely, but the personal birth-chart tradition comes from the Greeks and Ptolemy.",
        "Hipparchus catalogued stars and discovered precession; he did not found natal astrology."],
      explain: "Astrology began in Babylon ~2,500 years ago about kings and nations; the Greeks made it personal, and it peaked with Ptolemy's Tetrabiblos — still astrology's main rulebook." },
    { section: "2.3", q: "In astrology, your “sun sign” is:",
      choices: ["The 30°-wide zodiac slice the Sun occupied on your birthday", "The constellation that was directly overhead when you were born", "The constellation the Sun was really in on your birthday", "The planet nearest the Sun at the moment of your birth"],
      answer: 0,
      whyWrong: [null,
        "The sun sign tracks the Sun's place along the zodiac, not whatever happened to be overhead.",
        "Because of precession the calendar slice and the true constellation have drifted about one slot apart — the sign is the slice, not the real constellation.",
        "No planet is involved in the sun sign; it is just the Sun's zodiac slice."],
      explain: "Astrology cuts the zodiac into 12 signs of 30° each; your sun sign is the slice the Sun sat in on your birth date." },
    { section: "2.3", q: "Tests checking birth signs against Olympic medalists, executives, officials, and re-enlisting Marines found that the signs:",
      choices: ["Were spread evenly, with no power to predict success at all", "Clustered strongly in the fire signs", "Predicted the person's career but not their success", "Matched personality about 60% of the time"],
      answer: 0,
      whyWrong: [null,
        "No clustering showed up — the distribution came out flat.",
        "The studies found no predictive power of any kind, for career or for success.",
        "Full-horoscope studies of thousands of people came out just as blank — not 60%."],
      explain: "Hundreds of tests — including one where 22 readings were reversed and still accepted 95% of the time — show no real predictive effect." },
    { section: "2.3", q: "Calling astrology a “pseudoscience” means that it:",
      choices: ["Looks like science but has no testable, evidence-based support", "Is an early, now-outdated form of astronomy", "Works, but only for certain people", "Was disproven by one famous experiment"],
      answer: 0,
      whyWrong: [null,
        "Astrology is not a rough draft of astronomy — it makes no successful predictions and never did.",
        "Controlled tests find it works for no one; the feeling of accuracy comes from vague, personal-sounding wording.",
        "It is the weight of hundreds of studies, not any single experiment, that sinks it."],
      explain: "Astrology's real gift was getting people to learn the patterns of the sky — and out of that grew the actual science, astronomy." },
    { section: "2.4", q: "Copernicus's key claim in De Revolutionibus was that:",
      choices: ["Earth is a planet and all the planets orbit the Sun", "The Sun orbits Earth in an ellipse", "The planets move on epicycles around the Sun", "Earth is motionless at the center of the universe"],
      answer: 0,
      whyWrong: [null,
        "Copernicus put the Sun at the centre, and still used circles — ellipses came later, with Kepler.",
        "He *removed* the epicycles; a Sun-centred layout explains the loops on its own.",
        "That's the Earth-centred model Copernicus was replacing."],
      explain: "Only the Moon orbits Earth in his model; everything else circles the Sun." },
    { section: "2.4", q: "Heliocentrism explained retrograde motion:",
      choices: ["As an effect of Earth overtaking a slower outer planet — no epicycles needed", "By adding even more epicycles than Ptolemy used", "By the planets truly reversing direction", "It could not explain retrograde motion at all"],
      answer: 0,
      whyWrong: [null,
        "Copernicus got rid of epicycles — the Sun-centred model doesn't need them.",
        "The planets never actually reverse; it only *looks* that way as Earth passes them.",
        "It explained retrograde more simply than Ptolemy did — that was a big point in its favour."],
      explain: "From the faster-moving Earth, a slower planet appears to fall behind for a while." },
    { section: "2.4", q: "Galileo's core result about motion was that:",
      choices: ["A moving object keeps moving on its own; a force is needed to start, stop, speed up, slow down, or turn it", "Rest is the natural state of matter", "Heavier objects fall faster than lighter ones", "Continuous motion requires a continuous push"],
      answer: 0,
      whyWrong: [null,
        "That's the *old* view Galileo overturned — he showed motion continues on its own.",
        "That's Aristotle's claim, which Galileo showed is wrong (two rocks fall together).",
        "A moving object keeps going with no push; a force is only needed to *change* its motion."],
      explain: "Friction, not a lack of pushing, is what brings a sliding object to rest." },
    { section: "2.4", q: "The phases of Venus, seen by Galileo, showed that:",
      choices: ["Venus orbits the Sun, not Earth", "Venus has a thick atmosphere", "Venus is closer to us than the Moon", "Venus spins backward on its axis"],
      answer: 0,
      whyWrong: [null,
        "Venus does have a thick atmosphere, but the *phases* specifically show it circles the Sun.",
        "Venus is far more distant than the Moon; the phases aren't about its distance.",
        "Venus does spin backward, but that's unrelated — the phase cycle is what shows it orbits the Sun."],
      explain: "Only a Sun-orbiting Venus can show the full cycle of phases in the order Galileo observed." },
    { section: "2.4", q: "Galileo's discovery of four moons orbiting Jupiter mattered because:",
      choices: ["It proved not everything orbits Earth, and that a moving body can keep its moons", "It proved Jupiter is a star", "It disproved the heliocentric model", "It showed Jupiter is the center of the solar system"],
      answer: 0,
      whyWrong: [null,
        "Jupiter is a planet, not a star; the moons showed it's a centre of motion that isn't Earth.",
        "It *supported* the Sun-centred view by showing Earth isn't the only centre of orbits.",
        "It showed Jupiter has its own little system — not that Jupiter is the centre of the solar system."],
      explain: "Defenders of geocentrism had argued a moving Earth would leave the Moon behind; Jupiter's moons kept up fine." },
    { section: "2.4", q: "With his telescope Galileo found that the Milky Way is:",
      choices: ["Made of countless individual stars too faint to see with the unaided eye", "A cloud of glowing gas", "The edge of the celestial sphere", "Sunlight scattered by dust in space"],
      answer: 0,
      whyWrong: [null,
        "Through the telescope the 'cloud' broke apart into individual stars, not gas.",
        "The celestial sphere is just an imaginary aid; the Milky Way is a real band of stars.",
        "It isn't lit by the Sun — it's the combined glow of billions of distant stars."],
      explain: "Hazy patches that looked like clouds resolved into swarms of stars." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[2] = CH;
})();
