/**
 * E2E tests for the My Block Media block (uses <Media> UI)
 */
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');
const { openPageFromEditor, createTestPage, deleteTestPage, testIsolatedScreenshot, logsMatch, getConsoleLogs } = require('../helpers');

const subject = {
	label: 'My Block Media',
	slug: 'test-block-my-block-media',
	selector: '.my-block-media',
	block: {
		title: 'My Block Media',
		name: 'aquamin/my-block-media',
		slug: 'my-block-media',
	},
};

test.describe(`The block "${subject.label}"`, () => {

	test.beforeEach( async({ requestUtils, page, editor }) => {
		subject.logs = await getConsoleLogs({ page });
		await createTestPage({ subject, page, requestUtils });
		await editor.insertBlock({ name: subject.block.name });
		await page.frameLocator('iframe[name="editor-canvas"]').getByRole('button', { name: 'Insert from URL' }).click();
		await page.getByPlaceholder('Paste or type URL').fill('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1920 1080\' preserveAspectRatio=\'none\'%3E%3Cpath fill=\'%23EEE\' d=\'M0 0h1920v1080H0z\'/%3E%3Cpath fill=\'%23DDD\' fill-rule=\'evenodd\' d=\'M1073 392a359 359 0 0 0-697 172c-73 24-126 93-126 174 0 101 9 290 633 183 190-33 278-22 372-11 65 8 133 17 240 11a183 183 0 0 0 0-366h-47a246 246 0 0 0-375-163Z\' clip-rule=\'evenodd\'/%3E%3C/svg%3E');
		await page.getByLabel('Apply').click();
		await page.getByLabel('Focal point left position').click();
		await page.getByLabel('Focal point left position').fill('10');
		await page.getByLabel('Focal point top position').click();
		await page.getByLabel('Focal point top position').fill('10');
		await page.getByRole('button', { name: 'Replace Media' }).click();
		await page.getByPlaceholder('Search or type URL').click();
		await page.getByPlaceholder('Search or type URL').fill('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1920 1080\' preserveAspectRatio=\'none\'%3E%3Cpath fill=\'%23EEE\' d=\'M0 0h1920v1080H0z\'/%3E%3Cpath fill=\'%23DDD\' fill-rule=\'evenodd\' d=\'M1073 392a359 359 0 0 0-697 172c-73 24-126 93-126 174 0 101 9 290 633 183 190-33 278-22 372-11 65 8 133 17 240 11a183 183 0 0 0 0-366h-47a246 246 0 0 0-375-163Z\' clip-rule=\'evenodd\'/%3E%3C/svg%3E');
		await page.getByPlaceholder('Search or type URL').press('Enter');
	});

	test.afterEach( async ( { page, requestUtils } ) => {
		await deleteTestPage({ page, requestUtils });
	} );
	
	// test('works on back-end', async ({ editor }) => {
	// 	const block = (await editor.getBlocks() )[ 0 ];
	// 	await expect(block.name).toBe(subject.block.name);
	// });

	// test('works on front-end', async({ page, requestUtils }) => {
	// 	await openPageFromEditor({ page, requestUtils });
	// 	await expect(page.locator(subject.selector) ).toBeVisible();
	// });

	test('matches reference screenshot', async({ page, requestUtils }) => {
		await openPageFromEditor({ page, requestUtils });
		await testIsolatedScreenshot({ subject, page });
	});

});