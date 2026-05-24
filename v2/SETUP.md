# Phase E — Google Apps Script deploy walkthrough

This is the one-time setup for the Sessions-Sheet backend per brief §8. Phase E *prep* (the files in this folder — `Code.gs`, `appsscript.json`, this README) is already done; this walkthrough is what you run when you're ready to deploy.

After deploy, students will load the game from a single GAS web-app URL, their sessions auto-log to a Google Sheet, and they'll get a "My Cities" past-attempts view. You'll get the Sheet for the roster + scores.

Plan ~30–45 minutes the first time.

## 0. Before you start

You need:
- A Google account with permission to create Apps Script projects on the AISC Workspace (your normal `matthew.ignash@aischennai.org` should be fine).
- Node.js installed (you already have this — used for the site).
- A few minutes uninterrupted — the deploy has a few prompts and dashboard clicks.

## 1. Install `clasp` (Google Apps Script CLI)

```bash
npm install -g @google/clasp
```

Verify:

```bash
clasp --version
```

## 2. Authorise `clasp` with your Google account

```bash
clasp login
```

This opens a browser tab, you click "Allow," it writes credentials to `~/.clasprc.json`. Use your AISC Google account.

## 3. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new sheet.
2. Name it **"Tectonic City Builder Sessions"** (or whatever — the name doesn't matter for the code).
3. Copy the **Sheet ID** from the URL. The URL looks like `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit#gid=0` — the part between `/d/` and `/edit` is the ID. It's about 44 characters.

## 4. Create the GAS project

1. Go to <https://script.google.com> and click **New project**.
2. Name it **"Tectonic City Builder v2"**.
3. Copy the **Script ID** from the URL: `https://script.google.com/u/0/home/projects/SCRIPT_ID_HERE/edit`.

## 5. Pull the project into `v2/` with `clasp clone`

From this folder (`Plate-Tectonics-City-Builder/`):

```bash
cd v2
clasp clone <SCRIPT_ID>
```

`clasp` will warn that files already exist (`appsscript.json`, `Code.gs`) — that's fine; the local files are the source of truth and `clasp push` overwrites the GAS-side defaults.

This creates a `.clasp.json` in `v2/` pointing at your GAS project. Add it to `.gitignore` if you don't want script IDs in version control; otherwise it's harmless (the script ID isn't a secret on its own).

## 6. Fill in the Sheet ID in `Code.gs`

Open `v2/Code.gs`, find:

```js
const SHEET_ID = "REPLACE_WITH_SPREADSHEET_ID";
```

Replace with the Sheet ID from step 3.

## 7. Push to GAS

```bash
clasp push
```

This uploads `Code.gs` and `appsscript.json` to the GAS project. Open the GAS editor (`clasp open` or visit your script URL) to verify the files appear.

## 8. Run `setupSheets()` once to create the worksheets

In the GAS editor:

1. From the function dropdown at the top, select **`setupSheets`**.
2. Click **Run**.
3. First time only: a permissions dialog appears. Click **Review permissions** → choose your AISC account → "Allow" (you're authorising your own script to read/write your own Sheet).
4. The execution log should show: `setupSheets complete — Sessions, Roster, and CaseStudyViews are ready.`

Open the Sheet — three worksheets should exist with frozen header rows.

## 9. Deploy as a Web App

In the GAS editor:

1. Click **Deploy → New deployment** (top-right).
2. **Select type → Web app**.
3. Config:
   - **Description:** "v2 Phase E initial"
   - **Execute as:** "User accessing the web app" *(important — this is what makes student authentication automatic)*
   - **Who has access:** "Anyone within American International School Chennai" *(or "Anyone with the link" if you want to allow external preview, but domain-restricted is the right student-facing choice)*
4. Click **Deploy**.
5. Copy the **Web app URL** — looks like `https://script.google.com/macros/s/.../exec`. That's the URL students bookmark.

## 10. Test the deploy

Open the web-app URL in an incognito window signed in as an AISC student account (or use your teacher account first to smoke-test). You should see the Phase E pending placeholder page that `doGet()` returns.

This is where **Phase E execution** picks up — porting the v2 HTML/CSS/JS into the GAS HTML-include format so the real game serves from this URL.

## 11. (Later) Update the site to iframe the GAS URL

When Phase E execution is complete and the game serves from the GAS URL, update the site at `hs-earth-env-site/src/units/unit-3/tectonic-city-builder.njk`:

- Replace the iframe `src="/assets/simulators/tectonic-city-builder.html"` with the GAS web-app URL.
- Remove the v1-warn callout (no longer accurate — v2 is live).

That commit shifts the site from "iframing v1" to "iframing v2 with logging."

## What's already done vs. what's next

**Phase E prep (this folder — done):**
- `Code.gs` — full server-side code: `setupSheets()`, `doGet()`, `getCurrentUser()`, `registerStudent()`, `saveSession()`, `getMyHistory()`, `logCaseStudyView()`
- `appsscript.json` — manifest with the right OAuth scopes + domain-restricted web app access
- This SETUP.md

**Phase E execution (later — when you do steps 1–10 above):**
- Port `index.html` / `styles.css` / `game.js` / `sprites.js` / etc. into the GAS HTML-include format (`<?!= include('styles') ?>` etc.). The current v2 file structure isn't GAS-native.
- Add the client → server calls: replace TODO save markers with `google.script.run.saveSession(...)`.
- Add the "My Cities" past-attempts screen: title-screen button → screen that calls `getMyHistory()` → renders a list of past attempts as cards.
- Add the optional teacher dashboard route — accessible at `?dashboard=1` for `matthew.ignash@aischennai.org` only.

## Open design questions to resolve at execution time

These are flagged in the main `CLAUDE.md` brief §11 — decide before you start Phase E execution:

1. **Save trigger:** auto-save on debrief vs. explicit "Save my work" button. Brief recommends explicit; agree.
2. **Reflection prompt content:** what does the optional post-debrief reflection ask? Brief recommends 2–3 scenario-specific prompts.
3. **Replay capability:** view-only past attempts (recommended) vs. forkable (clone-and-modify).
4. **Teacher dashboard scope:** MVP roster + scores (recommended) vs. full analytics in v2.0.
5. **Case study images** (Phase D leftover): Matthew picks specific Wikimedia URLs per `CLAUDE.md` §13. Each `CASE_STUDIES[...].image.src` is currently null; fill them in when you have a moment.

## Troubleshooting

- **"SHEET_ID is unset"** when running `setupSheets()` → you skipped step 6. Fill in the ID.
- **403 / permission errors** on `saveSession()` → the web app deploy config probably says "Execute as: Me" instead of "User accessing the web app." Re-deploy with the correct config.
- **"Sessions sheet missing"** → you ran a save before `setupSheets()`. Run `setupSheets()`, then retry.
- **Students see the wrong Sheet** → check the deployment URL is the latest one. Each new deployment gets a new URL; bookmark the active one.
