# KidLearn WeChat Template

## Identity

Bright, chunky, friendly learning notes for parents, educators, and product builders. The template keeps KidLearn's child-friendly reward feeling, but translates app interactions into WeChat-safe static article components.

## Suitable Articles

- Children's learning product analysis.
- AI education tool reviews.
- Parent-facing learning guides.
- Classroom activity breakdowns.
- Product design notes for ages 5-12.

## Visual Tokens

### Palette

- Primary red `#EF4444`: title accents and key claims.
- Learning blue `#3B82F6`: tips, links, and framework labels.
- Reward yellow `#FACC15`: badges, progress, and positive emphasis.
- Success green `#22C55E`: completion and "do this" notes.
- Warm highlight `#FEF3C7`: soft cards.
- Base white `#FFFFFF`: article canvas.
- Text ink `#1F2937`: body text.
- Soft border `#E5E7EB`: dividers and card borders.

Wechat rule: do not use more than three bright colors in one component. Let white and soft yellow carry most backgrounds.

### Typography

WeChat cannot rely on Fredoka or Nunito. Use system fonts while preserving the mood:

- Title: rounded, bold, 24-28px, line-height 1.3.
- Section heading: 18-20px, semibold, line-height 1.45.
- Body: 15-16px, line-height 1.85.
- Caption/badge: 13-14px, semibold.

### Shape And Spacing

- Rounded cards: 16-20px radius.
- Pills: 999px radius.
- Card padding: 18-22px.
- Section gap: 24-32px.
- Avoid dense grids; WeChat articles should stay single-column.

### Image Direction

- Use simple static illustrations, progress cards, stars, badges, and checklist graphics.
- Reward animations become static "reward moments" or image-based modules.
- Complex lesson maps, activity flows, and dashboards should be generated as PNG/JPG.

## Component Safety

- Rich text: title card, learning tip, quote, checklist, parent note, progress badge, gentle warning.
- Image-based: cover, reward poster, activity map, chart, lesson board.
- Verification-needed: multi-column choice cards and nested cards.

## Do

- Keep language simple, warm, and encouraging.
- Use big visual labels and generous spacing.
- Use stars/checkmarks/sparkle words as text symbols only when they do not clutter the article.
- Make error states forgiving: "Try again" instead of "Wrong".

## Don't

- Do not bring app hover/pressed states into the article.
- Do not depend on external fonts, animation, JavaScript, or grid layouts.
- Do not let bright red, blue, yellow, and green all compete in the same block.
- Do not add child data collection or external links without context.
