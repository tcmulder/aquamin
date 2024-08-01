# E2E Aquamin Theme Playwright Tests

## Instructions

1. Clone `git clone git@gitlab.com:thinkaquamarine/aquamin-e2e-tests.git` into `wp-content/plugins`.
2. Enter the plugin's directory with `cd aquamin-e2e-tests`.
3. Initialize with `npm install`.
4. Start Docker so wp-env can run (may need to close other local server apps).
5. Run tests with `npm run start` or `npm run start:ui`.

> 💡 Tip: if node_modules doesn't exist yet you can run `test -d "node_modules" || npm install && npm run start`.

> ⛔️ Warning: Docker doesn't follow symlinks, so this must be cloned or copied into the plugins directory.

## Configuration

- Ensure the `seed` directory contains any `block-library` or `component-library` features you would like to use (see `aquamin/_gitignore-preserve/wp-content/themes/aquamin/assets` for latest).
- To refresh one or more visual regression tests, delete them from the `reference` directory, then run `npm run start` _twice_.
- Uses @wordpress/e2e-test-utils-playwright which was under active development: may want to upgrade it.