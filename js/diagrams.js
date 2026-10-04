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
      "The farther out a planet is, the longer one trip around the Sun takes — a LOT longer. The “≈” before the year means “about” — it’s rounded to a whole number.");
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

  /* -- colour-tracking numbers across step-by-step lines ------------------
     Each step's result gets a colour (mv0..mv3); when that same number turns
     up in a later step's expression it is drawn in the same colour, so the
     reader can follow a value from one line to the next. */
  var SM_NUM_RE = /-?\d+(?:\.\d+)?/;
  function smLeadNum(s) {
    var m = String(s == null ? "" : s).match(SM_NUM_RE);
    return m ? m[0] : null;
  }
  function smColorRes(s, cls) {
    return String(s).replace(SM_NUM_RE, function (t) {
      return "<span class='" + cls + "'>" + t + "</span>";
    });
  }
  function smColorExpr(s, carried) {
    var claimed = [];
    return String(s).replace(/-?\d+(?:\.\d+)?/g, function (tok) {
      for (var i = 0; i < carried.length; i++) {
        if (!claimed[i] && carried[i].num === tok) {
          claimed[i] = true;
          return "<span class='" + carried[i].cls + "'>" + tok + "</span>";
        }
      }
      return tok;
    });
  }

  /* true when smFmt() had to round the number off — i.e. the tidy text shown
     is not the exact value, so the line should read ≈ rather than = */
  function smRound(n) {
    return typeof n === "number" && isFinite(n) &&
      Math.abs(n - parseFloat(smFmt(n))) > 5e-10;
  }
  function smApproxNote() {
    return E("div", { "class": "smx-approx", html:
      "Why <b>≈</b> and not <b>=</b>?  The wavy sign means <b>“about equal”</b>. The full answer has more " +
      "decimal places than are useful here — a square root or an uneven divide can even run on forever — so " +
      "it has been <b>rounded</b> to a number you can picture. It is close, just not exact." });
  }

  /* -- Exponents & roots: build up a power one multiply at a time -------- */
  function stepExponents(host) {
    clr(host);
    var box = E("div", { "class": "smx" });
    host.appendChild(box);

    box.appendChild(E("div", { "class": "smx-head" }, [
      E("span", { "class": "smx-badge", text: "🔢 Exponents & roots" }),
      E("div", { "class": "smx-title", text: "The little raised number — and how to undo it" })
    ]));
    box.appendChild(E("p", { "class": "smx-lead", text:
      "A little raised number just says how many times to multiply a number by itself — nothing more. " +
      "Chapter 3 only uses squared (²), cubed (³), powers of ten, and running those backwards with roots. " +
      "Pick a tab and a number; it builds up one multiply at a time." }));

    var SCI_EX = [
      { tag: "Moon", disp: "384,000", unit: "km", c: "3.84", e: 5 },
      { tag: "Sun", disp: "150,000,000", unit: "km", c: "1.5", e: 8 },
      { tag: "light-year", disp: "9,460,000,000,000", unit: "km", c: "9.46", e: 12 },
      { tag: "an atom", disp: "0.0000001", unit: "cm", c: "1", e: -7 }
    ];
    function supE(e) { return (e < 0 ? "⁻" : "") + smSup(Math.abs(e)); }

    var MODES = [
      { k: "sq", label: "x²  squared" },
      { k: "cu", label: "x³  cubed" },
      { k: "p10", label: "10ⁿ  powers of ten" },
      { k: "root", label: "√  roots — backwards" },
      { k: "sci", label: "→  scientific notation" }
    ];
    var mode = "sq", val = 5, p10n = 3, rootN = 5, sciIdx = 1;

    var pick = E("div", { "class": "smx-picker" });
    var numLabel = E("div", { "class": "smx-f-note", style: "margin:10px 0 2px" });
    var numRow = E("div", { "class": "smx-picker" });
    var body = E("div", { style: "margin-top:12px" });
    box.appendChild(pick); box.appendChild(numLabel); box.appendChild(numRow); box.appendChild(body);

    var mBtns = [];
    MODES.forEach(function (mo) {
      var b = E("button", { type: "button", "class": "smx-sc" + (mo.k === mode ? " on" : ""), text: mo.label });
      b.addEventListener("click", function () {
        mode = mo.k;
        mBtns.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        buildNums(); paint();
      });
      mBtns.push(b);
      pick.appendChild(b);
    });

    function numBtns(list, curVal, set) {
      list.forEach(function (n) {
        var b = E("button", { type: "button", "class": "smx-sc" + (n === curVal ? " on" : ""), text: String(n) });
        b.addEventListener("click", function () { set(n); buildNums(); paint(); });
        numRow.appendChild(b);
      });
    }
    function buildNums() {
      clr(numRow);
      if (mode === "sci") {
        numLabel.textContent = "Pick a real measurement:";
        SCI_EX.forEach(function (ex, i) {
          var b = E("button", { type: "button", "class": "smx-sc" + (i === sciIdx ? " on" : ""), text: ex.tag });
          b.addEventListener("click", function () { sciIdx = i; buildNums(); paint(); });
          numRow.appendChild(b);
        });
      } else if (mode === "p10") {
        numLabel.textContent = "Pick the exponent  n:";
        numBtns([1, 2, 3, 4, 5, 6, 7, 8], p10n, function (n) { p10n = n; });
      } else if (mode === "root") {
        numLabel.textContent = "Pick the answer to hunt for:";
        numBtns([2, 3, 4, 5, 6, 7, 8, 9, 10, 12], rootN, function (n) { rootN = n; });
      } else {
        numLabel.textContent = "Pick a number:";
        numBtns([2, 3, 4, 5, 6, 7, 8, 9, 10, 12], val, function (n) { val = n; });
      }
    }

    /* small building blocks */
    function row(exprHtml, sign, resHtml) {
      var kids = [];
      if (exprHtml) {
        kids.push(E("span", { "class": "smx-expr", html: exprHtml }));
        kids.push(E("span", { "class": "smx-eq", text: sign || "=" }));
      }
      kids.push(E("span", { "class": "smx-res", html: resHtml }));
      return E("div", { "class": "smx-calc" }, kids);
    }
    function stepRow(label, node, active) {
      return E("div", { "class": "smx-step " + (active ? "active" : "done") }, [
        E("div", { "class": "smx-n", text: label }), node
      ]);
    }
    function answer(html) {
      return E("div", { "class": "smx-answer" }, [
        E("span", { "class": "smx-tick", text: "✓" }), E("span", { html: html })
      ]);
    }
    function twoCol(badT, badB, goodT, goodB) {
      return E("div", { "class": "pem-two", style: "margin-top:8px" }, [
        E("div", { "class": "pem-col bad" }, [E("h4", { text: "✗ " + badT }), E("div", { text: badB })]),
        E("div", { "class": "pem-col good" }, [E("h4", { text: "✓ " + goodT }), E("div", { text: goodB })])
      ]);
    }

    function paint() {
      clr(body);
      if (mode === "sq") paintPow(2, "squared", "a little 2");
      else if (mode === "cu") paintPow(3, "cubed", "a little 3");
      else if (mode === "p10") paintP10();
      else if (mode === "root") paintRoot();
      else paintSci();
    }

    function paintPow(k, word, littleName) {
      var n = val;
      body.appendChild(E("p", { "class": "smx-say", text:
        "“" + word.charAt(0).toUpperCase() + word.slice(1) + "” (" + littleName + ") means: take the number and " +
        "multiply it by itself, so there are " + k + " of them multiplied together. Build it up:" }));
      var steps = E("div", { "class": "smx-steps" });
      steps.appendChild(stepRow("Start with the number",
        row("", "", "<span class='mv0'>" + n + "</span>")));
      var running = n;
      for (var m = 2; m <= k; m++) {
        var next = running * n;
        steps.appendChild(stepRow(
          m === 2 ? "Multiply by " + n + "  (now 2 of them)" : "Multiply by " + n + " again  (now " + m + " of them)",
          row("<span class='mv" + ((m - 2) % 3) + "'>" + smCommas(running) + "</span> × " + n, "=",
              "<span class='mv" + ((m - 1) % 3) + "'>" + smCommas(next) + "</span>")));
        running = next;
      }
      body.appendChild(steps);
      body.appendChild(answer("<b>" + n + smSup(k) + " = " + smCommas(running) + "</b>  —  “" + n + " " + word + "”."));
      body.appendChild(E("div", { "class": "smx-n", style: "margin-top:14px", text: "The mistake everyone makes" }));
      body.appendChild(twoCol(
        "read " + littleName + " as “× " + k + "”", n + " × " + k + " = " + (n * k),
        "it means “" + n + ", " + k + " times, multiplied”", Array(k + 1).join(n + " ").trim().replace(/ /g, " × ") + " = " + smCommas(running)));
    }

    function paintP10() {
      var n = p10n;
      body.appendChild(E("p", { "class": "smx-say", text:
        "10 to a power is just 10 multiplied by itself that many times. Every step multiplies by 10 — which " +
        "tacks on one more zero. Watch the ladder:" }));
      var steps = E("div", { "class": "smx-steps" });
      for (var kk = 1; kk <= n; kk++) {
        var chain = new Array(kk).join("10 × ") + "10";
        var v = Math.pow(10, kk);
        steps.appendChild(E("div", { "class": "smx-step " + (kk === n ? "active" : "done") }, [
          row("10" + smSup(kk) + "  =  " + chain, "=",
              "<span class='mv" + ((kk - 1) % 3) + "'>" + smCommas(v) + "</span>  " +
              "<span class='smx-hint'>(" + kk + " zero" + (kk === 1 ? "" : "s") + ")</span>")
        ]));
      }
      body.appendChild(steps);
      body.appendChild(answer("<b>10" + smSup(n) + " = " + smCommas(Math.pow(10, n)) +
        "</b>  —  the exponent is just <b>how many zeros</b> to write after the 1."));
    }

    function paintRoot() {
      var t = rootN, sq = t * t, cu = t * t * t;
      body.appendChild(E("p", { "class": "smx-say", html:
        "A <b>root</b> runs a power <b>backwards</b>. <b>√" + smCommas(sq) + "</b> asks: <i>what number, times " +
        "itself, makes " + smCommas(sq) + "?</i>  There is no trick — you try numbers until one lands." }));
      var steps = E("div", { "class": "smx-steps" });
      var start = Math.max(2, t - 3);
      for (var g = start; g <= t; g++) {
        var gv = g * g;
        var verdict = gv < sq ? "too small — go higher" : "that’s it";
        steps.appendChild(E("div", { "class": "smx-step " + (g === t ? "active" : "done") }, [
          E("div", { "class": "smx-n", text: "try " + g }),
          row(g + " × " + g, "=", smCommas(gv) + "  —  " + verdict)
        ]));
      }
      body.appendChild(steps);
      body.appendChild(answer("<b>√" + smCommas(sq) + " = " + t + "</b>, because " + t + " × " + t + " = " + smCommas(sq) + "."));
      body.appendChild(E("div", { "class": "smx-n", style: "margin-top:14px", text: "Cube root — same idea, 3 copies" }));
      body.appendChild(row("∛" + smCommas(cu), "=", String(t)));
      body.appendChild(E("div", { "class": "smx-f-note", text:
        "because " + t + " × " + t + " × " + t + " = " + smCommas(cu) + ". Whenever a Chapter 3 step needs a root, " +
        "guessing whole numbers like this is exactly how the tool expects you to do it." }));
    }

    function paintSci() {
      var ex = SCI_EX[sciIdx];
      body.appendChild(E("p", { "class": "smx-say", text:
        "Scientific notation writes a giant or tiny number as “one digit, a dot, the rest — times a power of ten”. " +
        "The power of ten is exactly what the last tab was about." }));
      body.appendChild(row(ex.c + " × 10" + supE(ex.e), "=", "<b>" + ex.disp + "</b> " + ex.unit));
      body.appendChild(E("div", { "class": "smx-f-note", text:
        "The 10" + supE(ex.e) + " part says how far to hop the dot (" + Math.abs(ex.e) + " place" +
        (Math.abs(ex.e) === 1 ? "" : "s") + (ex.e < 0 ? " right, because it’s tiny" : " left, because it’s huge") +
        "). The " + ex.c + " in front is the digits, with one kept ahead of the dot." }));
      body.appendChild(E("div", { "class": "smx-f-note", style: "margin-top:8px", html:
        "Getting the hop count and the + / − sign right is its own warm-up: <a href=\"#/t/sci\">Scientific Notation →</a>" }));
    }

    /* ---------- practice ---------- */
    var pr = E("div", { "class": "smx-step active", style: "margin-top:16px" });
    box.appendChild(pr);
    function newQ() {
      clr(pr);
      var kind = ["sq", "cu", "p10", "sqrt"][Math.floor(Math.random() * 4)];
      var b, q, ans, work;
      if (kind === "sq") {
        b = 2 + Math.floor(Math.random() * 10); q = b + "²"; ans = b * b;
        work = b + "² = " + b + " × " + b + " = " + smCommas(ans);
      } else if (kind === "cu") {
        b = 2 + Math.floor(Math.random() * 6); q = b + "³"; ans = b * b * b;
        work = b + "³ = " + b + " × " + b + " × " + b + " = " + smCommas(ans);
      } else if (kind === "p10") {
        b = 2 + Math.floor(Math.random() * 5); q = "10" + smSup(b); ans = Math.pow(10, b);
        work = "10" + smSup(b) + " = 1 with " + b + " zeros = " + smCommas(ans);
      } else {
        b = 2 + Math.floor(Math.random() * 10); q = "√" + (b * b); ans = b;
        work = "√" + smCommas(b * b) + " = " + b + ", because " + b + " × " + b + " = " + smCommas(b * b);
      }
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
        if (Math.abs(g - ans) < 0.5) say("Yes!  " + work + ".", true);
        else say("Not quite — try again, or tap “Show me”.", false);
      }
      ck.addEventListener("click", check);
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); check(); } });
      sh.addEventListener("click", function () { say(work + ".", true); });
      nx.addEventListener("click", newQ);
      pr.appendChild(E("div", { "class": "smx-try-row", style: "margin-top:8px" }, [inp, ck, sh, nx]));
      pr.appendChild(fb);
    }

    buildNums();
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

    // what each letter in the formula stands for
    if (cfg.formula.legend) {
      var leg = E("div", { "class": "smx-legend" });
      cfg.formula.legend.forEach(function (it) {
        leg.appendChild(E("div", { "class": "smx-leg-row" }, [
          E("span", { "class": "smx-leg-sym", text: it.sym }),
          E("span", { "class": "smx-leg-say", text: it.say })
        ]));
      });
      box.appendChild(leg);
    }

    var revealAll = false;

    // "try it" vs "just show it worked"
    var modeRow = E("div", { "class": "smx-picker", style: "margin-top:12px" });
    box.appendChild(modeRow);
    var mTry = E("button", { type: "button", "class": "smx-sc on", text: "Try it step by step" });
    var mSee = E("button", { type: "button", "class": "smx-sc", text: "Just show it worked" });
    mTry.addEventListener("click", function () {
      if (!revealAll) return;
      revealAll = false; mTry.classList.add("on"); mSee.classList.remove("on");
      idx = 0; resolved = false; draw();
    });
    mSee.addEventListener("click", function () {
      if (revealAll) return;
      revealAll = true; mSee.classList.add("on"); mTry.classList.remove("on");
      draw();
    });
    modeRow.appendChild(mTry); modeRow.appendChild(mSee);

    box.appendChild(E("div", { "class": "smx-f-note", style: "margin:8px 0 2px", text: "Pick a real example:" }));
    var picker = E("div", { "class": "smx-picker" });
    box.appendChild(picker);
    box.appendChild(E("div", { "class": "smx-f-note", style: "margin:10px 0 0", text:
      "Each number a step works out keeps its colour, so you can spot it again in the next line." }));
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
          fb.textContent = "That’s it — " + st.expr + (st.approx ? " ≈ " : " = ") + st.result +
            (st.approx ? " (rounded)." : ".");
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
      var upto = revealAll ? M - 1 : Math.min(idx, M - 1);

      var carried = [], approxNoted = false;
      for (var i = 0; i <= upto; i++) {
        var st = plan.steps[i];
        var myCls = "mv" + (i % 4);
        var active = !revealAll && (i === idx);
        var stepEl = E("div", { "class": "smx-step " + (active ? "active" : "done") }, [
          E("div", { "class": "smx-n", text: "Step " + (i + 1) + " of " + M }),
          E("div", { "class": "smx-say", text: st.say })
        ]);
        var showTry = active && !resolved && st.try;
        var approx = !!st.approx;
        if (showTry) {
          stepEl.appendChild(tryUI(st));
        } else if (st.expr) {
          stepEl.appendChild(E("div", { "class": "smx-calc" }, [
            E("span", { "class": "smx-expr", html: smColorExpr(st.expr, carried) }),
            E("span", { "class": "smx-eq", text: approx ? "≈" : "=" }),
            E("span", { "class": "smx-res", html: smColorRes(st.result, myCls) })
          ]));
          var ln = smLeadNum(st.result);
          if (ln != null) carried.push({ num: ln, cls: myCls });
        } else {
          // a plain conclusion line (no arithmetic) — leave it uncoloured
          stepEl.appendChild(E("div", { "class": "smx-calc" },
            [E("span", { "class": "smx-res", text: st.result })]));
        }
        if (!showTry && !approxNoted && approx) {
          stepEl.appendChild(smApproxNote());
          approxNoted = true;
        }
        stepsWrap.appendChild(stepEl);
      }

      if (revealAll || idx >= M) {
        navWrap.appendChild(E("div", { "class": "smx-answer" }, [
          E("span", { "class": "smx-tick", text: "✓" }),
          E("span", { text: plan.answer })
        ]));
        if (!approxNoted && plan.approxAnswer) navWrap.appendChild(smApproxNote());
        if (revealAll) {
          var tb = E("button", { type: "button", "class": "smx-next", text: "Now let me try it ▶" });
          tb.addEventListener("click", function () {
            revealAll = false; mTry.classList.add("on"); mSee.classList.remove("on");
            idx = 0; resolved = false; draw();
          });
          navWrap.appendChild(tb);
        } else {
          navWrap.appendChild(E("button", { type: "button", "class": "smx-restart", text: "↺ Start over" }))
            .addEventListener("click", function () { idx = 0; resolved = false; draw(); });
        }
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
      note: "P in Earth-years, a in AU (1 AU = Earth’s distance from the Sun).",
      legend: [
        { sym: "P", say: "the planet’s year — one full lap around the Sun, in Earth-years." },
        { sym: "a", say: "the planet’s distance from the Sun, in AU (Earth = 1 AU)." },
        { sym: "P²", say: "“P squared” — P multiplied by itself." },
        { sym: "a³", say: "“a cubed” — a multiplied by itself, three times." }
      ]
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
          approxAnswer: smRound(P),
          steps: [
            { say: "Multiply the distance by itself.",
              expr: smFmt(a) + " × " + smFmt(a), result: smFmt(a2), approx: smRound(a2),
              try: { value: a2, tol: Math.max(0.01, a2 * 0.02), hint: "“by itself” just means " + smFmt(a) + " times " + smFmt(a) + "." } },
            { say: "Now multiply that answer by the distance one more time. That’s “the distance cubed”.",
              expr: smFmt(a2) + " × " + smFmt(a), result: smFmt(a3), approx: smRound(a3),
              try: { value: a3, tol: Math.max(0.05, a3 * 0.02), hint: "take your last answer and multiply it by " + smFmt(a) + "." } },
            { say: "That number equals the year × the year. So the year is the number that, times itself, gives " + smFmt(a3) + " (its “square root”). Guess one.",
              expr: "√" + smFmt(a3), result: smFmt(P), approx: smRound(P),
              try: { mode: "guess", op: "square", target: a3, value: P,
                     tol: Math.max(0.1, P * 0.03),
                     hint: "it’s between " + Math.floor(P) + " and " + Math.ceil(P) + "." } }
          ],
          answer: "A planet " + smFmt(a) + " AU from the Sun takes about " + smFmt(P) + " Earth-years to go once around."
        };
      }
      var p = sc.P, p2 = p * p, dist = Math.pow(p2, 1 / 3);
      return {
        approxAnswer: p !== 1 && smRound(dist),
        steps: [
          { say: "Multiply the year by itself. That’s “the year squared”.",
            expr: smFmt(p) + " × " + smFmt(p), result: smFmt(p2), approx: smRound(p2),
            try: { value: p2, tol: Math.max(0.02, p2 * 0.02), hint: smFmt(p) + " times " + smFmt(p) + "." } },
          { say: "That equals the distance × distance × distance. So the distance is the number that, cubed, gives " + smFmt(p2) + " (its “cube root”). Guess one.",
            expr: "∛" + smFmt(p2), result: smFmt(dist), approx: p !== 1 && smRound(dist),
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
      note: "Mass in grams, volume in cubic centimetres (cm³); water comes out to 1.",
      legend: [
        { sym: "mass", say: "how much matter is in the object, in grams." },
        { sym: "volume", say: "how much space it fills, in cubic centimetres (cm³)." },
        { sym: "density", say: "matter packed into each cm³. Water = 1; above 1 sinks, below 1 floats." }
      ]
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
        approxAnswer: smRound(d),
        steps: [
          { say: "Divide the mass by the volume.",
            expr: smFmt(sc.m) + " ÷ " + smFmt(sc.v), result: smFmt(d) + " g/cm³", approx: smRound(d),
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
      note: "d = how many times farther away you moved.",
      legend: [
        { sym: "d", say: "how many times farther apart the two objects moved (2 = twice as far)." },
        { sym: "d × d", say: "d squared — the distance factor is always multiplied by itself." },
        { sym: "1 ÷ (d×d)", say: "the fraction of the original pull that is left." }
      ]
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
      note: "a in AU, P in Earth-years, M in “Suns” (1 = the Sun’s mass).",
      legend: [
        { sym: "M", say: "the star’s mass, counted in Suns (1 = the mass of our Sun)." },
        { sym: "a", say: "the planet’s distance from that star, in AU." },
        { sym: "P", say: "the planet’s year around that star, in Earth-years." },
        { sym: "a³ ÷ P²", say: "distance cubed, divided by year squared." }
      ]
    },
    scenarios: [
      { label: "Planet at 1 AU, year = 0.71", a: 1, P: 0.71 },
      { label: "Planet at 4 AU, year = 8", a: 4, P: 8 },
      { label: "Planet at 3.2 AU, year = 4", a: 3.2, P: 4 }
    ],
    build: function (sc) {
      var a = sc.a, P = sc.P, a2 = a * a, a3 = a2 * a, p2 = P * P, M = a3 / p2;
      return {
        approxAnswer: smRound(M),
        steps: [
          { say: "Multiply the distance by itself.",
            expr: smFmt(a) + " × " + smFmt(a), result: smFmt(a2), approx: smRound(a2),
            try: { value: a2, tol: Math.max(0.01, a2 * 0.03), hint: smFmt(a) + " times " + smFmt(a) + "." } },
          { say: "Multiply that by the distance again — the distance cubed.",
            expr: smFmt(a2) + " × " + smFmt(a), result: smFmt(a3), approx: smRound(a3),
            try: { value: a3, tol: Math.max(0.02, a3 * 0.03), hint: "your last answer × " + smFmt(a) + "." } },
          { say: "Now multiply the year by itself — the year squared.",
            expr: smFmt(P) + " × " + smFmt(P), result: smFmt(p2), approx: smRound(p2),
            try: { value: p2, tol: Math.max(0.02, p2 * 0.03), hint: smFmt(P) + " times " + smFmt(P) + "." } },
          { say: "Divide the distance-cubed by the year-squared.",
            expr: smFmt(a3) + " ÷ " + smFmt(p2), result: smFmt(M) + " Suns", approx: smRound(M),
            try: { value: M, tol: Math.max(0.03, M * 0.05),
                   hint: "how many times does " + smFmt(p2) + " fit into " + smFmt(a3) + "?" } }
        ],
        answer: "The star weighs about " + smFmt(M) + " times as much as the Sun."
      };
    }
  };

  /* -- Gravity's pull: F = G·m₁·m₂ ÷ r² ------------------------------- */
  var CFG_GRAVITATION = {
    title: "Work out the pull between two masses",
    lead: "Newton’s law of gravitation: multiply the two masses, then divide by the distance times itself. Big G is a fixed number — set it to 1 here so you can watch what the masses and the distance do.",
    formula: {
      plain: "<b>Pull</b> = big G × mass₁ × mass₂ <b>÷</b> (distance × distance).",
      symbol: "F  =  G · m₁ · m₂ ÷ r²",
      note: "Real G = 0.0000000000667 and never changes. With G = 1: doubling a mass doubles the pull; doubling the distance quarters it.",
      legend: [
        { sym: "F", say: "the force of gravity — the strength of the pull between the two objects." },
        { sym: "G", say: "the gravitational constant: a fixed tiny number. Set to 1 here." },
        { sym: "m₁, m₂", say: "the two masses. Bigger mass → stronger pull." },
        { sym: "r", say: "the distance between the two objects’ centres." },
        { sym: "r²", say: "r times itself — the pull is divided by this whole amount." }
      ]
    },
    scenarios: [
      { label: "Two 5s, distance 2", m1: 5, m2: 5, r: 2 },
      { label: "Double one mass: 5 and 10, distance 2", m1: 5, m2: 10, r: 2 },
      { label: "Two 5s, but distance 4", m1: 5, m2: 5, r: 4 },
      { label: "Bigger: 10 and 8, distance 5", m1: 10, m2: 8, r: 5 }
    ],
    build: function (sc) {
      var top = sc.m1 * sc.m2, r2 = sc.r * sc.r, F = top / r2;
      var note;
      if (sc.m1 === 5 && sc.m2 === 10 && sc.r === 2)
        note = "The pull is about " + smFmt(F) + " — double the 6.25 you get from two 5s, because one mass doubled.";
      else if (sc.m1 === 5 && sc.m2 === 5 && sc.r === 4)
        note = "The pull is about " + smFmt(F) + " — a quarter of the 6.25 you get at distance 2, because 2× the distance means 2² = 4× weaker.";
      else
        note = "The pull works out to about " + smFmt(F) + " in these units.";
      return {
        approxAnswer: smRound(F),
        steps: [
          { say: "Multiply the two masses together.",
            expr: smFmt(sc.m1) + " × " + smFmt(sc.m2), result: smFmt(top), approx: smRound(top),
            try: { value: top, tol: Math.max(0.01, top * 0.02),
                   hint: smFmt(sc.m1) + " times " + smFmt(sc.m2) + "." } },
          { say: "Multiply the distance by itself — the distance squared.",
            expr: smFmt(sc.r) + " × " + smFmt(sc.r), result: smFmt(r2), approx: smRound(r2),
            try: { value: r2, tol: Math.max(0.01, r2 * 0.02),
                   hint: "“squared” just means " + smFmt(sc.r) + " × " + smFmt(sc.r) + "." } },
          { say: "Divide the masses-answer by the distance-squared. (Big G = 1 here, so it does not change the number.)",
            expr: smFmt(top) + " ÷ " + smFmt(r2), result: smFmt(F), approx: smRound(F),
            try: { value: F, tol: Math.max(0.01, F * 0.04),
                   hint: "how many times does " + smFmt(r2) + " fit into " + smFmt(top) + "?" } }
        ],
        answer: note
      };
    }
  };

  /* -- Order of operations (PEMDAS) --------------------------------- */
  function stepPemdas(host) {
    clr(host);
    var box = E("div", { "class": "smx" });
    host.appendChild(box);

    box.appendChild(E("div", { "class": "smx-head" }, [
      E("span", { "class": "smx-badge", text: "🔢 PEMDAS" }),
      E("div", { "class": "smx-title", text: "Order of operations — the whole thing" })
    ]));
    box.appendChild(E("p", { "class": "smx-lead", text:
      "Mix +, −, ×, ÷ and powers in one line and the answer depends on the order you work in. Everyone " +
      "follows one order so every expression has exactly one value. That order is PEMDAS." }));

    box.appendChild(E("div", { "class": "smx-formula" }, [
      E("div", { "class": "smx-f-sym", text: "( )   →   xⁿ   →   × ÷   →   + −" }),
      E("div", { "class": "smx-f-note", text:
        "1. Parentheses (innermost first).   2. Exponents & roots.   3. × and ÷ — one rank, left to right.   " +
        "4. + and − — one rank, left to right." })
    ]));

    var MODES = [
      { k: "why", label: "Why the order" },
      { k: "ranks", label: "The 4 ranks" },
      { k: "walk", label: "Walk an example" },
      { k: "traps", label: "Common traps" },
      { k: "practice", label: "Practice" }
    ];
    var mode = "ranks";
    var pick = E("div", { "class": "smx-picker" });
    var body = E("div");
    box.appendChild(pick); box.appendChild(body);
    var mBtns = [];
    MODES.forEach(function (mo) {
      var b = E("button", { type: "button", "class": "smx-sc" + (mo.k === mode ? " on" : ""), text: mo.label });
      b.addEventListener("click", function () {
        mode = mo.k;
        mBtns.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        render();
      });
      mBtns.push(b);
      pick.appendChild(b);
    });

    /* ---------- shared: a compact wrong-vs-right pair ---------- */
    function twoCol(exprText, badTitle, badBody, goodTitle, goodBody) {
      var frag = E("div", {});
      if (exprText) frag.appendChild(E("div", { "class": "smx-calc" },
        [E("span", { "class": "smx-expr", text: exprText })]));
      frag.appendChild(E("div", { "class": "pem-two" }, [
        E("div", { "class": "pem-col bad" }, [
          E("h4", { text: "✗ " + badTitle }),
          E("div", { text: badBody })
        ]),
        E("div", { "class": "pem-col good" }, [
          E("h4", { text: "✓ " + goodTitle }),
          E("div", { text: goodBody })
        ])
      ]));
      return frag;
    }

    /* ---------- section: why ---------- */
    function renderWhy() {
      body.appendChild(E("p", { "class": "smx-say", text:
        "Take 2 + 3 × 4. Two people, two orders, two different answers — that is exactly the problem the rule fixes." }));
      body.appendChild(twoCol("2 + 3 × 4",
        "Just left to right", "2 + 3 = 5, then 5 × 4 = 20",
        "PEMDAS: × before +", "3 × 4 = 12, then 2 + 12 = 14"));
      body.appendChild(E("div", { "class": "smx-f-note", text:
        "A calculator, a teacher, and a physics formula all use PEMDAS, so 14 is the one correct value. " +
        "Parentheses are how you force the other order when you actually want it: (2 + 3) × 4 = 20." }));
    }

    /* ---------- section: the 4 ranks ---------- */
    var RANKS = [
      { L: "P", name: "Parentheses  ( )",
        p: "Do everything inside brackets first. If brackets sit inside brackets, start with the innermost.",
        eg: "2 × (3 + 4) = 2 × 7 = 14",
        trap: "A <b>fraction bar</b> and a <b>√</b> act like invisible parentheses — finish the whole top and the whole bottom before you divide." },
      { L: "E", name: "Exponents & roots",
        p: "A power or root applies only to the one number (or bracket) directly attached to it.",
        eg: "3 × 2³ = 3 × 8 = 24",
        trap: "<b>−3² = −9</b>, not 9. The power grabs the 3 before the minus does. Only <b>(−3)² = 9</b>." },
      { L: "MD", name: "Multiply & Divide",
        p: "Same rank — neither beats the other. Work left to right across the line.",
        eg: "24 ÷ 6 × 2 = 4 × 2 = 8   (not 24 ÷ 12)",
        trap: "Not “multiply before divide”. Also: a number touching a bracket is a multiply — <b>3(4) = 12</b>." },
      { L: "AS", name: "Add & Subtract",
        p: "Same rank — work left to right. A subtraction is just adding a negative.",
        eg: "10 − 4 + 3 = 6 + 3 = 9   (not 10 − 7)",
        trap: "Not “add before subtract”. 10 − 4 + 3 is <b>not</b> 10 − 7." }
    ];
    function renderRanks() {
      var list = E("div", { "class": "pem-ranks" });
      RANKS.forEach(function (r) {
        list.appendChild(E("div", { "class": "pem-rank" }, [
          E("div", { "class": "pem-letter", text: r.L }),
          E("div", {}, [
            E("h4", { text: r.name }),
            E("p", { text: r.p }),
            E("div", { "class": "pem-eg", text: r.eg }),
            E("div", { "class": "pem-trap", html: "Watch out: " + r.trap })
          ])
        ]));
      });
      body.appendChild(list);
      body.appendChild(E("div", { "class": "smx-f-note", text:
        "“PEMDAS” is one memory hook (Please Excuse My Dear Aunt Sally). The trap it hides: MD is one step and AS is one step — always read those left to right." }));
    }

    /* ---------- section: walk an example ----------
       Each step carries `from` (the running line with the chunk being worked
       on boxed) and `to` (the line after). Every number a step produces keeps
       its own colour — pem-v0 / v1 / v2 — so you can follow it into later lines. */
    var EXPR = [
      { show: "2 + 3 × 4", steps: [
          { rule: "× and ÷ come before + and −",
            from: "2 + <span class='pem-v0 pem-now'>3 × 4</span>",
            to:   "2 + <span class='pem-v0'>12</span>" },
          { rule: "now the + is all that is left",
            from: "<span class='pem-v1 pem-now'>2 + <span class='pem-v0'>12</span></span>",
            to:   "<span class='pem-v1'>14</span>" }
        ], answer: "14 — not 20. The × goes first even though it is not on the left." },
      { show: "(2 + 3) × 4", steps: [
          { rule: "parentheses always go first",
            from: "<span class='pem-v0 pem-now'>(2 + 3)</span> × 4",
            to:   "<span class='pem-v0'>5</span> × 4" },
          { rule: "then the ×",
            from: "<span class='pem-v1 pem-now'><span class='pem-v0'>5</span> × 4</span>",
            to:   "<span class='pem-v1'>20</span>" }
        ], answer: "20. The brackets forced the + to the front of the line." },
      { show: "20 ÷ 4 × 5", steps: [
          { rule: "× and ÷ are one rank — left to right, so ÷ first",
            from: "<span class='pem-v0 pem-now'>20 ÷ 4</span> × 5",
            to:   "<span class='pem-v0'>5</span> × 5" },
          { rule: "then the ×",
            from: "<span class='pem-v1 pem-now'><span class='pem-v0'>5</span> × 5</span>",
            to:   "<span class='pem-v1'>25</span>" }
        ], answer: "25 — not 1. ÷ is not “after” ×; they run left to right." },
      { show: "2 + 4²", steps: [
          { rule: "exponents come before + and −",
            from: "2 + <span class='pem-v0 pem-now'>4²</span>",
            to:   "2 + <span class='pem-v0'>16</span>" },
          { rule: "then the +",
            from: "<span class='pem-v1 pem-now'>2 + <span class='pem-v0'>16</span></span>",
            to:   "<span class='pem-v1'>18</span>" }
        ], answer: "18. The little 2 means 4 × 4, and that happens before the adding." },
      { show: "3 × (2 + 1)²", steps: [
          { rule: "parentheses first",
            from: "3 × <span class='pem-v0 pem-now'>(2 + 1)</span>²",
            to:   "3 × <span class='pem-v0'>3</span>²" },
          { rule: "then the exponent on that bracket",
            from: "3 × <span class='pem-v1 pem-now'><span class='pem-v0'>3</span>²</span>",
            to:   "3 × <span class='pem-v1'>9</span>" },
          { rule: "then the ×",
            from: "<span class='pem-v2 pem-now'>3 × <span class='pem-v1'>9</span></span>",
            to:   "<span class='pem-v2'>27</span>" }
        ], answer: "27. Parentheses, then the power on that bracket, then the multiply." },
      { show: "10 − (2 + 3) + 1", steps: [
          { rule: "parentheses first",
            from: "10 − <span class='pem-v0 pem-now'>(2 + 3)</span> + 1",
            to:   "10 − <span class='pem-v0'>5</span> + 1" },
          { rule: "+ and − left to right — the − first",
            from: "<span class='pem-v1 pem-now'>10 − <span class='pem-v0'>5</span></span> + 1",
            to:   "<span class='pem-v1'>5</span> + 1" },
          { rule: "then the +",
            from: "<span class='pem-v2 pem-now'><span class='pem-v1'>5</span> + 1</span>",
            to:   "<span class='pem-v2'>6</span>" }
        ], answer: "6. After the bracket, just read + and − left to right." },
      { show: "6 × 5 ÷ (3 × 3)", steps: [
          { rule: "parentheses first",
            from: "6 × 5 ÷ <span class='pem-v0 pem-now'>(3 × 3)</span>",
            to:   "6 × 5 ÷ <span class='pem-v0'>9</span>" },
          { rule: "left to right: the × before the ÷",
            from: "<span class='pem-v1 pem-now'>6 × 5</span> ÷ <span class='pem-v0'>9</span>",
            to:   "<span class='pem-v1'>30</span> ÷ <span class='pem-v0'>9</span>" },
          { rule: "then the ÷ (30 ÷ 9 doesn’t come out even, so round it)",
            approx: true,
            from: "<span class='pem-v2 pem-now'><span class='pem-v1'>30</span> ÷ <span class='pem-v0'>9</span></span>",
            to:   "<span class='pem-v2'>3.3</span>" }
        ], answer: "About 3.3 — the same shape as G · m₁ · m₂ ÷ r²: build the top, square the bottom, then divide." }
    ];
    var cur = 0, shown = 0, walkTimer = null, walkPlaying = false;
    function stopWalkAuto() {
      walkPlaying = false;
      if (walkTimer) { clearTimeout(walkTimer); walkTimer = null; }
    }
    function renderWalk() {
      var strip = E("div", { "class": "smx-picker" });
      var hint = E("div", { "class": "smx-f-note", style: "margin:8px 0 2px", text:
        "Step through it — or press Play. Each new number keeps its own colour so you can follow it into the next line; the tinted box is the part being done this step." });
      var stage = E("div", { "class": "smx-steps" });
      var nav = E("div", { "class": "smx-nav" });
      body.appendChild(strip); body.appendChild(hint); body.appendChild(stage); body.appendChild(nav);
      var wBtns = [];
      EXPR.forEach(function (ex, i) {
        var b = E("button", { type: "button", "class": "smx-sc" + (i === cur ? " on" : ""), text: ex.show });
        b.addEventListener("click", function () {
          stopWalkAuto();
          cur = i; shown = 0;
          wBtns.forEach(function (x) { x.classList.remove("on"); });
          b.classList.add("on");
          paint();
        });
        wBtns.push(b);
        strip.appendChild(b);
      });

      function autoTick() {
        if (!document.body.contains(stage)) { stopWalkAuto(); return; }
        var ex = EXPR[cur];
        if (shown >= ex.steps.length) { stopWalkAuto(); paint(); return; }
        shown++;
        paint();
        if (shown < ex.steps.length) walkTimer = setTimeout(autoTick, 1500);
        else { walkPlaying = false; walkTimer = null; }
      }

      function paint() {
        clr(stage); clr(nav);
        var ex = EXPR[cur];
        stage.appendChild(E("div", { "class": "smx-calc" }, [E("span", { "class": "smx-expr", text: ex.show })]));
        var sawApprox = false;
        for (var i = 0; i < shown && i < ex.steps.length; i++) {
          var s = ex.steps[i];
          var fresh = (i === shown - 1);
          stage.appendChild(E("div", { "class": "smx-step done" + (fresh ? " pem-new" : "") }, [
            E("div", { "class": "smx-n", text: "Rule: " + s.rule }),
            E("div", { "class": "smx-calc pem-walk" }, [
              E("span", { "class": "pem-line", html: s.from }),
              E("span", { "class": "smx-eq" + (fresh ? " pem-reveal" : ""), text: s.approx ? "≈" : "→" }),
              E("span", { "class": "pem-line" + (fresh ? " pem-reveal" : ""), html: s.to })
            ])
          ]));
          if (s.approx) sawApprox = true;
        }
        if (sawApprox) stage.appendChild(smApproxNote());
        if (shown < ex.steps.length) {
          var nb = E("button", { type: "button", "class": "smx-next",
            text: shown === 0 ? "First step ▶" : "Next step ▶" });
          nb.addEventListener("click", function () { stopWalkAuto(); shown++; paint(); });
          nav.appendChild(nb);
          var pb = E("button", { type: "button", "class": "smx-show",
            text: walkPlaying ? "❚❚ Pause" : (shown === 0 ? "▶ Play" : "▶ Play rest") });
          pb.addEventListener("click", function () {
            if (walkPlaying) { stopWalkAuto(); paint(); return; }
            walkPlaying = true;
            autoTick();
          });
          nav.appendChild(pb);
        } else {
          nav.appendChild(E("div", { "class": "smx-answer pem-new" }, [
            E("span", { "class": "smx-tick", text: "✓" }),
            E("span", { text: ex.answer })
          ]));
          var rb = E("button", { type: "button", "class": "smx-restart", text: "↺ Start over" });
          rb.addEventListener("click", function () { stopWalkAuto(); shown = 0; paint(); });
          nav.appendChild(rb);
        }
      }
      paint();
    }

    /* ---------- section: common traps ---------- */
    function renderTraps() {
      body.appendChild(E("p", { "class": "smx-say", text: "The five that catch people out most:" }));
      body.appendChild(E("div", { "class": "smx-n", text: "1 · × and ÷ go left to right" }));
      body.appendChild(twoCol("8 ÷ 2 × 4",
        "× before ÷", "8 ÷ 2 × 4 → 8 ÷ 8 = 1",
        "left to right", "8 ÷ 2 × 4 → 4 × 4 = 16"));
      body.appendChild(E("div", { "class": "smx-n", text: "2 · + and − go left to right" }));
      body.appendChild(twoCol("9 − 5 + 2",
        "+ before −", "9 − 5 + 2 → 9 − 7 = 2",
        "left to right", "9 − 5 + 2 → 4 + 2 = 6"));
      body.appendChild(E("div", { "class": "smx-n", text: "3 · a minus in front of a power" }));
      body.appendChild(twoCol("−4²",
        "square the −4", "(−4)² = 16",
        "power first, then the minus", "−(4 × 4) = −16"));
      body.appendChild(E("div", { "class": "smx-n", text: "4 · a division line groups top and bottom" }));
      body.appendChild(twoCol("12 ÷ (2 + 4)",
        "no brackets: 12 ÷ 2 + 4", "6 + 4 = 10",
        "the (2 + 4) is one number", "12 ÷ 6 = 2"));
      body.appendChild(E("div", { "class": "smx-n", text: "5 · a number touching a bracket means ×" }));
      body.appendChild(twoCol("2(5) + 3",
        "read 2 and 5 as one number", "25 + 3 = 28",
        "2(5) is 2 × 5", "10 + 3 = 13"));
      body.appendChild(E("div", { "class": "smx-f-note", text:
        "In a real formula like G·m₁·m₂ ÷ r², the r² is done first (exponent), and everything on top is its own group before the divide." }));
    }

    /* ---------- section: practice ---------- */
    var Q_FIRST = [
      { q: "5 + 2 × 3", opts: ["5 + 2", "2 × 3"], a: 1, why: "× comes before +." },
      { q: "8 ÷ (4 − 2)", opts: ["8 ÷ 4", "4 − 2"], a: 1, why: "Parentheses first." },
      { q: "3 × 4²", opts: ["3 × 4", "4²"], a: 1, why: "The exponent comes before the ×." },
      { q: "12 ÷ 6 × 2", opts: ["12 ÷ 6", "6 × 2"], a: 0, why: "× and ÷ run left to right — ÷ is leftmost." },
      { q: "10 − 3 + 1", opts: ["10 − 3", "3 + 1"], a: 0, why: "+ and − run left to right — the − is leftmost." },
      { q: "2 × 3 + 4 × 5", opts: ["2 × 3", "3 + 4"], a: 0, why: "Both ×'s happen before the +; do the left one first." }
    ];
    var Q_EVAL = [
      { q: "2 + 3 × 4", opts: ["14", "20"], a: 0, why: "3 × 4 = 12, then 2 + 12." },
      { q: "(2 + 3) × 4", opts: ["20", "14"], a: 0, why: "Brackets first: 5, then 5 × 4." },
      { q: "20 − 4 × 2", opts: ["12", "32"], a: 0, why: "4 × 2 = 8, then 20 − 8." },
      { q: "12 ÷ 2 + 4", opts: ["10", "2"], a: 0, why: "12 ÷ 2 = 6, then 6 + 4." },
      { q: "1 + 2²  × 3", opts: ["13", "36"], a: 0, why: "2² = 4, then 4 × 3 = 12, then 1 + 12." },
      { q: "18 ÷ (3 + 3) × 2", opts: ["6", "1.5"], a: 0, why: "brackets → 6, then 18 ÷ 6 = 3, then 3 × 2." }
    ];
    function renderPractice() {
      var pr = E("div", { "class": "smx-step active" });
      body.appendChild(pr);
      function newQ() {
        clr(pr);
        var evalKind = Math.random() < 0.5;
        var pool = evalKind ? Q_EVAL : Q_FIRST;
        var item = pool[Math.floor(Math.random() * pool.length)];
        pr.appendChild(E("div", { "class": "smx-n", text: "Now you try" }));
        pr.appendChild(E("div", { "class": "smx-say", text: evalKind
          ? "What does   " + item.q + "   come out to?"
          : "In   " + item.q + "   — which part do you do FIRST?" }));
        var fb = E("div", { "class": "smx-fb" });
        var row = E("div", { "class": "smx-picker" });
        item.opts.forEach(function (opt, oi) {
          var b = E("button", { type: "button", "class": "smx-sc", text: opt });
          b.addEventListener("click", function () {
            if (oi === item.a) { fb.className = "smx-fb good"; fb.textContent = "Yes — " + item.why; }
            else { fb.className = "smx-fb bad"; fb.textContent = (evalKind ? "Not quite. " : "Not first. ") + item.why; }
          });
          row.appendChild(b);
        });
        var nx = E("button", { type: "button", "class": "smx-next", text: "Another ▶" });
        nx.addEventListener("click", newQ);
        pr.appendChild(row);
        pr.appendChild(nx);
        pr.appendChild(fb);
      }
      newQ();
    }

    function render() {
      stopWalkAuto();
      clr(body);
      if (mode === "why") renderWhy();
      else if (mode === "ranks") renderRanks();
      else if (mode === "walk") renderWalk();
      else if (mode === "traps") renderTraps();
      else renderPractice();
    }
    render();
  }

  /* -- Ellipse size: a = (near + far) ÷ 2 ---------------------------- */
  var CFG_SEMIMAJOR = {
    title: "Find an orbit’s size from its near and far points",
    lead: "A planet’s orbit is an ellipse — a slightly stretched circle. Its “size” (the number a that Kepler’s third law needs) is just the halfway point between its closest and farthest distance from the Sun.",
    formula: {
      plain: "<b>Orbit size</b> = (closest distance <b>+</b> farthest distance) <b>÷</b> 2.",
      symbol: "a  =  (near + far) ÷ 2",
      note: "“near” is the perihelion, “far” is the aphelion. Distances in AU. a is called the semi-major axis.",
      legend: [
        { sym: "near", say: "the orbit’s closest point to the Sun (perihelion), in AU." },
        { sym: "far", say: "the orbit’s farthest point from the Sun (aphelion), in AU." },
        { sym: "a", say: "the orbit’s size — halfway between near and far. This is the a in P² = a³." }
      ]
    },
    scenarios: [
      { label: "Earth: near 0.98, far 1.02", near: 0.98, far: 1.02 },
      { label: "Mars: near 1.38, far 1.67", near: 1.38, far: 1.67 },
      { label: "Halley’s Comet: near 0.6, far 35", near: 0.6, far: 35 },
      { label: "Pluto: near 29.7, far 49.3", near: 29.7, far: 49.3 }
    ],
    build: function (sc) {
      var sum = sc.near + sc.far, a = sum / 2;
      return {
        approxAnswer: smRound(a),
        steps: [
          { say: "Add the closest and farthest distances together.",
            expr: smFmt(sc.near) + " + " + smFmt(sc.far), result: smFmt(sum), approx: smRound(sum),
            try: { value: sum, tol: Math.max(0.01, sum * 0.02), hint: "just add the two numbers." } },
          { say: "Halve it — divide by 2 to land in the middle.",
            expr: smFmt(sum) + " ÷ 2", result: smFmt(a) + " AU", approx: smRound(a),
            try: { value: a, tol: Math.max(0.01, a * 0.02), hint: "half of " + smFmt(sum) + "." } }
        ],
        answer: "This orbit’s size is " + (smRound(a) ? "about " : "") + smFmt(a) + " AU" +
          (sc.near === 0.6 && sc.far === 35
            ? " — even a wildly stretched comet orbit still has one tidy “size” number to feed into P² = a³."
            : ".")
      };
    }
  };

  /* -- Newton's second law: F = m × a ------------------------------- */
  var CFG_NEWTON2 = {
    title: "How much does a push speed something up?",
    lead: "Newton’s second law. The same push moves a light thing more than a heavy thing. Force equals mass times acceleration — and turned around, acceleration equals force divided by mass.",
    formula: {
      plain: "<b>Force</b> = mass <b>×</b> acceleration.   Rearranged: acceleration = force <b>÷</b> mass.",
      symbol: "F  =  m × a",
      note: "Mass in kilograms, acceleration in m/s² (how fast the speed changes each second), force in newtons.",
      legend: [
        { sym: "F", say: "the push or pull, measured in newtons (N)." },
        { sym: "m", say: "the mass being pushed, in kilograms." },
        { sym: "a", say: "the acceleration — how much the speed changes each second, in m/s²." }
      ]
    },
    scenarios: [
      { label: "Push a 2 kg ball at 3 m/s² — the force?", find: "F", m: 2, a: 3 },
      { label: "A 1000 kg car speeding up at 2 m/s² — the force?", find: "F", m: 1000, a: 2 },
      { label: "6 N of push on a 12 kg cart — the speed-up?", find: "a", F: 6, m: 12 },
      { label: "5000 N on a 2500 kg spacecraft — the speed-up?", find: "a", F: 5000, m: 2500 }
    ],
    build: function (sc) {
      if (sc.find === "F") {
        var F = sc.m * sc.a;
        return {
          approxAnswer: smRound(F),
          steps: [
            { say: "Multiply the mass by the acceleration.",
              expr: smFmt(sc.m) + " × " + smFmt(sc.a), result: smFmt(F) + " N", approx: smRound(F),
              try: { value: F, tol: Math.max(0.01, F * 0.02),
                     hint: smFmt(sc.m) + " times " + smFmt(sc.a) + "." } }
          ],
          answer: "It takes about " + smFmt(F) + " newtons of force."
        };
      }
      var a = sc.F / sc.m;
      return {
        approxAnswer: smRound(a),
        steps: [
          { say: "Divide the force by the mass.",
            expr: smFmt(sc.F) + " ÷ " + smFmt(sc.m), result: smFmt(a) + " m/s²", approx: smRound(a),
            try: { value: a, tol: Math.max(0.001, a * 0.03),
                   hint: "how many times does " + smFmt(sc.m) + " fit into " + smFmt(sc.F) + "?" } }
        ],
        answer: "It speeds up by about " + smFmt(a) + " m/s each second."
      };
    }
  };

  D["math-mul"] = function (host) { stepMul(host); };
  D["math-exponents"] = function (host) { stepExponents(host); };
  D["math-pemdas"] = function (host) { stepPemdas(host); };
  D["math-semimajor"] = function (host) { stepMath(host, CFG_SEMIMAJOR); };
  D["math-kepler3"] = function (host) { stepMath(host, CFG_KEPLER3); };
  D["math-newton2"] = function (host) { stepMath(host, CFG_NEWTON2); };
  D["math-density"] = function (host) { stepMath(host, CFG_DENSITY); };
  D["math-inverse-square"] = function (host) { stepMath(host, CFG_INVSQ); };
  D["math-weigh"] = function (host) { stepMath(host, CFG_WEIGH); };
  D["math-gravitation"] = function (host) { stepMath(host, CFG_GRAVITATION); };

  /* =========================================================================
     CHAPTER 4 — Earth, Moon, and Sky
     ========================================================================= */

  /* ---- 4.5  Why the Moon changes phase ---------------------------- */
  D["moon-phase-wheel"] = function (host) {
    var r = frame(host, "Why the Moon changes phase",
      "Drag the slider (or press Play) to move the Moon around its orbit.",
      "The Moon is always half lit by the Sun. As it swings around Earth, we see different amounts of that lit half — that's the whole secret of the phases. (The Sun is drawn nearby, but its light really arrives as near-enough parallel rays from far off to the right.)");
    var Ox = 118, Oy = 148, R = 92;
    var s = svg(r.stage, 340, 260);
    s.appendChild(S("circle", { cx: Ox, cy: Oy, r: R, "class": "dg-orbit" }));
    var sunG = S("g", {});
    sunG.appendChild(S("circle", { cx: 320, cy: Oy, r: 11, "class": "dg-sun" }));
    for (var i = -1; i <= 1; i++) {
      sunG.appendChild(S("line", { x1: 296, y1: Oy + i * 16, x2: 272, y2: Oy + i * 16, "class": "dg-ray3" }));
    }
    s.appendChild(sunG);
    s.appendChild(T(320, Oy + 28, "Sun’s light", "dg-lbl-mid"));
    var earth = S("circle", { cx: Ox, cy: Oy, r: 14, "class": "dg-earth" });
    var sight = S("line", { "class": "dg-sight" });
    var moonDot = S("circle", { r: 6, style: "fill:var(--text-dim)" });
    [sight, earth, moonDot, T(Ox, Oy + 4, "🌍", "dg-lbl-mid")].forEach(function (n) { s.appendChild(n); });
    [[0, "New"], [90, "1st Q"], [180, "Full"], [270, "3rd Q"]].forEach(function (tk) {
      var a = -tk[0] * Math.PI / 180;
      var lbl = T(Ox + (R + 15) * Math.cos(a), Oy + (R + 15) * Math.sin(a) + 3, tk[1], "dg-lbl-mid");
      s.appendChild(lbl);
    });
    var Px = 56, Py = 38, PR = 25;
    s.appendChild(S("circle", { cx: Px, cy: Py, r: PR + 4, style: "fill:none;stroke:var(--border);stroke-dasharray:2 2" }));
    var back = S("circle", { cx: Px, cy: Py, r: PR, style: "fill:var(--panel-2);stroke:var(--border)" });
    var lit = S("path", { style: "fill:#f2dca6" });
    var ring = S("circle", { cx: Px, cy: Py, r: PR, style: "fill:none;stroke:var(--border)" });
    [back, lit, ring, T(Px, Py + PR + 15, "seen from Earth", "dg-lbl-mid")].forEach(function (n) { s.appendChild(n); });

    function fmtClock(hr) {
      hr = ((hr % 24) + 24) % 24;
      var hh = Math.floor(hr), mm = Math.round((hr - hh) * 60);
      if (mm === 60) { mm = 0; hh = (hh + 1) % 24; }
      var ap = hh < 12 ? "am" : "pm";
      var h12 = hh % 12; if (h12 === 0) h12 = 12;
      return h12 + (mm ? ":" + (mm < 10 ? "0" : "") + mm : "") + " " + ap;
    }
    function phaseName(theta) {
      if (theta < 8 || theta > 352) return "New moon";
      if (theta < 82) return "Waxing crescent";
      if (theta < 98) return "First quarter";
      if (theta < 172) return "Waxing gibbous";
      if (theta < 188) return "Full moon";
      if (theta < 262) return "Waning gibbous";
      if (theta < 278) return "Third quarter";
      return "Waning crescent";
    }
    function draw(theta) {
      theta = ((theta % 360) + 360) % 360;
      var a = -theta * Math.PI / 180;
      var mx = Ox + R * Math.cos(a), my = Oy + R * Math.sin(a);
      moonDot.setAttribute("cx", mx); moonDot.setAttribute("cy", my);
      sight.setAttribute("x1", Ox); sight.setAttribute("y1", Oy);
      sight.setAttribute("x2", mx); sight.setAttribute("y2", my);
      var k = (1 - Math.cos(theta * Math.PI / 180)) / 2;
      var litRight = theta > 0 && theta < 180;
      lit.setAttribute("d", phasePath(Px, Py, PR, k, litRight));
      var offsetH = theta / 360 * 24;
      r.readout.innerHTML = "<b>" + phaseName(theta) + "</b> — using a typical 6:00 am sunrise and 6:00 pm " +
        "sunset, this Moon rises around <b>" + fmtClock(6 + offsetH) + "</b> and sets around <b>" +
        fmtClock(18 + offsetH) + "</b>.";
    }
    var sl = slider(r.controls, "Position in orbit", 0, 359, 45, 1, function (v) { draw(v); });
    var pb = playBtn(r.controls, function () {
      var v = (parseFloat(sl.input.value) + 1.2) % 360; sl.input.value = v; draw(v);
    });
    sl.input.addEventListener("input", function () { pb.stop(); });
    var quick = E("div", { "class": "dg-chips" });
    var quickVals = [0, 90, 180, 270];
    ["New", "1st Q", "Full", "3rd Q"].forEach(function (label) {
      quick.appendChild(E("button", { type: "button", text: label, "class": "dg-chip" }));
    });
    quick.querySelectorAll("button").forEach(function (b, i) {
      b.addEventListener("click", function () { pb.stop(); sl.input.value = quickVals[i]; draw(quickVals[i]); });
    });
    r.controls.appendChild(quick);
    draw(45);
  };

  /* ---- 4.6  Spring tides and neap tides ---------------------------- */
  D["tide-bulge"] = function (host) {
    var r = frame(host, "Spring tides and neap tides",
      "Drag the slider to change the angle between the Sun and the Moon.",
      "The Moon always stretches the ocean into a bulge on both the near and far side of Earth. Line the Sun up with the Moon (0° or 180°) and its pull reinforces that bulge for a spring tide. Put the Sun at right angles (90°) and its pull partly cancels the Moon's, for a smaller neap tide.");
    var Ox = 150, Oy = 122, base = 44;
    var s = svg(r.stage, 320, 244);
    var bulge = S("ellipse", { cx: Ox, cy: Oy, "class": "dg-globe" });
    var earth = S("circle", { cx: Ox, cy: Oy, r: 26, "class": "dg-earth" });
    var moonLine = S("line", { "class": "dg-ray3" });
    var moonHead = S("path", { "class": "dg-rayhead" });
    var sunLine = S("line", { "class": "dg-ray3" });
    var sunHead = S("path", { "class": "dg-rayhead" });
    var moonLbl = T(0, 0, "Moon", "dg-lbl");
    var sunLbl = T(0, 0, "Sun", "dg-lbl");
    [bulge, earth, moonLine, moonHead, sunLine, sunHead, moonLbl, sunLbl].forEach(function (n) { s.appendChild(n); });

    function place(lineEl, headEl, lblEl, ang, len, text) {
      var x2 = Ox + len * Math.cos(ang), y2 = Oy + len * Math.sin(ang);
      lineEl.setAttribute("x1", Ox); lineEl.setAttribute("y1", Oy);
      lineEl.setAttribute("x2", x2); lineEl.setAttribute("y2", y2);
      var bx = x2 - 9 * Math.cos(ang), by = y2 - 9 * Math.sin(ang);
      var px = -Math.sin(ang), py = Math.cos(ang);
      headEl.setAttribute("d", "M " + x2 + " " + y2 + " L " + (bx + px * 5) + " " + (by + py * 5) +
        " L " + (bx - px * 5) + " " + (by - py * 5) + " Z");
      lblEl.setAttribute("x", x2 + 10 * Math.cos(ang) - text.length * 2.6);
      lblEl.setAttribute("y", y2 + 10 * Math.sin(ang) + 3);
    }
    function draw(sunAngleDeg) {
      var sunRad = sunAngleDeg * Math.PI / 180;
      // cos²(angle): 1 when Sun and Moon are aligned (0°/180°, reinforcing — spring
      // tide), smoothly down to 0 at 90° (pulling at right angles cancels out any
      // extra stretch — neap tide, drawn as a plain circle), never negative so the
      // bulge always stays stretched along the Moon's fixed direction, never
      // perpendicular to it.
      var elong = Math.cos(sunRad) * Math.cos(sunRad);
      var rx = base * (1 + 0.30 * elong);
      var ry = base * (1 - 0.14 * elong);
      bulge.setAttribute("rx", rx); bulge.setAttribute("ry", ry);
      place(moonLine, moonHead, moonLbl, 0, rx + 40, "Moon");
      place(sunLine, sunHead, sunLbl, sunRad, 92, "Sun");
      r.readout.innerHTML = (sunAngleDeg < 20 || sunAngleDeg > 160)
        ? "<b>Spring tide</b> — Sun and Moon are nearly lined up (as at new moon or full moon), so their pulls add together for extra-large tides."
        : (sunAngleDeg > 70 && sunAngleDeg < 110)
        ? "<b>Neap tide</b> — Sun and Moon pull at roughly right angles (as at first or third quarter), so the Sun's pull partly cancels the Moon's, giving smaller tides."
        : "Somewhere between a spring tide and a neap tide.";
    }
    slider(r.controls, "Angle between Sun and Moon (°)", 0, 180, 0, 1, function (v) { draw(v); });
    draw(0);
  };

  /* ---- 4.7  Pick an eclipse ----------------------------------------- */
  D["eclipse-picker"] = function (host) {
    var r = frame(host, "Solar eclipse or lunar eclipse?",
      "Tap a kind of eclipse to see how it happens.",
      "A solar eclipse is the Moon's shadow falling on Earth; a lunar eclipse is the Moon moving into Earth's shadow. The dark umbra gives a total eclipse; the lighter penumbra gives a partial one.");
    var box = E("div");
    r.stage.appendChild(box);
    var INFO = {
      total_solar: { img: "fig-4-21.jpg", cap: "Figure 4.21 — position 1 sits inside the Moon's dark umbra.",
        text: "<b>Total solar eclipse:</b> you are standing in the small, dark umbra of the Moon's shadow (position 1). The Moon completely covers the Sun's bright disk, and for a few minutes the Sun's corona flashes into view." },
      partial_solar: { img: "fig-4-21.jpg", cap: "Figure 4.21 — positions 2 and 3 sit inside the lighter penumbra.",
        text: "<b>Partial solar eclipse:</b> you are in the Moon's lighter penumbra (positions 2 or 3), so only part of the Sun's disk is covered. This is visible from a much wider area than a total eclipse." },
      annular_solar: { img: "fig-4-21.jpg", cap: "Figure 4.21 — position 4, with the Moon a little farther from Earth.",
        text: "<b>Annular solar eclipse:</b> the Moon is a bit farther from Earth than usual (position 4), so it looks too small to fully cover the Sun — a bright ring (annulus) of sunlight stays visible all around it." },
      total_lunar: { img: "fig-4-24.jpg", cap: "Figure 4.24 — the full moon passing completely into Earth's umbra.",
        text: "<b>Total lunar eclipse:</b> the full moon passes completely into Earth's dark umbra. It doesn't disappear — sunlight bent through Earth's atmosphere usually still lights it a dull coppery red." },
      partial_lunar: { img: "fig-4-24.jpg", cap: "Figure 4.24 — only part of the Moon crossing the umbra.",
        text: "<b>Partial lunar eclipse:</b> only part of the full moon passes into Earth's dark umbra, so only part of its disk darkens." }
    };
    function show(key) {
      clr(box);
      var info = INFO[key];
      box.appendChild(E("figure", { "class": "tb-figure" }, [
        E("img", { src: "img/" + info.img, alt: info.cap, loading: "lazy" }),
        E("figcaption", { text: info.cap })
      ]));
      r.readout.innerHTML = info.text;
    }
    bigPick(r.controls, [
      { label: "☀️ Total solar", value: "total_solar" },
      { label: "☀️ Partial solar", value: "partial_solar" },
      { label: "☀️ Annular solar", value: "annular_solar" },
      { label: "🌕 Total lunar", value: "total_lunar" },
      { label: "🌕 Partial lunar", value: "partial_lunar" }
    ], 0, function (v) { show(v); });
    show("total_solar");
  };

  /* ---- 4.3  Stars rise about 4 minutes earlier every day ------------ */
  D["star-rise-calc"] = function (host) {
    var r = frame(host, "Stars rise about 4 minutes earlier every day",
      "Slide to pick how many days from now.",
      "Clocks track the Sun, but Earth also moves along its orbit each day, so it takes about 4 extra minutes of rotation to bring the Sun back overhead — and the stars get 4 minutes further ahead of it every day.");
    var big = E("p", { style: "text-align:center;font-size:1.3em;margin:14px 0;line-height:1.6" });
    r.stage.appendChild(big);
    function fmt(totalMin) {
      totalMin = ((Math.round(totalMin) % 1440) + 1440) % 1440;
      var hh = Math.floor(totalMin / 60), mm = totalMin % 60;
      var ap = hh < 12 ? "am" : "pm";
      var h12 = hh % 12; if (h12 === 0) h12 = 12;
      return h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + ap;
    }
    var refMin = 20 * 60; // a star rising at 8:00 pm tonight, as a fixed example
    function draw(days) {
      var minutesEarlier = days * 4;
      big.innerHTML = "⭐ rises at <b>" + fmt(refMin) + "</b> tonight<br>&darr;<br>rises at <b>" +
        fmt(refMin - minutesEarlier) + "</b> in " + days + " day" + (days === 1 ? "" : "s");
      var hrs = minutesEarlier / 60;
      r.readout.innerHTML = "That's about <b>" +
        (minutesEarlier < 60 ? Math.round(minutesEarlier) + " minutes" : (Math.round(hrs * 10) / 10) + " hours") +
        "</b> earlier than tonight — 4 minutes earlier for every day that passes, or about 2 hours a month.";
    }
    slider(r.controls, "Days from now", 0, 180, 90, 1, function (v) { draw(v); });
    draw(90);
  };

  /* ---- 4.4  Is it a leap year? --------------------------------------- */
  D["leapyear-check"] = function (host) {
    var r = frame(host, "Is it a leap year?",
      "Type any year and see how the Gregorian rule works it out.",
      "Rule: a year is a leap year if divisible by 4 — unless it's a century year (divisible by 100), in which case it's a leap year only if it's also divisible by 400.");
    var wrap = E("div", { style: "display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:6px 0 4px" });
    var input = E("input", { type: "number", value: 2000, step: 1, style: "font-size:1.1em;width:8em;padding:6px 8px" });
    wrap.appendChild(E("label", {}, [E("span", { text: "Year: ", style: "margin-right:6px" }), input]));
    r.stage.appendChild(wrap);
    var out = E("div", { "class": "prose" });
    r.stage.appendChild(out);
    function check() {
      var y = Math.round(parseFloat(input.value));
      if (!isFinite(y)) { out.innerHTML = ""; r.readout.innerHTML = "Type a year."; return; }
      var by4 = y % 4 === 0, by100 = y % 100 === 0, by400 = y % 400 === 0;
      var leap = by100 ? by400 : by4;
      var steps = "<p>Is " + y + " divisible by <b>4</b>? " + (by4 ? "Yes." : "No — so it can't be a leap year.") + "</p>";
      if (by4) {
        steps += "<p>Is " + y + " a century year (divisible by <b>100</b>)? " +
          (by100 ? "Yes." : "No — so it IS a leap year, no further check needed.") + "</p>";
        if (by100) {
          steps += "<p>Since it's a century year, is it divisible by <b>400</b>? " +
            (by400 ? "Yes — it IS a leap year." : "No — so it is NOT a leap year, even though it's divisible by 4.") + "</p>";
        }
      }
      out.innerHTML = steps;
      r.readout.innerHTML = leap
        ? "<b>" + y + " is a leap year</b> — 366 days, with a February 29."
        : "<b>" + y + " is not a leap year</b> — 365 days.";
    }
    input.addEventListener("input", check);
    check();
  };

  /* =========================================================================
     CHAPTER 5 — Radiation and Spectra
     ========================================================================= */

  /* wavelength (nm, visible range) -> approximate CSS color */
  function wavelengthToColor(wl) {
    var r, g, b;
    if (wl < 440) { r = -(wl - 440) / (440 - 380); g = 0; b = 1; }
    else if (wl < 490) { r = 0; g = (wl - 440) / (490 - 440); b = 1; }
    else if (wl < 510) { r = 0; g = 1; b = -(wl - 510) / (510 - 490); }
    else if (wl < 580) { r = (wl - 510) / (580 - 510); g = 1; b = 0; }
    else if (wl < 645) { r = 1; g = -(wl - 645) / (645 - 580); b = 0; }
    else { r = 1; g = 0; b = 0; }
    var fade = wl < 420 ? 0.3 + 0.7 * (wl - 380) / (420 - 380) : wl > 700 ? 0.3 + 0.7 * (750 - wl) / (750 - 700) : 1;
    function ch(v) { return Math.round(255 * Math.max(0, Math.min(1, v)) * fade); }
    return "rgb(" + ch(r) + "," + ch(g) + "," + ch(b) + ")";
  }
  function colorName(wl) {
    return wl < 450 ? "violet" : wl < 495 ? "blue" : wl < 570 ? "green" : wl < 590 ? "yellow" : wl < 620 ? "orange" : "red";
  }

  /* ---- 5.1  Wavelength, frequency, and c = λf ------------------------ */
  D["light-wave"] = function (host) {
    var r = frame(host, "Wavelength, frequency, and the speed of light",
      "Slide to change the wavelength. Watch the beam itself shrink and stretch — and change color.",
      "Shorter wavelength packs more crests into the same stretch of space — a higher frequency — even though the wave still travels at speed c. That's c = λf.");
    var W = 344, x0 = 8, y0 = 66;
    var s = svg(r.stage, 360, 176);
    var mid = S("line", { x1: x0, y1: y0, x2: x0 + W, y2: y0, "class": "dg-ground" });
    var fillPath = S("path", { style: "stroke:none" });
    var glow1 = S("path", { style: "fill:none;stroke-width:16;stroke-linecap:round" });
    var glow2 = S("path", { style: "fill:none;stroke-width:9;stroke-linecap:round" });
    var core = S("path", { style: "fill:none;stroke-width:3;stroke-linecap:round" });
    var beamBg = S("rect", { x: x0, y: 130, width: W, height: 26, rx: 8, style: "fill:var(--panel-2);stroke:var(--border)" });
    var beam = S("rect", { x: x0, y: 130, width: W, height: 26, rx: 8 });
    var beamLbl = T(x0 + W / 2, 130 + 17, "", "dg-lbl-mid");
    beamLbl.setAttribute("style", "font-weight:700");
    [mid, fillPath, glow1, glow2, core, beamBg, beam, beamLbl].forEach(function (n) { s.appendChild(n); });

    var curWL = 550, phase = 0;
    var PIXEL_SPEED = 26; // px/sec the traveling pattern moves — the SAME for every wavelength (that's "c")

    function shape(wl, ph) {
      var px = 60 * (wl / 550); // crest-to-crest pixels, scaled so visible range looks reasonable
      var amp = 40, pts = [], fpts = [];
      var n = Math.ceil((W / px) * 8);
      for (var i = 0; i <= n; i++) {
        var x = x0 + (i / n) * W;
        var y = y0 - amp * Math.sin((x - x0) / px * 2 * Math.PI - ph);
        pts.push((i === 0 ? "M " : "L ") + x.toFixed(1) + " " + y.toFixed(1));
        fpts.push(x.toFixed(1) + " " + y.toFixed(1));
      }
      var wave = pts.join(" ");
      var area = "M " + x0 + " " + y0 + " L " + fpts.join(" L ") + " L " + (x0 + W) + " " + y0 + " Z";
      return { wave: wave, area: area, px: px };
    }

    function paint() {
      var g = shape(curWL, phase);
      fillPath.setAttribute("d", g.area);
      glow1.setAttribute("d", g.wave);
      glow2.setAttribute("d", g.wave);
      core.setAttribute("d", g.wave);
      var col = wavelengthToColor(curWL);
      fillPath.setAttribute("style", "stroke:none;fill:" + col + ";opacity:0.16");
      glow1.setAttribute("style", "fill:none;stroke-width:16;stroke-linecap:round;stroke:" + col + ";opacity:0.25");
      glow2.setAttribute("style", "fill:none;stroke-width:9;stroke-linecap:round;stroke:" + col + ";opacity:0.45");
      core.setAttribute("style", "fill:none;stroke-width:3;stroke-linecap:round;stroke:" + col);
      beam.setAttribute("style", "fill:" + col);
      beamLbl.textContent = colorName(curWL) + " light";
      beamLbl.setAttribute("style", "font-weight:700;fill:" +
        (curWL > 480 && curWL < 600 ? "#111" : "#fff"));
    }
    function updateReadout() {
      var px = shape(curWL, 0).px;
      var crests = (W / px).toFixed(1);
      var freqHz = (3e8 / (curWL * 1e-9));
      var freqTHz = (freqHz / 1e12).toFixed(2);
      r.readout.innerHTML = "<b>λ = " + curWL + " nm</b> (" + colorName(curWL) + ") &mdash; about <b>" + crests +
        "</b> crests fit in this box. Frequency f = c &divide; λ &asymp; <b>" + freqTHz + " THz</b> (" +
        freqTHz + " &times; 10<sup>12</sup> Hz). Speed is always c = 300,000 km/s.";
    }
    slider(r.controls, "Wavelength (nm)", 400, 700, 550, 5, function (v) { curWL = v; paint(); updateReadout(); });
    var last = null;
    autoTicker(r.controls, function () {
      var now = Date.now();
      var dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      var px = shape(curWL, 0).px;
      phase = (phase + (2 * Math.PI * PIXEL_SPEED * dt) / px) % (2 * Math.PI);
      paint();
    });
    paint();
    updateReadout();
  };

  /* ---- 5.2  Blackbody curves and Wien's law --------------------------- */
  D["blackbody-curve"] = function (host) {
    var r = frame(host, "A blackbody's spectrum shifts with temperature",
      "Slide the temperature. Watch the peak move and the curve grow.",
      "Wien's law: hotter objects peak at shorter (bluer) wavelengths. The Stefan-Boltzmann law: hotter objects radiate a LOT more power overall — power grows with T⁴.");
    var W = 344, H = 190, x0 = 10, y0 = 166;
    var s = svg(r.stage, W + 16, H + 20);
    var defs = S("defs", {});
    var visGrad = S("linearGradient", { id: "ch5-bb-visband", x1: "0%", x2: "100%", y1: "0%", y2: "0%" });
    [380, 420, 460, 500, 540, 570, 590, 620, 700].forEach(function (wl, i, arr) {
      visGrad.appendChild(S("stop", { offset: (i / (arr.length - 1) * 100) + "%", "stop-color": wavelengthToColor(wl) }));
    });
    defs.appendChild(visGrad);
    s.appendChild(defs);
    s.appendChild(S("line", { x1: x0, y1: y0, x2: x0 + W, y2: y0, "class": "dg-ground" }));
    s.appendChild(S("line", { x1: x0, y1: y0, x2: x0, y2: 6, "class": "dg-ground" }));
    var visBand = S("rect", { y: 6, height: y0 - 6, style: "fill:url(#ch5-bb-visband);opacity:0.55" });
    var visLbl = T(0, 20, "visible", "dg-lbl");
    visLbl.setAttribute("style", "font-weight:700;paint-order:stroke;stroke:var(--bg);stroke-width:3px");
    var curve = S("path", { style: "fill:none;stroke-width:2.5;stroke:var(--warn)" });
    var peakDot = S("circle", { r: 4, style: "fill:var(--bad)" });
    var peakLine = S("line", { "class": "dg-dash" });
    s.appendChild(visBand); s.appendChild(visLbl); s.appendChild(curve); s.appendChild(peakLine); s.appendChild(peakDot);
    s.appendChild(T(x0 + 2, y0 + 14, "400 nm", "dg-lbl"));
    s.appendChild(T(x0 + W - 34, y0 + 14, "3000 nm", "dg-lbl"));
    var maxNM = 3000;
    function xFor(nm) { return x0 + Math.min(1, nm / maxNM) * W; }
    function draw(T) {
      var peak = 2.9e6 / T; // Wien's law, nm
      var vb0 = xFor(400), vb1 = xFor(700);
      visBand.setAttribute("x", vb0); visBand.setAttribute("width", Math.max(0, vb1 - vb0));
      visLbl.setAttribute("x", (vb0 + vb1) / 2); visLbl.setAttribute("y", 20);
      visLbl.setAttribute("text-anchor", "middle");
      var pts = [], N = 120;
      var peakHeight = Math.min(1, Math.pow(T / 12000, 4) * 6 + 0.06);
      for (var i = 0; i <= N; i++) {
        var nm = 30 + (maxNM - 30) * (i / N);
        var u = nm / peak;
        // simple bump function peaking at u=1, falling off both sides (not literal Planck's law)
        var val = Math.pow(u, 3) * Math.exp(3 - 3 * u);
        var y = y0 - Math.max(0, Math.min(1, val)) * peakHeight * (y0 - 10);
        pts.push((i === 0 ? "M " : "L ") + xFor(nm).toFixed(1) + " " + y.toFixed(1));
      }
      curve.setAttribute("d", pts.join(" "));
      var px = xFor(peak);
      var uPeak = Math.pow(1, 3) * Math.exp(0);
      var py = y0 - Math.min(1, uPeak) * peakHeight * (y0 - 10);
      peakDot.setAttribute("cx", px); peakDot.setAttribute("cy", py);
      peakLine.setAttribute("x1", px); peakLine.setAttribute("x2", px);
      peakLine.setAttribute("y1", y0); peakLine.setAttribute("y2", py);
      var band = peak < 400 ? "ultraviolet" : peak <= 700 ? "visible light" : peak < 1e6 ? "infrared" : "far infrared";
      var relPower = Math.pow(T / 5800, 4);
      r.readout.innerHTML = "<b>T = " + T + " K</b> &mdash; peaks at about <b>" + Math.round(peak) +
        " nm</b> (" + band + "), by Wien's law. Radiates about <b>" + relPower.toFixed(relPower < 10 ? 1 : 0) +
        "&times;</b> the Sun's power per square meter (Stefan-Boltzmann law, T<sup>4</sup>).";
    }
    slider(r.controls, "Temperature (K)", 2500, 12000, 5800, 100, function (v) { draw(v); });
    draw(5800);
  };

  /* ---- 5.3  Continuous, absorption, and emission spectra -------------- */
  D["spectrum-types"] = function (host) {
    var r = frame(host, "Three kinds of spectra",
      "Tap a spectrum type to see how it looks and how it forms.",
      "A continuous spectrum has every color. An absorption spectrum is a continuous spectrum with a few colors missing (cool gas in front). An emission spectrum shows only the colors a hot, thin gas gives off, on a dark background.");
    var W = 320, H = 46, x0 = 8;
    var s = svg(r.stage, W + 16, H + 30);
    var bg = S("rect", { x: x0, y: 10, width: W, height: H, rx: 4 });
    var linesG = S("g", {});
    s.appendChild(bg); s.appendChild(linesG);
    var LINE_X = [30, 62, 100, 150, 190, 230, 270, 300]; // sample positions across the band
    var grad = null;
    function ensureGradient() {
      if (grad) return;
      var defs = S("defs", {});
      grad = S("linearGradient", { id: "ch5-spectrum-grad", x1: "0%", x2: "100%" });
      var stops = [380, 450, 500, 570, 590, 620, 700];
      stops.forEach(function (wl, i) {
        grad.appendChild(S("stop", { offset: (i / (stops.length - 1) * 100) + "%", "stop-color": wavelengthToColor(wl) }));
      });
      defs.appendChild(grad);
      s.insertBefore(defs, s.firstChild);
    }
    function draw(kind) {
      clr(linesG);
      if (kind === "continuous") {
        ensureGradient();
        bg.setAttribute("style", "fill:url(#ch5-spectrum-grad)");
        r.readout.innerHTML = "<b>Continuous spectrum:</b> a solid or dense gas (like a lightbulb filament) gives off every wavelength — an unbroken rainbow.";
      } else if (kind === "absorption") {
        ensureGradient();
        bg.setAttribute("style", "fill:url(#ch5-spectrum-grad)");
        LINE_X.forEach(function (x) {
          linesG.appendChild(S("line", { x1: x0 + x, x2: x0 + x, y1: 10, y2: 10 + H, style: "stroke:#111;stroke-width:2.5;opacity:0.85" }));
        });
        r.readout.innerHTML = "<b>Absorption (dark-line) spectrum:</b> a continuous spectrum viewed through a cooler, thinner gas — that gas removes its own specific wavelengths, leaving dark lines.";
      } else {
        bg.setAttribute("style", "fill:#0b0b10");
        LINE_X.forEach(function (x) {
          var wl = 400 + (x / W) * 300;
          linesG.appendChild(S("line", { x1: x0 + x, x2: x0 + x, y1: 10, y2: 10 + H, style: "stroke:" + wavelengthToColor(wl) + ";stroke-width:3" }));
        });
        r.readout.innerHTML = "<b>Emission (bright-line) spectrum:</b> a hot, thin, glowing gas on its own, with no continuous source behind it — it emits light only at its own specific wavelengths.";
      }
    }
    bigPick(r.controls, [
      { label: "Continuous", value: "continuous" }, { label: "Absorption", value: "absorption" }, { label: "Emission", value: "emission" }
    ], 0, function (v) { draw(v); });
    draw("continuous");
  };

  /* ---- 5.4  Build an atom: protons, neutrons, electrons --------------- */
  D["bohr-atom"] = function (host) {
    var r = frame(host, "Protons, neutrons, and isotopes",
      "Tap an atom to build it. The number of protons picks the element; neutrons make it a different isotope.",
      "The number of PROTONS decides the element — hydrogen always has 1, helium always has 2. Atoms of the same element with different numbers of NEUTRONS are called isotopes.");
    var s = svg(r.stage, 300, 246);
    r.stage.appendChild(E("div", {
      style: "display:inline-grid;grid-template-columns:auto auto;column-gap:8px;row-gap:3px;" +
        "justify-content:center;margin-top:4px;font-size:.9em;color:var(--text-dim);width:100%;text-align:left",
      html:
        "<b style=\"color:var(--bad);text-align:center\">+</b><span>proton</span>" +
        "<b style=\"color:var(--text-dim);text-align:center\">n</b><span>neutron</span>" +
        "<b style=\"text-align:center\">−</b><span>electron</span>"
    }));
    var Cx = 150, Cy = 110;
    var ATOMS = {
      protium: { name: "Hydrogen-1 (protium)", p: 1, n: 0, e: 1 },
      deuterium: { name: "Hydrogen-2 (deuterium)", p: 1, n: 1, e: 1 },
      tritium: { name: "Hydrogen-3 (tritium)", p: 1, n: 2, e: 1 },
      helium: { name: "Helium-4", p: 2, n: 2, e: 2 }
    };
    function labeledDot(cx, cy, r, fillStyle, label, labelStyle) {
      var g = S("g", {});
      g.appendChild(S("circle", { cx: cx, cy: cy, r: r, style: fillStyle }));
      var t = S("text", { x: cx, y: cy, "text-anchor": "middle", "dominant-baseline": "central", style: labelStyle });
      t.textContent = label;
      g.appendChild(t);
      return g;
    }
    function draw(key) {
      clr(s);
      var a = ATOMS[key];
      var orbitR = 90;
      s.appendChild(S("circle", { cx: Cx, cy: Cy, r: orbitR, "class": "dg-orbit" }));
      // nucleus: cluster protons (red, "+") and neutrons (gray, "n") close together, spaced so they just touch
      var total = a.p + a.n, i = 0;
      var nucBits = [];
      for (var pi = 0; pi < a.p; pi++) nucBits.push("p");
      for (var ni = 0; ni < a.n; ni++) nucBits.push("n");
      var NUC_R = 11, E_R = 9;
      var rr = total > 1 ? NUC_R / Math.sin(Math.PI / total) : 0;
      var nucLabelStyle = "font:800 15px system-ui,sans-serif;fill:#fff;paint-order:stroke;stroke:rgba(0,0,0,.6);stroke-width:2.5px";
      nucBits.forEach(function (kind) {
        var ang = (i / Math.max(1, total)) * 2 * Math.PI;
        var nx = Cx + rr * Math.cos(ang), ny = Cy + rr * Math.sin(ang);
        s.appendChild(labeledDot(nx, ny, NUC_R, kind === "p" ? "fill:var(--bad)" : "fill:var(--text-dim)",
          kind === "p" ? "+" : "n", nucLabelStyle));
        i++;
      });
      // electrons around the orbit, evenly spaced, each labeled "−"
      var eLabelStyle = "font:800 14px system-ui,sans-serif;fill:#fff;paint-order:stroke;stroke:rgba(0,0,0,.6);stroke-width:2.5px";
      for (var ei = 0; ei < a.e; ei++) {
        var eang = (ei / a.e) * 2 * Math.PI - Math.PI / 2;
        var ex = Cx + orbitR * Math.cos(eang), ey = Cy + orbitR * Math.sin(eang);
        s.appendChild(labeledDot(ex, ey, E_R, null, "−", eLabelStyle));
        s.lastChild.firstChild.setAttribute("class", "dg-mars");
      }
      var nameLbl = T(Cx, Cy + orbitR + 26, a.name, "dg-lbl-mid");
      nameLbl.setAttribute("style", "font:700 15px system-ui,sans-serif;fill:var(--text)");
      s.appendChild(nameLbl);
      r.readout.innerHTML = "<b>" + a.name + ":</b> " + a.p + " proton" + (a.p === 1 ? "" : "s") + " (+), " +
        a.n + " neutron" + (a.n === 1 ? "" : "s") + " (n), " + a.e + " electron" + (a.e === 1 ? "" : "s") + " (−, orbiting). " +
        "Net charge is <b>zero</b> — protons and electrons balance.";
    }
    bigPick(r.controls, [
      { label: "¹H protium", value: "protium" }, { label: "²H deuterium", value: "deuterium" },
      { label: "³H tritium", value: "tritium" }, { label: "Helium-4", value: "helium" }
    ], 0, function (v) { draw(v); });
    draw("protium");
  };

  /* ---- 5.5  Bohr energy levels: absorb / emit a photon ----------------- */
  D["energy-levels"] = function (host) {
    var r = frame(host, "Jumping between electron orbits",
      "Tap a jump, then switch Absorb / Emit. The two orbits involved light up in blue; the rest fade back so they don't distract you.",
      "Jumps to/from the innermost orbit (n=1) are the Lyman series (ultraviolet — invisible to your eyes). Jumps to/from the second orbit (n=2) are the Balmer series (visible light) — the one that first led Bohr to his model.");
    var Cx = 140, Cy = 152;
    var RMIN = 26, RMAX = 122;
    // evenly spaced rings for clarity — the book's own diagram notes real levels aren't
    // evenly spaced, but cramming n=2..5 together (as the true 1/n² spacing would) reads
    // as a blur, so this diagram trades physical precision for a legible teaching picture.
    function radiusFor(n) { return RMIN + (RMAX - RMIN) * (n - 1) / 4; }
    var s = svg(r.stage, 300, 300);

    // the nucleus, at the center — a single "+" stands in for the hydrogen nucleus
    var nucLabelStyle = "font:800 13px system-ui,sans-serif;fill:#fff;paint-order:stroke;stroke:rgba(0,0,0,.6);stroke-width:2.5px";
    s.appendChild(S("circle", { cx: Cx, cy: Cy, r: 10, style: "fill:var(--bad)" }));
    var nucTxt = S("text", { x: Cx, y: Cy, "text-anchor": "middle", "dominant-baseline": "central", style: nucLabelStyle });
    nucTxt.textContent = "+";
    s.appendChild(nucTxt);

    // orbits n=1..5, drawn as concentric circles — an actual atom, not an abstract ladder.
    // Labels fan out at increasing angles (away from the 12 o'clock jump lane) so each
    // one lands in its own clear spot instead of stacking in a single crowded column.
    // The two rings involved in the current jump are highlighted; the other three fade
    // into the background so your eye goes straight to what matters.
    var rings = [], lbls = [];
    var ACTIVE_RING_STYLE = "fill:color-mix(in srgb, var(--accent) 8%, transparent);stroke:var(--accent);stroke-width:2.5";
    var DIM_RING_STYLE = "fill:none;stroke:var(--border);stroke-width:1.25;opacity:.4";
    var ACTIVE_LBL_STYLE = "font:800 14px system-ui,sans-serif;fill:var(--text);paint-order:stroke;stroke:var(--bg);stroke-width:3px";
    var DIM_LBL_STYLE = "font:600 11px system-ui,sans-serif;fill:var(--text-faint);opacity:.55";
    for (var n = 1; n <= 5; n++) {
      var rad = radiusFor(n);
      var ring = S("circle", { cx: Cx, cy: Cy, r: rad });
      s.appendChild(ring); rings.push(ring);
      var ang = (-50 + (n - 1) * 25) * Math.PI / 180, off = rad + 18;
      var lbl = T(Cx + off * Math.cos(ang), Cy + off * Math.sin(ang), "n=" + n, null);
      lbl.setAttribute("text-anchor", "middle");
      lbl.setAttribute("dominant-baseline", "central");
      s.appendChild(lbl); lbls.push(lbl);
    }
    function styleRings(loN, hiN) {
      for (var i = 0; i < 5; i++) {
        var active = (i + 1 === loN || i + 1 === hiN);
        rings[i].setAttribute("style", active ? ACTIVE_RING_STYLE : DIM_RING_STYLE);
        lbls[i].setAttribute("style", active ? ACTIVE_LBL_STYLE : DIM_LBL_STYLE);
      }
    }

    // the jump itself happens straight up from the nucleus (12 o'clock) — a glow behind a
    // crisp line, ending in a bold filled triangle so the direction of travel is obvious,
    // plus a plain-English word ("ABSORBING" / "EMITTING") right beside it
    var jumpGlow = S("line", { x1: Cx, x2: Cx, style: "stroke-width:11;opacity:.3" });
    var jumpLine = S("line", { x1: Cx, x2: Cx, style: "stroke-width:4" });
    var jumpHead = S("path", { style: "stroke:none" });
    var jumpTagBase = "font:800 12px system-ui,sans-serif;paint-order:stroke;stroke:var(--bg);stroke-width:3px";
    var jumpTag = S("text", { x: Cx + 16, "text-anchor": "start", "dominant-baseline": "central" });
    s.appendChild(jumpGlow); s.appendChild(jumpLine); s.appendChild(jumpHead); s.appendChild(jumpTag);

    // the electron, drawn on top of everything, physically moving between orbit circles
    var eLabelStyle = "font:800 13px system-ui,sans-serif;fill:#fff;paint-order:stroke;stroke:rgba(0,0,0,.6);stroke-width:2.5px";
    var electronDot = S("circle", { r: 9, "class": "dg-mars" });
    var electronTxt = S("text", { "text-anchor": "middle", "dominant-baseline": "central", style: eLabelStyle });
    electronTxt.textContent = "−";
    s.appendChild(electronDot); s.appendChild(electronTxt);

    var JUMPS = {
      lyman21: { lo: 1, hi: 2, series: "Lyman", visible: false, desc: "ultraviolet — invisible to your eyes" },
      lyman31: { lo: 1, hi: 3, series: "Lyman", visible: false, desc: "ultraviolet — invisible to your eyes" },
      balmer32: { lo: 2, hi: 3, series: "Balmer", visible: true, nm: 656, desc: "red light (H-alpha, 656 nm)" },
      balmer42: { lo: 2, hi: 4, series: "Balmer", visible: true, nm: 486, desc: "blue-green light (H-beta, 486 nm)" }
    };
    function photonColor(j) { return j.visible ? wavelengthToColor(j.nm) : "#8b5cf6"; }

    function placeElectron(radAmt) {
      var y = Cy - radAmt;
      electronDot.setAttribute("cx", Cx); electronDot.setAttribute("cy", y);
      electronTxt.setAttribute("x", Cx); electronTxt.setAttribute("y", y);
    }

    var animId = null;
    function animateJump(fromN, toN, col, tagText) {
      if (animId) cancelAnimationFrame(animId);
      var startR = radiusFor(fromN), endR = radiusFor(toN), t0 = null, DUR = 750;
      // +1: tip leads upward (jumping outward), wings trail below it toward the nucleus.
      // -1: tip leads downward (falling inward), wings trail above it, away from the nucleus.
      var dir = endR > startR ? 1 : -1;
      jumpGlow.setAttribute("style", "stroke-width:11;stroke:" + col + ";opacity:.3");
      jumpLine.setAttribute("style", "stroke-width:4;stroke:" + col);
      jumpHead.setAttribute("style", "fill:" + col + ";stroke:none");
      jumpTag.setAttribute("style", jumpTagBase + ";fill:" + col);
      jumpTag.textContent = tagText;
      function paintAt(curR) {
        placeElectron(curR);
        var y0 = Cy - startR, y1 = Cy - curR;
        jumpGlow.setAttribute("y1", y0); jumpGlow.setAttribute("y2", y1);
        jumpLine.setAttribute("y1", y0); jumpLine.setAttribute("y2", y1);
        var wingY = y1 + dir * 15;
        jumpHead.setAttribute("d", "M " + Cx + " " + y1 + " L " + (Cx - 9) + " " + wingY + " L " + (Cx + 9) + " " + wingY + " Z");
        jumpTag.setAttribute("y", (y0 + y1) / 2);
      }
      paintAt(startR);
      function step(ts) {
        if (!document.body.contains(s)) { animId = null; return; }
        if (!t0) t0 = ts;
        var t = Math.min(1, (ts - t0) / DUR);
        var ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        paintAt(startR + (endR - startR) * ease);
        if (t < 1) animId = requestAnimationFrame(step);
        else animId = null;
      }
      animId = requestAnimationFrame(step);
    }

    function showJump(key, mode) {
      var j = JUMPS[key];
      styleRings(j.lo, j.hi);
      var emitting = mode === "emit"; // emit: hi -> lo (falls inward); absorb: lo -> hi (jumps outward)
      var fromN = emitting ? j.hi : j.lo, toN = emitting ? j.lo : j.hi;
      animateJump(fromN, toN, photonColor(j), emitting ? "EMITTING ↓" : "ABSORBING ↑");
      r.readout.innerHTML = emitting
        ? "<b>Emitting:</b> the electron drops from n=" + fromN + " to n=" + toN + ", giving off a " + j.series +
          "-series photon — " + j.desc + "."
        : "<b>Absorbing:</b> the electron jumps from n=" + fromN + " to n=" + toN + " after absorbing a " + j.series +
          "-series photon — " + j.desc + ".";
    }
    var modeRow = E("div", { "class": "dg-toggle" });
    var bAbs = E("button", { type: "button", "class": "on", text: "Absorb (jump outward)" });
    var bEmit = E("button", { type: "button", text: "Emit (fall inward)" });
    modeRow.appendChild(bAbs); modeRow.appendChild(bEmit);
    r.controls.appendChild(modeRow);
    var curKey = "balmer32", curMode = "absorb";
    bAbs.onclick = function () { curMode = "absorb"; bAbs.className = "on"; bEmit.className = ""; showJump(curKey, curMode); };
    bEmit.onclick = function () { curMode = "emit"; bEmit.className = "on"; bAbs.className = ""; showJump(curKey, curMode); };
    bigPick(r.controls, [
      { label: "Lyman: n=1↔2", value: "lyman21" }, { label: "Lyman: n=1↔3", value: "lyman31" },
      { label: "Balmer: n=2↔3", value: "balmer32" }, { label: "Balmer: n=2↔4", value: "balmer42" }
    ], 2, function (v) { curKey = v; showJump(curKey, curMode); });
    placeElectron(radiusFor(JUMPS[curKey].lo));
    showJump(curKey, curMode);
  };

  /* ---- 5.6  The Doppler effect: blueshift and redshift ----------------- */
  D["doppler-waves"] = function (host) {
    var r = frame(host, "A moving source squeezes waves one way, stretches them the other",
      "Slide to move the source toward or away from you. Watch the crests bunch up or spread out.",
      "Toward the approaching side, wavelengths shorten (blueshift). Toward the receding side, they lengthen (redshift). Sideways, there's no shift at all.");
    var W = 340, H = 170, Cx = W / 2 + 4, Cy = H / 2 + 4;
    var s = svg(r.stage, W + 16, H + 16);
    var ringsG = S("g", {});
    s.appendChild(ringsG);
    s.appendChild(T(10, Cy + 4, "← approaching (blueshift)", "dg-lbl"));
    s.appendChild(T(W - 4, Cy + 4, "receding → (redshift)", "dg-lbl"));
    function draw(vFrac) {
      clr(ringsG);
      var nRings = 5, baseR = 20;
      for (var i = 1; i <= nRings; i++) {
        var r0 = baseR * i;
        // source has moved vFrac*r0 toward the "receding" side by the time this ring reached radius r0,
        // so the ring center shifts opposite (toward the approaching side) — approximate visualization.
        var shift = -vFrac * r0 * 0.6;
        ringsG.appendChild(S("ellipse", {
          cx: Cx + shift, cy: Cy, rx: Math.max(2, r0), ry: Math.max(2, r0),
          style: "fill:none;stroke:var(--accent);stroke-width:1.5;opacity:" + (0.35 + 0.5 * (i / nRings))
        }));
      }
      ringsG.appendChild(S("circle", { cx: Cx, cy: Cy, r: 6, "class": "dg-sun" }));
      var speedKms = Math.round(vFrac * 3e5 * 0.02); // illustrative scale, not to physical scale
      var word = vFrac > 0.03 ? "receding — redshifted" : vFrac < -0.03 ? "approaching — blueshifted" : "no radial motion — no shift";
      r.readout.innerHTML = "<b>Radial velocity:</b> " + (speedKms === 0 ? "0" : (speedKms > 0 ? "+" : "") + speedKms) +
        " km/s (illustrative) &mdash; the source is <b>" + word + "</b>. An observer directly to the side (top or bottom) sees no shift at all.";
    }
    slider(r.controls, "← toward … away →", -100, 100, 0, 5, function (v) { draw(v / 100); });
    draw(0);
  };

  /* shared by the Ch 6 mirror diagrams, so one mirror always shows the same area */
  function fmtArea(m2) {
    return m2 < 10 ? m2.toFixed(2) : m2 < 100 ? m2.toFixed(1) : Math.round(m2).toLocaleString("en-US");
  }

  /* ---- 6.1  A telescope is a light bucket: area grows as diameter² ---- */
  D["light-bucket"] = function (host) {
    var r = frame(host, "A telescope is a light bucket",
      "Tap a mirror size. The small orange disk in the middle is a 1-meter mirror, drawn to the same scale.",
      "Light collected depends on the mirror's AREA, and area grows with the diameter squared. Twice as wide catches 4 times the light; 4 times as wide catches 16 times.");
    var s = svg(r.stage, 300, 230);
    var Cx = 150, Cy = 104, RMAX = 92;
    var big = S("circle", { cx: Cx, cy: Cy, r: RMAX, "class": "dg-globe" });
    var bigRim = S("circle", { cx: Cx, cy: Cy, r: RMAX, style: "fill:none;stroke:var(--accent);stroke-width:2" });
    var dia = S("line", { x1: Cx - RMAX, y1: Cy, x2: Cx + RMAX, y2: Cy, "class": "dg-dash" });
    var bigLbl = T(Cx, Cy - RMAX + 22, "", "dg-lbl-mid");
    bigLbl.setAttribute("style", "font:700 15px system-ui,sans-serif;fill:var(--text)");
    var ref = S("circle", { cx: Cx, cy: Cy, r: 10, "class": "dg-sun", style: "opacity:0.9" });
    var refLbl = T(Cx, Cy + RMAX + 18, "orange = a 1-m mirror, same scale", "dg-lbl-mid");
    [big, bigRim, dia, bigLbl, ref, refLbl].forEach(function (n) { s.appendChild(n); });
    function draw(it) {
      var d = it.d;
      var refR = Math.max(1.2, RMAX / d);
      ref.setAttribute("r", refR.toFixed(2));
      bigLbl.textContent = d + " m";
      var area = Math.PI * Math.pow(d / 2, 2);
      var times = d * d;
      r.readout.innerHTML = "<b>" + it.name + "</b> &mdash; area = &pi; &times; (" + d + " &divide; 2)&sup2; &asymp; <b>" +
        fmtArea(area) + " m&sup2;</b>. That's " + d + "&sup2; = <b>" +
        times.toLocaleString("en-US", { maximumFractionDigits: 1 }) + "&times;</b> the light of a 1-meter telescope.";
    }
    var items = [
      { label: "1 m", value: { d: 1, name: "A 1-meter telescope" } },
      { label: "Hubble 2.4 m", value: { d: 2.4, name: "Hubble Space Telescope (2.4 m)" } },
      { label: "4 m", value: { d: 4, name: "A 4-meter telescope" } },
      { label: "Palomar 5.1 m", value: { d: 5.1, name: "Hale Telescope, Palomar (5.1 m)" } },
      { label: "Keck 10 m", value: { d: 10, name: "Keck I or II (10 m)" } },
      { label: "ELT 39.3 m", value: { d: 39.3, name: "European Extremely Large Telescope (39.3 m)" } }
    ];
    bigPick(r.controls, items, 2, function (v) { draw(v); });
    draw(items[2].value);
  };

  /* ---- 6.1  Refractor vs. reflector focus arrangements --------------- */
  D["telescope-types"] = function (host) {
    var r = frame(host, "Where does the light go?",
      "Tap a telescope type. Starlight comes in from the left as parallel rays.",
      "A refractor bends light through a lens. A reflector bounces it off a curved mirror — then the light can be caught at the prime focus, sent out the side (Newtonian), or sent back through a hole in the mirror (Cassegrain).");
    var s = svg(r.stage, 360, 200);
    var g = S("g", {});
    s.appendChild(g);
    var YS = [72, 86, 114, 128], CY = 100, TX0 = 40, TX1 = 300;
    function line(pts, cls, style) {
      g.appendChild(S("polyline", { points: pts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" "),
        "class": cls || "dg-ray3", style: "fill:none;" + (style || "") }));
    }
    function tube() {
      g.appendChild(S("rect", { x: TX0, y: 58, width: TX1 - TX0, height: 84,
        style: "fill:color-mix(in srgb, var(--text-faint) 10%, transparent);stroke:none" }));
      [58, 142].forEach(function (y) { g.appendChild(S("line", { x1: TX0, y1: y, x2: TX1, y2: y, style: "stroke:var(--border);stroke-width:1.5" })); });
    }
    function mirrorX(y) { return TX1 - 0.006 * Math.pow(y - CY, 2); }
    function primary(hole) {
      var pts = [];
      for (var y = 60; y <= 140; y += 2) {
        if (hole && Math.abs(y - CY) < 7) { if (pts.length) { line(pts, "", "stroke:var(--accent);stroke-width:4"); pts = []; } continue; }
        pts.push([mirrorX(y) + 2, y]);
      }
      line(pts, "", "stroke:var(--accent);stroke-width:4");
    }
    function dot(x, y, label, dy) {
      g.appendChild(S("circle", { cx: x, cy: y, r: 4, "class": "dg-markhere" }));
      if (label) g.appendChild(T(x, y + (dy || -10), label, "dg-lbl-mid"));
    }
    function incoming(xEnd) { YS.forEach(function (y) { line([[4, y], [typeof xEnd === "function" ? xEnd(y) : xEnd, y]]); }); }
    var MODES = {
      refractor: function () {
        tube(false);
        g.appendChild(S("ellipse", { cx: 50, cy: CY, rx: 7, ry: 40, style: "fill:color-mix(in srgb, var(--accent) 30%, transparent);stroke:var(--accent);stroke-width:1.5" }));
        g.appendChild(S("ellipse", { cx: 312, cy: CY, rx: 3, ry: 12, style: "fill:color-mix(in srgb, var(--accent) 30%, transparent);stroke:var(--accent);stroke-width:1.2" }));
        incoming(50);
        var F = [280, CY];
        YS.forEach(function (y) {
          var ey = CY - (y - CY) * (312 - F[0]) / (F[0] - 50);
          line([[50, y], F, [312, ey], [350, ey]]);
        });
        dot(F[0], F[1], "focus", 26);
        g.appendChild(T(50, 50, "lens", "dg-lbl-mid"));
        g.appendChild(T(318, 80, "eyepiece", "dg-lbl-mid"));
        return "<b>Refracting telescope.</b> A lens bends the parallel starlight to a <b>focus</b>; an eyepiece then magnifies the image. " +
          "The light passes <em>through</em> the glass, so the glass must be flawless, it can sag, and each color focuses at a slightly different spot (chromatic aberration).";
      },
      prime: function () {
        tube(true); primary(false);
        incoming(mirrorX);
        var F = [110, CY];
        YS.forEach(function (y) { line([[mirrorX(y), y], F]); });
        g.appendChild(S("rect", { x: 96, y: 93, width: 14, height: 14, rx: 2, style: "fill:var(--bad)" }));
        dot(F[0], F[1], "prime focus (detector)", -14);
        g.appendChild(T(292, 52, "mirror", "dg-lbl-mid"));
        return "<b>Reflecting telescope — prime focus.</b> A concave mirror at the bottom reflects the light back up the tube to the " +
          "<b>prime focus</b>, where a detector records it. But anything sitting there blocks some of the incoming light.";
      },
      newtonian: function () {
        tube(true); primary(false);
        incoming(mirrorX);
        var F = [110, CY], E = [150, 38];
        YS.forEach(function (y) {
          var H = [mirrorX(y), y];
          // where the converging ray meets the 45° flat mirror (x + y = 250)
          var t = (250 - H[0] - H[1]) / ((F[0] - H[0]) + (F[1] - H[1]));
          var P = [H[0] + t * (F[0] - H[0]), H[1] + t * (F[1] - H[1])];
          line([H, P, E]);
        });
        g.appendChild(S("line", { x1: 141, y1: 109, x2: 159, y2: 91, style: "stroke:var(--accent);stroke-width:3.5" }));
        g.appendChild(S("rect", { x: 144, y: 36, width: 12, height: 22, rx: 2, style: "fill:var(--panel-2);stroke:var(--border)" }));
        dot(E[0], E[1], "Newtonian focus (side)", -8);
        g.appendChild(T(292, 52, "mirror", "dg-lbl-mid"));
        return "<b>Newtonian focus.</b> A small flat mirror catches the converging light and sends it <b>out the side</b> of the tube, " +
          "where an observer can reach it easily.";
      },
      cassegrain: function () {
        tube(true); primary(true);
        incoming(mirrorX);
        var F = [110, CY], SX = 150, C = [338, CY];
        YS.forEach(function (y) {
          var H = [mirrorX(y), y];
          var P = [SX, H[1] + (F[1] - H[1]) * (SX - H[0]) / (F[0] - H[0])];
          line([H, P, C]);
        });
        g.appendChild(S("path", { d: "M 152 88 Q 146 100 152 112", style: "fill:none;stroke:var(--accent);stroke-width:3.5" }));
        dot(C[0], C[1], "");
        var cl = T(356, 158, "↑ Cassegrain focus", "dg-lbl");
        cl.setAttribute("text-anchor", "end");
        g.appendChild(cl);
        g.appendChild(T(292, 52, "mirror (with hole)", "dg-lbl-mid"));
        return "<b>Cassegrain focus.</b> A small secondary mirror sends the light <b>back down through a hole</b> in the primary mirror " +
          "to an observing station below the telescope. Most large professional telescopes use this arrangement.";
      }
    };
    function draw(key) { clr(g); r.readout.innerHTML = MODES[key](); }
    bigPick(r.controls, [
      { label: "Refractor", value: "refractor" }, { label: "Prime focus", value: "prime" },
      { label: "Newtonian", value: "newtonian" }, { label: "Cassegrain", value: "cassegrain" }
    ], 0, draw);
    draw("refractor");
  };

  /* ---- 6.2  Seeing, twinkling, and adaptive optics ------------------- */
  D["adaptive-optics"] = function (host) {
    var r = frame(host, "Why stars blur — and how adaptive optics fixes it",
      "Tap a setup. The box on the right is what the camera records from ONE star.",
      "Moving cells of warm and cool air act like little lenses, so the star's image dances and smears. Adaptive optics reshapes a flexible mirror up to 500 times a second to undo it; in space there's no air at all.");
    var s = svg(r.stage, 360, 212);
    // left: star → air → telescope
    s.appendChild(S("circle", { cx: 70, cy: 16, r: 5, "class": "dg-sun" }));
    s.appendChild(T(84, 20, "star", "dg-lbl"));
    var airG = S("g", {});
    s.appendChild(airG);
    var airLbl = T(8, 58, "turbulent air", "dg-lbl");
    s.appendChild(airLbl);
    var ray = S("polyline", { "class": "dg-ray3", style: "fill:none" });
    s.appendChild(ray);
    var flex = S("path", { style: "fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round" });
    s.appendChild(flex);
    var flexLbl = T(70, 196, "", "dg-lbl-mid");
    s.appendChild(flexLbl);
    s.appendChild(S("rect", { x: 52, y: 150, width: 36, height: 26, rx: 3, style: "fill:var(--panel-2);stroke:var(--border)" }));
    s.appendChild(T(70, 167, "scope", "dg-lbl-mid"));
    // right: the image box
    var BX = 170, BY = 20, BW = 170;
    s.appendChild(S("rect", { x: BX, y: BY, width: BW, height: BW, rx: 6, style: "fill:#05070d;stroke:var(--border)" }));
    s.appendChild(T(BX + BW / 2, BY + BW + 14, "camera image", "dg-lbl-mid"));
    var halo = S("circle", { r: 20, style: "fill:#ffd66b;opacity:0.18" });
    var specG = S("g", {});
    var core = S("circle", { r: 4, style: "fill:#fff8dc" });
    [halo, specG, core].forEach(function (n) { s.appendChild(n); });
    var cells = [];
    for (var i = 0; i < 5; i++) {
      var c = S("ellipse", { rx: 22, ry: 9, style: "fill:color-mix(in srgb, var(--accent) 16%, transparent);stroke:color-mix(in srgb, var(--accent) 40%, transparent)" });
      airG.appendChild(c);
      cells.push({ el: c, x: i * 34, y: 62 + (i % 3) * 22, v: 0.35 + (i % 3) * 0.2 });
    }
    var mode = "bad", t = 0;
    var CX = BX + BW / 2, CYc = BY + BW / 2;
    function wob(a, b) { return Math.sin(t * a + b) + 0.6 * Math.sin(t * a * 2.3 + b * 1.7); }
    function tick() {
      t += 0.05;
      var ground = mode !== "space";
      airG.style.display = ground ? "" : "none";
      airLbl.style.display = ground ? "" : "none";
      cells.forEach(function (c) {
        c.x = (c.x + c.v) % 180;
        c.el.setAttribute("cx", (c.x - 20).toFixed(1));
        c.el.setAttribute("cy", c.y);
      });
      var amp = mode === "bad" ? 14 : mode === "ao" ? 1.6 : 0;
      var dx = amp * wob(1.3, 0), dy = amp * wob(1.1, 2);
      core.setAttribute("cx", (CX + dx).toFixed(1)); core.setAttribute("cy", (CYc + dy).toFixed(1));
      halo.setAttribute("cx", CX); halo.setAttribute("cy", CYc);
      halo.setAttribute("r", mode === "bad" ? 30 : mode === "ao" ? 9 : 6);
      core.setAttribute("r", mode === "bad" ? 5 : 3.5);
      clr(specG);
      if (mode === "bad") {
        for (var k = 0; k < 6; k++) {
          specG.appendChild(S("circle", {
            cx: (CX + 16 * wob(0.9 + k * 0.21, k * 3)).toFixed(1), cy: (CYc + 16 * wob(1.0 + k * 0.17, k * 5 + 1)).toFixed(1),
            r: 2.4, style: "fill:#ffe9a8;opacity:" + (0.35 + 0.3 * Math.abs(Math.sin(t * 2 + k))).toFixed(2)
          }));
        }
      }
      // the ray from star to telescope wiggles in turbulent air
      var wig = mode === "space" ? 0 : 8;
      ray.setAttribute("points", "70,22 " + (70 + wig * wob(1.7, 1)).toFixed(1) + ",70 " + (70 + wig * wob(1.4, 4)).toFixed(1) + ",110 70,150");
      // the flexible mirror bends only when adaptive optics is running
      var bend = mode === "ao" ? 5 * wob(3, 0) : 0;
      flex.setAttribute("d", "M 50 184 Q 70 " + (184 + bend).toFixed(1) + " 90 184");
      flex.style.display = mode === "ao" ? "" : "none";
    }
    var TEXT = {
      bad: "<b>Ground telescope, bad seeing.</b> The star's image dances and breaks into speckles many times a second; a long exposure smears it into a blob. " +
        "Even at the best sites, traditional ground images can't show details smaller than <b>several tenths of an arcsecond</b>.",
      ao: "<b>Adaptive optics ON.</b> A sensor measures the distortion and a flexible mirror changes shape up to <b>500 times per second</b> to cancel it. " +
        "Resolution reaches about <b>0.1 arcsecond</b> in the infrared — about what Hubble gets in visible light.",
      space: "<b>In space.</b> No air, no twinkling — the star's light is steady, and the detail you can see is limited only by the size of the telescope."
    };
    function draw(m) {
      mode = m;
      flexLbl.textContent = m === "ao" ? "flexible mirror" : "";
      r.readout.innerHTML = TEXT[m];
      tick();
    }
    bigPick(r.controls, [
      { label: "Bad seeing", value: "bad" }, { label: "Adaptive optics", value: "ao" }, { label: "In space", value: "space" }
    ], 0, draw);
    autoTicker(r.controls, tick);
    draw("bad");
  };

  /* ---- 6.3  How many photons does the detector catch? --------------- */
  D["detector-catch"] = function (host) {
    var r = frame(host, "How many photons get recorded?",
      "Tap a detector. 100 photons land on it — the lit squares are the ones it actually records.",
      "Photographic film turns only about 1% of the light into an image. A CCD records 60–70%, and the best exceed 90% — so CCDs can reveal much fainter objects.");
    var s = svg(r.stage, 300, 250);
    var g = S("g", {});
    s.appendChild(g);
    var lbl = T(150, 240, "", "dg-lbl-mid");
    lbl.setAttribute("style", "font:700 14px system-ui,sans-serif;fill:var(--text)");
    s.appendChild(lbl);
    var cur = null;
    function draw(it) {
      cur = it;
      clr(g);
      var hits = [];
      for (var i = 0; i < 100; i++) hits.push(i < it.pct);
      for (var j = hits.length - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)); var tmp = hits[j]; hits[j] = hits[k]; hits[k] = tmp; }
      hits.forEach(function (on, i) {
        var x = 30 + (i % 10) * 24, y = 8 + Math.floor(i / 10) * 22;
        g.appendChild(S("rect", { x: x, y: y, width: 20, height: 18, rx: 3,
          style: on ? "fill:var(--warn);stroke:var(--warn)" : "fill:none;stroke:var(--border);stroke-width:1" }));
      });
      lbl.textContent = it.pct + " of 100 photons recorded";
      r.readout.innerHTML = it.text;
    }
    var items = [
      { label: "Photo plate (~1%)", value: { pct: 1, text: "<b>Photographic plate:</b> only about <b>1%</b> of the light that falls on it helps make the image — the rest is wasted. Still, it was the main detector for most of the twentieth century." } },
      { label: "CCD (60–70%)", value: { pct: 65, text: "<b>Typical CCD:</b> records about <b>60–70%</b> of the photons. Each square is a <b>pixel</b>, where freed electrons are stored and counted at the end of the exposure." } },
      { label: "Best CCD (90%+)", value: { pct: 92, text: "<b>Best silicon and infrared CCDs:</b> over <b>90%</b> of photons recorded — enough to find small moons of the outer planets, icy dwarf planets beyond Pluto, and dwarf galaxies." } }
    ];
    bigPick(r.controls, items, 0, draw);
    var again = E("button", { "class": "dg-play", type: "button", text: "↻ New 100 photons" });
    again.addEventListener("click", function () { if (cur) draw(cur); });
    r.controls.appendChild(again);
    draw(items[0].value);
  };

  /* ---- 6.4  Interferometers: separation sets the resolution ---------- */
  var dgBlurId = 0;
  D["interferometer"] = function (host) {
    var r = frame(host, "Linking dishes into one giant eye",
      "Tap a radio telescope. The dashed arc is the one giant dish the linked dishes act like.",
      "An interferometer's sharpness depends on how FAR APART its dishes are, not how big each one is. (Resolution also depends on wavelength — ALMA works at much shorter, millimeter wavelengths than the VLA.) Drawings not to scale.");
    var fid = "ch6-blur-" + (++dgBlurId);
    var s = svg(r.stage, 360, 210);
    var defs = S("defs", {});
    var filt = S("filter", { id: fid, x: "-50%", y: "-50%", width: "200%", height: "200%" });
    var blur = S("feGaussianBlur", { stdDeviation: 0 });
    filt.appendChild(blur); defs.appendChild(filt); s.appendChild(defs);
    var g = S("g", {});
    s.appendChild(g);
    // inset: what two close radio sources look like at this resolution
    var IX = 262, IY = 120;
    s.appendChild(S("rect", { x: IX - 44, y: IY - 38, width: 88, height: 76, rx: 6, style: "fill:#05070d;stroke:var(--border)" }));
    var srcG = S("g", { filter: "url(#" + fid + ")" });
    srcG.appendChild(S("circle", { cx: IX - 10, cy: IY, r: 6, style: "fill:#ffb347" }));
    srcG.appendChild(S("circle", { cx: IX + 10, cy: IY, r: 6, style: "fill:#ff6b6b" }));
    s.appendChild(srcG);
    s.appendChild(T(IX, IY + 52, "two close sources", "dg-lbl-mid"));
    function dish(x, y, sz, ang) {
      var a = (ang || 0) * 180 / Math.PI;
      var d = S("g", { transform: "translate(" + x.toFixed(1) + "," + y.toFixed(1) + ") rotate(" + a.toFixed(1) + ")" });
      d.appendChild(S("path", { d: "M " + (-sz) + " " + (-sz * 0.5) + " Q 0 " + (sz * 0.7) + " " + sz + " " + (-sz * 0.5),
        style: "fill:color-mix(in srgb, var(--accent) 25%, transparent);stroke:var(--accent);stroke-width:1.5" }));
      d.appendChild(S("line", { x1: 0, y1: sz * 0.1, x2: 0, y2: sz * 0.9, style: "stroke:var(--text-faint);stroke-width:1.5" }));
      g.appendChild(d);
    }
    function flatScene(n, span, sz) {
      g.appendChild(S("line", { x1: 8, y1: 150, x2: 200, y2: 150, "class": "dg-ground" }));
      var x0 = 104 - span / 2;
      for (var i = 0; i < n; i++) dish(n === 1 ? 104 : x0 + span * i / (n - 1), 140, sz);
      if (n > 1) {
        g.appendChild(S("path", { d: "M " + x0 + " 120 Q 104 " + (190 - span * 0.1) + " " + (x0 + span) + " 120", "class": "dg-dash", style: "fill:none" }));
        g.appendChild(S("line", { x1: x0, y1: 168, x2: x0 + span, y2: 168, "class": "dg-ray" }));
      }
    }
    var SCENES = {
      single: { blur: 7, draw: function () { flatScene(1, 0, 22); g.appendChild(T(104, 176, "one 100-m dish", "dg-lbl-mid")); },
        text: "<b>A single dish</b> (like the 100-m Green Bank Telescope). Radio waves are so long that even the biggest single dish sees <b>less detail than a small visible-light telescope</b> in a college lab. The two sources blur into one." },
      alma: { blur: 1.4, draw: function () { flatScene(9, 150, 7); g.appendChild(T(104, 184, "baselines up to 16 km", "dg-lbl-mid")); },
        text: "<b>ALMA</b> (Chile, 16,400 ft): twelve 7-m and fifty-four 12-m dishes, baselines up to <b>16 km</b>. Working at millimeter wavelengths, it reaches resolutions down to <b>0.006 arcsecond</b>." },
      vla: { blur: 3, draw: function () { flatScene(7, 180, 9); g.appendChild(T(104, 184, "spread over ~36 km", "dg-lbl-mid")); },
        text: "<b>Jansky Very Large Array (VLA)</b>, New Mexico: <b>27</b> movable 25-m dishes on railroad tracks, spread over about <b>36 km</b>. Resolution about <b>1 arcsecond</b> — as sharp as a visible-light telescope." },
      vlba: { blur: 0.2, draw: function () {
          var ECx = 104, ECy = 230, ER = 120;
          g.appendChild(S("circle", { cx: ECx, cy: ECy, r: ER, "class": "dg-globe" }));
          var a0 = -Math.PI / 2 - 0.55, a1 = -Math.PI / 2 + 0.55;
          for (var i = 0; i < 10; i++) {
            var a = a0 + (a1 - a0) * i / 9;
            dish(ECx + (ER + 6) * Math.cos(a), ECy + (ER + 6) * Math.sin(a), 6, a + Math.PI / 2);
          }
          var p0 = [ECx + ER * Math.cos(a0), ECy + ER * Math.sin(a0)], p1 = [ECx + ER * Math.cos(a1), ECy + ER * Math.sin(a1)];
          g.appendChild(S("line", { x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], "class": "dg-ray" }));
          g.appendChild(T(104, 98, "Hawaii ← 10 dishes → Virgin Islands", "dg-lbl-mid"));
        },
        text: "<b>Very Long Baseline Array (VLBA)</b>: <b>10</b> dishes from the Virgin Islands to Hawaii, not wired together — the waves' arrival is timed precisely and combined later. Resolution <b>0.0001 arcsecond</b>: features as small as 10 AU at the center of our Galaxy." }
    };
    function draw(key) {
      clr(g);
      var sc = SCENES[key];
      sc.draw();
      blur.setAttribute("stdDeviation", sc.blur);
      r.readout.innerHTML = sc.text;
    }
    bigPick(r.controls, [
      { label: "Single dish", value: "single" }, { label: "VLA", value: "vla" },
      { label: "ALMA", value: "alma" }, { label: "VLBA", value: "vlba" }
    ], 0, draw);
    draw("single");
  };

  /* ---- 6.5  Which light reaches the ground? Where do we observe it? --- */
  D["atmosphere-windows"] = function (host) {
    var r = frame(host, "Which light gets through the air?",
      "Tap a band of light. The arrow shows how far down it gets; the lit-up icons are where astronomers observe it from.",
      "Gamma rays, X-rays, and ultraviolet are stopped high up, so they need telescopes in space. Infrared is soaked up by water vapor low down — go high and dry, fly, or launch. Visible light and radio reach the ground. (Heights not to scale.)");
    var s = svg(r.stage, 360, 230);
    var GY = 200;
    // sky layers
    s.appendChild(S("rect", { x: 0, y: 0, width: 360, height: 60, style: "fill:#05070d" }));
    s.appendChild(S("rect", { x: 0, y: 60, width: 360, height: GY - 60, style: "fill:color-mix(in srgb, var(--accent) 12%, transparent)" }));
    s.appendChild(S("rect", { x: 0, y: 150, width: 360, height: GY - 150, style: "fill:color-mix(in srgb, var(--accent) 12%, transparent)" }));
    s.appendChild(S("line", { x1: 0, y1: GY, x2: 360, y2: GY, "class": "dg-ground" }));
    var sp = T(6, 14, "space", "dg-lbl"); sp.setAttribute("style", "fill:#cfd8ff"); s.appendChild(sp);
    s.appendChild(T(6, 72, "atmosphere", "dg-lbl"));
    s.appendChild(T(6, 162, "water vapor (low)", "dg-lbl"));
    s.appendChild(T(6, GY + 14, "ground", "dg-lbl"));
    // icons
    var icons = {};
    function icon(key, nodes, x, y, label) {
      var gg = S("g", { transform: "translate(" + x + "," + y + ")" });
      nodes.forEach(function (n) { gg.appendChild(n); });
      var t = T(0, 26, label, "dg-lbl-mid");
      gg.appendChild(t);
      s.appendChild(gg);
      icons[key] = gg;
    }
    icon("space", [
      S("rect", { x: -6, y: -8, width: 12, height: 16, rx: 2, style: "fill:var(--text-dim)" }),
      S("rect", { x: -22, y: -4, width: 14, height: 8, style: "fill:var(--accent)" }),
      S("rect", { x: 8, y: -4, width: 14, height: 8, style: "fill:var(--accent)" })
    ], 300, 26, "space telescope");
    icon("plane", [
      S("path", { d: "M -22 0 L 18 -3 Q 24 0 18 3 Z", style: "fill:var(--text-dim)" }),
      S("path", { d: "M -4 -1 L -12 -12 L -6 -12 L 6 -1 Z M -4 1 L -12 12 L -6 12 L 6 1 Z", style: "fill:var(--text-dim)" })
    ], 300, 110, "airplane (SOFIA)");
    s.appendChild(S("path", { d: "M 150 " + GY + " L 196 128 L 242 " + GY + " Z", style: "fill:color-mix(in srgb, var(--text-faint) 35%, transparent);stroke:var(--border)" }));
    icon("peak", [S("rect", { x: -7, y: -7, width: 14, height: 9, rx: 3, style: "fill:var(--text-dim)" })], 196, 122, "high dry peak");
    icon("ground", [
      S("path", { d: "M -12 -8 Q 0 8 12 -8", style: "fill:none;stroke:var(--text-dim);stroke-width:3" }),
      S("line", { x1: 0, y1: 0, x2: 0, y2: 8, style: "stroke:var(--text-dim);stroke-width:2" })
    ], 92, GY - 10, "ground telescope");
    var arrow = S("line", { style: "stroke-width:5;stroke-linecap:round" });
    var head = S("path", {});
    var stopX = S("text", { "text-anchor": "middle", style: "font:800 16px system-ui,sans-serif" });
    [arrow, head, stopX].forEach(function (n) { s.appendChild(n); });
    var BANDS = {
      gamma: { stop: 64, col: "#b388ff", where: ["space"], text: "<b>Gamma rays</b> are absorbed high in the atmosphere. Observed from space by <b>Fermi</b> (2008) and INTEGRAL — or <em>indirectly</em> from the ground by arrays like VERITAS and H.E.S.S., which catch the cascade of light a gamma ray sets off in the air." },
      xray: { stop: 72, col: "#8ab4ff", where: ["space"], text: "<b>X-rays</b> never reach the ground. Observed from space by <b>Chandra</b> (1999) and XMM-Newton." },
      uv: { stop: 88, col: "#c792ea", where: ["space"], text: "<b>Ultraviolet</b> is mostly blocked by the atmosphere, so it's observed from space — for example by the <b>Hubble Space Telescope</b>. The very first such observations, in 1946, used instruments on captured V2 rockets to detect the Sun's ultraviolet light." },
      visible: { stop: GY, col: "#ffd66b", where: ["ground", "peak", "space"], text: "<b>Visible light</b> reaches the ground, so big ground telescopes like Keck and the VLT observe it — best from high, dark, dry sites. Hubble, Gaia, and TESS observe it from space, free of twinkling." },
      ir: { stop: 158, col: "#ff8a65", where: ["peak", "plane", "space"], text: "<b>Infrared</b> is soaked up mostly by <b>water vapor</b> low in the atmosphere. So astronomers observe from high, dry peaks, from airplanes (SOFIA flew above 99% of the water vapor), or from space — IRAS, Spitzer, WISE, and the <b>James Webb Space Telescope</b>." },
      radio: { stop: GY, col: "#80cbc4", where: ["ground"], text: "<b>Radio waves</b> reach the ground, so radio telescopes like the VLA, ALMA, Green Bank, and FAST work on Earth — even in daylight." }
    };
    function draw(key) {
      var b = BANDS[key];
      var x = 128, y1 = 4, y2 = b.stop;
      var reached = y2 >= GY;
      arrow.setAttribute("x1", x); arrow.setAttribute("x2", x);
      arrow.setAttribute("y1", y1); arrow.setAttribute("y2", reached ? GY - 8 : y2);
      arrow.setAttribute("style", "stroke-width:5;stroke-linecap:round;stroke:" + b.col);
      if (reached) {
        head.setAttribute("d", "M " + (x - 8) + " " + (GY - 12) + " L " + (x + 8) + " " + (GY - 12) + " L " + x + " " + (GY - 1) + " Z");
        head.setAttribute("style", "fill:" + b.col);
        stopX.textContent = "";
      } else {
        head.setAttribute("d", "");
        stopX.setAttribute("x", x); stopX.setAttribute("y", y2 + 16);
        stopX.setAttribute("style", "font:800 16px system-ui,sans-serif;fill:" + b.col);
        stopX.textContent = "✕";
      }
      Object.keys(icons).forEach(function (k) {
        icons[k].setAttribute("opacity", b.where.indexOf(k) > -1 ? "1" : "0.22");
      });
      r.readout.innerHTML = b.text;
    }
    bigPick(r.controls, [
      { label: "Gamma", value: "gamma" }, { label: "X-ray", value: "xray" }, { label: "Ultraviolet", value: "uv" },
      { label: "Visible", value: "visible" }, { label: "Infrared", value: "ir" }, { label: "Radio", value: "radio" }
    ], 0, draw);
    draw("gamma");
  };

  /* ---- 6.6  Segmented mirrors, drawn to one scale -------------------- */
  D["mirror-segments"] = function (host) {
    var r = frame(host, "Building a giant mirror from pieces",
      "Tap a telescope. Every mirror is drawn to the SAME scale; the faint circle is the 39.3-m ELT for comparison.",
      "No one can build or move a single mirror 30 m or more across, so giant telescopes combine many smaller mirrors, held precisely in line so they act as one.");
    var s = svg(r.stage, 300, 250);
    var Cx = 150, Cy = 122, PXM = 112 / 19.65; // pixels per meter: the ELT's 39.3 m fills the frame
    s.appendChild(S("circle", { cx: Cx, cy: Cy, r: 19.65 * PXM, "class": "dg-dash", style: "fill:none" }));
    var g = S("g", {});
    s.appendChild(g);
    function hexCells(n) {
      // axial coords within enough rings, nearest-first, skipping the center (a hole, as on Keck and Webb)
      var cells = [];
      for (var q = -20; q <= 20; q++) for (var rr = -20; rr <= 20; rr++) {
        var x = Math.sqrt(3) * (q + rr / 2), y = 1.5 * rr;
        if (q === 0 && rr === 0) continue;
        cells.push({ x: x, y: y, d: x * x + y * y });
      }
      cells.sort(function (a, b) { return a.d - b.d || Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x); });
      return cells.slice(0, n);
    }
    function hexPath(cx, cy, a) {
      var p = [];
      for (var i = 0; i < 6; i++) { var t = Math.PI / 180 * (60 * i - 30); p.push((cx + a * Math.cos(t)).toFixed(2) + "," + (cy + a * Math.sin(t)).toFixed(2)); }
      return "M " + p.join(" L ") + " Z";
    }
    var SCOPES = {
      webb: { n: 18, a: 0.73, d: 6.5, name: "James Webb Space Telescope", text: "<b>James Webb Space Telescope:</b> a <b>6.5-m</b> mirror of <b>18</b> gold-coated segments — shielded from the Sun by a sunshield the size of a tennis court." },
      keck: { n: 36, a: 0.9, d: 10, name: "Keck", text: "<b>Keck I and II:</b> <b>10-m</b> mirrors, each made of <b>36</b> hexagonal segments 1.8 m wide, kept in shape by computer-controlled motors. The first of the new-technology giants (1993–96)." },
      gmt: { circles: true, d: 24.5, name: "Giant Magellan Telescope", text: "<b>Giant Magellan Telescope:</b> about <b>24.5 m</b> across, made of <b>seven</b> stiff <b>8.4-m</b> mirrors. Being built near Las Campanas Observatory in Chile." },
      tmt: { n: 492, a: 0.72, d: 30, name: "Thirty-Meter Telescope", text: "<b>Thirty-Meter Telescope:</b> <b>30 m</b> across, made of <b>492</b> hexagons about 1.44 m across corners, with gaps between them of only 2.5 mm. Preferred site: Maunakea." },
      elt: { n: 798, a: 0.7, d: 39.3, name: "European ELT", text: "<b>European Extremely Large Telescope:</b> <b>39.3 m</b> across — the most ambitious — made of <b>798</b> hexagons, each 1.4 m across, in Chile's Atacama Desert." }
    };
    function draw(key) {
      clr(g);
      var sc = SCOPES[key];
      var segStyle = "fill:color-mix(in srgb, var(--warn) 55%, transparent);stroke:var(--panel);stroke-width:" + (sc.n > 100 ? 0.4 : 0.8);
      if (sc.circles) {
        var R = 4.2 * PXM, dist = 8.5 * PXM;
        g.appendChild(S("circle", { cx: Cx, cy: Cy, r: R, style: segStyle }));
        for (var i = 0; i < 6; i++) {
          var t = i * Math.PI / 3;
          g.appendChild(S("circle", { cx: Cx + dist * Math.cos(t), cy: Cy + dist * Math.sin(t), r: R, style: segStyle }));
        }
      } else {
        var a = sc.a * PXM, spacing = sc.a; // cell layout in units of the hex circumradius
        var path = "";
        hexCells(sc.n).forEach(function (c) { path += hexPath(Cx + c.x * spacing * PXM, Cy + c.y * spacing * PXM, a * 0.96) + " "; });
        g.appendChild(S("path", { d: path, style: segStyle }));
      }
      var area = Math.PI * Math.pow(sc.d / 2, 2);
      r.readout.innerHTML = sc.text + " Collecting area roughly &pi; &times; (" + sc.d + " &divide; 2)&sup2; &asymp; <b>" +
        fmtArea(area) + " m&sup2;</b>.";
    }
    bigPick(r.controls, [
      { label: "Webb 6.5 m", value: "webb" }, { label: "Keck 10 m", value: "keck" }, { label: "GMT 24.5 m", value: "gmt" },
      { label: "TMT 30 m", value: "tmt" }, { label: "ELT 39.3 m", value: "elt" }
    ], 1, draw);
    draw("keck");
  };

  /* small seeded random generator, so a diagram's scatter looks the same every visit */
  function seeded(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* rAF loop that quietly ends once its diagram is gone from the page */
  function runWhileShown(node, tick) {
    function loop() {
      if (!document.body.contains(node)) return;
      tick();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ---- 7.1  The eight planets, from the book's Table 7.2 ------------- */
  D["planet-facts"] = function (host) {
    var r = frame(host, "Meet the eight planets",
      "Tap a planet. Its size is drawn to scale against Jupiter, and the bars compare every planet's density with water.",
      "Numbers from the book's Table 7.2. Density is in g/cm³, where water = 1. The four inner planets are dense rock and metal; the four giants are light.");
    var P = [
      { n: "Mercury", au: "0.39", yr: "0.24", km: 4878, kmT: "4,878", m: "3.3", d: 5.4, col: "#a9a29a", note: "Closest to the Sun, with the greatest share of metal of any terrestrial world. Its sunlit side reaches 280–430 °C. No moons." },
      { n: "Venus", au: "0.72", yr: "0.62", km: 12120, kmT: "12,120", m: "48.7", d: 5.2, col: "#e8c47a", note: "Rotates backward, very slowly. Its thick carbon dioxide atmosphere keeps the surface at about 700 K — hotter than Mercury. No moons." },
      { n: "Earth", au: "1.00", yr: "1.00", km: 12756, kmT: "12,756", m: "59.8", d: 5.5, col: "#5b9bd5", note: "The densest planet, and the only one where surface temperatures generally lie between water's freezing and boiling points." },
      { n: "Mars", au: "1.52", yr: "1.88", km: 6787, kmT: "6,787", m: "6.4", d: 3.9, col: "#d0703c", note: "Air as thin as Earth's at 30 km up, and no rain for billions of years. Its small moons are very likely captured asteroids." },
      { n: "Jupiter", au: "5.20", yr: "11.86", km: 142984, kmT: "142,984", m: "18,991", d: 1.3, col: "#d9b48f", note: "More massive than all the other planets combined — about 1,300 Earths could fit inside. 75% hydrogen, 25% helium." },
      { n: "Saturn", au: "9.54", yr: "29.46", km: 120536, kmT: "120,536", m: "5686", d: 0.7, col: "#e6d29a", note: "Its bright rings are by far the easiest of the four ring systems to see." },
      { n: "Uranus", au: "19.18", yr: "84.07", km: 51118, kmT: "51,118", m: "866", d: 1.3, col: "#9fd8df", note: "Discovered after the telescope was invented. It spins about an axis tipped nearly on its side." },
      { n: "Neptune", au: "30.06", yr: "164.82", km: 49660, kmT: "49,660", m: "1030", d: 1.6, col: "#5a7fe0", note: "The farthest planet, about 30 AU out. Its largest moon is Triton." }
    ];
    var s = svg(r.stage, 360, 200);
    // left: size to scale
    var Cx = 82, Cy = 92, RJ = 70;
    s.appendChild(S("circle", { cx: Cx, cy: Cy, r: RJ, "class": "dg-dash", style: "fill:none" }));
    s.appendChild(T(Cx, Cy + RJ + 14, "dashed = Jupiter's size", "dg-lbl-mid"));
    var ball = S("circle", { cx: Cx, cy: Cy });
    var earthRef = S("circle", { cx: Cx, cy: Cy, r: RJ * 12756 / 142984, style: "fill:none;stroke:var(--text-dim);stroke-width:1" });
    var nameT = T(Cx, 14, "", "dg-lbl-mid");
    nameT.setAttribute("style", "font-weight:700;fill:var(--text)");
    [ball, earthRef, nameT].forEach(function (n) { s.appendChild(n); });
    // right: density bars
    var X0 = 182, BW = 16, BASE = 170, PX = 24; // 24 px per g/cm³
    s.appendChild(T(X0 - 4, 14, "density (g/cm³)", "dg-lbl"));
    var bars = [];
    P.forEach(function (p, i) {
      var x = X0 + i * (BW + 2);
      var b = S("rect", { x: x, y: BASE - p.d * PX, width: BW, height: p.d * PX, rx: 2 });
      s.appendChild(b);
      var t = T(x + BW / 2, BASE + 12, p.n.slice(0, 2), "dg-lbl-mid");
      s.appendChild(t);
      bars.push(b);
    });
    s.appendChild(S("line", { x1: X0 - 4, y1: BASE - PX, x2: X0 + 8 * (BW + 2), y2: BASE - PX, style: "stroke:#5b9bd5;stroke-width:1.5;stroke-dasharray:4 3" }));
    s.appendChild(T(X0 + 8 * (BW + 2) + 3, BASE - PX - 2, "water", "dg-lbl"));
    s.appendChild(T(X0 + 8 * (BW + 2) + 3, BASE - PX + 10, "= 1", "dg-lbl"));
    s.appendChild(S("line", { x1: X0 - 4, y1: BASE, x2: X0 + 8 * (BW + 2), y2: BASE, "class": "dg-ground" }));
    function draw(i) {
      var p = P[i];
      ball.setAttribute("r", Math.max(2.5, RJ * p.km / 142984));
      ball.setAttribute("style", "fill:" + p.col);
      earthRef.setAttribute("opacity", i >= 4 ? "1" : "0");
      nameT.textContent = p.n + (i >= 4 ? "  (ring = Earth)" : "");
      bars.forEach(function (b, j) {
        b.setAttribute("style", "fill:" + (j === i ? p.col : "color-mix(in srgb, var(--text-faint) 40%, transparent)"));
      });
      r.readout.innerHTML = "<b>" + p.n + "</b>: " + p.au + " AU from the Sun · one orbit = " + p.yr + " years · " +
        p.kmT + " km across · mass " + p.m + " × 10²³ kg · density <b>" + p.d + "</b> g/cm³" +
        (p.d < 1 ? " (<b>less than water</b>)" : "") + ".<br>" + p.note;
    }
    bigPick(r.controls, P.map(function (p, i) { return { label: p.n, value: i }; }), 2, draw);
    draw(2);
  };

  /* ---- 7.1  Meteor or meteorite? ------------------------------------- */
  D["meteor-path"] = function (host) {
    var r = frame(host, "Meteor or meteorite?",
      "Pick what falls in from space, then watch it hit our atmosphere.",
      "A grain of cosmic dust burns up in a brief flash — a meteor, or “shooting star.” A larger chunk of rock or metal can survive the trip; any piece that strikes the ground is a meteorite.");
    var s = svg(r.stage, 360, 200);
    var GY = 180;
    s.appendChild(S("rect", { x: 0, y: 0, width: 360, height: 70, style: "fill:#05070d" }));
    s.appendChild(S("rect", { x: 0, y: 70, width: 360, height: GY - 70, style: "fill:color-mix(in srgb, var(--accent) 14%, transparent)" }));
    s.appendChild(S("line", { x1: 0, y1: GY, x2: 360, y2: GY, "class": "dg-ground" }));
    var sp = T(6, 14, "space", "dg-lbl"); sp.setAttribute("style", "fill:#cfd8ff"); s.appendChild(sp);
    s.appendChild(T(6, 84, "Earth's atmosphere", "dg-lbl"));
    s.appendChild(T(6, GY + 14, "ground", "dg-lbl"));
    var trail = S("path", { style: "fill:none;stroke-linecap:round" });
    var rock = S("circle", {});
    var crater = S("ellipse", { rx: 0, ry: 0, style: "fill:color-mix(in srgb, var(--text-faint) 50%, transparent)" });
    var tag = T(0, 0, "", "dg-lbl-mid");
    tag.setAttribute("style", "font-weight:700;font-size:12px;fill:var(--warn)");
    [trail, crater, rock, tag].forEach(function (n) { s.appendChild(n); });
    var KINDS = {
      dust: { size: 2.2, burnAt: 128, text: "A tiny grain of <b>cosmic dust</b> plunges into the atmosphere and <b>burns up</b>, making a brief streak of light — a <b>meteor</b>. Millions do this every day." },
      chunk: { size: 7, burnAt: null, text: "A <b>larger chunk</b> of rock or metal glows as it falls but <b>survives</b> the trip. The piece that strikes the ground is a <b>meteorite</b> — you can see them in many natural history museums." }
    };
    var kind = "dust", t = 0;
    function pos(u) { return [300 - 230 * u, 6 + (GY - 6) * u]; }
    function tick() {
      var k = KINDS[kind];
      t += 0.006;
      if (t > 1.35) t = 0;
      var u = Math.min(t, 1);
      var p = pos(u), y = p[1];
      var inAir = y > 70;
      var burnedOut = k.burnAt && y > k.burnAt;
      // trail: from where it entered the air to now
      if (inAir) {
        var u0 = 64 / (GY - 6), pe = pos(u0);
        var endU = burnedOut ? (k.burnAt - 6) / (GY - 6) : u;
        var pn = pos(endU);
        var fade = burnedOut ? Math.max(0, 1 - (t - endU) * 6) : 1;
        trail.setAttribute("d", "M " + pe[0] + " " + pe[1] + " L " + pn[0] + " " + pn[1]);
        trail.setAttribute("style", "fill:none;stroke-linecap:round;stroke:#ffd66b;stroke-width:" + (kind === "dust" ? 2.5 : 4) + ";opacity:" + (0.85 * fade));
      } else trail.setAttribute("d", "");
      var size = k.size;
      if (kind === "chunk" && inAir) size = k.size - 2.5 * (y - 70) / (GY - 70); // it wears down but survives
      rock.setAttribute("cx", p[0]); rock.setAttribute("cy", Math.min(y, GY - size));
      rock.setAttribute("r", burnedOut ? 0 : size);
      rock.setAttribute("style", "fill:" + (inAir ? "#ffb347" : "var(--text-dim)"));
      var landed = kind === "chunk" && t >= 1;
      crater.setAttribute("cx", pos(1)[0]); crater.setAttribute("cy", GY);
      crater.setAttribute("rx", landed ? 12 : 0); crater.setAttribute("ry", landed ? 3 : 0);
      if (burnedOut) { tag.textContent = "✨ meteor (burned up)"; tag.setAttribute("x", pos((k.burnAt - 6) / (GY - 6))[0] + 40); tag.setAttribute("y", k.burnAt + 18); }
      else if (landed) { tag.textContent = "🪨 meteorite!"; tag.setAttribute("x", pos(1)[0] + 30); tag.setAttribute("y", GY - 14); }
      else if (inAir) { tag.textContent = "glowing…"; tag.setAttribute("x", p[0] + 36); tag.setAttribute("y", y); }
      else tag.textContent = "";
    }
    bigPick(r.controls, [{ label: "Tiny dust grain", value: "dust" }, { label: "Larger chunk", value: "chunk" }], 0, function (v) {
      kind = v; t = 0; r.readout.innerHTML = KINDS[v].text;
    });
    r.readout.innerHTML = KINDS.dust.text;
    autoTicker(r.controls, tick);
  };

  /* ---- 7.1  The solar system shrunk by 1 billion --------------------- */
  D["scale-model"] = function (host) {
    var r = frame(host, "The solar system, 1 billion times smaller",
      "Tap an object. In this model 1 AU = 150 m = one city block, so the street below is marked in blocks.",
      "Every size and distance divided by 10⁹. Sizes with a food are the book's own; the others are worked out from Table 7.2 with the same ÷ 10⁹.");
    var s = svg(r.stage, 360, 112);
    var X0 = 16, X1 = 344, MAXB = 32, SY = 64;
    function bx(b) { return X0 + (X1 - X0) * b / MAXB; }
    s.appendChild(S("rect", { x: X0 - 6, y: SY - 7, width: X1 - X0 + 12, height: 14, rx: 3, style: "fill:color-mix(in srgb, var(--text-faint) 22%, transparent)" }));
    for (var b = 0; b <= MAXB; b++) {
      s.appendChild(S("line", { x1: bx(b), y1: SY - 7, x2: bx(b), y2: SY + 7, style: "stroke:var(--panel);stroke-width:" + (b % 5 === 0 ? 1.6 : 0.8) }));
      if (b % 5 === 0) s.appendChild(T(bx(b), SY + 20, String(b), "dg-lbl-mid"));
    }
    s.appendChild(T(X1, SY + 34, "city blocks from the Sun →", "dg-lbl")).setAttribute("text-anchor", "end");
    var O = [
      { n: "Sun", b: 0, col: "#ffcf6b", text: "The <b>Sun</b> is nearly <b>1.5 m</b> across — about the height of an adult — at the start of the street." },
      { n: "Mercury", b: 0.39, col: "#a9a29a", text: "<b>Mercury</b>: 0.39 AU, so about <b>0.4 block</b> (59 m) from the Sun. About 0.5 cm across (4,878 km ÷ 10⁹)." },
      { n: "Venus", b: 0.72, col: "#e8c47a", text: "<b>Venus</b>: 0.72 AU, about <b>0.7 block</b> (108 m) out. About 1.2 cm across — nearly Earth's size." },
      { n: "Earth", b: 1, col: "#5b9bd5", text: "<b>Earth</b> is a <b>grape</b> 1.3 cm across, <b>one block (150 m)</b> from the Sun. The <b>Moon</b> is a <b>pea</b> 40 cm away — the Earth-Moon system fits in a backpack. A human here is the size of a single <b>atom</b>." },
      { n: "Mars", b: 1.52, col: "#d0703c", text: "<b>Mars</b>: 1.52 AU, about <b>1.5 blocks</b> (228 m) out. About 0.7 cm across." },
      { n: "Jupiter", b: 5.2, col: "#d9b48f", text: "<b>Jupiter</b> is a very large <b>grapefruit</b>, 15 cm across, <b>five blocks</b> from the Sun." },
      { n: "Saturn", b: 9.54, col: "#e6d29a", text: "<b>Saturn</b> is <b>10 blocks</b> from the Sun, and about 12 cm across." },
      { n: "Uranus", b: 19.18, col: "#9fd8df", text: "<b>Uranus</b> is <b>20 blocks</b> out, and about 5 cm across." },
      { n: "Neptune", b: 30.06, col: "#5a7fe0", text: "<b>Neptune</b> is <b>30 blocks</b> out — about 5 cm across. Sending Voyager here is like steering a single molecule from the Earth-grape to a lemon <b>5 km</b> away, as accurately as the width of a spider-web thread." },
      { n: "Pluto", b: 31, col: "#cbb8a6", text: "<b>Pluto</b>'s distance varies a lot during its 249-year orbit; it is now <b>just beyond 30 blocks</b> and getting farther." },
      { n: "Nearest stars", b: null, col: "#fff", text: "The <b>nearest stars</b> would be <b>tens of thousands of kilometers</b> away — far off this street. Build the model in your city and the stars land on the <b>other side of Earth or beyond</b>." }
    ];
    var marks = [];
    O.forEach(function (o, i) {
      if (o.b === null) return;
      var c = S("circle", { cx: bx(o.b), cy: SY, r: o.n === "Sun" ? 7 : 3.2, style: "fill:" + o.col });
      s.appendChild(c);
      marks[i] = c;
    });
    var arrow = S("path", { d: "M " + (X1 - 30) + " 40 L " + (X1 + 8) + " 40 M " + (X1 + 2) + " 34 L " + (X1 + 8) + " 40 L " + (X1 + 2) + " 46", style: "fill:none;stroke:var(--warn);stroke-width:2" });
    s.appendChild(arrow);
    var ptr = S("path", { style: "fill:var(--warn)" });
    var lbl = T(0, 0, "", "dg-lbl-mid");
    lbl.setAttribute("style", "font-weight:700;font-size:12px;fill:var(--text)");
    s.appendChild(ptr); s.appendChild(lbl);
    function draw(i) {
      var o = O[i];
      marks.forEach(function (m, j) { if (m) m.setAttribute("r", j === i ? (j === 0 ? 9 : 6) : (j === 0 ? 7 : 3.2)); });
      if (o.b === null) {
        arrow.setAttribute("opacity", "1"); ptr.setAttribute("d", "");
        lbl.setAttribute("x", X1 + 8); lbl.setAttribute("y", 30); lbl.textContent = "stars → tens of thousands of km";
        lbl.style.textAnchor = "end";
      } else {
        arrow.setAttribute("opacity", "0");
        var x = bx(o.b);
        ptr.setAttribute("d", "M " + (x - 6) + " " + (SY - 22) + " L " + (x + 6) + " " + (SY - 22) + " L " + x + " " + (SY - 12) + " Z");
        lbl.setAttribute("x", Math.max(36, Math.min(324, x))); lbl.setAttribute("y", SY - 28); lbl.textContent = o.n;
        lbl.style.textAnchor = "middle";
      }
      r.readout.innerHTML = o.text;
    }
    bigPick(r.controls, O.map(function (o, i) { return { label: o.n, value: i }; }), 3, draw);
    draw(3);
  };

  /* ---- 7.2  Differentiation: melt it and the metal sinks ------------- */
  D["differentiation"] = function (host) {
    var r = frame(host, "Melt a planet and watch it sort itself",
      "Start cold, then heat the planet past 1300 K. Then cool it down and see what stays.",
      "Differentiation: gravity pulls the heavy metal (dark dots) down into a core and lets the lighter silicate rock (light dots) float up into a crust. Once a planet has done this, cooling keeps the layers.");
    var s = svg(r.stage, 300, 220);
    var Cx = 150, Cy = 108, R = 92;
    var body = S("circle", { cx: Cx, cy: Cy, r: R });
    s.appendChild(body);
    var rnd = seeded(77);
    var dots = [];
    function inDisk(r0, r1) {
      var rr = Math.sqrt(r0 * r0 + (r1 * r1 - r0 * r0) * rnd()), a = rnd() * Math.PI * 2;
      return [rr * Math.cos(a), rr * Math.sin(a)];
    }
    var g = S("g", {});
    s.appendChild(g);
    for (var i = 0; i < 190; i++) {
      var metal = i < 64;
      var mix = inDisk(0, 0.93);
      var home = metal ? inDisk(0, 0.4) : inDisk(0.47, 0.93);
      var c = S("circle", { r: metal ? 3.6 : 3, style: "fill:" + (metal ? "#6f7a86" : "#e3c99a") + ";stroke:" + (metal ? "#3d454e" : "#a88c5c") + ";stroke-width:0.6" });
      g.appendChild(c);
      dots.push({ c: c, mix: mix, home: home, metal: metal, ph: rnd() * 6.28 });
    }
    var tLbl = T(Cx, Cy + R + 16, "", "dg-lbl-mid");
    tLbl.setAttribute("style", "font-weight:700;font-size:12px");
    s.appendChild(tLbl);
    var STATES = {
      cold: { target: 0, jig: 0, fill: "color-mix(in srgb, var(--text-faint) 25%, transparent)", lbl: "cold — solid", lc: "var(--text-dim)",
        text: "Imagine a world that is <b>cold and solid</b>, with metal and rock mixed all through it. Nothing can move, so nothing sorts." },
      hot: { target: 1, jig: 1.6, fill: "color-mix(in srgb, #ff6a3d 45%, transparent)", lbl: "above 1300 K — melted!", lc: "#ff8a5c",
        text: "Heated past the melting point of rock — typically <b>more than 1300 K</b>. Now gravity takes over: the <b>heavy metal sinks</b> to form a <b>core</b>, and the <b>light silicates float up</b> to form a <b>crust</b>." },
      cooled: { target: 1, jig: 0, fill: "color-mix(in srgb, var(--text-faint) 25%, transparent)", lbl: "cooled — layers kept", lc: "var(--good)",
        text: "Cooled and solid again — but the <b>layers stay</b>. A dense metal core under a light rocky crust is how we know the terrestrial planets were once <b>melted</b>." }
    };
    var state = "cold", p = 0, time = 0;
    function apply() {
      var st = STATES[state];
      body.setAttribute("style", "fill:" + st.fill + ";stroke:var(--border);stroke-width:1.5");
      tLbl.textContent = state === "cooled" && p < 0.05 ? "cooled — still mixed" : st.lbl; tLbl.setAttribute("style", "font-weight:700;font-size:12px;fill:" + (state === "cooled" && p < 0.05 ? "var(--text-dim)" : st.lc));
      var text = st.text;
      if (state === "cooled" && p < 0.05) text = "It was <b>never melted</b>, so nothing sorted — cooling changes nothing. Heat it above <b>1300 K</b> first.";
      else if (state === "cooled" && p < 0.99) text = "It cooled <b>before it finished sorting</b>, so the layers froze partway.";
      r.readout.innerHTML = text;
    }
    function frameDraw() {
      var st = STATES[state];
      time += 0.05;
      if (state === "cold") p = 0;
      else if (state === "hot") p = Math.min(1, p + 0.006);
      // when cooled, p freezes wherever the melt got to (normally 1)
      var e = p * p * (3 - 2 * p);
      dots.forEach(function (d) {
        var x = d.mix[0] + (d.home[0] - d.mix[0]) * e, y = d.mix[1] + (d.home[1] - d.mix[1]) * e;
        var j = st.jig;
        d.c.setAttribute("cx", (Cx + x * R + j * Math.sin(time * 1.7 + d.ph)).toFixed(2));
        d.c.setAttribute("cy", (Cy + y * R + j * Math.cos(time * 1.3 + d.ph * 2)).toFixed(2));
      });
    }
    bigPick(r.controls, [
      { label: "❄ Cold & mixed", value: "cold" }, { label: "🔥 Heat above 1300 K", value: "hot" }, { label: "🧊 Cool it down", value: "cooled" }
    ], 0, function (v) { state = v; apply(); });
    apply();
    frameDraw();
    runWhileShown(s, frameDraw);
  };

  /* ---- 7.2  Farther from the Sun, colder ------------------------------ */
  D["planet-temperature"] = function (host) {
    var r = frame(host, "Move a world away from the Sun",
      "Drag the slider to move a world out from Mercury's distance to 100 times farther (about Pluto at its closest).",
      "The book's rule of thumb: sunlight weakens with the square of distance, and temperature drops roughly with the square root of distance. It ignores atmospheres — Venus's thick air makes it hotter than Mercury.");
    var s = svg(r.stage, 360, 170);
    var X0 = 40, X1 = 300, Y = 70;
    function xAt(k) { return X0 + (X1 - X0) * (Math.sqrt(k) - 1) / 9; }
    s.appendChild(S("circle", { cx: 14, cy: Y, r: 16, "class": "dg-sun" }));
    s.appendChild(S("line", { x1: X0, y1: Y, x2: X1, y2: Y, "class": "dg-dash" }));
    s.appendChild(T(xAt(1), Y + 22, "Mercury", "dg-lbl-mid"));
    s.appendChild(T(xAt(100), Y + 22, "Pluto", "dg-lbl-mid"));
    [1, 4, 9, 25, 49, 100].forEach(function (k) {
      s.appendChild(S("line", { x1: xAt(k), y1: Y - 4, x2: xAt(k), y2: Y + 4, style: "stroke:var(--text-faint)" }));
      s.appendChild(T(xAt(k), Y - 9, k + "×", "dg-lbl-mid"));
    });
    var rays = S("path", { style: "fill:#ffcf6b" });
    var world = S("circle", { cy: Y, r: 8 });
    s.insertBefore(rays, s.firstChild);
    s.appendChild(world);
    // thermometer
    var TX = 336, TT = 18, TB = 138;
    s.appendChild(S("rect", { x: TX - 6, y: TT, width: 12, height: TB - TT, rx: 6, style: "fill:none;stroke:var(--border);stroke-width:1.5" }));
    s.appendChild(S("circle", { cx: TX, cy: TB + 8, r: 10, style: "fill:#ff6a3d" }));
    var merc = S("rect", { x: TX - 3.5, width: 7, rx: 3.5, style: "fill:#ff6a3d" });
    s.appendChild(merc);
    s.appendChild(T(TX - 12, TT + 6, "500 K", "dg-lbl")).setAttribute("text-anchor", "end");
    s.appendChild(T(TX - 12, TB - 12, "50 K", "dg-lbl")).setAttribute("text-anchor", "end");
    var bigT = T(170, 128, "", "dg-lbl-mid");
    bigT.setAttribute("style", "font-weight:800;font-size:18px;fill:var(--text)");
    var subT = T(170, 150, "", "dg-lbl-mid");
    s.appendChild(bigT); s.appendChild(subT);
    function draw(k, out) {
      var x = xAt(k), T_ = 500 / Math.sqrt(k), light = 1 / (k * k);
      world.setAttribute("cx", x);
      var hot = Math.max(0, Math.min(1, (T_ - 50) / 450));
      world.setAttribute("style", "fill:rgb(" + Math.round(120 + 135 * hot) + "," + Math.round(140 + 30 * hot) + "," + Math.round(230 - 170 * hot) + ")");
      var spread = 18;
      rays.setAttribute("d", "M 14 " + (Y - 6) + " L " + x + " " + (Y - spread) + " L " + x + " " + (Y + spread) + " L 14 " + (Y + 6) + " Z");
      rays.setAttribute("opacity", (0.05 + 0.45 / k).toFixed(3));
      var h = (TB - TT) * (T_ - 50) / 450;
      merc.setAttribute("y", TB - h); merc.setAttribute("height", Math.max(0, h) + 4);
      bigT.textContent = "≈ " + Math.round(T_) + " K";
      subT.textContent = "sunlight " + (light >= 0.01 ? Math.round(light * 100) + "%" : (light * 100).toFixed(light >= 0.001 ? 2 : 3) + "%") + " as strong as at Mercury";
      out.textContent = k + "×";
      r.readout.innerHTML = k + " times Mercury's distance → sunlight is 1 ÷ " + k + "² = <b>1/" + (k * k).toLocaleString() +
        "</b> as strong, and the temperature is about 500 K ÷ √" + k + " = <b>" + Math.round(T_) + " K</b>." +
        (k === 100 ? " That's the book's example: <b>Pluto</b>, about 100 times as far as Mercury, is about 10 times colder — <b>500 K → 50 K</b>." : "");
    }
    var sl = slider(r.controls, "Distance (× Mercury's)", 1, 100, 1, 1, draw);
    sl.set(1);
  };

  /* ---- 7.3  Counting craters: who swept the sidewalk? ---------------- */
  D["crater-count"] = function (host) {
    var r = frame(host, "Read a surface's age from its craters",
      "Craters land at the same steady rate on both regions. Flood region B with lava whenever you like, and compare the counts.",
      "Like snow on two sidewalks: the same amount fell on both, but one was swept. Fewer craters means less time since the surface was last swept clean — a younger surface.");
    var s = svg(r.stage, 340, 190);
    var REG = [{ x: 14, name: "Region A" }, { x: 178, name: "Region B" }], W = 148, Y0 = 22;
    var groups = [], counts = [0, 0], lava = null;
    REG.forEach(function (rg, i) {
      s.appendChild(S("rect", { x: rg.x, y: Y0, width: W, height: W, rx: 4, style: "fill:color-mix(in srgb, var(--text-faint) 30%, transparent);stroke:var(--border)" }));
      var gg = S("g", {});
      s.appendChild(gg);
      groups.push(gg);
      s.appendChild(T(rg.x + W / 2, 14, rg.name, "dg-lbl-mid"));
    });
    var flood = S("rect", { x: REG[1].x, y: Y0, width: W, height: W, rx: 4, style: "fill:#ff6a3d", opacity: 0 });
    s.appendChild(flood);
    var cA = T(REG[0].x + W / 2, Y0 + W + 16, "", "dg-lbl-mid"), cB = T(REG[1].x + W / 2, Y0 + W + 16, "", "dg-lbl-mid");
    cA.setAttribute("style", "font-weight:700;fill:var(--text)"); cB.setAttribute("style", "font-weight:700;fill:var(--text)");
    s.appendChild(cA); s.appendChild(cB);
    var rnd = Math.random, tick = 0, flooded = false, full = false, flash = 0;
    function addCrater(i) {
      var rad = 2 + Math.pow(rnd(), 3) * 9;
      var x = REG[i].x + rad + rnd() * (W - 2 * rad), y = Y0 + rad + rnd() * (W - 2 * rad);
      groups[i].appendChild(S("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: rad.toFixed(1), style: "fill:color-mix(in srgb, var(--panel) 70%, transparent);stroke:var(--text-dim);stroke-width:0.8" }));
      counts[i]++;
    }
    function report() {
      cA.textContent = counts[0] + " craters"; cB.textContent = counts[1] + " craters";
      var msg;
      if (!flooded) msg = "Both regions are piling up craters at the same rate. Tap <b>Flood B with lava</b> to sweep region B clean.";
      else if (counts[1] < counts[0]) msg = "Region B has <b>fewer craters</b> (" + counts[1] + " vs. " + counts[0] + ") even though the same number of impacts hit both. Its surface is <b>younger</b> — the craters only count the time since the lava swept it clean.";
      else msg = "Both regions were swept clean at the same moment, so their counts match — same age.";
      if (full) msg += " <i>Region A is saturated — tap Start over.</i>";
      r.readout.innerHTML = msg;
    }
    function step() {
      if (flash > 0) { flash -= 0.02; flood.setAttribute("opacity", Math.max(0, flash).toFixed(2)); }
      if (full) return;
      if (++tick % 14) return;
      addCrater(0); addCrater(1);
      if (counts[0] >= 120) full = true;
      report();
    }
    var row = E("div", { "class": "dg-bigrow" });
    var fl = E("button", { type: "button", "class": "dg-bigbtn", text: "🌋 Flood B with lava" });
    var rs = E("button", { type: "button", "class": "dg-bigbtn", text: "↺ Start over" });
    fl.addEventListener("click", function () { clr(groups[1]); counts[1] = 0; flooded = true; flash = 0.9; report(); });
    rs.addEventListener("click", function () { clr(groups[0]); clr(groups[1]); counts = [0, 0]; flooded = false; full = false; report(); });
    row.appendChild(fl); row.appendChild(rs);
    r.controls.appendChild(row);
    report();
    autoTicker(r.controls, step);
  };

  /* ---- 7.3  Half-lives and nuclear clocks ---------------------------- */
  D["half-life"] = function (host) {
    var r = frame(host, "A nuclear clock",
      "Pick a radioactive element from the book's Table 7.3, then slide the half-lives. Pink dots are parent atoms; gray dots have become daughters.",
      "Each half-life, half of the remaining parent atoms decay: 1 → ½ → ¼ → ⅛. Comparing parents left with daughters made tells how long the clock has run — and so how old the rock is.");
    var ISO = [
      { p: "Uranium-238", d: "Lead-206", hl: 4.47 },
      { p: "Potassium-40", d: "Argon-40", hl: 1.31 },
      { p: "Thorium-232", d: "Lead-208", hl: 14.0 },
      { p: "Rubidium-87", d: "Strontium-87", hl: 48.8 },
      { p: "Samarium-147", d: "Neodymium-143", hl: 106 }
    ];
    var s = svg(r.stage, 360, 190);
    var order = [], rnd = seeded(2024);
    for (var i = 0; i < 100; i++) order.push(i);
    for (i = 99; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
    var cells = [];
    for (i = 0; i < 100; i++) {
      var c = S("circle", { cx: 18 + (i % 10) * 17, cy: 18 + Math.floor(i / 10) * 17, r: 6.5 });
      s.appendChild(c); cells.push(c);
    }
    // decay curve on the right
    var GX = 200, GY = 160, GW = 148, GH = 140;
    s.appendChild(S("line", { x1: GX, y1: GY, x2: GX + GW, y2: GY, "class": "dg-axis" }));
    s.appendChild(S("line", { x1: GX, y1: GY, x2: GX, y2: GY - GH, "class": "dg-axis" }));
    var d = "";
    for (var k = 0; k <= 100; k++) { var n = k / 20; d += (k ? " L " : "M ") + (GX + GW * n / 5).toFixed(1) + " " + (GY - GH / Math.pow(2, n)).toFixed(1); }
    s.appendChild(S("path", { d: d, style: "fill:none;stroke:#f48fb1;stroke-width:2" }));
    for (k = 0; k <= 5; k++) s.appendChild(T(GX + GW * k / 5, GY + 12, String(k), "dg-lbl-mid"));
    s.appendChild(T(GX + GW / 2, GY + 25, "half-lives passed", "dg-lbl-mid"));
    s.appendChild(T(GX + 4, GY - GH + 2, "parent left", "dg-lbl"));
    var dot = S("circle", { r: 4.5, style: "fill:var(--warn)" });
    s.appendChild(dot);
    var iso = ISO[0], hl = 0, slOut = null;
    function fmtYears(b) {
      if (b === 0) return "0 years";
      var str = b >= 100 ? String(Math.round(b)) : b >= 10 ? b.toFixed(1) : b.toFixed(2);
      if (str.indexOf(".") > -1) str = str.replace(/\.?0+$/, "");
      return str + " billion years";
    }
    function draw() {
      var frac = 1 / Math.pow(2, hl), parents = Math.round(100 * frac);
      cells.forEach(function (c, i) {
        var isParent = order.indexOf(i) < parents;
        c.setAttribute("style", isParent ? "fill:#f48fb1;stroke:#c2185b;stroke-width:0.8" : "fill:color-mix(in srgb, var(--text-faint) 45%, transparent)");
      });
      dot.setAttribute("cx", GX + GW * hl / 5); dot.setAttribute("cy", GY - GH * frac);
      var yrs = hl * iso.hl;
      if (slOut) slOut.textContent = String(hl);
      var fracTxt = hl === 0 ? "all" : hl === 1 ? "½" : hl === 2 ? "¼" : hl === 3 ? "⅛" : hl === 4 ? "1/16" : hl === 5 ? "1/32" : (frac * 100).toFixed(0) + "%";
      r.readout.innerHTML = "<b>" + iso.p + "</b> → <b>" + iso.d + "</b>, half-life <b>" + iso.hl + " billion years</b>. After <b>" + hl +
        "</b> half-li" + (hl === 1 ? "fe" : "ves") + " (" + hl + " × " + iso.hl + " = <b>" + fmtYears(yrs) + "</b>), <b>" + fracTxt +
        "</b> of the parent is left: about <b>" + parents + "</b> parent atoms and <b>" + (100 - parents) + "</b> daughters." +
        (yrs > 4.5 ? " <i>That's longer than the solar system has existed (about 4.5 billion years), so no rock from our solar system could have decayed this far.</i>" : "");
    }
    bigPick(r.controls, ISO.map(function (x, i) { return { label: x.p, value: i }; }), 0, function (i) { iso = ISO[i]; draw(); });
    var sl = slider(r.controls, "Half-lives passed", 0, 5, 0, 0.5, function (v, out) { hl = v; slOut = out; draw(); });
    sl.set(0);
  };

  /* ---- 7.4  From a spinning cloud to planets -------------------------- */
  D["solar-nebula"] = function (host) {
    var r = frame(host, "Building a solar system",
      "Tap each stage in order. Watch: the inner parts of the disk go around faster.",
      "The Sun and planets formed together from one spinning cloud — which is why the planets orbit in one plane and the same direction. The hot inner disk made rocky planets; ice survived only farther out.");
    var s = svg(r.stage, 360, 210);
    var Cx = 180, Cy = 105, RMAX = 160, ICE = 62;
    var rnd = seeded(4242);
    var parts = [];
    for (var i = 0; i < 260; i++) {
      var rr = 18 + Math.pow(rnd(), 0.8) * (RMAX - 18);
      var c = S("circle", { r: 1.4 });
      parts.push({ c: c, r: rr, a: rnd() * Math.PI * 2, z: (rnd() * 2 - 1) * 0.9, cloudR: 30 + rnd() * 70 });
    }
    var zone = S("ellipse", { cx: Cx, cy: Cy, rx: ICE, ry: ICE * 0.3, style: "fill:color-mix(in srgb, #ff6a3d 18%, transparent);stroke:#ff8a5c;stroke-dasharray:4 3" });
    var zoneT = T(Cx, Cy + ICE * 0.3 + 30, "inside the dashed line: too warm for ice", "dg-lbl-mid");
    zoneT.setAttribute("style", "font-weight:700;fill:#ff8a5c;paint-order:stroke;stroke:var(--panel);stroke-width:3px");
    var orbitsG = S("g", {});
    var sun = S("circle", { cx: Cx, cy: Cy, r: 6, "class": "dg-sun" });
    [zone, zoneT, orbitsG].forEach(function (n) { s.appendChild(n); });
    parts.forEach(function (p) { s.appendChild(p.c); });
    s.appendChild(zoneT); // keep the label above the dust
    s.appendChild(sun);
    // planetesimals and planets (radius, size, rocky?)
    var lumps = [], rl = seeded(99);
    for (i = 0; i < 46; i++) {
      var lr = 24 + rl() * (RMAX - 30);
      var lc = S("circle", {});
      s.appendChild(lc);
      lumps.push({ c: lc, r: lr, a: rl() * Math.PI * 2, size: 2.2 + rl() * 1.6 });
    }
    var PL = [[28, 2.6, 1], [40, 3.6, 1], [52, 3.8, 1], [62, 3, 1], [92, 9, 0], [118, 8, 0], [140, 5.5, 0], [158, 5.2, 0]];
    var planets = PL.map(function (q, i) {
      var pc = S("circle", { r: q[1] });
      s.appendChild(pc);
      return { c: pc, r: q[0], a: i * 2.1, rocky: q[2] };
    });
    var STAGES = [
      { flat: 1, dust: 1, lump: 0, pl: 0, sun: 3, zone: 0,
        text: "<b>1. A spinning cloud</b> of gas and dust — the <b>solar nebula</b>. Its center will become the Sun; a small fraction of the material farther out will become everything else." },
      { flat: 0.3, dust: 1, lump: 0, pl: 0, sun: 9, zone: 1,
        text: "<b>2. A flattened, spinning disk</b> with the Sun forming at the bright center. The inner disk moves <b>faster</b>, so friction heats it — <b>too warm for water to condense as ice</b>. Ice can survive only farther out. (Young stars today have disks like this: circumstellar disks.)" },
      { flat: 0.3, dust: 0.25, lump: 1, pl: 0, sun: 11, zone: 1,
        text: "<b>3. Planetesimals.</b> Material clumps into millions of small bodies, probably <b>no larger than 100 km</b> across — <b>rocky</b> ones in the hot inner disk, <b>icy</b> ones farther out. They crash into each other violently." },
      { flat: 0.3, dust: 0, lump: 0, pl: 1, sun: 13, zone: 0,
        text: "<b>4. Planets.</b> Planetesimals gather under their mutual gravity. Small <b>rocky</b> planets end up close in; the <b>giants</b> farther out — all orbiting in <b>one plane</b> and the <b>same direction</b>. Impacts and radioactive heat melted the planets so they differentiated. About 4.5 billion years later, it's a much calmer place." }
    ];
    var st = STAGES[0], flat = 1, dustO = 1, lumpO = 0, plO = 0, sunR = 3, zoneO = 0;
    function ease(v, to) { return v + (to - v) * 0.05; }
    function frameDraw() {
      flat = ease(flat, st.flat); dustO = ease(dustO, st.dust); lumpO = ease(lumpO, st.lump); plO = ease(plO, st.pl);
      sunR = ease(sunR, st.sun); zoneO = ease(zoneO, st.zone);
      var cloudMix = (flat - 0.3) / 0.7; // 1 = round cloud, 0 = flat disk
      parts.forEach(function (p) {
        var rad = p.cloudR * cloudMix + p.r * (1 - cloudMix);
        p.a += 0.6 / Math.pow(rad, 1.5) * (cloudMix > 0.5 ? 0.35 : 1); // inner parts always go around faster
        var x = Cx + rad * Math.cos(p.a), y = Cy + rad * Math.sin(p.a) * flat + p.z * 60 * cloudMix;
        p.c.setAttribute("cx", x.toFixed(1)); p.c.setAttribute("cy", y.toFixed(1));
        var warm = p.r < ICE && cloudMix < 0.5;
        p.c.setAttribute("style", "fill:" + (cloudMix > 0.5 ? "#c9b48f" : warm ? "#ffb070" : "#a8d8ff") + ";opacity:" + (0.75 * dustO).toFixed(2));
      });
      lumps.forEach(function (l) {
        l.a += 0.6 / Math.pow(l.r, 1.5);
        l.c.setAttribute("cx", (Cx + l.r * Math.cos(l.a)).toFixed(1));
        l.c.setAttribute("cy", (Cy + l.r * Math.sin(l.a) * flat).toFixed(1));
        l.c.setAttribute("r", (l.size * lumpO).toFixed(2));
        l.c.setAttribute("style", "fill:" + (l.r < ICE ? "#b98a5e" : "#cfeaff"));
      });
      clr(orbitsG);
      if (plO > 0.02) planets.forEach(function (p) {
        orbitsG.appendChild(S("ellipse", { cx: Cx, cy: Cy, rx: p.r, ry: p.r * flat, style: "fill:none;stroke:var(--border);stroke-width:0.7;opacity:" + plO.toFixed(2) }));
      });
      planets.forEach(function (p) {
        p.a += 0.6 / Math.pow(p.r, 1.5);
        p.c.setAttribute("cx", (Cx + p.r * Math.cos(p.a)).toFixed(1));
        p.c.setAttribute("cy", (Cy + p.r * Math.sin(p.a) * flat).toFixed(1));
        p.c.setAttribute("style", "fill:" + (p.rocky ? "#c98a5a" : "#e0c89a") + ";opacity:" + plO.toFixed(2));
      });
      sun.setAttribute("r", sunR.toFixed(1));
      zone.setAttribute("opacity", zoneO.toFixed(2)); zoneT.setAttribute("opacity", zoneO.toFixed(2));
    }
    bigPick(r.controls, [
      { label: "1 · Cloud", value: 0 }, { label: "2 · Disk", value: 1 }, { label: "3 · Planetesimals", value: 2 }, { label: "4 · Planets", value: 3 }
    ], 0, function (i) { st = STAGES[i]; r.readout.innerHTML = st.text; });
    r.readout.innerHTML = STAGES[0].text;
    autoTicker(r.controls, frameDraw);
  };

  window.ASTRO_DIAGRAMS = D;
})();
