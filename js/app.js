/* =============================================================================
   Astronomy 2e interactive study guide (multi-chapter)
   Vanilla JS, no build step, no network. Runs from a local file:// in any
   modern browser. All state is kept in localStorage.
   Depends on: js/data.js, js/data-ch2.js, …  (window.ASTRO_CHAPTERS)
   ============================================================================= */
(function () {
  "use strict";

  var CHAPTERS = window.ASTRO_CHAPTERS || {};
  var chapterNums = Object.keys(CHAPTERS).map(Number).sort(function (a, b) { return a - b; });
  if (!chapterNums.length) { document.body.textContent = "Could not load chapter data."; return; }

  var activeChapter = chapterNums[0];
  var D = CHAPTERS[activeChapter];   // the active chapter's data (reassigned by setActiveChapter)

  /* --------------------------------------------------------------- storage */
  // progress keys are namespaced per chapter:  astro.ch<n>.<key>
  function pfx() { return "astro.ch" + activeChapter + "."; }
  var store = {
    get: function (k, fallback) {
      try {
        var v = localStorage.getItem(pfx() + k);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set: function (k, v) {
      try { localStorage.setItem(pfx() + k, JSON.stringify(v)); } catch (e) {}
    },
    del: function (k) { try { localStorage.removeItem(pfx() + k); } catch (e) {} }
  };
  function lsJSON(key, fallback) {   // read any localStorage key (used by the dashboard)
    try { var v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  }
  var themeStore = {
    get: function () { try { return localStorage.getItem("astro.theme"); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem("astro.theme", v); } catch (e) {} }
  };

  /* tool key -> [route, name, blurb] */
  var TOOL_INFO = {
    sci:      ["t/sci", "Scientific Notation", "Practice powers-of-ten both directions"],
    round:    ["t/round", "Rounding Numbers", "Round to the nearest tidy number, on a number line"],
    light:    ["t/light", "Light Travel Time", "Turn any distance into look-back time"],
    calendar: ["t/calendar", "Cosmic Calendar", "13.8 billion years compressed into one year"],
    scale:    ["t/scale", "Cosmic Scale", "Step from Earth to the most distant quasars"],
    elements: ["t/elements", "Element Abundance", "The cosmic ‘greatest hits’ of the periodic table"],
    astronomers: ["t/astronomers", "Match the Astronomers", "Pair each sky-watcher with what they did"],
    mul:      ["t/mul", "Multiplication", "See why an exponent is just repeated multiplying"],
    exponents: ["t/exponents", "Exponents & Roots", "Squares, cubes, powers of ten — and working backwards"],
    pemdas:   ["t/pemdas", "Order of Operations", "PEMDAS — which part of a formula to do first"],
    gravratio: ["t/gravratio", "Gravity by Ratio", "Compare two gravity setups — no big equation, no G"],
    mathlab:  ["t/mathlab", "The Chapter 3 Formulas", "Kepler, density, gravity, weighing a star — one step at a time"],
    kepler1:  ["t/kepler1", "Kepler’s 1st Law", "Orbits are ellipses, with the Sun at one focus"],
    kepler2:  ["t/kepler2", "Kepler’s 2nd Law", "Equal areas — fast near the Sun, slow far away"],
    kepler3:  ["t/kepler3", "Kepler’s 3rd Law", "Farther out means a longer year (P² = a³)"],
    newton1:  ["t/newton1", "Newton’s 1st Law", "Inertia — motion keeps going on its own"],
    newton2:  ["t/newton2", "Newton’s 2nd Law", "Force makes things speed up (a = F ÷ m)"],
    newton3:  ["t/newton3", "Newton’s 3rd Law", "Every push has an equal push back"],
    gravitation: ["t/gravitation", "Universal Gravitation", "Every mass pulls every mass — F = G·m₁m₂ ÷ R²"],
    physicists: ["t/physicists", "Match the Physicists", "Pair each scientist with what they worked out"],
    sizesort: ["t/sizesort", "Sort by Size", "Order cosmic sizes from Chapter 1 — smallest to largest"],
    skycoords: ["t/skycoords", "Earth and Sky", "Latitude/longitude and declination/right ascension"],
    seasons: ["t/seasons", "The Seasons", "Why the 23.5° tilt makes summer and winter"],
    keepingtime: ["t/keepingtime", "Keeping Time", "Solar days, sidereal days, and time zones"],
    calendar4: ["t/calendar4", "The Calendar", "Julian, Gregorian, and the leap-year rule"],
    moonphases: ["t/moonphases", "Phases of the Moon", "New, crescent, quarter, gibbous, full — and why"],
    tides: ["t/tides", "Ocean Tides", "Spring tides, neap tides, and the pull of the Moon"],
    eclipses: ["t/eclipses", "Eclipses", "Solar and lunar eclipses, total, partial, and annular"],
    lightwaves: ["t/lightwaves", "The Behavior of Light", "Wavelength, frequency, photons, and the inverse square law"],
    emspectrum: ["t/emspectrum", "The EM Spectrum", "Gamma rays to radio waves — and the laws of radiation"],
    spectroscopy: ["t/spectroscopy", "Spectroscopy", "Prisms, dispersion, and continuous/absorption/emission spectra"],
    atomstructure: ["t/atomstructure", "The Structure of the Atom", "Protons, neutrons, isotopes, and the Bohr atom"],
    spectrallines: ["t/spectrallines", "Formation of Spectral Lines", "Energy levels, excitation, and ionization"],
    doppler: ["t/doppler", "The Doppler Effect", "Blueshift, redshift, and radial velocity"],
    telescopes: ["t/telescopes", "Telescopes", "Light buckets, lenses vs. mirrors, and where the focus goes"],
    telescopestoday: ["t/telescopestoday", "Telescopes Today", "Giant mirrors, observing sites, seeing, and adaptive optics"],
    detectors: ["t/detectors", "Detectors and Instruments", "Film vs. CCDs, infrared challenges, and spectrometers"],
    radiotelescopes: ["t/radiotelescopes", "Radio Telescopes", "Radio dishes, interferometers, and radar"],
    spaceobs: ["t/spaceobs", "Observing from Space", "Hubble, Webb, Chandra, Fermi — and why we launch them"],
    futurescopes: ["t/futurescopes", "The Future of Large Telescopes", "Rubin, the ELT, TMT, GMT, and segmented mirrors"]
  };
  function hasTool(key) { return D.tools && D.tools.indexOf(key) > -1; }

  /* tools that sit under a named sub-group in the sidebar */
  var TOOL_GROUP = {};

  /* General arithmetic helpers. These are chapter-independent — the reader
     reaches them from the dashboard "Math warm-ups" hub (#/math), not from
     any one chapter's tool list — so their routes skip the hasTool() gate. */
  var MATH_TOOLS = ["mul", "exponents", "pemdas", "sci", "round", "gravratio"];
  function isMathRoute(hash) {
    for (var i = 0; i < MATH_TOOLS.length; i++) {
      if (TOOL_INFO[MATH_TOOLS[i]][0] === hash) return true;
    }
    return false;
  }

  /* Hands-on activities — no arithmetic, just doing something. Also
     chapter-independent; reached from the dashboard "Activities" hub
     (#/activities), so their routes skip the hasTool() gate too. */
  var ACTIVITY_TOOLS = ["sizesort"];
  function isActivityRoute(hash) {
    for (var i = 0; i < ACTIVITY_TOOLS.length; i++) {
      if (TOOL_INFO[ACTIVITY_TOOLS[i]][0] === hash) return true;
    }
    return false;
  }

  function setActiveChapter(n) {
    n = Number(n);
    if (!CHAPTERS[n]) return;
    activeChapter = n;
    D = CHAPTERS[n];
    try { localStorage.setItem("astro.activeChapter", String(n)); } catch (e) {}
    rebuildGlossaryIndex();
  }

  // one-time migration of the old single-chapter keys (astroCh1.* -> astro.ch1.*)
  function migrateLegacy() {
    try {
      if (localStorage.getItem("astroCh1.read") != null && localStorage.getItem("astro.ch1.read") == null) {
        var oldKeys = [];
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf("astroCh1.") === 0) oldKeys.push(k);
        }
        oldKeys.forEach(function (k) {
          var nk = "astro.ch1." + k.slice(9);
          if (localStorage.getItem(nk) == null) localStorage.setItem(nk, localStorage.getItem(k));
        });
      }
      if (!localStorage.getItem("astro.theme")) {
        var t = localStorage.getItem("astroCh1.theme") || localStorage.getItem("astro.ch1.theme");
        if (t) { try { localStorage.setItem("astro.theme", JSON.parse(t)); } catch (e2) { localStorage.setItem("astro.theme", t); } }
      }
    } catch (e) {}
  }

  /* --------------------------------------------------------------- helpers */
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var val = attrs[k];
        if (val == null) continue;
        if (k === "class") e.className = val;
        else if (k === "html") e.innerHTML = val;
        else if (k === "text") e.textContent = val;
        else if (k.slice(0, 2) === "on" && typeof val === "function") e.addEventListener(k.slice(2), val);
        else e.setAttribute(k, val);
      }
    }
    if (kids != null) {
      if (!Array.isArray(kids)) kids = [kids];
      kids.forEach(function (c) {
        if (c == null || c === false) return;
        e.appendChild(typeof c === "object" ? c : document.createTextNode(String(c)));
      });
    }
    return e;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function shuffle(arr) {
    arr = arr.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  var SUP = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³",
    "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  function sup(n) { return String(n).split("").map(function (c) { return SUP[c] || c; }).join(""); }

  /* ----- segmented control (mode switcher) ----- */
  function segControl(labels, active, onChange, wrapMany) {
    var wrap = h("div", { class: "seg" + (wrapMany ? " seg-wrap" : "") });
    labels.forEach(function (lab, i) {
      var b = h("button", { class: "seg-btn" + (i === active ? " on" : ""), text: lab, onclick: function () {
        if (b.classList.contains("on")) return;
        var all = wrap.querySelectorAll(".seg-btn");
        for (var k = 0; k < all.length; k++) all[k].classList.remove("on");
        b.classList.add("on");
        onChange(i);
      } });
      wrap.appendChild(b);
    });
    return wrap;
  }

  /* ----- shared two-column matching game -----
     host: element to render into (cleared on each call)
     pairs: [{ a: leftText, b: rightText }]
     opts: { leftLabel, rightLabel, onRestart, onWin } */
  var matchTimer = null;
  function stopMatch() { if (matchTimer) { clearInterval(matchTimer); matchTimer = null; } }
  function renderMatchGame(host, pairs, opts) {
    opts = opts || {};
    stopMatch();
    clear(host);
    var left = shuffle(pairs.map(function (p, i) { return { i: i, t: p.a }; }));
    var right = shuffle(pairs.map(function (p, i) { return { i: i, t: p.b }; }));
    var matched = {}, selL = null, selR = null, moves = 0, done = 0, t0 = Date.now();

    var movesEl = h("b", { text: "0" });
    var pairsEl = h("b", { text: "0/" + pairs.length });
    var timeEl = h("b", { text: "0s" });
    var head = h("div", { class: "match-head" }, [
      h("span", {}, [document.createTextNode("Matched "), pairsEl]),
      h("span", {}, [document.createTextNode("Moves "), movesEl]),
      h("span", {}, [document.createTextNode("Time "), timeEl]),
      h("button", { class: "btn small ghost", text: "New game",
        onclick: function () { (opts.onRestart || function () { renderMatchGame(host, pairs, opts); })(); } })
    ]);
    matchTimer = setInterval(function () {
      timeEl.textContent = Math.round((Date.now() - t0) / 1000) + "s";
    }, 1000);

    var leftCol = h("div", { class: "match-col" }, [h("h4", { text: opts.leftLabel || "" })]);
    var rightCol = h("div", { class: "match-col" }, [h("h4", { text: opts.rightLabel || "" })]);
    left.forEach(function (item) {
      var b = h("button", { class: "match-item", text: item.t, onclick: function () { pick("L", item, b); } });
      leftCol.appendChild(b);
    });
    right.forEach(function (item) {
      var b = h("button", { class: "match-item", text: item.t, onclick: function () { pick("R", item, b); } });
      rightCol.appendChild(b);
    });
    var winSlot = h("div");
    host.appendChild(head);
    host.appendChild(h("div", { class: "match-wrap" }, [leftCol, rightCol]));
    host.appendChild(winSlot);

    function pick(side, item, btn) {
      if (matched[item.i]) return;
      if (side === "L") { if (selL) selL.btn.classList.remove("sel"); selL = { item: item, btn: btn }; }
      else { if (selR) selR.btn.classList.remove("sel"); selR = { item: item, btn: btn }; }
      btn.classList.add("sel");
      if (!selL || !selR) return;
      moves++; movesEl.textContent = moves;
      var a = selL, b = selR;
      if (a.item.i === b.item.i) {
        matched[a.item.i] = true; done++;
        [a, b].forEach(function (x) {
          x.btn.classList.remove("sel"); x.btn.classList.add("matched"); x.btn.disabled = true;
        });
        selL = selR = null;
        pairsEl.textContent = done + "/" + pairs.length;
        if (done === pairs.length) win();
      } else {
        a.btn.classList.add("wrong"); b.btn.classList.add("wrong");
        a.btn.classList.remove("sel"); b.btn.classList.remove("sel");
        var aa = a.btn, bb = b.btn;
        setTimeout(function () { aa.classList.remove("wrong"); bb.classList.remove("wrong"); }, 350);
        selL = selR = null;
      }
    }
    function win() {
      stopMatch();
      var secs = Math.round((Date.now() - t0) / 1000);
      winSlot.appendChild(h("div", { class: "match-win card" }, [
        h("div", { class: "big", text: "Solved!" }),
        h("p", { text: pairs.length + " pairs · " + moves + " moves · " + secs + " s" }),
        h("button", { class: "btn primary", text: "Play again",
          onclick: function () { (opts.onRestart || function () { renderMatchGame(host, pairs, opts); })(); } })
      ]));
      if (opts.onWin) opts.onWin({ moves: moves, seconds: secs });
    }
  }

  // Expand coefficient + exponent to a plain decimal string (no float error).
  function expand(coeff, exp) {
    var s = String(coeff);
    var neg = s.charAt(0) === "-";
    if (neg) s = s.slice(1);
    var parts = s.split(".");
    var digits = parts[0] + (parts[1] || "");
    var point = parts[0].length + exp;
    var out;
    if (point <= 0) out = "0." + Array(-point + 1).join("0") + digits;
    else if (point >= digits.length) out = digits + Array(point - digits.length + 1).join("0");
    else out = digits.slice(0, point) + "." + digits.slice(point);
    if (out.indexOf(".") > -1) out = out.replace(/0+$/, "").replace(/\.$/, "");
    return (neg ? "-" : "") + out;
  }
  function commas(numStr) {
    var parts = String(numStr).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  // Format a number in scientific notation as "9.46 × 10¹²"
  function fmtSci(n, sig) {
    sig = sig || 3;
    if (n === 0) return "0";
    var neg = n < 0; n = Math.abs(n);
    var exp = Math.floor(Math.log(n) / Math.LN10);
    var coeff = n / Math.pow(10, exp);
    // guard rounding pushing coeff to 10
    coeff = Number(coeff.toPrecision(sig));
    if (coeff >= 10) { coeff /= 10; exp += 1; }
    var cs = String(coeff);
    return (neg ? "-" : "") + cs + " × 10" + sup(exp);
  }

  var YEAR_SEC = 365.25 * 24 * 3600;
  var DUR_UNITS = [
    [1, "second", "seconds"],
    [60, "minute", "minutes"],
    [3600, "hour", "hours"],
    [86400, "day", "days"],
    [YEAR_SEC, "year", "years"],
    [YEAR_SEC * 1e3, "thousand years", "thousand years"],
    [YEAR_SEC * 1e6, "million years", "million years"],
    [YEAR_SEC * 1e9, "billion years", "billion years"]
  ];
  function fmtDuration(seconds) {
    if (seconds < 1) return (seconds).toPrecision(2) + " seconds";
    var u = DUR_UNITS[0];
    for (var i = 0; i < DUR_UNITS.length; i++) {
      if (seconds >= DUR_UNITS[i][0]) u = DUR_UNITS[i];
    }
    var v = seconds / u[0];
    var vs = v >= 100 ? Math.round(v).toLocaleString() :
             v >= 10 ? v.toFixed(1) : v.toFixed(2);
    vs = vs.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
    var label = (Math.abs(v - 1) < 1e-9) ? u[1] : u[2];
    return vs + " " + label;
  }

  /* ---------------------------------------------------------- glossary map */
  function normTerm(s) {
    return s.toLowerCase()
      .replace(/\([^)]*\)/g, "")        // drop parenthetical
      .replace(/[^a-z ]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  var GLOSS_BY_NORM = {};
  function rebuildGlossaryIndex() {
    GLOSS_BY_NORM = {};
    (D.glossary || []).forEach(function (g) { GLOSS_BY_NORM[normTerm(g.term)] = g; });
  }
  var ALIASES = {
    "hypotheses": "hypothesis", "quasars": "quasar", "atoms": "atom",
    "molecules": "molecule", "elements": "element", "galaxies": "galaxy",
    "star clusters": "star cluster", "scientific laws": "scientific law",
    "superclusters": "supercluster", "clusters": "cluster of galaxies",
    "the galaxy": "milky way galaxy"
  };
  function lookupTerm(text) {
    var n = normTerm(text);
    if (GLOSS_BY_NORM[n]) return GLOSS_BY_NORM[n];
    if (ALIASES[n] && GLOSS_BY_NORM[ALIASES[n]]) return GLOSS_BY_NORM[ALIASES[n]];
    if (n.slice(-1) === "s" && GLOSS_BY_NORM[n.slice(0, -1)]) return GLOSS_BY_NORM[n.slice(0, -1)];
    // prefix match
    for (var key in GLOSS_BY_NORM) {
      if (n.indexOf(key) === 0 || key.indexOf(n) === 0) return GLOSS_BY_NORM[key];
    }
    return null;
  }

  /* ---------------------------------------------- section plain-text index */
  var SCRATCH = document.createElement("div");
  chapterNums.forEach(function (n) {
    (CHAPTERS[n].sections || []).forEach(function (s) {
      SCRATCH.innerHTML = s.html;
      s._plain = (SCRATCH.textContent || "").replace(/\s+/g, " ").toLowerCase();
    });
  });

  /* -------------------------------------------------------------- routing */
  var ROUTES = {}; // hash -> {title, render}
  function currentHash() { return location.hash.replace(/^#\/?/, "") || "dashboard"; }

  /* ============================================================ SIDEBAR == */
  var app = qs("#app");
  var sidebarEl, mainEl, crumbEl, sideBarFill, sideBarText;

  function navLink(hash, num, label) {
    return h("button", {
      class: "nav-link", "data-hash": hash,
      onclick: function () { go(hash); closeSidebar(); }
    }, [
      num ? h("span", { class: "num", text: num }) : null,
      h("span", { text: label }),
      h("span", { class: "check", text: "✓" })
    ]);
  }

  // the math warm-ups hub and the activities hub live outside any chapter —
  // while the reader is in one, the sidebar becomes that hub's menu
  function isMathContext() {
    var hash = currentHash();
    return hash === "math" || isMathRoute(hash);
  }
  function isActivityContext() {
    var hash = currentHash();
    return hash === "activities" || isActivityRoute(hash);
  }

  function rebuildNav() {
    if (!sidebarEl) return;
    var mathMode = isMathContext();
    var actMode = isActivityContext();
    var hubMode = mathMode || actMode;

    var brand = qs("#brandBox", sidebarEl);
    clear(brand);
    brand.appendChild(h("div", { class: "ch", text: hubMode ? "Study guide" : "Chapter " + D.meta.chapter }));
    brand.appendChild(h("div", { class: "title", text:
      mathMode ? "Math warm-ups" : actMode ? "Hands-on activities" : D.meta.chapterTitle }));
    brand.appendChild(h("div", { class: "book", text: D.meta.book }));

    var read = qs("#navRead", sidebarEl);
    clear(read);
    read.appendChild(navLink("overview", "", "Overview"));
    D.sections.forEach(function (s) { read.appendChild(navLink("s/" + s.id, s.id, s.title)); });

    // hide the chapter-only parts of the sidebar in a hub; the standalone
    // hub links are the reverse — only shown while inside a chapter
    ["navReadLabel", "navRead", "sidebarProgress", "navReviewLabel", "navReview"].forEach(function (id) {
      var el = qs("#" + id, sidebarEl);
      if (el) el.style.display = hubMode ? "none" : "";
    });
    var mathLink = qs("#navMathLink", sidebarEl);
    if (mathLink) mathLink.style.display = hubMode ? "none" : "";
    var actLink = qs("#navActivitiesLink", sidebarEl);
    if (actLink) actLink.style.display = hubMode ? "none" : "";

    var toolsLabel = qs("#navToolsLabel", sidebarEl);
    var tools = qs("#navTools", sidebarEl);
    clear(tools);

    if (mathMode) {
      toolsLabel.style.display = "";
      toolsLabel.textContent = "Math warm-ups";
      tools.appendChild(navLink("math", "", "All warm-ups"));
      MATH_TOOLS.forEach(function (key) {
        tools.appendChild(navLink(TOOL_INFO[key][0], "", TOOL_INFO[key][1]));
      });
      tools.appendChild(h("div", { class: "nav-subgroup-label", text: "Then" }));
      tools.appendChild(h("button", {
        class: "nav-link", "data-hash": "t/mathlab",
        onclick: function () { if (CHAPTERS[3]) setActiveChapter(3); go("t/mathlab"); closeSidebar(); }
      }, [
        h("span", { text: "The Chapter 3 Formulas" }),
        h("span", { class: "check", text: "✓" })
      ]));
      refreshSidebar();
      return;
    }

    if (actMode) {
      toolsLabel.style.display = "";
      toolsLabel.textContent = "Hands-on activities";
      tools.appendChild(navLink("activities", "", "All activities"));
      ACTIVITY_TOOLS.forEach(function (key) {
        tools.appendChild(navLink(TOOL_INFO[key][0], "", TOOL_INFO[key][1]));
      });
      refreshSidebar();
      return;
    }

    toolsLabel.textContent = "Study tools";
    var keys = D.tools || [];
    toolsLabel.style.display = keys.length ? "" : "none";
    var lastGroup = null;
    keys.forEach(function (key) {
      var info = TOOL_INFO[key];
      if (!info) return;
      var grp = TOOL_GROUP[key] || null;
      if (grp !== lastGroup) {
        if (grp) tools.appendChild(h("div", { class: "nav-subgroup-label", text: grp }));
        lastGroup = grp;
      }
      var link = navLink(info[0], "", info[1]);
      if (grp) link.classList.add("nav-sub");
      tools.appendChild(link);
    });
    refreshSidebar();
  }

  function buildShell() {
    var sidebar = h("aside", { class: "sidebar", id: "sidebar" });
    sidebarEl = sidebar;

    sidebar.appendChild(h("button", {
      class: "nav-link nav-back", "data-hash": "dashboard",
      onclick: function () { go("dashboard"); closeSidebar(); }
    }, h("span", { text: "← All chapters" })));
    sidebar.appendChild(h("div", { class: "brand", id: "brandBox" }));

    sidebar.appendChild(h("div", { class: "nav-group-label", id: "navReadLabel", text: "Read" }));
    sidebar.appendChild(h("div", { id: "navRead" }));

    sideBarText = h("div", {}, "0 sections reviewed");
    sideBarFill = h("span");
    sidebar.appendChild(h("div", { class: "sidebar-progress", id: "sidebarProgress" }, [
      sideBarText,
      h("div", { class: "bar" }, sideBarFill)
    ]));

    sidebar.appendChild(h("div", { class: "nav-group-label", id: "navToolsLabel", text: "Study tools" }));
    sidebar.appendChild(h("div", { id: "navTools" }));
    sidebar.appendChild(h("div", { id: "navMathLink" }, navLink("math", "", "Math warm-ups")));
    sidebar.appendChild(h("div", { id: "navActivitiesLink" }, navLink("activities", "", "Hands-on activities")));

    sidebar.appendChild(h("div", { class: "nav-group-label", id: "navReviewLabel", text: "Review" }));
    sidebar.appendChild(h("div", { id: "navReview" }, [
      navLink("flashcards", "", "Flashcards"),
      navLink("quiz", "", "Self-Test Quiz"),
      navLink("glossary", "", "Glossary"),
      navLink("progress", "", "My Progress")
    ]));

    /* top bar */
    var searchInput = h("input", {
      type: "text", placeholder: "Search…", "aria-label": "Search",
      oninput: function () { runSearch(this.value); },
      onfocus: function () { if (this.value) runSearch(this.value); }
    });
    var searchResults = h("div", { class: "search-results", id: "searchResults" });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-wrap")) searchResults.classList.remove("open");
    });

    crumbEl = h("div", { class: "crumb" });

    var themeBtn = h("button", {
      class: "icon-btn", title: "Toggle light / dark theme", "aria-label": "Toggle theme",
      onclick: toggleTheme
    }, themeIcon());
    themeBtn.id = "themeBtn";

    var topbar = h("header", { class: "topbar" }, [
      h("button", {
        class: "icon-btn menu-btn", "aria-label": "Menu",
        onclick: function () { sidebarEl.classList.toggle("open"); qs("#scrim").classList.toggle("show"); }
      }, "☰"),
      crumbEl,
      h("div", { class: "spacer" }),
      h("div", { class: "search-wrap" }, [searchInput, searchResults]),
      themeBtn
    ]);

    mainEl = h("main", { class: "main", id: "main" });
    var scrim = h("div", { class: "scrim", id: "scrim", onclick: closeSidebar });

    app.appendChild(sidebar);
    app.appendChild(topbar);
    app.appendChild(mainEl);
    app.appendChild(scrim);
    document.body.appendChild(h("div", { class: "term-pop", id: "termPop" }));
  }

  function closeSidebar() {
    sidebarEl.classList.remove("open");
    var s = qs("#scrim"); if (s) s.classList.remove("show");
  }

  function themeIcon() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "☾" : "☀";
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    var next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    themeStore.set(next);
    qs("#themeBtn").textContent = themeIcon();
  }

  /* ---------------------------------------------------------- read state */
  function readSet() { return store.get("read", []); }
  function isRead(id) { return readSet().indexOf(id) > -1; }
  function setRead(id, on) {
    var set = readSet();
    var i = set.indexOf(id);
    if (on && i < 0) set.push(id);
    if (!on && i > -1) set.splice(i, 1);
    store.set("read", set);
    refreshSidebar();
  }

  function refreshSidebar() {
    var cur = currentHash();
    var links = sidebarEl.querySelectorAll(".nav-link");
    for (var i = 0; i < links.length; i++) {
      var lh = links[i].getAttribute("data-hash");
      links[i].classList.toggle("active", lh === cur);
      var m = lh.match(/^s\/(.+)$/);
      links[i].classList.toggle("done", !!(m && isRead(m[1])));
    }
    var n = readSet().length, total = D.sections.length;
    sideBarFill.style.width = Math.round((n / total) * 100) + "%";
    sideBarText.textContent = n + " of " + total + " sections reviewed";
  }

  /* ================================================================ SEARCH */
  function runSearch(qraw) {
    var box = qs("#searchResults");
    var q = qraw.trim().toLowerCase();
    clear(box);
    if (q.length < 2) { box.classList.remove("open"); return; }
    var out = [];
    chapterNums.forEach(function (n) {
      var c = CHAPTERS[n];
      var tag = chapterNums.length > 1 ? "Ch " + n + " · " : "";
      c.sections.forEach(function (s) {
        if (("section " + s.id + " " + s.title).toLowerCase().indexOf(q) > -1 || (s._plain || "").indexOf(q) > -1) {
          out.push({ kind: tag + "Section", label: s.id + "  " + s.title, chapter: n, hash: "s/" + s.id });
        }
      });
      (c.glossary || []).forEach(function (g) {
        if (g.term.toLowerCase().indexOf(q) > -1 || g.def.toLowerCase().indexOf(q) > -1) {
          out.push({ kind: tag + "Term", label: g.term, chapter: n, hash: "glossary", term: g.term });
        }
      });
    });
    (D.tools || []).forEach(function (key) {
      var info = TOOL_INFO[key];
      if (info && info[1].toLowerCase().indexOf(q) > -1) out.push({ kind: "Tool", label: info[1], hash: info[0] });
    });
    MATH_TOOLS.forEach(function (key) {
      var info = TOOL_INFO[key];
      if (info[1].toLowerCase().indexOf(q) > -1) out.push({ kind: "Math warm-up", label: info[1], hash: info[0] });
    });
    ACTIVITY_TOOLS.forEach(function (key) {
      var info = TOOL_INFO[key];
      if ((info[1] + " " + info[2]).toLowerCase().indexOf(q) > -1) out.push({ kind: "Activity", label: info[1], hash: info[0] });
    });
    if ("dashboard chapters".indexOf(q) > -1) out.push({ kind: "Go", label: "All chapters", hash: "dashboard" });
    if ("math warm-ups arithmetic".indexOf(q) > -1) out.push({ kind: "Go", label: "Math warm-ups", hash: "math" });
    if ("activities hands-on sorting".indexOf(q) > -1) out.push({ kind: "Go", label: "Hands-on activities", hash: "activities" });

    if (!out.length) {
      box.appendChild(h("div", { class: "sr-empty", text: "No matches for “" + qraw + "”" }));
    } else {
      out.slice(0, 30).forEach(function (r) {
        box.appendChild(h("button", {
          class: "sr-item",
          onclick: function () {
            box.classList.remove("open");
            if (r.chapter && r.chapter !== activeChapter) { setActiveChapter(r.chapter); rebuildNav(); }
            go(r.hash);
            if (r.term) setTimeout(function () { highlightGlossary(r.term); }, 60);
          }
        }, [h("span", { class: "sr-kind", text: r.kind }), document.createTextNode(r.label)]));
      });
    }
    box.classList.add("open");
  }

  /* ============================================================= RENDERERS */

  function pageTitle(t) {
    crumbEl.innerHTML = "<b>" + D.meta.book + "</b> &middot; Chapter " + D.meta.chapter + " &middot; " + t;
    document.title = "Astronomy 2e · Ch. " + D.meta.chapter + " — " + t;
  }

  // crumb/title for the chapter-independent math warm-up tools
  function mathTitle(t) {
    crumbEl.innerHTML = "<b>" + D.meta.book + "</b> &middot; Math warm-ups &middot; " + t;
    document.title = "Astronomy 2e · Math warm-ups — " + t;
  }

  // crumb/title for the chapter-independent hands-on activities
  function activityTitle(t) {
    crumbEl.innerHTML = "<b>" + D.meta.book + "</b> &middot; Activities &middot; " + t;
    document.title = "Astronomy 2e · Activities — " + t;
  }

  /* ---- DASHBOARD (all chapters) ------------------------------------- */
  function renderDashboard() {
    crumbEl.innerHTML = "<b>" + D.meta.book + "</b> &middot; All chapters";
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Interactive study guide" }));
    v.appendChild(h("h1", { text: "Astronomy 2e — Chapters" }));
    v.appendChild(h("p", { class: "lede", text:
      "Pick a chapter to study. Each has section-by-section reading, key ideas, self-checks, flashcards, " +
      "and a self-test quiz. Your progress on every chapter is saved in this browser." }));

    var grid = h("div", { class: "chapter-grid" });
    chapterNums.forEach(function (n) {
      var c = CHAPTERS[n];
      var readArr = lsJSON("astro.ch" + n + ".read", []);
      var flashMapN = lsJSON("astro.ch" + n + ".flash", {});
      var knownN = 0; for (var t in flashMapN) if (flashMapN[t] === "known") knownN++;
      var bestN = lsJSON("astro.ch" + n + ".quizBest", null);
      var total = c.sections.length;
      var pct = total ? Math.round(readArr.length / total * 100) : 0;
      var started = readArr.length > 0 || bestN != null || knownN > 0;
      var toolCount = (c.tools || []).length;

      grid.appendChild(h("button", {
        class: "chapter-card" + (n === activeChapter ? " current" : ""),
        onclick: function () { setActiveChapter(n); rebuildNav(); go("overview"); }
      }, [
        h("div", { class: "ch-num", text: "Chapter " + n }),
        h("div", { class: "ch-title", text: c.meta.chapterTitle }),
        h("div", { class: "ch-meta", text:
          total + " sections · " + (c.glossary ? c.glossary.length : 0) + " terms" +
          (toolCount ? " · " + toolCount + (toolCount === 1 ? " tool" : " tools") : "") }),
        h("div", { class: "bar" }, h("span", { style: "width:" + pct + "%" })),
        h("div", { class: "ch-cta" }, [
          h("span", { class: "ch-go", text: pct === 100 ? "Review ✓" : started ? "Continue" : "Start" }),
          h("span", { class: "ch-pct", text: (started ? pct + "%" : "") +
            (bestN != null ? "  ·  quiz " + bestN + "%" : "") })
        ])
      ]));
    });
    v.appendChild(grid);

    v.appendChild(h("h2", { text: "Before you start — brush up on the math", style: "margin-top:30px" }));
    v.appendChild(h("p", { class: "lede", style: "margin-top:4px", text:
      "Short, tappable warm-ups for the arithmetic every chapter leans on — multiplication, exponents, " +
      "scientific notation, rounding, and comparing two gravity setups by ratio. Not tied to any one chapter." }));
    var mgrid = h("div", { class: "tiles" });
    MATH_TOOLS.forEach(function (key) {
      var info = TOOL_INFO[key];
      mgrid.appendChild(h("button", { class: "tile", onclick: function () { go(info[0]); } }, [
        h("div", { class: "t-title", text: info[1] }),
        h("div", { class: "t-meta", text: info[2] })
      ]));
    });
    mgrid.appendChild(h("button", { class: "tile", onclick: function () { go("math"); } }, [
      h("div", { class: "t-title", text: "All math warm-ups →" }),
      h("div", { class: "t-meta", text: "The full hub, in learning order" })
    ]));
    v.appendChild(mgrid);

    v.appendChild(h("h2", { text: "Hands-on activities", style: "margin-top:30px" }));
    v.appendChild(h("p", { class: "lede", style: "margin-top:4px", text:
      "No arithmetic — just move things around and see if you got it right. Also not tied to any one chapter." }));
    var agrid = h("div", { class: "tiles" });
    ACTIVITY_TOOLS.forEach(function (key) {
      var info = TOOL_INFO[key];
      agrid.appendChild(h("button", { class: "tile", onclick: function () { go(info[0]); } }, [
        h("div", { class: "t-title", text: info[1] }),
        h("div", { class: "t-meta", text: info[2] })
      ]));
    });
    agrid.appendChild(h("button", { class: "tile", onclick: function () { go("activities"); } }, [
      h("div", { class: "t-title", text: "All activities →" }),
      h("div", { class: "t-meta", text: "The full list" })
    ]));
    v.appendChild(agrid);

    mount(v);
  }

  /* ---- MATH WARM-UPS HUB (dashboard-level, chapter-independent) ---- */
  function renderMathHub() {
    crumbEl.innerHTML = "<b>" + D.meta.book + "</b> &middot; Math warm-ups";
    document.title = "Astronomy 2e · Math warm-ups";
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("dashboard"); },
      text: "← All chapters" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Interactive study guide" }));
    v.appendChild(h("h1", { text: "Math warm-ups" }));
    v.appendChild(h("p", { class: "lede", html:
      "The arithmetic the textbook takes for granted, one small tool at a time — nothing harder than " +
      "multiplying two numbers. Work down the list in order; each tool leads into the next." }));

    var steps = [
      { key: "mul", why: "Where the little raised numbers in P² and a³ come from." },
      { key: "exponents", why: "“Squared”, “cubed”, powers of ten, roots — and a first look at how 10ⁿ feeds scientific notation." },
      { key: "pemdas", why: "Which part of a formula to do first: parentheses, exponents, then × ÷, then + −." },
      { key: "sci", why: "The full move: the digit in front, the hop count, and the + / − sign. Reads the book’s 1.5 × 10⁸ km." },
      { key: "round", why: "Trim a messy number down to something you can picture and check against." },
      { key: "gravratio", why: "Put it together: compare two gravity setups by ratio — “how many times stronger?” — using only ×, ÷ and squaring." }
    ];
    var list = h("div", { class: "tiles" });
    steps.forEach(function (st, i) {
      var info = TOOL_INFO[st.key];
      list.appendChild(h("button", { class: "tile", onclick: function () { go(info[0]); } }, [
        h("div", { class: "t-num", text: "STEP " + (i + 1) }),
        h("div", { class: "t-title", text: info[1] }),
        h("div", { class: "t-meta", text: st.why })
      ]));
    });
    v.appendChild(list);

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Then: the real formulas", style: "margin-top:0" }),
      h("p", { class: "prose", style: "margin:0 0 10px", html:
        "Once these warm-ups feel easy, <b>The Chapter 3 Formulas</b> walks through every calculation in " +
        "Chapter 3 — Kepler’s third law, density, gravity, weighing a star — the same one-step-at-a-time way." }),
      h("button", { class: "btn primary", onclick: function () {
        if (CHAPTERS[3]) { setActiveChapter(3); rebuildNav(); }
        go("t/mathlab");
      }, text: "Open The Chapter 3 Formulas →" })
    ]));

    mount(v);
  }

  /* ---- ACTIVITIES HUB (dashboard-level, chapter-independent) ---- */
  function renderActivitiesHub() {
    crumbEl.innerHTML = "<b>" + D.meta.book + "</b> &middot; Activities";
    document.title = "Astronomy 2e · Activities";
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("dashboard"); },
      text: "← All chapters" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Interactive study guide" }));
    v.appendChild(h("h1", { text: "Hands-on activities" }));
    v.appendChild(h("p", { class: "lede", html:
      "No formulas here — just drag, sort, and match, then check your answer. A good way to get a feel " +
      "for the sizes and distances the book throws around." }));

    var list = h("div", { class: "tiles" });
    ACTIVITY_TOOLS.forEach(function (key) {
      var info = TOOL_INFO[key];
      list.appendChild(h("button", { class: "tile", onclick: function () { go(info[0]); } }, [
        h("div", { class: "t-title", text: info[1] }),
        h("div", { class: "t-meta", text: info[2] })
      ]));
    });
    v.appendChild(list);
    mount(v);
  }

  /* ---- ACTIVITY: Sort by Size --------------------------------------
     A random 5 (or the whole pool) of cosmic sizes from Chapter 1's tour
     of the universe (§1.6-1.8). Arrange them smallest -> largest by
     dragging (Pointer Events: mouse + touch + pen), by the ▲▼ buttons, or
     by picking each slot from a drop-down. "Check" locks the puzzle and
     shows the correct order with the reason each step is bigger, then
     "New 5" starts over. */
  function renderSizeSort() {
    activityTitle("Sort by Size");

    var PICK_N = 5;
    // Pool in ascending size. m = characteristic size in metres, for ordering only.
    // Every size and fact below is stated in OpenStax Astronomy 2e, Chapter 1.
    var POOL = [
      { name: "The Moon, across", m: 3.476e6, size: "about 3,476 km",
        note: "Roughly a quarter of Earth’s diameter.", src: "§1.6" },
      { name: "Earth, across", m: 1.30e7, size: "about 13,000 km",
        note: "A nearly spherical planet, the third from the Sun.", src: "§1.6" },
      { name: "Earth to the Moon", m: 3.84e8, size: "about 384,000 km",
        note: "Around 30 Earth-diameters; light makes the trip in 1.3 seconds.", src: "§1.6" },
      { name: "The Sun, across", m: 1.5e9, size: "about 1.5 million km",
        note: "Earth could fit inside one of its sunspots.", src: "§1.6" },
      { name: "Earth to the Sun (1 AU)", m: 1.496e11, size: "about 150 million km",
        note: "Light takes just over 8 minutes to cross it — sunlight is always ~8 minutes old.", src: "§1.6" },
      { name: "The Sun’s planets, out to Neptune", m: 9.0e12, size: "tens of Earth–Sun distances across",
        note: "Neptune’s orbit marks the edge of the planetary system.", src: "§1.8" },
      { name: "The Sun to Proxima Centauri", m: 4.02e16, size: "4.25 light-years (over 40 trillion km)",
        note: "The nearest star beyond the Sun. If the Sun were a basketball, Proxima would be ~7,000 km away.", src: "§1.6" },
      { name: "Distance to the Orion Nebula", m: 1.32e19, size: "about 1,400 light-years",
        note: "A cloud of gas and dust where new stars are forming.", src: "§1.6" },
      { name: "Distance to the nearest galaxy", m: 6.62e20, size: "about 70,000 light-years",
        note: "A small galaxy found in 1993, hidden behind the Milky Way’s star clouds.", src: "§1.7" },
      { name: "The Milky Way, across", m: 9.46e20, size: "about 100,000 light-years",
        note: "Hundreds of billions of stars, plus gas, dust, and dark matter.", src: "§1.7" },
      { name: "Distance to the Magellanic Clouds", m: 1.51e21, size: "about 160,000 light-years",
        note: "Two small companion galaxies of the Milky Way, recorded by Magellan’s crew.", src: "§1.7" },
      { name: "Distance to the Andromeda Galaxy", m: 2.0e22, size: "a little more than 2 million light-years",
        note: "The nearest large galaxy, a spiral like ours.", src: "§1.7" },
      { name: "The Local Group, across", m: 9.5e22, size: "several million light-years",
        note: "More than 50 galaxies bound together, led by the Milky Way and Andromeda.", src: "§1.7" },
      { name: "The Virgo Supercluster, across", m: 1.04e24, size: "about 110 million light-years",
        note: "Thousands of galaxies in clusters and filaments; it contains the Local Group.", src: "§1.7" },
      { name: "Distance to the most distant quasars", m: 9.5e25, size: "10 billion or more light-years",
        note: "We see them as they were 10+ billion years ago, near the era of the Big Bang.", src: "§1.7" }
    ];
    function getPref(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
    function setPref(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

    var setMode = getPref("astro.sizesort.set", "five");     // "five" | "all"
    var inMode  = getPref("astro.sizesort.input", "drag");   // "drag" | "select"

    var round = [];      // items for this round, in shuffled display order
    var answer = [];     // the same items sorted smallest -> largest (the key)
    var arr = [];        // drag mode: current arrangement (array of item objects)
    var slots = [];      // drop-down mode: array of item | null, one per position
    var checked = false;
    var drag = null;

    // nodes reused across paints
    var listEl = h("ol", { class: "ss-list" });
    var msg = h("div", { class: "ss-msg" });
    var ctrlHost = h("div", { class: "ss-controls" });
    var answerHost = h("div");

    newRound();

    /* -------- round lifecycle -------- */
    function sameOrder(a, b) {
      for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
      return true;
    }
    function newRound() {
      var deck = shuffle(POOL);
      round = setMode === "all" ? deck : deck.slice(0, PICK_N);
      answer = round.slice().sort(function (a, b) { return a.m - b.m; });
      arr = round.slice();
      if (sameOrder(arr, answer)) arr = shuffle(arr);
      slots = answer.map(function () { return null; });
      checked = false;
      render();
    }
    function resetInputs() {
      arr = shuffle(round.slice());
      if (sameOrder(arr, answer)) arr = shuffle(arr);
      slots = answer.map(function () { return null; });
      checked = false;
      paint();
    }

    /* -------- helpers -------- */
    function factorText(small, big) {
      var r = big / small;
      if (r >= 5e5) return "roughly a million times";
      if (r >= 5e3) return "thousands of times";
      if (r >= 500) return "about " + Math.round(r / 100) + "00 times";
      if (r >= 50) return "about " + Math.round(r / 10) * 10 + " times";
      if (r >= 8) return "about " + Math.round(r) + " times";
      return "about " + (Math.round(r * 10) / 10) + " times";
    }
    function userSeq() { return inMode === "select" ? slots : arr; }
    function canCheck() {
      if (inMode !== "select") return true;
      var seen = {};
      for (var i = 0; i < slots.length; i++) {
        if (!slots[i]) return false;
        var id = round.indexOf(slots[i]);
        if (seen[id]) return false;
        seen[id] = 1;
      }
      return true;
    }
    function rightPos(it) { return answer.indexOf(it); }

    /* -------- page shell: rebuilt on a new round or a mode change -------- */
    function render() {
      var v = h("div", { class: "view" });
      v.appendChild(h("button", { class: "back-link", onclick: function () { go("activities"); },
        text: "← Activities" }));
      v.appendChild(h("div", { class: "eyebrow", text: "Hands-on activity" }));
      v.appendChild(h("h1", { text: "Sort by size" }));
      v.appendChild(h("p", { class: "tool-intro", html:
        "Arrange these from <b>smallest at the top</b> to <b>largest at the bottom</b>. Every size is " +
        "from <a href=\"#/s/1.6\">Chapter 1</a>. Press <b>Check</b> to lock it in and see the correct " +
        "order, with the reason each step is bigger." }));

      v.appendChild(h("div", { class: "card ss-modes" }, [
        h("div", { class: "ss-mode-row" }, [
          h("span", { class: "ss-mode-label", text: "Set" }),
          segControl(["5 at a time", "Whole pool (" + POOL.length + ")"], setMode === "all" ? 1 : 0, function (i) {
            setMode = i ? "all" : "five"; setPref("astro.sizesort.set", setMode); newRound();
          })
        ]),
        h("div", { class: "ss-mode-row" }, [
          h("span", { class: "ss-mode-label", text: "Answer by" }),
          segControl(["Dragging", "Drop-downs"], inMode === "select" ? 1 : 0, function (i) {
            inMode = i ? "select" : "drag"; setPref("astro.sizesort.input", inMode);
            arr = shuffle(round.slice()); slots = answer.map(function () { return null; });
            checked = false; render();
          })
        ])
      ]));

      v.appendChild(h("div", { class: "card" }, [
        h("div", { class: "ss-ends", text: "↑ smallest" }),
        listEl,
        h("div", { class: "ss-ends ss-ends-bot", text: "↓ largest" }),
        msg,
        ctrlHost
      ]));

      v.appendChild(answerHost);

      mount(v);
      window.scrollTo(0, 0);
      paint();
    }

    /* -------- redraw list + controls + answer -------- */
    function paint() {
      clear(listEl);
      if (inMode === "select") paintSelect(); else paintDrag();
      paintControls();
      paintMsg();
      paintAnswer();
    }

    function paintDrag() {
      arr.forEach(function (it, pos) {
        var li = h("li", { class: "ss-item" });
        if (checked) li.classList.add(it === answer[pos] ? "ok" : "bad");

        if (!checked) {
          var grip = h("span", { class: "ss-grip", "aria-hidden": "true", text: "⠿" });
          grip.addEventListener("pointerdown", function (e) { beginDrag(e, pos); });
          li.appendChild(grip);
        }
        li.appendChild(h("span", { class: "ss-pos", text: String(pos + 1) }));
        li.appendChild(h("span", { class: "ss-name", text: it.name }));

        if (checked) {
          li.appendChild(h("span", { class: "ss-flag",
            text: it === answer[pos] ? "✓" : "→ #" + (rightPos(it) + 1) }));
        } else {
          li.appendChild(h("span", { class: "ss-moves" }, [
            h("button", { class: "ss-move", type: "button", "aria-label": it.name + " — move up",
              text: "▲", onclick: function () { nudge(pos, -1); } }),
            h("button", { class: "ss-move", type: "button", "aria-label": it.name + " — move down",
              text: "▼", onclick: function () { nudge(pos, 1); } })
          ]));
        }
        listEl.appendChild(li);
      });
    }

    function paintSelect() {
      var count = {};
      slots.forEach(function (it) {
        if (it) { var k = round.indexOf(it); count[k] = (count[k] || 0) + 1; }
      });

      answer.forEach(function (_unused, pos) {
        var pick = slots[pos];
        var dup = pick && count[round.indexOf(pick)] > 1;
        var li = h("li", { class: "ss-item" });
        if (checked) li.classList.add(pick === answer[pos] ? "ok" : "bad");
        else if (dup) li.classList.add("bad");

        li.appendChild(h("span", { class: "ss-pos", text: String(pos + 1) }));

        if (checked) {
          li.appendChild(h("span", { class: "ss-name", text: pick ? pick.name : "—" }));
          li.appendChild(h("span", { class: "ss-flag",
            text: pick === answer[pos] ? "✓" : "should be “" + answer[pos].name + "”" }));
        } else {
          var sel = h("select", { class: "ss-select" });
          sel.addEventListener("change", function () {
            var val = sel.value;
            slots[pos] = val === "" ? null : round[Number(val)];
            paint();
          });
          sel.appendChild(h("option", { value: "", text:
            pos === 0 ? "— smallest —" :
            pos === answer.length - 1 ? "— largest —" : "— choose —" }));
          round.forEach(function (it, ri) {
            var o = h("option", { value: String(ri), text: it.name });
            if (pick === it) o.selected = true;
            sel.appendChild(o);
          });
          li.appendChild(sel);
          if (dup) li.appendChild(h("span", { class: "ss-flag", text: "used twice" }));
        }
        listEl.appendChild(li);
      });
    }

    function paintControls() {
      clear(ctrlHost);
      var newLabel = setMode === "all" ? "New shuffle" : "New 5";
      if (checked) {
        ctrlHost.appendChild(h("button", { class: "btn", type: "button", text: "Try this set again",
          onclick: resetInputs }));
        ctrlHost.appendChild(h("button", { class: "btn primary", type: "button", text: newLabel,
          onclick: newRound }));
        return;
      }
      var check = h("button", { class: "btn primary", type: "button", text: "Check",
        onclick: function () { if (canCheck()) { checked = true; paint(); } } });
      check.disabled = !canCheck();
      ctrlHost.appendChild(check);
      ctrlHost.appendChild(h("button", { class: "btn", type: "button",
        text: inMode === "select" ? "Clear menus" : "Shuffle", onclick: resetInputs }));
      ctrlHost.appendChild(h("button", { class: "btn", type: "button", text: newLabel, onclick: newRound }));
    }

    function paintMsg() {
      if (!checked) {
        msg.className = "ss-msg";
        msg.textContent = (inMode === "select" && !canCheck())
          ? "Put a different item in every slot, then press Check."
          : "";
        return;
      }
      var seq = userSeq(), right = 0;
      for (var i = 0; i < seq.length; i++) if (seq[i] === answer[i]) right++;
      msg.className = "ss-msg " + (right === answer.length ? "good" : "bad");
      msg.textContent = right === answer.length
        ? "Perfect — all " + answer.length + " in the right order."
        : right + " of " + answer.length + " in the right place. The full order and the reasons are below.";
    }

    function paintAnswer() {
      clear(answerHost);
      if (!checked) return;
      var seq = userSeq();
      var card = h("div", { class: "card" }, [
        h("h2", { text: "Correct order — smallest to largest", style: "margin-top:0" }),
        h("p", { class: "prose", style: "margin:0 0 10px", html:
          "Everything lines up by how big across, or how far away, it is — the sizes run from a few " +
          "thousand kilometres up to billions of light-years. Figures from OpenStax Astronomy 2e, Chapter 1." })
      ]);
      var ol = h("ol", { class: "ss-answer" });
      answer.forEach(function (it, i) {
        var where = seq.indexOf(it);
        var yours = where === i
          ? h("span", { class: "ss-you ok", text: "you had this right" })
          : h("span", { class: "ss-you", text: "you put it at #" + (where + 1) });
        var why = i === 0
          ? "The smallest thing here."
          : factorText(answer[i - 1].m, it.m) + " bigger than “" + answer[i - 1].name + "” above it.";
        ol.appendChild(h("li", {}, [
          h("div", { class: "ss-answer-head" }, [
            h("b", { text: it.name }),
            h("span", { class: "ss-size", text: it.size }),
            yours
          ]),
          h("div", { class: "ss-note", html: why +
            " <span class=\"ss-src\">" + it.src + "</span><br>" + it.note })
        ]));
      });
      card.appendChild(ol);
      answerHost.appendChild(card);
    }

    /* -------- reorder inputs -------- */
    function nudge(from, dir) {
      var to = from + dir;
      if (to < 0 || to >= arr.length) return;
      arr.splice(to, 0, arr.splice(from, 1)[0]);
      paint();
    }

    /* drag-and-drop via Pointer Events (one path for mouse, touch and pen).
       No re-render mid-drag: the grabbed row follows the pointer and the rest
       slide aside with a CSS transition; on release we commit and repaint. */
    function rowStep() {
      var k = listEl.children;
      if (k.length > 1) return k[1].getBoundingClientRect().top - k[0].getBoundingClientRect().top;
      return k.length ? k[0].getBoundingClientRect().height + 8 : 0;
    }
    function beginDrag(e, from) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      var mids = [];
      for (var i = 0; i < listEl.children.length; i++) {
        var r = listEl.children[i].getBoundingClientRect();
        mids.push({ el: listEl.children[i], mid: r.top + r.height / 2 });
      }
      drag = { id: e.pointerId, from: from, target: from, startY: e.clientY,
               mids: mids, step: rowStep(), li: listEl.children[from] };
      drag.li.classList.add("dragging");
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
      document.addEventListener("pointermove", moveDrag);
      document.addEventListener("pointerup", endDrag);
      document.addEventListener("pointercancel", endDrag);
    }
    function moveDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      e.preventDefault();
      var dy = e.clientY - drag.startY;
      drag.li.style.transform = "translateY(" + dy + "px)";
      var mid = drag.mids[drag.from].mid + dy, t = 0;
      for (var i = 0; i < drag.mids.length; i++) {
        if (i !== drag.from && mid > drag.mids[i].mid) t++;
      }
      if (t !== drag.target) {
        drag.target = t;
        for (var j = 0; j < drag.mids.length; j++) {
          if (j === drag.from) continue;
          var s = j < drag.from ? j : j - 1;
          drag.mids[j].el.style.transform = s >= drag.target ? "translateY(" + drag.step + "px)" : "";
        }
      }
    }
    function endDrag(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      document.removeEventListener("pointermove", moveDrag);
      document.removeEventListener("pointerup", endDrag);
      document.removeEventListener("pointercancel", endDrag);
      var from = drag.from, to = drag.target;
      for (var i = 0; i < drag.mids.length; i++) drag.mids[i].el.style.transform = "";
      drag.li.classList.remove("dragging");
      drag = null;
      if (to !== from) arr.splice(to, 0, arr.splice(from, 1)[0]);
      paint();
    }
  }

  // prev / next bar shared by the four math warm-up tool pages
  function mathToolNav(key) {
    var i = MATH_TOOLS.indexOf(key);
    var prev = MATH_TOOLS[i - 1], next = MATH_TOOLS[i + 1];
    var nav = h("div", { class: "section-nav" });
    nav.appendChild(prev
      ? h("button", { class: "btn", onclick: function () { go(TOOL_INFO[prev][0]); } },
          [h("small", { text: "← Previous" }), document.createTextNode(TOOL_INFO[prev][1])])
      : h("button", { class: "btn", onclick: function () { go("math"); } },
          [h("small", { text: "← Back" }), document.createTextNode("All math warm-ups")]));
    nav.appendChild(next
      ? h("button", { class: "btn next", onclick: function () { go(TOOL_INFO[next][0]); } },
          [h("small", { text: "Next →" }), document.createTextNode(TOOL_INFO[next][1])])
      : h("button", { class: "btn next primary", onclick: function () {
          if (CHAPTERS[3]) setActiveChapter(3); go("t/mathlab");
        } }, [h("small", { text: "Finish →" }), document.createTextNode("The Chapter 3 Formulas")]));
    return nav;
  }

  /* ---- OVERVIEW (one chapter) -------------------------------------- */
  function renderOverview() {
    pageTitle("Overview");
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("dashboard"); },
      text: "← All chapters" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Chapter " + D.meta.chapter }));
    v.appendChild(h("h1", { text: D.meta.chapterTitle }));
    v.appendChild(h("p", { class: "lede", text:
      "Work through the " + D.sections.length + " sections, review the key ideas and self-checks, then " +
      "test yourself with flashcards and the quiz." }));
    if (D.meta.pages) {
      v.appendChild(h("p", { class: "src-ref", html:
        "Adapted from <a href=\"" + (D.meta.sourceUrl || "https://openstax.org/books/astronomy-2e") +
        "\" target=\"_blank\" rel=\"noopener\">OpenStax Astronomy 2e</a>, Chapter " + D.meta.chapter +
        " — <b>" + D.meta.pages + "</b> of the printed book (PDF file-page = book page + 18)" }));
    }

    var read = readSet().length;
    var flash = flashKnownCount();
    var best = store.get("quizBest", null);
    v.appendChild(h("div", { class: "overview-stats" }, [
      stat(read + " / " + D.sections.length, "sections reviewed"),
      stat(flash + " / " + D.glossary.length, "terms learned"),
      stat(best == null ? "—" : best + "%", "best quiz score")
    ]));

    v.appendChild(h("h2", { text: "Sections" }));
    var tiles = h("div", { class: "tiles" });
    D.sections.forEach(function (s) {
      tiles.appendChild(h("button", { class: "tile", onclick: function () { go("s/" + s.id); } }, [
        h("div", { class: "t-num", text: "SECTION " + s.id }),
        h("div", { class: "t-title", text: s.title }),
        h("div", { class: "t-meta", text: "~" + s.minutes + " min read · " + s.keyIdeas.length + " key ideas" +
          (s.pages ? " · " + s.pages : "") }),
        isRead(s.id) ? h("div", { class: "t-check", text: "✓ reviewed" }) : null
      ]));
    });
    v.appendChild(tiles);

    v.appendChild(h("h2", { text: "Study tools" }));
    var ttiles = h("div", { class: "tiles" });
    (D.tools || []).forEach(function (key) {
      var info = TOOL_INFO[key];
      if (!info) return;
      ttiles.appendChild(h("button", { class: "tile", onclick: function () { go(info[0]); } }, [
        h("div", { class: "t-title", text: info[1] }),
        h("div", { class: "t-meta", text: info[2] })
      ]));
    });
    ttiles.appendChild(h("button", { class: "tile", onclick: function () { go("math"); } }, [
      h("div", { class: "t-title", text: "Math warm-ups →" }),
      h("div", { class: "t-meta", text: "Multiplication, exponents, scientific notation, rounding" })
    ]));
    v.appendChild(ttiles);

    mount(v);
  }
  function stat(n, l) { return h("div", { class: "stat" }, [h("div", { class: "n", text: n }), h("div", { class: "l", text: l })]); }

  /* ---- SECTION ------------------------------------------------------ */
  function renderSection(id) {
    var idx = D.sections.map(function (s) { return s.id; }).indexOf(id);
    var s = D.sections[idx];
    if (!s) return renderOverview();
    pageTitle("Section " + s.id + " — " + s.title);

    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Section " + s.id + " · ~" + s.minutes + " min" }));
    v.appendChild(h("h1", { text: s.title }));
    if (s.pages) {
      v.appendChild(h("p", { class: "src-ref", html:
        "<a href=\"" + (D.meta.sourceUrl || "https://openstax.org/books/astronomy-2e") +
        "\" target=\"_blank\" rel=\"noopener\">OpenStax Astronomy 2e</a>, §" + s.id + " — " +
        "<b>" + s.pages + "</b> of the printed book" }));
    }

    var prose = h("div", { class: "prose", html: s.html });
    v.appendChild(prose);

    // mount any inline interactive diagrams the section HTML asks for
    if (window.ASTRO_DIAGRAMS) {
      qsa("[data-diagram]", prose).forEach(function (el) {
        var fn = window.ASTRO_DIAGRAMS[el.getAttribute("data-diagram")];
        if (!fn) { el.parentNode && el.parentNode.removeChild(el); return; }
        try { fn(el); } catch (err) { el.parentNode && el.parentNode.removeChild(el); }
      });
    }

    // swap in any textbook figures the section HTML asks for (OpenStax, CC BY 4.0)
    qsa("[data-figure]", prose).forEach(function (el) {
      var num = el.getAttribute("data-figure");
      var fig = (D.figures || {})[num];
      if (!fig) { el.parentNode && el.parentNode.removeChild(el); return; }
      var fc = h("figure", { class: "tb-figure" }, [
        h("img", { src: "img/" + fig.file, alt: fig.alt || fig.title, loading: "lazy" }),
        h("figcaption", {}, [
          h("b", { text: "Figure " + num + " · " + fig.title + ". " }),
          document.createTextNode(fig.caption)
        ])
      ]);
      el.parentNode.replaceChild(fc, el);
    });

    v.appendChild(h("div", { class: "key-ideas" }, [
      h("h3", { text: "Key ideas" }),
      h("ul", {}, s.keyIdeas.map(function (k) { return h("li", { text: k }); }))
    ]));

    if (s.selfCheck && s.selfCheck.length) {
      var sc = h("div", { class: "selfcheck" }, [h("h3", { text: "Check yourself" })]);
      s.selfCheck.forEach(function (qa) {
        sc.appendChild(h("details", { class: "qa" }, [
          h("summary", { text: qa.q }),
          h("div", { class: "answer", text: qa.a })
        ]));
      });
      v.appendChild(sc);
    }

    /* section tools: mark read + notes */
    var readBtn = h("button", { class: "btn" });
    function paintReadBtn() {
      var r = isRead(s.id);
      readBtn.textContent = r ? "✓ Reviewed" : "Mark section as reviewed";
      readBtn.className = "btn" + (r ? " done" : " primary");
    }
    readBtn.addEventListener("click", function () { setRead(s.id, !isRead(s.id)); paintReadBtn(); });
    paintReadBtn();

    var noteKey = "notes." + s.id;
    var savedMsg = h("span", { class: "notes-saved", text: "saved" });
    var ta = h("textarea", {
      class: "notes", placeholder: "Your notes on section " + s.id + "… (saved automatically in this browser)"
    });
    ta.value = store.get(noteKey, "");
    var saveTimer;
    ta.addEventListener("input", function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        store.set(noteKey, ta.value);
        savedMsg.classList.add("show");
        setTimeout(function () { savedMsg.classList.remove("show"); }, 1200);
      }, 400);
    });

    v.appendChild(h("div", { class: "section-tools" }, [
      readBtn,
      h("label", { class: "notes-label" }, ["My notes", savedMsg]),
      ta
    ]));

    /* prev / next */
    var prev = D.sections[idx - 1], next = D.sections[idx + 1];
    var nav = h("div", { class: "section-nav" });
    nav.appendChild(prev
      ? h("button", { class: "btn", onclick: function () { go("s/" + prev.id); } },
          [h("small", { text: "← Previous" }), document.createTextNode(prev.id + "  " + prev.title)])
      : h("button", { class: "btn", onclick: function () { go("overview"); } },
          [h("small", { text: "← Back" }), document.createTextNode("Overview")]));
    nav.appendChild(next
      ? h("button", { class: "btn next", onclick: function () { setRead(s.id, true); go("s/" + next.id); } },
          [h("small", { text: "Next →" }), document.createTextNode(next.id + "  " + next.title)])
      : h("button", { class: "btn next primary", onclick: function () { setRead(s.id, true); go("quiz"); } },
          [h("small", { text: "Finish →" }), document.createTextNode("Take the quiz")]));
    v.appendChild(nav);

    mount(v);
    window.scrollTo(0, 0);
  }

  /* ---- TOOL: Scientific notation ---------------------------------- */
  function makeSciTask() {
    // random coefficient 1..9.99 with 1-3 sig digits, exponent -9..15
    var digits = 1 + Math.floor(Math.random() * 3);
    var coeff = (1 + Math.random() * 8.999);
    coeff = Number(coeff.toFixed(digits - 1));
    if (coeff < 1) coeff = 1;
    if (coeff >= 10) coeff = 9.9;
    var exp = Math.floor(Math.random() * 25) - 9; // -9 .. 15
    var toSci = Math.random() < 0.5;
    return { coeff: coeff, exp: exp, toSci: toSci, plain: expand(coeff, exp) };
  }
  // Move the decimal point k places (k>0 = right, k<0 = left); return a clean string.
  function shiftDecimal(numStr, k) {
    var s = String(numStr);
    var neg = s.charAt(0) === "-"; if (neg) s = s.slice(1);
    var parts = s.split(".");
    var intp = parts[0], frac = parts[1] || "";
    var digits = intp + frac;
    var point = intp.length + k;
    var out;
    if (point <= 0) out = "0." + new Array(-point + 1).join("0") + digits;
    else if (point >= digits.length) out = digits + new Array(point - digits.length + 1).join("0");
    else out = digits.slice(0, point) + "." + digits.slice(point);
    if (out.indexOf(".") > -1) out = out.replace(/0+$/, "").replace(/\.$/, "");
    out = out.replace(/^0+(?=\d)/, "");
    if (out.charAt(0) === ".") out = "0" + out;
    if (out === "" || out === "-") out = "0";
    return (neg ? "-" : "") + out;
  }
  // Describe a number for the "hop the dot" widget.
  function fieldFor(plain) {
    var neg = String(plain).charAt(0) === "-";
    var s = neg ? String(plain).slice(1) : String(plain);
    if (s.indexOf(".") === -1) {
      var d = s.replace(/^0+/, "") || "0";
      return { neg: neg, digits: d, dot: d.length, dir: "left", target: Math.max(0, d.length - 1) };
    }
    var parts = s.split(".");
    var intp = parts[0].replace(/^0+/, "");
    if (intp) {
      return { neg: neg, digits: intp + parts[1], dot: intp.length, dir: "left", target: intp.length - 1 };
    }
    var frac = parts[1];
    var lead = (frac.match(/^0*/) || [""])[0].length;
    return { neg: neg, digits: frac, dot: 0, dir: "right", target: lead + 1 };
  }
  // HTML for the number with a highlighted dot at the current hop position.
  function hopHTML(f, hd) {
    var pos = f.dir === "left" ? f.dot - hd : f.dot + hd;
    var ds = f.digits, body;
    var DOT = "<span class='dot' aria-hidden='true'></span>";
    if (pos <= 0) body = "0" + DOT + ds;
    else if (pos >= ds.length) body = ds + DOT;
    else body = ds.slice(0, pos) + DOT + ds.slice(pos);
    return (f.neg ? "-" : "") + body;
  }

  /* ---- rounding helpers (shared by the Rounding tool) ---- */
  function roundPlaceLabel(place) {
    if (place === "whole") return "the nearest whole number";
    if (place === "tenth") return "the nearest tenth";
    if (place === "hundredth") return "the nearest hundredth";
    if (place >= 1e6) return "the nearest million";
    if (place >= 1000) return "the nearest thousand";
    if (place >= 100) return "the nearest hundred";
    return "the nearest ten";
  }
  function fmtNum(n, d) {
    if (d && d > 0) return commas(Number(n).toFixed(d));
    return commas(String(Math.round(Number(n))));
  }
  function roundInfo(n, place) {
    var decimals = 0, step;
    if (place === "whole") { decimals = 0; step = 1; }
    else if (place === "tenth") { decimals = 1; step = 0.1; }
    else if (place === "hundredth") { decimals = 2; step = 0.01; }
    else { step = place; decimals = 0; }
    var lower = Math.round(Math.floor(n / step) * step * 1e6) / 1e6;
    var upper = Math.round((lower + step) * 1e6) / 1e6;
    var probe = step / 10;
    var digit = Math.floor((n / probe) % 10 + 1e-9) % 10;
    var roundUp = (n - lower) >= step / 2 - 1e-12;
    return {
      step: step, decimals: decimals, lower: lower, upper: upper,
      half: lower + step / 2, digit: digit, roundUp: roundUp,
      result: roundUp ? upper : lower,
      frac: Math.max(0, Math.min(1, (n - lower) / step))
    };
  }
  function numberLine(info, opts) {
    var reveal = !opts || opts.reveal !== false;   // default: show the winning side
    var winLow = reveal && !info.roundUp, winHigh = reveal && info.roundUp;
    var track = h("div", { class: "rl-track" }, [
      h("span", { class: "rl-side low" + (winLow ? " win" : "") }),
      h("span", { class: "rl-side high" + (winHigh ? " win" : "") }),
      h("span", { class: "rl-half" }),
      h("span", { class: "rl-mark", style: "left:" + (info.frac * 100) + "%" })
    ]);
    var ends = h("div", { class: "rl-ends" }, [
      h("span", { class: "rl-post" + (winLow ? " win" : ""), text: fmtNum(info.lower, info.decimals) }),
      h("span", { class: "rl-mid", text: "halfway" }),
      h("span", { class: "rl-post" + (winHigh ? " win" : ""), text: fmtNum(info.upper, info.decimals) })
    ]);
    return h("div", { class: "rl-wrap" }, [track, ends]);
  }
  // index (within the digit sequence, ignoring "." ) of the deciding digit
  function decidingDigitIndex(intLen, place) {
    if (place === "whole") return intLen;
    if (place === "tenth") return intLen + 1;
    if (place === "hundredth") return intLen + 2;
    var trailing = Math.round(Math.log(place) / Math.LN10) - 1;   // digits right of it
    return intLen - 1 - trailing;
  }
  // render a number as digit chips, optionally highlighting the deciding digit
  function bigNumber(plain, place, highlight) {
    var wrap = h("span", { class: "rn-digits" });
    var s = String(plain), neg = s.charAt(0) === "-"; if (neg) s = s.slice(1);
    var parts = s.split("."), intP = parts[0], fracP = parts[1] || "";
    var di = highlight ? decidingDigitIndex(intP.length, place) : -1;
    var idx = 0;
    if (neg) wrap.appendChild(h("span", { text: "−" }));
    for (var i = 0; i < intP.length; i++) {
      if (i > 0 && (intP.length - i) % 3 === 0) wrap.appendChild(h("span", { class: "rn-comma", text: "," }));
      wrap.appendChild(h("span", { class: "rn-d" + (idx === di ? " hi" : ""), text: intP.charAt(i) }));
      idx++;
    }
    if (fracP) {
      wrap.appendChild(h("span", { class: "rn-dot", text: "." }));
      for (var j = 0; j < fracP.length; j++) {
        wrap.appendChild(h("span", { class: "rn-d" + (idx === di ? " hi" : ""), text: fracP.charAt(j) }));
        idx++;
      }
    }
    return wrap;
  }

  /* Rounding warm-up data — worked examples + a matching-game pool. Kept here,
     not on a chapter, because Rounding is a chapter-independent math warm-up
     reachable from the dashboard whatever chapter is active. */
  var ROUND_EXAMPLES = [
    { n: 47,        place: 10,     note: "a warm-up" },
    { n: 12742,     place: 1000,   note: "Earth’s real width in km (the book rounds it to 13,000)" },
    { n: 384400,    place: 1000,   note: "the Moon’s distance in km (the book says 384,000)" },
    { n: 1372,      place: 100,    note: "a nebula’s distance in light-years" },
    { n: 149597871, place: 1e6,    note: "the Sun’s distance in km (the book says 150 million)" },
    { n: 4.246,     place: "tenth", note: "Proxima Centauri’s distance in light-years" }
  ];
  var ROUND_MATCH_POOL = [
    { n: 47, rounded: 50 }, { n: 83, rounded: 80 }, { n: 24, rounded: 20 },
    { n: 68, rounded: 70 }, { n: 95, rounded: 100 }, { n: 36, rounded: 40 },
    { n: 12, rounded: 10 }, { n: 61, rounded: 60 }, { n: 89, rounded: 90 },
    { n: 33, rounded: 30 }
  ];

  /* ---- TOOL: Rounding numbers ---- */
  function renderRound() {
    mathTitle("Rounding Numbers");
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("math"); },
      text: "← Math warm-ups" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Math warm-up · step 5" }));
    v.appendChild(h("h1", { text: "Rounding — pick the nearest tidy number" }));
    v.appendChild(h("p", { class: "tool-intro", text:
      "Astronomers say “about 13,000 km” or “about 150 million km.” Rounding is how you get those tidy " +
      "numbers: slide to the closest signpost." }));

    var modeHost = h("div");
    v.appendChild(segControl(["Show me how", "Practice", "Matching game"], 0, function (idx) {
      stopMatch();
      if (idx === 0) showExplainer();
      else if (idx === 1) showPractice();
      else showMatch();
    }));
    v.appendChild(modeHost);

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "The rule (super short)", style: "margin-top:0" }),
      h("div", { class: "prose", html:
        "<p>Two <b>signposts</b> sit on either side of your number — the tidy number just below it and the " +
        "tidy number just above it. Rounding means <b>walking to the closer signpost</b>.</p>" +
        "<p>Quick way — look at the <b>next digit</b> (the one just after the spot you're rounding to):</p>" +
        "<ul>" +
        "<li><b>5, 6, 7, 8, 9</b> &rarr; jump <b>UP</b> to the bigger signpost.</li>" +
        "<li><b>0, 1, 2, 3, 4</b> &rarr; stay <b>DOWN</b> at the smaller signpost.</li>" +
        "</ul>" +
        "<p style='margin:0'>A <b>5</b> is exactly halfway — everyone agrees to jump up.</p>" })
    ]));

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "“hundreds” vs “hundredths” — the places", style: "margin-top:0" }),
      h("div", { class: "prose", html:
        "<p>Every digit sits in a <b>place</b>, and each place has a size. The <b>dot</b> splits " +
        "<b>whole amounts</b> (on the left) from <b>little slices of one</b> (on the right).</p>" +
        "<div class='pv-wrap'><table class='pv-table'><tbody>" +
        "<tr>" +
        "<th>thousands</th><th>hundreds</th><th>tens</th><th>ones</th>" +
        "<th class='pv-dot'>•</th>" +
        "<th>tenths</th><th>hundredths</th><th>thousandths</th>" +
        "</tr><tr>" +
        "<td>1000</td><td>100</td><td>10</td><td>1</td>" +
        "<td class='pv-dot'></td>" +
        "<td>0.1</td><td>0.01</td><td>0.001</td>" +
        "</tr><tr>" +
        "<td colspan='4' class='pv-side'>&larr; whole amounts &nbsp;(each step left = 10&times; <b>bigger</b>)</td>" +
        "<td class='pv-dot'></td>" +
        "<td colspan='3' class='pv-side'>slices of 1 &nbsp;(each step right = 10&times; <b>smaller</b>) &rarr;</td>" +
        "</tr></tbody></table></div>" +
        "<ul>" +
        "<li>Left of the dot: <b>ones, tens, hundreds, thousands, millions…</b> — bigger and bigger whole numbers.</li>" +
        "<li>Right of the dot: a <b>tenth</b> is 1 cut into 10, a <b>hundredth</b> is 1 cut into 100, a " +
        "<b>thousandth</b> is 1 cut into 1000 — smaller and smaller pieces.</li>" +
        "<li>Listen for the <b>&ldquo;-ths&rdquo;</b>: <i>hundreds</i> is big; <i>hundred<b>ths</b></i> is a tiny slice on the right.</li>" +
        "</ul>" +
        "<p style='margin:0'>So <b>round to the nearest hundred</b> = tidy up to the hundreds place (left). " +
        "<b>Round to the nearest hundredth</b> = keep only as far as the hundredths place (right).</p>" })
    ]));

    v.appendChild(mathToolNav("round"));
    showExplainer();
    mount(v);

    /* -------- MODE: Show me how (animated) -------- */
    function showExplainer() {
      clear(modeHost);
      var EX = ROUND_EXAMPLES;
      var cur = EX[1] || EX[0];
      var token = 0;   // cancels a running animation when the number changes

      var picker = h("div", { class: "chip-row" });
      EX.forEach(function (ex) {
        picker.appendChild(h("button", { class: "chip",
          text: fmtNum(ex.n, ex.place === "tenth" ? 3 : ex.place === "hundredth" ? 4 : 0) + " → " + roundPlaceLabel(ex.place),
          onclick: function () { cur = ex; load(); } }));
      });

      var numEl = h("div", { class: "hop-num rn-num" });
      var msg = h("div", { class: "hop-msg" });
      var lineWrap = h("div");
      var why = h("div", { class: "hop-why" });
      var resultEl = h("div", { class: "hop-assembled" });
      var playBtn = h("button", { class: "btn big primary" });

      modeHost.appendChild(h("div", { class: "card" }, [
        h("p", { class: "hop-msg", style: "margin-top:0", text: "Pick a number, then watch it round:" }),
        picker,
        h("div", { class: "hop-stage" }, [numEl, msg, lineWrap, why, resultEl]),
        h("div", { class: "hop-controls" }, [playBtn])
      ]));
      load();

      function plainOf(n, place) {
        var dp = place === "tenth" ? 3 : place === "hundredth" ? 4 : 0;
        return dp ? Number(n).toFixed(dp) : String(Math.round(n));
      }

      function load() {
        token++;
        var tok = token;
        var info = roundInfo(cur.n, cur.place);
        var startStr = plainOf(cur.n, cur.place);

        clear(numEl); numEl.className = "hop-num rn-num";
        numEl.appendChild(bigNumber(startStr, cur.place, false));
        clear(lineWrap); lineWrap.appendChild(numberLine(info, { reveal: false }));
        msg.textContent = "Round " + commas(cur.n) + " to " + roundPlaceLabel(cur.place) + "." +
          (cur.note ? "  — " + cur.note : "");
        why.innerHTML = "";
        resultEl.innerHTML = "";
        playBtn.textContent = "▶ Round it";
        playBtn.disabled = false;
        playBtn.onclick = function () { play(tok, info, startStr); };
        setTimeout(function () { if (tok === token) play(tok, info, startStr); }, 600);
      }

      function play(tok, info, startStr) {
        if (tok !== token) return;
        playBtn.disabled = true;

        var track = qs(".rl-track", lineWrap);
        var mark = qs(".rl-mark", track);
        var low = qs(".rl-side.low", track);
        var high = qs(".rl-side.high", track);
        var half = qs(".rl-half", track);
        var mid = qs(".rl-mid", lineWrap);
        var posts = qsa(".rl-post", lineWrap);   // [lower, upper]

        // reset to "before"
        low.classList.remove("win"); high.classList.remove("win");
        posts.forEach(function (p) { p.classList.remove("win"); });
        mark.style.left = (info.frac * 100) + "%";
        clear(numEl); numEl.className = "hop-num rn-num";
        numEl.appendChild(bigNumber(startStr, cur.place, false));
        why.innerHTML = ""; resultEl.innerHTML = "";
        msg.textContent = "Here's " + commas(cur.n) + " sitting between two signposts.";

        function at(ms, fn) { setTimeout(function () { if (tok === token) fn(); }, ms); }

        at(1000, function () {
          clear(numEl); numEl.appendChild(bigNumber(startStr, cur.place, true));
          msg.textContent = "Peek at the next digit…";
          why.innerHTML = "the next digit is <b>" + info.digit + "</b>";
        });
        at(2200, function () {
          mid.classList.add("pulse");
          msg.textContent = info.roundUp
            ? info.digit + " is 5 or more → we're past halfway."
            : info.digit + " is 4 or less → we haven't reached halfway.";
        });
        at(3500, function () {
          mid.classList.remove("pulse");
          mark.style.left = (info.roundUp ? 100 : 0) + "%";
          (info.roundUp ? high : low).classList.add("win");
          msg.textContent = info.roundUp ? "So walk to the bigger signpost  →" : "←  So walk to the smaller signpost";
        });
        at(4700, function () {
          var resStr = fmtNum(info.result, info.decimals).replace(/,/g, "");
          clear(numEl); numEl.className = "hop-num rn-num done";
          numEl.appendChild(bigNumber(resStr, cur.place, false));
          posts[info.roundUp ? 1 : 0].classList.add("win");
          resultEl.innerHTML = "&asymp; <b>" + fmtNum(info.result, info.decimals) + "</b>";
          why.innerHTML = "";
          msg.textContent = "Rounded! 🎉";
        });
        at(5200, function () {
          playBtn.textContent = "↻ play again";
          playBtn.disabled = false;
          playBtn.onclick = function () { play(tok, info, startStr); };
        });
      }
    }

    /* -------- MODE: Practice -------- */
    function showPractice() {
      clear(modeHost);
      var streak = 0;
      var stars = h("div", { class: "star-row" });
      var card = h("div", { class: "card" });
      modeHost.appendChild(card);
      modeHost.appendChild(stars);

      function setStars() {
        stars.textContent = streak ? new Array(streak + 1).join("⭐") + (streak >= 5 ? "  on fire!" : "") : "";
      }
      function makeQ() {
        var places = [10, 100, 1000];
        var place = places[Math.floor(Math.random() * places.length)];
        var n = Math.floor(Math.random() * (place * 9)) + place;
        if (n % place === 0) n += Math.floor(Math.random() * (place - 1)) + 1;
        return { n: n, place: place };
      }
      function next() {
        clear(card);
        setStars();
        var q = makeQ();
        var info = roundInfo(q.n, q.place);
        card.appendChild(h("p", { class: "hop-msg", style: "margin-top:0",
          text: "Round " + commas(q.n) + " to " + roundPlaceLabel(q.place) + ". Which signpost?" }));
        var lineSlot = h("div");
        var fb = h("div", { class: "hop-msg" });
        var btnRow = h("div", { class: "hop-controls" });
        shuffle([info.lower, info.upper]).forEach(function (val) {
          var b = h("button", { class: "btn big", text: commas(val), onclick: function () {
            if (val === info.result) {
              streak++; setStars();
              b.classList.add("done-btn");
              fb.innerHTML = "🎉 yes! next digit is <b>" + info.digit + "</b> &rarr; " +
                (info.roundUp ? "UP" : "DOWN") + ". &asymp; <b>" + commas(info.result) + "</b>";
              var all = btnRow.querySelectorAll("button");
              for (var i = 0; i < all.length; i++) all[i].disabled = true;
              clear(lineSlot); lineSlot.appendChild(numberLine(info));
              card.appendChild(h("div", { class: "hop-controls" }, [
                h("button", { class: "btn big primary", text: "next →", onclick: next })
              ]));
            } else {
              streak = 0; setStars();
              b.classList.add("wrong"); b.disabled = true;
              fb.innerHTML = "not quite — the next digit is <b>" + info.digit + "</b> (" +
                (info.digit >= 5 ? "5 or more, so UP" : "4 or less, so DOWN") + ").";
            }
          } });
          btnRow.appendChild(b);
        });
        card.appendChild(btnRow);
        card.appendChild(h("div", { class: "hop-controls" }, [
          h("button", { class: "btn ghost", text: "show the number line 💡", onclick: function () {
            clear(lineSlot); lineSlot.appendChild(numberLine(info));
          } })
        ]));
        card.appendChild(lineSlot);
        card.appendChild(fb);
      }
      next();
    }

    /* -------- MODE: Matching game -------- */
    function showMatch() {
      clear(modeHost);
      var host = h("div", { class: "card" });
      modeHost.appendChild(h("p", { class: "tool-intro", text: "Match each number to its nearest ten. Tap one on each side." }));
      modeHost.appendChild(host);
      (function spin() {
        var pool = shuffle(ROUND_MATCH_POOL).slice(0, 6);
        var pairs = pool.map(function (e) { return { a: String(e.n), b: "≈ " + e.rounded }; });
        renderMatchGame(host, pairs, { leftLabel: "Number", rightLabel: "Nearest ten", onRestart: spin });
      })();
    }
  }

  /* Scientific-notation matching-game pool. Lives here (not on a chapter)
     because the Scientific Notation warm-up is chapter-independent. Every plain
     and scientific form is distinct, so each card has exactly one partner. */
  var SCI_MATCH_POOL = [
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

  function renderSci() {
    mathTitle("Scientific Notation");
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("math"); },
      text: "← Math warm-ups" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Math warm-up · step 4" }));
    v.appendChild(h("h1", { text: "Scientific notation — the dot-hopping trick" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "Picking up from <a href=\"#/t/exponents\">Exponents &amp; Roots</a>: you have the 10ⁿ side of it — " +
      "this is the whole move. Space numbers have LOTS of zeros. The trick: keep ONE digit in front of the " +
      "dot, then count how many times you hopped it. That count is the little raised number." }));

    var modeHost = h("div");
    v.appendChild(segControl(["Show me how", "Practice", "Matching game"], 0, function (idx) {
      stopMatch();
      if (idx === 0) showExplainer();
      else if (idx === 1) showPractice();
      else showMatch();
    }));
    v.appendChild(modeHost);

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Cheat sheet", style: "margin-top:0" }),
      h("div", { class: "prose", html:
        "<ul>" +
        "<li><b>Big number</b> (like 300000): hop the dot <b>left</b> to <b>3</b> — 5 hops — so <b>3 &times; 10<sup>5</sup></b>.</li>" +
        "<li><b>Tiny number</b> (like 0.004): hop the dot <b>right</b> to <b>4</b> — 3 hops — so <b>4 &times; 10<sup>-3</sup></b> (minus, because it was tiny).</li>" +
        "<li>Reading it back: <b>3 &times; 10<sup>5</sup></b> means &ldquo;3, then hop the dot 5 times&rdquo; = 300000.</li>" +
        "</ul>" +
        "<p style='margin:0'>Real ones: light speed &asymp; 3 &times; 10<sup>5</sup> km/s &nbsp;&bull;&nbsp; " +
        "one light-year &asymp; 9.46 &times; 10<sup>12</sup> km.</p>" })
    ]));

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Why is the little number + or − ?", style: "margin-top:0" }),
      h("div", { class: "prose", html:
        "<p>The little number is a <b>&ldquo;put it back&rdquo; note</b>. It tells you how to turn your " +
        "one-digit number back into the real one.</p>" +
        "<p>🔵 <b>Big number &rarr; you hopped the dot LEFT.</b> Every hop left made the number 10 times " +
        "<b>smaller</b> (300000 &rarr; 30000 &rarr; 3000&hellip;). To put it back you make it 10 times " +
        "<b>bigger</b>, that many times. Bigger = <b>plus</b>. So <b>3 &times; 10<sup>+5</sup></b> means " +
        "&ldquo;3, grown 5 times.&rdquo;</p>" +
        "<p>🟡 <b>Tiny number &rarr; you hopped the dot RIGHT.</b> Every hop right made the number 10 " +
        "times <b>bigger</b> (0.004 &rarr; 0.04 &rarr; 0.4&hellip;). To put it back you make it 10 times " +
        "<b>smaller</b>, that many times. Smaller = <b>minus</b>. So <b>4 &times; 10<sup>&minus;3</sup></b> " +
        "means &ldquo;4, shrunk 3 times.&rdquo;</p>" +
        "<p style='margin-bottom:6px'>The sign is just an arrow: <b>plus = grow</b>, <b>minus = shrink</b>. " +
        "Count up and each step multiplies by 10; count down and each step divides by 10:</p>" +
        "<pre class='exp-ladder'>10^3  = 1000\n10^2  = 100\n10^1  = 10\n10^0  = 1\n" +
        "10^-1 = 0.1     &larr; now it's tiny\n10^-2 = 0.01\n10^-3 = 0.001</pre>" })
    ]));

    v.appendChild(mathToolNav("sci"));
    showExplainer();
    mount(v);

    /* -------- MODE: Show me how -------- */
    function showExplainer() {
      clear(modeHost);
      var EX = [
        { plain: "384000",        label: "🌙 Moon · 384,000 km" },
        { plain: "150000000",     label: "☀️ Sun · 150,000,000 km" },
        { plain: "9460000000000", label: "✨ light-year · 9,460,000,000,000 km" },
        { plain: "1400",          label: "☁️ Orion Nebula · 1,400 ly" },
        { plain: "0.0000001",     label: "⚛️ an atom · 0.0000001 cm" }
      ];
      var cur = EX[0], hd = 0;

      var picker = h("div", { class: "chip-row" });
      EX.forEach(function (ex) {
        picker.appendChild(h("button", { class: "chip", text: ex.label,
          onclick: function () { cur = ex; hd = 0; paint(); } }));
      });

      var num = h("div", { class: "hop-num" });
      var msg = h("div", { class: "hop-msg" });
      var asm = h("div", { class: "hop-assembled" });
      var why = h("div", { class: "hop-why" });
      var hopBtn = h("button", { class: "btn big primary" });
      var backBtn = h("button", { class: "btn ghost", text: "↶ back one hop" });
      var autoBtn = h("button", { class: "btn big", text: "Do every hop ✨" });
      var overBtn = h("button", { class: "btn ghost", text: "Start over" });

      hopBtn.onclick = function () { var f = fieldFor(cur.plain); if (hd < f.target) hd++; paint(); };
      backBtn.onclick = function () { if (hd > 0) hd--; paint(); };
      overBtn.onclick = function () { hd = 0; paint(); };
      autoBtn.onclick = function () {
        var f = fieldFor(cur.plain);
        (function step() { if (hd < f.target) { hd++; paint(); setTimeout(step, 420); } })();
      };

      modeHost.appendChild(h("div", { class: "card" }, [
        h("p", { class: "hop-msg", style: "margin-top:0", text: "Pick a number, then tap to hop the dot:" }),
        picker,
        h("div", { class: "hop-stage" }, [num, msg, asm, why]),
        h("div", { class: "hop-controls" }, [hopBtn, backBtn, autoBtn, overBtn])
      ]));
      paint();

      function paint() {
        var f = fieldFor(cur.plain);
        hd = Math.max(0, Math.min(f.target, hd));
        var done = hd === f.target;
        var clean = shiftDecimal(cur.plain, f.dir === "left" ? -f.target : f.target);
        var sign = f.dir === "left" ? "" : "-";

        num.className = "hop-num" + (done ? " done" : "");
        if (done) num.textContent = clean;
        else num.innerHTML = hopHTML(f, hd);

        hopBtn.textContent = f.dir === "left" ? "◀ hop the dot left" : "hop the dot right ▶";
        hopBtn.disabled = done;
        backBtn.disabled = hd === 0;
        autoBtn.disabled = done;

        if (hd === 0)
          msg.textContent = f.dir === "left"
            ? "Big number. Hop the dot LEFT until just one digit is in front."
            : "Tiny number. Hop the dot RIGHT until one real digit is in front.";
        else if (!done)
          msg.textContent = "Hops so far: " + hd + " — keep going.";
        else
          msg.textContent = "🎉 One digit in front! You hopped " + f.target + " time" + (f.target === 1 ? "" : "s") + ".";

        if (done)
          asm.innerHTML = "<b>" + clean + " &times; 10<sup>" + sign + f.target + "</sup></b> &nbsp;=&nbsp; " +
            "<span class='hop-plain'>" + commas(cur.plain) + "</span>";
        else if (hd === 0)
          asm.innerHTML = "";
        else
          asm.innerHTML = "<span class='muted'>so far: " +
            shiftDecimal(cur.plain, f.dir === "left" ? -hd : hd) + " &times; 10<sup>" + sign + hd + "</sup></span>";

        var times = hd + " time" + (hd === 1 ? "" : "s");
        if (hd === 0)
          why.innerHTML = "";
        else if (f.dir === "left")
          why.innerHTML = "Dot went <b>left</b> &rarr; number got smaller &rarr; little number is " +
            "<b>+" + hd + "</b> &nbsp;(&ldquo;grow it back " + times + "&rdquo;).";
        else
          why.innerHTML = "Dot went <b>right</b> &rarr; number got bigger &rarr; little number is " +
            "<b>&minus;" + hd + "</b> &nbsp;(&ldquo;shrink it back " + times + "&rdquo;).";
      }
    }

    /* -------- MODE: Practice -------- */
    function showPractice() {
      clear(modeHost);
      var streak = 0;
      var stars = h("div", { class: "star-row" });
      var card = h("div", { class: "card" });
      modeHost.appendChild(card);
      modeHost.appendChild(stars);

      function setStars() {
        stars.textContent = streak ? new Array(streak + 1).join("⭐") + (streak >= 5 ? "  on fire!" : "") : "";
      }
      function pickNumber() {
        for (var i = 0; i < 8; i++) {
          var t = makeSciTask();
          var len = t.plain.replace(/[-.]/g, "").replace(/^0+/, "").length;
          if (Math.abs(t.exp) >= 2 && Math.abs(t.exp) <= 6 && len <= 7) return t;
        }
        return { coeff: "3.6", exp: 4, plain: "36000" };
      }
      function next() {
        clear(card);
        setStars();
        (Math.random() < 0.6 ? forward : read)(pickNumber());
      }

      function forward(t) {
        var f = fieldFor(t.plain), hd = 0;
        var num = h("div", { class: "hop-num" });
        var fb = h("div", { class: "hop-msg" });
        var hopBtn = h("button", { class: "btn big primary", text: f.dir === "left" ? "◀ hop" : "hop ▶" });
        var backBtn = h("button", { class: "btn ghost", text: "↶" });
        var hintBtn = h("button", { class: "btn ghost", text: "hint 💡" });
        var checkBtn = h("button", { class: "btn big", text: "check ✓" });
        card.appendChild(h("p", { class: "hop-msg", style: "margin-top:0",
          text: "Turn this into the shortcut. Hop the dot until one digit is in front, then press check." }));
        card.appendChild(num);
        card.appendChild(h("div", { class: "hop-controls" }, [hopBtn, backBtn, hintBtn, checkBtn]));
        card.appendChild(fb);
        draw();

        function draw() { num.className = "hop-num"; num.innerHTML = hopHTML(f, hd); }
        hopBtn.onclick = function () { if (hd < f.digits.length) { hd++; draw(); fb.textContent = "hops: " + hd; } };
        backBtn.onclick = function () { if (hd > 0) { hd--; draw(); fb.textContent = "hops: " + hd; } };
        hintBtn.onclick = function () { fb.textContent = "you need " + f.target + " hops in total"; if (hd < f.target) { hd++; draw(); } };
        checkBtn.onclick = function () {
          if (hd === f.target) {
            streak++; setStars();
            num.className = "hop-num done";
            var clean = shiftDecimal(t.plain, f.dir === "left" ? -f.target : f.target);
            fb.innerHTML = "🎉 yes! <b>" + clean + " &times; 10<sup>" + (f.dir === "left" ? "" : "-") + f.target + "</sup></b>";
            [hopBtn, backBtn, hintBtn, checkBtn].forEach(function (b) { b.disabled = true; });
            card.appendChild(h("div", { class: "hop-controls" }, [
              h("button", { class: "btn big primary", text: "next →", onclick: next })
            ]));
          } else if (hd < f.target) {
            fb.textContent = "not yet — still more than one digit in front. keep hopping (or tap hint).";
            streak = 0; setStars();
          } else {
            fb.textContent = "one hop too far — tap ↶ to step back.";
            streak = 0; setStars();
          }
        };
      }

      function read(t) {
        var correct = commas(t.plain);
        var opts = shuffle([correct, commas(shiftDecimal(t.plain, 1)), commas(shiftDecimal(t.plain, -1))]);
        var fb = h("div", { class: "hop-msg" });
        card.appendChild(h("p", { class: "hop-msg", style: "margin-top:0", html:
          "What is <b>" + t.coeff + " &times; 10<sup>" + t.exp + "</sup></b> written out?" }));
        opts.forEach(function (o) {
          var b = h("button", { class: "btn big", style: "display:block;width:100%;margin:6px 0", text: o,
            onclick: function () {
              if (o === correct) {
                streak++; setStars();
                b.classList.add("done-btn");
                fb.textContent = "🎉 that's it!";
                var all = card.querySelectorAll(".btn.big");
                for (var i = 0; i < all.length; i++) all[i].disabled = true;
                card.appendChild(h("div", { class: "hop-controls" }, [
                  h("button", { class: "btn big primary", text: "next →", onclick: next })
                ]));
              } else {
                b.disabled = true; b.classList.add("wrong");
                fb.textContent = "not that one — try again!";
                streak = 0; setStars();
              }
            } });
          card.appendChild(b);
        });
        card.appendChild(fb);
      }

      next();
    }

    /* -------- MODE: Matching game -------- */
    function showMatch() {
      clear(modeHost);
      var host = h("div", { class: "card" });
      modeHost.appendChild(h("p", { class: "tool-intro", text: "Match each number to its shortcut. Tap one on each side." }));
      modeHost.appendChild(host);
      (function spin() {
        var pool = shuffle(SCI_MATCH_POOL).slice(0, 6);
        var pairs = pool.map(function (e) { return { a: commas(e.plain), b: e.coeff + " × 10" + sup(e.exp) }; });
        renderMatchGame(host, pairs, { leftLabel: "Number", rightLabel: "Shortcut", onRestart: spin });
      })();
    }
  }

  /* ---- TOOL: Light travel time ----------------------------------- */
  function renderLight() {
    pageTitle("Light Travel Time");
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Study tool" }));
    v.appendChild(h("h1", { text: "Light travel time calculator" }));
    v.appendChild(h("p", { class: "tool-intro", text:
      "Information reaches us only as fast as light. Enter a distance and see how long its " +
      "light takes to arrive — which is how far into the past you are looking." }));

    var UNITS = {
      "km": 1,
      "AU": 149597870.7,
      "light-seconds": D.C_KM_S,
      "light-minutes": D.C_KM_S * 60,
      "light-years": D.KM_PER_LY,
      "million light-years": D.KM_PER_LY * 1e6
    };
    var valIn = h("input", { type: "number", value: "384000", min: "0", step: "any" });
    var unitSel = h("select", {}, Object.keys(UNITS).map(function (u) { return h("option", { value: u, text: u }); }));

    var result = h("div", { class: "result" });
    var scale = h("div", { class: "lt-scale" }, [h("span", { class: "fill" }), h("span", { class: "dot" })]);
    var ends = h("div", { class: "lt-ends" }, [h("span", { text: "the Moon (1.3 s)" }), h("span", { text: "quasars (~10 billion yr)" })]);
    var noteEl = h("div", { class: "prose", style: "margin-top:12px;color:var(--text-dim)" });

    var card = h("div", { class: "card" }, [
      h("div", { class: "row" }, [
        h("div", { class: "field" }, [h("label", { text: "Distance" }), valIn]),
        h("div", { class: "field" }, [h("label", { text: "Unit" }), unitSel])
      ]),
      result, scale, ends, noteEl
    ]);
    v.appendChild(card);

    var chips = h("div", { class: "chip-row" });
    D.lightPresets.forEach(function (p) {
      chips.appendChild(h("button", { class: "chip", text: p.label, onclick: function () {
        valIn.value = String(Number((p.distanceKm).toPrecision(6)));
        unitSel.value = "km";
        p._note = p.note;
        recompute(p.note);
      } }));
    });
    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Jump to…", style: "margin-top:0" }), chips
    ]));

    var LOG_MIN = Math.log(1.3);                 // ~ Moon, seconds
    var LOG_MAX = Math.log(10e9 * YEAR_SEC);     // ~ quasar, seconds

    function recompute(presetNote) {
      var val = parseFloat(valIn.value);
      if (isNaN(val) || val < 0) { clear(result); result.appendChild(h("div", { class: "sub", text: "Enter a distance." })); return; }
      var km = val * UNITS[unitSel.value];
      var seconds = km / D.C_KM_S;
      var ly = km / D.KM_PER_LY;

      clear(result);
      result.appendChild(h("div", { class: "big", text: "Light takes " + fmtDuration(seconds) }));
      result.appendChild(h("div", { class: "sub", html:
        "That is <b>" + fmtSci(km) + " km</b> = <b>" + (ly < 0.01 ? fmtSci(ly) : (ly < 1 ? ly.toPrecision(3) : commas(Math.round(ly).toString()))) +
        " light-years</b>." }));
      result.appendChild(h("div", { class: "sub", style: "margin-top:8px;color:var(--warn)", text:
        "→ You see it as it was " + fmtDuration(seconds) + " ago." }));

      var t = (Math.log(Math.max(seconds, 0.001)) - LOG_MIN) / (LOG_MAX - LOG_MIN);
      t = Math.max(0, Math.min(1, t));
      qs(".fill", scale).style.width = (t * 100) + "%";
      qs(".dot", scale).style.left = (t * 100) + "%";

      clear(noteEl);
      if (presetNote) noteEl.appendChild(h("p", { html: "<b>Context:</b> " + presetNote }));
    }

    valIn.addEventListener("input", function () { recompute(); });
    unitSel.addEventListener("change", function () { recompute(); });
    recompute("Radio round-trip ≈ 2.6 s — the delay you hear in Apollo transmissions.");
    mount(v);
  }

  /* ---- TOOL: Cosmic calendar ------------------------------------- */
  function renderCalendar() {
    pageTitle("Cosmic Calendar");
    var C = D.cosmicCalendar;
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Study tool" }));
    v.appendChild(h("h1", { text: "The cosmic calendar" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "Compress the whole history of the universe — about <b>13.8 billion years</b> — into a single " +
      "calendar year. The Big Bang is the first instant of January 1; this moment is the last second of " +
      "December 31. The calendar positions below are the ones stated in section 1.9 (idea from Carl " +
      "Sagan’s <em>The Dragons of Eden</em>)." }));

    var perSec = C.ageYears / (365 * 86400);
    v.appendChild(h("div", { class: "card" }, [
      h("div", { class: "cal-controls" }, [
        h("div", {}, [h("strong", { text: "1 calendar month" }), document.createTextNode(" ≈ " + fmtDuration((C.ageYears / 12) * YEAR_SEC))]),
        h("div", {}, [h("strong", { text: "1 day" }), document.createTextNode(" ≈ " + fmtDuration((C.ageYears / 365) * YEAR_SEC))]),
        h("div", {}, [h("strong", { text: "1 second" }), document.createTextNode(" ≈ " + Math.round(perSec).toLocaleString() + " years")])
      ])
    ]));

    var MON = ["January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"];

    // month grid — placed by each event's stated month
    var grid = h("div", { class: "cal-grid" });
    var byMonth = {};
    C.events.forEach(function (ev) {
      (byMonth[ev.monthIndex] = byMonth[ev.monthIndex] || []).push(ev);
    });
    for (var m = 0; m < 12; m++) {
      var cell = h("div", { class: "cal-month" + (byMonth[m] ? " has-event" : "") }, [
        h("div", { class: "m-name", text: MON[m].slice(0, 3) })
      ]);
      (byMonth[m] || []).forEach(function (ev) {
        cell.appendChild(h("span", { class: "m-event", text: ev.label + (ev.inChapter ? "" : " *") }));
      });
      grid.appendChild(cell);
    }
    v.appendChild(grid);

    // detailed list
    var list = h("div", { class: "cal-list" });
    list.appendChild(h("h2", { text: "Timeline", style: "margin-bottom:4px" }));
    C.events.forEach(function (ev) {
      list.appendChild(h("div", { class: "cal-row" }, [
        h("div", { class: "when", text: ev.when }),
        h("div", {}, [
          document.createTextNode(ev.label + (ev.inChapter ? "" : "  *")),
          h("span", { class: "book-note", text: ev.detail })
        ])
      ]));
    });
    v.appendChild(list);
    v.appendChild(h("p", { class: "tool-intro", style: "font-size:12px;margin-top:10px" , text:
      "*  Not mentioned in Chapter 1 — shown only for context, using the standard cosmic-calendar placement." }));

    v.appendChild(h("div", { class: "card", style: "margin-top:18px" }, [
      h("h2", { text: "The last minute of the year", style: "margin-top:0" }),
      h("p", { class: "prose", html:
        "Everything humans have ever recorded happens in the final seconds of December 31. The alphabet " +
        "is invented at the 50th second of 11:59 p.m.; modern astronomy begins a mere fraction of a " +
        "second before midnight; the amount of time we have had to study the stars is minute." })
    ]));

    mount(v);
  }

  /* ---- TOOL: Cosmic scale ladder ------------------------------- */
  function renderScale() {
    pageTitle("Cosmic Scale");
    var L = D.scaleLadder;
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Study tool" }));
    v.appendChild(h("h1", { text: "The cosmic distance ladder" }));
    v.appendChild(h("p", { class: "tool-intro", text:
      "Step outward from Earth to the edge of the observable universe. The bar uses a logarithmic " +
      "scale — each step is many times larger than the last." }));

    var i = 0;
    var LOGMIN = Math.log(L[0].sizeM) - 1;
    var LOGMAX = Math.log(L[L.length - 1].sizeM) + 0.3;

    var stage = h("div", { class: "ladder-stage" });
    var meterFill = h("span");
    var meter = h("div", { class: "ladder-meter" }, meterFill);
    var dots = h("div", { class: "ladder-dots" });
    L.forEach(function (_, k) {
      dots.appendChild(h("button", { "aria-label": "Step " + (k + 1), onclick: function () { i = k; paint(); } }));
    });

    var prevBtn = h("button", { class: "btn", text: "← Zoom in", onclick: function () { if (i > 0) { i--; paint(); } } });
    var nextBtn = h("button", { class: "btn primary", text: "Zoom out →", onclick: function () { if (i < L.length - 1) { i++; paint(); } } });
    var counter = h("div", { class: "step-count" });

    function paint() {
      var r = L[i];
      var km = r.sizeM / 1000;
      var lightStr = fmtDuration(km / D.C_KM_S);
      clear(stage);
      stage.appendChild(h("div", { class: "rung-label", text: r.label }));
      stage.appendChild(h("div", { class: "ladder-size", html:
        (r.kind === "distance" ? "Distance: " : "Size: ") + fmtSci(km) + " km &nbsp;·&nbsp; light crosses it in " + lightStr }));
      stage.appendChild(h("div", { class: "rung-detail", text: r.detail }));

      var t = (Math.log(r.sizeM) - LOGMIN) / (LOGMAX - LOGMIN);
      meterFill.style.width = Math.max(2, Math.min(100, t * 100)) + "%";
      counter.textContent = "Step " + (i + 1) + " of " + L.length;
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === L.length - 1;
      var db = dots.querySelectorAll("button");
      for (var k = 0; k < db.length; k++) db[k].classList.toggle("on", k === i);
    }

    v.appendChild(h("div", { class: "card" }, [
      stage,
      meter,
      h("div", { class: "ladder-scaleline" }, [h("span", { text: "~10,000 km" }), h("span", { text: "~10 billion light-years" })]),
      dots,
      h("div", { class: "ladder-nav" }, [prevBtn, counter, nextBtn])
    ]));

    document.addEventListener("keydown", scaleKeys);
    function scaleKeys(e) {
      if (currentHash() !== "t/scale") { document.removeEventListener("keydown", scaleKeys); return; }
      if (e.key === "ArrowLeft" && i > 0) { i--; paint(); }
      if (e.key === "ArrowRight" && i < L.length - 1) { i++; paint(); }
    }

    paint();
    mount(v);
  }

  /* ---- TOOL: Element abundance --------------------------------- */
  function renderElements() {
    pageTitle("Element Abundance");
    var els = D.elements.slice().sort(function (a, b) { return b.perMillionH - a.perMillionH; });
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Study tool" }));
    v.appendChild(h("h1", { text: "The cosmically abundant elements" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "Atoms per <b>one million hydrogen atoms</b> (Table 1.1). Hydrogen and helium overwhelm everything " +
      "else — a linear scale hides the rest, so a logarithmic view is more useful. " +
      "The four elements most common in life (H, C, N, O) are marked ✦." }));

    var logMode = true;
    var toggle = h("div", { class: "elem-toggle" }, [
      h("button", { class: "btn small primary", text: "Logarithmic", onclick: function () { logMode = true; paintToggle(); draw(); } }),
      h("button", { class: "btn small", text: "Linear", onclick: function () { logMode = false; paintToggle(); draw(); } })
    ]);
    function paintToggle() {
      var b = toggle.querySelectorAll("button");
      b[0].className = "btn small" + (logMode ? " primary" : "");
      b[1].className = "btn small" + (logMode ? "" : " primary");
    }

    var chart = h("div", { class: "elem-chart" });
    var LIFE = { H: 1, C: 1, N: 1, O: 1 };
    function draw() {
      clear(chart);
      els.forEach(function (e) {
        var w;
        if (logMode) w = (Math.log(e.perMillionH) / Math.LN10) / 6 * 100; // domain 1..1e6
        else w = e.perMillionH / 1e6 * 100;
        w = Math.max(0.4, Math.min(100, w));
        var bar = h("div", { class: "elem-bar", style: "width:0" });
        chart.appendChild(h("div", { class: "elem-row" }, [
          h("div", { class: "e-name", html: "<b>" + e.symbol + "</b> " + e.name + (LIFE[e.symbol] ? " ✦" : "") +
            " <span style='color:var(--text-faint)'>Z" + e.z + "</span>" }),
          h("div", { class: "elem-bar-track" }, bar),
          h("div", { class: "e-val", text: e.perMillionH.toLocaleString() })
        ]));
        requestAnimationFrame(function () { bar.style.width = w + "%"; });
      });
    }

    v.appendChild(h("div", { class: "card" }, [toggle, chart]));
    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Why it matters", style: "margin-top:0" }),
      h("p", { class: "prose", html:
        "The Big Bang made almost only hydrogen and helium. Every heavier element — the carbon in your " +
        "cells, the oxygen you breathe, the iron in your blood — was built inside stars and scattered " +
        "when they died. That is why those elements are thousands of times rarer than hydrogen." })
    ]));

    paintToggle();
    draw();
    mount(v);
  }

  /* ---- MATCH THE ASTRONOMERS / PHYSICISTS (Ch. 2 & 3) ----------- */
  function renderAstronomers() {
    renderPeopleMatch({
      title: "Match the Astronomers",
      heading: "Who did what?",
      intro: "The people of Chapter 2 built the story step by step — from the first guess that Earth is a ball to " +
        "the telescope that ended the argument. Read them over, then match each one to what they did.",
      people: D.astronomers || [],
      leftLabel: "Astronomer", rightLabel: "What they did"
    });
  }
  function renderPhysicists() {
    renderPeopleMatch({
      title: "Match the Physicists",
      heading: "Who worked out what?",
      intro: "Chapter 3 is a relay race: careful measurements, then the laws that explained them, then a planet " +
        "found by math alone. Read the scientists over, then match each one to what they contributed.",
      people: D.physicists || [],
      leftLabel: "Scientist", rightLabel: "What they worked out"
    });
  }
  function renderPeopleMatch(cfg) {
    pageTitle(cfg.title);
    var people = cfg.people;
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Study tool" }));
    v.appendChild(h("h1", { text: cfg.heading }));
    v.appendChild(h("p", { class: "tool-intro", html: cfg.intro }));

    var dl = h("dl", { class: "astro-list" });
    people.forEach(function (p) {
      dl.appendChild(h("dt", { text: p.name }));
      dl.appendChild(h("dd", {}, [h("b", { text: p.did + ". " }), document.createTextNode(p.more)]));
    });
    var learn = h("div", { class: "card" }, dl);

    var matchInner = h("div");
    var round = Math.min(6, people.length);
    var matchWrap = h("div", { style: "display:none" }, [
      h("p", { class: "tool-intro",
        text: "Tap a name on the left and a deed on the right. " + round + " of the " + people.length + " each round." }),
      matchInner
    ]);
    function newMatch() {
      clear(matchInner);
      if (people.length < 3) {
        matchInner.appendChild(h("div", { class: "card", text: "Not enough people to play." }));
        return;
      }
      var pairs = shuffle(people.slice()).slice(0, round).map(function (p) {
        return { a: p.name, b: p.did };
      });
      renderMatchGame(matchInner, pairs, {
        leftLabel: cfg.leftLabel, rightLabel: cfg.rightLabel, onRestart: newMatch
      });
    }

    v.appendChild(segControl(["Learn", "Match game"], 0, function (idx) {
      stopMatch();
      var gameMode = idx === 1;
      learn.style.display = gameMode ? "none" : "";
      matchWrap.style.display = gameMode ? "" : "none";
      if (gameMode) newMatch();
    }));
    v.appendChild(learn);
    v.appendChild(matchWrap);
    mount(v);
  }

  /* ---- shared: multiple-choice practice drill (streak + explain) --- */
  function mcDrill(host, questions) {
    clear(host);
    var streak = 0;
    var stars = h("div", { class: "star-row" });
    var card = h("div", { class: "card" });
    host.appendChild(card);
    host.appendChild(stars);
    function setStars() {
      stars.textContent = streak ? new Array(streak + 1).join("⭐") + (streak >= 5 ? "  on fire!" : "") : "";
    }
    var last = -1;
    function next() {
      clear(card);
      setStars();
      var qi = Math.floor(Math.random() * questions.length);
      if (questions.length > 1 && qi === last) qi = (qi + 1) % questions.length;
      last = qi;
      var Q = questions[qi];
      var opts = Q.choices.map(function (c, i) { return { t: c, ok: i === Q.answer }; });
      opts = shuffle(opts);
      card.appendChild(h("p", { class: "hop-msg", style: "margin-top:0", html: Q.q }));
      var fb = h("div", { class: "hop-msg" });
      opts.forEach(function (o) {
        var b = h("button", {
          class: "btn big", style: "display:block;width:100%;margin:6px 0;text-align:left",
          text: o.t,
          onclick: function () {
            if (o.ok) {
              streak++; setStars();
              b.classList.add("done-btn");
              fb.innerHTML = "🎉 " + (Q.why || "That’s right.");
              var all = card.querySelectorAll(".btn.big");
              for (var i = 0; i < all.length; i++) all[i].disabled = true;
              card.appendChild(h("div", { class: "hop-controls" }, [
                h("button", { class: "btn big primary", text: "next →", onclick: next })
              ]));
            } else {
              b.disabled = true; b.classList.add("wrong");
              fb.textContent = "Not that one — try again.";
              streak = 0; setStars();
            }
          }
        });
        card.appendChild(b);
      });
      card.appendChild(fb);
    }
    next();
  }

  /* ---- generic "one study tool per law" page ---------------------- */
  function renderLawTool(cfg) {
    pageTitle(cfg.title);
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: cfg.eyebrow || "Study tool · a law of Chapter 3" }));
    v.appendChild(h("h1", { text: cfg.h1 }));
    v.appendChild(h("p", { class: "tool-intro", html: cfg.intro }));

    if (cfg.explain) {
      v.appendChild(h("div", { class: "card" }, [
        h("h2", { text: "What's going on", style: "margin-top:0" }),
        h("div", { class: "prose", html: cfg.explain })
      ]));
      v.appendChild(h("p", { class: "tool-intro", style: "margin:14px 0 0", text:
        "Now try it below — watch the picture, then test yourself." }));
    }

    var modeHost = h("div");
    v.appendChild(segControl(["Show me", "Practice", "Matching game"], 0, function (idx) {
      stopMatch();
      if (idx === 0) showMe();
      else if (idx === 1) mcDrill(modeHost, cfg.questions);
      else showMatch();
    }));
    v.appendChild(modeHost);

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "The law in one line", style: "margin-top:0" }),
      h("div", { class: "prose", html: cfg.recap })
    ]));

    showMe();
    mount(v);

    function showMe() {
      clear(modeHost);
      if (cfg.showLead) modeHost.appendChild(h("p", { class: "tool-intro", html: cfg.showLead }));
      var dg = h("div");
      modeHost.appendChild(dg);
      var fn = window.ASTRO_DIAGRAMS && window.ASTRO_DIAGRAMS[cfg.diagram];
      if (fn) { try { fn(dg); } catch (e) { dg.appendChild(h("p", { class: "tool-intro", text: "(diagram unavailable)" })); } }
    }
    function showMatch() {
      clear(modeHost);
      var host = h("div", { class: "card" });
      modeHost.appendChild(h("p", { class: "tool-intro", text: "Tap one on each side to pair them up." }));
      modeHost.appendChild(host);
      (function spin() {
        var pool = shuffle((D[cfg.matchKey] || []).slice());
        var pairs = pool.slice(0, Math.min(6, pool.length)).map(function (m) { return { a: m.a, b: m.b }; });
        renderMatchGame(host, pairs, { leftLabel: cfg.matchLabels[0], rightLabel: cfg.matchLabels[1], onRestart: spin });
      })();
    }
  }

  var LAW_TOOLS = {
    kepler1: {
      title: "Kepler’s First Law",
      h1: "Kepler’s 1st law — orbits are ellipses",
      intro: "Every planet travels on an <b>ellipse</b> — a squashed circle — with the <b>Sun at one focus</b>.",
      explain:
        "<p><b>This law is about the shape of an orbit.</b> A planet does not go around the Sun in a perfect " +
        "circle — it goes around a slightly squashed circle called an <b>ellipse</b>.</p>" +
        "<p>An ellipse has <b>two special points inside it</b> (called foci). The Sun sits on one of them; the " +
        "other is just empty space. Pick any spot on the ellipse, measure the distance to each of those two " +
        "points, and add them — you always get the <b>same total</b>. That constant total is what makes the " +
        "shape an ellipse.</p>" +
        "<p><b>Why it matters:</b> because the Sun is off to one side, the planet is sometimes closer to it and " +
        "sometimes farther — and that sets up Kepler's 2nd law.</p>",
      diagram: "ellipse",
      showLead: "Tap a shape and watch the planet go around. The two lines to the pins always add to the same total.",
      matchKey: "law1match", matchLabels: ["Word", "What it means"],
      recap: "<b>Kepler’s 1st law:</b> every planet’s orbit is an <b>ellipse</b> with the <b>Sun at one focus</b> " +
        "(the other focus is empty). How stretched the ellipse is is called its <b>eccentricity</b> — 0 is a " +
        "circle; the planets’ orbits are all close to circular.",
      questions: [
        { q: "Where is the Sun in a planet’s orbit?", choices: ["At one focus of the ellipse", "At the exact centre", "On the edge of the orbit", "Outside the orbit"], answer: 0, why: "The Sun sits at one focus; the other focus is just empty space." },
        { q: "An ellipse with an eccentricity of 0 is really a…", choices: ["Circle", "Straight line", "Parabola", "Very long oval"], answer: 0, why: "Eccentricity 0 means the two foci meet in the middle — that’s a circle." },
        { q: "For any point on an ellipse, the two distances to the foci always…", choices: ["Add up to the same total", "Are equal to each other", "Add up to zero", "Keep changing"], answer: 0, why: "That constant total is exactly what makes the shape an ellipse." },
        { q: "Which planet’s orbit is the most stretched (highest eccentricity)?", choices: ["Mercury", "Earth", "Jupiter", "Neptune"], answer: 0, why: "Mercury’s eccentricity is about 0.21; every other planet is under 0.1." },
        { q: "The “semimajor axis” of an orbit is…", choices: ["Half the longest way across — the orbit’s size", "The gap between the two foci", "The planet’s speed", "The width of the Sun"], answer: 0, why: "It also equals the planet’s average distance from the Sun." },
        { q: "Real planet orbits are…", choices: ["Ellipses, but only a little squished", "Perfect circles", "Very long thin ovals", "Square-ish"], answer: 0, why: "Their eccentricities are small, so they look almost circular." }
      ]
    },
    kepler2: {
      title: "Kepler’s Second Law",
      h1: "Kepler’s 2nd law — equal areas in equal times",
      intro: "A planet moves <b>fast when it is close to the Sun</b> and <b>slow when it is far away</b> — " +
        "so the Sun–planet line always sweeps the same area in the same time.",
      explain:
        "<p><b>This law is about a planet's speed.</b> Draw a line from the Sun to the planet. As the planet " +
        "moves along its orbit, that line sweeps across space like a windshield wiper, painting a slice.</p>" +
        "<p>Kepler's rule: <b>in the same amount of time, the line always paints the same-sized slice</b>. " +
        "Close to the Sun the line is short, so the planet has to <b>race</b> around to paint a full slice. " +
        "Far from the Sun the line is long, so it can <b>crawl</b> and still paint the same slice.</p>" +
        "<p><b>Everyday version:</b> a spinning skater speeds up when they pull their arms in tight.</p>",
      diagram: "kepler-2nd",
      showLead: "Just watch. The two shaded slices are the same size.",
      matchKey: "law2match", matchLabels: ["Situation", "What happens"],
      recap: "<b>Kepler’s 2nd law:</b> the line from the Sun to a planet sweeps out <b>equal areas in equal " +
        "times</b>. So the planet is <b>fastest at perihelion</b> (closest) and <b>slowest at aphelion</b> " +
        "(farthest). It’s really conservation of angular momentum.",
      questions: [
        { q: "A planet moves FASTEST when it is…", choices: ["Closest to the Sun (perihelion)", "Farthest from the Sun (aphelion)", "Exactly halfway", "It’s always the same speed"], answer: 0, why: "Close in, the Sun–planet line is short, so the planet must swing through a wide arc to sweep the same area." },
        { q: "A planet moves SLOWEST when it is…", choices: ["Farthest from the Sun", "Closest to the Sun", "Crossing in front of the Sun", "Behind the Sun"], answer: 0, why: "Far out, a long thin slice covers the same area with much less motion." },
        { q: "In equal amounts of time, the Sun–planet line sweeps out equal…", choices: ["Areas", "Angles", "Distances", "Speeds"], answer: 0, why: "That’s the law — equal areas in equal times." },
        { q: "On a perfectly circular orbit, a planet’s speed is…", choices: ["The same all the way around", "Fastest at the top", "Always changing", "Zero"], answer: 0, why: "The Sun–planet line never changes length, so the speed stays steady." },
        { q: "Kepler’s second law is really an example of conservation of…", choices: ["Angular momentum", "Mass", "Heat", "Charge"], answer: 0, why: "As the planet nears the Sun its distance shrinks, so its speed must rise to keep angular momentum constant." },
        { q: "Comets have very stretched orbits, so they spend most of their time…", choices: ["Far from the Sun, moving slowly", "Near the Sun, moving fast", "Sitting still", "Going backwards"], answer: 0, why: "By the equal-area rule they crawl through the far part of the orbit and whip through perihelion." }
      ]
    },
    newton1: {
      title: "Newton’s First Law",
      h1: "Newton’s 1st law — inertia",
      intro: "With <b>no outside force</b>, a thing that is still stays still, and a thing that is moving " +
        "keeps moving in a straight line at the same speed.",
      explain:
        "<p><b>Things keep doing what they are already doing.</b> Something sitting still stays still. Something " +
        "moving keeps moving — same speed, same straight line, <b>forever</b> — until a push or a pull changes it.</p>" +
        "<p>On Earth, moving things seem to slow down and stop by themselves. They don't: <b>friction</b> and air " +
        "are quietly pushing back. Take those away, like in space, and a tossed object just drifts on and on.</p>" +
        "<p><b>Why it matters:</b> a planet needs nothing to <i>keep</i> it moving. Gravity's only job is to " +
        "<b>bend</b> its straight-line path into a loop.</p>",
      diagram: "inertia",
      showLead: "Same push every time — only the surface changes.",
      matchKey: "n1match", matchLabels: ["Situation", "Force needed?"],
      recap: "<b>Newton’s 1st law (inertia):</b> motion keeps going on its own. A force is only needed to " +
        "<b>change</b> motion — to start, stop, speed up, slow down, or turn. On Earth, <b>friction</b> is " +
        "usually the force that slows things down. Momentum = mass × velocity.",
      questions: [
        { q: "With NO force on it, a moving object will…", choices: ["Keep moving in a straight line at the same speed", "Slowly stop on its own", "Speed up", "Fall down"], answer: 0, why: "That’s inertia — motion continues unless a force changes it." },
        { q: "You roll a ball across the floor and it stops. What stopped it?", choices: ["Friction", "It got tired", "Gravity pulling it back", "Nothing — balls just stop"], answer: 0, why: "Friction is the outside force. On smoother ground the ball rolls farther." },
        { q: "You throw a wrench in deep space. It will…", choices: ["Keep drifting forever", "Slow down and stop", "Turn around and come back", "Speed up"], answer: 0, why: "Almost nothing to rub against, so no force changes its motion." },
        { q: "Momentum depends on an object’s mass and its…", choices: ["Velocity (speed and direction)", "Colour", "Temperature", "Age"], answer: 0, why: "Momentum = mass × velocity." },
        { q: "Newton’s first law is also called the law of…", choices: ["Inertia", "Gravity", "Action and reaction", "Equal areas"], answer: 0, why: "Inertia is the tendency to keep doing what you’re already doing." },
        { q: "A book sits still on a table. To make it start moving you need…", choices: ["A force — a push or a pull", "Just to wait", "More time", "Nothing"], answer: 0, why: "Rest stays rest until a force acts." }
      ]
    },
    newton2: {
      title: "Newton’s Second Law",
      h1: "Newton’s 2nd law — force makes things speed up",
      intro: "A force changes how something moves. The rule is <b>a = force ÷ mass</b>: push harder to speed " +
        "up faster; heavier things speed up slower.",
      explain:
        "<p><b>This law links how hard you push to how fast something speeds up.</b> A force is a push or a " +
        "pull. It does not set a speed — it sets how <b>quickly the speed changes</b> (that change is called " +
        "acceleration).</p>" +
        "<p>Two knobs control it: <b>push harder → speeds up faster</b>, and <b>heavier object → speeds up " +
        "slower</b>. Written out: acceleration = force ÷ mass.</p>" +
        "<p><b>Everyday version:</b> the same shove sends a shopping trolley flying but barely rocks a car.</p>",
      diagram: "force-mass",
      showLead: "Pick a push and a box, and watch how fast it gets going.",
      matchKey: "n2match", matchLabels: ["Change", "Result"],
      recap: "<b>Newton’s 2nd law:</b> <b>a = F ÷ m</b>. Twice the force → twice the acceleration. Twice the " +
        "mass → half the acceleration. A force is what starts, stops, speeds up, slows down, or turns a thing.",
      questions: [
        { q: "Same push on a pen and on a heavy textbook — which speeds up more?", choices: ["The pen", "The textbook", "They tie", "Neither moves"], answer: 0, why: "Less mass means more acceleration for the same force." },
        { q: "You push twice as hard on the same box. It now speeds up…", choices: ["Twice as fast", "Half as fast", "The same", "Not at all"], answer: 0, why: "Acceleration is proportional to the force." },
        { q: "Same push, but the box is twice as heavy. It speeds up…", choices: ["Half as fast", "Twice as fast", "The same", "Backwards"], answer: 0, why: "Double the mass → half the acceleration." },
        { q: "To change an object’s direction you need…", choices: ["A force", "Only time", "Nothing", "Less mass"], answer: 0, why: "Turning is a change of motion, so it needs a force." },
        { q: "Acceleration equals…", choices: ["Force divided by mass", "Force times mass", "Mass divided by force", "Force plus mass"], answer: 0, why: "a = F ÷ m." },
        { q: "A rocket burns more fuel and pushes harder. Its acceleration…", choices: ["Goes up", "Goes down", "Stays the same", "Becomes zero"], answer: 0, why: "More force on the same rocket → more acceleration." }
      ]
    },
    newton3: {
      title: "Newton’s Third Law",
      h1: "Newton’s 3rd law — every push has a push back",
      intro: "If you push on something, it pushes back on you <b>just as hard</b>, the opposite way. " +
        "Forces always come in pairs.",
      explain:
        "<p><b>Every push comes with a push back.</b> If A pushes on B, then B pushes on A <b>exactly as " +
        "hard</b>, in the opposite direction. You cannot push on something without it pushing back.</p>" +
        "<p>The two pushes land on <b>different objects</b>, so they don't cancel out. A rocket pushes its " +
        "exhaust gas down; the gas pushes the rocket up — that is what lifts it, no air needed.</p>" +
        "<p><b>Why it matters:</b> the Sun pulls Earth, and Earth pulls the Sun back <i>just as hard</i>. The " +
        "Sun barely budges only because it is so much heavier.</p>",
      diagram: "action-reaction",
      showLead: "Tap a situation to see the two equal, opposite pushes.",
      matchKey: "n3match", matchLabels: ["Action", "Reaction"],
      recap: "<b>Newton’s 3rd law:</b> for every action there is an <b>equal and opposite reaction</b>. That " +
        "pair of forces is why a rocket can push on nothing but its own exhaust and still fly.",
      questions: [
        { q: "A rocket engine pushes gas out the back. The gas pushes the rocket…", choices: ["Forward, just as hard", "Backward", "Sideways", "Not at all"], answer: 0, why: "Every action has an equal and opposite reaction." },
        { q: "A swimmer pushes water backward. The water…", choices: ["Pushes the swimmer forward", "Pushes the swimmer down", "Does nothing", "Pulls the swimmer back"], answer: 0, why: "The push and the push-back are equal and opposite." },
        { q: "Forces in nature always come in…", choices: ["Equal, opposite pairs", "Threes", "Single pushes", "Random amounts"], answer: 0, why: "If A pushes B, then B pushes A just as hard the other way." },
        { q: "Earth pulls you down with gravity. You pull Earth…", choices: ["Up, just as hard", "Not at all", "Down too", "Sideways"], answer: 0, why: "The forces are equal — but Earth is so massive it barely moves." },
        { q: "When you jump off a small boat toward the dock, the boat…", choices: ["Shoots backward", "Stays put", "Follows you", "Sinks"], answer: 0, why: "You push the boat back as you push yourself forward." },
        { q: "Why can a rocket work in empty space with no air to push on?", choices: ["It pushes its own exhaust, and the exhaust pushes back", "It grabs onto starlight", "It can’t — that’s a myth", "It pushes on gravity"], answer: 0, why: "The action–reaction pair is between the rocket and its exhaust — no air needed." }
      ]
    },
    gravitation: {
      title: "Universal Gravitation",
      h1: "Newton’s law of gravitation — every mass pulls every mass",
      intro: "Any two objects with mass pull on each other. <b>More mass → stronger pull. Farther apart → " +
        "much weaker</b> (twice as far is only a quarter as strong).",
      explain:
        "<p><b>This law says what sets the strength of gravity.</b> Every object with mass pulls on every " +
        "other one. Two things decide how strong that pull is:</p>" +
        "<ul>" +
        "<li><b>Mass</b> — more mass on either side means a stronger pull. Double one mass and the pull doubles.</li>" +
        "<li><b>Distance</b> — farther apart is much weaker, and it drops off <i>fast</i>: twice as far is only a " +
        "<b>quarter</b> of the pull, three times as far is a <b>ninth</b>.</li>" +
        "</ul>" +
        "<p>The pull never quite reaches zero, no matter how far apart the two objects get.</p>",
      diagram: "gravity-pull",
      showLead: "Change the masses and the distance, and watch the pull bar.",
      matchKey: "gravmatch", matchLabels: ["Change", "Pull becomes"],
      recap: "<b>Universal gravitation:</b> <b>F = G · m₁ · m₂ ÷ R²</b>. The pull grows with each mass and " +
        "falls off as the <b>square</b> of the distance: 2× farther → 1/4, 3× farther → 1/9. It gets tiny " +
        "with distance but never reaches zero.",
      questions: [
        { q: "Move two objects twice as far apart. The gravity between them becomes…", choices: ["1/4 as strong", "1/2 as strong", "2× as strong", "The same"], answer: 0, why: "Inverse-square law: 2× distance → 1/2² = 1/4." },
        { q: "Move them three times as far apart. Gravity becomes…", choices: ["1/9 as strong", "1/3 as strong", "1/6 as strong", "3× as strong"], answer: 0, why: "1/3² = 1/9." },
        { q: "Double the mass of one object (same distance). Gravity…", choices: ["Doubles", "Halves", "Stays the same", "Goes to zero"], answer: 0, why: "Force is proportional to each mass." },
        { q: "Does gravity ever drop all the way to zero as you move away?", choices: ["No — it gets tiny but never zero", "Yes, past the Moon", "Yes, at the edge of the solar system", "Yes, right away"], answer: 0, why: "It weakens fast but keeps acting at any distance." },
        { q: "The Moon is about 60 Earth-radii away, so its fall toward Earth is…", choices: ["About 3600× weaker than at the surface", "60× weaker", "The same", "3600× stronger"], answer: 0, why: "60² = 3600 — inverse-square again." },
        { q: "What two things set the strength of gravity between two objects?", choices: ["Their masses and the distance between them", "Their colours and shapes", "Their temperatures", "Their speeds"], answer: 0, why: "F = G · m₁ · m₂ ÷ R²." }
      ]
    }
  };

  var CH4_TOOLS = {
    skycoords: {
      title: "Earth and Sky",
      eyebrow: "Study tool · Chapter 4",
      h1: "Mapping Earth and mapping the sky",
      intro: "Earth's surface and the whole sky both get pinned down the same way: <b>two coordinates</b>, each " +
        "measured from its own zero-line.",
      explain:
        "<p><b>On Earth</b>, <span class=\"term\">longitude</span> counts degrees east or west of the Prime " +
        "Meridian (0°, through Greenwich, England); <span class=\"term\">latitude</span> counts degrees north or " +
        "south of the equator.</p>" +
        "<p><b>In the sky</b>, the same idea repeats with new names: <span class=\"term\">right ascension</span> " +
        "counts east from the vernal equinox (in degrees, or in hours — 15° = 1 hour); " +
        "<span class=\"term\">declination</span> counts north or south of the celestial equator, exactly like " +
        "latitude.</p>" +
        "<p><b>Why it matters:</b> the farther north you stand, the higher the sky's spin point (the celestial " +
        "pole) climbs above your horizon — which is exactly why some stars never set at high latitudes, but " +
        "every star rises and sets at the equator.</p>",
      diagram: "sky-latitude",
      showLead: "Drag the slider to walk north from the equator, and watch the sky's spin point climb.",
      matchKey: "coordsmatch", matchLabels: ["Term", "Meaning"],
      recap: "<b>Earth:</b> longitude (east–west, from Greenwich) and latitude (north–south, from the equator). " +
        "<b>Sky:</b> right ascension (east–west, from the vernal equinox) and declination (north–south, from the " +
        "celestial equator). The higher your latitude, the higher the celestial pole sits in your sky.",
      questions: [
        { q: "Longitude is measured from…", choices: ["The Prime Meridian at Greenwich, England", "The North Pole", "The vernal equinox", "The equator"], answer: 0, why: "0° longitude was set, by international agreement, through the Royal Observatory in Greenwich." },
        { q: "Declination is the sky's version of…", choices: ["Latitude", "Longitude", "Altitude", "Time zone"], answer: 0, why: "Both are measured north or south from an equator — Earth's for latitude, the celestial one for declination." },
        { q: "Right ascension is zeroed at…", choices: ["The vernal equinox", "Greenwich, England", "The north celestial pole", "Whatever star is brightest"], answer: 0, why: "The vernal equinox — where the Sun's path crosses the celestial equator — plays the same role for RA that Greenwich plays for longitude." },
        { q: "15° of right ascension equals how much time?", choices: ["1 hour", "1 minute", "1 day", "15 minutes"], answer: 0, why: "The full 360° circle takes 24 hours, so 360° ÷ 24 = 15° per hour." },
        { q: "A great circle on a sphere is one whose center is…", choices: ["The sphere's own center", "Always the North Pole", "On the sphere's surface", "Outside the sphere"], answer: 0, why: "That's the definition — Earth's equator and every meridian are great circles for exactly this reason." },
        { q: "The farther north you stand on Earth, the …", choices: ["Higher the celestial pole sits in your sky", "Lower the celestial pole sits in your sky", "Faster the stars appear to move", "Fewer stars you can see in total"], answer: 0, why: "At the North Pole the celestial pole sits at the zenith (90° up); at the equator it sits right on the horizon (0°)." }
      ]
    },
    seasons: {
      title: "The Seasons",
      eyebrow: "Study tool · Chapter 4",
      h1: "Why Earth has seasons",
      intro: "It isn't distance — Earth's Sun-distance barely changes all year. The seasons come from the " +
        "<b>23.5° tilt</b> of Earth's axis, which keeps pointing the same way in space all year long.",
      explain:
        "<p><b>This is about which way Earth leans.</b> As Earth orbits the Sun, its tilted axis sometimes " +
        "points a hemisphere toward the Sun and sometimes away — and that fixed lean, not distance, drives the " +
        "seasons.</p>" +
        "<p>Leaning toward the Sun helps in two ways at once: sunlight lands more <b>directly</b> (more " +
        "concentrated, like a flashlight aimed straight at a wall instead of at an angle), and the Sun stays up " +
        "<b>longer</b> each day.</p>" +
        "<p><b>The numbers:</b> at the June solstice the Sun stands overhead at noon on the Tropic of Cancer " +
        "(23° N), and everywhere within 23° of the North Pole gets 24-hour daylight. At the equinoxes the Sun " +
        "sits on the celestial equator and everywhere gets close to 12 hours of each.</p>",
      diagram: "seasons",
      showLead: "Press Play, or jump to a month, and watch which half of Earth leans toward the Sun.",
      matchKey: "seasonsmatch", matchLabels: ["Idea", "What's true"],
      recap: "<b>Seasons come from Earth's 23.5° axial tilt</b>, not from changing distance (which varies only " +
        "~3%, and Earth is actually closest to the Sun in January). A hemisphere leaning toward the Sun gets " +
        "more direct sunlight AND longer days. At the equinoxes (~Mar 21, ~Sep 21), neither hemisphere is " +
        "favored.",
      questions: [
        { q: "What actually causes Earth's seasons?", choices: ["The 23.5° tilt of Earth's rotation axis", "Earth moving closer to and farther from the Sun", "Changes in the Sun's brightness", "The Moon's gravity"], answer: 0, why: "Earth's axis keeps pointing the same direction in space, so each hemisphere alternately leans toward and away from the Sun over the year." },
        { q: "In which month is Earth actually closest to the Sun?", choices: ["January", "June", "September", "It stays exactly the same all year"], answer: 0, why: "Perihelion falls in January — the middle of Northern Hemisphere winter, which rules out distance as the cause of the seasons." },
        { q: "Leaning toward the Sun warms a hemisphere in two ways: more direct sunlight, and…", choices: ["More hours of daylight", "A shorter year", "Colder nights", "A closer Moon"], answer: 0, why: "The Sun is also above the horizon longer each day, giving it more time to heat the ground." },
        { q: "At the June solstice, the Sun stands directly overhead at noon on the…", choices: ["Tropic of Cancer (23° N)", "Equator (0°)", "Arctic Circle (67° N)", "Tropic of Capricorn (23° S)"], answer: 0, why: "23° N is exactly Earth's tilt angle, which is why the overhead Sun reaches that latitude and no farther north." },
        { q: "At an equinox, roughly how many hours of daylight does most of Earth get?", choices: ["12 hours", "24 hours", "6 hours", "0 hours"], answer: 0, why: "At the equinoxes the Sun sits on the celestial equator, splitting day and night close to evenly everywhere." },
        { q: "Why is late summer usually hotter than the solstice itself, even though the solstice has the most daylight?", choices: ["Land and water absorb heat slowly, so warming lags behind the peak sunlight", "The Sun is closer to Earth in August", "Earth's tilt grows over the summer", "There is less cloud cover in August"], answer: 0, why: "The same reason a pond is warmest in the late afternoon, not at sunrise — oceans and land take weeks to catch up to the Sun's peak input." }
      ]
    },
    keepingtime: {
      title: "Keeping Time",
      eyebrow: "Study tool · Chapter 4",
      h1: "Solar days, sidereal days, and time zones",
      intro: "Clocks track the <b>Sun</b>. Astronomers also track the <b>stars</b> — and the two clocks slowly " +
        "drift apart.",
      explain:
        "<p><b>Two different \"days.\"</b> The <span class=\"term\">solar day</span> — the ordinary 24-hour day " +
        "— is Earth's rotation measured against the Sun. The <span class=\"term\">sidereal day</span> is " +
        "Earth's rotation measured against the distant stars, and it's about <b>4 minutes shorter</b>: because " +
        "Earth also slides along its orbit each day, it has to spin a little extra to bring the Sun back " +
        "overhead.</p>" +
        "<p>Since ordinary clocks track the (longer) solar day, the stars drift <b>4 minutes earlier</b> every " +
        "single night — about 2 hours a month.</p>" +
        "<p><b>Why time zones exist:</b> true \"Sun time\" (apparent solar time) changes with every step east or " +
        "west, which would force constant clock-resetting. <span class=\"term\">Standard time zones</span> let " +
        "a whole region share one clock; the <span class=\"term\">International Date Line</span>, near " +
        "180° longitude, is where the calendar date itself has to jump by a day.</p>",
      diagram: "star-rise-calc",
      showLead: "Slide to pick how many days from now, and watch a star's rising time creep earlier.",
      matchKey: "timematch", matchLabels: ["Term", "Meaning"],
      recap: "<b>Solar day</b> (Sun) is about 4 minutes <b>longer</b> than the <b>sidereal day</b> (stars), " +
        "because Earth's own orbital motion means it must rotate a bit extra to catch the Sun. That's why stars " +
        "rise about 4 minutes earlier every night. Standard time zones and the International Date Line exist to " +
        "keep a single, sane clock system going all the way around a round Earth.",
      questions: [
        { q: "Which is longer: the solar day or the sidereal day?", choices: ["The solar day, by about 4 minutes", "The sidereal day, by about 4 minutes", "They are exactly equal", "The solar day, by about 4 hours"], answer: 0, why: "Earth must rotate a little extra each day to bring the Sun back overhead, since it has also moved along its orbit." },
        { q: "Because of the solar/sidereal difference, a given star rises…", choices: ["About 4 minutes earlier each night", "About 4 minutes later each night", "At exactly the same time every night", "Only once a year"], answer: 0, why: "Clocks track the (longer) solar day, so stars drift earlier and earlier relative to clock time — about 2 hours a month." },
        { q: "Apparent solar time is inconvenient for clocks mainly because…", choices: ["It doesn't advance at a perfectly constant rate", "It only works at the equator", "It requires satellites", "It resets every leap year"], answer: 0, why: "Earth's elliptical orbit and axial tilt make the Sun's apparent daily motion slightly uneven through the year." },
        { q: "What problem do standard time zones solve?", choices: ["Constantly resetting your watch as you move east or west", "The difference between the day and the month", "The tilt of Earth's axis", "The Moon's changing phases"], answer: 0, why: "Without zones, true solar noon (and so 'correct' clock time) would change with every small change in longitude." },
        { q: "Where does the International Date Line run, and why there?", choices: ["Near 180° longitude, mostly through the Pacific Ocean, to affect the fewest people", "Through Greenwich, England", "Along the equator", "Through the Arctic Circle"], answer: 0, why: "It jogs around island groups and Alaska but otherwise follows the 180° meridian, chosen because it crosses mostly open ocean." },
        { q: "Crossing the date line traveling eastward, you should:", choices: ["Subtract a day from the calendar", "Add a day to the calendar", "Change your time zone but not the date", "Nothing changes"], answer: 0, why: "Traveling east keeps advancing your clock time, so crossing the line you compensate by moving the calendar date back a day." }
      ]
    },
    calendar4: {
      title: "The Calendar",
      eyebrow: "Study tool · Chapter 4",
      h1: "Julian, Gregorian, and the leap year",
      intro: "The day, month, and year don't divide evenly into each other — so every calendar needs a rule for " +
        "sneaking in the leftover time. The <b>leap year</b> is that rule.",
      explain:
        "<p>Earth's real year is <b>365.2422 days</b> — not a whole number. Julius Caesar's " +
        "<span class=\"term\">Julian calendar</span> approximated this with 365 days plus one extra day every " +
        "<b>4th year</b>, averaging 365.25 days — close, but about <b>11 minutes a year too long</b>.</p>" +
        "<p>Over centuries, those 11 minutes piled up until the spring equinox had drifted 10 days off course by " +
        "<b>1582</b>. Pope Gregory XIII's fix: drop 10 days at once, and sharpen the rule so a " +
        "<b>century year is a leap year only if it's divisible by 400</b>. That's why 1700, 1800, and 1900 were " +
        "<em>not</em> leap years, but 1600 and 2000 were.</p>" +
        "<p>The resulting <span class=\"term\">Gregorian calendar</span> averages 365.2425 days — accurate to " +
        "about 1 day in 3,300 years.</p>",
      diagram: "leapyear-check",
      showLead: "Type any year and watch the Gregorian rule work out whether it's a leap year.",
      matchKey: "calendarmatch", matchLabels: ["Term", "Meaning"],
      recap: "<b>Leap year rule:</b> divisible by 4 → leap year, UNLESS it's a century year (divisible by 100), " +
        "in which case it's a leap year only if also divisible by <b>400</b>. This fixed the Julian calendar's " +
        "11-minutes-a-year overshoot, first patched by Pope Gregory XIII in 1582.",
      questions: [
        { q: "The Julian calendar's leap-year rule added an extra day…", choices: ["Every 4th year", "Every 10th year", "Every 100th year", "Every leap century only"], answer: 0, why: "One extra day every fourth year brought the Julian average to 365.25 days per year." },
        { q: "Why did the calendar need reform by 1582?", choices: ["The Julian year was about 11 minutes too long, and the error had accumulated for centuries", "People had forgotten how to count days", "The Moon's orbit had changed", "Julius Caesar's original calendar had no leap years at all"], answer: 0, why: "365.25 days per year overshoots the true 365.2422-day year by about 11 minutes annually — small, but it adds up over 1,600+ years." },
        { q: "Under the Gregorian rule, is the year 1900 a leap year?", choices: ["No — it's divisible by 100 but not by 400", "Yes — it's divisible by 4", "Yes — all century years are leap years", "No calendar rule applies to 1900"], answer: 0, why: "Century years are leap years only if divisible by 400; 1900 ÷ 400 isn't a whole number, so it's not a leap year." },
        { q: "Is the year 2000 a leap year under the Gregorian rule?", choices: ["Yes — it's divisible by 400", "No — it's a century year", "Yes, but only in some countries", "No — only years divisible by 4 but not 100 are leap years"], answer: 0, why: "2000 ÷ 400 = 5 exactly, so the century-year exception is satisfied and 2000 is a leap year." },
        { q: "What two changes made up Pope Gregory XIII's 1582 reform?", choices: ["Dropping 10 days at once, and revising the century leap-year rule", "Adding a 13th month, and removing leap years entirely", "Switching to a lunar calendar", "Renaming the days of the week"], answer: 0, why: "Ten days were dropped (October 4, 1582 was followed by October 15) to reset the equinox, and the leap-year rule was sharpened for century years." },
        { q: "How accurate is the Gregorian calendar's average year length?", choices: ["About 1 day of error every 3,300 years", "About 1 day of error every 4 years", "Perfectly exact, with zero error", "About 1 day of error every century"], answer: 0, why: "365.2425 days per year is extremely close to the true 365.2422-day tropical year." }
      ]
    },
    moonphases: {
      title: "Phases of the Moon",
      eyebrow: "Study tool · Chapter 4",
      h1: "Why the Moon changes phase",
      intro: "The Moon is always <b>half lit</b> by the Sun. Its phases come from how much of that lit half " +
        "faces Earth — nothing to do with Earth's shadow.",
      explain:
        "<p><b>This is about angles, not shadows.</b> As the Moon circles Earth roughly every month, the angle " +
        "between the Sun, Earth, and Moon keeps changing — so we see a changing slice of the Moon's permanently " +
        "half-lit surface.</p>" +
        "<p>At <span class=\"term\">new moon</span> the lit half faces away from us; at " +
        "<span class=\"term\">full moon</span>, opposite the Sun in the sky, the lit half faces us fully. In " +
        "between come the crescents, the quarters (each exactly half-lit), and the gibbous phases.</p>" +
        "<p><b>Rise and set times shift too:</b> full moon rises at sunset and sets at sunrise (up <em>all " +
        "night</em>); first quarter rises near noon and sets near midnight; third quarter does the reverse.</p>",
      diagram: "moon-phase-wheel",
      showLead: "Drag the slider around the Moon's orbit and watch the phase — and the rise/set time — change.",
      matchKey: "moonmatch", matchLabels: ["Phase", "What's true"],
      recap: "New → waxing crescent → first quarter → waxing gibbous → full → waning gibbous → third quarter → " +
        "waning crescent → new again, in about <b>29.5 days</b>. Phases come from the changing " +
        "<b>Sun–Earth–Moon angle</b>, never from Earth's shadow (that's a lunar eclipse, a separate and much " +
        "rarer event).",
      questions: [
        { q: "What actually causes the Moon's phases?", choices: ["The changing angle between the Sun, Earth, and the Moon", "Earth's shadow covering part of the Moon", "Clouds on the Moon", "The Moon's own light dimming and brightening"], answer: 0, why: "The Moon is always half lit by the Sun; the phases just show us different amounts of that lit half as the geometry changes." },
        { q: "At full moon, the Moon rises…", choices: ["At sunset", "At sunrise", "At noon", "At midnight"], answer: 0, why: "Full moon sits opposite the Sun in the sky, so it rises just as the Sun sets, and stays up all night." },
        { q: "At first quarter, roughly how much of the Moon's visible face is lit?", choices: ["Half", "All of it", "None of it", "A thin sliver"], answer: 0, why: "\"Quarter\" refers to how far around its orbit the Moon has traveled (one quarter of the way), not how much is lit — but it happens to also be exactly half-lit." },
        { q: "Why is the solar (synodic) month, 29.5 days, longer than the sidereal month, 27.3 days?", choices: ["Earth's own motion around the Sun means the Moon needs extra time to realign with the Sun", "The Moon's orbit is speeding up", "It's just a different unit of time", "The Moon's rotation is slower than its orbit"], answer: 0, why: "Because Earth has moved along its own orbit meanwhile, the Moon must travel a bit past one full lap to catch the Sun's direction again." },
        { q: "What is synchronous rotation, as shown by the Moon?", choices: ["Rotating on its axis in exactly the time it takes to orbit once", "Not rotating at all", "Rotating once per Earth day", "Spinning faster than it orbits"], answer: 0, why: "Because the Moon's spin and orbit periods match exactly, it always shows Earth the same face." },
        { q: "A lunar eclipse can only happen at which phase?", choices: ["Full moon", "New moon", "First quarter", "Any phase at all"], answer: 0, why: "Only at full moon are the Sun, Earth, and Moon lined up in the right order for the Moon to pass through Earth's shadow." }
      ]
    },
    tides: {
      title: "Ocean Tides",
      eyebrow: "Study tool · Chapter 4",
      h1: "Why the Moon raises tides",
      intro: "The Moon doesn't pull Earth evenly — and that small difference in pull is enough to slosh whole " +
        "oceans into bulges.",
      explain:
        "<p><b>Differential force.</b> Earth has real size, so the Moon pulls harder on the near side than on " +
        "Earth's center, and harder on the center than on the far side. That mismatch stretches Earth very " +
        "slightly toward the Moon — and raises two <span class=\"term\">tidal bulges</span>, one facing the " +
        "Moon and one facing directly away.</p>" +
        "<p>As Earth spins through those two fixed bulges, most coastlines get <b>two high tides and two low " +
        "tides</b> a day.</p>" +
        "<p>The Sun raises tides too (under half as strongly as the Moon). Lined up at new or full moon, their " +
        "pulls add for extra-large <span class=\"term\">spring tides</span>; at right angles, near the quarter " +
        "moons, they partly cancel for smaller <span class=\"term\">neap tides</span>.</p>",
      diagram: "tide-bulge",
      showLead: "Drag the slider to change the angle between the Sun and the Moon, and watch the bulge react.",
      matchKey: "tidesmatch", matchLabels: ["Idea", "What it means"],
      recap: "The Moon's <b>differential pull</b> (stronger on Earth's near side than its far side) raises " +
        "<b>two</b> tidal bulges. Earth's spin carries most coastlines through both every day — two highs, two " +
        "lows. Sun+Moon aligned (new/full moon) → <b>spring tide</b>; Sun+Moon at right angles (quarter moons) → " +
        "<b>neap tide</b>.",
      questions: [
        { q: "What is the fundamental cause of ocean tides?", choices: ["The Moon's (and Sun's) differential gravitational pull across Earth's size", "Wind blowing over the ocean", "Earth's rotation, with no outside influence needed", "Ocean currents carrying heat from the tropics"], answer: 0, why: "Because Earth has size, the Moon's pull is stronger on the near side than the far side — that mismatch is what raises the tides." },
        { q: "Why are there tidal bulges on BOTH sides of Earth, not just the side facing the Moon?", choices: ["The near side is pulled harder than the center, and the center harder than the far side — both differences create a bulge", "The Moon actually orbits Earth twice a day", "Water is attracted equally to both the Moon and Sun", "It's a measurement error — there is really only one bulge"], answer: 0, why: "The differential force creates a stretch in both directions: toward the Moon on the near side, and away from it (relatively) on the far side." },
        { q: "Why does a coastline typically get two high tides a day, not one?", choices: ["Earth's rotation carries it through both tidal bulges roughly every 24 hours", "The Moon circles Earth twice daily", "The Sun rises and sets twice a day", "Ocean water refills from rain twice daily"], answer: 0, why: "There are two bulges at any instant (near and far side); spinning Earth carries any one location through both of them each day." },
        { q: "A spring tide happens when…", choices: ["The Sun and Moon are aligned, at new or full moon", "It is literally the spring season", "The Moon is at first or third quarter", "There is a lunar eclipse"], answer: 0, why: "Alignment (new or full moon) lets the Sun's and Moon's tide-raising pulls add together for extra-large tides — the name has nothing to do with the season." },
        { q: "A neap tide happens when…", choices: ["The Sun and Moon pull at right angles, near first/third quarter", "The Moon is closest to Earth", "It's a new moon", "There is a total solar eclipse"], answer: 0, why: "At right angles, the Sun's pull partly cancels the Moon's, producing smaller-than-usual tides." },
        { q: "Over very long timescales, tidal friction is doing what to Earth and the Moon?", choices: ["Slowing Earth's spin while the Moon slowly spirals outward", "Speeding up Earth's spin while the Moon spirals inward", "Having no long-term effect on either", "Only affecting the Moon, not Earth"], answer: 0, why: "Conservation of angular momentum means as tidal friction saps Earth's spin, that momentum is transferred to the Moon's orbit, pushing it slowly outward (~3.8 cm/year)." }
      ]
    },
    eclipses: {
      title: "Eclipses",
      eyebrow: "Study tool · Chapter 4",
      h1: "Solar and lunar eclipses",
      intro: "The Sun and Moon happen to look almost exactly the same size in our sky — which is exactly what " +
        "makes total eclipses possible.",
      explain:
        "<p><b>A coincidence of scale.</b> The Sun's diameter is about 400 times the Moon's — but it's also " +
        "about 400 times farther away, so both work out to nearly the same <b>angular size</b> in our sky, " +
        "about ½°.</p>" +
        "<p>A shadow has a dark inner <span class=\"term\">umbra</span> (light fully blocked) and a lighter " +
        "outer <span class=\"term\">penumbra</span> (light partly blocked). A <span class=\"term\">solar " +
        "eclipse</span> is the Moon's shadow falling on Earth (only at new moon); a " +
        "<span class=\"term\">lunar eclipse</span> is the Moon entering Earth's shadow (only at full moon).</p>" +
        "<p>Eclipses aren't monthly because the Moon's orbit is tilted about 5° from Earth's orbital plane — an " +
        "eclipse needs the two paths to actually cross, which happens only about twice a year.</p>",
      diagram: "eclipse-picker",
      showLead: "Tap a kind of eclipse to see its geometry and how it looks.",
      matchKey: "eclipsematch", matchLabels: ["Term", "Meaning"],
      recap: "<b>Solar eclipse</b> (new moon only): Moon's shadow on Earth — total inside the umbra, partial in " +
        "the penumbra, annular if the Moon looks a touch too small to fully cover the Sun. <b>Lunar eclipse</b> " +
        "(full moon only): Moon inside Earth's shadow, visible from the whole night side of Earth at once. " +
        "Neither happens every month because the Moon's orbit is tilted ~5° from Earth's.",
      questions: [
        { q: "Why do the Sun and Moon appear almost the same size in our sky?", choices: ["The Sun is ~400× larger in diameter but also ~400× farther away", "They are physically the same size", "It's an illusion caused by the atmosphere", "The Moon is slowly growing"], answer: 0, why: "Those two 400× factors cancel out, giving both bodies nearly the same angular size, about ½°." },
        { q: "A solar eclipse can only occur at which Moon phase?", choices: ["New moon", "Full moon", "First quarter", "Any phase"], answer: 0, why: "Only at new moon does the Moon pass between Earth and the Sun." },
        { q: "A lunar eclipse can only occur at which Moon phase?", choices: ["Full moon", "New moon", "Third quarter", "Any phase"], answer: 0, why: "Only at full moon are Sun, Earth, and Moon lined up for the Moon to enter Earth's shadow." },
        { q: "What's the difference between the umbra and the penumbra?", choices: ["The umbra fully blocks light; the penumbra only partly blocks it", "The umbra is outside the shadow; the penumbra is inside it", "They are two names for the same region", "The umbra only forms during lunar eclipses"], answer: 0, why: "The umbra is the shadow's dark core; the penumbra is the lighter, partial-shadow region around it." },
        { q: "Why isn't there a solar and lunar eclipse every single month?", choices: ["The Moon's orbit is tilted about 5° from Earth's orbital plane", "The Sun is usually too far away", "Earth's atmosphere blocks most eclipses", "Eclipses actually do happen every month unnoticed"], answer: 0, why: "That tilt usually carries the Moon above or below the Sun's path at new and full moon; eclipses need the orbital planes to cross, which happens about twice a year." },
        { q: "What makes an eclipse 'annular' rather than 'total'?", choices: ["The Moon is a little farther from Earth and looks too small to fully cover the Sun", "The Moon is unusually close to Earth", "It only happens during a lunar eclipse", "The Sun is partly hidden behind clouds"], answer: 0, why: "At greater-than-average distance, the Moon's disk looks slightly smaller than the Sun's, leaving a bright ring visible even at perfect alignment." }
      ]
    }
  };

  var CH5_TOOLS = {
    lightwaves: {
      title: "The Behavior of Light",
      eyebrow: "Study tool · Chapter 5",
      h1: "Waves, photons, and the inverse square law",
      intro: "Light is an electromagnetic wave — but it also behaves like a particle, a <b>photon</b>. " +
        "Wavelength and frequency trade off (c = &lambda;f), and brightness fades with the <b>square</b> of " +
        "distance.",
      explain:
        "<p><b>Light is a wave of changing electric and magnetic fields</b> &mdash; Maxwell showed that " +
        "oscillating electric charges send this disturbance outward at exactly the speed of light, so light is " +
        "one form of <b>electromagnetic radiation</b>.</p>" +
        "<p>A wave's <b>wavelength</b> (crest-to-crest distance) and <b>frequency</b> (crests per second) " +
        "always multiply out to the same speed: <b>c = &lambda; &times; f</b>. So a shorter wavelength always " +
        "means a higher frequency.</p>" +
        "<p>Light also behaves like a <b>photon</b> &mdash; a packet of energy. A photon's energy rises with " +
        "its frequency, so violet light carries more energy per photon than red light.</p>" +
        "<p><b>Why it matters:</b> light spreading out from a source covers more area the farther it travels, " +
        "so brightness fades with the <b>square</b> of the distance &mdash; the same inverse square law that " +
        "governs gravity.</p>",
      diagram: "light-wave",
      showLead: "Slide the wavelength and watch the wave stretch or squeeze — and its frequency change.",
      matchKey: "lightwavesmatch", matchLabels: ["Term", "Meaning"],
      recap: "<b>c = &lambda;f:</b> every electromagnetic wave travels at the same speed, so wavelength and " +
        "frequency trade off. Light also behaves as a <b>photon</b>, with energy proportional to frequency. " +
        "Brightness falls off as the <b>inverse square</b> of distance.",
      questions: [
        { q: "What does c = λf tell you about a wave with a very short wavelength?", choices: ["It has a high frequency", "It has a low frequency", "It travels faster than other waves", "It carries no energy"], answer: 0, why: "Since c is fixed, a shorter wavelength must pair with a higher frequency." },
        { q: "Which carries more energy: a violet-light photon or a red-light photon?", choices: ["Violet", "Red", "They're equal", "Neither — light has no particle energy"], answer: 0, why: "Photon energy rises with frequency, and violet light has a higher frequency than red." },
        { q: "Move twice as far from a lamp. How much dimmer does it look?", choices: ["4 times dimmer", "2 times dimmer", "Twice as bright", "No change"], answer: 0, why: "Brightness falls off as the square of distance — 2² = 4." },
        { q: "What did Maxwell conclude about light?", choices: ["It is a form of electromagnetic radiation", "It is a stream of sound waves", "It needs the 'aether' to travel", "It never behaves like a particle"], answer: 0, why: "Maxwell's calculated wave speed matched the known speed of light, so he proposed light is electromagnetic radiation." },
        { q: "What is a photon?", choices: ["A discrete packet of electromagnetic energy", "A type of electron", "A unit of temperature", "A kind of radio antenna"], answer: 0, why: "A photon is light's particle-like packet of energy." },
        { q: "Why don't electromagnetic waves need a medium like air or water to travel through?", choices: ["Their electric and magnetic fields regenerate each other as they go", "They are much lighter than sound waves", "They only travel through the 'aether'", "They actually can't cross empty space"], answer: 0, why: "A changing electric field creates a magnetic field and vice versa, letting the wave propagate through a vacuum with nothing to carry it." }
      ]
    },
    emspectrum: {
      title: "The Electromagnetic Spectrum",
      eyebrow: "Study tool · Chapter 5",
      h1: "From gamma rays to radio waves",
      intro: "The spectrum runs from ultra-energetic <b>gamma rays</b> to gentle <b>radio waves</b> — and an " +
        "object's temperature decides where it shines brightest.",
      explain:
        "<p>The electromagnetic spectrum is one continuous family of waves, split by wavelength into " +
        "<b>gamma rays, X-rays, ultraviolet, visible light, infrared, microwaves,</b> and <b>radio waves</b> " +
        "&mdash; shortest to longest.</p>" +
        "<p>Earth's atmosphere only lets <b>visible light</b> and some <b>radio</b> waves through to the " +
        "ground; everything else has to be observed from space or from high, dry places.</p>" +
        "<p><b>Wien's law</b> says a hotter object peaks at a <b>shorter</b> wavelength &mdash; hotter stars " +
        "look bluer, cooler stars look redder. The <b>Stefan-Boltzmann law</b> says a hotter object radiates " +
        "far more total power: power grows with <b>temperature to the 4th power</b>.</p>",
      diagram: "blackbody-curve",
      showLead: "Slide the temperature and watch the peak shift and the curve grow.",
      matchKey: "emspectrummatch", matchLabels: ["Band or law", "What it means"],
      recap: "<b>The spectrum:</b> gamma &rarr; X-ray &rarr; ultraviolet &rarr; visible &rarr; infrared &rarr; " +
        "microwave &rarr; radio, shortest to longest wavelength. <b>Wien's law:</b> hotter = shorter peak " +
        "wavelength. <b>Stefan-Boltzmann law:</b> power &prop; T&#8308;.",
      questions: [
        { q: "Which band has the shortest wavelength?", choices: ["Gamma rays", "Radio waves", "Infrared", "Visible light"], answer: 0, why: "Gamma rays sit at the extreme short-wavelength end of the spectrum." },
        { q: "Which bands can reach Earth's surface?", choices: ["Visible light and some radio waves", "Gamma rays and X-rays", "Only radio waves", "All bands equally"], answer: 0, why: "Earth's atmosphere absorbs most other bands before they reach the ground." },
        { q: "A star peaks at a shorter wavelength than the Sun. What does that mean?", choices: ["It's hotter than the Sun", "It's cooler than the Sun", "It's farther away", "It's the same temperature"], answer: 0, why: "Wien's law: a shorter peak wavelength means a higher temperature." },
        { q: "If a star's temperature doubles, how much more power does it radiate per square meter?", choices: ["16 times more", "2 times more", "4 times more", "No change"], answer: 0, why: "Stefan-Boltzmann law: power ∝ T⁴, so doubling T gives 2⁴ = 16 times the power." },
        { q: "Why must astronomers observe X-rays from space?", choices: ["Earth's atmosphere absorbs them before they reach the ground", "X-rays don't actually reach Earth's solar system", "X-ray telescopes are too heavy for the ground", "X-rays travel slower than light"], answer: 0, why: "The atmosphere blocks X-rays, fortunately for our health." },
        { q: "What is a blackbody?", choices: ["An idealized object that absorbs all radiation and re-emits based on temperature", "Any object that looks black", "A star that has died", "An object with no temperature"], answer: 0, why: "A blackbody is an idealized total absorber/emitter — real stars behave nearly like one." }
      ]
    },
    spectroscopy: {
      title: "Spectroscopy in Astronomy",
      eyebrow: "Study tool · Chapter 5",
      h1: "Reading a star's spectrum",
      intro: "A prism spreads light into a spectrum — and whether that spectrum is <b>continuous</b>, has " +
        "<b>dark lines</b>, or shows only <b>bright lines</b> tells astronomers what a gas is made of.",
      explain:
        "<p>Isaac Newton (1672) showed a prism spreads white sunlight into a full rainbow &mdash; different " +
        "wavelengths <b>refract</b> (bend) by different amounts, a spreading called <b>dispersion</b>.</p>" +
        "<p>There are three types of spectra: a <b>continuous spectrum</b> (every color, from a solid or dense " +
        "gas), a <b>dark-line (absorption) spectrum</b> (a continuous spectrum viewed through a cooler, " +
        "thinner gas), and a <b>bright-line (emission) spectrum</b> (only certain wavelengths, from a hot thin " +
        "glowing gas alone).</p>" +
        "<p>Each element leaves its own unique pattern of lines &mdash; a <b>spectral signature</b> &mdash; " +
        "which is how astronomers identify what a star or galaxy is made of without ever visiting it.</p>",
      diagram: "spectrum-types",
      showLead: "Tap each type of spectrum and see how it looks.",
      matchKey: "spectroscopymatch", matchLabels: ["Term", "Meaning"],
      recap: "<b>Continuous</b> spectrum = every color. <b>Absorption</b> spectrum = dark lines missing from a " +
        "continuous spectrum. <b>Emission</b> spectrum = only bright lines. Each element's pattern is a unique " +
        "<b>spectral signature</b>.",
      questions: [
        { q: "What did Newton's prism experiment show?", choices: ["White sunlight is a mixture of all colors", "Light only travels in straight lines", "Stars are made of gas", "Light has no wave properties"], answer: 0, why: "The prism spread sunlight into a full rainbow, showing it's a mixture of every visible wavelength." },
        { q: "What produces an absorption (dark-line) spectrum?", choices: ["A continuous spectrum viewed through a cooler, thinner gas", "A hot, thin gas glowing on its own", "A solid object at high temperature", "Light with no source at all"], answer: 0, why: "The cooler gas absorbs its own specific wavelengths, leaving dark lines in the continuous spectrum behind it." },
        { q: "What produces an emission (bright-line) spectrum?", choices: ["A hot, thin gas glowing on its own, with no continuous source behind it", "A continuous spectrum with lines removed", "Sunlight passing through a prism", "A blackbody at room temperature"], answer: 0, why: "A hot, thin gas by itself emits light only at its own specific wavelengths — bright lines with nothing behind them." },
        { q: "What is a spectral signature?", choices: ["The unique pattern of lines produced by a chemical element", "A star's total brightness", "A telescope's serial number", "The color of an astronomer's notebook"], answer: 0, why: "Every element absorbs and emits its own unmistakable set of wavelengths." },
        { q: "Who first identified an element (sodium) in the Sun by its spectrum, and when?", choices: ["Gustav Kirchhoff, 1860", "Isaac Newton, 1672", "Joseph Fraunhofer, 1815", "William Wollaston, 1802"], answer: 0, why: "Kirchhoff was first to match a spectral signature to a specific element in the Sun." },
        { q: "What is dispersion?", choices: ["Different wavelengths of light bending by different amounts", "Light traveling faster in a vacuum", "Two spectra canceling out", "A star losing its outer layers"], answer: 0, why: "Dispersion is why a prism spreads white light into its component colors — each wavelength refracts by a different amount." }
      ]
    },
    atomstructure: {
      title: "The Structure of the Atom",
      eyebrow: "Study tool · Chapter 5",
      h1: "Protons, neutrons, electrons, and Bohr's fix",
      intro: "Rutherford found a tiny, dense <b>nucleus</b> at an atom's center. Bohr then explained why its " +
        "orbiting electrons don't simply spiral in and destroy the atom.",
      explain:
        "<p>J. J. Thomson discovered the <b>electron</b> in 1897. In 1911, Ernest Rutherford fired particles at " +
        "gold foil and found that about 1 in 8000 bounced straight back &mdash; proof that an atom's mass and " +
        "positive charge are packed into a tiny central <b>nucleus</b>, with electrons orbiting the mostly " +
        "empty space around it.</p>" +
        "<p>The number of <b>protons</b> defines the element; the number of <b>neutrons</b> can vary, giving " +
        "different <b>isotopes</b> of the same element.</p>" +
        "<p>Rutherford's model had a flaw: an orbiting electron should radiate energy and spiral into the " +
        "nucleus almost instantly. Niels Bohr fixed this by proposing electrons can only occupy certain fixed " +
        "<b>energy levels</b>, absorbing or emitting a <b>photon</b> (E = hf) only when jumping between " +
        "them.</p>",
      diagram: "bohr-atom",
      showLead: "Tap an atom to build it and see its protons, neutrons, and electrons.",
      matchKey: "atomstructurematch", matchLabels: ["Term", "Meaning"],
      recap: "Protons define the <b>element</b>; neutrons can vary, giving <b>isotopes</b>. Bohr's model: " +
        "electrons occupy fixed <b>energy levels</b>, absorbing/emitting a photon (<b>E = hf</b>) only when " +
        "jumping between them.",
      questions: [
        { q: "What defines which element an atom is?", choices: ["Its number of protons", "Its number of neutrons", "Its number of electrons at any moment", "Its overall size"], answer: 0, why: "Protons alone define the element — hydrogen always has 1, helium always has 2." },
        { q: "What are isotopes?", choices: ["Versions of the same element with different numbers of neutrons", "Different elements with the same mass", "Atoms with no electrons", "Charged atoms"], answer: 0, why: "Isotopes share the same proton count (same element) but differ in neutron count." },
        { q: "What did Rutherford's gold foil experiment show?", choices: ["An atom's mass and charge are concentrated in a tiny nucleus", "Atoms have no internal parts", "Gold is not a real element", "Electrons live inside the nucleus"], answer: 0, why: "Because some particles bounced almost straight back, the nucleus had to be tiny, dense, and positively charged." },
        { q: "What problem did Bohr's model solve?", choices: ["Why orbiting electrons don't spiral into the nucleus", "Why atoms have mass", "Why some elements are metals", "Why the nucleus has neutrons"], answer: 0, why: "Bohr proposed fixed energy levels where an electron radiates nothing, fixing the instability predicted by classical theory." },
        { q: "According to E = hf, a higher-frequency photon has:", choices: ["More energy", "Less energy", "The same energy as any other photon", "No wavelength"], answer: 0, why: "Planck's formula ties photon energy directly to frequency." },
        { q: "How many electrons does a helium atom have when neutral?", choices: ["2", "1", "4", "0"], answer: 0, why: "A neutral helium atom has 2 protons and 2 electrons, balancing its charge." }
      ]
    },
    spectrallines: {
      title: "Formation of Spectral Lines",
      eyebrow: "Study tool · Chapter 5",
      h1: "Why atoms absorb and emit only certain colors",
      intro: "An electron jumping between energy levels absorbs or emits a photon of one exact energy — which " +
        "is why each element's spectrum is a unique fingerprint.",
      explain:
        "<p>A hydrogen electron jumping from its 2nd to 3rd orbit absorbs a photon of exactly <b>656 nm</b> " +
        "&mdash; no other wavelength will do. Jumps to/from the ground state (n=1) form the <b>Lyman " +
        "series</b> (ultraviolet); jumps to/from n=2 form the <b>Balmer series</b> (visible light).</p>" +
        "<p>An atom's lowest energy is its <b>ground state</b>. Absorbing energy <b>excites</b> it to a higher " +
        "level; it typically drops back within about a hundred-millionth of a second, emitting a photon.</p>" +
        "<p>Enough energy can knock an electron completely free &mdash; <b>ionization</b>. Hydrogen can be " +
        "ionized once, helium twice, oxygen up to eight times. How much of a gas is ionized depends on its " +
        "temperature and density.</p>",
      diagram: "energy-levels",
      showLead: "Tap a jump and switch between absorbing and emitting.",
      matchKey: "spectrallinesmatch", matchLabels: ["Term", "Meaning"],
      recap: "Jumps to/from n=1 = <b>Lyman series</b> (UV); jumps to/from n=2 = <b>Balmer series</b> " +
        "(visible). <b>Excitation</b> = absorbing energy to rise a level; <b>ionization</b> = losing an " +
        "electron completely.",
      questions: [
        { q: "Why does hydrogen absorb light specifically at 656 nm?", choices: ["That photon has exactly the energy to lift an electron from the 2nd to 3rd orbit", "656 nm is hydrogen's natural color", "Hydrogen absorbs every visible wavelength equally", "656 nm ionizes hydrogen"], answer: 0, why: "Only a photon of that exact energy matches the gap between hydrogen's 2nd and 3rd orbits." },
        { q: "The Lyman series involves transitions to/from which level?", choices: ["n=1 (ground state)", "n=2", "n=3", "n=4"], answer: 0, why: "Lyman series = transitions to/from the ground state, n=1, producing ultraviolet photons." },
        { q: "The Balmer series produces which kind of light?", choices: ["Visible light", "X-rays", "Radio waves", "Gamma rays"], answer: 0, why: "Balmer series transitions (to/from n=2) happen to produce visible-light photons." },
        { q: "What is ionization?", choices: ["Removing an electron completely from an atom", "Moving an electron to a lower level", "Adding a neutron", "Cooling a gas"], answer: 0, why: "Ionization knocks an electron entirely free, leaving a charged ion." },
        { q: "How many times can a helium atom be ionized?", choices: ["Twice", "Once", "Never", "Four times"], answer: 0, why: "Helium has 2 electrons, so it can be ionized twice." },
        { q: "What is an atom's ground state?", choices: ["Its lowest possible energy level", "Its most excited state", "The state where it's ionized", "A state that doesn't really exist"], answer: 0, why: "The ground state is the lowest-energy configuration an atom's electrons can have." }
      ]
    },
    doppler: {
      title: "The Doppler Effect",
      eyebrow: "Study tool · Chapter 5",
      h1: "Blueshift, redshift, and radial velocity",
      intro: "A moving source squeezes its waves together on the approaching side and stretches them out on " +
        "the receding side — letting astronomers measure speed from a spectrum alone.",
      explain:
        "<p>Christian Doppler (1842) showed that a wave source moving toward you compresses its waves (shorter " +
        "wavelength, higher frequency); moving away, it stretches them (longer wavelength, lower frequency). " +
        "Sideways motion produces <b>no shift</b> at all &mdash; only <b>radial velocity</b> (motion straight " +
        "toward or away) matters.</p>" +
        "<p>For light, a wavelength decrease is a <b>blueshift</b> (approaching); an increase is a " +
        "<b>redshift</b> (receding). The size of the shift gives the speed: <b>v = c &times; (&Delta;&lambda; " +
        "&divide; &lambda;)</b>.</p>" +
        "<p>Because the whole pattern of an element's lines shifts together, rather than scrambling, " +
        "astronomers can still identify the element <em>and</em> read off the object's speed from the same " +
        "spectrum.</p>",
      diagram: "doppler-waves",
      showLead: "Slide the source's velocity and watch the wave crests bunch up or spread out.",
      matchKey: "dopplermatch", matchLabels: ["Term", "Meaning"],
      recap: "<b>Blueshift</b> = wavelength shortened (approaching). <b>Redshift</b> = wavelength lengthened " +
        "(receding). <b>v = c &times; (&Delta;&lambda; &divide; &lambda;)</b>. Only <b>radial velocity</b> " +
        "(toward/away) causes a shift — sideways motion doesn't.",
      questions: [
        { q: "A spectral line is observed at a longer wavelength than its rest wavelength. What does this mean?", choices: ["The source is receding (redshifted)", "The source is approaching (blueshifted)", "The source isn't moving", "The source is hotter than normal"], answer: 0, why: "A longer observed wavelength is a redshift, meaning the source is moving away." },
        { q: "What kind of motion produces no Doppler shift?", choices: ["Motion exactly sideways (perpendicular) to the line of sight", "Motion straight toward the observer", "Motion straight away from the observer", "There's no such motion — everything shifts"], answer: 0, why: "Only radial motion (toward/away) causes a Doppler shift; purely sideways motion doesn't." },
        { q: "In v = c × (Δλ ÷ λ), what does λ represent?", choices: ["The line's rest (unshifted) wavelength", "The star's distance", "The star's temperature", "The speed of light"], answer: 0, why: "λ is the known, unmoving rest wavelength of the spectral line being measured." },
        { q: "Who first tested the Doppler effect, and how?", choices: ["Christian Doppler, using musicians on a moving railroad car", "Isaac Newton, using a prism", "Niels Bohr, using hydrogen gas", "Max Planck, using a blackbody"], answer: 0, why: "Doppler's 1842 experiment used musicians playing fixed notes on a moving train car." },
        { q: "Why can astronomers still identify elements in a fast-moving, redshifted star?", choices: ["The whole pattern of lines shifts together, staying recognizable", "Fast-moving stars don't actually show a shift", "Only slow stars have spectral lines", "Element identification doesn't use spectra"], answer: 0, why: "The Doppler effect shifts an entire line pattern by the same proportion, so it's still recognizable as that element's signature." },
        { q: "A hydrogen line normally at 500 nm is observed at 500.1 nm. Is the source approaching or receding?", choices: ["Receding", "Approaching", "Neither — no motion", "Impossible to tell"], answer: 0, why: "The observed wavelength increased (redshift), meaning the source is moving away." }
      ]
    }
  };

  var CH6_TOOLS = {
    telescopes: {
      title: "Telescopes",
      eyebrow: "Study tool · Chapter 6",
      h1: "Light buckets, lenses, and mirrors",
      intro: "A telescope's main job is to <b>collect</b> faint light and <b>focus</b> it into an image. The bigger " +
        "the opening, the more light it catches — and most big telescopes use a <b>mirror</b>, not a lens.",
      explain:
        "<p><b>Every observing system has three parts:</b> a <b>telescope</b> to collect the light, an " +
        "<b>instrument</b> to sort it by wavelength, and a <b>detector</b> to record it.</p>" +
        "<p>Light collected depends on the <b>area</b> of the main lens or mirror, and area grows with the " +
        "<b>square</b> of the diameter (the <b>aperture</b>). A 4-meter mirror catches 4&sup2; = <b>16 times</b> " +
        "the light of a 1-meter mirror.</p>" +
        "<p>A <b>refractor</b> bends light through a <b>lens</b>. But the glass must be flawless all the way " +
        "through, it sags because it can only be held at the edges, and each color focuses at a different spot " +
        "(<b>chromatic aberration</b>). A <b>reflector</b> bounces light off a curved <b>mirror</b> — only the " +
        "front surface matters and it can be supported from behind — so almost all big telescopes are " +
        "reflectors. Newton built the first one in 1668.</p>",
      diagram: "telescope-types",
      showLead: "Tap each type and follow the starlight to its focus.",
      matchKey: "telescopesmatch", matchLabels: ["Term", "Meaning"],
      recap: "Light-gathering power &prop; <b>aperture&sup2;</b>. <b>Refractors</b> use lenses; <b>reflectors</b> " +
        "use mirrors and win at large sizes. A reflector's light can be caught at the <b>prime focus</b>, sent out " +
        "the side (<b>Newtonian</b>), or back through a hole in the mirror (<b>Cassegrain</b>).",
      questions: [
        { q: "A 4-meter mirror collects how much light compared with a 1-meter mirror?", choices: ["16 times as much", "4 times as much", "8 times as much", "The same"], answer: 0, why: "Light collected follows area, which grows with diameter squared: 4² = 16." },
        { q: "What are a telescope's two most important jobs?", choices: ["Collect faint light and focus it into an image", "Magnify stars and change their color", "Cool the detector and block city lights", "Measure distance and speed"], answer: 0, why: "Collecting and focusing light are the main functions; magnification is done by an eyepiece." },
        { q: "What kind of telescope did Galileo use?", choices: ["A refractor (lenses)", "A reflector (mirror)", "A radio dish", "An interferometer"], answer: 0, why: "Galileo's 'spyglass' was a tube with lenses — a refractor." },
        { q: "Why do most large telescopes use mirrors?", choices: ["Only the front surface must be perfect, and the mirror can be supported from behind", "Mirrors magnify more than lenses", "Lenses can't focus starlight", "Mirrors are transparent"], answer: 0, why: "Light never passes through a mirror, so internal flaws don't matter and it won't sag the way a lens held by its edges does." },
        { q: "In a Cassegrain telescope, where does the light end up?", choices: ["Back down through a hole in the main mirror", "Out the side of the tube", "At the prime focus near the top", "Through a lens at the top"], answer: 0, why: "A small secondary mirror sends the light back through a hole in the primary to an observing station below." },
        { q: "What is chromatic aberration?", choices: ["Blur from each color focusing at a different spot in a lens", "Twinkling caused by the air", "A mirror sagging under its own weight", "Light pollution from cities"], answer: 0, why: "Glass bends different wavelengths by slightly different amounts, so the colors don't all focus together." }
      ]
    },
    telescopestoday: {
      title: "Telescopes Today",
      eyebrow: "Study tool · Chapter 6",
      h1: "Giant mirrors, good sites, and sharp images",
      intro: "Modern telescopes have 8- to 10-meter mirrors, sit on <b>high, dark, dry</b> mountaintops, and use " +
        "<b>adaptive optics</b> to undo the blurring of Earth's turbulent air.",
      explain:
        "<p><b>Bigger mirrors got practical:</b> Palomar's 5-m mirror (1948) needed a massive steel frame. " +
        "Gemini North's 8-m mirror is thin and light, and computers push on its back at 120 places to fix its " +
        "sag (<b>active control</b>). Each Keck telescope's 10-m mirror is made of <b>36 hexagons</b>.</p>" +
        "<p><b>The air gets in the way</b> four ways: weather, absorption (especially infrared, by water vapor), " +
        "<b>light pollution</b>, and turbulence, which blurs images and makes stars <b>twinkle</b> — astronomers " +
        "call that <b>seeing</b>. So the best sites are high, dark, and dry, like Chile's Andes and Maunakea.</p>" +
        "<p><b>Resolution</b> — the finest detail — is measured in arcseconds (1/3600 of a degree). " +
        "<b>Adaptive optics</b> reshapes a flexible mirror up to 500 times a second to cancel the blur, reaching " +
        "about 0.1 arcsecond in the infrared.</p>",
      diagram: "adaptive-optics",
      showLead: "Switch between bad seeing, adaptive optics, and space — watch the star's image.",
      matchKey: "telescopestodaymatch", matchLabels: ["Term", "Meaning"],
      recap: "Best sites: <b>high, dark, dry</b>, with steady air. <b>Seeing</b> = atmospheric blurring. " +
        "<b>Resolution</b> is measured in arcseconds. <b>Adaptive optics</b> undoes the blur up to 500 times a " +
        "second.",
      questions: [
        { q: "What makes a good observatory site?", choices: ["High, dark, and dry", "Low and near a big city", "Humid and cloudy", "At sea level"], answer: 0, why: "High sites sit above much of the water vapor, dark sites avoid light pollution, and dry air absorbs less infrared." },
        { q: "What do astronomers call the blurring caused by turbulent air?", choices: ["Seeing", "Chromatic aberration", "Light pollution", "Active control"], answer: 0, why: "Bad seeing means lots of atmospheric blur; good seeing means steady air." },
        { q: "How often can an adaptive optics mirror change shape?", choices: ["Up to 500 times per second", "Once a night", "Once a year", "Never — it's rigid"], answer: 0, why: "A sensor measures the distortion and the flexible mirror updates as often as 500 times a second." },
        { q: "How many hexagonal segments make up each Keck telescope's mirror?", choices: ["36", "7", "18", "798"], answer: 0, why: "Each 10-m Keck mirror combines 36 hexagons, each 1.8 m wide." },
        { q: "About how big does 1 arcsecond look?", choices: ["Like a quarter seen from 5 km away", "Like the full Moon", "Like your thumb at arm's length", "Like the whole sky"], answer: 0, why: "One arcsecond is 1/3600 of a degree — a quarter at 5 kilometers." },
        { q: "Observatories are best placed at least how far from the nearest large city?", choices: ["100 miles", "1 mile", "10 feet", "It doesn't matter"], answer: 0, why: "City glare scattered by the air (light pollution) hides the faintest stars." }
      ]
    },
    detectors: {
      title: "Detectors and Instruments",
      eyebrow: "Study tool · Chapter 6",
      h1: "Recording the light: film, CCDs, and spectrometers",
      intro: "The eye is a poor detector. Photographic film was better, but <b>CCDs</b> — like the sensor in a " +
        "phone camera — record most of the photons that hit them.",
      explain:
        "<p><b>Detectors</b> make a permanent record and can take <b>long exposures</b> (sometimes hours), " +
        "while the eye adds up light for only a fraction of a second.</p>" +
        "<p><b>Photographic plates</b> use only about <b>1%</b> of the light. <b>CCDs</b> record " +
        "<b>60&ndash;70%</b> (the best over 90%), counting photons in millions of <b>pixels</b> and giving " +
        "digital output.</p>" +
        "<p><b>Infrared is tricky:</b> at Earth temperatures (~300 K), the telescope and sky glow in the " +
        "infrared themselves. So infrared detectors are cooled, often to <b>1&ndash;3 K</b> with liquid helium.</p>" +
        "<p>A <b>spectrometer</b> spreads the light into a spectrum with a prism or, more often today, a " +
        "<b>grating</b>.</p>",
      diagram: "detector-catch",
      showLead: "Tap a detector and see how many of 100 photons it actually records.",
      matchKey: "detectorsmatch", matchLabels: ["Term", "Meaning"],
      recap: "Film &asymp; <b>1%</b> efficient; CCDs <b>60&ndash;70%</b>, best <b>90%+</b>. Infrared detectors " +
        "are cooled, often to <b>1&ndash;3 K</b>. Spectrometers use a <b>prism</b> or <b>grating</b>.",
      questions: [
        { q: "What share of the light does photographic film actually use?", choices: ["About 1%", "About 65%", "Over 90%", "100%"], answer: 0, why: "Film is very inefficient — the rest of the light is wasted." },
        { q: "A typical CCD records about what share of the photons that hit it?", choices: ["60–70%", "1%", "10%", "5%"], answer: 0, why: "CCDs typically record 60–70%, and the best exceed 90%." },
        { q: "What is a pixel?", choices: ["One spot where a detector counts photons", "A kind of prism", "A small telescope", "A unit of distance"], answer: 0, why: "“Pixel” is short for picture element; modern detectors have millions (megapixels)." },
        { q: "Why are infrared detectors cooled with liquid helium?", choices: ["Warm things glow in the infrared and would swamp the faint signal", "To make them lighter", "To stop the telescope from rusting", "Helium makes light brighter"], answer: 0, why: "Everything near 300 K radiates infrared, so the detector must be kept at 1–3 K and shielded." },
        { q: "What do most spectrometers today use to spread light into a spectrum?", choices: ["A grating", "A CCD", "An eyepiece", "A filter"], answer: 0, why: "A grating — thousands of grooves on a surface — spreads light like a prism does." },
        { q: "Why is a long exposure useful?", choices: ["It collects light for a long time, revealing very faint objects", "It makes stars twinkle less", "It magnifies planets", "It removes chromatic aberration"], answer: 0, why: "Detectors can add up light for hours; the eye can only add it up for a fraction of a second." }
      ]
    },
    radiotelescopes: {
      title: "Radio Telescopes",
      eyebrow: "Study tool · Chapter 6",
      h1: "Radio dishes, interferometers, and radar",
      intro: "Radio waves from space reach the ground. Because they are so <b>long</b>, radio astronomers link " +
        "dishes together into <b>interferometers</b> to see fine detail.",
      explain:
        "<p><b>Karl Jansky</b> found the first cosmic radio waves (from the Milky Way) in the early 1930s; " +
        "<b>Grote Reber</b> built the first antenna designed for them in 1936.</p>" +
        "<p>A radio telescope is a curved metal <b>dish</b> that reflects radio waves to a receiver. Radio waves " +
        "aren't sound — like light, they're electromagnetic radiation, but our senses can't detect them.</p>" +
        "<p>Longer waves mean blurrier images, so even the biggest single dish sees less detail than a small " +
        "optical telescope. Linking dishes into an <b>interferometer</b> gives the resolution of one dish as wide " +
        "as their <b>separation</b>. The <b>VLA</b> reaches ~1 arcsecond, <b>ALMA</b> 0.006, and the " +
        "<b>VLBA</b> (Virgin Islands to Hawaii) 0.0001.</p>" +
        "<p><b>Radar</b> sends radio waves out and times the echo to find distances in the solar system.</p>",
      diagram: "interferometer",
      showLead: "Tap each telescope and watch two close radio sources blur or separate.",
      matchKey: "radiotelescopesmatch", matchLabels: ["Name or term", "What it is"],
      recap: "An <b>interferometer</b>'s resolution depends on the <b>separation</b> of its dishes, not their " +
        "size. VLA &asymp; 1&Prime;, ALMA 0.006&Prime;, VLBA 0.0001&Prime;. <b>Radar</b> = send radio waves, time " +
        "the echo.",
      questions: [
        { q: "Who discovered the first cosmic radio source?", choices: ["Karl Jansky", "Grote Reber", "Galileo", "Edwin Hubble"], answer: 0, why: "Jansky, a Bell Labs engineer, found radio static coming from the Milky Way in the early 1930s." },
        { q: "What sets an interferometer's resolution?", choices: ["How far apart its dishes are", "How big each dish is", "How long it observes", "The color of the dishes"], answer: 0, why: "Two dishes 1 km apart resolve like one dish 1 km across." },
        { q: "Why is a single radio dish so blurry?", choices: ["Radio waves are very long, and longer waves give poorer resolution", "Radio waves travel slowly", "Radio dishes are always small", "Radio waves can't be focused"], answer: 0, why: "Resolution gets worse as wavelength gets longer." },
        { q: "Which array has the sharpest resolution?", choices: ["VLBA (0.0001 arcsecond)", "VLA (about 1 arcsecond)", "A single 100-m dish", "The Green Bank Telescope"], answer: 0, why: "The VLBA's dishes stretch from the Virgin Islands to Hawaii." },
        { q: "How does radar find the distance to a planet?", choices: ["It times how long radio waves take to bounce back", "It measures the planet's color", "It counts the planet's moons", "It weighs the planet"], answer: 0, why: "Radio waves travel at the speed of light, so the round-trip time gives the distance." },
        { q: "What is the largest radio dish now operating?", choices: ["FAST in China (500 m)", "Arecibo (305 m)", "Green Bank (100 m)", "Lovell (76 m)"], answer: 0, why: "Arecibo collapsed in 2020; China's 500-m FAST is now the largest." }
      ]
    },
    spaceobs: {
      title: "Observing from Space",
      eyebrow: "Study tool · Chapter 6",
      h1: "Why we put telescopes above the air",
      intro: "Earth's atmosphere blocks <b>gamma rays, X-rays,</b> and <b>ultraviolet</b>, soaks up much " +
        "<b>infrared</b>, and makes stars twinkle — so some telescopes have to fly.",
      explain:
        "<p>Direct <b>ultraviolet, X-ray, and gamma-ray</b> observations can only be made from space. In space, " +
        "stars don't twinkle either.</p>" +
        "<p><b>Infrared</b> is absorbed by water vapor low in the air, so astronomers flew telescopes in " +
        "airplanes (<b>SOFIA</b>, 2010&ndash;2022) and then launched them (<b>IRAS</b> 1983, <b>Spitzer</b> " +
        "2003&ndash;2020). In space the whole telescope can be cooled to nearly eliminate its own infrared glow.</p>" +
        "<p><b>Hubble</b> (1990, 2.4 m) had a flawed mirror fixed by astronauts in 1993. <b>Webb</b> (launched " +
        "Dec. 25, 2021, 6.5 m, 18 segments) observes infrared from 1.5 million km away. <b>Chandra</b> (X-ray, " +
        "1999) and <b>Fermi</b> (gamma ray, 2008) cover the high-energy sky.</p>",
      diagram: "atmosphere-windows",
      showLead: "Tap each band of light and see how far it gets through the air.",
      matchKey: "spaceobsmatch", matchLabels: ["Observatory", "What it is"],
      recap: "Gamma, X-ray, UV &rarr; <b>space only</b> (gamma rays also indirectly from the ground). Infrared " +
        "&rarr; <b>high peaks, airplanes, space</b>. Visible and radio &rarr; <b>reach the ground</b>.",
      questions: [
        { q: "Which of these can be observed directly only from space?", choices: ["X-rays", "Radio waves", "Visible light", "All of them"], answer: 0, why: "The atmosphere absorbs X-rays before they reach the ground." },
        { q: "What mostly absorbs infrared light in our atmosphere?", choices: ["Water vapor", "Oxygen", "Clouds of dust from space", "City lights"], answer: 0, why: "Water vapor sits low in the atmosphere, so going higher helps infrared observations." },
        { q: "What was SOFIA?", choices: ["A 2.5-m infrared telescope flown in a Boeing 747SP", "An X-ray satellite", "A radio dish in China", "A mirror segment of Webb"], answer: 0, why: "SOFIA flew above most of the atmosphere's water vapor from 2010 to 2022." },
        { q: "How was Hubble's blurry mirror fixed?", choices: ["Astronauts installed corrective optics in 1993", "It was replaced with a new mirror", "It was brought back to Earth", "It fixed itself"], answer: 0, why: "Like glasses for blurry vision — astronauts added compensating optics and a new camera in December 1993." },
        { q: "How far from Earth does the James Webb Space Telescope orbit?", choices: ["About 1.5 million km", "About 500 km", "At the Moon", "Around Mars"], answer: 0, why: "That's four times farther than the Moon — cold, but beyond astronaut repair." },
        { q: "Chandra observes which kind of radiation?", choices: ["X-rays", "Gamma rays", "Infrared", "Radio"], answer: 0, why: "Chandra, launched in 1999, is NASA's great X-ray observatory; Fermi does gamma rays." }
      ]
    },
    futurescopes: {
      title: "The Future of Large Telescopes",
      eyebrow: "Study tool · Chapter 6",
      h1: "Giant mirrors made of many pieces",
      intro: "The next ground giants will be 24.5 to 39 meters across. A single mirror 30 m or larger can't be built, so " +
        "they use many <b>segments</b> held precisely in line.",
      explain:
        "<p>In space, <b>Webb</b> leads the coming decade, <b>Hubble</b> still works after 30+ years, and the " +
        "<b>Nancy Grace Roman Space Telescope</b> (planned ~2027) will survey the infrared with a wide field of " +
        "view.</p>" +
        "<p>On the ground, the <b>Vera Rubin Observatory</b> (8.4 m, first light 2025) photographs the whole " +
        "southern sky every three nights to catch <b>transients</b>. The planned <b>Cherenkov Telescope " +
        "Array</b> will catch gamma rays 1000 times more energetic than Fermi can.</p>" +
        "<p><b>Segmented giants:</b> the <b>European ELT</b> (39.3 m, 798 hexagons), the <b>TMT</b> (30 m, 492 " +
        "hexagons), and the <b>GMT</b> (seven 8.4-m mirrors). They may even find signs of life in the atmospheres " +
        "of planets around other stars.</p>",
      diagram: "mirror-segments",
      showLead: "Tap each telescope — all mirrors are drawn to the same scale.",
      matchKey: "futurescopesmatch", matchLabels: ["Telescope or term", "What it is"],
      recap: "Mirrors 30 m or larger can't be made in one piece. <b>ELT</b>: 39.3 m, 798 hexagons. <b>TMT</b>: " +
        "30 m, 492 hexagons. <b>GMT</b>: seven 8.4-m mirrors. <b>Rubin</b>: whole southern sky every 3 nights.",
      questions: [
        { q: "Why are the new giant telescopes made of segments?", choices: ["A single mirror 30 m or larger can't be built or transported", "Segments are shinier", "Hexagons see more colors", "To make them twinkle less"], answer: 0, why: "It's technically impossible to make one mirror that large, so many smaller ones act as one." },
        { q: "How many hexagonal segments will the European ELT have?", choices: ["798", "492", "36", "18"], answer: 0, why: "798 segments, each 1.4 m across, make its 39.3-m mirror." },
        { q: "What is special about the Giant Magellan Telescope's mirror?", choices: ["It's made of seven 8.4-m mirrors", "It's one 30-m piece of glass", "It floats in space", "It's made of 798 hexagons"], answer: 0, why: "The GMT uses seven stiff monolithic 8.4-m mirrors as its segments." },
        { q: "What does the Vera Rubin Observatory look for?", choices: ["Transients — things that change quickly, like exploding stars", "Radio waves from the Milky Way", "Gamma rays from space", "The Sun's ultraviolet light"], answer: 0, why: "It maps the southern sky every three nights for ten years, a movie of the changing sky." },
        { q: "The Nancy Grace Roman Space Telescope will have what, compared with Webb?", choices: ["A smaller mirror but a wider field of view", "A bigger mirror", "X-ray eyes", "A place on the Moon"], answer: 0, why: "Roman is an infrared telescope planned for around 2027, trading mirror size for a wider view." },
        { q: "What exciting discovery might the extremely large telescopes make?", choices: ["Evidence of life from the atmospheres of planets around other stars", "A new planet in our solar system made of glass", "Proof that the Sun is cooling fast", "Proof that the Moon has oceans"], answer: 0, why: "Their images and spectra of exoplanets could reveal atmospheric chemistry that hints at life." }
      ]
    }
  };

  /* ---- click-to-load YouTube embed (no contact with Google until played) */
  function videoEmbed(id, label) {
    var wrap = h("div", { class: "video-embed" });
    var btn = h("button", {
      class: "video-play", type: "button", "aria-label": "Play video: " + label,
      onclick: function () {
        wrap.replaceChild(h("div", { class: "video-frame" }, h("iframe", {
          src: "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0",
          title: label,
          allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
          allowfullscreen: "true"
        })), btn);
      }
    }, [
      h("span", { class: "video-play-icon", text: "▶" }),
      h("span", { class: "video-play-text", text: label })
    ]);
    wrap.appendChild(btn);
    return wrap;
  }

  /* ---- TOOL: Multiplication → exponents (Ch. 3 warm-up) ------ */
  function renderMul() {
    mathTitle("Multiplication");
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("math"); },
      text: "← Math warm-ups" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Math warm-up · step 1" }));
    v.appendChild(h("h1", { text: "Multiplication — and where exponents come from" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "Multiplying is repeated adding. Repeating <em>that</em> — multiplying the same number again and again — " +
      "is what the little raised number in P² and a³ means. This tool shows the link; then go to " +
      "<a href=\"#/t/exponents\">Exponents &amp; Roots</a>." }));

    v.appendChild(h("h2", { text: "Watch this first", style: "margin-top:10px" }));
    v.appendChild(h("p", { class: "tool-intro", style: "margin:0 0 10px",
      text: "A short video on multiplication and exponents. It loads from YouTube only after you press play." }));
    v.appendChild(videoEmbed("-zUmvpkhvW8", "Multiplication & exponents — video"));

    var host = h("div");
    var fn = (window.ASTRO_DIAGRAMS || {})["math-mul"];
    if (typeof fn === "function") {
      try { fn(host); }
      catch (e) { host.appendChild(h("p", { class: "tool-intro", text: "(this tool could not load)" })); }
    }
    v.appendChild(host);

    v.appendChild(mathToolNav("mul"));
    mount(v);
    window.scrollTo(0, 0);
  }

  /* ---- TOOL: Exponents & Roots (Ch. 3 warm-up) ---------------- */
  function renderExponents() {
    mathTitle("Exponents & Roots");
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("math"); },
      text: "← Math warm-ups" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Math warm-up · step 2" }));
    v.appendChild(h("h1", { text: "Exponents & roots — the basics" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "The little raised numbers in Chapter 3 (P², a³, 60²) trip people up. Here is all they mean, " +
      "with something to tap. Next comes <a href=\"#/t/pemdas\">Order of Operations</a>, then " +
      "<a href=\"#/t/sci\">Scientific Notation</a>." }));

    var host = h("div");
    var fn = (window.ASTRO_DIAGRAMS || {})["math-exponents"];
    if (typeof fn === "function") {
      try { fn(host); }
      catch (e) { host.appendChild(h("p", { class: "tool-intro", text: "(this tool could not load)" })); }
    }
    v.appendChild(host);

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "The whole idea in three lines", style: "margin-top:0" }),
      h("ul", { class: "prose", style: "margin:0" }, [
        h("li", { html: "A little <b>2</b> (“squared”) means <b>times itself</b>: 7² = 7 × 7 = 49." }),
        h("li", { html: "A little <b>3</b> (“cubed”) means <b>times itself, three times</b>: 4³ = 4 × 4 × 4 = 64." }),
        h("li", { html: "A <b>root</b> (√ or ∛) runs it backwards: √49 = 7, because 7 × 7 = 49." })
      ])
    ]));

    v.appendChild(mathToolNav("exponents"));
    mount(v);
    window.scrollTo(0, 0);
  }

  /* ---- TOOL: Order of operations / PEMDAS (Ch. 3 warm-up) ----- */
  function renderPemdas() {
    mathTitle("Order of Operations");
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("math"); },
      text: "← Math warm-ups" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Math warm-up · step 3" }));
    v.appendChild(h("h1", { text: "Order of operations — PEMDAS" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "A formula like <b>G · m₁ · m₂ ÷ r²</b> only gives one answer if everyone works the pieces in the same " +
      "order. That order is <b>PEMDAS</b>: parentheses, exponents, then × and ÷, then + and −." }));

    v.appendChild(h("h2", { text: "Watch this first", style: "margin-top:10px" }));
    v.appendChild(h("p", { class: "tool-intro", style: "margin:0 0 10px",
      text: "A short video on the order of operations. It loads from YouTube only after you press play." }));
    v.appendChild(videoEmbed("dAgfnK528RA", "Order of operations (PEMDAS) — video"));

    var host = h("div");
    var fn = (window.ASTRO_DIAGRAMS || {})["math-pemdas"];
    if (typeof fn === "function") {
      try { fn(host); }
      catch (e) { host.appendChild(h("p", { class: "tool-intro", text: "(this tool could not load)" })); }
    }
    v.appendChild(host);

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "The order, in plain words", style: "margin-top:0" }),
      h("ol", { class: "prose", style: "margin:0" }, [
        h("li", { html: "<b>P</b>arentheses — do anything inside ( ) first; innermost brackets before outer ones." }),
        h("li", { html: "<b>E</b>xponents and roots — the little raised numbers (r², a³) and √." }),
        h("li", { html: "<b>M</b>ultiply and <b>D</b>ivide — one rank, left to right." }),
        h("li", { html: "<b>A</b>dd and <b>S</b>ubtract — one rank, left to right." })
      ]),
      h("p", { class: "prose", style: "margin:8px 0 0", html:
        "The name is a memory hook — <i>Please Excuse My Dear Aunt Sally</i>. Its own trap: <b>MD</b> and " +
        "<b>AS</b> are <i>not</i> “multiply before divide” or “add before subtract”. Each pair is a single " +
        "rank — read it left to right." })
    ]));

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Things that hide a bracket", style: "margin-top:0" }),
      h("ul", { class: "prose", style: "margin:0" }, [
        h("li", { html: "A <b>fraction bar</b> groups its whole top and its whole bottom: <b>(6 × 5) ÷ (3 × 3)</b>, done top-then-bottom-then-divide." }),
        h("li", { html: "A <b>√</b> sign covers everything under it — finish inside before taking the root." }),
        h("li", { html: "A number <b>touching</b> a bracket means multiply: <b>3(4 + 1) = 3 × 5 = 15</b>." }),
        h("li", { html: "A minus sign is weaker than a power: <b>−4² = −16</b>, but <b>(−4)² = 16</b>." })
      ]),
      h("p", { class: "prose", style: "margin:8px 0 0", html:
        "This is why <b>G · m₁ · m₂ ÷ r²</b> works out as “multiply the top, square the bottom, then divide”." })
    ]));

    v.appendChild(mathToolNav("pemdas"));
    mount(v);
    window.scrollTo(0, 0);
  }

  /* ---- TOOL: Gravity by Ratio (chapter-independent warm-up) ---
     Serves the "Practice: Gravity" assignment — comparing the force of gravity
     in two setups without ever touching G, using Newton's two plain-English
     rules (product of masses; inverse square of distance). */
  function renderGravRatio() {
    mathTitle("Gravity by Ratio");
    var v = h("div", { class: "view" });
    v.appendChild(h("button", { class: "back-link", onclick: function () { go("math"); },
      text: "← Math warm-ups" }));
    v.appendChild(h("div", { class: "eyebrow", text: "Math warm-up · step 6" }));
    v.appendChild(h("h1", { text: "Gravity by ratio — comparing two setups" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "Newton’s <a href=\"#/t/gravitation\">law of gravitation</a> carries a scary-looking constant <b>G</b>. " +
      "But when a question asks <em>how many times</em> stronger gravity is in one case than in another, " +
      "<b>G cancels out</b> — you only need Newton’s two plain-English rules, and nothing harder than " +
      "multiplying, dividing, and squaring." }));

    /* --- the idea --- */
    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Newton’s formula, said in words", style: "margin-top:0" }),
      h("div", { class: "prose", html:
        "<p>There is an attractive pull between any two masses. Its strength is:</p>" +
        "<ul>" +
        "<li><b>Directly proportional to the product of the masses.</b> “Product” just means " +
        "<b>multiply them</b>: m₁ × m₂. Heavier objects → stronger pull.</li>" +
        "<li><b>Inversely proportional to the square of the distance.</b> <b>Square</b> the distance " +
        "(r × r), then <b>divide</b> by it. Farther apart → weaker pull, and it drops off fast.</li>" +
        "</ul>" +
        "<p style='margin:0 0 6px'>Glue those together and give each setup a <b>strength score</b>:</p>" +
        "<p class='gr-score'>score = (m₁ × m₂) ÷ (r × r)</p>" +
        "<p style='margin:8px 0 0'>That score is <em>not</em> the real force in newtons — it is missing the " +
        "constant G. But when you <b>divide one setup’s score by the other’s</b>, the G on top and the G on " +
        "the bottom cancel, so <b>the ratio of the scores is exactly the ratio of the real forces</b>. That " +
        "is why the assignment lets you skip the full equation.</p>" +
        "<p style='margin:8px 0 0'>Units cancel the same way, so it does not matter that the distances are " +
        "in kilometres — just keep both cases in the same units.</p>" })
    ]));

    /* --- interactive comparison --- */
    function field(labelText, val) {
      var input = h("input", { type: "number", step: "any", min: "0", value: String(val) });
      var wrap = h("div", { class: "field" }, [h("label", { text: labelText }), input]);
      return { wrap: wrap, input: input };
    }
    var A = { r: field("Distance apart (r)", 7), m1: field("Mass 1 (m₁)", 10), m2: field("Mass 2 (m₂)", 4) };
    var B = { r: field("Distance apart (r)", 7), m1: field("Mass 1 (m₁)", 10), m2: field("Mass 2 (m₂)", 8) };

    function grn(x) {
      if (!isFinite(x)) return "—";
      var r = Math.round(x * 10000) / 10000;
      if (Math.abs(r) >= 1000) return String(Math.round(r));
      return String(r);
    }
    function approxFrac(x) {
      var best = null, err = 1;
      for (var d = 2; d <= 36; d++) {
        var n = Math.round(x * d);
        if (n <= 0) continue;
        var e = Math.abs(x - n / d);
        if (e < err) { err = e; best = [n, d]; }
      }
      return (best && err < 0.004) ? best[0] + "/" + best[1] : null;
    }

    var out = h("div", { class: "result" });

    function recompute() {
      function read(c) {
        return { r: parseFloat(c.r.input.value), m1: parseFloat(c.m1.input.value), m2: parseFloat(c.m2.input.value) };
      }
      var a = read(A), b = read(B);
      var bad = [a, b].some(function (c) {
        return !isFinite(c.r) || !isFinite(c.m1) || !isFinite(c.m2) || c.r <= 0 || c.m1 < 0 || c.m2 < 0;
      });
      if (bad) {
        out.innerHTML = "<div class='sub'>Type a positive distance and two masses (0 or more) into both cases.</div>";
        return;
      }
      var pA = a.m1 * a.m2, pB = b.m1 * b.m2;
      var dA = a.r * a.r, dB = b.r * b.r;
      var sA = pA / dA, sB = pB / dB;
      var ratio = sB / sA;
      var frac = (isFinite(ratio) && ratio > 0 && ratio < 1) ? approxFrac(ratio) : null;
      var sentence;
      if (!isFinite(ratio)) sentence = "Case A works out to zero pull, so there is nothing to compare against.";
      else if (Math.abs(ratio - 1) < 0.005) sentence = "Gravity is the same strength in both cases.";
      else if (ratio > 1) sentence = "Gravity in Case B is <b>" + ratio.toFixed(2) + " times</b> as strong as in Case A.";
      else sentence = "Gravity in Case B is <b>" + ratio.toFixed(2) + " times</b> that of Case A" +
        (frac ? " — about <b>" + frac + "</b> as strong" : " — i.e. weaker") + ".";

      out.innerHTML =
        "<div class='gr-wrap'><table class='gr-table'><tbody>" +
        "<tr><th></th><th>product of masses<span>m₁ × m₂</span></th>" +
        "<th>distance squared<span>r × r</span></th>" +
        "<th>strength score<span>product ÷ (r × r)</span></th></tr>" +
        "<tr><th>Case A</th><td>" + grn(a.m1) + " × " + grn(a.m2) + " = <b>" + grn(pA) + "</b></td>" +
        "<td>" + grn(a.r) + " × " + grn(a.r) + " = <b>" + grn(dA) + "</b></td>" +
        "<td><b>" + grn(sA) + "</b></td></tr>" +
        "<tr><th>Case B</th><td>" + grn(b.m1) + " × " + grn(b.m2) + " = <b>" + grn(pB) + "</b></td>" +
        "<td>" + grn(b.r) + " × " + grn(b.r) + " = <b>" + grn(dB) + "</b></td>" +
        "<td><b>" + grn(sB) + "</b></td></tr>" +
        "</tbody></table></div>" +
        "<div class='big'>Case B ÷ Case A = " + grn(sB) + " ÷ " + grn(sA) + " = " +
        (isFinite(ratio) ? ratio.toFixed(2) : "—") + "</div>" +
        "<div class='sub'>" + sentence + "</div>";
    }

    [A, B].forEach(function (c) {
      ["r", "m1", "m2"].forEach(function (k) {
        c[k].input.addEventListener("input", recompute);
      });
    });

    var presets = [
      { label: "Make one rock 3× heavier", a: [2, 4, 5], b: [2, 4, 15] },
      { label: "Move them twice as far apart", a: [10, 4, 6], b: [20, 4, 6] },
      { label: "Move them 3× as far apart", a: [2, 6, 4], b: [6, 6, 4] },
      { label: "Bring them half as far apart", a: [8, 6, 4], b: [4, 6, 4] },
      { label: "Double one mass", a: [5, 6, 4], b: [5, 12, 4] },
      { label: "Heavier AND farther", a: [2, 4, 5], b: [4, 8, 5] }
    ];
    var chips = h("div", { class: "chip-row" });
    presets.forEach(function (p) {
      chips.appendChild(h("button", { class: "chip", text: p.label, onclick: function () {
        A.r.input.value = p.a[0]; A.m1.input.value = p.a[1]; A.m2.input.value = p.a[2];
        B.r.input.value = p.b[0]; B.m1.input.value = p.b[1]; B.m2.input.value = p.b[2];
        recompute();
      } }));
    });

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Compare two setups", style: "margin-top:0" }),
      h("p", { class: "prose", style: "margin:0 0 12px", html:
        "Fill in each case, or tap a preset. The table shows every step; the bottom line is the answer, " +
        "rounded to the nearest hundredth the way the assignment asks." }),
      h("div", { class: "row" }, [
        h("div", { class: "gr-case" }, [h("h3", { text: "Case A", style: "margin:0 0 8px" }),
          A.r.wrap, A.m1.wrap, A.m2.wrap]),
        h("div", { class: "gr-case" }, [h("h3", { text: "Case B", style: "margin:0 0 8px" }),
          B.r.wrap, B.m1.wrap, B.m2.wrap])
      ]),
      chips,
      out
    ]));

    /* --- head-math shortcuts --- */
    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Shortcuts you can do in your head", style: "margin-top:0" }),
      h("div", { class: "prose", style: "margin:0" }, [
        h("p", { style: "margin:0 0 8px", html:
          "<b>Only the masses change</b> (distance the same in both cases): the distance part is identical " +
          "and cancels, so the answer is just <code>(m₁ × m₂ for B) ÷ (m₁ × m₂ for A)</code>." }),
        h("p", { style: "margin:0 0 8px", html:
          "<b>Only the distance changes</b> (masses the same): the answer is <code>(r for A ÷ r for B)²</code> " +
          "— note it is <b>A over B</b> (that is the “inverse”). Double the distance → (1 ÷ 2)² = <b>0.25</b>. " +
          "Triple it → (1 ÷ 3)² ≈ <b>0.11</b>. Halve it → (2 ÷ 1)² = <b>4</b>." }),
        h("p", { style: "margin:0", html:
          "<b>Both change:</b> work out the mass ratio and the distance ratio on their own, then " +
          "<b>multiply</b> the two together." })
      ])
    ]));

    /* --- worked examples --- */
    var ex = h("div", { class: "card" }, [
      h("h2", { text: "Three worked examples, step by step", style: "margin-top:0" }),
      h("p", { class: "prose", style: "margin:0 0 6px", html:
        "Picture two space rocks with gravity pulling them together. In each example we change one thing " +
        "and ask: <em>how many times stronger (or weaker) is the pull now?</em>" })
    ]);
    ex.appendChild(h("details", { class: "qa" }, [
      h("summary", { text: "1 · Only the mass changes → answer 3.00" }),
      h("div", { class: "answer", html:
        "<p>The rocks stay <b>2 m apart the whole time</b>. At first their masses are <b>4 kg and 5 kg</b>. " +
        "Then you swap the second rock for one that is <b>15 kg</b> (3× heavier). How much stronger is the pull?</p>" +
        "<p>Distance never changed, so it can’t be the reason — ignore it. Use <em>“the pull is proportional " +
        "to the <b>product</b> of the masses”</em>, and “product” just means multiply:</p>" +
        "<p>Before: 4 × 5 = <b>20</b><br>After: 4 × 15 = <b>60</b></p>" +
        "<p>Now divide the new number by the old one: 60 ÷ 20 = <b>3</b></p>" +
        "<p style='margin:0'>The pull is <b>3.00 times stronger</b>. Makes sense — you made one rock 3× " +
        "heavier, and mass is a straight multiplier.</p>" })
    ]));
    ex.appendChild(h("details", { class: "qa" }, [
      h("summary", { text: "2 · Only the distance changes → answer 0.25" }),
      h("div", { class: "answer", html:
        "<p>Same two rocks, <b>masses never change</b>. At first they are <b>10 m apart</b>. Then they drift " +
        "out to <b>20 m apart</b> (twice as far). How much does the pull change?</p>" +
        "<p>Masses never changed, so ignore them. Use <em>“the pull is inversely proportional to the " +
        "<b>square</b> of the distance”</em> — square the distance, and it sits on the bottom of a fraction " +
        "(that’s what “inversely” means).</p>" +
        "<p>Before: 1 ÷ (10 × 10) = 1 ÷ 100<br>After: 1 ÷ (20 × 20) = 1 ÷ 400</p>" +
        "<p>Divide the new by the old. Dividing by a fraction = flip it and multiply:<br>" +
        "(1 ÷ 400) ÷ (1 ÷ 100) = (1 ÷ 400) × 100 = 100 ÷ 400 = <b>0.25</b></p>" +
        "<p style='margin:0'>The pull is <b>0.25 times</b> as strong — a quarter. Fast way: take the two " +
        "distances as a fraction, <b>old over new</b>, and square it: (10 ÷ 20)² = (½)² = ¼ = <b>0.25</b>. " +
        "Twice as far already halves things once, and squaring halves them again.</p>" })
    ]));
    ex.appendChild(h("details", { class: "qa" }, [
      h("summary", { text: "3 · Mass and distance both change → answer 0.50" }),
      h("div", { class: "answer", html:
        "<p>The rocks start <b>2 m apart</b> with masses <b>4 kg and 5 kg</b>. Then <b>one rock doubles to " +
        "8 kg</b> <em>and</em> they move out to <b>4 m apart</b>. Now what?</p>" +
        "<p>Handle the two changes one at a time, then multiply the results.</p>" +
        "<p><b>Mass part:</b> 8 × 5 = 40, and it was 4 × 5 = 20. So 40 ÷ 20 = <b>2</b> (twice as strong).</p>" +
        "<p><b>Distance part:</b> old over new, squared: (2 ÷ 4)² = (½)² = <b>0.25</b> (a quarter as strong).</p>" +
        "<p>Combine: 2 × 0.25 = <b>0.5</b></p>" +
        "<p style='margin:0'>The pull ends up <b>0.50 times</b> what it was — half as strong. The heavier " +
        "mass pushed it up, but moving farther away pulled it down more.</p>" })
    ]));
    v.appendChild(ex);

    /* --- extra practice --- */
    var pr = h("div", { class: "card" }, [
      h("h2", { text: "Now you try", style: "margin-top:0" }),
      h("p", { class: "prose", style: "margin:0 0 10px", html:
        "Work each one out and round to the nearest hundredth, then tap to check. Stuck? Type the same " +
        "numbers into <b>Compare two setups</b> above and watch the steps." })
    ]);
    var practice = [
      { q: "The rocks stay 3 m apart. Their masses go from 2 kg and 6 kg to 2 kg and 18 kg.",
        a: "Distance didn’t change, so use the masses. Before: 2 × 6 = 12. After: 2 × 18 = 36. " +
           "36 ÷ 12 = <b>3.00</b> — three times stronger." },
      { q: "The masses stay the same. The rocks go from 5 m apart to 15 m apart.",
        a: "Masses didn’t change, so use the distance: old over new, squared. " +
           "(5 ÷ 15)² = (1 ÷ 3)² = 1 ÷ 9 ≈ <b>0.11</b> — about a ninth as strong." },
      { q: "The masses stay the same. The rocks go from 10 m apart to 5 m apart (closer).",
        a: "(10 ÷ 5)² = 2² = <b>4.00</b>. Cutting the distance in half makes the pull four times stronger." },
      { q: "The rocks start 2 m apart with masses 3 kg and 4 kg. Then one mass triples to 9 kg AND the gap doubles to 4 m.",
        a: "Mass part: 9 × 4 = 36, was 3 × 4 = 12, so 36 ÷ 12 = 3. Distance part: (2 ÷ 4)² = (½)² = 0.25. " +
           "Multiply: 3 × 0.25 = <b>0.75</b> — a bit weaker than before." }
    ];
    practice.forEach(function (item, i) {
      pr.appendChild(h("details", { class: "qa" }, [
        h("summary", { text: "Practice " + (i + 1) + " — " + item.q }),
        h("div", { class: "answer", html: item.a })
      ]));
    });
    v.appendChild(pr);

    v.appendChild(mathToolNav("gravratio"));
    recompute();
    mount(v);
    window.scrollTo(0, 0);
  }

  /* ---- TOOL: The Chapter 3 Formulas (part of "Do the Math") --- */
  function renderMathLab() {
    pageTitle("The Chapter 3 Formulas");
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Do the Math · Chapter 3" }));
    v.appendChild(h("h1", { text: "The Chapter 3 formulas — one small step at a time" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "Every calculation in Chapter 3, pulled from the reading. Pick a formula, pick a real example, then " +
      "either <b>watch it worked out</b> or <b>do each step yourself</b> — nothing harder than multiplying " +
      "two numbers. New to this? Run the <a href=\"#/math\">Math warm-ups</a> first, especially " +
      "<a href=\"#/t/pemdas\">Order of Operations</a>." }));

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "What each formula is for", style: "margin-top:0" }),
      h("ul", { class: "prose formula-map", style: "margin:0" }, [
        h("li", { html: "<b>Ellipse size</b> &nbsp;<code>a = (near + far) ÷ 2</code><br>How big is an orbit, from its closest and farthest points from the Sun?" }),
        h("li", { html: "<b>Distance ↔ year</b> &nbsp;<code>P² = a³</code><br>How long is a planet’s year, given its distance from the Sun — or the reverse?" }),
        h("li", { html: "<b>Force = mass × push</b> &nbsp;<code>F = m × a</code><br>How hard do you have to push to speed something up by a certain amount?" }),
        h("li", { html: "<b>Density</b> &nbsp;<code>density = mass ÷ volume</code><br>Is this stuff heavier or lighter than water — rock, gas, iron?" }),
        h("li", { html: "<b>Gravity vs distance</b> &nbsp;<code>pull → 1 ÷ (d × d)</code><br>How much weaker does gravity get as two things move apart?" }),
        h("li", { html: "<b>Gravity’s pull</b> &nbsp;<code>F = G · m₁ · m₂ ÷ r²</code><br>The actual strength of the pull between any two masses." }),
        h("li", { html: "<b>Weigh a star</b> &nbsp;<code>M = a³ ÷ P²</code><br>How heavy is a star, worked out from a planet orbiting it?" })
      ])
    ]));

    var DG = window.ASTRO_DIAGRAMS || {};
    var TABS = [
      { label: "Ellipse size", key: "math-semimajor",
        from: "§3.1 — an orbit’s size is the average of its closest and farthest distance from the Sun." },
      { label: "Distance ↔ year", key: "math-kepler3",
        from: "§3.1 — Kepler’s third law: the year squared equals the distance cubed (P² = a³)." },
      { label: "F = m × a", key: "math-newton2",
        from: "§3.2 — Newton’s second law: a bigger push, or a lighter object, means more speed-up." },
      { label: "Density", key: "math-density",
        from: "§3.2 — density is mass divided by volume; water comes out to 1." },
      { label: "Gravity vs distance", key: "math-inverse-square",
        from: "§3.3 — the inverse-square law: move farther away and the pull drops fast." },
      { label: "Gravity’s pull", key: "math-gravitation",
        from: "§3.3 — Newton’s law of gravitation, the full formula: F = G · m₁ · m₂ ÷ r²." },
      { label: "Weigh a star", key: "math-weigh",
        from: "§3.3 — Newton’s form of Kepler’s third law lets you weigh a star from a planet’s orbit." }
    ];

    var host = h("div");
    function show(i) {
      clear(host);
      host.appendChild(h("p", { class: "tool-intro", style: "margin:2px 0 12px", text: TABS[i].from }));
      var box = h("div");
      host.appendChild(box);
      var fn = DG[TABS[i].key];
      if (typeof fn === "function") {
        try { fn(box); }
        catch (e) { box.appendChild(h("p", { class: "tool-intro", text: "(this tool could not load)" })); }
      }
    }

    v.appendChild(segControl(TABS.map(function (t) { return t.label; }), 0, show, true));
    v.appendChild(host);
    show(0);

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "How to use each one", style: "margin-top:0" }),
      h("ul", { class: "prose", style: "margin:0" }, [
        h("li", { html: "The box at the top shows the formula and <b>what every letter means</b> in plain words." }),
        h("li", { html: "<b>Just show it worked</b> plays the whole thing start to finish. <b>Try it step by step</b> hands you one line at a time." }),
        h("li", { html: "Type each answer, or tap <b>Show me</b>. Stuck on a square or cube root? Guess a number and it tells you higher or lower." })
      ])
    ]));

    mount(v);
    window.scrollTo(0, 0);
  }

  /* ---- TOOL: Kepler’s Third Law (Ch. 3) ------------------------- */
  function renderKepler() {
    pageTitle("Kepler’s Third Law");
    var bodies = D.keplerBodies || [];
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Study tool" }));
    v.appendChild(h("h1", { text: "Kepler’s third law — farther out, longer year" }));
    v.appendChild(h("p", { class: "tool-intro", html:
      "Planets far from the Sun take much longer to go around it. Pick a planet to see how much longer, " +
      "then try the practice questions." }));

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "What's going on", style: "margin-top:0" }),
      h("div", { class: "prose", html:
        "<p><b>This law connects two things about a planet: its distance from the Sun and the length of its " +
        "year</b> (one full trip around).</p>" +
        "<p>The farther out a planet is, the longer its year — and not just a little. It is farther to travel " +
        "<i>and</i> the planet moves slower out there, so the year stretches out <b>much</b> faster than the " +
        "distance does. A planet twice as far from the Sun takes about <b>three times</b> as long, not twice.</p>" +
        "<p>Knowing this, if you can measure how long a planet's year is, you can work out how far away it is " +
        "— which is how the size of the whole solar system was first pinned down.</p>" })
    ]));
    v.appendChild(h("p", { class: "tool-intro", style: "margin:14px 0 0", text:
      "Now try it below — pick a planet, then test yourself." }));

    var modeHost = h("div");
    v.appendChild(segControl(["Show me", "Practice", "Matching game"], 0, function (idx) {
      stopMatch();
      if (idx === 0) showExplainer();
      else if (idx === 1) showPractice();
      else showMatch();
    }));
    v.appendChild(modeHost);

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "The quick idea", style: "margin-top:0" }),
      h("div", { class: "prose", html:
        "<p>A planet <b>2×</b> as far from the Sun takes about <b>3×</b> as long for one year. " +
        "<b>10×</b> as far &rarr; about <b>32×</b> as long.</p>" +
        "<p style='margin:0'><b>The exact rule</b> (for keen readers): the year squared equals the distance " +
        "cubed &mdash; <b>P² = a³</b> &mdash; with the year P in Earth-years and the distance a in AU " +
        "(Earth&rsquo;s distance from the Sun). Earth check: 1 &times; 1 = 1 &times; 1 &times; 1. ✓</p>" })
    ]));

    function kP(a) { return Math.sqrt(a * a * a); }
    function fmt(n) {
      if (n >= 1000) return commas(String(Math.round(n)));
      if (n >= 100) return n.toFixed(0);
      if (n >= 10) return (+n.toFixed(1)).toString();
      return (+n.toFixed(2)).toString();
    }
    function yrWord(P) {
      return (P < 2 ? P.toFixed(2) : String(Math.round(P))) + (P >= 1.5 ? " Earth-years" : " Earth-year");
    }
    var EMO = { Mercury: "☿️", Venus: "♀️", Earth: "🌍", Mars: "🔴", Jupiter: "🟠",
      Saturn: "🪐", Uranus: "🔵", Neptune: "🔷", Pluto: "🌑" };
    function pickBodies(names) {
      var out = [];
      names.forEach(function (nm) {
        for (var i = 0; i < bodies.length; i++) if (bodies[i].name === nm) out.push(bodies[i]);
      });
      return out.length ? out : bodies.slice(0, 4);
    }

    /* -------- MODE: Show me -------- */
    function showExplainer() {
      clear(modeHost);
      var picks = pickBodies(["Earth", "Mars", "Jupiter", "Saturn"]);
      var cur = picks[0];

      var row = h("div", { class: "hop-controls", style: "margin-top:4px" });
      var btns = [];
      picks.forEach(function (bd) {
        var b = h("button", { class: "btn big", text: (EMO[bd.name] || "") + " " + bd.name, onclick: function () {
          btns.forEach(function (x) { x.classList.remove("primary"); });
          b.classList.add("primary"); cur = bd; paint();
        } });
        btns.push(b); row.appendChild(b);
      });

      var big = h("p", { class: "hop-msg", style: "font-size:16px" });
      var mathBody = h("div", { class: "prose" });
      var math = h("details", { style: "margin-top:6px" }, [
        h("summary", { style: "cursor:pointer;color:var(--text-dim)", text: "See the math" }),
        mathBody
      ]);

      modeHost.appendChild(h("div", { class: "card" }, [
        h("p", { class: "hop-msg", style: "margin-top:0", text: "Tap a planet:" }),
        row, big, math
      ]));
      btns[0].classList.add("primary");
      paint();

      function paint() {
        var a = cur.a, P = cur.P;
        big.innerHTML = cur.name === "Earth"
          ? "🌍 <b>Earth</b> is <b>1 AU</b> from the Sun — that is the ruler we measure the other planets with. " +
            "One trip around takes exactly <b>1 Earth-year</b>."
          : (EMO[cur.name] || "") + " <b>" + cur.name + "</b> is about <b>" + Math.round(a) +
            "×</b> farther from the Sun than Earth. One trip around the Sun takes it <b>" + yrWord(P) + "</b>.";
        mathBody.innerHTML =
          "<p style='margin:0'>Distance a = <b>" + fmt(a) + " AU</b>. Cube it: " + fmt(a) + " &times; " +
          fmt(a) + " &times; " + fmt(a) + " = <b>" + fmt(a * a * a) + "</b>. Square root of that: <b>" +
          fmt(kP(a)) + "</b> &rarr; about <b>" + yrWord(P) + "</b>.</p>";
      }
    }

    /* -------- MODE: Practice -------- */
    function showPractice() {
      clear(modeHost);
      var streak = 0;
      var stars = h("div", { class: "star-row" });
      var card = h("div", { class: "card" });
      modeHost.appendChild(card);
      modeHost.appendChild(stars);
      function setStars() {
        stars.textContent = streak ? new Array(streak + 1).join("⭐") + (streak >= 5 ? "  on fire!" : "") : "";
      }
      var POOL = [4, 9, 16, 25];   // each gives a clean whole-number year (8, 27, 64, 125)
      function next() {
        clear(card);
        setStars();
        var a = POOL[Math.floor(Math.random() * POOL.length)];
        var P = kP(a), answer = fmt(P);
        var opts = [answer];
        [fmt(a), fmt(a * a), fmt(a * 2), fmt(P * 2)].forEach(function (d) {
          if (opts.indexOf(d) < 0 && opts.length < 3) opts.push(d);
        });
        while (opts.length < 3) {
          var pad = fmt(a + 1 + Math.floor(Math.random() * 20));
          if (opts.indexOf(pad) < 0) opts.push(pad);
        }
        var fb = h("div", { class: "hop-msg" });
        card.appendChild(h("p", { class: "hop-msg", style: "margin-top:0", html:
          "A planet is <b>" + a + " AU</b> from the Sun — that is <b>" + a + "×</b> Earth&rsquo;s distance. " +
          "About how long is its year?" }));
        card.appendChild(h("p", { class: "tool-intro", style: "margin:0 0 8px",
          text: "Tip: farther from the Sun always means a longer year." }));
        shuffle(opts).forEach(function (o) {
          var b = h("button", { class: "btn big", style: "display:block;width:100%;margin:6px 0",
            text: o + " Earth-years",
            onclick: function () {
              if (o === answer) {
                streak++; setStars();
                b.classList.add("done-btn");
                fb.innerHTML = "🎉 Yes! " + a + " AU &rarr; about <b>" + answer + " years</b>. " +
                  "(" + a + " cubed is " + fmt(a * a * a) + ", and its square root is " + fmt(P) + ".)";
                var all = card.querySelectorAll(".btn.big");
                for (var i = 0; i < all.length; i++) all[i].disabled = true;
                card.appendChild(h("div", { class: "hop-controls" }, [
                  h("button", { class: "btn big primary", text: "next →", onclick: next })
                ]));
              } else {
                b.disabled = true; b.classList.add("wrong");
                fb.textContent = Number(o) < Number(answer)
                  ? "Too short — it is farther out, so the year is longer. Try again."
                  : "A bit too long — try again.";
                streak = 0; setStars();
              }
            } });
          card.appendChild(b);
        });
        card.appendChild(fb);
      }
      next();
    }

    /* -------- MODE: Matching game -------- */
    function showMatch() {
      clear(modeHost);
      var host = h("div", { class: "card" });
      modeHost.appendChild(h("p", { class: "tool-intro", text:
        "Match each planet to how long its year is. Tap one on each side." }));
      modeHost.appendChild(host);
      (function spin() {
        var pool = shuffle(bodies.slice()).slice(0, 6);
        var pairs = pool.map(function (bd) {
          return { a: (EMO[bd.name] || "") + " " + bd.name, b: "≈ " + fmt(bd.P) + " yr" };
        });
        renderMatchGame(host, pairs, { leftLabel: "Planet", rightLabel: "Its year", onRestart: spin });
      })();
    }

    showExplainer();
    mount(v);
  }

  /* ---- FLASHCARDS -------------------------------------------------- */
  function flashMap() { return store.get("flash", {}); }
  function flashKnownCount() {
    var m = flashMap(), n = 0;
    for (var k in m) if (m[k] === "known") n++;
    return n;
  }
  function renderFlashcards() {
    pageTitle("Flashcards");
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Review" }));
    v.appendChild(h("h1", { text: "Glossary flashcards" }));

    var sectionOpts = [["all", "All sections"]].concat(D.sections.map(function (s) { return ["s" + s.id, "Section " + s.id + " — " + s.title]; }));
    var filterSel = h("select", {}, sectionOpts.map(function (o) { return h("option", { value: o[0], text: o[1] }); }));
    var modeSel = h("select", {}, [
      h("option", { value: "all", text: "All cards" }),
      h("option", { value: "review", text: "Only ‘needs review’ + new" })
    ]);

    var deck = [], pos = 0, flipped = false;
    var stageWrap = h("div");
    var progEl = h("div", { class: "fc-progress" });

    function buildDeck() {
      var m = flashMap();
      var list = D.glossary.filter(function (g) {
        if (filterSel.value !== "all" && ("s" + g.section) !== filterSel.value) return false;
        if (modeSel.value === "review" && m[g.term] === "known") return false;
        return true;
      });
      deck = shuffle(list);
      pos = 0; flipped = false;
      render();
    }

    function mark(status) {
      var m = flashMap();
      m[deck[pos].term] = status;
      store.set("flash", m);
      pos++; flipped = false;
      render();
    }

    function render() {
      clear(stageWrap);
      if (!deck.length) {
        stageWrap.appendChild(h("div", { class: "card", text: "No cards match this filter." }));
        progEl.textContent = "";
        return;
      }
      if (pos >= deck.length) {
        stageWrap.appendChild(h("div", { class: "card fc-done" }, [
          h("div", { class: "big", text: "Deck complete — " + deck.length + " cards" }),
          h("p", { text: flashKnownCount() + " of " + D.glossary.length + " glossary terms marked ‘got it’ overall." }),
          h("div", { class: "fc-actions" }, [
            h("button", { class: "btn primary", text: "Shuffle again", onclick: buildDeck }),
            h("button", { class: "btn", text: "Go to quiz", onclick: function () { go("quiz"); } })
          ])
        ]));
        progEl.textContent = "";
        refreshSidebar();
        return;
      }
      var card = deck[pos];
      var fc = h("div", { class: "flashcard" + (flipped ? " flipped" : "") });
      var inner = h("div", { class: "inner", onclick: function () { flipped = !flipped; fc.classList.toggle("flipped"); } }, [
        h("div", { class: "face front" }, [
          h("div", { class: "kicker", text: "Section " + card.section + " · term" }),
          h("div", { class: "term-front", text: card.term }),
          h("div", { class: "tap", text: "tap to flip" })
        ]),
        h("div", { class: "face back" }, [
          h("div", { class: "kicker", text: card.term }),
          h("div", { class: "def-back", text: card.def }),
          h("div", { class: "tap", text: "tap to flip" })
        ])
      ]);
      fc.appendChild(inner);
      stageWrap.appendChild(fc);
      stageWrap.appendChild(h("div", { class: "fc-actions" }, [
        h("button", { class: "btn", text: "↺ Needs review", onclick: function () { mark("review"); } }),
        h("button", { class: "btn primary", text: "Got it ✓", onclick: function () { mark("known"); } })
      ]));
      var known = flashMap();
      var status = known[card.term];
      progEl.textContent = "Card " + (pos + 1) + " of " + deck.length +
        (status ? "  ·  previously: " + (status === "known" ? "got it" : "needs review") : "");
    }

    var mode = "cards";   // "cards" | "list" | "match"

    /* -------- LIST: every card on one page -------- */
    var hideDefs = false;
    var listInner = h("div");
    var hideChk = h("input", { type: "checkbox" });
    hideChk.addEventListener("change", function () { hideDefs = hideChk.checked; renderList(); });
    var listWrap = h("div", { style: "display:none" }, [
      h("p", { class: "tool-intro", style: "margin:0 0 4px", text:
        "Every term for this filter on one page — no clicking through. Mark them as you scan; " +
        "the section and “needs review” filters above still apply." }),
      h("label", { class: "fc-listopt" }, [hideChk, h("span", { text: "Hide definitions (tap a card to reveal)" })]),
      listInner
    ]);

    function setStatus(term, status) {
      var m = flashMap();
      if (m[term] === status) delete m[term]; else m[term] = status;
      store.set("flash", m);
      renderList();
      refreshSidebar();
    }

    function renderList() {
      clear(listInner);
      var m = flashMap();
      var total = 0;
      D.sections.forEach(function (s) {
        var terms = D.glossary.filter(function (g) {
          if (g.section !== s.id) return false;
          if (filterSel.value !== "all" && ("s" + g.section) !== filterSel.value) return false;
          if (modeSel.value === "review" && m[g.term] === "known") return false;
          return true;
        });
        if (!terms.length) return;
        total += terms.length;
        var card = h("div", { class: "card" }, [h("h2", { text: s.id + "  " + s.title, style: "margin-top:0" })]);
        terms.forEach(function (g) {
          var status = m[g.term];
          var defEl = h("div", { class: "fc-li-def" + (hideDefs ? " blur" : ""), text: g.def });
          var row = h("div", { class: "fc-li" + (status ? " " + status : "") }, [
            h("div", { class: "fc-li-term", text: g.term }),
            defEl,
            h("div", { class: "fc-li-actions" }, [
              h("button", { class: "btn small", text: status === "review" ? "↺ needs review ✓" : "↺ needs review",
                onclick: function (e) { e.stopPropagation(); setStatus(g.term, "review"); } }),
              h("button", { class: "btn small primary", text: status === "known" ? "got it ✓✓" : "got it ✓",
                onclick: function (e) { e.stopPropagation(); setStatus(g.term, "known"); } })
            ])
          ]);
          if (hideDefs) row.addEventListener("click", function () { defEl.classList.toggle("blur"); });
          card.appendChild(row);
        });
        listInner.appendChild(card);
      });
      if (!total) {
        listInner.appendChild(h("div", { class: "card", text: "No terms match this filter." }));
      } else {
        listInner.insertBefore(
          h("div", { class: "fc-list-count", text: total + " term" + (total === 1 ? "" : "s") + " shown" }),
          listInner.firstChild);
      }
    }

    /* -------- MATCH game -------- */
    var matchInner = h("div");
    var matchWrap = h("div", { style: "display:none" }, [
      h("p", { class: "tool-intro", text: "Match each term to its definition — the section filter still applies." }),
      matchInner
    ]);
    function newTermMatch() {
      var pool = D.glossary.filter(function (g) {
        return filterSel.value === "all" || ("s" + g.section) === filterSel.value;
      });
      clear(matchInner);
      if (pool.length < 3) {
        matchInner.appendChild(h("div", { class: "card", text: "Choose a filter with at least 3 terms to play the matching game." }));
        return;
      }
      var pairs = shuffle(pool).slice(0, Math.min(5, pool.length)).map(function (g) {
        return { a: g.term, b: g.def };
      });
      renderMatchGame(matchInner, pairs, { leftLabel: "Term", rightLabel: "Definition", onRestart: newTermMatch });
    }

    function refreshCurrent() {
      if (mode === "cards") buildDeck();
      else if (mode === "list") renderList();
      else newTermMatch();
    }
    filterSel.addEventListener("change", refreshCurrent);
    modeSel.addEventListener("change", function () { mode === "list" ? renderList() : buildDeck(); });

    var shuffleBtn = h("button", { class: "btn small", text: "Shuffle",
      onclick: function () { mode === "match" ? newTermMatch() : buildDeck(); } });

    v.appendChild(segControl(["Study cards", "List all", "Match game"], 0, function (idx) {
      stopMatch();
      mode = idx === 0 ? "cards" : idx === 1 ? "list" : "match";
      stageWrap.style.display = mode === "cards" ? "" : "none";
      progEl.style.display = mode === "cards" ? "" : "none";
      listWrap.style.display = mode === "list" ? "" : "none";
      matchWrap.style.display = mode === "match" ? "" : "none";
      modeSel.style.display = mode === "match" ? "none" : "";
      shuffleBtn.style.display = mode === "list" ? "none" : "";
      if (mode === "list") renderList();
      else if (mode === "match") newTermMatch();
    }));
    v.appendChild(h("div", { class: "fc-toolbar" }, [filterSel, modeSel, shuffleBtn]));
    v.appendChild(stageWrap);
    v.appendChild(listWrap);
    v.appendChild(matchWrap);
    v.appendChild(progEl);

    document.addEventListener("keydown", fcKeys);
    function fcKeys(e) {
      if (currentHash() !== "flashcards") { document.removeEventListener("keydown", fcKeys); return; }
      if (mode !== "cards") return;
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); var fc = qs(".flashcard", stageWrap); if (fc) { flipped = !flipped; fc.classList.toggle("flipped"); } }
      if (e.key === "1") mark("review");
      if (e.key === "2") mark("known");
    }

    buildDeck();
    mount(v);
  }

  /* ---- QUIZ ------------------------------------------------------ */
  function sectionPages(id) {
    var s = (D.sections || []).filter(function (x) { return x.id === id; })[0];
    return s && s.pages ? s.pages : "";
  }
  // A "revisit the reading" line for a quiz question — page ref + a button
  // that opens the section in a new tab so the quiz in this tab is preserved.
  function quizSourceLine(sectionId) {
    var pg = sectionPages(sectionId);
    return h("div", { class: "q-source" }, [
      h("span", { text: "From Section " + sectionId + (pg ? " · " + pg + " (printed book)" : "") }),
      h("button", { class: "btn small ghost", text: "Reread this section ↗",
        title: "Opens the reading in a new tab so your quiz stays where it is",
        onclick: function () {
          window.open(location.pathname + location.search + "#/s/" + sectionId, "_blank", "noopener");
        } })
    ]);
  }

  function renderQuiz() {
    pageTitle("Self-Test Quiz");
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Review" }));
    v.appendChild(h("h1", { text: "Chapter " + D.meta.chapter + " self-test" }));

    var best = store.get("quizBest", null);
    var bestFrac = store.get("quizBestFrac", null);

    var setup = h("div", { class: "card quiz-setup" }, [
      h("p", { class: "tool-intro", text:
        "Multiple choice with instant feedback and explanations. Your best score is saved in this browser." }),
      h("div", {}, [
        h("button", { class: "btn primary", text: "Quick quiz (10 questions)", onclick: function () { start(10); } }),
        h("button", { class: "btn", text: "Full quiz (" + D.quiz.length + " questions)", style: "margin-left:10px", onclick: function () { start(D.quiz.length); } })
      ]),
      best != null ? h("div", { class: "best-badge", text: "★ Best so far: " + best + "%  (" + bestFrac + ")" }) : null
    ]);
    v.appendChild(setup);
    var host = h("div");
    v.appendChild(host);

    function start(n) {
      var qs2 = shuffle(D.quiz).slice(0, n).map(function (q) {
        var choices = q.choices.map(function (c, i) {
          return { text: c, correct: i === q.answer, why: (q.whyWrong && q.whyWrong[i]) || "" };
        });
        return { q: q.q, section: q.section, explain: q.explain, choices: shuffle(choices) };
      });
      var idx = 0, score = 0, missed = [];
      setup.style.display = "none";
      showQ();

      function showQ() {
        clear(host);
        var q = qs2[idx];
        var card = h("div", { class: "card" });
        card.appendChild(h("div", { class: "quiz-meta" }, [
          h("span", { text: "Question " + (idx + 1) + " of " + qs2.length }),
          h("span", { text: "Section " + q.section + "  ·  score " + score })
        ]));
        var pbar = h("span", { style: "width:" + (idx / qs2.length * 100) + "%" });
        card.appendChild(h("div", { class: "quiz-progress-bar" }, pbar));
        card.appendChild(h("div", { class: "q-text", text: q.q }));

        var answered = false;
        var explainBox = h("div");
        var nextWrap = h("div", { class: "quiz-nav" });

        q.choices.forEach(function (c, i) {
          var letter = "ABCD"[i];
          var btn = h("button", { class: "q-choice" }, [
            h("span", { class: "letter", text: letter }),
            document.createTextNode(c.text)
          ]);
          btn.addEventListener("click", function () {
            if (answered) return;
            answered = true;
            var all = card.querySelectorAll(".q-choice");
            for (var k = 0; k < all.length; k++) {
              all[k].disabled = true;
              if (q.choices[k].correct) all[k].classList.add("correct");
            }
            var correctChoice = q.choices.filter(function (x) { return x.correct; })[0];
            if (c.correct) {
              btn.classList.add("correct"); score++;
              explainBox.appendChild(h("div", { class: "q-explain ok" }, [
                h("strong", { text: "Correct. " }), document.createTextNode(q.explain)
              ]));
            } else {
              btn.classList.add("wrong");
              q._picked = c;
              missed.push(q);
              explainBox.appendChild(h("div", { class: "q-explain no" }, [
                h("strong", { text: "Not quite. " }),
                document.createTextNode(c.why || ("“" + c.text + "” isn't right here."))
              ]));
              explainBox.appendChild(h("div", { class: "q-explain ok" }, [
                h("strong", { text: "The answer: " }),
                document.createTextNode((correctChoice ? correctChoice.text + " — " : "") + q.explain)
              ]));
            }
            explainBox.appendChild(quizSourceLine(q.section));
            var nb = h("button", { class: "btn primary", text: idx === qs2.length - 1 ? "See results →" : "Next question →" });
            nb.addEventListener("click", function () {
              idx++;
              if (idx >= qs2.length) finish();
              else showQ();
            });
            nextWrap.appendChild(nb);
            nb.focus();
          });
          card.appendChild(btn);
        });
        card.appendChild(explainBox);
        card.appendChild(nextWrap);
        host.appendChild(card);
        window.scrollTo(0, 0);
      }

      function finish() {
        clear(host);
        var pct = Math.round(score / qs2.length * 100);
        var prevBest = store.get("quizBest", null);
        var isBest = prevBest == null || pct > prevBest;
        if (isBest) { store.set("quizBest", pct); store.set("quizBestFrac", score + "/" + qs2.length); }

        var ring = h("div", { class: "score-ring", style: "--p:" + pct }, [
          h("div", {}, [
            h("div", { class: "pct", text: pct + "%" }),
            h("div", { class: "frac", text: score + " / " + qs2.length })
          ])
        ]);
        var res = h("div", { class: "card quiz-result" }, [
          h("h2", { text: pct >= 80 ? "Strong work." : pct >= 60 ? "Good — review the misses." : "Keep going — revisit the sections.", style: "margin-top:0" }),
          ring,
          isBest ? h("div", { class: "best-badge", text: "★ New best score!" }) : h("div", { class: "best-badge", text: "Best so far: " + store.get("quizBest") + "%" }),
          h("div", { style: "margin-top:14px" }, [
            h("button", { class: "btn primary", text: "Retake quick quiz", onclick: function () { host && clear(host); setup.style.display = ""; start(10); } }),
            h("button", { class: "btn", style: "margin-left:10px", text: "Back to setup", onclick: function () { clear(host); setup.style.display = ""; } })
          ])
        ]);
        host.appendChild(res);

        if (missed.length) {
          var rev = h("div", { class: "card" }, [h("h2", { text: "Review: " + missed.length + " missed", style: "margin-top:0" })]);
          missed.forEach(function (q) {
            var correct = q.choices.filter(function (c) { return c.correct; })[0];
            rev.appendChild(h("div", { class: "review-item" }, [
              h("div", { class: "ri-q", text: q.q }),
              q._picked ? h("div", { class: "ri-line ri-yours", text:
                "You picked: " + q._picked.text + (q._picked.why ? " — " + q._picked.why : "") }) : null,
              h("div", { class: "ri-line ri-correct", text: "Answer: " + correct.text }),
              h("div", { class: "ri-line", style: "color:var(--text-dim)", text: q.explain }),
              h("button", { class: "btn small ghost", style: "margin-top:8px",
                text: "Reread Section " + q.section + (sectionPages(q.section) ? " · " + sectionPages(q.section) : ""),
                onclick: function () { go("s/" + q.section); } })
            ]));
          });
          host.appendChild(rev);
        }
        refreshSidebar();
        window.scrollTo(0, 0);
      }
    }

    mount(v);
  }

  /* ---- GLOSSARY ------------------------------------------------- */
  function renderGlossary() {
    pageTitle("Glossary");
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Review" }));
    v.appendChild(h("h1", { text: "Chapter " + D.meta.chapter + " glossary" }));
    v.appendChild(h("p", { class: "tool-intro", text: D.glossary.length + " terms, grouped by section. Use these as your flashcard deck too." }));

    D.sections.forEach(function (s) {
      var terms = D.glossary.filter(function (g) { return g.section === s.id; });
      if (!terms.length) return;
      var card = h("div", { class: "card", id: "gloss-" + s.id }, [
        h("h2", { text: s.id + "  " + s.title, style: "margin-top:0" })
      ]);
      terms.forEach(function (g) {
        card.appendChild(h("div", { class: "review-item", "data-term": g.term.toLowerCase() }, [
          h("div", { class: "ri-q", text: g.term }),
          h("div", { style: "color:var(--text-dim);margin-top:4px", text: g.def })
        ]));
      });
      v.appendChild(card);
    });
    mount(v);
  }
  function highlightGlossary(term) {
    if (currentHash() !== "glossary") return;
    var nodes = mainEl.querySelectorAll("[data-term]");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].getAttribute("data-term") === term.toLowerCase()) {
        nodes[i].scrollIntoView({ behavior: "smooth", block: "center" });
        nodes[i].style.transition = "background .3s";
        nodes[i].style.background = "color-mix(in srgb, var(--accent) 20%, transparent)";
        setTimeout(function (n) { return function () { n.style.background = ""; }; }(nodes[i]), 1600);
        break;
      }
    }
  }

  /* ---- PROGRESS ----------------------------------------------- */
  function renderProgress() {
    pageTitle("My Progress");
    var v = h("div", { class: "view" });
    v.appendChild(h("div", { class: "eyebrow", text: "Review" }));
    v.appendChild(h("h1", { text: "My progress" }));

    var read = readSet().length;
    var flashK = flashKnownCount();
    var best = store.get("quizBest", null);
    v.appendChild(h("div", { class: "overview-stats" }, [
      stat(Math.round(read / D.sections.length * 100) + "%", "sections reviewed"),
      stat(flashK + " / " + D.glossary.length, "terms mastered"),
      stat(best == null ? "—" : best + "%", "best quiz score")
    ]));

    var listCard = h("div", { class: "card" }, [h("h2", { text: "Sections", style: "margin-top:0" })]);
    var list = h("div", { class: "prog-section-list" });
    D.sections.forEach(function (s) {
      var row = h("div", { class: "prog-row" });
      var cb = h("input", { type: "checkbox" });
      cb.checked = isRead(s.id);
      cb.addEventListener("change", function () { setRead(s.id, cb.checked); paintPct(); });
      row.appendChild(cb);
      row.appendChild(h("div", { class: "p-title" }, [
        document.createTextNode(s.id + "  " + s.title),
        h("small", { text: "~" + s.minutes + " min · " + s.keyIdeas.length + " key ideas" })
      ]));
      row.appendChild(h("button", { class: "btn small ghost", text: "Open", onclick: function () { go("s/" + s.id); } }));
      list.appendChild(row);
    });
    listCard.appendChild(list);
    v.appendChild(listCard);

    var pctText = h("div", { class: "sidebar-progress", style: "margin:0" });
    function paintPct() {
      var n = readSet().length;
      pctText.innerHTML = n + " of " + D.sections.length + " done";
    }
    paintPct();

    v.appendChild(h("div", { class: "card" }, [
      h("h2", { text: "Reset", style: "margin-top:0" }),
      h("p", { class: "tool-intro", text: "These clear data saved in this browser only." }),
      h("button", { class: "btn small", text: "Reset section progress", onclick: function () {
        if (confirm("Clear which sections are marked reviewed?")) { store.set("read", []); go("progress"); }
      } }),
      h("button", { class: "btn small", style: "margin-left:8px", text: "Reset flashcards", onclick: function () {
        if (confirm("Clear all flashcard ‘got it / needs review’ marks?")) { store.del("flash"); go("progress"); }
      } }),
      h("button", { class: "btn small", style: "margin-left:8px", text: "Reset quiz best", onclick: function () {
        if (confirm("Clear your best quiz score?")) { store.del("quizBest"); store.del("quizBestFrac"); go("progress"); }
      } }),
      h("button", { class: "btn small danger", style: "margin-left:8px", text: "Erase this chapter's data", onclick: function () {
        if (confirm("Erase all saved data for Chapter " + D.meta.chapter + " (reviewed sections, notes, flashcards, quiz score)?")) {
          var keys = [], p = pfx();
          for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf(p) === 0) keys.push(k); }
          keys.forEach(function (k) { localStorage.removeItem(k); });
          go("overview");
        }
      } })
    ]));

    mount(v);
  }

  /* -------------------------------------------------------- mount + route */
  function mount(viewNode) {
    clear(mainEl);
    mainEl.appendChild(viewNode);
    mainEl.appendChild(h("div", { class: "attribution", html:
      "Content adapted from <a href=\"https://openstax.org/books/astronomy-2e\" target=\"_blank\" rel=\"noopener\">OpenStax Astronomy 2e</a>, " +
      "licensed CC BY 4.0. This interactive guide adds study features and is for personal learning use. " +
      "Photographs are from the same book (downscaled for the web); each keeps its original caption and credit line.<br>" +
      "Page numbers cite the printed book (shown at the foot of each PDF page). In " +
      "<span class=\"mono\">astronomy-2e_-_WEB (1).pdf</span>, the PDF file-page number = book page + 18." }));
    // every view starts at the top — otherwise a short view (e.g. a study tool)
    // opened while scrolled down inside a long section looks "scrolled to the bottom"
    window.scrollTo(0, 0);
    refreshSidebar();
  }

  function go(hash) {
    if (currentHash() === hash) route();
    else location.hash = "#/" + hash;
  }

  var TOOL_ROUTES = {
    "t/sci": ["sci", function () { renderSci(); }],
    "t/round": ["round", function () { renderRound(); }],
    "t/light": ["light", function () { renderLight(); }],
    "t/calendar": ["calendar", function () { renderCalendar(); }],
    "t/scale": ["scale", function () { renderScale(); }],
    "t/elements": ["elements", function () { renderElements(); }],
    "t/astronomers": ["astronomers", function () { renderAstronomers(); }],
    "t/mul": ["mul", function () { renderMul(); }],
    "t/exponents": ["exponents", function () { renderExponents(); }],
    "t/pemdas": ["pemdas", function () { renderPemdas(); }],
    "t/gravratio": ["gravratio", function () { renderGravRatio(); }],
    "t/mathlab": ["mathlab", function () { renderMathLab(); }],
    "t/kepler1": ["kepler1", function () { renderLawTool(LAW_TOOLS.kepler1); }],
    "t/kepler2": ["kepler2", function () { renderLawTool(LAW_TOOLS.kepler2); }],
    "t/kepler3": ["kepler3", function () { renderKepler(); }],
    "t/newton1": ["newton1", function () { renderLawTool(LAW_TOOLS.newton1); }],
    "t/newton2": ["newton2", function () { renderLawTool(LAW_TOOLS.newton2); }],
    "t/newton3": ["newton3", function () { renderLawTool(LAW_TOOLS.newton3); }],
    "t/gravitation": ["gravitation", function () { renderLawTool(LAW_TOOLS.gravitation); }],
    "t/physicists": ["physicists", function () { renderPhysicists(); }],
    "t/sizesort": ["sizesort", function () { renderSizeSort(); }],
    "t/skycoords": ["skycoords", function () { renderLawTool(CH4_TOOLS.skycoords); }],
    "t/seasons": ["seasons", function () { renderLawTool(CH4_TOOLS.seasons); }],
    "t/keepingtime": ["keepingtime", function () { renderLawTool(CH4_TOOLS.keepingtime); }],
    "t/calendar4": ["calendar4", function () { renderLawTool(CH4_TOOLS.calendar4); }],
    "t/moonphases": ["moonphases", function () { renderLawTool(CH4_TOOLS.moonphases); }],
    "t/tides": ["tides", function () { renderLawTool(CH4_TOOLS.tides); }],
    "t/eclipses": ["eclipses", function () { renderLawTool(CH4_TOOLS.eclipses); }],
    "t/lightwaves": ["lightwaves", function () { renderLawTool(CH5_TOOLS.lightwaves); }],
    "t/emspectrum": ["emspectrum", function () { renderLawTool(CH5_TOOLS.emspectrum); }],
    "t/spectroscopy": ["spectroscopy", function () { renderLawTool(CH5_TOOLS.spectroscopy); }],
    "t/atomstructure": ["atomstructure", function () { renderLawTool(CH5_TOOLS.atomstructure); }],
    "t/spectrallines": ["spectrallines", function () { renderLawTool(CH5_TOOLS.spectrallines); }],
    "t/doppler": ["doppler", function () { renderLawTool(CH5_TOOLS.doppler); }],
    "t/telescopes": ["telescopes", function () { renderLawTool(CH6_TOOLS.telescopes); }],
    "t/telescopestoday": ["telescopestoday", function () { renderLawTool(CH6_TOOLS.telescopestoday); }],
    "t/detectors": ["detectors", function () { renderLawTool(CH6_TOOLS.detectors); }],
    "t/radiotelescopes": ["radiotelescopes", function () { renderLawTool(CH6_TOOLS.radiotelescopes); }],
    "t/spaceobs": ["spaceobs", function () { renderLawTool(CH6_TOOLS.spaceobs); }],
    "t/futurescopes": ["futurescopes", function () { renderLawTool(CH6_TOOLS.futurescopes); }]
  };

  function route() {
    var hash = currentHash();
    closeSidebar();
    stopMatch();

    if (hash === "dashboard") { rebuildNav(); renderDashboard(); refreshSidebar(); return; }
    if (hash === "math") { rebuildNav(); renderMathHub(); refreshSidebar(); return; }
    if (hash === "activities") { rebuildNav(); renderActivitiesHub(); refreshSidebar(); return; }

    // keep the active chapter in sync with a section deep-link
    var sm = hash.match(/^s\/(\d+)\./);
    if (sm && Number(sm[1]) !== activeChapter && CHAPTERS[Number(sm[1])]) setActiveChapter(Number(sm[1]));
    rebuildNav();

    var m;
    if (hash === "overview") renderOverview();
    else if ((m = hash.match(/^s\/(.+)$/))) renderSection(m[1]);
    else if (TOOL_ROUTES[hash]) {
      var tr = TOOL_ROUTES[hash];
      if (isMathRoute(hash) || isActivityRoute(hash) || hasTool(tr[0])) tr[1](); else renderOverview();
    }
    else if (hash === "flashcards") renderFlashcards();
    else if (hash === "quiz") renderQuiz();
    else if (hash === "glossary") renderGlossary();
    else if (hash === "progress") renderProgress();
    else renderDashboard();
    refreshSidebar();
  }

  /* --------------------------------------------------- glossary tooltips */
  function initTermPop() {
    var pop = qs("#termPop");
    mainEl.addEventListener("mouseover", function (e) {
      var t = e.target.closest && e.target.closest(".term");
      if (!t) return;
      var g = lookupTerm(t.textContent);
      if (!g) return;
      pop.innerHTML = "<b>" + g.term + "</b>" + g.def;
      pop.classList.add("show");
      movePop(e);
    });
    mainEl.addEventListener("mousemove", function (e) {
      if (pop.classList.contains("show")) movePop(e);
    });
    mainEl.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(".term")) pop.classList.remove("show");
    });

    // tap-to-define — the only way to see a term's meaning on a touch screen
    mainEl.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest(".term");
      if (!t) return;
      var g = lookupTerm(t.textContent);
      if (!g) return;
      e.stopPropagation();
      if (pop.classList.contains("show") && pop._anchor === t) {
        pop.classList.remove("show"); pop._anchor = null; return;
      }
      pop._anchor = t;
      pop.innerHTML = "<b>" + g.term + "</b>" + g.def;
      pop.classList.add("show");
      var r = t.getBoundingClientRect();
      var pr = pop.getBoundingClientRect();
      var x = Math.min(r.left, window.innerWidth - pr.width - 8);
      var y = r.bottom + 8;
      if (y + pr.height > window.innerHeight - 8) y = Math.max(8, r.top - pr.height - 8);
      pop.style.left = Math.max(8, x) + "px";
      pop.style.top = y + "px";
    });
    document.addEventListener("click", function () {
      pop.classList.remove("show"); pop._anchor = null;
    });
    window.addEventListener("scroll", function () {
      if (pop._anchor) { pop.classList.remove("show"); pop._anchor = null; }
    }, true);

    function movePop(e) {
      var pad = 14;
      var x = e.clientX + pad, y = e.clientY + pad;
      var r = pop.getBoundingClientRect();
      if (x + r.width > window.innerWidth - 8) x = e.clientX - r.width - pad;
      if (y + r.height > window.innerHeight - 8) y = e.clientY - r.height - pad;
      pop.style.left = x + "px";
      pop.style.top = y + "px";
    }
  }

  /* ------------------------------------------------------------- startup */
  function init() {
    migrateLegacy();

    var savedTheme = themeStore.get();
    if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
      document.documentElement.setAttribute("data-theme", "light");

    var savedChapter = parseInt(localStorage.getItem("astro.activeChapter"), 10);
    setActiveChapter(CHAPTERS[savedChapter] ? savedChapter : chapterNums[0]);

    buildShell();
    rebuildNav();
    initTermPop();
    window.addEventListener("hashchange", route);
    route();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
