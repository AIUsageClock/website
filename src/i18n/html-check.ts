/**
 * Build-time check for the dictionary strings that are rendered unescaped (`set:html`): every string stored under a key that
 * ends in `Html`, however deeply nested and whether the value is one string or a list of them.
 *
 * The dictionaries are source files in this repository, but a pasted translation can carry markup nobody meant to ship, so the
 * build stops instead of publishing it. The rules:
 *  - Tags: only <strong>, <em>, <code> (no attributes at all) and <a>. Each opened tag must be closed, in order.
 *  - <a> has exactly one attribute, `href`, and its value starts with `https://`, `/` or `#`.
 *    That leaves out `javascript:`, `data:`, `http:` and protocol-relative links. Any `on*` attribute is an attribute other than `href`.
 *    A browser reads `//host`, `/\host`, `/<tab>/host` and `/&#47;host` (a character reference decoded inside the attribute) all as a
 *    link to another host, so a `/` that is followed by `/`, `\`, `&`, a tab or a line break is refused as well.
 *    This is a guard against typos and pasted markup, not a security boundary: `https://` is allowed for any host.
 *  - A stray "<" that does not start one of those tags is refused too. Write a literal "<" as &lt;.
 */

export interface HtmlProblem {
  /** Key path in the dictionary, e.g. `faq.items.unsigned.listHtml[0]`. */
  path: string;
  message: string;
}

const ALLOWED_TAGS = ['strong', 'em', 'code', 'a'];
const HREF_START = /^(?:https:\/\/|\/(?![\/\\&\t\n\r])|#)/;

/** The problems in one string, as messages. */
function checkString(s: string): string[] {
  const problems: string[] = [];
  const open: string[] = [];
  let from = 0;

  for (;;) {
    const lt = s.indexOf('<', from);
    if (lt === -1) break;
    const gt = s.indexOf('>', lt);
    if (gt === -1) {
      problems.push(`"<" at position ${lt} is never closed by ">" (write a literal < as &lt;)`);
      break;
    }
    const tag = s.slice(lt, gt + 1);
    from = gt + 1;

    const m = /^<(\/?)([A-Za-z][A-Za-z0-9-]*)([^>]*)>$/.exec(tag);
    if (!m) {
      problems.push(`${tag} does not start an allowed tag (write a literal < as &lt;)`);
      continue;
    }
    const [, slash, name, rest] = m;
    if (!ALLOWED_TAGS.includes(name)) {
      problems.push(`<${slash}${name}> is not allowed (only ${ALLOWED_TAGS.join(', ')})`);
      continue;
    }

    if (slash) {
      if (rest.trim() !== '') problems.push(`${tag} must be a bare closing tag`);
      if (open.pop() !== name) problems.push(`${tag} closes a tag that is not the innermost open one`);
      continue;
    }

    if (name !== 'a') {
      if (rest.trim() !== '') problems.push(`<${name}> takes no attributes, found:${rest}`);
      open.push(name);
      continue;
    }

    // <a>: a single href with an allowed start, nothing else.
    const attrRe = /\s+([^\s=\/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/y;
    let pos = 0;
    let hrefs = 0;
    while (pos < rest.length && rest.slice(pos).trim() !== '') {
      attrRe.lastIndex = pos;
      const a = attrRe.exec(rest);
      if (!a) {
        problems.push(`<a> has text that is not an attribute:${rest.slice(pos)}`);
        break;
      }
      pos = attrRe.lastIndex;
      const attr = a[1].toLowerCase();
      if (attr !== 'href') {
        problems.push(`attribute "${a[1]}" is not allowed on <a> (only href)`);
        continue;
      }
      hrefs++;
      const value = a[2] ?? a[3] ?? a[4];
      if (value === undefined) problems.push('<a href> has no value');
      else if (/^[\s\u0000-\u001f]*javascript:/i.test(value)) problems.push(`href ${JSON.stringify(value)} is a javascript: URL`);
      else if (!HREF_START.test(value)) problems.push(`href ${JSON.stringify(value)} must start with https://, / (not followed by /, \\, & or a tab or line break) or #`);
    }
    if (hrefs !== 1) problems.push(`<a> needs exactly one href, found ${hrefs}`);
    open.push(name);
  }

  for (const name of open) problems.push(`<${name}> is never closed`);
  return problems;
}

/** Every problem in every `...Html` string of a dictionary (or of any tree of objects, arrays and strings). */
export function findHtmlProblems(tree: unknown): HtmlProblem[] {
  const out: HtmlProblem[] = [];

  const walk = (node: unknown, path: string, isHtml: boolean): void => {
    if (typeof node === 'string') {
      if (isHtml) for (const message of checkString(node)) out.push({ path, message });
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, i) => walk(item, `${path}[${i}]`, isHtml));
      return;
    }
    if (typeof node === 'object' && node !== null) {
      for (const [key, value] of Object.entries(node)) {
        walk(value, path ? `${path}.${key}` : key, isHtml || key.endsWith('Html'));
      }
    }
  };

  walk(tree, '', false);
  return out;
}
