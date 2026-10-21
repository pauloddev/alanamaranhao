# Design system · Alana Maranhão

Direção: luxo suave, feminino e delicado. Grafite do logo sobre creme quente, serifada de alto contraste, linhas finas, arcos.

## Tokens (assets/css/styles.css, `:root`)
| Token | Valor | Uso |
|---|---|---|
| `--paper` | oklch(0.978 0.005 80) | fundo principal |
| `--cream` | oklch(0.948 0.009 80) ≈ #EFECE6 | seções alternadas (cor do fundo do logo) |
| `--silk` / `--stone` | tons de creme mais escuros | superfícies, linhas finas |
| `--champagne` | oklch(0.76 0.04 76) | ornamentos, nunca texto |
| `--graphite` | oklch(0.50 0.006 70) ≈ #6B6B6B | cor do logo, itálicos dos títulos |
| `--ink` / `--ink-soft` | grafites escuros | texto (contraste AA) |
| `--ink-deep` / `--on-deep` | grafite profundo / creme | seções invertidas (Serviços, CTA final) |

Tipografia: Cormorant Garamond (títulos, itálico de destaque) + Jost (texto e rótulos em caixa alta espaçada). Escalas fluidas com `clamp()`.
Movimento: `--ease-out` cubic-bezier(0.22,1,0.36,1); entradas de 1s com opacidade e 18px de deslocamento; imagens com revelação por recorte. Tudo desligado em `prefers-reduced-motion`.

## Componentes
| Componente | Classe | Variantes / estados |
|---|---|---|
| Botão | `.btn` | `--ghost`, `--light`, `--ghost-light`; hover, active (scale .98), focus-visible; altura mín. 52px |
| Link sublinhado | `.link-line` | hover encolhe o traço |
| Rótulo | `.eyebrow` | traço champagne + caixa alta |
| Moldura em arco | `.arch` | imagens de retrato |
| Carrossel de vídeo | `[data-carousel]` + `.reel` | `--wide` (4:5) e `--tall` (9:16); setas desabilitam nas pontas; vídeo toca só quando visível |
| Mosaico | `.mosaic` | `.is-hero` 2x2 em arco, `.mosaic__note` cartão escuro |
| Galeria por noiva | `.look` | uma noiva por bloco, para não misturar histórias |
| FAQ | `.faq__item` (`<details>`) | acessível por teclado nativamente |
