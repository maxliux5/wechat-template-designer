#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function usage(exitCode = 0) {
  console.log(`Apply a WeChat template to a Markdown article.

Usage:
  node scripts/apply-template.mjs --template kidlearn --input article.md --out dist/article [options]

Options:
  --template <id>   Template id, e.g. kidlearn
  --input <path>    Markdown article path
  --out <dir>       Output directory
  --title <text>    Override title
  --author <text>   Override author
  --summary <text>  Override summary
  --cover <path>    Use an existing cover image instead of generating one
  --list            List available templates
  --help            Show help
`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") usage(0);
    if (arg === "--list") args.list = true;
    else if (arg.startsWith("--") && argv[i + 1] && !argv[i + 1].startsWith("--")) {
      args[arg.slice(2)] = argv[++i];
    }
  }
  return args;
}

function templateRoots() {
  return [
    path.join(os.homedir(), ".wechat-template-designer", "templates"),
    path.join(rootDir, "templates"),
  ];
}

function listTemplates() {
  const found = [];
  for (const base of templateRoots()) {
    if (!fs.existsSync(base)) continue;
    for (const id of fs.readdirSync(base)) {
      const dir = path.join(base, id);
      const metaPath = path.join(dir, "template.json");
      if (!fs.existsSync(metaPath)) continue;
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      found.push({ id: meta.id || id, name: meta.name || id, dir });
    }
  }
  return found;
}

function resolveTemplate(id) {
  for (const base of templateRoots()) {
    const dir = path.join(base, id);
    const metaPath = path.join(dir, "template.json");
    if (fs.existsSync(metaPath)) {
      return { dir, meta: JSON.parse(fs.readFileSync(metaPath, "utf8")) };
    }
  }
  const options = listTemplates().map((t) => `${t.id} (${t.name})`).join(", ") || "none";
  throw new Error(`Template not found: ${id}. Available templates: ${options}`);
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) return { frontmatter: {}, body: markdown };
  const end = markdown.indexOf("\n---", 4);
  if (end === -1) return { frontmatter: {}, body: markdown };
  const raw = markdown.slice(4, end).trim();
  const frontmatter = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) frontmatter[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return { frontmatter, body: markdown.slice(end + 4).replace(/^\r?\n/, "") };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code style="font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; background: #F3F4F6; padding: 2px 5px; border-radius: 6px;">$1</code>');
}

function paragraphs(lines) {
  const blocks = [];
  let current = [];
  for (const line of lines) {
    if (!line.trim()) {
      if (current.length) blocks.push(current.join(" "));
      current = [];
    } else {
      current.push(line.trim());
    }
  }
  if (current.length) blocks.push(current.join(" "));
  return blocks;
}

