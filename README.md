# WeChat Template Designer

Design reusable WeChat public account article templates from `DESIGN.md` inspiration.

This skill helps an agent turn web/app design systems into WeChat-aware article templates, then reuse those templates for future articles. It starts by showing visual directions, asks for taste feedback, translates the chosen direction through WeChat compatibility constraints, and produces a reusable template package. After a template exists, it can apply the template to Markdown and push the rendered article to a WeChat draft.

## What It Does

- Starts with concrete visual options instead of a long questionnaire.
- Reads `DESIGN.md`, getdesign.md, designmd.ai, brand, or website style references.
- Extracts palette, spacing, typography mood, component grammar, and visual personality.
- Converts web/app ideas into WeChat-safe rich text or image-based modules.
- Generates reusable template assets such as `DESIGN.md`, `components.md`, `preview.html`, `sample-article.md`, and `usage.md`.
- Reuses named templates to generate `article.html`, `cover.png`, `publish.json`, and `report.md` for WeChat draft publishing.

## WeChat Compatibility Model

The skill classifies every article component as:

- **Rich text**: simple inline-styled blocks that should work in WeChat.
- **Image-based**: complex visuals that should become PNG/JPG assets.
- **Verification-needed**: components that require a paste test in the WeChat editor.

This prevents a common failure mode: a design looks great as web CSS but breaks when pasted into WeChat.

## Example

The example in [`examples/kidlearn`](examples/kidlearn) uses a bright children's education app design system and translates it into a WeChat article template:

- Source design system: [`examples/kidlearn/source-DESIGN.md`](examples/kidlearn/source-DESIGN.md)
- Generated template package: [`examples/kidlearn/template`](examples/kidlearn/template)
- WeChat preview HTML: [`examples/kidlearn/template/sample-article.html`](examples/kidlearn/template/sample-article.html)
- Cover image: [`examples/kidlearn/template/assets/kidlearn-cover.png`](examples/kidlearn/template/assets/kidlearn-cover.png)

The KidLearn test article was successfully pushed to a WeChat draft via the `baoyu-post-to-wechat` API workflow.

KidLearn is also registered as a reusable built-in template at [`templates/kidlearn`](templates/kidlearn).

## Usage

Ask the agent:

```text
Use $wechat-template-designer.
Here is my DESIGN.md. Help me design a personal WeChat public account template.
Show me a few directions first, then create the template package.
```

To reuse a template:

```bash
node scripts/apply-template.mjs \
  --template kidlearn \
  --input tests/fixtures/kidlearn-new-article.md \
  --out dist/kidlearn-new-article \
  --author 宝玉
```

The script outputs a WeChat-aware HTML article, a generated cover image, publish metadata, and a report. The command in `publish.json` can be used to push the article to a WeChat draft through `baoyu-post-to-wechat`.

Template lookup order:

1. User templates in `~/.wechat-template-designer/templates/<template-id>/`
2. Built-in templates in `templates/<template-id>/`

## Skill Files

- [`SKILL.md`](SKILL.md): main workflow and trigger behavior.
- [`references/starter-directions.md`](references/starter-directions.md): built-in first-round visual directions.
- [`references/designmd-adaptation.md`](references/designmd-adaptation.md): how to adapt `DESIGN.md` sources.
- [`references/wechat-compat.md`](references/wechat-compat.md): WeChat rendering constraints.
- [`references/template-package.md`](references/template-package.md): expected final output package.
- [`references/template-reuse.md`](references/template-reuse.md): applying named templates to new Markdown articles.
- [`scripts/apply-template.mjs`](scripts/apply-template.mjs): reusable Markdown-to-template renderer.
- [`templates/kidlearn`](templates/kidlearn): built-in reusable KidLearn template.
