/**
 * Tectonic City Builder v2 — Google Apps Script server-side code.
 *
 * Deployed as a GAS Web App. See SETUP.md for the full deploy walkthrough.
 *
 * Architecture (per brief §8):
 *   - doGet() serves the v2 HTML client (eventually — Phase E execution
 *     ports the HTML/CSS/JS into GAS HTML-include format).
 *   - setupSheets() runs ONCE from the GAS editor after Matthew links
 *     the spreadsheet ID below. Creates the three worksheets with
 *     column headers per brief §8 schema.
 *   - The save/load functions are called from the client via
 *     google.script.run.<functionName>().
 *
 * Status: Phase E PREP — files committed, not yet deployed to GAS.
 * Matthew runs the deploy steps in SETUP.md when ready.
 */

// ════════════════════════════════════════════════════════════════════
// CONFIG — fill SHEET_ID before running setupSheets()
// ════════════════════════════════════════════════════════════════════

/**
 * The Google Sheet ID where session data is persisted.
 * Get this from the Sheet's URL: docs.google.com/spreadsheets/d/<SHEET_ID>/edit
 * Replace the placeholder once the Sheet exists.
 */
const SHEET_ID = "REPLACE_WITH_SPREADSHEET_ID";

// Worksheet names — change these only if you also update the readers/writers below.
const SHEET_SESSIONS = "Sessions";
const SHEET_ROSTER = "Roster";
const SHEET_CASE_STUDY_VIEWS = "CaseStudyViews";

// Column header schemas per brief §8.
const HEADERS = {
  Sessions: [
    "timestamp",
    "email",
    "display_name",
    "class_section",
    "scenario_key",
    "attempt_number",
    "budget_used",
    "population_total",
    "population_saved",
    "critical_intact_pct",
    "historical_accuracy_pct",
    "final_score",
    "grade",
    "time_spent_seconds",
    "placements_json",
    "reflection_text",
  ],
  Roster: [
    "email",
    "display_name",
    "class_section",
    "first_seen",
    "total_attempts",
  ],
  CaseStudyViews: [
    "timestamp",
    "email",
    "case_study_id",
    "duration_seconds",
  ],
};

// ════════════════════════════════════════════════════════════════════
// SETUP — run ONCE from the GAS editor after SHEET_ID is filled in
// ════════════════════════════════════════════════════════════════════

/**
 * Idempotent. Creates any missing worksheets and writes their column
 * headers. Safe to re-run (won't overwrite existing data).
 *
 * From the GAS editor: select setupSheets from the function dropdown,
 * click Run. First run will prompt for spreadsheet access permissions.
 */
function setupSheets() {
  if (SHEET_ID === "REPLACE_WITH_SPREADSHEET_ID") {
    throw new Error("SHEET_ID is unset. Open Code.gs and replace the placeholder with your spreadsheet ID before running setupSheets().");
  }
  const ss = SpreadsheetApp.openById(SHEET_ID);
  for (const name of Object.keys(HEADERS)) {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    const headers = HEADERS[name];
    // Only write headers if row 1 is empty (don't overwrite a customised header row).
    const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const hasAnyHeader = firstRow.some(function (v) { return v !== "" && v != null; });
    if (!hasAnyHeader) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold").setBackground("#f4ddcf");
      sheet.autoResizeColumns(1, headers.length);
    }
  }
  return "setupSheets complete — Sessions, Roster, and CaseStudyViews are ready.";
}

// ════════════════════════════════════════════════════════════════════
// WEB APP ENTRY — serves the v2 game HTML
// ════════════════════════════════════════════════════════════════════

/**
 * Called when a user opens the deployed web app URL.
 * Phase E EXECUTION will rewrite this to use GAS HTML-include includes
 * (`createTemplateFromFile('index')` + `<?!= include('styles') ?>`).
 * For now this is a stub returning a placeholder — the deployed v1
 * site stays in production until Phase E execution lands.
 */
