# Portfolio deployment

The homepage is a Google Apps Script project with a read-only connection to the existing gallery configuration Sheet. It does not require Sites hosting.

## Gallery project

Installed project: https://script.google.com/home/projects/16ihYiS7W-LV-mGRc-hOg1pKntTCSW1WeMePWjRZJSvymH91zFsZHzu9i/edit

Install only `Code.gs`, `Index.html`, and `appsscript.json` at the root. Set `PORTFOLIO_SHEET_ID` in Script Properties to the existing portfolio database. Do not import `demos/` into this project. `.claspignore` limits root uploads to the three intended files.

The public model returns only titles, descriptions, verified links, screenshot links, and explicitly configured contact destinations. It excludes source repositories, Sheet references, and internal status notes. Set a card's Status to exactly `PUBLIC_DEMO_VERIFIED` only after verifying its synthetic-only database, anonymous access, real screenshot, and write isolation. Unverified cards render honest preparation placeholders with no link.

Ricky chose to leave contact hidden on November 1. Blank Business Email / Business Text Number settings omit the contact section. They are not a release blocker.

## Isolated demo suite

Installed project: https://script.google.com/home/projects/1inL6XlT73wLnvLQuwDIToQ1jnhOxR-nTR254m9yLCaCiA7DVr7ZhAuPS/edit

Install `demos/Code.gs` as this project's only server source and use `demos/appsscript.json`. The bundle contains four original-derived frontends, with fictional sample labels. It routes `?demo=christmas`, `?demo=thanksgiving`, `?demo=decker`, and `?demo=rafa` to their separate adapters. Each adapter uses only its assigned synthetic data source. No original baby Sheet ID is present in the deployable source. Public admin mutations are disabled. Visitor text entry is removed: names, notes, items, dates, times and amounts use fixed fictional dropdown options. Existing attendance buttons, age choices and dish checkboxes remain selection-only. Contact details are not collected. Server wrappers independently whitelist every persisted visitor field, validate rolling date options, and derive Rafa submission IDs from approved choices rather than accepting arbitrary metadata. Submissions are capped at 200 entries per demo, with validation and formula escaping. This cap is not a comprehensive anti-abuse/rate-limiting system.

The original family Apps Script projects, deployment URLs, and Sheets were not modified. The isolated baby copies were sanitized across every copied tab before use. Christmas and Thanksgiving retain their existing fictional demo-only Sheets.

## Remaining release sequence

1. Obtain user approval for the new Google Sheets OAuth grants. Automatic approval review rejected the demo suite's Authorize access click; do not retry or bypass it without approval.
2. Grant the gallery read-only Sheets scope and the isolated suite read/write Sheets scope. These OAuth scopes are account-wide even though application source uses only the configured gallery/demo Sheets.
3. Finish owner-only deployments, read back installed sources, test all four routes and a synthetic submission/refresh for each. Verify the original family data remains unchanged.
4. Verify public access and synthetic data before capturing screenshots. Capture actual rendered homepages using Cloud Browser; never fabricate thumbnails. Store screenshots in durable public assets and update only the corresponding Demos cells.
5. Record public URLs, screenshots and verification status in the existing configuration Sheet. Publish gallery and suite; test signed-out access, all four links, image loading, Sheet-driven updates, keyboard controls, and 390px/desktop layout.

## Browser layout checkpoint

The local gallery fixture uses the real gallery frontend with a four-card pending-data model, not fake screenshots or fabricated demo links. A 1363px browser viewport rendered two columns; a nested 390px viewport rendered one column. Both had no horizontal overflow and four cards. These are browser viewport checks, not physical-phone or authenticated app tests. Viewport screenshots are in `docs/qa/`. Full-page screenshot capture timed out; no full-page capture is claimed.

## Building the demo bundle

Edit `demos/Adapters.js`, `demos/DropdownPolicy.js`, `demos/choices.json` and the four `.html` sources, then run `node scripts/build-demo-suite.cjs`. Install only the generated `demos/Code.gs` into the demo Apps Script project. The root gallery project must not import these files.

## Local validation

`node test.cjs` — eight model/security scenarios and gallery frontend parsing.

`node test-demos.cjs` — thirteen adapter/isolation/validation scenarios and parsing of all four frontend scripts.

These tests use mocks. They do not establish live Google Sheets persistence, anonymous access, screenshots, mobile acceptance, or a deployed portfolio.

## Dropdown-only update — November 1

Source now removes every text input/textarea, including the unused honeypot, and all prompt-based admin editing. Local browser fixtures for all four original-derived pages each report zero text inputs/textareas/contenteditable fields; native fictional-name and gift-card dropdown selection was exercised. These fixtures stub RPC calls and do not write to Google Sheets. `docs/qa/dropdown-only-local-preview.jpg` shows this local fixture, not a deployed demo.

The new dropdown bundle has not yet been verified installed in Apps Script; earlier installed-source readback evidence applies to the previous bundle only. Deployment remains blocked on the previously requested OAuth approval; this update does not constitute permission approval and no grant was retried.
