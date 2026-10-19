# João Pedro Soares · Portfólio

Portfólio pessoal de **João Pedro Soares**, engenheiro de software full stack (Java, Spring Boot, React, React Native e Node).

🔗 **Ao vivo:** https://jpsoaresfig.dev
🌐 Disponível em **português**, **inglês** e **espanhol** (`?lang=pt`, `?lang=en`, `?lang=es`).

## Destaques técnicos

- **Starfield em WebGL puro**, escrito à mão (sem three.js): um único draw call, câmera que viaja entre as seções conforme o scroll, quantidade de estrelas e FPS adaptados ao aparelho, pausa com a aba oculta e fallback quando não há WebGL.
- **Leve:** ~70 KB de JavaScript inicial (gzip). O starfield (~3 KB) e o smooth scroll (~5 KB) carregam sob demanda, depois do primeiro paint.
- **Feito para celular:** sem `backdrop-filter` sobre o canvas animado, rolagem nativa no toque, alvos de toque com 44px ou mais e layout testado de 360px a 1440px sem overflow horizontal.
- **i18n sem bibliotecas:** detecta o idioma do navegador, aceita `?lang=` para links diretos, lembra a escolha do visitante e atualiza `<html lang>`, título e meta description.
- **Acessibilidade:** HTML semântico, skip link, foco visível, menu mobile com Esc e gestão de foco, contraste AA e respeito a `prefers-reduced-motion`.
- **Para recrutadores:** CV em PDF para download, resultados-chave em destaque nas principais experiências e imagem de compartilhamento própria para LinkedIn e WhatsApp.
- **SEO:** meta tags, Open Graph com imagem 1200×630 e dados estruturados (JSON-LD `Person`).
- **Analytics sem cookies** (Vercel Web Analytics): visitas, origem e país, sem banner de consentimento. Eventos de download do CV, troca de idioma e cópia de e-mail.
- **Deploy na Vercel** com cache imutável para os assets e headers de segurança (`vercel.json`).

## Stack

React 18 · Vite 5 · Tailwind CSS 4 · WebGL · Lenis

## Estrutura

```
public/
  cv/              currículo em PDF
  og-image.jpg     imagem de compartilhamento
src/
  components/       seções da página e componentes compartilhados
  data/profile.js   dados independentes de idioma (links, stacks, cores)
  i18n/             provider, detecção de idioma e textos (pt, en, es)
  lib/starfield.js  renderer WebGL do fundo
  lib/smoothScroll.js
```

Para editar textos, altere `src/i18n/locales/*.jsx`. Para links, stacks e projetos, `src/data/profile.js`.

## Rodando localmente

Requer Node.js 20 ou superior (o deploy usa Node 24).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em dist/
npm run preview  # serve o build
npm run lint
```

## Contato

[LinkedIn](https://linkedin.com/in/joaopedrosoaresfigueiredo) · [GitHub](https://github.com/Jpsoaresfig) · jpbusinesss@hotmail.com
