// Server-only data access for blog articles.
//
// Production reads from the live Hostinger MySQL database (mysql2). For local
// development and testing you can set ARTICLES_SOURCE=sqlfile to read from the
// bundled SQL dump instead (no database connection required).
//
// Env (see .env.example):
//   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME  — live MySQL
//   ARTICLES_SOURCE=sqlfile                          — use the SQL dump instead
//
// This module is imported only from Server Components, so it never ships to the
// browser (it touches `fs` and `mysql2`, which would break a client bundle).

const USE_SQL_FILE = process.env.ARTICLES_SOURCE === "sqlfile";

/* ========================================================================
   Live MySQL (default)
   ======================================================================== */
let _pool = null;

async function getPool() {
  if (_pool) return _pool;
  const mysql = await import("mysql2/promise");
  _pool = mysql.createPool({
    // Use IPv4 loopback by default: "localhost" can resolve to IPv6 "::1",
    // which Hostinger's MySQL user grants usually don't cover (Access denied
    // for user …@'::1'). 127.0.0.1 matches the localhost grant.
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    charset: "utf8mb4",
  });
  return _pool;
}

async function dbGetArticleBySlug(slug) {
  const pool = await getPool();
  const [rows] = await pool.query("SELECT * FROM `articles` WHERE `slug` = ? LIMIT 1", [slug]);
  return rows[0] || null;
}

async function dbGetAllArticles() {
  const pool = await getPool();
  const [rows] = await pool.query(
    "SELECT `id`,`title`,`slug`,`published_date`,`modified_date`,`author`,`cover_image`,`title_tag`,`a_cat` FROM `articles` ORDER BY `published_date` DESC, `id` DESC"
  );
  return rows;
}

async function dbGetFaqs(articleId) {
  const pool = await getPool();
  const [rows] = await pool.query(
    "SELECT `question`,`answer` FROM `article_faqs` WHERE `article_id` = ? ORDER BY `id` ASC",
    [articleId]
  );
  return rows;
}

/* ========================================================================
   SQL-dump fallback (ARTICLES_SOURCE=sqlfile) — dev / offline testing
   ======================================================================== */
let _sqlCache = null;

function loadSqlDump() {
  if (_sqlCache) return _sqlCache;
  const fs = require("fs");
  const path = require("path");
  const file = path.join(process.cwd(), "u511577297_adhiroha_clean.sql");
  const sql = fs.readFileSync(file, "utf8");
  _sqlCache = {
    articles: parseInsert(sql, "articles", ARTICLE_COLS),
    faqs: parseInsert(sql, "article_faqs", FAQ_COLS),
  };
  return _sqlCache;
}

const ARTICLE_COLS = [
  "id", "title", "slug", "content", "published_date", "modified_date",
  "author", "publisher", "cover_image", "title_tag", "a_cat",
];
const FAQ_COLS = ["id", "article_id", "question", "answer"];

// Parse every `INSERT INTO <table> (...) VALUES (...),(...);` row into objects.
function parseInsert(sql, table, cols) {
  const out = [];
  const re = new RegExp("INSERT INTO `" + table + "` \\([^)]*\\) VALUES\\s*([\\s\\S]*?);\\s*\\n", "g");
  let m;
  while ((m = re.exec(sql)) !== null) {
    for (const row of splitValues(m[1])) {
      const fields = parseFields(row);
      if (fields.length < cols.length) continue;
      const obj = {};
      cols.forEach((c, i) => (obj[c] = unquote(fields[i])));
      out.push(obj);
    }
  }
  return out;
}

// Split "(...),(...)" into top-level tuple bodies, respecting quotes/escapes.
function splitValues(s) {
  const rows = [];
  let depth = 0, cur = "", inq = false, esc = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inq) {
      cur += c;
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === "'") inq = false;
    } else if (c === "'") { inq = true; cur += c; }
    else if (c === "(") { if (depth === 0) cur = ""; else cur += c; depth++; }
    else if (c === ")") { depth--; if (depth === 0) rows.push(cur); else cur += c; }
    else if (depth > 0) cur += c;
  }
  return rows;
}

// Split one tuple body into fields on top-level commas.
function parseFields(row) {
  const fields = [];
  let cur = "", inq = false, esc = false;
  for (const c of row) {
    if (inq) {
      cur += c;
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === "'") inq = false;
    } else if (c === "'") { inq = true; cur += c; }
    else if (c === ",") { fields.push(cur); cur = ""; }
    else cur += c;
  }
  fields.push(cur);
  return fields;
}

function unquote(x) {
  x = x.trim();
  if (x === "NULL") return null;
  if (x.startsWith("'") && x.endsWith("'")) x = x.slice(1, -1);
  return x
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\\\\/g, "\\");
}

/* ========================================================================
   Public API — same shape regardless of source
   ======================================================================== */
export async function getArticleBySlug(slug) {
  if (USE_SQL_FILE) {
    return loadSqlDump().articles.find((a) => a.slug === slug) || null;
  }
  return dbGetArticleBySlug(slug);
}

export async function getAllArticles() {
  if (USE_SQL_FILE) {
    return [...loadSqlDump().articles].sort(
      (a, b) => String(b.published_date).localeCompare(String(a.published_date)) || b.id - a.id
    );
  }
  return dbGetAllArticles();
}

export async function getFaqs(articleId) {
  if (USE_SQL_FILE) {
    return loadSqlDump().faqs.filter((f) => String(f.article_id) === String(articleId));
  }
  return dbGetFaqs(articleId);
}

// All valid article slugs — used to distinguish real internal links from broken
// ones while cleaning article bodies.
export async function getAllSlugs() {
  const rows = await getAllArticles();
  return new Set(rows.map((r) => r.slug));
}

// Every link target that resolves inside this app: article slugs plus the
// top-level route folders under app/(main). Used to classify links in bodies.
export async function getInternalOk() {
  const set = await getAllSlugs();
  try {
    const fs = require("fs");
    const path = require("path");
    for (const d of fs.readdirSync(path.join(process.cwd(), "app", "(main)"), { withFileTypes: true })) {
      if (d.isDirectory() && !d.name.startsWith("[") && !d.name.startsWith(".")) set.add(d.name);
    }
  } catch {
    /* route directory not readable at runtime — slugs alone still work */
  }
  return set;
}
