/* =============================================================================
   Astronomy 2e — Chapter 6: Astronomical Instruments
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 6), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[6].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 6,
    chapterTitle: "Astronomical Instruments",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/6-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 179–213"
  };

  CH.tools = ["telescopes", "telescopestoday", "detectors", "radiotelescopes", "spaceobs", "futurescopes"];

  /* ---------------------------------- ONE STUDY TOOL PER TOPIC: match data */
  CH.telescopesmatch = [
    { a: "Telescope", b: "the light “bucket” — collects radiation and brings it to a focus" },
    { a: "Aperture", b: "the diameter of the main lens or mirror; it sets how much light is collected" },
    { a: "Focus", b: "the point where the light rays gathered by a lens or mirror meet" },
    { a: "Focal length", b: "the distance from the lens to where parallel rays come to a focus" },
    { a: "Eyepiece", b: "a small magnifying lens used to view the image the telescope makes" },
    { a: "Refracting telescope", b: "uses a lens as its main light collector — like Galileo's spyglass" },
    { a: "Reflecting telescope", b: "uses a concave mirror as its main light collector — first built by Newton in 1668" },
    { a: "Chromatic aberration", b: "blur from each color focusing at a slightly different spot after passing through glass" }
  ];
  CH.telescopestodaymatch = [
    { a: "Palomar (1948)", b: "5-meter (200-inch) mirror — the world's largest for several decades" },
    { a: "Keck telescopes", b: "10-meter mirrors, each made of 36 hexagonal segments" },
    { a: "Active control", b: "computers measure a mirror's sag and push on its back to correct it" },
    { a: "Light pollution", b: "city glare scattered by the air, hiding the faintest stars" },
    { a: "Seeing", b: "unsteadiness of the atmosphere that blurs images — “bad seeing” means lots of blur" },
    { a: "Resolution", b: "the smallest detail an image can show, measured in arcseconds" },
    { a: "Adaptive optics", b: "a flexible mirror reshaped up to 500 times a second to undo atmospheric blurring" },
    { a: "George Ellery Hale", b: "four times started the building of what became the world's largest telescope" }
  ];
  CH.detectorsmatch = [
    { a: "Detector", b: "a device that senses radiation and makes a permanent record of it" },
    { a: "Photographic plate", b: "a glass plate with a light-sensitive coating — uses only about 1% of the light" },
    { a: "CCD", b: "an electronic detector, like a digital camera's, recording 60–70% (or even over 90%) of photons" },
    { a: "Pixel", b: "“picture element” — one spot where a CCD counts the photons" },
    { a: "Long exposure", b: "collecting light for a long time — sometimes hours — to catch very faint objects" },
    { a: "Filter", b: "passes only a chosen range of wavelengths, like red plastic passing only red light" },
    { a: "Spectrometer", b: "spreads light into its spectrum using a prism or a grating" },
    { a: "Infrared detector", b: "kept near absolute zero (1–3 K), often in liquid helium, so its own heat doesn't swamp the signal" }
  ];
  CH.radiotelescopesmatch = [
    { a: "Karl Jansky (early 1930s)", b: "discovered the first cosmic radio waves — coming from the Milky Way" },
    { a: "Grote Reber (1936)", b: "amateur who built the first antenna designed for cosmic radio waves" },
    { a: "Radio dish", b: "a concave metal reflector that focuses radio waves onto a receiver" },
    { a: "Interferometer", b: "two or more telescopes linked together; resolution set by their separation" },
    { a: "Very Large Array (VLA)", b: "27 dishes, 25 m each, spread over about 36 km in New Mexico" },
    { a: "ALMA", b: "66 dishes in Chile's Atacama Desert — resolution down to 0.006 arcsecond" },
    { a: "VLBA", b: "10 dishes from the Virgin Islands to Hawaii — resolution of 0.0001 arcsecond" },
    { a: "Radar", b: "sending radio waves to an object and timing the echo to find its distance" }
  ];
  CH.spaceobsmatch = [
    { a: "SOFIA", b: "a 2.5-meter infrared telescope flown in a Boeing 747SP (2010–2022)" },
    { a: "IRAS (1983)", b: "the first orbiting infrared observatory — cataloged about 350,000 infrared sources" },
    { a: "Spitzer", b: "0.85-meter infrared space telescope, 2003–2020" },
    { a: "Hubble Space Telescope", b: "2.4-meter mirror, launched April 1990 — its flawed mirror was fixed in 1993" },
    { a: "James Webb Space Telescope", b: "6.5-meter, 18-segment infrared mirror, 1.5 million km from Earth" },
    { a: "Chandra", b: "X-ray observatory launched in July 1999" },
    { a: "Fermi", b: "gamma-ray space telescope launched in 2008" },
    { a: "VERITAS / H.E.S.S.", b: "ground arrays that catch gamma rays by using the atmosphere as the detector" }
  ];
  CH.futurescopesmatch = [
    { a: "European ELT", b: "39.3-meter mirror of 798 hexagonal segments, being built in Chile" },
    { a: "Thirty-Meter Telescope (TMT)", b: "30-meter mirror of 492 hexagons; preferred site Maunakea" },
    { a: "Giant Magellan Telescope (GMT)", b: "seven 8.4-meter mirrors working as one" },
    { a: "Vera Rubin Observatory", b: "8.4-meter telescope with the largest digital camera ever built — maps the southern sky every 3 nights" },
    { a: "Nancy Grace Roman Space Telescope", b: "planned infrared telescope: smaller mirror, wider view than Webb" },
    { a: "Cherenkov Telescope Array (CTA)", b: "two ground arrays to measure gamma rays 1000 times more energetic than Fermi can" },
    { a: "Transients", b: "things in the sky that change quickly, like exploding stars" }
  ];

  /* ------------------------------------------------------------------ FIGURES
     Images from OpenStax Astronomy 2e (CC BY 4.0), placed in the matching
     sections via <div data-figure="N.N"></div>. Captions are the book's own,
     with credit lines intact. Files in img/ (downscaled for web). */
  CH.figures = {
    "6.1": {
      file: "fig-6-1.jpg",
      title: "James Webb Space Telescope (JWST)",
      alt: "An illustration of the James Webb Space Telescope: a gold honeycomb of hexagonal mirror segments standing above a wide, layered, silvery sunshield.",
      caption: "James Webb Space Telescope (JWST). The James Webb Space Telescope, launched December 25, 2021, is the largest space telescope humanity has deployed so far. Its 18 gold-coated beryllium segments make up a mirror for reflecting infrared light that is 6.5 meters in diameter. Below it on our illustration you see the tennis-court-sized sunscreen that protects it from the heat of our star. The first Webb science images were released in July 2022. (credit: modification of work “Artist’s Impression of the NASA/ESA/CSA James Webb Space Telescope” by ESA/ATG medialab)"
    },
    "6.2": {
      file: "fig-6-2.jpg",
      title: "Orion Region at Different Wavelengths",
      alt: "Three views of the same patch of sky around Orion: a dark visible-light starfield with the hunter's outline drawn in; a speckled field of colored X-ray points; and a glowing orange-red infrared cloud of dust.",
      caption: "Orion Region at Different Wavelengths. The same part of the sky looks different when observed with instruments that are sensitive to different bands of the spectrum. (a) Visible light: this shows part of the Orion region as the human eye sees it, with dotted lines added to show the figure of the mythical hunter, Orion. (b) X-rays: here, the view emphasizes the point-like X-ray sources nearby. The colors are artificial, changing from yellow to white to blue with increasing energy of the X-rays. The bright, hot stars in Orion are still seen in this image, but so are many other objects located at very different distances, including other stars, star corpses, and galaxies at the edge of the observable universe. (c) Infrared radiation: here, we mainly see the glowing dust in this region. (credit a: modification of work by Howard McCallon/NASA/IRAS; credit b: modification of work by Howard McCallon/NASA/IRAS; credit c: modification of work by Michael F. Corcoran)"
    },
    "6.3": {
      file: "fig-6-3.jpg",
      title: "Two Pre-Telescopic Observatories",
      alt: "Two photos: the stone terraces and buildings of Machu Picchu on a green mountain ridge, and the standing stones of Stonehenge on a grassy plain.",
      caption: "Two Pre-Telescopic Observatories. (a) Machu Picchu is a fifteenth century Incan site located in Peru. (b) Stonehenge, a prehistoric site (3000–2000 BCE), is located in England. (credit a: modification of work by Allard Schmidt)"
    },
    "6.4": {
      file: "fig-6-4.jpg",
      title: "Formation of an Image by a Simple Lens",
      alt: "A diagram of a convex lens with parallel light rays entering from the left and converging to a single point labeled Focus; the distance from lens to focus is labeled Focal length.",
      caption: "Formation of an Image by a Simple Lens. Parallel rays from a distant source are bent by the convex lens so that they all come together in a single place (the focus) to form an image."
    },
    "6.5": {
      file: "fig-6-5.jpg",
      title: "Refracting and Reflecting Telescopes",
      alt: "Two telescope tube diagrams: a refractor with starlight entering a lens at the top and focusing near an eyepiece at the bottom; and a reflector with starlight going down to a mirror at the bottom, bouncing back up to a small mirror that sends it out the side to the eye.",
      caption: "Refracting and Reflecting Telescopes. Light enters a refracting telescope through a lens at the upper end, which focuses the light near the bottom of the telescope. An eyepiece then magnifies the image so that it can be viewed by the eye, or a detector like a photographic plate can be placed at the focus. The upper end of a reflecting telescope is open, and the light passes through to the mirror located at the bottom of the telescope. The mirror then focuses the light at the top end, where it can be detected. Alternatively, as in this sketch, a second mirror may reflect the light to a position outside the telescope structure, where an observer can have easier access to it. Professional astronomers’ telescopes are more complicated than this, but they follow the same principles of reflection and refraction."
    },
    "6.6": {
      file: "fig-6-6.jpg",
      title: "Focus Arrangements for Reflecting Telescopes",
      alt: "Three reflecting-telescope tubes showing light paths: prime focus, with light focusing inside the top of the tube; Newtonian focus, with a small mirror sending light out the side; and Cassegrain focus, with a small mirror sending light back down through a hole in the main mirror.",
      caption: "Focus Arrangements for Reflecting Telescopes. Reflecting telescopes have different options for where the light is brought to a focus. With prime focus, light is detected where it comes to a focus after reflecting from the primary mirror. With Newtonian focus, light is reflected by a small secondary mirror off to one side, where it can be detected (see also Figure 6.5). Most large professional telescopes have a Cassegrain focus in which light is reflected by the secondary mirror down through a hole in the primary mirror to an observing station below the telescope."
    },
    "6.7": {
      file: "fig-6-7.jpg",
      title: "Large Telescope Mirror",
      alt: "A huge, freshly coated round telescope mirror lying face-up in a steel cradle inside a workshop, with two workers standing beside it for scale.",
      caption: "Large Telescope Mirror. This image shows one of the primary mirrors of the European Southern Observatory’s Very Large Telescope, named Yepun, just after it was recoated with aluminum. The mirror is a little over 8 meters in diameter. (credit: ESO/G. Huedepohl)"
    },
    "6.8": {
      file: "fig-6-8.jpg",
      title: "Modern Reflecting Telescopes",
      alt: "Two photos inside observatory domes: the massive, heavy steel tube and mounting of the Palomar telescope; and the much lighter, open-framework Gemini North telescope.",
      caption: "Modern Reflecting Telescopes. (a) The Palomar 5-meter reflector: The Hale telescope on Palomar Mountain has a complex mounting structure that enables the telescope (in the open “tube” pointing upward in this photo) to swing easily into any position. (b) The Gemini North 8-meter telescope: The Gemini North mirror has a larger area than the Palomar mirror, but note how much less massive the whole instrument seems. (credit a: modification of work by Caltech/Palomar Observatory; credit b: modification of work by Gemini Observatory/AURA)"
    },
    "6.9": {
      file: "fig-6-9.jpg",
      title: "Thirty-Six Eyes Are Better Than One",
      alt: "Looking down into the Keck telescope: a large mirror made of many hexagonal segments fitted together like a honeycomb, reflecting the telescope's structure above it.",
      caption: "Thirty-Six Eyes Are Better Than One. The mirror of the 10-meter Keck telescope is composed of 36 hexagonal sections. (credit: NASA)"
    },
    "6.10": {
      file: "fig-6-10.jpg",
      title: "George Ellery Hale (1868–1938)",
      alt: "A black-and-white portrait of a man with round glasses and a mustache, wearing a dark suit and tie.",
      caption: "George Ellery Hale (1868–1938). Hale’s work led to the construction of several major telescopes, including the 40-inch refracting telescope at Yerkes Observatory, and three reflecting telescopes: the 60-inch Hale and 100-inch Hooker telescopes at Mount Wilson Observatory, and the 200-inch Hale Telescope at Palomar Observatory."
    },
    "6.11": {
      file: "fig-6-11.jpg",
      title: "World’s Largest Refractor",
      alt: "A very long white telescope tube on a tall blue pier, pointing up toward the slit of a large observatory dome.",
      caption: "World’s Largest Refractor. The Yerkes 40-inch (1-meter) telescope."
    },
    "6.12": {
      file: "fig-6-12.jpg",
      title: "High and Dry Site",
      alt: "An aerial photo of a flattened, barren desert mountaintop with four large white telescope buildings on it, with more bare brown mountains all around.",
      caption: "High and Dry Site. Cerro Paranal, a mountain summit 2.7 kilometers above sea level in Chile’s Atacama Desert, is the site of the European Southern Observatory’s Very Large Telescope. This photograph shows the four 8-meter telescope buildings on the site and vividly illustrates that astronomers prefer high, dry sites for their instruments. The 4.1-meter Visible and Infrared Survey Telescope for Astronomy (VISTA) can be seen in the distance on the next mountain peak. (credit: ESO)"
    },
    "6.13": {
      file: "fig-6-13.jpg",
      title: "Power of Adaptive Optics",
      alt: "A sharp, detailed infrared image of Jupiter against black space, showing its colored cloud bands.",
      caption: "Power of Adaptive Optics. One of the clearest pictures of Jupiter ever taken from the ground, this image was produced with adaptive optics using an 8-meter-diameter telescope at the Very Large Telescope in Chile. Adaptive optics uses infrared wavelengths to remove atmospheric blurring, resulting in a much clearer image. (credit: modification of work by ESO, F.Marchis, M.Wong (UC Berkeley); E.Marchetti, P.Amico, S.Tordo (ESO))"
    },
    "6.14": {
      file: "fig-6-14.jpg",
      title: "Charge-Coupled Devices (CCDs)",
      alt: "Two photos: a hand holding a thin, shiny silicon wafer with a rainbow sheen; and a technician in a clean-room suit working on a grid of many dark rectangular detector chips.",
      caption: "Charge-Coupled Devices (CCDs). (a) This CCD is a mere 300-micrometers thick (thinner than a human hair) yet holds more than 21 million pixels. (b) This matrix of 42 CCDs served the Kepler telescope. (credit a: modification of work by US Department of Energy; credit b: modification of work by NASA and Ball Aerospace)"
    },
    "6.15": {
      file: "fig-6-15.jpg",
      title: "Infrared Eyes",
      alt: "Side-by-side photos of a man with his arm inside a black plastic bag: in visible light the bag hides his arm, but in the infrared image his hand and arm glow clearly through the bag.",
      caption: "Infrared Eyes. Infrared waves can penetrate places in the universe from which light is blocked, as shown in this infrared image where the plastic bag blocks visible light but not infrared. (credit: NASA/JPL-Caltech/R. Hurt (SSC))"
    },
    "6.16": {
      file: "fig-6-16.jpg",
      title: "Prism Spectrometer",
      alt: "A diagram: light from the telescope focuses on a slit, a collimating lens straightens it into a parallel beam, a prism spreads it into colors, and a camera lens focuses separate red, green, and violet images of the slit onto a photographic plate or CCD.",
      caption: "Prism Spectrometer. The light from the telescope is focused on a slit. A prism (or grating) disperses the light into a spectrum, which is then photographed or recorded electronically."
    },
    "6.17": {
      file: "fig-6-17.jpg",
      title: "First Radio Telescope",
      alt: "A black-and-white photo of a long, boxy framework antenna of wood and metal mounted on wheels in a grassy field, with a man standing beside it.",
      caption: "First Radio Telescope. This rotating radio antenna was used by Jansky in his serendipitous discovery of radio radiation from the Milky Way."
    },
    "6.18": {
      file: "fig-6-18.jpg",
      title: "Radio Image",
      alt: "A false-color radio image: two large lobes glowing yellow and red on either side, connected by a thin jet to a tiny central point, on a blue background.",
      caption: "Radio Image. This image has been constructed of radio observations at the Very Large Array of a galaxy called Cygnus A. Colors have been added to help the eye sort out regions of different radio intensities. Red regions are the most intense, blue the least. The visible galaxy would be a small dot in the center of the image. The radio image reveals jets of expelled material (more than 160,000 light-years long) on either side of the galaxy. (credit: NRAO/AUI)"
    },
    "6.19": {
      file: "fig-6-19.jpg",
      title: "Robert C. Byrd Green Bank Telescope",
      alt: "A huge white radio dish on a tall latticework support standing in a valley of autumn-colored forested hills.",
      caption: "Robert C. Byrd Green Bank Telescope. This fully steerable radio telescope in West Virginia went into operation in August 2000. Its dish is about 100 meters across. (credit: modification of work by “b3nscott”/Flickr)"
    },
    "6.20": {
      file: "fig-6-20.jpg",
      title: "Atacama Large Millimeter/Submillimeter Array (ALMA)",
      alt: "A night panorama of many white radio dishes spread across a high desert plateau, with the Milky Way and a bright glow in the sky above.",
      caption: "Atacama Large Millimeter/Submillimeter Array (ALMA). Located in the Atacama Desert of Northern Chile, ALMA currently provides the highest resolution for radio observations. (credit: ESO/S. Guisard)"
    },
    "6.21": {
      file: "fig-6-21.jpg",
      title: "Very Long Baseline Array",
      alt: "A view of Earth from space centered on North America, with small dish icons marking the antenna sites spread across the United States and its territories.",
      caption: "Very Long Baseline Array. This map shows the distribution of 10 antennas that constitute an array of radio telescopes stretching across the United States and its territories."
    },
    "6.22": {
      file: "fig-6-22.jpg",
      title: "Largest Radio and Radar Dish",
      alt: "An aerial photo of the Arecibo radio telescope: an enormous dish built into a round bowl among green hills, with a receiver platform hung on cables from three towers high above it.",
      caption: "Largest Radio and Radar Dish. The Arecibo Observatory in Puerto Rico was the largest and most powerful astronomical radar facility in the world and was often featured in films. In November 2020 it collapsed, damaging the 300-meter diameter “dish” and destroying the radar transmitter and receiver. (credit: National Astronomy and Ionosphere Center, Cornell U., NSF)"
    },
    "6.23": {
      file: "fig-6-23.jpg",
      title: "Stratospheric Observatory for Infrared Astronomy (SOFIA)",
      alt: "A close-up of the side of a white Boeing 747 in flight with a large door open near its tail, revealing a telescope inside.",
      caption: "Stratospheric Observatory for Infrared Astronomy (SOFIA). SOFIA allowed observations to be made above most of Earth’s atmospheric water vapor. (credit: NASA)"
    },
    "6.24": {
      file: "fig-6-24.jpg",
      title: "Hubble Ultra-Deep Field (HUDF)",
      alt: "A black field of view packed with thousands of tiny galaxies of many shapes and colors — spirals, ellipticals, and faint red smudges.",
      caption: "Hubble Ultra-Deep Field (HUDF). The Hubble Space Telescope has provided an image of a specific region of space built from data collected between September 24, 2003, and January 16, 2004. These data allow us to search for galaxies that existed approximately 13 billion years ago. (credit: modification of work by NASA)"
    },
    "6.25": {
      file: "fig-6-25.jpg",
      title: "First Images from the James Webb Space Telescope",
      alt: "Two infrared images: the Southern Ring Nebula, an orange-red oval shell surrounded by blue wisps; and Stephan's Quintet, a cluster of five glowing galaxies with swirling tails.",
      caption: "First Images from the James Webb Space Telescope. Bear in mind that these are infrared images, so the colors are assigned by the science team to bring out scientifically interesting details. (a) Southern Ring Nebula. We are looking at a complex series of shells expelled from a dying star, some 2000 light-years away from us. On visible-light images, only one star can be seen in the middle, but in this infrared view, it’s clear that there are two stars in the nebula’s central region. It is the reddish star to the left which is dying, and responsible for giving off the shells of dusty material we see expanding around it. But the presence of a companion star makes the dying star wobble, explaining some of the spiky, asymmetrical structure in the shells. (b) Stephan’s Quintet. About 1000 separate image files were combined into this remarkably detailed portrait of a compact, interacting group of galaxies. Actually, only four of the Quintet’s galaxies, the ones on the right, move together in space, about 290 million light-years away; the fifth galaxy, the one on the left, is much closer to us, and just happens to line up with the others in the sky. You can see giant, sweeping “tails” made of stars, gas, and dust that are pulled out of the four galaxies by the gravity of their neighbors. (credit: modification of “Southern Ring Nebula (MIRI Image)” by NASA, ESA, CSA, STScI, Webb ERO Production Team; credit: modification of “Stephan's Quintet (NIRCam + MIRI Image)” by NASA, ESA, CSA, STScI, Webb ERO Production Team)"
    },
    "6.26": {
      file: "fig-6-26.jpg",
      title: "Chandra X-Ray Satellite",
      alt: "An illustration of the Chandra spacecraft — a long cylindrical telescope with solar panel wings — in front of a colorful, glowing cloud of gas.",
      caption: "Chandra X-Ray Satellite. Chandra, the world’s most powerful X-ray telescope, was developed by NASA and launched in July 1999. (credit: modification of work by NASA)"
    },
    "6.27": {
      file: "fig-6-27.jpg",
      title: "James Webb Space Telescope (JWST)",
      alt: "Several large hexagonal mirror segments mounted together on a test stand in a big test chamber, with technicians in clean-room suits beside them.",
      caption: "James Webb Space Telescope (JWST). This image shows some of the mirrors of the JWST as they underwent cryogenic testing. The mirrors were exposed to extreme temperatures in order to gather accurate measurements on changes in their shape as they heated and cooled. (credit: NASA/MSFC/David Higginbotham/Emmett Given)"
    },
    "6.28": {
      file: "fig-6-28.jpg",
      title: "Artist’s Conception of the European Extremely Large Telescope",
      alt: "An illustration of a giant round, silver observatory dome with its shutter open on a flattened desert mountaintop at sunset, the huge segmented mirror visible inside.",
      caption: "Artist’s Conception of the European Extremely Large Telescope. The primary mirror in this telescope is 39.3 meters across. The telescope is under construction in the Atacama Desert in Northern Chile. (credit: ESO/L. Calçada)"
    }
  };

  /* ---------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "6.1",
      title: "Telescopes",
      minutes: 12,
      pages: "pp. 180–186",
      html:
        '<p>Get far away from city lights and the sky seems to hold an overwhelming number of stars &mdash; but ' +
        'in fact only about <strong>9000 stars</strong> are visible to the unaided eye, counting both of ' +
        'Earth&rsquo;s hemispheres. The light from most stars is simply too weak for human eyes by the time it ' +
        'reaches us. This chapter is about the tools astronomers use to see the rest &mdash; across the whole ' +
        'spectrum, from gamma rays to radio waves, since an object can look completely different depending on ' +
        'which wavelengths you observe it in (Figure 6.2).</p>' +
        '<h4>Three parts of every observing system</h4>' +
        '<p>Any modern system for measuring radiation from space has three basic parts. First, a ' +
        '<span class="term">telescope</span> acts as a &ldquo;bucket&rdquo; for collecting light (or other ' +
        'radiation) &mdash; just as a garbage can catches more rain than a coffee cup, a big telescope gathers ' +
        'far more light than your eye. Second, an <strong>instrument</strong> sorts the incoming radiation by ' +
        'wavelength &mdash; sometimes crudely (just separating blue from red to judge a star&rsquo;s ' +
        'temperature), sometimes finely enough to see individual spectral lines. Third, a ' +
        '<span class="term">detector</span> senses the radiation and makes a permanent record of it. The whole ' +
        'history of the telescope is the story of new technology improving these three parts.</p>' +
        '<div data-figure="6.2"></div>' +
        '<p>Many ancient cultures built special sites for watching the sky (Figure 6.3), mostly to track time and ' +
        'dates, and often with religious and ritual purposes too. There, the eye was the only light collector, ' +
        'all colors were seen at once, and the only record was what people wrote down or sketched.</p>' +
        '<div data-figure="6.3"></div>' +
        '<p><strong>Hans Lippershey, Zaccharias Janssen,</strong> and <strong>Jacob Metius</strong> are all ' +
        'credited with inventing the telescope around <strong>1608</strong> &mdash; they applied for patents ' +
        'within weeks of each other. But it was <strong>Galileo</strong> who, in <strong>1610</strong>, pointed ' +
        'this simple tube with lenses (his &ldquo;spyglass&rdquo;) at the sky. Even his small telescope ' +
        'revolutionized ideas about the planets and Earth&rsquo;s place among them.</p>' +
        '<h4>How telescopes work</h4>' +
        '<p>Today&rsquo;s biggest telescopes cost hundreds of millions to billions of dollars. Astronomers keep ' +
        'building bigger ones because planets, stars, and galaxies send far more light to Earth than a ' +
        'human eye, with its tiny opening, can catch &mdash; and bigger telescopes can detect fainter objects. ' +
        'All the starlight that doesn&rsquo;t land in your eye is &ldquo;wasted,&rdquo; and a telescope ' +
        'captures some of that wasted light and brings it to you.</p>' +
        '<p>A telescope&rsquo;s two most important jobs are (1) to <strong>collect</strong> the faint light from ' +
        'a source and (2) to <strong>focus</strong> all that light into a point or an image. Its light-gathering ' +
        'ability depends on the <em>area</em> of its light-collecting lens or mirror, so we compare telescopes by ' +
        'their <span class="term">aperture</span> &mdash; the diameter of that opening. Because a circle&rsquo;s ' +
        'area grows with the <strong>square</strong> of its diameter, a 4-meter mirror collects ' +
        '4<sup>2</sup> = <strong>16 times</strong> as much light as a 1-meter mirror.</p>' +
        '<p class="callout-inline"><strong>Worked example.</strong> A circle&rsquo;s area is ' +
        'A = &pi;(d&divide;2)<sup>2</sup>. A 1-m telescope has an area of &pi; &times; (0.5 m)<sup>2</sup> ' +
        '&asymp; <strong>0.79 m&sup2;</strong>; a 4-m telescope has &pi; &times; (2 m)<sup>2</sup> &asymp; ' +
        '<strong>12.6 m&sup2;</strong>. The ratio is 12.6 &divide; 0.79 = <strong>16</strong> &mdash; so the ' +
        '4-m telescope collects 16 times the light.</p>' +
        '<div data-diagram="light-bucket"></div>' +
        '<p>Once the telescope forms an image, it has to be recorded. Before the nineteenth century, astronomers ' +
        'simply looked and wrote down what they saw &mdash; slow, and about as reliable as an eyewitness account ' +
        'on a crime show. In the nineteenth century, <strong>photography</strong> on chemically treated glass ' +
        'plates took over; today images are captured by sensors much like a digital camera&rsquo;s and stored ' +
        'on computers. Professional astronomers rarely look through the big telescopes they use.</p>' +
        '<h4>Lenses, mirrors, and focus</h4>' +
        '<p>A <strong>lens</strong> is a transparent piece of material that bends (refracts) light passing ' +
        'through it. Shaped correctly, it bends all the parallel rays from a star so they meet at one point, the ' +
        '<span class="term">focus</span>, where an image appears (Figure 6.4). The distance from the lens to ' +
        'that point is its <strong>focal length</strong>. (Why are a star&rsquo;s rays parallel? Because stars ' +
        'are so far away that the few rays that reach Earth are, for all practical purposes, parallel &mdash; ' +
        'any that weren&rsquo;t are now heading off somewhere else in the universe.)</p>' +
        '<div data-figure="6.4"></div>' +
        '<p>To view the image, you use a second lens called an <span class="term">eyepiece</span>, which can ' +
        'also change the <strong>magnification</strong>. Magnifying a star makes little difference &mdash; it ' +
        'still looks like a point &mdash; but magnifying a planet or galaxy, which has structure, often ' +
        'helps.</p>' +
        '<p>A telescope that uses a lens as its main light collector is a <span class="term">refracting ' +
        'telescope</span>, or refractor (Figure 6.5). Galileo&rsquo;s telescopes were refractors, and so are ' +
        'binoculars. But refractors have size limits: the largest ever built was a <strong>49-inch</strong> ' +
        'refractor for the Paris 1900 Exposition (taken apart afterward), and today the largest is the ' +
        '<strong>40-inch refractor at Yerkes Observatory</strong> in Wisconsin. Refractors have several ' +
        'problems: the light must pass all the way through the glass, so it must be flawless and bubble-free ' +
        'throughout; different colors bend by slightly different amounts, so each focuses at a slightly ' +
        'different spot and the image blurs &mdash; <span class="term">chromatic aberration</span>; the lens can ' +
        'only be held by its edges, so a big one sags under gravity; and <em>both</em> sides must be shaped ' +
        'precisely.</p>' +
        '<div data-figure="6.5"></div>' +
        '<p>A <span class="term">reflecting telescope</span> avoids all that by using a <strong>concave ' +
        'mirror</strong> &mdash; curved like the inside of a sphere and coated with shiny metal, usually silver, ' +
        'aluminum, or occasionally gold. Light bounces off the front surface only, so flaws inside the glass ' +
        'don&rsquo;t matter, only the front needs precise shaping, and the mirror can be supported from behind. ' +
        'That&rsquo;s why most telescopes today, amateur and professional, are reflectors. <strong>Isaac ' +
        'Newton</strong> built the first successful one in <strong>1668</strong>.</p>' +
        '<p>In a reflector, the mirror sits at the bottom of a tube or open frame and reflects light back up to ' +
        'the <span class="term">prime focus</span> near the top. The image can be recorded there, or a small ' +
        'secondary mirror can send the light somewhere handier &mdash; out the side (<strong>Newtonian ' +
        'focus</strong>), or back down through a hole in the main mirror (<strong>Cassegrain focus</strong>, ' +
        'used by most large professional telescopes) (Figure 6.6). A small secondary mirror also blocks less ' +
        'light than an astronomer sitting at the prime focus would.</p>' +
        '<div data-figure="6.6"></div>' +
        '<div data-diagram="telescope-types"></div>' +
        '<div class="callout-inline"><strong>Making connections: choosing your own telescope.</strong> The key ' +
        'number is the <strong>aperture</strong> &mdash; a &ldquo;6-inch&rdquo; or &ldquo;8-inch&rdquo; ' +
        'telescope means the diameter of its lens or mirror; bigger means fainter objects. For the same ' +
        'aperture, refractors usually cost more than reflectors, because both sides of a lens must be polished. ' +
        '<strong>Magnification is not a reason to pick a telescope</strong> &mdash; it&rsquo;s set by swappable ' +
        'eyepieces, and too much magnification just magnifies the shimmer of Earth&rsquo;s atmosphere. A sturdy ' +
        '<strong>mount</strong> is essential, since the tiniest vibration shakes a magnified view. Good binoculars ' +
        'are a great start, and local amateur astronomy clubs host star parties where you can test-drive ' +
        'telescopes.</div>',
      keyIdeas: [
        "Every system for measuring astronomical radiation has three parts: a telescope to collect it, an instrument to sort it by wavelength, and a detector to record it permanently.",
        "Lippershey, Janssen, and Metius are credited with inventing the telescope around 1608; Galileo first turned one to the sky in 1610.",
        "A telescope's main jobs are to collect faint light and focus it into an image. Light-gathering power depends on the area of the aperture, which grows with the square of the diameter — a 4-m mirror collects 16 times the light of a 1-m mirror.",
        "A lens bends parallel rays to meet at a focus; the distance from lens to focus is the focal length; an eyepiece views (and magnifies) the image.",
        "Refracting telescopes use a lens (largest today: the Yerkes 40-inch) and suffer from flawed glass, chromatic aberration, sagging, and needing two perfect surfaces; reflecting telescopes use a concave mirror (first built by Newton in 1668) and avoid these problems, so most telescopes today are reflectors.",
        "A reflector can focus light at the prime focus, or use a secondary mirror to send it out the side (Newtonian focus) or back through a hole in the primary mirror (Cassegrain focus, used by most large professional telescopes)."
      ],
      selfCheck: [
        { q: "What are the three basic parts of a modern system for observing astronomical sources?",
          a: "A telescope that collects the radiation, an instrument that sorts it by wavelength, and a detector that senses it and makes a permanent record." },
        { q: "How much more light does a 4-meter telescope collect than a 1-meter telescope, and why?",
          a: "16 times more. Light-gathering power depends on the area of the aperture, and area grows with the square of the diameter: 4² = 16." },
        { q: "Give three reasons large telescopes are reflectors rather than refractors.",
          a: "Light bounces off only the front of a mirror, so flaws inside the glass don't matter; only one surface has to be shaped precisely; and a mirror can be supported from behind, so it doesn't sag the way a lens held by its edges does. Mirrors also avoid chromatic aberration." },
        { q: "What is chromatic aberration?",
          a: "Blurring caused because different wavelengths (colors) of light bend by slightly different amounts in glass, so each color comes to a focus at a slightly different spot." },
        { q: "Why isn't magnification a good reason to choose a telescope?",
          a: "Magnification comes from the swappable eyepiece, not the telescope itself — and too much magnification also magnifies the turbulence of Earth's atmosphere, making the image shimmer. Aperture is what really matters." }
      ]
    },
    {
      id: "6.2",
      title: "Telescopes Today",
      minutes: 14,
      pages: "pp. 186–196",
      html:
        '<p>Since Newton&rsquo;s day, when mirrors were measured in inches, reflecting telescopes have grown ' +
        'enormously. In <strong>1948</strong>, US astronomers finished a telescope with a <strong>5-meter ' +
        '(200-inch)</strong> mirror on <strong>Palomar Mountain</strong> in Southern California, which stayed ' +
        'the world&rsquo;s largest visible-light telescope for several decades. Today&rsquo;s giants have ' +
        'primary mirrors <strong>8 to 10 meters</strong> across, and bigger ones are being built (Figure ' +
        '6.7).</p>' +
        '<div data-figure="6.7"></div>' +
        '<h4>Modern visible-light and infrared telescopes</h4>' +
        '<p>Starting in 1990, telescope building took off around the world as new technology finally made ' +
        'mirrors much larger than Palomar&rsquo;s affordable, and able to work in the infrared as well as ' +
        'visible light. Some of the largest (from the book&rsquo;s Table 6.1):</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Aperture</th><th>Telescope</th><th>Location</th><th>Status</th></tr>' +
        '<tr><td>39 m</td><td>European Extremely Large Telescope (E-ELT)</td><td>Cerro Armazones, Chile</td><td>First light 2028 (estimated)</td></tr>' +
        '<tr><td>30 m</td><td>Thirty-Meter Telescope (TMT)</td><td>Maunakea, HI</td><td>Uncertain</td></tr>' +
        '<tr><td>24.5 m</td><td>Giant Magellan Telescope (GMT)</td><td>Las Campanas, Chile</td><td>Early 2030s (estimated)</td></tr>' +
        '<tr><td>10.4 m</td><td>Gran Telescopio Canarias (GTC)</td><td>La Palma, Canary Islands</td><td>First light 2007</td></tr>' +
        '<tr><td>10.0 m</td><td>Keck I and II</td><td>Maunakea, HI</td><td>Completed 1993&ndash;96</td></tr>' +
        '<tr><td>9.1 m</td><td>Hobby&ndash;Eberly Telescope (HET)</td><td>Mount Locke, TX</td><td>Completed 1997</td></tr>' +
        '<tr><td>8.4 m</td><td>Large Binocular Telescope (two telescopes)</td><td>Mount Graham, AZ</td><td>First light 2004</td></tr>' +
        '<tr><td>8.3 m</td><td>Subaru Telescope</td><td>Maunakea, HI</td><td>First light 1998</td></tr>' +
        '<tr><td>8.2 m</td><td>Very Large Telescope (four telescopes)</td><td>Cerro Paranal, Chile</td><td>Completed 2000</td></tr>' +
        '<tr><td>8.1 m</td><td>Gemini North and Gemini South</td><td>Maunakea, HI / Cerro Pach&oacute;n, Chile</td><td>First light 1999 / 2000</td></tr>' +
        '<tr><td>5.1 m</td><td>Hale Telescope</td><td>Mount Palomar, CA</td><td>Completed 1948</td></tr>' +
        '</tbody></table></div>' +
        '<p>Compare the Palomar telescope with the modern <strong>Gemini North</strong> (Figure 6.8). ' +
        'Palomar&rsquo;s 5-meter mirror weighs <strong>14.5 tons</strong>, and because glass sags under its own ' +
        'weight, it needs a massive steel structure. An 8-meter mirror built the same way would weigh at least ' +
        'eight times as much. Instead, Gemini North&rsquo;s 8-meter mirror is only about <strong>8 inches ' +
        'thick</strong> and weighs <strong>24.5 tons</strong> &mdash; less than twice Palomar&rsquo;s. It does ' +
        'sag, but computers measure the sag many times a second and push on the back of the mirror at ' +
        '<strong>120</strong> places to correct it, a process called <strong>active control</strong>. ' +
        'Seventeen telescopes with mirrors 6.5 meters or larger have been built since 1990.</p>' +
        '<div data-figure="6.8"></div>' +
        '<p>The twin 10-meter <strong>Keck telescopes</strong> on Maunakea, the first of these new-technology ' +
        'instruments, went further: instead of one 10-meter mirror, each combines <strong>36 hexagonal ' +
        'mirrors</strong>, each 1.8 meters wide (Figure 6.9). Computer-controlled motors constantly adjust them ' +
        'so that together they act like one perfectly shaped mirror.</p>' +
        '<div data-figure="6.9"></div>' +
        '<p>The telescope&rsquo;s structure must also swing quickly to any point in the sky, and a motorized ' +
        'drive turns it smoothly from east to west at exactly the rate Earth turns from west to east, so it ' +
        'stays locked on its target. It all sits inside a dome whose opening moves along with the ' +
        'telescope.</p>' +
        '<div class="callout-inline"><strong>Voyagers in astronomy: George Ellery Hale.</strong> Hale ' +
        '(1868&ndash;1938; Figure 6.10) four times started projects that produced the world&rsquo;s largest telescope, and ' +
        'was a master at persuading wealthy donors to pay for them. At 24, in 1892, he became director of the ' +
        'University of Chicago&rsquo;s observatory and talked trolley-system owner Charles T. Yerkes into ' +
        'funding a 40-inch refractor, finished in May 1897 &mdash; still the largest refractor in the world ' +
        '(Figure 6.11). Realizing 40 inches was about the limit for lenses, he moved to reflectors: a 60-inch ' +
        'built with money borrowed from his own family, on Mount Wilson (whose observatory the Carnegie ' +
        'Foundation funded in 1904), in its mount by December 1908; then a 100-inch paid for by John ' +
        'D. Hooker and completed in November 1917 &mdash; the telescope Edwin Hubble used to show that spiral ' +
        'nebulae are separate galaxies. His brother called him &ldquo;the greatest gambler in the ' +
        'world.&rdquo; A 1926 magazine article led the Rockefeller Foundation to grant $6 million for a ' +
        '200-inch telescope; Hale died in 1938, and the 200-inch (5-meter) Palomar telescope was dedicated ten ' +
        'years later and named for him.</div>' +
        '<div data-figure="6.10"></div>' +
        '<div data-figure="6.11"></div>' +
        '<h4>Picking the best observing sites</h4>' +
        '<p>A telescope like Gemini or Keck costs about <strong>$100 million</strong>, so it has to go in the ' +
        'best possible place. Since the late 1800s, astronomers have known that means mountains, far from city ' +
        'lights and pollution. Earth&rsquo;s atmosphere limits telescopes in at least four ways:</p>' +
        '<ol>' +
        '<li><strong>Weather</strong> &mdash; clouds, wind, and rain. At the best sites, it&rsquo;s clear up to ' +
        '75% of the time.</li>' +
        '<li><strong>Absorption</strong> &mdash; even clear air filters out some starlight, especially in the ' +
        'infrared, mostly because of <strong>water vapor</strong>. So astronomers prefer dry, high sites.</li>' +
        '<li><strong>Dark skies</strong> &mdash; near cities, air scatters the glare of lights and hides faint ' +
        'stars. This <span class="term">light pollution</span> means observatories are best at least ' +
        '<strong>100 miles</strong> from the nearest large city.</li>' +
        '<li><strong>Steady air</strong> &mdash; turbulent air bends starlight back and forth and blurs images, ' +
        'which astronomers call bad <span class="term">seeing</span>.</li>' +
        '</ol>' +
        '<p>So the best sites are <strong>high, dark, and dry</strong>: the Andes of Chile (Figure 6.12), the ' +
        'desert peaks of Arizona, the Canary Islands, and <strong>Maunakea</strong> in Hawaii, a dormant volcano ' +
        '13,700 feet (4200 meters) high. A large observatory also needs a support staff of 20 to 100 people ' +
        'besides the astronomers.</p>' +
        '<div data-figure="6.12"></div>' +
        '<h4>The resolution of a telescope</h4>' +
        '<p>Astronomers want sharp images, not just bright ones. <span class="term">Resolution</span> is the ' +
        'smallest detail an image can show. Larger apertures give sharper images &mdash; but until recently, ' +
        'ground-based telescopes couldn&rsquo;t reach the sharpness theory said they should, because of ' +
        'turbulence. The atmosphere is full of small cells of air, from inches to several feet across, each at ' +
        'a slightly different temperature, and each acts like a weak lens. Winds blow them through the ' +
        'telescope&rsquo;s view, so the light&rsquo;s path keeps changing and the image blurs and dances many ' +
        'times a second &mdash; like confetti dropped from a skyscraper scattering on its way to the ground. ' +
        'You see this as the <strong>twinkling</strong> of stars. In space, starlight is steady. The steadiest ' +
        'air is found on coastal mountain ranges and isolated volcanic peaks in the middle of an ocean, where ' +
        'the air has flowed a long way over water.</p>' +
        '<p>Resolution is measured as an angle, usually in <strong>arcseconds</strong>: 1 arcsecond is 1/3600 of ' +
        'a degree &mdash; about how big a quarter looks from <strong>5 kilometers</strong> away. The best ' +
        'traditional ground-based images show details several tenths of an arcsecond across; sharper images ' +
        'were one of the main reasons to launch the Hubble Space Telescope.</p>' +
        '<p>Since not every telescope can go to space, astronomers invented <span class="term">adaptive ' +
        'optics</span>: a small, flexible mirror in the telescope&rsquo;s light path. A sensor measures how the ' +
        'atmosphere is distorting the image and, as often as <strong>500 times per second</strong>, tells the ' +
        'mirror how to change shape to cancel the distortion. With it, ground-based telescopes reach ' +
        '<strong>0.1 arcsecond</strong> or a bit better in the infrared (where it currently works best) ' +
        '&mdash; about what Hubble achieves in visible light (Figure 6.13).</p>' +
        '<div data-figure="6.13"></div>' +
        '<div data-diagram="adaptive-optics"></div>' +
        '<div class="callout-inline"><strong>Astronomy basics: how astronomers really use telescopes.</strong> ' +
        'Most astronomers don&rsquo;t live at observatories; they might spend only a week or so a year observing, ' +
        'and the rest analyzing data. Even at the telescope, they seldom look through it &mdash; electronic ' +
        'detectors record everything, sometimes run remotely from thousands of miles away. Telescope time is ' +
        'precious: astronomers write proposals, a committee ranks them, and only the best get time &mdash; and ' +
        'if it&rsquo;s cloudy on your nights, you may wait more than a year for another chance.</div>',
      keyIdeas: [
        "The 5-meter (200-inch) Palomar telescope (1948) was the world's largest for decades; today's largest have 8- to 10-meter mirrors, and 24.5- to 39-meter telescopes are being built.",
        "New technology made big mirrors practical: Gemini North's 8-m mirror is thin and light, with its sag corrected by computer-controlled pushing at 120 points (active control); each Keck telescope's 10-m mirror is made of 36 hexagonal segments.",
        "George Ellery Hale four times initiated the world's largest telescope: the Yerkes 40-inch refractor (1897), the Mount Wilson 60-inch (1908) and 100-inch (1917), and the Palomar 200-inch (dedicated 1948).",
        "The atmosphere limits telescopes through weather, absorption (especially infrared, by water vapor), light pollution, and turbulence (seeing), so the best sites are high, dark, and dry — like Chile's Andes, Arizona, the Canary Islands, and Maunakea.",
        "Resolution — the finest detail an image shows — is measured in arcseconds (1/3600 degree); atmospheric turbulence blurs images and makes stars twinkle.",
        "Adaptive optics uses a flexible mirror reshaped up to 500 times per second to cancel atmospheric blurring, reaching 0.1 arcsecond in the infrared — comparable to Hubble in visible light."
      ],
      selfCheck: [
        { q: "How did engineers make Gemini North's 8-meter mirror so much lighter than Palomar's heavy design would allow?",
          a: "They made it thin (about 8 inches) and let it sag, then used computers to measure the sag many times a second and push on the back of the mirror at 120 places to correct it — active control. It weighs 24.5 tons, less than twice Palomar's 14.5-ton, 5-meter mirror." },
        { q: "Name the four ways Earth's atmosphere limits telescopes.",
          a: "Weather (clouds, wind, rain); absorption of starlight, especially infrared by water vapor; light pollution brightening the sky near cities; and turbulence that blurs images (bad seeing)." },
        { q: "Why do stars twinkle?",
          a: "Turbulent cells of air at slightly different temperatures act like small moving lenses, bending starlight back and forth so it sometimes reaches your eye and sometimes misses — making the star seem to flicker. In space, starlight is steady." },
        { q: "How does adaptive optics work?",
          a: "A sensor measures how the atmosphere is distorting the image, and up to 500 times per second it tells a small flexible mirror in the light path how to change shape to cancel the distortion, bringing the light back to a sharp focus." },
        { q: "How big is 1 arcsecond?",
          a: "1/3600 of a degree — about how big a quarter looks from 5 kilometers away." }
      ]
    },
    {
      id: "6.3",
      title: "Visible-Light Detectors and Instruments",
      minutes: 10,
      pages: "pp. 196–199",
      html:
        '<p>After a telescope collects light, it has to be detected and measured. The first detector was the ' +
        'human eye &mdash; hooked up to an imperfect recording device, the human brain. The eye also has a very ' +
        'short <strong>integration time</strong>: it adds up light for only a fraction of a second before ' +
        'sending the image to the brain. Modern detectors can collect light for much longer, ' +
        '&ldquo;<strong>taking a long exposure</strong>&rdquo; &mdash; sometimes several hours, to catch very ' +
        'faint objects.</p>' +
        '<p>Before the light reaches the detector, an instrument usually sorts it by wavelength. It might be ' +
        'as simple as a colored <strong>filter</strong>, which passes only a certain range of wavelengths ' +
        '(red plastic, for example, passes only red light), letting astronomers measure an object&rsquo;s ' +
        'brightness and color. Or it might be a <span class="term">spectrometer</span>, which spreads the light ' +
        'into its full rainbow so individual spectral lines can be measured.</p>' +
        '<h4>Photographic and electronic detectors</h4>' +
        '<p>For most of the twentieth century, <strong>photographic film</strong> or <strong>glass ' +
        'plates</strong> with a light-sensitive chemical coating were astronomy&rsquo;s main detectors, and ' +
        'observatories still hold vast collections showing what the sky looked like over the past 100 years. ' +
        'But photography is inefficient: only about <strong>1%</strong> of the light that hits the film helps ' +
        'make the image.</p>' +
        '<p>Today astronomers mostly use <span class="term">charge-coupled devices (CCDs)</span>, similar to the ' +
        'detectors in digital and cell-phone cameras (Figure 6.14). Photons striking a CCD free electrons, ' +
        'which are stored and counted at the end of the exposure. Each spot where the light is counted is a ' +
        '<strong>pixel</strong> (&ldquo;picture element&rdquo;), and modern detectors have millions of them ' +
        '(megapixels). CCDs typically record <strong>60&ndash;70%</strong> of the photons that hit them, and the ' +
        'best exceed <strong>90%</strong> &mdash; so they reveal far fainter objects, like small moons of the ' +
        'outer planets, icy dwarf planets beyond Pluto, and dwarf galaxies. They also measure brightness more ' +
        'accurately than photography, and their output is digital, ready for a computer.</p>' +
        '<div data-figure="6.14"></div>' +
        '<div data-diagram="detector-catch"></div>' +
        '<h4>Infrared observations</h4>' +
        '<p>The infrared runs from about 1 micrometer (&micro;m) &mdash; roughly where CCDs and film stop being ' +
        'sensitive &mdash; to 100 micrometers or longer. Infrared is &ldquo;heat radiation,&rdquo; and ' +
        'that&rsquo;s the problem: Earth&rsquo;s surface is near <strong>300 K</strong>, so by Wien&rsquo;s law ' +
        'the telescope, the dome, and even the sky are all glowing in the infrared, peaking around ' +
        '<strong>10 micrometers</strong>. To infrared eyes, everything on Earth is brightly lit (Figure 6.15) ' +
        '&mdash; like trying to do visible-light astronomy in broad daylight with a telescope lined with ' +
        'fluorescent lights.</p>' +
        '<p>The fix is to shield the detector from nearby heat. It&rsquo;s kept extremely cold, often near ' +
        'absolute zero (<strong>1 to 3 K</strong>) by immersing it in <strong>liquid helium</strong>, and the ' +
        'heat given off by the telescope structure and optics is reduced and blocked from reaching it.</p>' +
        '<div data-figure="6.15"></div>' +
        '<h4>Spectroscopy</h4>' +
        '<p>Spectroscopy is one of astronomy&rsquo;s most powerful tools, revealing an object&rsquo;s ' +
        'composition, temperature, motion, and more &mdash; more than half the time on most large telescopes is ' +
        'spent on it. In a simple spectrometer (Figure 6.16), light from the telescope enters through a narrow ' +
        '<strong>slit</strong>, a lens <strong>collimates</strong> it (makes the rays parallel), a ' +
        '<strong>prism</strong> spreads the wavelengths in different directions, and a second lens focuses the ' +
        'many colored images of the slit onto a CCD. Because the light is spread into more and more ' +
        '&ldquo;bins,&rdquo; fewer photons land in each, so spectroscopy needs a bigger telescope or a longer ' +
        'exposure &mdash; usually both. In practice, astronomers today usually use a ' +
        '<strong>grating</strong> instead of a prism: a piece of material with thousands of grooves on its ' +
        'surface, which works differently but also spreads light into a spectrum.</p>' +
        '<div data-figure="6.16"></div>',
      keyIdeas: [
        "The eye is a poor detector: it can't make a permanent record and integrates light for only a fraction of a second; modern detectors can take long exposures lasting hours.",
        "Between telescope and detector, instruments sort light by wavelength — simple filters (for brightness and color) or spectrometers (for individual spectral lines).",
        "Photographic plates were the main detectors for most of the 20th century but use only about 1% of the light; CCDs record 60–70% of photons (the best over 90%), count them in millions of pixels, and give digital output.",
        "Infrared astronomy is hard because everything at Earth temperatures (~300 K) glows in the infrared (peak ~10 µm); infrared detectors are cooled (often to 1–3 K with liquid helium) and shielded from the telescope's own heat.",
        "A spectrometer passes light through a slit, collimating lens, prism (or, more often today, a grating), and camera lens onto a detector; spreading light into a spectrum means fewer photons per bin, so it needs bigger telescopes or longer exposures."
      ],
      selfCheck: [
        { q: "What advantage do modern detectors have over the human eye besides making a permanent record?",
          a: "They can collect light over a long time — a long exposure, sometimes hours — while the eye adds up light for only a fraction of a second. That lets them detect much fainter objects." },
        { q: "Why are CCDs so much better than photographic plates?",
          a: "Photographic film uses only about 1% of the light that hits it; CCDs record 60–70% (the best over 90%), so they detect much fainter objects. They also measure brightness more accurately and give digital output that goes straight into a computer." },
        { q: "Why must infrared detectors be kept so cold?",
          a: "Anything warm glows in the infrared. At Earth temperatures (~300 K), the telescope, dome, and sky all radiate infrared (peaking near 10 µm) that would swamp faint cosmic sources, so the detector is cooled to 1–3 K, often with liquid helium, and shielded from nearby heat." },
        { q: "Why does spectroscopy usually need a bigger telescope or a longer exposure than taking a simple image?",
          a: "A spectrometer spreads the light out into many wavelength 'bins,' so fewer photons land in each one — you need to collect more light overall to measure each part of the spectrum." }
      ]
    },
    {
      id: "6.4",
      title: "Radio Telescopes",
      minutes: 13,
      pages: "pp. 199–206",
      html:
        '<p>Besides visible and infrared light, radio waves from space can also reach Earth&rsquo;s surface. In ' +
        'the early <strong>1930s</strong>, <strong>Karl G. Jansky</strong>, an engineer at Bell Telephone ' +
        'Laboratories testing antennas for long-range radio, kept picking up mysterious static (Figure 6.17). ' +
        'It came in strongest about <strong>four minutes earlier each day</strong> &mdash; and since Earth&rsquo;s ' +
        'sidereal rotation period (its rotation relative to the stars) is four minutes shorter than a solar ' +
        'day, he correctly concluded the source was fixed on the celestial sphere. It turned out to be part of ' +
        'the <strong>Milky Way</strong>: Jansky had found the first cosmic radio source.</p>' +
        '<div data-figure="6.17"></div>' +
        '<p>In <strong>1936</strong>, <strong>Grote Reber</strong>, an amateur astronomer interested in radio, ' +
        'built the first antenna designed specifically to receive cosmic radio waves, out of galvanized iron ' +
        'and wood. He surveyed the sky for radio sources and stayed active for more than 30 years &mdash; ' +
        'working nearly alone for the first decade, before professional astronomers realized radio ' +
        'astronomy&rsquo;s potential.</p>' +
        '<h4>Detecting radio energy from space</h4>' +
        '<p>Radio waves can&rsquo;t be &ldquo;heard&rdquo; &mdash; they are electromagnetic radiation, like ' +
        'light, not sound. A radio station encodes sound into radio waves, and your radio decodes them back. ' +
        'Radio waves from space carry no music; turned into sound, they&rsquo;d be static. But they do carry ' +
        'information about the chemistry and physical conditions of their sources.</p>' +
        '<p>Just as vibrating charges make electromagnetic waves, electromagnetic waves make charges vibrate. ' +
        'An <strong>antenna</strong> is a conductor in which passing radio waves create a feeble current, ' +
        'which a <strong>receiver</strong> amplifies until it can be measured. Astronomers usually record ' +
        'thousands of frequency bands at once, so a radio receiver works much like a spectrometer. Radio waves ' +
        'reflect off metal just as light reflects off a mirror, so a radio telescope is a concave metal ' +
        '<strong>dish</strong> that reflects the waves to a focus and into a receiver. Radio astronomers often ' +
        'turn their data into pictures, revealing structures invisible in ordinary light &mdash; like the ' +
        'jets, more than 160,000 light-years long, of the galaxy Cygnus A (Figure 6.18).</p>' +
        '<div data-figure="6.18"></div>' +
        '<p>The largest radio dishes that can point anywhere in the sky are about <strong>100 meters</strong> ' +
        'across, like the Green Bank Telescope in West Virginia (Figure 6.19). Some major radio telescopes ' +
        '(from the book&rsquo;s Table 6.2):</p>' +
        '<div data-figure="6.19"></div>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Observatory</th><th>Location</th><th>Description</th></tr>' +
        '<tr><td>FAST</td><td>Guizhou, China</td><td>500-m fixed dish</td></tr>' +
        '<tr><td>Green Bank Telescope (GBT)</td><td>Green Bank, WV</td><td>110 &times; 100-m steerable dish</td></tr>' +
        '<tr><td>Effelsberg</td><td>Bonn, Germany</td><td>100-m steerable dish</td></tr>' +
        '<tr><td>Lovell Telescope</td><td>Manchester, England</td><td>76-m steerable dish</td></tr>' +
        '<tr><td>Square Kilometre Array (SKA)</td><td>South Africa and Western Australia</td><td>Thousands of dishes, km&sup2; collecting area</td></tr>' +
        '<tr><td>ALMA</td><td>Atacama desert, Chile</td><td>66 dishes, 7 m and 12 m</td></tr>' +
        '<tr><td>Jansky Very Large Array (VLA)</td><td>Socorro, NM</td><td>27 dishes of 25 m (36-km baseline)</td></tr>' +
        '<tr><td>Very Long Baseline Array (VLBA)</td><td>Ten US sites, HI to the Virgin Islands</td><td>10 dishes of 25 m (9000-km baseline)</td></tr>' +
        '</tbody></table></div>' +
        '<h4>Radio interferometry</h4>' +
        '<p>A telescope&rsquo;s resolution depends on its aperture <em>and</em> on the wavelength it collects: ' +
        'the longer the waves, the harder it is to see fine detail. Radio waves are so long that even the ' +
        'biggest single radio dish sees less detail than a typical small visible-light telescope in a college ' +
        'lab. The fix is to link two or more radio telescopes electronically into an ' +
        '<span class="term">interferometer</span>. (The name comes from <span class="term">interference</span>, ' +
        'the way waves combine &mdash; the telescopes cooperate, they don&rsquo;t interfere with each other.) ' +
        'An interferometer&rsquo;s resolution depends on the <strong>separation</strong> of the telescopes, not ' +
        'their size: two dishes 1 kilometer apart see as much detail as a single dish 1 kilometer across ' +
        '&mdash; though they don&rsquo;t collect nearly as much radiation.</p>' +
        '<p>Combining many dishes makes an <span class="term">interferometer array</span>, which works like a ' +
        'large number of two-dish interferometers at once. The <strong>Jansky Very Large Array (VLA)</strong> ' +
        'near Socorro, New Mexico, has <strong>27</strong> movable 25-meter dishes (on railroad tracks) spread ' +
        'over about <strong>36 kilometers</strong>, making radio pictures with a resolution of about ' +
        '<strong>1 arcsecond</strong> &mdash; comparable to visible-light telescopes. <strong>ALMA</strong> in ' +
        'Chile&rsquo;s Atacama Desert (Figure 6.20), at 16,400 feet, has twelve 7-meter and fifty-four 12-meter ' +
        'dishes with baselines up to 16 kilometers; since 2013 it has reached resolutions down to ' +
        '<strong>6 milliarcseconds (0.006 arcsecond)</strong>.</p>' +
        '<div data-figure="6.20"></div>' +
        '<p>At first, arrays were limited to a few tens of kilometers because the dishes had to be wired ' +
        'together. Now astronomers precisely time the waves&rsquo; arrival at each telescope and combine the ' +
        'data later, so the telescopes can be as far apart as California and Australia. The <strong>Very Long ' +
        'Baseline Array (VLBA)</strong>, completed in 1993, links <strong>10</strong> telescopes from the Virgin ' +
        'Islands to Hawaii (Figure 6.21), reaching a resolution of <strong>0.0001 arcsecond</strong> &mdash; ' +
        'enough to make out features as small as 10 AU at the center of our Galaxy.</p>' +
        '<div data-figure="6.21"></div>' +
        '<div data-diagram="interferometer"></div>' +
        '<p>Interferometry now works at visible and infrared wavelengths too. The book&rsquo;s Table 6.3 lists ' +
        'the <strong>CHARA Array</strong> on Mount Wilson (six 1-m telescopes, 400-m longest baseline), the ' +
        '<strong>Very Large Telescope</strong> (four 8.2-m telescopes, 200 m), <strong>Keck I and II</strong> ' +
        '(85 m, operated as an interferometer 2001&ndash;2012), and the <strong>Large Binocular ' +
        'Telescope</strong> (22.8 m).</p>' +
        '<h4>Radar astronomy</h4>' +
        '<p><span class="term">Radar</span> means sending radio waves to an object in the solar system and ' +
        'detecting the echo. Since radio waves travel at the speed of light, timing the round trip gives the ' +
        'distance to the object, or to features like mountains on it. Radar has measured distances to planets, ' +
        'speeds in the solar system (via the Doppler effect), the rotation periods of Venus and Mercury, and ' +
        'the surfaces of Mercury, Venus, Mars, and Jupiter&rsquo;s large moons, and has helped navigate ' +
        'spacecraft. Any radio dish can do radar if it has a powerful transmitter. For years the most ' +
        'spectacular was the <strong>1000-foot (305-meter) Arecibo</strong> telescope in Puerto Rico (Figure ' +
        '6.22), built into a natural bowl among hills, with its receiver hung on cables 100 meters above. It ' +
        'was badly damaged in storms in 2020 and decommissioned. An even larger 500-meter dish, ' +
        '<strong>FAST</strong>, now operates in China.</p>' +
        '<div data-figure="6.22"></div>',
      keyIdeas: [
        "Karl Jansky discovered the first cosmic radio source (the Milky Way) in the early 1930s, noticing that the static peaked four minutes earlier each day — the difference between sidereal and solar days; Grote Reber built the first dedicated radio telescope in 1936.",
        "Radio waves are electromagnetic radiation, not sound; an antenna turns them into a feeble current that a receiver amplifies; a radio telescope is a concave metal dish that reflects radio waves to a focus.",
        "The largest steerable dishes are about 100 m across (e.g., Green Bank); the largest dish of all is China's 500-m FAST.",
        "Resolution gets worse at longer wavelengths, so radio astronomers link dishes into interferometers, whose resolution depends on the telescopes' separation: the VLA (27 dishes, 36 km) reaches ~1 arcsecond, ALMA (66 dishes, 16 km) 0.006 arcsecond, and the VLBA (10 dishes, Virgin Islands to Hawaii) 0.0001 arcsecond.",
        "Radar bounces radio waves off solar system objects and times the echo to measure distance (and, with the Doppler effect, motion); Arecibo was the great radar dish until its 2020 collapse."
      ],
      selfCheck: [
        { q: "How did Jansky figure out that his mysterious static came from space?",
          a: "It peaked about four minutes earlier each day. Earth's sidereal rotation period (relative to the stars) is four minutes shorter than a solar day, so the source had to be fixed among the stars on the celestial sphere — it turned out to be the Milky Way." },
        { q: "Why do radio astronomers need interferometers?",
          a: "Resolution gets worse as wavelength gets longer, and radio waves are very long — so even the largest single dish sees less detail than a small visible-light telescope. Linking dishes gives resolution set by their separation, like one giant dish." },
        { q: "Two radio dishes sit 1 kilometer apart and work as an interferometer. How does that compare with a single 1-km dish?",
          a: "It has the same resolution as a single 1-km dish, but it collects far less radiation, since only the two small dishes are actually gathering waves." },
        { q: "How does radar measure the distance to a planet?",
          a: "It sends radio waves to the planet and times how long the echo takes to come back. Since the waves travel at the speed of light, the round-trip time gives the distance." }
      ]
    },
    {
      id: "6.5",
      title: "Observations outside Earth’s Atmosphere",
      minutes: 12,
      pages: "pp. 206–211",
      html:
        '<p>Earth&rsquo;s atmosphere blocks most radiation shorter than visible light, so direct ' +
        '<strong>ultraviolet, X-ray,</strong> and <strong>gamma-ray</strong> observations can only be made from ' +
        'space (though gamma rays can be detected indirectly from the ground). Getting above the air helps at ' +
        'visible and infrared wavelengths too: stars don&rsquo;t twinkle in space, so detail is limited only by ' +
        'the size of the instrument. But space telescopes are expensive and hard to repair &mdash; which is why ' +
        'astronomers keep building on the ground as well.</p>' +
        '<h4>Airborne and space infrared telescopes</h4>' +
        '<p>Water vapor, the main enemy of infrared observing, sits low in the atmosphere, so even a few ' +
        'hundred meters of height helps. High mountains attract clouds and storms, and people think less ' +
        'clearly at altitude, so astronomers took to airplanes: starting in the 1960s with a 15-centimeter ' +
        'telescope on a Learjet, then a 0.9-meter telescope NASA flew from 1974 to 1995 at 12 kilometers, above ' +
        '99% of the water vapor. From 2010 to 2022, NASA and the German Aerospace Center flew the 2.5-meter ' +
        '<strong>Stratospheric Observatory for Infrared Astronomy (SOFIA)</strong> in a modified Boeing 747SP ' +
        '(Figure 6.23).</p>' +
        '<div data-figure="6.23"></div>' +
        '<p>Space is even better for infrared: no atmosphere at all, and the whole telescope can be cooled to ' +
        'hundreds of degrees below freezing, nearly eliminating its own infrared glow. (Cool a telescope inside ' +
        'the atmosphere and it gets coated with condensing water vapor.) The first orbiting infrared ' +
        'observatory, <strong>IRAS</strong> (1983, a US&ndash;Netherlands&ndash;Britain project), had a 0.6-meter ' +
        'telescope cooled below 10 K; in 10 months it surveyed the whole infrared sky and cataloged about ' +
        '<strong>350,000</strong> infrared sources. The most powerful of the early infrared telescopes was the ' +
        '0.85-meter <strong>Spitzer Space Telescope</strong> (2003&ndash;2020). Infrared telescopes reveal the ' +
        'cooler parts of the universe that visible light can&rsquo;t &mdash; like dust clouds around newborn ' +
        'stars and the remains of dying ones.</p>' +
        '<h4>Hubble Space Telescope</h4>' +
        '<p>Launched in <strong>April 1990</strong>, the <strong>Hubble Space Telescope (HST)</strong> has a ' +
        '<strong>2.4-meter</strong> mirror (limited by the Space Shuttle&rsquo;s payload bay) and is one of the ' +
        'most important telescopes in history. It is named for Edwin Hubble, who discovered the expansion of the ' +
        'universe in the 1920s. It was the first orbiting observatory designed to be serviced by Shuttle ' +
        'astronauts, who visited several times to upgrade and repair it (a program that has now ended). One of ' +
        'its great achievements is the <strong>Hubble Ultra-Deep Field</strong>: a tiny patch of sky observed ' +
        'for almost 100 hours, showing about <strong>10,000 galaxies</strong>, some formed when the universe was ' +
        'just a few percent of its current age (Figure 6.24).</p>' +
        '<div data-figure="6.24"></div>' +
        '<p>Hubble&rsquo;s mirror was polished so smooth that, scaled up to the size of the continental United ' +
        'States, no hill or valley would be bigger than about 6 centimeters. Yet after launch, scientists found ' +
        'its shape was off by about <strong>1/50 the width of a human hair</strong> &mdash; enough to blur every ' +
        'image. (To save money, the full optical system hadn&rsquo;t been tested before launch.) The fix was ' +
        'like glasses for a student with blurry vision: in <strong>December 1993</strong>, astronauts captured the ' +
        'telescope, installed corrective optics and a new camera, and released it &mdash; and it has worked as ' +
        'intended ever since.</p>' +
        '<h4>James Webb Space Telescope</h4>' +
        '<div data-figure="6.1"></div>' +
        '<p>The largest telescope yet sent into space, built to observe infrared light, is the <strong>James ' +
        'Webb Space Telescope</strong>, named for a former NASA administrator rather than an astronomer. ' +
        'Launched <strong>December 25, 2021</strong>, it orbits about <strong>1.5 million km</strong> from Earth ' +
        '&mdash; four times farther than the Moon &mdash; a nicely cold spot for infrared, but out of reach of ' +
        'astronaut repair crews. Its <strong>18-segment</strong> mirror is <strong>6.5 meters</strong> across ' +
        '(Figure 6.1), protected by a sunshield the size of a tennis court so its liquid-helium-cooled ' +
        'instruments can catch extremely faint infrared light. NASA estimates it could make out a U.S. penny ' +
        'from 40 km (24 miles) away. Because its images are infrared, their colors are assigned by the science ' +
        'team to represent different infrared wavelengths (Figure 6.25). Webb is peering into dusty ' +
        'star-forming regions, probing the atmospheres of planets around other stars, and looking back toward ' +
        'the time when the first galaxies were assembling.</p>' +
        '<div data-figure="6.25"></div>' +
        '<h4>High-energy observatories</h4>' +
        '<p>Ultraviolet, X-ray, and direct gamma-ray observations must be made from space. They began in ' +
        '<strong>1946</strong>, when the US Naval Research Laboratory put instruments on <strong>V2 ' +
        'rockets</strong> captured from Germany after World War II, first to detect ultraviolet light from the ' +
        'Sun. Since the 1960s, a steady stream of high-energy observatories has gone into orbit, including the ' +
        '<strong>Chandra X-ray Observatory</strong>, launched in <strong>1999</strong> (Figure 6.26). Building ' +
        '&ldquo;mirrors&rdquo; for X-rays and gamma rays is very hard, since they normally pass straight through ' +
        'matter; the <strong>2002 Nobel Prize</strong> in physics went to <strong>Riccardo Giacconi</strong>, a ' +
        'pioneer of X-ray instruments. In <strong>2008</strong>, NASA launched the <strong>Fermi Gamma-ray ' +
        'Space Telescope</strong> to measure gamma rays of higher energy than any earlier telescope.</p>' +
        '<div data-figure="6.26"></div>' +
        '<p>Gamma rays can also be caught from the ground by using the <strong>atmosphere itself as the ' +
        'detector</strong>: a gamma ray hitting the air speeds up charged particles, which hit other particles ' +
        'and set off a cascade of light that ground instruments can see. <strong>VERITAS</strong> in Arizona ' +
        'and <strong>H.E.S.S.</strong> in Namibia work this way. However complex the technology, every observing ' +
        'system still has the same three parts: a telescope, an instrument to sort by wavelength, and a ' +
        'detector.</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Observatory</th><th>Began</th><th>Bands</th><th>Notes</th></tr>' +
        '<tr><td>James Webb Space Telescope</td><td>2022</td><td>Infrared</td><td>6.5-m mirror</td></tr>' +
        '<tr><td>Hubble Space Telescope</td><td>1990</td><td>Visible, UV, IR</td><td>2.4-m mirror</td></tr>' +
        '<tr><td>Chandra X-Ray Observatory</td><td>1999</td><td>X-rays</td><td>X-ray images and spectra</td></tr>' +
        '<tr><td>XMM-Newton</td><td>1999</td><td>X-rays</td><td>X-ray spectroscopy</td></tr>' +
        '<tr><td>INTEGRAL</td><td>2002</td><td>X- and gamma rays</td><td>Higher-resolution gamma-ray images</td></tr>' +
        '<tr><td>Spitzer Space Telescope</td><td>2003</td><td>IR</td><td>0.85-m telescope</td></tr>' +
        '<tr><td>Fermi Gamma-ray Space Telescope</td><td>2008</td><td>Gamma rays</td><td>First high-energy gamma-ray observations</td></tr>' +
        '<tr><td>WISE</td><td>2009</td><td>IR</td><td>Whole-sky map, asteroid searches</td></tr>' +
        '<tr><td>Gaia</td><td>2013</td><td>Visible</td><td>Precise map of the Milky Way</td></tr>' +
        '<tr><td>TESS</td><td>2018</td><td>Visible</td><td>Planet finder</td></tr>' +
        '</tbody></table></div>' +
        '<div data-diagram="atmosphere-windows"></div>',
      keyIdeas: [
        "Earth's atmosphere blocks most radiation shorter than visible light, so direct ultraviolet, X-ray, and gamma-ray observations must be made from space; space also removes twinkling, but telescopes there are costly and hard to repair.",
        "Infrared astronomy moved to airplanes (up to SOFIA, a 2.5-m telescope in a Boeing 747SP, 2010–2022) and then to space, where telescopes can be cooled to nearly eliminate their own infrared glow: IRAS (1983, ~350,000 sources) and Spitzer (2003–2020).",
        "The Hubble Space Telescope (April 1990, 2.4-m mirror) had a mirror flaw 1/50 the width of a hair, fixed by astronauts in December 1993; its Ultra-Deep Field shows about 10,000 galaxies.",
        "The James Webb Space Telescope (launched December 25, 2021) has a 6.5-m, 18-segment infrared mirror, a tennis-court-sized sunshield, and orbits 1.5 million km from Earth.",
        "High-energy astronomy began with V2 rockets in 1946; Chandra (X-ray, 1999) and Fermi (gamma ray, 2008) are the premier high-energy observatories; ground arrays like VERITAS and H.E.S.S. detect gamma rays indirectly using the atmosphere as the detector."
      ],
      selfCheck: [
        { q: "Why is space better than even a high mountaintop for infrared astronomy?",
          a: "Space removes all atmospheric interference, and in the vacuum the whole telescope can be cooled far below freezing to nearly eliminate its own infrared glow — a telescope cooled inside the atmosphere would get coated with condensing water vapor." },
        { q: "What went wrong with the Hubble Space Telescope, and how was it fixed?",
          a: "Its primary mirror's shape was off by about 1/50 the width of a human hair, blurring every image (the full optical system hadn't been tested before launch). In December 1993, astronauts captured it and installed corrective optics and a new camera." },
        { q: "Why are the colors in James Webb Space Telescope images 'assigned'?",
          a: "Webb observes infrared light, which our eyes can't see and which has no natural color, so the science team assigns colors to represent its different infrared wavelengths." },
        { q: "How can gamma rays be detected from the ground if the atmosphere blocks them?",
          a: "Indirectly — a gamma ray hitting the atmosphere accelerates charged particles, which hit other particles and create a cascade of light that ground instruments (like VERITAS and H.E.S.S.) can detect." }
      ]
    },
    {
      id: "6.6",
      title: "The Future of Large Telescopes",
      minutes: 8,
      pages: "pp. 212–213",
      html:
        '<p>Like hikers wondering what&rsquo;s around the next bend, astronomers and engineers are always ' +
        'working on the next generation of telescopes. In space, the premier facility for the coming decade is ' +
        'the <strong>James Webb Space Telescope</strong> (Figure 6.27), whose flawless deployment in the first ' +
        'half of 2022 has made astronomers optimistic. The smaller Hubble is still working after more than 30 ' +
        'years. NASA is also planning to launch (around 2027) the <strong>Nancy Grace Roman Space ' +
        'Telescope</strong>, an infrared telescope with a smaller mirror but a wider field of view than ' +
        'Webb.</p>' +
        '<div data-figure="6.27"></div>' +
        '<p>On the ground, astronomers built the <strong>Vera Rubin Observatory</strong> in Chile: an ' +
        '<strong>8.4-meter</strong> telescope with a far wider field of view than any existing telescope and the ' +
        '<strong>largest digital camera ever built</strong>. It photographs the entire southern sky in only ' +
        '<strong>three nights</strong>, then starts again &mdash; essentially making a ten-year movie of the sky ' +
        'to catch <strong>transients</strong>, things that change quickly, like exploding stars and rocks ' +
        'orbiting near Earth. It saw first light in <strong>2025</strong>. It is named for the American ' +
        'astronomer whose work showed that much of the universe is made of mysterious <strong>dark ' +
        'matter</strong>.</p>' +
        '<p>Gamma-ray astronomers are planning the <strong>Cherenkov Telescope Array (CTA)</strong>: two arrays, ' +
        'one in each hemisphere, measuring gamma rays indirectly from the ground at energies ' +
        '<strong>a thousand times</strong> greater than Fermi can detect.</p>' +
        '<h4>Giant segmented mirrors</h4>' +
        '<p>Several groups are exploring ground-based telescopes with mirrors <strong>30 meters</strong> or more ' +
        'across &mdash; one-third the length of a football field. It&rsquo;s technically impossible to build ' +
        'and transport a single mirror that big, so these mirrors are made of many smaller ones aligned to act ' +
        'as one.</p>' +
        '<ul>' +
        '<li>The <strong>European Extremely Large Telescope (ELT)</strong> (Figure 6.28), the most ambitious, ' +
        'will have a <strong>39.3-meter</strong> mirror built like Keck&rsquo;s, from <strong>798 ' +
        'hexagonal</strong> segments each 1.4 meters across. Construction in Chile&rsquo;s Atacama Desert ' +
        'started in 2014.</li>' +
        '<li>The <strong>Thirty-Meter Telescope (TMT)</strong>, with a preferred site on Maunakea, uses ' +
        '<strong>492</strong> hexagonal segments, each about 1.44 meters across corners, with gaps of only ' +
        '2.5 mm between them.</li>' +
        '<li>The <strong>Giant Magellan Telescope (GMT)</strong> uses <strong>seven</strong> stiff ' +
        '<strong>8.4-meter</strong> mirrors as its segments; construction has started near Las Campanas ' +
        'Observatory in Chile.</li>' +
        '</ul>' +
        '<p>(Astronomers try to outdo each other not only in size, but in names!) These giants will combine ' +
        'huge light-gathering power with sharp imaging &mdash; for example, taking images and spectra of planets ' +
        'around other stars, which might give the first real evidence, from the chemistry of their atmospheres, ' +
        'that life exists elsewhere.</p>' +
        '<div data-figure="6.28"></div>' +
        '<div data-diagram="mirror-segments"></div>',
      keyIdeas: [
        "In space, the James Webb Space Telescope leads the coming decade; Hubble still works after 30+ years; the Nancy Grace Roman Space Telescope (planned ~2027) will be an infrared telescope with a wider field of view than Webb.",
        "The Vera Rubin Observatory (8.4 m, first light 2025) has the largest digital camera ever built and photographs the whole southern sky every three nights for ten years, hunting transients.",
        "The planned Cherenkov Telescope Array will measure gamma rays from the ground at energies 1000 times greater than Fermi can detect.",
        "Mirrors 30 m or larger can't be made in one piece, so new giant telescopes use segments: the European ELT (39.3 m, 798 hexagons), the TMT (30 m, 492 hexagons), and the GMT (seven 8.4-m mirrors).",
        "These extremely large telescopes may take images and spectra of planets around other stars — possibly finding the first evidence of life elsewhere."
      ],
      selfCheck: [
        { q: "What is the Vera Rubin Observatory designed to do?",
          a: "Photograph the entire southern sky every three nights for ten years — essentially a movie of the sky — to catch transients, things that change quickly, such as exploding stars and rocks orbiting near Earth." },
        { q: "Why are the next giant telescopes built with segmented mirrors?",
          a: "It's technically impossible to build and transport a single mirror 30 meters or more across, so their primary mirrors are made of many smaller mirrors held precisely aligned so they act as one." },
        { q: "Compare the mirrors of the European ELT, the TMT, and the GMT.",
          a: "The ELT: 39.3 m, from 798 hexagonal segments 1.4 m across. The TMT: 30 m, from 492 hexagonal segments about 1.44 m across. The GMT: 24.5 m, from seven 8.4-m mirrors." }
      ]
    }
  ];

  /* ------------------------------------------------------------------ GLOSSARY */
  CH.glossary = [
    { term: "Telescope", section: "6.1", def: "An instrument for collecting visible-light or other electromagnetic radiation." },
    { term: "Detector", section: "6.1", def: "A device sensitive to electromagnetic radiation that makes a record of astronomical observations." },
    { term: "Aperture", section: "6.1", def: "The diameter of the primary lens or mirror of a telescope." },
    { term: "Focus (of telescope)", section: "6.1", def: "The point where the rays of light converged by a mirror or lens meet." },
    { term: "Eyepiece", section: "6.1", def: "A magnifying lens used to view the image produced by the objective lens or primary mirror of a telescope." },
    { term: "Refracting telescope", section: "6.1", def: "A telescope in which the principal light collector is a lens or system of lenses." },
    { term: "Chromatic aberration", section: "6.1", def: "A distortion that causes an image to appear fuzzy when each wavelength coming into a transparent material focuses at a different spot." },
    { term: "Reflecting telescope", section: "6.1", def: "A telescope in which the principal light collector is a concave mirror." },
    { term: "Prime focus", section: "6.1", def: "The point in a telescope where the objective lens or primary mirror focuses the light." },
    { term: "Seeing", section: "6.2", def: "The unsteadiness of Earth's atmosphere, which blurs telescopic images; good seeing means the atmosphere is steady." },
    { term: "Resolution", section: "6.2", def: "Detail in an image; specifically, the smallest angular (or linear) features that can be distinguished." },
    { term: "Adaptive optics", section: "6.2", def: "Systems used with telescopes that can compensate for distortions in an image introduced by the atmosphere, thus resulting in sharper images." },
    { term: "Charge-coupled device (CCD)", section: "6.3", def: "An array of high-sensitivity electronic detectors of electromagnetic radiation, used at the focus of a telescope (or camera lens) to record an image or spectrum." },
    { term: "Interference", section: "6.4", def: "A process in which waves mix together such that their crests and troughs can alternately reinforce and cancel one another." },
    { term: "Interferometer", section: "6.4", def: "An instrument that combines electromagnetic radiation from one or more telescopes to obtain a resolution equivalent to what would be obtained with a single telescope with a diameter equal to the baseline separating the individual telescopes." },
    { term: "Interferometer array", section: "6.4", def: "A combination of multiple radio dishes that, in effect, works like a large number of two-dish interferometers." },
    { term: "Radar", section: "6.4", def: "The technique of transmitting radio waves to an object and then detecting the radiation that the object reflects back to the transmitter; used to measure the distance to, and motion of, a target object or to form images of it." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "6.1", q: "What are the three basic components of a modern system for measuring astronomical radiation?",
      choices: ["A telescope, a wavelength-sorting instrument, and a detector", "A lens, an eyepiece, and a human observer", "A dome, a mount, and a clock drive", "A prism, a mirror, and a photograph"],
      answer: 0,
      whyWrong: [null, "An eyepiece and human eye are one old way to view an image, but modern systems replace the eye with a detector and add an instrument to sort by wavelength.", "The dome and mount house and point the telescope, but they aren't the three measuring components.", "A prism can be part of the sorting instrument, but this list leaves out the telescope and detector as separate roles."],
      explain: "Every system has a telescope to collect radiation, an instrument to sort it by wavelength, and a detector to record it permanently." },
    { section: "6.1", q: "A telescope's mirror is 4 meters across. How much light does it collect compared with a 1-meter mirror?",
      choices: ["16 times as much", "4 times as much", "8 times as much", "2 times as much"],
      answer: 0,
      whyWrong: [null, "Light-gathering power follows area, not diameter — and area grows with the square of the diameter.", "Area goes as diameter squared: 4² = 16, not 8.", "That would be true only if the collected light grew with the square root of diameter; it grows with the square."],
      explain: "Light-gathering power depends on the aperture's area, which grows with the square of its diameter: 4² = 16." },
    { section: "6.1", q: "Why are nearly all large research telescopes reflectors rather than refractors?",
      choices: ["A mirror only needs one precise surface, can be supported from behind, and light doesn't pass through the glass", "Mirrors magnify more than lenses", "Lenses can't focus starlight", "Refractors only work in the daytime"],
      answer: 0,
      whyWrong: [null, "Magnification comes from the eyepiece and isn't the reason — light collection and image quality are.", "Lenses focus starlight just fine; the problems are size, flaws, sagging, and chromatic aberration.", "Refractors work at night like any telescope; Galileo's telescopes were refractors."],
      explain: "Light reflects off only the front surface of a mirror, so internal flaws don't matter, only one side needs precise shaping, the mirror can be supported from the back, and there's no chromatic aberration." },
    { section: "6.1", q: "Who built the first successful reflecting telescope, and when?",
      choices: ["Isaac Newton, 1668", "Galileo, 1610", "Hans Lippershey, 1608", "George Ellery Hale, 1897"],
      answer: 0,
      whyWrong: [null, "Galileo used a refractor (his 'spyglass') to observe the sky in 1610.", "Lippershey is one of the people credited with inventing the (refracting) telescope around 1608.", "Hale's 1897 project was the Yerkes 40-inch refractor."],
      explain: "Isaac Newton built the first successful reflecting telescope in 1668." },
    { section: "6.1", q: "What is chromatic aberration?",
      choices: ["Blurring because each wavelength of light focuses at a slightly different spot after passing through glass", "Twinkling caused by turbulent air", "The sag of a large mirror under gravity", "Colors added to infrared images by scientists"],
      answer: 0,
      whyWrong: [null, "Twinkling from turbulent air is 'seeing,' an atmospheric effect, not a property of the lens.", "Sagging is a separate problem of large lenses and mirrors, not a color effect.", "Assigned colors in infrared images are a presentation choice, not an optical distortion."],
      explain: "Transparent materials bend different colors by slightly different amounts, so each color comes to a focus at a different spot and the image blurs." },
    { section: "6.2", q: "What is the process of computers measuring a mirror's sag and pushing on its back to correct it called?",
      choices: ["Active control", "Adaptive optics", "Interferometry", "Chromatic aberration"],
      answer: 0,
      whyWrong: [null, "Adaptive optics corrects for atmospheric turbulence using a small flexible mirror, not the main mirror's sag.", "Interferometry links separate telescopes together to improve resolution.", "Chromatic aberration is a color-blurring problem of lenses."],
      explain: "Gemini North's thin mirror sags, but computers measure it many times a second and apply forces at 120 points on the back to correct it — active control." },
    { section: "6.2", q: "What is the best kind of site for a large visible-light or infrared observatory?",
      choices: ["High, dark, and dry", "Low, near a big city for easy access", "Humid rainforest, where the air is still", "At sea level beside the ocean"],
      answer: 0,
      whyWrong: [null, "City lights cause light pollution, and low altitudes have more air and water vapor overhead.", "Water vapor absorbs starlight, especially infrared, so astronomers prefer dry sites.", "Sea level puts the whole thickness of the atmosphere, and its water vapor, above the telescope — high sites are better."],
      explain: "The best sites are high (above much of the atmosphere), dark (far from city lights), and dry (little water vapor), with steady air." },
    { section: "6.2", q: "What does adaptive optics do?",
      choices: ["Reshapes a flexible mirror up to 500 times a second to cancel atmospheric blurring", "Replaces the main mirror with 36 hexagons", "Cools the detector with liquid helium", "Links telescopes across continents"],
      answer: 0,
      whyWrong: [null, "Segmented mirrors like Keck's are a way to build big apertures, not to cancel atmospheric blurring.", "Cooling detectors is how infrared astronomers fight heat glow, not turbulence.", "Linking distant telescopes is very-long-baseline interferometry."],
      explain: "A sensor measures the atmospheric distortion, and a small flexible mirror changes shape as often as 500 times per second to undo it, reaching about 0.1 arcsecond in the infrared." },
    { section: "6.2", q: "What causes stars to twinkle?",
      choices: ["Turbulent cells of air bending starlight back and forth", "Stars actually flickering in brightness", "The telescope's mirror vibrating", "Light pollution from nearby cities"],
      answer: 0,
      whyWrong: [null, "The twinkling comes from our atmosphere — in space, the light of stars is steady.", "You can see twinkling with no telescope at all, so it can't come from a mirror.", "Light pollution brightens the sky background; it doesn't make stars flicker."],
      explain: "Moving cells of air at slightly different temperatures act like little lenses, bending starlight so it sometimes reaches your eye and sometimes misses." },
    { section: "6.2", q: "George Ellery Hale's work led to which of these telescopes?",
      choices: ["The Yerkes 40-inch refractor and the Palomar 200-inch reflector", "The Hubble and Webb space telescopes", "The Keck telescopes and the TMT", "The VLA and the VLBA"],
      answer: 0,
      whyWrong: [null, "Hale died in 1938, long before any space telescope.", "Keck (1990s) and the TMT are modern segmented-mirror projects, decades after Hale.", "These are radio arrays; Hale built optical telescopes."],
      explain: "Hale initiated the Yerkes 40-inch refractor, the Mount Wilson 60-inch and 100-inch reflectors, and the Palomar 200-inch reflector, which was named for him." },
    { section: "6.3", q: "About what fraction of the light striking photographic film actually contributes to the image?",
      choices: ["About 1%", "About 50%", "About 70%", "Over 90%"],
      answer: 0,
      whyWrong: [null, "Film is far less efficient than that — the rest of the light is wasted.", "60–70% is typical of CCDs, not photographic film.", "Over 90% is achieved only by the best modern CCDs."],
      explain: "Photographic films are inefficient: only about 1% of the light that falls on them contributes to the image." },
    { section: "6.3", q: "Why are CCDs better detectors than photographic plates?",
      choices: ["They record 60–70% or more of the photons, measure brightness accurately, and give digital output", "They make the telescope's mirror bigger", "They remove the need for a telescope", "They work only in the infrared"],
      answer: 0,
      whyWrong: [null, "A detector doesn't change the mirror's size; it records the light more efficiently.", "A CCD still needs a telescope to collect and focus the light.", "CCDs are the main detectors for visible light — that's what this section covers — so they certainly don't work only in the infrared."],
      explain: "CCDs typically record 60–70% of the photons hitting them (the best over 90%), give more accurate brightness measurements, and produce digital numbers for computers." },
    { section: "6.3", q: "Why must infrared detectors be cooled to just a few kelvins?",
      choices: ["Everything at Earth temperatures glows in the infrared and would swamp faint cosmic sources", "Infrared light only exists at low temperatures", "Cold detectors are cheaper to build", "To stop chromatic aberration"],
      answer: 0,
      whyWrong: [null, "Infrared is emitted by warm things too — that's exactly the problem.", "Cooling with liquid helium adds cost; it's done for sensitivity, not savings.", "Chromatic aberration is a lens problem unrelated to detector temperature."],
      explain: "At about 300 K, the telescope, dome, and sky all radiate infrared (peaking near 10 µm), so the detector is cooled to 1–3 K and shielded to see faint sources." },
    { section: "6.3", q: "What do astronomers today usually use instead of a prism to spread light into a spectrum?",
      choices: ["A grating", "A CCD", "An eyepiece", "An interferometer"],
      answer: 0,
      whyWrong: [null, "A CCD records the spectrum; it doesn't spread the light out.", "An eyepiece views and magnifies an image; it doesn't disperse light.", "An interferometer combines telescopes to improve resolution."],
      explain: "A grating — a surface with thousands of grooves — works differently from a prism but also spreads light into a spectrum." },
    { section: "6.4", q: "Who discovered the first source of cosmic radio waves?",
      choices: ["Karl G. Jansky", "Grote Reber", "George Ellery Hale", "Riccardo Giacconi"],
      answer: 0,
      whyWrong: [null, "Reber built the first antenna designed specifically for cosmic radio waves in 1936, after Jansky's discovery.", "Hale built large optical telescopes.", "Giacconi pioneered X-ray astronomy."],
      explain: "In the early 1930s, Bell Labs engineer Karl Jansky found radio static coming from the Milky Way." },
    { section: "6.4", q: "What sets the resolution of a radio interferometer?",
      choices: ["The separation between its telescopes", "The size of each individual dish", "The number of hours it observes", "The temperature of its receivers"],
      answer: 0,
      whyWrong: [null, "Individual dish size affects how much radiation is collected, not the interferometer's resolution.", "Longer observing collects more signal but doesn't change the resolution.", "Receiver temperature affects noise, not resolution."],
      explain: "An interferometer's resolution depends on the telescopes' separation: two dishes 1 km apart resolve like a single 1-km dish." },
    { section: "6.4", q: "Why do radio telescopes need interferometry to see fine detail?",
      choices: ["Radio waves are very long, and resolution gets worse at longer wavelengths", "Radio waves travel slower than light", "Radio dishes can't be made larger than 10 meters", "Radio waves are blocked by clouds"],
      answer: 0,
      whyWrong: [null, "Radio waves are electromagnetic radiation and travel at the speed of light.", "Radio dishes reach 100 m steerable and 500 m fixed (FAST).", "Radio waves pass through clouds — they're one of the bands that reach the ground."],
      explain: "Because resolution worsens as wavelength grows, even the largest single radio dish sees less detail than a small visible-light telescope." },
    { section: "6.4", q: "Which array reaches a resolution of about 0.0001 arcsecond?",
      choices: ["The Very Long Baseline Array (VLBA)", "The Very Large Array (VLA)", "The Green Bank Telescope", "The CHARA Array"],
      answer: 0,
      whyWrong: [null, "The VLA, spread over about 36 km, reaches about 1 arcsecond.", "Green Bank is a single 100-m dish, with far poorer resolution.", "CHARA is a visible-light interferometer with a 400-m baseline."],
      explain: "The VLBA's 10 telescopes stretch from the Virgin Islands to Hawaii, giving a resolution of 0.0001 arcsecond." },
    { section: "6.4", q: "How does radar measure the distance to an object in the solar system?",
      choices: ["By timing how long radio waves take to bounce back from it", "By measuring how bright the object looks", "By counting the object's spectral lines", "By measuring the object's temperature"],
      answer: 0,
      whyWrong: [null, "Brightness depends on size and reflectivity as well as distance, so it can't give distance directly.", "Spectral lines reveal composition and motion, not distance.", "Temperature doesn't give distance."],
      explain: "Radar sends out radio waves and times the round trip of the echo; since the waves travel at the speed of light, that gives the distance." },
    { section: "6.5", q: "Which kinds of radiation can be observed directly only from space?",
      choices: ["Ultraviolet, X-rays, and gamma rays", "Visible light and radio waves", "Only radio waves", "Only visible light"],
      answer: 0,
      whyWrong: [null, "Visible light and radio waves reach the ground — that's why ground telescopes use them.", "Radio waves are observed from the ground by dishes like the VLA and FAST.", "Visible light passes through the atmosphere to ground telescopes."],
      explain: "Earth's atmosphere blocks most radiation shorter than visible light, so direct ultraviolet, X-ray, and gamma-ray observations must be made from space." },
    { section: "6.5", q: "What was wrong with the Hubble Space Telescope when it was launched?",
      choices: ["Its mirror's shape was off by about 1/50 the width of a human hair, blurring images", "It was pointed at the wrong part of the sky", "Its mirror was too small to see galaxies", "It could only see in the infrared"],
      answer: 0,
      whyWrong: [null, "Pointing wasn't the problem; the mirror's shape was.", "Its 2.4-m mirror has imaged about 10,000 galaxies in the Ultra-Deep Field.", "Hubble observes visible, ultraviolet, and infrared light."],
      explain: "A tiny error in the mirror's shape blurred every image; astronauts installed corrective optics in December 1993." },
    { section: "6.5", q: "Where does the James Webb Space Telescope orbit?",
      choices: ["About 1.5 million km from Earth — four times farther than the Moon", "In low Earth orbit, where astronauts can service it", "On the surface of the Moon", "Around Mars"],
      answer: 0,
      whyWrong: [null, "Hubble is the one astronauts serviced; Webb is far beyond their reach.", "Webb is a free-flying spacecraft, not a lunar observatory.", "Webb stays about 1.5 million km from Earth, nowhere near Mars."],
      explain: "Webb orbits about 1.5 million km from Earth, a good cold location for infrared viewing — but one no astronauts can currently reach for repairs." },
    { section: "6.5", q: "Why is space better than the ground for infrared telescopes, beyond avoiding the atmosphere?",
      choices: ["The whole telescope can be cooled to nearly eliminate its own infrared glow", "Infrared light is brighter in space", "Space telescopes are cheaper", "Space telescopes can be repaired easily"],
      answer: 0,
      whyWrong: [null, "The light from space is the same; what changes is the background glow from the air and the telescope.", "Placing telescopes in space is expensive.", "Repairs in space are a major challenge — Webb can't be reached by astronauts at all."],
      explain: "In the vacuum of space, optics can be cooled hundreds of degrees below freezing without getting coated in condensing water vapor, nearly eliminating the telescope's own infrared emission." },
    { section: "6.5", q: "Which is the premier gamma-ray space telescope, launched in 2008?",
      choices: ["Fermi", "Chandra", "Spitzer", "IRAS"],
      answer: 0,
      whyWrong: [null, "Chandra (1999) is an X-ray observatory.", "Spitzer (2003) was an infrared telescope.", "IRAS (1983) was the first orbiting infrared observatory."],
      explain: "NASA launched the Fermi Gamma-ray Space Telescope in 2008 to measure gamma rays of higher energy than any earlier telescope." },
    { section: "6.6", q: "What is the Vera Rubin Observatory designed to do?",
      choices: ["Photograph the whole southern sky every three nights for ten years to find transients", "Observe gamma rays from space", "Study the Sun in ultraviolet", "Link radio dishes across continents"],
      answer: 0,
      whyWrong: [null, "Rubin is a ground-based visible-light telescope, not a gamma-ray space observatory.", "Rubin surveys the whole night sky, not the Sun.", "That describes very-long-baseline radio interferometry, like the VLBA."],
      explain: "With the largest digital camera ever built, Rubin maps the southern sky every three nights, making a ten-year movie to catch quickly changing objects." },
    { section: "6.6", q: "Why will the next generation of giant ground telescopes use segmented mirrors?",
      choices: ["A single mirror 30 m or larger is technically impossible to build and transport", "Segments give better colors", "Hexagons collect more light than circles of the same area", "Segmented mirrors don't need to be aligned"],
      answer: 0,
      whyWrong: [null, "Segmentation is about size limits, not color.", "Light collected depends on total area, not the shape of the pieces.", "The segments must be held precisely in position so they act as one continuous surface."],
      explain: "It's impossible to make and move a single mirror that large, so these telescopes combine many smaller mirrors aligned to act as one." },
    { section: "6.6", q: "How many hexagonal segments will make up the European ELT's 39.3-meter mirror?",
      choices: ["798", "36", "492", "7"],
      answer: 0,
      whyWrong: [null, "36 hexagons make up each Keck telescope's 10-m mirror.", "492 hexagons is the design of the Thirty-Meter Telescope.", "Seven 8.4-m mirrors make up the Giant Magellan Telescope."],
      explain: "The European ELT follows Keck's design on a much larger scale: 798 hexagonal mirrors, each 1.4 meters across." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[6] = CH;
})();
