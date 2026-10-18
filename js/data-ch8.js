/* =============================================================================
   Astronomy 2e — Chapter 8: Earth as a Planet
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 8), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[8].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 8,
    chapterTitle: "Earth as a Planet",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/8-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 251–284"
  };

  CH.tools = ["earthinterior", "rocktypes", "platetectonics", "earthatmosphere", "lifeclimate", "greenhouse", "impacts"];

  /* ---------------------------------- ONE STUDY TOOL PER TOPIC: match data */
  CH.earthinteriormatch = [
    { a: "Seismic waves", b: "vibrations from earthquakes or explosions that travel through Earth and reveal its layers" },
    { a: "Crust", b: "the thin outer layer — only about 0.3% of Earth's mass" },
    { a: "Oceanic crust", b: "basalt, about 6 km thick, covering 55% of Earth's surface" },
    { a: "Continental crust", b: "granite, 20 to 70 km thick, covering 45% of Earth's surface" },
    { a: "Mantle", b: "the largest part of the solid Earth, down to 2900 km; solid, but it can flow slowly" },
    { a: "Outer core", b: "liquid metal whose motion makes Earth's magnetic field" },
    { a: "Inner core", b: "about 2400 km across, and probably solid" },
    { a: "Magnetosphere", b: "the zone where Earth's magnetic field beats the weak field carried by the solar wind" },
    { a: "Van Allen belts", b: "regions of high-energy ions in the magnetosphere, found by Explorer 1 in 1958" }
  ];
  CH.rocktypesmatch = [
    { a: "Igneous rock", b: "rock that cooled from a molten state — all volcanic rock" },
    { a: "Basalt", b: "the volcanic igneous rock of the ocean basins" },
    { a: "Granite", b: "the igneous silicate rock that makes up most of the continental crust" },
    { a: "Sedimentary rock", b: "fragments or shells laid down by wind or water and cemented together without melting" },
    { a: "Metamorphic rock", b: "rock changed by high temperature or pressure — the word means “changed in form”" },
    { a: "Primitive rock", b: "original material of the planetary system, never changed by heating — none is left on Earth" },
    { a: "Where to find primitive rock", b: "comets, asteroids, and small planetary moons" },
    { a: "Quartzite", b: "a stone that has passed through all four rock states" }
  ];
  CH.platetectonicsmatch = [
    { a: "Plate tectonics", b: "slow motions of the mantle moving large pieces of the crust" },
    { a: "Mantle convection", b: "warm material rising and cool material sinking — the power that moves the plates" },
    { a: "Rift zone", b: "where plates pull apart and new crust forms, like the Mid-Atlantic ridge" },
    { a: "Subduction zone", b: "where one plate is forced beneath another, often marked by an ocean trench" },
    { a: "Fault", b: "a crack where plates slide past each other, like the San Andreas Fault" },
    { a: "The Alps", b: "mountains raised by the African plate bumping into the Eurasian plate" },
    { a: "Hot spot", b: "heat rising far from plate boundaries — it built the Hawaiian islands" },
    { a: "Alfred Wegener", b: "proposed continental drift and a supercontinent he called Pangaea" },
    { a: "4 to 5 cm per year", b: "how fast the plates move — about how fast your hair grows" }
  ];
  CH.earthatmospherematch = [
    { a: "1 bar", b: "the air pressure at sea level" },
    { a: "Troposphere", b: "the bottom ~10 km, where clouds form, airplanes fly, and weather happens" },
    { a: "Stratosphere", b: "above the troposphere, up to about 50 km — cold and cloud-free" },
    { a: "Ozone (O₃)", b: "oxygen with three atoms per molecule; it absorbs dangerous ultraviolet light" },
    { a: "Ionosphere", b: "above 100 km, where many atoms have lost an electron" },
    { a: "78% / 21% / 1%", b: "nitrogen, oxygen, and argon in the air at Earth's surface" },
    { a: "300 bars", b: "the pressure of water vapor if all the oceans boiled away" },
    { a: "Weather vs. climate", b: "“Climate is what you expect, and weather is what you get.”" },
    { a: "Ice ages", b: "caused mainly by changes in the tilt of Earth's axis" }
  ];
  CH.lifeclimatematch = [
    { a: "3.9 billion years ago", b: "the oldest surviving rocks formed — and life already existed" },
    { a: "Stromatolites", b: "large colonies of microbes, built by 3.5 billion years ago and still growing today" },
    { a: "Last 600 million years", b: "the only time with abundant fossils — less than 15% of Earth's history" },
    { a: "Tree of life", b: "built from genes; it shows that most of life's diversity is microbial" },
    { a: "Blue-green algae", b: "took in carbon dioxide and released oxygen as a waste product" },
    { a: "Photosynthesis", b: "using sunlight's energy to make new plant material, releasing oxygen" },
    { a: "About 2 billion years ago", b: "free oxygen began to build up in the atmosphere" },
    { a: "Ozone layer", b: "made from that oxygen; it let life leave the oceans for the land" },
    { a: "Astrobiology", b: "the modern science whose subjects include how life and our planet evolved together" }
  ];
  CH.greenhousematch = [
    { a: "Greenhouse effect", b: "the atmosphere trapping infrared (heat) radiation near the surface" },
    { a: "Greenhouse gases", b: "mainly carbon dioxide, methane, and water vapor" },
    { a: "Sunlight in", b: "visible light passes through the air and heats the ground" },
    { a: "Infrared out", b: "the warm ground gives off heat radiation, which greenhouse gases absorb" },
    { a: "About 23 °C", b: "how much the greenhouse effect warms Earth's surface today" },
    { a: "About 30%", b: "how much atmospheric CO₂ rose in the past century" },
    { a: "100 times", b: "how much more CO₂ comes from burning fossil fuels than from volcanoes" },
    { a: "Anthropocene", b: "a proposed (not official) name for the time when humans began to change the whole planet" }
  ];
  CH.impactsmatch = [
    { a: "Few craters on Earth", b: "active geology erases them before they can pile up" },
    { a: "Tunguska (1908)", b: "a ~50-m stony object exploded about 8 km up, flattening forest but making no crater" },
    { a: "Chelyabinsk (2013)", b: "a 20-m object exploded 21 km up, breaking tens of thousands of windows" },
    { a: "Meteor Crater", b: "a crater about a mile across, made by a 40-m lump of iron about 50,000 years ago" },
    { a: "Chicxulub", b: "the 200-km crater from the impact 65 million years ago, in Mexico's Yucatán" },
    { a: "Iridium layer", b: "a worldwide sediment layer, rich in a metal common in asteroids and comets" },
    { a: "Mass extinction", b: "the sudden disappearance of many species — over half died out 65 million years ago" },
    { a: "Thermophiles", b: "heat-loving microbes — the oldest surviving life on Earth" },
    { a: "Spaceguard Survey", b: "NASA's search for asteroids that could hit Earth" }
  ];

  /* ------------------------------------------------------------------ FIGURES
     Images from OpenStax Astronomy 2e (CC BY 4.0), placed in the matching
     sections via <div data-figure="N.N"></div>. Captions are the book's own,
     with credit lines intact. Files in img/ (downscaled for web). */
  CH.figures = {
    "8.1": {
      file: "fig-8-1.jpg",
      title: "Active Geology",
      alt: "Seen from orbit, a snow-capped volcanic cone on an island in a dark blue sea, with a tan plume of ash drifting sideways from its peak.",
      caption: "Active Geology. This image, taken from the International Space Station in 2006, shows a plume of ash coming from the Cleveland Volcano in the Aleutian Islands. Although the plume was only visible for around two hours, such events are a testament to the dynamic nature of Earth’s crust. (credit: modification of work by NASA)"
    },
    "8.2": {
      file: "fig-8-2.jpg",
      title: "Blue Marble",
      alt: "The whole Earth, fully lit, against black space: blue oceans, swirling white clouds, Africa and Arabia in tan and brown, and the white Antarctic ice cap at the bottom.",
      caption: "Blue Marble. This image of Earth from space, taken by the Apollo 17 astronauts, is known as the “Blue Marble.” This is one of the rare images of a full Earth taken during the Apollo program; most images show only part of Earth’s disk in sunlight. (credit: modification of work by NASA)"
    },
    "8.3": {
      file: "fig-8-3.jpg",
      title: "Interior Structure of Earth",
      alt: "A globe with a wedge cut away to show the layers inside: a thin crust, a thick tan mantle, an orange core, and a small yellow inner core at the center.",
      caption: "Interior Structure of Earth. The crust, mantle, and inner and outer cores (solid and liquid, respectively) as shown as revealed by seismic studies."
    },
    "8.4": {
      file: "fig-8-4.jpg",
      title: "Earth’s Crust",
      alt: "A world map of Earth's surface with the water removed in effect: land in greens and browns, ocean floors in shades of blue with darker deep areas, and white ice sheets on Greenland and Antarctica.",
      caption: "Earth’s Crust. This computer-generated image shows the surface of Earth’s crust as determined from satellite images and ocean floor radar mapping. Oceans and lakes are shown in blue, with darker areas representing depth. Dry land is shown in shades of green and brown, and the Greenland and Antarctic ice sheets are depicted in shades of white. (credit: modification of work by C. Amante, B. W. Eakins, National Geophysical Data Center, NOAA)"
    },
    "8.5": {
      file: "fig-8-5.jpg",
      title: "Earth’s Magnetosphere",
      alt: "A diagram with the solar wind streaming in from the left toward Earth; Earth's magnetic field lines form a blue bubble that is squashed on the Sun side and stretched into a long tail on the far side, with the Van Allen belts shown as pink zones near Earth.",
      caption: "Earth’s Magnetosphere. A cross-sectional view of our magnetosphere (or zone of magnetic influence), as revealed by numerous spacecraft missions. Note how the wind of charged particles from the Sun “blows” the magnetic field outward like a wind sock."
    },
    "8.6": {
      file: "fig-8-6.jpg",
      title: "Formation of Igneous Rock as Liquid Lava Cools and Freezes",
      alt: "A close-up of a lava flow: gray, wrinkled, cooled crust with glowing orange molten lava showing along its leading edge.",
      caption: "Formation of Igneous Rock as Liquid Lava Cools and Freezes. This is a lava flow from a basaltic eruption. Basaltic lava flows quickly and can move easily over distances of more than 20 kilometers. (credit: USGS)"
    },
    "8.7": {
      file: "fig-8-7.jpg",
      title: "Earth’s Continental Plates",
      alt: "A world map with red lines marking the edges of the major crustal plates (labeled Pacific, North American, Eurasian, African, and others) and black arrows showing which way each plate moves.",
      caption: "Earth’s Continental Plates. This map shows the major plates into which the crust of Earth is divided. Arrows indicate the motion of the plates at average speeds of 4 to 5 centimeters per year, similar to the rate at which your hair grows."
    },
    "8.8": {
      file: "fig-8-8.jpg",
      title: "Alfred Wegener (1880–1930)",
      alt: "A black-and-white portrait of a man in a dark suit and tie, arms folded.",
      caption: "Alfred Wegener (1880–1930). Wegener proposed a scientific theory for the slow shifting of the continents."
    },
    "8.9": {
      file: "fig-8-9.jpg",
      title: "Rift Zone and Subduction Zone",
      alt: "Two cross-section drawings. Top: at a mid-ocean rift zone, magma rises from a partially melted zone and pushes two plates apart. Bottom: at a subduction zone, an ocean plate dives under a continent at an ocean trench, with an island arc of volcanoes above.",
      caption: "Rift Zone and Subduction Zone. Rift and subduction zones are the regions (mostly beneath the oceans) where new crust is formed and old crust is destroyed as part of the cycle of plate tectonics."
    },
    "8.10": {
      file: "fig-8-10.jpg",
      title: "San Andreas Fault",
      alt: "An aerial photo of dry, wrinkled hills in California with a long, straight valley running through them into the distance — the line of the fault.",
      caption: "San Andreas Fault. We see part of a very active region in California where one crustal plate is sliding sideways with respect to the other. The fault is marked by the valley running up the right side of the photo. Major slippages along this fault can produce extremely destructive earthquakes. (credit: John Wiley)"
    },
    "8.11": {
      file: "fig-8-11.jpg",
      title: "Mountains on Earth",
      alt: "Steep, jagged mountain peaks with dark tops and snowy slopes rising above a lake under a cloudy sky.",
      caption: "Mountains on Earth. The Torres del Paine are a young region of Earth’s crust where sharp mountain peaks are being sculpted by glaciers. We owe the beauty of our young, steep mountains to the erosion by ice and water. (credit: David Morrison)"
    },
    "8.12": {
      file: "fig-8-12.jpg",
      title: "Structure of Earth’s Atmosphere",
      alt: "A chart of height (0 to about 120 km) against temperature (0 to 500 K), with the layers labeled on the right: troposphere, H2O clouds, stratosphere, ozone, mesosphere, meteors, and ionosphere. A red curve shows the temperature changing with height.",
      caption: "Structure of Earth’s Atmosphere. Height increases up the left side of the diagram, and the names of the different atmospheric layers are shown at the right. In the upper ionosphere, ultraviolet radiation from the Sun can strip electrons from their atoms, leaving the atmosphere ionized. The curving red line shows the temperature (see the scale on the x-axis)."
    },
    "8.13": {
      file: "fig-8-13.jpg",
      title: "Storm from Space",
      alt: "A satellite view of a huge white spiral of hurricane clouds over the ocean beside the U.S. East Coast.",
      caption: "Storm from Space. This satellite image shows Hurricane Irene in 2011, shortly before the storm hit land in New York City. The combination of Earth’s tilted axis of rotation, moderately rapid rotation, and oceans of liquid water can lead to violent weather on our planet. (credit: NASA/NOAA GOES Project)"
    },
    "8.14": {
      file: "fig-8-14.jpg",
      title: "Ice Age",
      alt: "A round map of the Northern Hemisphere seen from above the North Pole, with the land areas once covered by ice-age glaciers shaded black and gray.",
      caption: "Ice Age. This computer-generated image shows the frozen areas of the Northern Hemisphere during past ice ages from the vantage point of looking down on the North Pole. The area in black indicates the most recent glaciation (coverage by glaciers), and the area in gray shows the maximum level of glaciation ever reached. (credit: modification of work by Hannes Grobe/AWI)"
    },
    "8.15": {
      file: "fig-8-15.jpg",
      title: "Cross-Sections of Fossil Stromatolites",
      alt: "A polished slab of rock showing wavy, stacked, dome-shaped layers in shades of red, tan, and green.",
      caption: "Cross-Sections of Fossil Stromatolites. This polished cross-section of a fossilized colony of stromatolites dates to the Precambrian Era. The layered, domelike structures are mats of sediment trapped in shallow waters by large numbers of blue-green bacteria that can photosynthesize. Such colonies of microorganisms date back more than 3 billion years. (credit: James St. John)"
    },
    "8.16": {
      file: "fig-8-16.jpg",
      title: "Tree of Life",
      alt: "A branching tree diagram with three main branches labeled Bacteria, Archaea, and Eukarya, each splitting into many named groups; animals, fungi, and plants are small twigs on the far right of the Eukarya branch.",
      caption: "Tree of Life. This chart shows the main subdivisions of life on Earth and how they are related. Note that the animal and plant kingdoms are just short branches on the far right, along with the fungi. The most fundamental division of Earth’s living things is onto three large domains called bacteria, archaea, and eukarya. Most of the species listed are microscopic. (credit: modification of work by Eric Gaba)"
    },
    "8.17": {
      file: "fig-8-17.jpg",
      title: "How the Greenhouse Effect Works",
      alt: "A diagram: arrows of sunlight come down through the sky to the surface (some reflect off clouds), and wavy arrows of infrared heat radiation rise from the surface and are bounced back down by the atmosphere.",
      caption: "How the Greenhouse Effect Works. Sunlight that penetrates to Earth’s lower atmosphere and surface is reradiated as infrared or heat radiation, which is trapped by greenhouse gases such as water vapor, methane, and CO2 in the atmosphere. The result is a higher surface temperature for our planet."
    },
    "8.18": {
      file: "fig-8-18.jpg",
      title: "Increase of Atmospheric Carbon Dioxide over Time",
      alt: "A graph of CO2 concentration in parts per million from the late 1950s to the mid-2010s, rising steadily from about 315 to a little over 400, with a small yearly wiggle.",
      caption: "Increase of Atmospheric Carbon Dioxide over Time. Scientists expect that the amount of CO2 will double its preindustrial level before the end of the twenty-first century. Measurements of the isotopic signatures of this added CO2 demonstrate that it is mostly coming from burning fossil fuels. (credit: modification of work by NOAA)"
    },
    "8.19": {
      file: "fig-8-19.jpg",
      title: "Ouarkziz Impact Crater",
      alt: "A view from orbit of desert ridges in Algeria, with a faint, eroded circular feature in the middle.",
      caption: "Ouarkziz Impact Crater. Located in Algeria, this 4-km-wide crater (the round feature in the center) is the result of a meteor impact during the Cretaceous period. Although the crater has experienced heavy erosion, this image from the International Space Station shows the circular pattern resulting from impact. (credit: modification of work by NASA)"
    },
    "8.20": {
      file: "fig-8-20.jpg",
      title: "Aftermath of the Tunguska Explosion",
      alt: "An old sepia photograph of a forest where most of the trees have been knocked flat and lie in the same direction, with a few bare trunks still standing.",
      caption: "Aftermath of the Tunguska Explosion. This photograph, taken 19 years after the blast, shows a part of the forest that was destroyed by the 5-megaton explosion, resulting when a stony projectile about the size of a small office building (50 meters in diameter) collided with our planet. (credit: modification of work by Leonid Kulik)"
    },
    "8.21": {
      file: "fig-8-21.jpg",
      title: "Meteor Crater in Arizona",
      alt: "An aerial photo of a large, round, bowl-shaped crater with a raised rim in flat, dry desert.",
      caption: "Meteor Crater in Arizona. Here we see a 50,000-year-old impact crater made by the collision of a 40-meter lump of iron with our planet. Although impact craters are common on less active bodies such as the Moon, this is one of the very few well-preserved craters on Earth. (modification of work by D. Roddy/USGS)"
    },
    "8.22": {
      file: "fig-8-22.jpg",
      title: "Site of the Chicxulub Crater",
      alt: "A relief map of Mexico and the Gulf of Mexico with a red circle on the northern tip of the Yucatán Peninsula marking the Chicxulub crater.",
      caption: "Site of the Chicxulub Crater. This map shows the location of the impact crater created 65 million years ago on Mexico’s Yucatán peninsula. The crater is now buried under more than 500 meters of sediment. (credit: modification of work by “Carport”/Wikimedia)"
    }
  };

  /* ------------------------------------------------------------------ SECTIONS */
  CH.sections = [
    {
      id: "8.1",
      title: "The Global Perspective",
      minutes: 11,
      pages: "pp. 252–256",
      html:
        '<div data-figure="8.1"></div>' +
        '<p>Airless worlds in the solar system are peppered with craters. Earth has few craters &mdash; but it has a ' +
        'thick atmosphere and a lot of surface activity. Impacts hit Earth at the same rate as everywhere else; the ' +
        'craters have since been <strong>erased</strong> by forces in the crust and the atmosphere. Comparing Earth ' +
        'with those heavily cratered worlds tells us something about our planet&rsquo;s history.</p>' +
        '<p>The first humans to see Earth as a blue sphere floating in black space were the astronauts who made the ' +
        'first voyage around the Moon, in <strong>1968</strong>. For many people, those pictures of a small, distant ' +
        'globe were a turning point: after them it was hard to see our world without a <em>global perspective</em>. ' +
        'This chapter looks at what Earth is made of, how it is built, how its ocean and air came to be the way they ' +
        'are, and how it compares with other planets.</p>' +
        '<p>Earth is a medium-size planet about <strong>12,760 kilometers</strong> across (Figure 8.2). Like the other ' +
        'inner, or terrestrial, planets, it is made mainly of <strong>heavy elements</strong> such as iron, silicon, ' +
        'and oxygen &mdash; very different from the Sun and stars, which are mostly the light elements hydrogen and ' +
        'helium. Earth&rsquo;s orbit is nearly circular, and Earth is warm enough to have <strong>liquid water</strong> ' +
        'on its surface. It is the only planet in our solar system that is neither too hot nor too cold, but ' +
        '&ldquo;just right&rdquo; for life as we know it.</p>' +
        '<div data-figure="8.2"></div>' +
        '<p>The book&rsquo;s Table 8.1 lists some of Earth&rsquo;s basic properties:</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Property</th><th>Measurement</th></tr>' +
        '<tr><td>Semimajor axis</td><td>1.00 AU</td></tr>' +
        '<tr><td>Period</td><td>1.00 year</td></tr>' +
        '<tr><td>Mass</td><td>5.98 &times; 10<sup>24</sup> kg</td></tr>' +
        '<tr><td>Diameter</td><td>12,756 km</td></tr>' +
        '<tr><td>Radius</td><td>6378 km</td></tr>' +
        '<tr><td>Escape velocity</td><td>11.2 km/s</td></tr>' +
        '<tr><td>Rotational period</td><td>23 h 56 m 4 s</td></tr>' +
        '<tr><td>Surface area</td><td>5.1 &times; 10<sup>8</sup> km<sup>2</sup></td></tr>' +
        '<tr><td>Density</td><td>5.514 g/cm<sup>3</sup></td></tr>' +
        '<tr><td>Atmospheric pressure</td><td>1.00 bar</td></tr>' +
        '</tbody></table></div>' +
        '<h4>Earth&rsquo;s interior</h4>' +
        '<p>The inside of a planet &mdash; even our own &mdash; is hard to study, so its makeup has to be worked out ' +
        '<strong>indirectly</strong>. We only have direct experience with the outermost skin of the crust, no more ' +
        'than a few kilometers deep. In many ways, we know less about our planet <strong>5 kilometers beneath our ' +
        'feet</strong> than we do about the surfaces of Venus and Mars.</p>' +
        '<p>Earth is made mostly of <strong>metal and silicate rock</strong>. Most of it is solid, but some is hot ' +
        'enough to be molten. Scientists have mapped the inside in detail with <span class="term">seismic ' +
        'waves</span> &mdash; waves that spread through Earth from earthquakes or explosions. They travel through a ' +
        'planet rather like sound through a struck <strong>bell</strong>: just as a bell&rsquo;s sound depends on ' +
        'what it&rsquo;s made of and how it&rsquo;s built, a planet&rsquo;s response depends on its makeup and ' +
        'structure. Some vibrations travel along the surface; others pass straight through the interior. As they ' +
        'cross different materials, the waves <strong>bend (refract)</strong> &mdash; like light in a telescope ' +
        'lens &mdash; so some seismic stations receive them and others sit in &ldquo;<strong>shadows</strong>.&rdquo; ' +
        'A network of seismographs lets scientists build a model of the interior, with its liquid and solid layers ' +
        '&mdash; a kind of imaging not unlike an <strong>ultrasound</strong> of the body. These studies show Earth has ' +
        'several distinct layers (Figure 8.3).</p>' +
        '<div data-figure="8.3"></div>' +
        '<p>The top layer is the <span class="term">crust</span>, the part we know best (Figure 8.4):</p>' +
        '<ul>' +
        '<li><strong>Oceanic crust</strong> covers <strong>55%</strong> of the surface, mostly under the oceans. It is ' +
        'typically about <strong>6 kilometers</strong> thick and made of volcanic rock called ' +
        '<span class="term">basalt</span>, formed by cooling lava and made mainly of silicon, oxygen, iron, aluminum, ' +
        'and magnesium.</li>' +
        '<li><strong>Continental crust</strong> covers <strong>45%</strong> of the surface (some of it also under the ' +
        'oceans). It is <strong>20 to 70 kilometers</strong> thick and made mostly of a different volcanic class of ' +
        'silicates (rocks of silicon and oxygen) called <span class="term">granite</span>.</li>' +
        '</ul>' +
        '<p>Both kinds of crustal rock have densities of about <strong>3 g/cm<sup>3</sup></strong> (water is 1 ' +
        'g/cm<sup>3</sup>). The crust is the easiest layer to study, but it is only about <strong>0.3%</strong> of ' +
        'Earth&rsquo;s mass.</p>' +
        '<div data-figure="8.4"></div>' +
        '<p>The largest part of the solid Earth is the <span class="term">mantle</span>, which reaches from the base of ' +
        'the crust down to a depth of <strong>2900 kilometers</strong>. It is more or less solid, but at its ' +
        'temperatures and pressures the rock can <strong>deform and flow slowly</strong>. Its density rises with depth ' +
        'from about 3.5 to more than 5 g/cm<sup>3</sup>, squeezed by the weight of the rock above. Volcanoes ' +
        'sometimes throw out samples of the upper mantle, so its chemistry can be analyzed in detail.</p>' +
        '<p>Below 2900 kilometers is the dense metallic <span class="term">core</span>. It is <strong>7000 ' +
        'kilometers</strong> across &mdash; bigger than the whole planet Mercury. The <strong>outer core is ' +
        'liquid</strong>; the innermost part (about <strong>2400 kilometers</strong> across) is probably ' +
        '<strong>solid</strong>. Besides iron, the core probably holds a lot of nickel and sulfur, all squeezed to a ' +
        'very high density.</p>' +
        '<div data-diagram="earth-layers"></div>' +
        '<p>Sorting a planet&rsquo;s main ingredients into layers by density is called ' +
        '<strong>differentiation</strong>. That Earth is differentiated suggests it was once hot enough inside to ' +
        '<strong>melt</strong>, letting the heavier metals sink to the center to form the core. The evidence: ' +
        'Earth&rsquo;s overall density (<strong>5.5 g/cm<sup>3</sup></strong>) is much higher than its surface ' +
        'rocks&rsquo; (<strong>3 g/cm<sup>3</sup></strong>), so denser material must be buried in the core.</p>' +
        '<h4>Magnetic field and magnetosphere</h4>' +
        '<p>Earth&rsquo;s magnetic field gives more clues about the interior. Our planet acts in some ways as if a ' +
        'giant <strong>bar magnet</strong> were inside it, lined up roughly with the rotational poles. The field is ' +
        'made by <strong>moving material in the liquid metal core</strong>: as the liquid metal circulates, it sets up ' +
        'a circulating electric current, and many charged particles moving together like that &mdash; in a lab or in a ' +
        'whole planet &mdash; produce a magnetic field.</p>' +
        '<p>The field reaches out into space. A charged particle that meets a magnetic field in space gets ' +
        '<strong>trapped</strong> in it, and above our atmosphere the field traps small amounts of electrons and other ' +
        'atomic particles. This region is the <span class="term">magnetosphere</span>: the zone where Earth&rsquo;s ' +
        'field dominates the weak interplanetary magnetic field that streams out from the Sun (Figure 8.5).</p>' +
        '<div data-figure="8.5"></div>' +
        '<p>The trapped particles come from the hot surface of the Sun, flowing outward as the <strong>solar ' +
        'wind</strong>. The solar wind also stretches our field away from the Sun. Toward the Sun, the magnetosphere ' +
        'typically reaches about <strong>60,000 kilometers</strong>, or <strong>10 Earth radii</strong>; away from the ' +
        'Sun, it can reach as far as the <strong>orbit of the Moon</strong>, and sometimes farther.</p>' +
        '<p>The magnetosphere was discovered in <strong>1958</strong> by instruments on <strong>Explorer 1</strong>, ' +
        'the first US Earth satellite, which recorded ions (charged particles) trapped in its inner part. The regions ' +
        'of high-energy ions are often called the <strong>Van Allen belts</strong>, after the University of Iowa ' +
        'professor who built Explorer 1&rsquo;s instruments. Hundreds of spacecraft have explored the magnetosphere ' +
        'since.</p>',
      keyIdeas: [
        "Earth is a medium-size terrestrial planet about 12,760 km across, made mostly of heavy elements (iron, silicon, oxygen) — unlike the hydrogen-and-helium Sun. It is the only planet in our solar system “just right” for liquid water and life as we know it.",
        "We learn about Earth's interior indirectly, mostly from seismic waves, which bend as they pass through different layers and leave “shadows” at some stations.",
        "Crust: oceanic (basalt, ~6 km thick, 55% of the surface) and continental (granite, 20–70 km thick, 45%), both about 3 g/cm³ — only 0.3% of Earth's mass.",
        "Mantle: the biggest layer, down to 2900 km; mostly solid but able to flow slowly; density 3.5 to more than 5 g/cm³.",
        "Core: 7000 km across (bigger than Mercury), mostly iron with nickel and sulfur; liquid outer core, probably solid inner core about 2400 km across.",
        "Earth is differentiated: its average density (5.5 g/cm³) is far above its surface rocks' (3 g/cm³), so it must once have melted and let metal sink to the center.",
        "Moving liquid metal in the core makes Earth's magnetic field. The magnetosphere traps charged particles from the solar wind; it reaches ~60,000 km (10 Earth radii) toward the Sun and as far as the Moon's orbit (sometimes farther) on the far side. Explorer 1 found it in 1958 (the Van Allen belts)."
      ],
      selfCheck: [
        { q: "How do scientists know what Earth's interior is like if no one can go there?",
          a: "Mainly from seismic waves from earthquakes or explosions. The waves bend as they pass through different materials, so some stations receive them and others are in “shadows.” A network of seismographs lets scientists model the liquid and solid layers inside." },
        { q: "Compare oceanic and continental crust.",
          a: "Oceanic crust is basalt, about 6 km thick, and covers 55% of the surface. Continental crust is granite, 20–70 km thick, and covers 45%. Both have densities of about 3 g/cm³." },
        { q: "Which parts of the core are liquid and which are solid?",
          a: "The outer core is liquid; the innermost part, about 2400 km across, is probably solid." },
        { q: "What evidence shows Earth is differentiated?",
          a: "Earth's overall density is 5.5 g/cm³, but its surface rocks are only about 3 g/cm³, so much denser material must be buried in the core — which means Earth was once hot enough to melt and let heavy metals sink." },
        { q: "What makes Earth's magnetic field?",
          a: "Circulating liquid metal in the outer core sets up a circulating electric current, and the moving charges produce a magnetic field." },
        { q: "Why does the magnetosphere stretch out on the side away from the Sun?",
          a: "The solar wind of charged particles from the Sun “blows” it outward like a wind sock: about 60,000 km (10 Earth radii) toward the Sun, but as far as the Moon's orbit or farther away from it." }
      ]
    },
    {
      id: "8.2",
      title: "Earth’s Crust",
      minutes: 16,
      pages: "pp. 256–263",
      html:
        '<p>Earth&rsquo;s crust is a busy place. Volcanic eruptions, erosion, and large-scale movements of the ' +
        'continents constantly rework our planet&rsquo;s surface. Geologically, Earth is the <strong>most active ' +
        'planet</strong>. Many of the processes here have happened on other planets too, but usually long ago. (Some ' +
        'moons of the giant planets are very active as well &mdash; Jupiter&rsquo;s moon <strong>Io</strong> has a ' +
        'remarkable number of active volcanoes.)</p>' +
        '<h4>Composition of the crust</h4>' +
        '<p>The crust is mostly oceanic basalt and continental granite. Both are <span class="term">igneous ' +
        'rock</span>: any rock that has cooled from a molten state. All volcanic rock is igneous (Figure 8.6).</p>' +
        '<div data-figure="8.6"></div>' +
        '<p>Two other kinds of rock are familiar on Earth, though neither turns out to be common on other planets:</p>' +
        '<ul>' +
        '<li><span class="term">Sedimentary rocks</span> are made of bits of igneous rock or the shells of living ' +
        'things, laid down by wind or water and <strong>cemented together without melting</strong>. Examples: ' +
        'sandstone, shale, and limestone.</li>' +
        '<li><span class="term">Metamorphic rocks</span> form when high temperature or pressure changes igneous or ' +
        'sedimentary rock physically or chemically (<em>metamorphic</em> means &ldquo;changed in form&rdquo;). They ' +
        'exist at Earth&rsquo;s surface only because geological activity carries surface rocks deep down and then ' +
        'brings them back up.</li>' +
        '</ul>' +
        '<p>A fourth, very important kind tells us about the early history of the planetary system: ' +
        '<span class="term">primitive rock</span>, which has largely escaped being changed by heat. It is the ' +
        '<strong>original material</strong> the planets were made from. <strong>None is left on Earth</strong>, ' +
        'because the whole planet was heated early on. To find it, we look to smaller objects &mdash; ' +
        '<strong>comets, asteroids, and small moons</strong> &mdash; sometimes in samples of them that fall to ' +
        'Earth.</p>' +
        '<p>A block of <strong>quartzite</strong> has been through all four states: it began as primitive material ' +
        'before Earth was born; was heated in the young Earth into igneous rock; was chemically changed and laid down ' +
        'again (perhaps many times) as sedimentary rock; and finally was changed several kilometers underground into ' +
        'the hard, white metamorphic stone we see today.</p>' +
        '<div data-diagram="rock-cycle"></div>' +
        '<h4>Plate tectonics</h4>' +
        '<p><strong>Geology</strong> is the study of Earth&rsquo;s crust and the processes that have shaped its surface. ' +
        '(<em>Geo-</em> means &ldquo;related to Earth,&rdquo; but scientists also speak of the geology of other ' +
        'planets.) Heat escaping from the interior supplies the energy to build mountains, valleys, volcanoes, and even ' +
        'the continents and ocean basins. But geologists didn&rsquo;t understand how until the middle of the twentieth ' +
        'century.</p>' +
        '<p><span class="term">Plate tectonics</span> explains how slow motions in the mantle move large pieces of the ' +
        'crust, slowly &ldquo;drifting&rdquo; the continents and building mountains and other large features. It is as ' +
        'basic to geology as evolution by natural selection is to biology, or gravity to planetary orbits. Seen another ' +
        'way, plate tectonics is a <strong>cooling system</strong> for the planet &mdash; an efficient way to carry heat ' +
        'from the interior out to space. Every planet develops some way of moving heat out as it evolves, though the ' +
        'method may differ from Earth&rsquo;s.</p>' +
        '<p>The crust and upper mantle (to about <strong>60 kilometers</strong> deep) are broken into about ' +
        '<strong>a dozen plates</strong> that fit together like a jigsaw puzzle (Figure 8.7). In some places, such as ' +
        'the Atlantic Ocean, the plates are moving apart; in others, such as off the west coast of South America, ' +
        'they are being forced together. The plates are moved by slow <span class="term">convection</span> of the ' +
        'mantle: heat escapes as warmer material flows upward and cooler material slowly sinks. (Convection shows up ' +
        'all over astronomy, in stars as well as planets &mdash; and in the water you boil for coffee while studying ' +
        'for astronomy exams.)</p>' +
        '<div data-figure="8.7"></div>' +
        '<p>The plates move at an average of <strong>4 to 5 centimeters per year</strong> &mdash; about the rate your ' +
        'hair grows. As they move, they bump into each other and slowly but dramatically change the crust. At their ' +
        'boundaries, plates can do <strong>four</strong> things: (1) <strong>pull apart</strong>, (2) one can ' +
        '<strong>burrow under</strong> another, (3) they can <strong>slide alongside</strong> each other, or (4) they ' +
        'can <strong>jam together</strong>.</p>' +
        '<div data-diagram="plate-boundary"></div>' +
        '<div class="callout-inline"><strong>Voyagers in astronomy: Alfred Wegener, catching the drift.</strong> On a ' +
        'map, the coasts of North and South America look as if they could fit fairly well against Europe and Africa ' +
        '&mdash; as though the landmasses were once together and then torn apart. Others had noticed this (including ' +
        'Francis Bacon as early as <strong>1620</strong>), but it stayed speculation until the twentieth century, when ' +
        'the German meteorologist and astronomer <strong>Alfred Wegener</strong> made the case for ' +
        '<strong>continental drift</strong> (Figure 8.8). Born in Berlin in <strong>1880</strong>, he was fascinated ' +
        'from childhood by Greenland, the world&rsquo;s largest island. He earned a doctorate in astronomy by ' +
        're-examining thirteenth-century astronomical tables, but turned more and more to Earth&rsquo;s weather; with ' +
        'his brother he set a world record in <strong>1906</strong> by flying for <strong>52 hours</strong> in a ' +
        'balloon. He first thought of continental drift in <strong>1910</strong> while looking at a world map, took 2 ' +
        'years to gather enough data to propose it publicly, and published it as a book in <strong>1915</strong>. His ' +
        'evidence went beyond the matching shapes: similar <strong>fossils</strong> found only in South America and ' +
        'Africa, and resemblances among living species on different continents, best explained if the continents had ' +
        'once been joined in a supercontinent he called <strong>Pangaea</strong> (from Greek for &ldquo;all ' +
        'land&rdquo;). Most scientists reacted with hostility &mdash; mainly because he had <strong>no ' +
        'mechanism</strong>: nobody could explain how solid continents could drift thousands of miles. In 1924 he was ' +
        'given a professorship created for him at the University of Graz (where most of the geology faculty shunned ' +
        'him). On his fourth expedition to Greenland, he celebrated his fiftieth birthday and set off on foot for another ' +
        'camp; he was found days later, dead of an apparent heart attack. Critics of science sometimes point to his story ' +
        'as proof that scientists reject new ideas unfairly. The book sees it more positively: scientists stayed ' +
        'skeptical because they needed more evidence and a mechanism that fit what they knew. Once both were clear ' +
        '(plate tectonics, after decades of work in geology, oceanography, and geophysics), Wegener&rsquo;s idea quickly ' +
        'became the centerpiece of our view of a dynamic Earth.</div>' +
        '<div data-figure="8.8"></div>' +
        '<h4>Rift and subduction zones</h4>' +
        '<p>Plates pull apart along <span class="term">rift zones</span>, such as the <strong>Mid-Atlantic ridge</strong>, ' +
        'driven by rising currents in the mantle (Figure 8.9). A few rift zones are on land &mdash; the best known is ' +
        'the <strong>central African rift</strong>, where Africa is slowly breaking apart &mdash; but most are under ' +
        'the oceans. Molten rock rises to fill the gap between the separating plates; this is basaltic lava, the ' +
        'igneous rock that forms most of the ocean basins.</p>' +
        '<div data-figure="8.9"></div>' +
        '<p>Knowing how fast the seafloor spreads lets us work out the average age of the oceanic crust. About ' +
        '<strong>60,000 kilometers</strong> of active rifts are known, separating at about <strong>5 centimeters per ' +
        'year</strong>. That adds about <strong>2 square kilometers</strong> of new crust each year &mdash; enough to ' +
        'renew the entire ocean floor in a little more than <strong>100 million years</strong>, less than ' +
        '<strong>3%</strong> of Earth&rsquo;s age. So the present ocean basins are among the <strong>youngest</strong> ' +
        'features on our planet.</p>' +
        '<p>As new crust is added, old crust must go somewhere. Where two plates meet, one is often forced beneath the ' +
        'other in a <span class="term">subduction</span> zone. Thick continents generally can&rsquo;t be subducted, ' +
        'but thinner <strong>oceanic plates</strong> can be thrust down into the upper mantle fairly easily. A ' +
        'subduction zone is often marked by an <strong>ocean trench</strong>, such as the deep <strong>Japan ' +
        'trench</strong>. The sinking plate melts several hundred kilometers down, and its material joins a downward ' +
        'convection current, balancing the material rising at rift zones. About as much crust is <strong>destroyed</strong> ' +
        'at subduction zones as is <strong>made</strong> at rifts.</p>' +
        '<p>Earthquakes and volcanoes mark the &ldquo;death throes&rdquo; of the sinking plate. Some of the most ' +
        'destructive earthquakes in history struck subduction zones: the <strong>1923 Yokohama</strong> earthquake ' +
        'and fire (100,000 killed), the <strong>2004 Sumatra</strong> earthquake and tsunami (more than 200,000 ' +
        'killed), and the <strong>2011 Tohoku</strong> earthquake, which led to the meltdown of three nuclear power ' +
        'reactors in Japan.</p>' +
        '<h4>Fault zones and mountain building</h4>' +
        '<p>Along much of their length, plates slide <strong>past each other</strong>. These boundaries are marked by ' +
        'cracks called <span class="term">faults</span>. Along active faults, one plate moves past the other by ' +
        'several centimeters per year &mdash; about the same as the spreading at rifts.</p>' +
        '<p>One of the most famous is the <strong>San Andreas Fault</strong> in California, on the boundary between ' +
        'the <strong>Pacific plate</strong> and the <strong>North American plate</strong> (Figure 8.10). It runs from ' +
        'the Gulf of California to the Pacific Ocean northwest of San Francisco. The Pacific plate, to the west, is ' +
        'moving <strong>north</strong>, carrying Los Angeles, San Diego, and parts of the southern California coast ' +
        'with it. In several million years, Los Angeles may be an island off the coast of San Francisco.</p>' +
        '<div data-figure="8.10"></div>' +
        '<p>Unfortunately, the motion isn&rsquo;t smooth. The creeping plates build up <strong>stress</strong> in the ' +
        'crust, which is released in sudden, violent slips: <strong>earthquakes</strong>. Since the plates move at a ' +
        'steady average rate, the <strong>longer</strong> the wait between earthquakes, the <strong>more</strong> ' +
        'stress builds and the more energy is released when the ground finally moves. Near the town of ' +
        '<strong>Parkfield</strong> in central California, the fault has slipped every <strong>25 years</strong> or ' +
        'so during the past century, about <strong>1 meter</strong> each time. In the <strong>Los Angeles</strong> ' +
        'region, the average wait between major earthquakes is about <strong>150 years</strong>, and the average slip ' +
        'is about <strong>7 meters</strong>. The fault last slipped there in <strong>1857</strong>; tension has been ' +
        'building ever since, and sooner or later it will be released. Instruments show the Los Angeles basin ' +
        'distorting and shrinking as the pressure builds.</p>' +
        '<p class="callout-inline"><strong>Worked example 8.1: fault zones and plate motion.</strong> The Pacific plate ' +
        'moves past the North American plate at about <strong>5 cm per year</strong> &mdash; 500 cm, or 5 m, per ' +
        'century. Suppose the next slip on the San Andreas Fault in southern California happens in <strong>2027</strong> ' +
        'and fully relieves the built-up strain. From 1857 to 2027 is 170 years, or 1.7 centuries, so the slip needed ' +
        'is 5 m/century &times; 1.7 centuries = <strong>8.5 m</strong>. <em>Check your learning:</em> if the next major ' +
        'quake comes in <strong>2047</strong> and relieves only <strong>half</strong> the strain, how much slip? From ' +
        '1857 to 2047 is 190 years, or 1.9 centuries; releasing half the strain is like using half the rate, so the ' +
        'slip is 0.5 &times; 5 m/century &times; 1.9 centuries = <strong>4.75 m</strong>.</p>' +
        '<div data-diagram="fault-slip"></div>' +
        '<p>When two <strong>continents</strong> are on a collision course, they push against each other under great ' +
        'pressure. The crust buckles and folds, dragging some rock deep down and raising other folds to heights of ' +
        'many kilometers. That is how many (not all) of Earth&rsquo;s mountain ranges formed &mdash; the ' +
        '<strong>Alps</strong>, for example, come from the African plate bumping into the Eurasian plate. (Quite ' +
        'different processes made the mountains on other planets.)</p>' +
        '<p>Once mountains are pushed up, <strong>water and ice</strong> erode them. Their sharp peaks and jagged edges ' +
        'have little to do with the forces that raised them; they come from the processes that tear mountains down. Ice ' +
        'is an especially good sculptor of rock (Figure 8.11). On a world without moving ice or running water (such as ' +
        'the Moon or Mercury), mountains stay <strong>smooth and dull</strong>.</p>' +
        '<div data-figure="8.11"></div>' +
        '<h4>Volcanoes</h4>' +
        '<p><span class="term">Volcanoes</span> mark places where lava rises to the surface. They appear:</p>' +
        '<ul>' +
        '<li>at <strong>mid-ocean ridges</strong> &mdash; long undersea mountain ranges built by lava rising from the ' +
        'mantle at plate boundaries;</li>' +
        '<li>along <strong>subduction zones</strong>, and sometimes where continental plates collide;</li>' +
        '<li>above mantle <strong>&ldquo;hot spots&rdquo;</strong> &mdash; places far from plate boundaries where heat ' +
        'still rises from inside Earth.</li>' +
        '</ul>' +
        '<p>Each kind lets us sample material from deeper inside the planet. One of the best-known hot spots is under ' +
        'the island of <strong>Hawaii</strong>, where it now heats <strong>three active volcanoes</strong> (two on ' +
        'land, one under the ocean). It has been active for at least <strong>100 million years</strong>, and as the ' +
        'plate moved over it, it built a <strong>3500-kilometer</strong> chain of volcanic islands. The tallest ' +
        'Hawaiian volcanoes are among the largest single mountains on Earth: more than <strong>100 km</strong> across ' +
        'and rising <strong>9 km</strong> above the ocean floor. One of them, the now-dormant <strong>Maunakea</strong>, ' +
        'is one of the world&rsquo;s great sites for astronomy.</p>' +
        '<p>Not every eruption builds a mountain. Lava flowing fast from long cracks can spread into <strong>lava ' +
        'plains</strong>. The largest known eruptions on Earth, which made the <strong>Snake River basalts</strong> in ' +
        'the northwestern United States and the <strong>Deccan plateau</strong> in India, were of this kind. Similar ' +
        'lava plains are found on the Moon and the other terrestrial planets.</p>',
      keyIdeas: [
        "Earth is geologically the most active planet; its crust is constantly reworked by volcanoes, erosion, and moving continents.",
        "Four kinds of rock: igneous (cooled from molten — basalt, granite), sedimentary (bits or shells cemented together without melting), metamorphic (changed by heat or pressure), and primitive (original, unheated material — none left on Earth; found in comets, asteroids, small moons).",
        "Plate tectonics: about a dozen plates of crust and upper mantle (to ~60 km) are moved 4–5 cm per year by mantle convection. It's Earth's cooling system.",
        "At their edges, plates pull apart (rift zones, like the Mid-Atlantic ridge), dive under one another (subduction zones, often with trenches), slide past (faults, like the San Andreas), or jam together (mountains, like the Alps).",
        "New ocean floor forms at rifts (~2 km² per year) and is destroyed at subduction zones at about the same rate, so the ocean basins are young — renewed in a little over 100 million years.",
        "Stress builds along faults and is released in earthquakes; the longer the wait, the bigger the slip (Example 8.1: 5 m per century × 1.7 centuries = 8.5 m).",
        "Volcanoes form at mid-ocean ridges, subduction zones, colliding continents, and hot spots like Hawaii's (a 3500-km island chain). Fast-flowing lava can make lava plains instead of mountains.",
        "Alfred Wegener proposed continental drift (Pangaea) but lacked a mechanism; plate tectonics later supplied it."
      ],
      selfCheck: [
        { q: "Why is there no primitive rock left on Earth, and where can we find some?",
          a: "The whole planet was heated early in its history, changing all its original material. Primitive rock survives in smaller objects — comets, asteroids, and small moons — and sometimes in samples of them that fall to Earth." },
        { q: "What is the difference between sedimentary and metamorphic rock?",
          a: "Sedimentary rock is made of fragments or shells laid down by wind or water and cemented together without melting. Metamorphic rock is igneous or sedimentary rock that has been changed by high temperature or pressure." },
        { q: "What drives the motion of the plates?",
          a: "Slow convection in the mantle: warmer material flows upward and cooler material slowly sinks, carrying heat out of the interior." },
        { q: "What happens at a rift zone, and what happens at a subduction zone?",
          a: "At a rift zone, plates pull apart and rising basaltic lava fills the gap, making new crust. At a subduction zone, one (oceanic) plate is forced under another and melts deep in the mantle, destroying old crust." },
        { q: "Why are the ocean basins among the youngest features on Earth?",
          a: "New seafloor is made at rifts (about 2 km² per year) and old seafloor is destroyed at subduction zones, so all the oceanic crust is renewed in a little more than 100 million years — less than 3% of Earth's age." },
        { q: "If the San Andreas Fault near Los Angeles next slips in 2027 and releases all the strain since 1857, how far will it slip?",
          a: "5 m per century × 1.7 centuries = 8.5 m." },
        { q: "Why did most scientists reject Wegener's idea of continental drift?",
          a: "He had a lot of evidence but no mechanism — no one could explain how solid continents could drift thousands of miles. Once plate tectonics provided one, his idea was quickly accepted." }
      ]
    },
    {
      id: "8.3",
      title: "Earth’s Atmosphere",
      minutes: 11,
      pages: "pp. 263–267",
      html:
        '<p>We live at the bottom of an ocean of air. Pulled down by gravity, the atmosphere presses on the surface ' +
        'with a pressure at sea level that scientists define as <strong>1 <span class="term">bar</span></strong> (the ' +
        'word comes from the same root as <em>barometer</em>, the instrument that measures air pressure). One bar means ' +
        'each square centimeter of the surface has the weight of about <strong>1.03 kilograms</strong> pressing on it. ' +
        'Humans evolved to live at this pressure; much lower or higher and we don&rsquo;t function well.</p>' +
        '<p>The atmosphere&rsquo;s total mass is about <strong>5 &times; 10<sup>18</sup> kilograms</strong>. That ' +
        'sounds huge, but it&rsquo;s only about <strong>a millionth</strong> of Earth&rsquo;s mass &mdash; a smaller ' +
        'share of Earth than the hair on your head is of you.</p>' +
        '<h4>Structure of the atmosphere</h4>' +
        '<p>Most of the air is packed near the surface, in about the bottom <strong>10 kilometers</strong>, where clouds ' +
        'form and airplanes fly (Figure 8.12). This layer is the <span class="term">troposphere</span>. Warm air heated ' +
        'by the ground rises and is replaced by sinking cooler air &mdash; <strong>convection</strong> &mdash; which ' +
        'makes clouds and wind. In the troposphere the temperature <strong>drops</strong> quickly with height, to ' +
        'about <strong>50 &deg;C below freezing</strong> at its top, where the <span class="term">stratosphere</span> ' +
        'begins. Most of the stratosphere, which reaches about <strong>50 kilometers</strong> up, is cold and free of ' +
        'clouds.</p>' +
        '<div data-figure="8.12"></div>' +
        '<p>Near the top of the stratosphere is a layer of <span class="term">ozone</span> (O<sub>3</sub>), a form of ' +
        'oxygen with <strong>three</strong> atoms per molecule instead of the usual two. Ozone absorbs ' +
        '<strong>ultraviolet</strong> light well, so it shields the surface from some of the Sun&rsquo;s dangerous UV ' +
        '&mdash; making life on land possible. Ozone breaking apart also heats the stratosphere, reversing the cooling ' +
        'trend of the troposphere. In the <strong>1980s</strong> it became clear that human activities were destroying ' +
        'ozone. By international agreement, the industrial chemicals responsible, <strong>chlorofluorocarbons ' +
        '(CFCs)</strong>, have been phased out. As a result, ozone loss has stopped and the &ldquo;ozone hole&rdquo; over ' +
        'the Antarctic is gradually shrinking &mdash; an example of how countries acting together can help keep Earth ' +
        'habitable.</p>' +
        '<p>Above <strong>100 kilometers</strong>, the air is so thin that satellites can orbit through it with very ' +
        'little friction. Many atoms there have lost an electron (they are <strong>ionized</strong>), so this region is ' +
        'often called the <strong>ionosphere</strong>. Here, single atoms sometimes escape Earth&rsquo;s gravity ' +
        'completely, so the atmosphere slowly <strong>leaks</strong> away &mdash; especially lightweight atoms, which ' +
        'move faster than heavy ones. Earth can&rsquo;t hold on to <strong>hydrogen or helium</strong> for long. Other ' +
        'planets leak too: leakage helped give <strong>Mars</strong> its thin atmosphere, and <strong>Venus</strong> is ' +
        'dry because, so close to the Sun, its water was vaporized and broken apart, and the pieces were lost to ' +
        'space. (Figure 8.12 also shows a <strong>mesosphere</strong> between the stratosphere and the ' +
        'ionosphere.)</p>' +
        '<div data-diagram="air-layers"></div>' +
        '<h4>Atmospheric composition and origin</h4>' +
        '<p>At the surface, the air is <strong>78% nitrogen</strong> (N<sub>2</sub>), <strong>21% oxygen</strong> ' +
        '(O<sub>2</sub>), and <strong>1% argon</strong> (Ar), with traces of water vapor (H<sub>2</sub>O), carbon ' +
        'dioxide (CO<sub>2</sub>), and other gases, plus varying amounts of dust and water droplets.</p>' +
        '<p>A full count of Earth&rsquo;s <strong>volatile</strong> materials &mdash; those that evaporate at fairly low ' +
        'temperatures &mdash; has to include more than today&rsquo;s gas. If Earth were heated above the boiling point ' +
        'of water (<strong>100 &deg;C, or 373 K</strong>) &mdash; a big change for humans but a small one by cosmic ' +
        'standards &mdash; the <strong>oceans would boil</strong> into the atmosphere. There&rsquo;s enough water to ' +
        'cover the whole Earth about <strong>300 meters</strong> deep, and every 10 meters of water presses with about ' +
        '1 bar, so the average pressure on the ocean floor is about <strong>300 bars</strong>. Water weighs the same as ' +
        'liquid or vapor, so boiled-off oceans would add <strong>300 bars</strong> of water vapor &mdash; making ' +
        'nitrogen and oxygen mere traces. Heating would also release CO<sub>2</sub> from the <strong>carbonate ' +
        'rocks</strong> of the crust: about <strong>70 bars</strong>, far more than today&rsquo;s CO<sub>2</sub> ' +
        'pressure of only <strong>0.0005 bar</strong>. So a warm Earth&rsquo;s air would be mostly water vapor and ' +
        'carbon dioxide, with a surface pressure <strong>nearing 400 bars</strong>.</p>' +
        '<div data-diagram="warm-earth"></div>' +
        '<p>Several lines of evidence show the atmosphere&rsquo;s makeup has <strong>changed</strong> over Earth&rsquo;s ' +
        'history; for example, scientists can tell how much oxygen there was by studying minerals that formed at ' +
        'different times (more in the next section). Today, volcanoes release CO<sub>2</sub>, H<sub>2</sub>O, sulfur ' +
        'dioxide (SO<sub>2</sub>), and other gases from deep inside Earth &mdash; though for CO<sub>2</sub> the main ' +
        'source today is <strong>burning fossil fuels</strong>, which releases far more than volcanoes. Much of the ' +
        'volcanic gas is actually <strong>recycled</strong> material, carried down by subduction.</p>' +
        '<p>Where did the <strong>original</strong> atmosphere and oceans come from? Three possibilities: (1) they formed ' +
        'with the rest of Earth from the debris left over from the Sun&rsquo;s formation; (2) they were released from ' +
        'the interior by volcanic activity after Earth formed; or (3) they came from <strong>impacts</strong> of comets ' +
        'and asteroids from the outer solar system. Current evidence favors <strong>a combination of the interior and ' +
        'impact sources</strong>.</p>' +
        '<h4>Weather and climate</h4>' +
        '<p>Every planet with an atmosphere has <strong>weather</strong> &mdash; the circulation of its atmosphere. ' +
        'Weather is powered mainly by <strong>sunlight</strong> heating the surface. Earth&rsquo;s rotation and the ' +
        'slower seasonal changes vary how much sunlight different places get, and the air and oceans carry heat from ' +
        'warmer areas to cooler ones. Weather is the atmosphere&rsquo;s response to changing energy input from the Sun ' +
        '(Figure 8.13).</p>' +
        '<div data-figure="8.13"></div>' +
        '<p><strong>Climate</strong> means the effects of the atmosphere that last for decades and centuries. Climate ' +
        'changes (unlike the random year-to-year swings of weather) are hard to detect over short times, but as they ' +
        'add up, their effect can be devastating. As the saying goes, &ldquo;<em>Climate is what you expect, and ' +
        'weather is what you get.</em>&rdquo; Modern farming is very sensitive: a drop of only <strong>2 &deg;C</strong> ' +
        'through the growing season would cut wheat production in <strong>half</strong> in Canada and the United ' +
        'States. At the other extreme, a <strong>2 &deg;C</strong> rise in Earth&rsquo;s average temperature would ' +
        'melt many glaciers, including much of Greenland&rsquo;s ice, raising sea level by as much as <strong>10 ' +
        'meters</strong> &mdash; flooding many coastal cities and ports and putting small islands under water.</p>' +
        '<p>The best-documented climate changes are the great <strong>ice ages</strong>, which have periodically ' +
        'cooled the Northern Hemisphere over the past half million years or so (Figure 8.14). The last one ended about ' +
        '<strong>14,000 years ago</strong> and lasted some <strong>20,000 years</strong>. At its height, the ice was ' +
        'almost <strong>2 kilometers</strong> thick over Boston and reached as far south as New York City.</p>' +
        '<div data-figure="8.14"></div>' +
        '<p>The ice ages came mainly from changes in the <strong>tilt of Earth&rsquo;s axis</strong>, caused by the ' +
        'gravity of the other planets. Less certain is the evidence that at least once (perhaps twice), about ' +
        '<strong>a billion years ago</strong>, the entire ocean froze over &mdash; a situation called ' +
        '<strong>snowball Earth</strong>. Life itself has also changed the makeup and temperature of the atmosphere, as ' +
        'the next section shows.</p>',
      keyIdeas: [
        "Sea-level air pressure is 1 bar — about 1.03 kg pressing on each square centimeter. The atmosphere's mass (5 × 10¹⁸ kg) is only about a millionth of Earth's.",
        "Layers: troposphere (bottom ~10 km; convection, clouds, weather; cools to about −50 °C at its top), stratosphere (to ~50 km; cold, cloud-free, with the ozone layer near its top), mesosphere, and ionosphere (above 100 km; ionized, very thin).",
        "Ozone (O₃) absorbs ultraviolet light and protects life. CFCs that destroyed it have been phased out, and the Antarctic ozone hole is gradually shrinking.",
        "Light atoms like hydrogen and helium slowly leak away into space from the top of the atmosphere.",
        "Today's air: 78% nitrogen, 21% oxygen, 1% argon, plus traces. A warmer Earth would add ~300 bars of water vapor (boiled oceans) and ~70 bars of CO₂ (from carbonate rocks), for nearly 400 bars.",
        "The original atmosphere and oceans most likely came from a combination of gases from the interior (volcanoes) and impacts of comets and asteroids.",
        "Weather = the atmosphere's circulation, powered by sunlight. Climate = effects lasting decades to centuries. “Climate is what you expect, and weather is what you get.”",
        "Ice ages (the last ended ~14,000 years ago) were caused mainly by changes in the tilt of Earth's axis."
      ],
      selfCheck: [
        { q: "What happens to temperature as you climb through the troposphere, and why does it change in the stratosphere?",
          a: "It drops quickly with height, to about 50 °C below freezing at the top of the troposphere. Higher up, ozone breaking apart adds heat to the stratosphere, reversing that cooling trend." },
        { q: "Why is the ozone layer important, and what has happened to it since the 1980s?",
          a: "Ozone absorbs dangerous ultraviolet light from the Sun, making life on the surface possible. Human-made CFCs were destroying it; after they were phased out by international agreement, ozone loss stopped and the Antarctic ozone hole is slowly shrinking." },
        { q: "Why can't Earth hold on to hydrogen and helium?",
          a: "Above 100 km, single atoms can escape Earth's gravity, and lightweight atoms move faster than heavy ones, so they leak away into space." },
        { q: "If Earth's oceans boiled, what would the air pressure of the water vapor be, and why?",
          a: "About 300 bars. There's enough water to cover Earth about 300 m deep, every 10 m of water presses with about 1 bar, and water weighs the same as a vapor as it does as a liquid." },
        { q: "What is the difference between weather and climate?",
          a: "Weather is the day-to-day circulation of the atmosphere; climate is the effects that last decades and centuries. “Climate is what you expect, and weather is what you get.”" },
        { q: "What mainly caused the ice ages?",
          a: "Changes in the tilt of Earth's rotational axis, produced by the gravity of the other planets." }
      ]
    },
    {
      id: "8.4",
      title: "Life, Chemical Evolution, and Climate Change",
      minutes: 14,
      pages: "pp. 267–272",
      html:
        '<p>As far as we know, Earth is the only planet in the solar system with life. Life arose early in Earth&rsquo;s ' +
        'history and has been interacting with its surroundings for billions of years. Living things have evolved to ' +
        'fit Earth&rsquo;s environment &mdash; and we now realize that <strong>Earth itself has been changed</strong> in ' +
        'important ways by life. Studying how life and our planet evolved together is part of the modern science of ' +
        '<strong>astrobiology</strong>.</p>' +
        '<h4>The origin of life</h4>' +
        '<p>The record of life&rsquo;s birth has been lost in the restless motions of the crust. Chemical evidence ' +
        'shows that by the time the oldest surviving rocks formed, about <strong>3.9 billion years ago</strong>, life ' +
        'already existed. By <strong>3.5 billion years ago</strong>, life was building large colonies called ' +
        '<strong>stromatolites</strong> &mdash; a design so successful that stromatolites still grow today (Figure ' +
        '8.15). But few rocks survive from those times, and <strong>abundant fossils</strong> exist only for the past ' +
        '<strong>600 million years</strong> &mdash; less than 15% of Earth&rsquo;s history.</p>' +
        '<div data-figure="8.15"></div>' +
        '<p>There is little direct evidence of how life began. We know the early atmosphere, unlike today&rsquo;s, had ' +
        'plenty of <strong>carbon dioxide</strong> and some <strong>methane</strong>, but <strong>no oxygen gas</strong>. ' +
        'Without oxygen, many complex chemical reactions can make amino acids, proteins, and other building blocks of ' +
        'life, so these were probably available very early and combined to form living things. For tens of millions of ' +
        'years after Earth formed, life (perhaps little more than large molecules, like today&rsquo;s viruses) probably ' +
        'lived in warm, nutrient-rich seas, feeding on stored-up organic chemicals. When that easy food ran low, life ' +
        'began the long evolutionary road to today&rsquo;s vast variety &mdash; and began to change the ' +
        'atmosphere.</p>' +
        '<p>Besides chemical and fossil evidence in ancient rocks, scientists use <strong>genetics and genomics</strong> ' +
        '&mdash; the study of the genetic code shared by all life. Each person&rsquo;s genes are unique (which is why ' +
        'genetic &ldquo;fingerprinting&rdquo; helps solve crimes), but we share a lot: your genome (the complete map of ' +
        'the DNA in your body) is identical at the <strong>99.9%</strong> level to that of Julius Caesar or Marie Curie, ' +
        'and human and chimpanzee genomes match at the <strong>99%</strong> level. Comparing gene sequences shows that ' +
        '<strong>all life on Earth descends from a common ancestor</strong>, and the differences measure how closely ' +
        'species are related.</p>' +
        '<p>These tools built the &ldquo;<strong>tree of life</strong>&rdquo; (Figure 8.16), which compares one RNA ' +
        'sequence that all species share. It shows life is dominated by <strong>microscopic</strong> creatures you&rsquo;ve ' +
        'probably never heard of; plants and animals are two little branches at the far right. Most of life&rsquo;s ' +
        'diversity, and most of our evolution, happened at the microbial level &mdash; there are more microbes in a ' +
        'bucket of soil than stars in the Galaxy. So when we search for life on other worlds, the &ldquo;aliens&rdquo; ' +
        'most likely to be out there are <strong>microbes</strong>.</p>' +
        '<div data-figure="8.16"></div>' +
        '<p>Genetic studies also suggest that the earliest surviving life-forms were all adapted to <strong>high ' +
        'temperatures</strong>, so life may have begun in extremely hot places. Another intriguing possibility: life ' +
        'began on <strong>Mars</strong> (which cooled sooner) and was &ldquo;seeded&rdquo; onto Earth by meteorites. Mars ' +
        'rocks still reach Earth, but so far none has shown evidence of carrying microorganisms here.</p>' +
        '<h4>The evolution of the atmosphere</h4>' +
        '<p>A key step was <strong>blue-green algae</strong>, a very successful life-form that takes in carbon dioxide ' +
        'and releases <strong>oxygen</strong> as a waste product. These microorganisms spread and gave rise to all the ' +
        'life-forms we call plants. Because the energy to build new plant material comes from sunlight, the process is ' +
        'called <span class="term">photosynthesis</span>.</p>' +
        '<p>The chemistry of ancient rocks shows the atmosphere lacked abundant free oxygen until about <strong>2 ' +
        'billion years ago</strong>, even though plants were already releasing it &mdash; reactions with the crust ' +
        'apparently removed the oxygen as fast as it formed. Slowly, more sophisticated life meant more plants and more ' +
        'oxygen. Meanwhile, more geological activity caused heavy erosion that <strong>buried</strong> much plant carbon ' +
        'before it could recombine with oxygen into CO<sub>2</sub>.</p>' +
        '<p>Once free oxygen began building up (about 2 billion years ago), it formed the <strong>ozone layer</strong>, ' +
        'which shields the surface from deadly solar ultraviolet light. Before that, life couldn&rsquo;t leave the ' +
        'protective oceans, and the land was barren. Oxygen and ozone allowed life to <strong>colonize the land</strong> ' +
        'and let <strong>animals</strong> flourish &mdash; living off the organic material made by plants and, in time, ' +
        'breathing oxygen directly. In a funny way, we are life-forms that evolved to breathe the <strong>waste product ' +
        'of plants</strong>. Plants and related microbes are the primary producers, using sunlight to make ' +
        'energy-rich &ldquo;food&rdquo; for the rest of us.</p>' +
        '<p>On a planetary scale, life has <strong>reduced</strong> the CO<sub>2</sub> in the air. Without life, Earth ' +
        'would probably have an atmosphere dominated by CO<sub>2</sub>, like Mars or Venus; living things, together ' +
        'with high geological activity, have stripped most of it away.</p>' +
        '<div data-diagram="life-timeline"></div>' +
        '<h4>The greenhouse effect and global warming</h4>' +
        '<p>We care about atmospheric CO<sub>2</sub> because it helps hold in the Sun&rsquo;s heat through the ' +
        '<span class="term">greenhouse effect</span>. Sunlight passes through the atmosphere, is absorbed by the ground, ' +
        'and heats the surface. At Earth&rsquo;s surface temperature, that energy is given off again as ' +
        '<strong>infrared</strong>, or heat, radiation (Figure 8.17). The air lets visible light through, but some of ' +
        'its molecules are good at absorbing infrared. So CO<sub>2</sub> (along with <strong>methane</strong> and ' +
        '<strong>water vapor</strong>) &mdash; the <span class="term">greenhouse gases</span> &mdash; act like a ' +
        '<strong>blanket</strong>, trapping heat and slowing its escape to space. To stay in balance, the surface and ' +
        'lower atmosphere must warm up until Earth radiates as much energy to space as it receives from the Sun. ' +
        '<strong>The more CO<sub>2</sub>, the higher the temperature</strong> at which that new balance is reached.</p>' +
        '<div data-figure="8.17"></div>' +
        '<p>It is like a gardener&rsquo;s greenhouse, or a car left in the Sun with the windows up: the glass lets ' +
        'sunlight in but slows the outward flow of heat radiation, so the inside gets much hotter than sunlight alone ' +
        'would make it. On Earth, today&rsquo;s greenhouse effect raises the surface temperature by about ' +
        '<strong>23 &deg;C</strong>. Without it, the average temperature would be well <strong>below freezing</strong>, ' +
        'and Earth would be locked in a global ice age.</p>' +
        '<div data-diagram="greenhouse-blanket"></div>' +
        '<p>That&rsquo;s the good news. The bad news is that greenhouse heating is <strong>increasing</strong>. Modern ' +
        'industry runs on <strong>fossil fuels</strong> &mdash; in effect, energy-rich material made by photosynthesis ' +
        'tens of millions of years ago. Burning (oxidizing) ancient coal and oil releases large amounts of CO<sub>2</sub>. ' +
        'Destroying tropical forests, which pull CO<sub>2</sub> out of the air and replenish our oxygen, makes it worse. ' +
        'In the past century, atmospheric CO<sub>2</sub> rose by about <strong>30%</strong>, and it is still rising by ' +
        'more than <strong>0.5% per year</strong>.</p>' +
        '<p>Before the end of this century, CO<sub>2</sub> is expected to reach <strong>twice</strong> its level before ' +
        'the industrial revolution (Figure 8.18). The results are likely to be complex changes in climate, possibly ' +
        'catastrophic for many species. Many scientists study this <strong>global warming</strong> with detailed ' +
        'computer models, and climate change has become the greatest known threat (barring nuclear war) to industrial ' +
        'civilization and to our planet&rsquo;s ecology.</p>' +
        '<div data-figure="8.18"></div>' +
        '<p>Climate change is already easy to see. Temperature records keep being set and broken; all but one of the ' +
        'hottest recorded years have come <strong>since 2000</strong>. Glaciers are retreating, and Arctic sea ice is ' +
        'much thinner than when nuclear submarines first explored it in the 1950s. <strong>Rising sea levels</strong> ' +
        '(from melting glaciers and from water expanding as it warms) are one of the most immediate threats, and many ' +
        'coastal cities plan dikes or seawalls. The rate of warming has no historical precedent, and we are entering ' +
        '&ldquo;unknown territory,&rdquo; heading for the highest temperatures on Earth in more than <strong>50 million ' +
        'years</strong>.</p>' +
        '<h4>Human impacts on our planet</h4>' +
        '<p>Earth is so big and old that some people find it hard to believe humans can really change it. Many are ' +
        'surprised that burning fossil fuels releases <strong>100 times</strong> as much CO<sub>2</sub> as volcanoes do. ' +
        'But the data clearly show our climate is changing fast, and that almost all of the change comes from ' +
        '<strong>human activity</strong>.</p>' +
        '<p>This isn&rsquo;t the first time humans have dramatically altered the environment. <strong>50,000 years ' +
        'ago</strong>, much of the planet supported large animals like those now found only in Africa: giant marsupials ' +
        'in Australia (diprotodon and zygomaturus, the size of today&rsquo;s elephants) and a kangaroo 10 feet tall; ' +
        'mammoths, saber-tooth cats, mastodons, giant sloths, and even camels in North America and North Asia; large ' +
        'birds on the Pacific islands; and vast forests where the farms of Europe and China are now. Early hunters ' +
        'killed many large mammals and marsupials, early farmers cut down most of the forests, and the Polynesian ' +
        'expansion across the Pacific doomed the large birds.</p>' +
        '<p>An even greater <strong>mass extinction</strong> is now under way because of rapid climate change. ' +
        'Scientists have proposed a new name for the current epoch, the <strong>anthropocene</strong> &mdash; when human ' +
        'activity began to have a significant global effect. It isn&rsquo;t an officially approved name, but it ' +
        'captures the idea that humans are now the dominant influence on our planet&rsquo;s atmosphere and ecology, for ' +
        'better or worse.</p>',
      keyIdeas: [
        "Life existed by the time the oldest surviving rocks formed, about 3.9 billion years ago; stromatolite colonies appear by 3.5 billion years ago. Abundant fossils cover only the last 600 million years (less than 15% of Earth's history).",
        "The early atmosphere had lots of CO₂, some methane, and no oxygen — conditions in which life's chemical building blocks form easily.",
        "Genetics shows all life descends from a common ancestor; the tree of life (three domains: bacteria, archaea, eukarya) is dominated by microbes.",
        "Photosynthesis by blue-green algae (and later plants) released oxygen. Free oxygen built up about 2 billion years ago, forming the ozone layer, which let life move onto land.",
        "Life and geology have stripped most CO₂ from Earth's air; without life, Earth's air would probably be mostly CO₂, like Mars's or Venus's.",
        "Greenhouse effect: sunlight heats the ground, the ground gives off infrared, and greenhouse gases (CO₂, methane, water vapor) absorb it. It keeps Earth about 23 °C warmer — without it, Earth would be frozen.",
        "Burning fossil fuels has raised CO₂ by about 30% in the past century (100 times the CO₂ from volcanoes); it's expected to double the preindustrial level before 2100, driving global warming.",
        "Humans have changed Earth before (killing off large animals, clearing forests); the proposed name “anthropocene” recognizes our global influence."
      ],
      selfCheck: [
        { q: "Why are there so few fossils from early in Earth's history?",
          a: "Few rocks survive from those ancient times — the crust's restless motions have erased the record. Abundant fossils have been preserved only for the past 600 million years, less than 15% of Earth's history." },
        { q: "What does the tree of life tell us about life on Earth?",
          a: "Life is dominated by microscopic creatures; plants and animals are just small branches. All life shares a common ancestor, and most of life's diversity and evolution has been microbial." },
        { q: "Plants released oxygen long before it built up in the air. Why the delay until about 2 billion years ago?",
          a: "Chemical reactions with the crust removed the oxygen as fast as it formed. Only as plant populations grew, and erosion buried plant carbon before it could recombine with oxygen, did free oxygen accumulate." },
        { q: "How did oxygen in the atmosphere make life on land possible?",
          a: "Oxygen formed the ozone layer, which shields the surface from deadly solar ultraviolet light. Before that, life couldn't leave the protective oceans." },
        { q: "Explain the greenhouse effect in three steps.",
          a: "(1) Visible sunlight passes through the air and heats the ground. (2) The warm ground gives off infrared (heat) radiation. (3) Greenhouse gases like CO₂, methane, and water vapor absorb that infrared, so the surface must warm up until Earth radiates as much energy as it receives." },
        { q: "Is the greenhouse effect good or bad for us?",
          a: "Both. Today's natural greenhouse effect keeps Earth about 23 °C warmer — without it, Earth would be frozen. But adding CO₂ by burning fossil fuels raises the balance temperature, causing global warming." }
      ]
    },
    {
      id: "8.5",
      title: "Cosmic Influences on the Evolution of Earth",
      minutes: 12,
      pages: "pp. 272–277",
      html:
        '<p>So far we&rsquo;ve talked about Earth being shaped from <strong>inside</strong>, by plate tectonics and ' +
        'volcanoes. On the Moon, by contrast, we mostly see <strong>craters</strong> from impacts of interplanetary ' +
        'debris like asteroids and comets. Why don&rsquo;t we see more of them on Earth?</p>' +
        '<h4>Where are the craters on Earth?</h4>' +
        '<p>Earth can&rsquo;t have escaped the debris that pockmarked the Moon &mdash; cosmically speaking, the Moon is ' +
        'next door. Our atmosphere does burn up <strong>small</strong> pieces (which we see as meteors, or shooting ' +
        'stars), but it is no shield against the <strong>large</strong> impacts that make craters several kilometers ' +
        'across. So Earth must have been hit as heavily as the Moon. The difference is that on Earth, <strong>active ' +
        'geology destroys craters</strong> before they can pile up: as plate tectonics renews the crust, the evidence is ' +
        'slowly erased. Only in the past few decades have geologists identified the eroded remains of many impact ' +
        'craters (Figure 8.19) &mdash; and realized that impacts have strongly influenced the evolution of life.</p>' +
        '<div data-figure="8.19"></div>' +
        '<h4>Recent impacts</h4>' +
        '<p>Collisions with interplanetary debris are not just a theory. On <strong>June 30, 1908</strong>, near the ' +
        '<strong>Tunguska</strong> River in Siberia, there was a remarkable explosion in the atmosphere about ' +
        '<strong>8 kilometers</strong> above the surface. The shock wave flattened more than a thousand square ' +
        'kilometers of forest (Figure 8.20). Herds of reindeer and other animals were killed, and a man at a trading ' +
        'post <strong>80 kilometers</strong> away was thrown from his chair and knocked unconscious. Instruments that ' +
        'measure air pressure recorded the blast wave spreading around the world.</p>' +
        '<div data-figure="8.20"></div>' +
        '<p>Yet <strong>no crater</strong> formed. The stony object, about <strong>50 meters</strong> across, was ' +
        'shattered by air pressure and <strong>broke up above the surface</strong>, with a blast like a 10-megaton ' +
        'nuclear bomb. (The caption of Figure 8.20 calls it a 5-megaton explosion &mdash; the book gives both ' +
        'figures.) Had it been smaller or more fragile, it would have spent its energy high up and probably gone ' +
        'unnoticed; such high-altitude explosions are now routinely monitored by military surveillance systems. Had it ' +
        'been <strong>larger or stronger</strong> (made of metal, say), it would have reached the ground and made a ' +
        'crater. Imagine if it had exploded over New York City in 1908 &mdash; it might be remembered as one of the ' +
        'deadliest events in history.</p>' +
        '<p>Tens of thousands of people saw a smaller (<strong>20-meter</strong>) object explode over the Russian city ' +
        'of <strong>Chelyabinsk</strong> on an early winter morning in <strong>2013</strong>. It burst <strong>21 ' +
        'kilometers</strong> up in a flash brighter than the Sun, and the shock wave from the <strong>0.5-megaton</strong> ' +
        'explosion broke tens of thousands of windows and sent hundreds of people to the hospital. People easily ' +
        'collected the rock fragments (meteorites) because they landed on fresh snow.</p>' +
        '<p>The best-known recent crater formed about <strong>50,000 years ago</strong> in Arizona, made by a lump of ' +
        '<strong>iron</strong> about <strong>40 meters</strong> across. Now called <strong>Meteor Crater</strong> (a ' +
        'tourist stop on the way to the Grand Canyon), it is about <strong>a mile across</strong> and has all the ' +
        'features of similar-size craters on the Moon (Figure 8.21). It is one of the few impact features on Earth that ' +
        'are still fairly intact; some older ones are so eroded only a trained eye can spot them. Even so, more than ' +
        '<strong>150</strong> have been identified.</p>' +
        '<div data-figure="8.21"></div>' +
        '<div data-diagram="impact-compare"></div>' +
        '<h4>Mass extinction</h4>' +
        '<p>The Meteor Crater impact released energy equal to a 10-megaton nuclear bomb &mdash; dramatic, but only ' +
        'locally; it had no global effects. Much larger (and rarer) impacts can upset the ecological balance of the ' +
        'whole planet and change the course of evolution.</p>' +
        '<p>The best-documented large impact happened <strong>65 million years ago</strong>, at the end of the ' +
        '<strong>Cretaceous</strong> period. It is marked by a <span class="term">mass extinction</span> in which more ' +
        'than <strong>half</strong> of all species died out. The fossil record holds a dozen or more mass extinctions, ' +
        'but this one marks the <strong>end of the dinosaurs</strong>: after tens of millions of years of flourishing, ' +
        'they suddenly vanished (with many other species), and afterward <strong>mammals</strong> began the development ' +
        'that led to us.</p>' +
        '<p>The object struck a shallow sea in what is now Mexico&rsquo;s <strong>Yucat&aacute;n peninsula</strong>. Its ' +
        'mass was more than <strong>a trillion tons</strong>, worked out from a worldwide layer of sediment that settled ' +
        'from the dust cloud after the impact. Found in <strong>1979</strong>, this layer is rich in the rare metal ' +
        '<strong>iridium</strong> and other elements fairly common in asteroids and comets but very rare in Earth&rsquo;s ' +
        'crust. It also holds minerals typical of the temperatures and pressures of a gigantic explosion.</p>' +
        '<p>The impact released energy equal to <strong>5 billion Hiroshima-size</strong> nuclear bombs and dug a crater ' +
        '<strong>200 kilometers</strong> across, deep enough to break through Earth&rsquo;s crust. Named ' +
        '<strong>Chicxulub</strong> after a small town near its center, it has since been buried in sediment, but its ' +
        'outline can still be traced (Figure 8.22). The blast lifted about <strong>100 trillion tons</strong> of dust ' +
        'into the air &mdash; measured from the thickness of the layer that settled out.</p>' +
        '<div data-figure="8.22"></div>' +
        '<p>That much dust would have blocked sunlight completely, plunging Earth into <strong>cold and darkness</strong> ' +
        'for several months. Many plants died, leaving plant-eaters without food. There were also huge ' +
        '<strong>fires</strong>, started by hot flying debris, that destroyed much of the world&rsquo;s forests and ' +
        'grasslands, and a long period of <strong>acid rain</strong>. These environmental effects &mdash; not the ' +
        'explosion itself &mdash; caused the mass extinction, including the end of the dinosaurs.</p>' +
        '<h4>Impacts and the evolution of life</h4>' +
        '<p>Many &mdash; perhaps most &mdash; mass extinctions had other causes. But for the dinosaur killer, the cosmic ' +
        'impact certainly played a critical role, perhaps as the &ldquo;final straw&rdquo; in a series of climatic ' +
        'disturbances that caused the &ldquo;great dying.&rdquo;</p>' +
        '<p>A catastrophe for one group can be an opportunity for another. After each mass extinction comes a burst of ' +
        'evolution as new species fill the empty niches. Sixty-five million years ago, our ancestors, the mammals, began ' +
        'to thrive when so many other species died out &mdash; we are the lucky beneficiaries.</p>' +
        '<p>Impacts by comets and asteroids are the <strong>only</strong> mechanisms we know of that could cause truly ' +
        'global catastrophes and seriously affect the evolution of life all over the planet. As paleontologist ' +
        '<strong>Stephen Jay Gould</strong> of Harvard noted, this changes our view of evolution: surviving takes more ' +
        'than competing with other species and adapting to slowly changing conditions, as in Darwin&rsquo;s natural ' +
        'selection &mdash; a species must also survive <strong>random global catastrophes</strong>.</p>' +
        '<p>Even earlier, Earth was hit by much larger leftovers of planet formation. The Moon was struck repeatedly by ' +
        'objects more than <strong>100 kilometers</strong> across &mdash; <strong>1000 times</strong> more massive than ' +
        'the dinosaur killer &mdash; and Earth must have had similar impacts during its first <strong>700 million ' +
        'years</strong>. Some were probably violent enough to strip away most of the atmosphere and boil away the oceans, ' +
        'sterilizing the planet. Life may have formed and been wiped out several times before our microbial ancestors ' +
        'took hold, about <strong>4 billion years ago</strong>.</p>' +
        '<p>Such impacts may also explain why the oldest surviving microbes are <strong>thermophiles</strong> (adapted ' +
        'to very high temperatures). An impact just too small to sterilize the planet would still have killed ' +
        'everything in &ldquo;normal&rdquo; environments, leaving only heat-loving life. So the oldest surviving ' +
        'life-forms are probably what was left after a kind of <strong>evolutionary bottleneck</strong> caused by ' +
        'repeated large impacts.</p>' +
        '<h4>Impacts in our future?</h4>' +
        '<p>Major impacts aren&rsquo;t over. In the full span of planetary history, 65 million years ago was just ' +
        'yesterday. Earth orbits within a sort of cosmic shooting gallery: big impacts are rare, but humanity could ' +
        'suffer the dinosaurs&rsquo; fate, or lose a city to a much more frequent Tunguska-like impact, unless we learn ' +
        'to predict the next one and protect ourselves. Our solar system&rsquo;s large outer planets may help: their ' +
        'gravity can pull in cosmic debris and shield us from larger, more frequent impacts.</p>' +
        '<p>Beginning in the <strong>1990s</strong>, a few astronomers analyzed the impact hazard and persuaded the ' +
        'government to support a search for potentially hazardous asteroids, now called the <strong>NASA Spaceguard ' +
        'Survey</strong>, using several small, sophisticated wide-field telescopes. We already know that no asteroid as ' +
        'big as the dinosaur killer (<strong>10&ndash;15 kilometers</strong>) is currently on a collision course with ' +
        'Earth, so the survey now concentrates on smaller ones. By <strong>2021</strong>, it had found more than ' +
        '<strong>98 percent</strong> of the hazardous near-Earth asteroids larger than <strong>1 kilometer</strong>.</p>' +
        '<p>The <strong>Vera Rubin Telescope</strong>, which will scan the full sky regularly, has recently joined the ' +
        'search, and NASA is developing an orbiting search telescope. Asteroids not yet discovered will be found and ' +
        'evaluated one by one. These surveys are among the few truly life-and-death projects in astronomy. Scientists ' +
        'are also studying how to protect Earth if a large asteroid were found on a collision course: in ' +
        '<strong>2022</strong>, NASA&rsquo;s <strong>DART</strong> (Double Asteroid Redirection Test) spacecraft crashed ' +
        'into the small asteroid Dimorphos and slightly changed its orbit.</p>',
      keyIdeas: [
        "Earth was hit as heavily as the Moon, but active geology (plate tectonics, erosion) erases craters. More than 150 impact craters have been identified.",
        "Our atmosphere burns up small debris but is no shield against large impacts.",
        "Tunguska (1908): a ~50-m stony object exploded ~8 km above Siberia (the book gives both 5 and 10 megatons), flattening more than 1000 km² of forest but making no crater.",
        "Chelyabinsk (2013): a 20-m object exploded 21 km up (0.5 megaton), breaking tens of thousands of windows.",
        "Meteor Crater, Arizona: about a mile across, made ~50,000 years ago by a 40-m lump of iron (10 megatons) — a local, not global, disaster.",
        "65 million years ago, a more-than-trillion-ton impact at Chicxulub (Yucatán) made a 200-km crater and a worldwide iridium-rich layer. Dust, darkness, cold, fires, and acid rain caused a mass extinction that ended the dinosaurs and let mammals thrive.",
        "Large early impacts may have sterilized Earth more than once; the oldest surviving life (thermophiles) may be survivors of that bottleneck.",
        "The NASA Spaceguard Survey had found more than 98% of hazardous near-Earth asteroids larger than 1 km by 2021; DART (2022) showed we can nudge an asteroid's orbit."
      ],
      selfCheck: [
        { q: "Why does the Moon have so many more craters than Earth?",
          a: "Both were hit at the same rate, but Earth's active geology — plate tectonics renewing the crust, plus erosion — erases craters before they can accumulate. The Moon has no such activity." },
        { q: "Why did the Tunguska explosion leave no crater?",
          a: "The ~50-m stony object was shattered by atmospheric pressure and exploded about 8 km above the ground. Only the heat and shock wave reached the surface. A larger or stronger (metal) object would have reached the ground and made a crater." },
        { q: "What evidence shows a huge impact happened 65 million years ago?",
          a: "A worldwide sediment layer, found in 1979, rich in iridium (common in asteroids and comets but rare in Earth's crust), with minerals typical of a gigantic explosion — plus the buried 200-km Chicxulub crater in the Yucatán." },
        { q: "What actually killed the dinosaurs — the explosion itself?",
          a: "No — the environmental effects: about 100 trillion tons of dust blocked sunlight for months (cold and dark, so plants died and plant-eaters starved), plus worldwide fires and a long period of acid rain." },
        { q: "How did the dinosaur-killing impact help us?",
          a: "After a mass extinction, new species evolve to fill the empty niches. Sixty-five million years ago, mammals — our ancestors — began to thrive when so many other species died out." },
        { q: "What is the Spaceguard Survey and what has it found?",
          a: "A NASA search for potentially hazardous asteroids using wide-field telescopes. It has shown no dinosaur-killer-size asteroid (10–15 km) is on a collision course, and by 2021 had found more than 98% of the hazardous near-Earth asteroids larger than 1 km." }
      ]
    }
  ];

  /* ------------------------------------------------------------------ GLOSSARY */
  CH.glossary = [
    { term: "Bar", section: "8.3", def: "A force of 100,000 Newtons acting on a surface area of 1 square meter; the average pressure of Earth's atmosphere at sea level is 1.013 bars." },
    { term: "Basalt", section: "8.1", def: "Igneous rock produced by the cooling of lava; makes up most of Earth's oceanic crust and is found on other planets that have experienced extensive volcanic activity." },
    { term: "Convection", section: "8.2", def: "Movement caused within a gas or liquid by the tendency of hotter, and therefore less dense material, to rise and colder, denser material to sink under the influence of gravity, which consequently results in transfer of heat." },
    { term: "Core", section: "8.1", def: "The central part of the planet; consists of higher density material." },
    { term: "Crust", section: "8.1", def: "The outer layer of a terrestrial planet." },
    { term: "Fault", section: "8.2", def: "In geology, a crack or break in the crust of a planet along which slippage or movement can take place, accompanied by seismic activity." },
    { term: "Granite", section: "8.1", def: "A type of igneous silicate rock that makes up most of Earth's continental crust." },
    { term: "Greenhouse effect", section: "8.4", def: "The blanketing (absorption) of infrared radiation near the surface of a planet—for example, by CO₂ in its atmosphere." },
    { term: "Greenhouse gas", section: "8.4", def: "A gas in an atmosphere that absorbs and emits radiation within the thermal infrared range; on Earth, these atmospheric gases primarily include carbon dioxide, methane, and water vapor." },
    { term: "Igneous rock", section: "8.2", def: "Rock produced by cooling from a molten state." },
    { term: "Magnetosphere", section: "8.1", def: "The region around a planet in which its intrinsic magnetic field dominates the interplanetary field carried by the solar wind; hence, the region within which charged particles can be trapped by the planetary magnetic field." },
    { term: "Mantle", section: "8.1", def: "The largest part of Earth's interior; lies between the crust and the core." },
    { term: "Mass extinction", section: "8.5", def: "The sudden disappearance in the fossil record of a large number of species of life, to be replaced by fossils of new species in subsequent layers; mass extinctions are indicators of catastrophic changes in the environment, such as might be produced by a large impact on Earth." },
    { term: "Metamorphic rock", section: "8.2", def: "Rock produced by physical and chemical alteration (without melting) under high temperature and pressure." },
    { term: "Ozone (O₃)", section: "8.3", def: "A heavy molecule of oxygen that contains three atoms rather than the more normal two." },
    { term: "Photosynthesis", section: "8.4", def: "A complex sequence of chemical reactions through which some living things can use sunlight to manufacture products that store energy (such as carbohydrates), releasing oxygen as one byproduct." },
    { term: "Plate tectonics", section: "8.2", def: "The motion of segments or plates of the outer layer of a planet over the underlying mantle." },
    { term: "Primitive rock", section: "8.2", def: "Rock that has not experienced great heat or pressure and therefore remains representative of the original condensed materials from the solar nebula." },
    { term: "Rift zone", section: "8.2", def: "In geology, a place where the crust is being torn apart by internal forces generally associated with the injection of new material from the mantle and with the slow separation of tectonic plates." },
    { term: "Sedimentary rock", section: "8.2", def: "Rock formed by the deposition and cementing of fine grains of material, such as pieces of igneous rock or the shells of living things." },
    { term: "Seismic wave", section: "8.1", def: "A vibration that travels through the interior of Earth or any other object; on Earth, these are generally caused by earthquakes." },
    { term: "Stratosphere", section: "8.3", def: "The layer of Earth's atmosphere above the troposphere and below the ionosphere." },
    { term: "Subduction", section: "8.2", def: "The sideways and downward movement of the edge of a plate of Earth's crust into the mantle beneath another plate." },
    { term: "Troposphere", section: "8.3", def: "The lowest level of Earth's atmosphere, where most weather takes place." },
    { term: "Volcano", section: "8.2", def: "A place where material from a planet's mantle erupts on its surface." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "8.1", q: "How have scientists mapped the layers deep inside Earth?",
      choices: ["By measuring seismic waves from earthquakes and explosions", "By drilling down to the core", "By photographing the core from space", "By sampling the core in volcanic lava"],
      answer: 0,
      whyWrong: [null, "Our direct experience reaches only a few kilometers into the crust.", "No telescope can see inside Earth; the interior must be studied indirectly.", "Volcanoes sometimes bring up upper-mantle samples, not core material."],
      explain: "Seismic waves bend as they pass through different layers, leaving some stations in “shadows”; a network of seismographs reveals the liquid and solid layers." },
    { section: "8.1", q: "Which kind of crust is made of basalt and is about 6 km thick?",
      choices: ["Oceanic crust", "Continental crust", "The mantle", "The inner core"],
      answer: 0,
      whyWrong: [null, "Continental crust is granite, 20 to 70 km thick.", "The mantle is below the crust and reaches down to 2900 km.", "The inner core is metal at Earth's center."],
      explain: "Oceanic crust covers 55% of the surface, is typically about 6 km thick, and is made of basalt." },
    { section: "8.1", q: "Which part of Earth is liquid?",
      choices: ["The outer core", "The inner core", "The mantle", "The continental crust"],
      answer: 0,
      whyWrong: [null, "The inner core (about 2400 km across) is probably solid.", "The mantle is more or less solid, though it can flow slowly.", "The crust is solid rock."],
      explain: "The outer core is liquid metal; its motion generates Earth's magnetic field." },
    { section: "8.1", q: "Earth's average density is 5.5 g/cm³, but its surface rocks are about 3 g/cm³. What does that suggest?",
      choices: ["Denser material is buried in the core, so Earth is differentiated", "Earth is hollow inside", "The crust is the densest layer", "Earth is made mostly of water"],
      answer: 0,
      whyWrong: [null, "A hollow Earth would have a lower average density, not a higher one.", "The crust is the least dense layer, about 3 g/cm³.", "Water is only 1 g/cm³ — far too light."],
      explain: "Comparing the bulk density with the surface rocks shows that heavy metal must have sunk to the center when Earth was once melted." },
    { section: "8.1", q: "What generates Earth's magnetic field?",
      choices: ["Circulating liquid metal in the core", "The solar wind", "Magnetic rocks in the crust", "The Moon's gravity"],
      answer: 0,
      whyWrong: [null, "The solar wind stretches the field and supplies trapped particles, but doesn't make the field.", "The book traces the field to moving material in the liquid core, not the crust.", "Gravity doesn't produce a magnetic field."],
      explain: "Circulating liquid metal sets up a circulating electric current, and moving charges produce a magnetic field." },
    { section: "8.1", q: "How far does the magnetosphere typically reach toward the Sun?",
      choices: ["About 60,000 km (10 Earth radii)", "As far as the Moon's orbit", "About 6 km", "About 2900 km"],
      answer: 0,
      whyWrong: [null, "That's on the side away from the Sun, where the solar wind stretches it.", "6 km is the typical thickness of oceanic crust.", "2900 km is the depth of the base of the mantle."],
      explain: "Toward the Sun it reaches about 60,000 km; away from the Sun, the solar wind stretches it to the Moon's orbit or beyond." },
    { section: "8.2", q: "A rock that cooled from molten lava is what kind of rock?",
      choices: ["Igneous", "Sedimentary", "Metamorphic", "Primitive"],
      answer: 0,
      whyWrong: [null, "Sedimentary rock is cemented together without melting.", "Metamorphic rock is changed by heat or pressure without melting.", "Primitive rock has largely escaped being changed by heat."],
      explain: "Igneous rock is any rock that cooled from a molten state; all volcanic rock is igneous." },
    { section: "8.2", q: "Why is there no primitive rock left on Earth?",
      choices: ["The whole planet was heated early in its history", "It has all been mined", "It all sank into the core", "Earth never had any"],
      answer: 0,
      whyWrong: [null, "Primitive rock disappeared long before humans — the heating changed it.", "It wasn't sorted away by sinking; heating changed it chemically.", "Earth was made from primitive material — it was changed by heating."],
      explain: "Primitive rock is original, unheated material; we find it in comets, asteroids, and small moons." },
    { section: "8.2", q: "What provides the power to move Earth's plates?",
      choices: ["Slow convection in the mantle", "The Moon's tides", "Earthquakes", "Winds in the atmosphere"],
      answer: 0,
      whyWrong: [null, "The book credits mantle convection, not tides.", "Earthquakes are a result of plate motion, not its cause.", "Winds move air, not continents."],
      explain: "Warmer mantle material rises and cooler material sinks — convection carries heat out and drives the plates." },
    { section: "8.2", q: "Where do plates pull apart and make new crust?",
      choices: ["Rift zones, like the Mid-Atlantic ridge", "Subduction zones, like the Japan trench", "Faults, like the San Andreas", "Hot spots, like Hawaii"],
      answer: 0,
      whyWrong: [null, "At subduction zones crust is destroyed, not made.", "At faults the plates slide past each other.", "Hot spots are far from plate boundaries."],
      explain: "At rift zones, upwelling mantle pulls plates apart and basaltic lava fills the gap." },
    { section: "8.2", q: "Why are the ocean basins among the youngest features on Earth?",
      choices: ["Ocean crust is renewed in a little over 100 million years", "The oceans formed only 14,000 years ago", "Oceans are refilled every year by comets", "Ocean crust never melts"],
      answer: 0,
      whyWrong: [null, "14,000 years ago is when the last ice age ended.", "The book doesn't say comets refill the oceans each year.", "Ocean crust does melt — when it is subducted."],
      explain: "Seafloor made at rifts (~2 km² a year) and destroyed at subduction zones renews all the oceanic crust in a little more than 100 million years." },
    { section: "8.2", q: "The San Andreas Fault lies between which two plates?",
      choices: ["The Pacific and North American plates", "The African and Eurasian plates", "The Pacific and Eurasian plates", "The North and South American plates"],
      answer: 0,
      whyWrong: [null, "Those two plates bumping together made the Alps.", "The book places the San Andreas between the Pacific and North American plates.", "The book places the San Andreas between the Pacific and North American plates."],
      explain: "The Pacific plate, to the west, moves north past the North American plate, carrying Los Angeles and San Diego with it." },
    { section: "8.2", q: "Plates slide at 5 m per century. If the fault near Los Angeles last slipped in 1857 and next slips in 2027, releasing all the strain, how far will it slip?",
      choices: ["8.5 m", "5 m", "1.7 m", "170 m"],
      answer: 0,
      whyWrong: [null, "That's one century's worth; 1857 to 2027 is 1.7 centuries.", "1.7 is the number of centuries, not the slip.", "That uses years as if they were centuries."],
      explain: "Example 8.1: 5 m/century × 1.7 centuries = 8.5 m." },
    { section: "8.2", q: "What built the 3500-km chain of Hawaiian islands?",
      choices: ["A hot spot under the moving plate", "A subduction zone", "Two continents colliding", "A rift zone on land"],
      answer: 0,
      whyWrong: [null, "Hawaii is far from plate boundaries; it isn't at a subduction zone.", "Colliding continents make ranges like the Alps.", "The best-known rift on land is in central Africa."],
      explain: "The Hawaii hot spot has been active for at least 100 million years; as the plate moved over it, it built a chain of volcanic islands." },
    { section: "8.3", q: "Where does most of Earth's weather happen?",
      choices: ["In the troposphere", "In the stratosphere", "In the ionosphere", "In the magnetosphere"],
      answer: 0,
      whyWrong: [null, "The stratosphere is mostly cold and free of clouds.", "The ionosphere, above 100 km, is too thin for weather.", "The magnetosphere is a magnetic zone in space, above the atmosphere."],
      explain: "The troposphere is the bottom ~10 km, where convection makes clouds and wind." },
    { section: "8.3", q: "What does the ozone layer do for us?",
      choices: ["Absorbs much of the Sun's dangerous ultraviolet light", "Traps infrared heat to warm the surface", "Makes Earth's magnetic field", "Holds in hydrogen and helium"],
      answer: 0,
      whyWrong: [null, "Trapping infrared is the greenhouse effect of CO₂, methane, and water vapor.", "The magnetic field comes from the liquid core.", "Earth can't hold on to hydrogen or helium — they leak away."],
      explain: "Ozone (O₃), near the top of the stratosphere, absorbs ultraviolet light, making life on the surface possible." },
    { section: "8.3", q: "What is the air at Earth's surface made of?",
      choices: ["78% nitrogen, 21% oxygen, 1% argon", "78% oxygen, 21% nitrogen, 1% argon", "Mostly carbon dioxide", "Mostly water vapor"],
      answer: 0,
      whyWrong: [null, "Nitrogen and oxygen are switched.", "CO₂ is only a trace gas — about 0.0005 bar.", "Water vapor is a trace today; it would dominate only if the oceans boiled."],
      explain: "Nitrogen (78%), oxygen (21%), and argon (1%), with traces of water vapor, CO₂, and other gases." },
    { section: "8.3", q: "If Earth warmed enough to boil its oceans, about how much water vapor pressure would be added?",
      choices: ["About 300 bars", "About 1 bar", "About 70 bars", "About 0.0005 bar"],
      answer: 0,
      whyWrong: [null, "1 bar is today's total air pressure.", "70 bars is the CO₂ that heated carbonate rocks would release.", "That's today's CO₂ pressure."],
      explain: "The oceans would cover Earth about 300 m deep, and every 10 m of water presses with about 1 bar." },
    { section: "8.3", q: "Where does current evidence say Earth's original atmosphere and oceans came from?",
      choices: ["A combination of gases from the interior and impacts of comets and asteroids", "Only from the Sun's solar wind", "Only from the debris that formed Earth", "From photosynthesis"],
      answer: 0,
      whyWrong: [null, "The solar wind isn't one of the book's three possibilities.", "That's one possibility, but current evidence favors interior plus impacts.", "Photosynthesis added oxygen much later; it didn't make the original atmosphere."],
      explain: "The three possibilities are formation with Earth, release from the interior, and impacts; the evidence favors interior plus impacts." },
    { section: "8.3", q: "What mainly caused the ice ages?",
      choices: ["Changes in the tilt of Earth's axis, caused by the other planets' gravity", "Large asteroid impacts", "The ozone hole", "Changes in Earth's magnetic field"],
      answer: 0,
      whyWrong: [null, "Impacts can cause short-term cold, but the book links the ice ages to axial tilt.", "The ozone hole is a modern problem caused by CFCs.", "The book doesn't connect the magnetic field to the ice ages."],
      explain: "The ice ages were primarily the result of changes in the tilt of Earth's rotational axis." },
    { section: "8.4", q: "What did the early atmosphere lack that today's has?",
      choices: ["Oxygen gas", "Carbon dioxide", "Methane", "Water vapor"],
      answer: 0,
      whyWrong: [null, "The early atmosphere had plenty of carbon dioxide.", "It had some methane.", "The book describes the early air as rich in CO₂ with some methane; the missing ingredient was oxygen."],
      explain: "Early Earth's air had abundant CO₂ and some methane but no oxygen gas — good conditions for making life's chemical building blocks." },
    { section: "8.4", q: "About when did free oxygen begin to build up in the atmosphere?",
      choices: ["About 2 billion years ago", "About 3.9 billion years ago", "About 600 million years ago", "About 65 million years ago"],
      answer: 0,
      whyWrong: [null, "3.9 billion years ago is when the oldest surviving rocks formed.", "600 million years is how far back abundant fossils go.", "65 million years ago is the dinosaur-ending impact."],
      explain: "Reactions with the crust removed oxygen until about 2 billion years ago; then it accumulated and formed the ozone layer." },
    { section: "8.4", q: "According to the tree of life, most of life's diversity is found among what?",
      choices: ["Microbes", "Animals", "Plants", "Fungi"],
      answer: 0,
      whyWrong: [null, "Animals are just a short branch at the far right.", "Plants are also a short branch at the far right.", "Fungi share those short branches with plants and animals."],
      explain: "Life is dominated by microscopic creatures — there are more microbes in a bucket of soil than stars in the Galaxy." },
    { section: "8.4", q: "In the greenhouse effect, what do greenhouse gases absorb?",
      choices: ["Infrared (heat) radiation given off by the warm surface", "Visible sunlight coming in", "Ultraviolet light", "Radio waves"],
      answer: 0,
      whyWrong: [null, "Visible light passes through the air to heat the ground.", "Absorbing ultraviolet is the ozone layer's job.", "The book's greenhouse effect is about infrared."],
      explain: "The ground re-emits the Sun's energy as infrared, which CO₂, methane, and water vapor absorb like a blanket." },
    { section: "8.4", q: "By about how much does today's greenhouse effect raise Earth's surface temperature?",
      choices: ["About 23 °C", "About 2 °C", "About 100 °C", "It cools Earth"],
      answer: 0,
      whyWrong: [null, "2 °C is the change the book says could halve wheat crops or raise seas 10 m.", "100 °C is the boiling point of water.", "It warms Earth — without it, Earth would be well below freezing."],
      explain: "The greenhouse effect elevates the surface temperature by about 23 °C; without it, Earth would be locked in a global ice age." },
    { section: "8.4", q: "Compared with volcanoes, how much CO₂ does burning fossil fuels release?",
      choices: ["About 100 times more", "About the same", "About half as much", "About 10 times less"],
      answer: 0,
      whyWrong: [null, "Many people are surprised to learn it's far more.", "Fossil fuels are now the main source of CO₂, far ahead of volcanoes.", "Fossil fuels release far more, not less."],
      explain: "The CO₂ from burning fossil fuels is 100 times greater than that emitted by volcanoes." },
    { section: "8.5", q: "Why does Earth have far fewer visible craters than the Moon?",
      choices: ["Active geology erases them", "Earth's atmosphere stops all impactors", "Earth was hit much less often", "Earth's magnetic field deflects asteroids"],
      answer: 0,
      whyWrong: [null, "The air burns up small pieces but is no shield against large impacts.", "Earth must have been hit as heavily as the Moon.", "A magnetic field traps charged particles; it can't stop rocks."],
      explain: "Plate tectonics and erosion destroy craters before they can accumulate." },
    { section: "8.5", q: "What happened at Tunguska in 1908?",
      choices: ["A ~50-m stony object exploded in the air, flattening forest without making a crater", "A 40-m iron object made a crater a mile across", "A 10-km asteroid caused a mass extinction", "A 20-m object exploded over a city and broke windows"],
      answer: 0,
      whyWrong: [null, "That's Meteor Crater in Arizona, about 50,000 years ago.", "That's the Chicxulub impact 65 million years ago.", "That's Chelyabinsk in 2013."],
      explain: "It exploded about 8 km up; only heat and shock reached the ground, flattening more than 1000 km² of forest." },
    { section: "8.5", q: "Which clue in a worldwide sediment layer points to a cosmic impact 65 million years ago?",
      choices: ["Lots of iridium, common in asteroids but rare in Earth's crust", "Lots of oxygen", "Dinosaur bones", "Lots of granite"],
      answer: 0,
      whyWrong: [null, "Oxygen isn't the impact signature.", "Bones tell us the dinosaurs died out, not what hit Earth.", "Granite is ordinary continental crust."],
      explain: "The layer, found in 1979, is rich in iridium and contains minerals typical of a gigantic explosion." },
    { section: "8.5", q: "What actually caused the mass extinction 65 million years ago?",
      choices: ["Environmental effects — months of dust-darkened cold, fires, and acid rain", "The blast wave alone", "Mammals eating dinosaur eggs", "A sudden ice age caused by axial tilt"],
      answer: 0,
      whyWrong: [null, "The book says the environmental effects, not the explosion itself, did the killing.", "Mammals began to thrive afterward; they didn't cause it.", "Axial tilt explains the ice ages, not this extinction."],
      explain: "About 100 trillion tons of dust blocked sunlight for months; plants died and food chains collapsed, with fires and acid rain adding to the damage." },
    { section: "8.5", q: "By 2021, what share of the hazardous near-Earth asteroids larger than 1 km had the Spaceguard Survey found?",
      choices: ["More than 98%", "About 50%", "About 10%", "None yet"],
      answer: 0,
      whyWrong: [null, "The survey has found far more than half.", "The survey has found nearly all of the large ones.", "It has found most of them — and none is dinosaur-killer size on a collision course."],
      explain: "The survey now concentrates on smaller potential impactors." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[8] = CH;
})();
