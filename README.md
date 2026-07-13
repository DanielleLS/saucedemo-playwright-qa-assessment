# Sauce Demo Playwright QA Assessment

This repository contains a simple and maintainable Playwright test automation project for [Sauce Demo](https://www.saucedemo.com/).

The project covers:

- Data-driven login validation.
- Inventory sorting validation.
- End-to-end checkout flow.
- Dynamic environment configuration through `BASE_URL`.
- GitHub Actions execution on Pull Requests.

## Tech Stack

- Node.js
- Playwright
- JavaScript
- GitHub Actions

## Getting Started

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npm test
```

Run tests with a different base URL:

```bash
BASE_URL=https://www.saucedemo.com npm test
```

Open the Playwright HTML report:

```bash
npm run report
```

## Folder Structure

```text
.
├── data
│   ├── customer.js
│   └── users.js
├── pages
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   └── LoginPage.js
├── tests
│   ├── checkout.spec.js
│   ├── inventorySorting.spec.js
│   └── login.spec.js
├── .github
│   └── workflows
│       └── playwright.yml
├── playwright.config.js
└── package.json
```

## Architectural Choices

The project uses the Page Object Model to keep UI interactions separated from test scenarios. Test files describe business behavior, while page files own selectors and page-specific actions. If the client changes the UI, updates should usually be isolated inside the related page object instead of being repeated across multiple specs.

Test data is stored under `data/` to make scenarios easy to extend without changing test logic. The login test is data-driven and validates multiple credential states dynamically.

The base URL is configured in `playwright.config.js` using the `BASE_URL` environment variable. This allows the same test suite to run against different client environments, such as staging, QA, or production-like environments.

The suite currently runs on Chromium to keep CI fast and focused for the assessment. Additional Playwright browser projects can be added in `playwright.config.js` when cross-browser coverage is required.

## CI/CD

GitHub Actions is configured in `.github/workflows/playwright.yml`.

The pipeline runs automatically on Pull Requests targeting `main` or `master`, installs dependencies, installs Playwright browsers, runs the tests, and uploads the HTML report as an artifact.

## Assumptions

- The target application is the public Sauce Demo site.
- `standard_user` with `secret_sauce` is the main happy-path user.
- Chromium coverage is enough for this assessment, with the structure ready for additional browsers.
- The checkout flow uses one product to keep the test focused on the end-to-end behavior.
