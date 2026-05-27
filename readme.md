
# Playwright / Cucumber QA Automation Suite

This repository contains an automated QA test suite implemented using Playwright and Cucumber. It includes UI and API tests, Allure reporting, and scripts to run tests by tag or full-suite runs. This README documents architecture, project layout, running commands, reporting, CI integration, and troubleshooting for enterprise usage.

**Overview:**
- **Frameworks:** Playwright, Cucumber
- **Reporting:** Allure
- **Language:** TypeScript

**Recommended environment**
- Node.js >= 18 (use `nvm` to manage versions)
- npm >= 8
- Recommended OS: Linux / macOS; Windows supported with WSL

## Architecture & Design

The test suite is organized to separate concerns between test scenarios, step definitions, helpers, and configuration. Tests are authored as Cucumber feature files with Playwright used for browser automation. Test data and helpers are placed under `src/`.

Simple architecture flow:

Feature files (Gherkin) -> Step Definitions (`src/steps`) -> Playwright helpers (`src/lib`) -> External systems (API/DB)

This separation enables reuse, easy tagging, and targeted runs.

## Project Structure

- `cucumber.js` — Cucumber configuration
- `playwright.config.ts` — Playwright configuration and test options
- `src/` — Test implementation (features, steps, helpers)
- `allure-results/` — Generated Allure results (gitignored typically)
- `reports/` — Generated HTML reports
- `package.json` — NPM scripts and dependencies
- `tsconfig.json` — TypeScript configuration

Inspect code in the `src/` folder for feature and step organization.

## Key NPM Scripts

Use the following commands from the repository root.

- Install dependencies:

```bash
npm install
```

- Run the default test command (Cucumber):

```bash
npm run test
```

- Run tests in headed (non-headless) mode:

```bash
npm run test:headed
```

- Run all tests and generate Allure results:

```bash
npm run test:all
```

- Run a specific tag (UI / API / smoke / regression):

```bash
npm run test:ui
npm run test:api
npm run test:smoke
npm run test:regression
```

- Serve an Allure report locally (interactive):

```bash
npm run report:serve
```

Notes:
- `test:all` uses the `allure-cucumberjs` reporter and writes to `allure-results/`.
- Use `HEADLESS=false npm run test` or `npm run test:headed` to run tests with a visible browser.

## Environment & Configuration

- Use environment variables for secrets or environment-specific configuration (e.g., API base URL, credentials). Example variables to set before running tests:

```bash
export API_BASE_URL=https://api.example.local
export ENV=staging
```

- For CI, inject secrets via the CI provider's secrets manager rather than committing them.

## Reporting

1. Run `npm run test:all` to generate Allure JSON artifacts in `allure-results/`.
2. Run `npm run report:serve` to launch an Allure server and view the report in your browser.


## Project layout

I inspected the repository and updated the layout to match the actual folders found in this project. Use this as the canonical structure in the README:

```text
├── config/                  # environment & framework config
├── src/
│   ├── api/                 # API helpers and clients
│   ├── features/            # Gherkin feature files (ui, api, etc.)
│   ├── hooks/               # Cucumber World and lifecycle hooks
│   ├── pages/               # Page Object Model classes
│   ├── steps/               # Step definitions
│   ├── support/             # Test support utilities (fixtures, constants)
│   ├── types/               # TypeScript types and interfaces
│   └── utils/               # Reusable helpers (logger, data generators)
├── allure-results/          # Allure JSON artifacts (generated)
├── reports/                 # Generated HTML reports
├── cucumber.js              # Cucumber runner config
├── playwright.config.ts     # Playwright config
├── package.json             # NPM scripts & deps
└── tsconfig.json            # TypeScript config
```


- If Playwright browsers fail to install, run:

```bash
npx playwright install
```

- If tests are flaky, try running a single feature with verbose logs and increase timeouts in `playwright.config.ts`.
