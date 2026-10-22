# FROM PROBLEMS TO SOFTWARE | JOÃO PEDRO FIGUEIREDO
### Pacote de produção — vídeo de marca pessoal

---

## 1. Conceito criativo e título

**Título definitivo:** *FROM PROBLEMS TO SOFTWARE | JOÃO PEDRO FIGUEIREDO*

**Tese central:** João Pedro não apenas escreve código. Ele conecta software, automação e necessidades reais para transformar problemas complexos em soluções funcionais.

**Formato:** filme de motion graphics editorial (documentário técnico + tipografia cinética + diagramas de fluxo), construído sobre materiais reais — capturas dos produtos, foto do teste de campo do E-PROCON, pôster do TCC e foto da equipe do Sicredi. Não há rosto gerado por IA, avatar ou interface falsa apresentada como produto real; todo diagrama conceitual está rotulado como tal na tela.

## 2. Estratégia de posicionamento

| Pilar | Prova usada no vídeo |
|---|---|
| A · Engenharia de software | Camadas front/back/dados/móvel/infra; Código da Vida (desenvolvedor principal); plataforma Ouse Passar; Shark Smokehouse |
| B · Automação e IA aplicada | Agentes OpenAI/Gemini + n8n (Ouse Passar); robô UiPath + Python (Sicredi) — IA mostrada como componente, não mágica |
| C · Tecnologia conectada ao negócio | E-PROCON (≈70%), Sicredi (≈10% e ≈5%), Mestrado em Gestão e Tecnologias de Processos de Negócio (UGR) |

**Senioridade:** "Full Stack Software Engineer" com 3+ anos, sem rótulos de sênior/arquiteto. Resultados coletivos sempre com linguagem de equipe ("contribuí", "co-desenvolvimento", "trabalho de equipe", "resultado informado no projeto").

## 3. Versões entregues

| Arquivo | Narração | Textos na tela | Legenda queimada | Duração |
|---|---|---|---|---|
| `FROM_PROBLEMS_TO_SOFTWARE_EN.mp4` | Inglês (EUA) | Inglês | Inglês | ≈5:33 |
| `FROM_PROBLEMS_TO_SOFTWARE_EN_legenda_ES.mp4` | Inglês | Inglês | Espanhol | ≈5:33 |
| `FROM_PROBLEMS_TO_SOFTWARE_EN_legenda_PT.mp4` | Inglês | Inglês | Português | ≈5:33 |
| `FROM_PROBLEMS_TO_SOFTWARE_EN_sem_legenda.mp4` | Inglês | Inglês | — (para subir SRT no LinkedIn/YouTube) | ≈5:33 |
| `EN_legendas_en.srt`, `EN_legendas_es.srt`, `EN_legendas_pt.srt` | — | — | legendas sincronizadas com a versão em inglês | — |

Versão principal: **100% em inglês** (narração e textos de tela), com legendas em espanhol ou português. No portfólio (`public/video`) a legenda acompanha o idioma do site e há capítulos clicáveis abaixo do player (tempos gerados por `web.py` em `src/data/film-chapters.json`).

Especificação: 1920×1080, 16:9, 30 fps, H.264 (CRF 17–18), AAC 192 kbps estéreo 48 kHz.

## 4. Estrutura e storyboard

A duração de cada cena acompanha a narração real de cada idioma (as animações são sincronizadas por frase). Tempos abaixo referentes à versão em espanhol.

