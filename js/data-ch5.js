/* =============================================================================
   Astronomy 2e — Chapter 5: Radiation and Spectra
   Study content, reworded in plain language (every fact, name, date, and number
   kept). Text adapted from OpenStax "Astronomy 2e" (Chapter 5), CC BY 4.0.
   https://openstax.org/books/astronomy-2e   Registers into window.ASTRO_CHAPTERS[5].
   ============================================================================= */
(function () {
  "use strict";

  var CH = {};

  CH.meta = {
    book: "Astronomy 2e (OpenStax)",
    chapter: 5,
    chapterTitle: "Radiation and Spectra",
    license: "Content adapted from OpenStax Astronomy 2e, CC BY 4.0.",
    sourceUrl: "https://openstax.org/books/astronomy-2e/pages/5-introduction",
    // Printed book page numbers (the number shown at the foot of each PDF page).
    // In the "astronomy-2e_-_WEB (1).pdf" file, the PDF file-page = book page + 18.
    pages: "pp. 139–171"
  };

  CH.tools = ["lightwaves", "emspectrum", "spectroscopy", "atomstructure", "spectrallines", "doppler"];

  /* ---------------------------------- ONE STUDY TOOL PER TOPIC: match data */
  CH.lightwavesmatch = [
    { a: "Wavelength (λ)", b: "crest-to-crest distance; longer wavelength visible light looks redder, shorter looks bluer" },
    { a: "Frequency (f)", b: "cycles per second, measured in hertz (Hz), named for Heinrich Hertz" },
    { a: "c = λf", b: "the wave equation — every electromagnetic wave travels at the same speed, so wavelength and frequency trade off" },
    { a: "Photon", b: "a discrete packet of electromagnetic energy — light's particle side" },
    { a: "Inverse square law", b: "brightness falls off as 1 over the square of the distance from the source" },
    { a: "The “aether”", b: "a made-up 19th-century substance for light to travel through — it doesn't exist" }
  ];
  CH.emspectrummatch = [
    { a: "Gamma rays", b: "shortest wavelength, under 0.01 nm — from nuclear reactions and violent stellar deaths" },
    { a: "X-rays", b: "0.01–20 nm — penetrate soft tissue but not bone" },
    { a: "Ultraviolet", b: "20–400 nm — mostly blocked by Earth's ozone layer" },
    { a: "Visible light", b: "400–700 nm — the band that reaches Earth's surface most easily" },
    { a: "Infrared", b: "heat radiation, absorbed by water and CO₂ — best observed from high, dry places" },
    { a: "Radio waves", b: "longest wavelengths — AM is blocked by the ionosphere, FM/TV pass through" },
    { a: "Wien's law", b: "hotter objects radiate their peak power at shorter wavelengths" },
    { a: "Stefan-Boltzmann law", b: "a blackbody's energy flux grows with the 4th power of its temperature" }
  ];
  CH.spectroscopymatch = [
    { a: "Continuous spectrum", b: "an unbroken rainbow of every wavelength — from a solid or dense gas" },
    { a: "Absorption (dark-line) spectrum", b: "dark lines missing from a continuous spectrum, from cool gas in front of a hot source" },
    { a: "Emission (bright-line) spectrum", b: "only bright lines, no background — a hot, thin, glowing gas alone" },
    { a: "Dispersion", b: "different wavelengths bending by different amounts through a prism" },
    { a: "Spectral signature", b: "the unique line pattern that identifies a chemical element" },
    { a: "Fraunhofer (1815)", b: "counted about 600 dark lines in the Sun's spectrum" },
    { a: "Kirchhoff (1860)", b: "first identified an element (sodium) in the Sun by its spectrum" }
  ];
  CH.atomstructurematch = [
    { a: "Thomson (1897)", b: "discovered the negatively charged electron" },
    { a: "Rutherford (1911)", b: "gold foil experiment — found a tiny, dense, positively charged nucleus" },
    { a: "Proton", b: "positively charged nucleus particle; its count defines the element" },
    { a: "Neutron", b: "nucleus particle with about a proton's mass but no charge" },
    { a: "Isotopes", b: "same number of protons, different numbers of neutrons — like hydrogen, deuterium, tritium" },
    { a: "Bohr's model", b: "electrons occupy only certain fixed orbits, radiating nothing while they stay there" },
    { a: "Planck's constant (h)", b: "links a photon's energy to its frequency: E = hf" }
  ];
  CH.spectrallinesmatch = [
    { a: "Ground state", b: "an atom's lowest possible energy level" },
    { a: "Excitation", b: "absorbing energy to jump to a higher energy level" },
    { a: "De-excitation", b: "dropping to a lower level, emitting a photon of the exact energy difference" },
    { a: "Lyman series", b: "hydrogen transitions to/from the ground state (n=1) — ultraviolet photons" },
    { a: "Balmer series", b: "hydrogen transitions to/from the first excited state (n=2) — visible-light photons" },
    { a: "Ionization", b: "removing an electron entirely from an atom, leaving a charged ion" },
    { a: "Ionization energy", b: "the minimum energy needed to remove one electron from a ground-state atom" }
  ];
  CH.dopplermatch = [
    { a: "Doppler effect", b: "a wave's observed wavelength shifts because source and observer are moving relative to each other" },
    { a: "Blueshift", b: "wavelength shortened — the source is approaching" },
    { a: "Redshift", b: "wavelength lengthened — the source is receding" },
    { a: "Radial velocity", b: "the part of an object's motion directed straight toward or away from the observer" },
    { a: "Sideways (transverse) motion", b: "produces no Doppler shift at all" },
    { a: "Christian Doppler (1842)", b: "tested the effect using musicians playing on a moving railroad car" }
  ];

  /* ------------------------------------------------------------------ FIGURES
     Images from OpenStax Astronomy 2e (CC BY 4.0), placed in the matching
     sections via <div data-figure="N.N"></div>. Captions are the book's own,
     with credit lines intact. Files in img/ (downscaled for web). */
  CH.figures = {
    "5.1": {
      file: "fig-5-1.jpg",
      title: "Our Sun in Ultraviolet Light",
      alt: "A false-color photo of the Sun taken in ultraviolet, showing a mottled gold-and-purple disk with bright flare spots and a glowing edge.",
      caption: "Our Sun in Ultraviolet Light. This photograph of the Sun was taken at several different wavelengths of ultraviolet, which our eyes cannot see, and then color coded so it reveals activity in our Sun’s atmosphere that cannot be observed in visible light. This is why it is important to observe the Sun and other astronomical objects in wavelengths other than the visible band of the spectrum. This image was taken by a satellite from above Earth’s atmosphere, which is necessary since Earth’s atmosphere absorbs much of the ultraviolet light coming from space. (credit: modification of work by NASA)"
    },
    "5.2": {
      file: "fig-5-2.jpg",
      title: "James Clerk Maxwell (1831–1879)",
      alt: "A black-and-white engraved portrait of a bearded man in a jacket and bow tie.",
      caption: "James Clerk Maxwell (1831–1879). Maxwell unified the rules governing electricity and magnetism into a coherent theory."
    },
    "5.3": {
      file: "fig-5-3.jpg",
      title: "Making Waves",
      alt: "A frog's head poking out of pond water, with a pattern of ripples spreading outward across the water's surface.",
      caption: "Making Waves. An oscillation in a pool of water creates an expanding disturbance called a wave. (credit: modification of work by “vastateparksstaff”/Flickr)"
    },
    "5.4": {
      file: "fig-5-4.jpg",
      title: "Characterizing Waves",
      alt: "A diagram of a sine wave with a crest and a trough labeled, and the wavelength marked as the distance between two crests.",
      caption: "Characterizing Waves. Electromagnetic radiation has wave-like characteristics. The wavelength (λ) is the distance between crests, the frequency (f) is the number of cycles per second, and the speed (c) is the distance the wave covers during a specified period of time (e.g., kilometers per second)."
    },
    "5.5": {
      file: "fig-5-5.jpg",
      title: "Inverse Square Law for Light",
      alt: "A diagram of light rays spreading out from a Sun to cover progressively larger squared grids at increasing distances, labeled with decreasing concentration of radiation.",
      caption: "Inverse Square Law for Light. As light radiates away from its source, it spreads out in such a way that the energy per unit area (the amount of energy passing through one of the small squares) decreases as the square of the distance from its source."
    },
    "5.6": {
      file: "fig-5-6.jpg",
      title: "Radiation and Earth’s Atmosphere",
      alt: "A diagram of the electromagnetic spectrum from gamma rays to radio waves as vertical bars descending into a cross-section of Earth's atmosphere, showing which bands reach ground-based telescopes versus only spacecraft.",
      caption: "Radiation and Earth’s Atmosphere. This figure shows the bands of the electromagnetic spectrum and how well Earth’s atmosphere transmits them. Note that high-frequency waves from space do not make it to the surface and must therefore be observed from space. Some infrared and microwaves are absorbed by water and thus are best observed from high altitudes. Low-frequency radio waves are blocked by Earth’s ionosphere. (credit: modification of work by STScI/JHU/NASA)"
    },
    "5.7": {
      file: "fig-5-7.jpg",
      title: "X-Ray Sky",
      alt: "An oval all-sky map in red, green, and blue speckled colors, with a bright blue band running horizontally across the middle representing the plane of the Milky Way.",
      caption: "X-Ray Sky. This is a map of the sky tuned to certain types of X-rays (seen from above Earth’s atmosphere). The map tilts the sky so that the disk of our Milky Way Galaxy runs across its center. It was constructed and artificially colored from data gathered by the European ROSAT satellite. Each color (red, yellow, and blue) shows X-rays of different frequencies or energies. For example, red outlines the glow from a hot local bubble of gas all around us, blown by one or more exploding stars in our cosmic vicinity. Yellow and blue show more distant sources of X-rays, such as remnants of other exploded stars or the active center of our Galaxy (in the middle of the picture). (credit: modification of work by NASA)"
    },
    "5.8": {
      file: "fig-5-8.jpg",
      title: "Radiation Laws Illustrated",
      alt: "A graph of intensity versus wavelength showing four curves for objects at 5500 K, 4400 K, 3400 K, and 2500 K, each peaking at a different point and shifting toward longer wavelengths as temperature drops.",
      caption: "Radiation Laws Illustrated. This graph shows in arbitrary units how many photons are given off at each wavelength for objects at four different temperatures. The wavelengths corresponding to visible light are shown by the colored bands. Note that at hotter temperatures, more energy (in the form of photons) is emitted at all wavelengths. The higher the temperature, the shorter the wavelength at which the peak amount of energy is radiated (this is known as Wien’s law)."
    },
    "5.9": {
      file: "fig-5-9.jpg",
      title: "Action of a Prism",
      alt: "A triangular glass prism with a beam of white light entering one face and a rainbow-colored band of light, from red to violet, exiting the other side.",
      caption: "Action of a Prism. When we pass a beam of white sunlight through a prism, we see a rainbow-colored band of light that we call a continuous spectrum."
    },
    "5.10": {
      file: "fig-5-10.jpg",
      title: "Continuous Spectrum",
      alt: "A horizontal bar of unbroken rainbow colors labeled with wavelengths in nanometers from about 400 to over 700, with ultraviolet and infrared marked at each end.",
      caption: "Continuous Spectrum. When white light passes through a prism, it is dispersed and forms a continuous spectrum of all the colors. Although it is hard to see in this printed version, in a well-dispersed spectrum, many subtle gradations in color are visible as your eye scans from one end (violet) to the other (red)."
    },
    "5.11": {
      file: "fig-5-11.jpg",
      title: "Visible Spectrum of the Sun",
      alt: "A rainbow-colored spectrum band from blue to red, crossed by many thin dark vertical lines at irregular spacing.",
      caption: "Visible Spectrum of the Sun. Our star’s spectrum is crossed by dark lines produced by atoms in the solar atmosphere that absorb light at certain wavelengths. (credit: modification of work by Nigel Sharp, NOAO/National Solar Observatory at Kitt Peak/AURA, and the National Science Foundation)"
    },
    "5.12": {
      file: "fig-5-12.jpg",
      title: "Continuous Spectrum and Line Spectra from Different Elements",
      alt: "A continuous rainbow band on top, with four black strips below it showing colored bright lines at different positions for sodium, hydrogen, calcium, and mercury.",
      caption: "Continuous Spectrum and Line Spectra from Different Elements. Each type of glowing gas (each element) produces its own unique pattern of lines, so the composition of a gas can be identified by its spectrum. The spectra of sodium, hydrogen, calcium, and mercury gases are shown here."
    },
    "5.13": {
      file: "fig-5-13.jpg",
      title: "Rainbow Refraction",
      alt: "Three panels: an observer viewing a rainbow with angle lines drawn to raindrops; a photo of a real double rainbow over a lake; a close-up diagram of sunlight refracting and reflecting inside a single raindrop to produce a spread of violet-to-red light.",
      caption: "Rainbow Refraction. (a) This diagram shows how light from the Sun, which is located behind the observer, can be refracted by raindrops to produce (b) a rainbow. (c) Refraction separates white light into its component colors."
    },
    "5.14": {
      file: "fig-5-14.jpg",
      title: "Rutherford’s Experiment",
      alt: "Two panels: a diagram of a beam of alpha particles striking gold foil with most passing through and a few deflecting or bouncing back; a simple solar-system-style sketch of a positive nucleus with two electrons orbiting it.",
      caption: "Rutherford’s Experiment. (a) When Rutherford allowed α particles from a radioactive source to strike a target of gold foil, he found that, although most of them went straight through, some rebounded back in the direction from which they came. (b) From this experiment, he concluded that the atom must be constructed like a miniature solar system, with the positive charge concentrated in the nucleus and the negative charge orbiting in the large volume around the nucleus. Note that this drawing is not to scale; the electron orbits are much larger relative to the size of the nucleus."
    },
    "5.15": {
      file: "fig-5-15.jpg",
      title: "Hydrogen Atom",
      alt: "A large pale blue sphere representing an atom, with a small plus-marked proton at the center and a minus-marked electron on the sphere's edge.",
      caption: "Hydrogen Atom. This is a schematic diagram of a hydrogen atom in its lowest energy state, also called the ground state. The proton and electron have equal but opposite charges, which exert an electromagnetic force that binds the hydrogen atom together. In the illustration, the size of the particles is exaggerated so that you can see them; they are not to scale. They are also shown much closer than they would actually be as it would take more than an entire page to show their actual distance to scale."
    },
    "5.16": {
      file: "fig-5-16.jpg",
      title: "Helium Atom",
      alt: "A pale blue sphere with two red neutrons and two blue-marked protons clustered at the center, and two minus-marked electrons on opposite edges of the sphere.",
      caption: "Helium Atom. Here we see a schematic diagram of a helium atom in its lowest energy state. Two protons are present in the nucleus of all helium atoms. In the most common variety of helium, the nucleus also contains two neutrons, which have nearly the same mass as the proton but carry no charge. Two electrons orbit the nucleus."
    },
    "5.17": {
      file: "fig-5-17.jpg",
      title: "Isotopes of Hydrogen",
      alt: "Three spheres side by side, each with one proton and one electron, but with zero, one, or two red neutrons added at the center, labeled hydrogen, deuterium, and tritium.",
      caption: "Isotopes of Hydrogen. A single proton in the nucleus defines the atom to be hydrogen, but there may be zero, one, or two neutrons. The most common isotope of hydrogen is the one with only a single proton and no neutrons."
    },
    "5.18": {
      file: "fig-5-18.jpg",
      title: "Niels Bohr and Max Planck",
      alt: "Two black-and-white photographs side by side: an older man seated at a desk covered in papers, and a formal portrait of a balding man with round glasses and a mustache.",
      caption: "Niels Bohr (1885–1962) and Max Planck (1858–1947). (a) Bohr, shown at his desk in this 1935 photograph, and (b) Planck helped us understand the energy behavior of photons."
    },
    "5.19": {
      file: "fig-5-19.jpg",
      title: "Bohr Model for Hydrogen",
      alt: "Concentric rings labeled n=1 through n=5 around a central nucleus, with colored arrows showing an electron jumping outward or inward between rings and emitting violet, blue-green, or red spectral lines.",
      caption: "Bohr Model for Hydrogen. In this simplified model of a hydrogen atom, the concentric circles shown represent permitted orbits or energy levels. An electron in a hydrogen atom can only exist in one of these energy levels (or states). The closer the electron is to the nucleus, the more tightly bound the electron is to the nucleus. By absorbing energy, the electron can move to energy levels farther from the nucleus (and even escape if enough energy is absorbed)."
    },
    "5.20": {
      file: "fig-5-20.jpg",
      title: "Energy-Level Diagrams for Hydrogen",
      alt: "Two panels: concentric orbit rings n=1 through n=5 with labeled arrows for the Balmer, Lyman, and Paschen series; and a ladder-like energy diagram with downward arrows grouped into the Lyman, Balmer, Paschen, and Brackett series, getting more closely spaced at higher energy.",
      caption: "Energy-Level Diagrams for Hydrogen. (a) Here we follow the emission or absorption of photons by a hydrogen atom according to the Bohr model. Several different series of spectral lines are shown, corresponding to transitions of electrons from or to certain allowed orbits. Each series of lines that terminates on a specific inner orbit is named for the physicist who studied it. At the top, for example, you see the Balmer series, and arrows show electrons jumping from the second orbit (n = 2) to the third, fourth, fifth, and sixth orbits. Each time a “poor” electron from a lower level wants to rise to a higher position in life, it must absorb energy to do so. It can absorb the energy it needs from passing waves (or photons) of light. The next set of arrows (Lyman series) show electrons falling down to the first orbit from different (higher) levels. Each time a “rich” electron goes downward toward the nucleus, it can afford to give off (emit) some energy it no longer needs. (In this idealized diagram, the energy levels are shown equally spaced; in real life, they are not.) (b) At higher and higher energy levels, the levels become more and more crowded together, approaching a limit. The region above the top line represents energies at which the atom is ionized (the electron is no longer attached to the atom). Each series of arrows represents electrons falling from higher levels to lower ones, releasing photons or waves of energy in the process."
    },
    "5.21": {
      file: "fig-5-21.jpg",
      title: "Three Kinds of Spectra",
      alt: "A diagram showing a light source's continuous spectrum, a cloud of gas the light passes through, the resulting continuous spectrum with dark absorption lines, and, separately, the cloud's own bright-line emission spectrum.",
      caption: "Three Kinds of Spectra. When we see a lightbulb or other source of continuous radiation, all the colors are present. When the continuous spectrum is seen through a thinner gas cloud, the cloud’s atoms produce absorption lines in the continuous spectrum. When the excited cloud is seen without the continuous source behind it, its atoms produce emission lines. We can learn which types of atoms are in the gas cloud from the pattern of absorption or emission lines."
    },
    "5.22": {
      file: "fig-5-22.jpg",
      title: "Doppler Effect",
      alt: "Two diagrams of concentric wave-crest circles around a source: one for a stationary source with evenly spaced circles, and one for a moving source with circles bunched together toward one observer and spread apart toward another.",
      caption: "Doppler Effect. (a) A source, S, makes waves whose numbered crests (1, 2, 3, and 4) wash over a stationary observer. (b) The source S now moves toward observer A and away from observer C. Wave crest 1 was emitted when the source was at position S1, crest 2 at position S2, and so forth. Observer A sees waves compressed by this motion and sees a blueshift (if the waves are light). Observer C sees the waves stretched out by the motion and sees a redshift. Observer B, whose line of sight is perpendicular to the source’s motion, sees no change in the waves (and feels left out)."
    }
  };

  /* ---------------------------------------------------------------- SECTIONS */
  CH.sections = [
    {
      id: "5.1",
      title: "The Behavior of Light",
      minutes: 12,
      pages: "pp. 140–146",
      html:
        '<p>The nearest star is so far away that the fastest spacecraft humans have built would take almost ' +
        '100,000 years to get there. Yet astronomers still want to know what a star is made of and how it ' +
        'differs from the Sun &mdash; and light is nearly the only messenger available. Even light itself, ' +
        'traveling at 300,000 kilometers per second, takes more than 4 years to reach us from the nearest ' +
        'star.</p>' +
        '<p>In everyday language, &ldquo;radiation&rdquo; usually means the energetic particles thrown off by ' +
        'radioactive materials. That is <em>not</em> what astronomers mean by the word. In this book, ' +
        '<span class="term">radiation</span> is simply a general term for waves &mdash; including light waves ' +
        '&mdash; that spread outward from a source.</p>' +
        '<h4>Maxwell&rsquo;s electromagnetic theory</h4>' +
        '<p>Every atom holds particles with <span class="term">electric charge</span>: positively charged ' +
        '<strong>protons</strong> in its nucleus, negatively charged <strong>electrons</strong> outside it. ' +
        'Stationary charges only attract or repel; charges in motion also produce <strong>magnetism</strong>. ' +
        'Physicists call the reach of these forces a <span class="term">field</span> &mdash; a stationary ' +
        'charge makes an electric field, a moving charge also makes a magnetic field, and a changing field of ' +
        'either kind can generate the other, letting the two keep triggering each other outward.</p>' +
        '<p>Scottish physicist <strong>James Clerk Maxwell</strong> (Figure 5.2) worked out the equations tying ' +
        'electricity and magnetism together, and calculated that an oscillating (back-and-forth moving) ' +
        'electric charge should send a disturbance of changing electric and magnetic fields rippling outward ' +
        '&mdash; much like a frog jumping into a pond spreads ripples across the water (Figure 5.3). Maxwell ' +
        'calculated the speed of this disturbance and found it matched the already-measured <strong>speed of ' +
        'light</strong> exactly, leading him to propose that light itself is one form of this family of ' +
        '<span class="term">electromagnetic radiation</span>. Unlike water or sound waves, electromagnetic ' +
        'waves need no medium to travel through &mdash; nineteenth-century scientists invented an imaginary ' +
        'substance called the &ldquo;aether&rdquo; to fill space for light to move through, but we now know ' +
        'there is no aether: electromagnetic waves cross the vacuum of space just fine.</p>' +
        '<div data-figure="5.2"></div>' +
        '<div data-figure="5.3"></div>' +
        '<h4>Wavelength, frequency, and the speed of light</h4>' +
        '<p>Any wave motion can be described by a repeating series of crests and troughs (Figure 5.4). The ' +
        'distance from one crest to the next is the <span class="term">wavelength</span> (symbol &lambda;, the ' +
        'Greek letter lambda); the number of crests passing a point each second is the ' +
        '<span class="term">frequency</span> (symbol f), measured in cycles per second, or ' +
        '<strong>hertz (Hz)</strong> &mdash; named for physicist <strong>Heinrich Hertz</strong>, who generated ' +
        'and detected the first artificial radio waves in <strong>1887</strong>. Because every electromagnetic ' +
        'wave travels at the same speed <em>c</em> &mdash; about <strong>300,000 kilometers per second</strong> ' +
        '(300,000,000 meters per second) &mdash; wavelength and frequency trade off against each other: ' +
        '<strong>c = &lambda;f</strong>. For visible light, our eyes read different wavelengths as different ' +
        'colors, from the longest (red) to the shortest (violet) &mdash; remembered by the mnemonic ' +
        '<strong>ROY G BIV</strong> (Red, Orange, Yellow, Green, Blue, Indigo, Violet).</p>' +
        '<div data-figure="5.4"></div>' +
        '<p class="callout-inline"><strong>Worked example.</strong> Solving c = &lambda;f for wavelength gives ' +
        '&lambda; = c &divide; f. A wave with a frequency of about 5.66 &times; 10<sup>14</sup> Hz has a ' +
        'wavelength of (3 &times; 10<sup>8</sup> m/s) &divide; (5.66 &times; 10<sup>14</sup> Hz) &asymp; 5.3 ' +
        '&times; 10<sup>&minus;7</sup> m, or <strong>530 nanometers</strong> &mdash; in the yellow-green part ' +
        'of the visible spectrum.</p>' +
        '<div data-diagram="light-wave"></div>' +
        '<h4>Light as a photon</h4>' +
        '<p>Maxwell&rsquo;s wave picture of light was one of the great triumphs of nineteenth-century science, ' +
        'but twentieth-century experiments showed light also behaves like a self-contained packet of energy ' +
        'called a <span class="term">photon</span>. Waves and particles sound like opposites &mdash; a wave ' +
        'spreads out, a particle sits in one place &mdash; yet countless experiments confirm light does both, a ' +
        'puzzle resolved only by the fuller theory of <strong>quantum mechanics</strong>. In practice, ' +
        'astronomers freely switch between describing radiation as waves and as streams of photons: a ' +
        'photon&rsquo;s energy is tied to its frequency as a wave, so a low-frequency radio wave means a ' +
        'low-energy photon, and a high-frequency X-ray means a high-energy one. Among visible colors, ' +
        '<strong>violet-light photons carry the most energy and red-light photons the least</strong>.</p>' +
        '<h4>The inverse square law</h4>' +
        '<p>Light leaving a source spreads out in an ever-widening shell in every direction, so the same total ' +
        'energy has to cover more and more area the farther it travels (Figure 5.5) &mdash; the covered area ' +
        'grows with the <em>square</em> of the distance. Stand twice as far from a lamp and your eye catches ' +
        '2<sup>2</sup> = <strong>4 times less</strong> light; stand ten times farther and you catch ' +
        '10<sup>2</sup> = <strong>100 times less</strong>. This <span class="term">inverse square law</span> is ' +
        'why stars, which up close would resemble the Sun, look like faint pinpoints from far away: one of the ' +
        'nearest stars, <strong>Alpha Centauri A</strong>, gives off about as much total energy as the Sun, but ' +
        'sits about <strong>270,000 times farther away</strong> &mdash; and so appears about ' +
        '<strong>73 billion times fainter</strong>.</p>' +
        '<div data-figure="5.5"></div>' +
        '<p class="callout-inline"><strong>Worked example.</strong> A 120-W lightbulb measured 2 m away has an ' +
        'intensity of 2.4 W/m&sup2;. Double that distance to 4 m, and the intensity drops to (&frac12;)<sup>2</sup> ' +
        '= &frac14; of the original: <strong>0.6 W/m&sup2;</strong>.</p>' +
        '<div data-diagram="inverse-square"></div>',
      keyIdeas: [
        "Maxwell's electromagnetic theory shows that oscillating electric charges radiate waves of changing electric and magnetic fields that travel at the speed of light; light is one form of this electromagnetic radiation, and no medium (no 'aether') is needed for it to travel.",
        "A wave's wavelength (λ, crest-to-crest distance) and frequency (f, cycles per second = hertz, named for Heinrich Hertz) are tied together by the wave equation c = λf, since all electromagnetic waves travel at the same speed c ≈ 300,000 km/s.",
        "Visible light's colors run, from longest to shortest wavelength, in the order ROY G BIV.",
        "Light also behaves as a photon — a discrete packet of energy; a photon's energy is tied to its frequency, so violet-light photons carry more energy than red-light photons, and X-ray photons carry more energy than radio-wave photons.",
        "The inverse square law: the apparent brightness of a light source falls off with the square of the distance from it — twice as far away means 4 times fainter, ten times as far means 100 times fainter."
      ],
      selfCheck: [
        { q: "What did Maxwell's theory conclude about light, and what evidence convinced him?",
          a: "That light is one form of electromagnetic radiation — waves of changing electric and magnetic fields. Maxwell calculated the speed such a disturbance should travel and found it matched the already-measured speed of light exactly." },
        { q: "Why is the unit of frequency called the 'hertz'?",
          a: "It's named for physicist Heinrich Hertz, who in 1887 was the first to generate and detect artificial electromagnetic waves (radio waves), confirming Maxwell's theory." },
        { q: "Between a radio-wave photon and an X-ray photon, which carries more energy, and why?",
          a: "The X-ray photon. Photon energy rises with frequency, and X-rays are a much higher-frequency (shorter-wavelength) wave than radio waves." },
        { q: "Alpha Centauri A puts out about as much total energy as the Sun. Why does it look so much fainter to us?",
          a: "Because of the inverse square law — it sits about 270,000 times farther from us than the Sun does, and brightness falls off with the square of distance, so it appears about 73 billion times fainter despite emitting a similar amount of light." }
      ]
    },
    {
      id: "5.2",
      title: "The Electromagnetic Spectrum",
      minutes: 13,
      pages: "pp. 147–154",
      html:
        '<div data-figure="5.1"></div>' +
        '<p>Objects across the universe send out an enormous range of electromagnetic radiation, which ' +
        'astronomers sort into bands (Figure 5.6) &mdash; visible light is only a tiny slice of it, and judging ' +
        'the whole universe by visible light alone is a bit like judging every guest at a big dinner party by ' +
        'nothing but the shoes you can see from under the table.</p>' +
        '<h4>The bands of the spectrum</h4>' +
        '<p>From shortest to longest wavelength:</p>' +
        '<div class="pv-wrap"><table class="pv-table"><tbody>' +
        '<tr><th>Band</th><th>Wavelength range</th><th>Source temperature</th><th>Typical sources</th></tr>' +
        '<tr><td>Gamma rays</td><td>under 0.01 nm</td><td>over 10<sup>8</sup> K</td><td>Nuclear reactions; the most violent, high-energy events</td></tr>' +
        '<tr><td>X-rays</td><td>0.01–20 nm</td><td>10<sup>6</sup>–10<sup>8</sup> K</td><td>Gas in galaxy clusters, supernova remnants, the solar corona</td></tr>' +
        '<tr><td>Ultraviolet</td><td>20–400 nm</td><td>10<sup>4</sup>–10<sup>6</sup> K</td><td>Supernova remnants, very hot stars</td></tr>' +
        '<tr><td>Visible</td><td>400–700 nm</td><td>10<sup>3</sup>–10<sup>4</sup> K</td><td>Ordinary stars, including the Sun</td></tr>' +
        '<tr><td>Infrared</td><td>10<sup>3</sup>–10<sup>6</sup> nm</td><td>10–10<sup>3</sup> K</td><td>Cool clouds of dust and gas, planets, moons</td></tr>' +
        '<tr><td>Microwave</td><td>10<sup>6</sup>–10<sup>9</sup> nm</td><td>under 10 K</td><td>Active galaxies, pulsars, cosmic background radiation</td></tr>' +
        '<tr><td>Radio</td><td>over 10<sup>9</sup> nm</td><td>under 10 K</td><td>Supernova remnants, pulsars, cold gas</td></tr>' +
        '</tbody></table></div>' +
        '<p>Only a few bands reach Earth&rsquo;s surface: <strong>visible light</strong> (also, not ' +
        'coincidentally, the band the Sun sends out the most of, and the band human eyes evolved to see) and ' +
        'some <strong>radio</strong> wavelengths, through what astronomers call the atmosphere&rsquo;s optical ' +
        'and radio &ldquo;windows.&rdquo; <strong>Gamma rays, X-rays,</strong> and most <strong>ultraviolet</strong> ' +
        'light are absorbed by the atmosphere before reaching the ground (fortunately for our health) and can ' +
        'only be studied from space &mdash; which is why the ultraviolet image of the Sun in Figure 5.1 had to ' +
        'be taken by a satellite. <strong>Infrared</strong> and some <strong>microwaves</strong> are absorbed ' +
        'by water vapor and carbon dioxide low in the atmosphere, so infrared astronomy works best from high ' +
        'mountaintops, aircraft, or spacecraft. <strong>AM radio</strong> waves are blocked or reflected by the ' +
        '<span class="term">ionosphere</span>, a layer of charged particles high in the atmosphere, while FM ' +
        'and TV radio waves pass through untouched.</p>' +
        '<div data-figure="5.6"></div>' +
        '<div data-figure="5.7"></div>' +
        '<h4>Radiation and temperature</h4>' +
        '<p>Everything in nature is in constant microscopic motion &mdash; vibrating in place in a solid, or ' +
        'flying and colliding freely in a gas &mdash; and <strong>temperature</strong> is simply a measure of ' +
        'how much motion energy those particles carry on average. As they move and collide, atoms and ' +
        'molecules give off electromagnetic radiation, and the character of that radiation depends directly on ' +
        'temperature: hotter material vibrates and collides more energetically, giving off more energetic ' +
        '(higher-frequency) waves on average.</p>' +
        '<p>To study this precisely, physicists imagine an idealized <span class="term">blackbody</span> ' +
        '&mdash; an object that absorbs all the radiation falling on it, reflecting none, then re-radiates it ' +
        'as it heats up. Real stars behave very nearly like blackbodies. Figure 5.8 plots the power a blackbody ' +
        'gives off at every wavelength, for several different temperatures, and reveals three patterns: every ' +
        'temperature radiates <em>some</em> energy at <em>every</em> wavelength; a hotter object radiates more ' +
        'power at every wavelength than a cooler one; and the higher the temperature, the <em>shorter</em> the ' +
        'wavelength at which the power peaks.</p>' +
        '<div data-figure="5.8"></div>' +
        '<p>That last pattern gives astronomers a rough stellar thermometer: a star&rsquo;s dominant color ' +
        'tracks its temperature, with <strong>blue</strong> stars hotter than <strong>red</strong> ones (the ' +
        'opposite of the &ldquo;hot red, cool blue&rdquo; convention used for water faucets and art). The ' +
        'Sun&rsquo;s surface averages <strong>5800 K</strong>, radiating its peak power at about ' +
        '<strong>520 nanometers</strong>, near the middle of the visible band. The precise relationship is ' +
        '<span class="term">Wien&rsquo;s law</span>: the peak wavelength (in nanometers) equals a constant, ' +
        'about <strong>2.9 &times; 10<sup>6</sup> nm&middot;K</strong>, divided by the temperature (in ' +
        'kelvins) &mdash; an inverse relationship, so a higher temperature means a shorter peak wavelength.</p>' +
        '<p class="callout-inline"><strong>Worked example.</strong> A red dwarf star radiating its peak power ' +
        'at 1200 nm has a temperature of about (2.9 &times; 10<sup>6</sup> nm&middot;K) &divide; 1200 nm ' +
        '&asymp; <strong>2400 K</strong>. A hotter star peaking at just 290 nm (ultraviolet) works out to about ' +
        '(2.9 &times; 10<sup>6</sup>) &divide; 290 &asymp; <strong>10,000 K</strong> &mdash; nearly twice the ' +
        'Sun&rsquo;s surface temperature.</p>' +
        '<div data-diagram="blackbody-curve"></div>' +
        '<h4>The Stefan-Boltzmann law</h4>' +
        '<p>Summing up the power a blackbody radiates across all wavelengths gives its ' +
        '<span class="term">energy flux</span> &mdash; the power crossing each square meter, in watts per ' +
        'square meter. This total is described by the <span class="term">Stefan-Boltzmann law</span>: flux ' +
        'F = &sigma;T<sup>4</sup>, where T is the temperature in kelvins and &sigma; (sigma) is a constant, ' +
        'about <strong>5.67 &times; 10<sup>&minus;8</sup> W/(m&sup2;&middot;K<sup>4</sup>)</strong>. Because ' +
        'temperature is raised to the <em>fourth</em> power, small temperature increases produce huge jumps in ' +
        'radiated power: a star twice as hot as the Sun would radiate 2<sup>4</sup> = <strong>16 times</strong> ' +
        'more power per square meter; three times as hot radiates 3<sup>4</sup> = <strong>81 times</strong> ' +
        'more.</p>' +
        '<p class="callout-inline"><strong>Worked example.</strong> Two same-sized stars sit at the same ' +
        'distance from us. One runs at 8700 K, the other at 2900 K &mdash; exactly 3 times cooler. Because flux ' +
        'scales as T<sup>4</sup>, the hotter star is 3<sup>4</sup> = <strong>81 times</strong> more luminous, ' +
        'even though it is only 3 times hotter.</p>',
      keyIdeas: [
        "The electromagnetic spectrum runs from gamma rays (shortest wavelength, under 0.01 nm) through X-rays, ultraviolet, visible light (400–700 nm), infrared, microwave, to radio waves (longest wavelength); each band is characteristically emitted by objects in a different temperature range.",
        "Earth's atmosphere only lets visible light and some radio wavelengths through to the surface (the 'optical' and 'radio windows'); gamma rays, X-rays, and most ultraviolet must be observed from space, and infrared astronomy works best from high, dry locations.",
        "Temperature measures the average motion energy of an object's atoms/molecules; a blackbody is an idealized total absorber/emitter that real stars closely resemble; hotter objects radiate more power at every wavelength, with their peak shifted to shorter wavelengths.",
        "Wien's law relates a blackbody's peak wavelength to its temperature (inversely) — the Sun peaks at about 520 nm at 5800 K; a bluer star is hotter, a redder star is cooler.",
        "The Stefan-Boltzmann law (F = σT⁴) says radiated energy flux grows with the fourth power of temperature — doubling temperature radiates 16 times more power, tripling it radiates 81 times more."
      ],
      selfCheck: [
        { q: "Why must gamma rays, X-rays, and most ultraviolet radiation be observed from space rather than the ground?",
          a: "Earth's atmosphere absorbs these high-frequency bands before they reach the surface — fortunate for our health, but it means telescopes for these bands must fly above the atmosphere." },
        { q: "What is a blackbody, and why do astronomers use the idea even though no object is a perfect blackbody?",
          a: "An idealized object that absorbs all radiation falling on it (reflecting none) and radiates energy purely as a function of its temperature. Real stars behave very nearly like blackbodies, so the blackbody radiation laws work well for studying them." },
        { q: "According to Wien's law, which color star is hotter: a blue star or a red one?",
          a: "A blue star. Wien's law says higher temperature corresponds to a shorter peak wavelength, and blue light has a shorter wavelength than red light." },
        { q: "If a star's temperature triples, how many times more power per square meter does it radiate, and which law tells you that?",
          a: "3⁴ = 81 times more, according to the Stefan-Boltzmann law (F = σT⁴), since flux scales with the fourth power of temperature." }
      ]
    }
    ,
    {
      id: "5.3",
      title: "Spectroscopy in Astronomy",
      minutes: 12,
      pages: "pp. 155–158",
      html:
        '<p>Reflection and refraction &mdash; the two behaviors of light behind every optical instrument, from ' +
        'eyeglasses to giant telescopes &mdash; explain how we can even build a device to study starlight in ' +
        'detail. <span class="term">Reflection</span> bounces light off a smooth, shiny surface like a mirror; ' +
        '<span class="term">refraction</span> bends light as it passes from one transparent material into ' +
        'another, such as from air into glass.</p>' +
        '<h4>Newton&rsquo;s prism</h4>' +
        '<p>In <strong>1672</strong>, in his first paper to the Royal Society, <strong>Isaac Newton</strong> ' +
        'described passing sunlight through a small hole and then a glass prism, and found that ordinary white ' +
        'sunlight is actually a mixture of every color of the rainbow (Figure 5.9). Because different ' +
        'wavelengths of light refract by slightly different amounts &mdash; violet bending more than red ' +
        '&mdash; passing through the prism spreads them out side by side, a phenomenon called ' +
        '<span class="term">dispersion</span> (Figure 5.10). An instrument built to disperse light this way ' +
        'and record the resulting <strong>spectrum</strong> is a <span class="term">spectrometer</span>.</p>' +
        '<div data-figure="5.9"></div>' +
        '<div data-figure="5.10"></div>' +
        '<h4>Discovering the dark lines</h4>' +
        '<p>Newton only ever saw a plain, unbroken rainbow. In <strong>1802</strong>, <strong>William ' +
        'Wollaston</strong> built an improved spectrometer and noticed the Sun&rsquo;s spectrum wasn&rsquo;t ' +
        'perfectly smooth &mdash; some colors were simply missing, leaving dark gaps. He guessed these were ' +
        'natural boundaries between colors. In <strong>1815</strong>, German physicist <strong>Joseph ' +
        'Fraunhofer</strong> examined the solar spectrum far more carefully and counted about <strong>600</strong> ' +
        'such dark lines (Figure 5.11), ruling out Wollaston&rsquo;s boundary idea.</p>' +
        '<div data-figure="5.11"></div>' +
        '<p>Researchers soon found the same kind of dark lines appear when light passes through any thin, ' +
        'mostly transparent gas &mdash; the gas turns out to be opaque at just a few sharply defined ' +
        'wavelengths, unique to whatever elements it contains; a mix of two elements shows the missing lines of ' +
        'both. Heat that same thin gas until it glows on its own, with no light passing through it, and it ' +
        'emits light <em>only</em> at those same specific wavelengths &mdash; as a pattern of bright lines ' +
        'instead of dark ones (Figure 5.12). Either way, the pattern is a ' +
        '<span class="term">spectral signature</span>, as unique to each element as a fingerprint.</p>' +
        '<div data-figure="5.12"></div>' +
        '<h4>Types of spectra</h4>' +
        '<p>These experiments revealed three distinct kinds of spectra: a ' +
        '<span class="term">continuous spectrum</span> &mdash; an unbroken rainbow of all wavelengths, given ' +
        'off by a solid or a dense gas; a <span class="term">dark-line (absorption) spectrum</span> &mdash; a ' +
        'continuous spectrum with a pattern of dark lines missing, produced when the continuous source is ' +
        'viewed through a cooler, thinner gas; and a <span class="term">bright-line (emission) spectrum</span> ' +
        '&mdash; only certain discrete wavelengths present, with no continuous background, produced by a hot, ' +
        'thin, glowing gas on its own. Because the dark lines in the Sun&rsquo;s own spectrum come from a thin, ' +
        'cooler layer of gas in its outer atmosphere, spectroscopy lets astronomers read off the chemical ' +
        'makeup of the Sun and other stars without ever visiting them.</p>' +
        '<p>In <strong>1860</strong>, German physicist <strong>Gustav Kirchhoff</strong> became the first ' +
        'person to identify a specific element in the Sun this way, spotting the signature of ' +
        '<strong>sodium</strong> gas. The element <strong>helium</strong> was actually discovered in the ' +
        'Sun&rsquo;s spectrum <em>before</em> it was ever found on Earth &mdash; its name comes from ' +
        '<em>helios</em>, the Greek word for the Sun.</p>' +
        '<div class="callout-inline"><strong>Making connections: the rainbow.</strong> A rainbow (Figure 5.13) ' +
        'is dispersion in action: each raindrop briefly acts as a tiny prism, refracting sunlight as it enters, ' +
        'reflecting some of it off the drop&rsquo;s far inside surface, then refracting it again on the way ' +
        'out, spreading white sunlight into its full spread of colors. Violet light emerges bent more sharply ' +
        'than red &mdash; but counterintuitively, <strong>red appears on the outside</strong> of a rainbow and ' +
        '<strong>violet on the inside</strong>. That is because, for a raindrop high in the sky, its more ' +
        'sharply bent violet light passes over your head and only its red light reaches your eye; for a ' +
        'raindrop low in the sky, the reverse happens. Every rainbow you will ever see keeps this same ' +
        'order.</div>' +
        '<div data-figure="5.13"></div>' +
        '<div data-diagram="spectrum-types"></div>',
      keyIdeas: [
        "Reflection (off mirrors) and refraction (bending between transparent materials) are the two basic light behaviors behind all optical instruments.",
        "Isaac Newton (1672) showed with a prism that white sunlight is a mixture of all colors; different wavelengths refract by different amounts (dispersion), which is how a spectrometer spreads light into a spectrum.",
        "William Wollaston (1802) first saw dark gaps in the solar spectrum; Joseph Fraunhofer (1815) counted about 600 dark lines and ruled out Wollaston's 'boundary' explanation.",
        "There are three types of spectra: continuous (all wavelengths, from a solid/dense gas), absorption/dark-line (continuous spectrum viewed through a cooler thin gas), and emission/bright-line (only certain wavelengths, from a hot thin glowing gas alone) — each element's line pattern is a unique spectral signature.",
        "Gustav Kirchhoff (1860) was first to identify an element (sodium) in the Sun by its spectrum; helium was discovered in the Sun's spectrum before it was ever found on Earth, hence its name (from helios, Greek for Sun)."
      ],
      selfCheck: [
        { q: "What did Newton's 1672 prism experiment reveal about sunlight?",
          a: "That ordinary white sunlight is actually a mixture of all the colors of the rainbow — the prism disperses these different wavelengths because each bends by a slightly different amount." },
        { q: "What is the key difference between how an absorption (dark-line) spectrum and an emission (bright-line) spectrum are produced?",
          a: "An absorption spectrum forms when a continuous spectrum is viewed through a cooler, thinner gas that removes specific wavelengths, leaving dark lines. An emission spectrum forms when a hot, thin, glowing gas is viewed on its own, emitting light only at those same specific wavelengths as bright lines." },
        { q: "Why was Fraunhofer's 1815 study of the solar spectrum important?",
          a: "By carefully counting about 600 dark lines in the Sun's spectrum, he showed they couldn't simply be natural boundaries between colors (as Wollaston had guessed), setting up the later discovery that each line corresponds to a specific chemical element." },
        { q: "What's notable about the discovery of helium?",
          a: "It was discovered in the Sun's spectrum before it was ever identified on Earth — which is why it's named after helios, the Greek word for the Sun." }
      ]
    },
    {
      id: "5.4",
      title: "The Structure of the Atom",
      minutes: 13,
      pages: "pp. 159–162",
      html:
        '<h4>Probing the atom</h4>' +
        '<p>British physicist <strong>J. J. Thomson</strong> discovered the first subatomic particle in ' +
        '<strong>1897</strong>: the negatively charged <span class="term">electron</span>, whose flow is what ' +
        'makes an electric current. Since a normal atom carries no net charge, each electron&rsquo;s charge ' +
        'must be balanced by an equal amount of positive charge somewhere in the atom.</p>' +
        '<p>In <strong>1911</strong>, British physicist <strong>Ernest Rutherford</strong> found out where. He ' +
        'fired a beam of positively charged <span class="term">alpha particles</span> at a piece of gold foil ' +
        'only about <strong>400 atoms thick</strong> (Figure 5.14). Almost all of the particles sailed straight ' +
        'through, as if the foil were nearly empty space &mdash; but about <strong>1 in 8000</strong> bounced ' +
        'straight back. Rutherford called it &ldquo;quite the most incredible event that has ever happened to ' +
        'me in my life&hellip; as if you fired a 15-inch shell at a piece of tissue paper and it came back and ' +
        'hit you.&rdquo; The only explanation: nearly all of an atom&rsquo;s mass and all of its positive ' +
        'charge are packed into a tiny central <span class="term">nucleus</span>, with the negatively charged ' +
        'electrons orbiting through the mostly empty volume around it &mdash; a miniature solar system.</p>' +
        '<div data-figure="5.14"></div>' +
        '<h4>Building the elements</h4>' +
        '<p>The simplest atom, <strong>hydrogen</strong>, has a nucleus of just one proton with one electron ' +
        'orbiting it (Figure 5.15). An electron&rsquo;s mass is nearly <strong>2000 times</strong> smaller than ' +
        'a proton&rsquo;s, but its charge exactly balances the proton&rsquo;s, opposite in sign &mdash; that ' +
        'mutual attraction is what holds the atom together. <strong>Helium</strong>, the Sun&rsquo;s ' +
        'second most abundant element, has two protons and (in its most common form) two neutrons &mdash; ' +
        'particles with about a proton&rsquo;s mass but no charge at all &mdash; with two electrons orbiting to ' +
        'keep the atom neutral overall (Figure 5.16).</p>' +
        '<div data-figure="5.15"></div>' +
        '<div data-figure="5.16"></div>' +
        '<p>The number of protons alone defines which <strong>element</strong> an atom is: six protons make ' +
        'carbon, eight make oxygen, 26 make iron, 92 make uranium. The number of neutrons, though, can vary ' +
        'even within one element &mdash; different versions of the same element, with the same proton count ' +
        'but different neutron counts, are called <span class="term">isotopes</span>. Ordinary hydrogen has no ' +
        'neutrons at all, but some hydrogen atoms carry one neutron (deuterium) or two (tritium) &mdash; three ' +
        'isotope &ldquo;siblings&rdquo; in the same family (Figure 5.17).</p>' +
        '<div data-figure="5.17"></div>' +
        '<h4>The Bohr atom</h4>' +
        '<p>Rutherford&rsquo;s solar-system model had a fatal flaw: Maxwell&rsquo;s own theory says an orbiting ' +
        '(constantly changing direction) electron should radiate energy continuously and spiral into the ' +
        'nucleus in about 10<sup>&minus;16</sup> seconds. Danish physicist <strong>Niels Bohr</strong> ' +
        '(1885&ndash;1962) solved the puzzle by proposing something radical: an electron can only occupy ' +
        'certain fixed orbits, and while it stays in one of them, it radiates nothing at all. Its energy only ' +
        'changes when it jumps between orbits.</p>' +
        '<div data-figure="5.18"></div>' +
        '<p>Each allowed orbit corresponds to a specific <span class="term">energy level</span> &mdash; like ' +
        'the floors of a building where rent (energy) rises with height, and no one can live on floor 5.37. ' +
        'Moving an electron down to a lower level releases energy; moving it up to a higher one costs energy ' +
        'that has to come from somewhere else &mdash; typically by absorbing a passing ' +
        '<span class="term">photon</span> of exactly the right size. An atom&rsquo;s electron starts in its ' +
        'lowest-energy <span class="term">ground state</span>; when it absorbs a photon and jumps to a higher ' +
        'level, the atom is <span class="term">excited</span>; when it later drops back down, it emits a ' +
        'photon carrying away the exact energy difference between the two levels.</p>' +
        '<p>A photon&rsquo;s energy (E) connects to its frequency (f) as a wave through <strong>Planck&rsquo;s ' +
        'constant</strong> (h), named for German physicist <strong>Max Planck</strong>: <strong>E = hf</strong>, ' +
        'where h = 6.626 &times; 10<sup>&minus;34</sup> joule-seconds (J&middot;s). For example, a calcium atom ' +
        'in the Sun&rsquo;s atmosphere needs a photon equivalent to a wave of about <strong>393 ' +
        'nanometers</strong> &mdash; deep violet light &mdash; to boost one of its electrons to a higher ' +
        'level.</p>' +
        '<p class="callout-inline"><strong>Worked example.</strong> What is the energy of a red photon with a ' +
        'wavelength of 630 nm? First, its frequency is f = c &divide; &lambda; = (3 &times; 10<sup>8</sup> m/s) ' +
        '&divide; (6.3 &times; 10<sup>&minus;7</sup> m) &asymp; 4.76 &times; 10<sup>14</sup> Hz. Then ' +
        'E = hf = (6.626 &times; 10<sup>&minus;34</sup> J&middot;s)(4.76 &times; 10<sup>14</sup> Hz) &asymp; ' +
        '<strong>3.15 &times; 10<sup>&minus;19</sup> joules</strong> &mdash; a tiny amount of energy, but ' +
        'photons are tiny packets.</p>' +
        '<div data-diagram="bohr-atom"></div>',
      keyIdeas: [
        "J. J. Thomson discovered the electron in 1897; Ernest Rutherford's 1911 gold-foil experiment (alpha particles bouncing back about 1 in 8000 times) showed that an atom's mass and positive charge are concentrated in a tiny central nucleus, with electrons orbiting through mostly empty space.",
        "The number of protons defines an element (hydrogen=1, helium=2, carbon=6, oxygen=8, iron=26, uranium=92); isotopes are versions of the same element with different numbers of neutrons (hydrogen's isotopes have 0, 1, or 2 neutrons).",
        "Rutherford's model couldn't explain why electrons don't spiral into the nucleus; Niels Bohr fixed this by proposing electrons occupy only certain fixed orbits (energy levels) and radiate nothing while in one, changing energy only by jumping between levels.",
        "Absorbing a photon of just the right energy excites an electron to a higher level (from the ground state); dropping to a lower level emits a photon carrying the exact energy difference.",
        "A photon's energy is E = hf, where h is Planck's constant (6.626 × 10⁻³⁴ J·s, named for Max Planck) — higher frequency means higher photon energy."
      ],
      selfCheck: [
        { q: "What did Rutherford's gold foil experiment reveal, and how?",
          a: "That an atom's mass and positive charge are concentrated in a tiny, dense central nucleus. Most alpha particles passed straight through the thin gold foil as if it were nearly empty, but about 1 in 8000 bounced almost straight back — only possible if they hit something small, dense, and positively charged." },
        { q: "What distinguishes two isotopes of the same element from each other?",
          a: "They have the same number of protons (which is what defines the element) but different numbers of neutrons." },
        { q: "What problem with Rutherford's atomic model did Bohr's model solve?",
          a: "Maxwell's theory predicted that an orbiting electron should constantly radiate energy and spiral into the nucleus in about 10⁻¹⁶ seconds. Bohr proposed that electrons can only occupy certain fixed orbits (energy levels) and radiate nothing while remaining in one, resolving the instability." },
        { q: "What determines the energy of a photon, according to Planck's formula?",
          a: "Its frequency — E = hf, where h is Planck's constant. Higher-frequency waves correspond to higher-energy photons." }
      ]
    }
    ,
    {
      id: "5.5",
      title: "Formation of Spectral Lines",
      minutes: 13,
      pages: "pp. 163–166",
      html:
        '<h4>The hydrogen spectrum</h4>' +
        '<p>Bohr&rsquo;s model explains exactly why atoms absorb and emit only specific wavelengths. Take ' +
        'hydrogen: a photon of wavelength <strong>656 nanometers</strong> carries exactly the right energy to ' +
        'lift a hydrogen electron from its second orbit up to its third. Shine white light (every visible ' +
        'wavelength at once) through hydrogen gas, and only photons of that precise energy get absorbed, ' +
        'leaving a dark line at 656 nm in the spectrum; other exact wavelengths get absorbed by electrons ' +
        'jumping from the second to the fourth orbit, or the first to the fifth, and so on, while every other ' +
        'wavelength streams past untouched (Figure 5.19). Turn off the light source afterward, and those same ' +
        'excited electrons fall back down, emitting photons of those same specific wavelengths as bright ' +
        'emission lines. Because every element has its own distinct arrangement of possible electron orbits, ' +
        'no two elements produce the same pattern of spectral lines &mdash; which is how astronomers identify ' +
        'the elements inside stars and galaxies too far away ever to visit.</p>' +
        '<div data-figure="5.19"></div>' +
        '<p>Transitions to or from hydrogen&rsquo;s ground state (labeled n&nbsp;=&nbsp;1) are called the ' +
        '<span class="term">Lyman series</span>, and involve ultraviolet photons; transitions to or from the ' +
        'first excited state (n&nbsp;=&nbsp;2) are the <span class="term">Balmer series</span>, involving ' +
        'visible-light photons &mdash; it was explaining this Balmer series that first led Bohr to his model ' +
        '(Figure 5.20).</p>' +
        '<div data-figure="5.20"></div>' +
        '<h4>Excitation and de-excitation</h4>' +
        '<p>An atom&rsquo;s lowest-energy state is its <span class="term">ground state</span>. Absorbing ' +
        'energy lifts it to a higher level, an <span class="term">excited</span> state &mdash; but atoms ' +
        'rarely stay excited long, typically dropping back to the ground state within about a hundred-millionth ' +
        'of a second, in one jump or several smaller ones, emitting a photon at each step down. You might ' +
        'expect all these re-emitted photons to simply refill the dark absorption lines they came from, but ' +
        'they don&rsquo;t: an atom re-emits its photon in a completely random direction, so only a small ' +
        'fraction of that light heads back the way the original beam was going &mdash; most of it heads off in ' +
        'some other direction (or, inside a star, back into the star itself), which is why the dark lines ' +
        'persist.</p>' +
        '<h4>Ionization</h4>' +
        '<p>Absorb enough energy, and an electron can be knocked completely free of its atom &mdash; a process ' +
        'called <span class="term">ionization</span>, leaving behind a charged <span class="term">ion</span>. ' +
        'The minimum energy needed to remove one electron from a ground-state atom is its ' +
        '<span class="term">ionization energy</span>. Removing further electrons takes progressively more ' +
        'energy each time: hydrogen, with only one electron, can be ionized just once; helium can be ionized ' +
        'twice; an atom of oxygen can be stripped of electrons up to eight times. An ionized atom, now missing ' +
        'a negative charge, strongly attracts free electrons and will eventually recapture one (or more), ' +
        'emitting photons as it does. How much of a gas is ionized depends on its <strong>temperature</strong> ' +
        '(hotter gas has more energetic, more frequent collisions, driving more ionization) and its ' +
        '<strong>density</strong> (denser gas recaptures electrons more readily). In the Sun&rsquo;s ' +
        'atmosphere, for instance, most hydrogen and helium atoms are neutral, while most calcium atoms are ' +
        'ionized once &mdash; each ionization state of an element has its own distinct set of energy levels, ' +
        'and so its own distinct spectral lines, letting astronomers use ionization patterns as another ' +
        'thermometer for a gas&rsquo;s temperature.</p>' +
        '<div data-figure="5.21"></div>' +
        '<div data-diagram="energy-levels"></div>',
      keyIdeas: [
        "A hydrogen electron jumping between specific orbits absorbs or emits a photon of one exact wavelength each time (e.g., 656 nm for the second-to-third-orbit jump); each element's unique set of possible orbits gives it a unique, unmistakable spectral fingerprint.",
        "Transitions to/from hydrogen's ground state (n=1) form the Lyman series (ultraviolet); transitions to/from the first excited state (n=2) form the Balmer series (visible light) — explaining the Balmer series is what led Bohr to his model.",
        "An atom's lowest-energy state is its ground state; absorbing energy excites it to a higher level, and it typically drops back within about a hundred-millionth of a second, emitting a photon; re-emitted photons scatter in random directions, so dark absorption lines aren't simply refilled by this re-emission.",
        "Ionization removes an electron entirely, leaving an ion; the minimum energy to do this is the ionization energy; an atom can be ionized multiple times (hydrogen once, helium twice, oxygen up to eight times), and how much ionization occurs in a gas depends on its temperature and density."
      ],
      selfCheck: [
        { q: "Why does a 656 nm photon produce a dark absorption line in hydrogen gas specifically?",
          a: "Because 656 nm is the exact wavelength (and therefore energy) needed to lift a hydrogen electron from its second orbit to its third — only photons of that precise energy get absorbed, removing them from the beam of white light passing through." },
        { q: "What's the difference between the Lyman series and the Balmer series in hydrogen?",
          a: "The Lyman series consists of transitions to or from the ground state (n = 1), producing ultraviolet photons. The Balmer series consists of transitions to or from the first excited state (n = 2), producing visible-light photons." },
        { q: "If atoms re-emit absorbed photons so quickly, why do dark absorption lines still show up in a spectrum?",
          a: "Because the re-emitted photons fly off in random directions rather than straight back along the original beam, so only a small fraction returns to 'fill in' the missing light — most heads off elsewhere (or back into the star, for light from inside a star)." },
        { q: "How many times can a helium atom be ionized, and why?",
          a: "Twice — a neutral helium atom has two electrons to lose, and each one can be removed (at increasing energy cost) before the atom has none left." }
      ]
    },
    {
      id: "5.6",
      title: "The Doppler Effect",
      minutes: 12,
      pages: "pp. 167–171",
      html:
        '<p>Stars and galaxies are never perfectly still relative to us, and any motion toward or away from an ' +
        'observer shifts the wavelengths of its spectral lines slightly from where they would sit for a source ' +
        'at rest &mdash; a complication astronomers must account for, but one that also hands them a bonus: a ' +
        'direct measurement of speed.</p>' +
        '<h4>Motion affects waves</h4>' +
        '<p>In <strong>1842</strong>, Austrian physicist <strong>Christian Doppler</strong> tested this by ' +
        'hiring musicians to play fixed notes on an open railroad car as it rolled past listeners, then applied ' +
        'the same principle to all waves, including light: a wave source moving toward an observer crowds its ' +
        'waves closer together; moving away, it stretches them out (Figure 5.22). A source at rest sends evenly ' +
        'spaced crests in every direction alike. A moving source, though, is a little closer to the observer ' +
        'it is approaching by the time it emits each new crest, and a little farther from the observer it is ' +
        'receding from &mdash; so an observer in the direction of approach measures a <strong>shorter ' +
        'wavelength and higher frequency</strong>, while one in the direction of recession measures a ' +
        '<strong>longer wavelength and lower frequency</strong>. An observer positioned exactly to the side, at ' +
        'right angles to the motion, sees no shift at all &mdash; this effect, called the ' +
        '<span class="term">Doppler effect</span>, depends only on <span class="term">radial velocity</span>, ' +
        'the part of the motion directed straight toward or away from the observer, not on any sideways ' +
        'component.</p>' +
        '<div data-figure="5.22"></div>' +
        '<p>You have likely heard the sound version: a train whistle or a police siren drops in pitch as it ' +
        'passes you and moves away, because the sound waves stretch out (lower frequency = lower pitch) once ' +
        'the source is receding.</p>' +
        '<h4>Blueshift and redshift</h4>' +
        '<p>For visible light, a wavelength decrease from an approaching source shifts colors toward the blue ' +
        'end of the spectrum, called a <span class="term">blueshift</span>; a wavelength increase from a ' +
        'receding source is a <span class="term">redshift</span>. Astronomers keep using these two terms even ' +
        'for radio waves or X-rays, where nothing is literally becoming &ldquo;bluer&rdquo; or ' +
        '&ldquo;redder.&rdquo; The size of the shift scales with the speed: &Delta;&lambda; &divide; &lambda; = ' +
        'v &divide; c, so <strong>v = c &times; (&Delta;&lambda; &divide; &lambda;)</strong>, where &lambda; is ' +
        'a line&rsquo;s rest wavelength, &Delta;&lambda; is the observed shift, c is the speed of light, and v ' +
        'is the radial velocity (positive for a receding source, negative for an approaching one). Because the ' +
        'Doppler shift on a continuous spectrum is too subtle to see or measure directly, astronomers rely on ' +
        'the sharp, precisely known wavelengths of spectral lines to detect and measure it.</p>' +
        '<p class="callout-inline"><strong>Worked example.</strong> A hydrogen emission line normally at ' +
        '656.3 nm is observed at 656.6 nm from a gas cloud &mdash; a redshift, so the cloud is receding. Its ' +
        'speed is v = c &times; (0.3 &divide; 656.3) &asymp; (3 &times; 10<sup>5</sup> km/s) &times; 0.00046 ' +
        '&asymp; <strong>137 km/s</strong> away from us. <strong>Check your learning:</strong> a hydrogen line ' +
        'normally at 500 nm observed at 500.1 nm gives v = c &times; (0.1 &divide; 500) = ' +
        '<strong>60,000 m/s</strong> (60 km/s), again receding, since the wavelength increased.</p>' +
        '<div data-diagram="doppler-waves"></div>' +
        '<p>One more reassurance: because the Doppler effect shifts an <em>entire</em> pattern of spectral ' +
        'lines by the same proportional amount rather than scrambling it, astronomers can still recognize which ' +
        'element produced a shifted pattern of lines &mdash; and the size of that shift then tells them the ' +
        'object&rsquo;s speed toward or away from us, on top of confirming what it is made of.</p>',
      keyIdeas: [
        "The Doppler effect (tested by Christian Doppler in 1842 using musicians on a moving railroad car) shows that a wave source moving toward an observer compresses its waves (shorter wavelength, higher frequency); moving away stretches them (longer wavelength, lower frequency); sideways motion produces no shift at all.",
        "The Doppler effect depends only on radial velocity — motion directly toward or away from the observer — not on any sideways component of motion.",
        "Blueshift = wavelength shortened (source approaching); redshift = wavelength lengthened (source receding); astronomers use these terms for any part of the electromagnetic spectrum, not just visible light.",
        "The Doppler shift formula, v = c × (Δλ/λ), lets astronomers calculate an object's radial velocity from how much a spectral line's wavelength has shifted from its known rest wavelength.",
        "The Doppler effect shifts an element's entire pattern of spectral lines by the same proportion rather than scrambling it, so astronomers can still identify the element responsible — and the amount of shift then reveals the object's speed."
      ],
      selfCheck: [
        { q: "According to the Doppler effect, what happens to the waves from a source moving toward you, versus moving away from you?",
          a: "Moving toward you, the waves are compressed — a shorter wavelength and higher frequency (a blueshift, for light). Moving away, the waves are stretched out — a longer wavelength and lower frequency (a redshift)." },
        { q: "What kind of motion produces NO Doppler shift?",
          a: "Motion exactly perpendicular (sideways) to the line of sight — the Doppler effect depends only on radial velocity, the component of motion directly toward or away from the observer." },
        { q: "If a spectral line's wavelength is observed to be longer than its known rest wavelength, is the source approaching or receding?",
          a: "Receding — a wavelength increase is a redshift, which corresponds to the source moving away." },
        { q: "Why doesn't the Doppler effect prevent astronomers from identifying which elements are present in a moving star's spectrum?",
          a: "Because the Doppler effect shifts an element's entire characteristic pattern of spectral lines by the same proportional amount, rather than scrambling it — the shifted pattern is still recognizable, and the size of the shift additionally reveals the object's speed." }
      ]
    }
  ];

  /* ------------------------------------------------------------------ GLOSSARY */
  CH.glossary = [
    { term: "Electromagnetic radiation", section: "5.1", def: "Radiation consisting of waves propagated through regularly varying electric and magnetic fields, traveling at the speed of light." },
    { term: "Wavelength", section: "5.1", def: "The distance from crest to crest (or trough to trough) in a wave." },
    { term: "Frequency", section: "5.1", def: "The number of wave crests that cross a given point per unit time." },
    { term: "Photon", section: "5.1", def: "A discrete unit (or 'packet') of electromagnetic energy." },
    { term: "Inverse square law (for light)", section: "5.1", def: "The amount of light flowing through a given area in a given time decreases in proportion to the square of the distance from the source." },
    { term: "Electromagnetic spectrum", section: "5.2", def: "The whole array or family of electromagnetic waves, from radio to gamma rays." },
    { term: "Gamma rays", section: "5.2", def: "Photons of electromagnetic radiation with wavelengths no longer than 0.01 nanometer — the most energetic form of electromagnetic radiation." },
    { term: "X-rays", section: "5.2", def: "Electromagnetic radiation with wavelengths between 0.01 and 20 nanometers, intermediate between ultraviolet and gamma rays." },
    { term: "Ultraviolet", section: "5.2", def: "Electromagnetic radiation of wavelengths 20 to 400 nanometers, shorter than the shortest visible wavelengths." },
    { term: "Visible light", section: "5.2", def: "Electromagnetic radiation with wavelengths of roughly 400–700 nanometers, visible to the human eye." },
    { term: "Infrared", section: "5.2", def: "Electromagnetic radiation of wavelength 10³–10⁶ nanometers, longer than red light but shorter than radio wavelengths." },
    { term: "Microwave", section: "5.2", def: "Electromagnetic radiation of wavelengths from 1 millimeter to 1 meter, longer than infrared but shorter than radio waves." },
    { term: "Radio waves", section: "5.2", def: "All electromagnetic waves longer than microwaves, including radar waves and AM radio waves." },
    { term: "Blackbody", section: "5.2", def: "An idealized object that absorbs all the electromagnetic energy falling onto it, reflecting none." },
    { term: "Wien's law", section: "5.2", def: "A formula relating the temperature of a blackbody to the wavelength at which it emits the greatest intensity of radiation." },
    { term: "Energy flux", section: "5.2", def: "The amount of energy passing through a unit area (for example, 1 square meter) per second; measured in watts per square meter." },
    { term: "Stefan-Boltzmann law", section: "5.2", def: "A formula for the rate at which a blackbody radiates energy: the flux from a unit area is proportional to the fourth power of its absolute temperature, F = σT⁴." },
    { term: "Spectrometer", section: "5.3", def: "An instrument for obtaining a spectrum, usually attached to a telescope to record the spectrum of a star, galaxy, or other astronomical object." },
    { term: "Dispersion", section: "5.3", def: "Separation of different wavelengths of white light through refraction of different amounts." },
    { term: "Continuous spectrum", section: "5.3", def: "A spectrum of light made up of a continuous range of wavelengths or colors, rather than only certain discrete wavelengths." },
    { term: "Absorption spectrum", section: "5.3", def: "A series or pattern of dark lines superimposed on a continuous spectrum." },
    { term: "Emission spectrum", section: "5.3", def: "A series or pattern of bright lines superimposed on a continuous spectrum." },
    { term: "Nucleus (of an atom)", section: "5.4", def: "The massive part of an atom, composed mostly of protons and neutrons, about which the electrons revolve." },
    { term: "Isotope", section: "5.4", def: "Any of two or more forms of the same element whose atoms have the same number of protons but different numbers of neutrons." },
    { term: "Energy level", section: "5.4", def: "A particular amount of energy possessed by an atom or ion above the energy it possesses in its least energetic (ground) state; also used for the states of energy an electron can have in an atom." },
    { term: "Ground state", section: "5.5", def: "The lowest energy state of an atom." },
    { term: "Excitation", section: "5.5", def: "The process of giving an atom or ion an amount of energy greater than it has in its ground state." },
    { term: "Ion", section: "5.5", def: "An atom that has become electrically charged by the addition or loss of one or more electrons." },
    { term: "Ionization", section: "5.5", def: "The process by which an atom gains or loses electrons." },
    { term: "Doppler effect", section: "5.6", def: "The apparent change in wavelength or frequency of radiation from a source due to its relative motion away from or toward the observer." },
    { term: "Radial velocity", section: "5.6", def: "Motion toward or away from the observer — the component of relative velocity that lies along the line of sight." }
  ];

  /* ------------------------------------------------------------------ QUIZ */
  CH.quiz = [
    { section: "5.1", q: "What did Maxwell conclude after calculating the speed of an oscillating-charge disturbance?",
      choices: ["That light is one form of electromagnetic radiation", "That gravity and magnetism are the same force", "That sound needs no medium to travel through", "That electrons orbit the nucleus in fixed shells"],
      answer: 0,
      whyWrong: [null, "Maxwell's theory unified electricity and magnetism, not gravity and magnetism.", "It was electromagnetic waves, not sound, that Maxwell showed could cross a vacuum.", "Fixed electron orbits are Bohr's later model (§5.4), not Maxwell's electromagnetic theory."],
      explain: "Maxwell found his calculated wave speed matched the measured speed of light exactly, leading him to propose light is one form of electromagnetic radiation." },
    { section: "5.1", q: "What is the relationship between a wave's wavelength and its frequency, given that all EM waves travel at speed c?",
      choices: ["Longer wavelength means lower frequency (c = λf)", "Longer wavelength always means higher frequency", "Wavelength and frequency are unrelated", "Frequency determines a wave's speed"],
      answer: 0,
      whyWrong: [null, "It's the opposite — longer wavelength means lower frequency, since their product must stay equal to the fixed speed c.", "They are directly linked by the equation c = λf.", "Every EM wave already travels at the same fixed speed c, regardless of frequency."],
      explain: "Since c = λf is fixed, wavelength and frequency trade off: a longer wavelength corresponds to a lower frequency, and vice versa." },
    { section: "5.1", q: "Among visible-light photons, which carries the most energy?",
      choices: ["Violet", "Red", "Yellow", "They all carry equal energy"],
      answer: 0,
      whyWrong: [null, "Red has the longest wavelength and lowest frequency among visible colors, so the least energy.", "Yellow sits in the middle of the visible range, with intermediate energy.", "Photon energy depends on frequency, and visible colors span a range of frequencies."],
      explain: "Photon energy rises with frequency. Violet light has the shortest wavelength and highest frequency of the visible colors, so violet photons carry the most energy." },
    { section: "5.1", q: "If you move to 3 times your original distance from a star, how much fainter does it appear?",
      choices: ["1/9 as bright", "1/3 as bright", "3 times as bright", "1/6 as bright"],
      answer: 0,
      whyWrong: [null, "Brightness falls off as the square of distance, not in direct proportion to it.", "Moving farther away always makes a source appear fainter, never brighter.", "The correct factor is 1/3² = 1/9, not 1/6."],
      explain: "By the inverse square law, brightness falls off as 1/distance². Tripling the distance makes a source 3² = 9 times fainter, so it appears at 1/9 its original brightness." },
    { section: "5.2", q: "Why must astronomers observe gamma rays and X-rays from space rather than from the ground?",
      choices: ["Earth's atmosphere absorbs them before they reach the surface", "They travel slower than visible light and never actually reach Earth", "Telescopes for these bands are too heavy to use on the ground", "They only exist beyond Earth's atmosphere"],
      answer: 0,
      whyWrong: [null, "All electromagnetic radiation travels at the same speed, c — it just doesn't make it to the surface.", "Telescope weight isn't the reason — it's atmospheric absorption.", "Gamma rays and X-rays are produced by objects in space, but the reason they can't be observed at ground level is that the atmosphere absorbs them first."],
      explain: "Earth's atmosphere absorbs gamma rays, X-rays, and most ultraviolet before they reach the ground, so telescopes for these bands must operate from space." },
    { section: "5.2", q: "According to Wien's law, a star that peaks at a shorter wavelength than the Sun is:",
      choices: ["Hotter than the Sun", "Cooler than the Sun", "The same temperature as the Sun", "Farther away than the Sun"],
      answer: 0,
      whyWrong: [null, "A cooler star would peak at a LONGER wavelength, not shorter.", "Stars at the Sun's temperature peak at the same ~520 nm the Sun does.", "Distance doesn't affect a star's peak wavelength — only its temperature does, via Wien's law."],
      explain: "Wien's law says peak wavelength decreases as temperature increases, so a shorter peak wavelength means a hotter star." },
    { section: "5.2", q: "What does the Stefan-Boltzmann law (F = σT⁴) tell us happens when a star's temperature doubles?",
      choices: ["Its radiated power per square meter increases 16-fold", "Its radiated power per square meter doubles", "Its radiated power per square meter is unchanged", "Its radiated power per square meter is cut in half"],
      answer: 0,
      whyWrong: [null, "Flux doesn't simply double with temperature — it scales with the fourth power of temperature.", "Flux definitely changes with temperature, and dramatically so.", "Higher temperature means more radiated power, not less."],
      explain: "Because flux is proportional to T⁴, doubling the temperature multiplies the radiated power per square meter by 2⁴ = 16." },
    { section: "5.2", q: "What is a blackbody, in the sense astronomers use the term?",
      choices: ["An idealized object that absorbs all radiation falling on it and re-radiates based only on temperature", "An object that is literally black in color", "A star that has burned out and stopped emitting light", "Any object found in the vacuum of space"],
      answer: 0,
      whyWrong: [null, "A blackbody isn't defined by its visible color — even a brightly glowing star counts as one.", "A blackbody isn't a dead star; it's an idealized emitter/absorber model that active, shining stars closely approximate.", "Being located in space has nothing to do with whether something behaves like a blackbody."],
      explain: "A blackbody is an idealized object that absorbs all electromagnetic energy falling on it and radiates energy purely according to its temperature — stars behave very nearly this way." },
    { section: "5.3", q: "What did Isaac Newton's 1672 prism experiment demonstrate?",
      choices: ["White sunlight is a mixture of all the colors of the rainbow", "Light travels faster through a prism than through air", "Light is made of separate particles called photons", "Stars emit different colors than the Sun"],
      answer: 0,
      whyWrong: [null, "Newton's experiment was about the composition of light, not its speed through different materials.", "The particle (photon) model of light came much later, in the twentieth century.", "Newton's prism experiment used ordinary sunlight — it wasn't a comparison between different stars."],
      explain: "Newton showed that passing white sunlight through a prism spreads it into a full rainbow of colors, revealing that white light is a mixture of every visible wavelength." },
    { section: "5.3", q: "What is a spectral signature?",
      choices: ["The unique pattern of spectral lines produced by a particular chemical element", "The overall brightness of a star", "The temperature of a distant galaxy", "The direction a star is moving"],
      answer: 0,
      whyWrong: [null, "Brightness alone doesn't identify which elements are present.", "Temperature is usually inferred from a spectrum's overall shape (Wien's law), not from calling it a 'signature.'", "An object's motion is revealed by the Doppler shift of its lines, not by the line pattern itself."],
      explain: "Each chemical element absorbs or emits light at its own unique, unmistakable set of wavelengths — its spectral signature — which is how astronomers identify what a distant object is made of." },
    { section: "5.3", q: "What is the key difference between an absorption (dark-line) spectrum and an emission (bright-line) spectrum?",
      choices: ["An absorption spectrum shows dark lines on a continuous background; an emission spectrum shows bright lines with no continuous background", "They are two names for the exact same thing", "An absorption spectrum only occurs in the laboratory, never in astronomy", "An emission spectrum can only be produced by solids"],
      answer: 0,
      whyWrong: [null, "They describe genuinely different observational setups — a continuous source seen through cool gas, versus a hot glowing gas seen directly.", "Absorption spectra are extremely common in astronomy, including the Sun's own visible spectrum.", "Emission spectra come from hot, thin, glowing gas, not solids."],
      explain: "An absorption spectrum is a continuous spectrum with dark lines missing, produced by viewing a bright source through a cooler, thinner gas; an emission spectrum shows only bright lines, with no continuous background, produced by a hot, thin gas glowing on its own." },
    { section: "5.3", q: "Why is the discovery of helium notable?",
      choices: ["It was found in the Sun's spectrum before it was ever identified on Earth", "It was the first element ever discovered", "It can only be created in a laboratory", "It has no spectral lines of its own"],
      answer: 0,
      whyWrong: [null, "Many elements, including hydrogen, oxygen, and iron, were identified well before helium.", "Helium occurs naturally, especially in stars — it isn't a lab-only creation.", "Helium has its own unique spectral signature just like every other element, which is exactly how it was identified."],
      explain: "Helium's spectral signature was spotted in the Sun's light before the element was ever found here on Earth — which is why it's named after helios, the Greek word for the Sun." },
    { section: "5.4", q: "What did Rutherford conclude from his gold foil experiment?",
      choices: ["An atom's mass and positive charge are concentrated in a tiny central nucleus", "Atoms have no internal structure at all", "Electrons are located inside the nucleus", "Gold atoms are fundamentally different from all other atoms"],
      answer: 0,
      whyWrong: [null, "The whole point of the experiment was uncovering an atom's internal structure.", "Rutherford's model places electrons orbiting outside the nucleus, not inside it.", "Rutherford's conclusions about nuclear structure are understood to apply to atoms generally, not just gold."],
      explain: "Because a small fraction of alpha particles bounced almost straight back off the gold foil, Rutherford concluded that an atom's mass and positive charge must be concentrated in a tiny, dense central nucleus." },
    { section: "5.4", q: "What defines which chemical element an atom is?",
      choices: ["The number of protons in its nucleus", "The number of neutrons in its nucleus", "The number of electrons orbiting it at any given moment", "The atom's overall size"],
      answer: 0,
      whyWrong: [null, "Neutron count can vary (isotopes) without changing the element.", "Electron count can change temporarily through ionization without changing which element the atom is.", "Atomic size isn't what defines an element — proton count is."],
      explain: "An element is defined strictly by its number of protons — hydrogen always has 1, helium 2, carbon 6, and so on, regardless of how many neutrons or electrons it has at a given moment." },
    { section: "5.4", q: "What problem in Rutherford's model did Bohr's model solve?",
      choices: ["Why electrons don't spiral into the nucleus and destroy the atom", "Why atoms have mass at all", "Why atoms can form molecules", "Why some atoms are radioactive"],
      answer: 0,
      whyWrong: [null, "Atomic mass was already accounted for by protons and neutrons in Rutherford's model.", "Molecule formation isn't the problem Bohr's model was designed to solve.", "Radioactivity involves the nucleus itself, not the electron-orbit stability problem Bohr addressed."],
      explain: "Maxwell's theory predicted that an orbiting, constantly accelerating electron should radiate away its energy and spiral into the nucleus in a fraction of a second. Bohr fixed this by proposing electrons occupy only certain stable, fixed energy levels." },
    { section: "5.4", q: "According to E = hf, what happens to a photon's energy as its frequency increases?",
      choices: ["Its energy increases", "Its energy decreases", "Its energy stays the same", "Energy and frequency are unrelated"],
      answer: 0,
      whyWrong: [null, "Frequency and energy rise together, not in opposite directions.", "Energy changes directly with frequency — they aren't independent.", "Planck's formula E = hf directly links a photon's energy to its frequency."],
      explain: "Planck's formula, E = hf, shows photon energy rising directly in proportion to frequency — a higher-frequency wave means a higher-energy photon." },
    { section: "5.5", q: "What causes hydrogen to absorb light specifically at 656 nm?",
      choices: ["A 656 nm photon has exactly the energy to lift an electron from the second to the third orbit", "656 nm is the color of hydrogen gas", "Hydrogen absorbs all visible wavelengths equally", "656 nm is hydrogen's ionization wavelength"],
      answer: 0,
      whyWrong: [null, "Hydrogen gas itself has no fixed 'color' — it's the specific transition energy that picks out 656 nm.", "Hydrogen absorbs only very specific wavelengths, not the whole visible range.", "Ionization removes an electron completely; 656 nm corresponds to a jump between two bound orbits, not ionization."],
      explain: "Only a photon whose energy exactly matches the gap between hydrogen's second and third orbits can be absorbed by an electron sitting on the second orbit — that photon has a wavelength of 656 nm." },
    { section: "5.5", q: "Transitions to or from hydrogen's ground state (n=1) are called the:",
      choices: ["Lyman series", "Balmer series", "Paschen series", "Brackett series"],
      answer: 0,
      whyWrong: [null, "The Balmer series involves transitions to/from the first excited state (n=2), not the ground state.", "The Paschen series involves transitions to/from n=3, farther from the ground state.", "The Brackett series involves transitions to/from n=4, even farther out."],
      explain: "Transitions to or from the innermost, ground-state orbit (n=1) are named the Lyman series, and involve ultraviolet photons." },
    { section: "5.5", q: "What is ionization?",
      choices: ["Removing an electron completely from an atom", "Moving an electron to a lower energy level", "Adding a neutron to an atom's nucleus", "Heating a solid until it melts"],
      answer: 0,
      whyWrong: [null, "Moving to a lower energy level is de-excitation, not ionization — the electron stays part of the atom.", "Ionization is about electrons, not adding neutrons to the nucleus.", "Ionization is an atomic-electron process, unrelated to a solid melting."],
      explain: "Ionization is knocking an electron completely free of its atom, leaving behind a positively charged ion." },
    { section: "5.5", q: "Why can a helium atom be ionized twice but a hydrogen atom only once?",
      choices: ["Helium has two electrons to remove; hydrogen has only one", "Helium is heavier than hydrogen", "Helium has more protons than neutrons", "Ionization energy doesn't depend on the atom"],
      answer: 0,
      whyWrong: [null, "Mass isn't what limits the number of possible ionizations — electron count is.", "Proton-to-neutron ratio isn't what determines how many times an atom can be ionized.", "Ionization energy is different for every atom and every ionization step — it very much depends on the atom."],
      explain: "An atom can be ionized once for each electron it has to lose. Hydrogen has one electron (one possible ionization); helium has two (two possible ionizations)." },
    { section: "5.6", q: "A star's spectral line is observed at a longer wavelength than its known rest wavelength. What does this tell you?",
      choices: ["The star is moving away from us (redshifted)", "The star is moving toward us (blueshifted)", "The star is not moving at all", "The star is hotter than expected"],
      answer: 0,
      whyWrong: [null, "A blueshift would show as a shorter observed wavelength, not longer.", "A star at rest relative to us would show its lines at their normal rest wavelength, with no shift.", "Temperature affects a spectrum's overall brightness curve, not the wavelength of a specific spectral line."],
      explain: "A longer observed wavelength than the rest wavelength is a redshift, which the Doppler effect tells us means the source is receding from us." },
    { section: "5.6", q: "Which kind of stellar motion produces no Doppler shift at all?",
      choices: ["Motion exactly perpendicular to our line of sight", "Motion directly toward us", "Motion directly away from us", "Any motion at all produces some shift"],
      answer: 0,
      whyWrong: [null, "Motion straight toward us produces the maximum blueshift, not zero shift.", "Motion straight away from us produces the maximum redshift, not zero shift.", "Purely sideways (transverse) motion, with zero radial component, produces no Doppler shift."],
      explain: "The Doppler effect depends only on radial velocity — the component of motion along the line of sight. Purely sideways motion has no radial component, so it produces no shift." },
    { section: "5.6", q: "In the Doppler shift formula v = c × (Δλ/λ), what does Δλ represent?",
      choices: ["The difference between the observed wavelength and the rest wavelength", "The star's total distance from Earth", "The star's temperature", "The speed of light"],
      answer: 0,
      whyWrong: [null, "Distance doesn't appear in the Doppler formula — it relates shift to velocity, not distance.", "Temperature relates to a blackbody's peak wavelength (Wien's law), not to a Doppler shift.", "c, the speed of light, is a separate term in the formula, not what Δλ represents."],
      explain: "Δλ is the amount a spectral line's wavelength has shifted from its known, unmoving rest wavelength λ; that shift, divided by λ and multiplied by c, gives the radial velocity." },
    { section: "5.6", q: "Why doesn't the Doppler effect stop astronomers from identifying elements in a fast-moving star's spectrum?",
      choices: ["The Doppler effect shifts a whole pattern of lines together, so the pattern stays recognizable", "Fast-moving stars don't actually show a Doppler shift", "Only slow-moving stars produce spectral lines at all", "Element identification doesn't rely on spectral lines"],
      answer: 0,
      whyWrong: [null, "Any radial motion produces a Doppler shift, regardless of speed — faster motion just produces a bigger shift.", "All stars, moving or not, produce spectral lines; motion doesn't remove them.", "Identifying elements from a star's composition is based entirely on its pattern of spectral lines."],
      explain: "The Doppler effect shifts an element's entire characteristic set of spectral lines by the same proportional amount, so the shifted pattern is still recognizable as belonging to that element — and the shift itself reveals the star's speed." }
  ];

  window.ASTRO_CHAPTERS = window.ASTRO_CHAPTERS || {};
  window.ASTRO_CHAPTERS[5] = CH;
})();
