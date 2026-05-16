# WeChat Compatibility

WeChat public account articles are not normal web pages. Treat the editor as a constrained rich-text environment.

## Safe Defaults

Prefer:

- Single-column mobile-first layouts.
- `section`, `p`, `span`, `strong`, `em`, `blockquote`, `img`.
- Inline CSS on each element.
- Simple `margin`, `padding`, `border`, `background`, `color`, `font-size`, `line-height`, `text-align`.
- Simple borders and solid color backgrounds.
- PNG/JPG images hosted through the normal WeChat image flow.

Avoid:

- JavaScript.
- Web animations and hover states.
- External fonts.
- External stylesheets.
- CSS Grid.
- Complex Flexbox.
- Fixed or absolute positioning.
- Sticky elements.
- SVG-only visual systems.
- Layouts that depend on viewport calculations.

## Component Safety

Usually safe as rich text:

- Title block.
- Section heading.
- Intro deck.
- Quote or sharp line.
- Key insight card.
- Simple list.
- Divider.
- Small label or badge.
- Closing CTA.

Usually image-based:

- Cover image.
- Data chart.
- Process map.
- Complex comparison table.
- Dense framework diagram.
- Layered visual card.
- Exact brand-like hero composition.

Verification-needed:

- Multi-column blocks.
- Dark full-width panels.
- Nested cards.
- Large background fills.
- Code blocks with complex wrapping.

## Design Translation Checklist

Before finalizing a template:

- [ ] Does every component have a rich-text/image/verification-needed classification?
- [ ] Can the article read well as a single column?
- [ ] Are all repeated components editable as text where possible?
- [ ] Are complex visuals moved to image-based modules?
- [ ] Are colors readable on mobile with enough contrast?
- [ ] Are line lengths and paragraph lengths suited to WeChat reading?
- [ ] Does the design still work if some CSS is stripped?
- [ ] Is there a paste-test instruction in `usage.md`?

## Paste-Test Instruction

Tell the user to validate the final template by:

1. Open WeChat public platform draft editor.
2. Paste the generated rich-text snippet or HTML-rendered content through the normal workflow.
3. Check title block, cards, quotes, lists, images, and spacing.
4. Preview on phone before publishing.
5. If spacing or backgrounds are stripped, simplify the component or convert it to an image module.

The skill should promise a WeChat-aware template, not perfect compatibility without editor verification.
