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
		showWelcomeGuide: false,
	} );
	const welcome = await page.isVisible('button[aria-label="Close"]');
	if (welcome) {
		await page.locator('button[aria-label="Close"]').click();
	}
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
 * View page from editor
 * 
 * Clicks "publish" first then "view page".
 * 
 * @param {Object} props Properties
 * @param {Object} props.page Playwright page object
 * @param {Object} props.requestUtils WordPress E2E utils object
 * 
 * @returns Playwright page object
 */
export const openPageFromEditor = async ({ page, requestUtils }) => {
	await page.getByRole('button', { name: 'Save', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
	await page.goto(`${ requestUtils.baseURL }?page_id=${ getPostIdFromUrl(page.url()) }`);
	await page.waitForLoadState('domcontentloaded')
}

/**
 * Add logs property to subject containing console logs for front-end (not immutable)
 * 
 * @param {Object} props Properties
 * @param {Object} props.subject Test subject
 * 
 * @returns {Array} Array of console log values
 */
export const getConsoleLogs = async ({ page }) => {
	let logs = [];
	await page.on('console', async msg => {
		logs.push(msg.text());
	});
	return logs;
}

/**
 * Test screenshot of isolated subject (z-indexed  above any other elements)
 *
 * @param {Object} props Properties
 * @param {Object} props.el Locator element to isolate and screenshot
 * @param {Object} props.clip Whether or not to clip to the element (defaults to true)
 * @param {Object} props.page Playwright page object
 * @param {Object} props.opt Playwright toHaveScreenshot options (defaults to empty object)
 */
export const testIsolatedScreenshot = async ({
	el,
	page,
	clip = true,
	opt = {},
}) => {
	if (clip) {
		await el.evaluate((element) => {
			element.setAttribute("style", `
				position: relative;
				z-index: 9999999;
			`)
		})
		await el.scrollIntoViewIfNeeded()
		const { x, y, width, height } = await el.boundingBox()
		await expect(page).toHaveScreenshot({
			clip: { x, y, width, height },
			fullPage: true,
			...opt,
		})
	} else {
		await el.evaluate((element) => {
			element.setAttribute("style", `
				position: fixed;
				inset: 0;
				z-index: 9999999;
				background: white;
				width: 100vw;
				height: 100vh;
				max-width: none;
				max-height: none;
				margin:0;
			`)
		})
		await expect(page).toHaveScreenshot({ ...opt })
	}
}

/**
 * Check if console logs match expected on front-end
 * 
 * @param {Object} props Properties
 * @param {Object} props.subject Test subject
 * 
 * @returns {boolean} True/false if logs match expected
 */
export const logsMatch = ({ subject }) => {
	return subject.expectedLogs.reduce((acc, cur) => {
		return acc && subject.logs.includes(cur);
	}, true);
}