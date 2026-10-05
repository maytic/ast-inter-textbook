/* =============================================================================
   Astronomy 2e — Chapter 15: The Sun: A Garden-Variety Star
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 15), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[15].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 15,
    chapterTitle: "The Sun: A Garden-Variety Star",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/15-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 501–534"
  };

  CH.tools = ["sunlayers", "solaratmosphere", "sunspots", "solarcycle", "solaractivity", "spaceweather"];

  /* ---------------------------------- ONE STUDY TOOL PER TOPIC: match data */
  CH.sunlayersmatch = [
    { a: "Core", b: "the source of all the Sun’s energy — about 15 million K, the hottest part" },
    { a: "Radiative zone", b: "from about 25% to 70% of the way out; light crawls through it very slowly" },
    { a: "Convective zone", b: "about 200,000 km deep; giant bubbling cells carry heat up, like boiling oatmeal" },
    { a: "Photosphere", b: "the visible surface, just over 400 km thick, about 5800 K" },
    { a: "Granulation", b: "the rice-grain pattern on the photosphere made by rising hot gas" },
    { a: "Hydrogen and helium", b: "about 73% and 25% of the Sun’s mass — all the rest is only 2%" },
    { a: "Plasma", b: "a hot ionized gas — atoms stripped of electrons" },
    { a: "Cecilia Payne-Gaposchkin", b: "showed in 1925 that the Sun and stars are mostly hydrogen and helium" }
  ];
  CH.solaratmospherematch = [
    { a: "Chromosphere", b: "the layer just above the photosphere, 2000–3000 km thick, about 10,000 K" },
    { a: "Transition region", b: "a thin zone where the temperature shoots up from 10,000 K to nearly a million" },
    { a: "Corona", b: "the outermost, hottest layer — a million degrees or more, but very thin" },
    { a: "Coronagraph", b: "an instrument that blocks the Sun’s glare with an occulting disk to show the corona" },
    { a: "Helium", b: "first found in the Sun’s spectrum in 1868, named after helios, Greek for “Sun”" },
    { a: "Solar wind", b: "charged particles streaming out of the Sun at about 400 km/s" },
    { a: "Coronal hole", b: "a dark, cool, quiet region where field lines reach out to space — the solar wind’s main source" },
    { a: "Aurora", b: "glowing curtains of light near Earth’s magnetic poles, caused by solar particles" }
  ];
  CH.sunspotsmatch = [
    { a: "Sunspot", b: "a dark spot on the photosphere, about 3800 K, caused by strong magnetism" },
    { a: "Umbra", b: "the darker inner core of a sunspot" },
    { a: "Penumbra", b: "the less dark region surrounding a sunspot’s core" },
    { a: "Galileo (1612)", b: "used sunspots to show the Sun rotates in about a month" },
    { a: "Differential rotation", b: "different latitudes spin at different rates: 25 days at the equator, 36 at 80°" },
    { a: "Zeeman effect", b: "splitting of spectral lines by a magnetic field — used to measure the Sun’s magnetism" },
    { a: "Solar dynamo", b: "churning ionized gas inside the Sun that generates its magnetic field" },
    { a: "Magnetogram", b: "a map showing the magnetic polarity of regions on the Sun" }
  ];
  CH.solarcyclematch = [
    { a: "Heinrich Schwabe", b: "pharmacist who counted sunspots (1826–1850) and found the sunspot cycle" },
    { a: "Sunspot cycle", b: "number of spots rises and falls about every 11 years (anywhere from 9 to 14)" },
    { a: "Sunspot maximum", b: "more than 100 spots at once — still less than half a percent of the surface" },
    { a: "22-year cycle", b: "how long it takes the Sun’s magnetic polarity pattern to repeat" },
    { a: "Leading spots", b: "in one cycle, have one polarity in the north and the opposite in the south" },
    { a: "Maunder Minimum", b: "1645 to 1715 — very few sunspots, even at maximum" },
    { a: "Little Ice Age", b: "a cold period in Europe during the Maunder Minimum" },
    { a: "0.1%", b: "how much the Sun’s total energy output changes over a solar cycle" }
  ];
  CH.solaractivitymatch = [
    { a: "Plage", b: "a bright “cloud” in the chromosphere around sunspots, seen through special filters" },
    { a: "Prominence", b: "a huge cloud or loop of cooler gas rising into the corona, often near sunspots" },
    { a: "Surge prominence", b: "the most active kind — up to 1300 km/s" },
    { a: "Solar flare", b: "the most violent event on the Sun; a typical one lasts 5 to 10 minutes" },
    { a: "10 million K", b: "how hot flare material can get at the moment of explosion" },
    { a: "Coronal mass ejection (CME)", b: "coronal material — mainly protons and electrons — blasted out at 500–1000 km/s" },
    { a: "Active region", b: "a place where sunspots, flares, and bright regions occur together, with strong magnetic fields" },
    { a: "Stretched rubber band", b: "what flares are compared to: opposite magnetic fields release energy when they snap" }
  ];
  CH.spaceweathermatch = [
    { a: "Space weather", b: "changing conditions in space caused by solar activity, and their effects on Earth" },
    { a: "Carrington Event (1859)", b: "a flare followed by auroras as far south as Hawaii and sparks from telegraph wires" },
    { a: "Coronal holes", b: "let the solar wind flow freely — usually mild disturbances" },
    { a: "Solar flares", b: "shower Earth’s upper atmosphere with X-rays, energetic particles, and ultraviolet" },
    { a: "CMEs", b: "the most disruptive — they heat the ionosphere and drag satellites lower" },
    { a: "Killer electrons", b: "high-speed electrons that can destroy satellite electronics" },
    { a: "Quebec, 1989", b: "parts of Canada lost power for up to 9 hours after a major solar storm" },
    { a: "T = D / v", b: "the time for solar particles to reach Earth: distance divided by speed" }
  ];

  /* ------------------------------------------------------------------ FIGURES
     Images from OpenStax Astronomy 2e (CC BY 4.0), placed in the matching
     sections via <div data-figure="N.N"></div>. Captions are the book's own,
     with credit lines intact. Files in img/ (downscaled for web). */
  CH.figures = {
    "15.1": {
      file: "fig-15-1.jpg",
      title: "Our Star",
      alt: "A small golden Sun inside a dark circle, surrounded by a wide red-orange halo of the corona streaming outward, with a bright eruption at the upper right.",
      caption: "Our Star. The Sun—our local star—is quite average in many ways. However, that does not stop it from being a fascinating object to study. From solar flares and coronal mass ejections, like the one seen coming from the Sun in the top right of this image, the Sun is a highly dynamic body at the center of our solar system. This image combines two separate satellite pictures of the Sun—the inner one from the Solar Dynamics Observatory and the outer one from the Solar and Heliospheric Observatory. (credit: modification of work by ESA/NASA)"
    },
    "15.2": {
      file: "fig-15-2.jpg",
      title: "Earth and the Sun",
      alt: "The glowing orange edge of the Sun with a giant loop of hot gas rising from it; a tiny dot labeled Earth above shows how small our planet is by comparison. An inset shows the whole Sun.",
      caption: "Earth and the Sun. Here, Earth is shown to scale with part of the Sun and a giant loop of hot gas erupting from its surface. The inset shows the entire Sun, smaller. (credit: modification of work by SOHO/EIT/ESA)"
    },
    "15.3": {
      file: "fig-15-3.jpg",
      title: "Cecilia Payne-Gaposchkin (1900–1979)",
      alt: "A black-and-white photograph of a woman with short hair seated at a desk, filing cabinets behind her.",
      caption: "Cecilia Payne-Gaposchkin (1900–1979). Her 1925 doctoral thesis laid the foundations for understanding the composition of the Sun and the stars. Yet, being a woman, she was not given a formal appointment at Harvard, where she worked, until 1938 and was not appointed a professor until 1956. (credit: Smithsonian Institution)"
    },
    "15.4": {
      file: "fig-15-4.jpg",
      title: "Parts of the Sun",
      alt: "A cutaway drawing of the Sun with labels: the core at the center, the radiative zone, the convection zone with looping cells, the photosphere, chromosphere, and corona, plus a sunspot, a prominence, and a coronal hole.",
      caption: "Parts of the Sun. This illustration shows the different parts of the Sun, from the hot core where the energy is generated through regions where energy is transported outward, first by radiation, then by convection, and then out through the solar atmosphere. The parts of the atmosphere are also labeled the photosphere, chromosphere, and corona. Some typical features in the atmosphere are shown, such as coronal holes and prominences. (credit: modification of work by NASA/Goddard)"
    },
    "15.5": {
      file: "fig-15-5.jpg",
      title: "Solar Photosphere plus Sunspots",
      alt: "The whole orange Sun at the left; to the right, a close-up of a cluster of dark sunspots, with a small dot showing the size of Earth.",
      caption: "Solar Photosphere plus Sunspots. This photograph shows the photosphere—the visible surface of the Sun. Also shown is an enlarged image of a group of sunspots; the size of Earth is shown for comparison. Sunspots appear darker because they are cooler than their surroundings. The typical temperature at the center of a large sunspot is about 3800 K, whereas the photosphere has a temperature of about 5800 K. (credit: modification of work by NASA/SDO)"
    },
    "15.6": {
      file: "fig-15-6.jpg",
      title: "Granulation Pattern",
      alt: "Two close-ups of the Sun’s surface covered in a pattern of bright, irregular grains separated by dark lanes; the right one also shows a dark, ragged sunspot.",
      caption: "Granulation Pattern. The surface markings of the convection cells create a granulation pattern on this dramatic image (left) taken from the Japanese Hinode spacecraft. You can see the same pattern when you heat up miso soup. The right image shows an irregular-shaped sunspot and granules on the Sun’s surface, seen with the Swedish Solar Telescope on August 22, 2003. (credit left: modification of work by Hinode JAXA/NASA/PPARC; credit right: ISP/SST/Oddbjorn Engvold, Jun Elin Wiik, Luc Rouppe van der Voort)"
    },
    "15.7": {
      file: "fig-15-7.jpg",
      title: "The Sun’s Atmosphere",
      alt: "A composite Sun split into wedges: a yellow photosphere with a sunspot, a red chromosphere, and an X-ray view of the corona with bright coronal loops and a dark coronal hole.",
      caption: "The Sun’s Atmosphere. Composite image showing the three components of the solar atmosphere: the photosphere or surface of the Sun taken in ordinary light; the chromosphere, imaged in the light of the strong red spectral line of hydrogen (H-alpha); and the corona as seen with X-rays. (credit: modification of work by NASA)"
    },
    "15.8": {
      file: "fig-15-8.jpg",
      title: "Temperatures in the Solar Atmosphere",
      alt: "A graph of temperature versus height above the photosphere: the line dips slightly through the photosphere, rises gently through the chromosphere, then shoots almost straight up through the transition region to over a million kelvin in the corona.",
      caption: "Temperatures in the Solar Atmosphere. On this graph, temperature is shown increasing upward, and height above the photosphere is shown increasing to the right. Note the very rapid increase in temperature over a very short distance in the transition region between the chromosphere and the corona."
    },
    "15.9": {
      file: "fig-15-9.jpg",
      title: "Portion of the Transition Region",
      alt: "A yellow-tinted close-up of the Sun’s edge: a long, twisting ribbon of gas threads across the image, and short bright whiskers stick out from the limb.",
      caption: "Portion of the Transition Region. This image shows a giant ribbon of relatively cool gas threading through the lower portion of the hot corona. This ribbon (the technical term is filament) is made up of many individual threads. Time-lapse movies of this filament showed that it gradually heated as it moved through the corona. Scientists study events like this in order to try to understand what heats the chromosphere and corona to high temperatures. The “whiskers” at the edge of the Sun are spicules, jets of gas that shoot material up from the Sun’s surface and disappear after only a few minutes. This single image gives a hint of just how complicated it is to construct a model of the all the different structures and heating mechanisms in the solar atmosphere. (credit: JAXA/NASA/Hinode)"
    },
    "15.10": {
      file: "fig-15-10.jpg",
      title: "Coronagraph",
      alt: "A dark disk blocking the center of the image with a small white circle drawn inside it; red-orange streamers of the corona spread out on all sides.",
      caption: "Coronagraph. This image of the Sun was taken March 2, 2016. The larger dark circle in the center is the disk the blocks the Sun’s glare, allowing us to see the corona. The smaller inner circle is where the Sun would be if it were visible in this image. (credit: modification of work by NASA/SOHO)"
    },
    "15.11": {
      file: "fig-15-11.jpg",
      title: "Coronal Hole",
      alt: "A tan, mottled image of the Sun with a large dark patch spreading across the lower part of the disk near the south pole.",
      caption: "Coronal Hole. The dark area visible near the Sun’s south pole on this Solar Dynamics Observatory spacecraft image is a coronal hole. (credit: modification of work by NASA/SDO)"
    },
    "15.12": {
      file: "fig-15-12.jpg",
      title: "Aurora",
      alt: "Curtains of green and purple light glowing in the night sky above a line of dark spruce trees.",
      caption: "Aurora. This dramatic NASA image was taken in Delta Junction, Alaska, on April 10, 2015 by Sebastian Saarloos. (credit: “Purple and Green Aurora in Alaska” by Sebastian Saarloos/NASA, Public Domain)"
    },
    "15.13": {
      file: "fig-15-13.jpg",
      title: "Sunspots",
      alt: "(a) A yellow patch of the Sun’s surface with a group of dark sunspots, each with a dark center and lighter rim. (b) A detailed close-up of one sunspot with radiating filaments, next to a white outline of the United States drawn to scale.",
      caption: "Sunspots. a) Image of sunspots, cooler and thus darker regions on the Sun, taken in July 2012. You can see the dark, central region of each sunspot (called the umbra) surrounded by a less dark region (the penumbra). The largest spot shown here is about 11 Earths wide. b) The new Daniel Inouye Solar Telescope took the most detailed image of a sunspot ever recorded in January 2020. A map of the United States is shown to scale. Although sunspots appear dark when seen next to the hotter gases of the photosphere, an average sunspot, cut out of the solar surface and left standing in the night sky, would be about as bright as the full moon. The mottled appearance of the Sun’s surface is granulation. (credit a: modification of work by NASA Goddard Space Flight Center, Alan Friedman; credit b: modification of work by NSO/AURA/NSF)"
    },
    "15.14": {
      file: "fig-15-14.jpg",
      title: "Sunspots Rotate Across Sun’s Surface",
      alt: "A row of small dated images of the Sun from late March to early April 2001, with a sunspot group moving from left to right across the disk, above a large view of the group on March 30.",
      caption: "Sunspots Rotate Across Sun’s Surface. This sequence of photographs of the Sun’s surface tracks the movement of sunspots across the visible hemisphere of the Sun. On March 30, 2001, this group of sunspots extended across an area about 13 times the diameter of Earth. This region produced many flares and coronal mass ejections. (credit: modification of work by SOHO/NASA/ESA)"
    },
    "15.15": {
      file: "fig-15-15.jpg",
      title: "Zeeman Effect",
      alt: "(left) A sunspot crossed by a thin vertical black line marking the spectrograph slit. (right) A green spectrum in which dark lines split apart where the slit crossed the sunspot.",
      caption: "Zeeman Effect. These photographs show how magnetic fields in sunspots are measured by means of the Zeeman effect. (left) The vertical black line indicates the position of the spectrograph slit through which light is passed to obtain the spectrum in (right). (credit: modification of work by NSO/AURA/NSF)"
    },
    "15.16": {
      file: "fig-15-16.jpg",
      title: "Magnetogram and Solar Cycle",
      alt: "Left: a gray disk of the Sun with black and white magnetic patches. Right: an arc of ten blue Sun disks from 1992 to 1999, the dark and light magnetic patches shrinking and then growing again.",
      caption: "Magnetogram and Solar Cycle. In the image on the left, called a magnetogram, we see the magnetic polarity of sunspots. The black areas are where the magnetism is pointing toward the Sun’s core, whereas the white regions are where it is pointing away from the core, toward us. This dramatic sequence on the right shows the activity cycle of the Sun. The 10 maps of the magnetic field on the surface of the Sun span a period of 7.5 years. The two magnetic polarities (N and S) of the magnetic field are shown against a blue disk as dark blue to black (N) and as light blue to white (S). The earliest image, taken on January 8, 1992, is at the lower left and was taken just after solar maximum. Each image, from left to right around the arc, was taken one-half to one year after the preceding one. The last image was taken on July 25, 1999, as the Sun was approaching the next solar maximum. Note a few striking patterns in the magnetic maps: the direction from white to black polarity in the Southern Hemisphere is opposite from that in the Northern Hemisphere. (credit left: modification of work by NASA/SDO; credit right: modification of work by NASA/SOHO)"
    },
    "15.17": {
      file: "fig-15-17.jpg",
      title: "Magnetic Field Lines Wind Up",
      alt: "Three drawings of the Sun in a row, left to right in time: straight north–south magnetic field lines get dragged sideways at the equator, stretch, and wrap around the Sun into loops.",
      caption: "Magnetic Field Lines Wind Up. Because the Sun spins faster at the equator than near the poles, the magnetic fields in the Sun tend to wind up as shown, and after a while make loops. This is an idealized diagram; the real situation is much more complex."
    },
    "15.18": {
      file: "fig-15-18.jpg",
      title: "Plages on the Sun",
      alt: "A purple image of the Sun dotted with bright, white, cloud-like patches around small dark sunspots.",
      caption: "Plages on the Sun. This image of the Sun was taken with a filter that transmits only the light of the spectral line produced by singly ionized calcium. The bright cloud-like regions are the plages. (credit: modification of work by NASA)"
    },
    "15.19": {
      file: "fig-15-19.jpg",
      title: "Prominences",
      alt: "(a) A giant arch of glowing orange gas rising from the edge of the Sun, with a tiny Earth for scale. (b) Four ultraviolet views of prominences looping above the solar limb.",
      caption: "Prominences. (a) This image of an eruptive prominence was taken in the light of singly ionized helium in the extreme ultraviolet part of the spectrum. The prominence is a particularly large one. An image of Earth is shown at the same scale for comparison. (b) A prominence is a huge cloud of relatively cool (about 60,000 K in this case), fairly dense gas suspended in the much hotter corona. These pictures, taken in ultraviolet, are color coded so that white corresponds to the hottest temperatures and dark red to cooler ones. The four images were taken, moving clockwise from the upper left, on May 15, 2001; March 28, 2000; January 18, 2000; and February 2, 2001. (credit a: modification of work by NASA/SOHO; credit b: modification of work by NASA/SDO)"
    },
    "15.20": {
      file: "fig-15-20.jpg",
      title: "Solar Flare",
      alt: "A purple-pink ultraviolet image of the Sun with glowing loops across its face and one very bright white spot on the right side.",
      caption: "Solar Flare. The bright white area seen on the right side of the Sun in this image from the Solar Dynamics Observatory spacecraft is a solar flare that was observed on June 25, 2015. (credit: NASA/SDO)"
    },
    "15.21": {
      file: "fig-15-21.jpg",
      title: "Flare and Coronal Mass Ejection",
      alt: "Four panels: (a) an orange Sun with a sunspot group, (b) a green far-ultraviolet Sun with a bright flare, (c) a coronagraph view with a bright cloud blasting outward, and (d) a blue coronagraph view with the cloud expanded far out.",
      caption: "Flare and Coronal Mass Ejection. This sequence of four images shows the evolution over time of a giant eruption on the Sun. (a) The event began at the location of a sunspot group, and (b) a flare is seen in far-ultraviolet light. (c) Fourteen hours later, a CME is seen blasting out into space. (d) Three hours later, this CME has expanded to form a giant cloud of particles escaping from the Sun and is beginning the journey out into the solar system. The white circle in (c) and (d) shows the diameter of the solar photosphere. The larger dark area shows where light from the Sun has been blocked out by a specially designed instrument to make it possible to see the faint emission from the corona. (credit a, b, c, d: modification of work by SOHO/EIT, SOHO/LASCO, SOHO/MDI (ESA & NASA))"
    },
    "15.22": {
      file: "fig-15-22.jpg",
      title: "Solar Cycle",
      alt: "Eleven orange ultraviolet images of the Sun arranged in an arc, labeled 1996 through 2006; the bright active regions grow toward the middle years and fade again at the ends.",
      caption: "Solar Cycle. This dramatic sequence of images taken from the SOHO satellite over a period of 11 years shows how active regions change during the solar cycle. The images were taken in the ultraviolet region of the spectrum and show that active regions on the Sun increase and decrease during the cycle. Sunspots are located in the cooler photosphere, beneath the hot gases shown in this image, and vary in phase with the emission from these hot gases—more sunspots and more emission from hot gases occur together. (credit: modification of work by ESA/NASA/SOHO)"
    },
    "15.23": {
      file: "fig-15-23.jpg",
      title: "Solar Active Region Observed at Different Heights in the Sun’s Atmosphere",
      alt: "Four side-by-side views of the same patch of the Sun: gold coronal loops at 171 angstroms, red at 304 angstroms, blue at 335 angstroms, and a gray magnetogram with black and white spots.",
      caption: "Solar Active Region Observed at Different Heights in the Sun’s Atmosphere. These four images of a solar flare on October 22, 2012, show from the left: light from the Sun at a wavelength of 171 angstroms, which shows the structure of loops of solar material in the corona; ultraviolet at 304 angstroms, which shows light from the region of the Sun’s atmosphere where flares originate; light at 335 angstroms, which highlights radiation from active regions in the corona; a magnetogram, which shows magnetically active regions on the Sun. Note how these different types of activity all occur above a sunspot region with a strong magnetic field. (credit: modification of work by NASA/SDO/Goddard)"
    },
    "15.24": {
      file: "fig-15-24.jpg",
      title: "International Space Station",
      alt: "The International Space Station, with its long golden solar-panel wings, floating above the blue Earth and white clouds.",
      caption: "International Space Station. The International Space Station is seen above Earth, as photographed in 2010 by the departing crew of the Space Shuttle Atlantis. (credit: NASA)"
    },
    "15.25": {
      file: "fig-15-25.jpg",
      title: "NOAA Space Weather Prediction Operations Center",
      alt: "A man speaking to a seated group in a room with a “Space Weather Prediction Center” sign and wall screens behind him.",
      caption: "NOAA Space Weather Prediction Operations Center. Bill Murtagh, a space weather forecaster, leads a workshop on preparedness for events like geomagnetic storms. (credit: modification of work by FEMA/Jerry DeFelice)"
    },
    "15.26": {
      file: "fig-15-26.jpg",
      title: "Numbers of Sunspots over Time",
      alt: "A graph titled Monthly Average Sunspot Numbers from about 1750 to the 2000s: a jagged line rising and falling in regular peaks about 11 years apart, with lower peaks in the early 1800s.",
      caption: "Numbers of Sunspots over Time. This diagram shows how the number of sunspots has changed with time since counts of the numbers of spots began to be recorded on a consistent scale. Note the low number of spots during the early years of the nineteenth century, the Little Maunder Minimum. (credit: modification of work by NASA/ARC)"
    }
  };

  /* ---------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "15.1",
      title: "The Structure and Composition of the Sun",
      minutes: 16,
      pages: "pp. 502–512",
      html:
        '<div data-figure="15.1"></div>' +
        '<p>&ldquo;Space weather&rdquo; sounds like a contradiction &mdash; how can there be weather in the vacuum ' +
        'of space? Yet great outbursts on the Sun (solar storms, in effect) can change Earth&rsquo;s atmosphere and ' +
        'magnetic field, and sometimes cause serious problems on the ground. This chapter explores the Sun&rsquo;s ' +
        'outer layers, how they change, and how the Sun affects Earth. Studying the Sun also teaches us about stars ' +
        'in general: in astronomical terms it is a rather <strong>ordinary star</strong> &mdash; not unusually hot or ' +
        'cold, old or young, large or small. We are lucky it is typical.</p>' +
        '<p>The Sun, like all stars, is an enormous ball of extremely hot, mostly <strong>ionized gas</strong>, ' +
        'shining under its own power. And we do mean enormous: <strong>109 Earths</strong> could fit side by side ' +
        'across it, and it has enough volume to hold about <strong>1.3 million Earths</strong>. It has no solid ' +
        'surface or solid core (Figure 15.2), but it can be described as a series of layers, rather like an ' +
        'onion.</p>' +
        '<div data-figure="15.2"></div>' +
        '<p>Some basic facts about the Sun (the book&rsquo;s Table 15.1):</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Characteristic</th><th>How found</th><th>Value</th></tr>' +
        '<tr><td>Mean distance</td><td>Radar reflection from planets</td><td>1 AU (149,597,892 km)</td></tr>' +
        '<tr><td>Maximum distance from Earth</td><td></td><td>1.521 &times; 10<sup>8</sup> km</td></tr>' +
        '<tr><td>Minimum distance from Earth</td><td></td><td>1.471 &times; 10<sup>8</sup> km</td></tr>' +
        '<tr><td>Mass</td><td>Orbit of Earth</td><td>333,400 Earth masses (1.99 &times; 10<sup>30</sup> kg)</td></tr>' +
        '<tr><td>Mean angular diameter</td><td>Direct measure</td><td>31&prime;59&Prime;.3</td></tr>' +
        '<tr><td>Diameter of photosphere</td><td>Angular size and distance</td><td>109.3 &times; Earth diameter (1.39 &times; 10<sup>6</sup> km)</td></tr>' +
        '<tr><td>Mean density</td><td>Mass/volume</td><td>1.41 g/cm<sup>3</sup> (1400 kg/m<sup>3</sup>)</td></tr>' +
        '<tr><td>Gravitational acceleration at photosphere (surface gravity)</td><td>GM/R<sup>2</sup></td><td>27.9 &times; Earth surface gravity = 273 m/s<sup>2</sup></td></tr>' +
        '<tr><td>Solar constant</td><td>Instrument sensitive to radiation at all wavelengths</td><td>1370 W/m<sup>2</sup></td></tr>' +
        '<tr><td>Luminosity</td><td>Solar constant &times; area of spherical surface 1 AU in radius</td><td>3.8 &times; 10<sup>26</sup> W</td></tr>' +
        '<tr><td>Spectral class</td><td>Spectrum</td><td>G2V</td></tr>' +
        '<tr><td>Effective temperature</td><td>Derived from luminosity and radius of the Sun</td><td>5800 K</td></tr>' +
        '<tr><td>Rotation period at equator</td><td>Sunspots and Doppler shift in spectra taken at the edge of the Sun</td><td>24 days 16 hours</td></tr>' +
        '<tr><td>Inclination of equator to ecliptic</td><td>Motions of sunspots</td><td>7&deg;10&prime;.5</td></tr>' +
        '</tbody></table></div>' +
        '<h4>What the Sun is made of</h4>' +
        '<p>As we learned in Radiation and Spectra, a star&rsquo;s absorption-line spectrum tells us which elements ' +
        'are present. The Sun contains the <strong>same elements as Earth, but not in the same proportions</strong>. ' +
        'About <strong>73%</strong> of the Sun&rsquo;s mass is <strong>hydrogen</strong> and another ' +
        '<strong>25%</strong> is <strong>helium</strong>. Everything else &mdash; including the carbon, oxygen, and ' +
        'nitrogen in our own bodies &mdash; makes up only <strong>2%</strong>. Compare Earth&rsquo;s crust, where ' +
        'the three most abundant elements are oxygen, silicon, and aluminum. The Sun&rsquo;s makeup, though not like ' +
        'our planet&rsquo;s, is quite typical of stars in general.</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Element</th><th>Percentage by number of atoms</th><th>Percentage by mass</th></tr>' +
        '<tr><td>Hydrogen</td><td>92.0</td><td>73.4</td></tr>' +
        '<tr><td>Helium</td><td>7.8</td><td>25.0</td></tr>' +
        '<tr><td>Carbon</td><td>0.02</td><td>0.20</td></tr>' +
        '<tr><td>Nitrogen</td><td>0.008</td><td>0.09</td></tr>' +
        '<tr><td>Oxygen</td><td>0.06</td><td>0.80</td></tr>' +
        '<tr><td>Neon</td><td>0.01</td><td>0.16</td></tr>' +
        '<tr><td>Magnesium</td><td>0.003</td><td>0.06</td></tr>' +
        '<tr><td>Silicon</td><td>0.004</td><td>0.09</td></tr>' +
        '<tr><td>Sulfur</td><td>0.002</td><td>0.05</td></tr>' +
        '<tr><td>Iron</td><td>0.003</td><td>0.14</td></tr>' +
        '</tbody></table></div>' +
        '<p>(That&rsquo;s the book&rsquo;s Table 15.2 &mdash; the 10 most abundant gases in the Sun&rsquo;s visible ' +
        'surface layer.)</p>' +
        '<p>That the Sun and stars are made mostly of hydrogen and helium was first shown in a brilliant 1925 thesis ' +
        'by <strong>Cecilia Payne-Gaposchkin</strong>, the first woman to get a PhD in astronomy in the United States ' +
        '(Figure 15.3). The idea was so unexpected that she was persuaded her analysis must be wrong; she wrote, ' +
        '&ldquo;The enormous abundance derived for these elements in the stellar atmosphere is almost certainly not ' +
        'real.&rdquo; Before her work, everyone assumed the Sun and stars would be much like Earth. It was ' +
        '<strong>3 years</strong> after her thesis that other studies proved beyond doubt that the enormous abundance ' +
        'of hydrogen and helium is real. Even scientists sometimes find it hard to accept new ideas that disagree with ' +
        'what everyone &ldquo;knows.&rdquo; (And the Sun&rsquo;s makeup is much more typical of the universe than the ' +
        'odd concentration of heavy elements in our planet.)</p>' +
        '<div data-figure="15.3"></div>' +
        '<p>The Sun is so hot that no matter can survive as a liquid or solid &mdash; everything is gas, mostly ' +
        'single atoms with a few molecules. Many atoms are <strong>ionized</strong> (stripped of one or more ' +
        'electrons), so the Sun is full of free electrons and positive ions &mdash; an electrically charged ' +
        'environment. Scientists call such a hot ionized gas a <span class="term">plasma</span>.</p>' +
        '<p>In the nineteenth century, scientists saw a never-before-seen spectral line at <strong>530.3 ' +
        'nanometers</strong> in the Sun&rsquo;s outer atmosphere, the corona. They assumed it came from a new element ' +
        'and named it &ldquo;coronium.&rdquo; Sixty years later, astronomers found it was really ' +
        '<strong>highly ionized iron</strong> &mdash; iron with <strong>13</strong> of its electrons stripped off. ' +
        'That is how we first learned the Sun&rsquo;s atmosphere is <strong>more than a million degrees</strong>.</p>' +
        '<h4>The layers beneath the visible surface</h4>' +
        '<p>Figure 15.4 shows what the Sun would look like if we could see every part of it. Each layer plays a part ' +
        'in producing the energy the Sun finally gives off. Working outward:</p>' +
        '<ul>' +
        '<li>The <strong>core</strong> is extremely dense and is the source of <strong>all</strong> the Sun&rsquo;s ' +
        'energy: nuclear energy is released there (Chapter 16). It is about <strong>20%</strong> of the size of the ' +
        'solar interior and about <strong>15 million K</strong> &mdash; the hottest part of the Sun.</li>' +
        '<li>The <strong>radiative zone</strong>, named for how energy crosses it, runs from about ' +
        '<strong>25%</strong> to about <strong>70%</strong> of the way to the surface. Matter is so dense here that a ' +
        'photon can&rsquo;t go far before hitting a particle, changing direction, and losing some energy &mdash; so ' +
        'light moves through it <strong>very slowly</strong>.</li>' +
        '<li>The <strong>convective zone</strong> is the outermost layer of the interior, about <strong>200,000 ' +
        'km</strong> deep. Giant convection cells carry energy to the surface, like a pot of boiling oatmeal: hot ' +
        'plasma bubbles up from the bottom, loses heat to space, cools, and sinks back down.</li>' +
        '</ul>' +
        '<div data-figure="15.4"></div>' +
        '<div data-diagram="sun-layers"></div>' +
        '<h4>The photosphere: the visible surface</h4>' +
        '<p>On a smoggy day, Earth&rsquo;s air can become opaque so you can&rsquo;t see past a certain point. ' +
        'Something similar happens in the Sun: its outer atmosphere is transparent, but deeper in, our view is ' +
        'blocked. The <span class="term">photosphere</span> (Greek for &ldquo;light sphere&rdquo;) is the layer ' +
        'where the Sun becomes opaque &mdash; the boundary past which we cannot see (Figure 15.5). The gas goes from ' +
        'almost perfectly transparent to almost completely opaque in just over <strong>400 km</strong>. When ' +
        'astronomers speak of the Sun&rsquo;s &ldquo;diameter,&rdquo; they mean the region inside the ' +
        'photosphere.</p>' +
        '<div data-figure="15.5"></div>' +
        '<p>The energy leaving the photosphere was made deep inside, as photons that work their way slowly outward. ' +
        'We can only see photons emitted in the photosphere, where atoms are thin enough for photons to finally ' +
        'escape without hitting another atom or ion. The book&rsquo;s analogy: you&rsquo;re in the middle of a ' +
        'packed campus rally and a friend calls you to meet her at the edge. You can only move a short way before ' +
        'bumping someone and changing direction, and she can&rsquo;t see you until you get very close to the edge. ' +
        'Photons in the Sun are the same &mdash; bumping, turning, and becoming visible only near the surface.</p>' +
        '<p>The photosphere looks sharp only from far away. Falling into the Sun, you would feel no surface &mdash; ' +
        'just gas slowly getting denser, like skydiving through a cloud (except you&rsquo;d be vaporized long before ' +
        'reaching it). It isn&rsquo;t dense, either: at a typical point the pressure is less than <strong>10%</strong> ' +
        'of Earth&rsquo;s at sea level, and the density is about <strong>one ten-thousandth</strong> of our air at ' +
        'sea level.</p>' +
        '<p>Through a telescope the photosphere looks mottled, like grains of rice spilled on a dark tablecloth or a ' +
        'pot of boiling oatmeal. This is <span class="term">granulation</span> (Figure 15.6). <strong>Granules</strong> ' +
        'are typically <strong>700 to 1000 km</strong> across (about the width of Texas): bright areas ringed by ' +
        'narrow, darker, cooler lanes. Each lasts only <strong>5 to 10 minutes</strong>. Bigger ' +
        '<strong>supergranules</strong> are about <strong>35,000 km</strong> across (about two Earths) and last about ' +
        '<strong>24 hours</strong>.</p>' +
        '<div data-figure="15.6"></div>' +
        '<p>Doppler shifts show what granules are: the bright ones are columns of <strong>hotter gas rising</strong> ' +
        'at <strong>2 to 3 km/s</strong> from below. At the photosphere the gas spreads out, cools, and sinks again ' +
        'in the darker lanes. Granule centers are <strong>50 to 100 K</strong> hotter than the lanes between them.</p>' +
        '<h4>The chromosphere</h4>' +
        '<p>The Sun&rsquo;s gases extend far beyond the photosphere (Figure 15.7), but they are transparent to most ' +
        'visible light and give off little of their own, so they are hard to see. The layer just above the ' +
        'photosphere is the <span class="term">chromosphere</span>. Until this century it could be seen only during ' +
        'a total solar eclipse, when the Moon hides the photosphere. Seventeenth-century observers described a narrow ' +
        'red &ldquo;streak&rdquo; or &ldquo;fringe&rdquo; around the Moon&rsquo;s edge; the name means ' +
        '&ldquo;colored sphere.&rdquo;</p>' +
        '<div data-figure="15.7"></div>' +
        '<p>The chromosphere is about <strong>2000 to 3000 km</strong> thick. Its spectrum is made of bright ' +
        '<strong>emission lines</strong>, so it is hot gas glowing at particular wavelengths. Its red color comes from ' +
        'one of the strongest of those lines: the bright red line of <strong>hydrogen</strong>.</p>' +
        '<p>In <strong>1868</strong>, the chromosphere&rsquo;s spectrum showed a yellow line that matched no element ' +
        'known on Earth. Scientists named the new element <strong>helium</strong>, after <em>helios</em>, Greek for ' +
        '&ldquo;Sun.&rdquo; Helium wasn&rsquo;t found on Earth until <strong>1895</strong>. Today you know it from ' +
        'balloons, but it is the second-most abundant element in the universe.</p>' +
        '<p>Surprise: the chromosphere is about <strong>10,000 K</strong> &mdash; <strong>hotter</strong> than the ' +
        'photosphere below it. Everywhere else we know, temperature falls as you move away from the heat source.</p>' +
        '<h4>The transition region</h4>' +
        '<p>The rise doesn&rsquo;t stop. Above the chromosphere, the temperature climbs from 10,000 K to nearly ' +
        '<strong>a million degrees</strong>. The hottest part of the atmosphere, at a million degrees or more, is the ' +
        '<span class="term">corona</span>, and the zone of rapid rise between them is the ' +
        '<span class="term">transition region</span> &mdash; probably only a few tens of kilometers thick. Figure 15.8 ' +
        'graphs the change.</p>' +
        '<div data-figure="15.8"></div>' +
        '<div data-diagram="atmosphere-temp"></div>' +
        '<p>In <strong>2013</strong>, NASA launched the <strong>Interface Region Imaging Spectrograph (IRIS)</strong> ' +
        'to study how and why this sharp rise happens. It is the first space mission able to take sharp images of ' +
        'features across this whole temperature range and watch how they change (Figure 15.9).</p>' +
        '<div data-figure="15.9"></div>' +
        '<p>Figures 15.4 and 15.8 make the Sun look like an onion of smooth shells, and for a long time astronomers ' +
        'did think of it that way. The layers &mdash; photosphere, chromosphere, transition region, corona &mdash; ' +
        'still describe the big picture fairly well, but the real atmosphere is more complicated, with hot and cool ' +
        'regions mixed. For example, clouds of <strong>carbon monoxide</strong> colder than <strong>4000 K</strong> ' +
        'have been found at the same height as the much hotter chromosphere.</p>' +
        '<h4>The corona</h4>' +
        '<p>The outermost part of the Sun&rsquo;s atmosphere is the <span class="term">corona</span>. Like the ' +
        'chromosphere it was first seen during total eclipses (Figure 15.10), but it has been known for many ' +
        'centuries: the Roman historian <strong>Plutarch</strong> mentioned it, and <strong>Kepler</strong> discussed ' +
        'it in some detail. It reaches <strong>millions of kilometers</strong> above the photosphere and gives off ' +
        'about <strong>half as much light as the full moon</strong> &mdash; but the photosphere&rsquo;s brilliance ' +
        'hides it, the way city lights hide faint stars. Besides eclipses, it is easily observed from spacecraft, and ' +
        'its brighter parts can be photographed with a <strong>coronagraph</strong>, which blocks the Sun&rsquo;s ' +
        'glare with an <strong>occulting disk</strong> (a circular piece of material held just in front of the ' +
        'Sun).</p>' +
        '<div data-figure="15.10"></div>' +
        '<p>The corona is very thin. At its bottom there are only about <strong>10<sup>9</sup></strong> atoms per ' +
        'cubic centimeter, compared with about 10<sup>16</sup> in the upper photosphere and 10<sup>19</sup> molecules ' +
        'per cubic centimeter in Earth&rsquo;s air at sea level. Higher up it thins rapidly, becoming a high vacuum ' +
        'by Earth laboratory standards.</p>' +
        '<p class="callout-inline"><strong>Link to learning: touching the Sun.</strong> In December <strong>2024</strong>, ' +
        'NASA&rsquo;s <strong>Parker Solar Probe</strong> became the first human-built object to fly through the ' +
        'Sun&rsquo;s outer corona and take measurements, coming within <strong>6 million km</strong> of the ' +
        'photosphere. A special heat shield lets it survive. The Sun&rsquo;s gravity sped it up to ' +
        '<strong>692,000 km/hour</strong>, making it the fastest vehicle humans have ever flown.</p>' +
        '<h4>The solar wind</h4>' +
        '<p>One of the most remarkable discoveries: the Sun&rsquo;s atmosphere produces a stream of charged ' +
        'particles (mainly protons and electrons) called the <span class="term">solar wind</span>. It flows outward ' +
        'at about <strong>400 km/s</strong> (almost 1 million miles per hour)! It exists because coronal gas is so ' +
        'hot and fast that solar gravity can&rsquo;t hold it back. (It was actually discovered by how it pushes on the ' +
        'charged tails of comets, the way wind socks or curtains flutter in a breeze.) The wind is extremely thin, but ' +
        'the Sun&rsquo;s surface is enormous, so the Sun loses about <strong>1&ndash;2 million tons</strong> of ' +
        'material each second &mdash; still trivial compared with its mass.</p>' +
        '<p>In visible light the corona looks fairly smooth, but X-ray and extreme-ultraviolet pictures show loops, ' +
        'plumes, and bright and dark regions. Large dark regions that are relatively cool and quiet are ' +
        '<span class="term">coronal holes</span> (Figure 15.11). There, magnetic field lines stretch far out into ' +
        'space instead of looping back, so gas can stream away unhindered. The solar wind comes mainly from coronal ' +
        'holes; hot coronal gas sits mainly where magnetic fields have trapped and concentrated it.</p>' +
        '<div data-figure="15.11"></div>' +
        '<p>Earth&rsquo;s atmosphere and magnetic field protect us from the solar wind to some degree. But the field ' +
        'lines enter Earth at the north and south magnetic poles, and there, charged particles accelerated by the ' +
        'solar wind can follow them down into our air. Striking air molecules, they make them glow in beautiful ' +
        'curtains of light: the <span class="term">auroras</span>, or northern and southern lights (Figure 15.12).</p>' +
        '<div data-figure="15.12"></div>',
      keyIdeas: [
        "The Sun is an ordinary star: an enormous ball of hot, mostly ionized gas (plasma). 109 Earths fit across it, and it could hold about 1.3 million Earths.",
        "By mass the Sun is about 73% hydrogen, 25% helium, and only 2% everything else — very different from Earth’s crust, but typical of stars. Cecilia Payne-Gaposchkin showed this in 1925.",
        "Inside: the core (about 15 million K, the source of all the Sun’s energy), the radiative zone (25% to 70% of the way out, where light crawls outward), and the convective zone (about 200,000 km deep, boiling like oatmeal).",
        "The photosphere is the visible surface — where the Sun turns opaque, just over 400 km thick, about 5800 K. Its granulation is rising hot gas; granules are 700–1000 km across and last 5–10 minutes.",
        "Above it, the temperature rises instead of falling: chromosphere about 10,000 K (red from hydrogen; helium was found here in 1868), a thin transition region, then the corona at a million degrees or more.",
        "The corona is very thin and only as bright as half the full moon; we see it during total eclipses, from spacecraft, or with a coronagraph.",
        "The solar wind — mainly protons and electrons at about 400 km/s — flows mostly from coronal holes. Near Earth’s magnetic poles its particles make the auroras."
      ],
      selfCheck: [
        { q: "What makes up most of the Sun, and how does that compare with Earth?",
          a: "About 73% of the Sun’s mass is hydrogen and 25% is helium; everything else is only 2%. Earth’s crust is mostly oxygen, silicon, and aluminum — but the Sun’s makeup is typical of stars and the universe." },
        { q: "Name the three layers of the solar interior, from the center out.",
          a: "The core (where the energy is made, about 15 million K), the radiative zone (energy carried slowly by radiation, from about 25% to 70% of the way out), and the convective zone (about 200,000 km deep, carried by rising and sinking gas)." },
        { q: "Why do we see a sharp “surface” on the Sun if it’s made of gas?",
          a: "The photosphere is where the gas goes from almost transparent to almost opaque in just over 400 km. Photons from deeper down can’t escape directly, so this thin layer looks like an edge from far away." },
        { q: "What is granulation?",
          a: "The rice-grain pattern on the photosphere. Bright granules are columns of hotter gas rising at 2–3 km/s; the gas spreads, cools, and sinks in the darker lanes between them." },
        { q: "What is surprising about the temperatures of the chromosphere and corona?",
          a: "They are hotter than the photosphere below them — about 10,000 K for the chromosphere and a million degrees or more for the corona — even though they are farther from the Sun’s center." },
        { q: "Where does most of the solar wind come from, and why there?",
          a: "From coronal holes, where magnetic field lines stretch far out into space instead of looping back, so gas can stream away unhindered." }
      ]
    },
    {
      id: "15.2",
      title: "The Solar Cycle",
      minutes: 10,
      pages: "pp. 512–517",
      html:
        '<p>Before the telescope, the Sun was thought to be unchanging and perfect. We now know it is always ' +
        'changing: its surface is a seething, bubbling cauldron of hot gas. Dark, cool areas come and go; vast plumes ' +
        'of gas erupt into the chromosphere and corona; and now and then giant explosions send charged particles and ' +
        'energy hurtling toward Earth, where they can cause power outages and other serious effects.</p>' +
        '<h4>Sunspots</h4>' +
        '<p>The first evidence that the Sun changes came from <span class="term">sunspots</span>: large, dark ' +
        'features on the surface caused by increased <strong>magnetic activity</strong>. They look dark because they ' +
        'are typically about <strong>3800 K</strong>, while the bright regions around them are about ' +
        '<strong>5800 K</strong> (Figure 15.13). Now and then a spot is big enough to see with the unaided eye, and ' +
        'records go back more than a thousand years from people who noticed them when haze or mist dimmed the Sun. ' +
        '(But looking at the Sun, even briefly, can cause <strong>permanent eye damage</strong> &mdash; never observe ' +
        'it without careful instructions or proper filters.)</p>' +
        '<div data-figure="15.13"></div>' +
        '<p>Sunspots are cooler, but still hotter than the surfaces of many stars. Removed from the Sun, they would ' +
        'shine brightly; they look dark only next to the hotter photosphere. Individual spots last from a few hours ' +
        'to a few months. A spot that lasts usually has two parts: a darker core, the <strong>umbra</strong>, and a ' +
        'less dark surrounding region, the <strong>penumbra</strong>. Many spots become much larger than Earth, and a ' +
        'few, like the largest in Figure 15.13, have reached over <strong>140,000 km</strong> across. Spots often come ' +
        'in groups of 2 to 20 or more; the largest groups can have over 100. Like storms on Earth, they drift slowly ' +
        'compared with the Sun&rsquo;s rotation.</p>' +
        '<p>By tracking sunspots as the turning Sun carried them across its disk (Figure 15.14), <strong>Galileo</strong>, ' +
        'in <strong>1612</strong>, showed that the Sun rotates in about <strong>1 month</strong>, west to east like the ' +
        'planets&rsquo; orbits. But the Sun is a gas and doesn&rsquo;t have to turn rigidly like solid Earth. Its ' +
        'rotation period is about <strong>25 days at the equator</strong>, <strong>28 days at latitude 40&deg;</strong>, ' +
        'and <strong>36 days at latitude 80&deg;</strong>. We call this ' +
        '<span class="term">differential rotation</span>.</p>' +
        '<div data-figure="15.14"></div>' +
        '<div data-diagram="differential-rotation"></div>' +
        '<h4>The sunspot cycle</h4>' +
        '<p>From <strong>1826 to 1850</strong>, <strong>Heinrich Schwabe</strong>, a German pharmacist and amateur ' +
        'astronomer, recorded the number of sunspots every day. He was actually hunting for a planet inside ' +
        'Mercury&rsquo;s orbit, hoping to catch its dark silhouette crossing the Sun. He never found it, but he ' +
        'found something more important: the <span class="term">sunspot cycle</span>. The number of spots rises and ' +
        'falls in cycles about a decade long.</p>' +
        '<p>Individual spots are short-lived, but the total number is much greater at <strong>sunspot maximum</strong> ' +
        'than at <strong>sunspot minimum</strong>. Maxima come every <strong>11 years</strong> on average, though the ' +
        'gap has been as short as <strong>9</strong> and as long as <strong>14</strong> years. At maximum, more than ' +
        '<strong>100</strong> spots can often be seen at once &mdash; yet less than <strong>one-half of one ' +
        'percent</strong> of the surface is covered (Figure 15.22). At minimum, sometimes there are none. The Sun is ' +
        'reaching its next maximum in the <strong>2024&ndash;25</strong> timeframe.</p>' +
        '<h4>Magnetism and the solar cycle</h4>' +
        '<p>Why does the Sun change so regularly? Astronomers now understand that its changing <strong>magnetic ' +
        'field</strong> drives solar activity. The field is measured using the <strong>Zeeman effect</strong>. ' +
        'Recall that spectral lines form when electrons jump between precisely defined energy levels, making sharp, ' +
        'narrow lines. In a strong magnetic field, each energy level splits into several very close levels, separated ' +
        'in proportion to the field&rsquo;s strength. So each line becomes a set of closely spaced lines. This ' +
        'splitting is the Zeeman effect, after the Dutch scientist who discovered it in <strong>1896</strong>.</p>' +
        '<p>The Zeeman effect shows sunspot regions have <strong>strong magnetic fields</strong> (Figure 15.15). Magnets ' +
        'always have a north and a south pole. When spots come in pairs (or groups with two main spots), one usually ' +
        'has north-seeking polarity and the other the opposite. And during a given cycle, the <strong>leading ' +
        'spots</strong> of pairs in the <strong>Northern Hemisphere</strong> all tend to have one polarity, while ' +
        'those in the <strong>Southern Hemisphere</strong> have the opposite.</p>' +
        '<div data-figure="15.15"></div>' +
        '<p>In the next cycle, the polarity of the leading spots <strong>reverses</strong> in each hemisphere. So, ' +
        'strictly speaking, the cycle doesn&rsquo;t repeat its magnetic pattern until <strong>two 11-year ' +
        'cycles</strong> have passed &mdash; a <strong>22-year</strong> magnetic cycle. A map of the Sun&rsquo;s ' +
        'magnetic fields, called a <strong>magnetogram</strong>, shows the link between sunspots and magnetism ' +
        '(Figure 15.16).</p>' +
        '<div data-figure="15.16"></div>' +
        '<div data-diagram="sunspot-cycle"></div>' +
        '<p>Why is the Sun such a strong, complicated magnet? Its <strong>dynamo</strong> makes the field. On Earth, ' +
        'a dynamo is a machine that turns kinetic energy (energy of motion) into electricity &mdash; as in power plants ' +
        'where wind or flowing water spins turbines. In the Sun, the motion is the churning of turbulent layers of ' +
        'ionized gas inside. These make electric currents (moving electrons), which in turn make magnetic fields. Most ' +
        'researchers agree the solar dynamo is in the <strong>convection zone</strong>, or at the boundary between it ' +
        'and the radiative zone. As the fields interact, they break, reconnect, and rise through the surface.</p>' +
        '<p>Even with good observations, building a physical model of something as complicated as the Sun is very ' +
        'hard, and there is not yet a generally accepted model of what controls the cycle. Calculations do show that ' +
        '<strong>differential rotation</strong> and convection just below the surface can twist and distort the ' +
        'magnetic fields, making them grow, decay, and regenerate with <strong>opposite polarity</strong> about every ' +
        '11 years. As the fields strengthen near maximum, they rise to the surface as <strong>loops</strong>; when a ' +
        'large loop breaks through, it creates sunspot activity (Figure 15.17).</p>' +
        '<div data-figure="15.17"></div>' +
        '<p>Magnetic loops explain why the leading and trailing spots of a pair have <strong>opposite ' +
        'polarity</strong>: each spot is one end of the loop. Magnetism also explains why spots are cooler. The ' +
        'magnetic forces resist the rising columns of hot gas that carry heat up by convection; with that heat flow ' +
        'blocked, the surface cools, and we see a darker, cooler sunspot.</p>' +
        '<p>Researchers are still working out why the fields are so strong, why the polarity flips every cycle, why ' +
        'cycle lengths vary, and why events like the <strong>Maunder Minimum</strong> occur.</p>',
      keyIdeas: [
        "Sunspots are dark, cooler (about 3800 K vs. 5800 K) regions caused by strong magnetism. A developed spot has a dark umbra inside a lighter penumbra; some reach over 140,000 km across.",
        "Galileo (1612) used sunspots to show the Sun rotates in about a month. Being gas, it has differential rotation: about 25 days at the equator, 28 at 40°, 36 at 80°.",
        "Heinrich Schwabe (1826–1850) discovered the sunspot cycle. Maxima come every 11 years on average (9 to 14), with more than 100 spots — still under half a percent of the surface.",
        "The Zeeman effect (splitting of spectral lines in a magnetic field, 1896) shows sunspots have strong magnetic fields.",
        "In one cycle, leading spots in the north share one polarity and in the south the opposite; the next cycle they flip, so the full magnetic cycle is 22 years.",
        "The solar dynamo — churning ionized gas in or at the base of the convection zone — makes the field. Differential rotation winds field lines into loops; where a loop breaks the surface, its two ends are a pair of opposite-polarity spots.",
        "Spots are cool because their strong magnetic fields block the convection that carries heat to the surface."
      ],
      selfCheck: [
        { q: "Why do sunspots look dark?",
          a: "They are cooler — about 3800 K compared with about 5800 K for the surrounding photosphere. They look dark only by contrast; removed from the Sun, they would shine brightly." },
        { q: "How did Galileo show the Sun rotates, and what did later observations add?",
          a: "In 1612 he tracked sunspots as they moved across the disk and found a rotation period of about a month. Later observations showed differential rotation: about 25 days at the equator, 28 days at 40°, and 36 days at 80°." },
        { q: "Who discovered the sunspot cycle, and how long is it?",
          a: "Heinrich Schwabe, a German pharmacist, by counting spots daily from 1826 to 1850. Maxima come every 11 years on average, ranging from 9 to 14 years." },
        { q: "What is the Zeeman effect and what does it tell us about sunspots?",
          a: "It is the splitting of a spectral line into several closely spaced lines in a magnetic field, with the spacing set by the field strength. It shows that sunspots have strong magnetic fields." },
        { q: "Why is the Sun’s magnetic cycle 22 years rather than 11?",
          a: "In each 11-year cycle the leading spots in the Northern and Southern Hemispheres have opposite polarities, and in the next cycle those polarities reverse. The magnetic pattern only repeats after two cycles." },
        { q: "Why are sunspots cooler than their surroundings?",
          a: "Their strong magnetic fields resist the rising columns of hot gas that carry heat up by convection, so less heat reaches that part of the surface and it cools." }
      ]
    },
    {
      id: "15.3",
      title: "Solar Activity above the Photosphere",
      minutes: 7,
      pages: "pp. 517–521",
      html:
        '<p>Sunspots aren&rsquo;t the only things that change with the solar cycle &mdash; the chromosphere and ' +
        'corona change dramatically too. To watch the chromosphere, we observe emission lines from elements such as ' +
        '<strong>hydrogen</strong> and <strong>calcium</strong>, which shine at that layer&rsquo;s temperatures. The ' +
        'hot corona is studied with <strong>X-rays</strong>, <strong>extreme ultraviolet</strong>, and other ' +
        'high-energy wavelengths.</p>' +
        '<h4>Plages and prominences</h4>' +
        '<p>Astronomers routinely photograph the Sun through filters that pass only the wavelengths of these ' +
        'emission lines. The pictures show bright &ldquo;clouds&rdquo; in the chromosphere around sunspots, called ' +
        '<span class="term">plages</span> (Figure 15.18): regions hotter and denser than their surroundings. Plages ' +
        'contain all the Sun&rsquo;s elements &mdash; hydrogen and calcium are just the ones whose lines are bright and ' +
        'easy to observe.</p>' +
        '<div data-figure="15.18"></div>' +
        '<p>Higher up are spectacular <span class="term">prominences</span> (Figure 15.19), which usually start near ' +
        'sunspots. Eclipse watchers often see them as red features rising above the hidden Sun into the corona.</p>' +
        '<ul>' +
        '<li><strong>Quiescent prominences</strong> are graceful loops of plasma that can stay nearly stable for many ' +
        'hours or even days.</li>' +
        '<li>The relatively rare <strong>eruptive prominences</strong> seem to send matter up into the corona at high ' +
        'speed. Some have reached more than <strong>1 million km</strong> above the photosphere &mdash; Earth would be ' +
        'completely lost inside one.</li>' +
        '<li>The most active, <strong>surge prominences</strong>, may move as fast as <strong>1300 km/s</strong> ' +
        '(almost 3 million miles per hour).</li>' +
        '</ul>' +
        '<div data-figure="15.19"></div>' +
        '<h4>Flares and coronal mass ejections</h4>' +
        '<p>The most violent event on the Sun&rsquo;s surface is a rapid eruption called a ' +
        '<span class="term">solar flare</span> (Figure 15.20). A typical flare lasts <strong>5 to 10 minutes</strong> ' +
        'and releases the energy of perhaps <strong>a million hydrogen bombs</strong>. The largest last several hours ' +
        'and give off enough energy to power the entire United States, at its current rate of electricity use, for ' +
        '<strong>100,000 years</strong>. Near sunspot maximum, small flares happen several times a day and major ones ' +
        'every few weeks.</p>' +
        '<div data-figure="15.20"></div>' +
        '<p>Flares are often seen in the red light of hydrogen, but visible light is only a tiny part of their ' +
        'energy. At the moment of the explosion, the material is heated as high as <strong>10 million K</strong>, ' +
        'releasing a flood of <strong>X-rays and ultraviolet</strong> radiation. Flares seem to happen when magnetic ' +
        'fields pointing in <strong>opposite directions</strong> interact and destroy each other, releasing energy ' +
        '&mdash; much as a stretched rubber band releases energy when it breaks.</p>' +
        '<p>What makes flares different is that their magnetic interactions fill a large volume of the corona and ' +
        'release a tremendous amount of radiation. Sometimes immense amounts of coronal material &mdash; mainly ' +
        'protons and electrons &mdash; are also thrown into space at <strong>500&ndash;1000 km/s</strong>. That is a ' +
        '<span class="term">coronal mass ejection (CME)</span>, which can affect Earth in several ways (Section 15.4) ' +
        '(Figure 15.21).</p>' +
        '<div data-figure="15.21"></div>' +
        '<div data-diagram="solar-activity"></div>' +
        '<h4>Active regions</h4>' +
        '<p>Putting it together: sunspots, flares, and bright regions in the chromosphere and corona tend to occur ' +
        '<strong>together</strong>, in the same place and at the same time. They share similar latitudes and ' +
        'longitudes but sit at different heights in the atmosphere, and since they occur together, they all vary with ' +
        'the sunspot cycle. Flares are more likely near sunspot maximum, and the corona is much more conspicuous then ' +
        '(Figure 15.22).</p>' +
        '<div data-figure="15.22"></div>' +
        '<p>A place on the Sun where several of these phenomena are seen is an <span class="term">active ' +
        'region</span> (Figure 15.23). Active regions are always linked with <strong>strong magnetic ' +
        'fields</strong>.</p>' +
        '<div data-figure="15.23"></div>',
      keyIdeas: [
        "The chromosphere is studied through emission lines of hydrogen and calcium; the corona through X-rays and extreme ultraviolet.",
        "Plages are bright, hotter, denser “clouds” in the chromosphere around sunspots.",
        "Prominences rise into the corona, usually near sunspots: quiescent ones are stable loops lasting hours or days; eruptive ones can reach over 1 million km high; surge prominences move up to 1300 km/s.",
        "A solar flare is the most violent event on the Sun: typically 5–10 minutes, about a million hydrogen bombs’ worth of energy, heating material to 10 million K and releasing X-rays and ultraviolet. It happens when opposite magnetic fields destroy each other, like a breaking rubber band.",
        "A coronal mass ejection (CME) throws coronal material — mainly protons and electrons — into space at 500–1000 km/s.",
        "Sunspots, plages, prominences, flares, and CMEs occur together in active regions with strong magnetic fields, at different heights, and all vary with the sunspot cycle."
      ],
      selfCheck: [
        { q: "What is a plage, and why do we see it in hydrogen and calcium light?",
          a: "A bright, hotter, denser region of the chromosphere around sunspots. It contains all the Sun’s elements, but hydrogen and calcium make bright lines that are easy to photograph through special filters." },
        { q: "How do quiescent, eruptive, and surge prominences differ?",
          a: "Quiescent prominences are graceful loops that stay nearly stable for hours or days. Eruptive prominences send matter up into the corona fast, sometimes more than 1 million km high. Surge prominences are the most active, moving up to 1300 km/s." },
        { q: "What causes a solar flare?",
          a: "Magnetic fields pointing in opposite directions interact and destroy each other, releasing stored energy — like a stretched rubber band snapping." },
        { q: "What is a coronal mass ejection?",
          a: "An eruption that throws immense amounts of coronal material — mainly protons and electrons — into interplanetary space at 500–1000 km/s." },
        { q: "What is an active region?",
          a: "A place on the Sun where sunspots, plages, prominences, flares, and CMEs occur together, at different heights above the same spot. Active regions always have strong magnetic fields." }
      ]
    },
    {
      id: "15.4",
      title: "Space Weather",
      minutes: 11,
      pages: "pp. 521–527",
      html:
        '<p>Some particles leaving the Sun &mdash; steadily in the solar wind or in great bursts like CMEs &mdash; ' +
        'reach Earth and its <strong>magnetosphere</strong> (the zone of magnetic influence around our planet). So ' +
        'scientists now face the challenge of predicting the effects of solar storms on Earth. This field is called ' +
        '<strong>space weather</strong>, and when that weather turns stormy, our technology is at risk. With thousands ' +
        'of satellites, astronauts living on the International Space Station, millions of people using cell phones, ' +
        'GPS, and wireless, and nearly everyone relying on electric power, governments are investing heavily in ' +
        'predicting solar storms.</p>' +
        '<h4>Some history</h4>' +
        '<p>Space weather was first recognized (though not understood) in <strong>1859</strong>, in the ' +
        '<strong>Carrington Event</strong>. In early September, two amateur astronomers, including <strong>Richard ' +
        'Carrington</strong> in England, independently saw a solar flare. A day or two later a big solar storm reached ' +
        'Earth&rsquo;s magnetic field, overloading it with charged particles. Auroras were seen far from the poles ' +
        '&mdash; as far south as <strong>Hawaii and the Caribbean</strong> &mdash; and were so bright that some people ' +
        'got up in the middle of the night thinking it was daylight.</p>' +
        '<p>At the time, the <strong>telegraph</strong> &mdash; a network sending coded messages through overhead ' +
        'wires, a bit like a very early internet &mdash; was starting to link people together. The charged particles ' +
        'affected its wires: sparks flew from exposed wires and from telegraph machines. The bright flare seen just ' +
        'before led scientists to suspect a connection between solar activity and effects on Earth &mdash; the ' +
        'beginning of our understanding of space weather.</p>' +
        '<h4>Sources of space weather</h4>' +
        '<p>Three solar phenomena cause most space weather:</p>' +
        '<ul>' +
        '<li><strong>Coronal holes</strong> let the solar wind flow freely. When it reaches Earth, it makes the ' +
        'magnetosphere contract and then expand after it passes &mdash; causing (usually mild) electromagnetic ' +
        'disturbances.</li>' +
        '<li><strong>Solar flares</strong> are more serious. They shower Earth&rsquo;s upper atmosphere with ' +
        'X-rays, energetic particles, and intense ultraviolet. These can ionize atoms, and the freed electrons can ' +
        'build up charge on a spacecraft; when it discharges, it can damage the electronics &mdash; like the shock you ' +
        'get after shuffling across a carpet in socks and touching a light switch.</li>' +
        '<li><strong>Coronal mass ejections</strong> are the most disruptive. A CME is an erupting bubble of ' +
        '<strong>tens of millions of tons</strong> of gas. Reaching Earth a few days after leaving the Sun, it heats ' +
        'the <strong>ionosphere</strong>, which expands farther into space. That increases friction on spacecraft, ' +
        'dragging satellites to lower altitudes.</li>' +
        '</ul>' +
        '<p>During a strong flare and CME in <strong>March 1989</strong>, the system tracking some ' +
        '<strong>19,000</strong> objects orbiting Earth temporarily lost track of <strong>11,000</strong> of them, ' +
        'because Earth&rsquo;s expanded atmosphere changed their orbits. During solar maximum, some satellites are ' +
        'dragged so low they are destroyed by friction. Both the Hubble Space Telescope and the International Space ' +
        'Station (Figure 15.24) need <strong>reboosts</strong> to stay in orbit.</p>' +
        '<div data-figure="15.24"></div>' +
        '<p class="callout-inline"><strong>Link to learning: May 2024.</strong> Heightened activity on the Sun in ' +
        '<strong>May 2024</strong> led to several flares and CMEs that set off significant geomagnetic storms on ' +
        'Earth, and auroras were seen at much lower latitudes than usual.</p>' +
        '<h4>Solar storm damage on Earth</h4>' +
        '<p>A CME distorts Earth&rsquo;s magnetic field. Since a changing magnetic field induces electric current, ' +
        'the CME accelerates electrons, sometimes to very high speeds. These <strong>&ldquo;killer ' +
        'electrons&rdquo;</strong> can penetrate deep into satellites and destroy their electronics, permanently ' +
        'disabling them &mdash; this has happened to some communications satellites.</p>' +
        '<p>Disturbances in Earth&rsquo;s field can disrupt communications, especially cell phones and wireless ' +
        'systems &mdash; several times a year during solar maximum. They can also cause surges in power lines big ' +
        'enough to burn out transformers and cause major outages. In <strong>1989</strong>, parts of ' +
        '<strong>Montreal and Quebec Province</strong> in Canada were without power for up to <strong>9 ' +
        'hours</strong>. Outages are more likely in <strong>North America</strong> than in Europe because North ' +
        'America is closer to Earth&rsquo;s magnetic pole, where the induced currents are strongest.</p>' +
        '<p>CMEs can also distort satellite signals, enough to make <strong>GPS</strong> positions miss the limits ' +
        'airplanes need (they must know their positions within <strong>160 feet</strong>). Such disruptions have ' +
        'occasionally forced the Federal Aviation Administration to restrict flights for minutes or, in a few cases, ' +
        'even days.</p>' +
        '<p>Solar storms also expose astronauts, passengers in high-flying airplanes, and even people on the ground to ' +
        'more radiation. Astronauts have a career limit on radiation dose, and one ill-timed outburst could end a ' +
        'career. On the Russian <strong>Mir</strong> space station, the typical daily dose was about <strong>eight ' +
        'chest X-rays</strong>. Protecting astronauts from high-energy solar radiation is one of the major challenges ' +
        'in planning human trips to Mars.</p>' +
        '<h4>Forecasting</h4>' +
        '<p>Advance warning would help: power networks could run below full capacity to absorb surges, communications ' +
        'networks could have backup plans ready, and spacewalks could avoid major outbursts. Scientists are trying to ' +
        'predict where and when flares and CMEs will occur, and whether they&rsquo;ll be big and fast or small and ' +
        'slow, by relating changes in small active regions and local magnetic fields to the eruptions that follow. ' +
        'But right now our predictive ability is still poor; the only real warning is <strong>seeing</strong> a CME or ' +
        'flare happen. Since a CME travels at about <strong>500 km/s</strong>, seeing one gives <strong>several ' +
        'days</strong> of warning. How bad the impact is depends on how the CME&rsquo;s magnetic field is oriented ' +
        'relative to Earth&rsquo;s &mdash; and that can only be measured when the CME passes a satellite placed for ' +
        'this purpose, only about <strong>an hour upstream</strong> from Earth.</p>' +
        '<p>Space weather predictions are now online for scientists and the public: <strong>outlooks</strong> a week ' +
        'ahead, <strong>bulletins</strong> when an event will interest the public, and <strong>warnings and ' +
        'alerts</strong> when an event is imminent or under way (Figure 15.25). More satellites are being launched to ' +
        'tell whether CMEs are headed our way and how big they are, and models are being built to predict their likely ' +
        'impact. The hope is that solar forecasting will one day approach what meteorologists do for weather on ' +
        'Earth&rsquo;s surface &mdash; though, as with hurricanes, the hardest events to predict are the largest and ' +
        'most damaging. The Sun will surely continue to surprise us.</p>' +
        '<div data-figure="15.25"></div>' +
        '<p class="callout-inline"><strong>Worked example 15.1: the timing of solar events.</strong> Distance = ' +
        'velocity &times; time, or <strong>D = v &times; t</strong>; dividing both sides by v gives <strong>T = ' +
        'D/v</strong>. You see a major flare while astronauts orbit Earth. If the solar wind averages <strong>400 ' +
        'km/s</strong> and the Sun is <strong>1.496 &times; 10<sup>8</sup> km</strong> away, how long until the ' +
        'particles reach the space station? T = (1.496 &times; 10<sup>8</sup> km) &divide; (400 km/s) = 3.74 &times; ' +
        '10<sup>5</sup> s. Dividing by 60 s/min &times; 60 min/h &times; 24 h/d gives <strong>4.3 days</strong>. ' +
        '<em>Check your learning:</em> at <strong>500 km/s</strong>, T = (1.496 &times; 10<sup>8</sup> km) &divide; ' +
        '(500 km/s) = 2.99 &times; 10<sup>5</sup> s = <strong>3.46 days</strong>.</p>' +
        '<div data-diagram="cme-travel"></div>' +
        '<h4>Earth&rsquo;s climate and the sunspot cycle: is there a connection?</h4>' +
        '<p>The Sun&rsquo;s energy output isn&rsquo;t truly constant; it varies over centuries by a small amount ' +
        '&mdash; probably <strong>less than 1%</strong>. The number of spots at maximum isn&rsquo;t always the same, ' +
        'either. Considerable evidence shows that between <strong>1645 and 1715</strong>, even at maximum, there were ' +
        'far fewer sunspots than now. This interval was first noted by <strong>Gustav Sp&ouml;rer</strong> in ' +
        '<strong>1887</strong> and then by <strong>E. W. Maunder</strong> in <strong>1890</strong>; it is now called ' +
        'the <span class="term">Maunder Minimum</span> (Figure 15.26). Sunspot numbers were also somewhat lower in the ' +
        'first part of the nineteenth century, a period called the <strong>Little Maunder Minimum</strong>.</p>' +
        '<div data-figure="15.26"></div>' +
        '<p>When sunspot numbers are high, the Sun is active in other ways too &mdash; for example, there are more ' +
        'auroras, since the active Sun is more likely to spew out the particles that cause them. Historical accounts ' +
        'show auroras were abnormally rare during the decades of the Maunder Minimum.</p>' +
        '<p>The Maunder Minimum was also a time of exceptionally low temperatures in Europe, called the <strong>Little ' +
        'Ice Age</strong>. The River Thames in London froze at least <strong>11 times</strong>, ice appeared in the ' +
        'ocean off southeast England, and cold summers meant short growing seasons and poor harvests. But whether and ' +
        'how changes on the Sun on this timescale affect Earth&rsquo;s climate is <strong>still debated</strong>.</p>' +
        '<p>Other small climate changes have shaped history. Norse explorers colonized Iceland and reached Greenland by ' +
        '<strong>986</strong>, and from there made repeated visits to northeastern North America, including ' +
        'Newfoundland, between about <strong>1000 and 1350</strong>. (Their ships could only reach North America by ' +
        'way of Greenland.) The Greenland station depended on food and supplies from Norway. When a little ice age ' +
        'began in the thirteenth century, voyaging became very hard and the colony could no longer be supported. The ' +
        'last known contact was a ship from Iceland blown off course in <strong>1410</strong>; when European ships ' +
        'returned in <strong>1577</strong>, the colony had vanished. These dates follow solar activity: unusually high ' +
        'from <strong>1100 to 1250</strong> (when the first European contacts with North America were made), and low ' +
        'from <strong>1280 to 1340</strong>, with a little ice age around when regular contact stopped.</p>' +
        '<p>Be cautious, though, about assuming low sunspot numbers caused the Little Ice Age. There is <strong>no ' +
        'satisfactory model</strong> for how reduced solar activity could cool Earth. Another possibility is volcanic ' +
        'activity: volcanoes eject aerosols (tiny droplets or particles) that reflect sunlight. The ' +
        '<strong>Pinatubo</strong> eruption in <strong>1991</strong> put SO<sub>2</sub> aerosols into the air and ' +
        'lowered global temperatures by <strong>0.4 &deg;C</strong>.</p>' +
        '<p>Satellites show the Sun&rsquo;s total energy output varies by only about <strong>0.1%</strong> during a ' +
        'solar cycle, and we know of no process by which so small a change could cause global temperature changes. ' +
        'But its <strong>extreme ultraviolet</strong> output is <strong>10 times</strong> higher at maximum than at ' +
        'minimum. That can affect the chemistry and temperature of the upper atmosphere &mdash; perhaps reducing the ' +
        'ozone layer and cooling the stratosphere near the poles, which might shift high-altitude winds and storm ' +
        'tracks. There is some recent evidence that regional rainfall correlates better with solar activity than ' +
        'global temperature does. Scientists are still investigating and debating all of this.</p>' +
        '<p>One idea to emphasize: climate data and models <strong>consistently show that solar variability is not ' +
        'the cause</strong> of the global warming of the past 50 years.</p>',
      keyIdeas: [
        "Space weather is the effect of solar activity on Earth’s magnetosphere and surface. It was first recognized in the 1859 Carrington Event: auroras as far south as Hawaii and the Caribbean, and sparks from telegraph wires.",
        "Coronal holes let the solar wind flow freely (usually mild disturbances); flares shower the upper atmosphere with X-rays, particles, and ultraviolet that can charge and damage spacecraft; CMEs are the most disruptive.",
        "A CME heats and expands the ionosphere, dragging satellites lower (in March 1989, 11,000 of 19,000 tracked objects were temporarily lost). Hubble and the ISS need reboosts.",
        "CMEs can make “killer electrons” that ruin satellites, disrupt communications and GPS, and surge power lines (Quebec lost power for up to 9 hours in 1989). They also raise radiation doses for astronauts and fliers.",
        "We can’t yet predict eruptions well; seeing a CME (about 500 km/s) gives several days of warning. Time to reach Earth: T = D/v — about 4.3 days at 400 km/s, 3.46 days at 500 km/s.",
        "The Maunder Minimum (1645–1715) had very few sunspots and coincided with Europe’s Little Ice Age, but no model explains how the Sun could cause it; volcanoes are another possibility.",
        "The Sun’s total output varies only about 0.1% over a cycle (its extreme ultraviolet varies 10 times). Solar variability is not the cause of global warming over the past 50 years."
      ],
      selfCheck: [
        { q: "What was the Carrington Event?",
          a: "In September 1859, Richard Carrington and another amateur astronomer saw a solar flare; a day or two later a solar storm overloaded Earth’s magnetic field. Auroras were seen as far south as Hawaii and the Caribbean, and telegraph wires and machines threw sparks." },
        { q: "Which three solar phenomena cause most space weather, and which is most disruptive?",
          a: "Coronal holes, solar flares, and coronal mass ejections. CMEs are the most disruptive." },
        { q: "How can a CME make a satellite fall to a lower orbit?",
          a: "It heats Earth’s ionosphere, which expands farther into space. The extra friction with the atmosphere drags satellites down to lower altitudes." },
        { q: "Why are CME power outages more likely in North America than in Europe?",
          a: "North America is closer to Earth’s magnetic pole, where the currents induced by CMEs are strongest." },
        { q: "Particles leave the Sun at 400 km/s. Using T = D/v with D = 1.496 × 10⁸ km, how long until they reach Earth?",
          a: "T = 1.496 × 10⁸ km ÷ 400 km/s = 3.74 × 10⁵ s, which is about 4.3 days." },
        { q: "Did the Maunder Minimum cause the Little Ice Age?",
          a: "They happened at the same time, but there is no satisfactory model explaining how lower solar activity would cool Earth; volcanic aerosols are another possible cause. The question is still debated." }
      ]
    }
  ];

  /* ------------------------------------------------------------------ GLOSSARY */
  CH.glossary = [
    { term: "Active region", section: "15.3", def: "An area on the Sun where magnetic fields are concentrated; sunspots, prominences, flares, and CMEs all tend to occur in active regions." },
    { term: "Aurora", section: "15.1", def: "Light radiated by atoms and ions in the ionosphere excited by charged particles from the Sun, mostly seen in the magnetic polar regions." },
    { term: "Chromosphere", section: "15.1", def: "The part of the solar atmosphere that lies immediately above the photospheric layers." },
    { term: "Corona (of the Sun)", section: "15.1", def: "The outer (hot) atmosphere of the Sun." },
    { term: "Coronal hole", section: "15.1", def: "A region in the Sun’s outer atmosphere that appears darker because there is less hot gas there." },
    { term: "Coronal mass ejection (CME)", section: "15.3", def: "A solar flare in which immense quantities of coronal material—mainly protons and electrons—is ejected at high speeds (500–1000 kilometers per second) into interplanetary space." },
    { term: "Differential rotation", section: "15.2", def: "The phenomenon that occurs when different parts of a rotating object rotate at different rates at different latitudes." },
    { term: "Granulation", section: "15.1", def: "The rice-grain-like structure of the solar photosphere; granulation is produced by upwelling currents of gas that are slightly hotter, and therefore brighter, than the surrounding regions, which are flowing downward into the Sun." },
    { term: "Maunder Minimum", section: "15.4", def: "A period during the seventeenth century when the number of sunspots seen throughout the solar cycle was unusually low." },
    { term: "Photosphere", section: "15.1", def: "The region of the solar (or stellar) atmosphere from which continuous radiation escapes into space." },
    { term: "Plage", section: "15.3", def: "A bright region of the solar surface observed in the light of some spectral line." },
    { term: "Plasma", section: "15.1", def: "A hot ionized gas." },
    { term: "Prominence", section: "15.3", def: "A large, bright, gaseous feature that appears above the surface of the Sun and extends into the corona." },
    { term: "Solar flare", section: "15.3", def: "A sudden and temporary outburst of electromagnetic radiation from an extended region of the Sun’s surface." },
    { term: "Solar wind", section: "15.1", def: "A flow of hot, charged particles leaving the Sun." },
    { term: "Sunspot", section: "15.2", def: "Large, dark features seen on the surface of the Sun caused by increased magnetic activity." },
    { term: "Sunspot cycle", section: "15.2", def: "The semiregular 11-year period with which the frequency of sunspots fluctuates." },
    { term: "Transition region", section: "15.1", def: "The region in the Sun’s atmosphere where the temperature rises very rapidly from the relatively low temperatures that characterize the chromosphere to the high temperatures of the corona." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "15.1", q: "About what fraction of the Sun’s mass is hydrogen and helium together?",
      choices: ["98% (about 73% hydrogen, 25% helium)", "50%", "About 25%", "Less than 2%"],
      answer: 0,
      whyWrong: [null, "Much more than half: all other elements together are only 2% of the Sun’s mass.", "25% is helium alone; hydrogen adds about 73% more.", "2% is the share of everything EXCEPT hydrogen and helium."],
      explain: "About 73% of the Sun’s mass is hydrogen and 25% helium; all other elements make up only 2%." },
    { section: "15.1", q: "Who first showed that the Sun and stars are made mostly of hydrogen and helium?",
      choices: ["Cecilia Payne-Gaposchkin", "Galileo", "Heinrich Schwabe", "Richard Carrington"],
      answer: 0,
      whyWrong: [null, "Galileo used sunspots to show the Sun rotates.", "Schwabe discovered the sunspot cycle.", "Carrington observed the 1859 flare behind the Carrington Event."],
      explain: "Her 1925 thesis showed it — a result so unexpected she was persuaded it was almost certainly not real. It was confirmed 3 years later." },
    { section: "15.1", q: "Where is all of the Sun’s energy produced?",
      choices: ["In the core", "In the photosphere", "In the corona", "In the convective zone"],
      answer: 0,
      whyWrong: [null, "The photosphere is where the light escapes, not where the energy is made.", "The corona is hot, but it is the thin outer atmosphere.", "The convective zone carries energy outward; it doesn’t make it."],
      explain: "The core — about 15 million K, the hottest part of the Sun — is where nuclear energy is released." },
    { section: "15.1", q: "In which layer does energy move outward by giant cells of rising and sinking gas, like boiling oatmeal?",
      choices: ["The convective zone", "The radiative zone", "The core", "The chromosphere"],
      answer: 0,
      whyWrong: [null, "In the radiative zone, energy moves slowly as light, bouncing off particles.", "The core makes the energy rather than transporting it this way.", "The chromosphere is part of the atmosphere, above the visible surface."],
      explain: "The convective zone, about 200,000 km deep, is the outermost layer of the interior." },
    { section: "15.1", q: "What is the photosphere?",
      choices: ["The layer where the Sun becomes opaque — the visible surface", "A solid crust", "The hottest layer of the Sun", "The layer just above the chromosphere"],
      answer: 0,
      whyWrong: [null, "The Sun has no solid surface at all — falling in, you’d feel only denser and denser gas.", "The core (about 15 million K) is the hottest; the photosphere is about 5800 K.", "The photosphere is BELOW the chromosphere."],
      explain: "The photosphere is just over 400 km thick; it marks the boundary past which we cannot see." },
    { section: "15.1", q: "What are granules on the photosphere?",
      choices: ["Columns of hotter gas rising from below", "Small sunspots", "Clouds of iron", "Craters"],
      answer: 0,
      whyWrong: [null, "Sunspots are dark and cool; bright granules are hotter than their surroundings.", "Granules are hot rising gas, not clouds of a particular element.", "The Sun is gas and has no craters."],
      explain: "Bright granules are hot gas rising at 2–3 km/s; it spreads, cools, and sinks in the darker lanes between them." },
    { section: "15.1", q: "How does the chromosphere’s temperature compare with the photosphere’s?",
      choices: ["It is hotter — about 10,000 K", "It is cooler — about 3800 K", "It is the same", "It is about 15 million K"],
      answer: 0,
      whyWrong: [null, "3800 K is a typical sunspot temperature.", "The temperature rises above the photosphere.", "15 million K is the core."],
      explain: "Surprisingly, the temperature rises above the photosphere: about 10,000 K in the chromosphere and a million or more in the corona." },
    { section: "15.1", q: "Which element was discovered in the Sun before it was found on Earth?",
      choices: ["Helium", "Hydrogen", "Iron", "Calcium"],
      answer: 0,
      whyWrong: [null, "Hydrogen was well known on Earth; its red line colors the chromosphere.", "Iron was known — and “coronium” turned out to be highly ionized iron.", "Calcium was known; its lines are used to photograph plages."],
      explain: "Helium’s yellow line was seen in the chromosphere in 1868; it was named for helios, Greek for “Sun,” and found on Earth in 1895." },
    { section: "15.1", q: "Where does most of the solar wind come from?",
      choices: ["Coronal holes", "Sunspots", "The core", "Plages"],
      answer: 0,
      whyWrong: [null, "Strong fields in sunspot regions trap gas rather than let it go.", "Nothing but neutrinos escapes directly from the core.", "Plages are bright chromosphere regions, not wind sources."],
      explain: "In coronal holes, field lines stretch out into space, so gas streams away unhindered at about 400 km/s." },
    { section: "15.2", q: "Why do sunspots look dark?",
      choices: ["They are cooler than their surroundings", "They are holes in the Sun", "They are shadows of planets", "They contain no gas"],
      answer: 0,
      whyWrong: [null, "They are not holes — they’re regions of the surface at about 3800 K.", "They are not shadows; Schwabe looked for a planet’s silhouette and never found one.", "They are hot gas, bright enough to shine on their own if removed from the Sun."],
      explain: "Spots are about 3800 K vs. 5800 K around them; they look dark only by contrast." },
    { section: "15.2", q: "What is differential rotation?",
      choices: ["Different latitudes of the Sun rotate at different rates", "The Sun rotates backward", "The Sun’s core and surface rotate in opposite directions", "Sunspots spin faster than the Sun"],
      answer: 0,
      whyWrong: [null, "The Sun turns west to east, like the planets orbit.", "The book describes rates changing with latitude, not opposite directions.", "Spots drift slowly compared with the Sun’s rotation."],
      explain: "About 25 days at the equator, 28 at latitude 40°, and 36 at latitude 80°." },
    { section: "15.2", q: "On average, how long is the sunspot cycle?",
      choices: ["11 years", "22 years", "25 days", "1 year"],
      answer: 0,
      whyWrong: [null, "22 years is the full MAGNETIC cycle, when polarity patterns repeat.", "25 days is the Sun’s rotation period at the equator.", "Schwabe found the cycle to be about a decade long."],
      explain: "Maxima come every 11 years on average, but the gap has ranged from 9 to 14 years." },
    { section: "15.2", q: "How do astronomers measure magnetic fields on the Sun?",
      choices: ["The Zeeman effect — splitting of spectral lines", "The Doppler effect", "Counting sunspots", "Radar"],
      answer: 0,
      whyWrong: [null, "Doppler shifts measure motion, such as rising granules.", "Counting spots shows the cycle, not field strength.", "Radar measured the distance to the Sun (via the planets)."],
      explain: "In a magnetic field, energy levels split, so each spectral line becomes several; the spacing reveals the field strength." },
    { section: "15.2", q: "Why is the Sun’s full magnetic cycle 22 years long?",
      choices: ["The leading spots’ polarity reverses each 11-year cycle", "Sunspots last 22 years", "The Sun rotates once every 22 years", "Two hemispheres take turns having spots"],
      answer: 0,
      whyWrong: [null, "Individual spots last hours to months.", "The Sun rotates in about a month.", "Both hemispheres have spots in every cycle — with opposite polarities."],
      explain: "The pattern only repeats after two 11-year cycles, when the polarities have flipped and flipped back." },
    { section: "15.2", q: "What generates the Sun’s magnetic field?",
      choices: ["A dynamo of churning ionized gas inside the Sun", "A solid iron core", "The solar wind", "Earth’s magnetic field"],
      answer: 0,
      whyWrong: [null, "The Sun has no solid core.", "The solar wind carries particles away; it doesn’t make the field.", "Earth’s field is far too weak and far away."],
      explain: "Churning ionized gas makes currents, which make magnetic fields — probably in the convection zone or at its base." },
    { section: "15.3", q: "What is the most violent event on the surface of the Sun?",
      choices: ["A solar flare", "A plage", "A quiescent prominence", "Granulation"],
      answer: 0,
      whyWrong: [null, "Plages are bright, steady chromosphere regions.", "Quiescent prominences can stay nearly stable for days.", "Granules quietly come and go every 5–10 minutes."],
      explain: "A typical flare lasts 5–10 minutes and releases the energy of perhaps a million hydrogen bombs, heating material to 10 million K." },
    { section: "15.3", q: "What seems to cause solar flares?",
      choices: ["Magnetic fields pointing in opposite directions destroying each other", "Comets hitting the Sun", "Nuclear reactions at the surface", "The Sun’s rotation slowing down"],
      answer: 0,
      whyWrong: [null, "The book doesn’t connect flares to comets.", "Nuclear reactions happen in the core, not at the surface.", "Flares are magnetic events, not rotation changes."],
      explain: "Like a stretched rubber band breaking, opposite fields interact and release stored energy." },
    { section: "15.3", q: "How fast is material thrown out in a coronal mass ejection?",
      choices: ["500–1000 km/s", "2–3 km/s", "About 40 m per year", "The speed of light"],
      answer: 0,
      whyWrong: [null, "2–3 km/s is how fast gas rises in granules.", "That’s nowhere near — CMEs reach Earth in days.", "CMEs are material particles, far slower than light."],
      explain: "CMEs blast mainly protons and electrons into interplanetary space at 500–1000 km/s." },
    { section: "15.3", q: "What is an active region?",
      choices: ["A place where sunspots, flares, and bright regions occur together, with strong magnetic fields", "The Sun’s core", "A coronal hole", "The radiative zone"],
      answer: 0,
      whyWrong: [null, "The core makes energy but isn’t where surface activity happens.", "Coronal holes are cool, quiet regions.", "The radiative zone is deep inside, below what we can see."],
      explain: "Activity at different heights stacks up over the same strongly magnetic spot, and all of it varies with the sunspot cycle." },
    { section: "15.4", q: "What was the Carrington Event?",
      choices: ["An 1859 flare and solar storm that caused far-reaching auroras and sparking telegraph wires", "The first sunspot observation", "The discovery of helium", "The 1989 Quebec blackout"],
      answer: 0,
      whyWrong: [null, "Sunspot records go back over a thousand years.", "Helium was found in the Sun in 1868.", "That was a different storm, 130 years later."],
      explain: "Auroras reached as far south as Hawaii and the Caribbean; it was the beginning of our understanding of space weather." },
    { section: "15.4", q: "Which kind of solar event is the most disruptive for Earth?",
      choices: ["Coronal mass ejections", "Coronal holes", "Granules", "Plages"],
      answer: 0,
      whyWrong: [null, "Coronal holes usually cause only mild disturbances.", "Granulation doesn’t affect Earth.", "Plages are bright regions in the chromosphere."],
      explain: "A CME — tens of millions of tons of gas — heats the ionosphere, drags satellites, induces currents, and can knock out power." },
    { section: "15.4", q: "Using T = D/v, about how long do particles moving 500 km/s take to cross 1.496 × 10⁸ km?",
      choices: ["About 3.5 days", "About 14 hours", "About 4 weeks", "About 1 hour"],
      answer: 0,
      whyWrong: [null, "Too short: 2.99 × 10⁵ s ÷ 3600 s per hour is about 83 hours.", "That’s far too slow: 2.99 × 10⁵ s is only a few days.", "One hour is how far upstream the monitoring satellite sits."],
      explain: "T = 1.496 × 10⁸ km ÷ 500 km/s = 2.99 × 10⁵ s = 3.46 days." },
    { section: "15.4", q: "What was the Maunder Minimum?",
      choices: ["1645–1715, when very few sunspots were seen", "The quietest day of each solar cycle", "A cold period caused by Pinatubo", "The time of lowest temperature in the Sun’s atmosphere"],
      answer: 0,
      whyWrong: [null, "It lasted decades, not a single day.", "Pinatubo erupted in 1991.", "It is about sunspot numbers, not a layer’s temperature."],
      explain: "Noted by Spörer (1887) and Maunder (1890), it coincided with Europe’s Little Ice Age." },
    { section: "15.4", q: "What does the book conclude about the Sun and global warming over the past 50 years?",
      choices: ["Solar variability is not the cause", "The Sun’s output rose 10%, causing it", "Sunspots are the main cause", "It is impossible to say"],
      answer: 0,
      whyWrong: [null, "The total output varies by only about 0.1% over a cycle.", "No physical process links such small changes to global warming.", "The book says the data and models consistently rule out the Sun."],
      explain: "Climate data and models consistently show solar variability is not the cause of the global warming of the past 50 years." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[15] = CH;
})();
