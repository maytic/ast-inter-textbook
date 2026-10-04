/* =============================================================================
   Astronomy 2e — Chapter 7: Other Worlds: An Introduction to the Solar System
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 7), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[7].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 7,
    chapterTitle: "Other Worlds: An Introduction to the Solar System",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/7-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 221–250"
  };

  CH.tools = ["solarsystem", "smallbodies", "scalemodel", "planetmakeup", "datingsurfaces", "solarorigin"];

  /* ---------------------------------- ONE STUDY TOOL PER TOPIC: match data */
  CH.solarsystemmatch = [
    { a: "Sun", b: "99.80% of all the mass in the solar system" },
    { a: "Jupiter", b: "more massive than all the other planets combined — about 1,300 Earths would fit inside" },
    { a: "Terrestrial planets", b: "Mercury, Venus, Earth, and Mars — small worlds of rock and metal with solid surfaces" },
    { a: "Giant (jovian) planets", b: "Jupiter, Saturn, Uranus, and Neptune — mostly lighter ices, liquids, and gases" },
    { a: "Venus", b: "rotates backward (retrograde), and very slowly" },
    { a: "Uranus and Pluto", b: "spin about an axis tipped nearly on its side" },
    { a: "Trans-Neptunian objects (TNOs)", b: "smaller worlds beyond Neptune — more than 3900 found so far" },
    { a: "Dwarf planets", b: "Pluto, Eris, Haumea, Makemake, and the largest asteroid, Ceres" }
  ];
  CH.smallbodiesmatch = [
    { a: "Asteroid", b: "a rocky body orbiting the Sun like a miniature planet, mostly between Mars and Jupiter" },
    { a: "Comet", b: "a small body made mostly of ice — frozen water, carbon dioxide, and carbon monoxide" },
    { a: "Cosmic dust", b: "countless grains of broken rock scattered through the solar system" },
    { a: "Meteor", b: "the brief flash of light when a bit of cosmic dust burns up in our atmosphere — a “shooting star”" },
    { a: "Meteorite", b: "a chunk of rock or metal that survives the trip through the atmosphere and hits the ground" },
    { a: "Galilean moons", b: "the four largest moons of Jupiter, named after their discoverer" },
    { a: "Titan and Triton", b: "the largest moons of Saturn and of Neptune (confusingly similar names)" },
    { a: "Ring systems", b: "countless small bodies, from mountain-sized to dust, orbiting the equator of each giant planet" }
  ];
  CH.scalemodelmatch = [
    { a: "Scale factor", b: "1 billion (10⁹) — every size and distance divided by 10⁹" },
    { a: "Earth", b: "a grape, 1.3 cm across" },
    { a: "Moon", b: "a pea, about 40 cm from the Earth-grape" },
    { a: "Sun", b: "nearly 1.5 m across — about the height of an adult" },
    { a: "Earth’s distance from the Sun", b: "150 m — about one city block" },
    { a: "Jupiter", b: "a very large grapefruit, 15 cm across, five blocks from the Sun" },
    { a: "Neptune", b: "30 blocks from the Sun" },
    { a: "A human", b: "shrunk to the size of a single atom" },
    { a: "Nearest stars", b: "tens of thousands of kilometers away — on the other side of Earth or beyond" }
  ];
  CH.planetmakeupmatch = [
    { a: "Jupiter and Saturn", b: "75% hydrogen and 25% helium by mass — nearly the same makeup as the Sun" },
    { a: "“Liquid planets”", b: "a better name for Jupiter and Saturn — their hydrogen is squeezed into a liquid" },
    { a: "Reduced chemistry", b: "hydrogen-dominated, as in the giant planets and the outer solar system" },
    { a: "Oxidized chemistry", b: "dominated by oxygen compounds such as silicates, as in the terrestrial planets" },
    { a: "Silicates", b: "the most abundant rocks, made of silicon and oxygen" },
    { a: "Differentiation", b: "gravity separating a melted world into layers: metal core, rocky crust" },
    { a: "Water worlds", b: "larger moons that may hide oceans of liquid water inside, possibly warmed by tides" },
    { a: "Geological activity", b: "mountain building and volcanoes, driven by heat escaping from a planet’s interior" }
  ];
  CH.datingsurfacesmatch = [
    { a: "Crater counting", b: "more craters means more time since the surface was last “swept clean”" },
    { a: "Radioactive decay", b: "an unstable nucleus spontaneously splitting into smaller nuclei" },
    { a: "Half-life", b: "the time for half of a large sample of radioactive atoms to decay" },
    { a: "Parent", b: "the original radioactive atom" },
    { a: "Daughter", b: "the decay product that replaces the parent" },
    { a: "Uranium-238 → Lead-206", b: "half-life of 4.47 billion years" },
    { a: "Potassium-40 → Argon-40", b: "half-life of 1.31 billion years" },
    { a: "Apollo samples (1969)", b: "showed the Moon is an ancient, geologically dead world" }
  ];
  CH.solaroriginmatch = [
    { a: "Solar nebula", b: "the spinning cloud of gas and dust from which the Sun and planets formed" },
    { a: "Same plane, same direction", b: "the pattern of orbits that suggests the Sun and planets formed together from one spinning cloud" },
    { a: "Hot inner disk", b: "moved faster, so more friction — too warm for water to condense as ice" },
    { a: "Circumstellar disks", b: "flattened, spinning clouds of gas and dust around young stars today" },
    { a: "Planetesimals", b: "building blocks of the planets, probably no larger than 100 km across" },
    { a: "Giant collisions", b: "a likely cause of the exceptions — sideways Uranus, backward Venus, our odd Moon" },
    { a: "Superearths", b: "exoplanets in between our terrestrial and giant planets in size" },
    { a: "4.5 billion years", b: "the age of the solar system" }
  ];

  /* ------------------------------------------------------------------ FIGURES
     Images from OpenStax Astronomy 2e (CC BY 4.0), placed in the matching
     sections via <div data-figure="N.N"></div>. Captions are the book's own,
     with credit lines intact. Files in img/ (downscaled for web). */
  CH.figures = {
    "7.1": {
      file: "fig-7-1.jpg",
      title: "“Self-Portrait” of Mars",
      alt: "The Curiosity rover, a car-sized six-wheeled robot, sitting on reddish-tan Martian sand with a hazy hill behind it; the mosaic's jagged edges show it was stitched together from many frames.",
      caption: "“Self-Portrait” of Mars. This picture was taken by the Curiosity Rover on Mars in 2012. The image is reconstructed digitally from 55 different images taken by a camera on the rover’s extended mast, so that the many positions of the mast (which acted like a selfie stick) are edited out. (credit: modification of work by NASA/JPL-Caltech/MSSS)"
    },
    "7.2": {
      file: "fig-7-2.jpg",
      title: "Astronauts on the Moon",
      alt: "An astronaut in a white spacesuit saluting beside a U.S. flag on the gray lunar surface, with the gold-foil lunar lander and the four-wheeled lunar rover behind.",
      caption: "Astronauts on the Moon. The lunar lander and surface rover from the Apollo 15 mission are seen in this view of the one place beyond Earth that has been explored directly by humans. (credit: modification of work by David R. Scott, NASA)"
    },
    "7.3": {
      file: "fig-7-3.jpg",
      title: "Orbits of the Planets",
      alt: "A tilted diagram of the solar system: blue, nearly circular orbits of the eight planets in one flat plane around the Sun, and red, more stretched and tilted orbits of the dwarf planets Ceres, Pluto, Haumea, Makemake, and Eris.",
      caption: "Orbits of the Planets. All eight major planets orbit the Sun in roughly the same plane. The five currently known dwarf planets are also shown: Eris, Haumea, Pluto, Ceres, and Makemake. Note that Pluto’s orbit is not in the plane of the planets."
    },
    "7.4": {
      file: "fig-7-4.jpg",
      title: "Surface of Mercury",
      alt: "A black-and-white close-up of Mercury's gray surface, covered in overlapping craters of many sizes.",
      caption: "Surface of Mercury. The pockmarked face of the terrestrial world of Mercury is more typical of the inner planets than the watery surface of Earth. This black-and-white image, taken with the Mariner 10 spacecraft, shows a region more than 400 kilometers wide. (credit: modification of work by NASA/John Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington)"
    },
    "7.5": {
      file: "fig-7-5.jpg",
      title: "The Four Giant Planets",
      alt: "Jupiter, ringed Saturn, pale blue-green Uranus, and deep blue Neptune lined up on a black background, with a tiny Earth below them for scale.",
      caption: "The Four Giant Planets. This montage shows the four giant planets: Jupiter, Saturn, Uranus, and Neptune. Below them, Earth is shown to scale. (credit: modification of work by NASA, Solar System Exploration)"
    },
    "7.6": {
      file: "fig-7-6.jpg",
      title: "Pluto Close-up",
      alt: "Part of Pluto's globe seen up close: a large, smooth, pale plain fills the upper middle, bordered by dark reddish-brown, cratered terrain along the left and bottom.",
      caption: "Pluto Close-up. This intriguing image from the New Horizons spacecraft, taken when it flew by the dwarf planet in July 2015, shows some of its complex surface features. The rounded white area is called the Sputnik Plain, after humanity’s first spacecraft. (credit: modification of work by NASA/Johns Hopkins University Applied Physics Laboratory/Southwest Research Institute)"
    },
    "7.7": {
      file: "fig-7-7.jpg",
      title: "Saturn and Its Rings",
      alt: "Saturn seen from above, partly lit and partly in shadow, surrounded by wide, finely banded rings in shades of tan and gray.",
      caption: "Saturn and Its Rings. This 2007 Cassini image shows Saturn and its complex system of rings, taken from a distance of about 1.2 million kilometers. This natural-color image is a composite of 36 images taken over the course of 2.5 hours. (credit: modification of work by NASA/JPL/Space Science Institute)"
    },
    "7.8": {
      file: "fig-7-8.jpg",
      title: "Asteroid Eros",
      alt: "A lumpy, potato-shaped gray asteroid against black space, its surface covered in craters.",
      caption: "Asteroid Eros. This small Earth-crossing asteroid image was taken by the NEAR-Shoemaker spacecraft from an altitude of about 100 kilometers. This view of the heavily cratered surface is about 10 kilometers wide. The spacecraft orbited Eros for a year before landing gently on its surface. (credit: modification of work by NASA/JHUAPL)"
    },
    "7.9": {
      file: "fig-7-9.jpg",
      title: "Comet Churyumov-Gerasimenko (67P)",
      alt: "A dark, two-lobed comet nucleus seen against black space, with faint bright jets of gas streaming off its surface in several directions.",
      caption: "Comet Churyumov-Gerasimenko (67P). This image shows Comet Churyumov-Gerasimenko, also known as 67P, near its closest approach to the Sun in 2015, as seen from the Rosetta spacecraft. Note the jets of gas escaping from the solid surface. (credit: modification of work by ESA/Rosetta/NAVACAM, CC BY-SA IGO 3.0 (http://creativecommons.org/licenses/by-sa/3.0/igo/))"
    },
    "7.10": {
      file: "fig-7-10.jpg",
      title: "Carl Sagan and Neil deGrasse Tyson",
      alt: "Two portraits side by side: a smiling young Carl Sagan in a tan jacket and turtleneck, and Neil deGrasse Tyson in a dark suit and red tie, seated with hands clasped.",
      caption: "Carl Sagan (1934–1996) and Neil deGrasse Tyson. Sagan was Tyson’s inspiration to become a scientist. (credit “Sagan”: modification of work by NASA, JPL; credit “Tyson”: modification of work by Bruce F. Press)"
    },
    "7.11": {
      file: "fig-7-11.jpg",
      title: "Jupiter",
      alt: "Jupiter in true color: cream, tan, and brown cloud bands with swirls, and a small dark dot — a moon's shadow — on the left side of the disk.",
      caption: "Jupiter. This true-color image of Jupiter was taken from the Cassini spacecraft in 2000. The dark spot is the shadow of one of the giant planet’s moons. (credit: modification of work by NASA/JPL/University of Arizona)"
    },
    "7.12": {
      file: "fig-7-12.jpg",
      title: "Ganymede",
      alt: "Jupiter's moon Ganymede, a round gray-brown world with darker and lighter patches and scattered bright white spots.",
      caption: "Ganymede. This view of Jupiter’s moon Ganymede was taken in June 1996 by the Galileo spacecraft. The brownish gray color of the surface indicates a dusty mixture of rocky material and ice. The bright spots are places where recent impacts have uncovered fresh ice from underneath. (credit: modification of work by NASA/JPL)"
    },
    "7.13": {
      file: "fig-7-13.jpg",
      title: "Comet Shoemaker–Levy 9",
      alt: "A long diagonal string of about twenty small glowing fragments, like beads on a thread, against black space.",
      caption: "Comet Shoemaker–Levy 9. In this image of Comet Shoemaker–Levy 9 taken on May 17, 1994, by NASA’s Hubble Space Telescope, you can see about 20 icy fragments into which the comet broke. The comet was approximately 660 million kilometers from Earth, heading on a collision course with Jupiter. (credit: modification of work by NASA, ESA, H. Weaver (STScl), E. Smith (STScl))"
    },
    "7.14": {
      file: "fig-7-14.jpg",
      title: "Jupiter with Huge Dust Clouds",
      alt: "Four overlapping views of the lower part of Jupiter, each showing dark impact spots in its clouds that change shape from one frame to the next.",
      caption: "Jupiter with Huge Dust Clouds. The Hubble Space Telescope took this sequence of images of Jupiter in summer 1994, when fragments of Comet Shoemaker–Levy 9 collided with the giant planet. Here we see the site hit by fragment G, from five minutes to five days after impact. Several of the dust clouds generated by the collisions became larger than Earth. (credit: modification of work by H. Hammel, NASA)"
    },
    "7.15": {
      file: "fig-7-15.jpg",
      title: "Our Cratered Moon",
      alt: "A full gray Moon covered almost entirely in craters of every size, with only a few darker smooth patches.",
      caption: "Our Cratered Moon. This composite image of the Moon’s surface was made from many smaller images taken between November 2009 and February 2011 by the Lunar Reconnaissance Orbiter (LRO) and shows craters of many different sizes. (credit: modification of work by NASA/GSFC/Arizona State University)"
    },
    "7.16": {
      file: "fig-7-16.jpg",
      title: "Radioactive Decay",
      alt: "A graph of fraction of the original sample remaining versus number of half-lives: a curve dropping from 1 to 1/2 at one half-life, 1/4 at two, 1/8 at three, and so on, with a rock drawn at each step that has less and less pink in it.",
      caption: "Radioactive Decay. This graph shows (in pink) the amount of a radioactive sample that remains after several half-lives have passed. After one half-life, half the sample is left; after two half-lives, one half of the remainder (or one quarter) is left; and after three half-lives, one half of that (or one eighth) is left. Note that, in reality, the decay of radioactive elements in a rock sample would not cause any visible change in the appearance of the rock; the splashes of color are shown here for conceptual purposes only."
    },
    "7.17": {
      file: "fig-7-17.jpg",
      title: "Solar Nebula",
      alt: "A painting of swirling bands of orange and brown gas and dust, with lumpy rocky and icy bodies floating in the foreground.",
      caption: "Solar Nebula. This artist’s conception of the solar nebula shows the flattened cloud of gas and dust from which our planetary system formed. Icy and rocky planetesimals (precursors of the planets) can be seen in the foreground. The bright center is where the Sun is forming. (credit: William K. Hartmann, Planetary Science Institute)"
    },
    "7.18": {
      file: "fig-7-18.jpg",
      title: "Atlas of Planetary Nurseries",
      alt: "A grid of about thirty small Hubble images from the Orion Nebula, each showing a tiny disk around a young star — some glowing, some dark silhouettes against bright pink gas.",
      caption: "Atlas of Planetary Nurseries. These Hubble Space Telescope photos show sections of the Orion Nebula, a relatively close-by region where stars are currently forming. Each image shows an embedded circumstellar disk orbiting a very young star. Seen from different angles, some are energized to glow by the light of a nearby star while others are dark and seen in silhouette against the bright glowing gas of the Orion Nebula. Each is a contemporary analog of our own solar nebula—a location where planets are probably being formed today. (credit: modification of work by NASA/ESA, L. Ricci (ESO))"
    }
  };

  /* ---------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "7.1",
      title: "Overview of Our Planetary System",
      minutes: 16,
      pages: "pp. 222–233",
      html:
        '<div data-figure="7.1"></div>' +
        '<p>Around the Sun is a whole system of worlds: eight major planets, many dwarf planets, hundreds of ' +
        'moons, and countless smaller objects. Thanks mostly to spacecraft visits, we can now picture them as ' +
        '<em>other worlds</em>, each with its own chemical and geological history. Some call the last few decades ' +
        'the &ldquo;golden age of planetary exploration.&rdquo; This chapter introduces ' +
        '<strong>comparative planetology</strong> &mdash; learning how planets work by comparing them with one ' +
        'another, and using them to learn how the whole solar system began and changed.</p>' +
        '<p>The <strong>solar system</strong> is the Sun plus many smaller objects: the planets, their moons and ' +
        'rings, and &ldquo;debris&rdquo; such as asteroids, comets, and dust. Most of these formed together with the ' +
        'Sun about <strong>4.5 billion years ago</strong>, as clumps of material condensed from an enormous cloud of ' +
        'gas and dust. The cloud&rsquo;s center became the Sun; a small fraction of the material farther out became ' +
        'everything else. (The general name for a star&rsquo;s family of planets is a <em>planetary system</em>. Ours ' +
        'is the &ldquo;solar&rdquo; system because the Sun is sometimes called <em>Sol</em> &mdash; so strictly ' +
        'speaking, there is only one solar system.)</p>' +
        '<p>In the past 50 years we have learned more about the solar system than anyone imagined before the space ' +
        'age. Planetary astronomy is the only branch of astronomy where we can (by robot) actually travel to what we ' +
        'study. Spacecraft such as <strong>Voyager, Pioneer, Curiosity,</strong> and <strong>Pathfinder</strong> have ' +
        'flown past, orbited, or landed on <strong>every planet</strong>. Along the way we have also investigated ' +
        'two dwarf planets, hundreds of moons, four ring systems, a dozen asteroids, and several comets.</p>' +
        '<p>Our probes have plunged into Jupiter&rsquo;s atmosphere and landed on Venus, Mars, our Moon, ' +
        'Saturn&rsquo;s moon <strong>Titan</strong>, the asteroids Eros, Itokawa, Ryugu, and Bennu, and Comet ' +
        'Churyumov-Gerasimenko (<strong>67P</strong>). Humans have walked on the Moon and brought back its soil for ' +
        'lab study (Figure 7.2). We have flown a helicopter drone on Mars, and found other places in the solar ' +
        'system that might be able to support some kind of life.</p>' +
        '<div data-figure="7.2"></div>' +
        '<h4>An inventory</h4>' +
        '<p>The <strong>Sun</strong> &mdash; brighter than about 80% of the stars in the Galaxy &mdash; is by far the ' +
        'most massive member of the solar system. It is a ball about <strong>1.4 million kilometers</strong> across, ' +
        'with glowing gas on its surface and an interior temperature of millions of degrees.</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Object</th><th>Percentage of total mass of solar system</th></tr>' +
        '<tr><td>Sun</td><td>99.80</td></tr>' +
        '<tr><td>Jupiter</td><td>0.10</td></tr>' +
        '<tr><td>Comets</td><td>0.0005&ndash;0.03 (estimate)</td></tr>' +
        '<tr><td>All other planets and dwarf planets</td><td>0.04</td></tr>' +
        '<tr><td>Moons and rings</td><td>0.00005</td></tr>' +
        '<tr><td>Asteroids</td><td>0.000002 (estimate)</td></tr>' +
        '<tr><td>Cosmic dust</td><td>0.0000001 (estimate)</td></tr>' +
        '</tbody></table></div>' +
        '<p>As this table (the book&rsquo;s Table 7.1) shows, most of the planets&rsquo; material is in the biggest ' +
        'one: <strong>Jupiter is more massive than all the other planets combined</strong>. Astronomers found the ' +
        'planets&rsquo; masses centuries ago using Kepler&rsquo;s laws and Newton&rsquo;s law of gravity, by ' +
        'measuring their pull on each other or on their moons. Today we measure them even more precisely by ' +
        'tracking how they tug on passing spacecraft.</p>' +
        '<p>Besides Earth, five planets were known in ancient times &mdash; <strong>Mercury, Venus, Mars, Jupiter, ' +
        'and Saturn</strong> &mdash; and two were discovered after the telescope was invented: <strong>Uranus and ' +
        'Neptune</strong>. All eight revolve around the Sun in the <strong>same direction</strong> and in about the ' +
        '<strong>same plane</strong>, like cars on concentric tracks of a giant, flat racecourse. Each stays in its ' +
        'own &ldquo;lane,&rdquo; on a nearly circular orbit, obeying the &ldquo;traffic laws&rdquo; found by ' +
        'Galileo, Kepler, and Newton.</p>' +
        '<p>Beyond Neptune are smaller worlds called <strong>trans-Neptunian objects</strong> (TNOs) (Figure 7.3). ' +
        'The first found, in <strong>1930</strong>, was <strong>Pluto</strong>; others have been discovered in the ' +
        'twenty-first century. One, <strong>Eris</strong>, is about Pluto&rsquo;s size and has at least one moon ' +
        '(Pluto has five known moons). The largest TNOs are classed as <strong>dwarf planets</strong>, as is the ' +
        'largest asteroid, <strong>Ceres</strong>. More than <strong>3900</strong> TNOs have been found so far, and ' +
        'one, <strong>Arrokoth</strong>, was explored by the New Horizons spacecraft.</p>' +
        '<div data-figure="7.3"></div>' +
        '<p>Each planet and dwarf planet also <strong>rotates</strong> (spins) on an axis &mdash; usually in the same ' +
        'direction it revolves around the Sun. The exceptions: <strong>Venus</strong> rotates backward ' +
        '(<em>retrograde</em>) and very slowly, and <strong>Uranus</strong> and <strong>Pluto</strong> spin on axes ' +
        'tipped nearly on their sides. We don&rsquo;t yet know how Eris, Haumea, and Makemake are oriented.</p>' +
        '<h4>Two kinds of planets</h4>' +
        '<p>The four planets closest to the Sun (Mercury through Mars) are the inner, or ' +
        '<span class="term">terrestrial planets</span>. The Moon is often grouped with them, making five ' +
        'terrestrial objects. (We call Earth&rsquo;s satellite &ldquo;the Moon,&rdquo; capital M, and others ' +
        '&ldquo;moons.&rdquo;) They are fairly small worlds of mostly <strong>rock and metal</strong>, with solid ' +
        'surfaces that record their geological history in craters, mountains, and volcanoes (Figure 7.4).</p>' +
        '<div data-figure="7.4"></div>' +
        '<p>The next four (Jupiter through Neptune) are much bigger and are made mostly of lighter ' +
        '<strong>ices, liquids, and gases</strong>. These are the <strong>jovian planets</strong> (after ' +
        '&ldquo;Jove,&rdquo; another name for Jupiter) or <span class="term">giant planets</span> (Figure 7.5). ' +
        'About <strong>1,300 Earths</strong> could fit inside Jupiter. The giants have no solid surface to land on ' +
        '&mdash; they are more like vast, round oceans with much smaller, dense cores.</p>' +
        '<div data-figure="7.5"></div>' +
        '<p>Near the outer edge of the system is <strong>Pluto</strong>, the first of the distant icy worlds found ' +
        'beyond Neptune. NASA&rsquo;s <strong>New Horizons</strong> mission flew past it in <strong>2015</strong> ' +
        '(Figure 7.6).</p>' +
        '<div data-figure="7.6"></div>' +
        '<p>The book&rsquo;s Table 7.2 sums up the main facts about the planets:</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Planet</th><th>Distance from Sun (AU)</th><th>Revolution period (y)</th><th>Diameter (km)</th><th>Mass (10<sup>23</sup> kg)</th><th>Density (g/cm<sup>3</sup>)</th></tr>' +
        '<tr><td>Mercury</td><td>0.39</td><td>0.24</td><td>4,878</td><td>3.3</td><td>5.4</td></tr>' +
        '<tr><td>Venus</td><td>0.72</td><td>0.62</td><td>12,120</td><td>48.7</td><td>5.2</td></tr>' +
        '<tr><td>Earth</td><td>1.00</td><td>1.00</td><td>12,756</td><td>59.8</td><td>5.5</td></tr>' +
        '<tr><td>Mars</td><td>1.52</td><td>1.88</td><td>6,787</td><td>6.4</td><td>3.9</td></tr>' +
        '<tr><td>Jupiter</td><td>5.20</td><td>11.86</td><td>142,984</td><td>18,991</td><td>1.3</td></tr>' +
        '<tr><td>Saturn</td><td>9.54</td><td>29.46</td><td>120,536</td><td>5686</td><td>0.7</td></tr>' +
        '<tr><td>Uranus</td><td>19.18</td><td>84.07</td><td>51,118</td><td>866</td><td>1.3</td></tr>' +
        '<tr><td>Neptune</td><td>30.06</td><td>164.82</td><td>49,660</td><td>1030</td><td>1.6</td></tr>' +
        '</tbody></table></div>' +
        '<p>(An AU, or astronomical unit, is the distance from Earth to the Sun. Densities are in units where water ' +
        'is 1 g/cm<sup>3</sup>; multiply by 1000 to get kg/m<sup>3</sup>.)</p>' +
        '<div data-diagram="planet-facts"></div>' +
        '<p class="callout-inline"><strong>Worked example: comparing densities.</strong> Density = mass &divide; ' +
        'volume, and a sphere&rsquo;s volume is V = <sup>4</sup>&frasl;<sub>3</sub>&pi;R<sup>3</sup> (with ' +
        '&pi; &asymp; 3.14 &mdash; planets aren&rsquo;t perfect spheres, but this works well enough). ' +
        'Saturn&rsquo;s moon <strong>Mimas</strong> has a mass of 4 &times; 10<sup>19</sup> kg and a diameter of ' +
        'about 400 km, so its radius is 200 km = 2 &times; 10<sup>5</sup> m. Its volume is ' +
        '<sup>4</sup>&frasl;<sub>3</sub> &times; 3.14 &times; (2 &times; 10<sup>5</sup> m)<sup>3</sup> = 3.3 ' +
        '&times; 10<sup>16</sup> m<sup>3</sup>, and its density is (4 &times; 10<sup>19</sup> kg) &divide; (3.3 ' +
        '&times; 10<sup>16</sup> m<sup>3</sup>) = <strong>1.2 &times; 10<sup>3</sup> kg/m<sup>3</sup></strong>. ' +
        'Water is 1000 kg/m<sup>3</sup>, so Mimas must be made mainly of <strong>ice, not rock</strong>. ' +
        '<em>Check your learning:</em> for <strong>Earth</strong>, density = (6 &times; 10<sup>24</sup> kg) &divide; ' +
        '(4.2 &times; 2.6 &times; 10<sup>20</sup> m<sup>3</sup>) = <strong>5.5 &times; 10<sup>3</sup> ' +
        'kg/m<sup>3</sup></strong> &mdash; four to five times Mimas&rsquo;. In fact, Earth is the densest of the ' +
        'planets.</p>' +
        '<h4>Smaller members of the solar system</h4>' +
        '<p>Most planets have one or more moons; only <strong>Mercury and Venus</strong> travel alone. Some ' +
        '<strong>430 known moons</strong> orbit planets and dwarf planets, and surely many small ones are still ' +
        'undiscovered. The biggest moons are as large as small planets and just as interesting: besides our Moon, ' +
        'they include Jupiter&rsquo;s four largest &mdash; the <strong>Galilean moons</strong>, named after their ' +
        'discoverer &mdash; and the largest moons of Saturn and Neptune (confusingly named <strong>Titan</strong> ' +
        'and <strong>Triton</strong>).</p>' +
        '<p>Each giant planet also has <strong>rings</strong>: countless small bodies, from mountain-sized down to ' +
        'dust grains, all orbiting above the planet&rsquo;s equator. Saturn&rsquo;s bright rings are by far the ' +
        'easiest to see and among the most beautiful sights in the solar system (Figure 7.7). All four ring systems ' +
        'interest scientists because of their complicated shapes, influenced by the pull of the moons that orbit ' +
        'with them.</p>' +
        '<div data-figure="7.7"></div>' +
        '<p><span class="term">Asteroids</span> are rocky bodies that orbit the Sun like miniature planets, ' +
        'mostly between <strong>Mars and Jupiter</strong> &mdash; though some cross the orbits of planets like ' +
        'Earth (Figure 7.8). Most are leftovers from the solar system&rsquo;s early population, from before the ' +
        'planets themselves formed. Some of the smallest moons, such as the moons of Mars, are very likely ' +
        'captured asteroids.</p>' +
        '<div data-figure="7.8"></div>' +
        '<p><span class="term">Comets</span> are small bodies made mostly of <strong>ice</strong> &mdash; frozen ' +
        'gases such as water, carbon dioxide, and carbon monoxide (Figure 7.9). They are also leftovers from the ' +
        'solar system&rsquo;s formation, but they formed &mdash; and (with rare exceptions) still orbit &mdash; in ' +
        'the distant, cold outer regions, stored in a kind of cosmic deep freeze. That&rsquo;s also the realm of the ' +
        'larger icy worlds, the dwarf planets.</p>' +
        '<div data-figure="7.9"></div>' +
        '<p>Finally, there are countless grains of broken rock, called <strong>cosmic dust</strong>, scattered ' +
        'throughout the solar system. When these grains enter Earth&rsquo;s atmosphere (millions do each day) they ' +
        'burn up in a brief flash of light called a <span class="term">meteor</span> &mdash; a &ldquo;shooting ' +
        'star.&rdquo; Sometimes a bigger chunk of rock or metal survives the trip and lands on Earth: any piece that ' +
        'hits the ground is a <span class="term">meteorite</span>. (You can see meteorites in many natural history ' +
        'museums, and even buy pieces from gem and mineral dealers.)</p>' +
        '<div data-diagram="meteor-path"></div>' +
        '<div class="callout-inline"><strong>Voyagers in astronomy: Carl Sagan, solar system advocate.</strong> ' +
        'The best-known astronomer in the world in the 1970s and 1980s, <strong>Carl Sagan</strong> (born in ' +
        'Brooklyn, New York, in 1934) studied the planets and worked hard to show the public what exploring them ' +
        'could teach us (Figure 7.10). He credited science fiction with keeping his childhood fascination alive. In ' +
        'the early 1960s, when many scientists still thought Venus might be pleasant, Sagan calculated that its ' +
        'thick atmosphere could act like a giant <strong>greenhouse</strong>, trapping heat and raising the ' +
        'temperature enormously. He showed that the seasonal changes seen on Mars came from <strong>wind-blown ' +
        'dust</strong>, not plants. He served on many robotic mission teams and helped get a message plaque put on ' +
        'the <strong>Pioneer</strong> spacecraft and audio-video records on <strong>Voyager</strong> &mdash; bits of ' +
        'Earth headed out among the stars. He helped found <strong>The Planetary Society</strong>, now the largest ' +
        'space-interest organization in the world; simulated how some of life&rsquo;s building blocks might have ' +
        'formed in Earth&rsquo;s early &ldquo;primordial soup&rdquo;; and, with colleagues, modeled the effects of ' +
        'nuclear war (the <strong>nuclear winter</strong> hypothesis) and of continued air pollution. He wrote ' +
        'many books, including the best-seller <em>Cosmos</em>, <em>The Cosmic Connection</em>, <em>Pale Blue Dot</em>, ' +
        '<em>The Demon Haunted World</em> (finished just before his death in 1996), and the novel ' +
        '<em>Contact</em>, which became a film. His 13-part TV series <em>Cosmos</em> was seen by an estimated ' +
        '<strong>500 million people in 60 countries</strong>. In the decades since, perhaps the closest to his fame is ' +
        '<strong>Neil deGrasse Tyson</strong>, director of the Hayden Planetarium, who made an updated ' +
        '<em>Cosmos</em> in 2014 &mdash; and who says Sagan inspired him to become a scientist, after inviting him to ' +
        'Cornell for a day as a high school student.</div>' +
        '<div data-figure="7.10"></div>' +
        '<h4>A scale model of the solar system</h4>' +
        '<p>What does 1.4 billion kilometers &mdash; the distance from the Sun to Saturn &mdash; really mean? A scale ' +
        'model helps. Imagine shrinking the solar system by a factor of <strong>1 billion</strong> ' +
        '(10<sup>9</sup>), dividing every size and distance by 10<sup>9</sup>:</p>' +
        '<ul>' +
        '<li><strong>Earth</strong> is 1.3 cm across &mdash; about the size of a <strong>grape</strong>. The ' +
        '<strong>Moon</strong> is a <strong>pea</strong> 40 cm (a little more than a foot) away. The whole ' +
        'Earth-Moon system fits in a backpack.</li>' +
        '<li>The <strong>Sun</strong> is nearly <strong>1.5 m</strong> across &mdash; about the height of an ' +
        'adult &mdash; and Earth is <strong>150 m</strong> away, about <strong>one city block</strong>.</li>' +
        '<li><strong>Jupiter</strong> is <strong>five blocks</strong> from the Sun and 15 cm across, about the size ' +
        'of a very large <strong>grapefruit</strong>. <strong>Saturn</strong> is 10 blocks away, ' +
        '<strong>Uranus</strong> 20, and <strong>Neptune</strong> 30. <strong>Pluto</strong>, whose distance ' +
        'varies a lot during its 249-year orbit, is now just beyond 30 blocks and moving farther.</li>' +
        '<li>Most moons of the outer solar system are the sizes of various seeds, orbiting the grapefruit, ' +
        'oranges, and lemons that stand for the outer planets.</li>' +
        '<li>A <strong>human</strong> shrinks to the size of a single <strong>atom</strong>, and cars and ' +
        'spacecraft to the size of molecules. Sending Voyager to Neptune is like steering one molecule from the ' +
        'Earth-grape to a lemon <strong>5 kilometers</strong> away, with the accuracy of the width of a thread in a ' +
        'spider&rsquo;s web.</li>' +
        '<li>The <strong>nearest stars</strong> would be <strong>tens of thousands of kilometers</strong> away ' +
        '&mdash; on the other side of Earth or beyond.</li>' +
        '</ul>' +
        '<div data-diagram="scale-model"></div>' +
        '<p>Model solar systems like this have been built in cities around the world. In Sweden, Stockholm&rsquo;s ' +
        'huge Globe Arena is the Sun, and Pluto is a 12-centimeter sculpture in the small town of Delsbo, 300 ' +
        'kilometers away. Another one sits on the Mall in Washington, between the White House and Congress ' +
        '(perhaps proving they are worlds apart?).</p>' +
        '<div class="callout-inline"><strong>Making connections: names in the solar system.</strong> Planets and ' +
        'moons are named after gods and heroes of Greek and Roman mythology (with a few exceptions among the moons ' +
        'of Uranus, named from English literature). When <strong>William Herschel</strong> discovered Uranus, he ' +
        'wanted to call it <em>Georgium Sidus</em> (George&rsquo;s star) after King George III, but astronomers in ' +
        'other nations objected and the classical tradition was kept. More recently, dwarf planets and their moons ' +
        'have been named from the mythologies of other cultures too. <strong>Comets</strong> are often named for ' +
        'their discoverers; <strong>asteroids</strong> can be named by their discoverers after almost anyone or ' +
        'anything (including, recently, the three senior authors of this book). Names for <em>features</em> on other ' +
        'worlds are approved by a committee of the <strong>International Astronomical Union (IAU)</strong>, which ' +
        'has rules: craters on <strong>Venus</strong> honor women who made significant contributions to human ' +
        'knowledge and welfare; volcanic features on <strong>Io</strong> are named for gods of fire and thunder from ' +
        'many cultures; craters on <strong>Mercury</strong> honor famous novelists, playwrights, artists, and ' +
        'composers; and features on Saturn&rsquo;s moon <strong>Tethys</strong> come from Homer&rsquo;s ' +
        '<em>Odyssey</em>. Even the word <em>planet</em> has become controversial, since many planetary systems ' +
        'don&rsquo;t look like ours. The biggest dispute is about <strong>Pluto</strong>, much smaller than the other ' +
        'eight: the category <strong>dwarf planet</strong> was invented for Pluto and similar icy objects beyond ' +
        'Neptune. Is a dwarf planet also a planet? Logically it should be, but the question has been hotly ' +
        'debated.</div>',
      keyIdeas: [
        "The solar system is the Sun plus planets, moons, rings, asteroids, comets, and dust — most of it formed together with the Sun about 4.5 billion years ago from a cloud of gas and dust.",
        "The Sun holds 99.80% of the solar system's mass; Jupiter is more massive than all the other planets combined.",
        "All eight planets revolve in the same direction and in nearly the same plane on nearly circular orbits. Most also rotate in that direction — except Venus (backward and slow) and Uranus and Pluto (tipped on their sides).",
        "The terrestrial planets (Mercury, Venus, Earth, Mars — often plus the Moon) are small, rocky and metallic, with solid surfaces; the giant (jovian) planets (Jupiter, Saturn, Uranus, Neptune) are huge, mostly ices, liquids, and gases, with no solid surface.",
        "Beyond Neptune are trans-Neptunian objects (more than 3900 known); the largest, like Pluto and Eris, are dwarf planets, as is the asteroid Ceres.",
        "About 430 moons are known; only Mercury and Venus have none. All four giant planets have rings.",
        "Asteroids are rocky, mostly between Mars and Jupiter; comets are icy and orbit far out; cosmic dust burning up in our air makes a meteor, and a piece that reaches the ground is a meteorite.",
        "In a 1-billion-to-1 scale model, Earth is a grape one city block (150 m) from a 1.5-m Sun, Jupiter is a grapefruit five blocks out, Neptune is 30 blocks out, and the nearest stars are tens of thousands of kilometers away."
      ],
      selfCheck: [
        { q: "What percentage of the solar system's mass is in the Sun, and which planet holds most of the rest?",
          a: "The Sun has 99.80% of the mass. Jupiter (0.10%) is more massive than all the other planets combined." },
        { q: "What are the main differences between the terrestrial and the giant planets?",
          a: "Terrestrial planets (Mercury–Mars) are small, made mostly of rock and metal, with solid surfaces showing craters, mountains, and volcanoes. Giant planets (Jupiter–Neptune) are much larger, made mostly of lighter ices, liquids, and gases, with no solid surface — vast oceans around small, dense cores." },
        { q: "Which planets break the rule of rotating in the same direction they revolve?",
          a: "Venus rotates backward (retrograde) and very slowly; Uranus and Pluto spin about axes tipped nearly on their sides." },
        { q: "What is the difference between a meteor and a meteorite?",
          a: "A meteor is the brief flash of light when a bit of cosmic dust burns up in Earth's atmosphere. A meteorite is a larger piece of rock or metal that survives the trip and actually strikes the ground." },
        { q: "Saturn's moon Mimas has a density of about 1.2 × 10³ kg/m³. What does that tell us?",
          a: "Water's density is 1000 kg/m³, so Mimas is only a little denser than water — it must be made mainly of ice, not rock." },
        { q: "In the book's 1-billion scale model, how big is Earth and how far is it from the Sun?",
          a: "Earth is 1.3 cm across (a grape), 150 m — about one city block — from a Sun nearly 1.5 m across." }
      ]
    },
    {
      id: "7.2",
      title: "Composition and Structure of Planets",
      minutes: 10,
      pages: "pp. 233–237",
      html:
        '<p>Two distinct kinds of planets &mdash; rocky terrestrial planets and gas-rich jovian planets &mdash; ' +
        'suggest they formed under different conditions. Their compositions are certainly dominated by different ' +
        'elements.</p>' +
        '<h4>The giant planets</h4>' +
        '<p><strong>Jupiter and Saturn</strong> have nearly the same chemical makeup as the Sun: mostly hydrogen and ' +
        'helium, with <strong>75% of their mass hydrogen and 25% helium</strong>. Both are gases on Earth, so these ' +
        'are sometimes called &ldquo;gas planets&rdquo; &mdash; but that&rsquo;s misleading. They are so big that the ' +
        'gas inside is squeezed until the hydrogen becomes a <strong>liquid</strong>. Since most of each planet is ' +
        'compressed liquid hydrogen, we should really call them <strong>liquid planets</strong>.</p>' +
        '<p>Gravity makes heavier elements sink toward the inside of a liquid or gaseous planet, so Jupiter and Saturn ' +
        'both have <strong>cores</strong> of heavier rock, metal, and ice. We can&rsquo;t see these cores &mdash; ' +
        'from above, all we see is the atmosphere&rsquo;s swirling clouds (Figure 7.11) &mdash; so we infer them from ' +
        'studies of each planet&rsquo;s gravity.</p>' +
        '<div data-figure="7.11"></div>' +
        '<p><strong>Uranus and Neptune</strong> are much smaller than Jupiter and Saturn, but each also has a core of ' +
        'rock, metal, and ice. They were less efficient at attracting hydrogen and helium gas, so their atmospheres ' +
        'are much smaller compared with their cores.</p>' +
        '<p>Chemically, every giant planet is dominated by hydrogen and its many compounds. Nearly all the oxygen is ' +
        'combined with hydrogen as <strong>water</strong> (H<sub>2</sub>O). Chemists call a hydrogen-dominated ' +
        'composition <strong>reduced</strong>. Throughout the outer solar system we find plenty of water (mostly as ' +
        'ice) and reducing chemistry.</p>' +
        '<h4>The terrestrial planets</h4>' +
        '<p>The terrestrial planets are much smaller and made mostly of <strong>rocks and metals</strong> &mdash; ' +
        'built from elements that are less common in the universe as a whole. The most abundant rocks, ' +
        '<strong>silicates</strong>, are made of silicon and oxygen; the most common metal is <strong>iron</strong>. ' +
        'Their densities (Table 7.2) show that <strong>Mercury</strong> has the largest share of metal (which is ' +
        'denser) and the <strong>Moon</strong> the smallest. Earth, Venus, and Mars have roughly similar bulk ' +
        'makeups: about <strong>one third</strong> of their mass is iron-nickel or iron-sulfur, and <strong>two ' +
        'thirds</strong> is silicates. Because they are largely oxygen compounds (like the silicates in their ' +
        'crusts), their chemistry is called <strong>oxidized</strong>.</p>' +
        '<p>Inside each terrestrial planet, the densest metals are in a central <strong>core</strong> and the ' +
        'lighter silicates are near the surface. In a liquid planet we&rsquo;d explain that as heavy elements sinking ' +
        'under gravity &mdash; so although these planets are solid today, they must once have been hot enough to ' +
        '<strong>melt</strong>.</p>' +
        '<p><span class="term">Differentiation</span> is the process by which gravity separates a planet&rsquo;s ' +
        'interior into layers of different composition and density. Heavier metals sink to form a core; the lightest ' +
        'minerals float up to form a crust. When the planet later cools, the layers are preserved. For a rocky planet ' +
        'to differentiate, it must be heated to the melting point of rocks &mdash; typically more than ' +
        '<strong>1300 K</strong>.</p>' +
        '<div data-diagram="differentiation"></div>' +
        '<h4>Moons, asteroids, and comets</h4>' +
        '<p>Earth&rsquo;s Moon is chemically and structurally like the terrestrial planets. But most moons are in the ' +
        'outer solar system, and their makeup is like the cores of the giant planets they orbit. The three largest ' +
        'moons &mdash; <strong>Ganymede</strong> and <strong>Callisto</strong> (Jupiter) and <strong>Titan</strong> ' +
        '(Saturn) &mdash; are <strong>half frozen water and half rock and metal</strong>. Most of these moons ' +
        'differentiated as they formed, and today they have cores of rock and metal under layers and crusts of very ' +
        'cold &mdash; and therefore very hard &mdash; ice (Figure 7.12).</p>' +
        '<div data-figure="7.12"></div>' +
        '<p>Several of the larger moons may have <strong>oceans of liquid water</strong> &mdash; mostly shallow ' +
        '&mdash; inside them. These &ldquo;<strong>water worlds</strong>&rdquo; are a subject of intense interest. ' +
        'How can their oceans stay liquid so far out in the cold? Their insides may be warmed by <strong>tides</strong> ' +
        'raised by gravitational tugging from neighboring worlds; under the right conditions, that tidal energy can ' +
        'heat a moon&rsquo;s interior and even melt an ice layer. In the extreme case of <strong>Io</strong>, ' +
        'Jupiter&rsquo;s closest large moon, tides power widespread volcanoes that erupt from the surface.</p>' +
        '<p>Most asteroids and comets, and the smallest moons, were probably <strong>never heated to melting</strong>. ' +
        'Some of the largest asteroids, such as <strong>Vesta</strong>, do appear differentiated, and others are ' +
        'fragments of differentiated bodies. Many smaller objects seem to be fragments or rubble piles left by ' +
        'collisions. Because most asteroids and comets keep their original composition, they are relatively ' +
        'unchanged material from the solar system&rsquo;s birth &mdash; <strong>chemical fossils</strong> that teach us ' +
        'about a time whose traces have been erased on larger worlds.</p>' +
        '<h4>Temperatures: going to extremes</h4>' +
        '<p>In general, the <strong>farther</strong> a planet or moon is from the Sun, the <strong>cooler</strong> its ' +
        'surface. Planets are heated by sunlight, which weakens with the <strong>square of the distance</strong> ' +
        '&mdash; like the warmth of a fireplace fading quickly as you walk away. Mercury&rsquo;s sunlit side is a ' +
        'blistering <strong>280&ndash;430 &deg;C</strong>; Pluto&rsquo;s surface is only about ' +
        '<strong>&ndash;220 &deg;C</strong>, colder than liquid air.</p>' +
        '<p>Mathematically, temperature drops roughly in proportion to the <strong>square root</strong> of the distance ' +
        'from the Sun. Pluto is about 30 AU from the Sun at its closest (about <strong>100 times</strong> Mercury&rsquo;s ' +
        'distance) and about 49 AU at its farthest. So Pluto&rsquo;s temperature is lower than Mercury&rsquo;s by the ' +
        'square root of 100, a factor of <strong>10</strong>: from <strong>500 K to 50 K</strong>.</p>' +
        '<div data-diagram="planet-temperature"></div>' +
        '<p>An <strong>atmosphere</strong> can also strongly change a surface&rsquo;s temperature. Without our ' +
        'atmosphere&rsquo;s insulation (the <strong>greenhouse effect</strong>, which keeps heat in), Earth&rsquo;s oceans ' +
        'would be permanently frozen. If Mars once had a thicker atmosphere, it could have had a milder climate than ' +
        'today. <strong>Venus</strong> is the extreme case: its thick carbon dioxide atmosphere traps heat at the ' +
        'surface, making it <strong>hotter than Mercury</strong>. Today, Earth is the only planet where surface ' +
        'temperatures are generally between the freezing and boiling points of water &mdash; and as far as we know, the ' +
        'only planet with life.</p>' +
        '<div class="callout-inline"><strong>Astronomy basics: there&rsquo;s no place like home.</strong> Like Dorothy in ' +
        '<em>The Wizard of Oz</em>, we find that no other world in the solar system is as livable as home &mdash; humans ' +
        'couldn&rsquo;t survive anywhere else without a lot of artificial help. <strong>Venus</strong>&rsquo;s thick carbon ' +
        'dioxide atmosphere keeps its surface at a sizzling <strong>700 K</strong> (near 900 &deg;F). ' +
        '<strong>Mars</strong> is generally below freezing, with air (also mostly carbon dioxide) as thin as ' +
        'Earth&rsquo;s at an altitude of <strong>30 kilometers</strong> (100,000 feet) &mdash; and it hasn&rsquo;t ' +
        'rained there for billions of years. The jovian planets&rsquo; outer layers are neither warm enough nor solid ' +
        'enough to live on, so any bases there may have to be in space or on one of their moons. Perhaps warmer ' +
        'havens wait deep inside Jupiter&rsquo;s clouds or in the ocean under the ice of its moon <strong>Europa</strong>. All of this says we ' +
        'had better take good care of Earth: human activity, especially adding the potent greenhouse gas carbon ' +
        'dioxide, may be making our planet less livable, and in a solar system that seems unready to receive us, ' +
        'that may be a grave mistake.</div>' +
        '<h4>Geological activity</h4>' +
        '<p>The crusts of all the terrestrial planets, the larger moons, and Pluto have been changed over time by ' +
        'forces from outside and inside. From <strong>outside</strong>, each has been hit by a slow rain of ' +
        'projectiles from space, leaving <strong>impact craters</strong> of all sizes (Figure 7.4). This bombardment ' +
        'was much heavier early in the solar system&rsquo;s history, but it continues today at a lower rate. In the ' +
        'summer of <strong>1994</strong>, more than <strong>20</strong> large pieces of <strong>Comet ' +
        'Shoemaker&ndash;Levy 9</strong> crashed into Jupiter (Figure 7.13), leaving debris clouds larger than Earth in ' +
        'Jupiter&rsquo;s atmosphere (Figure 7.14).</p>' +
        '<div data-figure="7.13"></div>' +
        '<div data-figure="7.14"></div>' +
        '<p>From <strong>inside</strong>, forces have buckled and twisted the terrestrial planets&rsquo; crusts, built ' +
        'mountain ranges, and erupted as volcanoes &mdash; what we call <strong>geological activity</strong>. (The ' +
        'prefix <em>geo</em> means &ldquo;Earth,&rdquo; a bit &ldquo;Earth-chauvinist,&rdquo; but the term is too ' +
        'widely used to change.) Among the terrestrial planets, <strong>Earth and Venus</strong> have had the most ' +
        'geological activity, and some moons of the outer solar system are surprisingly active too. Our ' +
        '<strong>Moon</strong>, by contrast, is a dead world where geological activity stopped billions of years ' +
        'ago.</p>' +
        '<p>Geological activity comes from a <strong>hot interior</strong>: volcanoes and mountain building are driven ' +
        'by heat escaping from inside. Each planet was heated at birth, and that early heat powered lots of volcanic ' +
        'activity &mdash; even on the Moon. But small objects like the Moon soon cooled off. <strong>The larger the ' +
        'world, the longer it keeps its internal heat</strong>, and so the more signs of continuing activity we ' +
        'expect &mdash; just as a big baked potato cools more slowly than a small one (to cool a potato fast, cut it ' +
        'into small pieces).</p>' +
        '<p>The terrestrial planets mostly fit this simple idea. The <strong>Moon</strong>, the smallest, is ' +
        'geologically dead. We know less about <strong>Mercury</strong>, but it probably stopped most volcanic activity ' +
        'around the same time as the Moon. <strong>Mars</strong> is in between: more active than the Moon, less than ' +
        'Earth. <strong>Earth and Venus</strong>, the largest terrestrial planets, still have molten interiors today, ' +
        'some 4.5 billion years after their birth.</p>',
      keyIdeas: [
        "Jupiter and Saturn are 75% hydrogen and 25% helium by mass, like the Sun. Their hydrogen is squeezed into a liquid, so they are really liquid planets, with hidden cores of rock, metal, and ice.",
        "Uranus and Neptune are smaller, with relatively smaller atmospheres around their cores. Giant-planet chemistry is hydrogen-dominated (reduced), with abundant water.",
        "Terrestrial planets are rock (silicates of silicon and oxygen) and metal (mostly iron); Earth, Venus, and Mars are about one third iron compounds and two thirds silicates. Their chemistry is oxidized. Mercury has the most metal, the Moon the least.",
        "Differentiation: in a melted world (above about 1300 K for rock), gravity sinks heavy metal to a core and floats light minerals into a crust; the layers stay when it cools.",
        "Ganymede, Callisto, and Titan are half ice, half rock and metal. Some moons may hide liquid-water oceans, perhaps warmed by tides; on Io, tides power volcanoes. Most asteroids and comets were never melted — they are chemical fossils.",
        "Surface temperature falls with distance from the Sun (roughly as one over the square root of distance — Mercury 500 K, Pluto 50 K), but atmospheres matter too: the greenhouse effect keeps Earth's oceans liquid and makes Venus hotter than Mercury.",
        "Surfaces are changed from outside by impacts (like Comet Shoemaker–Levy 9 hitting Jupiter in 1994) and from inside by geological activity driven by internal heat. Bigger worlds keep their heat longer: the Moon is dead, Mars is in between, Earth and Venus are still molten inside."
      ],
      selfCheck: [
        { q: "Why is \"liquid planets\" a better name than \"gas planets\" for Jupiter and Saturn?",
          a: "They are so large that their hydrogen is compressed into a liquid, and most of each planet is that compressed, liquefied hydrogen." },
        { q: "What is differentiation, and what does it tell us about the terrestrial planets' past?",
          a: "Differentiation is gravity separating a planet's interior into layers by density — metals sink to a core, light minerals float to a crust. Since the terrestrial planets have dense cores and light crusts, they must once have been hot enough to melt (more than about 1300 K)." },
        { q: "Mercury is about 500 K. Using the book's square-root rule, why is Pluto only about 50 K?",
          a: "Pluto is about 100 times farther from the Sun than Mercury. Temperature drops roughly with the square root of distance, and √100 = 10, so 500 K ÷ 10 = 50 K." },
        { q: "Why is Venus hotter than Mercury, even though it is farther from the Sun?",
          a: "Its thick carbon dioxide atmosphere acts as insulation (a greenhouse), trapping the heat built up at the surface." },
        { q: "Why is the Moon geologically dead while Earth is still active?",
          a: "Geological activity is driven by internal heat, and larger worlds hold their heat longer — like a big potato cooling more slowly than a small one. The small Moon cooled off long ago; Earth, much larger, is still molten inside." },
        { q: "Why are asteroids and comets called \"chemical fossils\"?",
          a: "Most were never melted and keep their original composition, so they preserve relatively unchanged material from when the solar system formed." }
      ]
    },
    {
      id: "7.3",
      title: "Dating Planetary Surfaces",
      minutes: 8,
      pages: "pp. 237–240",
      html:
        '<p>How do we know how old the surfaces of planets and moons are? For worlds with a solid surface, astronomers ' +
        'have ways to estimate how long ago that surface became solid. But the age of a <em>surface</em> isn&rsquo;t ' +
        'necessarily the age of the whole planet. On geologically active worlds (including Earth), floods of molten ' +
        'rock or the wearing-away by water and ice &mdash; which the book calls <strong>planet weathering</strong> &mdash; have erased the evidence of ' +
        'earlier times, leaving only a fairly young surface to study.</p>' +
        '<h4>Counting the craters</h4>' +
        '<p>One way to estimate a surface&rsquo;s age is to <strong>count its impact craters</strong>. This works ' +
        'because impacts have happened at a <strong>roughly constant rate</strong> for several billion years. So, if ' +
        'nothing erases them, the number of craters is simply proportional to how long the surface has been exposed. ' +
        'The method has been used on many solid planets and moons (Figure 7.15).</p>' +
        '<div data-figure="7.15"></div>' +
        '<p>But crater counts only tell the time since the surface last had a big change that could erase old ' +
        'craters. Imagine walking down a sidewalk after snow has been falling steadily for a day. In front of one house ' +
        'the snow is deep; next door the walk is nearly clear. You wouldn&rsquo;t decide less snow fell next door ' +
        '&mdash; you&rsquo;d decide that neighbor <strong>swept</strong> recently. In the same way, crater numbers ' +
        'show how long it&rsquo;s been since a surface was last &ldquo;swept clean&rdquo; by lava flows or by molten ' +
        'material thrown out by a large nearby impact.</p>' +
        '<p>Still, comparing crater numbers on different parts of the same world is a powerful clue to how it ' +
        'evolved: on a given planet or moon, <strong>the more heavily cratered terrain is generally older</strong>.</p>' +
        '<div data-diagram="crater-count"></div>' +
        '<h4>Radioactive rocks</h4>' +
        '<p>Another way is to measure the age of individual rocks. After the <strong>Apollo</strong> astronauts brought ' +
        'back Moon samples, the rock-dating methods developed on Earth were used to build a geological timeline for ' +
        'the Moon. A few pieces of the Moon, Mars, and the large asteroid Vesta have also fallen to Earth as meteorites ' +
        'that we can examine directly.</p>' +
        '<p>Rocks are dated using natural <span class="term">radioactivity</span>. Around the start of the twentieth ' +
        'century, physicists realized that some atomic nuclei are unstable and can split apart (<strong>decay</strong>) ' +
        'on their own into smaller nuclei, giving off particles such as electrons or radiation in the form of gamma ' +
        'rays.</p>' +
        '<p>For any one radioactive nucleus, you can&rsquo;t predict when it will decay &mdash; it&rsquo;s random, like ' +
        'rolling dice: no gambler can say just when a 7 or 11 will come up, but over many rolls the odds are ' +
        'predictable. Likewise, for a very large number of radioactive atoms of one type (say, uranium), there is a ' +
        'specific time, its <span class="term">half-life</span>, during which each nucleus has a fifty-fifty chance of ' +
        'decaying. A single nucleus may last longer or shorter than that, but in a large sample almost exactly ' +
        '<strong>half</strong> will have decayed after one half-life. After <strong>two</strong> half-lives, half of ' +
        'the rest has decayed too, leaving <strong>one quarter</strong> of the original (Figure 7.16).</p>' +
        '<div data-figure="7.16"></div>' +
        '<p>For example, start with 1 gram of pure radioactive nuclei with a half-life of 100 years. After 100 years ' +
        'you&rsquo;d have <sup>1</sup>&frasl;<sub>2</sub> gram; after 200 years, <sup>1</sup>&frasl;<sub>4</sub> gram; ' +
        'after 300 years, only <sup>1</sup>&frasl;<sub>8</sub> gram, and so on. The material doesn&rsquo;t vanish ' +
        '&mdash; the radioactive atoms are replaced by their decay products. The radioactive atoms are called ' +
        '<strong>parents</strong> and the decay products <strong>daughter</strong> elements.</p>' +
        '<p>So radioactive elements with known half-lives make accurate <strong>nuclear clocks</strong>. By comparing ' +
        'how much parent is left in a rock with how much daughter has built up, we learn how long the decay has been ' +
        'going on &mdash; and so how long ago the rock formed. The reactions used most often to date lunar and ' +
        'terrestrial rocks (the book&rsquo;s Table 7.3):</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Parent</th><th>Daughter</th><th>Half-life (billions of years)</th></tr>' +
        '<tr><td>Samarium-147</td><td>Neodymium-143</td><td>106</td></tr>' +
        '<tr><td>Rubidium-87</td><td>Strontium-87</td><td>48.8</td></tr>' +
        '<tr><td>Thorium-232</td><td>Lead-208</td><td>14.0</td></tr>' +
        '<tr><td>Uranium-238</td><td>Lead-206</td><td>4.47</td></tr>' +
        '<tr><td>Potassium-40</td><td>Argon-40</td><td>1.31</td></tr>' +
        '</tbody></table></div>' +
        '<p>(The number after each element is its atomic weight &mdash; protons plus neutrons in its nucleus &mdash; ' +
        'which tells which isotope it is. Isotopes of the same element differ in their number of neutrons.)</p>' +
        '<div data-diagram="half-life"></div>' +
        '<p>Bringing back lunar rocks for radioactive dating was one of the astronauts&rsquo; most important jobs. ' +
        'Before that, there was no reliable way to measure the age of the Moon&rsquo;s surface. Crater counts gave ' +
        '<strong>relative</strong> ages (the heavily cratered lunar highlands are older than the dark lava plains), but ' +
        'not ages in years. Some thought the Moon&rsquo;s surface might be as young as Earth&rsquo;s, which would mean ' +
        'active geology there. Only in <strong>1969</strong>, when the first Apollo samples were dated, did we learn ' +
        'that the Moon is an <strong>ancient, geologically dead world</strong>. These methods show that Earth and the ' +
        'Moon each formed about <strong>4.5 billion years ago</strong> (though Earth probably formed earlier than the ' +
        'Moon).</p>' +
        '<p>Radioactive decay also generally releases <strong>heat</strong>. One nucleus gives off very little, but the ' +
        'enormous numbers of them in a planet or moon (especially early on) can be a significant source of internal ' +
        'energy. Geologists estimate that about <strong>half of Earth&rsquo;s current internal heat</strong> comes from ' +
        'the decay of radioactive isotopes inside it.</p>',
      keyIdeas: [
        "The age of a surface is the time since it last solidified or was resurfaced — not necessarily the age of the whole world. Active worlds like Earth have young surfaces.",
        "Impacts have happened at a roughly constant rate for billions of years, so the number of craters is proportional to how long a surface has been exposed. On one world, more heavily cratered terrain is generally older.",
        "Crater counts only measure time since the surface was last \"swept clean\" (by lava, or melt from a big impact) — like snow on a sidewalk that a neighbor has swept clean.",
        "Radioactive nuclei decay randomly, but in a large sample half decay in one half-life, leaving 1/2, then 1/4, then 1/8 after successive half-lives. Parents are replaced by daughter elements.",
        "Comparing the parent left in a rock with the daughter built up gives the rock's age — e.g., uranium-238 → lead-206 (half-life 4.47 billion years), potassium-40 → argon-40 (1.31 billion years).",
        "Dating the Apollo samples in 1969 showed the Moon is ancient and geologically dead; Earth and the Moon each formed about 4.5 billion years ago.",
        "Radioactive decay releases heat — about half of Earth's current internal heat comes from it."
      ],
      selfCheck: [
        { q: "Why does counting craters give the age of a surface?",
          a: "Impacts have happened at a roughly constant rate for several billion years, so — if nothing erases them — the number of craters is proportional to how long the surface has been exposed." },
        { q: "What does the sidewalk-in-the-snow analogy teach about crater counts?",
          a: "Crater counts only tell how long since a surface was last \"swept clean.\" A clear sidewalk means someone swept it recently, not that less snow fell; a lightly cratered surface means lava or impact melt recently erased old craters." },
        { q: "You start with 1 gram of a radioactive element with a half-life of 100 years. How much is left after 300 years?",
          a: "300 years is three half-lives: 1 → 1/2 → 1/4 → 1/8 gram. The rest has become daughter products." },
        { q: "How do we use parent and daughter elements to find a rock's age?",
          a: "Knowing the half-life, we compare how much radioactive parent is left with how much daughter product has accumulated. That tells how long the decay has been going on, and so how long ago the rock formed." },
        { q: "What did the 1969 Apollo samples reveal about the Moon?",
          a: "Radioactive dating showed the Moon's surface is ancient and that it is a geologically dead world — not young like Earth's resurfaced crust. Earth and the Moon each formed about 4.5 billion years ago." }
      ]
    },
    {
      id: "7.4",
      title: "Origin of the Solar System",
      minutes: 7,
      pages: "pp. 241–243",
      html:
        '<p>Much of astronomy is driven by wanting to know where things came from: the universe, the Sun, Earth, and ' +
        'ourselves. Taken together, the members of the solar system preserve <strong>patterns</strong> that reveal how ' +
        'the whole system formed.</p>' +
        '<p>The recent discovery of thousands of planets around other stars shows that many ' +
        '<strong>exoplanetary systems</strong> are quite different from ours. Many include planets in between our ' +
        'terrestrial and giant planets in size, often called <strong>superearths</strong>. Some even have giant ' +
        'planets close to their star &mdash; the reverse of our order. (Those systems come in a later chapter; here we ' +
        'focus on our own.)</p>' +
        '<h4>Looking for patterns</h4>' +
        '<p>One approach is to look for regularities. All the planets lie in nearly the <strong>same plane</strong> ' +
        'and revolve in the <strong>same direction</strong> around the Sun, and the Sun spins in that same direction ' +
        'too. Astronomers read this as evidence that the Sun and planets formed <strong>together</strong> from a ' +
        'spinning cloud of gas and dust, the <span class="term">solar nebula</span> (Figure 7.17).</p>' +
        '<div data-figure="7.17"></div>' +
        '<p><strong>Composition</strong> is another clue. Spectroscopy tells us which elements are in the Sun and ' +
        'planets. The Sun has the same hydrogen-dominated makeup as Jupiter and Saturn, so it seems to have formed from ' +
        'the same reservoir of material. The terrestrial planets and our Moon, in comparison, are short on the light ' +
        'gases and the various ices made from the common elements oxygen, carbon, and nitrogen. Instead they are mostly ' +
        'the rarer heavy elements such as iron and silicon. So whatever built planets in the inner solar system must ' +
        'have left out much of the lighter material that is common elsewhere &mdash; the light stuff escaped, leaving a ' +
        'residue of heavy stuff.</p>' +
        '<p>Why? The inner part of the planet-forming disk was <strong>hotter</strong>. You might guess that was because ' +
        'it was nearer the Sun&rsquo;s rays &mdash; but those rays had trouble getting through the dense disk. The real ' +
        'reason: the inner disk was <strong>moving faster</strong> (remember Kepler&rsquo;s laws), so there was more ' +
        '<strong>friction</strong> among the particles, heating it to high temperatures. It was too warm there for water ' +
        'to condense as ice. The result: the inner planets were <strong>rocky</strong>, and the icy worlds had to form ' +
        'farther from the Sun.</p>' +
        '<h4>The evidence from far away</h4>' +
        '<p>A second approach is to look for other planetary systems being born. We can&rsquo;t look back in time at our ' +
        'own system&rsquo;s formation, but many stars are much younger than the Sun, and their planet building may still ' +
        'be visible. We do see many other &ldquo;solar nebulas,&rdquo; or <strong>circumstellar disks</strong> &mdash; ' +
        'flattened, spinning clouds of gas and dust around young stars &mdash; resembling the early stages of our own ' +
        'solar system billions of years ago (Figure 7.18).</p>' +
        '<div data-figure="7.18"></div>' +
        '<h4>Building planets</h4>' +
        '<p>Circumstellar disks are common around very young stars, suggesting that disks and stars form together. ' +
        'Theoretical calculations of how solids could form in these disks as they cool show material first clumping ' +
        'into smaller objects, the precursors of planets, called <span class="term">planetesimals</span>.</p>' +
        '<p>Today&rsquo;s fast computers can simulate how <strong>millions</strong> of planetesimals, probably ' +
        '<strong>no larger than 100 kilometers</strong> across, might gather together under their mutual gravity to ' +
        'form the planets. The process was <strong>violent</strong>: planetesimals crashed into each other and sometimes ' +
        'even broke up growing planets. Those impacts (plus heat from radioactive elements in them) heated all the ' +
        'planets until they were liquid and gas, so they <strong>differentiated</strong> &mdash; which helps explain ' +
        'their internal structures today.</p>' +
        '<div data-diagram="solar-nebula"></div>' +
        '<p>Impacts and collisions in the early solar system were complex and apparently often random. The solar nebula ' +
        'model explains many of the solar system&rsquo;s regularities, but random collisions of massive planetesimals ' +
        'could explain some <strong>exceptions</strong> to the &ldquo;rules.&rdquo; Why do Uranus and Pluto spin on ' +
        'their sides? Why does Venus spin slowly and backward? Why is the Moon like Earth in many ways but different in ' +
        'others? The answers probably lie in <strong>enormous collisions</strong> long before life on Earth began.</p>' +
        '<p>Today, some <strong>4.5 billion years</strong> after its origin, the solar system is &mdash; thank goodness ' +
        '&mdash; much less violent. But some planetesimals still interact and collide, and their fragments roam the ' +
        'solar system as &ldquo;transients&rdquo; that can make trouble for established members of the Sun&rsquo;s ' +
        'family, such as Earth.</p>',
      keyIdeas: [
        "Many exoplanet systems differ from ours — some have \"superearths\" between terrestrial and giant sizes, or giant planets close to their star.",
        "The planets orbit in nearly one plane and the same direction, and the Sun spins that way too — evidence that they all formed together from a spinning cloud of gas and dust, the solar nebula.",
        "The Sun, Jupiter, and Saturn share a hydrogen-dominated makeup; the terrestrial planets lack light gases and ices and are mostly heavy elements like iron and silicon.",
        "The inner disk was hotter because it moved faster, causing more friction — too warm for water ice to condense — so the inner planets are rocky and icy worlds formed farther out.",
        "Circumstellar disks around young stars today (like those in the Orion Nebula) look like our own early solar nebula.",
        "Material first clumped into planetesimals (probably no larger than 100 km), which collided violently to build planets; the heat of impacts and radioactivity melted the planets so they differentiated.",
        "Random giant collisions probably explain exceptions such as Uranus and Pluto on their sides, Venus's slow backward spin, and the Moon's differences from Earth."
      ],
      selfCheck: [
        { q: "What pattern in the planets' motions suggests they formed together with the Sun?",
          a: "All the planets orbit in nearly the same plane and in the same direction, and the Sun spins in that same direction — as expected if everything formed from one spinning cloud, the solar nebula." },
        { q: "Why are the inner planets rocky while icy worlds are found farther out?",
          a: "The inner part of the disk moved faster, so friction among particles heated it — it was too warm there for water to condense as ice. The light gases and ices were lost, leaving heavy elements like iron and silicon." },
        { q: "What are planetesimals?",
          a: "The smaller objects that formed first as material clumped together in the solar nebula — precursors of the planets, probably no larger than 100 km across." },
        { q: "How does observing other young stars help us understand our own origins?",
          a: "Many young stars have circumstellar disks — flattened, spinning clouds of gas and dust — that look like our solar system's early stages, so we can watch planet formation that may be happening today." },
        { q: "What might explain exceptions like Venus's backward spin and Uranus on its side?",
          a: "Enormous, random collisions between massive planetesimals and growing planets in the early, violent solar system." }
      ]
    }
  ];

  /* ------------------------------------------------------------------ GLOSSARY */
  CH.glossary = [
    { term: "Terrestrial planet", section: "7.1", def: "Any of the planets Mercury, Venus, Earth, or Mars; sometimes the Moon is included in the list." },
    { term: "Giant planet", section: "7.1", def: "Any of the planets Jupiter, Saturn, Uranus, and Neptune in our solar system, or planets of roughly that mass and composition in other planetary systems." },
    { term: "Asteroid", section: "7.1", def: "A stony or metallic object orbiting the Sun that is smaller than a planet but that shows no evidence of an atmosphere or of other types of activity associated with comets." },
    { term: "Comet", section: "7.1", def: "A small body of icy and dusty matter that revolves about the Sun; when a comet comes near the Sun, some of its material vaporizes, forming a large head of tenuous gas and often a tail." },
    { term: "Meteor", section: "7.1", def: "A small piece of solid matter that enters Earth's atmosphere and burns up, popularly called a shooting star because it is seen as a small flash of light." },
    { term: "Meteorite", section: "7.1", def: "A portion of a meteor that survives passage through an atmosphere and strikes the ground." },
    { term: "Differentiation", section: "7.2", def: "Gravitational separation of materials of different density into layers in the interior of a planet or moon." },
    { term: "Radioactivity", section: "7.3", def: "Process by which certain kinds of atomic nuclei decay naturally, with the spontaneous emission of subatomic particles and gamma rays." },
    { term: "Half-life", section: "7.3", def: "Time required for half of the radioactive atoms in a sample to disintegrate." },
    { term: "Solar nebula", section: "7.4", def: "The cloud of gas and dust from which the solar system formed." },
    { term: "Planetesimals", section: "7.4", def: "Objects, from tens to hundreds of kilometers in diameter, that formed in the solar nebula as an intermediate step between tiny grains and the larger planetary objects we see today; the comets and some asteroids may be leftover planetesimals." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "7.1", q: "About what percentage of the solar system's total mass is in the Sun?",
      choices: ["99.80%", "50%", "90%", "0.10%"],
      answer: 0,
      whyWrong: [null, "The Sun is far more dominant than that — everything else together is only about 0.2%.", "Still too low: the book's Table 7.1 gives 99.80%.", "0.10% is Jupiter's share, not the Sun's."],
      explain: "Table 7.1: the Sun has 99.80% of the mass; Jupiter has 0.10%, more than all the other planets combined." },
    { section: "7.1", q: "Which of these is a terrestrial planet?",
      choices: ["Mars", "Saturn", "Neptune", "Uranus"],
      answer: 0,
      whyWrong: [null, "Saturn is one of the four giant (jovian) planets.", "Neptune is a giant planet made mostly of ices, liquids, and gases.", "Uranus is a giant planet."],
      explain: "The terrestrial planets are Mercury, Venus, Earth, and Mars — small worlds of rock and metal with solid surfaces." },
    { section: "7.1", q: "Which planet rotates backward (retrograde) and very slowly?",
      choices: ["Venus", "Uranus", "Jupiter", "Mercury"],
      answer: 0,
      whyWrong: [null, "Uranus's oddity is a different one: it spins on an axis tipped nearly on its side.", "Jupiter rotates in the usual direction.", "Mercury rotates in the same direction it revolves."],
      explain: "Venus rotates backward very slowly; Uranus and Pluto spin on axes tipped nearly on their sides." },
    { section: "7.1", q: "Which planets have no moons?",
      choices: ["Mercury and Venus", "Mars and Venus", "Mercury and Mars", "Uranus and Neptune"],
      answer: 0,
      whyWrong: [null, "Mars has moons — very likely captured asteroids.", "Mars has moons; only Mercury and Venus travel alone.", "Both giants have moons — Neptune's largest is Triton."],
      explain: "Most planets have moons; only Mercury and Venus move through space alone. Some 430 moons are known." },
    { section: "7.1", q: "What is the difference between a meteor and a meteorite?",
      choices: ["A meteor is the flash of light from a particle burning up; a meteorite is a piece that reaches the ground", "A meteor is made of ice; a meteorite is made of rock", "A meteor orbits between Mars and Jupiter; a meteorite orbits beyond Neptune", "They are two names for the same thing"],
      answer: 0,
      whyWrong: [null, "Ice vs. rock is the difference between comets and asteroids.", "That describes where asteroids and TNOs are found.", "They differ: one burns up in the air, the other survives to strike the ground."],
      explain: "A meteor (shooting star) is the brief flash as cosmic dust burns up in our atmosphere; any piece that strikes the ground is a meteorite." },
    { section: "7.1", q: "Comets are made mostly of what?",
      choices: ["Ice — frozen water, carbon dioxide, and carbon monoxide", "Rock and metal", "Liquid hydrogen", "Pure iron"],
      answer: 0,
      whyWrong: [null, "Rock and metal describe asteroids.", "Compressed liquid hydrogen fills Jupiter and Saturn.", "Iron is a major part of terrestrial-planet cores, not comets."],
      explain: "Comets are mostly ice made of frozen gases; they formed and still orbit in the distant, cold outer solar system." },
    { section: "7.1", q: "Saturn's moon Mimas has a density of about 1.2 × 10³ kg/m³. What does that suggest?",
      choices: ["It is made mainly of ice, not rock", "It is made mainly of iron", "It is a gas ball", "It is denser than Earth"],
      answer: 0,
      whyWrong: [null, "Iron-rich bodies are far denser — Mercury, with the most metal, is 5.4 g/cm³ (5400 kg/m³).", "Mimas is a solid moon; the density is close to water's, which points to ice.", "Earth's density is 5.5 × 10³ kg/m³, four to five times Mimas's."],
      explain: "Water is 1000 kg/m³, so a density of 1.2 × 10³ kg/m³ means Mimas is mostly ice." },
    { section: "7.1", q: "In the book's 1-billion-to-1 scale model, Earth is a grape. How far is it from the 1.5-m Sun?",
      choices: ["About one city block (150 m)", "About 40 cm", "Five city blocks", "Tens of thousands of kilometers"],
      answer: 0,
      whyWrong: [null, "40 cm is how far the pea-sized Moon is from the Earth-grape.", "Five blocks is where the grapefruit-sized Jupiter is.", "That's how far away the nearest stars would be in this model."],
      explain: "Divided by 10⁹, Earth is 1.3 cm across and 150 m — about one city block — from the Sun." },
    { section: "7.2", q: "Why are Jupiter and Saturn better called \"liquid planets\" than \"gas planets\"?",
      choices: ["Their hydrogen is compressed until it becomes a liquid", "They are covered in oceans of water", "They are made mostly of molten rock", "They rain liquid helium constantly"],
      answer: 0,
      whyWrong: [null, "The liquid is hydrogen, not a surface ocean of water.", "Their bulk is hydrogen and helium; rock is only in their cores.", "The book's reason is the compressed hydrogen that makes up most of each planet."],
      explain: "They are so large that the gas is compressed in the interior until the hydrogen becomes a liquid." },
    { section: "7.2", q: "What is differentiation?",
      choices: ["Gravity separating a melted world into layers — heavy metals in the core, light minerals in the crust", "Counting craters to tell old surfaces from young ones", "The splitting of a radioactive nucleus", "The difference between terrestrial and giant planets"],
      answer: 0,
      whyWrong: [null, "That's crater counting, a way of dating surfaces.", "That's radioactive decay.", "That's a comparison, not a process inside a planet."],
      explain: "Differentiation is gravitational separation by density; a rocky world must be heated above about 1300 K for it to happen." },
    { section: "7.2", q: "Which terrestrial world has the greatest proportion of metal, judging by its density?",
      choices: ["Mercury", "The Moon", "Mars", "Venus"],
      answer: 0,
      whyWrong: [null, "The Moon has the lowest proportion of metal.", "Mars's density (3.9 g/cm³) is lower than Mercury's.", "Venus, like Earth and Mars, is about one third iron compounds and two thirds silicates."],
      explain: "From the densities in Table 7.2, Mercury has the greatest proportion of (denser) metals and the Moon the lowest." },
    { section: "7.2", q: "Mercury's surface is about 500 K. Pluto is about 100 times farther from the Sun. About how hot is Pluto?",
      choices: ["50 K", "5 K", "0.05 K", "250 K"],
      answer: 0,
      whyWrong: [null, "Dividing by 100 would follow distance itself; temperature follows the square root of distance.", "That would be dividing by distance squared — that's how sunlight's strength drops, not temperature.", "That's only half — the factor is √100 = 10."],
      explain: "Temperature falls roughly with the square root of distance: √100 = 10, so 500 K ÷ 10 = 50 K." },
    { section: "7.2", q: "Why is Venus's surface hotter than Mercury's?",
      choices: ["Its thick carbon dioxide atmosphere traps heat", "It is closer to the Sun", "It has more volcanoes than any planet", "It rotates backward"],
      answer: 0,
      whyWrong: [null, "Venus (0.72 AU) is farther from the Sun than Mercury (0.39 AU).", "The book credits the atmosphere's insulation, not volcanoes.", "Its slow backward spin isn't the reason given — the greenhouse atmosphere is."],
      explain: "Venus's thick CO₂ atmosphere acts as insulation, reducing the escape of heat, so its surface (700 K) is hotter than Mercury's." },
    { section: "7.2", q: "Why is the Moon geologically dead while Earth is still active?",
      choices: ["Smaller worlds lose their internal heat faster", "The Moon has no craters", "The Moon is made of ice", "Earth is closer to the Sun"],
      answer: 0,
      whyWrong: [null, "The Moon is heavily cratered — a sign of an old, inactive surface.", "The Moon is rocky, like the terrestrial planets.", "Earth and the Moon are essentially the same distance from the Sun; size is what matters."],
      explain: "Geological activity is driven by internal heat, and the larger a world is, the longer it keeps that heat — like a big potato cooling slowly." },
    { section: "7.2", q: "According to the book, what may keep the hidden oceans of some \"water world\" moons from freezing?",
      choices: ["Heating by tides raised by neighboring worlds", "Sunlight shining through the ice", "A thick greenhouse atmosphere", "Heat from the giant planet's rings"],
      answer: 0,
      whyWrong: [null, "The farther from the Sun, the colder the surface — the book points to heat from inside, raised by tides.", "The book's explanation for these oceans is tidal heating from inside, not an atmosphere.", "Rings don't heat moons; tides from gravitational interactions do."],
      explain: "Tides from gravitational interaction with neighboring worlds can heat a moon's interior and even melt an ice layer — on Io they power volcanoes." },
    { section: "7.3", q: "On a single world, which region is probably oldest?",
      choices: ["The most heavily cratered region", "The smoothest region", "The region with the most active volcanoes", "The region with the youngest lava"],
      answer: 0,
      whyWrong: [null, "A smooth surface was most likely swept clean recently.", "Active volcanoes resurface the ground and erase old craters.", "Fresh lava means the surface was recently renewed."],
      explain: "Impacts happen at a roughly constant rate, so more craters means more time since the surface was last swept clean." },
    { section: "7.3", q: "After three half-lives, what fraction of a radioactive sample is left?",
      choices: ["1/8", "1/3", "1/6", "1/4"],
      answer: 0,
      whyWrong: [null, "Decay halves the sample each half-life; it doesn't remove equal thirds.", "Each half-life halves what remains: 1/2 × 1/2 × 1/2.", "1/4 is what's left after two half-lives."],
      explain: "1 → 1/2 → 1/4 → 1/8. The decayed atoms aren't gone; they've become daughter elements." },
    { section: "7.3", q: "Uranium-238 decays to which daughter element?",
      choices: ["Lead-206", "Argon-40", "Strontium-87", "Neodymium-143"],
      answer: 0,
      whyWrong: [null, "Argon-40 is the daughter of potassium-40.", "Strontium-87 is the daughter of rubidium-87.", "Neodymium-143 is the daughter of samarium-147."],
      explain: "Table 7.3: uranium-238 → lead-206, with a half-life of 4.47 billion years." },
    { section: "7.3", q: "What did dating the first Apollo samples in 1969 show?",
      choices: ["The Moon is an ancient, geologically dead world", "The Moon's surface is as young as Earth's", "The Moon formed long before Earth", "The Moon is still volcanically active"],
      answer: 0,
      whyWrong: [null, "Some had thought so, but the samples proved the surface is ancient.", "The book says Earth probably formed earlier than the Moon.", "The samples showed the Moon is geologically dead."],
      explain: "Before Apollo, crater counts gave only relative ages; the 1969 samples showed the Moon is ancient, and Earth and the Moon each formed about 4.5 billion years ago." },
    { section: "7.3", q: "About how much of Earth's current internal heat comes from radioactive decay?",
      choices: ["About half", "Almost none", "All of it", "About 1%"],
      answer: 0,
      whyWrong: [null, "Radioactive decay releases heat, and there are enormous numbers of radioactive nuclei inside Earth.", "Geologists estimate about half, not all.", "It's much more than that — about half."],
      explain: "Geologists estimate that about half of Earth's current internal heat budget comes from the decay of radioactive isotopes." },
    { section: "7.4", q: "What evidence suggests the Sun and planets formed together from one spinning cloud?",
      choices: ["The planets orbit in nearly one plane and the same direction, and the Sun spins that way too", "All planets have the same density", "All planets have rings", "All planets have the same number of moons"],
      answer: 0,
      whyWrong: [null, "Densities range from 0.7 (Saturn) to 5.5 g/cm³ (Earth).", "Only the four giant planets have rings.", "Moon counts vary widely — Mercury and Venus have none."],
      explain: "The shared plane and direction of motion point to a spinning cloud of gas and dust — the solar nebula." },
    { section: "7.4", q: "Why was the inner part of the planet-forming disk hotter?",
      choices: ["It moved faster, so there was more friction among the particles", "The Sun's rays easily heated it", "It was full of radioactive ice", "It was farther from the Sun"],
      answer: 0,
      whyWrong: [null, "The book says the Sun's rays had trouble penetrating the dense disk.", "The inner disk was too warm for ice at all.", "The inner disk was closer to the Sun, not farther."],
      explain: "Faster motion in the inner disk (Kepler's laws) meant more friction and higher temperatures — too warm for water ice to condense." },
    { section: "7.4", q: "What are planetesimals?",
      choices: ["Early building blocks of planets, probably no larger than 100 km across", "Moons captured from the asteroid belt", "The disks around young stars", "Planets bigger than Earth but smaller than Neptune"],
      answer: 0,
      whyWrong: [null, "Captured asteroids describe some small moons, like those of Mars.", "Those are circumstellar disks, where planetesimals may form.", "Those in-between planets are called superearths."],
      explain: "Material in the solar nebula first coalesced into planetesimals, which then gathered under mutual gravity to form planets." },
    { section: "7.4", q: "What probably explains exceptions like Uranus on its side and Venus spinning backward?",
      choices: ["Enormous random collisions early in the solar system's history", "The greenhouse effect", "Radioactive decay", "Tides from the Sun today"],
      answer: 0,
      whyWrong: [null, "The greenhouse effect explains Venus's heat, not its spin.", "Radioactive decay heats interiors; it doesn't tip planets over.", "The book points to ancient collisions, not present-day tides."],
      explain: "The random collisions of massive planetesimals could be the reason for the exceptions to the solar system's \"rules.\"" }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[7] = CH;
})();
