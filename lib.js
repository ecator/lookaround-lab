/* LookaroundLab - 正则断言学习应用(无外部依赖) */
(function (root) {
  'use strict';
  var R = String.raw;

  /* ========== 课程数据(与语言无关的部分;文本见 locales.js) ========== */
  var LESSONS = [];
  function lesson(o) { LESSONS.push(o); }

  lesson({
    id: "l1", emoji: "📍", level: 1,
    demo: { pattern: R`\bcat\b`, flags: "g", text: "cat concat cats cat.\nthe cat sat" },
    exercises: [
      { id: "e1-1", flags: "g",
        cases: [{ text: "cat concat cats cat", matches: ["cat","cat"] }, { text: "a cat, the-cat; bobcat", matches: ["cat","cat"] }],
        solution: R`\bcat\b`, need: ["\\b"] },
      { id: "e1-2", flags: "gm",
        cases: [{ text: "123\nabc\n4567\n12a\n8", matches: ["123","4567","8"] }],
        solution: R`^\d+$`, need: ["^","$"] },
      { id: "e1-3", flags: "g",
        cases: [{ text: "concat cat category", matches: ["cat"] }, { text: "cat bobcat", matches: ["cat"] }],
        solution: R`\Bcat`, need: ["\\B"] }
    ]
  });

  lesson({
    id: "l2", emoji: "👀", level: 1,
    demo: { pattern: R`\d+(?=元)`, flags: "g", text: "苹果 5元, 梨 8个, 西瓜 12元, 葡萄 30斤" },
    exercises: [
      { id: "e2-1", flags: "g",
        cases: [{ text: "苹果 5元, 梨 8个, 瓜 12元", matches: ["5","12"] }, { text: "共 100元 外加 7块", matches: ["100"] }],
        solution: R`\d+(?=元)`, need: ["(?="] },
      { id: "e2-2", flags: "g",
        cases: [{ text: "Java 和 JavaScript 不一样", matches: ["Java"] }, { text: "Java Java JavaScript JavaScript", matches: ["Java","Java"] }],
        solution: R`Java(?=Script)`, need: ["(?="] }
    ]
  });

  lesson({
    id: "l3", emoji: "🚫", level: 1,
    demo: { pattern: R`foo(?!bar)`, flags: "g", text: "foobar foobaz foo" },
    exercises: [
      { id: "e3-1", flags: "g",
        cases: [{ text: "foobar foobaz foo", matches: ["foo","foo"] }, { text: "foobarfoobar", matches: [] }],
        solution: R`foo(?!bar)`, need: ["(?!"] },
      { id: "e3-2", flags: "gm",
        cases: [{ text: "a.txt\nb.exe\nc.md\nexe", matches: ["a.txt","c.md","exe"] }],
        solution: R`^(?!.*\.exe$).+$`, need: ["(?!"] }
    ]
  });

  lesson({
    id: "l4", emoji: "⏪", level: 2,
    demo: { pattern: R`(?<=\$)\d+(\.\d+)?`, flags: "g", text: "价格:$30, 数量:5, 折扣价 $4.5" },
    exercises: [
      { id: "e4-1", flags: "g",
        cases: [{ text: "价格:$30, 数量:5, 折扣价 $4.5", matches: ["30","4.5"] }, { text: "免费 0, 贵的 $1999", matches: ["1999"] }],
        solution: R`(?<=\$)\d+(\.\d+)?`, need: ["(?<="] },
      { id: "e4-2", flags: "g",
        cases: [{ text: "#js and #regex rocks", matches: ["js","regex"] }, { text: "no tag# here #x1", matches: ["x1"] }],
        solution: R`(?<=#)\w+`, need: ["(?<="] }
    ]
  });

  lesson({
    id: "l5", emoji: "🙅", level: 2,
    demo: { pattern: R`(?<!\$)\d+`, flags: "g", text: "$30 and 45, $7 and 8" },
    exercises: [
      { id: "e5-1", flags: "g",
        cases: [{ text: "$30 and 45, $7 and 8", matches: ["45","8"] }, { text: "$100 99 $5", matches: ["99"] }],
        solution: R`(?<![$\d])\d+`, need: ["(?<!"] },
      { id: "e5-2", flags: "g",
        cases: [{ text: "javascript, typescript, script", matches: ["script","script"] }],
        solution: R`(?<!java)script`, need: ["(?<!"] }
    ]
  });

  lesson({
    id: "l6", emoji: "🧩", level: 2,
    demo: { pattern: R`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$`, flags: "gm", text: "Passw0rdOK\nshort1A\nalllowercase1\nGoodPass99" },
    exercises: [
      { id: "e6-1", flags: "gm",
        cases: [{ text: "Passw0rdOK\nshort1A\nalllowercase1\nNOLOWER123\nGoodPass99", matches: ["Passw0rdOK","GoodPass99"] }],
        solution: R`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$`, need: ["(?="] },
      { id: "e6-2", flags: "gmi",
        cases: [{ text: "abc1\n1abc\nab\nabcdefghijk\nuser_1\nZed99", matches: ["abc1","Zed99"] }],
        solution: R`^(?!\d)[a-z\d]{4,8}$`, need: ["(?!"] },
      { id: "e6-3", flags: "g",
        cases: [{ text: "apple banana pea tree sea", matches: ["apple","pea","sea"] }],
        solution: R`\b(?=\w*a)(?=\w*e)\w+\b`, need: ["(?="] }
    ]
  });

  lesson({
    id: "l7", emoji: "✂️", level: 3,
    demo: { pattern: R`\B(?=(\d{3})+(?!\d))`, flags: "g", text: "1234567 999 1000 12345678" },
    exercises: [
      { id: "e7-1", flags: "g", replace: ",",
        cases: [{ text: "1234567", out: "1,234,567" }, { text: "999", out: "999" }, { text: "1000", out: "1,000" }, { text: "12345678", out: "12,345,678" }],
        solution: R`\B(?=(\d{3})+(?!\d))`, need: ["(?="] },
      { id: "e7-2", flags: "g", replace: "_",
        cases: [{ text: "helloWorldFoo", out: "hello_World_Foo" }, { text: "abc", out: "abc" }, { text: "aB", out: "a_B" }],
        solution: R`(?<=[a-z])(?=[A-Z])`, need: ["(?<=","(?="] },
      { id: "e7-3", flags: "g", replace: "|",
        cases: [{ text: "book", out: "bo|ok" }, { text: "abc", out: "abc" }, { text: "aabb", out: "a|ab|b" }],
        solution: R`(?<=(.))(?=\1)`, need: ["(?<=","(?="] }
    ]
  });

  lesson({
    id: "l8", emoji: "📏", level: 3,
    demo: { pattern: R`(?<=price:\s*)\d+`, flags: "g", text: "price:  30, price:5, qty: 9" },
    exercises: [
      { id: "e8-1", flags: "g",
        cases: [{ text: "price:  30, price:5, qty: 9", matches: ["30","5"] }, { text: "price:    100 cost: 7", matches: ["100"] }],
        solution: R`(?<=price:\s*)\d+`, need: ["(?<="] },
      { id: "e8-2", flags: "g",
        cases: [{ text: "say \"hi\" and \"bye\" now", matches: ["hi","bye"] }, { text: "\"a\" b c\" d", matches: ["a"] }],
        solution: R`(?<=")\w+(?=")`, need: ["(?<=","(?="] },
      { id: "e8-3", flags: "g",
        cases: [{ text: "USD 30, EUR50, ¥ 8, 99", matches: ["30","50","8"] }],
        solution: R`(?<=(USD|EUR|¥)\s*)\d+`, need: ["(?<="] }
    ]
  });

  lesson({
    id: "l9", emoji: "🏆", level: 3,
    demo: { pattern: R`(?<=\[).+?(?=\])`, flags: "g", text: "[重点] 这是 [示例] 文本 [x]" },
    exercises: [
      { id: "e9-1", flags: "g",
        cases: [{ text: "[重点] 这是 [示例] 文本 [x]", matches: ["重点","示例","x"] }, { text: "[a][b]", matches: ["a","b"] }],
        solution: R`(?<=\[).+?(?=\])`, need: ["(?<=","(?="] },
      { id: "e9-2", flags: "gm",
        cases: [{ text: "error: disk\nerror ignore me\nall good\nfatal error here", matches: ["error: disk","fatal error here"] }],
        solution: R`^(?=.*error)(?!.*ignore).*$`, need: ["(?=","(?!"] },
      { id: "e9-3", flags: "g", replace: "****",
        cases: [{ text: "13812345678", out: "138****5678" }, { text: "电话 15900001111 谢谢", out: "电话 159****1111 谢谢" }],
        solution: R`(?<=\b\d{3})\d{4}(?=\d{4}\b)`, need: ["(?<=","(?="] }
    ]
  });

  var TOTAL_EX = LESSONS.reduce(function (n, l) { return n + l.exercises.length; }, 0);


  /* ========== 核心逻辑 ========== */
  var I18N = (typeof window === 'undefined' && typeof require === 'function') ? require('./locales.js') : root.LL_I18N;
  var t = I18N.t;

  function buildRegex(pattern, flags) {
    flags = flags || '';
    if (flags.indexOf('g') < 0) flags += 'g';
    try { return { re: new RegExp(pattern, flags) }; }
    catch (e) { return { error: e.message }; }
  }

  function allMatches(re, text) {
    var out = [], m, it = text.matchAll(re);
    for (m = it.next(); !m.done; m = it.next()) {
      out.push({ index: m.value.index, text: m.value[0] });
      if (out.length > 5000) break;
    }
    return out;
  }

  /* 返回 { ok, results, err: {key, vars} };错误文本由界面按当前语言翻译 */
  function checkExercise(ex, pattern) {
    if (!pattern) return { ok: false, err: { key: 'errEmpty' } };
    var b = buildRegex(pattern, ex.flags);
    if (b.error) return { ok: false, err: { key: 'errSyntax', vars: { e: b.error } } };
    var i, need = ex.need || [];
    for (i = 0; i < need.length; i++) {
      if (pattern.indexOf(need[i]) < 0) return { ok: false, err: { key: 'errNeed', vars: { n: need[i] } } };
    }
    var results = ex.cases.map(function (c) {
      if (ex.replace !== undefined) {
        var got = c.text.replace(b.re, ex.replace);
        return { pass: got === c.out, got: got };
      }
      var g = allMatches(b.re, c.text).map(function (x) { return x.text; });
      return { pass: JSON.stringify(g) === JSON.stringify(c.matches), got: g };
    });
    var ok = results.every(function (r) { return r.pass; });
    return { ok: ok, results: results, err: ok ? null : { key: 'errFail' } };
  }

  var KEY = 'lookaroundlab.progress.v1';
  function defaultState() { return { done: {}, read: {}, answers: {}, tries: {} }; }
  function loadState() {
    try {
      var s = JSON.parse(root.localStorage.getItem(KEY));
      if (s && typeof s === 'object') {
        var d = defaultState();
        for (var k in d) if (!s[k]) s[k] = d[k];
        return s;
      }
    } catch (e) { /* 忽略 */ }
    return defaultState();
  }
  function saveState(s) { try { root.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* 忽略 */ } }

  function rankFor(p) {
    var i = p >= 100 ? 4 : p >= 75 ? 3 : p >= 50 ? 2 : p >= 25 ? 1 : 0;
    return t('ranks')[i];
  }

  var api = { LESSONS: LESSONS, TOTAL_EX: TOTAL_EX, buildRegex: buildRegex, allMatches: allMatches, checkExercise: checkExercise, rankFor: rankFor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof document === 'undefined') return;

  /* ========== UI ========== */
  var state = loadState();
  var currentId = 'home';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function chips(arr) {
    if (!arr.length) return '<span class="chip none">' + esc(t('noMatch')) + '</span>';
    return '<div class="chips">' + arr.map(function (x) { return '<span class="chip">' + esc(x === '' ? t('empty') : x) + '</span>'; }).join('') + '</div>';
  }
  function errText(err) { return esc(t(err.key, err.vars)); }
  function LT(id) { return I18N.lessonText(id); }

  function doneCount(l) { return l.exercises.filter(function (e) { return state.done[e.id]; }).length; }
  function totalDone() { return Object.keys(state.done).filter(function (k) { return state.done[k]; }).length; }

  function updateTop() {
    var p = Math.round(totalDone() / TOTAL_EX * 100);
    $('#barFill').style.width = p + '%';
    $('#pct').textContent = p + '%';
    $('#rank').textContent = rankFor(p);
  }

  function renderNav(active) {
    var h = '<h4>' + esc(t('navStart')) + '</h4><a class="nav-item' + (active === 'home' ? ' active' : '') + '" href="#/">' + t('navHome') + '</a>';
    var lv = 0;
    LESSONS.forEach(function (l, i) {
      if (l.level !== lv) { lv = l.level; h += '<h4>' + esc(t('levelHeads')[lv]) + '</h4>'; }
      var d = doneCount(l), full = d === l.exercises.length;
      h += '<a class="nav-item' + (active === l.id ? ' active' : '') + '" href="#/lesson/' + l.id + '">' + l.emoji + ' ' + (i + 1) + '. ' + esc(LT(l.id).short) +
        '<span class="st' + (full ? ' full' : '') + '">' + (full ? '✔' : d + '/' + l.exercises.length) + '</span></a>';
    });
    h += '<h4>' + esc(t('navTools')) + '</h4><a class="nav-item' + (active === 'lab' ? ' active' : '') + '" href="#/lab">' + t('navLab') + '</a>' +
      '<a class="nav-item' + (active === 'cheat' ? ' active' : '') + '" href="#/cheat">' + t('navCheat') + '</a>' +
      '<h4>' + esc(t('navSettings')) + '</h4><a class="nav-item" href="#/" id="resetBtn">' + t('navReset') + '</a>';
    $('#sidebar').innerHTML = h;
    $('#resetBtn').onclick = function (e) {
      e.preventDefault();
      if (confirm(t('resetConfirm'))) { state = defaultState(); saveState(state); route(); }
    };
  }

  /* 高亮 */
  function highlightHTML(text, ms) {
    var h = '', pos = 0;
    ms.forEach(function (m) {
      if (m.index < pos) return;
      h += esc(text.slice(pos, m.index));
      h += m.text.length ? '<mark>' + esc(m.text) + '</mark>' : '<span class="zw"></span>';
      pos = m.index + m.text.length;
    });
    return h + esc(text.slice(pos));
  }

  function playground(container, init) {
    container.innerHTML =
      '<div class="re-row"><span class="slash">/</span><input type="text" class="pat" spellcheck="false" aria-label="' + esc(t('regexLabel')) + '">' +
      '<span class="slash">/</span><input type="text" class="flg" spellcheck="false" aria-label="' + esc(t('flagsLabel')) + '" maxlength="8"></div>' +
      '<textarea class="txt" spellcheck="false" aria-label="' + esc(t('textLabel')) + '"></textarea>' +
      '<div class="hl"></div><div class="info"></div><div class="err"></div>';
    var pat = $('.pat', container), flg = $('.flg', container), txt = $('.txt', container);
    pat.value = init.pattern; flg.value = init.flags; txt.value = init.text;
    function upd() {
      var b = buildRegex(pat.value, flg.value), hl = $('.hl', container), info = $('.info', container), err = $('.err', container);
      if (b.error || !pat.value) {
        err.textContent = b.error ? b.error : '';
        hl.textContent = txt.value; info.textContent = '';
        return;
      }
      err.textContent = '';
      var ms = allMatches(b.re, txt.value), zw = ms.filter(function (m) { return !m.text.length; }).length;
      hl.innerHTML = highlightHTML(txt.value, ms);
      info.textContent = t('matchCount', { n: ms.length }) + (zw ? t('zwNote', { z: zw }) : '') + t('sep') +
        ms.slice(0, 12).map(function (m) { return m.text === '' ? '∅' : '「' + m.text.replace(/\n/g, '↵') + '」'; }).join(' ') + (ms.length > 12 ? ' …' : '');
    }
    [pat, flg, txt].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  }

  function exerciseCard(lessonId, ex, idx) {
    var el = document.createElement('div'), X = LT(lessonId).ex[ex.id];
    var isReplace = ex.replace !== undefined;
    function casesHTML(results) {
      return '<div class="cases">' + ex.cases.map(function (c, i) {
        var r = results && results[i], cls = r ? (r.pass ? ' pass' : ' fail') : '';
        var h = '<div class="case' + cls + '"><div class="lbl">' + esc(t('inputText')) + '</div><pre>' + esc(c.text) + '</pre>';
        if (isReplace) {
          h += '<div class="lbl">' + esc(t('expOut')) + '</div><pre>' + esc(c.out) + '</pre>';
          if (r && !r.pass) h += '<div class="lbl">' + esc(t('gotOut')) + '</div><pre>' + esc(r.got) + '</pre>';
        } else {
          h += '<div class="lbl">' + esc(t('expMatch')) + '</div>' + chips(c.matches);
          if (r && !r.pass) h += '<div class="lbl">' + esc(t('gotMatch')) + '</div>' + chips(r.got);
        }
        return h + '</div>';
      }).join('') + '</div>';
    }
    function draw(results, msg, ok) {
      var done = !!state.done[ex.id], tries = state.tries[ex.id] || 0;
      el.className = 'ex' + (done ? ' done' : '');
      el.innerHTML =
        '<div class="ex-head">' + esc(t('exHead', { i: idx, title: X.title })) + '<span class="mark">' + (done ? esc(t('exDone')) : '') + '</span></div>' +
        '<p>' + X.desc + '</p><p class="info">' + esc(t('flagsLine')) + '<code>' + esc(ex.flags) + '</code>' + (isReplace ? esc(t('replaceLine')) + '<code>' + esc(ex.replace) + '</code>' : '') + '</p>' +
        '<div class="re-row"><span class="slash">/</span><input type="text" class="pat" spellcheck="false" placeholder="' + esc(t('answerPlaceholder')) + '" aria-label="' + esc(t('answerLabel')) + '"><span class="slash">/' + esc(ex.flags) + '</span></div>' +
        casesHTML(results) +
        (msg ? '<div class="feedback ' + (ok ? 'ok' : 'no') + '">' + msg + '</div>' : '') +
        '<div class="btns"><button class="btn primary run">' + esc(t('run')) + '</button><button class="btn hint">' + esc(t('hintBtn')) + '</button>' +
        '<button class="btn ans"' + (done || tries >= 3 ? '' : ' disabled title="' + esc(t('ansLocked')) + '"') + '>' + esc(t('ansBtn')) + '</button></div><div class="slot"></div>';
      var inp = $('.pat', el);
      inp.value = state.answers[ex.id] || '';
      inp.addEventListener('input', function () { state.answers[ex.id] = inp.value; saveState(state); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') $('.run', el).click(); });
      $('.run', el).onclick = function () {
        var r = checkExercise(ex, inp.value.trim());
        if (!r.results) { draw(null, errText(r.err), false); return; }
        if (!r.ok) state.tries[ex.id] = (state.tries[ex.id] || 0) + 1;
        else state.done[ex.id] = true;
        saveState(state);
        draw(r.results, r.ok ? esc(t('passed')) : errText(r.err), r.ok);
        updateTop(); renderNav(currentId);
        $('.pat', el).focus();
      };
      $('.hint', el).onclick = function () { $('.slot', el).innerHTML = '<div class="reveal">💡 ' + X.hint + '</div>'; };
      $('.ans', el).onclick = function () { $('.slot', el).innerHTML = '<div class="reveal">' + esc(t('ansPrefix')) + '<code>' + esc(ex.solution) + '</code></div>'; };
    }
    draw();
    return el;
  }

  function renderHome() {
    var p = Math.round(totalDone() / TOTAL_EX * 100);
    var next = LESSONS.filter(function (l) { return doneCount(l) < l.exercises.length; })[0];
    var h = '<div class="hero"><img src="favicon.svg" alt=""><h1>LookaroundLab</h1><p class="lead">' + esc(t('heroLead')) + '</p></div>' +
      '<div class="story">' + t('homeStory', { n: LESSONS.length, m: TOTAL_EX }) + '</div>' +
      '<p>' + t('progress', { a: totalDone(), b: TOTAL_EX, p: p, r: rankFor(p) }) + '</p>' +
      '<p><a class="btn primary" style="text-decoration:none;display:inline-block;padding:8px 18px;border-radius:8px;color:#fff;background:linear-gradient(90deg,#b4592a,#d0803f)" href="#/lesson/' + (next ? next.id : LESSONS[0].id) + '">' +
      esc(totalDone() === 0 ? t('start') : next ? t('cont') : t('review')) + '</a></p><div class="cards">';
    LESSONS.forEach(function (l, i) {
      var L = LT(l.id);
      h += '<a class="card" href="#/lesson/' + l.id + '"><div class="em">' + l.emoji + '</div><b>' + (i + 1) + '. ' + esc(L.short) + '</b><br><small>' + esc(L.summary) + '</small><br><small>' +
        esc(t('cardCount', { d: doneCount(l), t: l.exercises.length, lv: t('levelShort')[l.level] })) + '</small></a>';
    });
    $('#main').innerHTML = h + '</div>';
  }

  function renderLesson(id) {
    var i = LESSONS.findIndex(function (l) { return l.id === id; });
    if (i < 0) return renderHome();
    var l = LESSONS[i], L = LT(id), m = $('#main');
    m.innerHTML = '<span class="badge lv' + l.level + '">' + esc(t('levelShort')[l.level]) + '</span><span class="badge">' + esc(t('chapterOf', { i: i + 1, n: LESSONS.length })) + '</span>' +
      '<h1>' + l.emoji + ' ' + esc(L.title) + '</h1><p class="lead">' + esc(L.summary) + '</p>' + L.body +
      '<h2>' + esc(t('labH2')) + '</h2><div class="lab"><div class="lab-title">' + esc(t('labSub')) + '</div><div id="demo"></div></div>' +
      '<h2>' + esc(t('exH2')) + '</h2><div id="exs"></div><div class="pager"></div>';
    playground($('#demo'), l.demo);
    l.exercises.forEach(function (ex, k) { $('#exs').appendChild(exerciseCard(id, ex, k + 1)); });
    var prev = LESSONS[i - 1], nxt = LESSONS[i + 1];
    $('.pager').innerHTML = (prev ? '<a class="btn" style="text-decoration:none" href="#/lesson/' + prev.id + '">← ' + esc(LT(prev.id).short) + '</a>' : '<span></span>') +
      (nxt ? '<a class="btn primary" style="text-decoration:none" href="#/lesson/' + nxt.id + '">' + esc(LT(nxt.id).short) + ' →</a>' : '<a class="btn primary" style="text-decoration:none" href="#/cheat">' + esc(t('toCheat')) + '</a>');
    state.read[id] = true; saveState(state);
  }

  function renderLab() {
    $('#main').innerHTML = '<h1>' + t('labPageH1') + '</h1><p class="lead">' + esc(t('labPageLead')) + '</p><div class="lab"><div id="free"></div></div>';
    playground($('#free'), { pattern: R`(?<=\d)(?=(\d{3})+\b)`, flags: 'g', text: '1234567 / 9999' });
  }

  function renderCheat() {
    $('#main').innerHTML = '<h1>' + t('cheatH1') + '</h1><p class="lead">' + esc(t('cheatLead')) + '</p>' + t('cheat');
  }

  /* 主题:auto 跟随系统,light / dark 为手动 */
  var THEME_KEY = 'lookaroundlab.theme';
  var themeMode = 'auto';
  var mq = root.matchMedia ? root.matchMedia('(prefers-color-scheme: dark)') : null;
  function applyTheme() {
    var dark = themeMode === 'dark' || (themeMode === 'auto' && !!(mq && mq.matches));
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
  function initTheme() {
    try { var s = root.localStorage.getItem(THEME_KEY); if (s === 'light' || s === 'dark' || s === 'auto') themeMode = s; } catch (e) { /* 忽略 */ }
    applyTheme();
    if (mq) {
      var onChange = function () { if (themeMode === 'auto') applyTheme(); };
      if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    }
  }

  var HTML_LANG = { zh: 'zh-CN', ja: 'ja', en: 'en' };
  function applyStatic() {
    var lang = I18N.getLang();
    document.documentElement.lang = HTML_LANG[lang];
    document.title = t('docTitle');
    var meta = $('meta[name="description"]'); if (meta) meta.setAttribute('content', t('metaDesc'));
    $('#menuBtn').setAttribute('aria-label', t('menu'));
    $('#sidebar').setAttribute('aria-label', t('navLabel'));
    var sel = $('#langSel');
    sel.setAttribute('aria-label', t('langLabel'));
    var ts = $('#themeSel');
    ts.setAttribute('aria-label', t('themeLabel'));
    ts.innerHTML = ['auto', 'light', 'dark'].map(function (m) {
      return '<option value="' + m + '"' + (m === themeMode ? ' selected' : '') + '>' + esc(t('theme' + m.charAt(0).toUpperCase() + m.slice(1))) + '</option>';
    }).join('');
    sel.innerHTML = I18N.names.map(function (n) { return '<option value="' + n.code + '"' + (n.code === lang ? ' selected' : '') + '>' + esc(n.name) + '</option>'; }).join('');
  }

  function route() {
    var h = location.hash.replace(/^#\/?/, ''), parts = h.split('/');
    currentId = 'home';
    if (parts[0] === 'lesson' && parts[1]) currentId = parts[1];
    else if (parts[0] === 'lab') currentId = 'lab';
    else if (parts[0] === 'cheat') currentId = 'cheat';
    renderNav(currentId); updateTop();
    if (currentId === 'home') renderHome();
    else if (currentId === 'lab') renderLab();
    else if (currentId === 'cheat') renderCheat();
    else renderLesson(currentId);
    $('#sidebar').classList.remove('open');
    root.scrollTo(0, 0);
  }

  I18N.init();
  initTheme();
  applyStatic();
  $('#themeSel').onchange = function () {
    themeMode = this.value;
    try { root.localStorage.setItem(THEME_KEY, themeMode); } catch (e) { /* 忽略 */ }
    applyTheme();
  };
  $('#langSel').onchange = function () { I18N.setLang(this.value); applyStatic(); route(); };
  $('#menuBtn').onclick = function () { $('#sidebar').classList.toggle('open'); };
  root.addEventListener('hashchange', route);
  route();
})(typeof window !== 'undefined' ? window : globalThis);
