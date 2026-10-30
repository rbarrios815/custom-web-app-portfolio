> **CANONICAL PUBLIC-SAFE HANDOFF:** This is the dedicated and public project repository. Use this prompt as the current project specification. Full original source links remain in the private legacy handoff while demo sources are verified/sanitized. Public visibility is intentional; only data and credentials need protecting.

# BUILD & DEPLOY — RICARDO'S CUSTOM WEB APP PORTFOLIO

**Mode: ChatGPT Work — Execute the entire project.**

You are my lead full-stack developer, Google Apps Script engineer, UI/UX designer, and QA tester.

## OBJECTIVE

Create and deploy a professional, mobile-responsive Google Apps Script web app titled:

**Ricardo’s Custom Web App Portfolio - Interactive Demo Gallery**

The website will advertise my custom web app development services by displaying four real examples of applications I've built.

The homepage itself MUST be a Google Apps Script web app with its own dedicated Google Sheets database and preferably its own GitHub repository.

Do not stop after researching, planning, or generating code. Build, test, deploy, and verify everything possible.

## PUBLIC DEMO DATA DECISION — APPROVED

Ricky confirmed on October 30, 2026 that **all four source Sheets presented through the public demos will contain no real identifying information**. Keep this GitHub repository PUBLIC. There is **no requirement to make the repository private**. Make the demos genuinely usable with clearly fictional names, RSVP submissions, events, contact details, and addresses.

**Data-protection gate before publishing:**
1. Inspect each original source Sheet and deployed web app to determine whether it currently contains real responses. Never delete or overwrite real submissions without a separate explicit instruction.
2. If an original Sheet has real information or the demo shares a live production database, **create a separate sanitized demo-only copy**, populate it with synthetic example data, and configure a separate or safely isolated demo deployment to use it. Do not modify production data or deployment URLs in place.
3. If a Sheet is already exclusively synthetic, it may serve directly as a demo source after verification; no unnecessary duplicate required.
4. Review frontend, Sheets backend, logs, screenshot frames, sample forms, metadata, and visible UI text for names, emails, phone numbers, addresses, private notes, and other identifiers. Public screenshots must come from actual rendered demo pages, not mockups.
5. Verify no public demo write can change the real original Sheet. Restrict access to admin operations and use bounded or resettable sample data for public submissions.
6. Keep the existing **portfolio configuration spreadsheet** as the backing source of truth for the gallery; the four separate demo source Sheets are distinct from this portfolio config Sheet.
7. Store public-safe project requirements and synthetic demo assets here. Look up any original private source links through the connected GitHub/Google Drive accounts; do not publish private customer data just to make them discoverable.

## 1. EXISTING PORTFOLIO DATABASE

I've already created the Google Sheet:

[PRIVATE_GOOGLE_SHEET_LINK: retrieve from connected Google Drive / private handoff]

Use this as the portfolio's database. Do not create a duplicate.

The spreadsheet contains a `Demos` tab and a `Settings` tab.

Preserve existing data, update missing fields, and make this the source of truth for the gallery.

## 2. FOUR DEMOS

Display exactly four cards in this order.

### 1. Christmas Demo

GitHub:
[PRIVATE_GITHUB_SOURCE: locate via connected GitHub / private handoff]

Google Sheet:
[PRIVATE_GOOGLE_SHEET_LINK: retrieve from connected Google Drive / private handoff]

### 2. Thanksgiving Demo

GitHub:
[PRIVATE_GITHUB_SOURCE: locate via connected GitHub / private handoff]

Google Sheet:
[PRIVATE_GOOGLE_SHEET_LINK: retrieve from connected Google Drive / private handoff]

### 3. Baby Decker

Commissioned family meal-signup example. Verify approved public name and safe demo dataset.

Google Sheet:
[PRIVATE_GOOGLE_SHEET_LINK: retrieve from connected Google Drive / private handoff]

The spreadsheet is titled `private client meal sign-up spreadsheet`.

Find the associated Google Apps Script project and its deployed web app URL. The corresponding GitHub repository has not yet been identified.

### 4. Baby Rafa Flores

GitHub:
https://github.com/rbarrios815/BabyRafael

Google Sheet:
[PRIVATE_GOOGLE_SHEET_LINK: retrieve from connected Google Drive / private handoff]

Find its existing deployed web app URL.

## 3. CRITICAL SCREENSHOT REQUIREMENT

**Each gallery card MUST display a REAL screenshot of that specific demo's actual homepage.**

Do not use AI-generated images, generic thumbnails, emojis instead of screenshots, or fabricated app previews.

Use the Work Cloud Browser to:

1. Find each demo's currently deployed Google Apps Script web app URL.
2. Open the deployed app.
3. Allow the homepage to finish loading.
4. Verify that it works.
5. Capture a high-quality screenshot of its actual homepage.
6. Crop or frame the screenshot appropriately without altering the underlying design.
7. Store each screenshot in a durable, browser-accessible location.
8. Add the screenshot URL to the corresponding row of the portfolio spreadsheet.
9. Verify that the screenshot displays correctly inside the deployed portfolio.

Use consistent screenshot dimensions and aspect ratios for all four cards. Preserve aspect ratio and avoid stretching.

