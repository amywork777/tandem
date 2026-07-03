// Regenerates board.html's inlined TEMPLATES block from templates/*.md.
// Run after editing any template: node tools/sync-templates.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const board = path.join(root, 'public/board.html');
const NAMES = ['checklist.md', 'decisions.md', 'archive.md', 'agents.md'];
const lit = (t) => '`' + t.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';

const entries = NAMES.map(
  (n) => `    '${n}': ` + lit(fs.readFileSync(path.join(root, 'templates', n), 'utf8')) + ','
);
const block =
  '// sync: templates/ — generated from the repo template files; regenerate with tools/sync-templates.js.\n' +
  '  const TEMPLATES = {\n' + entries.join('\n') + '\n  };';

let s = fs.readFileSync(board, 'utf8');
const i1 = s.indexOf('// sync: templates/');
const i2 = s.indexOf('};', i1) + 2;
if (i1 === -1) throw new Error('TEMPLATES block not found');
const before = s.slice(i1, i2);
if (process.argv.includes('--check')) {
  if (before !== block) { console.error('DRIFT: templates/ differ from the block inlined in board.html — run tools/sync-templates.js'); process.exit(1); }
  console.log('templates in sync');
} else {
  fs.writeFileSync(board, s.slice(0, i1) + block + s.slice(i2));
  console.log(before === block ? 'already in sync' : 'TEMPLATES regenerated');
}
