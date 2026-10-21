// Uso (na raiz do projeto):  node scripts/set-site-url.mjs https://seu-projeto.vercel.app
// Troca o placeholder SITE_URL em index.html, robots.txt e sitemap.xml de uma vez.
import { readFileSync, writeFileSync } from "node:fs";

const PLACEHOLDER = "https://TROCAR-PELO-LINK-DO-VERCEL.vercel.app";
const url = (process.argv[2] || "").replace(/\/+$/, "");
if (!/^https:\/\/[^\s/]+$/.test(url)) {
  console.error("Informe a URL de produção, ex.: node scripts/set-site-url.mjs https://seu-projeto.vercel.app");
  process.exit(1);
}
for (const file of ["index.html", "robots.txt", "sitemap.xml"]) {
  const before = readFileSync(file, "utf8");
  const after = before.split(PLACEHOLDER).join(url);
  writeFileSync(file, after);
  console.log(`${file}: ${before.split(PLACEHOLDER).length - 1} ocorrência(s) trocada(s)`);
}