| # | Cena | Função | Visual | Material real |
|---|---|---|---|---|
| 1 | Abertura | Capturar o tech lead com a ideia "todo sistema começa com um problema" | Frase em serifada itálica; pipeline Problema → Interface → Lógica → Dados → Serviços → Infraestrutura se constrói com pacotes de dados fluindo; revelação do nome com tracking que se fecha | — |
| 2 | Quem sou | Credibilidade em 30 s | Nome em tipografia grande; cartões: 3+ anos, UNIPÊ 2025, Granada, Mestrado UGR 2026–2027; diagrama de Venn "Engenharia de software × Processos de negócio" | — |
| 3 | Como trabalho | Mostrar método de raciocínio | 7 etapas que acendem em sincronia com a fala; pergunta final "o que muda na operação?"; nota "representação conceitual" | — |
| 4 | Engenharia full stack | Amplitude técnica agrupada por função | Bandas por camada com chips de tecnologia que acendem quando citadas; depois captura real do Código da Vida → Ouse Passar ao lado do fluxo Interface → Backend → Dados → Serviços → Infra | Capturas Código da Vida e Ouse Passar |
| 5 | Impacto real | Núcleo do vídeo: resultados com contexto | Frase de transição; E-PROCON com foto do teste de campo e fluxo Antes/Depois (rotulado como ilustrativo); **≈70%** em contagem + barras relativas + chips "trabalho em equipe / interoperabilidade / LGPD"; SiCAPS (mapa conceitual rotulado); Sicredi com foto da equipe e **≈10%** (manual → robô UiPath, barra de capacidade); **≈5%** PDF (barras antes/depois); síntese em 3 cartões com nota "resultados informados · em equipe · aproximados" | Foto do teste de campo E-PROCON; foto da equipe Sicredi |
| 6 | IA e automação | IA aplicada como diferencial, sempre integrada ao sistema | Frase "A IA não é mágica"; diagrama Dados → n8n → OpenAI/Gemini → Backend → Produto/Serviços externos (Ouse Passar); painel "IA aplicada" com 4 cartões sincronizados à fala: agentes de IA, assistentes com LLMs, geração de imagens com Gemini, integrações n8n; loop "tarefa repetitiva → robô/script → tempo liberado" (Sicredi) | — |
| 7 | Projetos e curiosidade técnica | Prova de raciocínio comparativo + produto próprio | Foto do pôster do TCC; **memória em repouso** 271 MiB (Spring Boot) vs 21 MiB (Quarkus) — Tabela 1 do TCC — e o trade-off: Spring Boot com menor latência e maior throughput, Quarkus com menos CPU/memória (3 pods contra 10 com HPA); captura real Shark Smokehouse + stack + **61 usuários cadastrados em produção** + checkout transacional, PIX com webhook assinado, fidelidade/PDV/CRM, 28 arquivos de testes (Vitest) | Foto do pôster; captura Shark Smokehouse |
| 8 | Trajetória e visão | Coerência da carreira + dimensão humana | Gantt com os 5 períodos exatamente como informados (sobreposição visível, com nota); Granada + mestrado + idiomas com níveis (sem foto); frase humana em 3 linhas | — |
| 9 | Encerramento | Próximo passo claro | Frase de convite; tela final com nome, cargo, LinkedIn, GitHub e e-mail | — |

## 5. Direção visual

- **Paleta:** grafite profundo `#0B0D11` com gradiente sutil e grade quase invisível; texto `#ECEFF3`; secundário `#8C96A2`; **destaque único azul `#4DA3FF`** para ênfase, métricas e fluxos ativos.
- **Tipografia:** Bahnschrift (títulos, nome, métricas) · Georgia Itálico (frases editoriais) · Segoe UI (texto e nós) · Consolas (rótulos técnicos, notas, kicker numerado).
- **Sistema de títulos:** kicker numerado `01 QUIÉN SOY` com traço azul; cabeçalho fixo discreto com nome e título do filme.
- **Métricas:** número gigante com "≈" explícito, contagem animada, sempre acompanhado de contexto e de nota de rodapé sobre a origem.
- **Diagramas:** nós arredondados, conexões finas, pacotes de dados percorrendo os fluxos; nó ativo ganha contorno azul. Todo diagrama não oficial é rotulado "ilustrativo/conceitual".
- **Imagens reais:** painéis com cantos arredondados e Ken Burns lento (zoom 0–12%); legenda "CAPTURA REAL" abaixo.
- **Transições:** fade por fundo (sem efeitos chamativos); elementos sobem 14–24 px com easing cúbico.
- **Código:** não foi exibido código para não apresentar trechos inventados como seus (ver item 7).

## 6. Música e som

Trilha **original**, gerada proceduralmente (sem licenciamento de terceiros): pad ambiente em Lá menor (Am–Fmaj7–C–G, 8 s por acorde) com sub-grave suave; arpejo discreto entra na cena 4 e sai antes da cena 8 (energia crescente nas demonstrações técnicas); acentos graves suaves no instante de cada métrica (70%, 10%, 5%, 271/21 MiB). Ducking automático de −6 dB sob a voz; fade-in de 3 s e fade-out de 6 s.

**Narração:** vozes neurais Microsoft (es-ES Álvaro, en-US Andrew, pt-BR Antonio), velocidade −4%. Pronúncias ajustadas: "Ouse Pasar", "Inovatec J P", "ene ocho ene" (n8n), "ele ge pe de" (LGPD), "mebibytes".

> Recomendação: para máxima autenticidade, grave você mesmo a narração usando o roteiro (`producao/roteiro.py`). Basta salvar cada frase como `producao/build/<idioma>/narr/<id>.mp3` e rodar de novo os passos `timeline.py` e `render.py` — as animações se reajustam sozinhas à sua voz.

## 7. Materiais que melhorariam a próxima versão

