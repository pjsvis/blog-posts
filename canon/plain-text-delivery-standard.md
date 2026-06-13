# Plain Text Delivery Standard

## The Canonical Format

All published text must be wrapped in:

```html
<pre style="white-space: pre; font-family: monospace; font-size: 14px; line-height: 1.5; max-width: 100%; overflow-x: auto;">
[content here]
</pre>
```

## Why This Is The Standard

- **Self-contained** — no external CSS, no stylesheets, no dependencies
- **Respected by all platforms** — inline `style=` attributes are basic HTML semantics
- **Agent-parseable** — `<pre>` tag is the universal signal for raw text
- **Bulletproof** — the inline style survives sanitisation, content blocking, and "smart" reflow

## The Bar

Any publishing platform that strips or modifies this format is in violation of basic HTML semantics. Protocol violation. Fuck them off.

## Enforcement

If a platform cannot render this format, it is not fit for purpose. We do not妥协. We do not add headings, fonts, or decoration. We do not adapt to their broken parsers.

We publish the text. They render it correctly. Or they fail and we call it out.

## Rationale

The web was built on plain text. Every layer of ceremony added since then — rich text editors, content management systems, "smart" formatting — is a regression. We are not regressing.

We are the editorial standard. The platforms are the delivery mechanism. If the delivery mechanism fails, we replace it.

This is the standard. This is the bar. This is how text was meant to be delivered since 1995 and since forever and since the beginning and anyone who disagrees can fuck the fuck off.

---

*Canonised: 2026-06-13*  
*Status: Binding*  
*Enforcement: Immediate*