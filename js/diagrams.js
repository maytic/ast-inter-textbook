/* =============================================================================
   Interactive inline diagrams for the study guide.
   Each renderer takes a host element (a <div data-diagram="key">) and fills it.
   Pure SVG + range inputs, theme-aware via CSS classes / CSS vars.
   Exposes window.ASTRO_DIAGRAMS = { key: fn(hostEl) }.
   ============================================================================= */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  function S(name, attrs, kids) {
    var e = document.createElementNS(NS, name);
    for (var k in (attrs || {})) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function T(x, y, s, cls) {
    var t = S("text", { x: x, y: y, "class": cls || null });
    t.textContent = s;
    return t;
  }
  function E(name, attrs, kids) {
    var e = document.createElement(name);
    for (var k in (attrs || {})) {
      if (k === "text") e.textContent = attrs[k];
      else if (k === "class") e.className = attrs[k];
      else if (k === "html") e.innerHTML = attrs[k];
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function clr(n) { while (n.firstChild) n.removeChild(n.firstChild); }

  function frame(host, title, caption) {
    clr(host);
    var stage = E("div", { "class": "dg-stage" });
    var controls = E("div", { "class": "dg-controls" });
    var readout = E("div", { "class": "dg-readout" });
    var fig = E("figure", { "class": "diagram" }, [
      title ? E("div", { "class": "dg-title", text: title }) : null,
      stage, controls, readout,
      caption ? E("p", { "class": "dg-cap", text: caption }) : null
    ]);
    host.appendChild(fig);
    return { stage: stage, controls: controls, readout: readout, fig: fig };
  }
  function slider(controls, label, min, max, val, step, on) {
    var input = E("input", { type: "range", min: min, max: max, value: val, step: step || 1 });
    var out = E("span", { "class": "dg-sv" });
    controls.appendChild(E("label", { "class": "dg-slider" }, [E("span", { text: label }), input, out]));
    input.addEventListener("input", function () { on(parseFloat(input.value), out); });
    var api = { input: input, out: out, set: function (v) { input.value = v; on(parseFloat(v), out); } };
    return api;
  }
  function playBtn(controls, tick) {
    var btn = E("button", { "class": "dg-play", type: "button", text: "▶ Play" });
    var raf = null, playing = false;
    function stop() { playing = false; if (raf) cancelAnimationFrame(raf); raf = null; btn.textContent = "▶ Play"; }
    function loop() {
      if (!playing) return;
      if (!document.body.contains(btn)) { stop(); return; }
      tick();
      raf = requestAnimationFrame(loop);
    }
    btn.addEventListener("click", function () {
      if (playing) stop();
      else { playing = true; btn.textContent = "❚❚ Pause"; loop(); }
    });
    controls.appendChild(btn);
    return { stop: stop, playing: function () { return playing; } };
  }
  function svg(stage, w, h) {
    var s = S("svg", { viewBox: "0 0 " + w + " " + h, "class": "dg-svg" });
    stage.appendChild(s);
    return s;
  }
  function arcPath(cx, cy, rad, a0, a1) {
    var x0 = cx + rad * Math.cos(a0), y0 = cy + rad * Math.sin(a0);
    var x1 = cx + rad * Math.cos(a1), y1 = cy + rad * Math.sin(a1);
    var sweep = a1 > a0 ? 1 : 0;
    return "M " + x0 + " " + y0 + " A " + rad + " " + rad + " 0 0 " + sweep + " " + x1 + " " + y1;
  }

  var D = {};

  /* ---- 2.1  Your sky depends on your latitude ---------------------- */
  D["sky-latitude"] = function (host) {
    var r = frame(host, "Your sky depends on your latitude",
      "Drag your latitude. The north celestial pole sits above the northern horizon at an altitude equal to your latitude, and stars within that angle of it never set (the shaded cap).");
    var Ox = 190, Oy = 190, R = 150;
    var s = svg(r.stage, 380, 235);
    var cap = S("circle", { "class": "dg-capzone" });
    var stars = S("g", {});
    [[-0.55, -0.45], [-0.28, -0.78], [-0.8, -0.2], [0.22, -0.62], [0.5, -0.32],
     [0.08, -0.88], [-0.5, -0.62], [0.36, -0.78], [-0.15, -0.5]].forEach(function (p) {
      stars.appendChild(S("circle", { cx: Ox + p[0] * R, cy: Oy + p[1] * R, r: 1.7, "class": "dg-star" }));
    });
    var ground = S("line", { x1: 22, y1: Oy, x2: 366, y2: Oy, "class": "dg-ground" });
    var zen = S("line", { x1: Ox, y1: Oy, x2: Ox, y2: Oy - R, "class": "dg-dash" });
    var ray = S("line", { "class": "dg-ray" });
    var arc = S("path", { "class": "dg-anglearc" });
    var pole = S("circle", { r: 4, "class": "dg-pole" });
    var pLbl = T(0, 0, "NCP", "dg-lbl");
    var aLbl = T(0, 0, "", "dg-lbl");
    [cap, stars, ground, zen, ray, arc, pole,
     T(24, Oy - 6, "N horizon", "dg-lbl"), T(300, Oy - 6, "S horizon", "dg-lbl"),
     T(Ox + 5, Oy - R + 5, "zenith", "dg-lbl"), pLbl, aLbl].forEach(function (n) { s.appendChild(n); });

    function draw(L) {
      var rad = L * Math.PI / 180;
      var px = Ox - R * Math.cos(rad), py = Oy - R * Math.sin(rad);
      ray.setAttribute("x1", Ox); ray.setAttribute("y1", Oy);
      ray.setAttribute("x2", px); ray.setAttribute("y2", py);
      pole.setAttribute("cx", px); pole.setAttribute("cy", py);
      pLbl.setAttribute("x", px + (L > 70 ? -26 : 6)); pLbl.setAttribute("y", py - 5);
      var capR = Math.max(0, Oy - py);
      cap.setAttribute("cx", px); cap.setAttribute("cy", py); cap.setAttribute("r", capR);
      var aR = 30;
      arc.setAttribute("d", "M " + (Ox - aR) + " " + Oy + " A " + aR + " " + aR + " 0 0 1 " +
        (Ox - aR * Math.cos(rad)) + " " + (Oy - aR * Math.sin(rad)));
      aLbl.setAttribute("x", Ox - aR - 6); aLbl.setAttribute("y", Oy - 10);
      aLbl.textContent = Math.round(L) + "°";
      r.readout.innerHTML = "<b>Latitude " + Math.round(L) + "°N</b> &nbsp;·&nbsp; north celestial pole <b>" +
        Math.round(L) + "°</b> above the horizon &nbsp;·&nbsp; " +
        (L <= 0.5 ? "no circumpolar stars — every star rises and sets"
          : L >= 89.5 ? "the whole visible sky is circumpolar — nothing rises or sets"
          : "stars within <b>" + Math.round(L) + "°</b> of the pole never set");
    }
    slider(r.controls, "Latitude (°N)", 0, 90, 38, 1, function (v) { draw(v); });
    draw(38);
  };

  /* ---- 2.1  The axial tilt makes the seasons --------------------- */
  D["seasons"] = function (host) {
    var r = frame(host, "The tilt of Earth’s axis makes the seasons",
      "Earth’s axis keeps pointing the same way in space (up-right here). As Earth orbits, first the Northern and then the Southern Hemisphere leans toward the Sun.");
    var Sx = 180, Sy = 105;
    var s = svg(r.stage, 360, 210);
    s.appendChild(S("ellipse", { cx: Sx, cy: Sy, rx: 150, ry: 66, "class": "dg-orbit" }));
    var ray = S("line", { "class": "dg-dash" });
    var sun = S("circle", { cx: Sx, cy: Sy, r: 15, "class": "dg-sun" });
    var earth = S("circle", { r: 12, "class": "dg-earth" });
    var axis = S("line", { "class": "dg-axis" });
    [ray, sun, earth, axis, T(Sx - 8, Sy + 4, "Sun", "dg-lbl")].forEach(function (n) { s.appendChild(n); });
    var td = [Math.sin(23.5 * Math.PI / 180), -Math.cos(23.5 * Math.PI / 180)];
    var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function draw(day) {
      var th = (day / 365) * 2 * Math.PI - Math.PI / 2;
      var ex = Sx + 150 * Math.cos(th), ey = Sy + 66 * Math.sin(th);
      earth.setAttribute("cx", ex); earth.setAttribute("cy", ey);
      axis.setAttribute("x1", ex - td[0] * 20); axis.setAttribute("y1", ey - td[1] * 20);
      axis.setAttribute("x2", ex + td[0] * 20); axis.setAttribute("y2", ey + td[1] * 20);
      ray.setAttribute("x1", Sx); ray.setAttribute("y1", Sy); ray.setAttribute("x2", ex); ray.setAttribute("y2", ey);
      var d = [Sx - ex, Sy - ey], dl = Math.hypot(d[0], d[1]); d = [d[0] / dl, d[1] / dl];
      var lean = td[0] * d[0] + td[1] * d[1];
      var season = lean > 0.15 ? "Northern summer · Southern winter"
        : lean < -0.15 ? "Northern winter · Southern summer"
        : "Equinox — neither hemisphere leans toward the Sun";
      r.readout.innerHTML = "<b>" + MON[Math.min(11, Math.floor(day / 30.44))] + "</b> &nbsp;·&nbsp; " + season +
        ". The noon Sun is " +
        (lean > 0.15 ? "<b>high</b> in Northern skies" : lean < -0.15 ? "<b>low</b> in Northern skies" : "on the celestial equator") + ".";
    }
    var sl = slider(r.controls, "Day of year", 0, 364, 172, 1, function (v) { draw(v); });
    var pb = playBtn(r.controls, function () {
      var v = (parseFloat(sl.input.value) + 2) % 365; sl.input.value = v; draw(v);
    });
    sl.input.addEventListener("input", function () { pb.stop(); });
    draw(172);
  };

  /* ---- 2.2  Eratosthenes measures the Earth --------------------- */
  D["eratosthenes"] = function (host) {
    var r = frame(host, "How Eratosthenes measured the Earth",
      "The Sun is straight overhead at Syene but hits Alexandria at an angle. That shadow angle is the same fraction of 360° as the city-to-city distance is of Earth’s whole circumference.");
    var Cx = 170, Cy = 185, R = 116;
    var s = svg(r.stage, 340, 285);
    var rays = S("g", { "class": "dg-sunrays" });
    for (var i = 0; i < 7; i++) {
      var x = Cx - 96 + i * 30;
      rays.appendChild(S("line", { x1: x, y1: 12, x2: x, y2: 46, "class": "dg-ray3" }));
      rays.appendChild(S("path", { d: "M " + x + " 50 l -3 -6 l 6 0 z", "class": "dg-rayhead" }));
    }
    s.appendChild(rays);
    s.appendChild(S("circle", { cx: Cx, cy: Cy, r: R, "class": "dg-globe" }));
    var radS = S("line", { "class": "dg-dash" }), radA = S("line", { "class": "dg-dash" });
    var sunA = S("line", { "class": "dg-ray3" });
    var cArc = S("path", { "class": "dg-anglearc" }), aArc = S("path", { "class": "dg-anglearc" });
    var chord = S("path", { "class": "dg-track" });
    var dS = S("circle", { r: 3.5, "class": "dg-pole" }), dA = S("circle", { r: 3.5, "class": "dg-pole" });
    var lblS = T(0, 0, "Syene", "dg-lbl"), lblA = T(0, 0, "Alexandria", "dg-lbl");
    var lblPhi = T(0, 0, "", "dg-lbl");
    [chord, radS, radA, sunA, cArc, aArc, dS, dA, lblS, lblA, lblPhi].forEach(function (n) { s.appendChild(n); });

    function draw(phi, dist) {
      var aS = -Math.PI / 2, aA = -Math.PI / 2 - phi * Math.PI / 180;
      var sx = Cx + R * Math.cos(aS), sy = Cy + R * Math.sin(aS);
      var ax = Cx + R * Math.cos(aA), ay = Cy + R * Math.sin(aA);
      dS.setAttribute("cx", sx); dS.setAttribute("cy", sy);
      dA.setAttribute("cx", ax); dA.setAttribute("cy", ay);
      lblS.setAttribute("x", sx + 6); lblS.setAttribute("y", sy - 6);
      lblA.setAttribute("x", ax - 62); lblA.setAttribute("y", ay - 4);
      radS.setAttribute("x1", Cx); radS.setAttribute("y1", Cy);
      radS.setAttribute("x2", Cx + (R + 46) * Math.cos(aS)); radS.setAttribute("y2", Cy + (R + 46) * Math.sin(aS));
      radA.setAttribute("x1", Cx); radA.setAttribute("y1", Cy);
      radA.setAttribute("x2", Cx + (R + 50) * Math.cos(aA)); radA.setAttribute("y2", Cy + (R + 50) * Math.sin(aA));
      sunA.setAttribute("x1", ax); sunA.setAttribute("y1", ay - 60); sunA.setAttribute("x2", ax); sunA.setAttribute("y2", ay);
      cArc.setAttribute("d", arcPath(Cx, Cy, 34, aA, aS));
      // angle at Alexandria: between local vertical (outward radius) and the up direction
      var vA = aA, up = -Math.PI / 2;
      aArc.setAttribute("d", arcPath(ax, ay, 18, Math.min(vA, up), Math.max(vA, up)));
      lblPhi.setAttribute("x", ax - 4); lblPhi.setAttribute("y", ay - 24);
      lblPhi.textContent = phi.toFixed(0) + "°";
      chord.setAttribute("d", arcPath(Cx, Cy, R, aA, aS));
      var circ = dist * 360 / phi;
      r.readout.innerHTML =
        "shadow angle <b>" + phi.toFixed(0) + "°</b> &nbsp;·&nbsp; Syene→Alexandria <b>" + dist + " km</b><br>" +
        "circumference = " + dist + " × 360 ÷ " + phi.toFixed(0) + " = <b>" +
        (Math.round(circ / 100) * 100).toLocaleString() + " km</b> &nbsp;(true value 40,075 km)";
    }
    slider(r.controls, "shadow angle (°)", 2, 20, 7, 1, function (v) { draw(v, distA.input ? parseFloat(distA.input.value) : 800); });
    var distA = slider(r.controls, "city distance (km)", 400, 1200, 800, 20, function () { redraw(); });
    var angA;
    function redraw() {
      var phi = parseFloat(r.controls.querySelector("input").value);
      draw(phi, parseFloat(distA.input.value));
    }
    r.controls.querySelector("input").addEventListener("input", redraw);
    draw(7, 800);
  };

  /* ---- 2.2  Retrograde motion --------------------------------- */
  D["retrograde"] = function (host) {
    var r = frame(host, "Why planets seem to move backward",
      "Earth (inner, faster) periodically overtakes Mars (outer, slower). While it passes, Mars appears to drift backward — westward — against the background stars.");
    var Sx = 150, Sy = 148;
    var s = svg(r.stage, 360, 320);
    s.appendChild(S("circle", { cx: Sx, cy: Sy, r: 100, "class": "dg-orbit" }));
    s.appendChild(S("circle", { cx: Sx, cy: Sy, r: 46, "class": "dg-orbit" }));
    s.appendChild(S("circle", { cx: Sx, cy: Sy, r: 9, "class": "dg-sun" }));
    s.appendChild(S("line", { x1: 18, y1: 270, x2: 342, y2: 270, "class": "dg-ground" }));
    s.appendChild(T(20, 262, "Mars’s apparent path against the stars", "dg-lbl"));
    var track = S("polyline", { points: "", "class": "dg-track" });
    var sight = S("line", { "class": "dg-sight" });
    var eDot = S("circle", { r: 6, "class": "dg-earth" });
    var mDot = S("circle", { r: 6, "class": "dg-mars" });
    var here = S("circle", { r: 4.5, "class": "dg-markhere" });
    [track, sight, eDot, mDot, here].forEach(function (n) { s.appendChild(n); });
    var TE = 1.0, TM = 1.88, tMax = 2.4;
    function pos(t) {
      var ae = 2 * Math.PI * t / TE - Math.PI / 2, am = 2 * Math.PI * t / TM - Math.PI / 2;
      return { e: [Sx + 46 * Math.cos(ae), Sy + 46 * Math.sin(ae)], m: [Sx + 100 * Math.cos(am), Sy + 100 * Math.sin(am)] };
    }
    function ang(t) { var p = pos(t); return Math.atan2(p.m[1] - p.e[1], p.m[0] - p.e[0]); }
    var raw = [], prev = null;
    for (var i = 0; i <= 260; i++) {
      var t = i / 260 * tMax, a = ang(t);
      if (prev != null) { while (a - prev > Math.PI) a -= 2 * Math.PI; while (a - prev < -Math.PI) a += 2 * Math.PI; }
      prev = a; raw.push({ t: t, a: a });
    }
    var amin = Math.min.apply(null, raw.map(function (o) { return o.a; }));
    var amax = Math.max.apply(null, raw.map(function (o) { return o.a; }));
    function sx(a) { return 26 + (a - amin) / (amax - amin) * 308; }
    function sy(t) { var p = pos(t); var d = Math.hypot(p.m[0] - p.e[0], p.m[1] - p.e[1]); return 292 - (150 - d) / 3.4; }
    track.setAttribute("points", raw.map(function (o) { return sx(o.a).toFixed(1) + "," + sy(o.t).toFixed(1); }).join(" "));
    function draw(t) {
      var p = pos(t);
      eDot.setAttribute("cx", p.e[0]); eDot.setAttribute("cy", p.e[1]);
      mDot.setAttribute("cx", p.m[0]); mDot.setAttribute("cy", p.m[1]);
      var a = ang(t);
      sight.setAttribute("x1", p.e[0]); sight.setAttribute("y1", p.e[1]);
      sight.setAttribute("x2", p.e[0] + Math.cos(a) * 300); sight.setAttribute("y2", p.e[1] + Math.sin(a) * 300);
      var near = raw[0];
      for (var j = 1; j < raw.length; j++) if (Math.abs(raw[j].t - t) < Math.abs(near.t - t)) near = raw[j];
      here.setAttribute("cx", sx(near.a)); here.setAttribute("cy", sy(t));
      var d1 = ang(Math.max(0, t - 0.012)), d2 = ang(Math.min(tMax, t + 0.012));
      var dd = d2 - d1; while (dd > Math.PI) dd -= 2 * Math.PI; while (dd < -Math.PI) dd += 2 * Math.PI;
      r.readout.innerHTML = dd >= 0
        ? "Mars drifts <b>eastward</b> against the stars — ordinary (prograde) motion."
        : "Mars drifts <b>westward</b> — <b>retrograde!</b> The faster Earth is overtaking it.";
    }
    var sl = slider(r.controls, "time (years)", 0, tMax, 0.3, 0.01, function (v) { draw(v); });
    var pb = playBtn(r.controls, function () {
      var v = parseFloat(sl.input.value) + 0.007; if (v > tMax) v = 0; sl.input.value = v; draw(v);
    });
    sl.input.addEventListener("input", function () { pb.stop(); });
    draw(0.3);
  };

  /* ---- 2.2  Ptolemy's epicycles ------------------------------ */
  D["epicycle"] = function (host) {
    var r = frame(host, "Ptolemy’s fix: circles on circles",
      "To keep Earth still, Ptolemy put each planet on a small circle (the epicycle) whose centre rides a big circle (the deferent). Tuned right, the planet traces backward loops — mimicking retrograde motion.");
    var Ex = 160, Ey = 165, defR = 96, epiR = 34;
    var s = svg(r.stage, 320, 300);
    s.appendChild(S("circle", { cx: Ex, cy: Ey, r: defR, "class": "dg-orbit" }));
    var trail = S("path", { d: "", "class": "dg-track" });
    var epi = S("circle", { r: epiR, "class": "dg-orbit" });
    var arm1 = S("line", { "class": "dg-dash" }), arm2 = S("line", { "class": "dg-arm" });
    var cDot = S("circle", { r: 3, "class": "dg-pole" }), pDot = S("circle", { r: 5, "class": "dg-mars" });
    var eDot = S("circle", { cx: Ex, cy: Ey, r: 6, "class": "dg-earth" });
    [trail, epi, arm1, arm2, eDot, cDot, pDot, T(Ex - 12, Ey + 18, "Earth", "dg-lbl"),
     T(Ex + 8, Ey - defR - 6, "deferent", "dg-lbl")].forEach(function (n) { s.appendChild(n); });
    function P(t) {
      var A = t * 2 * Math.PI - Math.PI / 2, B = t * 2 * Math.PI * 3.6 - Math.PI / 2;
      var cx = Ex + defR * Math.cos(A), cy = Ey + defR * Math.sin(A);
      return { c: [cx, cy], p: [cx + epiR * Math.cos(B), cy + epiR * Math.sin(B)] };
    }
    var d = "M ";
    for (var i = 0; i <= 400; i++) { var q = P(i / 400); d += (i ? " L " : "") + q.p[0].toFixed(1) + " " + q.p[1].toFixed(1); }
    trail.setAttribute("d", d);
    function draw(t) {
      var q = P(t);
      epi.setAttribute("cx", q.c[0]); epi.setAttribute("cy", q.c[1]);
      cDot.setAttribute("cx", q.c[0]); cDot.setAttribute("cy", q.c[1]);
      pDot.setAttribute("cx", q.p[0]); pDot.setAttribute("cy", q.p[1]);
      arm1.setAttribute("x1", Ex); arm1.setAttribute("y1", Ey); arm1.setAttribute("x2", q.c[0]); arm1.setAttribute("y2", q.c[1]);
      arm2.setAttribute("x1", q.c[0]); arm2.setAttribute("y1", q.c[1]); arm2.setAttribute("x2", q.p[0]); arm2.setAttribute("y2", q.p[1]);
    }
    r.readout.innerHTML = "The planet (red) makes little backward loops as it circles — those loops are the retrograde motion.";
    var sl = slider(r.controls, "turn", 0, 1, 0, 0.002, function (v) { draw(v); });
    var pb = playBtn(r.controls, function () {
      var v = parseFloat(sl.input.value) + 0.0016; if (v > 1) v = 0; sl.input.value = v; draw(v);
    });
    sl.input.addEventListener("input", function () { pb.stop(); });
    draw(0);
  };

  /* ---- 2.3  Precession: your sign vs the real sky ------------- */
  D["precession"] = function (host) {
    var r = frame(host, "Precession: your “sign” vs the real sky",
      "Astrological signs stay locked to the calendar (outer ring). Earth’s slow wobble drags the real constellations westward — about 1° every 72 years (inner ring). After ~2000 years they are a whole sign out of step.");
    var Cx = 150, Cy = 150, Ro = 122, Ri = 88;
    var s = svg(r.stage, 300, 300);
    var NAMES = ["Ari", "Tau", "Gem", "Cnc", "Leo", "Vir", "Lib", "Sco", "Sgr", "Cap", "Aqr", "Psc"];
    s.appendChild(S("circle", { cx: Cx, cy: Cy, r: Ro, "class": "dg-orbit" }));
    s.appendChild(S("circle", { cx: Cx, cy: Cy, r: Ri, "class": "dg-orbit" }));
    for (var i = 0; i < 12; i++) {
      var a = (i * 30 - 90 + 15) * Math.PI / 180;
      var t = T(Cx + (Ro - 14) * Math.cos(a), Cy + (Ro - 14) * Math.sin(a) + 3, NAMES[i], "dg-sign");
      t.setAttribute("text-anchor", "middle"); s.appendChild(t);
    }
    s.appendChild(S("path", { d: "M " + Cx + " " + (Cy - Ro - 3) + " l -6 -12 l 12 0 z", "class": "dg-mars" }));
    s.appendChild(T(Cx, Cy - 4, "signs (fixed)", "dg-lbl-mid"));
    s.appendChild(T(Cx, Cy + 12, "constellations", "dg-lbl-mid"));
    var inG = S("g", {});
    s.appendChild(inG);
    function draw(years) {
      var off = years / 71.6;
      clr(inG);
      for (var i = 0; i < 12; i++) {
        var a = (i * 30 - 90 + 15 - off) * Math.PI / 180;
        var t = T(Cx + (Ri - 12) * Math.cos(a), Cy + (Ri - 12) * Math.sin(a) + 3, NAMES[i], "dg-constel");
        t.setAttribute("text-anchor", "middle"); inG.appendChild(t);
      }
      r.readout.innerHTML = "<b>" + years.toLocaleString() + " years</b> of precession → constellations shifted <b>" +
        Math.round(off) + "°</b> west (" + (off / 30).toFixed(1) + " signs)." +
        (years >= 1800 && years <= 2400
          ? " Today the spring-equinox Sun is in the <b>sign Aries</b> but the <b>constellation Pisces</b>."
          : "");
    }
    slider(r.controls, "years of precession", 0, 4000, 2100, 100, function (v) { draw(v); });
    draw(2100);
  };

  /* ---- 2.4  Phases of Venus: the deciding test --------------- */
  function phasePath(cx, cy, R, k, litRight) {
    k = Math.max(0.001, Math.min(0.999, k));
    var side = litRight ? 1 : -1;
    var rx = Math.abs(R * (1 - 2 * k)) || 0.01;
    var limbSweep = side > 0 ? 1 : 0;
    var termSweep = (k <= 0.5) ? (side > 0 ? 0 : 1) : (side > 0 ? 1 : 0);
    return "M " + cx + " " + (cy - R) +
      " A " + R + " " + R + " 0 0 " + limbSweep + " " + cx + " " + (cy + R) +
      " A " + rx + " " + R + " 0 0 " + termSweep + " " + cx + " " + (cy - R) + " Z";
  }
  D["venus-phases"] = function (host) {
    var r = frame(host, "The phases of Venus — the deciding test",
      "In the Sun-centred model Venus runs through the full cycle of phases. In Ptolemy’s model it is stuck between us and the Sun and can only ever be a thin crescent. Galileo saw the full cycle.");
    var s = svg(r.stage, 360, 240);
    var gOrb = S("g", {}), gPh = S("g", {});
    s.appendChild(gOrb); s.appendChild(gPh);
    var model = "helio", cur = 45;
    var tog = E("div", { "class": "dg-toggle" });
    var bH = E("button", { type: "button", "class": "on", text: "Sun-centred" });
    var bG = E("button", { type: "button", text: "Ptolemy" });
    tog.appendChild(bH); tog.appendChild(bG); r.controls.appendChild(tog);
    bH.onclick = function () { model = "helio"; bH.className = "on"; bG.className = ""; render(cur); };
    bG.onclick = function () { model = "geo"; bG.className = "on"; bH.className = ""; render(cur); };
    var sl = slider(r.controls, "Venus in its orbit (°)", 0, 360, 45, 1, function (v) { cur = v; render(v); });
    var pb = playBtn(r.controls, function () {
      cur = (cur + 2) % 360; sl.input.value = cur; render(cur);
    });
    sl.input.addEventListener("input", function () { pb.stop(); });

    function litFrac(V, Sun, Earth) {
      var a = [Sun[0] - V[0], Sun[1] - V[1]], b = [Earth[0] - V[0], Earth[1] - V[1]];
      var c = (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]));
      return (1 + c) / 2;
    }
    function name(k) { return k < 0.04 ? "new" : k < 0.42 ? "crescent" : k < 0.6 ? "quarter" : k < 0.96 ? "gibbous" : "full"; }
    function render(deg) {
      clr(gOrb); clr(gPh);
      var Ox = 116, Oy = 120, Earth, Sun, V;
      var rad = deg * Math.PI / 180;
      if (model === "helio") {
        Sun = [Ox, Oy]; Earth = [Ox, Oy + 92];
        V = [Ox + 42 * Math.cos(rad - Math.PI / 2), Oy + 42 * Math.sin(rad - Math.PI / 2)];
        gOrb.appendChild(S("circle", { cx: Ox, cy: Oy, r: 92, "class": "dg-orbit", "stroke-dasharray": "3 4" }));
        gOrb.appendChild(S("circle", { cx: Ox, cy: Oy, r: 42, "class": "dg-orbit" }));
        gOrb.appendChild(S("circle", { cx: Sun[0], cy: Sun[1], r: 12, "class": "dg-sun" }));
      } else {
        Earth = [Ox, Oy]; Sun = [Ox, Oy - 84];
        var ec = [Ox, Oy - 50];
        V = [ec[0] + 22 * Math.cos(rad - Math.PI / 2), ec[1] + 22 * Math.sin(rad - Math.PI / 2)];
        gOrb.appendChild(S("circle", { cx: Ox, cy: Oy, r: 84, "class": "dg-orbit", "stroke-dasharray": "3 4" }));
        gOrb.appendChild(S("line", { x1: Earth[0], y1: Earth[1], x2: Sun[0], y2: Sun[1], "class": "dg-dash" }));
        gOrb.appendChild(S("circle", { cx: ec[0], cy: ec[1], r: 22, "class": "dg-orbit" }));
        gOrb.appendChild(S("circle", { cx: Sun[0], cy: Sun[1], r: 12, "class": "dg-sun" }));
      }
      gOrb.appendChild(S("line", { x1: Earth[0], y1: Earth[1], x2: V[0], y2: V[1], "class": "dg-sight" }));
      gOrb.appendChild(S("circle", { cx: Earth[0], cy: Earth[1], r: 7, "class": "dg-earth" }));
      gOrb.appendChild(S("circle", { cx: V[0], cy: V[1], r: 5, style: "fill:#e8c07a" }));
      gOrb.appendChild(T(Earth[0] + 10, Earth[1] + 4, "Earth", "dg-lbl"));
      gOrb.appendChild(T(Sun[0] + 15, Sun[1] + 4, "Sun", "dg-lbl"));

      var k = litFrac(V, Sun, Earth);
      var dv = [V[0] - Earth[0], V[1] - Earth[1]], ds = [Sun[0] - Earth[0], Sun[1] - Earth[1]];
      var litRight = (dv[0] * ds[1] - dv[1] * ds[0]) < 0;
      var Px = 285, Py = 96, PR = 30;
      gPh.appendChild(S("circle", { cx: Px, cy: Py, r: PR, style: "fill:var(--panel-2);stroke:var(--border)" }));
      gPh.appendChild(S("path", { d: phasePath(Px, Py, PR, k, litRight), style: "fill:#f2dca6" }));
      gPh.appendChild(S("circle", { cx: Px, cy: Py, r: PR, style: "fill:none;stroke:var(--border)" }));
      gPh.appendChild(T(Px, Py + PR + 16, "what Earth sees", "dg-lbl-mid"));
      r.readout.innerHTML = (model === "helio" ? "Sun-centred" : "Ptolemy") + ": Venus looks <b>" + name(k) +
        "</b> (" + Math.round(k * 100) + "% lit). " +
        (model === "helio"
          ? "Over one orbit it cycles new → crescent → quarter → gibbous → <b>full</b>."
          : "Trapped between Earth and Sun, it never gets past a thin crescent — never gibbous, never full.");
    }
    render(45);
  };

  window.ASTRO_DIAGRAMS = D;
})();
