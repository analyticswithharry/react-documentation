"""Scrape canonical React tutorial pages and save locally as Markdown/HTML.

Usage:
    python3 scripts/scrape_tutorials.py

Output:
    tutorial-content/<slug>.html   (raw HTML)
    tutorial-content/<slug>.md     (extracted text + code)
    tutorial-content/index.json    (manifest)

No external runtime calls — content is bundled into the app via build-time JSON.
"""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "tutorial-content"
OUT.mkdir(exist_ok=True)

SOURCES = [
    ("react-quickstart", "https://react.dev/learn"),
    ("react-thinking", "https://react.dev/learn/thinking-in-react"),
    ("react-state", "https://react.dev/learn/state-a-components-memory"),
    ("react-effects", "https://react.dev/learn/synchronizing-with-effects"),
    ("react-context", "https://react.dev/learn/passing-data-deeply-with-context"),
    ("react-reducer", "https://react.dev/learn/extracting-state-logic-into-a-reducer"),
    ("devhints-react", "https://devhints.io/react"),
    ("react-tutorial-app", "https://react-tutorial.app/"),
    ("react-ts-cheatsheet", "https://react-typescript-cheatsheet.netlify.app/"),
    ("react-native", "https://reactnative.dev/"),
    ("react-admin", "https://marmelab.com/react-admin/Tutorial.html"),
    ("mui", "https://mui.com/material-ui/"),
]


class TextExtractor(HTMLParser):
    """Strip tags but preserve <pre><code> blocks as fenced markdown."""

    SKIP = {"script", "style", "noscript", "svg", "nav", "footer", "header"}

    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []
        self.skip_depth = 0
        self.in_pre = False
        self.in_code = False
        self.buf: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if tag == "pre":
            self.in_pre = True
            self.parts.append("\n\n```jsx\n")
        elif tag == "code" and not self.in_pre:
            self.parts.append("`")
            self.in_code = True
        elif tag in ("h1", "h2", "h3", "h4"):
            self.parts.append("\n\n" + "#" * int(tag[1]) + " ")
        elif tag in ("p", "li", "br"):
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag in self.SKIP and self.skip_depth:
            self.skip_depth -= 1
            return
        if self.skip_depth:
            return
        if tag == "pre":
            self.in_pre = False
            self.parts.append("\n```\n")
        elif tag == "code" and self.in_code:
            self.parts.append("`")
            self.in_code = False

    def handle_data(self, data):
        if self.skip_depth:
            return
        self.parts.append(data)

    def text(self) -> str:
        raw = "".join(self.parts)
        raw = re.sub(r"\n{3,}", "\n\n", raw)
        return raw.strip()


def fetch(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0 Safari/537.36"
            )
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def main() -> int:
    manifest = []
    for slug, url in SOURCES:
        print(f"  → {slug}  {url}")
        try:
            html = fetch(url)
        except Exception as exc:  # noqa: BLE001
            print(f"    ! skipped: {exc}", file=sys.stderr)
            continue
        (OUT / f"{slug}.html").write_text(html, encoding="utf-8")
        extractor = TextExtractor()
        extractor.feed(html)
        md = extractor.text()
        (OUT / f"{slug}.md").write_text(md, encoding="utf-8")
        manifest.append(
            {
                "slug": slug,
                "url": url,
                "html_bytes": len(html),
                "md_bytes": len(md),
            }
        )
    (OUT / "index.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\nSaved {len(manifest)} sources to {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