Do not mistake screenshots of Google Sheets or the Apps Script editor for screenshots of the actual apps.

If a demo has no existing deployment, investigate whether it can be safely deployed without affecting the original app. If deployment would require changing the original, stop that specific step and report the blocker.

Never expose private spreadsheet data or real customer contact information in public screenshots. Use sanitized demo data where necessary.

## 4. HOMEPAGE DESIGN

Research authoritative modern UI/UX best practices before implementing.

Build an attractive, professional portfolio homepage.

### Header

Main title:

**Ricardo’s Custom Web App Portfolio**

Subtitle:

**Interactive Demo Gallery**

Supporting text:

"Explore interactive web apps built for real people, events, and businesses."

### Gallery

Display four large clickable cards in a spacious 2×2 grid on desktop.

Each card includes:

- A real screenshot of the demo homepage
- The demo title
- A concise description
- A subtle "View Live Demo" indicator
- Hover animation on desktop
- Clear touch feedback on mobile

**The entire card is clickable**, not just a small button.

Clicking opens the actual deployed demo URL in a new tab.

Give cards generous padding and space between them. They must not touch.

Make the gallery responsive: two columns on sufficiently wide screens, one column on narrow mobile screens.

Use balanced typography, consistent image dimensions, rounded corners, subtle shadows, and accessible contrast.

Avoid a cluttered interface.

### Contact Section

Below the four cards, include:

**Want Your Own Custom Web App?**

Supporting text:

"Have an idea? Let's create a custom web app for your event, family, or business."

Display two prominent buttons:

**✉️ Email Me**

**💬 Text Me**

Use `mailto:` and `sms:` links, respectively.

Retrieve the contact destinations from the Settings tab. If they are blank, request my preferred business email address and phone number before public deployment. Never guess or expose personal contact information without confirmation.

### Footer

Use a simple professional footer:

"© 2026 Ricardo Barrios. Custom Web App Development."

## 5. GOOGLE SHEETS BACKEND

Use the existing portfolio Sheet to store:

- Display order
- Demo title
- Short description
- Deployed demo URL
- Screenshot image URL
- Visibility flag
- GitHub repository
- Source spreadsheet
- Status

The homepage should load the gallery data from this spreadsheet.

I should be able to change a demo URL, screenshot, description, or display order directly in Google Sheets without editing the web app code.

Use the Settings tab for the site title, subtitle, contact email, contact phone, and supporting text.

Validate URLs and handle missing data gracefully.

Do not make the portfolio's private source spreadsheet publicly editable.

## 6. GITHUB & APPS SCRIPT

Use this existing dedicated GitHub repository:

`rbarrios815/custom-web-app-portfolio` (PUBLIC, confirmed by user)

Include:

- Apps Script backend
- HTML/CSS/JavaScript frontend
- `appsscript.json`
- README
- Deployment instructions
- Any appropriate non-sensitive configuration

Keep the repository organized and exclude secrets and customer data.

Connect the new project to the existing portfolio spreadsheet.

Deploy the homepage as a Google Apps Script web app using an appropriate public-access configuration that allows prospective customers to view the portfolio without signing into my Google account.

Preserve all original apps, databases, and production deployment URLs. Create or update isolated sanitized demo copies when the originals contain real data, without overwriting the originals.

## 7. TESTING & VERIFICATION

Test the portfolio on desktop and mobile.

Verify:

1. All four cards appear in the correct order.
2. Each displays the actual homepage screenshot for the correct demo.
3. All screenshots load.
4. All four cards are fully clickable.
5. Each card opens the correct deployed web app.
6. Each demo is accessible to an ordinary visitor without requiring my Google sign-in.
7. The layout looks professional on desktop and mobile.
8. No horizontal scrolling or clipped content occurs.
9. Spreadsheet changes are reflected in the portfolio.
10. The Email and Text buttons work with the configured destinations.
11. No private customer information is exposed.
12. The public deployment works in a signed-out browser session.

Use the Cloud Browser for visual verification, not just code inspection.

If any test fails, fix the problem and retest.

## 8. FINAL DELIVERABLES

Provide:

1. **The live portfolio web app URL**
2. **The backing Google Sheet URL**
3. **The GitHub repository URL**
4. A screenshot of the finished desktop homepage
5. A screenshot of the finished mobile homepage
6. A four-row verification table showing each demo, its URL, screenshot status, and whether the link works
7. A concise report of what was completed and any unresolved problems

Do not claim that anything is deployed or verified unless you actually completed the corresponding action.

## 9. EXECUTION RULES

- Execute rather than merely advise.
- Reuse the existing portfolio spreadsheet.
- Discover existing demo deployments before considering new ones.
- Preserve the original demos.
- Never fabricate demo URLs or screenshots.
- Use the Cloud Browser to capture real screenshots.
- Prioritize a polished, functional, publicly accessible result.
- Make sensible implementation decisions without repeatedly requesting approval.
- Ask only for truly essential information, such as my contact email or text number, if it cannot be recovered from confirmed settings.
- Where an action is blocked by permissions, explain precisely what is blocked and continue all independent work.

**BEGIN NOW: locate the four demos, capture their homepages, construct the portfolio, test it, and deploy it.**