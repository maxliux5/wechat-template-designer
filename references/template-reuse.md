# Template Reuse

Use this when the user wants to apply an existing template to a new article, preview it, or push it to a WeChat draft.

## Trigger Phrases

- "用 KidLearn 模板推这篇"
- "按这个模板发到微信"
- "套用某某模板"
- "以后文章都用这个模板"
- "用模板生成草稿箱预览"

## Template Lookup

Templates are resolved by id/name:

1. User templates: `~/.wechat-template-designer/templates/<template-id>/`
2. Built-in templates: `<skill-root>/templates/<template-id>/`

If a template is missing, list available templates:

```bash
node scripts/apply-template.mjs --list
```

## Apply Template

Run:

```bash
node scripts/apply-template.mjs \
  --template kidlearn \
  --input article.md \
  --out dist/article \
  --author 宝玉
```

Outputs:

- `article.html`: WeChat-aware inline-styled HTML.
- `cover.png`: generated or user-provided cover.
- `publish.json`: publish metadata and command.
- `report.md`: compatibility notes and generated file paths.

## Publishing

Default behavior for reuse requests is to push to WeChat draft unless the user says preview only.

Use the command in `publish.json`, or run:

```bash
bun /Users/bytedance/.hermes/skills/openclaw-imports/baoyu-post-to-wechat/scripts/wechat-api.ts \
  dist/article/article.html \
  --title "<title>" \
  --author "<author>" \
  --summary "<summary>" \
  --cover dist/article/cover.png
```

If sandboxed network access fails, request non-sandbox execution instead of changing credentials or scripts.

## Rules

- Do not redesign the template during reuse unless the user asks.
- If the article has no title, infer from the first H1; if there is no H1, ask for a title.
- If the user provides a cover, use it instead of generating one.
- Keep generated HTML and cover even if publishing fails.
- Push only to the draft box, not mass send.
