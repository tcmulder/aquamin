# E2E Aquamin Theme Playwright Tests

## Instructions

1. Run `cd '/Users/tcmulder/Documents/Work/Side Projects/_wp/aquamin/tests/wordpress/plugins/aquamin-e2e-tests'`.
2. Start Docker so wp-env can run (may need to close other local server apps).
3. Add the version of aquamin you would like to test (just copy/paste or `git clone --branch v1.0.0 https://github.com/tcmulder/aquamin.git ../../themes/aquamin`)
4. Run tests with `npm run start` or `npm run start:ui` (or if npm is not installed then `test -d "node_modules" || npm install && npm run start`).

> ⛔️ Warning: Docker doesn't follow symlinks, so all files must be cloned or copied into the `wordpress` directory.

## Configuration

- Ensure the `seed` directory contains any `block-library` or `component-library` features you would like to use (see `aquamin/_gitignore-preserve/wp-content/themes/aquamin/assets` for latest).
- To refresh one or more visual regression tests, delete them from the `reference` directory, then run `npm run start` _twice_.
- Uses @wordpress/e2e-test-utils-playwright which was under active development: may want to upgrade it.