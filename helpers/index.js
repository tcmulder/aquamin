const { expect } = require('@wordpress/e2e-test-utils-playwright');

/**
 * Get the post ID given a URL string (e.g. http://localhost:8889/wp-admin/post.php?post=2&action=edit)
 * 
 * @param {string} url URL of post
 * 
 * @returns {string} ID number of page as a string
 */
export const getPostIdFromUrl = (url) => {
	let id = 0;
	const urlParts = url.split('?');
	if (urlParts[1]) {
		const query = new URLSearchParams(urlParts[1]);
		id = query.get('post') || query.get('page_id') || 0;
	}
	return id;
}

/**
 * Create testing page
 * 
 * @param {Object} props Properties
 * @param {Object} props.subject Test subject
 * @param {Object} props.page Playwright page object
 * @param {Object} props.requestUtils WordPress E2E utils object
 */
export const createTestPage = async ({ subject, page, requestUtils }) => {
	const newPage = await requestUtils.createPage( {
		title: `E2E test for ${ subject.label }`,
		status: 'publish',
	} );
	await page.goto(`${ requestUtils.baseURL }/wp-admin/post.php?post=${ newPage.id }&action=edit`);
}

/**
 * Delete testing page
 * 
 * @param {Object} props Properties
 * @param {Object} props.page Playwright page object
 * @param {Object} props.requestUtils WordPress E2E utils object
 */
export const deleteTestPage = async ({ page, requestUtils }) => {
	const id = getPostIdFromUrl(page.url());
	await requestUtils.rest({
		method: 'DELETE',
		path: `/wp/v2/pages/${id}`,
		params: {
			force: true,
		},
	});
}

/**
 * Get WordPress post preview and wait for the "generating preview" to leave
 * 
 * @param {Object} props Properties
 * @param {Object} props.editor WordPress playwright editor object
 * 
 * @returns Playwright page object
 */
export const loadPostPreview = async ({ editor }) => {
	const preview = await editor.openPreviewPage();
	await expect(preview.locator('.editor-post-preview-button__interstitial-message')).not.toBeVisible();
	return preview;
}

/**
 * Test screenshot of isolated subject (z-indexed  above any other elements)
 * 
 * @param {Object} props Properties
 * @param {Object} props.subject Test subject
 * @param {Object} props.page Playwright page object
 */
export const testIsolatedScreenshot = async ({ subject, page }) => {
	const imageName = `${ subject.slug }.png`;
	await page.addStyleTag({
		content: `${ subject.selector }{position:fixed;inset:0;z-index:999999;background:white;}`
	});
	await expect(page).toHaveScreenshot(imageName);
}