function renderKidlearn(body, title, summary) {
  const lines = body.split(/\r?\n/);
  const html = [];
  let paragraphBuffer = [];
  let listBuffer = [];
  let sectionIndex = 0;

  function flushParagraphs() {
    for (const p of paragraphs(paragraphBuffer)) {
      html.push(`<p style="margin: 0 0 18px; font-size: 16px; color: #1F2937;">${inlineMarkdown(p)}</p>`);
    }
    paragraphBuffer = [];
  }

  function flushList() {
    if (!listBuffer.length) return;
    html.push(`<section style="margin: 0 0 28px; padding: 18px 18px 8px; background: #FFFFFF; border: 2px solid #E5E7EB; border-radius: 20px; box-shadow: 6px 6px 0 #D1D5DB;">`);
    html.push(`<p style="margin: 0 0 12px; color: #22C55E; font-size: 15px; font-weight: 800;">可以直接检查这几项</p>`);
    for (let i = 0; i < listBuffer.length; i++) {
      const border = i === listBuffer.length - 1 ? "" : " border-bottom: 1px solid #E5E7EB;";
      html.push(`<p style="margin: 0 0 10px; padding: 0 0 10px;${border} font-size: 16px;">✓ ${inlineMarkdown(listBuffer[i])}</p>`);
    }
    html.push(`</section>`);
    listBuffer = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("# ")) continue;

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flushParagraphs();
      flushList();
      const colors = ["#3B82F6", "#22C55E", "#FACC15", "#EF4444"];
      const color = colors[sectionIndex % colors.length];
      sectionIndex += 1;
      html.push(`<h2 style="margin: 28px 0 14px; color: #1F2937; font-size: 20px; line-height: 1.45; font-weight: 800;"><span style="display: inline-block; width: 10px; height: 10px; margin-right: 8px; background: ${color}; border-radius: 50%; vertical-align: 2px;"></span>${inlineMarkdown(h2[1])}</h2>`);
      continue;
    }

    const quote = line.match(/^>\s*(.+)$/);
    if (quote) {
      flushParagraphs();
      flushList();
      html.push(`<section style="margin: 0 0 26px; padding: 18px; background: #FFFFFF; border: 2px solid #E5E7EB; border-left: 6px solid #EF4444; border-radius: 18px;"><p style="margin: 0 0 6px; color: #EF4444; font-size: 14px; font-weight: 800;">核心判断</p><p style="margin: 0; color: #1F2937; font-size: 17px; line-height: 1.75; font-weight: 700;">${inlineMarkdown(quote[1])}</p></section>`);
      continue;
    }

    const list = line.match(/^[-*]\s+(.+)$/);
    if (list) {
      flushParagraphs();
      listBuffer.push(list[1]);
      continue;
    }

    const tip = line.match(/^\*\*(Learning Tip|温和提醒)\*\*[：:]\s*(.+)$/i);
    if (tip) {
      flushParagraphs();
      flushList();
      if (/learning/i.test(tip[1])) {
        html.push(`<section style="margin: 0 0 24px; padding: 18px; background: #DBEAFE; border: 1px solid #BFDBFE; border-radius: 18px;"><p style="margin: 0 0 8px; color: #1E40AF; font-size: 14px; font-weight: 800;">LEARNING TIP</p><p style="margin: 0; color: #1F2937; font-size: 16px; line-height: 1.75;">${inlineMarkdown(tip[2])}</p></section>`);
      } else {
        html.push(`<section style="margin: 0 0 24px; padding: 18px; background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 18px;"><p style="margin: 0 0 8px; color: #92400E; font-size: 14px; font-weight: 800;">温和提醒</p><p style="margin: 0; color: #78350F; font-size: 16px; line-height: 1.75;">${inlineMarkdown(tip[2])}</p></section>`);
      }
      continue;
    }

    if (!line) {
      paragraphBuffer.push("");
      continue;
    }
    paragraphBuffer.push(line);
  }

  flushParagraphs();
  flushList();

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
</head>
<body>
  <section style="max-width: 640px; margin: 0 auto; padding: 20px 12px; background: #FFFFFF; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; line-height: 1.85;">
    <section style="margin: 0 0 24px; padding: 22px 20px; background: #FEF3C7; border: 2px solid #FACC15; border-radius: 20px; box-shadow: 6px 6px 0 #D1D5DB;">
      <p style="margin: 0 0 12px;"><span style="display: inline-block; padding: 5px 12px; background: #3B82F6; color: #FFFFFF; border-radius: 999px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">KIDLEARN NOTE</span></p>
      <h1 style="margin: 0 0 14px; color: #EF4444; font-size: 26px; line-height: 1.32; font-weight: 800;">${escapeHtml(title)}</h1>
      ${summary ? `<p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.8;">${escapeHtml(summary)}</p>` : ""}
    </section>
${html.map((line) => `    ${line}`).join("\n")}
  </section>
</body>
</html>
`;
}

function generateCover({ outPath, title, templateDir, coverOverride }) {
  if (coverOverride) {
    fs.copyFileSync(path.resolve(coverOverride), outPath);
    return { path: outPath, mode: "provided" };
  }

  const python = spawnSync("python3", ["-", outPath, title], {
    input: String.raw`
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
out = Path(sys.argv[1])
title = sys.argv[2]
W,H = 900,383
img = Image.new("RGB", (W,H), "#FEF3C7")
d = ImageDraw.Draw(img)
font_paths = ["/System/Library/Fonts/PingFang.ttc", "/System/Library/Fonts/STHeiti Light.ttc", "/Library/Fonts/Arial Unicode.ttf"]
def font(size, bold=False):
    for p in font_paths:
        try:
            return ImageFont.truetype(p, size, index=1 if bold else 0)
        except Exception:
            pass
    return ImageFont.load_default()
