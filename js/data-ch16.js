/* =============================================================================
   Astronomy 2e — Chapter 16: The Sun: A Nuclear Powerhouse
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 16), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[16].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 16,
    chapterTitle: "The Sun: A Nuclear Powerhouse",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/16-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 535–564"
  };

  CH.tools = ["sunenergy", "massenergy", "ppchain", "hydrostatic", "energyflow", "sunobs"];

  /* ---------------------------------- ONE STUDY TOOL PER TOPIC: match data */
  CH.sunenergymatch = [
    { a: "Watt", b: "a unit of power: one joule of energy per second" },
    { a: "Conservation of energy", b: "energy can’t be created or destroyed, only changed from one form to another" },
    { a: "Chemical burning", b: "a Sun made of coal or wood would last no more than a few thousand years" },
    { a: "Falling meteorites", b: "would need an Earth’s mass every 100 years — and would change our year by 2 seconds per year" },
    { a: "Kelvin and Helmholtz", b: "proposed the Sun shines by slowly shrinking under its own gravity" },
    { a: "40 meters per year", b: "how fast the Sun would have to contract to power itself by gravity" },
    { a: "100 million years", b: "how long contraction could keep the Sun shining — far too short" },
    { a: "Nearly 4 billion years", b: "how long water has been on Earth’s surface, so the Sun must have shone at least this long" }
  ];
  CH.massenergymatch = [
    { a: "E = mc²", b: "Einstein’s equation: mass and energy are equivalent" },
    { a: "c²", b: "the conversion factor — the speed of light squared, a very large number" },
    { a: "1 gram of matter", b: "as much energy as burning 15,000 barrels of oil" },
    { a: "Positron", b: "the antielectron: same mass as an electron, positive charge" },
    { a: "Neutrino", b: "a neutral particle with a tiny mass that hardly ever interacts with matter" },
    { a: "Strong nuclear force", b: "a short-range attraction that holds the nucleus together" },
    { a: "Fusion", b: "light nuclei joining into a heavier one (up to iron), releasing energy" },
    { a: "Fission", b: "heavy nuclei breaking into lighter ones (down to iron), releasing energy" },
    { a: "Iron", b: "the most stable nucleus — the most binding energy" }
  ];
  CH.ppchainmatch = [
    { a: "Step 1", b: "¹H + ¹H → ²H + positron + neutrino" },
    { a: "Step 2", b: "²H + ¹H → ³He + gamma ray" },
    { a: "Step 3", b: "³He + ³He → ⁴He + ¹H + ¹H" },
    { a: "Deuterium", b: "hydrogen with one proton and one neutron" },
    { a: "12 million K", b: "the minimum temperature for two protons to fuse" },
    { a: "0.71%", b: "the fraction of hydrogen’s mass turned into energy when it becomes helium" },
    { a: "600 million tons", b: "hydrogen turned into helium in the Sun every second" },
    { a: "CNO cycle", b: "the same net result using carbon, nitrogen, and oxygen — the main source in hotter stars" }
  ];
  CH.hydrostaticmatch = [
    { a: "Plasma", b: "the ionized gas that makes up all of the Sun" },
    { a: "Gas pressure", b: "the push of fast-moving particles colliding — more with more particles or higher temperature" },
    { a: "Equilibrium", b: "all forces balanced, so the star neither expands nor contracts" },
    { a: "Hydrostatic equilibrium", b: "gravity pulling in exactly balanced by gas pressure pushing out, at every point" },
    { a: "15 million K", b: "the central temperature needed to hold the Sun up — hot enough for fusion" },
    { a: "Hotter in the middle", b: "heat flows from hot to cool, so temperature drops from the center outward" },
    { a: "Inflated balloon", b: "the book’s analogy for a star’s balance between pressures" },
    { a: "Fresh energy source", b: "needed because energy flowing out would otherwise make the star cool" }
  ];
  CH.energyflowmatch = [
    { a: "Conduction", b: "atoms or molecules passing energy by colliding — a spoon handle heating up in coffee" },
    { a: "Convection", b: "currents of warm material rising and carrying energy — hot air from a fireplace" },
    { a: "Radiation", b: "photons carrying energy away and being absorbed — warmth from a heater’s glow" },
    { a: "0.01 meter", b: "about how far a photon travels in the Sun before being absorbed" },
    { a: "100,000 to 1,000,000 years", b: "how long energy takes to zigzag from the core to the surface" },
    { a: "A little over 2 seconds", b: "how long a neutrino takes to fly straight out of the Sun" },
    { a: "Core", b: "one-quarter of the way out but about one-third of the Sun’s mass" },
    { a: "70% of the way out", b: "where radiation hands off to convection" }
  ];
  CH.sunobsmatch = [
    { a: "Helioseismology", b: "studying the Sun’s oscillations to learn about its interior" },
    { a: "About 5 minutes", b: "how long one surface patch takes to move out and back" },
    { a: "Convection zone", b: "found by helioseismology to reach 30% of the way toward the center" },
    { a: "Far-side imaging", b: "waves from active regions cross the Sun about 6 seconds faster, giving a week or more of warning" },
    { a: "Raymond Davis", b: "caught solar neutrinos with 400,000 liters of cleaning fluid in a gold mine — but only one-third" },
    { a: "Neutrino oscillation", b: "neutrinos changing type on the way from the Sun to Earth" },
    { a: "Sudbury Neutrino Observatory", b: "1000 metric tons of heavy water; caught all three types and matched predictions" },
    { a: "Borexino", b: "identified neutrinos from different reactions, including the CNO cycle in 2020" }
  ];

  /* ------------------------------------------------------------------ FIGURES
     Images from OpenStax Astronomy 2e (CC BY 4.0), placed in the matching
     sections via <div data-figure="N.N"></div>. Captions are the book's own,
     with credit lines intact. Files in img/ (downscaled for web). */
  CH.figures = {
    "16.1": {
      file: "fig-16-1.jpg",
      title: "The Sun",
      alt: "A bright white Sun low in an orange sky, setting over hazy hills.",
      caption: "The Sun. It takes an incredible amount of energy for the Sun to shine, as it has and will continue to do for billions of years. (credit: modification of work by Ed Dunens)"
    },
    "16.2": {
      file: "fig-16-2.jpg",
      title: "Kelvin (1824–1907) and Helmholtz (1821–1894)",
      alt: "Two old black-and-white portraits: (a) a white-bearded man seated with a scientific instrument, and (b) a man with a mustache in a dark coat.",
      caption: "Kelvin (1824–1907) and Helmholtz (1821–1894). (a) British physicist William Thomson (Lord Kelvin) and (b) German scientist Hermann von Helmholtz proposed that the contraction of the Sun under its own gravity might account for its energy. (credit a: modification of work by Wellcome Library, London; credit b: modification of work by Wellcome Library, London)"
    },
    "16.3": {
      file: "fig-16-3.jpg",
      title: "Albert Einstein (1879–1955)",
      alt: "A black-and-white portrait of a young Albert Einstein with dark curly hair and a mustache, wearing a suit.",
      caption: "Albert Einstein (1879–1955). This portrait of Einstein was taken in 1912. (credit: modification of work by J. F. Langhans)"
    },
    "16.4": {
      file: "fig-16-4.jpg",
      title: "Wolfgang Pauli in 1945",
      alt: "A black-and-white portrait of Wolfgang Pauli in a suit and tie.",
      caption: "Wolfgang Pauli in 1945. Pauli is considered the “father” of the neutrino, having conceived of it in 1933."
    },
    "16.5": {
      file: "fig-16-5.jpg",
      title: "Fusion and Fission",
      alt: "(a) Two small balls coming together to form one slightly bigger ball. (b) One large ball made of many green and white particles splitting into two smaller balls.",
      caption: "Fusion and Fission. (a) In fusion, light atomic nuclei join together to form a heavier nuclei, releasing energy in the process. (b) In fission, energy is produced by the breaking up of heavy, complex nuclei into lighter ones."
    },
    "16.6": {
      file: "fig-16-6.jpg",
      title: "Proton-Proton Chain, Step 1",
      alt: "Two blue protons labeled ¹H collide in a yellow burst; out come a deuterium nucleus (²H, one blue proton and one red neutron), a neutrino, and a positron.",
      caption: "Proton-Proton Chain, Step 1. This is the first step in the process of fusing hydrogen into helium in the Sun. High temperatures are required because this reaction starts with two hydrogen nuclei, which are protons (shown in blue at left) that must overcome electrical repulsion to combine, forming a hydrogen nucleus with a proton and a neutron (shown in red). Note that hydrogen containing one proton and one neutron is given its own name: deuterium. Also produced in this reaction are a positron, which is an antielectron, and an elusive particle named the neutrino."
    },
    "16.7": {
      file: "fig-16-7.jpg",
      title: "Proton-Proton Chain, Step 2",
      alt: "A deuterium nucleus (²H) and a proton (¹H) collide in a yellow burst, producing helium-3 (³He: two protons and one neutron) and a wavy gamma ray.",
      caption: "Proton-Proton Chain, Step 2. This is the second step of the proton-proton chain, the fusion reaction that converts hydrogen into helium in the Sun. This step combines one hydrogen nucleus, which is a proton (shown in blue), with the deuterium nucleus from the previous step (shown as a red and blue particle). The product of this is an isotope of helium with two protons (blue) and one neutron (red) and energy in the form of gamma-ray radiation."
    },
    "16.8": {
      file: "fig-16-8.jpg",
      title: "Proton-Proton Chain, Step 3",
      alt: "Two helium-3 nuclei (³He) collide in a yellow burst, producing a helium-4 nucleus (⁴He: two protons, two neutrons) and two separate protons (¹H).",
      caption: "Proton-Proton Chain, Step 3. This is the third step in the fusion of hydrogen into helium in the Sun. Note that the two helium-3 nuclei from the second step (see Figure 16.7) must combine before the third step becomes possible. The two protons that come out of this step have the energy to collide with other protons in the Sun and start step one again."
    },
    "16.9": {
      file: "fig-16-9.jpg",
      title: "ITER Design",
      alt: "A cutaway model of a large doughnut-shaped fusion machine, with colorful layers of magnets and a pink inner chamber.",
      caption: "ITER Design. The bright yellow areas in this model show where the superconducting magnets will circle the chamber within which fusion will take place. A huge magnet will keep the charged nuclei of heavy hydrogen confined. The goal is to produce 500 megawatts of energy. (credit: modification of work by Stephan Mosel)"
    },
    "16.10": {
      file: "fig-16-10.jpg",
      title: "Gas Pressure",
      alt: "A transparent blue box with small particles flying in straight lines and bouncing off its walls.",
      caption: "Gas Pressure. The particles in a gas are in rapid motion and produce pressure through collisions with the surrounding material. Here, particles are shown bombarding the sides of an imaginary container."
    },
    "16.11": {
      file: "fig-16-11.jpg",
      title: "Hydrostatic Equilibrium",
      alt: "A cutaway of a yellow star; at a point inside, an arrow labeled Pressure points outward and an arrow labeled Gravity points inward.",
      caption: "Hydrostatic Equilibrium. In the interior of a star, the inward force of gravity is exactly balanced at each point by the outward force of gas pressure."
    },
    "16.12": {
      file: "fig-16-12.jpg",
      title: "Convection",
      alt: "A cross-section of the outer Sun labeled Convection zone, with looping arrows showing gas rising and sinking in cells above the solar interior.",
      caption: "Convection. Rising convection currents carry heat from the Sun’s interior to its surface, whereas cooler material sinks downward. Of course, nothing in a real star is as simple as diagrams in textbooks suggest."
    },
    "16.13": {
      file: "fig-16-13.jpg",
      title: "Photons Deep in the Sun",
      alt: "A wavy line representing a photon zigzags between scattered orange atoms, changing direction at each one.",
      caption: "Photons Deep in the Sun. A photon moving through the dense gases in the solar interior travels only a short distance before it interacts with one of the surrounding atoms. The resulting photon usually has a lower energy after each interaction and may then travel in any random direction."
    },
    "16.14": {
      file: "fig-16-14.jpg",
      title: "Photon and Neutrino Paths in the Sun",
      alt: "Two Sun disks: (a) a photon’s tangled red path stays near the center; (b) a neutrino’s path is a straight line from the center out through the surface.",
      caption: "Photon and Neutrino Paths in the Sun. (a) Because photons generated by fusion reactions in the solar interior travel only a short distance before being absorbed or scattered by atoms and sent off in random directions, estimates are that it takes between 100,000 and 1,000,000 years for energy to make its way from the center of the Sun to its surface. (b) In contrast, neutrinos do not interact with matter but traverse straight through the Sun at the speed of light, reaching the surface in only a little more than 2 seconds."
    },
    "16.15": {
      file: "fig-16-15.jpg",
      title: "Interior Structure of the Sun",
      alt: "A cutaway of the Sun labeled core at the center, radiative zone around it, and convection zone with looping cells near the surface, plus a sunspot and granulation.",
      caption: "Interior Structure of the Sun. Energy is generated in the core by the fusion of hydrogen to form helium. This energy is transmitted outward by radiation—that is, by the absorption and reemission of photons. In the outermost layers, energy is transported mainly by convection. (credit: modification of work by NASA/Goddard)"
    },
    "16.16": {
      file: "fig-16-16.jpg",
      title: "Interior of the Sun",
      alt: "Four small graphs across the Sun’s radius, each shaded into a nuclear-fusion core, radiative zone, and convection zone: temperature and density fall from the center; energy generation is only in the core; hydrogen is lower in the core than elsewhere.",
      caption: "Interior of the Sun. Diagrams showing how temperature, density, rate of energy generation, and the percentage (by mass) abundance of hydrogen vary inside the Sun. The horizontal scale shows the fraction of the Sun’s radius: the left edge is the very center, and the right edge is the visible surface of the Sun, which is called the photosphere."
    },
    "16.17": {
      file: "fig-16-17.jpg",
      title: "Oscillations in the Sun",
      alt: "A computer model of the Sun with a wedge cut away, its surface and interior patterned with red and blue patches of rising and falling motion.",
      caption: "Oscillations in the Sun. New observational techniques permit astronomers to measure small differences in velocity at the Sun’s surface to infer what the deep solar interior is like. In this computer simulation, red shows surface regions that are moving away from the observer (inward motion); blue marks regions moving toward the observer (outward motion). Note that the velocity changes penetrate deep into the Sun’s interior. (credit: modification of work by GONG, NOAO)"
    },
    "16.18": {
      file: "fig-16-18.jpg",
      title: "Sunspot Structure",
      alt: "The orange Sun with a small boxed sunspot, and a zoomed-in cutaway beneath the spot showing arrows of gas flowing down under it, sideways, and back up around it.",
      caption: "Sunspot Structure. This drawing shows our new understanding, from helioseismology, of what lies beneath a sunspot. The black arrows show the direction of the flow of material. The intense magnetic field associated with the sunspot stops the upward flow of hot material and creates a kind of plug that blocks the hot gas. As the material above the plug cools (shown in blue), it becomes denser and plunges inward, drawing more gas and more magnetic field behind it into the spot. The concentrated magnetic field causes more cooling, thereby setting up a self-perpetuating cycle that allows a spot to survive for several weeks. Since the plug keeps hot material from flowing up into the sunspot, the region below the plug, represented by red in this picture, becomes hotter. This material flows sideways and then upward, eventually reaching the solar surface in the area surrounding the sunspot. (credit: modification of work by NASA, SDO)"
    },
    "16.19": {
      file: "fig-16-19.jpg",
      title: "Davis Experiment",
      alt: "(a) A portrait of an older man with glasses, smiling. (b) A large cylindrical tank lying on its side in a rocky underground mine chamber.",
      caption: "Davis Experiment. (a) Raymond Davis received the Nobel Prize in physics in 2002. (b) Davis’ experiment at the bottom of an abandoned gold mine first revealed problems with our understanding of neutrinos. (credit a: modification of work by Brookhaven National Laboratory; credit b: modification of work by the United States Department of Energy)"
    },
    "16.20": {
      file: "fig-16-20.jpg",
      title: "Sudbury Neutrino Detector",
      alt: "Looking up inside a huge geodesic sphere lined with thousands of light detectors, with a person standing at the bottom for scale.",
      caption: "Sudbury Neutrino Detector. The 12-meter sphere of the Sudbury Neutrino Detector lies more than 2 kilometers underground and holds 1000 metric tons of heavy water. (credit: A.B. McDonald (Queen’s University) et al., The Sudbury Neutrino Observatory Institute)"
    }
  };

  /* ---------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "16.1",
      title: "Sources of Sunshine: Thermal and Gravitational Energy",
      minutes: 7,
      pages: "pp. 535–538",
      html:
        '<div data-figure="16.1"></div>' +
        '<p>The Sun puts out an incomprehensible amount of energy &mdash; enough that its ultraviolet light can ' +
        'sunburn you from <strong>93 million miles</strong> away. It is also very old: it formed about ' +
        '<strong>4.5 billion years ago</strong> and has been shining ever since. Its output is about <strong>4 ' +
        '&times; 10<sup>26</sup> watts</strong> &mdash; brighter than a trillion cities, each with a trillion ' +
        '100-watt light bulbs. Before the twentieth century, scientists couldn&rsquo;t explain how a star could ' +
        'produce so much energy for so long.</p>' +
        '<p>Energy is hard to grasp because it comes in so many forms &mdash; a bit like wealth, which can be stocks, ' +
        'real estate, old comic books, or piles of cash, each following different rules. Nineteenth-century scientists ' +
        'knew of two possible sources for the Sun&rsquo;s energy: <strong>chemical</strong> and ' +
        '<strong>gravitational</strong>. The familiar chemical source is burning (chemists call it ' +
        '<em>oxidation</em>) wood, coal, or gasoline. We know exactly how much energy burning gives, so we can ' +
        'calculate that even a Sun made entirely of coal or wood could not shine at its present rate for more than ' +
        '<strong>a few thousand years</strong>. Yet geology shows water was on Earth&rsquo;s surface nearly ' +
        '<strong>4 billion years ago</strong>, so the Sun must have been shining (and warming Earth) at least that ' +
        'long. And at the Sun&rsquo;s temperatures, nothing like solid wood or coal could even survive.</p>' +
        '<p class="callout-inline"><strong>Astronomy basics: what&rsquo;s a watt?</strong> A watt (W) is a unit of ' +
        '<strong>power</strong> &mdash; energy used or given off per unit time &mdash; measured in joules per second ' +
        '(J/s). It&rsquo;s not just how much energy you use but how fast: burning 10 Calories in 10 minutes takes a ' +
        'very different workout than burning them in an hour. A 100-watt bulb uses 100 joules (J) every second. And a ' +
        'joule? A 73-kg (160-pound) astronomy instructor running about 4.4 m/s (10 miles per hour) because he is late ' +
        'for class has a motion energy of about <strong>700 joules</strong>.</p>' +
        '<h4>Conservation of energy</h4>' +
        '<p>Other nineteenth-century ideas used the <strong>law of conservation of energy</strong>: energy cannot be ' +
        'created or destroyed, only changed from one type to another, such as from heat to mechanical energy. In a ' +
        '<strong>steam engine</strong> (key to the Industrial Revolution), hot steam drives a piston, turning heat ' +
        'into motion. It works the other way too: clap hard after a great astronomy lecture and your palms get hot; ' +
        'rub ice on a table and friction melts it; a car&rsquo;s brakes turn motion into heat, which is why they get ' +
        'hot (and can overheat on long mountain roads).</p>' +
        '<p>Some thought the Sun&rsquo;s heat might come from the motion of <strong>meteorites falling into ' +
        'it</strong>. But to match the Sun&rsquo;s output, an <strong>Earth&rsquo;s mass</strong> of meteorites ' +
        'would have to fall in every <strong>100 years</strong>. The Sun&rsquo;s growing mass would then, by ' +
        'Kepler&rsquo;s third law, change the length of Earth&rsquo;s year by <strong>2 seconds per year</strong> ' +
        '&mdash; easy to measure, and not happening. So that idea was disproved.</p>' +
        '<h4>Gravitational contraction as a source of energy</h4>' +
        '<p>In about the middle of the nineteenth century, British physicist <strong>Lord Kelvin</strong> and German ' +
        'scientist <strong>Hermann von Helmholtz</strong> (Figure 16.2) proposed that the Sun turns ' +
        '<strong>gravitational energy into heat</strong>: its outer layers might be slowly &ldquo;falling&rdquo; ' +
        'inward, so the Sun is <strong>shrinking</strong> and staying hot and bright as a result.</p>' +
        '<div data-figure="16.2"></div>' +
        '<p>Here&rsquo;s how that would work. Picture the Sun&rsquo;s outer layer of gas, its atoms moving randomly, ' +
        'starting to fall inward. Falling gives the atoms extra speed. As the layer falls it also contracts, crowding ' +
        'the atoms together, so they collide more and share that extra speed. Since <strong>temperature measures the ' +
        'motion energy of atoms</strong>, the layer heats up. Collisions also kick electrons into higher-energy orbits; ' +
        'when they drop back, they emit photons that can escape the Sun.</p>' +
        '<p>Kelvin and Helmholtz calculated that the Sun would only need to contract about <strong>40 meters per ' +
        'year</strong> to produce the energy it radiates now &mdash; undetectable over all of human history. If the ' +
        'Sun began as a large, thin cloud of gas, contracting to its present size would have released about ' +
        '<strong>10<sup>42</sup> joules</strong>. The Sun gives off 4 &times; 10<sup>26</sup> watts, or about ' +
        '<strong>10<sup>34</sup> joules per year</strong>, so contraction could keep it shining for roughly ' +
        '<strong>100 million years</strong>.</p>' +
        '<div data-diagram="sun-fuel"></div>' +
        '<p>At first 100 million years seemed plenty, because Earth was thought to be younger than that. But by the ' +
        'late nineteenth and early twentieth centuries, geologists and physicists showed Earth (and so the Sun) is ' +
        'much older. Contraction can&rsquo;t be the Sun&rsquo;s main power source (though it is important for a while ' +
        'in newborn stars). Either some unknown energy source powered the Sun, or the age of the solar system and of ' +
        'life had to be rethought. <strong>Charles Darwin</strong>, whose theory of evolution needed more time than ' +
        'the Sun seemed to allow, worried about this until his death in <strong>1882</strong>.</p>' +
        '<p>The real answer came only in the twentieth century. It needed two key pieces: the <strong>structure of the ' +
        'atomic nucleus</strong>, and the fact that <strong>mass can be converted into energy</strong>.</p>',
      keyIdeas: [
        "The Sun puts out about 4 × 10²⁶ watts and has shone for about 4.5 billion years. A watt is one joule per second.",
        "Energy is conserved: it can’t be created or destroyed, only changed from one form to another (heat to motion in a steam engine, motion to heat in brakes).",
        "Chemical burning fails: a Sun made of coal or wood would last only a few thousand years, but water has been on Earth for nearly 4 billion years.",
        "Falling meteorites fail: they’d need an Earth’s mass every 100 years and would change our year by 2 seconds per year, which isn’t observed.",
        "Kelvin and Helmholtz proposed gravitational contraction: shrinking about 40 m per year could power the Sun, but the total (about 10⁴² J, at about 10³⁴ J per year) lasts only about 100 million years.",
        "Earth is much older than that, so the Sun needs another source — found in the twentieth century from the atomic nucleus and the conversion of mass into energy."
      ],
      selfCheck: [
        { q: "Why can’t chemical burning explain the Sun’s energy?",
          a: "Even a Sun made of coal or wood could shine at its present rate for only a few thousand years. But water was on Earth nearly 4 billion years ago, so the Sun has shone far longer. (Also, solid fuel couldn’t survive the Sun’s temperatures.)" },
        { q: "Why was the falling-meteorite idea ruled out?",
          a: "An Earth’s mass of meteorites would have to fall in every 100 years. The Sun’s growing mass would change Earth’s year by 2 seconds per year (Kepler’s third law) — easy to measure, and not happening." },
        { q: "How does gravitational contraction produce heat?",
          a: "As the outer layers fall inward, atoms gain speed and collide more as they’re squeezed together. Faster atoms mean a higher temperature, and collisions excite electrons that then emit photons." },
        { q: "How long could gravitational contraction keep the Sun shining, and why isn’t that enough?",
          a: "About 10⁴² J ÷ about 10³⁴ J per year ≈ 100 million years. Earth and the Sun are billions of years old, so contraction can’t be the main source." },
        { q: "What is a watt?",
          a: "A unit of power: the rate of using or giving off energy, one joule per second. A 100-watt bulb uses 100 joules every second." }
      ]
    },
    {
      id: "16.2",
      title: "Mass, Energy, and the Theory of Relativity",
      minutes: 17,
      pages: "pp. 538–547",
      html:
        '<p>Energy can&rsquo;t be created or destroyed, only converted. One of the remarkable conclusions of ' +
        '<strong>Albert Einstein</strong>&rsquo;s theory of relativity is that <strong>matter is a form of energy ' +
        'too</strong>: matter can be turned into energy, and energy into matter. That seemed as outrageous as speeding ' +
        'up your car by turning its bumper into speed &mdash; yet the universe really does work somewhat like ' +
        'that.</p>' +
        '<h4>Converting matter into energy</h4>' +
        '<p>The equivalence of matter and energy is one of the most famous equations:</p>' +
        '<p style="text-align:center;font-size:1.25em"><strong>E = mc<sup>2</sup></strong></p>' +
        '<p>E is energy, m is mass, and c, the constant that relates them, is the <strong>speed of light</strong> ' +
        '(3 &times; 10<sup>8</sup> m/s). It has the same form as everyday conversions like <em>cents = 100 &times; ' +
        'dollars</em> or <em>inches = 12 &times; feet</em> &mdash; except the conversion factor is the speed of light ' +
        '<strong>squared</strong>. The matter does <strong>not</strong> have to move at the speed of light; c<sup>2' +
        '</sup> is simply the number Einstein showed relates mass and energy. And like the cents formula, it ' +
        'doesn&rsquo;t say <em>how</em> to make the conversion, only what the equivalent values are. When Einstein ' +
        'derived it in <strong>1905</strong>, no one knew how to turn mass into energy in practice (Einstein himself ' +
        'discouraged hopes that it would soon be feasible). Today we do it in nuclear power plants, nuclear weapons, ' +
        'and particle accelerators.</p>' +
        '<p>Because c<sup>2</sup> is huge, a little mass makes a lot of energy. Completely converting <strong>1 ' +
        'gram</strong> of matter (about 1/28 ounce, roughly one paperclip) would give as much energy as burning ' +
        '<strong>15,000 barrels of oil</strong>. Using E = mc<sup>2</sup>, the Sun&rsquo;s output could be produced ' +
        'by completely converting about <strong>4 million tons</strong> of matter into energy <strong>each ' +
        'second</strong>. That sounds like a lot, but the Sun is a very big reservoir &mdash; it has more than enough ' +
        'mass to keep this up for billions of years.</p>' +
        '<div data-diagram="emc2"></div>' +
        '<div class="callout-inline"><strong>Voyagers in astronomy: Albert Einstein.</strong> For much of his life, ' +
        'Einstein (Figure 16.3) was one of the most recognized celebrities of his day; when he met film star ' +
        '<strong>Charlie Chaplin</strong> in California, they found they shared feelings about losing privacy to ' +
        'fame. He was born in <strong>1879</strong> in <strong>Ulm, Germany</strong>. The legend that he did badly in ' +
        'school isn&rsquo;t true: he rebelled against the authoritarian teaching style, but he was a good student. ' +
        'After graduating from the Federal Polytechnic Institute in Zurich, he had trouble finding a job and became an ' +
        'examiner in the <strong>Swiss Patent Office</strong>. In his spare time he wrote <strong>four papers in ' +
        '1905</strong> that transformed physics. One, which earned him the <strong>1921 Nobel Prize</strong>, helped ' +
        'found quantum mechanics; his most important presented the <strong>special theory of relativity</strong>. ' +
        '(E = mc<sup>2</sup> was a relatively minor part, added in a later paper.) In <strong>1916</strong> he ' +
        'published the <strong>general theory of relativity</strong>, a new description of gravity; when the ' +
        '&ldquo;bending of starlight&rdquo; was measured during a <strong>1919</strong> eclipse (&ldquo;Lights All ' +
        'Askew in the Heavens,&rdquo; said the <em>New York Times</em>), he became world famous. In ' +
        '<strong>1933</strong>, escaping Nazi persecution, he moved to the Institute for Advanced Studies at ' +
        'Princeton, where he stayed until his death in <strong>1955</strong>. In <strong>1939</strong> he signed a ' +
        'letter by Leo Szilard and others warning President Roosevelt about Nazi Germany developing the atomic bomb ' +
        'first, and in <strong>1952</strong>, offered the second presidency of Israel, he declined, saying, &ldquo;I know a little ' +
        'about nature and hardly anything about men.&rdquo;</div>' +
        '<div data-figure="16.3"></div>' +
        '<h4>Elementary particles</h4>' +
        '<p>Atoms are built of <strong>protons, neutrons, and electrons</strong>, but those aren&rsquo;t all the ' +
        'particles that exist. Each kind of particle has an opposite <strong>antiparticle</strong>; a charged ' +
        'particle&rsquo;s antiparticle has the opposite charge. The antielectron is the <span class="term">positron' +
        '</span>: same mass as an electron, but positive. The antiproton is negative. When a particle meets its ' +
        'antiparticle, both are <strong>annihilated</strong>, producing a lot of energy as photons. Our world is ' +
        'ordinary matter, so antimatter doesn&rsquo;t last long, but antiparticles appear in cosmic rays and particle ' +
        'accelerators &mdash; and, as we&rsquo;ll see, in the core of the Sun. (Star Trek&rsquo;s Enterprise ran on ' +
        'matter and antimatter. Keeping the antimatter fuel from touching the ship must be a big problem &mdash; no ' +
        'wonder Scotty always looked worried!)</p>' +
        '<p>In <strong>1933</strong>, <strong>Wolfgang Pauli</strong> (Figure 16.4) suggested a new particle. In some ' +
        'nuclear reactions, energy seemed to vanish, breaking conservation of energy. Rather than give up that law, ' +
        'Pauli proposed a &ldquo;desperate remedy&rdquo;: an undetected particle, the <span class="term">neutrino' +
        '</span> (&ldquo;little neutral one&rdquo;), carried off the missing energy. He thought it had zero mass and, ' +
        'like a photon, moved at the speed of light.</p>' +
        '<div data-figure="16.4"></div>' +
        '<p>The neutrino wasn&rsquo;t detected until <strong>1956</strong>, because it interacts so weakly with ' +
        'matter. Earth is more transparent to a neutrino than the cleanest pane of glass is to light; most neutrinos ' +
        'pass straight through a star or planet. That makes them a very important tool for studying the Sun. We now ' +
        'know there are <strong>three types</strong> of neutrinos, and in <strong>1998</strong> they were found to ' +
        'have a <strong>tiny mass</strong> &mdash; electrons are at least <strong>500,000 times</strong> more ' +
        'massive. (It may still turn out that one of the three types is massless.)</p>' +
        '<p>The book&rsquo;s Table 16.1:</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Particle</th><th>Mass (kg)</th><th>Charge</th></tr>' +
        '<tr><td>Proton</td><td>1.67265 &times; 10<sup>&minus;27</sup></td><td>+1</td></tr>' +
        '<tr><td>Neutron</td><td>1.67495 &times; 10<sup>&minus;27</sup></td><td>0</td></tr>' +
        '<tr><td>Electron</td><td>9.11 &times; 10<sup>&minus;31</sup></td><td>&minus;1</td></tr>' +
        '<tr><td>Neutrino</td><td>&lt; 2 &times; 10<sup>&minus;36</sup> (uncertain)</td><td>0</td></tr>' +
        '</tbody></table></div>' +
        '<h4>The atomic nucleus</h4>' +
        '<p>Inside a nucleus, particles are held together by the <strong>strong nuclear force</strong>, a very ' +
        'powerful force that only reaches about the size of a nucleus. Think of a <strong>carbon</strong> atom in your ' +
        'finger: its nucleus has 6 positive protons and 6 neutral neutrons. If only the electrical force acted, the ' +
        'protons would repel each other and fly apart. The strong force is an attraction stronger than the electrical ' +
        'force, and it holds the nucleus tightly together.</p>' +
        '<p>Just as a shrinking star releases gravitational energy, particles coming together under the strong force ' +
        'to form a nucleus release nuclear energy &mdash; the nucleus&rsquo;s <strong>binding energy</strong>. The ' +
        'new nucleus has slightly <strong>less mass</strong> than the particles that made it: the energy comes from ' +
        'that lost mass. The deficit is only a small fraction of one proton&rsquo;s mass, but by E = mc<sup>2</sup> ' +
        'it gives a substantial amount of energy.</p>' +
        '<p>Binding energy is greatest for nuclei near <strong>iron</strong> (56 protons and neutrons combined) and ' +
        'smaller for both lighter and heavier nuclei. So iron is the most stable element: it gives up the most energy ' +
        'when it forms and would take the most energy to break apart. That means:</p>' +
        '<ul>' +
        '<li>When light nuclei join to form a heavier one (up to iron), mass is lost and energy released. This is ' +
        '<span class="term">nuclear fusion</span>.</li>' +
        '<li>Breaking heavy nuclei into lighter ones (down to iron) also releases energy. This is ' +
        '<span class="term">nuclear fission</span> &mdash; the process we learned to use first, in atomic bombs and ' +
        'power plants; it also happens naturally in some unstable nuclei (radioactivity).</li>' +
        '</ul>' +
        '<p>Fission needs big, complex nuclei, but stars are made mostly of small, simple ones &mdash; so we look to ' +
        '<strong>fusion</strong> to explain the energy of the Sun and stars (Figure 16.5).</p>' +
        '<div data-figure="16.5"></div>' +
        '<h4>Nuclear attraction versus electrical repulsion</h4>' +
        '<p>So the recipe seems easy: &ldquo;roll&rdquo; nuclei together, fuse them, and the lost mass becomes energy. ' +
        'The catch: every nucleus has at least one proton, and protons are all positive. Like charges repel, and the ' +
        'closer two nuclei get, the harder they push apart. Inside &ldquo;striking distance&rdquo; of the nuclear ' +
        'force they&rsquo;d stick, but that distance is only about the size of a nucleus.</p>' +
        '<p>The answer is <strong>heat</strong> &mdash; tremendous heat &mdash; which makes protons move fast enough to ' +
        'overcome the repulsion. Two protons can fuse only where the temperature is above about <strong>12 million ' +
        'K</strong> and their speeds average about <strong>1000 km/s</strong> or more (over 2 million miles per hour). ' +
        'In the Sun that happens only near the center, at <strong>15 million K</strong>. Nearly all the Sun&rsquo;s ' +
        'energy is made within about <strong>150,000 km</strong> of its center &mdash; less than <strong>10%</strong> ' +
        'of its volume.</p>' +
        '<p>Even so, fusing two protons is extremely hard. On average a proton bounces off others in the core for ' +
        'about <strong>14 billion years</strong>, at <strong>100 million collisions per second</strong>, before it ' +
        'fuses. That&rsquo;s only an average: a few &ldquo;lucky&rdquo; protons fuse after just a few collisions, and ' +
        'they make the Sun&rsquo;s energy. Since the Sun is about 4.5 billion years old, most of its protons have ' +
        '<strong>not yet</strong> fused.</p>' +
        '<h4>Nuclear reactions in the Sun&rsquo;s interior</h4>' +
        '<p>Deep in the Sun, a <strong>three-step</strong> process fuses <strong>four hydrogen nuclei</strong> into ' +
        '<strong>one helium nucleus</strong>. The helium is slightly less massive than the four hydrogens, and the ' +
        'missing mass becomes energy.</p>' +
        '<p><strong>Step 1</strong> (Figure 16.6): two protons combine to make a <strong>deuterium</strong> nucleus ' +
        '&mdash; an isotope (version) of hydrogen with one proton and one neutron. In effect, one proton has turned ' +
        'into a neutron. Electric charge must be conserved, and it is: a <strong>positron</strong> carries away the ' +
        'positive charge.</p>' +
        '<div data-figure="16.6"></div>' +
        '<p>Being antimatter, the positron instantly hits a nearby electron; both are annihilated, making ' +
        '<strong>gamma-ray</strong> photons. A gamma ray born in the Sun&rsquo;s center is surrounded by fast-moving ' +
        'nuclei and electrons. It collides, gives its energy to a particle, and that particle later emits another ' +
        'photon, often with a bit less energy. Again and again, the photons lose energy on their slow way out: gamma ' +
        'rays become <strong>X-rays</strong>, then <strong>ultraviolet</strong>, and by the time they reach the ' +
        'surface most are <strong>ordinary light</strong> &mdash; the sunlight we see. (Each gamma ray ends up as many ' +
        'lower-energy photons.) How long this takes depends on the model of the interior, but the surface output can ' +
        'lag its production by <strong>100,000 years</strong> to as much as <strong>1,000,000 years</strong>.</p>' +
        '<p>Step 1 also emits a <strong>neutrino</strong>. Neutrinos barely interact with matter, so they fly straight ' +
        'out of the Sun in all directions at nearly the speed of light, escaping about <strong>two seconds</strong> ' +
        'after they are made.</p>' +
        '<div data-figure="16.7"></div>' +
        '<p><strong>Step 2</strong> (Figure 16.7): another proton joins the deuterium, making a nucleus with two ' +
        'protons and one neutron. More mass is lost and more gamma rays given off. Any nucleus with two protons is ' +
        'helium, but this one is <strong>helium-3</strong> (<sup>3</sup>He), not the helium-4 (<sup>4</sup>He, two ' +
        'protons and two neutrons) we see in the Sun&rsquo;s atmosphere or on Earth.</p>' +
        '<p><strong>Step 3</strong> (Figure 16.8): two helium-3 nuclei combine to make <strong>helium-4</strong>. ' +
        'Two energetic protons are left over, ready to start step 1 all over again.</p>' +
        '<div data-figure="16.8"></div>' +
        '<h4>The proton-proton chain</h4>' +
        '<p>In nuclear shorthand (superscripts are the number of protons plus neutrons; e<sup>+</sup> is the ' +
        'positron, &nu; the neutrino, and &gamma; a gamma ray):</p>' +
        '<p style="text-align:center;line-height:1.9"><sup>1</sup>H + <sup>1</sup>H &rarr; <sup>2</sup>H + ' +
        'e<sup>+</sup> + &nu;<br><sup>2</sup>H + <sup>1</sup>H &rarr; <sup>3</sup>He + &gamma;<br><sup>3</sup>He + ' +
        '<sup>3</sup>He &rarr; <sup>4</sup>He + <sup>1</sup>H + <sup>1</sup>H</p>' +
        '<p>The third step needs <strong>two</strong> helium-3 nuclei, so the first two steps must each happen ' +
        '<strong>twice</strong>. Step 1 is slow and hard, but the others are quick: a deuterium nucleus survives only ' +
        'about <strong>6 seconds</strong> before becoming <sup>3</sup>He, and about <strong>a million years</strong> ' +
        'later (on average) the <sup>3</sup>He combines with another to make <sup>4</sup>He.</p>' +
        '<div data-diagram="pp-chain"></div>' +
        '<p>How much energy? Compare the masses before and after. A hydrogen atom is 1.007825 u and a helium atom is ' +
        '4.00268 u. (The unit u is 1/12 the mass of a carbon atom, about a proton&rsquo;s mass. We use whole atoms ' +
        'because electrons are involved: the two positrons annihilate with two free electrons, adding to the ' +
        'energy.)</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><td>4 &times; 1.007825 u</td><td>= 4.03130 u</td><td>mass of initial hydrogen atoms</td></tr>' +
        '<tr><td></td><td>&minus; 4.00268 u</td><td>mass of final helium atom</td></tr>' +
        '<tr><td></td><td>= <strong>0.02862 u</strong></td><td>mass lost in the transformation</td></tr>' +
        '</tbody></table></div>' +
        '<p>The mass lost, 0.02862 u, is <strong>0.71%</strong> of the starting hydrogen. So if 1 kg of hydrogen ' +
        'becomes helium, the helium is only 0.9929 kg, and <strong>0.0071 kg</strong> becomes energy:</p>' +
        '<p style="text-align:center">E = mc<sup>2</sup> = 0.0071 kg &times; (3 &times; 10<sup>8</sup> m/s)' +
        '<sup>2</sup> = <strong>6.4 &times; 10<sup>14</sup> J</strong></p>' +
        '<p>That&rsquo;s from just <strong>1 kilogram</strong> (2.2 pounds) of hydrogen &mdash; enough to supply all ' +
        'the electricity of a typical U.S. household for roughly <strong>17,000 years</strong>. To make the Sun&rsquo;s ' +
        '4 &times; 10<sup>26</sup> watts, some <strong>600 million tons</strong> of hydrogen must become helium ' +
        '<em>every second</em>, of which about <strong>4 million tons</strong> turn from matter into energy. Huge as ' +
        'that is, the Sun&rsquo;s store of hydrogen is far bigger and can last billions of years.</p>' +
        '<p>In stars with less than about <strong>1.2 times the Sun&rsquo;s mass</strong> (including the Sun), most ' +
        'energy comes from this set of reactions, the <span class="term">proton-proton chain</span> (or p-p chain), ' +
        'in which protons collide directly with other protons. In hotter stars, the <strong>carbon-nitrogen-oxygen ' +
        '(CNO) cycle</strong> gets the same result: carbon and hydrogen nuclei collide to start a series of reactions ' +
        'forming nitrogen, oxygen, and finally helium, and the nitrogen and oxygen turn back into carbon. Net result: ' +
        'four hydrogens disappear and one helium appears. The CNO cycle plays only a minor role in the Sun but is the ' +
        'main energy source for stars more massive than about the Sun.</p>' +
        '<p>So the puzzle that worried nineteenth-century scientists is solved: the Sun can stay hot and bright for ' +
        'billions of years by fusing hydrogen, the simplest element &mdash; and since stars are mostly hydrogen, it is ' +
        'an ideal fuel. In fact, a <strong>star</strong> can be defined as a ball of gas able to get its core hot ' +
        'enough to fuse hydrogen. Balls of gas without enough mass (Jupiter, for example) are like so many hopefuls in ' +
        'Hollywood: they will never be stars.</p>' +
        '<div class="callout-inline"><strong>Making connections: fusion on Earth.</strong> We have copied the ' +
        'Sun&rsquo;s energy source in an uncontrolled way (hydrogen bombs, first tested in the <strong>1950s</strong>, ' +
        'with fission bombs as the &ldquo;fuses&rdquo; to heat them). Controlled fusion would be wonderful: its fuel, ' +
        'hydrogen or deuterium (heavy hydrogen), is abundant in lakes and oceans and spread far more evenly than oil ' +
        'or uranium, and unlike fission it leaves perfectly safe nuclei. The problem is the extreme temperature needed, ' +
        'which is hard to sustain and control. The European Union, the United States, South Korea, Japan, China, ' +
        'Russia, Switzerland, and India are building the <strong>International Thermonuclear Experimental Reactor ' +
        '(ITER)</strong> in <strong>France</strong> to show controlled fusion can work (Figure 16.9). It needs over ' +
        '<strong>10,000,000 components</strong> and <strong>2000 workers</strong>, and its start date is not yet set. ' +
        'It uses the <strong>Tokamak</strong> design: a big doughnut-shaped chamber surrounded by superconducting ' +
        'magnets that confine the hydrogen nuclei. Earlier experiments made about <strong>15 million watts</strong> for ' +
        'only a second or two, while needing <strong>100 million watts</strong> to get fusion going. ITER&rsquo;s goal ' +
        'is <strong>500 million watts</strong> of fusion power for up to <strong>1000 seconds</strong>, keeping its ' +
        'deuterium and tritium hot and dense enough for long enough.</div>' +
        '<div data-figure="16.9"></div>',
      keyIdeas: [
        "E = mc²: mass is a form of energy. c² (the speed of light, 3 × 10⁸ m/s, squared) is huge, so 1 gram of matter equals the energy of burning 15,000 barrels of oil.",
        "Every particle has an antiparticle; the positron is the positive antielectron. A particle and its antiparticle annihilate into photons.",
        "Neutrinos (proposed by Pauli in 1933, detected in 1956) have no charge, come in three types, and have a tiny mass; they almost never interact with matter.",
        "The strong nuclear force holds nuclei together. A new nucleus weighs a bit less than its parts; that lost mass is binding energy. Iron is the most stable nucleus.",
        "Fusion (light nuclei joining, up to iron) and fission (heavy nuclei splitting, down to iron) both release energy. Stars are mostly light nuclei, so they run on fusion.",
        "Protons repel each other, so fusion needs more than about 12 million K. The Sun’s center is 15 million K; nearly all its energy comes from within about 150,000 km of the center.",
        "The proton-proton chain: ¹H + ¹H → ²H + e⁺ + ν; ²H + ¹H → ³He + γ; ³He + ³He → ⁴He + 2 ¹H. Four hydrogens become one helium, losing 0.71% of their mass as energy (6.4 × 10¹⁴ J per kilogram).",
        "The Sun turns about 600 million tons of hydrogen into helium each second; about 4 million tons become energy. Hotter, more massive stars use the CNO cycle instead."
      ],
      selfCheck: [
        { q: "In E = mc², why does a tiny bit of mass give so much energy?",
          a: "The conversion factor is c², the speed of light (3 × 10⁸ m/s) squared — a huge number. Converting just 1 gram equals burning 15,000 barrels of oil." },
        { q: "What is a positron, and what happens when it meets an electron?",
          a: "A positron is the antielectron — same mass, positive charge. When it meets an electron, both are annihilated and their energy comes out as gamma-ray photons." },
        { q: "Why does fusion need such high temperatures?",
          a: "Nuclei are positively charged and repel each other. Only at very high temperatures (above about 12 million K for protons) do they move fast enough to get close enough for the strong nuclear force to take over." },
        { q: "List the three steps of the proton-proton chain.",
          a: "1) Two protons fuse into deuterium, giving off a positron and a neutrino. 2) Deuterium plus a proton makes helium-3 and a gamma ray. 3) Two helium-3 nuclei make helium-4 and release two protons." },
        { q: "Where does the energy of fusion come from?",
          a: "The helium-4 is about 0.71% less massive than the four hydrogens that made it (0.02862 u lost). That missing mass becomes energy by E = mc²: 6.4 × 10¹⁴ J for every kilogram of hydrogen." },
        { q: "How do the proton-proton chain and the CNO cycle differ?",
          a: "Both turn four hydrogens into one helium. The p-p chain has protons collide directly and powers the Sun and stars below about 1.2 solar masses; the CNO cycle uses carbon, nitrogen, and oxygen nuclei as go-betweens and powers hotter, more massive stars." }
      ]
    },
    {
      id: "16.3",
      title: "The Solar Interior: Theory",
      minutes: 11,
      pages: "pp. 547–553",
      html:
        '<p>Fusion can happen at the Sun&rsquo;s center only if it is hotter than 12 million K. How do we know it is ' +
        'that hot? We can&rsquo;t see inside, so astronomers build a <strong>computer model</strong> containing ' +
        'everything they know about the physics, combined with what we see at the surface. The computer works out the ' +
        'temperature and pressure at every point inside and what nuclear reactions are happening. Where observations ' +
        'can test the results, the program is improved.</p>' +
        '<p>The model can also follow how the Sun <strong>changes</strong> over time &mdash; and it must change, since ' +
        'its center is slowly using up hydrogen and making helium. Eventually the hydrogen hot enough to fuse will run ' +
        'out; then either a new energy source must be found or the Sun will stop shining (later chapters). Here are ' +
        'some things we must teach the computer.</p>' +
        '<h4>The Sun is a plasma</h4>' +
        '<p>The Sun is so hot that all of it is ionized gas, or <strong>plasma</strong>, which behaves much like a hot ' +
        'gas &mdash; easier to describe mathematically than liquids or solids. A gas&rsquo;s particles move fast and ' +
        'collide constantly; that bombardment is its <strong>pressure</strong> (Figure 16.10). <strong>More ' +
        'particles</strong> in a given volume make more pressure, and so do <strong>faster</strong> particles. Since ' +
        'particles move faster when it&rsquo;s hotter, <strong>higher temperature means higher pressure</strong>.</p>' +
        '<div data-figure="16.10"></div>' +
        '<h4>The Sun is stable</h4>' +
        '<p>The Sun, like most stars, is neither expanding nor contracting. Such a star is in ' +
        '<strong>equilibrium</strong>: all its forces balance, so the temperature, pressure, and density at each point ' +
        'stay constant. (Stars do slowly evolve, but so gradually that at any given time they are still effectively in ' +
        'equilibrium.)</p>' +
        '<p>The gravity between all the parts of the Sun makes tremendous forces trying to collapse it toward its ' +
        'center. Yet Earth&rsquo;s history shows the Sun has given off roughly the same energy for billions of years, ' +
        'so something balances gravity: the <strong>pressure</strong> of the gas inside (Figure 16.11). Calculations ' +
        'show that to hold the Sun up, its center must be <strong>15 million K</strong>. Think about that: just from ' +
        'the fact that the Sun isn&rsquo;t shrinking, we can conclude its center is hot enough for protons to ' +
        'fuse.</p>' +
        '<div data-figure="16.11"></div>' +
        '<p>Here is how the balance works. If the pressure inside weren&rsquo;t enough to support the weight of the ' +
        'outer layers, the star would <strong>contract</strong> a bit, building up pressure. If the pressure were ' +
        'greater than the weight above, the star would <strong>expand</strong>, lowering the pressure. Either way it ' +
        'settles where the pressure at every point equals the weight of the layers above that point &mdash; like a ' +
        'balloon expanding or shrinking until the air pressure inside and outside balance. This is ' +
        '<span class="term">hydrostatic equilibrium</span>. All stable stars are in it; so are Earth&rsquo;s oceans and ' +
        'atmosphere (the air&rsquo;s own pressure keeps it from falling to the ground).</p>' +
        '<div data-diagram="hydrostatic"></div>' +
        '<h4>The Sun is not cooling down</h4>' +
        '<p>Heat always flows from <strong>hotter to cooler</strong> places (leave a window open on a winter night and ' +
        'you&rsquo;ll know). Energy flows outward through a star, so it must come from hotter inner regions: the ' +
        'temperature is <strong>highest at the center</strong> and drops toward the surface. (The hot chromosphere and ' +
        'corona seem to break this rule, but remember from Chapter 15 that magnetic effects keep them hot.)</p>' +
        '<p>Energy flowing outward would rob the star of its heat, and it would cool down &mdash; like an iron as soon ' +
        'as it&rsquo;s unplugged &mdash; unless the energy were replaced. So every star needs a <strong>fresh source ' +
        'of energy</strong> inside. For the Sun, it&rsquo;s the fusion of hydrogen into helium.</p>' +
        '<h4>Heat transfer in a star</h4>' +
        '<p>The energy is made deep inside, so it must travel to the surface, where we see it as heat and light. There ' +
        'are three ways to move energy:</p>' +
        '<ul>' +
        '<li><span class="term">Conduction</span>: atoms or molecules pass energy to neighbors by colliding &mdash; ' +
        'like a metal spoon&rsquo;s handle heating up as you stir hot coffee.</li>' +
        '<li><span class="term">Convection</span>: currents of warm material rise, carrying energy to cooler layers ' +
        '&mdash; like hot air rising from a fireplace.</li>' +
        '<li><span class="term">Radiation</span>: photons leave hot material and are absorbed elsewhere, giving up ' +
        'their energy &mdash; like the warmth on your hand near an electric heater&rsquo;s glowing coils (infrared ' +
        'photons).</li>' +
        '</ul>' +
        '<p>Conduction and convection matter inside planets. Stars are much more transparent, so in stars ' +
        '<strong>radiation and convection</strong> matter, and conduction can usually be ignored.</p>' +
        '<p>In stellar <strong>convection</strong>, currents of hot gas flow up and down (Figure 16.12) at moderate ' +
        'speeds, without upsetting the star&rsquo;s stability and without moving any net mass in or out: hot material ' +
        'rises, cool material sinks to replace it, in circulating cells &mdash; like air stirred by a fireplace without ' +
        'any air leaving the room. Convection carries heat outward very efficiently. In the Sun it is important in the ' +
        'central regions and near the surface.</p>' +
        '<div data-figure="16.12"></div>' +
        '<p>Without convection, the only way to carry energy is <strong>radiation</strong> &mdash; and that is slow, ' +
        'because stellar gas is very <strong>opaque</strong>: in the Sun a photon typically goes only about ' +
        '<strong>0.01 meter</strong> before being absorbed. The energy is always re-emitted, but in a <strong>random ' +
        'direction</strong>, so a photon heading outward is almost as likely to be sent back toward the center. The ' +
        'energy zigzags almost at random (Figure 16.13) and takes a long time to escape &mdash; probably ' +
        '<strong>100,000 to 1,000,000 years</strong> in the Sun. Without all that absorbing and re-emitting, photons ' +
        'would fly out at light speed in a little over <strong>2 seconds</strong>, just as neutrinos do (Figure ' +
        '16.14).</p>' +
        '<div data-figure="16.13"></div>' +
        '<div data-figure="16.14"></div>' +
        '<div data-diagram="photon-walk"></div>' +
        '<div class="callout-inline"><strong>Making connections: heat transfer and cooking.</strong> All three kinds of ' +
        'heat transfer are used in cooking. <strong>Conduction</strong>: a steak on a hot iron skillet &mdash; the ' +
        'flame makes the skillet&rsquo;s particles vibrate and pass the energy along, and the skillet&rsquo;s surface ' +
        'passes it to the steak (a little oil helps by filling gaps and increasing contact). <strong>Convection</strong>: ' +
        'in an oven, the fire heats air at the bottom, which expands, becomes less dense, and rises to the food. (Ovens ' +
        'with fans are technically &ldquo;advection&rdquo; ovens &mdash; but the scientists who complain loudly about ' +
        'that don&rsquo;t get out much.) <strong>Radiation</strong>: microwave ovens, or a toy oven that bakes ' +
        'brownies with the light and heat of a very bright bulb.</div>' +
        '<h4>Model stars</h4>' +
        '<p>Scientists turn these principles into equations and solve them for the temperature, pressure, density, ' +
        'how well photons are absorbed, and more, throughout the Sun. The answer, based on a specific set of ' +
        'assumptions, is a <strong>theoretical model</strong> of the solar interior (Figure 16.15):</p>' +
        '<ul>' +
        '<li>The <strong>core</strong>, where fusion makes the energy, reaches only about <strong>one-quarter</strong> ' +
        'of the way to the surface but holds about <strong>one-third</strong> of the Sun&rsquo;s mass.</li>' +
        '<li>At the center the temperature peaks at about <strong>15 million K</strong> and the density is nearly ' +
        '<strong>150 times that of water</strong>.</li>' +
        '<li>Energy moves outward by <strong>radiation</strong> until about <strong>70%</strong> of the way from the ' +
        'center to the surface. There <strong>convection</strong> takes over, carrying energy the rest of the way, ' +
        'mainly in rising columns of hot gas.</li>' +
        '</ul>' +
        '<div data-figure="16.15"></div>' +
        '<p>Figure 16.16 shows how temperature, density, energy production, and hydrogen abundance change from the ' +
        'center of the Sun to its surface.</p>' +
        '<div data-figure="16.16"></div>',
      keyIdeas: [
        "Since we can’t see inside the Sun, astronomers build computer models from physics plus what we observe at the surface.",
        "The Sun is entirely plasma, which acts like a hot gas. Gas pressure rises with more particles and with higher temperature.",
        "The Sun is in hydrostatic equilibrium: at every point, outward gas pressure balances the inward pull of gravity. To hold the Sun up, its center must be about 15 million K — hot enough for fusion.",
        "Heat flows from hot to cool, so the Sun is hottest at the center. Because energy keeps flowing out, a fresh energy source (fusion) must keep replacing it.",
        "Energy moves by conduction, convection, and radiation; in stars, radiation and convection matter. A photon goes only about 0.01 m before being absorbed and re-emitted in a random direction, so energy takes 100,000 to 1,000,000 years to reach the surface. Neutrinos escape in a little over 2 seconds.",
        "The solar model: a core reaching one-quarter of the way out but holding one-third of the mass, 15 million K and nearly 150 times water’s density at the center; radiation to 70% of the way out, then convection."
      ],
      selfCheck: [
        { q: "What two things balance each other in hydrostatic equilibrium?",
          a: "The inward pull of gravity and the outward push of gas pressure, balanced at every point inside the star." },
        { q: "How does knowing that the Sun isn’t contracting tell us its center is hot enough for fusion?",
          a: "To make enough pressure to hold up the weight of the Sun, the gas at its center must be about 15 million K — above the 12 million K needed for protons to fuse." },
        { q: "Why must the Sun have an energy source inside it?",
          a: "Energy constantly flows outward from the hot interior and leaves through the surface. Without fresh energy to replace it, the Sun would cool down, like an unplugged iron." },
        { q: "Name the three ways energy moves, and which two matter in stars.",
          a: "Conduction (collisions passing energy along), convection (rising warm material), and radiation (photons). In stars, radiation and convection are important; conduction can usually be ignored." },
        { q: "Why does sunlight take so long to get out of the Sun?",
          a: "The interior is very opaque. A photon travels only about 0.01 m before being absorbed and re-emitted in a random direction, so the energy zigzags for 100,000 to 1,000,000 years before reaching the surface." },
        { q: "Describe the Sun’s interior according to the standard model.",
          a: "A core (about one-quarter of the way out, one-third of the mass, 15 million K, nearly 150 times water’s density at the center) where fusion happens; radiation carries energy out to about 70% of the way to the surface, then convection carries it the rest of the way." }
      ]
    },
    {
      id: "16.4",
      title: "The Solar Interior: Observations",
      minutes: 10,
      pages: "pp. 553–558",
      html:
        '<p>The photosphere is only the Sun&rsquo;s outer skin, so &ldquo;observations of the solar interior&rdquo; ' +
        'should sound surprising. Yet astronomers have two ways to learn about the inside: tiny changes in the motion ' +
        'of small regions on the surface, and the <strong>neutrinos</strong> the Sun gives off.</p>' +
        '<h4>Solar pulsations</h4>' +
        '<p>The Sun <strong>pulsates</strong> &mdash; expanding and contracting, like your chest when you breathe. The ' +
        'motion is very slight, but it shows up in the <strong>radial velocity</strong> of the surface (its speed ' +
        'toward or away from us). Small regions move toward Earth, then away, then toward again, as if the Sun were ' +
        '&ldquo;breathing&rdquo; through thousands of lungs, each <strong>4000 to 15,000 km</strong> across (Figure ' +
        '16.17).</p>' +
        '<div data-figure="16.17"></div>' +
        '<p>A region typically moves only a <strong>few hundred meters per second</strong> and takes about ' +
        '<strong>5 minutes</strong> to go through a full cycle. The Sun&rsquo;s size at any point changes by no more ' +
        'than a few kilometers.</p>' +
        '<p>Remarkably, these tiny motions reveal the interior. They are caused by <strong>waves</strong> coming from ' +
        'deep inside; their strength and timing tell us about the temperature, density, and composition of the layers ' +
        'the waves passed through &mdash; much as earthquake waves reveal Earth&rsquo;s interior. So the study of ' +
        'solar oscillations is called <span class="term">helioseismology</span>. The waves take a little over ' +
        '<strong>an hour</strong> to cross from center to surface, so, like neutrinos, they tell us what the inside is ' +
        'like <strong>now</strong> &mdash; unlike the sunlight we see today, made in the core several hundred thousand ' +
        'years ago.</p>' +
        '<div data-diagram="sun-pulse"></div>' +
        '<p>What helioseismology has found:</p>' +
        '<ul>' +
        '<li><strong>Convection</strong> reaches <strong>30%</strong> of the way from the surface toward the center ' +
        '(this went into Figure 16.15).</li>' +
        '<li>The surface&rsquo;s <strong>differential rotation</strong> (fastest at the equator) continues down through ' +
        'the convection zone. Below it, the Sun, though gaseous, rotates like a <strong>solid body</strong>, like a ' +
        'bowling ball.</li>' +
        '<li>The <strong>helium</strong> abundance inside is about the same as at the surface, except in the center, ' +
        'where fusion has turned hydrogen into helium. So we&rsquo;re right to build interior models using the ' +
        'element abundances measured in the solar atmosphere.</li>' +
        '</ul>' +
        '<p>Helioseismology can also look beneath a sunspot (Figure 16.18). Cool material from the spot flows ' +
        '<strong>downward</strong>, and surrounding material is pulled <strong>inward</strong>, dragging magnetic field ' +
        'with it and keeping the strong field a spot needs. The new material cools, becomes denser, and sinks too: a ' +
        'self-perpetuating cycle that can last for weeks. The sinking cool gas acts as a <strong>plug</strong> that ' +
        'blocks hot gas from rising; the hot gas is diverted sideways and comes up around the spot. That explains a ' +
        'paradox from Chapter 15: the Sun gives off slightly <strong>more</strong> energy when more of its surface is ' +
        'covered by cool sunspots.</p>' +
        '<div data-figure="16.18"></div>' +
        '<p>Helioseismology now helps predict solar storms. Active regions can appear and grow large in only a few ' +
        'days, and the Sun rotates about every <strong>28 days</strong>, so dangerous regions can develop on the far ' +
        'side, where for a long time we couldn&rsquo;t see them. Today space telescopes watch the Sun from all angles. ' +
        'Also, sound waves travel slightly faster where magnetic fields are strong: waves from active regions cross the ' +
        'Sun about <strong>6 seconds faster</strong> than waves from quiet regions. Detecting that gives power ' +
        'companies and satellite operators <strong>a week or more</strong> of warning that a dangerous region is about ' +
        'to rotate into view &mdash; time to plan for disruptions, put instruments into safe mode, or reschedule ' +
        'spacewalks.</p>' +
        '<h4>Solar neutrinos</h4>' +
        '<p>The second technique is to catch a few of the neutrinos made in fusion. They leave the center directly and ' +
        'reach Earth at nearly the speed of light; to neutrinos, the Sun is transparent. About <strong>3%</strong> of ' +
        'the Sun&rsquo;s fusion energy is carried off by neutrinos, and some <strong>35 million billion (3.5 &times; ' +
        '10<sup>16</sup>)</strong> solar neutrinos pass through each square meter of Earth every second. Catch even a ' +
        'few, and we learn directly what&rsquo;s happening in the Sun&rsquo;s center. Unfortunately, Earth and ' +
        'everything on it are nearly transparent to them too.</p>' +
        '<p>Very rarely, though, a neutrino hits an atom. The first successful detector used <strong>cleaning fluid ' +
        '(C<sub>2</sub>Cl<sub>4</sub>)</strong>, the cheapest way to gather lots of chlorine. A neutrino can turn a ' +
        'chlorine nucleus into <strong>radioactive argon</strong>, which can be detected &mdash; but it happens so ' +
        'rarely that a huge amount of chlorine is needed. <strong>Raymond Davis, Jr.</strong> (Figure 16.19) and his ' +
        'colleagues at Brookhaven National Laboratory put a tank of nearly <strong>400,000 liters</strong> of cleaning ' +
        'fluid <strong>1.5 km underground</strong> in a gold mine at <strong>Lead, South Dakota</strong>. The rock ' +
        'above blocks cosmic rays that could create false signals (neutrinos ignore it). Solar neutrinos should make ' +
        'about <strong>one argon atom per day</strong> in the tank.</p>' +
        '<div data-figure="16.19"></div>' +
        '<p>They counted argon atoms about once a month &mdash; a tiny handful among a massive tank of chlorine. The ' +
        'result, from an experiment begun in <strong>1970</strong>: only about <strong>one-third</strong> as many ' +
        'neutrinos as solar models predicted! For years, astronomers and physicists wrestled with the &ldquo;missing&rdquo; ' +
        'neutrinos.</p>' +
        '<p>The answer: there are <strong>three types</strong> of neutrinos. Solar fusion makes only one type, the ' +
        '<strong>electron neutrino</strong>, and the early detectors could catch only that type. On the way from the ' +
        'Sun to Earth, neutrinos change type in a process called <strong>neutrino oscillation</strong>.</p>' +
        '<p>The <strong>Sudbury Neutrino Observatory</strong> in Canada was the first experiment able to catch all ' +
        'three types (Figure 16.20). <strong>2 km</strong> underground in a mine, it was a <strong>12-meter</strong> ' +
        'clear acrylic sphere holding <strong>1000 metric tons of heavy water</strong> &mdash; water whose two hydrogen ' +
        'atoms are deuterium. Incoming neutrinos can occasionally break apart a deuterium nucleus&rsquo;s loosely bound ' +
        'proton and neutron. The sphere was surrounded by <strong>1700 metric tons</strong> of very pure water and ' +
        '<strong>9600 photomultipliers</strong> that detect the flashes of light from neutrino interactions.</p>' +
        '<div data-figure="16.20"></div>' +
        '<p>To the enormous relief of solar modelers, Sudbury detected about <strong>1 neutrino per hour</strong>, and ' +
        'the <strong>total</strong> was just what the models predicted &mdash; but only one-third were electron ' +
        'neutrinos. About <strong>two-thirds</strong> of the Sun&rsquo;s electron neutrinos turn into another type on ' +
        'the way to Earth, which is why earlier experiments saw only one-third.</p>' +
        '<div data-diagram="neutrino-catch"></div>' +
        '<p>Neutrino oscillation can only happen if the electron neutrino&rsquo;s <strong>mass is not zero</strong>; ' +
        'other experiments show it is tiny (even compared with an electron). The <strong>2015 Nobel Prize</strong> in ' +
        'physics went to <strong>Takaaki Kajita</strong> and <strong>Arthur B. McDonald</strong> for showing neutrinos ' +
        'change type. (Raymond Davis shared the <strong>2002</strong> Nobel Prize with Japan&rsquo;s ' +
        '<strong>Masatoshi Koshiba</strong> for the experiments that revealed the problem.) A neutrino with mass has ' +
        'deep implications for physics and astronomy &mdash; for example, in the inventory of the mass of the ' +
        'universe.</p>' +
        '<p>The <strong>Borexino</strong> experiment in Italy identified solar neutrinos from <strong>different ' +
        'reactions</strong>. The p-p chain makes most of the Sun&rsquo;s energy, but side reactions involving nuclei ' +
        'such as beryllium and boron also happen; counting the neutrinos from each confirmed our detailed ' +
        'understanding of solar fusion. In <strong>2014</strong> Borexino caught neutrinos from the first step of the ' +
        'p-p chain, and in <strong>2020</strong> it identified neutrinos from the <strong>CNO cycle</strong> &mdash; ' +
        'minor in the Sun, but important in hotter, more massive stars.</p>' +
        '<p>It&rsquo;s amazing that experiments that began with a swimming pool&rsquo;s worth of cleaning fluid at the ' +
        'bottom of an old gold mine now teach us about the Sun&rsquo;s energy source and the properties of matter &mdash; ' +
        'a good example of how experiments and theory together keep changing our understanding of nature.</p>',
      keyIdeas: [
        "Two ways to “see” inside the Sun: helioseismology (surface oscillations) and neutrinos.",
        "The Sun’s surface pulsates in patches 4000–15,000 km across, moving a few hundred meters per second with a cycle of about 5 minutes. The waves cross the Sun in a little over an hour, so they show the interior as it is now.",
        "Helioseismology shows convection reaches 30% of the way to the center; differential rotation continues through the convection zone, but below it the Sun rotates like a solid body; and the interior’s helium matches the surface, except in the core.",
        "Beneath a sunspot, cool gas sinks and acts as a plug; the blocked hot gas comes up around the spot. Waves from active regions cross the Sun about 6 seconds faster, giving a week or more of warning of far-side activity.",
        "About 3% of fusion energy leaves as neutrinos; 3.5 × 10¹⁶ pass through each square meter of Earth every second.",
        "Raymond Davis’s chlorine detector (400,000 liters, 1.5 km down in a South Dakota gold mine, begun 1970) found only one-third of the predicted neutrinos.",
        "Neutrino oscillation solved it: the Sun makes electron neutrinos, and two-thirds change type on the way. Sudbury (1000 metric tons of heavy water) caught all three types and matched the models. So neutrinos have mass.",
        "Borexino identified neutrinos from different reactions, including the p-p chain’s first step (2014) and the CNO cycle (2020)."
      ],
      selfCheck: [
        { q: "What is helioseismology?",
          a: "The study of the Sun’s oscillations — small, regular in-and-out motions of its surface caused by waves from deep inside — to learn the temperature, density, and composition of the interior." },
        { q: "Name two things helioseismology has taught us about the Sun’s interior.",
          a: "Any two: convection reaches 30% of the way from the surface to the center; differential rotation continues down through the convection zone, but below it the Sun rotates like a solid body; the interior has about the same helium abundance as the surface, except in the core." },
        { q: "How can helioseismology warn us about active regions on the far side of the Sun?",
          a: "Sound waves travel slightly faster where magnetic fields are strong, so waves from active regions cross the Sun about 6 seconds faster than from quiet regions. Detecting this gives a week or more of warning before the region rotates into view." },
        { q: "Why did Davis’s experiment find only one-third of the expected neutrinos?",
          a: "His chlorine detector could catch only electron neutrinos. On the way from the Sun, about two-thirds of the electron neutrinos change into other types (neutrino oscillation), so he missed them." },
        { q: "What did the Sudbury Neutrino Observatory show?",
          a: "Using 1000 metric tons of heavy water, it caught all three types of neutrinos. The total matched the solar models, but only one-third were electron neutrinos — confirming that neutrinos change type and so must have mass." }
      ]
    }
  ];

  /* ------------------------------------------------------------------ GLOSSARY */
  CH.glossary = [
    { term: "Conduction", section: "16.3", def: "Process by which heat is directly transmitted through a substance when there is a difference of temperature between adjoining regions caused by atomic or molecular collisions." },
    { term: "Convection", section: "16.3", def: "Movement caused within a gas or liquid by the tendency of hotter, and therefore less dense material, to rise and colder, denser material to sink under the influence of gravity, which consequently results in transfer of heat." },
    { term: "Fission", section: "16.2", def: "Breaking up of heavier atomic nuclei into lighter ones." },
    { term: "Fusion", section: "16.2", def: "Building up of heavier atomic nuclei from lighter ones." },
    { term: "Helioseismology", section: "16.4", def: "Study of pulsations or oscillations of the Sun in order to determine the characteristics of the solar interior." },
    { term: "Hydrostatic equilibrium", section: "16.3", def: "Balance between the weights of various layers, as in a star or Earth’s atmosphere, and the pressures that support them." },
    { term: "Neutrino", section: "16.2", def: "Fundamental particle that has no charge and a mass that is tiny relative to an electron; it rarely interacts with ordinary matter and comes in three different types." },
    { term: "Positron", section: "16.2", def: "Particle with the same mass as an electron, but positively charged." },
    { term: "Proton-proton chain", section: "16.2", def: "Series of thermonuclear reactions by which nuclei of hydrogen are built up into nuclei of helium." },
    { term: "Radiation", section: "16.3", def: "Emission of energy as electromagnetic waves or photons; also the transmitted energy itself." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "16.1", q: "Why couldn’t chemical burning be the Sun’s energy source?",
      choices: ["A Sun made of coal or wood would last only a few thousand years", "Burning makes no light", "There is no oxygen in the universe", "It would make the Sun too hot"],
      answer: 0,
      whyWrong: [null, "Burning does make light — just not for nearly long enough.", "The issue is how long the fuel lasts, not a lack of oxygen.", "The problem is the opposite: burning is far too weak to last."],
      explain: "Water was on Earth nearly 4 billion years ago, so the Sun has shone far longer than any chemical fuel could last." },
    { section: "16.1", q: "Who proposed that the Sun shines by slowly contracting under its own gravity?",
      choices: ["Kelvin and Helmholtz", "Einstein and Pauli", "Davis and Koshiba", "Darwin"],
      answer: 0,
      whyWrong: [null, "Einstein gave us E = mc² and Pauli the neutrino — the pieces of the real answer.", "They worked on detecting solar neutrinos.", "Darwin worried because the contraction idea didn’t give evolution enough time."],
      explain: "Lord Kelvin and Hermann von Helmholtz proposed it in the mid-nineteenth century." },
    { section: "16.1", q: "About how long could gravitational contraction keep the Sun shining?",
      choices: ["About 100 million years", "About 4.5 billion years", "A few thousand years", "Forever"],
      answer: 0,
      whyWrong: [null, "That’s the Sun’s actual age — which is why contraction can’t be the answer.", "That’s the chemical-burning estimate.", "Contraction releases a limited total, about 10⁴² joules."],
      explain: "About 10⁴² J ÷ about 10³⁴ J per year ≈ 100 million years — far less than Earth’s age." },
    { section: "16.1", q: "What does the law of conservation of energy say?",
      choices: ["Energy can’t be created or destroyed, only changed from one form to another", "Energy is always lost as heat", "Mass can never become energy", "Stars conserve energy by shrinking"],
      answer: 0,
      whyWrong: [null, "Energy can change into heat, but it isn’t destroyed.", "E = mc² shows mass CAN become energy — it’s one more form.", "That’s the contraction hypothesis, not the conservation law."],
      explain: "Examples: a steam engine turns heat into motion; brakes turn motion into heat." },
    { section: "16.2", q: "In E = mc², what is c?",
      choices: ["The speed of light", "The speed of the Sun’s rotation", "The charge of an electron", "The mass of a carbon atom"],
      answer: 0,
      whyWrong: [null, "c is a universal constant, not the Sun’s rotation.", "c isn’t a charge — it’s a speed.", "The carbon atom defines the mass unit u, not c."],
      explain: "c = 3 × 10⁸ m/s; squared, it is a huge conversion factor between mass and energy." },
    { section: "16.2", q: "Completely converting 1 gram of matter into energy would equal burning about how much oil?",
      choices: ["15,000 barrels", "1 barrel", "1 gallon", "15 billion barrels"],
      answer: 0,
      whyWrong: [null, "Far more — c² is enormous.", "Far more.", "That overshoots; the book’s figure is 15,000 barrels."],
      explain: "Because c² is so large, a paperclip’s worth of mass gives as much energy as 15,000 barrels of oil." },
    { section: "16.2", q: "What is a positron?",
      choices: ["An antielectron — an electron’s mass with a positive charge", "A positively charged neutron", "A proton with no charge", "A type of neutrino"],
      answer: 0,
      whyWrong: [null, "Neutrons have no charge, and a positron is much lighter.", "A proton is positive; a positron is a different, much lighter particle.", "Neutrinos are neutral."],
      explain: "When a positron meets an electron, both are annihilated and produce gamma-ray photons." },
    { section: "16.2", q: "Which nucleus is the most stable (has the most binding energy)?",
      choices: ["Iron", "Hydrogen", "Helium", "Uranium"],
      answer: 0,
      whyWrong: [null, "Light nuclei like hydrogen release energy by fusing toward iron.", "Helium is light; fusion can go beyond it.", "Heavy nuclei like uranium release energy by splitting toward iron."],
      explain: "Binding energy is greatest near iron (56 protons and neutrons). Fusion builds up to iron; fission breaks down to it." },
    { section: "16.2", q: "Why does fusion require extremely high temperatures?",
      choices: ["Protons repel each other, so they must move fast enough to get close", "Heat creates new protons", "Cold hydrogen is solid", "Gamma rays need heat to form"],
      answer: 0,
      whyWrong: [null, "Heat speeds particles up; it doesn’t create protons.", "The issue is electrical repulsion, not the state of matter.", "Gamma rays are a result of fusion, not the reason it needs heat."],
      explain: "Above about 12 million K, protons move about 1000 km/s — fast enough to get within reach of the strong nuclear force." },
    { section: "16.2", q: "What does step 1 of the proton-proton chain produce?",
      choices: ["Deuterium, a positron, and a neutrino", "Helium-4 and two protons", "Helium-3 and a gamma ray", "Carbon and oxygen"],
      answer: 0,
      whyWrong: [null, "That is step 3.", "That is step 2.", "Carbon, nitrogen, and oxygen are involved in the CNO cycle, not the p-p chain."],
      explain: "¹H + ¹H → ²H + e⁺ + ν: one proton has effectively turned into a neutron." },
    { section: "16.2", q: "When four hydrogen atoms become one helium atom, what fraction of the mass is turned into energy?",
      choices: ["0.71%", "71%", "25%", "100%"],
      answer: 0,
      whyWrong: [null, "Much less — only 0.02862 u out of 4.03130 u.", "25% is helium’s share of the Sun’s mass, an unrelated number.", "Only matter–antimatter annihilation converts all the mass."],
      explain: "4 × 1.007825 u − 4.00268 u = 0.02862 u lost, which is 0.71%." },
    { section: "16.2", q: "How much energy does fusing 1 kg of hydrogen into helium release?",
      choices: ["6.4 × 10¹⁴ J", "700 J", "4 × 10²⁶ J", "10⁴² J"],
      answer: 0,
      whyWrong: [null, "700 J is the running astronomy instructor’s motion energy.", "4 × 10²⁶ is the Sun’s output in watts (joules per SECOND).", "10⁴² J is the total energy from the Sun’s gravitational contraction."],
      explain: "E = 0.0071 kg × (3 × 10⁸ m/s)² = 6.4 × 10¹⁴ J — a typical U.S. household’s electricity for about 17,000 years." },
    { section: "16.2", q: "Which fusion process powers stars more massive and hotter than the Sun?",
      choices: ["The CNO cycle", "The proton-proton chain", "Fission of iron", "Gravitational contraction"],
      answer: 0,
      whyWrong: [null, "The p-p chain dominates in stars below about 1.2 solar masses, including the Sun.", "Breaking iron absorbs energy rather than releasing it.", "Contraction matters only for a while in newborn stars."],
      explain: "The CNO cycle uses carbon, nitrogen, and oxygen nuclei to turn four hydrogens into one helium." },
    { section: "16.3", q: "What is hydrostatic equilibrium?",
      choices: ["Inward gravity balanced by outward gas pressure at every point", "Equal amounts of hydrogen and helium", "A star that has stopped making energy", "Temperature the same everywhere inside a star"],
      answer: 0,
      whyWrong: [null, "It is about forces, not composition.", "A star in equilibrium is still making energy.", "Temperature is highest at the center and falls outward."],
      explain: "If pressure were too low the star would contract; too high, it would expand — it settles where they balance." },
    { section: "16.3", q: "Gas pressure goes up when…",
      choices: ["the gas is hotter or has more particles in the same volume", "the gas is colder", "the particles move slower", "there are fewer particles"],
      answer: 0,
      whyWrong: [null, "Colder gas means slower particles and lower pressure.", "Slower particles hit with less force.", "Fewer particles means fewer collisions."],
      explain: "Pressure is the bombardment of moving particles; more of them, or faster ones, push harder." },
    { section: "16.3", q: "In stars, which two ways of moving energy are important?",
      choices: ["Radiation and convection", "Conduction and radiation", "Conduction and convection", "Only conduction"],
      answer: 0,
      whyWrong: [null, "Conduction can usually be ignored in stars.", "That pair matters inside planets.", "Conduction is the one that usually doesn’t matter in stars."],
      explain: "Stars are much more transparent than planets, so radiation and convection carry the energy." },
    { section: "16.3", q: "About how long does energy made in the Sun’s core take to reach the surface?",
      choices: ["100,000 to 1,000,000 years", "A little over 2 seconds", "About 6 seconds", "About an hour"],
      answer: 0,
      whyWrong: [null, "That’s a neutrino’s trip — photons get absorbed and redirected over and over.", "About 6 seconds is how long a deuterium nucleus lasts before step 2 of the p-p chain.", "About an hour is how long helioseismic waves take."],
      explain: "Photons go only about 0.01 m before being absorbed and re-emitted in a random direction." },
    { section: "16.3", q: "In the Sun’s model, where does convection take over from radiation?",
      choices: ["About 70% of the way from the center to the surface", "At the very center", "About 25% of the way out", "Only in the corona"],
      answer: 0,
      whyWrong: [null, "The center is the core, where fusion makes the energy.", "About one-quarter of the way out is the edge of the core.", "The corona is the outer atmosphere, not part of the interior model."],
      explain: "Radiation carries energy out to about 70%; convection, mainly rising columns of hot gas, does the rest." },
    { section: "16.4", q: "What is helioseismology?",
      choices: ["Studying the Sun’s oscillations to learn about its interior", "Measuring earthquakes caused by the Sun", "Counting sunspots", "Catching solar neutrinos"],
      answer: 0,
      whyWrong: [null, "It is named by analogy with seismology, but it studies the Sun, not Earth.", "Sunspot counts reveal the cycle, not the deep interior.", "Catching neutrinos is the OTHER way to observe the interior."],
      explain: "Surface patches move in and out about every 5 minutes; the waves reveal the layers they passed through." },
    { section: "16.4", q: "Helioseismology shows the convection zone extends how far toward the center?",
      choices: ["30% of the way", "70% of the way", "All the way to the center", "Only 400 km"],
      answer: 0,
      whyWrong: [null, "Careful: convection starts 70% of the way OUT from the center — that is 30% of the way IN from the surface.", "The core and radiative zone lie below it.", "400 km is about the thickness of the photosphere."],
      explain: "Convection extends inward from the surface 30% of the way to the center." },
    { section: "16.4", q: "Why did Raymond Davis detect only about one-third of the predicted solar neutrinos?",
      choices: ["Two-thirds of the electron neutrinos changed into other types on the way to Earth", "The Sun makes fewer neutrinos than models predict", "His tank was too small", "Earth blocked most of them"],
      answer: 0,
      whyWrong: [null, "Sudbury found the TOTAL was just what the models predicted.", "The tank size was planned; the missing ones were a different type.", "Earth is nearly transparent to neutrinos."],
      explain: "His detector could catch only electron neutrinos; neutrino oscillation changes two-thirds of them on the way." },
    { section: "16.4", q: "What did the Sudbury Neutrino Observatory use to catch all three types of neutrinos?",
      choices: ["1000 metric tons of heavy water", "400,000 liters of cleaning fluid", "A large radio telescope", "A space probe"],
      answer: 0,
      whyWrong: [null, "Cleaning fluid was Davis’s chlorine detector, which caught only electron neutrinos.", "Neutrinos aren’t detected with radio telescopes.", "It was 2 km underground in a mine in Canada."],
      explain: "Neutrinos occasionally break apart deuterium nuclei in heavy water; 9600 photomultipliers caught the flashes." },
    { section: "16.4", q: "What does neutrino oscillation tell us about neutrinos?",
      choices: ["They have mass", "They travel faster than light", "They have negative charge", "They come in only one type"],
      answer: 0,
      whyWrong: [null, "They travel at nearly the speed of light, not faster.", "Neutrinos have no charge.", "There are three types; oscillation is changing between them."],
      explain: "Oscillation can happen only if the electron neutrino’s mass isn’t zero — work honored by the 2015 Nobel Prize." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[16] = CH;
})();