1. **Vídeo curto seu** (10–20 s, celular na horizontal) trabalhando ou falando para a câmera — substituiria a abstração da cena 8.
2. **Trechos de código reais** do repositório Shark_SmokeHouse ou do APEX Print Server (sem segredos/tokens) para uma cena de código.
3. **Gravação de tela** navegando no Código da Vida, Ouse Passar e Shark Smokehouse (30 s cada).
4. **Diagrama real** (se puder ser divulgado) do E-PROCON ou do SiCAPS.
5. ~~Metodologia do TCC~~ — recebida: os 271/21 MiB são memória em estado ocioso (GKE, APIs CRUD equivalentes, JMeter).
6. Confirmação de qual pessoa é você na foto do pôster, se quiser destaque.

## 8. Versões curtas (roteiros)

### 60 s — LinkedIn
| Tempo | ES | EN | PT |
|---|---|---|---|
| 0–6 | Todo sistema empieza con un problema. | Every system starts with a problem. | Todo sistema começa com um problema. |
| 6–14 | Soy João Pedro, ingeniero full stack con más de tres años en desarrollo, automatización y soporte de TI. | I'm João Pedro, a full stack engineer with 3+ years in development, automation and IT support. | Sou João Pedro, engenheiro full stack com mais de três anos em desenvolvimento, automação e suporte de TI. |
| 14–26 | Java y Spring Boot, React y TypeScript, Python, SQL, y aplicaciones para web, iOS y Android. | Java and Spring Boot, React and TypeScript, Python, SQL, and apps for web, iOS and Android. | Java e Spring Boot, React e TypeScript, Python, SQL, e aplicações para web, iOS e Android. |
| 26–40 | En equipo, contribuí a E-PROCON: cerca de un 70% menos de tiempo de procesamiento. En Sicredi, una automatización liberó cerca de un 10% de capacidad operativa. | As part of a team, I contributed to E-PROCON: around 70% less processing time. At Sicredi, an automation freed about 10% of operational capacity. | Em equipe, contribuí para o E-PROCON: cerca de 70% menos tempo de processamento. No Sicredi, uma automação liberou cerca de 10% de capacidade operacional. |
| 40–50 | Integro IA con OpenAI, Gemini y n8n como parte del sistema, no como magia. Hoy curso un máster en procesos de negocio en Granada. | I integrate AI with OpenAI, Gemini and n8n as part of the system, not as magic. I'm now doing a master's in business processes in Granada. | Integro IA com OpenAI, Gemini e n8n como parte do sistema, não como mágica. Hoje curso um mestrado em processos de negócio em Granada. |
| 50–60 | Si tienes un reto técnico, hablemos. | If you have a technical challenge, let's talk. | Se você tem um desafio técnico, vamos conversar. |
Visual: reaproveitar cenas 1 (nome), 4A (camadas), 5 (cartões 70/10/5), 6 (diagrama IA), 9 (tela final).

### 30 s — apresentações rápidas
ES: *Todo sistema empieza con un problema. Soy João Pedro, ingeniero full stack: Java, Spring Boot, React, TypeScript y automatización con IA. Contribuí a reducir cerca de un 70% el tiempo de procesamiento en E-PROCON y a liberar un 10% de capacidad en Sicredi. Si tienes un reto técnico, hablemos.*
EN: *Every system starts with a problem. I'm João Pedro, a full stack engineer: Java, Spring Boot, React, TypeScript and AI-powered automation. I helped cut E-PROCON's processing time by around 70% and free 10% of capacity at Sicredi. If you have a technical challenge, let's talk.*
PT: *Todo sistema começa com um problema. Sou João Pedro, engenheiro full stack: Java, Spring Boot, React, TypeScript e automação com IA. Contribuí para reduzir cerca de 70% do tempo de processamento no E-PROCON e liberar 10% de capacidade no Sicredi. Se você tem um desafio técnico, vamos conversar.*

### 15 s — divulgação do portfólio
ES: *Del problema al software. João Pedro Figueiredo, Full Stack Software Engineer. Proyectos reales, resultados reales. github.com/Jpsoaresfig*
EN: *From problems to software. João Pedro Figueiredo, Full Stack Software Engineer. Real projects, real results. github.com/Jpsoaresfig*
PT: *Do problema ao software. João Pedro Figueiredo, Full Stack Software Engineer. Projetos reais, resultados reais. github.com/Jpsoaresfig*

## 9. Checklist de qualidade e veracidade

