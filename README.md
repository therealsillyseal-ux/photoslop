# Photoslop — Vercel import version

A static, browser-only image editor. No installation, build, API keys, database, Python server or Electron process is required on Vercel.

## Import with GitHub

1. Extract this ZIP. Its ROOT contains `vercel.json`, `README.md`, `LICENSE`, and `public/`.
2. Create a GitHub repository and upload these extracted files/folders at the repository root. Do NOT upload just the ZIP, and do NOT upload only the contents of public/.
3. In Vercel, choose Add New → Project and import your GitHub repository.
4. Choose Framework Preset **Other**. Leave Root Directory as the repository root. The included vercel.json sets Output Directory to **public**, and skips build and install commands.
5. If Vercel asks for overrides, enable Build Command override and leave it empty; set Output Directory to `public`. No environment variables are needed.
6. Click Deploy. Open the resulting HTTPS site.

If you upload the entire Photoslop-Vercel folder instead of its contents, set Vercel's Root Directory to that folder. Keep vercel.json and public/ together.

Vercel's Git Import Project flow imports a repository; this ZIP is a prepared repository, not a ZIP upload directly into that flow. The ZIP also works with Vercel CLI: from this extracted directory run `npx vercel`, select the project, then use `npx vercel --prod` when ready. This requires your own Vercel account/login; it has not been deployed by this package build.

## What's included

Image import/drop/paste, brush/eraser, selections, layers and transforms, inline editable text, font controls, undo/redo, image-project save/open, PNG downloads and customizable shortcuts. The matching Ps favicon is included.

AI/video controls are omitted from the web UI. The Full app button says: “The full version is coming soon as an app!” No GitHub URL is set yet. When the real app release is ready, set `FULL_APP_URL` in **public/web.js** to your real HTTPS github.com repository/release URL, then commit/push to redeploy. Do not add app secrets or private keys to public/; all its files are publicly downloadable.

## Browser and privacy notes

Use recent Edge/Chrome. Clipboard access needs browser permission and may be restricted by browser/OS shortcuts even on HTTPS. Fonts use families installed/available in the browser; system font listing remains a desktop feature. Browser settings persist in localStorage per site/origin, so they do not automatically migrate from localhost or another hostname.

Images are processed in browser memory, not uploaded by this editor. Saved projects and PNGs download to your computer. Hosting requests and their metadata are still handled by Vercel. Save often; there is no autosave/crash recovery. Don't delete downloaded project files.

## Validation

The config was checked against Vercel's public JSON schema; public assets match the tested web edition. Browser image/text/project/download/clipboard regressions passed locally with permissions granted. Actual account import/deployment on Vercel has not been performed.

## Official references

- Static build settings: https://vercel.com/docs/builds/configure-a-build
- File-based configuration: https://vercel.com/docs/project-configuration/vercel-json
