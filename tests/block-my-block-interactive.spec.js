/**
 * E2E tests for the My Block Interactive block
 */
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');
const { openPageFromEditor, createTestPage, deleteTestPage, testIsolatedScreenshot, logsMatch, getConsoleLogs } = require('../helpers');

const subject = {
	label: 'My Block Interactive',
	slug: 'test-block-my-block-interactive',
	selector: '.my-block-interactive',
	block: {
		title: 'My Block Interactive',
		name: 'aquamin/my-block-interactive',
		slug: 'my-block-interactive',
	},
	expectedLogs: [
		'Interactive block module loads Wordpress dependency: true',
		'Interactive block module loads node_modules dependency: true',
		'Interactive block module loads internal dependency: true',
		'Interactive block module theme loads Wordpress dependency: true',
		'Interactive block module theme loads node_modules dependency: true',
		'Interactive block module theme loads internal dependency: true',
	],
};

test.describe(`The block "${subject.label}"`, () => {

	test.beforeEach( async({ requestUtils, page, editor }) => {
		subject.logs = await getConsoleLogs({ page });
		await createTestPage({ subject, page, requestUtils });
		await editor.insertBlock({ name: subject.block.name });
	});

	test.afterEach( async ( { page, requestUtils } ) => {
		await deleteTestPage({ page, requestUtils });
	} );
	
	test('works on back-end', async ({ editor }) => {
		const block = (await editor.getBlocks() )[ 0 ];
		await expect(block.name).toBe(subject.block.name);
	});

	test('uses SVG icon', async({ page, editor }) => {
		editor.openDocumentSettingsSidebar();
		expect(await page.locator(`.block-editor-block-card svg`).isVisible()).toBe(true);
	});

	test('works on front-end', async({ page, requestUtils }) => {
		await openPageFromEditor({ page, requestUtils });
		await expect(page.locator(subject.selector) ).toBeVisible();
	});

	test('logs from JS', async({ page, requestUtils }) => {
		await openPageFromEditor({ page, requestUtils });
		expect(logsMatch({ subject })).toBe(true);
	});

	test('matches reference screenshot', async({ page, requestUtils }) => {
		await openPageFromEditor({ page, requestUtils });
		await page.addStyleTag({
			content: `#masthead{visibility:hidden !important;}`
		});
		await page.getByRole('button', { name: 'Toggle' }).click();
		const el = page.locator(subject.selector)
		await testIsolatedScreenshot({ el, page });
	});
	
	test('interactivity works', async({ page, requestUtils }) => {
		await openPageFromEditor({ page, requestUtils });
		await page.addStyleTag({
			content: `#masthead{visibility:hidden !important;}`
		});
		await expect(page.getByText('This element is now visible!')).not.toBeVisible();
		await page.getByRole('button', { name: 'Toggle' }).click();
		await expect(page.getByText('This element is now visible!')).toBeVisible();
	});

});
