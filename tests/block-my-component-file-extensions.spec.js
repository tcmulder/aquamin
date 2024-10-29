/**
 * E2E tests for the My Component File Extensions
 */
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');
const { openPageFromEditor, createTestPage, deleteTestPage, testIsolatedScreenshot, logsMatch, getConsoleLogs } = require('../helpers');

const subject = {
	label: 'My Component File Extensions',
	slug: 'test-block-my-component-file-extensions',
	expectedLogs: [
		'.css files compile: true',
		'.scss files compile: true',
		'.js files compile: true',
		'.ts files compile: true',
		'.jsx files compile: true',
		'.tsx files compile: true',
	],
};

test.describe(`The block "${subject.label}"`, () => {

	test.beforeEach( async({ requestUtils, page }) => {
		subject.logs = await getConsoleLogs({ page });
		await page.goto(requestUtils.baseURL)
	});

	test('logs from JS', async() => {
		expect(logsMatch({ subject })).toBe(true);
	});

});