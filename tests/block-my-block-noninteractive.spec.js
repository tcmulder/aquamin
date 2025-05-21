/**
 * E2E tests for the My Block Noninteractive block
 */
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');
const { openPageFromEditor, createTestPage, deleteTestPage, testIsolatedScreenshot, logsMatch, getConsoleLogs } = require('../helpers');

const subject = {
	label: 'My Block Noninteractive',
	slug: 'test-block-my-block-noninteractive',
	selector: '.my-block-noninteractive',
	block: {
		title: 'My Block Noninteractive',
		name: 'aquamin/my-block-noninteractive',
		slug: 'my-block-noninteractive',
	},
	expectedLogs: [
		'Noninteractive block theme loads WordPress dependency: true',
		'Noninteractive block theme loads node_modules dependency: true',
		'Noninteractive block theme loads internal dependency: true',
		'Noninteractive block loads WordPress dependency: true',
		'Noninteractive block loads node_modules dependency: true',
		'Noninteractive block loads internal dependency: true',
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
		const el = page.locator(subject.selector)
		await testIsolatedScreenshot({ el, page });
	});

});