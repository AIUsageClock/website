#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["segno==1.6.6"]
# ///
"""Write src/assets/donate-qr.svg, the QR code of the donation address.

The address is read from `DONATE_ADDRESS` in src/site.ts, so it is written in one place only. The QR content is the bare
address (no `ethereum:` prefix and no chain id), because the same address is used on Ethereum and on Polygon.
The SVG is a vector (one path, crisp edges) that Donate.astro inlines; it is never resampled as a bitmap, which would blur modules.

Run it again whenever DONATE_ADDRESS changes:  uv run --no-project scripts/make-donate-qr.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import segno

ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    source = (ROOT / "src" / "site.ts").read_text(encoding="utf-8")
    found = re.search(r"export const DONATE_ADDRESS = '(0x[0-9a-fA-F]{40})'", source)
    if not found:
        print("DONATE_ADDRESS not found in src/site.ts", file=sys.stderr)
        return 1
    address = found.group(1)
    qr = segno.make(address, error="m", micro=False)
    svg = qr.svg_inline(scale=1, border=2, dark="#000000", light="#ffffff", omitsize=True)
    # data-address lets Donate.astro stop the build when this file was made for another address than DONATE_ADDRESS
    svg = svg.replace(
        "<svg ", f'<svg data-address="{address}" shape-rendering="crispEdges" aria-hidden="true" focusable="false" ', 1
    )
    out = ROOT / "src" / "assets" / "donate-qr.svg"
    out.write_bytes(svg.encode("utf-8"))
    print(f"{out.relative_to(ROOT)}: version {qr.version}, {len(svg)} bytes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
