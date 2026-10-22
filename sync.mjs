#!/usr/bin/env node
import './assert-node-runtime.cjs';
/**
 * Auto-syncing blog mirror for kassellabs.github.io.
 *
 * Fetches every published post LIVE from the kassellabs.io blog GraphQL API and
 * regenerates the mirror in the official Kassel Labs visual identity. Each
 * mirrored post canonicals back to its kassellabs.io/blog/<slug> original — so
 * the blog keeps its rankings while the DR-97 mirror still passes dofollow
 * links to our tool pages.
 *
 * This is the single source of truth for the mirror's content. It reads NOTHING
 * from disk except its own template — new blog posts appear automatically the
 * next time it runs (see .github/workflows/sync-blog-mirror.yml).
 *
 * Usage: node sync.mjs <output-dir>
 * Env:   API_URL (default https://admin.kassellabs.io/graphql)
 *        SITE_URL (default https://kassellabs.io)
 *
 * Requires: marked (npm i marked)
 */
import { writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

const outDir = process.argv[2];
if (!outDir) {
  console.error("Usage: node sync.mjs <output-dir>");
  process.exit(1);
}
const API_URL = process.env.API_URL || "https://admin.kassellabs.io/graphql";
const SITE_URL = (process.env.SITE_URL || "https://kassellabs.io").replace(/\/$/, "");
const CDN_LOGO = "https://kassellabs-static-assets.us-mia-1.linodeobjects.com/images/kassel-labs-logo.svg";
const UTM = "utm_source=github-pages&utm_medium=blog-mirror&utm_campaign=";

const QUERY = `query($limit:Int){
  blogPosts(limit:$limit){
    total
    data {
      slug title publish_date publish_status content
      cover_video { url mime }
      cover_image { url mime }
      blog_author { name }
      blog_tags { name slug }
    }
  }
}`;

async function fetchPosts() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { limit: 500 } }),
  });
  if (!res.ok) throw new Error(`API HTTP ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  return json.data.blogPosts.data
    .filter((p) => p.publish_status === "published" && p.slug && p.content)
    .sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
}

// ---------- helpers ----------
const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function fmtDate(iso, opts) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...opts }).format(new Date(iso));
}
const longDate = (iso) => fmtDate(iso, { year: "numeric", month: "long", day: "numeric" });
const shortDate = (iso) => fmtDate(iso, { year: "numeric", month: "short", day: "numeric" });

function excerpt(md, n = 160) {
  const text = md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > n ? text.slice(0, n).replace(/\s+\S*$/, "") + "…" : text;
}

/** cover element for a card / hero; falls back to gradient + initial. */
function cover(post) {
  if (post.cover_video?.url) {
    return `<video class="cover-media" autoplay muted loop playsinline preload="metadata"><source src="${esc(post.cover_video.url)}" type="${esc(post.cover_video.mime || "video/mp4")}" /></video>`;
  }
  if (post.cover_image?.url) {
    return `<img class="cover-media" src="${esc(post.cover_image.url)}" alt="${esc(post.title)}" loading="lazy" />`;
  }
  return `<span class="initial">${esc((post.title || "?").trim()[0] || "?")}</span>`;
}

const THEME_CSS = `
    :root {
      --background: oklch(0.12 0.01 220); --foreground: oklch(0.98 0 0);
      --card: oklch(0.15 0.015 220); --primary: oklch(0.75 0.15 180);
      --primary-foreground: oklch(0.12 0.01 220); --secondary: oklch(0.2 0.015 220);
      --muted-foreground: oklch(0.65 0 0); --border: oklch(0.28 0.02 220);
      --font-sans: "Outfit", sans-serif; --font-display: "Space Grotesk", sans-serif;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--background); color: var(--foreground);
      font-family: var(--font-sans); font-size: 1.06rem; line-height: 1.75; -webkit-font-smoothing: antialiased; }
    a { color: var(--primary); text-decoration: none; }
    a:hover { text-decoration: underline; text-underline-offset: 3px; }
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .prose-wrap { max-width: 768px; margin: 0 auto; padding: 0 24px; }
    header.site { position: sticky; top: 0; z-index: 50;
      background: color-mix(in oklab, var(--background) 70%, transparent);
      backdrop-filter: blur(24px); border-bottom: 1px solid rgba(255,255,255,0.06);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); }
    header.site .wrap { display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .brand img { height: 24px; width: auto; display: block; }
    header.site nav { display: flex; align-items: center; gap: 26px; }
    header.site nav a { color: var(--muted-foreground); font-size: 0.92rem; font-weight: 500; transition: color 0.15s ease; }
    header.site nav a:hover { color: var(--foreground); text-decoration: none; }
    @media (max-width: 680px) { header.site nav { display: none; } }
    .cover-media { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
    .post-hero { position: relative; width: 100%; height: clamp(220px, 42vw, 400px); overflow: hidden; background: var(--secondary); }
    .post-hero-fade { position: absolute; inset: 0; background: linear-gradient(to top,
      var(--background) 4%, color-mix(in oklab, var(--background) 45%, transparent) 45%, transparent 100%); }
    article.has-hero .prose-wrap { position: relative; margin-top: -90px; }
    .back { display: inline-flex; align-items: center; gap: 8px; color: var(--muted-foreground);
      font-size: 0.92rem; font-weight: 500; margin: 40px 0 28px; }
    article.has-hero .back { position: relative; background: color-mix(in oklab, var(--background) 80%, transparent);
      backdrop-filter: blur(4px); padding: 6px 12px; border-radius: 6px; margin: 0 0 24px; }
    .back:hover { color: var(--foreground); text-decoration: none; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
    .chip { display: inline-block; padding: 4px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 600;
      background: color-mix(in oklab, var(--primary) 15%, transparent); color: var(--primary); }
    .chip.outline { background: var(--secondary); color: var(--muted-foreground); font-weight: 500; }
    h1.title { font-family: var(--font-display); font-size: clamp(2.1rem, 5.4vw, 3.1rem); font-weight: 700;
      line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 22px; text-wrap: balance; }
    .byline { display: flex; align-items: center; gap: 12px; margin-bottom: 44px; }
    .avatar { width: 36px; height: 36px; border-radius: 50%;
      background: color-mix(in oklab, var(--primary) 20%, var(--card)); color: var(--primary);
      font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; }
    .byline .who { font-weight: 600; font-size: 0.95rem; }
    .byline .date { color: var(--muted-foreground); font-size: 0.9rem; }
    .byline .sep { color: var(--border); }
    article .content p { margin: 0 0 1.35em; color: color-mix(in oklab, var(--foreground) 90%, transparent); }
    article .content h2 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; letter-spacing: -0.01em;
      margin: 2em 0 0.6em; color: var(--foreground); }
    article .content h3 { font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; margin: 1.6em 0 0.4em; }
    article .content strong { color: var(--foreground); }
    article .content ul, article .content ol { margin: 0 0 1.35em; padding-left: 1.3em; color: color-mix(in oklab, var(--foreground) 90%, transparent); }
    article .content li { margin-bottom: 0.5em; }
    article .content img { max-width: 100%; height: auto; border-radius: 12px; border: 1px solid var(--border); margin: 1.5em 0; }
    article .content hr { border: 0; height: 1px; background: var(--border); margin: 2.6em 0; }
    article .content blockquote { border-left: 3px solid color-mix(in oklab, var(--primary) 50%, transparent);
      padding-left: 16px; margin: 1.5em 0; font-style: italic; color: color-mix(in oklab, var(--foreground) 80%, transparent); }
    article .content code { font-family: ui-monospace, monospace; background: var(--secondary); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    .cta { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 30px 28px; margin: 3em 0 1em; }
    .cta h3 { font-family: var(--font-display); margin: 0 0 8px; font-size: 1.35rem; font-weight: 700; }
    .cta p { color: var(--muted-foreground); margin: 0 0 18px; }
    .btn { display: inline-flex; align-items: center; gap: 8px; background: var(--primary);
      color: var(--primary-foreground); font-weight: 600; font-size: 0.95rem; padding: 11px 22px;
      border-radius: 6px; transition: opacity 0.15s ease; }
    .btn:hover { opacity: 0.88; text-decoration: none; }
    footer.site { border-top: 1px solid rgba(255,255,255,0.06); margin-top: 64px; padding: 40px 0 32px; background: var(--secondary); }
    footer.site .wrap { display: flex; flex-wrap: wrap; gap: 18px; justify-content: space-between; align-items: center; }
    footer.site p { margin: 0; color: var(--muted-foreground); font-size: 0.85rem; }
    footer.site nav a { color: var(--muted-foreground); font-size: 0.88rem; margin-left: 18px; transition: color 0.15s ease; }
    footer.site nav a:hover { color: var(--foreground); text-decoration: none; }`;

const header = (c) => `
  <header class="site">
    <div class="wrap">
      <a class="brand" href="${SITE_URL}?${UTM}${c}"><img src="${CDN_LOGO}" alt="Kassel Labs" width="150" height="26" /></a>
      <nav>
        <a href="${SITE_URL}?${UTM}${c}">Home</a>
        <a href="${SITE_URL}/projects?${UTM}${c}">Projects</a>
        <a href="${SITE_URL}/about?${UTM}${c}">About</a>
        <a href="${SITE_URL}/blog?${UTM}${c}">Blog</a>
        <a href="${SITE_URL}/contact?${UTM}${c}">Contact</a>
      </nav>
    </div>
  </header>`;

const footer = (c) => `
  <footer class="site">
    <div class="wrap">
      <p>© ${new Date().getUTCFullYear()} Kassel Labs. All rights reserved.</p>
      <nav>
        <a href="${SITE_URL}?${UTM}${c}">Home</a>
        <a href="${SITE_URL}/projects?${UTM}${c}">Intro Creators</a>
        <a href="${SITE_URL}/blog?${UTM}${c}">Blog</a>
      </nav>
    </div>
  </footer>`;

function renderPost(post) {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const tags = post.blog_tags || [];
  const category = tags[0]?.name || "Blog";
  const author = post.blog_author?.name || "Kassel Labs";
  const initials = author.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const hasHero = !!(post.cover_video?.url || post.cover_image?.url);
  const desc = excerpt(post.content);
  const body = marked.parse(post.content);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(post.title)} — Kassel Labs</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(post.title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="Kassel Labs" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..800&family=Space+Grotesk:wght@400..700&display=swap" rel="stylesheet" />
  <style>${THEME_CSS}</style>
</head>
<body>
${header(post.slug)}
  ${hasHero ? `<div class="post-hero">${cover(post)}<div class="post-hero-fade"></div></div>` : ""}
  <article${hasHero ? ' class="has-hero"' : ""}>
    <div class="prose-wrap">
      <a class="back" href="/">← Back to Blog</a>
      <div class="chips">
        <span class="chip">${esc(category)}</span>
        ${tags.slice(1).map((t) => `<span class="chip outline">#${esc(t.name)}</span>`).join("\n        ")}
      </div>
      <h1 class="title">${esc(post.title)}</h1>
      <div class="byline">
        <span class="avatar">${esc(initials || "KL")}</span>
        <span class="who">${esc(author)}</span>
        <span class="sep">·</span>
        <span class="date">${longDate(post.publish_date)}</span>
      </div>
      <div class="content">
${body}
      </div>
      <div class="cta">
        <h3>Ready to create your own?</h3>
        <p>Start making your own cinematic intros today. It only takes a few minutes!</p>
        <a class="btn" href="${SITE_URL}/projects?${UTM}${post.slug}">Explore Our Creators →</a>
      </div>
    </div>
  </article>
${footer(post.slug)}
</body>
</html>
`;
}

function renderIndex(posts) {
  const cards = posts
    .map((p) => {
      const category = p.blog_tags?.[0]?.name || "Blog";
      return `        <a class="post" href="/blog/${p.slug}/">
          <div class="cover">${cover(p)}</div>
          <div class="body">
            <div class="meta"><span class="cat">${esc(category)}</span><span class="date">${shortDate(p.publish_date)}</span></div>
            <h2>${esc(p.title)}</h2>
            <p class="excerpt">${esc(excerpt(p.content, 140))}</p>
            <span class="more">Read more →</span>
          </div>
        </a>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Stories &amp; Inspiration — Kassel Labs</title>
  <meta name="description" content="Discover how people around the world are using Kassel Labs to create unforgettable moments — tutorials, guides, and stories." />
  <link rel="canonical" href="${SITE_URL}/blog" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Stories &amp; Inspiration — Kassel Labs" />
  <meta property="og:description" content="Tutorials and stories from Kassel Labs." />
  <meta property="og:url" content="https://kassellabs.github.io/" />
  <meta property="og:site_name" content="Kassel Labs" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..800&family=Space+Grotesk:wght@400..700&display=swap" rel="stylesheet" />
  <style>${THEME_CSS}
    .hero { padding: 88px 0 64px; border-bottom: 1px solid var(--border);
      background: radial-gradient(ellipse at top left, color-mix(in oklab, var(--primary) 10%, transparent), transparent 55%); }
    .hero h1 { font-family: var(--font-display); font-weight: 700;
      font-size: clamp(2.4rem, 6vw, 3.4rem); letter-spacing: -0.02em; margin: 0 0 16px; }
    .hero h1 .accent { color: var(--primary); }
    .hero p { color: var(--muted-foreground); font-size: 1.12rem; max-width: 640px; margin: 0; }
    main { padding: 56px 0 72px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    @media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 620px) { .grid { grid-template-columns: 1fr; } }
    .post { display: flex; flex-direction: column; min-height: 400px; background: var(--card);
      border: 1px solid var(--border); border-radius: 12px; overflow: hidden; color: inherit;
      transition: border-color 0.18s ease; }
    .post:hover { border-color: color-mix(in oklab, var(--primary) 30%, transparent); text-decoration: none; }
    .cover { aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center;
      overflow: hidden; background: linear-gradient(135deg, color-mix(in oklab, var(--primary) 10%, transparent), color-mix(in oklab, var(--primary) 5%, transparent)); }
    .cover .initial { font-family: var(--font-display); font-weight: 700; font-size: 4.5rem;
      color: color-mix(in oklab, var(--primary) 20%, transparent); }
    .post .body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
    .meta { display: flex; justify-content: space-between; font-size: 0.76rem; margin-bottom: 10px; }
    .meta .cat { color: var(--primary); font-weight: 500; }
    .meta .date { color: var(--muted-foreground); }
    .post h2 { font-family: var(--font-display); font-size: 1.12rem; font-weight: 600;
      margin: 0 0 8px; line-height: 1.35; transition: color 0.15s ease; }
    .post:hover h2 { color: var(--primary); }
    .post .excerpt { color: var(--muted-foreground); font-size: 0.9rem; margin: 0 0 16px; flex: 1;
      display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .post .more { color: var(--primary); font-size: 0.9rem; font-weight: 500; }
  </style>
</head>
<body>
${header("home")}
  <section class="hero">
    <div class="wrap">
      <h1>Stories &amp; <span class="accent">Inspiration</span></h1>
      <p>Discover how people around the world are using Kassel Labs to create unforgettable moments. Mirrored from <a href="${SITE_URL}/blog?${UTM}home">the official blog</a>.</p>
    </div>
  </section>
  <main>
    <div class="wrap">
      <div class="grid">
${cards}
      </div>
    </div>
  </main>
${footer("home")}
</body>
</html>
`;
}

// ---------- build ----------
const posts = await fetchPosts();
if (!posts.length) {
  console.error("Refusing to write: API returned 0 published posts.");
  process.exit(1);
}

// Clean the mirror's blog/ dir so deleted posts disappear too.
const blogDir = join(outDir, "blog");
if (existsSync(blogDir)) rmSync(blogDir, { recursive: true, force: true });

for (const post of posts) {
  const dir = join(outDir, "blog", post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), renderPost(post));
  console.log(`✓ /blog/${post.slug}/`);
}
writeFileSync(join(outDir, "index.html"), renderIndex(posts));
console.log(`✓ / (index) — ${posts.length} posts, newest ${posts[0].slug}`);
