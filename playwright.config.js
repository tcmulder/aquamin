/**
 * External dependencies
 */
import path from 'node:path';
import { defineConfig } from '@playwright/test';
import { merge } from 'webpack-merge';

/**
 * WordPress dependencies
 */
const baseConfig = require( '@wordpress/scripts/config/playwright.config' );

process.env.WP_ARTIFACTS_PATH ??= path.join( process.cwd(), 'artifacts' );
process.env.STORAGE_STATE_PATH ??= path.join(
	process.env.WP_ARTIFACTS_PATH,
	'storage-states/admin.json'
);

function isHeadedMode() {
	if (process.argv.includes('--headed')) {
		process.env.HEADED_MODE = '1'
	}
	return Boolean(process.env.HEADED_MODE);
}

const newConfig = defineConfig( {
	testDir: './tests',
	snapshotPathTemplate: './reference/{arg}{ext}',
	use: {
		launchOptions: {
			slowMo: isHeadedMode() ? 2000 : 0,
		},
	  },
} );

export default merge(baseConfig, newConfig);
