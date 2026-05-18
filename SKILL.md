---
name: wechat-template-designer
description: Use when a user wants to design or reuse a personal WeChat public account article template, choose visual directions, adapt DESIGN.md inspiration, apply a named template to Markdown, or push a templated article to a WeChat draft.
---

# WeChat Template Designer

## Purpose

Help users design and reuse their own WeChat public account article templates. The skill has two modes:

- **Design mode**: create a reusable template package from visual directions, DESIGN.md inspiration, and user feedback.
- **Reuse mode**: apply a named template to a Markdown article, generate WeChat-aware HTML and a cover, then optionally push it to the WeChat draft box.

The core loop is:

1. Show 3 starter template directions first.
2. Ask the user what feels right or wrong.
3. Adapt the chosen direction using the user's audience, content type, taste, and reference DESIGN.md examples.
4. Produce a reusable template package with a user-specific `DESIGN.md`.

## Hard Rules

- Do not start with a long questionnaire. Start by showing 3 concrete visual directions.
- Do not copy a web `DESIGN.md` directly into WeChat. Translate it through WeChat compatibility rules.
- Do not promise that arbitrary CSS will work in WeChat. Mark high-risk layout as image-based or verification-needed.
- Do not publish during design mode. During reuse mode, push only to WeChat drafts, never mass send.
- Keep the user's template distinctive. Avoid generic "modern gradient card" output.

## Required References

Read only what the current step needs:

- `references/starter-directions.md` when presenting the first 3 visual options.
- `references/designmd-adaptation.md` when using getdesign.md, designmd.ai, DESIGN.md files, or brand/site design references.
- `references/wechat-compat.md` before finalizing any component that should be copied into WeChat.
- `references/template-package.md` when producing the final reusable template package.
- `references/template-reuse.md` when applying an existing template to Markdown or pushing a templated draft.

## Workflow

### 0. Route The Request

Use **design mode** when the user wants to create, choose, adjust, or finalize a template.

Use **reuse mode** when the user says things like:

- "用 KidLearn 模板推这篇"
- "按这个模板发到微信"
- "套用这个模板"
- "用某某模板生成草稿"

In reuse mode, do not start the three-direction design interview. Read `references/template-reuse.md` and run `scripts/apply-template.mjs`.

### 1. Present Three Directions

Show 3 concise visual directions from `starter-directions.md`. If a browser or preview tool is available, show visual mockups. If not, describe them with palette, typography mood, component examples, and suitable article types.

Ask the user which direction is closest and what they dislike. Good prompts:

- "Which one is closest to your account's voice?"
- "Should it feel more sharp, more premium, warmer, more editorial, or more practical?"
- "Which parts feel too common or not like you?"

### 2. Collect Design Inputs

After the user picks a direction, ask only high-impact questions:

- Audience: founder, operator, developer, knowledge worker, consumer, or mixed.
- Content shape: insight essay, tutorial, case breakdown, weekly notes, news commentary.
- Desired persona: calm expert, sharp critic, field notebook, strategy consultant, warm curator.
- Taste constraints: colors to avoid, brands/sites to reference, degree of decoration.
- Reusable components needed: title block, intro, quote, key insight, data card, process block, case card, code/command block, CTA.

Ask one or two questions at a time. Stop asking once the template can be designed.

### 3. Use DESIGN.md Inspiration

If the user mentions DESIGN.md, getdesign.md, designmd.ai, a brand, or a site style:

1. Extract visual tokens and principles: palette, spacing, radius, border weight, typography feel, density, component rhythm.
2. Decide what survives in WeChat rich text.
3. Convert complex web-only effects into image-based modules or simplified rich-text components.
4. Explain the translation briefly so the user understands what changed.

Use `references/designmd-adaptation.md` for the detailed decision rules.

### 4. Design The Template

Produce a concrete design spec:

- Name the template with a memorable style label.
- Define palette, typography rhythm, spacing, shape language, image style, and article density.
- Define 6-10 reusable article components.
- For each component, state whether it is WeChat rich text, image-based, or verification-needed.
- Include a short sample article section using the components.

### 5. Final Package

When the user approves the direction, generate the package described in `references/template-package.md`:

- `DESIGN.md`
- `components.md`
- `preview.html`
- `sample-article.md`
- `usage.md`

If writing files, place them under a user/project-specific folder such as `wechat-template-<slug>/`.

### 6. Reuse A Template

When applying an existing template, use:

```bash
node scripts/apply-template.mjs --template <id> --input <article.md> --out <out-dir> --author <name>
```

Then, unless the user asked for preview only, publish the generated `article.html` and `cover.png` to the WeChat draft box using the command recorded in `publish.json`.

## Quality Bar

A good result should let a future agent answer:

- What does this user's account look and feel like?
- Which article blocks are reusable?
- Which elements can be pasted into WeChat as rich text?
- Which elements must be generated as images?
- How should future articles use the template without redesigning from scratch?

If the output could apply to any account, it is not specific enough.
