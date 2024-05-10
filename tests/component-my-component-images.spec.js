/**
 * E2E tests for the My Component Images component
 */
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');

const subject = {
	label: 'Images',
	slug: 'test-component-my-component-images',
	selector: 'body'
};

test.describe(`The component "${subject.label}"`, () => {

	test.beforeEach( async({ page, requestUtils }) => {
		await page.goto(requestUtils.baseURL)
		await page.addStyleTag({
			content: `body *,body:before{display:none !important;}`
		});
	});

	test('links to an image background', async({ page }) => {
		expect(page.locator('body')).toHaveCSS('background-image', new RegExp(/my-image.*\.svg/));
	});

	test('matches reference screenshot', async({ page }) => {
		const imageName = `${ subject.slug }.png`;
		await expect(page).toHaveScreenshot(imageName);
	});

});