function doGet() {
  return HtmlService
    .createHtmlOutput(
      "<h1>Tectonic City Builder v2 — Phase E pending</h1>" +
      "<p>The GAS-hosted client is not yet live. Phase E execution will land the full game HTML here. " +
      "Until then, play v2 at the GitHub repo or via the site at /units/unit-3/tectonic-city-builder/.</p>"
    )
    .setTitle("Tectonic City Builder")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

// ════════════════════════════════════════════════════════════════════
// CLIENT-CALLABLE FUNCTIONS (via google.script.run)
// ════════════════════════════════════════════════════════════════════

/**
 * Returns the current user's email + roster lookup (display_name, class_section).
 * Returns empty strings for fields the user hasn't registered yet.
 */
function getCurrentUser() {
  const email = Session.getActiveUser().getEmail();
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const roster = ss.getSheetByName(SHEET_ROSTER);
  if (!roster) return { email: email, display_name: "", class_section: "" };
  const data = roster.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      return {
        email: email,
        display_name: data[i][1] || "",
        class_section: data[i][2] || "",
      };
    }
  }
  return { email: email, display_name: "", class_section: "" };
}

/**
 * Adds or updates a Roster row for the current user.
 * Returns the registered profile.
 */
function registerStudent(displayName, classSection) {
  const email = Session.getActiveUser().getEmail();
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const roster = ss.getSheetByName(SHEET_ROSTER);
  if (!roster) throw new Error("Roster sheet missing. Run setupSheets() first.");
  const data = roster.getDataRange().getValues();
  const now = new Date();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      roster.getRange(i + 1, 2).setValue(displayName);
      roster.getRange(i + 1, 3).setValue(classSection);
      return { email: email, display_name: displayName, class_section: classSection, updated: true };
    }
  }
  roster.appendRow([email, displayName, classSection, now, 0]);
  return { email: email, display_name: displayName, class_section: classSection, created: true };
}

/**
 * Appends one row to Sessions with the student's attempt data.
 * Increments the Roster total_attempts counter.
 * Returns { attempt_number, session_id } so the client can confirm.
 */
function saveSession(sessionData) {
  const email = Session.getActiveUser().getEmail();
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sessions = ss.getSheetByName(SHEET_SESSIONS);
  if (!sessions) throw new Error("Sessions sheet missing. Run setupSheets() first.");

  const myAttemptsForScenario = countAttemptsForScenario(sessions, email, sessionData.scenario_key);
  const attemptNumber = myAttemptsForScenario + 1;

  const row = [
    new Date(),
    email,
    sessionData.display_name || "",
    sessionData.class_section || "",
    sessionData.scenario_key || "",
    attemptNumber,
    sessionData.budget_used || 0,
    sessionData.population_total || 0,
    sessionData.population_saved || 0,
    sessionData.critical_intact_pct || 0,
    sessionData.historical_accuracy_pct || 0,
    sessionData.final_score || 0,
    sessionData.grade || "",
    sessionData.time_spent_seconds || 0,
    sessionData.placements_json || "{}",
    sessionData.reflection_text || "",
  ];
  sessions.appendRow(row);

  bumpRosterAttemptCount(ss, email);

  return {
    attempt_number: attemptNumber,
    session_id: sessions.getLastRow(),
  };
}

/**
 * Returns all Sessions rows for the current user, sorted by timestamp desc.
 * Each row is an object keyed by header name. Used by the "My Cities" screen.
 */
function getMyHistory() {
  const email = Session.getActiveUser().getEmail();
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sessions = ss.getSheetByName(SHEET_SESSIONS);
  if (!sessions) return [];
  const data = sessions.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  const out = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] !== email) continue;
    const obj = {};
    for (let c = 0; c < headers.length; c++) obj[headers[c]] = data[i][c];
    out.push(obj);
  }
  out.sort(function (a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
  return out;
}

/**
 * Optional telemetry — log a case study view by id. Safe to call without
 * blocking; never throws (silent on missing sheet).
 */
function logCaseStudyView(caseStudyId, durationSeconds) {
  try {
    const email = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_CASE_STUDY_VIEWS);
    if (!sheet) return;
    sheet.appendRow([new Date(), email, caseStudyId, durationSeconds || 0]);
  } catch (e) {
    // Telemetry shouldn't break gameplay — swallow.
  }
}

// ════════════════════════════════════════════════════════════════════
// INTERNAL HELPERS
// ════════════════════════════════════════════════════════════════════

function countAttemptsForScenario(sessions, email, scenarioKey) {
  const data = sessions.getDataRange().getValues();
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === email && data[i][4] === scenarioKey) count++;
  }
  return count;
}

function bumpRosterAttemptCount(ss, email) {
  const roster = ss.getSheetByName(SHEET_ROSTER);
  if (!roster) return;
  const data = roster.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      const current = Number(data[i][4]) || 0;
      roster.getRange(i + 1, 5).setValue(current + 1);
      return;
    }
  }
}
