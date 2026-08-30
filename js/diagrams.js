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

  function frame(host, title, how, caption) {
    clr(host);
    var stage = E("div", { "class": "dg-stage" });
    var controls = E("div", { "class": "dg-controls" });
    var readout = E("div", { "class": "dg-readout" });
    var fig = E("figure", { "class": "diagram" }, [
      title ? E("div", { "class": "dg-title", text: title }) : null,
      how ? E("p", { "class": "dg-how", text: "👉 " + how }) : null,
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
    var r = frame(host, "What can you see from where you stand?",
      "Drag the slider to walk yourself north from the equator toward the North Pole.",
      "The dot marked ★ is the point the whole sky spins around. It sits higher in your sky the farther north you go. Stars inside the blue circle circle it forever and never touch the ground.");
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
    var pole = S("circle", { r: 4.5, "class": "dg-pole" });
    var pLbl = T(0, 0, "★ spin point", "dg-lbl");
    var aLbl = T(0, 0, "", "dg-lbl");
    [cap, stars, ground, zen, ray, arc, pole,
     T(24, Oy - 6, "north", "dg-lbl"), T(322, Oy - 6, "south", "dg-lbl"),
     T(Ox + 5, Oy - R + 5, "straight up", "dg-lbl"),
     T(Ox - 30, Oy + 13, "you are here", "dg-lbl"), pLbl, aLbl].forEach(function (n) { s.appendChild(n); });

    function draw(L) {
      var rad = L * Math.PI / 180;
      var px = Ox - R * Math.cos(rad), py = Oy - R * Math.sin(rad);
      ray.setAttribute("x1", Ox); ray.setAttribute("y1", Oy);
      ray.setAttribute("x2", px); ray.setAttribute("y2", py);
      pole.setAttribute("cx", px); pole.setAttribute("cy", py);
      pLbl.setAttribute("x", px + (L > 60 ? -64 : 8)); pLbl.setAttribute("y", py - 5);
      var capR = Math.max(0, Oy - py);
      cap.setAttribute("cx", px); cap.setAttribute("cy", py); cap.setAttribute("r", capR);
      var aR = 30;
      arc.setAttribute("d", "M " + (Ox - aR) + " " + Oy + " A " + aR + " " + aR + " 0 0 1 " +
        (Ox - aR * Math.cos(rad)) + " " + (Oy - aR * Math.sin(rad)));
      aLbl.setAttribute("x", Ox - aR - 6); aLbl.setAttribute("y", Oy - 10);
      aLbl.textContent = Math.round(L) + "° up";
      var L2 = Math.round(L);
      r.readout.innerHTML = L <= 0.5
        ? "You're at the <b>equator</b>. The spin point is on the ground, so <b>every</b> star rises and sets — nothing stays up all night."
        : L >= 89.5
        ? "You're at the <b>North Pole</b>! The spin point is straight up, and <b>every star you can see</b> just goes round and round — none rise or set."
        : "You're <b>" + L2 + "°</b> from the equator. The spin point is <b>" + L2 + "°</b> up in your sky, and the stars in the <b>blue circle</b> never dip below the ground — they're up every single night.";
    }
    slider(r.controls, "How far north (°)", 0, 90, 38, 1, function (v) { draw(v); });
    draw(38);
  };

  /* ---- 2.1  The axial tilt makes the seasons --------------------- */
  D["seasons"] = function (host) {
    var r = frame(host, "Why summer is warm and winter is cold",
      "Press Play, or jump to a month. Watch which half of Earth leans toward the Sun.",
      "Earth is tipped over a little, and it stays tipped the same way all year. When your half leans toward the Sun, you get summer. When it leans away, you get winter.");
    var Sx = 180, Sy = 105;
    var s = svg(r.stage, 360, 210);
    s.appendChild(S("ellipse", { cx: Sx, cy: Sy, rx: 150, ry: 66, "class": "dg-orbit" }));
    var ray = S("line", { "class": "dg-dash" });
    var sun = S("circle", { cx: Sx, cy: Sy, r: 15, "class": "dg-sun" });
    var earth = S("circle", { r: 12, "class": "dg-earth" });
    var axis = S("line", { "class": "dg-axis" });
    var topLbl = T(0, 0, "top half", "dg-lbl");
    [ray, sun, earth, axis, topLbl, T(Sx - 8, Sy + 4, "Sun", "dg-lbl")].forEach(function (n) { s.appendChild(n); });
    var td = [Math.sin(23.5 * Math.PI / 180), -Math.cos(23.5 * Math.PI / 180)];
    var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function draw(day) {
      var th = (day / 365) * 2 * Math.PI - Math.PI / 2;
      var ex = Sx + 150 * Math.cos(th), ey = Sy + 66 * Math.sin(th);
      earth.setAttribute("cx", ex); earth.setAttribute("cy", ey);
      axis.setAttribute("x1", ex - td[0] * 20); axis.setAttribute("y1", ey - td[1] * 20);
      axis.setAttribute("x2", ex + td[0] * 20); axis.setAttribute("y2", ey + td[1] * 20);
      topLbl.setAttribute("x", ex + td[0] * 20 + 4); topLbl.setAttribute("y", ey + td[1] * 20 - 3);
      ray.setAttribute("x1", Sx); ray.setAttribute("y1", Sy); ray.setAttribute("x2", ex); ray.setAttribute("y2", ey);
      var d = [Sx - ex, Sy - ey], dl = Math.hypot(d[0], d[1]); d = [d[0] / dl, d[1] / dl];
      var lean = td[0] * d[0] + td[1] * d[1];
      var mon = MON[Math.min(11, Math.floor(day / 30.44))];
      r.readout.innerHTML = lean > 0.15
        ? "<b>" + mon + "</b> ☀️ — the <b>top half</b> of Earth leans toward the Sun. Up north it's <b>summer</b> (and winter down south)."
        : lean < -0.15
        ? "<b>" + mon + "</b> ❄️ — the top half leans <b>away</b> from the Sun. Up north it's <b>winter</b> (and summer down south)."
        : "<b>" + mon + "</b> — Earth leans <b>sideways</b> now, so day and night are about equal everywhere.";
    }
    var sl = slider(r.controls, "Month", 0, 364, 172, 1, function (v) { draw(v); });
    var pb = playBtn(r.controls, function () {
      var v = (parseFloat(sl.input.value) + 2) % 365; sl.input.value = v; draw(v);
    });
    sl.input.addEventListener("input", function () { pb.stop(); });
    var quick = E("div", { "class": "dg-chips" });
    [["Mar", 80], ["Jun", 172], ["Sep", 264], ["Dec", 355]].forEach(function (m) {
      quick.appendChild(E("button", { type: "button", text: m[0], "class": "dg-chip" }));
    });
    quick.querySelectorAll("button").forEach(function (b, i) {
      b.addEventListener("click", function () { pb.stop(); var d = [80, 172, 264, 355][i]; sl.input.value = d; draw(d); });
    });
    r.controls.appendChild(quick);
    draw(172);
  };

  /* ---- 2.2  Eratosthenes measures the Earth --------------------- */
  D["eratosthenes"] = function (host) {
    var r = frame(host, "Measuring the whole Earth with a shadow",
      "Drag the sliders. A bigger shadow means the ground curves more between the two towns — so the Earth is smaller.",
      "At noon in one town the Sun is straight up and a stick makes no shadow. In another town, far away, the same Sun leans over and the stick DOES cast a shadow. The size of that lean tells you how big the whole Earth is.");
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
    var lblS = T(0, 0, "town 1 (no shadow)", "dg-lbl"), lblA = T(0, 0, "town 2 (has a shadow)", "dg-lbl");
    var lblPhi = T(0, 0, "", "dg-lbl");
    lblPhi.setAttribute("text-anchor", "middle");
    [chord, radS, radA, sunA, cArc, aArc, dS, dA, lblS, lblA, lblPhi].forEach(function (n) { s.appendChild(n); });

    function draw(phi, dist) {
      var aS = -Math.PI / 2, aA = -Math.PI / 2 - phi * Math.PI / 180;
      var sx = Cx + R * Math.cos(aS), sy = Cy + R * Math.sin(aS);
      var ax = Cx + R * Math.cos(aA), ay = Cy + R * Math.sin(aA);
      dS.setAttribute("cx", sx); dS.setAttribute("cy", sy);
      dA.setAttribute("cx", ax); dA.setAttribute("cy", ay);
      lblS.setAttribute("x", sx + 8); lblS.setAttribute("y", sy - 8);
      lblA.setAttribute("x", ax - 108); lblA.setAttribute("y", ay - 6);
      radS.setAttribute("x1", Cx); radS.setAttribute("y1", Cy);
      radS.setAttribute("x2", Cx + (R + 46) * Math.cos(aS)); radS.setAttribute("y2", Cy + (R + 46) * Math.sin(aS));
      radA.setAttribute("x1", Cx); radA.setAttribute("y1", Cy);
      radA.setAttribute("x2", Cx + (R + 50) * Math.cos(aA)); radA.setAttribute("y2", Cy + (R + 50) * Math.sin(aA));
      sunA.setAttribute("x1", ax); sunA.setAttribute("y1", ay - 60); sunA.setAttribute("x2", ax); sunA.setAttribute("y2", ay);
      cArc.setAttribute("d", arcPath(Cx, Cy, 40, aA, aS));
      // angle at Alexandria: between local vertical (outward radius) and the up direction
      var vA = aA, up = -Math.PI / 2;
      aArc.setAttribute("d", arcPath(ax, ay, 18, Math.min(vA, up), Math.max(vA, up)));
      // put the number in the open wedge near Earth's centre (well clear of the sun-ray arrows)
      var mid = (aA + aS) / 2;
      lblPhi.setAttribute("x", Cx + 56 * Math.cos(mid));
      lblPhi.setAttribute("y", Cy + 56 * Math.sin(mid) + 4);
      lblPhi.textContent = "same " + phi.toFixed(0) + "°";
      chord.setAttribute("d", arcPath(Cx, Cy, R, aA, aS));
      var times = Math.round(360 / phi);
      var circ = times * dist;
      r.readout.innerHTML =
        "The shadow leans <b>" + phi.toFixed(0) + "°</b>. A full circle is 360°, so the two towns are <b>1 slice out of about " +
        times + "</b>. The whole Earth is that many town-hops around: <b>" + times + " × " + dist +
        " km ≈ " + circ.toLocaleString() + " km</b>.<br>Real answer: 40,075 km — pretty close! 🌍";
    }
    slider(r.controls, "size of the shadow lean (°)", 2, 20, 7, 1, function (v) { draw(v, distA.input ? parseFloat(distA.input.value) : 800); });
    var distA = slider(r.controls, "distance between the towns (km)", 400, 1200, 800, 20, function () { redraw(); });
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
    var r = frame(host, "Why Mars sometimes looks like it goes backward",
      "Press Play. Blue Earth is on the fast inside track; red Mars is on the slow outside track. Watch the wiggly line at the bottom — that's how Mars looks from Earth.",
      "Mars never really goes backward. But when speedy Earth zooms past slow Mars, Mars looks like it slides backward for a while — the same way a slower car looks like it's going backward when you overtake it.");
    var Sx = 150, Sy = 148;
    var s = svg(r.stage, 360, 320);
    s.appendChild(S("circle", { cx: Sx, cy: Sy, r: 100, "class": "dg-orbit" }));
    s.appendChild(S("circle", { cx: Sx, cy: Sy, r: 46, "class": "dg-orbit" }));
    s.appendChild(S("circle", { cx: Sx, cy: Sy, r: 9, "class": "dg-sun" }));
    s.appendChild(S("line", { x1: 18, y1: 270, x2: 342, y2: 270, "class": "dg-ground" }));
    s.appendChild(T(20, 262, "← how Mars looks from Earth →", "dg-lbl"));
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
        ? "Earth is still <b>catching up</b> to Mars. Mars slides along the normal way. ➡️"
        : "Earth is <b>passing</b> Mars right now — so Mars looks like it's going <b>backward!</b> 🔄 (It isn't really.)";
    }
    var sl = slider(r.controls, "time", 0, tMax, 0.3, 0.01, function (v) { draw(v); });
    var pb = playBtn(r.controls, function () {
      var v = parseFloat(sl.input.value) + 0.007; if (v > tMax) v = 0; sl.input.value = v; draw(v);
    });
    sl.input.addEventListener("input", function () { pb.stop(); });
    draw(0.3);
  };

  /* ---- 2.2  Ptolemy's epicycles ------------------------------ */
  D["epicycle"] = function (host) {
    var r = frame(host, "The old “wheels on wheels” trick",
      "Press Play. The planet rides a little wheel, and the little wheel rides a big wheel. Watch the red line it draws.",
      "Long ago, people thought Earth stood still. To explain Mars's backward loops without moving Earth, they had the planet ride a small spinning wheel stuck to a big spinning wheel. It worked — but it was really complicated!");
    var Ex = 160, Ey = 165, defR = 96, epiR = 34;
    var s = svg(r.stage, 320, 300);
    s.appendChild(S("circle", { cx: Ex, cy: Ey, r: defR, "class": "dg-orbit" }));
    var trail = S("path", { d: "", "class": "dg-track" });
    var epi = S("circle", { r: epiR, "class": "dg-orbit" });
    var arm1 = S("line", { "class": "dg-dash" }), arm2 = S("line", { "class": "dg-arm" });
    var cDot = S("circle", { r: 3, "class": "dg-pole" }), pDot = S("circle", { r: 5, "class": "dg-mars" });
    var eDot = S("circle", { cx: Ex, cy: Ey, r: 6, "class": "dg-earth" });
    [trail, epi, arm1, arm2, eDot, cDot, pDot, T(Ex - 12, Ey + 18, "Earth", "dg-lbl"),
     T(Ex + 8, Ey - defR - 6, "big wheel", "dg-lbl")].forEach(function (n) { s.appendChild(n); });
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
    r.readout.innerHTML = "See the little <b>loops</b> in the red line? Those are the “backward” bits. All those wheels were just to draw those loops without letting Earth move.";
    var sl = slider(r.controls, "spin the wheels", 0, 1, 0, 0.002, function (v) { draw(v); });
    var pb = playBtn(r.controls, function () {
      var v = parseFloat(sl.input.value) + 0.0016; if (v > 1) v = 0; sl.input.value = v; draw(v);
    });
    sl.input.addEventListener("input", function () { pb.stop(); });
    draw(0);
  };

  /* ---- 2.3  Precession: your sign vs the real sky ------------- */
  D["precession"] = function (host) {
    var r = frame(host, "Why your star sign is “wrong”",
      "Drag the slider forward in time. The outer ring (the signs on your birthday) stays still. The inner ring (the real star pictures) slowly slides around.",
      "Earth wobbles like a slow spinning top — one full wobble takes 26,000 years. That slowly slides the real star pictures. After 2,000 years they've moved over by almost a whole sign, so the sign in the newspaper isn't the star picture the Sun was really in when you were born.");
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
    s.appendChild(T(Cx, Cy - 4, "your signs", "dg-lbl-mid"));
    s.appendChild(T(Cx, Cy + 12, "real star pictures", "dg-lbl-mid"));
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
      r.readout.innerHTML = "After <b>" + years.toLocaleString() + " years</b>, the real star pictures have slid over by <b>" +
        (off / 30).toFixed(1) + " signs</b>." +
        (years >= 1800 && years <= 2400
          ? " So if the newspaper says you're an <b>Aries</b>, the Sun was really in <b>Pisces</b> when you were born."
          : "");
    }
    slider(r.controls, "years into the future", 0, 4000, 2100, 100, function (v) { draw(v); });
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
    var r = frame(host, "The test that showed the Sun is in the middle",
      "Try both buttons. Drag Venus around its path. Watch the little circle on the right — that's how Venus looks through a telescope from Earth.",
      "Like the Moon, Venus shows different shapes (thin sliver, half, full circle) depending on where the Sun lights it. If the Sun is in the middle, we can see ALL the shapes. If Earth is in the middle, Venus stays stuck near the Sun and we only ever see a sliver. Galileo saw the full circle — so the Sun must be in the middle.");
    var s = svg(r.stage, 360, 240);
    var gOrb = S("g", {}), gPh = S("g", {});
    s.appendChild(gOrb); s.appendChild(gPh);
    var model = "helio", cur = 45;
    var tog = E("div", { "class": "dg-toggle" });
    var bH = E("button", { type: "button", "class": "on", text: "Sun in the middle" });
    var bG = E("button", { type: "button", text: "Earth in the middle" });
    tog.appendChild(bH); tog.appendChild(bG); r.controls.appendChild(tog);
    bH.onclick = function () { model = "helio"; bH.className = "on"; bG.className = ""; render(cur); };
    bG.onclick = function () { model = "geo"; bG.className = "on"; bH.className = ""; render(cur); };
    var sl = slider(r.controls, "move Venus around", 0, 360, 45, 1, function (v) { cur = v; render(v); });
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
      gPh.appendChild(T(Px, Py + PR + 16, "how Venus looks", "dg-lbl-mid"));
      var shape = k < 0.42 ? "a thin sliver 🌙" : k < 0.6 ? "half lit" : k < 0.96 ? "mostly lit" : "a full bright circle ⚪";
      r.readout.innerHTML = model === "helio"
        ? "<b>Sun in the middle:</b> right now Venus looks like <b>" + shape + "</b>. Drag it all the way around and you'll see <b>every</b> shape, from a sliver to a full circle."
        : "<b>Earth in the middle:</b> Venus is stuck between us and the Sun, so it can <b>only ever be a sliver</b> — you can never make it a full circle. But Galileo <b>did</b> see a full circle… so this picture is wrong!";
    }
    render(45);
  };

  /* row of big, tappable choice buttons. items: [{label, value}] */
  function bigPick(controls, items, initialIndex, onPick) {
    var row = E("div", { "class": "dg-bigrow" });
    var btns = [];
    items.forEach(function (it, i) {
      var b = E("button", { type: "button", "class": "dg-bigbtn" + (i === initialIndex ? " on" : ""), text: it.label });
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        onPick(it.value, i);
      });
      btns.push(b);
      row.appendChild(b);
    });
    controls.appendChild(row);
    return btns;
  }

  /* animation loop that starts running right away, with a Pause / Play toggle */
  function autoTicker(controls, tick) {
    var btn = E("button", { "class": "dg-play", type: "button", text: "❚❚ Pause" });
    var raf = null, playing = true;
    function stop() { playing = false; if (raf) cancelAnimationFrame(raf); raf = null; btn.textContent = "▶ Play"; }
    function start() { if (playing) return; playing = true; btn.textContent = "❚❚ Pause"; loop(); }
    function loop() {
      if (!playing) return;
      if (!document.body.contains(btn)) { stop(); return; }
      tick();
      raf = requestAnimationFrame(loop);
    }
    btn.addEventListener("click", function () { playing ? stop() : start(); });
    controls.appendChild(btn);
    raf = requestAnimationFrame(loop);
    return { stop: stop, start: start };
  }

  /* ---- 3.1  An ellipse: two pins, one constant total ------------- */
  D["ellipse"] = function (host) {
    var r = frame(host, "Draw a planet’s path",
      "Tap a shape. Watch the planet go around. The two lines from the pins always add up to the same number.",
      "That “always the same total” is the secret of an ellipse. The Sun sits on one pin; the other pin is just empty space.");
    var Cx = 180, Cy = 122, A = 138;
    var s = svg(r.stage, 360, 244);
    var orbit = S("ellipse", { cx: Cx, cy: Cy, "class": "dg-orbit" });
    var l1 = S("line", { "class": "dg-ray" }), l2 = S("line", { "class": "dg-arm" });
    var f1 = S("circle", { r: 6, "class": "dg-sun" }), f2 = S("circle", { r: 4, "class": "dg-pole" });
    var pl = S("circle", { r: 6.5, "class": "dg-earth" });
    var n1 = T(0, 0, "", "dg-lbl-mid"), n2 = T(0, 0, "", "dg-lbl-mid");
    var sumL = T(Cx, 18, "", "dg-lbl-mid");
    sumL.setAttribute("style", "font-size:13px;fill:var(--text);font-weight:700");
    n1.setAttribute("style", "font-size:13px;fill:var(--text)");
    n2.setAttribute("style", "font-size:13px;fill:var(--text)");
    [orbit, l1, l2, f1, f2, pl, n1, n2, sumL].forEach(function (n) { s.appendChild(n); });
    var ecc = 0, ang = 0;
    function draw() {
      var b = A * Math.sqrt(1 - ecc * ecc), c = A * ecc;
      orbit.setAttribute("rx", A); orbit.setAttribute("ry", b);
      var f1x = Cx - c, f2x = Cx + c;
      f1.setAttribute("cx", f1x); f1.setAttribute("cy", Cy);
      f2.setAttribute("cx", f2x); f2.setAttribute("cy", Cy);
      f2.style.display = c < 3 ? "none" : "";
      var rad = ang * Math.PI / 180;
      var px = Cx + A * Math.cos(rad), py = Cy + b * Math.sin(rad);
      pl.setAttribute("cx", px); pl.setAttribute("cy", py);
      l1.setAttribute("x1", f1x); l1.setAttribute("y1", Cy); l1.setAttribute("x2", px); l1.setAttribute("y2", py);
      l2.setAttribute("x1", f2x); l2.setAttribute("y1", Cy); l2.setAttribute("x2", px); l2.setAttribute("y2", py);
      var d1 = Math.hypot(px - f1x, py - Cy) / A * 5;
      var d2 = Math.hypot(px - f2x, py - Cy) / A * 5;
      n1.setAttribute("x", (f1x + px) / 2 - 4); n1.setAttribute("y", (Cy + py) / 2 - 3);
      n2.setAttribute("x", (f2x + px) / 2 + 4); n2.setAttribute("y", (Cy + py) / 2 - 3);
      n1.textContent = d1.toFixed(1); n2.textContent = d2.toFixed(1);
      n1.style.display = n2.style.display = ecc < 0.06 ? "none" : "";
      sumL.textContent = d1.toFixed(1) + " + " + d2.toFixed(1) + " = " + (d1 + d2).toFixed(1) + "   (always 10!)";
      r.readout.innerHTML = ecc < 0.02
        ? "A perfectly <b>round</b> circle — both pins are stacked in the middle. 🟢"
        : ecc < 0.55
        ? "A gentle <b>egg</b> shape. The two lines still add up to <b>10</b> everywhere. 🥚"
        : "A <b>very squished</b> path — still 10 every time! Real planets are only a tiny bit squished. 🫓";
    }
    bigPick(r.controls, [
      { label: "🟢 Round", value: 0 }, { label: "🥚 Egg", value: 0.45 }, { label: "🫓 Squished", value: 0.72 }
    ], 0, function (v) { ecc = v; draw(); });
    autoTicker(r.controls, function () { ang = (ang + 1.3) % 360; draw(); });
    draw();
  };

  /* ---- 3.1  Kepler's second law: fast near the Sun, slow far away  */
  D["kepler-2nd"] = function (host) {
    var r = frame(host, "Fast near the Sun, slow far away",
      "Just watch. 👀 The planet zooms when it is close to the Sun and crawls when it is far away.",
      "The orange slice and the blue slice are the same size. The planet always sweeps the same amount of space in the same time — so it has to hurry when the slice is short and fat.");
    var Cx = 188, Cy = 125, A = 135, e = 0.5;
    var b = A * Math.sqrt(1 - e * e), c = A * e, Fx = Cx + c, Fy = Cy;
    var s = svg(r.stage, 360, 250);
    s.appendChild(S("ellipse", { cx: Cx, cy: Cy, rx: A, ry: b, "class": "dg-orbit" }));
    var wedgeP = S("path", { style: "fill:color-mix(in srgb, var(--warn) 42%, transparent);stroke:none" });
    var wedgeA = S("path", { style: "fill:color-mix(in srgb, var(--accent) 38%, transparent);stroke:none" });
    s.appendChild(wedgeP); s.appendChild(wedgeA);
    s.appendChild(T(Cx - A + 4, Cy - b - 6, "same size", "dg-lbl"));
    s.appendChild(T(Fx - 26, Cy + b + 16, "same size", "dg-lbl"));
    s.appendChild(S("circle", { cx: Fx, cy: Fy, r: 9, "class": "dg-sun" }));
    s.appendChild(T(Fx + 12, Fy + 4, "Sun", "dg-lbl"));
    var line = S("line", { "class": "dg-dash" }), pl = S("circle", { r: 6.5, "class": "dg-earth" });
    var word = T(0, 0, "", "dg-lbl-mid");
    word.setAttribute("style", "font-size:15px;font-weight:700;fill:var(--text)");
    s.appendChild(line); s.appendChild(pl); s.appendChild(word);
    function Eof(M) {
      var E = M;
      for (var i = 0; i < 6; i++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
      return E;
    }
    function pos(M) { var E = Eof(M); return [Cx + A * Math.cos(E), Cy + b * Math.sin(E)]; }
    function wedge(M0, M1) {
      var d = "M " + Fx + " " + Fy;
      for (var k = 0; k <= 18; k++) { var p = pos(M0 + (M1 - M0) * k / 18); d += " L " + p[0].toFixed(1) + " " + p[1].toFixed(1); }
      return d + " Z";
    }
    var dM = 0.9;
    wedgeP.setAttribute("d", wedge(-dM / 2, dM / 2));
    wedgeA.setAttribute("d", wedge(Math.PI - dM / 2, Math.PI + dM / 2));
    var M = 0;
    function draw() {
      var p = pos(M);
      pl.setAttribute("cx", p[0]); pl.setAttribute("cy", p[1]);
      line.setAttribute("x1", Fx); line.setAttribute("y1", Fy); line.setAttribute("x2", p[0]); line.setAttribute("y2", p[1]);
      var near = Math.hypot(p[0] - Fx, p[1] - Fy) < A;
      word.setAttribute("x", p[0]); word.setAttribute("y", p[1] - 12);
      word.textContent = near ? "ZOOM!" : "slow…";
      r.readout.innerHTML = near
        ? "<b>ZOOM! ⚡</b> The planet is close to the Sun, so it races."
        : "<b>s l o w … 🐢</b> The planet is far from the Sun, so it drifts along.";
    }
    autoTicker(r.controls, function () { M = (M + 0.028) % (2 * Math.PI); draw(); });
    draw();
  };

  /* ---- 3.1  Kepler's third law: farther out, longer year -------- */
  D["kepler-3rd"] = function (host) {
    var r = frame(host, "Farther from the Sun = longer year",
      "Tap a planet. See how far away it lives, and how long its year is.",
      "The farther out a planet is, the longer one trip around the Sun takes — a LOT longer.");
    var all = (window.ASTRO_CHAPTERS && window.ASTRO_CHAPTERS[3] && window.ASTRO_CHAPTERS[3].keplerBodies) || [];
    function find(n) { for (var i = 0; i < all.length; i++) if (all[i].name === n) return all[i]; return null; }
    var picks = ["Earth", "Mars", "Jupiter", "Saturn", "Neptune"].map(find).filter(Boolean);
    if (!picks.length) picks = [{ name: "Earth", a: 1, P: 1 }, { name: "Jupiter", a: 5.2, P: 11.86 }, { name: "Neptune", a: 30.06, P: 164.82 }];
    var EMO = { Earth: "🌍", Mars: "🔴", Jupiter: "🟠", Saturn: "🪐", Neptune: "🔵" };
    var Sx = 60, Sy = 116;
    var s = svg(r.stage, 360, 232);
    var orbit = S("circle", { cx: Sx, cy: Sy, "class": "dg-orbit", "stroke-dasharray": "4 4" });
    var planet = S("circle", { r: 7, "class": "dg-earth" });
    var bigYr = T(250, 42, "", "dg-lbl-mid");
    bigYr.setAttribute("style", "font-size:19px;font-weight:700;fill:var(--text)");
    s.appendChild(S("circle", { cx: Sx, cy: Sy, r: 13, "class": "dg-sun" }));
    s.appendChild(T(Sx - 9, Sy + 30, "Sun", "dg-lbl"));
    [orbit, planet, bigYr].forEach(function (n) { s.appendChild(n); });
    function draw(bd) {
      var rr = Math.min(150, 22 + 128 * Math.sqrt(bd.a / 30.06));
      orbit.setAttribute("r", rr);
      planet.setAttribute("cx", Sx + rr); planet.setAttribute("cy", Sy);
      var yrs = bd.P < 2 ? bd.P.toFixed(1) : Math.round(bd.P);
      bigYr.textContent = "≈ " + yrs + (bd.P < 1.5 ? " year" : " years");
      r.readout.innerHTML = bd.name === "Earth"
        ? "🌍 <b>Earth</b> is <b>1 AU</b> from the Sun — the ruler we measure the others with. One trip around takes exactly <b>1 Earth-year</b>."
        : (EMO[bd.name] || "🪐") + " <b>" + bd.name + "</b> is <b>" + Math.round(bd.a) +
          "×</b> farther from the Sun than Earth. One trip around the Sun takes it <b>" +
          (bd.P < 2 ? bd.P.toFixed(2) : Math.round(bd.P)) + " Earth-year" + (bd.P >= 1.5 ? "s" : "") + "</b>.";
    }
    bigPick(r.controls,
      picks.map(function (bd) { return { label: (EMO[bd.name] || "") + " " + bd.name, value: bd }; }),
      0, function (bd) { draw(bd); });
    draw(picks[0]);
  };

  /* ---- 3.3  The inverse-square law: spreading out --------------- */
  D["inverse-square"] = function (host) {
    var r = frame(host, "Spreading out: why gravity gets weak fast",
      "Tap how many steps away. The same warmth from the Sun has to cover more and more squares.",
      "Twice as far → 4 squares → each gets ¼. Three times as far → 9 squares → each gets ⅑. Gravity spreads out the very same way, so it fades fast.");
    var s = svg(r.stage, 360, 216);
    s.appendChild(S("circle", { cx: 32, cy: 108, r: 10, "class": "dg-sun" }));
    s.appendChild(T(16, 88, "Sun", "dg-lbl"));
    var grid = S("g", {});
    s.appendChild(grid);
    var base = 34, x0 = 58;
    function draw(d) {
      clr(grid);
      var side = d * base, y0 = 108 - side / 2;
      for (var i = 0; i < d; i++) for (var j = 0; j < d; j++) {
        grid.appendChild(S("rect", {
          x: x0 + i * base, y: y0 + j * base, width: base - 2, height: base - 2, rx: 2,
          style: "fill:color-mix(in srgb, var(--warn) " + (96 / (d * d)).toFixed(1) +
            "%, transparent);stroke:var(--border);stroke-width:0.75"
        }));
      }
      grid.appendChild(S("line", { x1: 42, y1: 108, x2: x0, y2: 108, "class": "dg-ray3" }));
      r.readout.innerHTML = d === 1
        ? "<b>1 step away:</b> all the warmth lands on <b>1</b> square. Full strength. ☀️"
        : "<b>" + d + " steps away:</b> the warmth is spread over <b>" + d + " × " + d + " = " + (d * d) +
          "</b> squares, so each one gets just <b>1 out of " + (d * d) + "</b>.";
    }
    bigPick(r.controls, [
      { label: "1 step", value: 1 }, { label: "2 steps", value: 2 }, { label: "3 steps", value: 3 }, { label: "4 steps", value: 4 }
    ], 0, function (v) { draw(v); });
    draw(1);
  };

  /* ---- 3.5  Newton's cannon: throw a ball around the Earth ------ */
  D["newton-cannon"] = function (host) {
    var r = frame(host, "Throw a ball all the way around the Earth",
      "Tap how hard to throw. Watch the cannonball fly.",
      "Throw it fast enough sideways and the ground curves away as fast as the ball falls — so it never lands. That is how satellites stay up!");
    var Cx = 180, Cy = 140, R = 66;
    var s = svg(r.stage, 360, 280);
    s.appendChild(S("circle", { cx: Cx, cy: Cy, r: R, "class": "dg-globe" }));
    var top = [Cx, Cy - R - 15];
    s.appendChild(S("line", { x1: Cx, y1: Cy - R, x2: top[0], y2: top[1], "class": "dg-axis" }));
    var pathFaint = S("path", { d: "", style: "fill:none;stroke:color-mix(in srgb, var(--bad) 35%, transparent);stroke-width:1.5;stroke-dasharray:3 3" });
    var pathDone = S("path", { d: "", "class": "dg-track" });
    var ball = S("circle", { r: 4.5, "class": "dg-mars" });
    [pathFaint, pathDone, ball].forEach(function (n) { s.appendChild(n); });
    var GM = 300, r0 = R + 15, vCirc = Math.sqrt(GM / r0);
    function trajectory(vRel) {
      var x = top[0] - Cx, y = top[1] - Cy, vx = vRel * vCirc, vy = 0;
      var pts = [[top[0], top[1]]], dt = 0.1, x1 = x, y1 = y, kind = "orbit";
      for (var i = 0; i < 4000; i++) {
        var rr = Math.hypot(x, y);
        if (rr <= R) { pts.push([Cx + x, Cy + y]); kind = "hit"; break; }
        if (rr > R * 2.7) { kind = "escape"; break; }
        var g = GM / (rr * rr);
        vx -= g * (x / rr) * dt; vy -= g * (y / rr) * dt;
        x += vx * dt; y += vy * dt;
        pts.push([Cx + x, Cy + y]);
        if (i > 60 && Math.hypot(x - x1, y - y1) < 3) { kind = "orbit"; break; }
      }
      return { pts: pts, kind: kind };
    }
    function toD(pts) { return "M " + pts.map(function (p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" L "); }
    function msgFor(cur) {
      if (cur.kind === "orbit") return "<b>🛰️ Yes!</b> The ball is falling <b>around and around</b> the Earth. That is an orbit!";
      if (cur.kind === "escape") return "<b>🚀 Whoa!</b> So fast it flew away from Earth forever.";
      return cur.pts.length > 360
        ? "<b>💥 Still not fast enough!</b> It flew much farther this time, but gravity still won and it hit the ground."
        : "<b>💥 Too slow!</b> The ball curves down and hits the ground not far away.";
    }
    var anim = null;
    function play(vRel) {
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      var cur = trajectory(vRel);
      pathFaint.setAttribute("d", toD(cur.pts));
      r.readout.innerHTML = msgFor(cur);
      var n = 0, stepN = Math.max(2, Math.round(cur.pts.length / 90));
      (function step() {
        if (!document.body.contains(ball)) { anim = null; return; }
        n += stepN;
        if (n >= cur.pts.length) n = cur.pts.length - 1;
        pathDone.setAttribute("d", toD(cur.pts.slice(0, n + 1)));
        var p = cur.pts[n];
        ball.setAttribute("cx", p[0]); ball.setAttribute("cy", p[1]);
        if (n < cur.pts.length - 1) anim = requestAnimationFrame(step);
        else if (cur.kind === "orbit") { n = 0; anim = requestAnimationFrame(step); }
        else anim = null;
      })();
    }
    bigPick(r.controls, [
      { label: "🥎 Gentle", value: 0.35 }, { label: "💪 Hard", value: 0.8 },
      { label: "🚀 Super fast", value: 1.0 }, { label: "🛰️ Space fast", value: 1.5 }
    ], 2, function (v) { play(v); });
    play(1.0);
  };

  /* ---- Newton's 1st law: inertia -------------------------------- */
  D["inertia"] = function (host) {
    var r = frame(host, "Why a moving thing keeps moving",
      "Tap a surface. The block gets the same push every time — see how far it slides before friction stops it.",
      "Rough surfaces have lots of friction and stop the block fast. Take friction away (deep space) and the block never stops. That is inertia.");
    var s = svg(r.stage, 360, 168);
    var gy = 118;
    s.appendChild(S("line", { x1: 8, y1: gy, x2: 352, y2: gy, "class": "dg-ground" }));
    var surfLbl = T(12, gy + 20, "", "dg-lbl");
    var trail = S("line", { "class": "dg-dash" });
    var block = S("rect", { width: 26, height: 20, rx: 3, "class": "dg-earth" });
    var arrow = S("path", { "class": "dg-anglearc" });
    [surfLbl, trail, block, arrow].forEach(function (n) { s.appendChild(n); });
    var SURF = [
      { label: "🧶 Carpet", fric: 0.085, name: "carpet (very rough)" },
      { label: "🪵 Wood", fric: 0.032, name: "wood (a bit rough)" },
      { label: "🧊 Ice", fric: 0.010, name: "ice (slippery)" },
      { label: "🌌 Space", fric: 0, name: "deep space (nothing to rub on)" }
    ];
    var x0 = 40, x, v, fric, sf, anim = null;
    function launch(pick) {
      sf = pick; fric = pick.fric; x = x0; v = 3.6;
      trail.setAttribute("x1", x0 + 13); trail.setAttribute("y1", gy - 2);
      surfLbl.textContent = "surface: " + pick.name;
      if (anim) cancelAnimationFrame(anim);
      (function step() {
        if (!document.body.contains(block)) { anim = null; return; }
        v = Math.max(0, v - fric);
        x += v;
        if (x > 326) { if (fric === 0) { x = x0 - 13; } else { x = 326; } }
        block.setAttribute("x", x); block.setAttribute("y", gy - 20);
        trail.setAttribute("x2", Math.min(x, 326) + 13); trail.setAttribute("y2", gy - 2);
        arrow.setAttribute("d", "M " + (Math.min(x, 320) + 30) + " " + (gy - 10) + " l 15 0 m -6 -5 l 6 5 l -6 5");
        arrow.style.display = v > 0.06 ? "" : "none";
        if (fric === 0) {
          r.readout.innerHTML = "<b>Deep space:</b> nothing rubs on the block, so it <b>never stops</b> — it just keeps going, forever. ➡️♾️";
          anim = requestAnimationFrame(step);
        } else if (v > 0.06) {
          anim = requestAnimationFrame(step);
        } else {
          anim = null;
          var word = fric > 0.05 ? "a short" : fric > 0.02 ? "a medium" : "a long";
          r.readout.innerHTML = "<b>" + sf.name.split(" (")[0].charAt(0).toUpperCase() + sf.name.split(" (")[0].slice(1) +
            ":</b> friction rubbed the block to a stop after " + word + " slide.";
        }
      })();
    }
    bigPick(r.controls, SURF.map(function (p) { return { label: p.label, value: p }; }), 0, function (p) { launch(p); });
    launch(SURF[0]);
  };

  /* ---- Newton's 2nd law: force ÷ mass = acceleration ------------ */
  D["force-mass"] = function (host) {
    var r = frame(host, "Push ÷ weight = how fast it speeds up",
      "Pick a push and a box. Watch how quickly the box gets going — that speeding-up is acceleration.",
      "a = force ÷ mass. A hard push on a light box speeds up fast; the same push on a heavy box speeds up slowly.");
    var s = svg(r.stage, 360, 178);
    var gy = 116;
    s.appendChild(S("line", { x1: 8, y1: gy, x2: 352, y2: gy, "class": "dg-ground" }));
    var box = S("rect", { rx: 3, "class": "dg-earth" });
    var hand = S("path", { "class": "dg-arm" });
    var track = S("rect", { x: 96, y: 150, width: 210, height: 12, rx: 3, style: "fill:var(--panel-2);stroke:var(--border)" });
    var fill = S("rect", { x: 96, y: 150, width: 0, height: 12, rx: 3, style: "fill:var(--warn)" });
    s.appendChild(box); s.appendChild(hand);
    s.appendChild(T(12, 159, "speeding up:", "dg-lbl")); s.appendChild(track); s.appendChild(fill);
    var force = 3, mass = 1, x, v, anim = null;
    function run() {
      var a = force / mass, sz = 16 + mass * 9;
      fill.setAttribute("width", Math.min(210, a * 52));
      x = 46; v = 0;
      if (anim) cancelAnimationFrame(anim);
      (function step() {
        if (!document.body.contains(box)) { anim = null; return; }
        v += a * 0.05; x += v;
        if (x > 316) { x = 46; v = 0; }
        box.setAttribute("x", x); box.setAttribute("y", gy - sz);
        box.setAttribute("width", sz); box.setAttribute("height", sz);
        hand.setAttribute("d", "M " + (x - 18) + " " + (gy - sz / 2) + " l 13 0 m -5 -4 l 5 4 l -5 4");
        anim = requestAnimationFrame(step);
      })();
      r.readout.innerHTML = "Push = <b>" + ["", "gentle", "medium", "hard"][force] + "</b>, box = <b>" +
        (mass === 1 ? "light 📦" : "heavy 🧱") + "</b>. Speeding up (a = force ÷ mass) is <b>" +
        (a >= 2.5 ? "very fast ⚡" : a >= 1.2 ? "medium" : a >= 0.6 ? "slow" : "very slow 🐢") +
        "</b>. Same push, a lighter box speeds up faster.";
    }
    bigPick(r.controls, [{ label: "🤏 Gentle", value: 1 }, { label: "👋 Medium", value: 2 }, { label: "💪 Hard", value: 3 }], 2, function (v) { force = v; run(); });
    bigPick(r.controls, [{ label: "📦 Light box", value: 1 }, { label: "🧱 Heavy box", value: 3 }], 0, function (v) { mass = v; run(); });
    run();
  };

  /* ---- Newton's 3rd law: action & reaction --------------------- */
  D["action-reaction"] = function (host) {
    var r = frame(host, "Every push has an equal push back",
      "Tap a situation. The two arrows are always the same length, pointing opposite ways.",
      "If A pushes B, then B pushes A back just as hard. That is why rockets, swimmers, and rowboats work.");
    var AR = (window.ASTRO_CHAPTERS && window.ASTRO_CHAPTERS[3] && window.ASTRO_CHAPTERS[3].actionReaction) || [];
    if (!AR.length) AR = [{ name: "🚀 Rocket", action: "The engine pushes gas out the back.", reaction: "The gas pushes the rocket forward." }];
    var s = svg(r.stage, 360, 132);
    var my = 60;
    s.appendChild(S("rect", { x: 152, y: my - 24, width: 56, height: 48, rx: 8, "class": "dg-globe" }));
    var emo = T(180, my + 7, "", "dg-lbl-mid"); emo.setAttribute("style", "font-size:22px");
    var aArrow = S("path", { "class": "dg-anglearc" });
    var bArrow = S("path", { "class": "dg-ray" });
    [emo, aArrow, bArrow, T(66, my - 30, "action", "dg-lbl-mid"), T(296, my - 30, "reaction", "dg-lbl-mid"),
      T(180, my + 40, "same size, opposite ways", "dg-lbl-mid")].forEach(function (n) { s.appendChild(n); });
    function show(it) {
      emo.textContent = it.name.trim().split(" ")[0];
      aArrow.setAttribute("d", "M 150 " + my + " l -74 0 m 10 -7 l -10 7 l 10 7");
      bArrow.setAttribute("d", "M 210 " + my + " l 74 0 m -10 -7 l 10 7 l -10 7");
      r.readout.innerHTML = "<b>Action:</b> " + it.action + "<br><b>Reaction:</b> " + it.reaction;
    }
    bigPick(r.controls, AR.map(function (it) { return { label: it.name, value: it }; }), 0, function (it) { show(it); });
    show(AR[0]);
  };

  /* ---- Universal gravitation: mass and distance ---------------- */
  D["gravity-pull"] = function (host) {
    var r = frame(host, "What makes gravity strong or weak",
      "Change the two masses and how far apart they are. The bar shows how strong the pull is.",
      "Bigger masses pull harder. Farther apart is much weaker — twice as far is only a quarter as strong.");
    var s = svg(r.stage, 360, 168);
    var cy = 66;
    var b1 = S("circle", { "class": "dg-sun" }), b2 = S("circle", { "class": "dg-earth" });
    var aL = S("path", { "class": "dg-ray" }), aR = S("path", { "class": "dg-ray" });
    var track = S("rect", { x: 96, y: 142, width: 210, height: 13, rx: 3, style: "fill:var(--panel-2);stroke:var(--border)" });
    var fill = S("rect", { x: 96, y: 142, width: 0, height: 13, rx: 3, style: "fill:var(--warn)" });
    [b1, b2, aL, aR, track, fill].forEach(function (n) { s.appendChild(n); });
    s.appendChild(T(12, 152, "pull:", "dg-lbl"));
    var m1 = 3, m2 = 3, dist = 2;   // masses 1 (light) or 3 (heavy); dist 1..3
    function draw() {
      var gap = [0, 74, 132, 196][dist];
      var x1 = 180 - gap / 2, x2 = 180 + gap / 2;
      var r1 = 8 + m1 * 4, r2 = 8 + m2 * 4;
      b1.setAttribute("cx", x1); b1.setAttribute("cy", cy); b1.setAttribute("r", r1);
      b2.setAttribute("cx", x2); b2.setAttribute("cy", cy); b2.setAttribute("r", r2);
      aL.setAttribute("d", "M " + (x1 + r1 + 4) + " " + cy + " l 20 0 m -7 -5 l 7 5 l -7 5");
      aR.setAttribute("d", "M " + (x2 - r2 - 4) + " " + cy + " l -20 0 m 7 -5 l -7 5 l 7 5");
      var F = (m1 * m2) / (dist * dist);          // relative units (max 9)
      fill.setAttribute("width", Math.max(3, Math.min(210, F / 9 * 210)));
      r.readout.innerHTML = "Left mass <b>" + (m1 === 1 ? "light" : "heavy") + "</b>, right mass <b>" +
        (m2 === 1 ? "light" : "heavy") + "</b>, distance <b>" + ["", "close", "medium", "far"][dist] +
        "</b> &rarr; pull is <b>" + (F >= 5 ? "strong" : F >= 1.5 ? "medium" : F >= 0.6 ? "weak" : "very weak") + "</b>." +
        (dist > 1 ? " Moving to <b>" + dist + "×</b> the distance made it <b>1/" + (dist * dist) + "</b>." : "");
    }
    bigPick(r.controls, [{ label: "Left: light", value: 1 }, { label: "Left: heavy", value: 3 }], 1, function (v) { m1 = v; draw(); });
    bigPick(r.controls, [{ label: "Right: light", value: 1 }, { label: "Right: heavy", value: 3 }], 1, function (v) { m2 = v; draw(); });
    bigPick(r.controls, [{ label: "📏 Close", value: 1 }, { label: "Medium", value: 2 }, { label: "Far", value: 3 }], 1, function (v) { dist = v; draw(); });
    draw();
  };

  /* =========================================================================
     STEP-BY-STEP MATH TUTOR  —  powers the "Do the Math, Step by Step" study
     tool for Chapter 3 (app.js renderMathLab() calls these by key). Pick a real
     example, then do the arithmetic one tiny step at a time — type each step
     yourself, or tap "Show me". Nothing bigger than "multiply two numbers".
     Registered on window.ASTRO_DIAGRAMS as math-mul / math-exponents /
     math-kepler3 / math-density / math-inverse-square / math-weigh.
     ========================================================================= */
  function smNum(s) {
    return parseFloat(String(s == null ? "" : s).replace(/[,\s ]/g, ""));
  }
  function smFmt(n, dp) {
    if (n == null || !isFinite(n)) return String(n);
    if (dp == null) {
      var a = Math.abs(n);
      dp = a >= 100 ? 0 : a >= 10 ? 1 : 2;
    }
    var s = n.toFixed(dp);
    if (s.indexOf(".") > -1) s = s.replace(/0+$/, "").replace(/\.$/, "");
    return s;
  }
  function smCommas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  var SM_SUP = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  function smSup(n) {
    return String(n).split("").map(function (c) { return SM_SUP[c] || c; }).join("");
  }

  /* -- Exponents primer: the first sub-section of "Do the Math" ---------- */
  function stepExponents(host) {
    clr(host);
    var box = E("div", { "class": "smx" });
    host.appendChild(box);

    box.appendChild(E("div", { "class": "smx-head" }, [
      E("span", { "class": "smx-badge", text: "🔢 Exponents" }),
      E("div", { "class": "smx-title", text: "What a little raised number means" })
    ]));
    box.appendChild(E("p", { "class": "smx-lead", text:
      "A small raised number — an “exponent” — just says how many times to multiply a number by itself. " +
      "Chapter 3 only ever uses “squared” (a little 2), “cubed” (a little 3), and their reverses. Tap around:" }));

    var mode = "sq", val = 5;
    var row1 = E("div", { "class": "smx-picker" });
    var row2 = E("div", { "class": "smx-picker" });
    var out = E("div", { "class": "smx-formula" });
    box.appendChild(row1); box.appendChild(row2); box.appendChild(out);

    var MODES = [
      { k: "sq", label: "▪ squared" },
      { k: "cu", label: "◼ cubed" },
      { k: "p10", label: "10ⁿ powers of ten" },
      { k: "root", label: "√ roots (backwards)" }
    ];
    var m1 = [];
    MODES.forEach(function (mo) {
      var b = E("button", { type: "button", "class": "smx-sc" + (mo.k === mode ? " on" : ""), text: mo.label });
      b.addEventListener("click", function () {
        mode = mo.k;
        m1.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        if (mode === "p10" && val > 6) val = 4;
        if (mode !== "p10" && val < 2) val = 5;
        buildRow2(); paint();
      });
      m1.push(b);
      row1.appendChild(b);
    });

    function buildRow2() {
      clr(row2);
      var nums = mode === "p10" ? [1, 2, 3, 4, 5, 6] : [2, 3, 4, 5, 6, 7, 8, 9];
      nums.forEach(function (n) {
        var b = E("button", { type: "button", "class": "smx-sc" + (n === val ? " on" : ""), text: String(n) });
        b.addEventListener("click", function () { val = n; buildRow2(); paint(); });
        row2.appendChild(b);
      });
    }
    function line(txt) { out.appendChild(E("div", { "class": "smx-f-sym", text: txt })); }
    function note(txt) { out.appendChild(E("div", { "class": "smx-f-note", text: txt })); }

    function paint() {
      clr(out);
      if (mode === "sq") {
        line(val + " squared  =  " + val + " × " + val + "  =  " + (val * val));
        note("“Squared” always means the number times itself. It is NOT " + val + " × 2.");
      } else if (mode === "cu") {
        line(val + " cubed  =  " + val + " × " + val + " × " + val + "  =  " + smCommas(val * val * val));
        note("“Cubed” means the number times itself, three times over.");
      } else if (mode === "p10") {
        var chain = [];
        for (var i = 0; i < val; i++) chain.push("10");
        line("10" + smSup(val) + "  =  " + chain.join(" × ") + "  =  " + smCommas(Math.pow(10, val)));
        note("Shortcut: the little number is just how many zeros to write — " + val + " of them here.");
      } else {
        line("√" + (val * val) + "  =  " + val);
        note("because " + val + " × " + val + " = " + (val * val) + ". A square root asks: what number, times itself, gives this?");
        line("∛" + smCommas(val * val * val) + "  =  " + val);
        note("because " + val + " × " + val + " × " + val + " = " + smCommas(val * val * val) +
          ". When a later step needs a root, guessing numbers until you land on it works fine.");
      }
    }

    var pr = E("div", { "class": "smx-step active", style: "margin-top:14px" });
    box.appendChild(pr);
    function newQ() {
      clr(pr);
      var kind = ["sq", "cu", "p10", "sqrt"][Math.floor(Math.random() * 4)];
      var b, q, ans;
      if (kind === "sq") { b = 2 + Math.floor(Math.random() * 8); q = b + "²"; ans = b * b; }
      else if (kind === "cu") { b = 2 + Math.floor(Math.random() * 5); q = b + "³"; ans = b * b * b; }
      else if (kind === "p10") { b = 2 + Math.floor(Math.random() * 4); q = "10" + smSup(b); ans = Math.pow(10, b); }
      else { b = 2 + Math.floor(Math.random() * 8); q = "√" + (b * b); ans = b; }
      pr.appendChild(E("div", { "class": "smx-n", text: "Now you try" }));
      pr.appendChild(E("div", { "class": "smx-say", text: "What is  " + q + " ?" }));
      var inp = E("input", { type: "text", inputmode: "numeric", "class": "smx-input",
        autocomplete: "off", spellcheck: "false", placeholder: "answer" });
      var ck = E("button", { type: "button", "class": "smx-check", text: "Check" });
      var sh = E("button", { type: "button", "class": "smx-show", text: "Show me" });
      var nx = E("button", { type: "button", "class": "smx-next", text: "Another ▶" });
      var fb = E("div", { "class": "smx-fb" });
      function say(msg, ok) { fb.className = "smx-fb " + (ok ? "good" : "bad"); fb.textContent = msg; }
      function check() {
        var g = smNum(inp.value);
        if (isNaN(g)) { say("Type a number first.", false); return; }
        if (Math.abs(g - ans) < 0.5) say("Yes — " + q + " = " + smCommas(ans) + ".", true);
        else say("Not quite — try again, or tap “Show me”.", false);
      }
      ck.addEventListener("click", check);
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); check(); } });
      sh.addEventListener("click", function () { say(q + " = " + smCommas(ans) + ".", true); });
      nx.addEventListener("click", newQ);
      pr.appendChild(E("div", { "class": "smx-try-row", style: "margin-top:8px" }, [inp, ck, sh, nx]));
      pr.appendChild(fb);
    }

    buildRow2();
    paint();
    newQ();
  }

  /* -- Multiplication -> exponents: repeated adding vs repeated multiplying */
  function stepMul(host) {
    clr(host);
    var box = E("div", { "class": "smx" });
    host.appendChild(box);

    box.appendChild(E("div", { "class": "smx-head" }, [
      E("span", { "class": "smx-badge", text: "✕ → xⁿ" }),
      E("div", { "class": "smx-title", text: "From “times” to “to the power of”" })
    ]));
    box.appendChild(E("p", { "class": "smx-lead", text:
      "Multiplying is a shortcut for adding the same number over and over. Do that shortcut over and over — " +
      "multiply the same number again and again — and that is exactly what a little raised number (an exponent) means." }));

    var view = "addmul";
    var base = 3, count = 4, nn = 4;

    var vpick = E("div", { "class": "smx-picker" });
    var vBtns = [];
    [["addmul", "Add vs. multiply"], ["sqcube", "Squares & cubes"]].forEach(function (it, i) {
      var b = E("button", { type: "button", "class": "smx-sc" + (i === 0 ? " on" : ""), text: it[1] });
      b.addEventListener("click", function () {
        view = it[0];
        vBtns.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        draw();
      });
      vBtns.push(b);
      vpick.appendChild(b);
    });
    box.appendChild(vpick);

    var viewHost = E("div");
    box.appendChild(viewHost);

    function pickRow(parent, label, lo, hi, cur, set) {
      parent.appendChild(E("div", { "class": "smx-f-note", text: label }));
      var row = E("div", { "class": "smx-picker" });
      for (var k = lo; k <= hi; k++) (function (k) {
        var b = E("button", { type: "button", "class": "smx-sc" + (k === cur ? " on" : ""), text: String(k) });
        b.addEventListener("click", function () { set(k); });
        row.appendChild(b);
      })(k);
      parent.appendChild(row);
    }
    function reps(str, sep, n) {
      var out = [];
      for (var i = 0; i < n; i++) out.push(str);
      return out.join(sep);
    }

    function draw() {
      clr(viewHost);
      if (view === "addmul") drawAddMul();
      else drawSqCube();
    }

    function drawAddMul() {
      pickRow(viewHost, "Pick a number:", 2, 9, base, function (v) { base = v; draw(); });
      pickRow(viewHost, "How many times:", 2, 6, count, function (v) { count = v; draw(); });

      var sum = base * count, prod = Math.pow(base, count);
      var pw = base + smSup(count);

      viewHost.appendChild(E("div", { "class": "smx-f-sym", text:
        "Use " + base + " a total of " + count + " times — once by adding, once by multiplying:" }));

      // side-by-side: same number, same number of steps, one step per row
      var tbl = E("div", { "class": "mstep" });
      tbl.appendChild(E("div", { "class": "mstep-row mstep-head" }, [
        E("span", { text: "how many " + base + "s" }),
        E("span", { text: "keep adding " + base }),
        E("span", { text: "keep multiplying by " + base })
      ]));
      var aPrev = 0, mPrev = 1;
      for (var k = 1; k <= count; k++) {
        var aNow = aPrev + base, mNow = mPrev * base;
        tbl.appendChild(E("div", { "class": "mstep-row" + (k === count ? " mstep-last" : "") }, [
          E("span", { "class": "mstep-k", text: String(k) }),
          E("span", { "class": "mstep-add", text:
            k === 1 ? String(base) : smCommas(aPrev) + " + " + base + " = " + smCommas(aNow) }),
          E("span", { "class": "mstep-mul" }, [
            (k === 1 ? String(base) : smCommas(mPrev) + " × " + base + " = " + smCommas(mNow)),
            E("em", { text: "= " + base + smSup(k) })
          ])
        ]));
        aPrev = aNow; mPrev = mNow;
      }
      tbl.appendChild(E("div", { "class": "mstep-row mstep-total" }, [
        E("span", {}),
        E("span", { text: count + " × " + base + " = " + smCommas(sum) }),
        E("span", { text: pw + " = " + smCommas(prod) })
      ]));
      viewHost.appendChild(tbl);

      viewHost.appendChild(E("div", { "class": "smx-f-note", text:
        "Same number (" + base + "), same number of steps (" + count + "). Adding just piles on another " + base +
        " each row; multiplying grows the whole total by " + base + " each row. The little " + smSup(count) +
        " in " + pw + " is exactly the count in the first column." }));

      // diagram: each level, every dot splits into `base` — the total ×base per level
      var tree = E("div", { "class": "expl-tree" });
      for (var k = 0; k <= count; k++) {
        var val = Math.pow(base, k);
        var drawN = Math.min(val, 24);
        var dots = E("div", { "class": "expl-dots" });
        for (var d = 0; d < drawN; d++) {
          dots.appendChild(E("span", { "class": "expl-dot" +
            (k > 0 && d > 0 && d % base === 0 ? " grp" : "") }));
        }
        if (val > drawN) dots.appendChild(E("span", { "class": "expl-more", text: "…" }));
        tree.appendChild(E("div", { "class": "expl-row" }, [
          dots,
          E("span", { "class": "expl-rlabel", text: k === 0
            ? "start:  1"
            : "×" + base + "  →  " + base + smSup(k) + " = " + smCommas(val) })
        ]));
      }

      viewHost.appendChild(E("div", { "class": "smx-step", style: "margin-top:10px" }, [
        E("div", { "class": "smx-n", text: "Why “multiply it " + count + " times” is an exponent" }),
        tree,
        E("div", { "class": "smx-f-note", text:
          "Every level, each dot splits into " + base + " — so the whole total is multiplied by " + base +
          " again. The little number in " + pw + " counts the levels." }),
        E("ul", { "class": "smx-why" }, [
          E("li", { html: "<b>Chain letter.</b> You tell <b>" + base + "</b> people a secret. Each of them tells <b>" +
            base + "</b> more, and that keeps happening for <b>" + count + "</b> rounds. Every round <i>multiplies</i> " +
            "the whole crowd by " + base + " (it doesn’t just add " + base + "), so " + count + " rounds gives " +
            pw + " = " + smCommas(prod) + " people — not " + sum + "." }),
          E("li", { html: "<b>Bricks vs. photocopier.</b> Adding lays one more brick each time (" + count +
            " turns → " + sum + "). An exponent runs the <i>whole pile</i> through a photocopier that makes " +
            base + " copies, " + count + " times over → " + smCommas(prod) + "." }),
          E("li", { html: "<b>Growing money.</b> $1 that grows " + base + "× every year is worth $" +
            smCommas(prod) + " after " + count + " years. Adding $" + base + " a year would only reach $" + sum + "." }),
          E("li", { html: "<b>The little number counts the steps.</b> " + pw + " means “start at 1 and multiply by " +
            base + ", " + count + " times.” Change the little number to " + (count + 1) + " and you multiply once more." })
        ])
      ]));

      viewHost.appendChild(E("div", { "class": "smx-answer", style: "margin-top:12px" }, [
        E("span", { "class": "smx-tick", text: "★" }),
        E("span", { text: "“×” is repeated adding. An exponent is repeated multiplying — " +
          base + smSup(count) + " just says “multiply " + count + " " + base + "’s together”." })
      ]));
    }

    function drawSqCube() {
      pickRow(viewHost, "Pick a number:", 1, 6, nn, function (v) { nn = v; draw(); });
      var n = nn;

      var sq = E("div", { "class": "smx-step" });
      sq.appendChild(E("div", { "class": "smx-n", text: "A little 2  —  “" + n + " squared”" }));
      var sc = Math.max(15, Math.min(30, Math.floor(170 / n)));
      var sgrid = E("div", { "class": "sqgrid" });
      sgrid.style.gridTemplateColumns = "repeat(" + n + ", " + sc + "px)";
      sgrid.style.gridAutoRows = sc + "px";
      for (var i = 0; i < n * n; i++) sgrid.appendChild(E("div", { "class": "sqcell" }));
      sq.appendChild(sgrid);
      sq.appendChild(E("div", { "class": "smx-calc" }, [
        E("span", { "class": "smx-expr", text: reps(String(n), " × ", 2) }),
        E("span", { "class": "smx-eq", text: "=" }),
        E("span", { "class": "smx-res", text: n + smSup(2) + " = " + (n * n) })
      ]));
      sq.appendChild(E("div", { "class": "smx-f-note", text:
        n + " rows of " + n + " — the dots fill a square, so we say “squared”." }));
      viewHost.appendChild(sq);

      var cu = E("div", { "class": "smx-step", style: "margin-top:10px" });
      cu.appendChild(E("div", { "class": "smx-n", text: "A little 3  —  “" + n + " cubed”" }));
      var lc = Math.max(7, Math.min(15, Math.floor(90 / n)));
      var off = Math.max(5, Math.round(lc * 0.7));
      var span = n * lc + (n - 1) * off + 4;
      var wrap = E("div", { "class": "cubewrap" });
      wrap.style.width = span + "px";
      wrap.style.height = span + "px";
      for (var L = 0; L < n; L++) {
        var layer = E("div", { "class": "cubelayer" });
        layer.style.gridTemplateColumns = "repeat(" + n + ", " + lc + "px)";
        layer.style.gridAutoRows = lc + "px";
        layer.style.transform = "translate(" + (L * off) + "px, " + (-L * off) + "px)";
        layer.style.zIndex = String(L + 1);
        for (var j = 0; j < n * n; j++) layer.appendChild(E("div", { "class": "sqcell" }));
        wrap.appendChild(layer);
      }
      cu.appendChild(wrap);
      cu.appendChild(E("div", { "class": "smx-calc" }, [
        E("span", { "class": "smx-expr", text: reps(String(n), " × ", 3) }),
        E("span", { "class": "smx-eq", text: "=" }),
        E("span", { "class": "smx-res", text: n + smSup(3) + " = " + smCommas(n * n * n) })
      ]));
      cu.appendChild(E("div", { "class": "smx-f-note", text:
        n + " copies of that square, stacked into a cube." }));
      viewHost.appendChild(cu);

      viewHost.appendChild(E("div", { "class": "smx-answer", style: "margin-top:12px" }, [
        E("span", { "class": "smx-tick", text: "★" }),
        E("span", { text: "A little 2 means a square (" + n + " × " + n + "). A little 3 means a cube (" +
          n + " × " + n + " × " + n + "). The little number is how many " + n + "’s you multiply." })
      ]));
    }

    draw();
  }

  function stepMath(host, cfg) {
    clr(host);
    var box = E("div", { "class": "smx" });
    host.appendChild(box);

    box.appendChild(E("div", { "class": "smx-head" }, [
      E("span", { "class": "smx-badge", text: "🧮 Step by step" }),
      E("div", { "class": "smx-title", text: cfg.title })
    ]));
    if (cfg.lead) box.appendChild(E("p", { "class": "smx-lead", text: cfg.lead }));

    box.appendChild(E("div", { "class": "smx-formula" }, [
      E("div", { "class": "smx-f-plain", html: cfg.formula.plain }),
      E("div", { "class": "smx-f-sym", text: cfg.formula.symbol }),
      cfg.formula.note ? E("div", { "class": "smx-f-note", text: cfg.formula.note }) : null
    ]));

    var picker = E("div", { "class": "smx-picker" });
    box.appendChild(picker);
    var stepsWrap = E("div", { "class": "smx-steps" });
    box.appendChild(stepsWrap);
    var navWrap = E("div", { "class": "smx-nav" });
    box.appendChild(navWrap);

    var scBtns = [];
    var sc = cfg.scenarios[0];
    var plan = cfg.build(sc);
    var idx = 0;          // step currently being worked
    var resolved = false; // has the active step's arithmetic been done?

    cfg.scenarios.forEach(function (s, i) {
      var b = E("button", { type: "button", "class": "smx-sc" + (i === 0 ? " on" : ""), text: s.label });
      b.addEventListener("click", function () {
        scBtns.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        sc = s; plan = cfg.build(s); idx = 0; resolved = false; draw();
      });
      scBtns.push(b);
      picker.appendChild(b);
    });

    draw();

    function checkPlain(st, g) {
      if (Math.abs(g - st.try.value) <= (st.try.tol || 0.01)) return { ok: true };
      return { ok: false, msg: "Not quite — check the hint, then try once more." };
    }
    function checkGuess(st, g) {
      var got = st.try.op === "cube" ? g * g * g : g * g;
      if (Math.abs(g - st.try.value) <= (st.try.tol || 0.03) ||
          Math.abs(got - st.try.target) <= (st.try.targetTol || st.try.tol || 0.05)) return { ok: true };
      var shown = st.try.op === "cube"
        ? smFmt(g) + " × " + smFmt(g) + " × " + smFmt(g)
        : smFmt(g) + " × " + smFmt(g);
      return { ok: false, msg: shown + " = " + smFmt(got) + " — " +
        (got < st.try.target ? "too low, try a bigger number." : "too high, try a smaller number.") };
    }

    function tryUI(st) {
      var wrap = E("div", { "class": "smx-try" });
      var t = st.try;
      var isGuess = t.mode === "guess";
      wrap.appendChild(E("div", { "class": "smx-try-q", text: isGuess
        ? "Type a guess and tap Check — I’ll tell you higher or lower."
        : "Your turn:  " + st.expr + "  =  ?" }));
      var inp = E("input", { type: "text", inputmode: "decimal", "class": "smx-input",
        autocomplete: "off", spellcheck: "false", placeholder: isGuess ? "guess" : "answer" });
      var check = E("button", { type: "button", "class": "smx-check", text: "Check" });
      var show = E("button", { type: "button", "class": "smx-show", text: "Show me" });
      var fb = E("div", { "class": "smx-fb" });
      function doCheck() {
        var g = smNum(inp.value);
        if (isNaN(g)) { fb.className = "smx-fb bad"; fb.textContent = "Type a number first."; return; }
        var res = isGuess ? checkGuess(st, g) : checkPlain(st, g);
        if (res.ok) {
          fb.className = "smx-fb good";
          fb.textContent = "That’s it — " + st.expr + " = " + st.result + ".";
          resolved = true;
          setTimeout(draw, 700);
        } else {
          fb.className = "smx-fb bad";
          fb.textContent = res.msg;
        }
      }
      check.addEventListener("click", doCheck);
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); doCheck(); } });
      show.addEventListener("click", function () { resolved = true; draw(); });
      wrap.appendChild(E("div", { "class": "smx-try-row" }, [inp, check, show]));
      if (t.hint) wrap.appendChild(E("div", { "class": "smx-hint", text: "Hint: " + t.hint }));
      wrap.appendChild(fb);
      return wrap;
    }

    function draw() {
      clr(stepsWrap);
      clr(navWrap);
      var M = plan.steps.length;

      for (var i = 0; i <= idx && i < M; i++) {
        var st = plan.steps[i];
        var active = (i === idx);
        var stepEl = E("div", { "class": "smx-step " + (active ? "active" : "done") }, [
          E("div", { "class": "smx-n", text: "Step " + (i + 1) + " of " + M }),
          E("div", { "class": "smx-say", text: st.say })
        ]);
        var showTry = active && !resolved && st.try;
        if (showTry) {
          stepEl.appendChild(tryUI(st));
        } else {
          stepEl.appendChild(E("div", { "class": "smx-calc" },
            st.expr
              ? [E("span", { "class": "smx-expr", text: st.expr }),
                 E("span", { "class": "smx-eq", text: "=" }),
                 E("span", { "class": "smx-res", text: st.result })]
              : [E("span", { "class": "smx-res", text: st.result })]));
        }
        stepsWrap.appendChild(stepEl);
      }

      if (idx >= M) {
        navWrap.appendChild(E("div", { "class": "smx-answer" }, [
          E("span", { "class": "smx-tick", text: "✓" }),
          E("span", { text: plan.answer })
        ]));
        navWrap.appendChild(E("button", { type: "button", "class": "smx-restart", text: "↺ Start over" }))
          .addEventListener("click", function () { idx = 0; resolved = false; draw(); });
        return;
      }

      var cur = plan.steps[idx];
      var canNext = resolved || !cur.try;
      if (canNext) {
        var nb = E("button", { type: "button", "class": "smx-next",
          text: idx === M - 1 ? "See the answer ▶" : "Next step ▶" });
        nb.addEventListener("click", function () { idx++; resolved = false; draw(); });
        navWrap.appendChild(nb);
      }
      if (idx > 0 || resolved) {
        var rb = E("button", { type: "button", "class": "smx-restart", text: "↺ Start over" });
        rb.addEventListener("click", function () { idx = 0; resolved = false; draw(); });
        navWrap.appendChild(rb);
      }
    }
  }

  /* -- Kepler's third law: period <-> distance (P² = a³) ------------------ */
  var CFG_KEPLER3 = {
    title: "Work out a planet’s distance — or its year",
    lead: "Kepler’s third law links how long a planet takes to orbit (its “year”, P) with how far it is from the Sun (a). Pick one you know, find the other.",
    formula: {
      plain: "The <b>year × the year</b> equals the <b>distance × the distance × the distance</b>.",
      symbol: "P × P  =  a × a × a",
      note: "P in Earth-years, a in AU (1 AU = Earth’s distance from the Sun)."
    },
    scenarios: [
      { label: "Mars: year is 1.88 — how far?", mode: "p2a", P: 1.88 },
      { label: "Earth: check it comes out to 1", mode: "p2a", P: 1 },
      { label: "Asteroid 3 AU out — how long a year?", mode: "a2p", a: 3 },
      { label: "Dwarf planet 50 AU out — its year?", mode: "a2p", a: 50 }
    ],
    build: function (sc) {
      if (sc.mode === "a2p") {
        var a = sc.a, a2 = a * a, a3 = a2 * a, P = Math.sqrt(a3);
        return {
          steps: [
            { say: "Multiply the distance by itself.",
              expr: smFmt(a) + " × " + smFmt(a), result: smFmt(a2),
              try: { value: a2, tol: Math.max(0.01, a2 * 0.02), hint: "“by itself” just means " + smFmt(a) + " times " + smFmt(a) + "." } },
            { say: "Now multiply that answer by the distance one more time. That’s “the distance cubed”.",
              expr: smFmt(a2) + " × " + smFmt(a), result: smFmt(a3),
              try: { value: a3, tol: Math.max(0.05, a3 * 0.02), hint: "take your last answer and multiply it by " + smFmt(a) + "." } },
            { say: "That number equals the year × the year. So the year is the number that, times itself, gives " + smFmt(a3) + " (its “square root”). Guess one.",
              expr: "√" + smFmt(a3), result: "≈ " + smFmt(P),
              try: { mode: "guess", op: "square", target: a3, value: P,
                     tol: Math.max(0.1, P * 0.03),
                     hint: "it’s between " + Math.floor(P) + " and " + Math.ceil(P) + "." } }
          ],
          answer: "A planet " + smFmt(a) + " AU from the Sun takes about " + smFmt(P) + " Earth-years to go once around."
        };
      }
      var p = sc.P, p2 = p * p, dist = Math.pow(p2, 1 / 3);
      return {
        steps: [
          { say: "Multiply the year by itself. That’s “the year squared”.",
            expr: smFmt(p) + " × " + smFmt(p), result: smFmt(p2),
            try: { value: p2, tol: Math.max(0.02, p2 * 0.02), hint: smFmt(p) + " times " + smFmt(p) + "." } },
          { say: "That equals the distance × distance × distance. So the distance is the number that, cubed, gives " + smFmt(p2) + " (its “cube root”). Guess one.",
            expr: "∛" + smFmt(p2), result: "≈ " + smFmt(dist),
            try: { mode: "guess", op: "cube", target: p2, value: dist,
                   tol: Math.max(0.03, dist * 0.03), targetTol: 0.06,
                   hint: p === 1 ? "try 1." : "try a number between 1 and 2." } }
        ],
        answer: p === 1
          ? "Earth’s year of 1 works out to a distance of 1 AU — the law checks out."
          : "A year of " + smFmt(p) + " Earth-years puts the planet about " + smFmt(dist) + " AU from the Sun" +
            (Math.abs(p - 1.88) < 0.01 ? " — half again Earth’s distance, which is exactly Mars." : ".")
      };
    }
  };

  /* -- Density = mass ÷ volume ------------------------------------------- */
  function densWord(d) {
    if (d < 0.3) return "far lighter than water — it would float high.";
    if (d < 1) return "lighter than water, so it floats.";
    if (d < 1.3) return "about the same as water.";
    if (d < 4) return "a few times denser than water, like ordinary rock.";
    if (d < 9) return "dense, in the range of iron.";
    return "very dense, like lead or gold.";
  }
  var CFG_DENSITY = {
    title: "Find the density of something",
    lead: "Density tells you how tightly the matter is packed. It’s just one division.",
    formula: {
      plain: "<b>Density</b> = how much matter (mass) <b>÷</b> how much room it takes up (volume).",
      symbol: "density  =  mass ÷ volume",
      note: "Mass in grams, volume in cubic centimetres (cm³); water comes out to 1."
    },
    scenarios: [
      { label: "The book’s block: 300 g, 100 cm³", m: 300, v: 100 },
      { label: "Gold bar: 386 g, 20 cm³", m: 386, v: 20 },
      { label: "Block of wood: 240 g, 300 cm³", m: 240, v: 300 },
      { label: "Foam packing: 5 g, 100 cm³", m: 5, v: 100 }
    ],
    build: function (sc) {
      var d = sc.m / sc.v;
      return {
        steps: [
          { say: "Divide the mass by the volume.",
            expr: smFmt(sc.m) + " ÷ " + smFmt(sc.v), result: smFmt(d) + " g/cm³",
            try: { value: d, tol: Math.max(0.01, d * 0.03),
                   hint: "how many times does " + smFmt(sc.v) + " fit into " + smFmt(sc.m) + "?" } },
          { say: "Read it against water, which is exactly 1 g/cm³.",
            expr: "", result: smFmt(d) + " g/cm³ is " + densWord(d) }
        ],
        answer: "This block’s density is about " + smFmt(d) + " g/cm³ — " + densWord(d)
      };
    }
  };

  /* -- Inverse-square: how gravity fades with distance ----------------- */
  var CFG_INVSQ = {
    title: "How much weaker does gravity get farther away?",
    lead: "Gravity follows an “inverse-square” rule: go some number of times farther, and the pull drops by that number multiplied by itself.",
    formula: {
      plain: "New pull = <b>1 ÷ (how many times farther × how many times farther)</b>.",
      symbol: "pull  →  1 ÷ (d × d)",
      note: "d = how many times farther away you moved."
    },
    scenarios: [
      { label: "Twice as far", d: 2 },
      { label: "3× as far", d: 3 },
      { label: "10× as far", d: 10 },
      { label: "The Moon: 60× as far", d: 60 }
    ],
    build: function (sc) {
      var d = sc.d, d2 = d * d;
      return {
        steps: [
          { say: "Multiply “how many times farther” by itself.",
            expr: d + " × " + d, result: smFmt(d2),
            try: { value: d2, tol: Math.max(1, d2 * 0.02), hint: d + " times " + d + "." } },
          { say: "The pull becomes 1 divided by that number.",
            expr: "1 ÷ " + smFmt(d2), result: "1/" + smFmt(d2) + " as strong" }
        ],
        answer: "Move " + d + "× farther from Earth and gravity drops to about 1/" + smFmt(d2) + " of what it was" +
          (d === 60 ? " — and 9.8 ÷ 3600 is exactly the gentle pull the Moon’s orbit needs." : ".")
      };
    }
  };

  /* -- Weigh a star from a planet's orbit: M = a³ ÷ P² ----------------- */
  var CFG_WEIGH = {
    title: "Weigh a star by watching a planet go around it",
    lead: "Newton’s sharper version of Kepler’s third law: if a planet’s own mass is tiny, the star’s mass is just the distance cubed divided by the year squared.",
    formula: {
      plain: "<b>Star’s mass</b> = (distance × distance × distance) <b>÷</b> (year × year).",
      symbol: "M  =  (a × a × a) ÷ (P × P)",
      note: "a in AU, P in Earth-years, M in “Suns” (1 = the Sun’s mass)."
    },
    scenarios: [
      { label: "Planet at 1 AU, year = 0.71", a: 1, P: 0.71 },
      { label: "Planet at 4 AU, year = 8", a: 4, P: 8 },
      { label: "Planet at 3.2 AU, year = 4", a: 3.2, P: 4 }
    ],
    build: function (sc) {
      var a = sc.a, P = sc.P, a2 = a * a, a3 = a2 * a, p2 = P * P, M = a3 / p2;
      return {
        steps: [
          { say: "Multiply the distance by itself.",
            expr: smFmt(a) + " × " + smFmt(a), result: smFmt(a2),
            try: { value: a2, tol: Math.max(0.01, a2 * 0.03), hint: smFmt(a) + " times " + smFmt(a) + "." } },
          { say: "Multiply that by the distance again — the distance cubed.",
            expr: smFmt(a2) + " × " + smFmt(a), result: smFmt(a3),
            try: { value: a3, tol: Math.max(0.02, a3 * 0.03), hint: "your last answer × " + smFmt(a) + "." } },
          { say: "Now multiply the year by itself — the year squared.",
            expr: smFmt(P) + " × " + smFmt(P), result: smFmt(p2),
            try: { value: p2, tol: Math.max(0.02, p2 * 0.03), hint: smFmt(P) + " times " + smFmt(P) + "." } },
          { say: "Divide the distance-cubed by the year-squared.",
            expr: smFmt(a3) + " ÷ " + smFmt(p2), result: smFmt(M) + " Suns",
            try: { value: M, tol: Math.max(0.03, M * 0.05),
                   hint: "how many times does " + smFmt(p2) + " fit into " + smFmt(a3) + "?" } }
        ],
        answer: "The star weighs about " + smFmt(M) + " times as much as the Sun."
      };
    }
  };

  D["math-mul"] = function (host) { stepMul(host); };
  D["math-exponents"] = function (host) { stepExponents(host); };
  D["math-kepler3"] = function (host) { stepMath(host, CFG_KEPLER3); };
  D["math-density"] = function (host) { stepMath(host, CFG_DENSITY); };
  D["math-inverse-square"] = function (host) { stepMath(host, CFG_INVSQ); };
  D["math-weigh"] = function (host) { stepMath(host, CFG_WEIGH); };

  window.ASTRO_DIAGRAMS = D;
})();
