/**
 * E2E tests for the My Block Noninteractive block
 */
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');
const { openPageFromEditor, createTestPage, deleteTestPage, testIsolatedScreenshot } = require('../helpers');

const subject = {
	label: 'My Block Noninteractive',
	slug: 'test-block-my-block-noninteractive',
	selector: '.my-block-noninteractive',
	block: {
		title: 'My Block Noninteractive',
		name: 'aquamin/my-block-noninteractive',
		slug: 'my-block-noninteractive',
	}
};

test.describe(`The block "${subject.label}"`, () => {

	test.beforeEach( async({ requestUtils, page, editor }) => {
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

	test('works on front-end', async({ page }) => {
		await openPageFromEditor({ page });
		await expect(page.locator(subject.selector) ).toBeVisible();
	});

	test('matches reference screenshot', async({ page }) => {
		await openPageFromEditor({ page });
		await testIsolatedScreenshot({ subject, page });
	});

});