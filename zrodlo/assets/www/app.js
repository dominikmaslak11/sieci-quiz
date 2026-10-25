(function () {
  "use strict";
  var $app = document.getElementById("app"), $title = document.getElementById("title"), $back = document.getElementById("back");
  var $zoom = document.getElementById("zoom");
  var stack = [];       // widoki: {title, render, onLeave}
  var LET = "ABCDEFGH";

  /* ---------- pomocnicze ---------- */
  function $(h) { var d = document.createElement("div"); d.innerHTML = h; return d.firstElementChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return "q" + (h >>> 0).toString(36); }
  Q.forEach(function (x) { x.id = hash(x.t + "|" + x.q + "|" + x.c.join("|")); });

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var stats = store.get("sk_stats", {});      // id -> {ok,bad,last:1|0}
  function record(id, good) {
    if (id === "gen") return;
    var s = stats[id] || (stats[id] = { ok: 0, bad: 0, last: 0 });
    if (good) s.ok++; else s.bad++;
    s.last = good ? 1 : 0; store.set("sk_stats", stats);
  }

  function go(title, render, onLeave) {
    stack.push({ title: title, render: render, onLeave: onLeave });
    show();
  }
  function show() {
    var v = stack[stack.length - 1];
    $title.textContent = v.title;
    $back.style.visibility = stack.length > 1 ? "visible" : "hidden";
    $app.innerHTML = ""; window.scrollTo(0, 0);
    v.render($app);
  }
  function pop() { var v = stack.pop(); if (v && v.onLeave) v.onLeave(); show(); }
  function reset() { stack.length = 1; show(); }
  $back.onclick = function () { if (stack.length > 1) pop(); };
  window.appBack = function () {
    if (!$zoom.hidden) { $zoom.hidden = true; return true; }
    if (stack.length > 1) { pop(); return true; }
    return false;
  };
  $zoom.onclick = function () { $zoom.hidden = true; };
  function zoomable(img) { img.onclick = function () { $zoom.firstChild && ($zoom.querySelector("img").src = img.src); $zoom.hidden = false; }; }

  /* ---------- ekran główny ---------- */
  function home(root) {
    var tot = 0, ok = 0, bad = 0, mastered = 0, wrong = 0;
    Q.forEach(function (x) { var s = stats[x.id]; if (s) { ok += s.ok; bad += s.bad; if (s.last) mastered++; else wrong++; } });
    tot = ok + bad;
    root.appendChild($('<div class="stats">' +
      '<div class="card stat"><b>' + tot + '</b><span>odpowiedzi</span></div>' +
      '<div class="card stat"><b>' + (tot ? Math.round(100 * ok / tot) + "%" : "–") + '</b><span>skuteczność</span></div>' +
      '<div class="card stat"><b>' + mastered + "/" + Q.length + '</b><span>opanowane</span></div></div>'));
    function btn(cls, t, sub, fn) {
      var b = $('<button class="btn ' + cls + '"><b>' + t + '</b><small>' + sub + '</small></button>'); b.onclick = fn; root.appendChild(b);
    }
    btn("pri", "📝 Egzamin próbny", "20 losowych pytań, wynik i ocena na końcu", function () { startQuiz(pick(Q, 20), { title: "Egzamin próbny", exam: true }); });
    btn("", "📚 Nauka według tematu", "z natychmiastowym wyjaśnieniem odpowiedzi", topics);
    btn("", "🧮 Zadania z adresacji IP", "generator: adres sieci, broadcast, hosty, maski", genMenu);
    btn("", "🔁 Powtórka błędów (" + wrong + ")", "pytania, na które ostatnio źle odpowiedziałeś", function () {
      var w = Q.filter(function (x) { return stats[x.id] && !stats[x.id].last; });
      if (!w.length) return alert("Brak błędnych odpowiedzi do powtórki 🎉");
      startQuiz(shuffle(w), { title: "Powtórka błędów" });
    });
    btn("", "🃏 Fiszki i wyjściówka", "pytania otwarte z wzorcowymi odpowiedziami", flash);
    btn("", "📄 Ściąga", "najważniejsze tabele i wartości", cheat);
    btn("", "🔧 Kalkulator podsieci", "adres sieci, broadcast, zakres hostów, podział", calc);
    var r = $('<button class="btn"><b>🗑️ Wyzeruj statystyki</b><small>kasuje postępy zapisane w aplikacji</small></button>');
    r.onclick = function () { if (confirm("Na pewno wyzerować postępy?")) { stats = {}; store.set("sk_stats", stats); show(); } };
    root.appendChild(r);
  }
  function pick(list, n) { return shuffle(list).slice(0, Math.min(n, list.length)); }

  function topics() {
    go("Wybierz temat", function (root) {
      Object.keys(TOPICS).forEach(function (k) {
        var list = Q.filter(function (x) { return x.t === k; });
        var done = list.filter(function (x) { return stats[x.id] && stats[x.id].last; }).length;
        var b = $('<button class="btn"><b>' + TOPICS[k].icon + " " + TOPICS[k].name + '</b><small>' + list.length + " pytań · opanowane " + done + '</small></button>');
        b.onclick = function () { startQuiz(shuffle(list), { title: TOPICS[k].name }); };
        root.appendChild(b);
      });
      var all = $('<button class="btn pri"><b>🔀 Wszystkie pytania</b><small>' + Q.length + ' pytań w losowej kolejności</small></button>');
      all.onclick = function () { startQuiz(shuffle(Q), { title: "Wszystkie pytania" }); };
      root.appendChild(all);
    });
  }

  /* ---------- silnik quizu ---------- */
  function prep(x) {
    var opts = [];
    x.c.forEach(function (t) { opts.push({ t: t, ok: true }); });
    x.w.forEach(function (t) { opts.push({ t: t, ok: false }); });
    return { x: x, opts: shuffle(opts), multi: x.c.length > 1, sel: [], done: false, good: null };
  }
  function startQuiz(list, o) {
    var items = list.map(prep), i = 0, correct = 0;
    function render(root) {
      if (i >= items.length) return results();
      var it = items[i], x = it.x;
      root.appendChild($('<div class="meta"><span>Pytanie ' + (i + 1) + " / " + items.length + '</span><span>' + (x.t && TOPICS[x.t] ? TOPICS[x.t].icon : "🧮") + '</span></div>'));
      root.appendChild($('<div class="prog"><i style="width:' + (100 * i / items.length) + '%"></i></div>'));
      var card = $('<div class="card"></div>'); root.appendChild(card);
      card.appendChild($('<div class="qt">' + esc(x.q) + '</div>'));
      if (x.img) { var im = $('<img class="qimg" src="img/' + x.img + '.jpg" alt="">'); zoomable(im); card.appendChild(im); }
      if (it.multi) card.appendChild($('<div class="meta">Zaznacz wszystkie poprawne odpowiedzi</div>'));
      var box = $('<div></div>'); card.appendChild(box);
      var foot = $('<div></div>'); root.appendChild(foot);
      function paint() {
        box.innerHTML = "";
        it.opts.forEach(function (op, n) {
          var cls = "opt", sel = it.sel.indexOf(n) >= 0;
          if (sel) cls += " sel";
          if (it.done && !o.exam) { if (op.ok && sel) cls = "opt ok"; else if (!op.ok && sel) cls = "opt bad"; else if (op.ok) cls = "opt miss"; }
          var b = $('<button class="' + cls + '"><span class="k">' + LET[n] + '</span><span>' + esc(op.t) + '</span></button>');
          b.onclick = function () {
            if (it.done) return;
            if (it.multi) { var p = it.sel.indexOf(n); if (p >= 0) it.sel.splice(p, 1); else it.sel.push(n); paint(); }
            else { it.sel = [n]; finish(); }
          };
          box.appendChild(b);
        });
        foot.innerHTML = "";
        if (it.multi && !it.done) {
          var c = $('<button class="btn pri go"><b>Sprawdź</b></button>'); c.onclick = function () { if (it.sel.length) finish(); }; foot.appendChild(c);
        }
      }
      function finish() {
        it.done = true;
        it.good = it.opts.every(function (op, n) { return op.ok === (it.sel.indexOf(n) >= 0); });
        if (it.good) correct++;
        record(x.id, it.good);
        paint();
        if (!o.exam) {
          var ans = it.opts.filter(function (p) { return p.ok; }).map(function (p) { return p.t; }).join("; ");
          foot.appendChild($('<div class="exp ' + (it.good ? "ok" : "bad") + '"><b>' + (it.good ? "✔ Dobrze!" : "✘ Źle.") + '</b> Poprawna odpowiedź: ' + esc(ans) +
            (x.e ? "<br>" + esc(x.e) : "") + (x.src ? "<small>Źródło: " + esc(x.src) + "</small>" : "") + '</div>'));
        }
        var nx = $('<button class="btn pri go"><b>' + (i + 1 < items.length ? "Dalej →" : "Zobacz wynik") + '</b></button>');
        nx.onclick = function () { i++; show(); };
        foot.appendChild(nx);
        if (o.exam) { /* bez ujawniania odpowiedzi */ }
      }
      paint();
      if (it.done) { /* po powrocie z zoomu itp. */ }
    }
    function results() {
      var pct = Math.round(100 * correct / items.length);
      var g = pct >= 90 ? "5.0" : pct >= 80 ? "4.5" : pct >= 70 ? "4.0" : pct >= 60 ? "3.5" : pct >= 50 ? "3.0" : "2.0";
      stack[stack.length - 1].title = "Wynik";
      $title.textContent = "Wynik";
      var wrong = items.filter(function (t) { return !t.good; });
      var h = '<div class="card center"><div class="big">' + correct + " / " + items.length + '</div><div>' + pct + '% · ocena orientacyjna <b>' + g + '</b></div></div>';
      $app.innerHTML = h;
      if (wrong.length) {
        var rb = $('<button class="btn pri"><b>🔁 Powtórz błędne (' + wrong.length + ')</b></button>');
        rb.onclick = function () { stack.pop(); startQuiz(wrong.map(function (t) { return t.x; }), { title: "Powtórka błędów" }); };
        $app.appendChild(rb);
        $app.appendChild($('<h3>Do poprawy</h3>'));
        wrong.forEach(function (t) {
          var ans = t.opts.filter(function (p) { return p.ok; }).map(function (p) { return p.t; }).join("; ");
          var c = $('<div class="card"><b>' + esc(t.x.q) + '</b><div class="exp ok">' + esc(ans) + (t.x.e ? "<br>" + esc(t.x.e) : "") + '</div></div>');
          if (t.x.img) { var im = $('<img class="qimg" src="img/' + t.x.img + '.jpg" alt="">'); zoomable(im); c.insertBefore(im, c.children[1]); }
          $app.appendChild(c);
        });
      } else $app.appendChild($('<div class="card center">Bezbłędnie! 🎉</div>'));
      var m = $('<button class="btn"><b>Menu główne</b></button>'); m.onclick = reset; $app.appendChild(m);
    }
    go(o.title, render);
  }

  /* ---------- generator zadań IP ---------- */
  function ip2n(s) { var p = s.split("."); return ((+p[0] << 24) >>> 0) + (+p[1] << 16) + (+p[2] << 8) + +p[3]; }
  function n2ip(n) { n = n >>> 0; return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join("."); }
  function maskN(p) { return p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0; }
  function info(ipn, p) {
    var m = maskN(p), net = (ipn & m) >>> 0, size = Math.pow(2, 32 - p), bc = (net + size - 1) >>> 0;
    return { net: net, bc: bc, size: size, hosts: size - 2, mask: m, first: net + 1, last: bc - 1 };
  }
  function randIp(pmin, pmax) {
    var cls = rnd(0, 2), a = cls === 0 ? 10 : cls === 1 ? 172 : 192, b = cls === 0 ? rnd(0, 255) : cls === 1 ? rnd(16, 31) : 168;
    return a + "." + b + "." + rnd(0, 255) + "." + rnd(1, 254);
  }
  function uniq(correct, cands, fmt) {
    var out = [], seen = {}; seen[fmt(correct)] = 1;
    shuffle(cands).forEach(function (c) { var s = fmt(c); if (!seen[s] && out.length < 3) { seen[s] = 1; out.push(s); } });
    return out;
  }
  var GEN = {
    net: function () { var p = rnd(17, 29), ip = randIp(), r = info(ip2n(ip), p), blk = r.size;
      return { q: "Jaki jest adres sieci dla hosta " + ip + "/" + p + "?", c: [n2ip(r.net)], w: uniq(r.net, [r.net + blk, r.net - blk, r.net + 2 * blk, ip2n(ip), r.bc], n2ip),
        e: "Maska /" + p + " = " + n2ip(r.mask) + ". Rozmiar bloku " + r.size + ". Adres sieci = IP AND maska = " + n2ip(r.net) + "." }; },
    bc: function () { var p = rnd(17, 29), ip = randIp(), r = info(ip2n(ip), p), blk = r.size;
      return { q: "Jaki jest adres rozgłoszeniowy (broadcast) sieci, do której należy " + ip + "/" + p + "?", c: [n2ip(r.bc)], w: uniq(r.bc, [r.bc + blk, r.bc - blk, r.net, r.bc - 1, r.bc + 1], n2ip),
        e: "Sieć " + n2ip(r.net) + "/" + p + " ma " + r.size + " adresów, więc broadcast = " + n2ip(r.bc) + "." }; },
    first: function () { var p = rnd(17, 29), ip = randIp(), r = info(ip2n(ip), p);
      return { q: "Jaki jest pierwszy użyteczny adres hosta w sieci zawierającej " + ip + "/" + p + "?", c: [n2ip(r.first)], w: uniq(r.first, [r.net, r.first + 1, r.first + r.size, r.first - r.size, r.last], n2ip),
        e: "Adres sieci " + n2ip(r.net) + " + 1 = " + n2ip(r.first) + "." }; },
    last: function () { var p = rnd(17, 29), ip = randIp(), r = info(ip2n(ip), p);
      return { q: "Jaki jest ostatni użyteczny adres hosta w sieci zawierającej " + ip + "/" + p + "?", c: [n2ip(r.last)], w: uniq(r.last, [r.bc, r.last - 1, r.last + r.size, r.last - r.size, r.first], n2ip),
        e: "Broadcast " + n2ip(r.bc) + " − 1 = " + n2ip(r.last) + "." }; },
    cnt: function () { var p = rnd(16, 30), h = 32 - p, c = Math.pow(2, h) - 2;
      return { q: "Ile użytecznych adresów hostów jest w sieci /" + p + "?", c: [String(c)], w: uniq(c, [c + 2, 2 * c + 2, c / 2 - 0.0 + 0, Math.pow(2, h + 1) - 2, Math.pow(2, h - 1) - 2, c + 1].filter(function (v) { return v > 0 && v === Math.floor(v); }), String),
        e: "2^" + h + " − 2 = " + c + "." }; },
    mask: function () { var p = rnd(17, 30);
      return { q: "Jaka jest maska dziesiętna dla prefiksu /" + p + "?", c: [n2ip(maskN(p))], w: uniq(p, [p - 1, p + 1, p - 2, p + 2, p - 3], function (v) { return n2ip(maskN(v)); }),
        e: "/" + p + " = " + p + " jedynek = " + n2ip(maskN(p)) + "." }; },
    pref: function () { var p = rnd(17, 29), r = info(0, p), n = rnd(Math.floor(r.hosts / 2) + 1, r.hosts);
      return { q: "Potrzeba zaadresować " + n + " hostów w jednej podsieci. Który najdłuższy prefiks (największa liczba bitów sieci) to umożliwia?", c: ["/" + p], w: uniq(p, [p - 1, p + 1, p - 2, p + 2], function (v) { return "/" + v; }),
        e: "/" + p + " daje 2^" + (32 - p) + " − 2 = " + r.hosts + " ≥ " + n + ", a /" + (p + 1) + " dałoby " + (r.size / 2 - 2) + " (za mało)." }; },
    same: function () { var p = rnd(20, 28), ip = randIp(), r = info(ip2n(ip), p), same = Math.random() < 0.5, ip2;
      if (same) ip2 = n2ip(r.first + rnd(0, r.hosts - 1)); else ip2 = n2ip(r.net + r.size + rnd(1, r.hosts));
      var r2 = info(ip2n(ip2), p), yes = r2.net === r.net;
      return { q: "Czy hosty " + ip + " i " + ip2 + " (maska /" + p + ") są w tej samej sieci?", c: [yes ? "Tak" : "Nie"], w: [yes ? "Nie" : "Tak"],
        e: ip + " → sieć " + n2ip(r.net) + "; " + ip2 + " → sieć " + n2ip(r2.net) + "." }; },
    cls: function () { var a = rnd(1, 239); if (a === 127) a = 126; var c = a <= 126 ? "A" : a <= 191 ? "B" : a <= 223 ? "C" : "D (multicast)";
      return { q: "Do której klasy adresowej należy adres " + a + "." + rnd(0, 255) + "." + rnd(0, 255) + "." + rnd(1, 254) + "?", c: [c], w: ["A", "B", "C", "D (multicast)"].filter(function (v) { return v !== c; }),
        e: "Klasa A: 1–126, B: 128–191, C: 192–223, D: 224–239 (pierwszy oktet)." }; }
  };
  function genMenu() {
    go("Zadania z adresacji IP", function (root) {
      root.appendChild($('<div class="card">Pytania generowane losowo – za każdym razem inne liczby. Przed liczeniem warto przepisać sobie z ściągi rozmiary bloków (/24=256, /25=128, /26=64, /27=32, /28=16, /29=8, /30=4).</div>'));
      var defs = [["🔀 Mieszane (15 zadań)", null], ["Adres sieci", "net"], ["Adres broadcast", "bc"], ["Pierwszy / ostatni host", ["first", "last"]], ["Liczba hostów i maski", ["cnt", "mask", "pref"]], ["Ta sama sieć? Klasa adresu", ["same", "cls"]]];
      defs.forEach(function (d) {
        var b = $('<button class="btn' + (d[1] === null ? " pri" : "") + '"><b>' + d[0] + '</b></button>');
        b.onclick = function () {
          var keys = d[1] === null ? Object.keys(GEN) : [].concat(d[1]), list = [];
          for (var n = 0; n < 15; n++) { var k = keys[rnd(0, keys.length - 1)], g = GEN[k](); list.push({ t: "gen", q: g.q, c: g.c, w: g.w, e: g.e, id: "gen" }); }
          startQuiz(list, { title: d[0].replace(/^[^\wĄ-ż]+/, "") });
        };
        root.appendChild(b);
      });
    });
  }

  /* ---------- fiszki ---------- */
  var WY = [
    { q: "L1. Które pary i jakie kolory przewodów są używane w sieci 10Base-T? Czy reszta kabli jest obcinana, czy podłączona?",
      a: "Używane są 2 pary (T568B):\n• para nr 2 (biało-pomarańczowy / pomarańczowy) – piny 1 i 2 (nadawanie),\n• para nr 3 (biało-zielony / zielony) – piny 3 i 6 (odbiór).\nPozostałe pary NIE są obcinane, tylko podłączone: para nr 1 (biało-niebieski/niebieski) – piny 4 i 5; para nr 4 (biało-brązowy/brązowy) – piny 7 i 8. Wg PN-EN 50174 każdy przewód, nawet nieużywany, ma mieć zakończenie; 1000BASE-T używa wszystkich 4 par." },
    { q: "L2. Jak za pomocą polecenia ipconfig sprawdzić adresy MAC kart sieciowych?",
      a: "W wierszu polecenia: ipconfig /all\nDla każdej karty wyświetli się „Adres fizyczny” (Physical Address) – 6 bajtów szesnastkowo, np. 00-1A-2B-3C-4D-5E. Samo ipconfig (bez /all) MAC nie pokazuje. Alternatywa: getmac." },
    { q: "L3. Jak oceniany jest patchcord wykonany przez grupę?",
      a: "Ocenia się staranność i zgodność z regułami oraz test testerem: sekwencja T568B na obu końcach (kabel prosty), rozplot par max 13 mm, płaszcz zaciśnięty we wtyku RJ-45, poprawna ciągłość i kolejność żył 1-1 … 8-8." },
    { q: "C1. Co to jest okablowanie strukturalne i jakimi nazwami opisać jego możliwe części?",
      a: "Całość PASYWNYCH elementów sieci (nie ingerują w sygnał, tylko go transportują), zgodna z normami (EIA/TIA-568, ISO/IEC 11801, PN-EN 50173/50174). Składa się z:\n• okablowania poziomego (gniazdka – punkt dystrybucyjny piętra),\n• okablowania pionowego (łączy kondygnacje),\n• okablowania kampusowego (łączy budynki),\n• punktów rozdzielczych: PCS, CPD, BPD, KPD, LPD (metoda angielska: główny MDF i pośredni IDF),\n• punktów abonenckich (gniazda RJ-45, 1 punkt z 2 portami na 10 m²),\n• patchcordów / połączeń systemowych." },
    { q: "C2. Jaki maksymalny zasięg należy projektować dla sieci 10GigabitEthernet?",
      a: "Na skrętce 55 m (wg skryptu C-01, zarówno poziomo, jak i pionowo). Dla porównania: Fast/GigabitEthernet 100 m (90 m + patchcordy 2×5 m), pion 90 m; światłowód w pionie do 2000 m." },
    { q: "C3. Jaką minimalną długość może mieć patchcord i z czego to wynika?",
      a: "W wyjściówce podano 1 m. Powód: w bardzo krótkim kablu odbicia (return loss) i przesłuchy (NEXT) na złączach RJ-45 obu końców nie zdążają się wytłumić i nakładają się, powodując błędy transmisji; ponadto trudno zachować promień gięcia 4D i luz kabla.\n(Uwaga: tej wartości nie ma wprost w materiałach – sprawdź to u prowadzącego.)" },
    { tag: "wyjściówka 2.2", q: "2.2 L1. W jakich jednostkach podajemy wysokość szaf krosowniczych?",
      a: "W jednostkach rack, U (rack unit). 1U = 4,445 cm (1 ¾\"). Pojemność szafy to wielokrotność U (np. 42U), urządzenia zajmują 1U, 2U itd. Szerokość montażowa to 19\" (EIA-310-D)." },
    { tag: "wyjściówka 2.2", q: "2.2 L2. Co to jest i gdzie stosujemy KVM?",
      a: "KVM (Keyboard Video Mouse) – przełącznik pozwalający obsługiwać dwa lub więcej komputerów z jednego zestawu klawiatury, myszy i monitora. Stosowany w szafach rack/krosowniczych i serwerowniach; w wersji rack zajmuje zwykle 1U, są też wersje desktop." },
    { tag: "wyjściówka 2.2", q: "2.2 L3. W jakiej topologii sieci występuje T-connector? Wymień inne elementy tej sieci.",
      a: "W topologii magistrali (bus) – Ethernet na kablu koncentrycznym 10BASE2 (do 185 m, 10 Mb/s). Elementy: kabel koncentryczny (RG-58), T-connectory (trójniki BNC), złącza BNC, terminatory na obu końcach magistrali, karty sieciowe z gniazdem BNC, ewentualnie repeatery.\n(Uzupełnienie – brak w skryptach.)" },
    { tag: "wyjściówka 2.2", q: "2.2 C1. Z jaką strukturą sieci kojarzy się wysyłanie pakietów różnymi drogami?",
      a: "Z siecią WAN o topologii siatki (niepełnej) z routerami w węzłach: wiadomość jest dzielona na pakiety, a każdy dociera do adresata drogą optymalną w danej chwili (w przeciwieństwie do sieci telefonicznej, gdzie centrale zestawiają jedno łącze na czas rozmowy)." },
    { tag: "wyjściówka 2.2", q: "2.2 C2. Które urządzenia sieci lokalnej decydują o wyborze drogi pakietu do adresata?",
      a: "Routery – wybór trasy między sieciami (warstwa 3, adresy IP).\nPrzełączniki – wybór portu na podstawie tablicy adresów MAC (warstwa 2); nieznany adres → ramka na wszystkie porty poza źródłowym.\nKoncentrator nie decyduje – powtarza sygnał na wszystkie porty (warstwa 1)." },
    { tag: "wyjściówka 2.2", q: "2.2 C3. Co to jest repeater i w jakich strukturach sieci go spotykamy, a gdzie nie występuje?",
      a: "Repeater (wzmacniak) – urządzenie warstwy fizycznej, które wzmacnia i regeneruje sygnał, wydłużając segment ponad limit długości (np. 185 m dla 10BASE2, 100 m dla skrętki). Nie analizuje ramek ani adresów.\nSpotykany: w magistrali na koncentryku, w długich łączach, hub to wieloportowy repeater.\nNie występuje: w sieciach przełączanych i routowanych (switch i router same regenerują sygnał, dzielą sieć na segmenty), np. w nowoczesnych LAN i w WAN z routerami.\n(Uzupełnienie – brak w skryptach.)" }
  ];
  function flash() {
    var cards = WY.map(function (w) { return { q: w.q, a: w.a, tag: w.tag || "wyjściówka 1.1" }; });
    shuffle(Q).forEach(function (x) { cards.push({ q: x.q, a: x.c.join("; ") + (x.e ? "\n\n" + x.e : ""), img: x.img, tag: TOPICS[x.t].name }); });
    var i = 0, open = false;
    go("Fiszki", function (root) {
      var c = cards[i];
      root.appendChild($('<div class="meta"><span>' + (i + 1) + " / " + cards.length + '</span><span class="tag">' + esc(c.tag) + '</span></div>'));
      var f = $('<div class="card fc"><div><b>' + esc(c.q) + '</b></div></div>');
      if (c.img) { var im = $('<img class="qimg" src="img/' + c.img + '.jpg" alt="">'); zoomable(im); f.insertBefore(im, f.firstChild); }
      if (open) f.appendChild($('<div class="a">' + esc(c.a) + '</div>')); else f.appendChild($('<div class="meta center">dotknij, aby zobaczyć odpowiedź</div>'));
      f.onclick = function (e) { if (e.target.tagName === "IMG") return; open = !open; show(); };
      root.appendChild(f);
      var r = $('<div class="row"></div>'), p = $('<button class="btn"><b>← Poprzednia</b></button>'), n = $('<button class="btn pri"><b>Następna →</b></button>');
      p.onclick = function () { i = (i - 1 + cards.length) % cards.length; open = false; rerender(); };
      n.onclick = function () { i = (i + 1) % cards.length; open = false; rerender(); };
      r.appendChild(p); r.appendChild(n); root.appendChild(r);
    });
    function rerender() { show(); }
  }

  /* ---------- ściąga ---------- */
  function cheat() {
    go("Ściąga", function (root) {
      root.innerHTML =
        '<div class="card"><h2>Kolory – T568A / T568B</h2><table><tr><th>Pin</th><th>T568A</th><th>T568B</th></tr>' +
        [["1", "biało-zielony", "#9be29b", "biało-pomarańczowy", "#ffc890"], ["2", "zielony", "#2e9e3a", "pomarańczowy", "#f28c1f"], ["3", "biało-pomarańczowy", "#ffc890", "biało-zielony", "#9be29b"],
         ["4", "niebieski", "#2a52d9", "niebieski", "#2a52d9"], ["5", "biało-niebieski", "#a9b9f5", "biało-niebieski", "#a9b9f5"], ["6", "pomarańczowy", "#f28c1f", "zielony", "#2e9e3a"],
         ["7", "biało-brązowy", "#cdb09a", "biało-brązowy", "#cdb09a"], ["8", "brązowy", "#7a4a25", "brązowy", "#7a4a25"]].map(function (r) {
          return "<tr><td>" + r[0] + '</td><td><span class="sw" style="background:' + r[2] + '"></span>' + r[1] + '</td><td><span class="sw" style="background:' + r[4] + '"></span>' + r[3] + "</td></tr>"; }).join("") +
        '</table><p>Prosty: A–A lub B–B (PC ↔ switch). Krosowany: A–B (PC ↔ PC, hub ↔ hub). 10Base-T: piny 1,2 i 3,6.</p><img class="qimg" src="img/lab-t568b.jpg" alt=""></div>' +

        '<div class="card"><h2>Klasy IPv4</h2><table><tr><th>Klasa</th><th>Bity</th><th>1. oktet</th><th>Bity sieci</th><th>Maska</th></tr>' +
        '<tr><td>A</td><td>0</td><td>1–126</td><td>8</td><td>255.0.0.0</td></tr><tr><td>B</td><td>10</td><td>128–191</td><td>16</td><td>255.255.0.0</td></tr>' +
        '<tr><td>C</td><td>110</td><td>192–223</td><td>24</td><td>255.255.255.0</td></tr><tr><td>D</td><td>1110</td><td>224–239</td><td>multicast</td><td>–</td></tr></table>' +
        '<p>Prywatne: 10.0.0.0/8 · 172.16.0.0–172.31.255.255 · 192.168.0.0/16. Użyteczne hosty: 2ⁿ − 2.</p></div>' +

        '<div class="card"><h2>Prefiksy i maski</h2><table><tr><th>/</th><th>Maska</th><th>Adresów</th><th>Hostów</th></tr>' +
        [[22, 1024], [23, 512], [24, 256], [25, 128], [26, 64], [27, 32], [28, 16], [29, 8], [30, 4]].map(function (r) {
          return "<tr><td>/" + r[0] + "</td><td>" + n2ip(maskN(r[0])) + "</td><td>" + r[1] + "</td><td>" + (r[1] - 2) + "</td></tr>"; }).join("") + '</table></div>' +

        '<div class="card"><h2>Długości i limity</h2><table>' +
        "<tr><td>Tor poziomy (Fast/GigE)</td><td>100 m = 90 + 2×5</td></tr><tr><td>10GbE na skrętce</td><td>55 m</td></tr><tr><td>Pion skrętka</td><td>90 m</td></tr><tr><td>Pion światłowód</td><td>2000 m</td></tr>" +
        "<tr><td>10BASE2 / 10BASE5</td><td>185 m / 500 m</td></tr><tr><td>Rozplot we wtyku</td><td>13 mm</td></tr><tr><td>Promień gięcia UTP / STP / światłowód</td><td>4D / 6D / 20D</td></tr>" +
        "<tr><td>Punkt abonencki</td><td>1 na 10 m², 2 porty</td></tr><tr><td>Pomieszczenie punktu dyst.</td><td>220×300×260 cm, drzwi 90×200</td></tr>" +
        "<tr><td>Od zasilania / silników / w metalowym korytku</td><td>30,5 cm / 1,02 m / 6,4 cm</td></tr></table></div>" +

        '<div class="card"><h2>Klasy i kategorie</h2><table><tr><th>Klasa</th><th>Kat.</th><th>MHz</th></tr><tr><td>D</td><td>5</td><td>100</td></tr><tr><td>E</td><td>6</td><td>250</td></tr><tr><td>EA</td><td>6A</td><td>500</td></tr><tr><td>F</td><td>7</td><td>600</td></tr><tr><td>FA</td><td>7A</td><td>1000</td></tr><tr><td>I / II</td><td>8.1 / 8.2</td><td>2000</td></tr></table></div>' +

        '<div class="card"><h2>Punkty dystrybucyjne</h2><p>PCS – punkt centralny sieci · CPD – centralny · BPD – budynkowy · KPD – kondygnacyjny · LPD – lokalny.<br>Metoda angielska: MDF (główny) i IDF (pośredni).</p></div>' +

        '<div class="card"><h2>Rack i urządzenia</h2><p>1U = 4,445 cm (1 ¾"), szerokość 19" (EIA-310-D). KVM – 1 klawiatura/mysz/monitor na wiele komputerów (zwykle 1U). Serwerownia: ok. 45% wilgotności, 20 °C, UPS, kolokacja.<br>Hub – warstwa 1, jedna domena kolizyjna, bit po bicie. Switch – warstwa 2, tablica MAC, domena kolizyjna = port, dupleks. Repeater – regeneruje sygnał (warstwa 1). Router – trasy IP (warstwa 3). Patch panel – element pasywny (12/16/24/48 × 8P8C). T-connector + terminatory = magistrala 10BASE2.</p></div>' +

        '<div class="card"><h2>IPv6</h2><p>128 bitów, 8 grup hex po 16 bitów. ::1/128 loopback · ::/128 zerowy · fe80::/10 link-local · ff00::/8 multicast · ::ffff:0:0/96 mapowanie IPv4. Typy: unicast, anycast, multicast.</p></div>' +

        '<div class="card"><h2>Polecenia</h2><p>ping (echo sonarowe) · ipconfig /all (adres fizyczny = MAC) · getmac · net view nazwa (błąd 53 = niedostępny) · „Upłynął limit czasu żądania”.</p></div>';
      root.querySelectorAll("img").forEach(zoomable);
    });
  }

  /* ---------- kalkulator podsieci ---------- */
  function calc() {
    go("Kalkulator podsieci", function (root) {
      root.innerHTML = '<div class="card"><label>Adres IP</label><input id="ci" inputmode="decimal" value="192.168.1.77"><br><br><label>Prefiks (/)</label><input id="cp" type="number" min="1" max="32" value="26"><br><br>' +
        '<label>Podziel na podsieci o prefiksie (opcjonalnie)</label><input id="cs" type="number" min="1" max="32" placeholder="np. 28"></div><div id="cr"></div>';
      var ci = document.getElementById("ci"), cp = document.getElementById("cp"), cs = document.getElementById("cs"), cr = document.getElementById("cr");
      function run() {
        var ip = ci.value.trim(), p = +cp.value, s = +cs.value;
        if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(ip) || ip.split(".").some(function (v) { return +v > 255; }) || !(p >= 1 && p <= 32)) { cr.innerHTML = '<div class="card">Wpisz poprawny adres IPv4 i prefiks 1–32.</div>'; return; }
        var r = info(ip2n(ip), p), h = '<div class="card"><table>' +
          "<tr><td>Maska</td><td>" + n2ip(r.mask) + "</td></tr><tr><td>Adres sieci</td><td>" + n2ip(r.net) + "/" + p + "</td></tr><tr><td>Broadcast</td><td>" + n2ip(r.bc) + "</td></tr>" +
          "<tr><td>Zakres hostów</td><td>" + (p >= 31 ? "–" : n2ip(r.first) + " – " + n2ip(r.last)) + "</td></tr><tr><td>Liczba hostów</td><td>" + (p >= 31 ? "–" : r.hosts) + "</td></tr></table></div>";
        if (s > p && s <= 32) {
          var cnt = Math.pow(2, s - p), sz = Math.pow(2, 32 - s), rows = "";
          for (var k = 0; k < Math.min(cnt, 64); k++) { var n = r.net + k * sz; rows += "<tr><td>" + n2ip(n) + "/" + s + "</td><td>" + (s >= 31 ? "–" : n2ip(n + 1) + " – " + n2ip(n + sz - 2)) + "</td><td>" + n2ip(n + sz - 1) + "</td></tr>"; }
          h += '<div class="card"><b>' + cnt + " podsieci /" + s + ", po " + (s >= 31 ? "–" : sz - 2) + ' hostów</b><table><tr><th>Sieć</th><th>Hosty</th><th>Broadcast</th></tr>' + rows + "</table>" + (cnt > 64 ? "<small>pokazano pierwsze 64</small>" : "") + "</div>";
        }
        cr.innerHTML = h;
      }
      [ci, cp, cs].forEach(function (e) { e.oninput = run; }); run();
    });
  }

  go("Sieci komputerowe", home);
})();
