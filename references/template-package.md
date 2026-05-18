# Template Package

When the user approves a direction, create a reusable package in a folder named `wechat-template-<slug>/`.

If the template should be reusable by name, register it as `templates/<template-id>/` with a `template.json` file. User-private templates can live at `~/.wechat-template-designer/templates/<template-id>/`.

## Required Files

### `DESIGN.md`

Purpose: the user's personal WeChat article visual system.

Include:

- Template name and one-sentence identity.
- Suitable article types.
- Audience and author persona.
- Palette with role names and hex colors.
- Typography rhythm using system fonts and sizes.
- Spacing and density rules.
- Shape and border language.
- Image direction.
- Do/don't rules.
- WeChat compatibility notes.

### `components.md`

Purpose: reusable article blocks.

Include 6-10 components. For each component:

- Name.
- Purpose.
- When to use.
- Visual description.
- WeChat implementation type: rich text, image-based, or verification-needed.
- Example content.
- HTML sketch only when useful and simple.

Recommended components:

- Column label.
- Opening title block.
- Intro deck.
- Section heading.
- Key insight card.
- Quote / sharp line.
- Evidence or source note.
- Data / framework card.
- Case breakdown block.
- Closing CTA.

### `preview.html`

Purpose: visual preview for the user.

Requirements:

- Self-contained HTML.
- Mobile-width article canvas.
- Demonstrates title, intro, section, quote, insight card, data/framework card, and closing.
- Uses web CSS for preview, but labels which elements are rich-text-safe vs image-based.
- Does not imply exact WeChat rendering; include a small preview note.

### `sample-article.md`

Purpose: sample article using the template.

Include:

- A realistic title.
- 2-3 sections.
- Component placeholders.
- Notes for image-based blocks.

### `usage.md`

Purpose: future workflow.

Include:

- How to use the template when writing a new article.
- How to choose components.
- How to adapt DESIGN.md references without losing WeChat compatibility.
- Paste-test checklist.
- When to make a component image-based.

### `template.json`

Purpose: template registry metadata for reuse mode.

Include:

- `id`
- `name`
- `description`
- `suitableFor`
- `defaultAuthor`
- `palette`
- `cover.default`

## Completion Criteria

The package is complete only if:

- It can guide a future agent without the original conversation.
- It contains a visible preview.
- It distinguishes design intent from WeChat implementation constraints.
- The user's chosen taste is specific enough to recognize.
