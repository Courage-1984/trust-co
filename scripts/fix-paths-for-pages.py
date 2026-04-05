"""Normalize asset and internal links for GitHub Pages (project site subpath)."""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]

REPLACEMENTS = [
    ('href="/services#advisory"', 'href="services/#advisory"'),
    ('href="/about#approach"', 'href="about/#approach"'),
    ('href="/about#why"', 'href="about/#why"'),
    ('href="/contact#urgent-counsel"', 'href="contact/#urgent-counsel"'),
    ('href="/contact#contactForm"', 'href="contact/#contactForm"'),
    ('href="/#hero-enquiry"', 'href="#hero-enquiry"'),
    ('href="/css/style.css"', 'href="css/style.css"'),
    ('src="/js/main.js"', 'src="js/main.js"'),
    ('href="/services"', 'href="services/"'),
    ('href="/liquidation"', 'href="liquidation/"'),
    ('href="/business-rescue"', 'href="business-rescue/"'),
    ('href="/trusts"', 'href="trusts/"'),
    ('href="/about"', 'href="about/"'),
    ('href="/insights"', 'href="insights/"'),
    ('href="/faq"', 'href="faq/"'),
    ('href="/contact"', 'href="contact/"'),
    ('href="/privacy"', 'href="privacy/"'),
    ('href="/terms"', 'href="terms/"'),
    ('href="/paia"', 'href="paia/"'),
    ('href="/"', 'href="./"'),
]

BASE_SNIPPET = '  <base href="../" />\n'


def apply_replacements(text: str) -> str:
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    return text


def main() -> None:
    count = 0
    for p in ROOT.rglob("index.html"):
        rel = p.relative_to(ROOT)
        text = p.read_text(encoding="utf-8")
        if rel == pathlib.Path("index.html"):
            text = apply_replacements(text)
        elif len(rel.parts) == 2 and rel.name == "index.html":
            if '<base href="../"' not in text:
                needle = '  <meta charset="UTF-8" />\n'
                if needle not in text:
                    raise SystemExit(f"Missing charset line: {rel}")
                text = text.replace(needle, needle + BASE_SNIPPET, 1)
            text = apply_replacements(text)
        p.write_text(text, encoding="utf-8", newline="\n")
        count += 1
    print(f"Updated {count} index.html file(s).")


if __name__ == "__main__":
    main()