| Item | Status |
|---|---|
| Cargos e períodos exatamente como informados (Dev Dynamos mar–out 2023; Sicredi suporte out 2023–mai 2024; Sicredi estágio mai 2024–set 2025; Inovatec-JP out 2025–ago 2026; Ouse Passar jan–jul 2026) | ✔ Gantt mostra a sobreposição com nota, sem história inventada |
| Formação: Ciência da Computação UNIPÊ 2025; Máster UGR 2026–2027 | ✔ |
| Idiomas: PT nativo; EN C1 escrita / B2 oral; ES B2 compreensão / B1 expressão | ✔ exatamente como informado |
| Métricas: ≈70% (E-PROCON), ≈10% (Sicredi automação), ≈5% (Sicredi PDF), 271 vs 21 MiB de memória em repouso (TCC, Tabela 1), 61 usuários cadastrados (Shark, painel admin) | ✔ sempre com "≈", contexto e nota de origem; nenhum valor absoluto, usuário, receita ou hora inventados |
| Linguagem de equipe nos resultados coletivos | ✔ E-PROCON "contribuí/trabajo de equipo", SiCAPS "co-desarrollo", TCC "en equipo con…" |
| Afirmações individuais (Código da Vida "desenvolvedor principal"; Shark "projetei e desenvolvi"; robô UiPath; gerador de PDF) | ✔ conforme seu LinkedIn e portfólio |
| Tecnologias por experiência | ✔ só as informadas; Docker apenas na banda geral (confirmado no Inovatec e repositórios); React Native e cloud AWS/GCP **não** citados por falta de exemplo concreto no material |
| Nota máxima do TCC | ✔ confirmada no seu post do LinkedIn |
| Links e contato | ✔ LinkedIn, GitHub e e-mail; telefone **não** exibido |
| Imagens | ✔ print do Google Meet não usado (expunha nomes e e-mails de terceiros); nenhuma credencial/token visível nas capturas |
| Diagramas | ✔ rotulados "ilustrativo/conceitual" |
| Recomendações de colegas, prêmios, salários, clientes extras | ✔ não incluídos |

## 10. Revisão como espectador

- **Tech lead:** entende o que você faz (camadas + fluxos), vê provas (capturas reais, métricas com contexto, comparação do TCC com ressalvas) e tem o GitHub na tela final. Ponto fraco: ausência de código real — resolver com o item 7.2.
- **Engineering manager:** trajetória coerente (infra → dados → automação → produto), foco em impacto operacional (pergunta "o que muda na operação?") e linguagem de colaboração.
- **Recrutador internacional:** perfil claro nos primeiros 40 s, três idiomas de narração, LinkedIn/GitHub/e-mail legíveis no final.

## 11. Publicação

**LinkedIn**
1. Suba `FROM_PROBLEMS_TO_SOFTWARE_EN.mp4` (ou ES, se o foco for Espanha) como vídeo nativo — não como link.
2. Texto sugerido (EN): *Every system starts with a problem. I put together a short film about how I work: full stack engineering, automation and AI as part of real systems, and the results our teams achieved — like ~70% less processing time on E-PROCON. Versions in English, Spanish and Portuguese in the comments. GitHub: github.com/Jpsoaresfig*
3. Coloque o vídeo também na seção **Destaques** (Featured) do perfil.
4. Os vídeos com legenda queimada funcionam com autoplay sem som; use o `_sem_legenda` + SRT se preferir legendas selecionáveis.

**GitHub**
1. Suba o vídeo no YouTube (não listado ou público) e adicione ao README do perfil (`Jpsoaresfig/Jpsoaresfig`):
   `[![From Problems to Software](thumbnail.png)](https://youtu.be/SEU_LINK)`
2. Ou arraste o .mp4 (até 10 MB no plano gratuito — exporte uma versão 720p se necessário) direto num comentário/README pelo editor web do GitHub.

**Recrutadores**
- Envie o link (YouTube/Drive), não o arquivo. Mensagem curta: *"Hola, [nombre]. Te comparto un vídeo de 4 minutos sobre mi trabajo como Full Stack Engineer (Java/Spring Boot, React/TypeScript, automatización). Hay versión en español, inglés y portugués. ¿Te parece si hablamos esta semana?"*

## 12. Como reproduzir / editar

```
cd video/producao
python narracao.py en          # gera a voz (edge-tts; precisa de internet)
python timeline.py en          # timeline + trilha + mix + SRT
python render.py en            # renderiza e exporta para ../entrega
python web.py en               # versão leve do site (public/video), legendas VTT e capítulos (src/data/film-chapters.json)
python render.py en --stills 10 60   # quadros de conferência
```
Textos da narração: `roteiro.py`. Textos de tela: `textos_tela.py`. Layout e animação: `render.py`.
Dependências: Python 3.13, pillow, numpy, imageio-ffmpeg, edge-tts. No Windows, rode com `OPENBLAS_NUM_THREADS=1` (vários processos de render em paralelo esgotam a memória do OpenBLAS).
Arquivos pesados (`producao/build/`, `entrega/*.mp4`) ficam fora do git.
