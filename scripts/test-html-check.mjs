// Tests for src/i18n/html-check.ts, the build-time check of the dictionary strings that are rendered unescaped (`...Html` keys).
// Run it with `npm run test:html`. It needs no dependencies (Node >= 22.18 imports the .ts files directly) and exits 1 when any case fails.
import { findHtmlProblems } from '../src/i18n/html-check.ts';
import { en } from '../src/i18n/en.ts';
import { zhTw } from '../src/i18n/zh-tw.ts';
import { zhCn } from '../src/i18n/zh-cn.ts';
import { ja } from '../src/i18n/ja.ts';
import { es } from '../src/i18n/es.ts';
import { fr } from '../src/i18n/fr.ts';
import { de } from '../src/i18n/de.ts';

let failures = 0;
let total = 0;
function report(ok, line) {
  total++;
  if (!ok) failures++;
  console.log(`${ok ? 'ok   ' : 'FAIL '} ${line}`);
}

// 1) The seven real dictionaries must pass, and the walk must really have found `...Html` strings to check
//    (a walk that finds none would pass everything).
function countHtmlStrings(node, isHtml = false) {
  if (typeof node === 'string') return isHtml ? 1 : 0;
  if (Array.isArray(node)) return node.reduce((n, x) => n + countHtmlStrings(x, isHtml), 0);
  if (node && typeof node === 'object') {
    return Object.entries(node).reduce((n, [k, v]) => n + countHtmlStrings(v, isHtml || k.endsWith('Html')), 0);
  }
  return 0;
}
const dictionaries = { en, 'zh-tw': zhTw, 'zh-cn': zhCn, ja, es, fr, de };
for (const [code, dict] of Object.entries(dictionaries)) {
  const checked = countHtmlStrings(dict);
  const problems = findHtmlProblems(dict);
  report(problems.length === 0 && checked > 0, `dictionary ${code.padEnd(5)} ${String(checked).padStart(2)} ...Html strings checked, ${problems.length} problems`);
  for (const p of problems) console.log(`         ${p.path}: ${p.message}`);
}

// 2) Synthetic strings: [string, should be accepted]. Each is checked as the value of a `...Html` key.
const cases = [
  // accepted
  ['plain text', true],
  ['<strong>x</strong> and <em>y</em> and <code>z</code>', true],
  ['<a href="https://example.com/a?b=1&amp;c=2">x</a>', true],
  ['<a href="https://any-host.example/">x</a>', true], // https:// is allowed for any host: the check is no security boundary
  ['<a href="/docs/setup.md">x</a>', true],
  ['<a href="/">x</a>', true],
  ['<a href="/docs?a=1&amp;b=2">x</a>', true], // an & later in the value is fine; only "/&" at the start is refused
  ['<a href="#unsigned">x</a>', true],
  ['<strong>a <em>b <code>c</code></em></strong>', true],
  ['Privacy &amp; Security &lt;tag&gt;', true],
  // tags and attributes
  ['<script>alert(1)</script>', false],
  ['<img src=x onerror=alert(1)>', false],
  ['<strong onmouseover="a()">x</strong>', false],
  ['<strong class="x">x</strong>', false],
  ['<STRONG>x</STRONG>', false],
  ['<br>', false],
  ['<code/>', false],
  ['<!-- c -->', false],
  ['a < b', false],
  // <a> and its href
  ['<a href="https://x.example" onclick="alert(1)">x</a>', false],
  ['<a href="javascript:alert(1)">x</a>', false],
  ['<a href=" JavaScript:alert(1)">x</a>', false],
  ['<a href="//evil.example/x">x</a>', false],
  ['<a href="/\\evil.example">x</a>', false], // /\host: a browser reads the backslash as a slash
  ['<a href="/&#47;evil.example">x</a>', false], // &#47; is decoded to / inside the attribute
  ['<a href="/&#x2F;evil.example">x</a>', false],
  ['<a href="/\t/evil.example">x</a>', false], // a browser drops tabs and line breaks from a URL
  ['<a href="/\n/evil.example">x</a>', false],
  ['<a href="/\r/evil.example">x</a>', false],
  ['<a href="http://example.com">x</a>', false],
  ['<a href="data:text/html,x">x</a>', false],
  ['<a href="mailto:a@b.c">x</a>', false],
  ['<a>x</a>', false],
  ['<a href="https://x.example" target="_blank">x</a>', false],
  // nesting and closing
  ['<strong>never closed', false],
  ['<strong><em>x</strong></em>', false],
  ['x</em>', false],
  ['<a href="https://x.example"/>x', false],
];
for (const [s, want] of cases) {
  const problems = findHtmlProblems({ someHtml: s });
  const ok = (problems.length === 0) === want;
  report(ok, `${want ? 'accepts' : 'rejects'}  ${JSON.stringify(s).padEnd(54)} ${problems[0]?.message ?? ''}`);
}

// 3) Key paths: nested objects and lists are walked, the path names the offending item, and a key that does not end in `Html` is not checked.
{
  const tree = {
    faq: { items: { unsigned: { listHtml: ['fine', '<script>x</script>'] } } },
    plain: '<script>not an Html key</script>',
  };
  const problems = findHtmlProblems(tree);
  const paths = [...new Set(problems.map((p) => p.path))];
  report(
    paths.length === 1 && paths[0] === 'faq.items.unsigned.listHtml[1]',
    `path of a problem in a nested list is "faq.items.unsigned.listHtml[1]" (got ${JSON.stringify(paths)}); a non-Html key is ignored`,
  );
  report(findHtmlProblems({ aHtml: 'ok', bHtml: ['ok', 'ok'], c: { dHtml: 'ok' } }).length === 0, 'clean nested ...Html strings give no problems');
}

console.log(failures === 0 ? `\nall ${total} checks passed` : `\n${failures} of ${total} checks FAILED`);
process.exit(failures === 0 ? 0 : 1);
