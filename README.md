# Alana Maranhão · Estética Avançada (landing page)

Site estático (HTML + CSS + JS, sem dependências). Pronto para GitHub + Vercel.

## Estrutura
- `index.html` página principal · `404.html` página de erro (noindex)
- `assets/css/styles.css` tokens e componentes · `assets/js/main.js` menu, transições, carrosséis, vídeos
- `assets/img/` imagens WebP (480 e 960 px) · `assets/video/` vídeos MP4 + capas WebP
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `vercel.json`
- `scripts/set-site-url.mjs` troca a URL do site em todos os arquivos de uma vez
- `DESIGN-SYSTEM.md` cores, tipografia, espaços e componentes

## O que preencher depois (TODO)
| Item | Arquivo e linha |
|---|---|
| SITE_URL (link do Vercel) | index.html 12, 21, 23, 30, 53, 56, 57, 58 · robots.txt 5 · sitemap.xml 5 (use o script abaixo) |
| Imagem de compartilhamento `og-image.jpg` 1200x630 px, na raiz | index.html 22 |
| Favicons na raiz: `favicon.ico` (32x32), `favicon.svg`, `apple-touch-icon.png` (180x180), `icon-192.png`, `icon-512.png`; depois descomente o bloco | index.html 32 · site.webmanifest |
| Endereço e horário no JSON-LD (só quando existir) | index.html 69 |

## Publicar
1. Crie um repositório no GitHub e envie esta pasta inteira.
2. No Vercel: Add New > Project > importe o repositório. Framework: **Other**. Sem build. Deploy.
3. Pegue o link de produção (ex.: `seu-projeto.vercel.app`) e rode na raiz:
   `node scripts/set-site-url.mjs https://seu-projeto.vercel.app`
   Faça commit e push. Confira `https://seu-projeto.vercel.app/robots.txt` e `/sitemap.xml`.
4. Google Search Console: adicione a propriedade (prefixo de URL), verifique (meta tag ou arquivo HTML), envie `sitemap.xml` e peça indexação da home em "Inspeção de URL".
5. Domínio próprio no futuro: adicione no Vercel (Settings > Domains), redirecione o `.vercel.app` para ele, rode o script de novo com o novo domínio, e cadastre o domínio novo no Search Console reenviando o sitemap.

Obs.: links de preview do Vercel ficam com noindex por padrão; verifique sempre no link de produção. A indexação depende da avaliação do próprio Google.
