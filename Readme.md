# Tic-Tac-Toe
井字過三關遊戲

## 免費部署 (GitHub Pages)

1. 前往 GitHub 倉庫 **Settings** → **Pages**
2. 在 **Build and deployment** 區塊，將 **Source** 設為 **GitHub Actions**
3. 推送程式碼後，Actions 會自動部署
4. 部署完成後，遊戲網址為：`https://<你的用戶名>.github.io/Tic-Tac-Toe/`

## 免費部署 (Cloudflare Pages)

1. 前往 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **API Tokens** → 建立 Token（需要 **Cloudflare Pages: Edit** 權限）
2. 記下你的 **Account ID**（在 Cloudflare Dashboard 首頁右側欄）
3. 前往 GitHub 倉庫 **Settings** → **Secrets and variables** → **Actions**，新增：
   - Secret: `CLOUDFLARE_API_TOKEN` — 你的 API Token
   - Secret: `CLOUDFLARE_ACCOUNT_ID` — 你的 Account ID
4. 推送程式碼到 `main` 分支後，Actions 會自動部署到 Cloudflare Pages
5. 部署完成後，遊戲網址為：`https://apptrackerhk-tic-tac-toe.pages.dev`
