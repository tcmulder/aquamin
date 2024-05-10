/**
 * E2E tests for the My Component Images component
 */
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');

const subject = {
	label: 'WP-CLI',
	slug: 'test-component-my-component-wpcli',
	globalScriptLog: 'my-component-wpcli global script has loaded'
};

test.describe(`The component "${subject.label}"`, () => {

	test('global script loads', async({ page, requestUtils }) => {
		let scriptLoaded = false;
		page.on('console', async (msg) => {
			if (msg.text() === subject.globalScriptLog) {
				scriptLoaded = true;
			}
		});
		await page.goto(requestUtils.baseURL);
		expect(scriptLoaded).toBe(true);

	});

});