F_label, F_title, F_sub = font(28, True), font(48, True), font(26, False)
d.rounded_rectangle([42,38,W-42,H-38], radius=32, fill="#FFFFFF", outline="#FACC15", width=5)
d.rounded_rectangle([60,56,W-60,H-56], radius=28, outline="#D1D5DB", width=4)
for x,y,c,r in [(744,76,"#3B82F6",26),(802,132,"#22C55E",18),(735,270,"#EF4444",22),(120,290,"#FACC15",20)]:
    d.ellipse([x-r,y-r,x+r,y+r], fill=c)
d.rounded_rectangle([92,78,344,122], radius=22, fill="#3B82F6")
d.text((112,84), "KIDLEARN NOTE", font=F_label, fill="white")
chars = list(title)
line1 = "".join(chars[:13])
line2 = "".join(chars[13:25])
d.text((92,150), line1, font=F_title, fill="#EF4444")
if line2:
    d.text((92,215), line2, font=F_title, fill="#1F2937")
d.text((96,310), "DESIGN.md -> 微信文章模板", font=F_sub, fill="#374151")
img.save(out, quality=95)
`,
    encoding: "utf8",
  });
  if (python.status === 0 && fs.existsSync(outPath)) return { path: outPath, mode: "generated" };

  const fallback = path.join(templateDir, "assets", "default-cover.png");
  if (fs.existsSync(fallback)) {
    fs.copyFileSync(fallback, outPath);
    return { path: outPath, mode: "template-default" };
  }
  throw new Error(`Failed to generate cover: ${python.stderr || python.stdout}`);
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.list) {
    for (const template of listTemplates()) console.log(`${template.id}\t${template.name}\t${template.dir}`);
    return;
  }
  for (const required of ["template", "input", "out"]) {
    if (!args[required]) throw new Error(`Missing --${required}`);
  }

  const inputPath = path.resolve(args.input);
  const outDir = path.resolve(args.out);
  const { dir: templateDir, meta } = resolveTemplate(args.template);
  const markdown = fs.readFileSync(inputPath, "utf8");
  const { frontmatter, body } = parseFrontmatter(markdown);
  const title = args.title || frontmatter.title || (body.match(/^#\s+(.+)$/m)?.[1]);
  if (!title) throw new Error("No title found. Provide --title or an H1/frontmatter title.");
  const author = args.author || frontmatter.author || meta.defaultAuthor || "";
  const summary = args.summary || frontmatter.summary || frontmatter.digest || frontmatter.description || "";

  fs.mkdirSync(outDir, { recursive: true });
  const htmlPath = path.join(outDir, "article.html");
  const coverPath = path.join(outDir, "cover.png");
  const publishPath = path.join(outDir, "publish.json");
  const reportPath = path.join(outDir, "report.md");

  const html = renderKidlearn(body, title, summary);
  fs.writeFileSync(htmlPath, html);
  const cover = generateCover({ outPath: coverPath, title, templateDir, coverOverride: args.cover || frontmatter.cover });
  const publish = {
    template: meta.id || args.template,
    title,
    author,
    summary,
    htmlPath,
    coverPath,
    publishCommand: [
      "bun",
      "/Users/bytedance/.hermes/skills/openclaw-imports/baoyu-post-to-wechat/scripts/wechat-api.ts",
      htmlPath,
      "--title",
      title,
      "--author",
      author,
      "--summary",
      summary,
      "--cover",
      coverPath,
    ],
  };
  writeJson(publishPath, publish);
  fs.writeFileSync(reportPath, `# Template Apply Report

- Template: ${meta.name || args.template} (${meta.id || args.template})
- Input: ${inputPath}
- HTML: ${htmlPath}
- Cover: ${coverPath} (${cover.mode})
- Title: ${title}
- Author: ${author || "(none)"}
- Summary: ${summary || "(none)"}

## WeChat Notes

- Rich-text components were rendered as inline-styled HTML.
- Complex image-based components are not auto-generated in V1 beyond the cover.
- Run the publish command in \`publish.json\` to push this article to the WeChat draft box.
`);
  console.log(JSON.stringify({ htmlPath, coverPath, publishPath, reportPath, title, author, summary }, null, 2));
}

try {
  main();
} catch (err) {
  console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
