// Boots board.html in a stub DOM in demo mode and asserts the full render
// pipeline runs — catches runtime errors that `node --check` cannot.
// Run before every deploy: node tools/smoke.js
process.on('unhandledRejection', (e) => { console.error('ASYNC ERROR:', e); process.exit(1); });
const mkEl = () => {
  const el = {
    children: [], dataset: {}, style: {}, hidden: false, disabled: false,
    title: '', contentEditable: '', checked: false, type: '', value: '',
    nextElementSibling: null, _html: '', _t: '',
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    append(...c) { el.children.push(...c); },
    after() {}, remove() {}, focus() {}, blur() {},
    addEventListener() {}, scrollIntoView() {},
    replaceChildren(f) { el.replaced = f; },
    querySelectorAll: () => [], querySelector: () => null,
    contains: () => false,
  };
  Object.defineProperty(el, 'innerHTML', { set(v) { el._html = v; }, get() { return el._html; } });
  Object.defineProperty(el, 'textContent', { set(v) { el._t = v; }, get() { return el._t; } });
  return el;
};
const els = {};
global.document = {
  getElementById: (id) => (els[id] ??= mkEl()),
  createElement: () => mkEl(),
  createDocumentFragment: () => mkEl(),
  querySelectorAll: () => [], querySelector: () => null,
  activeElement: null,
};
global.window = {};
global.location = { search: '?demo' };
global.indexedDB = { open: () => { throw new Error('no idb in smoke'); } };
global.prompt = () => null;
global.getSelection = () => ({ removeAllRanges() {}, addRange() {} });
global.setInterval = () => 0;
const fs = require('fs');
try { eval(/<script>([\s\S]*)<\/script>/.exec(fs.readFileSync(new URL('../public/board.html', 'file://' + __filename)))[1]); }
catch (e) { console.error('BOOT ERROR:', e); process.exit(1); }
setTimeout(() => {
  const frag = els.doc && els.doc.replaced;
  const items = frag ? frag.children.length : 0;
  const strip = (els.agents && els.agents._html) || '';
  if (items < 10) { console.error('RENDER FAILED — only', items, 'nodes'); process.exit(1); }
  if (!strip.includes('crew')) { console.error('STRIP FAILED'); process.exit(1); }
  console.log('SMOKE OK —', items, 'nodes rendered, strip populated');
}, 150);
