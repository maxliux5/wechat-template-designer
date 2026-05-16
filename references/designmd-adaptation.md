# DESIGN.md Adaptation

Use DESIGN.md files and designmd.ai/getdesign.md examples as inspiration sources, not direct WeChat templates.

## What To Extract

When reading a DESIGN.md or style reference, extract:

- Palette: primary, accent, surface, muted text, borders.
- Typography feel: editorial, technical, luxurious, playful, institutional.
- Spacing rhythm: tight/dense, generous/editorial, modular/dashboard-like.
- Shape language: square, soft radius, pill, bordered, shadowed.
- Component grammar: cards, callouts, quotes, dividers, tables, badges.
- Image direction: screenshots, diagrams, photographic, abstract, document-like.
- Personality: calm, sharp, premium, warm, experimental, practical.

Do not overfit to implementation details such as exact CSS classes, web grid systems, interactive states, hover effects, or animations.

## Translation Rules

Map web design ideas to WeChat article equivalents:

| Web design idea | WeChat template equivalent |
| --- | --- |
| Design tokens | `DESIGN.md` palette, spacing, and component rules |
| Hero section | Cover image or opening title card |
| Navigation/header | Issue label or column identity |
| Card grid | Sequential rich-text cards or one image-based matrix |
| Dashboard/chart | Image-based data card |
| Button | CTA block or final action line |
| Hover/animation | Static emphasis state |
| Custom font | System font mood and weight guidance |
| Responsive layout | Single-column mobile-first rhythm |

## Compatibility Classification

Every component in the final template must be classified:

- **Rich text**: safe to implement with simple HTML, inline CSS, text, borders, background colors, and images.
- **Image-based**: should be rendered as PNG/JPG because it relies on exact layout, charts, complex typography, or layered visuals.
- **Verification-needed**: may work in WeChat but must be pasted into the editor and checked.

Prefer rich text for repeated reading components and image-based modules for high-impact visuals.

## Using External References

If browsing/search is available and the user wants more inspiration:

1. Search getdesign.md or designmd.ai for the target mood, brand, or category.
2. Pick at most 3 references.
3. Summarize what each contributes in one sentence.
4. Combine selected traits into the user's own template.

If designmd CLI is available:

```bash
designmd search "<style keywords>"
designmd get "<result-id>"
designmd download "<result-id>"
```

The CLI is optional. Do not block template design if it is unavailable.

## Guardrails

- Do not claim a template is "from" a brand unless the user provided that brand and the design was legally/ethically adapted as inspiration.
- Avoid one-note palettes. If a reference is heavily monochrome, add neutral and accent roles for article readability.
- Do not use external fonts as a requirement for WeChat.
- Do not rely on exact CSS feature support unless verified in the WeChat editor.
- Preserve the user's author identity over the reference's brand identity.
