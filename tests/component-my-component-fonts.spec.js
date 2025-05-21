/**
 * E2E tests for the My Component Fonts component
 */
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');
const { testIsolatedScreenshot } = require('../helpers');

const subject = {
	label: 'Fonts',
	slug: 'test-component-my-component-fonts',
	selector: 'body'
};

test.describe(`The component "${subject.label}"`, () => {

	test.beforeEach( async({ page, requestUtils }) => {
		await page.goto(requestUtils.baseURL)
		await page.addStyleTag({
			content: `body *{display:none !important;}body{background:none !important;font-size:100px;}`
		});
	});

	test('is applying a custom font-face', async ({ page }) => {
		const font = await page.evaluate('window.getComputedStyle(document.body, "::before")["font-family"]');
		expect(font).toBe('"My Font", monospace');
	});

	test('matches reference screenshot', async({ page }) => {
		const el = page.locator(subject.selector);
		await testIsolatedScreenshot({ el, page });
	});

});