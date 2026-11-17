# Portfólio GitHub Pages — Felipe Oliveira Lopes

Nova versão do portfólio pessoal de **Felipe Oliveira Lopes** em estética **Tech / Data & AI Moderno (Bento Grid)** com tema **Dark Mode por padrão**, alternância **Light/Dark Mode**, suporte bilíngue **PT / EN**, matriz interativa de habilidades, vitrine de projetos com modal de case studies e galeria de gráficos.

## Estrutura do Projeto

```text
site-github/
├── .nojekyll                       # Garante que o GitHub Pages sirva os arquivos estáticos diretamente
├── index.html                      # Estrutura principal semântica (Single-Page Bento Grid)
├── css/
│   └── styles.css                  # Design system, tokens Dark/Light, paleta Violet/Indigo e responsividade
├── js/
│   ├── data.js                     # Dados estruturados bilíngues (PT / EN)
│   └── app.js                      # Renderização, filtros, modal de galeria, tema e idioma
├── assets/
│   ├── avatar.svg                  # Avatar do perfil
│   ├── Felipe-Oliveira-Lopes-CV.pdf# Currículo para download
│   ├── clients/                    # Logos das instituições e tecnologias
│   └── projects/                   # Thumbnails e gráficos dos projetos (EDA, Churn, NLP)
└── README.md
```

## Como publicar gratuitamente no GitHub Pages (`felipeoliveiralps.github.io`)

1. No GitHub, crie um repositório **público** chamado exatamente **`felipeoliveiralps.github.io`** (sem README/template inicial, se for enviar via Git).
2. Inicialize o Git nesta pasta, faça o commit e envie para a branch `main`:

```bash
git init
git add .
git commit -m "feat: novo portfólio Bento Grid para GitHub Pages"
git branch -M main
git remote add origin https://github.com/felipeoliveiralps/felipeoliveiralps.github.io.git
git push -u origin main
```

3. No repositório do GitHub, acesse **Settings → Pages**:
   - Em **Source**, selecione **Deploy from a branch**.
   - Em **Branch**, selecione `main` e pasta `/ (root)` e clique em **Save**.
4. Em poucos minutos o site estará no ar gratuitamente com HTTPS em:
   `https://felipeoliveiralps.github.io`

## Visualização Local

```bash
python3 -m http.server 8123
```

Depois abra `http://localhost:8123` no navegador.
