#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "fonttools==4.67.0",
#   "brotli==1.2.0",
# ]
# ///
"""Cut one font down to the characters of a hero tagline and write it as WOFF2.

Called by scripts/make-hero-fonts.mjs (run that, not this). It does only the font work:

    uv run scripts/subset-hero-font.py --font SOURCE.ttf --text-file CHARS.txt --out OUT.woff2 --report REPORT.json

  --font       the full source font (TTF or OTF)
  --text-file  UTF-8 file; every character in it must end up in the subset (line breaks are ignored)
  --out        the WOFF2 file to write
  --report     JSON written for the caller: which of the requested characters the subset covers, sizes, versions,
               and any "Reserved Font Name" statement found in the source font's name table

Exit code 1 when the source font lacks any requested character: the caller must not ship a subset with holes.

Layout features are kept in full (layout_features "*"), so a feature the page asks for, such as "halt" in
font-feature-settings, behaves as it does in the full font. The name table is kept in full too: it carries the
copyright notice and the license text of the font, which the OFL asks every copy to keep.
"""
import argparse
import json
import sys
from pathlib import Path

import brotli
import fontTools
from fontTools import subset
from fontTools.ttLib import TTFont


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--font", required=True, type=Path)
    ap.add_argument("--text-file", required=True, type=Path)
    ap.add_argument("--out", required=True, type=Path)
    ap.add_argument("--report", required=True, type=Path)
    args = ap.parse_args()

    text = args.text_file.read_text(encoding="utf-8").replace("\r", "").replace("\n", "")
    wanted = sorted(set(text))
    if not wanted:
        print("ERROR: the text file holds no characters", file=sys.stderr)
        return 1

    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.layout_scripts = ["*"]
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.notdef_outline = True
    options.glyph_names = False
    options.hinting = False

    font = subset.load_font(str(args.font), options)
    # A name table that declares a "Reserved Font Name" would forbid publishing a modified version (a subset) under that name.
    reserved = sorted({r.toUnicode() for r in font["name"].names if "reserved font name" in r.toUnicode().lower()})
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=[ord(c) for c in wanted])
    subsetter.subset(font)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    subset.save_font(font, str(args.out), options)
    font.close()

    # Read the file back from disk: the report describes what was written, not what the subsetter meant to write.
    out = TTFont(str(args.out))
    cmap = out.getBestCmap()
    covered = [c for c in wanted if ord(c) in cmap]
    missing = [c for c in wanted if ord(c) not in cmap]
    report = {
        "requested": "".join(wanted),
        "covered": "".join(covered),
        "missing": "".join(missing),
        "reservedFontNameInSource": reserved,
        "glyphCount": len(out.getGlyphOrder()),
        "bytes": args.out.stat().st_size,
        "fontTools": fontTools.version,
        "brotli": getattr(brotli, "__version__", "unknown"),
    }
    out.close()
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if missing:
        print(f"ERROR: the source font has no glyph for: {''.join(missing)!r}", file=sys.stderr)
        return 1
    print(f"{args.out.name}: {len(covered)} characters, {report['glyphCount']} glyphs, {report['bytes']} bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
