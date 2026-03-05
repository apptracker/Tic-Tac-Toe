# AGENTS.md

## Cursor Cloud specific instructions

This is a static HTML Tic-Tac-Toe game (井字過三關) with no build tools, package manager, or dependencies. The entire application lives in a single `index.html` file with inline CSS and JavaScript.

### Running the dev server

Serve the project root with any static HTTP server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in a browser.

### Notes

- **No build step** — there is no bundler, transpiler, or compilation step.
- **No linter/tests** — no ESLint, Prettier, or test framework is configured.
- **No package manager** — no `package.json`, `requirements.txt`, or similar.
- **Deployment** — two GitHub Actions workflows deploy on push to `main`:
  - `.github/workflows/deploy-pages.yml` → GitHub Pages
  - `.github/workflows/deploy-cloudflare.yml` → Cloudflare Pages（需要 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID` secrets）
