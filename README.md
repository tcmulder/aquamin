# E2E Aquamin Theme Playwright Tests

## Instructions

1. Start Docker so wp-env can run (may need to close other local server apps).
2. Begin with a WordPress site with `wp-content/themes/aquamin` installed and `npm install` ran.
3. Clone `git clone git@gitlab.com:thinkaquamarine/aquamin-e2e-tests.git` into `wp-content/plugins`.
4. Enter the plugin's directory with `cd aquamin-e2e-tests`.
5. Initialize with `npm install`.
6. Run tests with `npm run start` or `npm run start:ui`.

> 💡 Tip: if node_modules doesn't exist yet you can run `test -d "node_modules" || npm install && npm run start`.

> ⛔️ Warning: Docker doesn't follow symlinks, so this must be cloned or copied into the plugins directory.

## Configuration

- Ensure the `seed` directory contains any `block-library` or `component-library` features you would like to use (see `aquamin/_gitignore-preserve/wp-content/themes/aquamin/assets` for latest).
- To refresh one or more visual regression tests, delete them from the `reference` directory, then run `npm run start` _twice_.
- Uses @wordpress/e2e-test-utils-playwright which was under active development: may want to upgrade it.