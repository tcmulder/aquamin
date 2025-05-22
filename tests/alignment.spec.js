/**
 * E2E tests for block editor alignment
 */
const { test } = require('@wordpress/e2e-test-utils-playwright');
const { createTestPage, deleteTestPage, openPageFromEditor, testIsolatedScreenshot } = require('../helpers');

const subject = {
	label: 'Alignment',
	slug: 'test-alignment',
};

test.describe(`The block "${subject.label.toLowerCase()}"`, () => {

	test.beforeEach( async({ requestUtils, page, editor }) => {
		await createTestPage({ subject, page, requestUtils });
		const theContent = await page.evaluate(async (baseURL) => {
			const response = await fetch(`${baseURL}/wp-content/themes/aquamin/includes/cli/demo-content/alignment.xml`);
			const xmlText = await response.text();
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
			const contentEncoded = xmlDoc.querySelector('content\\:encoded, encoded')?.textContent || '';
			return contentEncoded;
		}, requestUtils.baseURL);
		await editor.setContent(theContent);
	});

	test.afterEach( async ( { page, requestUtils } ) => {
		await deleteTestPage({ page, requestUtils });
	} );

	test('matches front-end reference screenshot', async({ page, requestUtils }) => {
		await openPageFromEditor({ page, requestUtils });
		const el = page.locator('.torso');
		await el.evaluate((element) => {
			element.setAttribute("style", `
				background-color: white !important;
			`);
		})
		await testIsolatedScreenshot({ el, page, clip: true, opt: {
			mask: [
				page.locator('#wpadminbar'),
			],
		} });
	});

	test('matches front-end mobile reference screenshot', async({ page, requestUtils }) => {
		await openPageFromEditor({ page, requestUtils });
		const el = page.locator('.torso');
		await el.evaluate((element) => {
			element.setAttribute("style", `
				background-color: white !important;
			`);
		})
		await page.setViewportSize({ width: 375, height: 9999 });
		await testIsolatedScreenshot({ el, page, clip: true, opt: {
			mask: [
				page.locator('#wpadminbar'),
			],
		} });
	});

	test('matches front-end large reference screenshot', async({ page, requestUtils }) => {
		await openPageFromEditor({ page, requestUtils });
		const el = page.locator('.torso');
		await el.evaluate((element) => {
			element.setAttribute("style", `
				background-color: white !important;
			`);
		})
		await page.setViewportSize({ width: 1920, height: 9999 });
		await testIsolatedScreenshot({ el, page, clip: true, opt: {
			mask: [
				page.locator('#wpadminbar'),
			],
		} });
	});

});
